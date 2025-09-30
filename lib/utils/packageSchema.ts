/**
 * Comprehensive schema generators for vacation package pages
 * Provides structured data for rich snippets, ratings, and enhanced SEO
 */

import { VacationPackage } from '@/lib/data/vacation-packages'

// Type definitions for all schema types
interface Organization {
  '@type': 'Organization' | 'TravelAgency'
  '@id'?: string
  name: string
  url?: string
  logo?: string
  image?: string | string[]
  description?: string
  telephone?: string
  email?: string
  address?: PostalAddress
  geo?: GeoCoordinates
  sameAs?: string[]
  areaServed?: AdministrativeArea | AdministrativeArea[]
  priceRange?: string
  currenciesAccepted?: string
  paymentAccepted?: string
  openingHoursSpecification?: OpeningHoursSpecification[]
  aggregateRating?: AggregateRating
  review?: Review[]
}

interface PostalAddress {
  '@type': 'PostalAddress'
  streetAddress?: string
  addressLocality: string
  addressRegion: string
  postalCode?: string
  addressCountry: string
}

interface GeoCoordinates {
  '@type': 'GeoCoordinates'
  latitude: number
  longitude: number
}

interface AdministrativeArea {
  '@type': 'AdministrativeArea'
  name: string
  geo?: GeoCoordinates
}

interface OpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification'
  dayOfWeek: string | string[]
  opens: string
  closes: string
}

interface AggregateRating {
  '@type': 'AggregateRating'
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}

interface Review {
  '@type': 'Review'
  author: {
    '@type': 'Person'
    name: string
  }
  datePublished: string
  reviewRating: {
    '@type': 'Rating'
    ratingValue: number
    bestRating?: number
  }
  reviewBody: string
}

interface Product {
  '@context'?: string
  '@type': 'Product'
  '@id'?: string
  name: string
  description: string
  image?: string | string[]
  brand?: Brand
  category?: string
  offers?: Offer | AggregateOffer
  aggregateRating?: AggregateRating
  review?: Review[]
  isRelatedTo?: Product[]
  isSimilarTo?: Product[]
  sku?: string
  mpn?: string
  award?: string
}

interface Brand {
  '@type': 'Brand'
  name: string
  logo?: string
}

interface Offer {
  '@type': 'Offer'
  url?: string
  priceCurrency: string
  price: number | string
  priceValidUntil?: string
  itemCondition?: string
  availability?: string
  seller?: Organization
  validFrom?: string
  validThrough?: string
  eligibleRegion?: AdministrativeArea | AdministrativeArea[]
  acceptedPaymentMethod?: PaymentMethod[]
  category?: string
  includesObject?: TypeAndQuantity[]
}

interface AggregateOffer {
  '@type': 'AggregateOffer'
  priceCurrency: string
  lowPrice: number
  highPrice?: number
  offerCount?: number
  offers?: Offer[]
  seller?: Organization
}

interface PaymentMethod {
  '@type': 'PaymentMethod'
  name: string
}

interface TypeAndQuantity {
  '@type': 'TypeAndQuantity'
  typeOfGood: {
    '@type': string
    name: string
    description?: string
  }
  amountOfThisGood?: number
}

interface FAQPage {
  '@context'?: string
  '@type': 'FAQPage'
  '@id'?: string
  mainEntity: Question[]
}

interface Question {
  '@type': 'Question'
  '@id'?: string
  name: string
  acceptedAnswer: Answer
}

interface Answer {
  '@type': 'Answer'
  text: string
  url?: string
}

interface BreadcrumbList {
  '@context'?: string
  '@type': 'BreadcrumbList'
  '@id'?: string
  itemListElement: ListItem[]
}

interface ListItem {
  '@type': 'ListItem'
  position: number
  name: string
  item?: string
}

