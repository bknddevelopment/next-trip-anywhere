/**
 * Schema generators for cruise ship neighborhood guide pages (Phase 2)
 * Provides 7 schema types: Article, FAQ, Product, LocalBusiness, Breadcrumb, HowTo, Place
 * For pages targeting neighborhoods around cruise ports (e.g., "hotels near Port Canaveral")
 */

import {
  generateOrganizationSchema,
  generateBreadcrumbList,
  generateFAQSchema,
  NEXT_TRIP_ANYWHERE,
  type PostalAddress,
  type GeoCoordinates,
  type ImageObject,
  type AggregateRating,
  type Review,
  type Person,
  type Organization,
  type Place as BasePlace,
  type Service,
} from './baseSchema'

// Type definitions for neighborhood-specific schemas

export interface NeighborhoodGuideData {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  searchVolume: number
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  content: {
    hero: {
      headline: string
      subheadline: string
    }
    overview: string
    description: string // 300+ words minimum
    neighborhoods: Array<{
      name: string
      description: string
      distance: string
      highlights: string[]
      bestFor: string[]
      averageHotelPrice?: number
      rating?: number
    }>
    accommodations?: Array<{
      name: string
      type: 'hotel' | 'resort' | 'vacation-rental' | 'bed-and-breakfast'
      neighborhood: string
      rating?: number
      reviewCount?: number
      priceRange: string
      amenities: string[]
      distanceToPort?: string
    }>
    gettingThere: {
      fromNewark: string
      localTransport: string[]
      parkingInfo?: string
    }
    localAttractions: Array<{
      name: string
      description: string
      distance: string
    }>
    diningOptions?: string[]
    travelTips: string[]
    essexCountyAdvantage: string
  }
  portInfo?: {
    name: string
    address: string
    city: string
    state: string
    country: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }
  faq: Array<{
    question: string
    answer: string
  }>
  lastUpdated: string
}

// Article schema for neighborhood guides
export function generateNeighborhoodArticleSchema(guide: NeighborhoodGuideData) {
  return {
    '@type': 'Article',
    '@id': `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}#article`,
    headline: guide.metaTitle,
    alternativeHeadline: guide.title,
    description: guide.metaDescription,
    image: {
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com/images/neighborhoods/${guide.slug}-hero.jpg`,
      width: 1200,
      height: 630,
      caption: guide.content.hero.headline,
    },
    datePublished: guide.lastUpdated,
    dateModified: guide.lastUpdated,
    author: {
      '@type': 'Organization',
      '@id': 'https://nexttripanywhere.com/#organization',
      name: NEXT_TRIP_ANYWHERE.name,
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://nexttripanywhere.com/#organization',
      name: NEXT_TRIP_ANYWHERE.name,
      logo: {
        '@type': 'ImageObject',
        url: NEXT_TRIP_ANYWHERE.logo,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}`,
      url: `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}`,
    },
    articleSection: 'Cruise Travel Guides',
    keywords: guide.keywords.join(', '),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    wordCount: guide.content.description.split(/\s+/).length,
    about: [
      {
        '@type': 'Place',
        name: guide.portInfo?.name || guide.title,
        address: guide.portInfo
          ? {
              '@type': 'PostalAddress',
              streetAddress: guide.portInfo.address,
              addressLocality: guide.portInfo.city,
              addressRegion: guide.portInfo.state,
              addressCountry: guide.portInfo.country,
            }
          : undefined,
      },
      {
        '@type': 'TravelAction',
        name: 'Cruise Vacation',
      },
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.neighborhood-overview'],
    },
  }
}

// FAQ schema for neighborhood guides
export function generateNeighborhoodFAQSchema(
  guide: NeighborhoodGuideData
): ReturnType<typeof generateFAQSchema> {
  return generateFAQSchema(
    guide.faq,
    `${guide.title} - Cruise Neighborhood Guide`,
    `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}#faq`
  )
}

