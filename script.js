document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Modal functionality
    const modal = document.getElementById('detailModal');
    const modalCloseBtn = document.querySelector('.modal-close');
    
    function showModal(title, bodyHtml) {
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalBody').innerHTML = bodyHtml;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    modalCloseBtn && modalCloseBtn.addEventListener('click', closeModal);
    
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };
    
    // ESC key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Route history modal
    document.querySelector('.view-route-btn').addEventListener('click', function() {
        showModal('Route History', `
            <div style="margin-bottom: 16px;">
                <strong>Today's Route Details:</strong>
            </div>
            <ul style="list-style-type: none; padding: 0;">
                <li style="padding: 8px 0; border-bottom: 1px solid #f5f6f8;">
                    <strong>7:20 AM</strong> - Left depot (Location: Transport Hub)
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #f5f6f8;">
                    <strong>7:35 AM</strong> - Pickup at Sector 15
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #f5f6f8;">
                    <strong>7:45 AM</strong> - Arrived at Sophia's stop
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #f5f6f8;">
                    <strong>7:58 AM</strong> - Currently en route to school
                </li>
                <li style="padding: 8px 0;">
                    <strong>8:15 AM</strong> - Expected arrival at school
                </li>
            </ul>
        `);
    });
    
    // Driver behavior report modal
    document.querySelector('.view-report-btn').addEventListener('click', function() {
        showModal('Driver Behavior Report', `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #22ac4f; margin-bottom: 8px;">Safe Driving Score: 92/100</h4>
                <div style="background: #f8f9fb; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                    <strong>Overall Performance:</strong> Excellent
                </div>
            </div>
            <div style="margin-bottom: 16px;">
                <strong>Today's Incidents:</strong>
                <ul style="margin-top: 8px;">
                    <li style="color: #22ac4f; margin-bottom: 4px;">✓ 2 Smooth Accelerations</li>
                    <li style="color: #ff9900; margin-bottom: 4px;">⚠ 1 Hard Braking (7:42 AM)</li>
                    <li style="color: #22ac4f; margin-bottom: 4px;">✓ 0 Sharp Turns</li>
                    <li style="color: #22ac4f;">✓ 0 Speed Violations</li>
                </ul>
            </div>
            <div style="font-size: 13px; color: #8997b3;">
                Report generated on ${new Date().toLocaleDateString()}
            </div>
        `);
    });
    
    // Maintenance log modal
    document.querySelector('.maintenance-log-btn').addEventListener('click', function() {
        showModal('Maintenance Log', `
            <div style="margin-bottom: 20px;">
                <h4 style="margin-bottom: 12px;">Recent Service History</h4>
                <div style="background: #f8f9fb; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                    <strong>Last Service:</strong> Oct 28, 2025<br>
                    <strong>Next Scheduled:</strong> Nov 28, 2025
                </div>
            </div>
            <div>
                <strong>Service Checklist (Oct 28):</strong>
                <ul style="margin-top: 8px;">
                    <li style="color: #22ac4f;">✓ Brakes checked and adjusted</li>
                    <li style="color: #22ac4f;">✓ Tires rotated and pressure checked</li>
                    <li style="color: #22ac4f;">✓ Engine oil replaced</li>
                    <li style="color: #22ac4f;">✓ Safety equipment inspected</li>
                    <li style="color: #22ac4f;">✓ GPS system updated</li>
                </ul>
            </div>
            <div style="margin-top: 16px; padding: 12px; background: #e8f5e8; border-radius: 8px;">
                <strong>Safety Status:</strong> All systems operational
            </div>
        `);
    });
    
    // Detailed analytics modal
    document.querySelector('.detailed-analytics-btn').addEventListener('click', function() {
        showModal('Weekly Analytics Report', `
            <div style="margin-bottom: 20px;">
                <h4>Weekly Performance Summary</h4>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div style="background: #f8f9fb; padding: 12px; border-radius: 8px;">
                    <strong>Max Speed:</strong><br>61.2 km/h
                </div>
                <div style="background: #f8f9fb; padding: 12px; border-radius: 8px;">
                    <strong>Min Speed:</strong><br>28.5 km/h
                </div>
                <div style="background: #f8f9fb; padding: 12px; border-radius: 8px;">
                    <strong>Best Day:</strong><br>Friday (98/100)
                </div>
                <div style="background: #f8f9fb; padding: 12px; border-radius: 8px;">
                    <strong>Incidents:</strong><br>3 total this week
                </div>
            </div>
            <div>
                <strong>Daily Breakdown:</strong>
                <ul style="margin-top: 8px;">
                    <li>Monday: 1 incident (Hard braking)</li>
                    <li>Tuesday: 2 incidents (1 acceleration, 1 braking)</li>
                    <li>Wednesday: 0 incidents</li>
                    <li>Thursday: 0 incidents</li>
                    <li>Friday: 0 incidents</li>
                </ul>
            </div>
        `);
    });
    // Add this to your existing script.js file

