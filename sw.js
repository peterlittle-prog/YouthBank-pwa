const CACHE_NAME = 'youthbank-pwa-v3'; // Incremented version to force an update
const urlsToCache = [
  '/YouthBank-pwa/',
  '/YouthBank-pwa/index.html',
  '/YouthBank-pwa/sessions.html',
  '/YouthBank-pwa/sessions.js',
  '/YouthBank-pwa/style.css',
  '/YouthBank-pwa/manifest.json',
  '/YouthBank-pwa/icon-192.png' // Add your logo to the cache!
];

// Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline, and update cache when online
self.addEventListener('fetch', event => {
  // We only want to cache GET requests for our app files
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        // Return from cache if available
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Update the cache with the new version
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
