// Function to load components
function loadComponents() {
    console.log('Loading components...');
    
    // Load booking overlay if the placeholder exists
    const bookingOverlaySection = document.getElementById('booking-overlay-section');
    if (bookingOverlaySection && !document.getElementById('booking-overlay')) {
        console.log('Loading booking overlay...');
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
                    console.log('Appending booking overlay to DOM...');
                    bookingOverlaySection.appendChild(overlay);
                    
                    // Initialize the booking overlay
                    if (typeof initBookingOverlay === 'function') {
                        console.log('Initializing booking overlay...');
                        initBookingOverlay();
                    } else {
                        console.log('Loading booking overlay script...');
                        const script = document.createElement('script');
                        script.src = 'js/booking-overlay.js';
                        script.onload = function() {
                            console.log('Booking overlay script loaded, initializing...');
                            if (typeof initBookingOverlay === 'function') {
                                initBookingOverlay();
                            }
                        };
                        document.body.appendChild(script);
                    }
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
