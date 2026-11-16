/* Babel Flight service worker: lets the installed app open without a connection.
   The app page: network first (always fresh when online), last copy when offline.
   Icons and fonts: cache first. APIs, sign-in and /stats: never cached.
   オフライン完全版 (ファースト, babel-flight/parts/f36_offline.js): the page downloads the mock tests, interview
   cards, display-language dictionaries and recorded voices into caches named bf-off-*. Those are kept here, the
   JSON files are then network first (fresh when online, the downloaded copy offline) and the recordings cache first.
   英和辞典 (/dict/en/, babel-flight/parts/f45_dict.js): network first, and every file fetched is kept in bf-off-dict, so a
   word looked up once also works offline (オフライン完全版 can download the whole dictionary into the same cache). */
const CORE_CACHE = 'bf-core-v2';
const FONT_CACHE = 'bf-fonts-v1';
const OFF_PREFIX = 'bf-off-';
const OFF_JSON = /^\/(?:mx|iv|i18n)\/[a-z0-9-]+\.json$/;
const DICT_JSON = /^\/dict\/en\/(?:(?:w|j)\/[a-z0-9_]+|m|meta)\.json$/;
const CORE = ['/', '/favicon.svg', '/manifest.webmanifest', '/icons/app-192.png', '/icons/app-512.png', '/icons/app-touch-180.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CORE_CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CORE_CACHE && k !== FONT_CACHE && !k.startsWith(OFF_PREFIX)).map((k) => caches.delete(k))))
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
    if (OFF_JSON.test(url.pathname) || url.pathname === '/voice/index.json') {
      event.respondWith(
        fetch(req)
          .then((res) => {
            if (res.ok) {
              // a downloaded copy is kept fresh
              const copy = res.clone();
              caches.open(OFF_PREFIX + 'base').then((c) => c.match(url.pathname).then((had) => had && c.put(url.pathname, copy)));
            }
            return res;
          })
          .catch(() => caches.match(url.pathname).then((hit) => hit || Response.error())),
      );
      return;
    }
    if (DICT_JSON.test(url.pathname)) {
      event.respondWith(
        fetch(req)
          .then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(OFF_PREFIX + 'dict').then((c) => c.put(url.pathname, copy));
            }
            return res;
          })
          .catch(() => caches.match(url.pathname).then((hit) => hit || Response.error())),
      );
      return;
    }
    if (url.pathname.startsWith('/voice/') && url.pathname.endsWith('.mp3')) {
      event.respondWith(caches.match(url.pathname).then((hit) => hit || fetch(req)));
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
