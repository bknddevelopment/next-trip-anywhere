/**
 * Service Worker for Phase 4 Pages
 * Implements caching strategies for optimal performance
 */

const CACHE_NAME = 'phase4-v1'
const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/favicon.ico',
  '/NextTripAnywhere.PNG',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...')

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[ServiceWorker] Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )

  // Skip waiting to activate immediately
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...')

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME &&
                   cacheName !== STATIC_CACHE &&
                   cacheName !== DYNAMIC_CACHE
          })
          .map((cacheName) => {
            console.log('[ServiceWorker] Deleting cache:', cacheName)
            return caches.delete(cacheName)
          })
      )
    })
  )

  // Take control of all pages immediately
  self.clients.claim()
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!request.url.startsWith('http')) {
    return
  }

  // API calls - Network only
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkOnly(request))
    return
  }

  // Static assets - Cache first
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.avif') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2')
  ) {
    event.respondWith(cacheFirst(request))
    return
  }

  // Essex County pages - Stale while revalidate
  if (url.pathname.startsWith('/locations/essex-county/')) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // HTML pages - Network first
  if (
    request.headers.get('accept')?.includes('text/html') ||
    url.pathname === '/'
  ) {
    event.respondWith(networkFirst(request))
    return
  }

  // Default - Network first
  event.respondWith(networkFirst(request))
})

// Caching strategies

// Cache first - for static assets
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE)
  const cached = await cache.match(request)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)

    if (response.ok) {
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    console.error('[ServiceWorker] Fetch failed:', error)
    return new Response('Offline', { status: 503 })
  }
}

// Network first - for HTML pages
async function networkFirst(request) {
  try {
    const response = await fetch(request)

    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    const cached = await caches.match(request)

    if (cached) {
      return cached
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html')
      if (offlinePage) {
        return offlinePage
      }
    }

    return new Response('Offline', { status: 503 })
  }
}

// Network only - for API calls
async function networkOnly(request) {
  try {
    return await fetch(request)
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Network request failed' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// Stale while revalidate - for Essex County pages
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cached = await cache.match(request)

  // Return cached version immediately if available
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  }).catch((error) => {
    console.error('[ServiceWorker] Revalidation failed:', error)
  })

  return cached || fetchPromise
}

// Message handler for cache clearing
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName)
      })
    })
  }
})