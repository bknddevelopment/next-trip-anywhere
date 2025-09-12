/**
 * Performance configuration and utilities
 * Centralizes all performance optimizations
 */

/**
 * Performance budgets for monitoring
 */
export const PERFORMANCE_BUDGETS = {
  // Core Web Vitals targets
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  INP: 200,  // Interaction to Next Paint (ms)
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
  
  // Resource budgets
  bundleSize: {
    javascript: 200 * 1024, // 200KB
    css: 50 * 1024,         // 50KB
    images: 500 * 1024,     // 500KB per image
    total: 1000 * 1024,     // 1MB total
  },
  
  // Network budgets
  requests: {
    total: 50,
    thirdParty: 10,
  },
}

/**
 * Debounce function for expensive operations
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for rate-limiting
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Request idle callback with fallback
 */
export function requestIdleCallback(
  callback: () => void,
  options?: { timeout?: number }
): number {
  if ('requestIdleCallback' in window) {
    return (window as unknown as IdleCallbackWindow).requestIdleCallback(callback, options)
  }
  
  // Fallback to setTimeout
  return setTimeout(callback, options?.timeout || 1) as unknown as number
}

/**
 * Cancel idle callback with fallback
 */
export function cancelIdleCallback(id: number): void {
  if ('cancelIdleCallback' in window) {
    (window as unknown as IdleCallbackWindow).cancelIdleCallback(id)
  } else {
    clearTimeout(id)
  }
}

/**
 * Optimize scroll performance
 */
interface IdleCallbackWindow {
  requestIdleCallback: (callback: () => void, options?: { timeout?: number }) => number
  cancelIdleCallback: (id: number) => void
}

export function optimizeScrollPerformance(): void {
  if (typeof window === 'undefined') {
    return
  }
  
  // Use passive event listeners for better scroll performance
  let supportsPassive = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true
        return true
      }
    })
    window.addEventListener('testPassive', null as unknown as EventListener, opts)
    window.removeEventListener('testPassive', null as unknown as EventListener, opts)
  } catch {
    // Passive events not supported
  }
  
  const passiveOption = supportsPassive ? { passive: true } : false
  
  // Throttle scroll events
  let ticking = false
  function updateScrollPosition() {
    // Handle scroll-based operations here
    ticking = false
  }
  
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollPosition)
      ticking = true
    }
  }
  
  window.addEventListener('scroll', requestTick, passiveOption)
  window.addEventListener('resize', requestTick, passiveOption)
}

/**
 * Implement virtual scrolling for large lists
 */
export class VirtualScroller {
  private container: HTMLElement
  private items: unknown[]
  private itemHeight: number
  private visibleItems: number
  
  constructor(container: HTMLElement, items: unknown[], itemHeight: number) {
    this.container = container
    this.items = items
    this.itemHeight = itemHeight
    this.visibleItems = Math.ceil(container.clientHeight / itemHeight)
    this.init()
  }
  
  private init() {
    // Implementation of virtual scrolling
    const totalHeight = this.items.length * this.itemHeight
    const scrollElement = document.createElement('div')
    scrollElement.style.height = `${totalHeight}px`
    scrollElement.style.position = 'relative'
    
    this.container.appendChild(scrollElement)
    this.container.addEventListener('scroll', this.handleScroll.bind(this))
    this.render()
  }
  
  private handleScroll() {
    requestAnimationFrame(() => this.render())
  }
  
  private render() {
    const scrollTop = this.container.scrollTop
    const startIndex = Math.floor(scrollTop / this.itemHeight)
    const endIndex = Math.min(
      startIndex + this.visibleItems + 1,
      this.items.length
    )
    
    // Render only visible items
    for (let i = startIndex; i < endIndex; i++) {
      // Render item at position i
    }
  }
}

/**
 * Code splitting utilities
 */
export const lazyLoad = {
  // Lazy load components
  component: (importFn: () => Promise<unknown>) => {
    return typeof window !== 'undefined' 
      ? importFn()
      : Promise.resolve({ default: () => null })
  },
  
  // Lazy load scripts
  script: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
      document.head.appendChild(script)
    })
  },
  
  // Lazy load styles
  style: (href: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.onload = () => resolve()
      link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`))
      document.head.appendChild(link)
    })
  },
}

/**
 * Memory management utilities
 */
export const memoryManager = {
  // Clear unused objects from memory
  clearUnused: () => {
    if (typeof window !== 'undefined' && 'gc' in window) {
      (window as GCWindow).gc()
    }
  },
  
  // Monitor memory usage
  getMemoryUsage: () => {
    if (typeof window !== 'undefined' && (window.performance as PerformanceWithMemory).memory) {
      const memory = (window.performance as PerformanceWithMemory).memory
      return {
        used: memory.usedJSHeapSize,
        total: memory.jsHeapSizeLimit,
        percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
      }
    }
    return null
  },
  
  // Cleanup event listeners
  cleanup: (element: HTMLElement) => {
    const newElement = element.cloneNode(true) as HTMLElement
    element.parentNode?.replaceChild(newElement, element)
    return newElement
  },
}

/**
 * Initialize all performance optimizations
 */
interface GCWindow extends Window {
  gc: () => void
}

interface PerformanceWithMemory extends Performance {
  memory: {
    usedJSHeapSize: number
    jsHeapSizeLimit: number
  }
}

interface LCPEntry extends PerformanceEntry {
  renderTime: number
  loadTime: number
}

export function initPerformanceOptimizations(): void {
  if (typeof window === 'undefined') {
    return
  }
  
  // Optimize scroll performance
  optimizeScrollPerformance()
  
  // Defer non-critical operations
  requestIdleCallback(() => {
    // Load analytics
    if (process.env.NEXT_PUBLIC_GA_ID) {
      lazyLoad.script(`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`)
    }
    
    // Preload next likely navigation
    const links = document.querySelectorAll('a[href^="/"]')
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href')
        if (href) {
          const prefetchLink = document.createElement('link')
          prefetchLink.rel = 'prefetch'
          prefetchLink.href = href
          document.head.appendChild(prefetchLink)
        }
      }, { once: true })
    })
  })
  
  // Monitor performance budget violations
  if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Check against budgets
        if (entry.entryType === 'largest-contentful-paint') {
          const lcp = (entry as LCPEntry).renderTime || (entry as LCPEntry).loadTime
          if (lcp > PERFORMANCE_BUDGETS.LCP) {
            console.warn(`LCP budget exceeded: ${lcp}ms (budget: ${PERFORMANCE_BUDGETS.LCP}ms)`)
          }
        }
      }
    })
    
    perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] })
  }
}