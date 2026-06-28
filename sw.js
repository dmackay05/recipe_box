// Notebook — Recipe Box service worker
const CACHE_NAME = 'notebook-cache-v2';
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
  // Network-first for USDA API and Apps Script calls; cache as a fallback only.
  if(req.url.includes('api.nal.usda.gov') || req.url.includes('script.google.com')){
    event.respondWith(fetch(req).catch(()=> caches.match(req)));
    return;
  }

  // Network-first for the app shell itself (HTML/JS/manifest) so code updates
  // show up on next load instead of being stuck behind a stale cached copy.
  // Falls back to cache only when offline.
  const isShellFile = req.url.endsWith('.html') || req.url.endsWith('.js') || req.url.endsWith('.json') || req.mode === 'navigate';
  if(isShellFile){
    event.respondWith(
      fetch(req).then(res=>{
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        return res;
      }).catch(()=> caches.match(req))
    );
    return;
  }

  // Cache-first for everything else (icons, etc.) — these rarely change.
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res=>{
      const resClone = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
      return res;
    }).catch(()=> cached))
  );
});
