# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development

```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Build for production (creates static export in docs/)
npm run clean        # Clean build cache and node_modules cache
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript types (tsc --noEmit)
npm run format       # Auto-format code with Prettier
npm run format:check # Check formatting without changes
```

### Testing

```bash
npm test            # Run tests with Vitest
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate test coverage report
```

### Performance Analysis

```bash
npm run build:analyze  # Build with webpack bundle analyzer
npm run perf:lighthouse # Run Lighthouse performance audit
npm run perf:bundle-size # Check bundle sizes
```

## Project Architecture

### Core Structure

This is a **Next.js 15** travel agency website using **App Router** with static export for GitHub Pages deployment.

```
nexttripanywhere.com (custom domain) → GitHub Pages → docs/ (static build)
```

### Key Technical Decisions

1. **Static Export Strategy**: Production builds use `output: 'export'` and deploy to `docs/` folder for GitHub Pages compatibility. The build process:
   - Builds to `.next-build/` directory
   - Copies to `docs/`
   - Runs `scripts/fix-image-paths.js` to fix asset paths

2. **Dynamic Sitemap Generation**: The app uses `app/sitemap.ts` to dynamically generate sitemaps including:
   - Essex County location pages (220+ pages)
   - Travel-from pages for each city/service combination
   - Blog posts from `lib/data/blog-posts.ts`

3. **SEO-First Architecture**: Heavy emphasis on local SEO with:
   - Individual pages for each Essex County municipality
   - Service-specific pages for each location
   - Pattern: `/travel-from-[city]/[service]` and `/locations/essex-county/[city]/[service]`

4. **Essex County Data Structure**: Central data files manage locations and services:
   - `lib/data/essex-county-cities.ts` - All Essex County municipalities
   - `lib/data/essex-county-services.ts` - Available travel services
   - `lib/data/blog-posts.ts` - Blog content with SEO metadata

### Critical Files & Patterns

#### Dynamic Route Handlers

- `app/locations/essex-county/[city]/[service]/page.tsx` - Dynamic Essex County service pages
- `app/blog/[slug]/page.tsx` - Dynamic blog post pages
- `app/destinations/[slug]/page.tsx` - Dynamic destination pages

#### SEO & Metadata Generation

- `app/sitemap.ts` - Generates complete sitemap.xml
- `lib/utils/generateServiceMetadata.ts` - Generates page metadata
- `config/seo.ts` - Default SEO configuration

#### Component Organization

- Service components use `generateStaticParams()` for static generation
- Location pages import from shared data files for consistency
- All pages include structured data (JSON-LD) for local business schema

### Deployment Pipeline

1. **Push to main** triggers GitHub Actions (`.github/workflows/deploy.yml`)
2. **Build process**:
   - `npm run build` executes complex build script
   - Static files generated in `.next-build/`
   - Copied to `docs/` with public assets
   - Image paths fixed for production
3. **GitHub Pages** serves from `docs/` folder
4. **Custom domain** nexttripanywhere.com points to GitHub Pages

### Form Handling

Forms use **Formspree** integration:

- Form ID required in `NEXT_PUBLIC_FORMSPREE_ID` env variable
- Contact forms submit to Formspree API
- Lead capture forms throughout the site

### Image Optimization

Custom image loader configured for static export:

- `lib/imageLoader.js` handles image paths
- `components/ui/OptimizedImage.tsx` wrapper component
- Unoptimized images in production due to static export limitations

## Development Workflow

### Adding New Essex County Service Pages

1. Update `lib/data/essex-county-cities.ts` for new cities
2. Update `lib/data/essex-county-services.ts` for new services
3. Run generation scripts in `scripts/` folder if needed
4. Sitemap automatically includes new pages via `app/sitemap.ts`

### Creating Blog Posts

1. Add entry to `lib/data/blog-posts.ts`
2. Blog page automatically generated at `/blog/[slug]`
3. Sitemap updates automatically

### Testing Changes Locally

