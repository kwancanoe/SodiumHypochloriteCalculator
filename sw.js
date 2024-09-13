const cacheName = 'naocl-calculator-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/bootstrap.min.css',
  '/js/bootstrap.min.js',
  '/js/popper.min.js',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return cacheResponse || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cache => cache !== cacheName)
          .map(cache => caches.delete(cache))
      );
    })
  );
});