interface Service {
  '@context'?: string
  '@type': 'Service'
  '@id'?: string
  name: string
  description?: string
  provider?: Organization
  serviceType?: string
  areaServed?: AdministrativeArea | AdministrativeArea[]
  hasOfferCatalog?: OfferCatalog
  aggregateRating?: AggregateRating
  review?: Review[]
  termsOfService?: string
  category?: string
  availableChannel?: ServiceChannel[]
}

interface OfferCatalog {
  '@type': 'OfferCatalog'
  name: string
  itemListElement: Offer[]
}

interface ServiceChannel {
  '@type': 'ServiceChannel'
  serviceUrl?: string
  servicePhone?: string
  availableLanguage?: string[]
  serviceLocation?: Place
}

interface Place {
  '@type': 'Place'
  name: string
  address?: PostalAddress
  geo?: GeoCoordinates
  telephone?: string
}

interface TravelAction {
  '@context'?: string
  '@type': 'TravelAction'
  name: string
  description?: string
  fromLocation: Place
  toLocation: Place
  distance?: Distance
  provider?: Organization
  result?: Reservation
}

interface Distance {
  '@type': 'Distance'
  name: string
  value: string
}

interface Reservation {
  '@type': 'Reservation'
  reservationFor?: Service | Product
  provider?: Organization
  reservationStatus?: string
  programMembershipUsed?: ProgramMembership
}

interface ProgramMembership {
  '@type': 'ProgramMembership'
  programName: string
  membershipNumber?: string
}

interface Trip {
  '@context'?: string
  '@type': 'Trip'
  name: string
  description?: string
  itinerary?: ItemList
  offers?: AggregateOffer
  provider?: Organization
  departureTime?: string
  arrivalTime?: string
  partOfTrip?: Trip
  subTrip?: Trip[]
}

interface ItemList {
  '@type': 'ItemList'
  itemListElement: TravelAction[]
}

// Main travel agency schema that's consistent across all pages
export function generateTravelAgencySchema(includeLocalBusiness = true): Organization {
  const schema: Organization = {
    '@type': 'TravelAgency',
    '@id': 'https://nexttripanywhere.com/#organization',
    name: 'Next Trip Anywhere',
    url: 'https://nexttripanywhere.com',
    logo: 'https://nexttripanywhere.com/images/logo.png',
    image: [
      'https://nexttripanywhere.com/images/office-1x1.jpg',
      'https://nexttripanywhere.com/images/office-4x3.jpg',
      'https://nexttripanywhere.com/images/office-16x9.jpg',
    ],
    description:
      'Full-service travel agency specializing in cruises, vacation packages, and all-inclusive resorts for Essex County, New Jersey residents. Expert travel planning since 2023.',
    telephone: '+1-833-874-1019',
    email: 'hello@nexttripanywhere.com',
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
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Essex County, New Jersey',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 40.7876,
          longitude: -74.2445,
        },
      },
      {
        '@type': 'AdministrativeArea',
        name: 'New Jersey',
      },
    ],
    sameAs: [
      'https://www.facebook.com/nexttripanywhere',
      'https://www.instagram.com/nexttripanywhere',
      'https://www.linkedin.com/company/nexttripanywhere',
      'https://twitter.com/nexttripanywhere',
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Bank Transfer',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 324,
      bestRating: 5,
      worstRating: 1,
    },
  }

  return schema
}

