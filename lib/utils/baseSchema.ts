/**
 * Base schema components and utilities shared across all schema generators
 * Provides consistent organization, breadcrumb, and common structured data
 */

// Base type definitions shared across all schemas
export interface BaseOrganization {
  '@type': 'Organization' | 'TravelAgency' | 'LocalBusiness'
  '@id'?: string
  name: string
  url?: string
  logo?: string | ImageObject
  image?: string | string[] | ImageObject | ImageObject[]
  description?: string
  telephone?: string
  email?: string
  address?: PostalAddress
  geo?: GeoCoordinates
  sameAs?: string[]
  areaServed?: Place | Place[] | AdministrativeArea | AdministrativeArea[]
  aggregateRating?: AggregateRating
  review?: Review[]
  openingHoursSpecification?: OpeningHoursSpecification[]
  priceRange?: string
  paymentAccepted?: string | string[]
  currenciesAccepted?: string
}

export interface PostalAddress {
  '@type': 'PostalAddress'
  streetAddress?: string
  addressLocality: string
  addressRegion?: string
  postalCode?: string
  addressCountry: string
  postOfficeBoxNumber?: string
}

export interface GeoCoordinates {
  '@type': 'GeoCoordinates'
  latitude: number
  longitude: number
  elevation?: number
}

export interface ImageObject {
  '@type': 'ImageObject'
  '@id'?: string
  url: string
  contentUrl?: string
  width?: number
  height?: number
  caption?: string
  thumbnail?: ImageObject
  representativeOfPage?: boolean
}

export interface Place {
  '@type': 'Place' | string
  '@id'?: string
  name: string
  description?: string
  address?: PostalAddress
  geo?: GeoCoordinates
  url?: string
  telephone?: string
  image?: string | ImageObject | ImageObject[]
  sameAs?: string[]
}

export interface AdministrativeArea {
  '@type': 'AdministrativeArea'
  name: string
  containedInPlace?: AdministrativeArea | Place
  geo?: GeoCoordinates
}

export interface AggregateRating {
  '@type': 'AggregateRating'
  '@id'?: string
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
  ratingCount?: number
}

export interface Review {
  '@type': 'Review'
  '@id'?: string
  author: Person | Organization
  datePublished: string
  reviewRating: Rating
  reviewBody?: string
  headline?: string
  inLanguage?: string
}

export interface Rating {
  '@type': 'Rating'
  ratingValue: number
  bestRating?: number
  worstRating?: number
}

export interface Person {
  '@type': 'Person'
  '@id'?: string
  name: string
  url?: string
  image?: string | ImageObject
  jobTitle?: string
  worksFor?: Organization
  sameAs?: string[]
  description?: string
  email?: string
}

export interface Organization {
  '@type': 'Organization'
  '@id'?: string
  name: string
  url?: string
  logo?: string | ImageObject
  sameAs?: string[]
  description?: string
}

export interface OpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification'
  dayOfWeek: string | string[]
  opens?: string
  closes?: string
  validFrom?: string
  validThrough?: string
}

export interface WebPage {
  '@type': 'WebPage'
  '@id'?: string
  url: string
  name?: string
  description?: string
  breadcrumb?: BreadcrumbList
  primaryImageOfPage?: ImageObject
  lastReviewed?: string
  datePublished?: string
  dateModified?: string
  author?: Person | Organization
  publisher?: Organization
  mainEntity?: any
  mainEntityOfPage?: WebPage | string
  isPartOf?: WebSite
}

export interface WebSite {
  '@type': 'WebSite'
  '@id'?: string
  url: string
  name: string
  description?: string
  publisher?: Organization
  inLanguage?: string | string[]
  potentialAction?: SearchAction
  hasPart?: WebPage[]
}

export interface SearchAction {
  '@type': 'SearchAction'
  target: {
    '@type': 'EntryPoint'
    urlTemplate: string
  }
  'query-input': string
}

export interface BreadcrumbList {
  '@context'?: string
  '@type': 'BreadcrumbList'
  '@id'?: string
  itemListElement: ListItem[]
  numberOfItems?: number
}

