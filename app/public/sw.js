/* Babel Flight service worker: lets the installed app open without a connection.
   The app page: network first (always fresh when online), last copy when offline.
   Icons and fonts: cache first. APIs, sign-in and /stats: never cached. */
const CORE_CACHE = 'bf-core-v1';
const FONT_CACHE = 'bf-fonts-v1';
const CORE = ['/', '/favicon.svg', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/apple-touch-icon.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CORE_CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CORE_CACHE && k !== FONT_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (req.mode === 'navigate' && url.pathname === '/') {
      event.respondWith(
        fetch(req)
          .then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CORE_CACHE).then((c) => c.put('/', copy));
            }
            return res;
          })
          .catch(() => caches.match('/')),
      );
      return;
    }
    if (CORE.includes(url.pathname) || url.pathname.startsWith('/icons/')) {
      event.respondWith(caches.match(url.pathname).then((hit) => hit || fetch(req)));
    }
    return; // /api/*, /stats, /privacy … go straight to the network
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then((c) =>
        c.match(req).then((hit) => hit || fetch(req).then((res) => {
          if (res.ok || res.type === 'opaque') c.put(req, res.clone());
          return res;
        })),
      ),
    );
  }
});
