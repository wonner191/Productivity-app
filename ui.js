/**
 * UI.js - The Control Center
 */

// 1. Toggle the Settings Menu
function toggleSettings() {
    const menu = document.getElementById('settings-menu');
    menu.classList.toggle('open');
}

// 2. Update CSS Variables (The "Buckets")
function updateColors() {
    // Get values from the UI inputs
    const primary = document.getElementById('primaryPicker').value;
    const secondary = document.getElementById('secondaryPicker').value;
    const opacity = document.getElementById('glassOpacity').value;

    // Apply them to the CSS :root (the buckets)
    // This instantly updates the look of the whole app
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    document.documentElement.style.setProperty('--glass-hue', `rgba(255, 255, 255, ${opacity})`);
    
    // Optional: Save these to localStorage so they stick when you refresh
    localStorage.setItem('jelly-primary', primary);
    localStorage.setItem('jelly-secondary', secondary);
    localStorage.setItem('jelly-opacity', opacity);
}

// 3. Load Saved Colors on Startup
window.addEventListener('DOMContentLoaded', () => {
    const savedPrimary = localStorage.getItem('jelly-primary');
    const savedSecondary = localStorage.getItem('jelly-secondary');
    const savedOpacity = localStorage.getItem('jelly-opacity');

    if (savedPrimary) {
        document.getElementById('primaryPicker').value = savedPrimary;
        document.getElementById('secondaryPicker').value = savedSecondary;
        document.getElementById('glassOpacity').value = savedOpacity;
        updateColors(); // Apply them immediately
    }
});
// Add this inside your DOMContentLoaded listener in ui.js
const labels = document.querySelectorAll('.jelly-label');

labels.forEach((input, index) => {
    // Load saved title
    const savedValue = localStorage.getItem(`jelly-label-${index}`);
    if (savedValue) input.value = savedValue;

    // Save title on change
    input.addEventListener('input', () => {
        localStorage.setItem(`jelly-label-${index}`, input.value);
    });
});