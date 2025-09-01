'use client'

// Hook to get the base path for assets
export function useBasePath() {
  // In production on GitHub Pages, we need the base path
  const basePath = process.env.NODE_ENV === 'production' ? '/next-trip-anywhere' : ''

  const getImageSrc = (src: string) => {
    // If src is an external URL, return as is
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src
    }
    // If src doesn't start with /, add it
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`
    // Return with base path
    return `${basePath}${normalizedSrc}`
  }

  return {
    basePath,
    getImageSrc,
  }
}
