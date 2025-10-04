# 🎯 Performance Fix Plan - Critical Issues

## 🔴 Critical Issues Identified

### Issue 1: Framer Motion Dependency Warning

**Error**: `Module not found: Can't resolve '@emotion/is-prop-valid'`
**Impact**: Build warning, potential runtime issues
**Fix**: Install missing peer dependency

```bash
npm install @emotion/is-prop-valid @emotion/styled
```

### Issue 2: Layout Bundle Bloat (1.49 MB)

**Current**: app/layout loads 11 components synchronously
**Target**: Reduce to <500 KB (66% reduction needed)
**Root Cause**: All monitoring, analytics, and non-critical components loaded in root layout

**Components loaded in layout.tsx**:

1. ✅ Header - Keep (critical, above fold)
2. ✅ Footer - Keep (critical for SEO)
3. ✅ Toaster - Keep (lightweight UI feedback)
4. ❌ ServiceWorkerRegistration - LAZY LOAD (non-critical)
5. ❌ PerformanceMonitor - LAZY LOAD (analytics)
6. ❌ CoreWebVitalsMonitor - LAZY LOAD (analytics)
7. ❌ PerformanceInit - LAZY LOAD (analytics)
8. ❌ ResourceHints - LAZY LOAD (optimization hints)
9. ❌ GoogleTagManager - LAZY LOAD (3rd party)
10. ❌ GoogleAnalytics - ALREADY SUSPENDED (good!)
11. ❌ CookieConsent - LAZY LOAD (non-critical UI)

### Issue 3: Main Entrypoint Size (875 KB)

**Current**: 875 KB across 40+ chunks
**Target**: <500 KB (43% reduction needed)
**Fix**: Optimize webpack chunking strategy

### Issue 4: Build Manifest Size (1000 KB)

**Current**: 1000 KB with 615 pages
**Expected**: Normal for large sites, but optimize chunking
**Fix**: Better route grouping and shared chunks

## 🛠️ Implementation Plan

### Phase 1: Quick Wins (Today)

#### Fix 1.1: Install Missing Dependencies

```bash
npm install @emotion/is-prop-valid @emotion/styled --save
```

**Time**: 2 minutes
**Impact**: Eliminates build warning

#### Fix 1.2: Lazy Load Non-Critical Layout Components

Convert 7 synchronous imports to dynamic imports:

```typescript
// Before (in app/layout.tsx)
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import PerformanceMonitor from '@/components/PerformanceMonitor'

// After
const ServiceWorkerRegistration = dynamic(() => import('@/components/ServiceWorkerRegistration'), {
  ssr: false,
})
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), {
  ssr: false,
})
```

**Time**: 15 minutes
**Impact**: Reduces initial bundle by ~200-300 KB

#### Fix 1.3: Move Analytics to Client-Only Bundle

Ensure all analytics load after initial paint:

```typescript
<Suspense fallback={null}>
  <ClientOnly>
    <GoogleTagManager />
    <GoogleAnalytics />
    <PerformanceMonitor />
    <CoreWebVitalsMonitor />
  </ClientOnly>
</Suspense>
```

**Time**: 10 minutes
**Impact**: Defers ~100 KB of analytics code

### Phase 2: Code Splitting Optimization (Today)

#### Fix 2.1: Optimize Next.js Configuration

Update `next.config.mjs`:

```javascript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework chunks (React, Next.js)
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Vendor chunks (large libraries)
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `vendor.${packageName.replace('@', '')}`
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // Common chunks (shared across routes)
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
        },
        maxInitialRequests: 25,
        maxAsyncRequests: 25,
        minSize: 20000,
      },
    }
  }
  return config
}
```

**Time**: 20 minutes
**Impact**: Consolidates 12 chunks → 3-4, better caching

#### Fix 2.2: Add Performance Budgets

Create `.lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./docs"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "resource-summary:script:size": ["error", { "maxNumericValue": 500000 }],
        "resource-summary:stylesheet:size": ["error", { "maxNumericValue": 100000 }],
        "resource-summary:document:size": ["error", { "maxNumericValue": 50000 }],
        "resource-summary:image:size": ["error", { "maxNumericValue": 200000 }]
      }
    }
  }
}
```

**Time**: 10 minutes
**Impact**: Prevents future regressions

### Phase 3: Advanced Optimizations (Next Session)

#### Fix 3.1: Tree Shake Unused Exports

Audit data files for unused exports:

```bash
npx ts-prune --project tsconfig.json | grep -v "used in module"
```

#### Fix 3.2: Replace Heavy Dependencies

Identify and replace:

- framer-motion → CSS animations for simple cases
- Heavy date libraries → native Date or lighter alternatives
- Large icon sets → Use only required icons

#### Fix 3.3: Implement Route-Based Code Splitting

Group routes by functionality:

- `/cruises/*` → cruise bundle
- `/guides/*` → guides bundle
- `/packages/*` → packages bundle

## 📊 Expected Results After Fixes

### Before

- Main entry: 875 KB
- App layout: 1.49 MB
- First Load JS: 220-433 KB
- Build warnings: 1

### After Phase 1-2

- Main entry: ~500 KB (-43%)
- App layout: ~600 KB (-60%)
- First Load JS: 180-300 KB (-30%)
- Build warnings: 0

### Core Web Vitals Targets

- LCP: <2.5s (currently unknown)
- FID: <100ms (currently unknown)
- CLS: <0.1 (currently unknown)
- Lighthouse Performance: 90+ (currently unknown)

## 🚀 Execution Order

1. ✅ Install @emotion dependencies (2 min)
2. ✅ Lazy load layout components (15 min)
3. ✅ Move analytics to client bundle (10 min)
4. ✅ Optimize webpack config (20 min)
5. ✅ Add performance budgets (10 min)
6. ✅ Run build and verify (5 min)
7. ✅ Test bundle sizes (5 min)
8. ✅ Commit and deploy (5 min)

**Total Time**: ~70 minutes

## ✅ Success Criteria

- [ ] Zero build warnings
- [ ] Main bundle <500 KB
- [ ] Layout bundle <600 KB
- [ ] First Load JS <300 KB average
- [ ] All pages still functional
- [ ] No runtime errors in console

## 📈 Monitoring

After deployment:

1. Run Lighthouse audit on 5 page types
2. Check Google PageSpeed Insights
3. Monitor Core Web Vitals in Search Console
4. Verify bundle sizes with `npm run build:analyze`
