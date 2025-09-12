/**
 * Font optimization utilities for improved Core Web Vitals
 */

/**
 * Preconnect to font origins to reduce connection time
 */
export function preconnectFontOrigins() {
  if (typeof window === 'undefined') {
    return
  }

  const fontOrigins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]

  fontOrigins.forEach(origin => {
    // Add preconnect
    const preconnectLink = document.createElement('link')
    preconnectLink.rel = 'preconnect'
    preconnectLink.href = origin
    preconnectLink.crossOrigin = 'anonymous'
    document.head.appendChild(preconnectLink)

    // Add dns-prefetch as fallback
    const dnsPrefetchLink = document.createElement('link')
    dnsPrefetchLink.rel = 'dns-prefetch'
    dnsPrefetchLink.href = origin
    document.head.appendChild(dnsPrefetchLink)
  })
}

/**
 * Load fonts with optimal settings to prevent layout shift
 */
export function optimizeFontLoading() {
  if (typeof window === 'undefined') {
    return
  }

  // Set font-display: swap for all @font-face rules
  const style = document.createElement('style')
  style.textContent = `
    @font-face {
      font-display: swap;
    }
  `
  document.head.appendChild(style)

  // Use Font Loading API to detect when fonts are loaded
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded')
    })
  }
}

/**
 * Subset fonts for critical text to reduce initial load
 */
export function subsetCriticalFonts() {
  // This would typically be done at build time
  // Here we ensure critical text uses system fonts until custom fonts load
  const criticalTextSelectors = [
    'h1', 'h2', 'h3', 
    '.hero-title', 
    '.cta-button'
  ]

  const style = document.createElement('style')
  style.textContent = `
    ${criticalTextSelectors.join(', ')} {
      font-display: optional;
      font-synthesis: none;
    }
    
    .fonts-loaded ${criticalTextSelectors.join(', .fonts-loaded ')} {
      font-display: swap;
    }
  `
  document.head.appendChild(style)
}

/**
 * Initialize all font optimizations
 */
export function initFontOptimizations() {
  if (typeof window === 'undefined') {
    return
  }

  // Run immediately
  preconnectFontOrigins()
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeFontLoading()
      subsetCriticalFonts()
    })
  } else {
    optimizeFontLoading()
    subsetCriticalFonts()
  }
}