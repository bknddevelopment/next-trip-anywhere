/**
 * Optimized Service Worker for Next Trip Anywhere
 * Implements advanced caching strategies for performance
 */

const CACHE_VERSION = 'v2.0.0'
const CACHE_NAMES = {
  static: `static-${CACHE_VERSION}`,
  dynamic: `dynamic-${CACHE_VERSION}`,
  images: `images-${CACHE_VERSION}`,
  fonts: `fonts-${CACHE_VERSION}`,
}

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
]

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, fallback to network
  cacheFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(request)
    if (cached) return cached
    
    try {
      const response = await fetch(request)
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    } catch (error) {
      return new Response('Offline', { status: 503 })
    }
  },
  
  // Network first, fallback to cache
  networkFirst: async (request, cacheName) => {
    try {
      const response = await fetch(request)
      if (response.ok) {
        const cache = await caches.open(cacheName)
        cache.put(request, response.clone())
      }
      return response
    } catch (error) {
      const cached = await caches.match(request)
      return cached || new Response('Offline', { status: 503 })
    }
  },
  
  // Stale while revalidate
  staleWhileRevalidate: async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(request)
    
    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    
    return cached || fetchPromise
  },
}

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAMES.static).then(cache => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => !Object.values(CACHE_NAMES).includes(name))
          .map(name => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') return
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return
  
  // Images - cache first strategy with long TTL
  if (request.destination === 'image' || /\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i.test(url.pathname)) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, CACHE_NAMES.images))
    return
  }
  
  // Fonts - cache first strategy with long TTL
  if (request.destination === 'font' || /\.(woff|woff2|ttf|otf|eot)$/i.test(url.pathname)) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, CACHE_NAMES.fonts))
    return
  }
  
  // Static assets (CSS, JS) - stale while revalidate
  if (/\.(css|js)$/i.test(url.pathname) || url.pathname.includes('/_next/static/')) {
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request, CACHE_NAMES.static))
    return
  }
  
  // API calls - network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request, CACHE_NAMES.dynamic))
    return
  }
  
  // HTML pages - network first with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/offline.html')
      })
    )
    return
  }
  
  // Default - stale while revalidate
  event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request, CACHE_NAMES.dynamic))
})

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms())
  }
})

async function syncOfflineForms() {
  // Implementation for syncing offline form submissions
  const cache = await caches.open('offline-forms')
  const requests = await cache.keys()
  
  for (const request of requests) {
    try {
      const response = await fetch(request)
      if (response.ok) {
        await cache.delete(request)
      }
    } catch (error) {
      console.error('Failed to sync offline form:', error)
    }
  }
}

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update from Next Trip Anywhere!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  }
  
  event.waitUntil(
    self.registration.showNotification('Next Trip Anywhere', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(
    clients.openWindow('https://nexttripanywhere.com')
  )
})