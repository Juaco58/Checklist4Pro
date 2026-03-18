// 1. CAMBIAMOS EL NOMBRE DEL CACHÉ (Subimos la versión para que el celu detecte el cambio)
const CACHE_NAME = 'checklist-pro-root-v8.0'; 

const ASSETS = [
  './',                  // <--- Importante para la ruta principal
  './index.html',
  './manifest.json',
  // Nombres de iconos tal cual los tenés en el root:
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './maskable-icon-512x512-alt-v2.png'
];

// Instala el Service Worker y guarda los archivos en caché
self.addEventListener('install', event => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
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

// Estrategia: Cache con caída a Red (mejor para offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Escuchar el mensaje del botón "Aceptar" del cartel de actualización
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Versión 8.0 (Final en Root)
