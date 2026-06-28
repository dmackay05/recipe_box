// Notebook — Recipe Box service worker
const CACHE_NAME = 'notebook-cache-v2'; // bumped: activate() will purge the old cache holding the stale 404
const SHELL = [
  './index.html',
  './app.js',
  './usda.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event)=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      // allSettled (not addAll): a single missing file can no longer abort the whole install
      .then(cache => Promise.allSettled(SHELL.map(url => cache.add(url))))
      .then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', (event)=>{
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (event)=>{
  const req = event.request;

  // Network-first for USDA API and Apps Script calls
  if(req.url.includes('api.nal.usda.gov') || req.url.includes('script.google.com')){
    event.respondWith(fetch(req).catch(()=> caches.match(req)));
    return;
  }

  // Cache-first for the shell — but NEVER cache a non-200 response (that's what poisoned it before)
  event.respondWith(
    caches.match(req).then(cached => {
      if(cached) return cached;
      return fetch(req).then(res => {
        if(res.ok && req.method === 'GET'){
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        }
        return res;
      }).catch(()=> cached); // 'cached' is in scope here now — fixes the original ReferenceError
    })
  );
});
