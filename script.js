// HTML include loader for components (navbar, etc.)
function includeHTML(callback) {
    var elements = document.querySelectorAll('[include-html]');
    var total = elements.length;
    if (total === 0) {
        if (callback) callback();
        document.dispatchEvent(new Event('componentsLoaded'));
        return;
    }
    var loaded = 0;
    elements.forEach(function(el) {
        var file = el.getAttribute('include-html');
        if (!file) {
            loaded++;
            if (loaded === total) {
                if (callback) callback();
                document.dispatchEvent(new Event('componentsLoaded'));
            }
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    el.innerHTML = this.responseText;
                }
                el.removeAttribute('include-html');
                loaded++;
                if (loaded === total) {
                    if (callback) callback();
                    document.dispatchEvent(new Event('componentsLoaded'));
                }
            }
        };
        xhr.open('GET', file, true);
        xhr.send();
    });
}

// Run includeHTML on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    includeHTML();
    initBookingOverlay(); // Initialize booking overlay
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTestimonials();
    initScrollAnimations();
    initServiceCards();
});

// Re-initialize navigation and mobile menu after components are loaded
document.addEventListener('componentsLoaded', function() {
    initNavigation();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    // Add scrolled class by default for better mobile experience
    navbar.classList.add('scrolled');
    // Smooth scrolling for navigation links (only for internal anchor links)
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = navbar ? navbar.getBoundingClientRect().height : 80;
                const y = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
}

// Testimonials carousel with smooth transitions
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (!testimonials.length) {
        return;
    }
    
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');
    let currentIndex = 0;
    let isAnimating = false;
    let autoRotateInterval;
    const ROTATE_INTERVAL = 8000; // 8 seconds

    // Initialize testimonials
    function initTestimonialsState() {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = '0';
            testimonial.style.visibility = 'hidden';
            testimonial.classList.remove('active', 'prev', 'next');
            if (index === 0) {
                testimonial.classList.add('active');
                testimonial.style.opacity = '1';
                testimonial.style.visibility = 'visible';
            }
        });
    }

    function updateTestimonialClasses(newIndex) {
        // If already animating or no change, do nothing
        if (isAnimating || newIndex === currentIndex) return;
        
        isAnimating = true;
        
        const currentTestimonial = testimonials[currentIndex];
        const newTestimonial = testimonials[newIndex];
        const direction = newIndex > currentIndex ? 1 : -1;
        
        // Set up incoming and outgoing directions
        // Always use horizontal movement for testimonials
        if (direction === 1) {
            newTestimonial.style.transform = 'translateX(100%)'; // Next: from right
        } else {
            newTestimonial.style.transform = 'translateX(-100%)'; // Prev: from left
        }
        newTestimonial.style.opacity = '0';
        newTestimonial.style.visibility = 'visible';
        
        // Add transition classes
        currentTestimonial.classList.add(direction === 1 ? 'prev' : 'next');
        newTestimonial.classList.add('active');
        
        // Force reflow to ensure the class changes take effect
        void newTestimonial.offsetWidth;
        
        // Start the transition
        currentTestimonial.style.opacity = '0';
        newTestimonial.style.transform = 'translateX(0)';
        newTestimonial.style.opacity = '1';
        
        // After transition completes
        setTimeout(() => {
            currentTestimonial.classList.remove('active', 'prev', 'next');
            currentTestimonial.style.visibility = 'hidden';
            currentIndex = newIndex;
            isAnimating = false;
            updateDots();
        }, 600); // Match this with CSS transition duration
    }

    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Arrow controls
    function goToPrev() {
        const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonialClasses(newIndex);
        resetAutoRotate();
    }

    function goToNext() {
        const newIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonialClasses(newIndex);
        resetAutoRotate();
    }

    // Initialize dots
    function initDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            
            if (index === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                if (index !== currentIndex && !isAnimating) {
                    updateTestimonialClasses(index);
                    resetAutoRotate();
                }
            });
            
            dotsContainer.appendChild(dot);
        });
    }

    // Touch events for mobile
    function initTouchEvents() {
        const container = document.querySelector('.testimonials-container');
        if (!container) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        const SWIPE_THRESHOLD = 50;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            if (isAnimating) return;
            
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > SWIPE_THRESHOLD) {
                if (diff > 0) {
                    goToNext();
                } else {
                    goToPrev();
                }
            }
        }, { passive: true });
    }

    // Auto-rotate functionality
    function startAutoRotate() {
        stopAutoRotate();
        autoRotateInterval = setInterval(goToNext, ROTATE_INTERVAL);
    }
    
    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
    }
    
    function resetAutoRotate() {
        stopAutoRotate();
        startAutoRotate();
    }

    // Initialize everything
    function init() {
        initTestimonialsState();
        initDots();
        initTouchEvents();
        
        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', goToPrev);
        if (nextBtn) nextBtn.addEventListener('click', goToNext);
        
        // Pause auto-rotate on hover
        const container = document.querySelector('.testimonials-container');
        if (container) {
            container.addEventListener('mouseenter', stopAutoRotate);
            container.addEventListener('mouseleave', startAutoRotate);
            container.addEventListener('focusin', stopAutoRotate);
            container.addEventListener('focusout', startAutoRotate);
        }
        
        // Start auto-rotation
        startAutoRotate();
    }
    
    // Start the slider
    init();
    
    // Clean up on window unload
    window.addEventListener('beforeunload', () => {
        stopAutoRotate();
        if (prevBtn) prevBtn.removeEventListener('click', goToPrev);
        if (nextBtn) nextBtn.removeEventListener('click', goToNext);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Remove Tailwind hidden on open, and allow CSS transition to play
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
            mobileMenu.classList.add('show');
        });
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'fas fa-times';
    }
    function closeMobileMenu() {
        mobileMenu.classList.remove('show');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'fas fa-bars';
        const handleTransitionEnd = () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.removeEventListener('transitionend', handleTransitionEnd);
        };
        mobileMenu.addEventListener('transitionend', handleTransitionEnd);
    }
    mobileMenuBtn.addEventListener('click', function() {
        if (!mobileMenu.classList.contains('show')) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });
    // Close button support
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    // Overlay click support
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            closeMobileMenu();
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Remove old click-outside handler (now handled by overlay)
}

