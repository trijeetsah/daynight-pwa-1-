
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("day-night-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "day.gif",
        "night.gif",
        "manifest.json"
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
