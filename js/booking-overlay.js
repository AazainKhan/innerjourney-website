function initBookingOverlay() {
    const overlay = document.getElementById('booking-overlay');
    if (!overlay) return; // Silently exit if overlay not found
    
    const overlayBackdrop = document.getElementById('overlay-backdrop');
    const overlayContent = document.getElementById('overlay-content');
    const closeBtn = document.getElementById('close-booking-overlay');
    const bookingForm = document.getElementById('booking-form');
    
    // Find all possible booking buttons
    const bookingBtn = document.getElementById('booking-btn');
    const mobileBookingBtn = document.getElementById('mobile-booking-btn');
    const ctaBookingBtn = document.getElementById('cta-booking-btn');
    const bottomCtaBookingBtn = document.getElementById('bottom-cta-booking-btn');
    const startJourneyBtn = document.querySelector('.btn-azure');
    
    // Add click listeners to all booking buttons
    [bookingBtn, mobileBookingBtn, ctaBookingBtn, bottomCtaBookingBtn, startJourneyBtn].filter(Boolean).forEach(btn => {
        // Remove any existing listeners to prevent duplicates
        btn.removeEventListener('click', openOverlay);
        btn.addEventListener('click', openOverlay);
    });
    
    if (!overlay) {
        console.error('Booking overlay element not found');
        return;
    }
    
    // Open overlay with smooth animation
    function openOverlay(e) {
        if (e) e.preventDefault();
        if (overlay) {
            // Reset styles before opening
            overlay.style.transform = 'translateY(0)';
            overlay.style.opacity = '0';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            
            // Make the overlay visible but transparent
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
            document.body.style.overflow = 'auto';
            // Reset form and transform for next open
            overlay.style.transform = '';
            overlay.style.opacity = '';
            overlay.style.backgroundColor = '';
            if (bookingForm) {
                bookingForm.reset();
            }
        }, 300);
    }
    
    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Prevent multiple submissions
        if (this.getAttribute('data-submitting') === 'true') {
            console.log('Booking form submission already in progress');
            return;
        }
        
        // Mark form as submitting
        this.setAttribute('data-submitting', 'true');
        
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
            this.setAttribute('data-submitting', 'false');
        });
    }
    
    // Add event listeners
    if (overlayBackdrop) {
        overlayBackdrop.addEventListener('click', closeOverlay);
    }
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeOverlay();
            }
        });
    }
    
    if (overlayContent) {
        overlayContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeOverlay);
    }
    
    // Add click listeners to all booking buttons
    [bookingBtn, mobileBookingBtn, ctaBookingBtn].forEach(btn => {
        if (btn) {
            // Remove any existing listeners to prevent duplicates
            btn.removeEventListener('click', openOverlay);
            btn.addEventListener('click', openOverlay);
        }
    });
    
    // Handle form submission
    if (bookingForm) {
        // Remove any existing event listeners to prevent duplicates
        const newBookingForm = bookingForm.cloneNode(true);
        bookingForm.parentNode.replaceChild(newBookingForm, bookingForm);
        
        // Add a data attribute to track if the form is being submitted
        newBookingForm.setAttribute('data-submitting', 'false');
        newBookingForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            closeOverlay();
        }
    });
}

// Function to initialize the booking overlay when the DOM is ready
function initializeBookingOverlay() {
    // Check if the overlay exists
    const overlay = document.getElementById('booking-overlay');
    if (!overlay) {
        // Retry after a short delay
        setTimeout(initializeBookingOverlay, 500);
        return;
    }
    
    // Initialize the booking overlay
    if (typeof initBookingOverlay === 'function') {
        initBookingOverlay();
    }
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Small delay to ensure all components are loaded
        setTimeout(initializeBookingOverlay, 300);
    });
} else {
    // DOMContentLoaded has already fired
    setTimeout(initializeBookingOverlay, 300);
}

// Initialize when components are loaded
document.addEventListener('componentsLoaded', initializeBookingOverlay);
