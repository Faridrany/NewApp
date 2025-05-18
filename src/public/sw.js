const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/scripts/index.js',
  '/images/logo.png',
  '/favicon.png',
  '/scripts/home/home-page.js',
  
  // Tambahkan file lainnya jika perlu
];

// Install service worker dan cache file statis
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate dan hapus cache lama jika ada
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: Cache-first strategy + fallback aman
self.addEventListener('fetch', event => {
  // Hindari mengganggu dev server Vite
  if (event.request.url.includes('/@vite/')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html'); // fallback offline
        }

        // Fallback aman jika resource tidak ada & bukan navigasi
        return new Response('Service unavailable', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});

// Push Notification Handler
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

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