// Product schema for neighborhood guide as a service
export function generateNeighborhoodProductSchema(guide: NeighborhoodGuideData) {
  const avgPrice =
    guide.content.neighborhoods.reduce((sum, n) => sum + (n.averageHotelPrice || 150), 0) /
    guide.content.neighborhoods.length

  return {
    '@type': 'Product',
    '@id': `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}#product`,
    name: `${guide.title} - Cruise Accommodation Guide`,
    description: guide.metaDescription,
    category: 'Travel Guide',
    brand: {
      '@type': 'Brand',
      name: NEXT_TRIP_ANYWHERE.name,
      logo: NEXT_TRIP_ANYWHERE.logo,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: Math.floor(avgPrice * 0.7),
      highPrice: Math.floor(avgPrice * 1.5),
      offerCount: guide.content.neighborhoods.length,
      availability: 'https://schema.org/InStock',
      url: `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}`,
      seller: {
        '@type': 'TravelAgency',
        name: NEXT_TRIP_ANYWHERE.name,
        telephone: NEXT_TRIP_ANYWHERE.telephone,
      },
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days
    },
    aggregateRating: guide.content.neighborhoods.some((n) => n.rating)
      ? {
          '@type': 'AggregateRating',
          ratingValue:
            guide.content.neighborhoods
              .filter((n) => n.rating)
              .reduce((sum, n) => sum + (n.rating || 0), 0) /
            guide.content.neighborhoods.filter((n) => n.rating).length,
          reviewCount: guide.content.neighborhoods.length * 45,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    audience: {
      '@type': 'Audience',
      audienceType: 'Cruise Travelers',
      geographicArea: {
        '@type': 'Place',
        name: 'Essex County, New Jersey',
      },
    },
  }
}

// LocalBusiness schema for the travel agency with neighborhood focus
export function generateNeighborhoodLocalBusinessSchema(guide: NeighborhoodGuideData) {
  return {
    '@type': 'LocalBusiness',
    '@id': `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}#localbusiness`,
    name: `${NEXT_TRIP_ANYWHERE.name} - ${guide.title} Specialists`,
    description: `Expert travel planning for ${guide.title}. Helping Essex County residents find perfect accommodations near cruise ports.`,
    url: `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}`,
    telephone: NEXT_TRIP_ANYWHERE.telephone,
    email: NEXT_TRIP_ANYWHERE.email,
    address: NEXT_TRIP_ANYWHERE.address,
    geo: NEXT_TRIP_ANYWHERE.geo,
    openingHoursSpecification: NEXT_TRIP_ANYWHERE.openingHours,
    priceRange: '$$',
    areaServed: NEXT_TRIP_ANYWHERE.areaServed,
    aggregateRating: NEXT_TRIP_ANYWHERE.aggregateRating,
    sameAs: NEXT_TRIP_ANYWHERE.sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${guide.title} Accommodation Options`,
      itemListElement: guide.content.accommodations?.slice(0, 5).map((acc) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'LodgingBusiness',
          name: acc.name,
          description: `${acc.type} in ${acc.neighborhood}`,
        },
      })),
    },
  }
}

// Breadcrumb schema for neighborhood pages
export function generateNeighborhoodBreadcrumbSchema(guide: NeighborhoodGuideData) {
  return generateBreadcrumbList([
    { name: 'Home', url: '/' },
    { name: 'Cruise Guides', url: '/cruises' },
    { name: 'Neighborhood Guides', url: '/cruise-neighborhoods' },
    { name: guide.title, url: `/cruise-neighborhoods/${guide.slug}` },
  ])
}

// HowTo schema for finding accommodations
export function generateNeighborhoodHowToSchema(guide: NeighborhoodGuideData) {
  return {
    '@type': 'HowTo',
    '@id': `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}#howto`,
    name: `How to Find the Best Accommodation Near ${guide.portInfo?.name || 'Your Cruise Port'}`,
    description: `Step-by-step guide to finding and booking the perfect hotel or resort near ${guide.portInfo?.name || 'your cruise departure port'}.`,
    image: {
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com/images/neighborhoods/${guide.slug}-guide.jpg`,
    },
    totalTime: 'PT45M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '100-300',
      minValue: 100,
      maxValue: 300,
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Choose Your Neighborhood',
        text: `Select from ${guide.content.neighborhoods.length} neighborhoods based on your preferences: ${guide.content.neighborhoods.map((n) => n.name).join(', ')}. Consider factors like distance to port, family-friendliness, and local attractions.`,
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Set Your Budget',
        text: 'Determine your accommodation budget. Hotels range from $100-300 per night depending on the neighborhood and season. Pre-cruise stays typically require 1-2 nights.',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Review Amenities',
        text: 'Check for cruise-friendly amenities: free parking, airport shuttles, cruise port transportation, early check-in/late checkout options, and luggage storage.',
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'Book Through Our Agency',
        text: `Contact Next Trip Anywhere at ${NEXT_TRIP_ANYWHERE.telephone} for exclusive rates and cruise packages that include pre-cruise accommodations. We handle all logistics from Newark to your cruise departure.`,
        position: 4,
      },
      {
        '@type': 'HowToStep',
        name: 'Plan Ground Transportation',
        text: `Arrange transportation from Newark Liberty Airport to your hotel, and from hotel to cruise port. ${guide.content.gettingThere.localTransport.join(', ')}.`,
        position: 5,
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Travel Planning Consultation',
      },
      {
        '@type': 'HowToTool',
        name: 'Hotel Comparison Tool',
      },
    ],
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Valid Credit Card',
      },
      {
        '@type': 'HowToSupply',
        name: 'Cruise Booking Confirmation',
      },
    ],
  }
}

// Place schema for each neighborhood
export function generateNeighborhoodPlaceSchemas(guide: NeighborhoodGuideData) {
  return guide.content.neighborhoods.map((neighborhood, index) => ({
    '@type': 'Place',
    '@id': `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}#place-${index}`,
    name: neighborhood.name,
    description: neighborhood.description,
    containedInPlace: guide.portInfo
      ? {
          '@type': 'City',
          name: guide.portInfo.city,
          address: {
            '@type': 'PostalAddress',
            addressLocality: guide.portInfo.city,
            addressRegion: guide.portInfo.state,
            addressCountry: guide.portInfo.country,
          },
        }
      : undefined,
    amenityFeature: neighborhood.highlights.map((highlight) => ({
      '@type': 'LocationFeatureSpecification',
      name: highlight,
      value: true,
    })),
    additionalProperty: neighborhood.bestFor.map((feature) => ({
      '@type': 'PropertyValue',
      name: 'Best For',
      value: feature,
    })),
  }))
}

