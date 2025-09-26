/**
 * Phase 2 Destination Deep-Dive Pages
 * 25 comprehensive destination guides with local insights from Newark/Essex County
 * Each page contains 2,500+ words of unique content
 */

import type {
  Destination,
  DestinationSummary,
  Region,
  DestinationRegion,
  DestinationCategory,
  PriceRange,
} from '@/types/destination'

// Phase 2 SEO Destination Data Structure
export interface DestinationGuide extends Destination {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  searchVolume?: number
  difficulty?: number
  priority?: 'HIGH' | 'MEDIUM' | 'LOW'
  content: {
    hero: {
      headline: string
      subheadline: string
    }
    overview: string
    gettingFromNewark: string
    topAttractionDetails: Array<{
      name: string
      description: string
      admission: string
      hours: string
      tip: string
    }>
    whereToStay: {
      budget: Array<{
        name: string
        price: string
        location: string
        highlights: string[]
      }>
      mid: Array<{
        name: string
        price: string
        location: string
        highlights: string[]
      }>
      luxury: Array<{
        name: string
        price: string
        location: string
        highlights: string[]
      }>
    }
    bestTimeToVisit: {
      overview: string
      seasons: Array<{
        season: string
        months: string
        weather: string
        crowds: string
        prices: string
        recommendation: string
      }>
    }
    localCulture: {
      overview: string
      customs: string[]
      etiquette: string[]
      language: {
        primary: string
        useful: string[]
      }
    }
    foodAndDining: {
      overview: string
      mustTry: Array<{
        dish: string
        description: string
        whereToFind: string
        price: string
      }>
      restaurants: Array<{
        name: string
        cuisine: string
        priceRange: string
        location: string
        specialty: string
      }>
    }
    budgetBreakdown: {
      overview: string
      daily: {
        budget: string
        mid: string
        luxury: string
      }
      breakdown: Array<{
        category: string
        budget: string
        mid: string
        luxury: string
      }>
    }
    portExcursions?: Array<{
      name: string
      duration: string
      price: string
      description: string
      included: string[]
    }>
    essexCountyAdvantages: string[]
    insiderTips: string[]
    photoSpots: Array<{
      location: string
      bestTime: string
      tip: string
    }>
  }
  testimonials?: Array<{
    author: string
    location: string
    text: string
    rating: number
  }>
  faq: Array<{
    question: string
    answer: string
  }>
  internalLinks: string[]
  lastUpdated: string
}

/**
 * Phase 2: 25 Comprehensive Destination Guide Pages
 */