// Global map variables
let busMap = null;
let busMarker = null;
let childStopMarker = null;
let schoolMarker = null;
let routeLine = null;
let busRouteCoords = [];

// Simulated GPS coordinates (you would get these from your backend API)
const demoLocations = {
    busStart: [23.1815, 75.7885], // Ujjain area coordinates
    childStop: [23.1825, 75.7895],
    school: [23.1845, 75.7915],
    busCurrentPosition: [23.1820, 75.7890]
};

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    initializeBusMap();
    
    // Start bus movement simulation
    startBusSimulation();
});

function initializeBusMap() {
    // Initialize the map centered on the bus location
    busMap = L.map('busMap', {
        zoomControl: false,
        attributionControl: false
    }).setView(demoLocations.busCurrentPosition, 15);

    // Add tile layer (using OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
    }).addTo(busMap);

    // Create custom icons
    const busIcon = L.divIcon({
        className: 'custom-bus-icon',
        html: '<i class="fas fa-bus" style="color: #227acf; font-size: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"></i>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    const stopIcon = L.divIcon({
        className: 'custom-stop-icon',
        html: '<i class="fas fa-map-marker-alt" style="color: #e14c4c; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"></i>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    const schoolIcon = L.divIcon({
        className: 'custom-school-icon',
        html: '<i class="fas fa-school" style="color: #22ac4f; font-size: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"></i>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    // Add markers
    busMarker = L.marker(demoLocations.busCurrentPosition, { 
        icon: busIcon,
        zIndexOffset: 1000
    }).addTo(busMap);

    childStopMarker = L.marker(demoLocations.childStop, { 
        icon: stopIcon 
    }).addTo(busMap);

    schoolMarker = L.marker(demoLocations.school, { 
        icon: schoolIcon 
    }).addTo(busMap);

    // Add popups
    busMarker.bindPopup(`
        <div class="custom-popup">
            <div class="popup-title">Bus #MH12AB1234</div>
            <div class="popup-details">
                Speed: <span id="popup-speed">42 km/h</span><br>
                Status: On Route<br>
                Driver: Rajesh Kumar
            </div>
        </div>
    `);

    childStopMarker.bindPopup(`
        <div class="custom-popup">
            <div class="popup-title">Sophia's Stop</div>
            <div class="popup-details">
                ETA: <span id="popup-eta">7:58 AM</span><br>
                Distance: <span id="popup-distance">2.3 km</span>
            </div>
        </div>
    `);

    schoolMarker.bindPopup(`
        <div class="custom-popup">
            <div class="popup-title">Bright Future School</div>
            <div class="popup-details">
                Final Destination<br>
                ETA: 8:15 AM
            </div>
        </div>
    `);

    // Create route line
    const routeCoords = [
        demoLocations.busStart,
        demoLocations.busCurrentPosition,
        demoLocations.childStop,
        demoLocations.school
    ];

    // Add completed route (darker line)
    const completedRoute = [
        demoLocations.busStart,
        demoLocations.busCurrentPosition
    ];
    
    L.polyline(completedRoute, {
        color: '#227acf',
        weight: 4,
        opacity: 0.8
    }).addTo(busMap);

    // Add remaining route (lighter line)
    const remainingRoute = [
        demoLocations.busCurrentPosition,
        demoLocations.childStop,
        demoLocations.school
    ];
    
    routeLine = L.polyline(remainingRoute, {
        color: '#227acf',
        weight: 4,
        opacity: 0.4,
        dashArray: '10, 10'
    }).addTo(busMap);

    // Add map controls
    setupMapControls();
}

function setupMapControls() {
    // Center map button
    document.getElementById('centerMapBtn').addEventListener('click', function() {
        if (busMarker && busMap) {
            busMap.setView(busMarker.getLatLng(), 16, {
                animate: true,
                duration: 0.5
            });
        }
    });

    // Fullscreen button
    document.getElementById('fullscreenBtn').addEventListener('click', function() {
        const mapContainer = document.getElementById('mapContainer');
        const isFullscreen = mapContainer.classList.contains('fullscreen-map');
        
        if (!isFullscreen) {
            mapContainer.classList.add('fullscreen-map');
            document.body.classList.add('map-fullscreen-active');
            this.innerHTML = '<i class="fas fa-compress"></i>';
            this.title = 'Exit Fullscreen';
        } else {
            mapContainer.classList.remove('fullscreen-map');
            document.body.classList.remove('map-fullscreen-active');
            this.innerHTML = '<i class="fas fa-expand"></i>';
            this.title = 'Fullscreen';
        }
        
        // Resize map after layout change
        setTimeout(() => {
            if (busMap) {
                busMap.invalidateSize();
            }
        }, 100);
    });
}

function startBusSimulation() {
    let simulationStep = 0;
    const totalSteps = 200;
    
    setInterval(() => {
        if (simulationStep < totalSteps) {
            // Simulate bus movement toward child's stop
            const startLat = demoLocations.busCurrentPosition[0];
            const startLng = demoLocations.busCurrentPosition[1];
            const targetLat = demoLocations.childStop[0];
            const targetLng = demoLocations.childStop[1];
            
            const progress = simulationStep / totalSteps;
            const currentLat = startLat + (targetLat - startLat) * progress;
            const currentLng = startLng + (targetLng - startLng) * progress;
            
            // Update bus marker position
            const newPosition = [currentLat, currentLng];
            if (busMarker) {
                busMarker.setLatLng(newPosition);
            }
            
            // Update distance and ETA
            const remainingDistance = calculateDistance(newPosition, demoLocations.childStop);
            const eta = calculateETA(remainingDistance);
            
            document.getElementById('distanceToStop').textContent = `${remainingDistance.toFixed(1)} km away`;
            document.querySelector('.eta-time .time').textContent = eta;
            
            // Update popup if open
            const popupSpeedEl = document.getElementById('popup-speed');
            const popupDistanceEl = document.getElementById('popup-distance');
            const popupEtaEl = document.getElementById('popup-eta');
            
            if (popupSpeedEl) popupSpeedEl.textContent = `${(38 + Math.random() * 8).toFixed(0)} km/h`;
            if (popupDistanceEl) popupDistanceEl.textContent = `${remainingDistance.toFixed(1)} km`;
            if (popupEtaEl) popupEtaEl.textContent = eta;
            
            // Update route progress
            const progressPercent = 65 + (progress * 25); // Start at 65%, go to 90%
            document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
            document.querySelector('.progress-text').textContent = `${Math.round(progressPercent)}% Complete`;
            
            simulationStep++;
        }
    }, 2000); // Update every 2 seconds
}

function calculateDistance(pos1, pos2) {
    // Simple distance calculation (Haversine formula simplified for demo)
    const R = 6371; // Earth's radius in km
    const dLat = (pos2[0] - pos1[0]) * Math.PI / 180;
    const dLon = (pos2[1] - pos1[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(pos1[0] * Math.PI / 180) * Math.cos(pos2[0] * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function calculateETA(distanceKm) {
    const avgSpeedKmh = 40; // Average speed
    const timeHours = distanceKm / avgSpeedKmh;
    const timeMinutes = timeHours * 60;
    
    const now = new Date();
    const etaTime = new Date(now.getTime() + (timeMinutes * 60 * 1000));
    
    return etaTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Add fullscreen map styles
const fullscreenStyles = `
.fullscreen-map {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 1000 !important;
    background: white !important;
    margin: 0 !important;
}

.fullscreen-map .bus-map {
    height: 100vh !important;
    border-radius: 0 !important;
}

.map-fullscreen-active {
    overflow: hidden !important;
}

.fullscreen-map .map-overlay {
    top: 20px !important;
    left: 20px !important;
    right: 20px !important;
}
`;

// Inject fullscreen styles
const styleSheet = document.createElement('style');
styleSheet.textContent = fullscreenStyles;
document.head.appendChild(styleSheet);

// Update the existing updateLiveData function to include speed updates
function updateLiveData() {
    // ... your existing code ...
    
    // Update current speed
    const currentSpeedEl = document.getElementById('currentSpeed');
    if (currentSpeedEl) {
        const speed = (38 + Math.random() * 12).toFixed(0);
        currentSpeedEl.textContent = `${speed} km/h`;
    }
    
    // ... rest of your existing code ...
}

    
    // Quick action buttons
    document.getElementById('contactDriver').addEventListener('click', function() {
        showConfirmDialog('Contact Driver', 'Would you like to call the bus driver directly?', function() {
            showNotification('Connecting to driver...', 'success');
        });
    });
    
    document.getElementById('messageSchool').addEventListener('click', function() {
        showModal('Message School Admin', `
            <form style="display: flex; flex-direction: column; gap: 16px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Subject:</label>
                    <input type="text" placeholder="Enter subject..." style="width: 100%; padding: 8px 12px; border: 1px solid #e9eef5; border-radius: 6px;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Message:</label>
                    <textarea rows="4" placeholder="Type your message..." style="width: 100%; padding: 8px 12px; border: 1px solid #e9eef5; border-radius: 6px; resize: vertical;"></textarea>
                </div>
                <button type="button" onclick="closeModal(); showNotification('Message sent to school admin', 'success');" style="background: #22ac4f; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Send Message</button>
            </form>
        `);
    });
    
    // Child selector
    const childSelect = document.getElementById('childSelect');
    if (childSelect) {
        childSelect.addEventListener('change', function(e) {
            const selectedChild = e.target.options[e.target.selectedIndex].text;
            showNotification(`Switched to ${selectedChild}'s data`, 'info');
            // Here you would typically load new data for the selected child
            updateChildData(selectedChild);
        });
    }
    
    // Communication buttons
    document.querySelectorAll('.comm-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.classList.contains('driver') ? 'Driver' : 'School Admin';
            showNotification(`Opening message window to ${type}...`, 'info');
        });
    });
    
    // Emergency contact button
    document.querySelector('.emergency-btn').addEventListener('click', function() {
        showConfirmDialog('Emergency Contact', 'This will immediately call the emergency contact. Continue?', function() {
            showNotification('Calling emergency contact...', 'warning');
        });
    });
    
    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', function() {
        showModal('Settings', `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <h4 style="margin-bottom: 12px;">Notification Preferences</h4>
                    <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <input type="checkbox" checked> Route updates
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <input type="checkbox" checked> Driver behavior alerts
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <input type="checkbox" checked> Boarding notifications
                    </label>
                </div>
                <div>
                    <h4 style="margin-bottom: 12px;">Display Options</h4>
                    <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <input type="checkbox" checked> Show detailed metrics
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox"> Dark mode
                    </label>
                </div>
                <button type="button" onclick="closeModal(); showNotification('Settings saved', 'success');" style="background: #227acf; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Save Settings</button>
            </div>
        `);
    });
    
    // Help button
    document.getElementById('helpBtn').addEventListener('click', function() {
        showModal('Help & Support', `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <h4>Frequently Asked Questions</h4>
                    <div style="margin-top: 12px;">
                        <details style="margin-bottom: 8px;">
                            <summary style="cursor: pointer; font-weight: 500;">How accurate is the bus tracking?</summary>
                            <p style="margin-top: 8px; color: #707c98;">Our GPS tracking system updates every 10 seconds and has an accuracy of within 5 meters.</p>
                        </details>
                        <details style="margin-bottom: 8px;">
                            <summary style="cursor: pointer; font-weight: 500;">What do the driver behavior scores mean?</summary>
                            <p style="margin-top: 8px; color: #707c98;">Scores are calculated based on acceleration, braking, turning, and speed adherence. 90+ is excellent, 80-89 is good, below 80 needs improvement.</p>
                        </details>
                        <details>
                            <summary style="cursor: pointer; font-weight: 500;">How can I contact support?</summary>
                            <p style="margin-top: 8px; color: #707c98;">You can reach us at support@saferide.com or call +91-12345-67890 for immediate assistance.</p>
                        </details>
                    </div>
                </div>
            </div>
        `);
    });
    
    // Initialize Chart.js if available
    if (typeof Chart !== 'undefined') {
        initializeChart();
    }
    
    // Auto-update functionality (simulation)
    setInterval(updateLiveData, 30000); // Update every 30 seconds
    
    function initializeDashboard() {
        // Simulate loading state
        showNotification('Dashboard loaded', 'success');
        
        // Initialize any widgets that need setup
        updateDateTime();
        setInterval(updateDateTime, 60000); // Update time every minute
    }
    
    function initializeChart() {
        const ctx = document.getElementById('weeklyChart');
        if (!ctx) return;
        
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Driver Incidents',
                    data: [1, 3, 2, 0, 0],
                    fill: false,
                    borderColor: '#227acf',
                    backgroundColor: 'rgba(34, 122, 207, 0.1)',
                    tension: 0.3,
                    pointBackgroundColor: '#227acf',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#8997b3'
                        },
                        grid: {
                            color: 'rgba(137, 151, 179, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#8997b3'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    function updateChildData(childName) {
        // This would typically fetch new data from an API
        // For demo purposes, we'll just update some UI elements
        document.querySelector('.child-name').textContent = childName;
        
        // Simulate different data for different children
        if (childName.includes('Arjun')) {
            document.querySelector('.score-number').textContent = '88';
            document.querySelector('.time').textContent = '8:05 AM';
            document.querySelector('.occupancy-percent').textContent = '72%';
            document.querySelector('.occupancy-seats').textContent = '(22/30 Seats)';
        } else {
            document.querySelector('.score-number').textContent = '92';
            document.querySelector('.time').textContent = '7:58 AM';
            document.querySelector('.occupancy-percent').textContent = '65%';
            document.querySelector('.occupancy-seats').textContent = '(20/30 Seats)';
        }
    }
    
    function updateLiveData() {
        // Simulate live data updates
        const currentTime = new Date();
        const timeString = currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        // Update ETA (this would come from real API)
        const etaElement = document.querySelector('.time');
        if (etaElement) {
            etaElement.textContent = timeString;
        }
        
        // Simulate occupancy changes
        const occupancyPercent = Math.floor(Math.random() * 20) + 60; // 60-80%
        const occupancySeats = Math.floor(occupancyPercent * 30 / 100);
        
        const percentElement = document.querySelector('.occupancy-percent');
        const seatsElement = document.querySelector('.occupancy-seats');
        const fillElement = document.querySelector('.gauge-fill');
        
        if (percentElement && seatsElement && fillElement) {
            percentElement.textContent = occupancyPercent + '%';
            seatsElement.textContent = `(${occupancySeats}/30 Seats)`;
            fillElement.style.width = occupancyPercent + '%';
        }
    }
    
    function updateDateTime() {
        // This could update any time-related elements
        const now = new Date();
        // Update any timestamp elements that need current time
    }
    
    function showNotification(message, type = 'info') {
        // Create and show a notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#22ac4f' : type === 'warning' ? '#ff9900' : type === 'error' ? '#e14c4c' : '#227acf'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-size: 14px;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        // Add animation keyframes if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    function showConfirmDialog(title, message, onConfirm) {
        showModal(title, `
            <div style="margin-bottom: 20px;">
                <p>${message}</p>
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button onclick="closeModal()" style="background: #f5f6f8; color: #23334d; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Cancel</button>
                <button onclick="closeModal(); (${onConfirm.toString()})()" style="background: #e14c4c; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Confirm</button>
            </div>
        `);
    }
    
    // Make closeModal globally available for inline onclick handlers
    window.closeModal = closeModal;
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        // Add any keyboard shortcuts here
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case 's':
                    event.preventDefault();
                    document.getElementById('settingsBtn').click();
                    break;
                case 'h':
                    event.preventDefault();
                    document.getElementById('helpBtn').click();
                    break;
            }
        }
    });
});

