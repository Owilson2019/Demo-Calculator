const urls = ['/', '/index.js', '/index.css']
const cacheName = 'Calculator Cache'

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(urls))
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cachelist => cachelist.forEach(cache => {
            if (cache !== cacheName) {
                caches.delete(cache)
            }
        }))
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).catch(() => fetch(event.request).then((response) => response))
    );
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            fetch(event.request.clone()).then(response => {
                cache.put(event.request.clone(), response)
            })
        })
    );
});