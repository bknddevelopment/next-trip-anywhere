/**
 * Phase 4 Performance Configuration
 * Optimizations for all 106 new pages
 */

// Performance targets based on Core Web Vitals
export const PHASE4_PERFORMANCE_TARGETS = {
  LCP: 2500, // Largest Contentful Paint < 2.5s
  FID: 100, // First Input Delay < 100ms
  CLS: 0.1, // Cumulative Layout Shift < 0.1
  FCP: 1800, // First Contentful Paint < 1.8s
  TTFB: 600, // Time to First Byte < 600ms
  INP: 200, // Interaction to Next Paint < 200ms
}

// Critical resources for Phase 4 pages
export const CRITICAL_RESOURCES = {
  fonts: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
  scripts: ['https://www.googletagmanager.com'],
  images: ['/images/essex-county/'],
}

// Optimization strategies for different page sections
export const OPTIMIZATION_STRATEGIES = {
  // Above-the-fold content
  aboveFold: {
    loading: 'eager',
    priority: true,
    ssr: true,
    prefetch: false,
  },
  // Interactive elements
  interactive: {
    loading: 'lazy',
    priority: false,
    ssr: true,
    prefetch: false,
  },
  // Below-the-fold content
  belowFold: {
    loading: 'lazy',
    priority: false,
    ssr: false,
    prefetch: false,
  },
  // Footer and non-critical
  nonCritical: {
    loading: 'lazy',
    priority: false,
    ssr: false,
    prefetch: false,
  },
}

// Bundle splitting configuration
export const BUNDLE_CONFIG = {
  // Components to lazy load
  lazyComponents: [
    'ServiceDetails',
    'OtherServices',
    'ContactSection',
    'PopularDestinations',
    'NearbyCities',
  ],
  // Components to inline (critical path)
  inlineComponents: ['HeroSection', 'ServiceInfo', 'Breadcrumb'],
  // Third-party scripts to defer
  deferredScripts: ['google-analytics', 'facebook-pixel', 'hotjar'],
}

// Image optimization presets for Phase 4
export const IMAGE_PRESETS = {
  hero: {
    sizes: '100vw',
    quality: 90,
    priority: true,
    placeholder: 'blur',
  },
  thumbnail: {
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    quality: 80,
    priority: false,
    placeholder: 'blur',
  },
  icon: {
    sizes: '64px',
    quality: 95,
    priority: false,
    placeholder: 'empty',
  },
}

// Cache configuration for static assets
export const CACHE_CONFIG = {
  images: {
    maxAge: 31536000, // 1 year
    swr: 86400, // 1 day stale-while-revalidate
  },
  fonts: {
    maxAge: 31536000, // 1 year
    immutable: true,
  },
  styles: {
    maxAge: 86400, // 1 day
    swr: 3600, // 1 hour stale-while-revalidate
  },
  scripts: {
    maxAge: 86400, // 1 day
    swr: 3600, // 1 hour stale-while-revalidate
  },
}

// Service worker configuration for offline support
export const SERVICE_WORKER_CONFIG = {
  enabled: true,
  strategies: {
    '/': 'NetworkFirst',
    '/locations/essex-county/*': 'CacheFirst',
    '/api/*': 'NetworkOnly',
    '/_next/static/*': 'CacheFirst',
    '/images/*': 'CacheFirst',
  },
  cacheName: 'phase4-v1',
  expirationDays: 30,
}

// Monitoring configuration
export const MONITORING_CONFIG = {
  enabled: process.env.NODE_ENV === 'production',
  sampleRate: 0.1, // 10% of users
  metrics: ['LCP', 'FID', 'CLS', 'FCP', 'TTFB', 'INP'],
  customEvents: ['page_view', 'cta_click', 'form_submit', 'phone_click'],
}

// Prefetch configuration for improved navigation
export const PREFETCH_CONFIG = {
  // Pages to prefetch on hover
  onHover: ['/book', '/contact'],
  // Pages to prefetch in idle time
  onIdle: ['/essex-county', '/services'],
  // Never prefetch these patterns
  exclude: ['/api/*', '/admin/*', '*.pdf'],
}

// Critical CSS for Phase 4 pages
export const CRITICAL_CSS = `
  /* Reset and base styles */
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; }

  /* Hero section */
  .hero-section {
    min-height: 50vh;
    position: relative;
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  }

  /* Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Grid system */
  .grid {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .hero-section { min-height: 60vh; }
    .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  }

  @media (min-width: 1024px) {
    .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  }

  /* Typography */
  h1 { font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem; }
  h2 { font-size: 2rem; font-weight: 700; margin: 0 0 1rem; }
  h3 { font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem; }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
  }

  .btn-primary {
    background: #f97316;
    color: white;
  }

  .btn-primary:hover {
    background: #ea580c;
  }

  /* Loading states */
  .skeleton {
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

// Export configuration helper
export function getPhase4Config() {
  return {
    performance: PHASE4_PERFORMANCE_TARGETS,
    resources: CRITICAL_RESOURCES,
    optimization: OPTIMIZATION_STRATEGIES,
    bundles: BUNDLE_CONFIG,
    images: IMAGE_PRESETS,
    cache: CACHE_CONFIG,
    serviceWorker: SERVICE_WORKER_CONFIG,
    monitoring: MONITORING_CONFIG,
    prefetch: PREFETCH_CONFIG,
    criticalCSS: CRITICAL_CSS,
  }
}