export interface ListItem {
  '@type': 'ListItem'
  position: number
  name: string
  item?: string
}

export interface FAQPage {
  '@context'?: string
  '@type': 'FAQPage'
  '@id'?: string
  mainEntity: Question[]
  about?: any
  isPartOf?: WebSite
}

export interface Question {
  '@type': 'Question'
  '@id'?: string
  name: string
  acceptedAnswer: Answer
  suggestedAnswer?: Answer[]
  answerCount?: number
  upvoteCount?: number
  dateCreated?: string
  author?: Person
}

export interface Answer {
  '@type': 'Answer'
  '@id'?: string
  text: string
  dateCreated?: string
  upvoteCount?: number
  url?: string
  author?: Person
}

export interface Service {
  '@context'?: string
  '@type': 'Service'
  '@id'?: string
  name: string
  description?: string
  provider?: Organization | Person
  serviceType?: string
  areaServed?: Place | AdministrativeArea | AdministrativeArea[]
  hasOfferCatalog?: OfferCatalog
  aggregateRating?: AggregateRating
  review?: Review[]
  category?: string
  availableChannel?: ServiceChannel[]
  termsOfService?: string
  serviceOutput?: string
  hoursAvailable?: OpeningHoursSpecification[]
}

export interface OfferCatalog {
  '@type': 'OfferCatalog'
  name: string
  itemListElement: Offer[]
}

export interface Offer {
  '@type': 'Offer' | 'AggregateOffer'
  '@id'?: string
  url?: string
  priceCurrency?: string
  price?: number | string
  priceValidUntil?: string
  itemCondition?: string
  availability?: string
  seller?: Organization
  validFrom?: string
  validThrough?: string
  category?: string
}

export interface ServiceChannel {
  '@type': 'ServiceChannel'
  serviceUrl?: string
  servicePhone?: string
  availableLanguage?: string | string[]
  serviceLocation?: Place
  processingTime?: string
}

// Constants for consistent data across all schemas
export const NEXT_TRIP_ANYWHERE = {
  name: 'Next Trip Anywhere',
  url: 'https://nexttripanywhere.com',
  telephone: '+1-833-874-1019',
  email: 'hello@nexttripanywhere.com',
  logo: 'https://nexttripanywhere.com/images/logo.png',
  images: [
    'https://nexttripanywhere.com/images/office-1x1.jpg',
    'https://nexttripanywhere.com/images/office-4x3.jpg',
    'https://nexttripanywhere.com/images/office-16x9.jpg',
  ],
  description:
    'Full-service travel agency specializing in cruises, vacation packages, and all-inclusive resorts for Essex County, New Jersey residents.',
  sameAs: [
    'https://www.facebook.com/nexttripanywhere',
    'https://www.instagram.com/nexttripanywhere',
    'https://www.linkedin.com/company/nexttripanywhere',
    'https://twitter.com/nexttripanywhere',
    'https://www.youtube.com/@nexttripanywhere',
  ],
  address: {
    '@type': 'PostalAddress' as const,
    addressLocality: 'Newark',
    addressRegion: 'NJ',
    postalCode: '07102',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates' as const,
    latitude: 40.7357,
    longitude: -74.1724,
  },
  openingHours: [
    {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00',
    },
  ],
  areaServed: [
    {
      '@type': 'AdministrativeArea' as const,
      name: 'Essex County, New Jersey',
      geo: {
        '@type': 'GeoCoordinates' as const,
        latitude: 40.7876,
        longitude: -74.2445,
      },
    },
    {
      '@type': 'AdministrativeArea' as const,
      name: 'New Jersey',
    },
    {
      '@type': 'AdministrativeArea' as const,
      name: 'New York Metropolitan Area',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating' as const,
    ratingValue: 4.8,
    reviewCount: 342,
    bestRating: 5,
    worstRating: 1,
  },
}

// Main organization schema generator
export function generateOrganizationSchema(
  type: 'Organization' | 'TravelAgency' | 'LocalBusiness' = 'TravelAgency'
): BaseOrganization {
  return {
    '@type': type,
    '@id': 'https://nexttripanywhere.com/#organization',
    name: NEXT_TRIP_ANYWHERE.name,
    url: NEXT_TRIP_ANYWHERE.url,
    logo: NEXT_TRIP_ANYWHERE.logo,
    image: NEXT_TRIP_ANYWHERE.images,
    description: NEXT_TRIP_ANYWHERE.description,
    telephone: NEXT_TRIP_ANYWHERE.telephone,
    email: NEXT_TRIP_ANYWHERE.email,
    address: NEXT_TRIP_ANYWHERE.address,
    geo: NEXT_TRIP_ANYWHERE.geo,
    sameAs: NEXT_TRIP_ANYWHERE.sameAs,
    areaServed: NEXT_TRIP_ANYWHERE.areaServed,
    aggregateRating: NEXT_TRIP_ANYWHERE.aggregateRating,
    openingHoursSpecification: NEXT_TRIP_ANYWHERE.openingHours,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal', 'Venmo'],
  }
}

// Website schema generator
export function generateWebSiteSchema(): WebSite {
  return {
    '@type': 'WebSite',
    '@id': 'https://nexttripanywhere.com/#website',
    url: 'https://nexttripanywhere.com',
    name: 'Next Trip Anywhere - Essex County Travel Agency',
    description:
      'Your trusted travel partner for cruises, vacation packages, and all-inclusive resorts from Newark and Essex County, New Jersey',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://nexttripanywhere.com/#organization',
      name: NEXT_TRIP_ANYWHERE.name,
    },
    inLanguage: ['en-US', 'es'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://nexttripanywhere.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// Breadcrumb generator
export function generateBreadcrumbList(
  items: Array<{ name: string; url?: string }>
): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    '@id': `https://nexttripanywhere.com${items[items.length - 1].url || ''}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.url ? `https://nexttripanywhere.com${item.url}` : undefined,
    })),
    numberOfItems: items.length,
  }
}

