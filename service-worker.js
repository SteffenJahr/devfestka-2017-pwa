const appFiles = [
    '/index.html',
    '/manifest.json',
    '/logos/logo_48.png',
    '/logos/logo_72.png',
    '/logos/logo_96.png',
    '/logos/logo_144.png',
    '/logos/logo_168.png',
    '/logos/logo_192.png',
    '/index_files/app.min.css',
    '/index_files/devfest-banner.svg',
    '/index_files/devfest-text.svg',
    '/index_files/fontello.css',
    '/index_files/gdevelopers.png',
    '/index_files/libs.min.css',
    '/script.js',
    '/service-worker.js'
];

const cacheName = 'cache_1.3';

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Install ServiceWorker');
    event.waitUntil((
        self.caches.open(cacheName)
            .then(cache => cache.addAll(appFiles))
            .then(() => {
                return self.skipWaiting();
            })
    ));
});

self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        self.caches.keys().then(keyList => {
            return keyList.map(key => {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return self.caches.delete(key);
                }
            });
        })
    );
    return self.clients.claim();
});

self.addEventListener('push', (event) => {
    console.log('[ServiceWorker] Push message received', event);
    self.registration.showNotification('Notification received');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        self.caches.match(event.request).then(response => {

            if (response) {
                console.log('[ServiceWorker] Respond from Cache')
            }
            else {
                console.log('[ServiceWorker] Fetch: ', event.request.url);
            }

            return response || self.fetch(event.request);
        })
    );
});
