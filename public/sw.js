// Secure LinkVault service worker
//
// Previous version was cache-first with a fixed cache name ('linkvault-v1'),
// caching '/' and '/index.html' forever. Because the cache name never changed,
// the activate-time cleanup never ran, so an installed PWA kept serving a stale
// index.html pointing at an old JS bundle. Result: deploys were invisible to
// the installed app — ContractorOS was live on the server but missing in the
// launcher.
//
// Strategy now:
//   - HTML / navigation  -> network-first, cache only as an offline fallback.
//     index.html must always be fresh because it names the hashed bundle.
//   - hashed assets      -> cache-first, safe because the filename changes on
//     every build.
//   - cache name carries a build stamp so old caches are evicted on activate.

const CACHE_NAME = 'linkvault-2026-08-25';
const OFFLINE_URLS = ['/', '/index.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => (name === CACHE_NAME ? null : caches.delete(name)))
      )
    )
  );
  self.clients.claim();
});

function isHtmlRequest(request) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html');
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  // Always try the network first for HTML so a new deploy is picked up.
  if (isHtmlRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((hit) => hit || caches.match('/index.html'))
        )
    );
    return;
  }

  // Hashed build assets are immutable — cache-first is safe and fast.
  event.respondWith(
    caches.match(request).then((hit) => {
      if (hit) return hit;
      return fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});

// Lets the page tell a waiting worker to take over immediately.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
