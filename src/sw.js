const CACHE_NAME = 'youthbank-pwa-v3'; // A new version name to force an update
const urlsToCache = [
  './',
  './index.html',
  './sessions.html',
  './sessions.js',
  './style.css',
  './manifest.json',
  './icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // --- THIS IS THE FIX ---
  // If the request is for our Google Apps Script,
  // bypass the cache and go directly to the network.
  if (requestUrl.origin === 'https://script.google.com') {
    event.respondWith(fetch(event.request));
    return;
  }

  // For all other requests, use the cache-first strategy.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

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
