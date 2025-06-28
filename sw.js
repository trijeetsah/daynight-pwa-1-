
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("day-night-cache").then(cache => {
      return cache.addAll([
        "/daynight-pwa-1-/index.html",
        "/daynight-pwa-1-/day.gif",
        "/daynight-pwa-1-/night.gif",
        "/daynight-pwa-1-/manifest.json",
        "/daynight-pwa-1-/icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
