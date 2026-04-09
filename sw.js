const CACHE_NAME = 'v1';
const ASSETS = [
  './',
  './index.html',
  // Add any images or CSS files here later
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