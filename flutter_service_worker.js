'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"main.dart.js": "c3778e54903f966a8dfa67ae0db403f5",
"version.json": "980547175e325fe622a3362b84d55b6a",
"assets/assets/discord.png": "d74865e1094f5ac0a0e782875449ff66",
"assets/assets/steam.png": "c28b6c953d611cd9312bb1bf035092fb",
"assets/assets/github.png": "1dee40f2668d5c719eafa2c89296f5e7",
"assets/assets/images/20221023081459_IMG_0712.JPG": "e97fec12414b83d08dc187a28570e121",
"assets/assets/images/IMG_0738.JPG": "569190e484e7153c16d3edc91eec4186",
"assets/assets/images/IMG_0740.JPG": "436c68af3cb63fb8dddc107330ea1791",
"assets/assets/images/IMG_0804.JPG": "a1e34111edd096b8fecb84d3ad286b45",
"assets/assets/images/IMG_0815.JPG": "9c433590385c907b15e2b8f5d5545ab8",
"assets/assets/images/IMG_0924.JPG": "161034440b7ae05e96fc87c6e761a42b",
"assets/assets/images/IMG_0955.JPG": "6a8921f63837ad3f27de87847cf66dc2",
"assets/assets/images/IMG_1031.JPG": "bb22b81403a0541baf86ab61387950c2",
"assets/assets/images/IMG_1069.JPG": "6783426b8e07113fddcf216f9f4eef13",
"assets/assets/images/IMG_1105.JPG": "e5f8baecf942cd105475575b60c41333",
"assets/assets/images/IMG_1130.JPG": "e3c3f253dc744a1933665087cb5faab8",
"assets/assets/images/IMG_1179.JPG": "955c965e897dfe9680279df07c13eab1",
"assets/assets/images/IMG_1182.JPG": "7cbb2e857d945ee59fee438396df713b",
"assets/assets/images/IMG_20230628_101614298.jpg": "5796a731cb70e2065a93c8256504e500",
"assets/assets/images/IMG_20240115_184957166.jpg": "91ed5202432c9850a16d543900b947aa",
"assets/assets/images/IMG_1535.jpg": "302d6cd9723b30cddea390edf238cd3f",
"assets/assets/images/IMG_1539.JPG": "fc0e61a94775f83438fab0a93a1016f2",
"assets/assets/images/IMG_1541.JPG": "7246d4daf36c2729059dcbb8840d10d5",
"assets/fonts/JetBrainsMono-Regular.ttf": "b678c7a6800a9d944ae8342905c07cb7",
"assets/fonts/JetBrainsMono-Bold.ttf": "f855a5300fbbb56439586d4ca8a131b2",
"assets/fonts/JetBrainsMono-Italic.ttf": "36bd1aff2f1b3231b440c2d0b2715a8e",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.json": "77f3f1142ce6436d9c7d1bfb5b0b217c",
"assets/AssetManifest.bin.json": "f09e1232a1316c1f0d44355ee6cdb317",
"assets/AssetManifest.bin": "be71102908803694d3fd3d404d8efb32",
"assets/NOTICES": "77f725cfffd3a47322669bdbce4fb924",
"assets/FontManifest.json": "40ad8b53c4c9dfba17c30a26fcb1cc71",
"manifest.json": "90c454c29b48f08bc06627d125f70466",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter_bootstrap.js": "2a3e044495167b4513067ff1be46df3f",
"index.html": "ac1dca0f29281cf1da6ca97f8e395fb3",
"/": "ac1dca0f29281cf1da6ca97f8e395fb3"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
