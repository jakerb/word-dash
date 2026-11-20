/* Retired root service worker. Word Dash moved to /word-dash/ (with its own worker).
   Browsers that installed the old root worker fetch this file on update, then it
   removes its old cache and unregisters itself so the homepage is served normally. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('worddash-shell-')).map(k=>caches.delete(k)));
    await self.registration.unregister();
  })());
});
