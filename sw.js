// Notebook — Recipe Box service worker
const CACHE_NAME = 'notebook-cache-v1';
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
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL)).then(()=> self.skipWaiting())
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
  // Network-first for USDA API and Apps Script calls; cache-first for shell
  if(req.url.includes('api.nal.usda.gov') || req.url.includes('script.google.com')){
    event.respondWith(fetch(req).catch(()=> caches.match(req)));
    return;
  }
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res=>{
      const resClone = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
      return res;
    }).catch(()=> cached))
  );
});
