const CACHE_NAME = 'trainity-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Instalación del service worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache abierto');
      return cache.addAll(urlsToCache);
    }).catch(error => {
      console.error('Error en instalación:', error);
    })
  );
  self.skipWaiting();
});

// Activación del service worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar solicitudes con estrategia Network First para mejor experiencia
self.addEventListener('fetch', event => {
  // Solo manejar solicitudes GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    // Primero intenta obtener de la red
    fetch(event.request)
      .then(response => {
        // No cachear respuestas que no sean éxito
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clonar la respuesta para cachearla
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Si falla la red, usar el cache
        return caches.match(event.request)
          .then(cachedResponse => {
            return cachedResponse || caches.match('/');
          });
      })
  );
});
