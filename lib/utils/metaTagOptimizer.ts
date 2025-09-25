import { Metadata } from 'next'

interface MetaTagConfig {
  title: string
  description: string
  keywords?: string[]
  canonical: string
  ogImage?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  includeLocalSEO?: boolean
  twitterCreator?: string
  noindex?: boolean
  nofollow?: boolean
}

/**
 * Comprehensive meta tag generator for 500+ page site
 * Ensures consistent and optimized meta tags across all pages
 */
export function generateOptimizedMetaTags(config: MetaTagConfig): Metadata {
  // Ensure title is within 60 characters
  const optimizedTitle = config.title.length > 60
    ? config.title.substring(0, 57) + '...'
    : config.title

  // Ensure description is within 160 characters
  const optimizedDescription = config.description.length > 160
    ? config.description.substring(0, 157) + '...'
    : config.description

  // Add local SEO keywords if enabled
  const keywords = config.includeLocalSEO
    ? [...(config.keywords || []), 'Newark', 'Essex County', 'New Jersey', 'NJ travel']
    : config.keywords

  // Build robots directive
  const robotsDirective = [
    config.noindex ? 'noindex' : 'index',
    config.nofollow ? 'nofollow' : 'follow',
    'max-image-preview:large',
    'max-video-preview:-1',
    'max-snippet:-1',
  ].join(', ')

  const metadata: Metadata = {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: keywords?.join(', '),
    authors: config.author ? [{ name: config.author }] : undefined,
    robots: robotsDirective,
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: config.canonical,
      siteName: 'Next Trip Anywhere',
      type: config.section === 'blog' ? 'article' : 'website',
      locale: 'en_US',
      images: config.ogImage ? [
        {
          url: config.ogImage,
          width: 1200,
          height: 630,
          alt: optimizedTitle,
        }
      ] : undefined,
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
      authors: config.author ? [config.author] : undefined,
      section: config.section,
      tags: config.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description: optimizedDescription,
      creator: config.twitterCreator || '@nexttripanywhere',
      images: config.ogImage ? [config.ogImage] : undefined,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      other: {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
        'p:domain_verify': process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION || '',
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Next Trip Anywhere',
    },
    formatDetection: {
      telephone: true,
      email: false,
      address: true,
    },
    category: config.section || 'travel',
  }

  return metadata
}

/**
 * Generate title patterns for different page types
 */
export const titlePatterns = {
  cruise: (destination: string) =>
    `${destination} Cruises from Newark 2025 | Save 40% | Next Trip Anywhere`,

  destination: (place: string) =>
    `${place} Travel Guide from Newark | Deals & Tips | Next Trip Anywhere`,

  package: (type: string) =>
    `${type} Vacation Packages from NJ | All-Inclusive | Next Trip Anywhere`,

  guide: (topic: string) =>
    `${topic} Guide 2025 | Expert Travel Tips | Next Trip Anywhere`,

  essex: (city: string, service?: string) =>
    service
      ? `${service} in ${city}, Essex County | Next Trip Anywhere`
      : `Travel from ${city}, Essex County | Services & Deals`,

  blog: (title: string) =>
    `${title} | Next Trip Anywhere Travel Blog`,

  comparison: (item1: string, item2: string) =>
    `${item1} vs ${item2}: Complete Comparison 2025 | Next Trip Anywhere`,

  seasonal: (season: string, year: string) =>
    `${season} ${year} Travel Deals from Newark | Next Trip Anywhere`,
}

/**
 * Generate description patterns for different page types
 */
export const descriptionPatterns = {
  cruise: (destination: string, price?: string) =>
    `Book ${destination} cruises from Newark/Cape Liberty. ${price ? `Starting at ${price}.` : ''} Expert planning, exclusive deals, free consultation. Call 833-874-1019.`,

  destination: (place: string, highlights: string) =>
    `Complete ${place} travel guide for Newark residents. ${highlights}. Local tips, best deals, expert planning. Book now!`,

  package: (type: string, price?: string) =>
    `${type} vacation packages from New Jersey. ${price ? `From ${price} per person.` : ''} All-inclusive resorts, flights included. Call 833-874-1019.`,

  guide: (topic: string, benefit: string) =>
    `Expert guide: ${topic}. ${benefit}. Essential tips for Newark and Essex County travelers. Free consultation available.`,

  essex: (city: string, service?: string) =>
    service
      ? `Professional ${service} services in ${city}, Essex County. Reliable, affordable, 24/7 support. Call 833-874-1019 for instant booking.`
      : `Travel services for ${city} residents. Airport transfers, cruise shuttles, group travel, and more. Book online or call 833-874-1019.`,

  blog: (summary: string) =>
    `${summary} Read expert insights and travel tips from Next Trip Anywhere's team. Updated 2025.`,

  comparison: (item1: string, item2: string, winner?: string) =>
    `Compare ${item1} vs ${item2} for 2025 travel. ${winner ? `Our pick: ${winner}.` : ''} Detailed analysis for Newark travelers.`,

  seasonal: (season: string, year: string, deal?: string) =>
    `${season} ${year} travel deals from Newark Airport. ${deal || 'Save up to 40% on flights and packages'}. Limited time offers!`,
}

/**
 * Validate meta tags for SEO best practices
 */
export function validateMetaTags(meta: Metadata): {
  valid: boolean
  issues: string[]
} {
  const issues: string[] = []

  // Check title length
  if (meta.title) {
    const title = typeof meta.title === 'string' ? meta.title : meta.title.default
    if (title && title.length > 60) {
      issues.push(`Title too long (${title.length} chars, max 60)`)
    }
    if (title && title.length < 30) {
      issues.push(`Title too short (${title.length} chars, min 30)`)
    }
  } else {
    issues.push('Missing title tag')
  }

  // Check description length
  if (meta.description) {
    if (meta.description.length > 160) {
      issues.push(`Description too long (${meta.description.length} chars, max 160)`)
    }
    if (meta.description.length < 120) {
      issues.push(`Description too short (${meta.description.length} chars, min 120)`)
    }
  } else {
    issues.push('Missing meta description')
  }

  // Check canonical
  if (!meta.alternates?.canonical) {
    issues.push('Missing canonical URL')
  }

  // Check Open Graph
  if (!meta.openGraph?.title) {
    issues.push('Missing Open Graph title')
  }
  if (!meta.openGraph?.description) {
    issues.push('Missing Open Graph description')
  }
  if (!meta.openGraph?.images || meta.openGraph.images.length === 0) {
    issues.push('Missing Open Graph image')
  }

  // Check Twitter Card
  if (!meta.twitter?.card) {
    issues.push('Missing Twitter Card type')
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}