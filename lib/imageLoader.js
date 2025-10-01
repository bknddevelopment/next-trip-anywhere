/**
 * Custom image loader for Next.js Image component with priority loading
 * Optimized for static export with responsive image handling
 * This loader ensures images work correctly both locally and in production
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

/**
 * Determines if an image should use priority loading based on path
 * Hero images and above-fold images should be prioritized
 */
export function shouldPrioritizeImage(src) {
  if (!src) return false

  const priorityPatterns = [
    '/hero', // Hero images
    '/featured', // Featured images
    '/banner', // Banner images
    '-hero.', // Files with -hero in name
  ]

  return priorityPatterns.some((pattern) => src.includes(pattern))
}

/**
 * Enhanced image loader with responsive sizing support
 */
export default function imageLoader({ src, width, quality }) {
  // Handle external URLs - pass them through with optional params
  if (src.startsWith('http://') || src.startsWith('https://')) {
    const url = new URL(src)
    if (width) url.searchParams.set('w', width.toString())
    if (quality) url.searchParams.set('q', quality.toString())
    return url.toString()
  }

  // Use the centralized path normalization
  // For static export, we serve images as-is but can add hints for browser
  const normalizedSrc = normalizePath(src)

  // Note: In static export mode, actual image optimization happens at build time
  // The quality and width parameters serve as hints for the browser
  // Consider using responsive images with <picture> or srcSet for production

  return normalizedSrc
}

/**
 * Get responsive image sizes for different breakpoints
 * Used with the sizes prop on Next Image component
 */
export function getResponsiveSizes(type = 'default') {
  const sizeConfigs = {
    hero: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px',
    card: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px',
    full: '100vw',
    half: '(max-width: 768px) 100vw, 50vw',
    third: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    default: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px',
  }

  return sizeConfigs[type] || sizeConfigs.default
}
