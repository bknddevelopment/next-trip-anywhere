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
   - **Phase 1 Expansion (Completed January 2025)**: 44 new pages targeting high-volume cruise and vacation keywords

4. **Data Structure**: Central data files manage content and SEO:
   - `lib/data/essex-county-cities.ts` - All Essex County municipalities
   - `lib/data/essex-county-services.ts` - Available travel services
   - `lib/data/blog-posts.ts` - Blog content with SEO metadata
   - **`lib/data/cruises.ts`** - Cruise destinations with search volume & priority (Phase 1 - Complete)
   - **`lib/data/vacation-packages.ts`** - Vacation packages with local targeting (Phase 1 - Complete)
   - **`lib/data/travel-guides.ts`** - Travel guide content for SEO optimization (Phase 1 - Complete, includes 7,839-word insurance guide)
   - **`lib/data/destinations.ts`** - Popular destinations (Phase 2 - Upcoming)

### Critical Files & Patterns

#### Dynamic Route Handlers

- `app/locations/essex-county/[city]/[service]/page.tsx` - Dynamic Essex County service pages
- `app/blog/[slug]/page.tsx` - Dynamic blog post pages
- `app/destinations/[slug]/page.tsx` - Dynamic destination pages
- **`app/cruises/[destination]/page.tsx`** - Dynamic cruise destination pages (Phase 1 - Complete)
- **`app/packages/[type]/page.tsx`** - Dynamic vacation package pages (Phase 1 - Complete)
- **`app/guides/[topic]/page.tsx`** - Dynamic travel guide pages including insurance guide (7,839 words)

#### SEO & Metadata Generation

- `app/sitemap.ts` - Generates complete sitemap.xml (includes 44 new Phase 1 pages)
- `lib/utils/generateServiceMetadata.ts` - Generates page metadata
- **`lib/utils/cruiseSchema.ts`** - Cruise-specific schema generation for rich snippets
- **`lib/utils/packageSchema.ts`** - Vacation package schema generation
- **`lib/utils/portSchema.ts`** - Port and departure location schema
- **`lib/utils/guideSchema.ts`** - Travel guide schema templates
- **`lib/utils/insuranceGuideSchema.ts`** - Insurance guide schema with Article, FAQPage, HowTo, Product schemas
- **`lib/utils/baseSchema.ts`** - Base schema components for reuse
- `config/seo.ts` - Default SEO configuration

#### Component Organization

- Service components use `generateStaticParams()` for static generation
- Location pages import from shared data files for consistency
- All pages include structured data (JSON-LD) for local business schema
- **Cruise/Package pages use lazy loading for non-critical components**

#### Interactive Guide Components

- **`components/guides/InsuranceComparisonTable.tsx`** - Interactive table comparing 10 insurance providers
  - Props: providers array with coverage details, ratings, pricing
  - Features: Expandable rows, feature filtering, mobile-responsive
- **`components/guides/FAQAccordion.tsx`** - Accessible FAQ accordion component
  - Props: items array with question/answer pairs
  - Features: Expand/collapse all, keyboard navigation, ARIA compliant

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

### Phase 1 SEO Expansion (40+ New Pages)

The Phase 1 expansion adds high-priority cruise and vacation package pages targeting keywords with significant search volume:

#### Page Categories & Structure

1. **Cruise Destination Pages** (`/cruises/[destination]`)
   - Data source: `lib/data/cruises.ts`
   - Dynamic routing: `app/cruises/[destination]/page.tsx`
   - Examples: `/cruises/from-newark`, `/cruises/caribbean`, `/cruises/bahamas`
   - Features: Port info, cruise lines, local tips, FAQs, schema markup

2. **Vacation Package Pages** (`/packages/[type]`)
   - Data source: `lib/data/vacation-packages.ts`
   - Dynamic routing: `app/packages/[type]/page.tsx`
   - Examples: `/packages/all-inclusive-caribbean`, `/packages/family-resorts-from-newark`
   - Features: Resort listings, inclusions, pricing tiers, local advantages

3. **Cruise Line Hub Pages** (Static)
   - Royal Caribbean (1.5M searches/month)
   - Carnival (1.22M searches/month)
   - Norwegian, Princess, Celebrity
   - Located in `/app/cruises/[cruise-line]/`

#### Adding New Cruise Destination Pages

