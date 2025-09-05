/**
 * @fileoverview Custom hook for managing base paths in GitHub Pages deployment
 * @module useBasePath
 *
 * 🎯 PURPOSE:
 * This hook handles the complexities of deploying a Next.js app to GitHub Pages,
 * which requires a base path (repository name) in production but not in development.
 * It provides utilities to correctly resolve asset paths across different environments.
 *
 * 🧒 SIMPLE EXPLANATION:
 * When you put a website on GitHub Pages, all your images and files need a special
 * prefix (like /next-trip-anywhere/) to work. This hook automatically adds that
 * prefix when needed, so images and assets always show up correctly.
 *
 * 🏗️ ARCHITECTURE:
 * useBasePath Hook
 * ├── Environment Detection (production vs development)
 * ├── Base Path Configuration
 * └── Utility Functions
 *     └── getImageSrc (intelligent path resolution)
 *
 * @example
 * // Basic usage in a component
 * import { useBasePath } from '@/hooks/useBasePath'
 *
 * function MyComponent() {
 *   const { basePath, getImageSrc } = useBasePath()
 *
 *   return (
 *     <img src={getImageSrc('/hero-image.jpg')} alt="Hero" />
 *   )
 * }
 *
 * @example
 * // Handling different path types
 * const { getImageSrc } = useBasePath()
 *
 * // Local asset (will add base path in production)
 * getImageSrc('/logo.png') // → '/next-trip-anywhere/logo.png' (production)
 *
 * // External URL (returned as-is)
 * getImageSrc('https://example.com/image.jpg') // → 'https://example.com/image.jpg'
 *
 * // Path without leading slash (automatically fixed)
 * getImageSrc('images/hero.jpg') // → '/next-trip-anywhere/images/hero.jpg' (production)
 */

'use client'

/**
 * useBasePath Hook
 *
 * @description
 * Provides base path management for GitHub Pages deployment.
 * Automatically detects the environment and applies the correct
 * base path for assets and images.
 *
 * Key Features:
 * 1. **Environment-aware**: Different behavior for dev vs production
 * 2. **Path normalization**: Handles various path formats
 * 3. **External URL support**: Preserves external URLs unchanged
 * 4. **TypeScript support**: Fully typed for better DX
 *
 * @returns {Object} Hook utilities
 * @returns {string} basePath - The base path string (empty in dev, '/repo-name' in prod)
 * @returns {Function} getImageSrc - Function to resolve image paths correctly
 *
 * @performance
 * - No side effects or state management
 * - Lightweight string operations only
 * - Can be called frequently without performance impact
 *
 * @deployment
 * GitHub Pages deployment requires:
 * 1. Repository name as base path
 * 2. All assets served from /repo-name/ subdirectory
 * 3. This hook handles that complexity automatically
 */
export function useBasePath() {
  /**
   * Base path configuration
   *
   * @description
   * In production on GitHub Pages, assets are served from /repository-name/
   * In development, assets are served from the root /
   *
   * Environment detection:
   * - NODE_ENV === 'production': GitHub Pages deployment
   * - NODE_ENV === 'development': Local development server
   *
   * @constant {string} basePath
   */
  const basePath = process.env.NODE_ENV === 'production' ? '/next-trip-anywhere' : ''

  /**
   * Intelligent image source resolver
   *
   * @function getImageSrc
   * @description
   * Processes image paths to ensure they work correctly in all environments.
   * Handles three types of paths:
   * 1. External URLs (http/https) - returned unchanged
   * 2. Absolute paths (/path) - prepended with base path
   * 3. Relative paths (path) - converted to absolute then prepended
   *
   * @param {string} src - The source path to process
   * @returns {string} The correctly resolved path for the current environment
   *
   * @example
   * // In production (GitHub Pages):
   * getImageSrc('/logo.png') // Returns: '/next-trip-anywhere/logo.png'
   * getImageSrc('logo.png')  // Returns: '/next-trip-anywhere/logo.png'
   * getImageSrc('https://cdn.example.com/image.jpg') // Returns: 'https://cdn.example.com/image.jpg'
   *
   * // In development:
   * getImageSrc('/logo.png') // Returns: '/logo.png'
   * getImageSrc('logo.png')  // Returns: '/logo.png'
   *
   * @logic
   * 1. Check if src is external URL → return as-is
   * 2. Normalize path to have leading slash
   * 3. Prepend base path (if in production)
   * 4. Return final path
   */
  const getImageSrc = (src: string): string => {
    // Step 1: Handle external URLs
    // External URLs should never have base path added
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src
    }

    // Step 2: Normalize path
    // Ensure all local paths start with / for consistency
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`

    // Step 3: Apply base path
    // In production, prepend the GitHub Pages base path
    // In development, just return the normalized path
    return `${basePath}${normalizedSrc}`
  }

  /**
   * Hook return value
   *
   * @returns {Object} Utility functions and values
   * @property {string} basePath - Raw base path value for direct usage
   * @property {Function} getImageSrc - Smart path resolver function
   *
   * Usage patterns:
   * - Use `basePath` when you need the raw value
   * - Use `getImageSrc` for all image/asset paths
   */
  return {
    basePath,
    getImageSrc,
  }
}

/**
 * 🔍 COMMON ISSUES & SOLUTIONS:
 *
 * Issue: Images not showing in production
 * Solution: Always use getImageSrc() for local images
 *
 * Issue: External images have wrong path
 * Solution: This hook correctly handles external URLs - check if URL starts with http
 *
 * Issue: Base path applied twice
 * Solution: Only call getImageSrc once per path, don't nest calls
 *
 * Issue: Images work locally but not on GitHub Pages
 * Solution: Ensure NODE_ENV is 'production' in GitHub Pages build
 *
 * 🎓 LEARNING RESOURCES:
 * - GitHub Pages documentation: https://pages.github.com/
 * - Next.js basePath config: https://nextjs.org/docs/api-reference/next.config.js/basepath
 * - Asset optimization: https://nextjs.org/docs/basic-features/image-optimization
 */
