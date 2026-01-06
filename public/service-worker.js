// Versión del cache - actualiza esto para forzar actualización
const CACHE_VERSION = 'v1';
const CACHE_NAME = `trainity-${CACHE_VERSION}`;

// URLs a cachear en la instalación
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.jsx',
  '/src/index.css',
];

// Instalación del service worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Cache abierto:', CACHE_NAME);
      return cache.addAll(urlsToCache).catch(err => {
        console.warn('⚠️ Error cacheando algunos archivos:', err);
        // Continuar incluso si algunos archivos fallan
        return Promise.resolve();
      });
    }).catch(error => {
      console.error('❌ Error en instalación:', error);
    })
  );
  self.skipWaiting();
});

// Activación del service worker - limpiar caches antiguos
self.addEventListener('activate', event => {
  console.log('✅ Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheName.startsWith('trainity-')) {
            return;
          }
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - usar estrategia Network First para contenido, Cache First para assets estáticos
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar solicitudes GET
  if (request.method !== 'GET') {
    return;
  }

  // Estrategia según el tipo de recurso
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)) {
    // Cache First para assets estáticos
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });

          return response;
        }).catch(() => {
          return caches.match('/');
        });
      })
    );
  } else {
    // Network First para contenido dinámico
    event.respondWith(
      fetch(request)
        .then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });

          return response;
        })
        .catch(() => {
          // Si falla la red, usar el cache
          return caches.match(request).then(cachedResponse => {
            return cachedResponse || caches.match('/');
          });
        })
    );
  }
});

// Background Sync (opcional - para sincronización en background)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      fetch('/api/sync')
        .catch(err => console.error('❌ Error en sync:', err))
    );
  }
});

// Push notifications (opcional)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Notificación de Trainity',
    icon: '/images/icon-192.png',
    badge: '/images/icon-192.png',
    tag: data.tag || 'trainity-notification',
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Trainity', options)
  );
});

// Mensaje desde la app principal
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
