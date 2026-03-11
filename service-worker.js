const CACHE_NAME = 'checklist-pro-v4.5'; // Cambiá este número siempre que actualices
const ASSETS = [
  "/Checklist4Pro/",
  "/Checklist4Pro/index.html",
  "/Checklist4Pro/manifest.json",
  "/Checklist4Pro/android-chrome-192x192.png",
  "/Checklist4Pro/android-chrome-512x512.png",
  "/Checklist4Pro/maskable-icon-512x512.png"
];

// Instalación
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activación y limpieza de versiones viejas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// ESTRATEGIA: Intentar Red primero, si falla usar Caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});