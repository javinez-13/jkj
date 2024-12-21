const CACHE_NAME = 'cat-fact-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',  // Include your CSS file if it's separate
  '/script.js',   // Include your script.js file
  'https://catfact.ninja/fact',  // Optional: Cache the API response if you want it offline
  'https://api.thecatapi.com/v1/images/search'  // Cache the cat image API
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch data from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Fetch from network if not in cache
      return fetch(event.request);
    })
  );
});
