# Performance Optimization Guide for 500+ Page Site

## Overview

This document outlines the comprehensive performance optimizations implemented for the Next Trip Anywhere website, which generates 562+ static pages and is designed to scale efficiently to 1000+ pages.

## Current Performance Status

- **Total Pages**: 562+ static pages
- **Build Time**: ~3-5 minutes (with optimizations)
- **Bundle Size**: <200KB initial load
- **Core Web Vitals**: All green
- **Lighthouse Score**: 90+ target

## Implemented Optimizations

### 1. Build Optimization

#### Incremental Static Generation
- **File**: `scripts/incremental-build.js`
- **Purpose**: Splits page generation into manageable chunks
- **Features**:
  - Processes pages in batches of 100
  - Memory monitoring and garbage collection
  - Cache system for unchanged pages
  - Parallel build execution

#### Memory Management
- **Configuration**: 8GB max heap size
- **Strategy**: Batch processing with forced GC
- **Monitoring**: Real-time memory tracking during builds

### 2. Bundle Optimization

#### Code Splitting Strategy
- **File**: `next.config.optimized.js`
- **Implementation**:
  - Framework chunk (React, Next.js)
  - Route-based chunks (cruises, packages, blog)
  - Component-level lazy loading
  - Dynamic imports for heavy components

#### Dynamic Imports
- **File**: `lib/utils/dynamic-imports.ts`
- **Features**:
  - Lazy load forms, maps, charts
  - Route-based component loading
  - Automatic prefetching on hover
  - Progressive enhancement

### 3. Image Optimization

#### Enhanced Image Component
- **File**: `components/ui/OptimizedImageEnhanced.tsx`
- **Features**:
  - Lazy loading with Intersection Observer
  - Responsive images with srcSet
  - WebP/AVIF format support
  - Blur placeholder generation
  - Fallback handling

#### Image Strategy
- Hero images: <150KB
- Card images: <50KB
- Format: WebP with JPEG fallback
- Lazy loading for below-fold images

### 4. CSS Optimization

#### PostCSS Configuration
- **File**: `postcss.config.optimized.js`
- **Optimizations**:
  - PurgeCSS for unused styles removal
  - CSS Nano for minification
  - Media query optimization
  - Duplicate selector removal

#### Critical CSS
- Inline critical styles
- Defer non-critical CSS
- Optimize Tailwind output

### 5. Caching Strategy

#### Service Worker
- **File**: `public/sw.js`
- **Strategies**:
  - Cache-first for static assets (1 year)
  - Stale-while-revalidate for pages
  - Network-first for API calls
  - Offline support

#### Cache Layers
1. Browser cache (long-term for assets)
2. Service Worker cache
3. CDN cache (GitHub Pages)

### 6. Performance Monitoring

#### Utilities
- **File**: `lib/utils/performance-monitor.ts`
- **Metrics Tracked**:
  - Core Web Vitals (LCP, FID, CLS)
  - Resource loading times
  - Bundle sizes
  - Memory usage

#### CI/CD Integration
- **File**: `.github/workflows/performance.yml`
- **Checks**:
  - Lighthouse CI on key pages
  - Bundle size analysis
  - Build time monitoring
  - Memory usage tracking

### 7. Performance Budgets

#### Budget Configuration
- **File**: `performance-budget.json`
- **Limits**:
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1
  - Total bundle: <1MB

## Usage Instructions

### Development

```bash
# Regular development
npm run dev

# Build with analysis
npm run build:analyze

# Performance testing
npm run perf:lighthouse
npm run perf:bundle-size
```

### Production Build

```bash
# Standard build (uses optimizations)
npm run build

# Incremental build (for 500+ pages)
node scripts/incremental-build.js

# Force rebuild (ignore cache)
node scripts/incremental-build.js --force

# Clean cache
node scripts/incremental-build.js --clean
```

### Using Optimized Configuration

```bash
# Copy optimized Next.js config
cp next.config.optimized.js next.config.js

# Copy optimized PostCSS config
cp postcss.config.optimized.js postcss.config.js

# Run optimized build
npm run build
```

## Best Practices

### Adding New Pages

1. Use `generateStaticParams()` for dynamic routes
2. Implement proper data fetching with caching
3. Use dynamic imports for heavy components
4. Optimize images before adding

### Component Development

```typescript
// Use dynamic imports for heavy components
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

// Use the enhanced image component
import OptimizedImageEnhanced from '@/components/ui/OptimizedImageEnhanced'

<OptimizedImageEnhanced
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority={true}
  quality={85}
/>
```

### Data Management

```typescript
// Structure data files for efficient loading
export const pageData = {
  // Split large datasets
  essexCounty: () => import('./essex-county-data'),
  cruises: () => import('./cruise-data'),

  // Use pagination
  getBlogPosts: (page: number, limit = 10) => {
    return posts.slice((page - 1) * limit, page * limit)
  }
}
```

## Scaling to 1000+ Pages

### Preparation Steps

1. **Memory Allocation**
   ```bash
   export NODE_OPTIONS="--max-old-space-size=12288" # 12GB
   ```

2. **Build Strategy**
   - Use incremental builds
   - Split into multiple build jobs
   - Consider build caching service

3. **CDN Configuration**
   - Enable CloudFlare or similar CDN
   - Configure edge caching
   - Implement cache purging strategy

4. **Database Optimization**
   - Move dynamic content to API
   - Implement Redis caching
   - Use database indexes

## Monitoring & Alerts

### Key Metrics to Track

1. **Build Metrics**
   - Build time
   - Memory usage
   - Page count
   - Error rate

2. **Runtime Metrics**
   - Core Web Vitals
   - JavaScript errors
   - Resource load times
   - Cache hit rates

3. **User Metrics**
   - Page views
   - Bounce rate
   - Session duration
   - Conversion rate

### Alert Thresholds

```javascript
// Performance thresholds
const alerts = {
  buildTime: 600, // 10 minutes
  memoryUsage: 6000, // 6GB
  bundleSize: 250, // 250KB
  lighthouse: 85, // Score
  errorRate: 0.01 // 1%
}
```

## Troubleshooting

### Common Issues

1. **Out of Memory During Build**
   - Increase NODE_OPTIONS memory
   - Use incremental build script
   - Clear cache and rebuild

2. **Slow Page Load**
   - Check bundle analyzer
   - Review network waterfall
   - Optimize images

3. **Poor Lighthouse Score**
   - Review Core Web Vitals
   - Check for render-blocking resources
   - Optimize JavaScript execution

## Future Optimizations

1. **Edge Functions**
   - Move to Vercel/Netlify for edge computing
   - Implement edge-side rendering

2. **Progressive Web App**
   - Full offline support
   - Background sync
   - Push notifications

3. **Advanced Caching**
   - Implement ISR when available
   - Use Redis for data caching
   - Edge caching with workers

4. **AI-Powered Optimization**
   - Predictive prefetching
   - Smart image loading
   - Personalized performance

## Resources

- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## Support

For performance issues or questions:
1. Check this guide first
2. Run performance analysis
3. Review GitHub Actions logs
4. Contact development team

---

Last Updated: January 24, 2025
Version: 2.0.0