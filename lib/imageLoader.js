/**
 * Custom image loader for Next.js Image component on GitHub Pages
 * This loader ensures images work correctly both locally and on GitHub Pages
 */

// Import the base path utilities
import { normalizePath } from './basePath'

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