// Scroll animations
function initScrollAnimations() {
    // Animations disabled per request
    return;
}

// Service cards hover effects
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Form handling for consultation booking
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-6 p-4 rounded-lg shadow-lg z-50 max-w-sm transform transition-all duration-300 translate-x-full`;
    
    // Set notification content based on type
    let bgColor, textColor, icon;
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            icon = 'fas fa-check-circle';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            icon = 'fas fa-exclamation-circle';
            break;
        default:
            bgColor = 'bg-blue-500';
            textColor = 'text-white';
            icon = 'fas fa-info-circle';
    }
    
    notification.className += ` ${bgColor} ${textColor}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update URL without page jump
            history.pushState(null, null, targetId);
        }
    });
});

// Add loading states to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('btn-primary') || this.textContent.includes('Consultation')) {
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate loading
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = this.getAttribute('data-original-text') || this.textContent;
            }, 2000);
        }
    });
});

// Store original button text
document.querySelectorAll('button').forEach(button => {
    button.setAttribute('data-original-text', button.innerHTML);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('home');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Initialize contact form if it exists
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    
    // Initialize testimonials after components are loaded
    document.addEventListener('componentsLoaded', function() {
        // Small delay to ensure all DOM is ready
        setTimeout(function() {
            initTestimonials();
        }, 100);
    });
    
    // Add smooth scrolling to all links with a hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Booking Overlay Functionality
function initBookingOverlay() {
    const overlay = document.getElementById('booking-overlay');
    const overlayBackdrop = document.getElementById('overlay-backdrop');
    const overlayContent = document.getElementById('overlay-content');
    const bookingBtn = document.getElementById('booking-btn');
    const mobileBookingBtn = document.getElementById('mobile-booking-btn');
    const ctaBookingBtn = document.getElementById('cta-booking-btn');
    const closeBtn = document.getElementById('close-booking-overlay');
    const bookingForm = document.getElementById('booking-form');
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }
    
    // Open overlay with smooth animation
    function openOverlay(e) {
        if (e) e.stopPropagation(); // Prevent event from bubbling to document
        if (overlay) {
            // First make the overlay visible but transparent
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Trigger reflow to ensure the element is in the render tree
            void overlay.offsetHeight;
            
            // Apply the visible state with transitions
            requestAnimationFrame(() => {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            });
            
        } else {
        }
    }
    
    // Close overlay with smooth animation
    function closeOverlay() {
        if (!overlay) return;
        
        // Start the fade out animation
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(20px)';
        
        // Wait for the animation to complete before hiding the overlay
        setTimeout(() => {
            overlay.classList.add('hidden');
            overlay.classList.remove('flex');
            document.body.style.overflow = 'auto';
            // Reset form
            if (bookingForm) {
                bookingForm.reset();
            }
            // Reset inline styles for next open
            overlay.style.backgroundColor = '';
            overlay.style.opacity = '';
            overlay.style.transform = '';
        }, 300); // Match this with the CSS transition duration
    }
    
    // Handle clicks on the overlay
    function handleOverlayClick(e) {
        // If click is on the backdrop (outside the content), close the overlay
        if (e.target === overlayBackdrop || e.target === overlay) {
            closeOverlay();
        }
    }
    
    // Add click listeners
    if (overlayBackdrop) {
        overlayBackdrop.addEventListener('click', handleOverlayClick);
    }
    
    // Also handle clicks on the overlay itself
    if (overlay) {
        overlay.addEventListener('click', handleOverlayClick);
    }
    
    // Prevent clicks on the content from closing the overlay
    if (overlayContent) {
        overlayContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Event listeners
    if (bookingBtn) {
        bookingBtn.addEventListener('click', function(e) {
            openOverlay();
        });
    }
    
    if (mobileBookingBtn) {
        mobileBookingBtn.addEventListener('click', function(e) {
            openOverlay();
        });
    }
    
    if (ctaBookingBtn) {
        ctaBookingBtn.addEventListener('click', function(e) {
            openOverlay();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            closeOverlay();
        });
    }
    
    // Close on overlay background click
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeOverlay();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            closeOverlay();
        }
    });
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const loadingText = submitBtn.querySelector('.loading-text');
            
            submitText.classList.add('hidden');
            loadingText.classList.remove('hidden');
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Send form data
            fetch('contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showNotification(result.message, 'success');
                    closeOverlay();
                } else {
                    showNotification(result.error || 'Something went wrong. Please try again.', 'error');
                }
            })
            .catch(error => {
                showNotification('Network error. Please try again.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitText.classList.remove('hidden');
                loadingText.classList.add('hidden');
                submitBtn.disabled = false;
            });
        });
    }
}

// Global test function for debugging
window.testBookingOverlay = function() {
    const overlay = document.getElementById('booking-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
    } else {
    }
};

// Global test function to check booking button state
window.checkBookingButton = function() {
    const bookingBtn = document.getElementById('booking-btn');
    const mobileBookingBtn = document.getElementById('mobile-booking-btn');
    const ctaBookingBtn = document.getElementById('cta-booking-btn');
    
    if (bookingBtn) {
    }
    
    if (mobileBookingBtn) {
    }
    
    if (ctaBookingBtn) {
    }
};

