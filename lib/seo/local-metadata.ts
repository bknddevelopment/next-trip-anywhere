/**
 * @fileoverview SEO metadata generation for local travel pages
 * @module lib/seo/local-metadata
 *
 * This module generates comprehensive SEO metadata for Essex County and town-specific pages,
 * optimized for local search and user engagement.
 */

import { Metadata } from 'next'

export interface TownInfo {
  name: string
  slug: string
  county: string
  state: string
  stateAbbr: string
  population?: number
  zipCodes?: string[]
  nearbyAirports?: string[]
  landmarks?: string[]
  demographics?: {
    focus: string
    averageIncome?: string
  }
}

/**
 * Generate metadata for town-specific travel pages
 */
export function generateTownMetadata(town: TownInfo): Metadata {
  const baseUrl = 'https://nexttripanywhere.com'
  const url = `${baseUrl}/travel-from-${town.slug}`

  const title = `Travel Agency ${town.name} ${town.stateAbbr} | Vacation Planning & Deals | Next Trip Anywhere`

  const description = `Looking for the best travel agency in ${town.name}, ${town.stateAbbr}? Next Trip Anywhere offers personalized vacation planning, exclusive deals, and expert travel advice for ${town.name} residents. Call 973-874-1019 for a free consultation.`

  const keywords = [
    `travel agency ${town.name} ${town.stateAbbr}`,
    `${town.name} vacation planning`,
    `travel agent ${town.name}`,
    `${town.name} travel deals`,
    `vacation packages from ${town.name}`,
    `${town.county} County travel agency`,
    'international travel',
    'all-inclusive vacations',
    'cruise packages',
    'flight booking',
    ...(town.nearbyAirports || []).map((airport) => `flights from ${airport}`),
  ]

  return {
    title,
    description,
    keywords: keywords.join(', '),

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: 'Next Trip Anywhere',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: '/images/essex-county-travel.jpg',
          width: 1200,
          height: 630,
          alt: `Travel Agency in ${town.name}, ${town.stateAbbr}`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@nexttripanywhere',
      title: title.length > 70 ? title.substring(0, 67) + '...' : title,
      description: description.length > 200 ? description.substring(0, 197) + '...' : description,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }
}

/**
 * Generate metadata for Essex County hub page
 */
export function generateCountyMetadata(): Metadata {
  const title = 'Travel Agency Essex County NJ | Local Travel Experts | Next Trip Anywhere'

  const description =
    "Next Trip Anywhere is Essex County's premier travel agency, serving Newark, Montclair, West Orange, and all surrounding towns. Expert vacation planning, exclusive deals, and personalized service. Call 973-874-1019."

  const keywords = [
    'travel agency Essex County NJ',
    'Essex County vacation planning',
    'Newark travel agency',
    'Montclair travel agent',
    'West Orange vacation packages',
    'Livingston travel deals',
    'Millburn travel planning',
    'South Orange travel agency',
    'Maplewood vacation planning',
    'Bloomfield travel agent',
    'New Jersey travel agency',
    'NJ vacation packages',
  ]

  return {
    title,
    description,
    keywords: keywords.join(', '),

    alternates: {
      canonical: 'https://nexttripanywhere.com/essex-county',
    },

    openGraph: {
      title,
      description,
      url: 'https://nexttripanywhere.com/essex-county',
      siteName: 'Next Trip Anywhere',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: '/images/essex-county-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'Travel Agency Essex County NJ',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@nexttripanywhere',
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Generate local business structured data
 */
export function generateLocalBusinessSchema(town?: TownInfo) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Next Trip Anywhere',
    description: town
      ? `Premier travel agency serving ${town.name} and Essex County, NJ`
      : 'Premier travel agency serving Essex County, New Jersey',
    url: 'https://nexttripanywhere.com',
    telephone: '+19738741019',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Essex County',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7831,
      longitude: -74.2227,
    },
    areaServed: town
      ? [
          {
            '@type': 'City',
            name: town.name,
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Essex County',
          },
        ]
      : {
          '@type': 'AdministrativeArea',
          name: 'Essex County',
        },
    priceRange: '$$',
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
    sameAs: [
      'https://www.facebook.com/nexttripanywhere',
      'https://www.instagram.com/nexttripanywhere',
      'https://twitter.com/nexttripanywhere',
    ],
  }

  return baseSchema
}

