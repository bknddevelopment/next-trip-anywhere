/**
 * Schema generators for cruise-related pages
 * Provides structured data for better SEO and rich snippets
 */

import { CruiseDestination } from '@/lib/data/cruises'

interface TravelAgencySchema {
  '@context': string
  '@type': string
  name: string
  url: string
  logo?: string
  telephone?: string
  email?: string
  address: {
    '@type': string
    streetAddress?: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
    addressCountry: string
  }
  geo?: {
    '@type': string
    latitude: number
    longitude: number
  }
  service?: {
    '@type': string
    name: string
    description?: string
    provider?: any
    areaServed?: any
  }
  openingHoursSpecification?: Array<{
    '@type': string
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  sameAs?: string[]
}

interface FAQSchema {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

interface LocalBusinessSchema {
  '@context': string
  '@type': string
  '@id': string
  name: string
  description: string
  url: string
  telephone: string
  address: {
    '@type': string
    streetAddress?: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
    addressCountry: string
  }
  geo?: {
    '@type': string
    latitude: number
    longitude: number
  }
  openingHoursSpecification?: Array<{
    '@type': string
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  priceRange?: string
  servesCuisine?: string
  hasMap?: string
}

interface BreadcrumbSchema {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item?: string
  }>
}

interface ServiceSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  provider: {
    '@type': string
    name: string
    telephone?: string
    email?: string
  }
  serviceType?: string
  areaServed?: {
    '@type': string
    name: string
  }
  hasOfferCatalog?: {
    '@type': string
    name: string
    itemListElement: Array<{
      '@type': string
      itemOffered: {
        '@type': string
        name: string
        description?: string
      }
    }>
  }
}

// Generate TravelAgency schema for cruise pages
export function generateCruiseTravelAgencySchema(cruise?: CruiseDestination): TravelAgencySchema {
  const baseSchema: TravelAgencySchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Next Trip Anywhere',
    url: 'https://nexttripanywhere.com',
    telephone: '+1-833-874-1019',
    email: 'hello@nexttripanywhere.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Newark',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7357,
      longitude: -74.1724,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/nexttripanywhere',
      'https://www.instagram.com/nexttripanywhere',
      'https://www.linkedin.com/company/nexttripanywhere',
    ],
  }

  if (cruise) {
    baseSchema.service = {
      '@type': 'Service',
      name: cruise.title,
      description: cruise.content.description,
      provider: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Essex County, New Jersey',
      },
    }
  }

  return baseSchema
}

// Generate FAQ schema from cruise FAQ data
export function generateCruiseFAQSchema(
  faqs?: Array<{ question: string; answer: string }>
): FAQSchema | null {
  if (!faqs || faqs.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Generate LocalBusiness schema for physical location references
export function generateCruiseLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://nexttripanywhere.com/#organization',
    name: 'Next Trip Anywhere - Essex County Travel Agency',
    description:
      'Full-service travel agency specializing in cruises, flights, and vacation packages for Essex County residents',
    url: 'https://nexttripanywhere.com',
    telephone: '+1-833-874-1019',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Newark',
      addressRegion: 'NJ',
      postalCode: '07102',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7357,
      longitude: -74.1724,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
    priceRange: '$$',
    hasMap: 'https://goo.gl/maps/nexttripanywhere',
  }
}

// Generate breadcrumb schema for navigation
export function generateCruiseBreadcrumbSchema(
  cruiseName?: string,
  cruiseUrl?: string
): BreadcrumbSchema {
  const items = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'Home',
      item: 'https://nexttripanywhere.com',
    },
    {
      '@type': 'ListItem' as const,
      position: 2,
      name: 'Cruises',
      item: 'https://nexttripanywhere.com/cruises',
    },
  ]

  if (cruiseName && cruiseUrl) {
    items.push({
      '@type': 'ListItem' as const,
      position: 3,
      name: cruiseName,
      item: `https://nexttripanywhere.com${cruiseUrl}`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

// Generate Service schema for specific cruise services
export function generateCruiseServiceSchema(cruise: CruiseDestination): ServiceSchema {
  const services = []

  if (cruise.content.popularCruiseLines) {
    services.push(
      ...cruise.content.popularCruiseLines.map((line) => ({
        '@type': 'Offer' as const,
        itemOffered: {
          '@type': 'Service',
          name: line,
          description: `${line} cruise departures`,
        },
      }))
    )
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cruise.title,
    description: cruise.content.description,
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
      telephone: '+1-833-874-1019',
      email: 'hello@nexttripanywhere.com',
    },
    serviceType: 'Cruise Booking Service',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Essex County, New Jersey',
    },
    hasOfferCatalog:
      services.length > 0
        ? {
            '@type': 'OfferCatalog',
            name: `${cruise.title} Options`,
            itemListElement: services,
          }
        : undefined,
  }
}

// Generate Product schema for cruise packages
export function generateCruiseProductSchema(cruise: CruiseDestination) {
  if (!cruise.content.startingPrice) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: cruise.title,
    description: cruise.metaDescription,
    brand: {
      '@type': 'Brand',
      name: 'Next Trip Anywhere',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: cruise.content.startingPrice,
      offerCount: cruise.content.popularCruiseLines?.length || 1,
      seller: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
      },
    },
  }
}

// Generate Event schema for specific cruise departures
export function generateCruiseDepartureEventSchema(
  cruiseName: string,
  departureDate?: string,
  duration?: string
) {
  if (!departureDate) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${cruiseName} Departure`,
    startDate: departureDate,
    endDate: duration ? calculateEndDate(departureDate, duration) : undefined,
    location: {
      '@type': 'Place',
      name: 'Cape Liberty Cruise Port',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '14 Port Terminal Blvd',
        addressLocality: 'Bayonne',
        addressRegion: 'NJ',
        postalCode: '07002',
        addressCountry: 'US',
      },
    },
    organizer: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
      url: 'https://nexttripanywhere.com',
    },
  }
}

// Helper function to calculate end date from duration
function calculateEndDate(startDate: string, duration: string): string {
  const start = new Date(startDate)
  const nights = parseInt(duration.match(/\d+/)?.[0] || '7')
  const end = new Date(start)
  end.setDate(end.getDate() + nights)
  return end.toISOString().split('T')[0]
}

// Combine all schemas into a graph for comprehensive structured data
export function generateCruiseSchemaGraph(cruise: CruiseDestination) {
  const schemas = []

  // Add TravelAgency schema
  const travelAgencySchema = generateCruiseTravelAgencySchema(cruise)
  if (travelAgencySchema) {
    schemas.push(travelAgencySchema)
  }

  // Add FAQ schema
  const faqSchema = generateCruiseFAQSchema(cruise.faq)
  if (faqSchema) {
    schemas.push(faqSchema)
  }

  // Add LocalBusiness schema
  const localBusinessSchema = generateCruiseLocalBusinessSchema()
  if (localBusinessSchema) {
    schemas.push(localBusinessSchema)
  }

  // Add Breadcrumb schema
  const breadcrumbSchema = generateCruiseBreadcrumbSchema(cruise.title, `/cruises/${cruise.slug}`)
  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema)
  }

  // Add Service schema
  const serviceSchema = generateCruiseServiceSchema(cruise)
  if (serviceSchema) {
    schemas.push(serviceSchema)
  }

  // Add Product schema if price is available
  const productSchema = generateCruiseProductSchema(cruise)
  if (productSchema) {
    schemas.push(productSchema)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}
