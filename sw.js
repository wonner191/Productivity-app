const CACHE_NAME = 'v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './physics.js',
  './ui.js',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.18.0/matter.min.js'
];

// Install the service worker and cache the files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serve the files from cache when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});