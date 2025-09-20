/**
 * Custom image loader for Next.js Image component
 * This loader ensures images work correctly both locally and in production (custom domain)
 */

/**
 * Gets the base path for the current environment
 * No base path needed when using custom domain (nexttripanywhere.com)
 */
function getBasePath() {
  // No base path needed with custom domain
  return ''
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

  // No base path to prepend with custom domain
  return normalizedPath
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
  // Note: quality parameter is ignored for local images in static export mode
  // since images are not dynamically optimized
  return normalizePath(src)
}
