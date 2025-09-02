/**
 * Centralized base path utilities for GitHub Pages deployment
 * Handles both build-time and runtime path detection
 */

// GitHub Pages base path (case-sensitive, matches actual deployment)
const GITHUB_PAGES_BASE = '/Next-Trip-Anywhere'

/**
 * Detects if we're running on GitHub Pages
 * Works both at build time (via NODE_ENV) and runtime (via window.location)
 */
export function isGitHubPages(): boolean {
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
    // Check both cases for maximum compatibility
    return pathname.startsWith('/Next-Trip-Anywhere') || 
           pathname.toLowerCase().startsWith('/next-trip-anywhere')
  }

  return false
}

/**
 * Gets the base path for the current environment
 */
export function getBasePath(): string {
  // Use environment variable if available (most reliable)
  if (process.env.NEXT_PUBLIC_BASE_PATH) {
    return process.env.NEXT_PUBLIC_BASE_PATH
  }

  return isGitHubPages() ? GITHUB_PAGES_BASE : ''
}

/**
 * Normalizes a path to include the base path if needed
 * @param path - The path to normalize
 * @param forceRuntime - Force runtime detection (useful for dynamic content)
 */
export function normalizePath(path: string, forceRuntime = false): string {
  // Handle external URLs - pass through unchanged
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path
  }

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  // Check if path already includes the base (case-insensitive check)
  const lowerPath = normalizedPath.toLowerCase()
  if (lowerPath.startsWith('/next-trip-anywhere')) {
    // If it's lowercase, fix the case
    if (normalizedPath.startsWith('/next-trip-anywhere')) {
      return normalizedPath.replace('/next-trip-anywhere', '/Next-Trip-Anywhere')
    }
    return normalizedPath
  }

  // Runtime detection for client-side
  if (forceRuntime && typeof window !== 'undefined') {
    const basePath = getRuntimeBasePath()
    return basePath ? `${basePath}${normalizedPath}` : normalizedPath
  }

  // Use standard detection
  const basePath = getBasePath()
  return basePath ? `${basePath}${normalizedPath}` : normalizedPath
}

/**
 * Gets the runtime base path from window.location
 * This is useful for dynamic image loading
 */
export function getRuntimeBasePath(): string {
  if (typeof window === 'undefined') {
    return getBasePath()
  }

  const pathname = window.location.pathname
  
  // Check for GitHub Pages deployment (case-sensitive first)
  if (pathname.startsWith('/Next-Trip-Anywhere')) {
    return '/Next-Trip-Anywhere'
  }
  
  // Also check lowercase variant and return the correct case
  if (pathname.toLowerCase().startsWith('/next-trip-anywhere')) {
    return '/Next-Trip-Anywhere'
  }

  return ''
}

/**
 * Checks if a path needs base path prepending
 * @param path - The path to check
 */
export function needsBasePath(path: string): boolean {
  if (!path) return false
  
  // External URLs don't need base path
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return false
  }
  
  // Already has base path (case-insensitive check)
  const lowerPath = path.toLowerCase()
  if (lowerPath.startsWith('/next-trip-anywhere')) {
    return false
  }
  
  // Check if we're in an environment that needs base path
  return isGitHubPages()
}