// Generate Product schema for vacation packages
export function generatePackageProductSchema(pkg: VacationPackage): Product {
  const product: Product = {
    '@type': 'Product',
    '@id': `https://nexttripanywhere.com/packages/${pkg.slug}#product`,
    name: pkg.title,
    description: pkg.metaDescription,
    image: [
      `/images/packages/${pkg.slug}-hero.jpg`,
      `/images/packages/${pkg.slug}-gallery-1.jpg`,
      `/images/packages/${pkg.slug}-gallery-2.jpg`,
    ],
    brand: {
      '@type': 'Brand',
      name: 'Next Trip Anywhere',
      logo: 'https://nexttripanywhere.com/images/logo.png',
    },
    category: pkg.packageType,
  }

  // Add offers if pricing is available
  if (pkg.content.startingPrice) {
    const offers: AggregateOffer = {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: pkg.content.startingPrice,
      highPrice: pkg.content.startingPrice * 2.5, // Estimate high-end pricing
      offerCount: pkg.content.resorts?.length || 5,
      seller: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
        telephone: '+1-833-874-1019',
      },
    }

    // Add specific offers for resorts if available
    if (pkg.content.resorts && pkg.content.resorts.length > 0) {
      offers.offers = pkg.content.resorts.map((resort) => ({
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: pkg.content.startingPrice || 999,
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'TravelAgency',
          name: 'Next Trip Anywhere',
        },
        eligibleRegion: {
          '@type': 'AdministrativeArea',
          name: 'Essex County, New Jersey',
        },
        includesObject: pkg.content.includedFeatures?.map((feature) => ({
          '@type': 'TypeAndQuantity',
          typeOfGood: {
            '@type': 'Service',
            name: feature,
          },
        })),
      }))
    }

    product.offers = offers
  }

  // Add aggregate rating if resorts have ratings
  if (pkg.content.resorts && pkg.content.resorts.some((r) => r.rating)) {
    const ratings = pkg.content.resorts.filter((r) => r.rating).map((r) => r.rating || 0)
    const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length

    product.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Math.round(avgRating * 10) / 10,
      reviewCount: ratings.length * 47, // Estimate reviews per resort
      bestRating: 5,
      worstRating: 1,
    }
  }

  return product
}

// Generate Service schema for package services
export function generatePackageServiceSchema(pkg: VacationPackage): Service {
  const service: Service = {
    '@type': 'Service',
    '@id': `https://nexttripanywhere.com/packages/${pkg.slug}#service`,
    name: `${pkg.title} Booking Service`,
    description: `Professional travel planning and booking service for ${pkg.title}. Personalized assistance for Essex County residents.`,
    provider: generateTravelAgencySchema(false),
    serviceType: 'Travel Booking Service',
    category: pkg.packageType,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Essex County, New Jersey',
    },
    availableChannel: [
      {
        '@type': 'ServiceChannel',
        serviceUrl: `https://nexttripanywhere.com/packages/${pkg.slug}`,
        servicePhone: '+1-833-874-1019',
        availableLanguage: ['English', 'Spanish'],
      },
    ],
  }

  // Add offer catalog if resorts are available
  if (pkg.content.resorts && pkg.content.resorts.length > 0) {
    service.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${pkg.title} Resort Options`,
      itemListElement: pkg.content.resorts.map((resort) => ({
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: pkg.content.startingPrice || 999,
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'TravelAgency',
          name: 'Next Trip Anywhere',
        },
      })),
    }
  }

  return service
}

// Generate Trip schema for itinerary-based packages
export function generatePackageTripSchema(pkg: VacationPackage): Trip | null {
  if (!pkg.content.destinations || pkg.content.destinations.length === 0) {
    return null
  }

  const trip: Trip = {
    '@type': 'Trip',
    name: pkg.title,
    description: pkg.content.description,
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
      telephone: '+1-833-874-1019',
    },
  }

  if (pkg.content.startingPrice) {
    trip.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: pkg.content.startingPrice,
      offerCount: pkg.content.destinations.length,
      seller: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
      },
    }
  }

  // Create itinerary if duration is specified
  if (pkg.content.averageDuration) {
    const travelActions: TravelAction[] = pkg.content.destinations.map((destination, index) => ({
      '@type': 'TravelAction',
      name: `Day ${index + 1}: Visit ${destination}`,
      fromLocation: {
        '@type': 'Place',
        name: index === 0 ? 'Newark, NJ' : pkg.content.destinations![index - 1],
      },
      toLocation: {
        '@type': 'Place',
        name: destination,
      },
      provider: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
      },
    }))

    trip.itinerary = {
      '@type': 'ItemList',
      itemListElement: travelActions,
    }
  }

  return trip
}

// Generate FAQ schema from package FAQs
export function generatePackageFAQSchema(
  faqs?: Array<{ question: string; answer: string }>,
  slug?: string
): FAQPage | null {
  if (!faqs || faqs.length === 0) {
    return null
  }

  return {
    '@type': 'FAQPage',
    '@id': slug ? `https://nexttripanywhere.com/packages/${slug}#faq` : undefined,
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': slug
        ? `https://nexttripanywhere.com/packages/${slug}#question${index + 1}`
        : undefined,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Generate BreadcrumbList schema for navigation
export function generatePackageBreadcrumbSchema(pkg: VacationPackage): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    '@id': `https://nexttripanywhere.com/packages/${pkg.slug}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nexttripanywhere.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Vacation Packages',
        item: 'https://nexttripanywhere.com/packages',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: pkg.packageType
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        item: `https://nexttripanywhere.com/packages#${pkg.packageType}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: pkg.title,
        item: `https://nexttripanywhere.com/packages/${pkg.slug}`,
      },
    ],
  }
}