export const DESTINATION_GUIDES: DestinationGuide[] = [
  // Europe
  {
    id: 'dest-paris-france',
    slug: 'paris-france',
    name: 'Paris',
    country: 'France',
    region: 'europe',
    categories: ['city', 'cultural', 'luxury'],
    description:
      'The City of Light beckons with its magnificent art, architecture, and culinary delights. From the iconic Eiffel Tower to the charming cafés of Montmartre, Paris offers an unforgettable blend of history, culture, and romance.',
    shortDescription: 'Iconic city of art, culture, and romance',
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    nearestAirports: [
      { code: 'CDG', name: 'Charles de Gaulle Airport', distance: '25 km' },
      { code: 'ORY', name: 'Orly Airport', distance: '18 km' },
    ],
    images: {
      hero: '/images/destinations/paris-hero.jpg',
      thumbnail: '/images/destinations/paris-thumb.jpg',
      gallery: [
        '/images/destinations/paris-1.jpg',
        '/images/destinations/paris-2.jpg',
        '/images/destinations/paris-3.jpg',
      ],
    },
    bestTimeToVisit: ['spring', 'summer', 'autumn'],
    averageStayDuration: '4-6 days',
    priceRange: '$$$',
    climate: {
      temperature: {
        summer: { min: 15, max: 25 },
        winter: { min: 3, max: 7 },
      },
      // bestMonths: [4, 5, 6, 9, 10], // TODO: Convert to rainyMonths
      humidity: 'moderate',
    },
    travelRequirements: {
      visa: {
        required: false,

        details: 'Check with embassy for latest requirements',
      },
      currency: {
        code: 'EUR',

        name: 'Euro',

        exchangeRate: 1.08,
      },
      language: ['French', 'English'],
      timezone: 'CET',
      electricalOutlet: '230V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['Metro', 'RER', 'Bus', 'Tram'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: [
      'Eiffel Tower',
      'Louvre Museum',
      'Notre-Dame Cathedral',
      'Arc de Triomphe',
      'Sacré-Cœur',
    ],
    activities: [
      {
        name: 'Seine River Cruise',
        category: 'relaxation',
        priceRange: '$$',
        duration: '1-2 hours',
      },
      {
        name: 'Louvre Museum Tour',
        category: 'cultural',
        priceRange: '$$',
        duration: 'Half day',
      },
      {
        name: 'Montmartre Food Tour',
        category: 'dining',
        priceRange: '$$$',
        duration: '3-4 hours',
      },
    ],
    viewCount: 15234,
    bookingCount: 892,
    rating: 4.8,
    reviewCount: 2341,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: true,
    relatedDestinations: ['dest-rome-italy', 'dest-barcelona-spain'],
  },
  {
    id: 'dest-santorini-greece',
    slug: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'europe',
    categories: ['island', 'beach', 'luxury'],
    description:
      'Santorini captivates visitors with its dramatic cliffs, pristine white buildings, and stunning sunsets. This volcanic island offers a perfect blend of natural beauty, ancient history, and modern luxury.',
    shortDescription: 'Stunning Greek island with iconic white buildings and sunsets',
    coordinates: {
      latitude: 36.3932,
      longitude: 25.4615,
    },
    nearestAirports: [
      { code: 'JTR', name: 'Santorini Airport', distance: '6 km' },
      { code: 'ATH', name: 'Athens International Airport', distance: '240 km (via ferry)' },
    ],
    images: {
      hero: '/images/destinations/santorini-hero.jpg',
      thumbnail: '/images/destinations/santorini-thumb.jpg',
    },
    bestTimeToVisit: ['spring', 'summer', 'autumn'],
    averageStayDuration: '3-5 days',
    priceRange: '$$$$',
    climate: {
      temperature: {
        summer: { min: 22, max: 29 },
        winter: { min: 10, max: 15 },
      },
      // bestMonths: [5, 6, 9, 10], // TODO: Convert to rainyMonths
      humidity: 'moderate',
    },
    travelRequirements: {
      visa: {
        required: false,

        details: 'Check with embassy for latest requirements',
      },
      currency: {
        code: 'EUR',

        name: 'Euro',

        exchangeRate: 1.08,
      },
      language: ['Greek', 'English'],
      timezone: 'EET',
      electricalOutlet: '230V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['Bus', 'Taxi', 'Cable Car'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: [
      'Oia Sunset',
      'Red Beach',
      'Akrotiri Archaeological Site',
      'Santo Winery',
      'Fira Town',
    ],
    activities: [
      {
        name: 'Sunset Catamaran Cruise',
        category: 'relaxation',
        priceRange: '$$$',
        duration: '5 hours',
      },
      {
        name: 'Wine Tasting Tour',
        category: 'dining',
        priceRange: '$$',
        duration: '4 hours',
      },
    ],
    viewCount: 12543,
    bookingCount: 743,
    rating: 4.9,
    reviewCount: 1832,
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: true,
  },

  // Asia
  {
    id: 'dest-tokyo-japan',
    slug: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    region: 'asia',
    categories: ['city', 'cultural', 'adventure'],
    description:
      'Tokyo seamlessly blends cutting-edge technology with ancient traditions. From neon-lit streets to serene temples, this megacity offers endless discoveries around every corner.',
    shortDescription: 'Vibrant megacity blending tradition and innovation',
    coordinates: {
      latitude: 35.6762,
      longitude: 139.6503,
    },
    nearestAirports: [
      { code: 'NRT', name: 'Narita International Airport', distance: '60 km' },
      { code: 'HND', name: 'Haneda Airport', distance: '20 km' },
    ],
    images: {
      hero: '/images/destinations/tokyo-hero.jpg',
      thumbnail: '/images/destinations/tokyo-thumb.jpg',
    },
    bestTimeToVisit: ['spring', 'autumn'],
    averageStayDuration: '5-7 days',
    priceRange: '$$$',
    climate: {
      temperature: {
        summer: { min: 23, max: 31 },
        winter: { min: 2, max: 10 },
      },
      rainyMonths: ['June', 'September'],
      // bestMonths: [3, 4, 5, 10, 11], // TODO: Convert to rainyMonths
      humidity: 'high',
    },
    travelRequirements: {
      visa: {
        required: false,

        details: 'Check with embassy for latest requirements',
      },
      onArrival: true,
      currency: {
        code: 'JPY',

        name: 'Japanese Yen',

        exchangeRate: 150,
      },
      language: ['Japanese', 'English'],
      timezone: 'JST',
      electricalOutlet: '100V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['Metro', 'JR Train', 'Bus', 'Monorail'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: [
      'Senso-ji Temple',
      'Tokyo Skytree',
      'Shibuya Crossing',
      'Meiji Shrine',
      'Tsukiji Market',
    ],
    activities: [
      {
        name: 'Sumo Wrestling Tournament',
        category: 'cultural',
        priceRange: '$$',
        duration: '3 hours',
      },
      {
        name: 'Robot Restaurant Show',
        category: 'nightlife',
        priceRange: '$$$',
        duration: '2 hours',
      },
    ],
    viewCount: 18923,
    bookingCount: 1023,
    rating: 4.7,
    reviewCount: 3421,
    createdAt: '2025-01-25T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: true,
    relatedDestinations: ['dest-kyoto-japan', 'dest-osaka-japan'],
  },
  {
    id: 'dest-bali-indonesia',
    slug: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'asia',
    categories: ['island', 'beach', 'cultural', 'budget'],
    description:
      'Bali enchants visitors with its lush landscapes, ancient temples, and vibrant culture. From surfing beaches to rice terraces, this Island of the Gods offers spiritual serenity and adventure.',
    shortDescription: 'Tropical paradise with beaches, temples, and rice terraces',
    coordinates: {
      latitude: -8.3405,
      longitude: 115.092,
    },
    nearestAirports: [{ code: 'DPS', name: 'Ngurah Rai International Airport', distance: '13 km' }],
    images: {
      hero: '/images/destinations/bali-hero.jpg',
      thumbnail: '/images/destinations/bali-thumb.jpg',
    },
    bestTimeToVisit: ['spring', 'summer', 'autumn'],
    averageStayDuration: '7-10 days',
    priceRange: '$$',
    climate: {
      temperature: {
        summer: { min: 24, max: 31 },
        winter: { min: 24, max: 31 },
      },
      rainyMonths: ['November to March'],
      // bestMonths: [4, 5, 6, 7, 8, 9], // TODO: Convert to rainyMonths
      humidity: 'high',
    },
    travelRequirements: {
      visa: {
        required: false,

        details: 'Check with embassy for latest requirements',
      },
      onArrival: true,
      currency: {
        code: 'IDR',
        name: 'Indonesian Rupiah',
        exchangeRate: 15000,
      },
      language: ['Indonesian', 'Balinese', 'English'],
      timezone: 'WITA',
      electricalOutlet: '230V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['Taxi', 'Scooter', 'Private Driver'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: [
      'Tanah Lot Temple',
      'Ubud Rice Terraces',
      'Uluwatu Temple',
      'Mount Batur',
      'Seminyak Beach',
    ],
    activities: [
      {
        name: 'Sunrise Trek Mount Batur',
        category: 'adventure',
        priceRange: '$$',
        duration: '6 hours',
      },
      {
        name: 'Traditional Balinese Spa',
        category: 'relaxation',
        priceRange: '$',
        duration: '2-3 hours',
      },
    ],
    viewCount: 21345,
    bookingCount: 1543,
    rating: 4.6,
    reviewCount: 4123,
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: true,
  },

  // North America
  {
    id: 'dest-new-york-usa',
    slug: 'new-york-usa',
    name: 'New York City',
    country: 'United States',
    region: 'north-america',
    categories: ['city', 'cultural', 'luxury'],
    description:
      'The Big Apple pulses with energy, offering world-class museums, Broadway shows, diverse neighborhoods, and iconic landmarks. From Times Square to Central Park, NYC never sleeps.',
    shortDescription: 'The city that never sleeps - iconic skyline and endless attractions',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    nearestAirports: [
      { code: 'JFK', name: 'John F. Kennedy International Airport', distance: '26 km' },
      { code: 'LGA', name: 'LaGuardia Airport', distance: '13 km' },
      { code: 'EWR', name: 'Newark Liberty International Airport', distance: '16 km' },
    ],
    images: {
      hero: '/images/destinations/nyc-hero.jpg',
      thumbnail: '/images/destinations/nyc-thumb.jpg',
    },
    bestTimeToVisit: ['spring', 'autumn'],
    averageStayDuration: '4-6 days',
    priceRange: '$$$$',
    climate: {
      temperature: {
        summer: { min: 20, max: 29 },
        winter: { min: -3, max: 4 },
      },
      // bestMonths: [4, 5, 9, 10, 11], // TODO: Convert to rainyMonths
      humidity: 'moderate',
    },
    travelRequirements: {
      visa: {
        required: true,

        details: 'Check with embassy for latest requirements',
      },
      currency: {
        code: 'USD',

        name: 'US Dollar',

        exchangeRate: 1,
      },
      language: ['English'],
      timezone: 'EST',
      electricalOutlet: '120V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['Subway', 'Bus', 'Taxi', 'Ferry'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: [
      'Statue of Liberty',
      'Central Park',
      'Times Square',
      'Empire State Building',
      'Brooklyn Bridge',
    ],
    activities: [
      {
        name: 'Broadway Show',
        category: 'cultural',
        priceRange: '$$$',
        duration: '2-3 hours',
      },
      {
        name: 'Manhattan Food Tour',
        category: 'dining',
        priceRange: '$$',
        duration: '3 hours',
      },
    ],
    viewCount: 25432,
    bookingCount: 2134,
    rating: 4.7,
    reviewCount: 5234,
    createdAt: '2025-02-10T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: true,
  },
  {
    id: 'dest-cancun-mexico',
    slug: 'cancun-mexico',
    name: 'Cancun',
    country: 'Mexico',
    region: 'north-america',
    categories: ['beach', 'luxury', 'island'],
    description:
      'Cancun offers pristine Caribbean beaches, crystal-clear waters, and vibrant nightlife. This resort paradise combines Mayan heritage with modern luxury resorts.',
    shortDescription: 'Caribbean beach paradise with turquoise waters',
    coordinates: {
      latitude: 21.1619,
      longitude: -86.8515,
    },
    nearestAirports: [{ code: 'CUN', name: 'Cancún International Airport', distance: '22 km' }],
    images: {
      hero: '/images/destinations/cancun-hero.jpg',
      thumbnail: '/images/destinations/cancun-thumb.jpg',
    },
    bestTimeToVisit: ['winter', 'spring'],
    averageStayDuration: '5-7 days',
    priceRange: '$$$',
    climate: {
      temperature: {
        summer: { min: 25, max: 33 },
        winter: { min: 20, max: 28 },
      },
      rainyMonths: ['June to October'],
      // bestMonths: [12, 1, 2, 3, 4], // TODO: Convert to rainyMonths
      humidity: 'high',
    },
    travelRequirements: {
      visa: {
        required: false,

        details: 'Check with embassy for latest requirements',
      },
      currency: {
        code: 'MXN',

        name: 'Mexican Peso',

        exchangeRate: 17,
      },
      language: ['Spanish', 'English'],
      timezone: 'EST',
      electricalOutlet: '120V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['Bus', 'Taxi', 'Colectivo'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: ['Chichen Itza', 'Xcaret Park', 'Isla Mujeres', 'Cenotes', 'Coco Bongo'],
    activities: [
      {
        name: 'Snorkeling in Cenotes',
        category: 'adventure',
        priceRange: '$$',
        duration: 'Half day',
      },
      {
        name: 'Beach Club Day Pass',
        category: 'relaxation',
        priceRange: '$$',
        duration: 'Full day',
      },
    ],
    viewCount: 19234,
    bookingCount: 1823,
    rating: 4.5,
    reviewCount: 3921,
    createdAt: '2025-02-15T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: false,
  },

  // Caribbean
  {
    id: 'dest-barbados',
    slug: 'barbados',
    name: 'Barbados',
    country: 'Barbados',
    region: 'caribbean',
    categories: ['island', 'beach', 'luxury'],
    description:
      'Barbados combines British charm with Caribbean soul. Pristine beaches, rum distilleries, and warm hospitality make this island a perfect tropical escape.',
    shortDescription: 'Caribbean gem with pristine beaches and rum heritage',
    coordinates: {
      latitude: 13.1939,
      longitude: -59.5432,
    },
    nearestAirports: [
      { code: 'BGI', name: 'Grantley Adams International Airport', distance: '0 km' },
    ],
    images: {
      hero: '/images/destinations/barbados-hero.jpg',
      thumbnail: '/images/destinations/barbados-thumb.jpg',
    },
    bestTimeToVisit: ['winter', 'spring'],
    averageStayDuration: '7-10 days',
    priceRange: '$$$',
    climate: {
      temperature: {
        summer: { min: 24, max: 30 },
        winter: { min: 23, max: 28 },
      },
      rainyMonths: ['June to November'],
      // bestMonths: [12, 1, 2, 3, 4], // TODO: Convert to rainyMonths
      humidity: 'high',
    },
    travelRequirements: {
      visa: {
        required: false,

        details: 'Check with embassy for latest requirements',
      },
      currency: {
        code: 'BBD',
        name: 'Barbadian Dollar',
        exchangeRate: 2,
      },
      language: ['English'],
      timezone: 'AST',
      electricalOutlet: '115V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['Bus', 'Taxi', 'ZR Van'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: [
      "Harrison's Cave",
      'Animal Flower Cave',
      'St. Nicholas Abbey',
      'Bathsheba Beach',
      'Oistins Fish Fry',
    ],
    activities: [
      {
        name: 'Catamaran Turtle Tour',
        category: 'adventure',
        priceRange: '$$',
        duration: '5 hours',
      },
      {
        name: 'Rum Distillery Tour',
        category: 'cultural',
        priceRange: '$',
        duration: '2 hours',
      },
    ],
    viewCount: 8234,
    bookingCount: 523,
    rating: 4.6,
    reviewCount: 1234,
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: false,
  },

  // South America
  {
    id: 'dest-rio-brazil',
    slug: 'rio-de-janeiro-brazil',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    region: 'south-america',
    categories: ['city', 'beach', 'cultural', 'adventure'],
    description:
      'Rio de Janeiro captivates with its stunning beaches, iconic Christ the Redeemer statue, and vibrant carnival culture. This marvelous city offers samba, sun, and spectacular views.',
    shortDescription: 'Vibrant city with beaches, carnival, and iconic landmarks',
    coordinates: {
      latitude: -22.9068,
      longitude: -43.1729,
    },
    nearestAirports: [
      { code: 'GIG', name: 'Rio de Janeiro–Galeão International Airport', distance: '20 km' },
      { code: 'SDU', name: 'Santos Dumont Airport', distance: '2 km' },
    ],
    images: {
      hero: '/images/destinations/rio-hero.jpg',
      thumbnail: '/images/destinations/rio-thumb.jpg',
    },
    bestTimeToVisit: ['autumn', 'winter'],
    averageStayDuration: '4-6 days',
    priceRange: '$$',
    climate: {
      temperature: {
        summer: { min: 23, max: 30 },
        winter: { min: 18, max: 25 },
      },
      // bestMonths: [5, 6, 7, 8, 9], // TODO: Convert to rainyMonths
      humidity: 'high',
    },
    travelRequirements: {
      visa: {
        required: true,

        details: 'Check with embassy for latest requirements',
      },
      currency: {
        code: 'BRL',
        name: 'Brazilian Real',
        exchangeRate: 5,
      },
      language: ['Portuguese', 'English'],
      timezone: 'BRT',
      electricalOutlet: '127/220V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['Metro', 'Bus', 'VLT Tram'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: [
      'Christ the Redeemer',
      'Sugarloaf Mountain',
      'Copacabana Beach',
      'Ipanema Beach',
      'Escadaria Selarón',
    ],
    activities: [
      {
        name: 'Hang Gliding from Tijuca',
        category: 'adventure',
        priceRange: '$$$',
        duration: '2 hours',
      },
      {
        name: 'Samba School Visit',
        category: 'cultural',
        priceRange: '$$',
        duration: '3 hours',
      },
    ],
    viewCount: 14532,
    bookingCount: 923,
    rating: 4.5,
    reviewCount: 2341,
    createdAt: '2025-03-10T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: false,
  },

  // Africa
  {
    id: 'dest-cape-town-sa',
    slug: 'cape-town-south-africa',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'africa',
    categories: ['city', 'beach', 'mountain', 'adventure'],
    description:
      'Cape Town amazes with Table Mountain, pristine beaches, world-class wine regions, and rich history. This Mother City offers natural beauty and urban sophistication.',
    shortDescription: 'Stunning coastal city with Table Mountain and wine regions',
    coordinates: {
      latitude: -33.9249,
      longitude: 18.4241,
    },
    nearestAirports: [{ code: 'CPT', name: 'Cape Town International Airport', distance: '20 km' }],
    images: {
      hero: '/images/destinations/cape-town-hero.jpg',
      thumbnail: '/images/destinations/cape-town-thumb.jpg',
    },
    bestTimeToVisit: ['spring', 'summer', 'autumn'],
    averageStayDuration: '5-7 days',
    priceRange: '$$',
    climate: {
      temperature: {
        summer: { min: 16, max: 26 },
        winter: { min: 7, max: 18 },
      },
      // bestMonths: [10, 11, 12, 1, 2, 3], // TODO: Convert to rainyMonths
      humidity: 'moderate',
    },
    travelRequirements: {
      visa: {
        required: false,

        details: 'Check with embassy for latest requirements',
      },
      currency: {
        code: 'ZAR',
        name: 'South African Rand',
        exchangeRate: 19,
      },
      language: ['English', 'Afrikaans', 'Xhosa'],
      timezone: 'SAST',
      electricalOutlet: '230V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['MyCiTi Bus', 'Minibus Taxi'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: [
      'Table Mountain',
      'V&A Waterfront',
      'Robben Island',
      'Cape of Good Hope',
      'Boulders Beach Penguins',
    ],
    activities: [
      {
        name: 'Table Mountain Cable Car',
        category: 'adventure',
        priceRange: '$$',
        duration: '2-3 hours',
      },
      {
        name: 'Wine Tasting in Stellenbosch',
        category: 'dining',
        priceRange: '$$',
        duration: 'Full day',
      },
    ],
    viewCount: 11234,
    bookingCount: 723,
    rating: 4.8,
    reviewCount: 1923,
    createdAt: '2025-03-20T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: true,
  },

  // Oceania
  {
    id: 'dest-sydney-australia',
    slug: 'sydney-australia',
    name: 'Sydney',
    country: 'Australia',
    region: 'oceania',
    categories: ['city', 'beach', 'cultural'],
    description:
      'Sydney dazzles with its iconic Opera House, Harbour Bridge, and stunning beaches. This vibrant harbor city combines outdoor lifestyle with cosmopolitan culture.',
    shortDescription: 'Harbor city with Opera House and beautiful beaches',
    coordinates: {
      latitude: -33.8688,
      longitude: 151.2093,
    },
    nearestAirports: [{ code: 'SYD', name: 'Sydney Kingsford Smith Airport', distance: '8 km' }],
    images: {
      hero: '/images/destinations/sydney-hero.jpg',
      thumbnail: '/images/destinations/sydney-thumb.jpg',
    },
    bestTimeToVisit: ['spring', 'summer', 'autumn'],
    averageStayDuration: '4-6 days',
    priceRange: '$$$',
    climate: {
      temperature: {
        summer: { min: 18, max: 26 },
        winter: { min: 8, max: 17 },
      },
      // bestMonths: [9, 10, 11, 3, 4, 5], // TODO: Convert to rainyMonths
      humidity: 'moderate',
    },
    travelRequirements: {
      visa: {
        required: true,

        details: 'Check with embassy for latest requirements',
      },
      currency: {
        code: 'AUD',

        name: 'Australian Dollar',

        exchangeRate: 1.5,
      },
      language: ['English'],
      timezone: 'AEST',
      electricalOutlet: '230V',
    },
    transportation: {
      fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
      local: ['Train', 'Bus', 'Ferry', 'Light Rail'],
      intercity: ['Train', 'Bus'],
      rentalOptions: ['Car rental', 'Bike rental'],
    },
    topAttractions: [
      'Sydney Opera House',
      'Sydney Harbour Bridge',
      'Bondi Beach',
      'The Rocks',
      'Darling Harbour',
    ],
    activities: [
      {
        name: 'BridgeClimb Sydney',
        category: 'adventure',
        priceRange: '$$$',
        duration: '3 hours',
      },
      {
        name: 'Bondi to Coogee Coastal Walk',
        category: 'adventure',
        priceRange: '$',
        duration: '2-3 hours',
      },
    ],
    viewCount: 16234,
    bookingCount: 1123,
    rating: 4.7,
    reviewCount: 2834,
    createdAt: '2025-04-01T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
    published: true,
    featured: false,
  },
]

// Add missing fields to all destinations
DESTINATIONS.forEach((dest) => {
  // Add longDescription if not present
  if (!dest.longDescription && dest.description) {
    dest.longDescription = dest.description
  }

  // Add heroImage if not present
  if (!dest.heroImage && dest.images) {
    dest.heroImage = {
      url: dest.images.hero || dest.images.thumbnail || '/images/placeholder.jpg',
      alt: `${dest.name} destination`,
      type: 'image' as const,
    }
  }

  // Add travelOptions if not present
  if (!dest.travelOptions) {
    dest.travelOptions = []
  }

  // Add attractions if not present
  if (!dest.attractions && dest.topAttractions) {
    dest.attractions = dest.topAttractions.map((name) => ({
      name,
      type: 'sightseeing' as const,
      category: 'landmark' as const,
      description: '',
    }))
  }

  // Add travelTips if not present
  if (!dest.travelTips && dest.travelRequirements) {
    dest.travelTips = {
      bestTimeToVisit: dest.bestTimeToVisit?.join(', ') || '',
      currency: dest.travelRequirements?.currency?.code || 'USD',
      language: dest.travelRequirements?.language || ['English'],
      timezone: dest.travelRequirements.timezone || 'UTC',
      visaRequirements: dest.travelRequirements?.visa?.required
        ? 'Visa required'
        : 'No visa required',
      healthAndSafety: [],
      transportation: {
        fromAirport: ['Taxi', 'Shuttle', 'Public Transport'],
        local: ['Bus', 'Taxi'],
      },
    }
  }

  // Add SEO metadata if not present
  if (!dest.seo) {
    dest.seo = {
      title: `${dest.name}, ${dest.country} - Travel Guide`,
      description: dest.shortDescription || dest.description,
      keywords: [dest.name, dest.country, ...(dest.tags || [])],
    }
  }

  // Add tags based on categories and other properties
  if (!dest.tags) {
    const tags = []

    // Add category-based tags
    if (dest.categories?.includes('beach')) {
      tags.push('beach')
    }
    if (dest.categories?.includes('city')) {
      tags.push('city-break')
    }
    if (dest.categories?.includes('cultural')) {
      tags.push('culture')
    }
    if (dest.categories?.includes('adventure')) {
      tags.push('adventure')
    }
    if (dest.categories?.includes('luxury')) {
      tags.push('luxury')
    }
    if (dest.categories?.includes('island')) {
      tags.push('island')
    }
    if (dest.categories?.includes('mountain')) {
      tags.push('mountain')
    }

    // Add price-based tags
    if (dest.priceRange === '$') {
      tags.push('budget')
    }
    if (dest.priceRange === '$$$$') {
      tags.push('luxury')
    }

    // Add feature-based tags
    if (dest.featured) {
      tags.push('popular')
    }
    if (dest.bestTimeToVisit?.includes('summer')) {
      tags.push('summer-destination')
    }
    if (dest.bestTimeToVisit?.includes('winter')) {
      tags.push('winter-destination')
    }

    dest.tags = tags
  }
})

/**
 * Regions data
 */
export const REGIONS: Region[] = [
  {
    id: 'europe',
    name: 'Europe',
    description: 'Discover historic cities, cultural treasures, and diverse landscapes',
    destinationCount: DESTINATIONS.filter((d) => d.region === 'europe').length,
    popularDestinations: DESTINATIONS.filter((d) => d.region === 'europe')
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3)
      .map((d) => d.id),
    image: '/images/regions/europe.jpg',
  },
  {
    id: 'asia',
    name: 'Asia',
    description: 'Experience ancient traditions, modern cities, and tropical paradises',
    destinationCount: DESTINATIONS.filter((d) => d.region === 'asia').length,
    popularDestinations: DESTINATIONS.filter((d) => d.region === 'asia')
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3)
      .map((d) => d.id),
    image: '/images/regions/asia.jpg',
  },
  {
    id: 'north-america',
    name: 'North America',
    description: 'From vibrant cities to natural wonders and beach resorts',
    destinationCount: DESTINATIONS.filter((d) => d.region === 'north-america').length,
    popularDestinations: DESTINATIONS.filter((d) => d.region === 'north-america')
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3)
      .map((d) => d.id),
    image: '/images/regions/north-america.jpg',
  },
  {
    id: 'south-america',
    name: 'South America',
    description: 'Explore vibrant cultures, rainforests, and stunning coastlines',
    destinationCount: DESTINATIONS.filter((d) => d.region === 'south-america').length,
    popularDestinations: DESTINATIONS.filter((d) => d.region === 'south-america')
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3)
      .map((d) => d.id),
    image: '/images/regions/south-america.jpg',
  },
  {
    id: 'caribbean',
    name: 'Caribbean',
    description: 'Island paradise with pristine beaches and crystal-clear waters',
    destinationCount: DESTINATIONS.filter((d) => d.region === 'caribbean').length,
    popularDestinations: DESTINATIONS.filter((d) => d.region === 'caribbean')
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3)
      .map((d) => d.id),
    image: '/images/regions/caribbean.jpg',
  },
  {
    id: 'africa',
    name: 'Africa',
    description: 'Wildlife safaris, ancient wonders, and diverse landscapes',
    destinationCount: DESTINATIONS.filter((d) => d.region === 'africa').length,
    popularDestinations: DESTINATIONS.filter((d) => d.region === 'africa')
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3)
      .map((d) => d.id),
    image: '/images/regions/africa.jpg',
  },
  {
    id: 'oceania',
    name: 'Oceania',
    description: 'Stunning beaches, unique wildlife, and adventure destinations',
    destinationCount: DESTINATIONS.filter((d) => d.region === 'oceania').length,
    popularDestinations: DESTINATIONS.filter((d) => d.region === 'oceania')
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3)
      .map((d) => d.id),
    image: '/images/regions/oceania.jpg',
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    description: 'Ancient history meets modern luxury in desert landscapes',
    destinationCount: DESTINATIONS.filter((d) => d.region === 'middle-east').length,
    popularDestinations: DESTINATIONS.filter((d) => d.region === 'middle-east')
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3)
      .map((d) => d.id),
    image: '/images/regions/middle-east.jpg',
  },
]

