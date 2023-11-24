import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