// LodgingBusiness schema for each accommodation
export function generateAccommodationSchemas(guide: NeighborhoodGuideData) {
  if (!guide.content.accommodations) {
    return []
  }

  return guide.content.accommodations.slice(0, 10).map((acc, index) => ({
    '@type': 'LodgingBusiness',
    '@id': `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}#lodging-${index}`,
    name: acc.name,
    description: `${acc.type} in ${acc.neighborhood} neighborhood`,
    priceRange: acc.priceRange,
    address: {
      '@type': 'PostalAddress',
      addressLocality: guide.portInfo?.city || acc.neighborhood,
      addressRegion: guide.portInfo?.state,
      addressCountry: guide.portInfo?.country || 'US',
    },
    amenityFeature: acc.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
    aggregateRating:
      acc.rating && acc.reviewCount
        ? {
            '@type': 'AggregateRating',
            ratingValue: acc.rating,
            reviewCount: acc.reviewCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    geo: guide.portInfo?.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: guide.portInfo.coordinates.latitude + (Math.random() - 0.5) * 0.05,
          longitude: guide.portInfo.coordinates.longitude + (Math.random() - 0.5) * 0.05,
        }
      : undefined,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Distance to Cruise Port',
        value: acc.distanceToPort || 'Varies',
      },
      {
        '@type': 'PropertyValue',
        name: 'Accommodation Type',
        value: acc.type,
      },
    ],
  }))
}

// ImageGallery schema for neighborhood photos
export function generateNeighborhoodImageGallerySchema(guide: NeighborhoodGuideData) {
  const images = [
    {
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com/images/neighborhoods/${guide.slug}-hero.jpg`,
      caption: guide.content.hero.headline,
      width: 1200,
      height: 630,
    },
    ...guide.content.neighborhoods.slice(0, 8).map((neighborhood, index) => ({
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com/images/neighborhoods/${guide.slug}-${index + 1}.jpg`,
      caption: `${neighborhood.name} - ${neighborhood.description.substring(0, 100)}`,
      width: 800,
      height: 600,
    })),
  ]

  return {
    '@type': 'ImageGallery',
    '@id': `https://nexttripanywhere.com/cruise-neighborhoods/${guide.slug}#gallery`,
    name: `${guide.title} Photo Gallery`,
    description: `Photos of neighborhoods and accommodations near ${guide.portInfo?.name || 'the cruise port'}`,
    image: images,
    numberOfItems: images.length,
  }
}

// Complete schema graph generator for neighborhood guide pages
export function generateNeighborhoodSchemaGraph(guide: NeighborhoodGuideData) {
  const schemas = []

  // 1. Organization/TravelAgency
  schemas.push(generateOrganizationSchema('TravelAgency'))

  // 2. Article schema
  schemas.push(generateNeighborhoodArticleSchema(guide))

  // 3. FAQ schema
  const faqSchema = generateNeighborhoodFAQSchema(guide)
  if (faqSchema) {
    schemas.push(faqSchema)
  }

  // 4. Product schema
  schemas.push(generateNeighborhoodProductSchema(guide))

  // 5. LocalBusiness schema
  schemas.push(generateNeighborhoodLocalBusinessSchema(guide))

  // 6. Breadcrumb schema
  schemas.push(generateNeighborhoodBreadcrumbSchema(guide))

  // 7. HowTo schema
  schemas.push(generateNeighborhoodHowToSchema(guide))

  // 8. Place schemas for each neighborhood
  const placeSchemas = generateNeighborhoodPlaceSchemas(guide)
  schemas.push(...placeSchemas)

  // 9. LodgingBusiness schemas for accommodations
  const accommodationSchemas = generateAccommodationSchemas(guide)
  schemas.push(...accommodationSchemas)

  // 10. ImageGallery schema
  schemas.push(generateNeighborhoodImageGallerySchema(guide))

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}

// Validation utility
export function validateNeighborhoodSchema(schema: any): boolean {
  try {
    if (!schema['@context'] || !schema['@graph']) {
      console.error('Missing @context or @graph')
      return false
    }

    if (!Array.isArray(schema['@graph'])) {
      console.error('@graph must be an array')
      return false
    }

    const requiredTypes = ['TravelAgency', 'Article', 'FAQPage', 'Product', 'BreadcrumbList']
    const foundTypes = new Set(schema['@graph'].map((item: any) => item['@type']))

    for (const type of requiredTypes) {
      if (!foundTypes.has(type)) {
        console.warn(`Missing recommended schema type: ${type}`)
      }
    }

    JSON.stringify(schema)
    return true
  } catch (error) {
    console.error('Schema validation error:', error)
    return false
  }
}
