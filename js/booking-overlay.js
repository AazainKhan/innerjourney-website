// Booking Overlay Functionality
function initBookingOverlay() {
    console.log('Initializing booking overlay...');
    
    const overlay = document.getElementById('booking-overlay');
    const overlayBackdrop = document.getElementById('overlay-backdrop');
    const overlayContent = document.getElementById('overlay-content');
    const closeBtn = document.getElementById('close-booking-overlay');
    const bookingForm = document.getElementById('booking-form');
    
    if (!overlay) {
        console.error('Booking overlay element not found');
        return;
    }
    
    // Open overlay with smooth animation
    function openOverlay(e) {
        if (e) e.preventDefault();
        console.log('Opening overlay...');
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
            // Reset form
            if (bookingForm) {
                bookingForm.reset();
            }
        }, 300);
    }
    
    // Handle clicks on the overlay
    function handleOverlayClick(e) {
        if (e.target === overlayBackdrop || e.target === overlay) {
            closeOverlay();
        }
    }
    
    // Add event listeners
    if (overlayBackdrop) {
        overlayBackdrop.addEventListener('click', handleOverlayClick);
    }
    
    if (overlay) {
        overlay.addEventListener('click', handleOverlayClick);
    }
    
    if (overlayContent) {
        overlayContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeOverlay);
    }
    
    // Use event delegation for booking buttons (works with dynamically added buttons)
    document.addEventListener('click', function(e) {
        // Check if the clicked element or any of its parents has the booking-btn class
        const bookingBtn = e.target.closest('.booking-btn');
        if (bookingBtn) {
            e.preventDefault();
            openOverlay(e);
        }
    });
    
    // Handle form submission - Removed duplicate form submission handler
    // The main form submission is now handled in script.js
    // This prevents duplicate form submissions
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if booking overlay exists on the page
    if (document.getElementById('booking-overlay')) {
        initBookingOverlay();
    }
});