```typescript
// 1. Add to lib/data/cruises.ts
{
  slug: 'alaska-cruises',
  title: 'Alaska Cruises from New Jersey',
  metaTitle: 'Alaska Cruises 2025 | 60 chars max',
  metaDescription: '160 chars max with keywords',
  keywords: ['primary', 'keywords'],
  searchVolume: 74000,
  difficulty: 25,
  priority: 'HIGH', // HIGH > 50K searches, MEDIUM 20-50K, LOW < 20K
  content: {
    hero: { headline, subheadline },
    description: '300+ words minimum',
    highlights: [], // 5-8 key points
    portInfo: {}, // Optional: for port-specific pages
    localTips: [] // Essex County specific advice
  },
  faq: [], // 3-5 Q&A pairs
  lastUpdated: '2025-01-23'
}

// 2. Build and verify
npm run build
// Page automatically generated at /cruises/alaska-cruises
// Sitemap includes it automatically
```

#### Adding New Vacation Package Pages

```typescript
// 1. Add to lib/data/vacation-packages.ts
{
  slug: 'luxury-resorts',
  packageType: 'luxury', // all-inclusive|family|adults-only|luxury|budget|seasonal
  metaTitle: 'Luxury Caribbean Resorts from Newark',
  content: {
    includedFeatures: [], // What's included
    resorts: [], // Featured properties with ratings
    startingPrice: 2999,
    localAdvantages: [] // Newark/Essex County benefits
  }
}

// 2. Packages automatically available at /packages/luxury-resorts
```

#### Adding New Travel Guides (Including Insurance-Style Guides)

```typescript
// 1. Add to lib/data/travel-guides.ts
{
  slug: 'travel-insurance-guide',
  title: 'Complete Cruise Travel Insurance Guide 2025',
  metaTitle: 'Cruise Travel Insurance Guide 2025 | Expert Advice',
  metaDescription: '160 chars max with primary keywords',
  keywords: ['cruise travel insurance 2025', 'travel medical insurance'],
  searchVolume: 40000, // Monthly searches
  priority: 'HIGH', // Based on search volume
  content: {
    introduction: 'Opening paragraph with local hook',
    sections: [ // Flexible sections for non-destination guides
      {
        title: 'Section Title',
        content: 'Detailed content (aim for 7,000+ words total)'
      }
    ],
    localTips: 'Essex County specific advice',
    conclusion: 'Strong CTA with phone number'
  },
  faq: [ // 10-15 Q&A pairs for comprehensive coverage
    { question: 'Q', answer: 'A' }
  ],
  lastUpdated: '2025-01-27'
}

// 2. For interactive components, create in components/guides/
// 3. Import components dynamically in app/guides/[topic]/page.tsx
// 4. Page automatically available at /guides/travel-insurance-guide
```

#### Content Requirements

- **Word Count**: Minimum 1,500 words per page
- **Unique Content**: No duplicate content across pages
- **Local Angle**: Every page must mention Essex County/Newark relevance
- **Schema Markup**: All pages include appropriate structured data
- **Internal Linking**: Link to 3-5 related pages
- **CTAs**: Phone number (833-874-1019) and contact form on every page

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
- 220 Essex County SEO-optimized pages
- **Phase 1 Expansion (Completed)**: 44 cruise and vacation package pages
  - 20 cruise destination pages
  - 19 cruise line and port pages
  - 5 vacation package category pages
- **Travel Insurance Guide**: Comprehensive 7,839-word guide targeting 40,000+ monthly searches
- **Total Pages**: 595 dynamically generated pages
- **Phase 2 & 3 Expansions**: Additional travel guides and destination deep-dives

### Recent Major Changes

- **Travel Insurance Guide (January 2025)**:
  - ✅ Implemented comprehensive 7,839-word cruise travel insurance guide
  - ✅ Created interactive InsuranceComparisonTable component for provider comparisons
  - ✅ Built accessible FAQAccordion component with expand/collapse functionality
  - ✅ Added multi-schema markup (Article, FAQPage, HowTo, Product, Service)
  - ✅ Targeting "cruise travel insurance 2025" keyword (40,000+ searches/month)
  - ✅ Integrated lazy loading for optimal performance

