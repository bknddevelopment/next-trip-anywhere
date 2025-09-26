/**
 * Enhanced Schema Markup Generators for 500+ Page Site
 * Implements comprehensive structured data for all page types
 */

interface BaseSchema {
  '@context': string
  '@type': string | string[]
  '@id'?: string
}

// TouristDestination Schema for destination pages
export function generateTouristDestinationSchema(data: {
  name: string
  description: string
  url: string
  images?: string[]
  geo?: {
    latitude: number
    longitude: number
  }
  touristType?: string[]
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristDestination', 'Place'],
    '@id': `${data.url}#destination`,
    name: data.name,
    description: data.description,
    url: data.url,
    image: data.images || [],
    touristType: data.touristType || ['Adventure', 'Beach', 'Cultural', 'Family'],
    geo: data.geo
      ? {
          '@type': 'GeoCoordinates',
          latitude: data.geo.latitude,
          longitude: data.geo.longitude,
        }
      : undefined,
    isAccessibleForFree: false,
    publicAccess: true,
  }
}

// Event Schema for seasonal/special pages
export function generateEventSchema(data: {
  name: string
  description: string
  startDate: string
  endDate: string
  location: string
  url: string
  offers?: {
    price: number
    currency: string
  }
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${data.url}#event`,
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    location: {
      '@type': 'Place',
      name: data.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Newark',
        addressRegion: 'NJ',
        addressCountry: 'US',
      },
    },
    url: data.url,
    offers: data.offers
      ? {
          '@type': 'Offer',
          price: data.offers.price,
          priceCurrency: data.offers.currency,
          availability: 'https://schema.org/InStock',
          validFrom: new Date().toISOString(),
        }
      : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
      url: 'https://nexttripanywhere.com',
    },
  }
}

// Sports Event Schema for Olympics and sporting events
export function generateSportsEventSchema(data: {
  name: string
  description: string
  startDate: string
  endDate: string
  location: {
    name: string
    city: string
    country: string
  }
  url: string
  sport?: string[]
  performer?: Array<{
    name: string
    type: string
  }>
  offers?: {
    minPrice: number
    maxPrice: number
    currency: string
    availability: string
  }
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    '@id': `${data.url}#sportsevent`,
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    location: {
      '@type': 'Place',
      name: data.location.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.location.city,
        addressCountry: data.location.country,
      },
    },
    url: data.url,
    sport: data.sport,
    performer: data.performer?.map((p) => ({
      '@type': p.type || 'SportsTeam',
      name: p.name,
    })),
    offers: data.offers
      ? {
          '@type': 'AggregateOffer',
          lowPrice: data.offers.minPrice,
          highPrice: data.offers.maxPrice,
          priceCurrency: data.offers.currency,
          availability: data.offers.availability || 'https://schema.org/InStock',
          validFrom: new Date().toISOString(),
          seller: {
            '@type': 'Organization',
            name: 'Next Trip Anywhere',
            url: 'https://nexttripanywhere.com',
          },
        }
      : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'International Olympic Committee',
      url: 'https://olympics.com',
    },
    superEvent: {
      '@type': 'Event',
      name: 'Winter Olympics 2026',
      startDate: '2026-02-06',
      endDate: '2026-02-22',
    },
  }
}

// Product Schema with AggregateRating for packages
export function generateProductSchema(data: {
  name: string
  description: string
  url: string
  image?: string
  price: {
    min: number
    max: number
    currency: string
  }
  rating?: {
    value: number
    count: number
  }
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${data.url}#product`,
    name: data.name,
    description: data.description,
    url: data.url,
    image: data.image,
    brand: {
      '@type': 'Brand',
      name: 'Next Trip Anywhere',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: data.price.min,
      highPrice: data.price.max,
      priceCurrency: data.price.currency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Next Trip Anywhere',
      },
    },
    aggregateRating: data.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: data.rating.value,
          reviewCount: data.rating.count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  }
}

// TouristAttraction Schema for shore excursions
export function generateTouristAttractionSchema(data: {
  name: string
  description: string
  url: string
  location: string
  duration?: string
  price?: number
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${data.url}#attraction`,
    name: data.name,
    description: data.description,
    url: data.url,
    location: {
      '@type': 'Place',
      name: data.location,
    },
    tourDuration: data.duration,
    offers: data.price
      ? {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        }
      : undefined,
    isAccessibleForFree: false,
  }
}

// WebApplication Schema for tools
export function generateWebApplicationSchema(data: {
  name: string
  description: string
  url: string
  applicationCategory: string
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${data.url}#webapp`,
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: data.applicationCategory,
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
      url: 'https://nexttripanywhere.com',
    },
  }
}

// HowTo Schema for guide pages
export function generateHowToSchema(data: {
  name: string
  description: string
  url: string
  steps: Array<{
    name: string
    text: string
  }>
  totalTime?: string
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${data.url}#howto`,
    name: data.name,
    description: data.description,
    url: data.url,
    totalTime: data.totalTime,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

// Review Schema for comparison pages
export function generateReviewSchema(data: {
  itemReviewed: string
  reviewBody: string
  rating: number
  author: string
  datePublished: string
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Thing',
      name: data.itemReviewed,
    },
    reviewBody: data.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: data.author,
    },
    datePublished: data.datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
    },
  }
}

// CollectionPage Schema for hub pages
export function generateCollectionPageSchema(data: {
  name: string
  description: string
  url: string
  mainEntity: Array<{
    name: string
    url: string
  }>
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${data.url}#collection`,
    name: data.name,
    description: data.description,
    url: data.url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: data.mainEntity.length,
      itemListElement: data.mainEntity.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  }
}

// Create a comprehensive schema graph for any page
export function generateSchemaGraph(schemas: any[]): any {
  // Add website and organization schemas
  const baseSchemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://nexttripanywhere.com/#website',
      url: 'https://nexttripanywhere.com',
      name: 'Next Trip Anywhere',
      description:
        'Award-winning travel agency specializing in cruises, flights, and vacation packages from Newark and all major US cities',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://nexttripanywhere.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://nexttripanywhere.com/#organization',
      name: 'Next Trip Anywhere',
      url: 'https://nexttripanywhere.com',
      logo: 'https://nexttripanywhere.com/logo.png',
      sameAs: [
        'https://www.facebook.com/nexttripanywhere',
        'https://www.instagram.com/nexttripanywhere',
        'https://twitter.com/nexttripanywhere',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-833-874-1019',
        contactType: 'customer service',
        availableLanguage: ['English', 'Spanish'],
        areaServed: 'US',
      },
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@graph': [...baseSchemas, ...schemas],
  }
}
