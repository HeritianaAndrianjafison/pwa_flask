// Service Worker pour mettre en cache les ressources essentielles
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('pwa-cache-v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.php',
          '/assets/css/style.css',
          '/assets/images/icon.ico',
          '/assets/images/icon.ico'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  