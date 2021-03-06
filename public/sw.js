const staticCache = "dev-coffee-site-v1"
const assets = [
  "/",
  "/index.html",
  "/build/bundle.js",
  "/build/bundle.css",
  '/build/onsenui.min.js'
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticCache).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})