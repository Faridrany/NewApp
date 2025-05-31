const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/scripts/index.js',
  '/images/logo.png',
  '/favicon.png',
  '/scripts/home/home-page.js',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (
    event.request.url.includes('/@vite/') ||
    event.request.url.includes('hot-update')
  )
    return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Service unavailable', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        })
      );
    })
  );
});

self.addEventListener('push', function (event) {
  let title = 'Notifikasi';
  let options = {
    body: 'Ada pesan masuk!',
  };

  try {
    if (event.data) {
      const dataText = event.data.text();
      const dataJson = JSON.parse(dataText);
      title = dataJson.title || title;
      options.body = dataJson.body || options.body;
    }
  } catch (e) {
    console.warn('Push message bukan JSON, gunakan sebagai string biasa.');
    options.body = event.data.text();
  }

  event.waitUntil(self.registration.showNotification(title, options));
});