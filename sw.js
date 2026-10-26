var CACHE='btv-v17';
var FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(u.origin!==location.origin)return; /* video y librerías van directo a la red */
  e.respondWith(fetch(e.request,{cache:'no-cache'}).catch(function(){return caches.match(e.request)}));
});
