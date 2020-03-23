
const filesToCache = [
    "/",
    "/index.html",
    "/manifest.webmanifest",
    "/styles.css",
    "/index.js",
    "/db.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

const transCache = "v1";
const RUNTIME = "runtime";


/// Install event to cache files ///////////////////
self.addEventListener("install", event => {
    console.log("Service Worker: Installed");
    event.waitUntil(
        caches
            .open(transCache)
            .then(cache => {
                console.log(`Service Worker: Caching Files`);
                cache.addAll(filesToCache)
            })
            .then(() => self.skipWaiting())
    );
});


/// Activate event to cache files ///////////////////
self.addEventListener("activate", event => {
    console.log("Service Worker: Activated");
    // const currentCaches = [transCache, RUNTIME];
    // Remove unwanted caches //////
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== transCache) {
                        console.log("Service Worker: Clearing Old Cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


// Fetch event for cache files //////////////////////
self.addEventListener("fetch", event => {
    console.log("Service Worker: Fetching");
    if (event.request.url.includes("/api")) {
        console.log("Service Worker: Attempting api fetch from db")
        event.respondWith(
            caches.open(transCache).then(cache => {
                return fetch(event.request)
                    .then(response => {
                        if (response) {
                            console.log("Service Worker: Fetch response ok")
                            cache.put(event.request.url, response.clone());
                        }
                        return response;
                    })

            })
        )
    }
})

        // fetch(event.request).catch(() => caches.match(event.request))


//                 return caches.open(RUNTIME).then(cache => {
//                     return fetch(event.request).then(response => {
//                         return cache.put(event.request, response.clone()).then(() => {
//                             return response;
//                         })
//                     })
//                 })
//             })
//         )
//     }
// })

