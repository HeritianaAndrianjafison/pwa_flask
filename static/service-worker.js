const CACHE_NAME = 'pwa-login-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/manifest.json',
  '/register.html',
  '/register.js',
  '/login.html',
  '/home.html',
  '/offline.html',
  '/dexie.min.js',
  '/icon-192.png',
  
  // Includes manquants (résolus)
  '/include/header.html',
  '/include/footer.html',
  '/include/left.html',
  '/include/head.html',

  // Assets login
  '/assets/asset/login/login.css',
  '/assets/asset/login/bootstrap.modal.css',
  '/assets/asset/login/jquery.loadmask.css',
  '/assets/asset/login/jquery.js',
  '/assets/asset/login/bootstrap.min.css',
  '/assets/asset/login/logo_jovena.jpg',

  // Vendors
  '/assets/vendors/mdi/css/materialdesignicons.min.css',
  '/assets/vendors/feather/feather.css',
  '/assets/vendors/base/vendor.bundle.base.css',
  '/assets/vendors/flag-icon-css/css/flag-icon.min.css',
  '/assets/vendors/font-awesome/css/font-awesome.min.css',
  '/assets/vendors/jquery-bar-rating/fontawesome-stars-o.css',
  '/assets/vendors/jquery-bar-rating/fontawesome-stars.css',

  // Styles and images
  '/assets/css/style.css',
  '/assets/images/icon.png',
  '/assets/images/logo/logo.png',
  '/assets/images/faces/heritiana.jpg',

  // Ajout possible : fonts souvent utilisées dans erreurs font fallback
  '/assets/fonts/karla/Karla-Bold.woff2',
  '/assets/fonts/karla/Karla-Regular.woff2',
  '/assets/vendors/feather/fonts/feather-webfont.woff',
];




self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});