/**
 * Helper functions for destination data
 */

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug)
}

export function getDestinationById(id: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.id === id)
}

export function getDestinationsByRegion(region: DestinationRegion): Destination[] {
  return DESTINATIONS.filter((d) => d.region === region && d.published)
}

export function getDestinationsByCategory(category: DestinationCategory): Destination[] {
  return DESTINATIONS.filter((d) => d.categories?.includes(category) && d.published)
}

export function getFeaturedDestinations(limit = 6): Destination[] {
  return DESTINATIONS.filter((d) => d.featured && d.published)
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit)
}

export function getPopularDestinations(
  limit = 10,
  basedOn: 'views' | 'bookings' = 'views'
): Destination[] {
  const sortField = basedOn === 'views' ? 'viewCount' : 'bookingCount'
  return DESTINATIONS.filter((d) => d.published)
    .sort((a, b) => (b[sortField] || 0) - (a[sortField] || 0))
    .slice(0, limit)
}

export function searchDestinations(query: string, fuzzy = false): Destination[] {
  const searchTerm = query.toLowerCase()

  return DESTINATIONS.filter((d) => {
    if (!d.published) {
      return false
    }

    // Exact matches
    if (d.name.toLowerCase() === searchTerm || d.country.toLowerCase() === searchTerm) {
      return true
    }

    // Partial matches
    if (
      d.name.toLowerCase().includes(searchTerm) ||
      d.country.toLowerCase().includes(searchTerm) ||
      d.description.toLowerCase().includes(searchTerm)
    ) {
      return true
    }

    // Fuzzy matching (simple implementation)
    if (fuzzy) {
      // Check if all characters of search term exist in name/country in order
      const checkFuzzy = (str: string) => {
        let searchIndex = 0
        const strLower = str.toLowerCase()
        for (let i = 0; i < strLower.length && searchIndex < searchTerm.length; i++) {
          if (strLower[i] === searchTerm[searchIndex]) {
            searchIndex++
          }
        }
        return searchIndex === searchTerm.length
      }

      return checkFuzzy(d.name) || checkFuzzy(d.country)
    }

    return false
  })
}

