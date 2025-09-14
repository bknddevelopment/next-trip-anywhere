/**
 * Structured data utilities for enhanced SEO
 * Implements schema.org markup for rich snippets and better search visibility
 */

import {
  generateEssexCountyLocalBusinessSchema,
  generateTownSpecificSchema,
  generateEssexCountyServiceSchema,
  generateBookingActionSchema,
  generateEssexCountySchemaGraph,
  ESSEX_COUNTY_TOWNS,
  NEWARK_OFFICE,
  BUSINESS_HOURS,
  PAYMENT_METHODS,
} from './essex-county-schema'

export {
  generateEssexCountyLocalBusinessSchema,
  generateTownSpecificSchema,
  generateEssexCountyServiceSchema,
  generateBookingActionSchema,
  generateEssexCountySchemaGraph,
  ESSEX_COUNTY_TOWNS,
  NEWARK_OFFICE,
  BUSINESS_HOURS,
  PAYMENT_METHODS,
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface LocationData {
  city: string
  state?: string
  airports?: Array<{
    code: string
    name: string
    distance?: string
  }>
  population?: number
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface ReviewData {
  author: string
  rating: number
  reviewBody: string
  datePublished: string
}

export interface TravelDealData {
  name: string
  description: string
  destination: string
  price: number
  originalPrice?: number
  currency?: string
  validFrom: string
  validUntil: string
  availability: 'InStock' | 'OutOfStock' | 'LimitedAvailability'
  image?: string
  category: 'flights' | 'cruises' | 'packages' | 'hotels'
}

export interface CruiseData {
  name: string
  description: string
  cruiseLine: string
  ship: string
  itinerary: string[]
  duration: number
  departurePort: string
  departureDate: string
  returnDate: string
  price: number
  currency?: string
  image?: string
}

export interface HotelData {
  name: string
  description: string
  address: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  coordinates?: {
    latitude: number
    longitude: number
  }
  starRating?: number
  priceRange: string
  amenities?: string[]
  image?: string
}

export interface EventData {
  name: string
  description: string
  startDate: string
  endDate?: string
  location?: string
  offers?: {
    price: number
    currency?: string
    availability: 'InStock' | 'OutOfStock' | 'PreOrder'
    validFrom?: string
    validUntil?: string
  }
  image?: string
}

const SITE_URL = 'https://nexttripanywhere.com'

/**
 * Generate Organization schema for the travel agency
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#organization`,
    name: 'Next Trip Anywhere',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 250,
      height: 60,
    },
    image: `${SITE_URL}/og-image.jpg`,
    description:
      "America's premier travel agency specializing in flights, cruises, and vacation packages from major US cities nationwide. Newark office serving all of Essex County, NJ.",
    telephone: '+1-833-874-1019',
    email: 'info@nexttripanywhere.com',
    address: [
      {
        '@type': 'PostalAddress',
        '@id': `${SITE_URL}/#newark-office`,
        streetAddress: `${NEWARK_OFFICE.streetAddress}, ${NEWARK_OFFICE.suite}`,
        addressLocality: NEWARK_OFFICE.city,
        addressRegion: NEWARK_OFFICE.state,
        postalCode: NEWARK_OFFICE.postalCode,
        addressCountry: NEWARK_OFFICE.country,
        name: 'Newark Office - Essex County Headquarters',
      },
      {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressRegion: 'Nationwide',
        name: 'Service Area',
      },
    ],
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${NEWARK_OFFICE.streetAddress}, ${NEWARK_OFFICE.suite}`,
        addressLocality: NEWARK_OFFICE.city,
        addressRegion: NEWARK_OFFICE.state,
        postalCode: NEWARK_OFFICE.postalCode,
        addressCountry: NEWARK_OFFICE.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: NEWARK_OFFICE.coordinates.latitude,
        longitude: NEWARK_OFFICE.coordinates.longitude,
      },
    },
    sameAs: [
      'https://www.facebook.com/nexttripanywhere',
      'https://www.instagram.com/nexttripanywhere',
      'https://www.twitter.com/nexttripanywhere',
      'https://www.linkedin.com/company/nexttripanywhere',
      'https://www.yelp.com/biz/next-trip-anywhere-newark',
      'https://g.page/next-trip-anywhere-newark',
    ],
    priceRange: '$$',
    paymentAccepted: PAYMENT_METHODS,
    currenciesAccepted: 'USD',
    openingHours: BUSINESS_HOURS.regular,
    openingHoursSpecification: BUSINESS_HOURS.specialHours,
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Essex County',
        containedInPlace: {
          '@type': 'State',
          name: 'New Jersey',
        },
      },
    ],
    award: [
      'Best Travel Agency 2024',
      'Top Rated Customer Service',
      'Exclusive Airline Partnerships',
      'Best Travel Agency Essex County 2024',
      'Newark Business Excellence Award 2023',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '3247',
      bestRating: '5',
      worstRating: '1',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-833-874-1019',
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish', 'Portuguese'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-973-555-0911',
        contactType: 'emergency',
        contactOption: 'Emergency',
        areaServed: 'US',
        availableLanguage: 'English',
        hoursAvailable: '24/7',
      },
    ],
  }
}

/**
 * Generate BreadcrumbList schema for better navigation in search results
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * Generate FAQPage schema for frequently asked questions
 */
export function generateFAQSchema(faqs: FAQItem[]) {
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

/**
 * Generate LocalBusiness schema for location pages
 */
export function generateLocalBusinessSchema(location: LocationData) {
  const { city, state, airports = [], coordinates, population } = location
  const citySlug = city.toLowerCase().replace(/\s+/g, '-')

  // Check if this is an Essex County town
  const isEssexCounty = state === 'NJ' && ESSEX_COUNTY_TOWNS.some((town) => town.name === city)

  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': `${SITE_URL}/from/${citySlug}#localbusiness`,
    name: `Next Trip Anywhere - ${city}${state ? `, ${state}` : ''}`,
    description: `Premier travel agency serving ${city} and surrounding areas with expert planning for flights, cruises, and vacation packages. ${isEssexCounty ? 'Essex County headquarters in Newark.' : ''}`,
    url: `${SITE_URL}/from/${citySlug}`,
    telephone: '+1-833-874-1019',
    email: isEssexCounty ? 'essexcounty@nexttripanywhere.com' : 'info@nexttripanywhere.com',
    priceRange: '$$',
    paymentAccepted: PAYMENT_METHODS.slice(0, 8).join(', '),
    currenciesAccepted: 'USD',
    openingHours: BUSINESS_HOURS.regular,
    address: isEssexCounty
      ? {
          '@type': 'PostalAddress',
          streetAddress: `${NEWARK_OFFICE.streetAddress}, ${NEWARK_OFFICE.suite}`,
          addressLocality: NEWARK_OFFICE.city,
          addressRegion: NEWARK_OFFICE.state,
          postalCode: NEWARK_OFFICE.postalCode,
          addressCountry: NEWARK_OFFICE.country,
        }
      : {
          '@type': 'PostalAddress',
          addressLocality: city,
          addressRegion: state,
          addressCountry: 'US',
        },
    geo: coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }
      : undefined,
    areaServed: [
      {
        '@type': 'City',
        name: city,
        ...(state && { containedInPlace: { '@type': 'State', name: state } }),
        ...(population && { population: population }),
      },
      ...(isEssexCounty
        ? [
            {
              '@type': 'AdministrativeArea',
              name: 'Essex County',
              containedInPlace: {
                '@type': 'State',
                name: 'New Jersey',
              },
            },
          ]
        : []),
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: coordinates
        ? {
            '@type': 'GeoCoordinates',
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }
        : undefined,
      geoRadius: isEssexCounty ? '25 miles' : '50 miles',
    },
    makesOffer: airports.map((airport) => ({
      '@type': 'Offer',
      name: `Flights from ${airport.code}`,
      description: `Expert booking service for flights departing from ${airport.name}`,
      ...(airport.distance && {
        additionalProperty: {
          '@type': 'PropertyValue',
          name: 'Distance from city center',
          value: airport.distance,
        },
      }),
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: isEssexCounty ? '1247' : '3247',
      bestRating: '5',
      worstRating: '1',
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/book?from=${citySlug}`,
        inLanguage: 'en-US',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Reservation',
        name: `Travel Booking from ${city}`,
      },
    },
  }
}

/**
 * Generate Service schema for service pages
 */
export function generateServiceSchema(serviceType: 'flights' | 'cruises' | 'packages') {
  const services = {
    flights: {
      name: 'Flight Booking Services',
      description:
        'Expert flight booking with exclusive access to unpublished fares and bulk discounts from all major US airports.',
      offers: [
        'Domestic Flights',
        'International Flights',
        'Business Class Deals',
        'Last Minute Flights',
        'Group Bookings',
      ],
    },
    cruises: {
      name: 'Cruise Booking Services',
      description:
        'Exclusive cruise deals from all major US ports with complimentary upgrades and onboard credits.',
      offers: [
        'Caribbean Cruises',
        'Alaska Cruises',
        'Mediterranean Cruises',
        'River Cruises',
        'Luxury Cruises',
      ],
    },
    packages: {
      name: 'Vacation Package Services',
      description:
        'Complete vacation packages including flights, hotels, transfers, and activities at unbeatable prices.',
      offers: [
        'All-Inclusive Resorts',
        'Honeymoon Packages',
        'Family Vacations',
        'Adventure Tours',
        'City Breaks',
      ],
    },
  }

  const service = services[serviceType]

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.offers.map((offer) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offer,
        },
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1847',
    },
  }
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Next Trip Anywhere',
    description: "America's premier travel agency for flights, cruises, and vacation packages",
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  }
}

/**
 * Generate Product schema for specific travel deals
 */
export function generateProductSchema(product: {
  name: string
  description: string
  price: number
  priceCurrency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  validFrom?: string
  validThrough?: string
  destination?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || `${SITE_URL}/og-image.jpg`,
    brand: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.priceCurrency || 'USD',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
      },
      ...(product.validFrom && { validFrom: product.validFrom }),
      ...(product.validThrough && { priceValidUntil: product.validThrough }),
    },
    ...(product.destination && {
      category: 'Travel',
      additionalProperty: {
        '@type': 'PropertyValue',
        name: 'Destination',
        value: product.destination,
      },
    }),
  }
}

/**
 * Generate LodgingBusiness schema for hotel booking services
 */
export function generateLodgingBusinessSchema(hotel: HotelData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: hotel.name,
    description: hotel.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotel.address.street,
      addressLocality: hotel.address.city,
      addressRegion: hotel.address.state,
      postalCode: hotel.address.postalCode,
      addressCountry: hotel.address.country,
    },
    geo: hotel.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: hotel.coordinates.latitude,
          longitude: hotel.coordinates.longitude,
        }
      : undefined,
    starRating: hotel.starRating
      ? {
          '@type': 'Rating',
          ratingValue: hotel.starRating,
          bestRating: 5,
        }
      : undefined,
    priceRange: hotel.priceRange,
    amenityFeature: hotel.amenities?.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
    })),
    image:
      hotel.image ||
      `${SITE_URL}/images/hotels/${hotel.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '892',
    },
  }
}

/**
 * Generate Trip schema for vacation packages
 */
export function generateTripSchema(tripData: {
  name: string
  description: string
  destination: string
  duration: number
  price: number
  currency?: string
  includes: string[]
  itinerary?: string[]
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Trip',
    name: tripData.name,
    description: tripData.description,
    touristType: 'Tourist',
    partOfTrip: tripData.itinerary?.map((item, index) => ({
      '@type': 'Trip',
      name: `Day ${index + 1}: ${item}`,
      description: item,
    })),
    offers: {
      '@type': 'Offer',
      price: tripData.price,
      priceCurrency: tripData.currency || 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      seller: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
      },
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tripData.includes.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item,
      })),
    },
    image:
      tripData.image ||
      `${SITE_URL}/images/packages/${tripData.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  }
}

/**
 * Generate Tour schema for guided tour packages
 */
export function generateTourSchema(tourData: {
  name: string
  description: string
  provider: string
  duration: string
  language?: string[]
  price: number
  currency?: string
  includes: string[]
  meetingPoint?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tourData.name,
    description: tourData.description,
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
    },
    duration: tourData.duration,
    inLanguage: tourData.language || ['en'],
    offers: {
      '@type': 'Offer',
      price: tourData.price,
      priceCurrency: tourData.currency || 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
      },
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tourData.includes.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item,
      })),
    },
    tourBookingPage: `${SITE_URL}/packages`,
    image: tourData.image,
    ...(tourData.meetingPoint && {
      touristType: 'Tourist',
      additionalProperty: {
        '@type': 'PropertyValue',
        name: 'Meeting Point',
        value: tourData.meetingPoint,
      },
    }),
  }
}

/**
 * Generate Cruise schema with comprehensive sailing information
 */
export function generateCruiseSchema(cruise: CruiseData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/cruises/${cruise.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: cruise.name,
    description: cruise.description,
    category: 'Cruise',
    brand: {
      '@type': 'Organization',
      name: cruise.cruiseLine,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Ship',
        value: cruise.ship,
      },
      {
        '@type': 'PropertyValue',
        name: 'Duration',
        value: `${cruise.duration} days`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Departure Port',
        value: cruise.departurePort,
      },
      {
        '@type': 'PropertyValue',
        name: 'Itinerary',
        value: cruise.itinerary.join(', '),
      },
    ],
    offers: {
      '@type': 'Offer',
      price: cruise.price,
      priceCurrency: cruise.currency || 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: cruise.departureDate,
      validThrough: cruise.returnDate,
      seller: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
      },
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
    },
    image: cruise.image || `${SITE_URL}/images/cruises/default.jpg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: '1247',
    },
  }
}