/**
 * Generate FAQ structured data for local pages
 */
export function generateLocalFAQSchema(town: TownInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What travel services does Next Trip Anywhere offer in ${town.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We offer comprehensive travel planning services for ${town.name} residents, including flight booking, hotel reservations, all-inclusive vacation packages, cruise planning, and personalized itinerary creation. Our local experts understand the unique travel needs of ${town.county} County residents.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I book a vacation package from ${town.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can book your vacation by calling us at 973-874-1019, visiting our online booking form, or scheduling a free consultation. We'll discuss your travel preferences, budget, and create a customized package that departs from convenient airports near ${town.name}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are the nearest airports to ${town.name} for international travel?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${town.name} residents have convenient access to ${(town.nearbyAirports || ['Newark Liberty International Airport (EWR)', 'JFK International Airport', 'LaGuardia Airport']).join(', ')}. We help you find the best flight options from these airports.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do you offer group travel packages for ${town.name} organizations?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! We specialize in group travel for ${town.name} schools, businesses, religious organizations, and social clubs. We offer special group rates and can customize itineraries for any size group.`,
        },
      },
    ],
  }
}

/**
 * Town data for Essex County
 */
export const ESSEX_COUNTY_TOWNS: Record<string, TownInfo> = {
  newark: {
    name: 'Newark',
    slug: 'newark',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 311549,
    zipCodes: [
      '07101',
      '07102',
      '07103',
      '07104',
      '07105',
      '07106',
      '07107',
      '07108',
      '07112',
      '07114',
    ],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'JFK International Airport',
      'LaGuardia Airport',
    ],
    landmarks: [
      'Prudential Center',
      'Newark Museum',
      'Branch Brook Park',
      'New Jersey Performing Arts Center',
    ],
    demographics: {
      focus: 'diverse travel options and budget-friendly packages',
      averageIncome: '$35,000-$75,000',
    },
  },
  montclair: {
    name: 'Montclair',
    slug: 'montclair',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 40921,
    zipCodes: ['07042', '07043'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Teterboro Airport',
      'JFK International Airport',
    ],
    landmarks: [
      'Montclair Art Museum',
      'Wellmont Theater',
      'Eagle Rock Reservation',
      'Montclair State University',
    ],
    demographics: {
      focus: 'luxury travel and cultural experiences',
      averageIncome: '$95,000-$150,000',
    },
  },
  'west-orange': {
    name: 'West Orange',
    slug: 'west-orange',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 48843,
    zipCodes: ['07052'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Morristown Airport',
      'JFK International Airport',
    ],
    landmarks: [
      'Thomas Edison National Historical Park',
      'Turtle Back Zoo',
      'Eagle Rock Reservation',
      'South Mountain Reservation',
    ],
    demographics: {
      focus: 'family vacations and adventure travel',
      averageIncome: '$85,000-$120,000',
    },
  },
  livingston: {
    name: 'Livingston',
    slug: 'livingston',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 31023,
    zipCodes: ['07039'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Morristown Airport',
      'JFK International Airport',
    ],
    landmarks: [
      'Riker Hill Art Park',
      'Livingston Mall',
      'Memorial Oval',
      'Livingston High School',
    ],
    demographics: {
      focus: 'business travel and premium vacations',
      averageIncome: '$110,000-$180,000',
    },
  },
  millburn: {
    name: 'Millburn',
    slug: 'millburn',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 21710,
    zipCodes: ['07041'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Morristown Airport',
      'JFK International Airport',
    ],
    landmarks: [
      'Paper Mill Playhouse',
      'Short Hills Mall',
      'Cora Hartshorn Arboretum',
      'Taylor Park',
    ],
    demographics: {
      focus: 'luxury destinations and exclusive experiences',
      averageIncome: '$150,000-$250,000',
    },
  },
  'south-orange': {
    name: 'South Orange',
    slug: 'south-orange',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 18484,
    zipCodes: ['07079'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'JFK International Airport',
      'LaGuardia Airport',
    ],
    landmarks: [
      'Seton Hall University',
      'South Orange Performing Arts Center',
      'Baird Community Center',
      'Cameron Field',
    ],
    demographics: {
      focus: 'student travel and educational tours',
      averageIncome: '$75,000-$125,000',
    },
  },
  maplewood: {
    name: 'Maplewood',
    slug: 'maplewood',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 25684,
    zipCodes: ['07040'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'JFK International Airport',
      'LaGuardia Airport',
    ],
    landmarks: [
      'Maplewood Village',
      'Memorial Park',
      'Burgdorff Center for Performing Arts',
      'Maplewood Country Club',
    ],
    demographics: {
      focus: 'eco-friendly travel and sustainable tourism',
      averageIncome: '$90,000-$140,000',
    },
  },
  bloomfield: {
    name: 'Bloomfield',
    slug: 'bloomfield',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 53105,
    zipCodes: ['07003'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Teterboro Airport',
      'JFK International Airport',
    ],
    landmarks: ['Brookdale Park', 'Bloomfield Center', 'Watsessing Park', 'Bloomfield College'],
    demographics: {
      focus: 'budget travel and value packages',
      averageIncome: '$55,000-$85,000',
    },
  },
  'cedar-grove': {
    name: 'Cedar Grove',
    slug: 'cedar-grove',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 12411,
    zipCodes: ['07009'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Teterboro Airport',
      'Morristown Airport',
    ],
    landmarks: [
      'Cedar Grove Community Park',
      'Mills Reservation',
      'Hilltop Reservation',
      'Bowden Park',
    ],
    demographics: {
      focus: 'small town charm with global destinations',
      averageIncome: '$90,000-$130,000',
    },
  },
  verona: {
    name: 'Verona',
    slug: 'verona',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 13332,
    zipCodes: ['07044'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Teterboro Airport',
      'JFK International Airport',
    ],
    landmarks: ['Verona Park', 'Verona Community Center', 'White Rock Lake', 'Historic Verona Inn'],
    demographics: {
      focus: 'historic charm and worldwide adventures',
      averageIncome: '$100,000-$150,000',
    },
  },
  nutley: {
    name: 'Nutley',
    slug: 'nutley',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 28967,
    zipCodes: ['07110'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Teterboro Airport',
      'LaGuardia Airport',
    ],
    landmarks: ['Nutley Museum', 'Yanticaw Park', 'Memorial Park', 'Annie Oakley House'],
    demographics: {
      focus: 'gateway to dream vacations',
      averageIncome: '$75,000-$110,000',
    },
  },
  belleville: {
    name: 'Belleville',
    slug: 'belleville',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 36602,
    zipCodes: ['07109'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Teterboro Airport',
      'LaGuardia Airport',
    ],
    landmarks: [
      'Branch Brook Park',
      'Belleville Turnpike',
      'Silver Lake',
      'Hendricks Field Golf Course',
    ],
    demographics: {
      focus: 'trusted partner for all travel needs',
      averageIncome: '$60,000-$90,000',
    },
  },
  'east-orange': {
    name: 'East Orange',
    slug: 'east-orange',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 64367,
    zipCodes: ['07017', '07018', '07019'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'JFK International Airport',
      'LaGuardia Airport',
    ],
    landmarks: ['East Orange City Hall', 'Elmwood Park', 'Watsessing Park', 'Brick Church Station'],
    demographics: {
      focus: 'connecting residents to worldwide destinations',
      averageIncome: '$45,000-$75,000',
    },
  },
  irvington: {
    name: 'Irvington',
    slug: 'irvington',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 53926,
    zipCodes: ['07111'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'JFK International Airport',
      'LaGuardia Airport',
    ],
    landmarks: [
      'Irvington Park',
      'Frank H. Morrell High School',
      'Olympic Park',
      'Clinton Cemetery',
    ],
    demographics: {
      focus: 'passport to world travel',
      averageIncome: '$40,000-$70,000',
    },
  },
  'glen-ridge': {
    name: 'Glen Ridge',
    slug: 'glen-ridge',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 7527,
    zipCodes: ['07028'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Teterboro Airport',
      'JFK International Airport',
    ],
    landmarks: [
      'Glen Ridge Country Club',
      'The Glen Ridge Congregational Church',
      'Hurrell Field',
      'Freeman Gardens',
    ],
    demographics: {
      focus: 'family travel in style',
      averageIncome: '$120,000-$200,000',
    },
  },
  caldwell: {
    name: 'Caldwell',
    slug: 'caldwell',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 7939,
    zipCodes: ['07006'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Morristown Airport',
      'Teterboro Airport',
    ],
    landmarks: [
      'Grover Cleveland Birthplace',
      'Caldwell University',
      'Memorial Park',
      'Caldwell Plaza',
    ],
    demographics: {
      focus: 'travel concierge services',
      averageIncome: '$85,000-$125,000',
    },
  },
  'north-caldwell': {
    name: 'North Caldwell',
    slug: 'north-caldwell',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 6183,
    zipCodes: ['07006'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Morristown Airport',
      'Teterboro Airport',
    ],
    landmarks: [
      'Green Brook Country Club',
      'Cedar Ridge Country Club',
      'Grandview Elementary',
      'Mountain Avenue',
    ],
    demographics: {
      focus: 'luxury travel experiences',
      averageIncome: '$150,000-$300,000',
    },
  },
  'west-caldwell': {
    name: 'West Caldwell',
    slug: 'west-caldwell',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 10759,
    zipCodes: ['07006', '07007'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Morristown Airport',
      'Teterboro Airport',
    ],
    landmarks: ['Hatfield Swamp', 'James Caldwell High School', 'Memorial Park', 'Crane Park'],
    demographics: {
      focus: 'wanderlust fulfillment',
      averageIncome: '$100,000-$160,000',
    },
  },
  'essex-fells': {
    name: 'Essex Fells',
    slug: 'essex-fells',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 2113,
    zipCodes: ['07021'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Morristown Airport',
      'Teterboro Airport',
    ],
    landmarks: [
      'Essex Fells Country Club',
      'Trotter Park',
      'Fells Manor',
      'The Fells Historic District',
    ],
    demographics: {
      focus: 'exclusive travel experiences',
      averageIncome: '$200,000-$500,000',
    },
  },
  roseland: {
    name: 'Roseland',
    slug: 'roseland',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 5819,
    zipCodes: ['07068'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Morristown Airport',
      'Teterboro Airport',
    ],
    landmarks: [
      'Becker Park',
      'Roseland Free Public Library',
      'Eagle Rock Avenue',
      'Harrison Avenue Business District',
    ],
    demographics: {
      focus: 'smart travel planning',
      averageIncome: '$95,000-$145,000',
    },
  },
  fairfield: {
    name: 'Fairfield',
    slug: 'fairfield',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 7466,
    zipCodes: ['07004'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'Morristown Airport',
      'Teterboro Airport',
    ],
    landmarks: [
      'Fairfield Recreation Complex',
      'Hollywood Avenue Business Park',
      'Passaic River',
      'Dutch Reformed Church',
    ],
    demographics: {
      focus: 'business and leisure travel expertise',
      averageIncome: '$80,000-$120,000',
    },
  },
  orange: {
    name: 'Orange',
    slug: 'orange',
    county: 'Essex',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    population: 34447,
    zipCodes: ['07050', '07051', '07052'],
    nearbyAirports: [
      'Newark Liberty International Airport (EWR)',
      'LaGuardia Airport (LGA)',
      'John F. Kennedy International Airport (JFK)',
    ],
    landmarks: [
      'Orange Public Library',
      'Orange Music Studio',
      'Central Park',
      'Orange Train Station',
    ],
    demographics: {
      focus: 'family travel and group packages',
      averageIncome: '$40,000-$60,000',
    },
  },
}
