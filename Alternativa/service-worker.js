const CACHE_NAME = 'checklist-pro-alternativa-v1.0';
const ASSETS = [
 '/Checklist4Pro/Alternativa/',
  '/Checklist4Pro/Alternativa/index.html',
  '/Checklist4Pro/Alternativa/manifest.json',
  // Iconos en la carpeta superior (Root)
  '/Checklist4Pro/android-chrome-192x192.png',
  '/Checklist4Pro/android-chrome-512x512.png',
  '/Checklist4Pro/maskable-icon-512x512.png'
];

// Instala el Service Worker y guarda los archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activa el Service Worker y limpia cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Responde con los archivos del caché cuando no hay conexión
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
