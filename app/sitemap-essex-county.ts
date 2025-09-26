import { NextResponse } from 'next/server'
import { essexCountyCities } from '@/lib/data/essex-county-cities'
import { essexCountyServices } from '@/lib/data/essex-county-services'

export const dynamic = 'force-static'
export const revalidate = false

/**
 * Essex County specific sitemap
 * Includes all Essex County location and service pages (220+ URLs)
 */
export async function GET() {
  const baseUrl = 'https://nexttripanywhere.com'
  const currentDate = new Date().toISOString()

  let urls = ''

  // Essex County hub page
  urls += `
  <url>
    <loc>${baseUrl}/essex-county</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`

  // City-specific pages (travel-from-city)
  essexCountyCities.forEach((city) => {
    urls += `
  <url>
    <loc>${baseUrl}/travel-from-${city.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`

    // City hub pages
    urls += `
  <url>
    <loc>${baseUrl}/locations/essex-county/${city.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  })

  // Service hub pages
  essexCountyServices.forEach((service) => {
    urls += `
  <url>
    <loc>${baseUrl}/services/${service.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  })

  // City-service combination pages
  essexCountyCities.forEach((city) => {
    essexCountyServices.forEach((service) => {
      // locations/essex-county/[city]/[service] pattern
      urls += `
  <url>
    <loc>${baseUrl}/locations/essex-county/${city.id}/${service.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`

      // travel-from-[city]/[service] pattern
      urls += `
  <url>
    <loc>${baseUrl}/travel-from-${city.id}/${service.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    })
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
