function loadComponents() {
    console.log('Loading components...');
    
    // Load booking overlay if the placeholder exists
    const bookingOverlayContainer = document.getElementById('booking-overlay-container') || document.getElementById('booking-overlay-section');
    if (bookingOverlayContainer && !document.getElementById('booking-overlay')) {
        console.log('Loading booking overlay from components/booking-overlay.html...');
        fetch('components/booking-overlay.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                console.log('Booking overlay HTML loaded, parsing...');
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const overlay = tempDiv.querySelector('#booking-overlay');
                
                if (overlay) {
                    console.log('Appending booking overlay to DOM:', overlay);
                    bookingOverlayContainer.appendChild(overlay);
                    
                    // Confirm overlay presence after appending
                    console.log('Overlay after appending:', document.getElementById('booking-overlay'));
                    
                    // Initialize the booking overlay after appending
                    console.log('Overlay appended successfully, initializing...');
                    initBookingOverlay();
                } else {
                    console.error('Booking overlay content not found in the loaded HTML');
                }
            })
            .catch(error => {
                console.error('Error loading booking overlay:', error);
            });
    } else if (bookingOverlaySection) {
        console.log('Booking overlay already loaded');
    } else {
        console.log('No booking overlay section found on this page');
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadComponents);
