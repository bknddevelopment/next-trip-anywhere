/**
 * Centralized base path utilities for GitHub Pages deployment
 * Handles both build-time and runtime path detection
 */

// No base path needed when using custom domain
const GITHUB_PAGES_BASE = ''

/**
 * Detects if we're running on GitHub Pages
 * Works both at build time (via NODE_ENV) and runtime (via window.location)
 */
export function isGitHubPages(): boolean {
  // Custom domain doesn't need special path handling
  return false
}

/**
 * Gets the base path for the current environment
 */
export function getBasePath(): string {
  // No base path needed with custom domain
  return ''
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

  // No base path to check with custom domain

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

  // No special path handling for custom domain

  return ''
}

/**
 * Checks if a path needs base path prepending
 * @param path - The path to check
 */
export function needsBasePath(path: string): boolean {
  if (!path) {
    return false
  }

  // External URLs don't need base path
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return false
  }

  // No base path to check with custom domain

  // Check if we're in an environment that needs base path
  return isGitHubPages()
}
