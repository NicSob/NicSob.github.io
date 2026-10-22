// The previous site (create-react-app) registered a service worker at this path.
// This replacement clears its caches and unregisters it so returning visitors get the new site.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', async () => {
  const keys = await caches.keys()
  await Promise.all(keys.map((key) => caches.delete(key)))
  await self.registration.unregister()
  const clients = await self.clients.matchAll({ type: 'window' })
  clients.forEach((client) => client.navigate(client.url))
})
