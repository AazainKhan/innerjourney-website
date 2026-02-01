// HTML include loader for components (navbar, etc.)
function includeHTML(callback) {
    const elements = document.querySelectorAll('[include-html]');
    const total = elements.length;
    
    if (total === 0) {
        if (callback) callback();
        document.dispatchEvent(new Event('componentsLoaded'));
        return;
    }
    
    let loaded = 0;
    
    function checkComplete() {
        loaded++;
        if (loaded === total) {
            if (callback) callback();
            document.dispatchEvent(new Event('componentsLoaded'));
        }
    }
    
    elements.forEach(el => {
        const file = el.getAttribute('include-html');
        if (!file) {
            checkComplete();
            return;
        }
        
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    el.innerHTML = this.responseText;
                }
                el.removeAttribute('include-html');
                checkComplete();
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
    
    // Initialize all functionality
    initTestimonials();
    initScrollAnimations(); // Initialize scroll animations
    initScrollAnimations();
    initServiceCards();
    initContactForm(); // Initialize contact form
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

    const scrollThreshold = 50; // Pixels to scroll before changing navbar

    // Function to update navbar style based on scroll position
    const updateNavbar = () => {
        if (window.scrollY > scrollThreshold) {
            if (!navbar.classList.contains('scrolled')) {
                navbar.classList.add('scrolled');
            }
        } else {
            if (navbar.classList.contains('scrolled')) {
                navbar.classList.remove('scrolled');
            }
        }
    };

    // Set initial state on page load
    updateNavbar();

    // Add an efficient scroll listener
    window.addEventListener('scroll', updateNavbar, { passive: true });
    
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
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Remove Tailwind hidden on open, and allow CSS transition to play
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
            mobileMenu.classList.add('show');
        });
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('show');
        
        const handleTransitionEnd = () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.removeEventListener('transitionend', handleTransitionEnd);
        };
        mobileMenu.addEventListener('transitionend', handleTransitionEnd);
    }
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!mobileMenu.classList.contains('show')) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            // Only close if the overlay itself (the background) is clicked
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Mobile dropdown toggle functionality
    const mobileDropdownToggle = mobileMenu.querySelector('.mobile-dropdown-toggle');
    if (mobileDropdownToggle) {
        mobileDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent) {
                dropdownContent.classList.toggle('hidden');
                this.classList.toggle('active');
            }
        });
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
            closeMobileMenu();
        }
    });
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

// Form handling for contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Remove any existing event listeners to prevent duplicates
    const newForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(newForm, contactForm);
    
    // Add a data attribute to track if the form is being submitted
    newForm.setAttribute('data-submitting', 'false');
    
    newForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const submitText = document.getElementById('submit-text');
        const submitSpinner = document.getElementById('submit-spinner');
        const formMessage = document.getElementById('form-message');
        
        // Prevent multiple submissions
        if (this.getAttribute('data-submitting') === 'true') {
            console.log('Form submission already in progress');
            return;
        }
        
        // Mark form as submitting
        this.setAttribute('data-submitting', 'true');
        
        // Show loading state
        submitButton.disabled = true;
        submitText.textContent = 'Sending...';
        submitSpinner.classList.remove('hidden');
        formMessage.className = 'hidden';
        
        // Log the submission attempt
        console.log('Form submission started at:', new Date().toISOString());
        
        try {
            // Convert FormData to URL-encoded format
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            const response = await fetch('contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formDataObj).toString()
            });
            
            let result;
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                result = await response.json();
            } else {
                const text = await response.text();
                throw new Error(`Expected JSON, got: ${text}`);
            }
            
            if (result.success) {
                formMessage.textContent = result.message || 'Thank you! Your message has been sent successfully.';
                formMessage.className = 'bg-green-100 border border-green-400 text-green-700 p-4 mb-4 rounded-lg';
                contactForm.reset();
            } else {
                formMessage.textContent = result.error || 'An error occurred. Please try again.';
                formMessage.className = 'bg-red-100 border border-red-400 text-red-700 p-4 mb-4 rounded-lg';
                
                // Highlight missing fields if any
                if (result.missing_fields && result.missing_fields.length > 0) {
                    result.missing_fields.forEach(field => {
                        const input = contactForm.querySelector(`[name="${field}"]`);
                        if (input) {
                            input.classList.add('border-red-500', 'ring-2', 'ring-red-200');
                            input.addEventListener('input', function() {
                                this.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                            }, { once: true });
                        }
                    });
                }
            }
            
        } catch (error) {
            console.error('Error:', error);
            formMessage.textContent = 'An error occurred while sending your message. Please try again later.';
            formMessage.className = 'bg-red-100 border border-red-400 text-red-700 p-4 mb-4 rounded-lg';
        } finally {
            formMessage.classList.remove('hidden');
            submitButton.disabled = false;
            submitText.textContent = 'Send';
            submitSpinner.classList.add('hidden');
            
            // Scroll to form message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Reset form submission state
            this.setAttribute('data-submitting', 'false');
        }
    });
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

// Button click effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
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
        
        // Add event listener for Start Your Journey button
        const startJourneyBtn = document.getElementById('start-journey-btn');
        if (startJourneyBtn) {
            startJourneyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const bookingBtn = document.getElementById('booking-btn');
                if (bookingBtn) {
                    // Trigger the same click handler as the booking button
                    bookingBtn.click();
                }
            });
        }
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

// Scroll Animation Function
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('h2, h1, p, .service-card, .testimonial');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        // Add animation class based on element type
        if (el.tagName === 'H1' || el.tagName === 'H2') {
            el.classList.add('animate-fade-in');
        } else if (el.classList.contains('service-card')) {
            el.classList.add('animate-on-scroll');
        } else {
            el.classList.add('animate-on-scroll');
        }
        observer.observe(el);
    });
}

// Booking Overlay Functionality is now in booking-overlay.js

// Set minimum date to today for the booking form
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }
});