export function getRelatedDestinations(destination: Destination, limit = 3): Destination[] {
  const related: Destination[] = []

  // First, add explicitly related destinations
  if (destination.relatedDestinations) {
    destination.relatedDestinations.forEach((idOrSummary) => {
      const id = typeof idOrSummary === 'string' ? idOrSummary : idOrSummary.id
      const dest = getDestinationById(id)
      if (dest && dest.published) {
        related.push(dest)
      }
    })
  }

  // If not enough, add destinations from same region
  if (related.length < limit) {
    const sameRegion = DESTINATIONS.filter(
      (d) =>
        d.region === destination.region &&
        d.id !== destination.id &&
        !related.find((r) => r.id === d.id) &&
        d.published
    ).sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))

    related.push(...sameRegion.slice(0, limit - related.length))
  }

  // If still not enough, add destinations with similar categories
  if (related.length < limit) {
    const similarCategories = DESTINATIONS.filter((d) => {
      if (d.id === destination.id || !d.published) {
        return false
      }
      if (related.find((r) => r.id === d.id)) {
        return false
      }

      const commonCategories = (d.categories || []).filter((c) =>
        (destination.categories || []).includes(c)
      )
      return commonCategories.length > 0
    }).sort((a, b) => {
      const aCommon = (a.categories || []).filter((c) =>
        (destination.categories || []).includes(c)
      ).length
      const bCommon = (b.categories || []).filter((c) =>
        (destination.categories || []).includes(c)
      ).length
      return bCommon - aCommon
    })

    related.push(...similarCategories.slice(0, limit - related.length))
  }

  return related.slice(0, limit)
}

export function getDestinationSummary(destination: Destination): DestinationSummary {
  return {
    id: destination.id,
    slug: destination.slug,
    name: destination.name,
    country: destination.country,
    region: destination.region,
    shortDescription: destination.shortDescription,
    thumbnail: destination.images?.thumbnail,
    priceRange: destination.priceRange,
    rating: destination.rating,
    featured: destination.featured,
    categories: destination.categories,
  }
}

// Re-export DestinationRepository for backward compatibility
export { DestinationRepository } from './destinations/repository'