// Initialize Leaflet map
document.addEventListener("DOMContentLoaded", function () {
  const source = [30.767849, 76.575423]; // Chandigarh University, Kharar
  const destination = [30.741482, 76.651985]; // Amayra Greens, Mohali

  const map = L.map('busMap').setView(source, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Use Leaflet Routing Machine for actual road route
  L.Routing.control({
    waypoints: [
      L.latLng(source[0], source[1]),
      L.latLng(destination[0], destination[1])
    ],
    routeWhileDragging: false,
    draggableWaypoints: false,
    addWaypoints: false,
    show: false,
    lineOptions: {
      styles: [{ color: 'blue', weight: 5 }]
    },
    createMarker: function(i, waypoint, n) {
      if (i === 0) {
        // Custom bus icon for source
        const busIcon = L.divIcon({
          className: 'custom-bus-icon',
          html: '<i class="fas fa-bus" style="color: #227acf; font-size: 22px;"></i>',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });
        return L.marker(waypoint.latLng, { icon: busIcon })
          .bindPopup('Source: Chandigarh University, Kharar')
          .openPopup();
      } else if (i === n - 1) {
        return L.marker(waypoint.latLng)
          .bindPopup('Destination: Amayra Greens, Mohali');
      } else {
        return null;
      }
    }
  }).addTo(map);

  // Danger area coordinates (example: near Khanpur)
const dangerArea = [30.756083, 76.632460]; // Adjust as needed for exact location

L.circle(dangerArea, {
  radius: 500, // meters
  color: '#e14c4c',
  fillColor: '#e14c4c',
  fillOpacity: 0.3, // transparent
  weight: 2
})
  .addTo(map)
  .bindPopup('Danger Area');
});
