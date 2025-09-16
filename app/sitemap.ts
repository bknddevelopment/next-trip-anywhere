import { MetadataRoute } from 'next'
import { essexCountyCities } from '@/lib/data/essex-county-cities'
import { essexCountyServices } from '@/lib/data/essex-county-services'
import { blogPosts } from '@/lib/data/blog-posts'

// Force static generation for sitemap
export const dynamic = 'force-static'
export const revalidate = false

/**
 * Dynamic sitemap generator for better SEO
 * Includes all Essex County pages and service combinations
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

  // Destination pages
  const destinations = [
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

  const destinationPages = destinations.map((destination) => ({
    url: `${baseUrl}/destinations/${destination}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

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
    ...destinationPages,
    ...companyPages,
    ...legalPages,
  ]
}