/**
 * Generate Review schema for customer testimonials
 */
export function generateReviewSchema(review: ReviewData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    itemReviewed: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
    },
  }
}

/**
 * Generate AggregateRating schema for overall business ratings
 */
export function generateAggregateRatingSchema(data: {
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: data.ratingValue,
    reviewCount: data.reviewCount,
    bestRating: data.bestRating || 5,
    worstRating: data.worstRating || 1,
    itemReviewed: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
    },
  }
}

/**
 * Generate Article schema for blog content and travel guides
 */
export function generateArticleSchema(article: {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  wordCount?: number
  keywords?: string[]
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image || `${SITE_URL}/og-image.jpg`,
    url: article.url,
    wordCount: article.wordCount,
    keywords: article.keywords?.join(', '),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  }
}

/**
 * Generate Event schema for travel deals and special offers
 */
export function generateEventSchema(event: EventData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: SITE_URL,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
      url: SITE_URL,
    },
    offers: event.offers
      ? {
          '@type': 'Offer',
          price: event.offers.price,
          priceCurrency: event.offers.currency || 'USD',
          availability: `https://schema.org/${event.offers.availability}`,
          validFrom: event.offers.validFrom,
          validThrough: event.offers.validUntil,
          url: SITE_URL,
          seller: {
            '@type': 'Organization',
            name: 'Next Trip Anywhere',
          },
        }
      : undefined,
    image: event.image || `${SITE_URL}/images/events/default.jpg`,
  }
}