```bash
npm run dev                    # Development server
npm run build && npm run start # Test production build locally
```

### Pre-commit Hooks

Husky + lint-staged runs on commit:

- ESLint fixes for JS/TS files
- Prettier formatting for all files
- Tests must pass before commit

## Important Context

### Current Focus

The site heavily focuses on **Essex County, NJ** local SEO with comprehensive coverage of:

- 22 municipalities in Essex County
- 10+ travel services per location
- 220+ total SEO-optimized pages

### Recent Major Changes

- Migrated from GitHub Pages subdomain to custom domain (nexttripanywhere.com)
- Generated 109 new service pages for Essex County municipalities
- Fixed sitemap generation to include all 222+ pages (was showing only 23)
- Removed old static sitemap.xml from public folder

### Performance Targets

- Lighthouse score: 90+
- Core Web Vitals: All green
- Static site with fast load times
- Mobile-first responsive design

## Known Issues & Workarounds

1. **Sitemap Display**: Browser shows XML error for sitemap.xml - this is normal for GitHub Pages, search engines parse it correctly

2. **ESLint Warnings**: 400+ warnings for unused imports in generated pages - non-critical but needs cleanup

3. **Build Output**: Build creates both `.next/` and `.next-build/` directories - production uses `.next-build/`

4. **Image Paths**: Must use `OptimizedImage` component or paths break in production

## Testing Specific Features

### Test Single Component

```bash
npm test -- ComponentName.test.tsx
```

### Test with Watch Mode

```bash
npm run test:watch
```

### E2E Testing

Currently uses Vitest for unit/integration tests. Playwright configured but not actively used.

## Blog System Architecture

### Blog Post Structure

Blog posts are managed in `lib/data/blog-posts.ts` with the following key components:

- Authors are defined as objects with full profiles (name, role, bio, avatar, social)
- Blog posts include comprehensive SEO metadata (metaTitle, metaDescription, keywords)
- Dynamic rendering via `app/blog/[slug]/page.tsx`
- Automatic sitemap inclusion through `app/sitemap.ts`

### Adding Blog Posts with Authors

1. First add author to the `authors` record if new:

```typescript
'author-id': {
  id: 'author-id',
  name: 'Author Name',
  role: 'Title',
  bio: 'Bio text',
  avatar: '/images/authors/placeholder.svg',
  social: { linkedin: 'url', email: 'email' }
}
```

2. Add blog post entry referencing the author:

```typescript
{
  slug: 'url-slug',
  title: 'Title',
  author: authors['author-id'], // Must reference author object
  category: 'deals', // or other category
  seo: { metaTitle: '60 chars', metaDescription: '160 chars' }
}
```

### Image Management for Blog Posts

- Blog images go in `public/images/` directory
- Reference as `/images/filename.ext` in featuredImage field
- Blog page responsive image sizing controlled in `app/blog/[slug]/page.tsx`
- Use descriptive alt text for accessibility

## Build System Nuances

### GitHub Actions Deployment

The site auto-deploys on push to main via `.github/workflows/deploy.yml`:

1. Builds to `.next-build/` (not `.next/`)
2. Copies to `docs/` for GitHub Pages
3. Fixes image paths via `scripts/fix-image-paths.js`
4. Deploys from `docs/` folder

### Local vs Production Image Handling

- Development: Next.js Image optimization works normally
- Production: Uses `OptimizedImage` component due to static export
- Image paths must use leading slash: `/images/...`
- Never use relative paths like `../images/...`

## Essex County SEO Strategy

The site generates 220+ pages for local SEO:

- 22 Essex County municipalities × 10+ services each
- URL patterns: `/locations/essex-county/[city]/[service]`
- Alternative: `/travel-from-[city]/[service]`
- All pages auto-included in sitemap via `generateStaticParams()`

## Test Execution Notes

- E2E tests with Playwright are configured but may fail - focus on Vitest unit tests
- Run specific test: `npm test -- ComponentName.test.tsx`
- Some tests have warnings about navigation not implemented (jsdom limitation)
