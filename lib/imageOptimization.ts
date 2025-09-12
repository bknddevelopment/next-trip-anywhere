/**
 * Image optimization utilities for improved performance
 */

/**
 * Generate optimized image URLs with WebP/AVIF support
 */
export function getOptimizedImageUrl(src: string, options?: {
  width?: number
  quality?: number
  format?: 'webp' | 'avif' | 'auto'
}) {
  // For external images from Unsplash
  if (src.includes('unsplash.com')) {
    const params = new URLSearchParams({
      w: String(options?.width || 1920),
      q: String(options?.quality || 75),
      fm: options?.format === 'avif' ? 'avif' : 'webp',
      fit: 'crop',
      auto: 'format,compress',
    })
    
    // Remove existing parameters and add optimized ones
    const baseUrl = src.split('?')[0]
    return `${baseUrl}?${params.toString()}`
  }
  
  // For other external images
  if (src.startsWith('http')) {
    return src
  }
  
  // For local images
  return src
}

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(src: string, sizes: number[] = [640, 768, 1024, 1280, 1920]) {
  return sizes
    .map(size => `${getOptimizedImageUrl(src, { width: size })} ${size}w`)
    .join(', ')
}

/**
 * Get optimal image sizes attribute based on layout
 */
export function getImageSizes(layout: 'full' | 'container' | 'half' | 'third' = 'full') {
  const sizesMap = {
    full: '100vw',
    container: '(max-width: 1280px) 100vw, 1280px',
    half: '(max-width: 768px) 100vw, 50vw',
    third: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  }
  
  return sizesMap[layout]
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(images: string[]) {
  if (typeof window === 'undefined') {
    return
  }
  
  images.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = getOptimizedImageUrl(src, { width: 1920, format: 'webp' })
    link.type = 'image/webp'
    
    // Add imagesrcset for responsive preloading
    const srcset = generateSrcSet(src)
    if (srcset) {
      link.setAttribute('imagesrcset', srcset)
      link.setAttribute('imagesizes', '100vw')
    }
    
    document.head.appendChild(link)
  })
}

/**
 * Lazy load images with native loading API
 */
export function setupLazyLoading() {
  if (typeof window === 'undefined') {
    return
  }
  
  // Check for native lazy loading support
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[data-lazy]')
    images.forEach(img => {
      img.setAttribute('loading', 'lazy')
    })
  } else {
    // Fallback to Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.dataset.src
          if (src) {
            img.src = src
            img.removeAttribute('data-src')
            observer.unobserve(img)
          }
        }
      })
    }, {
      rootMargin: '50px',
    })
    
    const images = document.querySelectorAll('img[data-src]')
    images.forEach(img => imageObserver.observe(img))
  }
}

/**
 * Convert image to WebP format using canvas (client-side)
 */
export async function convertToWebP(imageUrl: string, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }
      
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob))
          } else {
            reject(new Error('Failed to convert image'))
          }
        },
        'image/webp',
        quality
      )
    }
    
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = imageUrl
  })
}

/**
 * Initialize all image optimizations
 */
export function initImageOptimizations() {
  if (typeof window === 'undefined') {
    return
  }
  
  // Setup lazy loading
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLazyLoading)
  } else {
    setupLazyLoading()
  }
  
  // Preload hero images
  const heroImages = [
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80',
    'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=1920&q=80',
  ]
  preloadCriticalImages(heroImages)
}