/**
 * Schema generators for Disney resort room guide pages (Phase 3)
 * Provides 8 schema types: Article, LodgingBusiness, Product, FAQ, Breadcrumb, ImageGallery, TravelAgency, HowTo
 * For pages targeting specific Disney resort room searches (e.g., "Disney Contemporary Tower room vs Garden Wing")
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
  type Place,
} from './baseSchema'

// Type definitions for Disney room guide schemas

export interface DisneyRoomGuideData {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  searchVolume: number
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  resort: {
    name: string
    fullName: string
    category: 'value' | 'moderate' | 'deluxe' | 'deluxe-villa' | 'campground'
    location: 'Magic Kingdom' | 'Epcot' | 'Hollywood Studios' | 'Animal Kingdom' | 'Disney Springs'
    address: string
    city: string
    state: string
    zipCode: string
    coordinates: {
      latitude: number
      longitude: number
    }
    phoneNumber?: string
    website?: string
    yearOpened?: number
    totalRooms?: number
    themes?: string[]
  }
  content: {
    hero: {
      headline: string
      subheadline: string
    }
    overview: string
    description: string // 500+ words minimum
    roomComparison: Array<{
      roomType: string
      building?: string
      view: string
      sleeps: number
      squareFootage: number
      bedConfiguration: string
      bathrooms: number
      amenities: string[]
      uniqueFeatures: string[]
      pros: string[]
      cons: string[]
      bestFor: string[]
      averagePrice: number
      priceRange: {
        value: number
        moderate: number
        peak: number
      }
      renovationYear?: number
      accessibility?: string[]
    }>
    roomFeatures: {
      standard: string[]
      premium: string[]
      unique: string[]
    }
    resortAmenities: Array<{
      name: string
      description: string
      category: 'dining' | 'recreation' | 'transportation' | 'services' | 'pools' | 'entertainment'
      additionalCost?: boolean
    }>
    transportation: {
      toMagicKingdom?: string
      toEpcot?: string
      toHollywoodStudios?: string
      toAnimalKingdom?: string
      toDisneySprings?: string
      parkingInfo?: string
    }
    diningOptions: Array<{
      name: string
      type: 'quick-service' | 'table-service' | 'signature' | 'lounge' | 'character-dining'
      cuisine?: string
      priceRange: string
      highlights?: string[]
    }>
    bookingTips: string[]
    seasonalConsiderations: string[]
    essexCountyTravelerTips: string
    travelFromNewark: {
      flight: string
      airport: string
      drive?: string
      packageOptions: string[]
    }
  }
  faq: Array<{
    question: string
    answer: string
  }>
  rating?: {
    overall: number
    cleanliness: number
    service: number
    location: number
    value: number
    reviewCount: number
  }
  lastUpdated: string
}

// Article schema for Disney room guides
export function generateDisneyArticleSchema(guide: DisneyRoomGuideData) {
  return {
    '@type': 'Article',
    '@id': `https://nexttripanywhere.com/disney-rooms/${guide.slug}#article`,
    headline: guide.metaTitle,
    alternativeHeadline: guide.title,
    description: guide.metaDescription,
    image: [
      {
        '@type': 'ImageObject',
        url: `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-hero.jpg`,
        width: 1200,
        height: 630,
        caption: guide.content.hero.headline,
      },
      {
        '@type': 'ImageObject',
        url: `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-comparison.jpg`,
        width: 1200,
        height: 800,
        caption: `${guide.resort.name} Room Comparison`,
      },
    ],
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
      '@id': `https://nexttripanywhere.com/disney-rooms/${guide.slug}`,
      url: `https://nexttripanywhere.com/disney-rooms/${guide.slug}`,
    },
    articleSection: 'Disney Resort Guides',
    keywords: guide.keywords.join(', '),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    wordCount: guide.content.description.split(/\s+/).length,
    about: [
      {
        '@type': 'Resort',
        name: guide.resort.fullName,
        url: guide.resort.website,
      },
      {
        '@type': 'Place',
        name: 'Walt Disney World Resort',
        address: {
          '@type': 'PostalAddress',
          addressLocality: guide.resort.city,
          addressRegion: guide.resort.state,
          addressCountry: 'US',
        },
      },
    ],
    mentions: guide.content.roomComparison.map((room) => ({
      '@type': 'Product',
      name: `${guide.resort.name} - ${room.roomType}`,
      description: `${room.view} view room that sleeps ${room.sleeps}`,
    })),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.room-comparison-summary'],
    },
  }
}

// LodgingBusiness schema for the Disney resort
export function generateDisneyLodgingBusinessSchema(guide: DisneyRoomGuideData) {
  return {
    '@type': 'LodgingBusiness',
    '@id': `https://nexttripanywhere.com/disney-rooms/${guide.slug}#lodging`,
    name: guide.resort.fullName,
    description: guide.content.overview,
    url: guide.resort.website,
    telephone: guide.resort.phoneNumber || '+1-407-939-5277',
    email: 'resort.reservations@disneyworld.com',
    image: [
      `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-exterior.jpg`,
      `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-lobby.jpg`,
      `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-pool.jpg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: guide.resort.address,
      addressLocality: guide.resort.city,
      addressRegion: guide.resort.state,
      postalCode: guide.resort.zipCode,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: guide.resort.coordinates.latitude,
      longitude: guide.resort.coordinates.longitude,
    },
    priceRange: getPriceRangeSymbol(guide),
    starRating:
      guide.resort.category === 'deluxe' || guide.resort.category === 'deluxe-villa'
        ? {
            '@type': 'Rating',
            ratingValue: 4.5,
            bestRating: 5,
          }
        : guide.resort.category === 'moderate'
          ? {
              '@type': 'Rating',
              ratingValue: 3.5,
              bestRating: 5,
            }
          : {
              '@type': 'Rating',
              ratingValue: 3,
              bestRating: 5,
            },
    aggregateRating: guide.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: guide.rating.overall,
          reviewCount: guide.rating.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    checkinTime: '15:00',
    checkoutTime: '11:00',
    numberOfRooms: guide.resort.totalRooms,
    petsAllowed: false,
    amenityFeature: [
      ...guide.content.resortAmenities.map((amenity) => ({
        '@type': 'LocationFeatureSpecification',
        name: amenity.name,
        value: true,
      })),
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free WiFi',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free Parking',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Disney Theme Park Transportation',
        value: true,
      },
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Resort Category',
        value: guide.resort.category,
      },
      {
        '@type': 'PropertyValue',
        name: 'Closest Theme Park',
        value: guide.resort.location,
      },
      ...(guide.resort.yearOpened
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Year Opened',
              value: guide.resort.yearOpened.toString(),
            },
          ]
        : []),
    ],
  }
}

// Helper function for price range symbols
function getPriceRangeSymbol(guide: DisneyRoomGuideData): string {
  const avgPrice =
    guide.content.roomComparison.reduce((sum, room) => sum + room.averagePrice, 0) /
    guide.content.roomComparison.length

  if (avgPrice < 250) {
    return '$'
  }
  if (avgPrice < 450) {
    return '$$'
  }
  if (avgPrice < 650) {
    return '$$$'
  }
  return '$$$$'
}

// Product schema for each room type
export function generateRoomProductSchemas(guide: DisneyRoomGuideData) {
  return guide.content.roomComparison.map((room, index) => ({
    '@type': 'Product',
    '@id': `https://nexttripanywhere.com/disney-rooms/${guide.slug}#product-${index}`,
    name: `${guide.resort.name} - ${room.roomType}`,
    description: `${room.view} view room with ${room.bedConfiguration}, sleeps ${room.sleeps}. ${room.uniqueFeatures.join('. ')}.`,
    category: 'Hotel Room',
    brand: {
      '@type': 'Brand',
      name: 'Walt Disney World Resorts',
    },
    image: `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-${room.roomType.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: room.priceRange.value,
      highPrice: room.priceRange.peak,
      price: room.averagePrice,
      availability: 'https://schema.org/InStock',
      url: `https://nexttripanywhere.com/disney-rooms/${guide.slug}`,
      validFrom: new Date().toISOString().split('T')[0],
      priceValidUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 180 days
      seller: {
        '@type': 'TravelAgency',
        name: NEXT_TRIP_ANYWHERE.name,
        telephone: NEXT_TRIP_ANYWHERE.telephone,
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Square Footage',
        value: room.squareFootage.toString(),
      },
      {
        '@type': 'PropertyValue',
        name: 'Maximum Occupancy',
        value: room.sleeps.toString(),
      },
      {
        '@type': 'PropertyValue',
        name: 'Bed Configuration',
        value: room.bedConfiguration,
      },
      {
        '@type': 'PropertyValue',
        name: 'View Type',
        value: room.view,
      },
      {
        '@type': 'PropertyValue',
        name: 'Bathrooms',
        value: room.bathrooms.toString(),
      },
      ...(room.building
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Building',
              value: room.building,
            },
          ]
        : []),
      ...(room.renovationYear
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Last Renovated',
              value: room.renovationYear.toString(),
            },
          ]
        : []),
    ],
    audience: {
      '@type': 'Audience',
      audienceType: room.bestFor.join(', '),
    },
  }))
}

// FAQ schema for Disney room guides
export function generateDisneyFAQSchema(
  guide: DisneyRoomGuideData
): ReturnType<typeof generateFAQSchema> {
  return generateFAQSchema(
    guide.faq,
    `${guide.resort.fullName} Room Guide`,
    `https://nexttripanywhere.com/disney-rooms/${guide.slug}#faq`
  )
}

// Breadcrumb schema
export function generateDisneyBreadcrumbSchema(guide: DisneyRoomGuideData) {
  return generateBreadcrumbList([
    { name: 'Home', url: '/' },
    { name: 'Disney Vacations', url: '/destinations/walt-disney-world' },
    { name: 'Resort Room Guides', url: '/disney-rooms' },
    { name: guide.resort.name, url: `/disney-rooms/${guide.slug}` },
  ])
}

// ImageGallery schema
export function generateDisneyImageGallerySchema(guide: DisneyRoomGuideData) {
  const images = [
    {
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-hero.jpg`,
      caption: guide.content.hero.headline,
      width: 1200,
      height: 630,
    },
    ...guide.content.roomComparison.slice(0, 6).map((room, index) => ({
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-room-${index + 1}.jpg`,
      caption: `${room.roomType} - ${room.view} View`,
      width: 1000,
      height: 750,
    })),
    {
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-amenities.jpg`,
      caption: `${guide.resort.name} Resort Amenities`,
      width: 1000,
      height: 667,
    },
  ]

  return {
    '@type': 'ImageGallery',
    '@id': `https://nexttripanywhere.com/disney-rooms/${guide.slug}#gallery`,
    name: `${guide.resort.fullName} Room Photo Gallery`,
    description: `Comprehensive photo gallery showing all room types, views, and amenities at ${guide.resort.fullName}`,
    image: images,
    numberOfItems: images.length,
    about: {
      '@type': 'Resort',
      name: guide.resort.fullName,
    },
  }
}

// TravelAgency schema with Disney specialization
export function generateDisneyTravelAgencySchema(guide: DisneyRoomGuideData) {
  const baseSchema = generateOrganizationSchema('TravelAgency')

  return {
    ...baseSchema,
    '@id': `https://nexttripanywhere.com/disney-rooms/${guide.slug}#travelagency`,
    description: `${NEXT_TRIP_ANYWHERE.description} Specializing in Walt Disney World vacation packages from Essex County, NJ.`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${guide.resort.fullName} Vacation Packages`,
      itemListElement: guide.content.roomComparison.slice(0, 5).map((room) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'TouristTrip',
          name: `${guide.resort.name} ${room.roomType} Package`,
          description: `Complete Disney vacation package including ${room.roomType} accommodations, park tickets, and travel from Newark`,
        },
        priceCurrency: 'USD',
        price: room.averagePrice * 4 + 500, // Estimate: 4 nights + tickets
        availability: 'https://schema.org/InStock',
      })),
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `${guide.resort.fullName} Booking Service`,
        description: `Expert Disney resort booking service with exclusive rates and perks for Essex County travelers`,
      },
      areaServed: NEXT_TRIP_ANYWHERE.areaServed,
    },
  }
}

// HowTo schema for choosing the best room
export function generateDisneyHowToSchema(guide: DisneyRoomGuideData) {
  return {
    '@type': 'HowTo',
    '@id': `https://nexttripanywhere.com/disney-rooms/${guide.slug}#howto`,
    name: `How to Choose the Perfect Room at ${guide.resort.fullName}`,
    description: `Expert guide to selecting the best room type, view, and location at ${guide.resort.fullName} for your family's Disney vacation.`,
    image: {
      '@type': 'ImageObject',
      url: `https://nexttripanywhere.com/images/disney-rooms/${guide.slug}-guide.jpg`,
    },
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: `${Math.min(...guide.content.roomComparison.map((r) => r.priceRange.value))}-${Math.max(...guide.content.roomComparison.map((r) => r.priceRange.peak))}`,
      minValue: Math.min(...guide.content.roomComparison.map((r) => r.priceRange.value)),
      maxValue: Math.max(...guide.content.roomComparison.map((r) => r.priceRange.peak)),
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Determine Your Party Size and Needs',
        text: `Consider your group size and special requirements. Rooms at ${guide.resort.name} range from sleeping ${Math.min(...guide.content.roomComparison.map((r) => r.sleeps))} to ${Math.max(...guide.content.roomComparison.map((r) => r.sleeps))} guests. Consider if you need accessibility features, connecting rooms, or specific bed configurations.`,
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Compare Room Types and Views',
        text: `${guide.resort.name} offers ${guide.content.roomComparison.length} different room categories: ${guide.content.roomComparison.map((r) => r.roomType).join(', ')}. View options include ${[...new Set(guide.content.roomComparison.map((r) => r.view))].join(', ')}. Each view type offers different experiences and price points.`,
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Set Your Budget',
        text: `Room rates vary significantly by season and view. Value season rates start around $${Math.min(...guide.content.roomComparison.map((r) => r.priceRange.value))}/night, while peak season premium views reach $${Math.max(...guide.content.roomComparison.map((r) => r.priceRange.peak))}/night. Consider that most stays require 4-7 nights.`,
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'Consider Location Within the Resort',
        text: `Room location affects your Disney experience. Proximity to transportation, pools, dining, and main buildings varies. ${guide.content.bookingTips.slice(0, 2).join(' ')}`,
        position: 4,
      },
      {
        '@type': 'HowToStep',
        name: 'Review Renovation Status',
        text: `Check when rooms were last renovated. ${guide.content.roomComparison.filter((r) => r.renovationYear).length > 0 ? `Recently renovated rooms at ${guide.resort.name} offer modern amenities and updated decor.` : 'Ask about room condition and recent updates when booking.'}`,
        position: 5,
      },
      {
        '@type': 'HowToStep',
        name: 'Book Through a Disney Specialist',
        text: `Contact Next Trip Anywhere at ${NEXT_TRIP_ANYWHERE.telephone} for expert advice, exclusive rates, and seamless booking. We handle all details including park tickets, dining reservations, and travel from Newark to Orlando.`,
        position: 6,
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Disney Resort Room Comparison Tool',
      },
      {
        '@type': 'HowToTool',
        name: 'Travel Agent Consultation',
      },
    ],
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Valid Credit Card',
      },
      {
        '@type': 'HowToSupply',
        name: 'Vacation Dates (flexible if possible)',
      },
      {
        '@type': 'HowToSupply',
        name: 'Party Size and Ages',
      },
    ],
  }
}

// TouristTrip schema for Disney vacation packages
export function generateDisneyTripSchema(guide: DisneyRoomGuideData) {
  return {
    '@type': 'TouristTrip',
    '@id': `https://nexttripanywhere.com/disney-rooms/${guide.slug}#trip`,
    name: `${guide.resort.fullName} Disney Vacation from Newark`,
    description: `Complete Walt Disney World vacation package featuring ${guide.resort.fullName} accommodations, park tickets, and travel coordination from Essex County, NJ.`,
    touristType: 'Family',
    itinerary: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'TravelAction',
            name: 'Travel to Orlando',
            description: guide.content.travelFromNewark.flight,
            fromLocation: {
              '@type': 'Airport',
              name: 'Newark Liberty International Airport',
              iataCode: 'EWR',
            },
            toLocation: {
              '@type': 'Airport',
              name: 'Orlando International Airport',
              iataCode: 'MCO',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'LodgingReservation',
            name: `Check-in at ${guide.resort.fullName}`,
            description: `Stay at ${guide.resort.fullName} in ${guide.content.roomComparison[0].roomType}`,
            reservationFor: {
              '@type': 'LodgingBusiness',
              name: guide.resort.fullName,
              address: {
                '@type': 'PostalAddress',
                streetAddress: guide.resort.address,
                addressLocality: guide.resort.city,
                addressRegion: guide.resort.state,
                addressCountry: 'US',
              },
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'TouristAttraction',
            name: 'Disney Theme Parks',
            description:
              'Enjoy magical days at Magic Kingdom, Epcot, Hollywood Studios, and Animal Kingdom',
          },
        },
      ],
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: guide.content.roomComparison[0].priceRange.value * 4 + 1200, // 4 nights + flights + tickets
      highPrice:
        guide.content.roomComparison[guide.content.roomComparison.length - 1].priceRange.peak * 7 +
        2000,
      offerCount: guide.content.roomComparison.length,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'TravelAgency',
        name: NEXT_TRIP_ANYWHERE.name,
        telephone: NEXT_TRIP_ANYWHERE.telephone,
      },
    },
    provider: {
      '@type': 'TravelAgency',
      name: NEXT_TRIP_ANYWHERE.name,
      telephone: NEXT_TRIP_ANYWHERE.telephone,
    },
  }
}

// Complete schema graph generator
export function generateDisneyRoomSchemaGraph(guide: DisneyRoomGuideData) {
  const schemas = []

  // 1. Article schema
  schemas.push(generateDisneyArticleSchema(guide))

  // 2. LodgingBusiness schema
  schemas.push(generateDisneyLodgingBusinessSchema(guide))

  // 3. Product schemas for each room type
  const roomProducts = generateRoomProductSchemas(guide)
  schemas.push(...roomProducts)

  // 4. FAQ schema
  const faqSchema = generateDisneyFAQSchema(guide)
  if (faqSchema) {
    schemas.push(faqSchema)
  }

  // 5. Breadcrumb schema
  schemas.push(generateDisneyBreadcrumbSchema(guide))

  // 6. ImageGallery schema
  schemas.push(generateDisneyImageGallerySchema(guide))

  // 7. TravelAgency schema
  schemas.push(generateDisneyTravelAgencySchema(guide))

  // 8. HowTo schema
  schemas.push(generateDisneyHowToSchema(guide))

  // 9. TouristTrip schema
  schemas.push(generateDisneyTripSchema(guide))

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}

// Validation utility
export function validateDisneyRoomSchema(schema: any): boolean {
  try {
    if (!schema['@context'] || !schema['@graph']) {
      console.error('Missing @context or @graph')
      return false
    }

    if (!Array.isArray(schema['@graph'])) {
      console.error('@graph must be an array')
      return false
    }

    const requiredTypes = [
      'Article',
      'LodgingBusiness',
      'Product',
      'FAQPage',
      'BreadcrumbList',
      'ImageGallery',
      'TravelAgency',
      'HowTo',
    ]
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

// Room comparison utility for generating comparison tables
export function generateRoomComparisonData(guide: DisneyRoomGuideData) {
  return {
    title: `${guide.resort.fullName} Room Comparison`,
    subtitle: `Compare all ${guide.content.roomComparison.length} room types`,
    rooms: guide.content.roomComparison.map((room) => ({
      name: room.roomType,
      view: room.view,
      sleeps: room.sleeps,
      size: `${room.squareFootage} sq ft`,
      beds: room.bedConfiguration,
      price: {
        value: `$${room.priceRange.value}`,
        moderate: `$${room.priceRange.moderate}`,
        peak: `$${room.priceRange.peak}`,
      },
      pros: room.pros,
      cons: room.cons,
      bestFor: room.bestFor,
      score: calculateRoomScore(room),
    })),
  }
}

// Helper function to score rooms
function calculateRoomScore(room: DisneyRoomGuideData['content']['roomComparison'][0]): number {
  let score = 0

  // Size scoring
  if (room.squareFootage > 400) {
    score += 2
  } else if (room.squareFootage > 300) {
    score += 1
  }

  // Renovation scoring
  if (room.renovationYear && room.renovationYear >= 2020) {
    score += 2
  } else if (room.renovationYear && room.renovationYear >= 2015) {
    score += 1
  }

  // Amenities scoring
  score += Math.min(room.amenities.length * 0.5, 3)

  // Unique features scoring
  score += Math.min(room.uniqueFeatures.length * 0.5, 2)

  return Math.min(Math.round(score), 10)
}
