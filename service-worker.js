const CACHE_NAME = 'checklist-pro-v1';
const ASSETS = [
  "/Checklist4Pro/",
  "/Checklist4Pro/manifest.json",
  // Agrega aquí las rutas de tus iconos si los nombres son diferentes:
  "/Checklist4Pro/android-chrome-192x192.png",
  "/Checklist4Pro/android-chrome-512x512.png",
  "/Checklist4Pro/maskable-icon-512x512.png"
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

//Mecanismo para "saltar la espera" cuando el usuario lo decida
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Esta es la Versión 3.2 (incorpora tachito en borrado de línea con fondo mas resaltado)
// Al menos el número de Versión de la línea anterior debe cambiarse con cada nueva versión del Index.html