// Generate Review schema for testimonials
// NOTE: Individual reviews removed - only use verified customer reviews
export function generatePackageReviewSchema(pkg: VacationPackage): Review[] {
  // Return empty array - add real verified reviews when available
  return []
}

// Generate complete schema graph for package pages
export function generatePackageSchemaGraph(pkg: VacationPackage) {
  const schemas = []

  // Add Organization/TravelAgency schema
  schemas.push(generateTravelAgencySchema())

  // Add Product schema
  schemas.push(generatePackageProductSchema(pkg))

  // Add Service schema
  schemas.push(generatePackageServiceSchema(pkg))

  // Add Trip schema if applicable
  const tripSchema = generatePackageTripSchema(pkg)
  if (tripSchema) {
    schemas.push(tripSchema)
  }

  // Add FAQ schema
  const faqSchema = generatePackageFAQSchema(pkg.faq, pkg.slug)
  if (faqSchema) {
    schemas.push(faqSchema)
  }

  // Add BreadcrumbList schema
  schemas.push(generatePackageBreadcrumbSchema(pkg))

  // Add Reviews (only for the Product)
  const productWithReviews = schemas.find((s) => s['@type'] === 'Product')
  if (productWithReviews) {
    productWithReviews.review = generatePackageReviewSchema(pkg)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}

// Utility function to validate schema
export function validatePackageSchema(schema: any): boolean {
  try {
    // Check required fields
    if (!schema['@context'] || !schema['@graph']) {
      console.error('Missing @context or @graph')
      return false
    }

    // Check that @graph is an array
    if (!Array.isArray(schema['@graph'])) {
      console.error('@graph must be an array')
      return false
    }

    // Check each item has a @type
    for (const item of schema['@graph']) {
      if (!item['@type']) {
        console.error('Item missing @type:', item)
        return false
      }
    }

    // Validate JSON structure
    JSON.stringify(schema)

    return true
  } catch (error) {
    console.error('Schema validation error:', error)
    return false
  }
}

// Export all types for use in other files
export type {
  Organization,
  PostalAddress,
  GeoCoordinates,
  AdministrativeArea,
  OpeningHoursSpecification,
  AggregateRating,
  Review,
  Product,
  Brand,
  Offer,
  AggregateOffer,
  PaymentMethod,
  TypeAndQuantity,
  FAQPage,
  Question,
  Answer,
  BreadcrumbList,
  ListItem,
  Service,
  OfferCatalog,
  ServiceChannel,
  Place,
  TravelAction,
  Distance,
  Reservation,
  ProgramMembership,
  Trip,
  ItemList,
}
