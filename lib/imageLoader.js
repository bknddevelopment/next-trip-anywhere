/**
 * Custom image loader for Next.js Image component on GitHub Pages
 * FIXED VERSION: Handles SSG/SSR correctly
 */

export default function imageLoader({ src, width, quality }) {
  // Handle external URLs
  if (src.startsWith('http://') || src.startsWith('https://')) {
    const url = new URL(src)
    if (width) url.searchParams.set('w', width.toString())
    if (quality) url.searchParams.set('q', quality.toString())
    return url.toString()
  }

  // CRITICAL FIX: Use hardcoded production path for GitHub Pages
  // This ensures SSG generates correct paths at build time
  const isProd = process.env.NODE_ENV === 'production'
  
  // For production builds, ALWAYS add the basePath
  if (isProd) {
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`
    // Remove duplicate basePath if it exists
    const cleanSrc = normalizedSrc.replace(/^\/next-trip-anywhere/, '')
    return `/next-trip-anywhere${cleanSrc}`
  }
  
  // For development, return as-is
  return src.startsWith('/') ? src : `/${src}`
}