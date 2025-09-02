/**
 * Image path helpers for GitHub Pages deployment
 * These functions handle the correct base path for images when deployed to GitHub Pages
 */

/**
 * Gets the correct image source path based on the environment
 * @param src - The original image source path
 * @returns The corrected path with base path for production
 */
export function getImageSrc(src: string): string {
  // Check if we're on GitHub Pages by looking at the current URL
  if (typeof window !== 'undefined') {
    // Client-side: check the actual URL
    const isGitHubPages = window.location.pathname.startsWith('/next-trip-anywhere')
    if (isGitHubPages && !src.startsWith('/next-trip-anywhere')) {
      return `/next-trip-anywhere${src}`
    }
  } else {
    // Server-side during build: use environment variable
    const isProd = process.env.NODE_ENV === 'production'
    if (isProd && !src.startsWith('/next-trip-anywhere')) {
      return `/next-trip-anywhere${src}`
    }
  }

  return src
}

/**
 * Gets the logo source path
 * @returns The correct path to the logo image
 */
export function getLogoSrc(): string {
  return getImageSrc('/NextTripAnywhere.PNG')
}
