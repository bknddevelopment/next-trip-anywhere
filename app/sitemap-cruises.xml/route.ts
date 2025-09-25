import { NextResponse } from 'next/server'
import { cruiseDestinations } from '@/lib/data/cruises'

export const dynamic = 'force-static'
export const revalidate = false

/**
 * Cruise-specific sitemap
 * Includes all cruise destination pages, cruise line pages, and deals
 */
export async function GET() {
  const baseUrl = 'https://nexttripanywhere.com'
  const currentDate = new Date().toISOString()

  let urls = ''

  // Main cruise hub
  urls += `
  <url>
    <loc>${baseUrl}/cruises</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`

  // High-priority cruise lines (>1M searches)
  const highPriorityCruiseLines = [
    { slug: 'royal-caribbean', priority: 1.0 },
    { slug: 'carnival', priority: 1.0 },
    { slug: 'norwegian', priority: 0.95 },
    { slug: 'princess', priority: 0.95 },
    { slug: 'celebrity', priority: 0.9 },
  ]

  highPriorityCruiseLines.forEach(line => {
    urls += `
  <url>
    <loc>${baseUrl}/cruises/${line.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${line.priority}</priority>
  </url>`

    // Add deals pages for each line
    urls += `
  <url>
    <loc>${baseUrl}/cruises/${line.slug}/deals</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${line.priority * 0.8}</priority>
  </url>`
  })

  // Dynamic cruise destinations
  cruiseDestinations.forEach(cruise => {
    const priority = cruise.priority === 'HIGH' ? 0.95 : cruise.priority === 'MEDIUM' ? 0.85 : 0.75
    urls += `
  <url>
    <loc>${baseUrl}/cruises/${cruise.slug}</loc>
    <lastmod>${cruise.lastUpdated || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  })

  // General cruise pages
  const generalPages = [
    { slug: 'deals', priority: 0.9, freq: 'daily' },
    { slug: 'last-minute', priority: 0.9, freq: 'daily' },
    { slug: 'cheap-cruises', priority: 0.9, freq: 'daily' },
    { slug: '2025', priority: 0.9, freq: 'weekly' },
    { slug: 'alaska', priority: 0.95, freq: 'weekly' },
    { slug: 'mediterranean', priority: 0.85, freq: 'weekly' },
    { slug: 'european', priority: 0.85, freq: 'weekly' },
    { slug: 'hawaii', priority: 0.85, freq: 'weekly' },
  ]

  generalPages.forEach(page => {
    urls += `
  <url>
    <loc>${baseUrl}/cruises/${page.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
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