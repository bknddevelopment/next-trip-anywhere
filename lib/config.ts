/**
 * 🎯 What it does: Configuration utilities for handling paths in different environments
 *
 * 📚 In simple words: This file helps the website know where to find images and files
 * whether it's running on your computer (development) or on GitHub Pages (production)
 *
 * 💡 Fun fact: GitHub Pages hosts sites in subdirectories, so we need to add
 * '/next-trip-anywhere' to all paths in production, but not in development!
 */

/**
 * 🎯 What it does: Gets the base path for the application
 *
 * 📚 In simple words: Like getting the right address - on your computer it's just "/",
 * but on GitHub Pages it needs "/next-trip-anywhere" in front
 *
 * 🎮 Example - Try this!
 * ```typescript
 * const basePath = getBasePath()
 * // Development: returns ""
 * // Production: returns "/next-trip-anywhere"
 * ```
 *
 * 📤 What comes out (returns):
 * - Empty string "" in development (your computer)
 * - "/next-trip-anywhere" in production (GitHub Pages)
 *
 * ⚠️ Watch out for:
 * - This affects ALL paths in the application
 * - Must match the repository name on GitHub
 */
export const getBasePath = () => {
  // No base path needed when using custom domain
  return ''
}

/**
 * 🎯 What it does: Converts any path to include the correct base path
 *
 * 📚 In simple words: Takes a path like "/images/logo.png" and adds the GitHub Pages
 * prefix if needed, so the image loads correctly
 *
 * 🎮 Example - Try this!
 * ```typescript
 * // In development
 * getAssetPath('/images/hero.jpg') // Returns: "/images/hero.jpg"
 *
 * // In production
 * getAssetPath('/images/hero.jpg') // Returns: "/next-trip-anywhere/images/hero.jpg"
 *
 * // Works with or without leading slash
 * getAssetPath('images/hero.jpg') // Also works!
 * ```
 *
 * 📥 What goes in (parameters):
 * - path: The file path you want to use (like "/images/logo.png")
 *
 * 📤 What comes out (returns):
 * - The complete path with the right prefix for the environment
 *
 * ⚠️ Watch out for:
 * - Always use this for images, CSS, and JS files
 * - Don't use for external URLs (like https://...)
 */
export const getAssetPath = (path: string) => {
  const basePath = getBasePath()
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${normalizedPath}`
}

/**
 * 🎯 What it does: Central configuration object for the application
 *
 * 📚 In simple words: Like a settings menu that tells the app how to behave
 *
 * 🎮 Example - Try this!
 * ```typescript
 * import { config } from '@/lib/config'
 *
 * if (config.isProd) {
 *   console.log('Running in production!')
 * }
 *
 * const imageUrl = `${config.basePath}/images/logo.png`
 * ```
 *
 * 📤 Properties:
 * - basePath: The base URL path for the application
 * - isProd: True if running in production, false in development
 */
export const config = {
  basePath: getBasePath(),
  isProd: process.env.NODE_ENV === 'production',
}
