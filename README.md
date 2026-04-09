# Productivity-app
// add to bottom of script tag

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log("Service Worker Registered"));
}