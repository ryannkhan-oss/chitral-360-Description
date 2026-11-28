const CACHE_NAME="chitral360-v2";
const SHELL=["./","./index.html","./styles.css","./app.js"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{
 const req=event.request;if(req.method!=="GET")return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE_NAME),cached=await cache.match(req);
  try{const response=await fetch(req);if(response.ok||response.type==="opaque"){cache.put(req,response.clone()).catch(()=>{});}return response;}
  catch(error){if(cached)return cached;if(req.mode==="navigate")return cache.match("./index.html");throw error;}
 })());
});
