function loadComponents() {
    // Function to load booking overlay
    function loadBookingOverlay() {
        // Check if the overlay is already loaded
        if (document.getElementById('booking-overlay')) {
            return Promise.resolve();
        }
        
        const bookingOverlayContainer = document.getElementById('booking-overlay-container');
        if (!bookingOverlayContainer) {
            return Promise.resolve();
        }
        
        return fetch('components/booking-overlay.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const overlay = tempDiv.querySelector('#booking-overlay');
                
                if (!overlay) {
                    throw new Error('Booking overlay content not found');
                }
                
                bookingOverlayContainer.appendChild(overlay);
                document.dispatchEvent(new Event('componentsLoaded'));
                return overlay;
            });
    }
    
    // Load all components
    Promise.all([loadBookingOverlay()]).catch(console.error);
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
