// Testimonials slider functionality
(function() {
    // Wait for both DOM and components to be loaded
    function waitForComponents() {
        // If components are already loaded, initialize immediately
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(initTestimonials, 300);
            return;
        }
        
        // Otherwise wait for components to be loaded
        const onComponentsLoaded = function() {
            document.removeEventListener('componentsLoaded', onComponentsLoaded);
            setTimeout(initTestimonials, 300);
        };
        
        document.addEventListener('componentsLoaded', onComponentsLoaded);
        
        // Fallback in case componentsLoaded event is never fired
        setTimeout(function() {
            if (!window.testimonialsInitialized) {
                initTestimonials();
            }
        }, 2000);
    }
    
    // Start initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForComponents);
    } else {
        waitForComponents();
    }
})();

function initTestimonials() {
    console.group('Testimonials Initialization');
    
    // Prevent multiple initializations
    if (window.testimonialsInitialized) {
        console.log('Testimonials already initialized');
        console.groupEnd();
        return;
    }
    
    console.log('Starting testimonials initialization...');
    
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    console.log('Found elements:', {
        testimonials: testimonials.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dotsContainer: !!dotsContainer
    });
    
    // Check if we have testimonials to work with
    if (!testimonials || testimonials.length === 0) {
        console.warn('No testimonials found on this page');
        console.groupEnd();
        return;
    }
    
    // Log the current state of testimonials
    console.log('Initial testimonials state:');
    testimonials.forEach((testimonial, index) => {
        console.log(`- Testimonial ${index + 1}:`, {
            active: testimonial.classList.contains('active'),
            visibility: window.getComputedStyle(testimonial).visibility,
            opacity: window.getComputedStyle(testimonial).opacity,
            transform: window.getComputedStyle(testimonial).transform
        });
    });
    
    // Mark as initialized
    window.testimonialsInitialized = true;
    console.log('Testimonials initialization complete');
    console.groupEnd();
    
    let currentIndex = 0;
    let isAnimating = false;
    
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
                    goToTestimonial(index);
                }
            });
            
            dotsContainer.appendChild(dot);
        });
        
        // Add mobile-specific styling
        if (window.innerWidth <= 768) {
            dotsContainer.style.marginTop = '2rem';
            dotsContainer.style.padding = '1rem 0';
        }
    }
    
    // Update active dot
    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific testimonial
    function goToTestimonial(index) {
        if (isAnimating || index === currentIndex) return;
        
        isAnimating = true;
        const direction = index > currentIndex ? 'next' : 'prev';
        
        // Update classes for transition
        testimonials[currentIndex].classList.remove('active');
        testimonials[currentIndex].classList.add(direction);
        
        const nextIndex = (index + testimonials.length) % testimonials.length;
        testimonials[nextIndex].classList.add(direction);
        
        // Force reflow
        void testimonials[nextIndex].offsetWidth;
        
        // Start transition
        testimonials[nextIndex].classList.add('active');
        
        // After transition
        setTimeout(() => {
            testimonials[currentIndex].classList.remove('prev', 'next');
            currentIndex = nextIndex;
            isAnimating = false;
            updateDots();
        }, 600);
    }
    
    // Navigation functions
    function goToPrev() {
        const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        goToTestimonial(newIndex);
    }
    
    function goToNext() {
        const newIndex = (currentIndex + 1) % testimonials.length;
        goToTestimonial(newIndex);
    }
    
    // Initialize
    function init() {
        // Set initial state
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = '0';
            testimonial.style.visibility = 'hidden';
            if (index === 0) {
                testimonial.classList.add('active');
                testimonial.style.opacity = '1';
                testimonial.style.visibility = 'visible';
            }
        });
        
        // Initialize dots
        initDots();
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', goToPrev);
        if (nextBtn) nextBtn.addEventListener('click', goToNext);
        
        // Handle window resize for mobile dots positioning
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768 && dotsContainer) {
                dotsContainer.style.marginTop = '2rem';
                dotsContainer.style.padding = '1rem 0';
            }
        });
        
        // Auto-rotate
        let autoRotate = setInterval(goToNext, 8000);
        
        // Pause on hover
        const container = document.querySelector('.testimonials-container');
        if (container) {
            container.addEventListener('mouseenter', () => clearInterval(autoRotate));
            container.addEventListener('mouseleave', () => {
                clearInterval(autoRotate);
                autoRotate = setInterval(goToNext, 8000);
            });
        }
        
        console.log('Testimonials initialized');
    }
    
    // Start the slider
    init();
}
