// SW v191
// Раньше здесь было url.split('?')[0] — service worker срезал ?v=NNN и тем
// самым обнулял всю систему версий: страница грузилась, номер версии не
// доходил, и правки «не появлялись». Теперь адрес передаётся целиком.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.url.includes('world.html')) {
    e.respondWith(
      fetch(e.request.url, { cache: 'no-store' }).catch(() => fetch(e.request))
    );
  }
});
