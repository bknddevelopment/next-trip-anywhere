import { Metadata } from 'next'

/**
 * SEO configuration and utilities for Next Trip Anywhere
 * Provides comprehensive meta tag generation for optimal search engine visibility
 */

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
    type?: 'website' | 'article' | 'product'
  }
  twitter?: {
    title?: string
    description?: string
    images?: string[]
  }
  alternates?: {
    canonical?: string
    languages?: Record<string, string>
  }
  robots?: {
    index?: boolean
    follow?: boolean
  }
}

const DEFAULT_SITE_NAME = 'Next Trip Anywhere'
const DEFAULT_SITE_URL = 'https://nexttripanywhere.com'
const DEFAULT_OG_IMAGE = {
  url: `${DEFAULT_SITE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'Next Trip Anywhere - America\'s Premier Travel Agency',
}

/**
 * Generate comprehensive metadata for pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    openGraph = {},
    twitter = {},
    alternates = {},
    robots = { index: true, follow: true },
  } = config

  // Ensure title is under 60 characters for optimal SERP display
  const optimizedTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title
  
  // Ensure description is between 120-160 characters for optimal SERP display
  const optimizedDescription = 
    description.length > 160 
      ? `${description.substring(0, 157)}...`
      : description.length < 120 
      ? `${description} | Expert travel planning from all major US cities.`
      : description

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: keywords.join(', '),
    metadataBase: new URL(DEFAULT_SITE_URL),
    alternates: {
      canonical: canonical || alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: openGraph.title || optimizedTitle,
      description: openGraph.description || optimizedDescription,
      url: canonical || DEFAULT_SITE_URL,
      siteName: DEFAULT_SITE_NAME,
      images: openGraph.images || [DEFAULT_OG_IMAGE],
      locale: 'en_US',
      type: (openGraph.type === 'product' ? 'website' : openGraph.type) || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: twitter.title || openGraph.title || optimizedTitle,
      description: twitter.description || openGraph.description || optimizedDescription,
      images: twitter.images || openGraph.images?.map(img => img.url) || [DEFAULT_OG_IMAGE.url],
      creator: '@nexttripanywhere',
      site: '@nexttripanywhere',
    },
    robots: {
      index: robots.index !== false,
      follow: robots.follow !== false,
      googleBot: {
        index: robots.index !== false,
        follow: robots.follow !== false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    },
    category: 'travel',
    classification: 'Travel Agency',
    creator: DEFAULT_SITE_NAME,
    publisher: DEFAULT_SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  }
}

/**
 * Generate metadata for location pages with local SEO optimization
 */
export function generateLocationMetadata(
  city: string,
  state?: string,
  airports?: string[]
): Metadata {
  const location = state ? `${city}, ${state}` : city
  const airportList = airports ? ` (${airports.join(', ')})` : ''
  
  return generateMetadata({
    title: `Travel from ${location} | Local Travel Agency${airportList} | ${DEFAULT_SITE_NAME}`,
    description: `Book flights, cruises, and vacation packages from ${location}. Expert travel agents with exclusive deals. Local service, nationwide destinations. Call for free quote!`,
    keywords: [
      `${city} travel agency`,
      `flights from ${city}`,
      `${city} vacation packages`,
      `cruises from ${city}`,
      ...airports?.map(a => `${a} airport deals`) || [],
      'travel agent near me',
      'local travel agency',
    ],
    canonical: `${DEFAULT_SITE_URL}/from/${city.toLowerCase().replace(/\s+/g, '-')}`,
    openGraph: {
      title: `${location} Travel Agency - Exclusive Deals & Expert Service`,
      description: `Your local ${city} travel experts. Best prices on flights, cruises, and packages. Personal service from experienced agents.`,
    },
  })
}

/**
 * Generate metadata for service pages (flights, cruises, packages)
 */
export function generateServiceMetadata(
  service: 'flights' | 'cruises' | 'packages',
  customConfig?: Partial<SEOConfig>
): Metadata {
  const configs: Record<typeof service, SEOConfig> = {
    flights: {
      title: `Cheap Flights Nationwide | Save up to 40% | ${DEFAULT_SITE_NAME}`,
      description: 'Book cheap flights from all major US cities. Exclusive unpublished fares, 24/7 support, price match guarantee. Expert agents find deals you can\'t get online.',
      keywords: [
        'cheap flights',
        'discount airfare',
        'flight deals',
        'airline tickets',
        'unpublished fares',
        'consolidator tickets',
        'business class deals',
        'last minute flights',
      ],
      canonical: `${DEFAULT_SITE_URL}/flights`,
    },
    cruises: {
      title: `Cruise Deals & Packages | Caribbean, Alaska, Europe | ${DEFAULT_SITE_NAME}`,
      description: 'Exclusive cruise deals from all US ports. Caribbean, Alaska, Mediterranean cruises at guaranteed lowest prices. Free upgrades, onboard credits, and perks.',
      keywords: [
        'cruise deals',
        'Caribbean cruises',
        'Alaska cruises',
        'Mediterranean cruises',
        'cruise packages',
        'cruise from Florida',
        'cruise from New York',
        'last minute cruises',
      ],
      canonical: `${DEFAULT_SITE_URL}/cruises`,
    },
    packages: {
      title: `All-Inclusive Vacation Packages | Beach, City & Adventure | ${DEFAULT_SITE_NAME}`,
      description: 'Complete vacation packages with flights, hotels, and activities. All-inclusive resorts, guided tours, custom itineraries. Save up to 50% booking as a package.',
      keywords: [
        'vacation packages',
        'all inclusive resorts',
        'travel packages',
        'honeymoon packages',
        'family vacations',
        'beach vacations',
        'package deals',
        'bundle and save',
      ],
      canonical: `${DEFAULT_SITE_URL}/packages`,
    },
  }

  const baseConfig = configs[service]
  return generateMetadata({
    ...baseConfig,
    ...customConfig,
  })
}