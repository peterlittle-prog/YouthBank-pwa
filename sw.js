const CACHE_NAME = 'youthbank-sessions-v1';
const API_URL = "https://script.google.com/a/macros/youthbankinternational.org/s/AKfycbw7yrHpVKHY3R2jX1QszH5eT6ixW6kQ5TmrR7pQCiT3_NA304KQIbz06R4oPq_I3aJn/exec";
const urlsToCache = [ '/', '/index.html', '/style.css', '/app.js', API_URL ];

// Install the service worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Intercept fetch requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return response from cache
      if (response) {
        return response;
      }
      // Not in cache - fetch from network, then cache it
      return fetch(event.request).then(networkResponse => {
        // ... logic to cache the new response ...
        return networkResponse;
      });
    })
  );
});
