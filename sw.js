// SW v188
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('world.html'))
  e.respondWith(fetch(e.request.url.split('?')[0],{cache:'no-store'}).catch(()=>fetch(e.request)));
});