- **Phase 1 SEO Expansion (Completed January 2025)**:
  - ✅ Added 20 dynamic cruise destination pages with comprehensive schema markup
  - ✅ Created 19 cruise line hub pages for major brands (Royal Caribbean, Carnival, Norwegian, etc.)
  - ✅ Implemented 5 vacation package landing pages with local Essex County targeting
  - ✅ Built 5 comprehensive schema generators (cruise, package, port, guide, base)
  - ✅ Integrated lazy loading and performance optimizations
  - ✅ Added FAQs, local tips, and rich snippets to all new pages
  - ✅ Total of 44 new SEO-optimized pages successfully deployed

- Previous Updates:
  - Migrated from GitHub Pages subdomain to custom domain (nexttripanywhere.com)
  - Generated 109 new service pages for Essex County municipalities
  - Fixed sitemap generation to include all pages dynamically
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

### Build Considerations for 595 Pages

With the insurance guide and Phase 1-3 expansions, the build now generates 595 static pages:

- **Build Time**: ~3-5 minutes for full static export
- **Memory Usage**: May require increased Node memory for builds
- **Static Generation**: All pages use `generateStaticParams()` for build-time generation
- **Dynamic Imports**: Non-critical components use `next/dynamic` for code splitting

If build fails with memory errors:

```bash
# Increase Node memory allocation
NODE_OPTIONS="--max-old-space-size=8192" npm run build
```

### Schema Generation Utilities

The project uses structured data generators for SEO:

- `lib/utils/cruiseSchema.ts` - Generates JSON-LD for cruise pages
  - TravelAgency schema
  - FAQPage schema
  - BreadcrumbList schema
  - Service schema with local area served

- `lib/utils/packageSchema.ts` - Generates JSON-LD for package pages
  - Product schema with offers
  - TravelAgency schema
  - AggregateRating when applicable

Example usage in pages:

```typescript
const schemaGraph = generateCruiseSchemaGraph(cruiseData)
// Render in Script tag with type="application/ld+json"
```

### Local vs Production Image Handling

- Development: Next.js Image optimization works normally
- Production: Uses `OptimizedImage` component due to static export
- Image paths must use leading slash: `/images/...`
- Never use relative paths like `../images/...`

## SEO Strategy & Content Guidelines

### Phase 1 Content Structure

The expansion follows a hub-and-spoke content model:

#### Content Hubs

- `/cruises` - Main cruise hub linking to all cruise pages
- `/packages` - Vacation packages hub
- `/destinations` - Destination guides hub

#### Internal Linking Strategy

```typescript
// Every page should include:
internalLinks: [
  '/cruises/from-newark', // Local relevance
  '/cruises/caribbean', // Related topic
  '/packages/all-inclusive', // Cross-category
  '/locations/essex-county', // Local hub
  '/blog/relevant-post', // Supporting content
]
```

#### Content Requirements by Page Type

**Cruise Pages** (1,500-2,000 words):

- Port information with directions from Essex County
- 3-5 cruise line options with details
- 5-8 highlights/benefits
- 3-5 FAQs addressing common concerns
- Local tips for Essex County residents
- Starting prices and duration info

**Package Pages** (1,500-2,000 words):

- 4-6 featured resorts with ratings
- Comprehensive inclusion list
- Price tiers (budget/mid/luxury)
- Local advantages for NJ residents
- Seasonal considerations
- 3-5 FAQs about packages

**Destination Pages** (2,000+ words):

- Overview and why visit
- Best time to visit
- How to get there from Newark
- Top attractions and activities
- Where to stay recommendations
- Local culture and customs
- Budget breakdown

### Essex County Local SEO

The site generates 220+ pages for Essex County local SEO:

- 22 Essex County municipalities × 10+ services each
- URL patterns: `/locations/essex-county/[city]/[service]`
- Alternative: `/travel-from-[city]/[service]`
- All pages auto-included in sitemap via `generateStaticParams()`

### Keyword Targeting Priority

Pages are prioritized based on search volume and difficulty:

1. **HIGH Priority** (>50K monthly searches)
   - Target with comprehensive content (2,000+ words)
   - Update monthly with fresh content
   - Monitor rankings weekly

2. **MEDIUM Priority** (20-50K searches)
   - Standard content length (1,500 words)
   - Update quarterly
   - Monitor rankings monthly

3. **LOW Priority** (<20K searches)
   - Minimum viable content (1,000 words)
   - Update bi-annually
   - Monitor rankings quarterly

## Test Execution Notes

- E2E tests with Playwright are configured but may fail - focus on Vitest unit tests
- Run specific test: `npm test -- ComponentName.test.tsx`
- Some tests have warnings about navigation not implemented (jsdom limitation)
