/**
 * Service Worker for Next Trip Anywhere
 * Implements advanced caching strategies for 500+ page static site
 */

const CACHE_NAME = 'nta-v2.0.0'
const RUNTIME_CACHE = 'nta-runtime-v1'

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only',
}

// Resource categories and their caching strategies
const RESOURCE_CACHE_CONFIG = {
  // Static assets - cache first
  static: {
    pattern: /\.(js|css|woff2?|ttf|eot|svg|ico)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cacheName: CACHE_NAME,
    maxAge: 365 * 24 * 60 * 60, // 1 year
  },

  // Images - cache first with fallback
  images: {
    pattern: /\.(png|jpg|jpeg|gif|webp|avif)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cacheName: CACHE_NAME,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    maxEntries: 100, // Limit image cache size
  },

  // HTML pages - stale while revalidate
  pages: {
    pattern: /\.html$|\/$/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheName: RUNTIME_CACHE,
    maxAge: 24 * 60 * 60, // 1 day
  },

  // API requests - network first
  api: {
    pattern: /\/api\//,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cacheName: RUNTIME_CACHE,
    maxAge: 5 * 60, // 5 minutes
  },

  // External resources - stale while revalidate
  external: {
    pattern: /^https?:\/\//,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheName: RUNTIME_CACHE,
    maxAge: 60 * 60, // 1 hour
  },
}

// Critical resources to pre-cache
const PRECACHE_URLS = [
  '/',
  '/offline',
  '/manifest.json',
  '/_next/static/chunks/framework.js',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/pages/_app.js',
  '/_next/static/chunks/webpack.js',
  '/fonts/main.woff2',
  '/images/logo.svg',
  '/images/placeholder.jpg',
]

// Install event - pre-cache critical resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker')

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching critical resources')
        return cache.addAll(PRECACHE_URLS).catch((error) => {
          console.error('[SW] Pre-cache failed:', error)
          // Continue installation even if some resources fail
          return Promise.resolve()
        })
      })
      .then(() => {
        console.log('[SW] Installation complete')
        return self.skipWaiting() // Activate immediately
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker')

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName.startsWith('nta-') &&
                cacheName !== CACHE_NAME &&
                cacheName !== RUNTIME_CACHE
            )
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        console.log('[SW] Activation complete')
        return self.clients.claim() // Take control of all pages
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return
  }

  // Determine caching strategy based on resource type
  const strategy = getCachingStrategy(url, request)

  switch (strategy.type) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(cacheFirst(request, strategy))
      break

    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(networkFirst(request, strategy))
      break

    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      event.respondWith(staleWhileRevalidate(request, strategy))
      break

    case CACHE_STRATEGIES.NETWORK_ONLY:
      event.respondWith(fetch(request))
      break

    case CACHE_STRATEGIES.CACHE_ONLY:
      event.respondWith(cacheOnly(request, strategy))
      break

    default:
      event.respondWith(fetch(request))
  }
})

// Caching strategies implementation
async function cacheFirst(request, config) {
  const cache = await caches.open(config.cacheName)
  const cached = await cache.match(request)

  if (cached && !isExpired(cached, config.maxAge)) {
    return cached
  }

  try {
    const response = await fetch(request)

    if (response.ok) {
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    // If network fails and we have a cached version, return it
    if (cached) {
      return cached
    }

    // Return offline page for HTML requests
    if (request.headers.get('accept').includes('text/html')) {
      const offlinePage = await cache.match('/offline')
      if (offlinePage) {
        return offlinePage
      }
    }

    throw error
  }
}

async function networkFirst(request, config) {
  const cache = await caches.open(config.cacheName)

  try {
    const response = await fetch(request)

    if (response.ok) {
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    const cached = await cache.match(request)

    if (cached && !isExpired(cached, config.maxAge)) {
      return cached
    }

    throw error
  }
}

async function staleWhileRevalidate(request, config) {
  const cache = await caches.open(config.cacheName)
  const cached = await cache.match(request)

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  })

  return cached || fetchPromise
}

async function cacheOnly(request, config) {
  const cache = await caches.open(config.cacheName)
  const cached = await cache.match(request)

  if (!cached) {
    throw new Error('Resource not found in cache')
  }

  return cached
}

// Helper functions
function getCachingStrategy(url, request) {
  const pathname = url.pathname

  // Check each resource category
  for (const [key, config] of Object.entries(RESOURCE_CACHE_CONFIG)) {
    if (config.pattern.test(pathname) || (url.origin !== self.location.origin && key === 'external')) {
      return {
        type: config.strategy,
        cacheName: config.cacheName,
        maxAge: config.maxAge,
        maxEntries: config.maxEntries,
      }
    }
  }

  // Default strategy for HTML pages
  if (request.headers.get('accept').includes('text/html')) {
    return {
      type: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
      cacheName: RUNTIME_CACHE,
      maxAge: 60 * 60, // 1 hour
    }
  }

  // Default strategy for other resources
  return {
    type: CACHE_STRATEGIES.NETWORK_FIRST,
    cacheName: RUNTIME_CACHE,
    maxAge: 60 * 60, // 1 hour
  }
}

function isExpired(response, maxAge) {
  if (!maxAge) return false

  const fetchedDate = response.headers.get('date')
  if (!fetchedDate) return false

  const fetchedTime = new Date(fetchedDate).getTime()
  const now = Date.now()

  return now - fetchedTime > maxAge * 1000
}

// Clean up old cache entries periodically
async function cleanupCache() {
  const cacheNames = await caches.keys()

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const requests = await cache.keys()

    for (const request of requests) {
      const response = await cache.match(request)

      // Remove expired entries
      if (response) {
        const maxAge = RESOURCE_CACHE_CONFIG.static.maxAge // Use longest expiry
        if (isExpired(response, maxAge)) {
          await cache.delete(request)
        }
      }
    }
  }
}

// Run cleanup every hour
setInterval(cleanupCache, 60 * 60 * 1000)

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'CLEANUP_CACHE') {
    cleanupCache()
  }

  if (event.data && event.data.type === 'PREFETCH') {
    const urls = event.data.urls || []
    caches.open(RUNTIME_CACHE).then((cache) => {
      cache.addAll(urls)
    })
  }
})

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms())
  }
})

async function syncOfflineForms() {
  // Retrieve stored form data from IndexedDB
  // Send to server when online
  // This is a placeholder - implement based on your form handling
  console.log('[SW] Syncing offline forms')
}

// Push notifications (if needed)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/images/logo-192.png',
    badge: '/images/badge-72.png',
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

console.log('[SW] Service worker loaded')