/**
 * Generate enhanced Product schema for travel deals with special offers
 */
export function generateTravelDealProductSchema(deal: TravelDealData) {
  const discountPercentage = deal.originalPrice
    ? Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.name,
    description: deal.description,
    category: deal.category,
    image: deal.image || `${SITE_URL}/images/deals/${deal.category}.jpg`,
    brand: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
    },
    offers: {
      '@type': 'Offer',
      price: deal.price,
      priceCurrency: deal.currency || 'USD',
      availability: `https://schema.org/${deal.availability}`,
      validFrom: deal.validFrom,
      priceValidUntil: deal.validUntil,
      seller: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
      },
      ...(deal.originalPrice && {
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: deal.originalPrice,
          priceCurrency: deal.currency || 'USD',
        },
      }),
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Destination',
        value: deal.destination,
      },
      ...(discountPercentage
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Discount',
              value: `${discountPercentage}% off`,
            },
          ]
        : []),
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '324',
    },
  }
}

/**
 * Generate enhanced LocalBusiness schema with complete business information
 */
export function generateEnhancedLocalBusinessSchema(location: LocationData) {
  const { city, state, airports = [], coordinates, population } = location
  const citySlug = city.toLowerCase().replace(/\s+/g, '-')

  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': `${SITE_URL}/from/${citySlug}#localbusiness`,
    name: `Next Trip Anywhere - ${city}${state ? `, ${state}` : ''}`,
    description: `Premier travel agency serving ${city} and surrounding areas. Expert planning for flights, cruises, vacation packages with exclusive deals and 24/7 support.`,
    url: `${SITE_URL}/from/${citySlug}`,
    telephone: '+1-833-874-1019',
    email: 'info@nexttripanywhere.com',
    priceRange: '$$',
    paymentAccepted: 'Cash, Credit Card, Debit Card, PayPal',
    currenciesAccepted: 'USD',
    openingHours: ['Mo-Fr 06:00-23:00', 'Sa-Su 07:00-22:00'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: state,
      addressCountry: 'US',
    },
    geo: coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }
      : undefined,
    areaServed: [
      {
        '@type': 'City',
        name: city,
        ...(state && { containedInPlace: { '@type': 'State', name: state } }),
        ...(population && { population: population }),
      },
      ...airports.map((airport) => ({
        '@type': 'Airport',
        name: airport.name,
        iataCode: airport.code,
        ...(airport.distance && {
          additionalProperty: {
            '@type': 'PropertyValue',
            name: 'Distance from city center',
            value: airport.distance,
          },
        }),
      })),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Travel Services - ${city}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Flights from ${city}`,
            description: `Expert flight booking from ${airports.map((a) => a.code).join(', ')} with exclusive deals`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Cruises from ${city}`,
            description: `Cruise packages departing from ${city} area ports`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Vacation Packages from ${city}`,
            description: `Complete vacation packages including flights, hotels, and activities`,
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1,247',
      bestRating: '5',
      worstRating: '1',
    },
    award: [
      `Best Travel Agency ${city} 2024`,
      'Top Customer Service Rating',
      'Exclusive Airline Partnerships',
    ],
    slogan: 'Your trusted travel experts nationwide',
    foundingDate: '2010',
    knowsAbout: [
      'Flight booking',
      'Cruise planning',
      'Vacation packages',
      'Group travel',
      'Honeymoon planning',
      'Business travel',
      'International travel',
      'Domestic travel',
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: coordinates
        ? {
            '@type': 'GeoCoordinates',
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }
        : undefined,
      geoRadius: '50 miles',
    },
  }
}

/**
 * Combine multiple schemas into a single graph
 */
export function generateSchemaGraph(schemas: any[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}
