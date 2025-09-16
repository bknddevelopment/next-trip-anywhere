/**
 * Sitemap generator for Essex County location pages
 * Generates entries for all city and service combinations
 */

import { MetadataRoute } from 'next'
import { ESSEX_CITIES, ESSEX_SERVICES } from '@/lib/seo/essex-county-services'

// Force static generation for sitemap
export const dynamic = 'force-static'
export const revalidate = false

const BASE_URL = 'https://nexttripanywhere.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Add city landing pages
  for (const city of ESSEX_CITIES) {
    entries.push({
      url: `${BASE_URL}/locations/essex-county/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    // Add service pages for each city
    for (const service of ESSEX_SERVICES) {
      entries.push({
        url: `${BASE_URL}/locations/essex-county/${city.slug}/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  return entries
}
