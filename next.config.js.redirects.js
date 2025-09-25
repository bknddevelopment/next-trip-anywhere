/**
 * Redirect Management for 500+ Page Site
 * Handles URL changes, legacy paths, and SEO redirects
 */

const permanentRedirects = [
  // Legacy URL patterns to new structure
  {
    source: '/caribbean-cruises',
    destination: '/cruises/caribbean-cruises',
    permanent: true,
  },
  {
    source: '/alaska-cruises',
    destination: '/cruises/alaska-cruises',
    permanent: true,
  },
  {
    source: '/cruise-deals',
    destination: '/cruises/deals',
    permanent: true,
  },
  {
    source: '/all-inclusive',
    destination: '/packages/all-inclusive-caribbean',
    permanent: true,
  },
  {
    source: '/sandals',
    destination: '/packages/sandals-resorts-deals',
    permanent: true,
  },
  // City name variations
  {
    source: '/from-newark',
    destination: '/cruises/from-newark',
    permanent: true,
  },
  {
    source: '/newark-cruises',
    destination: '/cruises/from-newark',
    permanent: true,
  },
  {
    source: '/bayonne-cruises',
    destination: '/cruises/from-bayonne',
    permanent: true,
  },
  {
    source: '/cape-liberty',
    destination: '/cruises/cape-liberty-port',
    permanent: true,
  },
  // Service redirects
  {
    source: '/airport-shuttle',
    destination: '/services/airport-transfers',
    permanent: true,
  },
  {
    source: '/cruise-shuttle',
    destination: '/services/cruise-transfers',
    permanent: true,
  },
  // Essex County variations
  {
    source: '/newark-nj',
    destination: '/locations/essex-county/newark',
    permanent: true,
  },
  {
    source: '/montclair-nj',
    destination: '/locations/essex-county/montclair',
    permanent: true,
  },
  {
    source: '/livingston-nj',
    destination: '/locations/essex-county/livingston',
    permanent: true,
  },
]

const temporaryRedirects = [
  // Seasonal redirects (update yearly)
  {
    source: '/spring-break',
    destination: '/packages/spring-break-deals',
    permanent: false,
  },
  {
    source: '/summer-deals',
    destination: '/cruises/deals',
    permanent: false,
  },
  {
    source: '/black-friday',
    destination: '/cruises/deals',
    permanent: false,
  },
]

// Regex redirects for pattern matching
const regexRedirects = [
  // Old blog URLs to new structure
  {
    source: '/blog/post/:slug',
    destination: '/blog/:slug',
    permanent: true,
  },
  // Old destination URLs
  {
    source: '/destination/:slug',
    destination: '/destinations/:slug',
    permanent: true,
  },
  // Old cruise line URLs
  {
    source: '/cruise-line/:line',
    destination: '/cruises/:line',
    permanent: true,
  },
  // Essex County old patterns
  {
    source: '/essex/:city/:service',
    destination: '/locations/essex-county/:city/:service',
    permanent: true,
  },
  // Travel from patterns
  {
    source: '/from-:city/:service',
    destination: '/travel-from-:city/:service',
    permanent: true,
  },
]

// Dynamic redirects based on data
const dynamicRedirects = [
  // Common misspellings
  {
    source: '/caribean-cruises',
    destination: '/cruises/caribbean-cruises',
    permanent: true,
  },
  {
    source: '/mediteranean-cruises',
    destination: '/cruises/mediterranean',
    permanent: true,
  },
  {
    source: '/hawai-cruises',
    destination: '/cruises/hawaii',
    permanent: true,
  },
  // Alternative spellings
  {
    source: '/cancún',
    destination: '/destinations/cancun-mexico',
    permanent: true,
  },
  {
    source: '/puerto-rico-vacation',
    destination: '/destinations/puerto-rico-from-newark',
    permanent: true,
  },
]

// Export all redirects
module.exports = {
  redirects: async () => {
    return [
      ...permanentRedirects,
      ...temporaryRedirects,
      ...regexRedirects,
      ...dynamicRedirects,
    ]
  },

  // Headers for SEO optimization
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/sitemap*.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ]
  },
}