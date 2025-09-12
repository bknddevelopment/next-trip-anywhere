/**
 * Custom image loader for Next.js Image component on GitHub Pages
 * This loader ensures images work correctly both locally and on GitHub Pages
 */

// GitHub Pages base path (case-sensitive, matches actual deployment)
const GITHUB_PAGES_BASE = '/next-trip-anywhere'

/**
 * Detects if we're running on GitHub Pages
 * Works both at build time (via NODE_ENV) and runtime (via window.location)
 */
function isGitHubPages() {
  // Check environment variable first (most reliable)
  if (process.env.NEXT_PUBLIC_BASE_PATH) {
    return true
  }

  // Build-time detection
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
    return true
  }

  // Runtime detection (for client-side)
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    // Check for GitHub Pages deployment
    return pathname.startsWith('/next-trip-anywhere')
  }

  return false
}

/**
 * Gets the base path for the current environment
 */
function getBasePath() {
  // Use environment variable if available (most reliable)
  if (process.env.NEXT_PUBLIC_BASE_PATH) {
    return process.env.NEXT_PUBLIC_BASE_PATH
  }

  return isGitHubPages() ? GITHUB_PAGES_BASE : ''
}

/**
 * Normalizes a path to include the base path if needed
 */
function normalizePath(path) {
  // Handle external URLs - pass through unchanged
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path
  }

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  // Check if path already includes the base
  if (normalizedPath.startsWith('/next-trip-anywhere')) {
    return normalizedPath
  }

  // Use standard detection
  const basePath = getBasePath()
  return basePath ? `${basePath}${normalizedPath}` : normalizedPath
}

export default function imageLoader({ src, width, quality }) {
  // Handle external URLs - pass them through with optional params
  if (src.startsWith('http://') || src.startsWith('https://')) {
    const url = new URL(src)
    if (width) url.searchParams.set('w', width.toString())
    if (quality) url.searchParams.set('q', quality.toString())
    return url.toString()
  }

  // Use the centralized path normalization
  // This handles both build-time and runtime detection
  return normalizePath(src)
}
