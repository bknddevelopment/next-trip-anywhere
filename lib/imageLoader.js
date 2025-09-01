/**
 * 🎯 What it does: Custom image loader for Next.js Image component on GitHub Pages
 *
 * 📚 In simple words: This is like a GPS for images - it tells the website exactly
 * where to find each image, whether it's stored locally or on another website
 *
 * 🎮 Example - Try this!
 * ```javascript
 * // Local image in development
 * imageLoader({ src: '/hero.jpg' })
 * // Returns: "/hero.jpg"
 *
 * // Local image in production (GitHub Pages)
 * imageLoader({ src: '/hero.jpg' })
 * // Returns: "/next-trip-anywhere/hero.jpg"
 *
 * // External image with optimization
 * imageLoader({
 *   src: 'https://example.com/photo.jpg',
 *   width: 800,
 *   quality: 75
 * })
 * // Returns: "https://example.com/photo.jpg?w=800&q=75"
 * ```
 *
 * 📥 What goes in (parameters):
 * @param {Object} params - Image configuration object
 * @param {string} params.src - The image source URL or path
 * @param {number} [params.width] - Desired image width in pixels
 * @param {number} [params.quality] - Image quality (1-100)
 *
 * 📤 What comes out (returns):
 * @returns {string} The complete URL where the image can be found
 *
 * ⚠️ Watch out for:
 * - Always returns a string URL
 * - Handles both local and external images differently
 * - In production, adds '/next-trip-anywhere' prefix to local images
 * - External images get width and quality as URL parameters
 *
 * 💡 Fun fact: This loader ensures images work correctly on GitHub Pages,
 * which hosts sites in subdirectories instead of the root domain!
 */
export default function imageLoader({ src, width, quality }) {
  // Handle external URLs
  if (src.startsWith('http://') || src.startsWith('https://')) {
    // For external images, return as is with query params
    const url = new URL(src)
    if (width) url.searchParams.set('w', width.toString())
    if (quality) url.searchParams.set('q', quality.toString())
    return url.toString()
  }

  // For local images in production (GitHub Pages)
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? '/next-trip-anywhere' : ''

  // Ensure src starts with /
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`

  // Return the full path
  return `${basePath}${normalizedSrc}`
}
