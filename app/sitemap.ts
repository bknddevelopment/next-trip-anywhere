import { MetadataRoute } from 'next'
import { essexCountyCities } from '@/lib/data/essex-county-cities'
import { essexCountyServices } from '@/lib/data/essex-county-services'
import { blogPosts } from '@/lib/data/blog-posts'
import { cruiseDestinations } from '@/lib/data/cruises'
import { vacationPackages } from '@/lib/data/vacation-packages'
import { seoDestinations } from '@/lib/data/seo-destinations'
import { travelGuides } from '@/lib/data/travel-guides'

// Force static generation for sitemap
export const dynamic = 'force-static'
export const revalidate = false

/**
 * Dynamic Sitemap Generator
 *
 * Automatically generates sitemap.xml with 300+ pages including:
 * - Core service pages (flights, cruises, packages)
 * - 220+ Essex County location pages
 * - 10 cruise hub pages (Phase 1 complete)
 * - 15 vacation package pages (Phase 1 complete)
 * - 15 destination guide pages (Phase 1 complete)
 * - Blog posts from lib/data/blog-posts.ts
 * - National location pages (major cities)
 *
 * Phase 1 SEO Expansion (40 new pages):
 * - 10 Cruise pages: from-newark, from-bayonne, cape-liberty-port, cheap-deals-nj, etc.
 * - 15 Package pages: sandals-resorts-deals, luxury-caribbean, spring-break-deals, etc.
 * - 15 Destination pages: bahamas-from-newark, bermuda-weekend-trips, caribbean-from-nj, etc.
 *
 * Priority Assignment:
 * 1.0  - Homepage, high-volume cruise lines (>1M searches)
 * 0.95 - HIGH priority cruises (>50K searches)
 * 0.9  - Core services, Essex County hub, HIGH packages, HIGH destinations
 * 0.85 - MEDIUM priority content, destination pages
 * 0.8  - Essex County city pages, service hubs
 * 0.75 - LOW priority content, city-service combinations
 * 0.7  - Blog posts, company pages
 * 0.3  - Legal pages
 *
 * Frequency:
 * - daily: Homepage, deals pages
 * - weekly: Service pages, high-priority content, SEO destinations
 * - monthly: Location pages, blog posts
 * - yearly: Legal pages
 *
 * @see https://nexttripanywhere.com/sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexttripanywhere.com'
  const currentDate = new Date().toISOString()

  // Core pages with high priority
  const corePages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/flights`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cruises`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
  ]

  // National location-based pages (from/city)
  const nationalLocations = [
    'nyc',
    'losangeles',
    'chicago',
    'houston',
    'phoenix',
    'philadelphia',
    'sanfrancisco',
    'sandiego',
    'dallas',
    'austin',
    'boston',
    'seattle',
    'denver',
    'dc',
    'atlanta',
    'miami',
  ]

  const nationalLocationPages = nationalLocations.map((location) => ({
    url: `${baseUrl}/from/${location}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Essex County hub page
  const essexCountyHub = {
    url: `${baseUrl}/essex-county`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }

  // Essex County city-specific pages (travel-from-city)
  const essexCityPages = essexCountyCities.map((city) => ({
    url: `${baseUrl}/travel-from-${city.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Essex County service hub pages
  const essexServiceHubPages = essexCountyServices.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Essex County city-service combination pages (locations/essex-county/[city]/[service])
  const essexCityServicePages: MetadataRoute.Sitemap = []
  essexCountyCities.forEach((city) => {
    essexCountyServices.forEach((service) => {
      essexCityServicePages.push({
        url: `${baseUrl}/locations/essex-county/${city.id}/${service.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      })
    })
  })

  // Travel-from city service pages (travel-from-[city]/[service])
  const travelFromServicePages: MetadataRoute.Sitemap = []
  essexCountyCities.forEach((city) => {
    essexCountyServices.forEach((service) => {
      travelFromServicePages.push({
        url: `${baseUrl}/travel-from-${city.id}/${service.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })
    })
  })

  // Blog main page
  const blogMainPage = {
    url: `${baseUrl}/blog`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }

  // Generate blog post pages dynamically from blog-posts data
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  // Legacy destination pages
  const legacyDestinations = [
    'paris-france',
    'tokyo-japan',
    'bali-indonesia',
    'santorini-greece',
    'new-york-usa',
    'sydney-australia',
    'cape-town-south-africa',
    'rio-de-janeiro-brazil',
    'cancun-mexico',
    'barbados',
  ]

  const legacyDestinationPages = legacyDestinations.map((destination) => ({
    url: `${baseUrl}/destinations/${destination}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // SEO-optimized destination pages (Phase 1 - 15 pages)
  const seoDestinationPages = seoDestinations.map((destination) => ({
    url: `${baseUrl}/destinations/${destination.slug}`,
    lastModified: destination.lastUpdated || currentDate,
    changeFrequency: 'weekly' as const,
    priority:
      destination.priority === 'HIGH' ? 0.9 : destination.priority === 'MEDIUM' ? 0.85 : 0.8,
  }))

  // Cruise line pages (Phase 1)
  const cruiseLinePages = [
    {
      url: `${baseUrl}/cruises/royal-caribbean`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0, // 1.5M searches
    },
    {
      url: `${baseUrl}/cruises/carnival`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0, // 1.22M searches
    },
    {
      url: `${baseUrl}/cruises/norwegian`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95, // 550K searches
    },
    {
      url: `${baseUrl}/cruises/princess`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95, // 550K searches
    },
    {
      url: `${baseUrl}/cruises/celebrity`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // 450K searches
    },
  ]

  // Dynamic cruise destination pages from data file
  const dynamicCruisePages = cruiseDestinations.map((cruise) => ({
    url: `${baseUrl}/cruises/${cruise.slug}`,
    lastModified: cruise.lastUpdated || currentDate,
    changeFrequency: 'weekly' as const,
    priority: cruise.priority === 'HIGH' ? 0.95 : cruise.priority === 'MEDIUM' ? 0.85 : 0.75,
  }))

  // Vacation package pages from data file
  const packagePages = vacationPackages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: pkg.lastUpdated || currentDate,
    changeFrequency: 'weekly' as const,
    priority: pkg.priority === 'HIGH' ? 0.9 : pkg.priority === 'MEDIUM' ? 0.8 : 0.7,
  }))

  // Keep existing hardcoded cruise pages for now (these may not have dynamic pages yet)
  const cruiseDestinationPages = [
    {
      url: `${baseUrl}/cruises/alaska`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95, // Higher priority - 74K searches
    },
    {
      url: `${baseUrl}/cruises/mediterranean`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85, // 33.1K searches
    },
    {
      url: `${baseUrl}/cruises/european`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85, // 18.1K searches
    },
    {
      url: `${baseUrl}/cruises/hawaii`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85, // 18.1K searches
    },
  ]

  // General cruise hub pages (Phase 1)
  const cruiseHubPages = [
    {
      url: `${baseUrl}/cruises/deals`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9, // 90.5K searches
    },
    {
      url: `${baseUrl}/cruises/last-minute`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9, // 74K searches
    },
    {
      url: `${baseUrl}/cruises/cheap-cruises`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9, // 74K searches
    },
    {
      url: `${baseUrl}/cruises/2025`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // 74K searches
    },
  ]

  // Additional cruise line sub-pages
  const cruiseLineSubPages = [
    {
      url: `${baseUrl}/cruises/royal-caribbean/deals`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cruises/royal-caribbean/ships`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/cruises/norwegian/deals`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cruises/princess/deals`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cruises/alaska-cruises`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cruises/caribbean-cruises`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Company pages
  const companyPages = [
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
  ]

  // Legal pages
  const legalPages = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Travel guides hub and individual guide pages
  const guidesHubPage = {
    url: `${baseUrl}/guides`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }

  const travelGuidePages = travelGuides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.lastUpdated || currentDate,
    changeFrequency: 'weekly' as const,
    priority: guide.priority === 'HIGH' ? 0.85 : guide.priority === 'MEDIUM' ? 0.75 : 0.7,
  }))

  // Tools hub page
  const toolsPage = {
    url: `${baseUrl}/tools`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }

  // Total pages for verification (used in build logs)
  // Essex County implementation includes:
  // - 20 city pages
  // - 8 service hubs
  // - 160 city-service combination pages (20 cities × 8 services)
  // Total Essex County pages: 189
  // Plus national, core, blog, and other pages

  return [
    ...corePages,
    ...nationalLocationPages,
    essexCountyHub,
    ...essexCityPages,
    ...essexServiceHubPages,
    ...essexCityServicePages,
    ...travelFromServicePages,
    blogMainPage,
    ...blogPostPages,
    ...legacyDestinationPages,
    ...seoDestinationPages,
    ...cruiseLinePages,
    ...cruiseLineSubPages,
    ...cruiseDestinationPages,
    ...dynamicCruisePages,
    ...packagePages,
    ...cruiseHubPages,
    guidesHubPage,
    ...travelGuidePages,
    toolsPage,
    ...companyPages,
    ...legalPages,
  ]
}
