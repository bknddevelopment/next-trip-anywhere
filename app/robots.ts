import { MetadataRoute } from 'next'

// Force static generation for robots.txt
export const dynamic = 'force-static'
export const revalidate = false

/**
 * Dynamic robots.txt configuration
 * Optimized for search engine crawling with Essex County SEO focus
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nexttripanywhere.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/backend/',
          '/*.json$',
          '/checkout/',
          '/cart/',
          '/account/',
          '/test/',
          '/test-ab/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/backend/', '/test/', '/test-ab/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/backend/', '/test/', '/test-ab/'],
        crawlDelay: 0,
      },
      // Block unwanted bots
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'PetalBot',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
