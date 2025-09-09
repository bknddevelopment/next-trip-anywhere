import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for performance and security headers
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const url = request.nextUrl
  
  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com",
    "media-src 'self' https://cdn.coverr.co",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', csp)
  
  // Cache control headers based on resource type
  const pathname = url.pathname
  
  // Static assets - long cache
  if (pathname.match(/\.(ico|jpg|jpeg|png|gif|webp|avif|svg|woff|woff2|ttf|eot|otf)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  // CSS and JS - long cache with revalidation
  else if (pathname.match(/\.(css|js)$/) || pathname.includes('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  // HTML pages - short cache with revalidation
  else if (pathname.match(/\.html$/) || pathname === '/') {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
  }
  // API routes - no cache
  else if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  }
  // Default - stale while revalidate
  else {
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  }
  
  // Compression hints
  response.headers.set('Accept-Encoding', 'gzip, deflate, br')
  
  // Connection optimization
  response.headers.set('Connection', 'keep-alive')
  response.headers.set('Keep-Alive', 'timeout=5, max=1000')
  
  // Early hints for critical resources (103 Early Hints)
  if (pathname === '/') {
    response.headers.set('Link', [
      '</fonts/inter-var.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
      '</fonts/montserrat-700.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
      '<https://fonts.googleapis.com>; rel=preconnect',
      '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
      '<https://images.unsplash.com>; rel=preconnect; crossorigin',
    ].join(', '))
  }
  
  return response
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/image|favicon.ico).*)',
  ],
}