// Service schema generator
export function generateServiceSchema(service: {
  name: string
  description: string
  serviceType: string
  category?: string
  url?: string
}): Service {
  return {
    '@type': 'Service',
    '@id': `https://nexttripanywhere.com/#service-${service.serviceType.toLowerCase().replace(/\s+/g, '-')}`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    category: service.category,
    provider: generateOrganizationSchema('TravelAgency') as Organization,
    areaServed: NEXT_TRIP_ANYWHERE.areaServed,
    aggregateRating: NEXT_TRIP_ANYWHERE.aggregateRating,
    availableChannel: [
      {
        '@type': 'ServiceChannel',
        serviceUrl: service.url || 'https://nexttripanywhere.com/contact',
        servicePhone: NEXT_TRIP_ANYWHERE.telephone,
        availableLanguage: ['English', 'Spanish'],
      },
    ],
  }
}

// FAQ generator
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
  about?: string,
  id?: string
): FAQPage {
  return {
    '@type': 'FAQPage',
    '@id': id || 'https://nexttripanywhere.com/#faq',
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question' as const,
      '@id': `${id || 'https://nexttripanywhere.com/#faq'}-q${index + 1}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        '@id': `${id || 'https://nexttripanywhere.com/#faq'}-a${index + 1}`,
        text: faq.answer,
      },
      answerCount: 1,
    })),
    about: about
      ? {
          '@type': 'Thing',
          name: about,
        }
      : undefined,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://nexttripanywhere.com/#website',
      url: 'https://nexttripanywhere.com',
      name: 'Next Trip Anywhere',
    },
  }
}

// Schema validation utility
export function validateSchema(schema: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check for @context
  if (!schema['@context'] && !schema['@graph']) {
    errors.push('Missing @context at root level')
  }

  // If it's a graph, validate each item
  if (schema['@graph']) {
    if (!Array.isArray(schema['@graph'])) {
      errors.push('@graph must be an array')
    } else {
      schema['@graph'].forEach((item: any, index: number) => {
        if (!item['@type']) {
          errors.push(`Item at index ${index} missing @type`)
        }
      })
    }
  } else {
    // Single schema item
    if (!schema['@type']) {
      errors.push('Missing @type property')
    }
  }

  // Validate JSON serialization
  try {
    JSON.stringify(schema)
  } catch (error) {
    errors.push(`Invalid JSON structure: ${error}`)
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Schema graph builder
export class SchemaGraphBuilder {
  private schemas: any[] = []
  private context = 'https://schema.org'

  addSchema(schema: any): this {
    // Remove @context from individual schemas when adding to graph
    const { '@context': _, ...schemaWithoutContext } = schema
    this.schemas.push(schemaWithoutContext)
    return this
  }

  addOrganization(): this {
    this.schemas.push(generateOrganizationSchema())
    return this
  }

  addWebSite(): this {
    this.schemas.push(generateWebSiteSchema())
    return this
  }

  addBreadcrumb(items: Array<{ name: string; url?: string }>): this {
    this.schemas.push(generateBreadcrumbList(items))
    return this
  }

  addService(service: {
    name: string
    description: string
    serviceType: string
    category?: string
  }): this {
    this.schemas.push(generateServiceSchema(service))
    return this
  }

  addFAQ(faqs: Array<{ question: string; answer: string }>, about?: string): this {
    if (faqs && faqs.length > 0) {
      this.schemas.push(generateFAQSchema(faqs, about))
    }
    return this
  }

  build(): { '@context': string; '@graph': any[] } {
    return {
      '@context': this.context,
      '@graph': this.schemas,
    }
  }

  validate(): { valid: boolean; errors: string[] } {
    return validateSchema(this.build())
  }
}

// Utility to merge multiple schema graphs
export function mergeSchemaGraphs(...graphs: any[]): { '@context': string; '@graph': any[] } {
  const mergedSchemas: any[] = []
  const seenIds = new Set<string>()

  graphs.forEach((graph) => {
    if (graph['@graph']) {
      graph['@graph'].forEach((schema: any) => {
        // Avoid duplicates based on @id
        if (schema['@id']) {
          if (!seenIds.has(schema['@id'])) {
            seenIds.add(schema['@id'])
            mergedSchemas.push(schema)
          }
        } else {
          // No @id, include it
          mergedSchemas.push(schema)
        }
      })
    } else if (graph['@type']) {
      // Single schema, not a graph
      if (graph['@id']) {
        if (!seenIds.has(graph['@id'])) {
          seenIds.add(graph['@id'])
          const { '@context': _, ...schemaWithoutContext } = graph
          mergedSchemas.push(schemaWithoutContext)
        }
      } else {
        const { '@context': _, ...schemaWithoutContext } = graph
        mergedSchemas.push(schemaWithoutContext)
      }
    }
  })

  return {
    '@context': 'https://schema.org',
    '@graph': mergedSchemas,
  }
}

// Rich snippet preview generator (for development/testing)
export function previewRichSnippet(schema: any): string {
  let preview = ''

  if (schema['@type'] === 'FAQPage' || (schema.mainEntity && Array.isArray(schema.mainEntity))) {
    preview += 'FAQ Rich Snippet:\n'
    schema.mainEntity.forEach((q: any, i: number) => {
      if (i < 3) {
        // Google typically shows 2-3 FAQs
        preview += `Q: ${q.name}\n`
        preview += `A: ${q.acceptedAnswer.text.substring(0, 100)}...\n\n`
      }
    })
  }

  if (schema['@type'] === 'Product' || schema.offers) {
    preview += 'Product Rich Snippet:\n'
    preview += `Name: ${schema.name}\n`
    if (schema.aggregateRating) {
      preview += `Rating: ${'★'.repeat(Math.round(schema.aggregateRating.ratingValue))} ${schema.aggregateRating.ratingValue} (${schema.aggregateRating.reviewCount} reviews)\n`
    }
    if (schema.offers) {
      const price = schema.offers.lowPrice || schema.offers.price
      preview += `Price: From $${price}\n`
    }
  }

  if (schema['@type'] === 'BreadcrumbList' || schema.itemListElement) {
    preview += 'Breadcrumb:\n'
    schema.itemListElement.forEach((item: any, i: number) => {
      preview += i === 0 ? item.name : ` > ${item.name}`
    })
    preview += '\n'
  }

  return preview || 'No rich snippet preview available for this schema type'
}

// All utilities are already exported inline above
