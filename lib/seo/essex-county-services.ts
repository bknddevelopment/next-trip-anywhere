/**
 * Essex County Services Configuration
 * Defines all services and cities for dynamic route generation
 */

// List of all services with metadata
export const ESSEX_SERVICES = [
  {
    slug: 'group-travel',
    name: 'Group Travel',
    title: 'Group Travel Services',
    description:
      'Professional group travel coordination for schools, churches, sports teams, and organizations.',
    keywords: [
      'group travel',
      'organization trips',
      'school travel',
      'church groups',
      'sports teams',
    ],
    icon: 'Users',
  },
  {
    slug: 'airport-transfers',
    name: 'Airport Transfers',
    title: 'Airport Transfer Services',
    description:
      'Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports.',
    keywords: [
      'airport transfers',
      'Newark airport',
      'EWR transportation',
      'airport shuttle',
      'airport limo',
    ],
    icon: 'Plane',
  },
  {
    slug: 'corporate-travel',
    name: 'Corporate Travel',
    title: 'Corporate Travel Management',
    description:
      'Comprehensive business travel solutions including flight booking, hotel arrangements, and expense management.',
    keywords: [
      'corporate travel',
      'business travel',
      'company trips',
      'executive travel',
      'business class',
    ],
    icon: 'Briefcase',
  },
  {
    slug: 'cruise-transfers',
    name: 'Cruise Transfers',
    title: 'Cruise Port Transportation',
    description:
      'Direct transfers to Manhattan, Brooklyn, and Cape Liberty cruise terminals with luggage assistance.',
    keywords: [
      'cruise transfers',
      'port transportation',
      'cruise terminal',
      'Manhattan cruise port',
      'Cape Liberty',
    ],
    icon: 'Ship',
  },
  {
    slug: 'wedding-transportation',
    name: 'Wedding Transportation',
    title: 'Wedding Transportation Services',
    description:
      'Elegant wedding transportation including limousines, party buses, and guest shuttle services.',
    keywords: [
      'wedding transportation',
      'wedding limo',
      'bridal party',
      'guest shuttle',
      'wedding cars',
    ],
    icon: 'Heart',
  },
  {
    slug: 'special-events',
    name: 'Special Events',
    title: 'Special Event Transportation',
    description:
      'Transportation for concerts, sporting events, proms, and special occasions throughout the tri-state area.',
    keywords: [
      'special events',
      'concert transportation',
      'sports events',
      'prom limo',
      'event shuttle',
    ],
    icon: 'Star',
  },
  {
    slug: 'wine-tours-day-trips',
    name: 'Wine Tours & Day Trips',
    title: 'Wine Tours and Day Trip Services',
    description:
      'Guided wine tours to NJ wineries, NYC day trips, and Atlantic City excursions with comfortable transportation.',
    keywords: ['wine tours', 'day trips', 'winery tours', 'NYC tours', 'Atlantic City trips'],
    icon: 'Wine',
  },
  {
    slug: 'medical-appointments',
    name: 'Medical Appointments',
    title: 'Medical Transportation Services',
    description:
      'Safe, reliable transportation to medical appointments, treatments, and hospital visits.',
    keywords: [
      'medical transportation',
      'hospital transport',
      'doctor appointments',
      'medical shuttle',
      'healthcare transport',
    ],
    icon: 'Medical',
  },
  {
    slug: 'school-transportation',
    name: 'School Transportation',
    title: 'School Transportation Services',
    description:
      'Safe student transportation for field trips, sports events, and daily school runs with certified drivers.',
    keywords: [
      'school transportation',
      'student transport',
      'field trips',
      'school bus',
      'student shuttle',
    ],
    icon: 'School',
  },
] as const

// Complete list of Essex County cities (23 total: 11 existing + 12 new)
export const ESSEX_CITIES = [
  // Core Essex County cities with all services
  {
    slug: 'newark',
    name: 'Newark',
    population: 311549,
    coordinates: { lat: 40.7357, lng: -74.1724 },
  },
  {
    slug: 'orange',
    name: 'Orange',
    population: 34447,
    coordinates: { lat: 40.7706, lng: -74.2328 },
  },
  {
    slug: 'montclair',
    name: 'Montclair',
    population: 40921,
    coordinates: { lat: 40.8259, lng: -74.209 },
  },
  {
    slug: 'west-orange',
    name: 'West Orange',
    population: 48843,
    coordinates: { lat: 40.7987, lng: -74.239 },
  },
  {
    slug: 'livingston',
    name: 'Livingston',
    population: 31334,
    coordinates: { lat: 40.7956, lng: -74.3146 },
  },
  {
    slug: 'millburn',
    name: 'Millburn',
    population: 21710,
    coordinates: { lat: 40.7248, lng: -74.3035 },
  },
  {
    slug: 'south-orange',
    name: 'South Orange',
    population: 18484,
    coordinates: { lat: 40.7489, lng: -74.2613 },
  },
  {
    slug: 'maplewood',
    name: 'Maplewood',
    population: 25684,
    coordinates: { lat: 40.7312, lng: -74.2735 },
  },
  {
    slug: 'bloomfield',
    name: 'Bloomfield',
    population: 53105,
    coordinates: { lat: 40.8067, lng: -74.1854 },
  },
  {
    slug: 'cedar-grove',
    name: 'Cedar Grove',
    population: 14052,
    coordinates: { lat: 40.8573, lng: -74.229 },
  },
  {
    slug: 'verona',
    name: 'Verona',
    population: 14572,
    coordinates: { lat: 40.8298, lng: -74.2404 },
  },
  {
    slug: 'nutley',
    name: 'Nutley',
    population: 30143,
    coordinates: { lat: 40.8223, lng: -74.1599 },
  },
  // New 9 cities
  {
    slug: 'belleville',
    name: 'Belleville',
    population: 38222,
    coordinates: { lat: 40.7937, lng: -74.1501 },
  },
  {
    slug: 'east-orange',
    name: 'East Orange',
    population: 69612,
    coordinates: { lat: 40.7673, lng: -74.2049 },
  },
  {
    slug: 'irvington',
    name: 'Irvington',
    population: 61176,
    coordinates: { lat: 40.7324, lng: -74.2349 },
  },
  {
    slug: 'glen-ridge',
    name: 'Glen Ridge',
    population: 7852,
    coordinates: { lat: 40.8053, lng: -74.2038 },
  },
  {
    slug: 'caldwell',
    name: 'Caldwell',
    population: 9027,
    coordinates: { lat: 40.8398, lng: -74.2765 },
  },
  {
    slug: 'west-caldwell',
    name: 'West Caldwell',
    population: 11223,
    coordinates: { lat: 40.8489, lng: -74.2968 },
  },
  {
    slug: 'essex-fells',
    name: 'Essex Fells',
    population: 2288,
    coordinates: { lat: 40.8245, lng: -74.2843 },
  },
  {
    slug: 'roseland',
    name: 'Roseland',
    population: 6290,
    coordinates: { lat: 40.8206, lng: -74.2938 },
  },
  {
    slug: 'orange',
    name: 'Orange',
    population: 34447,
    coordinates: { lat: 40.7707, lng: -74.2324 },
  },
  {
    slug: 'fairfield',
    name: 'Fairfield',
    population: 7615,
    coordinates: { lat: 40.8834, lng: -74.3062 },
  },
  {
    slug: 'north-caldwell',
    name: 'North Caldwell',
    population: 7375,
    coordinates: { lat: 40.8642, lng: -74.2582 },
  },
] as const

// Type definitions
export type ServiceSlug = (typeof ESSEX_SERVICES)[number]['slug']
export type CitySlug = (typeof ESSEX_CITIES)[number]['slug']

// Helper functions
export function getServiceBySlug(slug: string) {
  return ESSEX_SERVICES.find((service) => service.slug === slug)
}

export function getCityBySlug(slug: string) {
  return ESSEX_CITIES.find((city) => city.slug === slug)
}

export function isValidServiceSlug(slug: string): slug is ServiceSlug {
  return ESSEX_SERVICES.some((service) => service.slug === slug)
}

export function isValidCitySlug(slug: string): slug is CitySlug {
  return ESSEX_CITIES.some((city) => city.slug === slug)
}

// Generate all valid combinations for static params
export function generateAllCombinations() {
  const combinations: { city: string; service: string }[] = []

  for (const city of ESSEX_CITIES) {
    for (const service of ESSEX_SERVICES) {
      combinations.push({
        city: city.slug,
        service: service.slug,
      })
    }
  }

  return combinations
}

// Service-specific content generation with city customization
export function getServiceContent(serviceSlug: ServiceSlug, cityName: string) {
  // City-specific features
  const cityFeatures: Record<string, string> = {
    Newark: 'convenient access from Newark Penn Station and Newark Airport',
    Orange: 'central location with easy access to major highways',
    'East Orange': 'proximity to Newark and NYC transportation hubs',
    Irvington: 'affordable service options for all residents',
    Montclair: 'premium service for discerning travelers',
    'West Orange': 'scenic routes through Essex County',
    Maplewood: 'family-friendly service with experienced drivers',
    'South Orange': 'direct access to NJ Transit connections',
    Millburn: 'luxury travel options for Short Hills area',
    Caldwell: 'personalized service for North Essex residents',
    'Cedar Grove': 'reliable transportation throughout the Caldwells',
    Bloomfield: 'quick access to Garden State Parkway',
    Livingston: 'corporate travel solutions for business district',
    Verona: 'boutique service for Verona Park area',
    Nutley: 'convenient pickup from residential neighborhoods',
    Belleville: 'bilingual service options available',
    'Glen Ridge': 'exclusive service for Glen Ridge community',
    'West Caldwell': 'premium service for West Essex',
    'Essex Fells': 'private car service for Essex Fells estates',
    Roseland: 'corporate shuttles for Roseland business parks',
    Fairfield: 'industrial area pickup and delivery',
    'North Caldwell': 'luxury transportation services',
  }

  const cityFeature = cityFeatures[cityName] || 'professional service throughout Essex County'

  const contentMap: Record<ServiceSlug, any> = {
    'group-travel': {
      benefits: [
        'Dedicated group coordinator for your entire trip',
        'Special group rates and discounts',
        'Customized itineraries for your organization',
        'Complimentary packages for group leaders',
        '24/7 support during your travel',
        `Special feature: ${cityFeature}`,
      ],
      ideal_for: [
        'Schools',
        'Churches',
        'Sports Teams',
        'Corporate Groups',
        'Social Organizations',
      ],
      citySpecific: {
        description: `Our group travel services in ${cityName} offer ${cityFeature}. We specialize in coordinating travel for ${cityName}'s schools, religious organizations, and community groups.`,
        localHighlight: `Serving ${cityName} since 2010 with dedicated local coordinators who understand the unique needs of our community.`,
      },
    },
    'airport-transfers': {
      benefits: [
        'On-time pickup guarantee',
        'Flight tracking for accurate timing',
        'Meet & greet service available',
        'Luggage assistance included',
        'Child seats available on request',
        `Special feature: ${cityFeature}`,
      ],
      ideal_for: [
        'Business Travelers',
        'Families',
        'Tourists',
        'Group Travel',
        'Special Occasions',
      ],
      citySpecific: {
        description: `Professional airport transfer service from ${cityName} to Newark Airport (EWR), JFK, LGA, and Philadelphia airports. We offer ${cityFeature}.`,
        localHighlight: `Most ${cityName} residents choose us for our punctual service and knowledge of the fastest routes from your neighborhood to all major airports.`,
      },
    },
    'corporate-travel': {
      benefits: [
        'Dedicated corporate account manager',
        'Streamlined expense reporting',
        'Negotiated corporate rates',
        'VIP lounge access',
        'Flexible booking and cancellation',
        `Special feature: ${cityFeature}`,
      ],
      ideal_for: [
        'Executives',
        'Sales Teams',
        'Conference Attendees',
        'Business Meetings',
        'Corporate Events',
      ],
      citySpecific: {
        description: `Comprehensive corporate travel management for ${cityName} businesses. We provide ${cityFeature} and understand the unique needs of local companies.`,
        localHighlight: `Trusted by ${cityName}'s leading businesses for reliable, professional corporate travel services with dedicated account management.`,
      },
    },
    'cruise-transfers': {
      benefits: [
        'Direct service to all major cruise ports',
        'Luggage handling included',
        'Guaranteed on-time arrival',
        'Group coordination for families',
        'Return trip scheduling assistance',
        `Special feature: ${cityFeature}`,
      ],
      ideal_for: [
        'Cruise Passengers',
        'Family Groups',
        'Senior Travelers',
        'First-time Cruisers',
        'Luxury Travelers',
      ],
      citySpecific: {
        description: `Direct cruise port transfers from ${cityName} to Manhattan, Brooklyn, and Cape Liberty terminals. We offer ${cityFeature} for a stress-free start to your cruise.`,
        localHighlight: `${cityName} residents love our door-to-door cruise transfer service with guaranteed on-time arrival at all major cruise terminals.`,
      },
    },
    'wedding-transportation': {
      benefits: [
        'Luxury vehicle selection',
        'Red carpet service',
        'Complimentary champagne',
        'Decorated vehicles available',
        'Multiple pickup coordination',
        `Special feature: ${cityFeature}`,
      ],
      ideal_for: [
        'Bridal Parties',
        'Wedding Guests',
        'Bachelor/Bachelorette Parties',
        'Rehearsal Dinners',
        'Anniversary Celebrations',
      ],
      citySpecific: {
        description: `Elegant wedding transportation services for ${cityName} couples and their guests. We provide ${cityFeature} and work with all local venues.`,
        localHighlight: `Preferred by ${cityName}'s premier wedding venues for our professional service and beautiful vehicle selection.`,
      },
    },
    'special-events': {
      benefits: [
        'VIP treatment for your special day',
        'Flexible scheduling options',
        'Group coordination services',
        'Safe return transportation',
        'Special occasion packages',
        `Special feature: ${cityFeature}`,
      ],
      ideal_for: [
        'Concert Goers',
        'Sports Fans',
        'Prom Groups',
        'Birthday Parties',
        'Corporate Events',
      ],
      citySpecific: {
        description: `Premium transportation for special events from ${cityName} to venues throughout the tri-state area. We offer ${cityFeature}.`,
        localHighlight: `${cityName}'s favorite choice for concerts at Prudential Center, games at MetLife Stadium, and Broadway shows in NYC.`,
      },
    },
    'wine-tours-day-trips': {
      benefits: [
        'Knowledgeable tour guides',
        'Curated winery selection',
        'Lunch arrangements included',
        'Safe designated driver',
        'Customizable itineraries',
        `Special feature: ${cityFeature}`,
      ],
      ideal_for: [
        'Wine Enthusiasts',
        'Couples',
        'Friend Groups',
        'Corporate Outings',
        'Special Celebrations',
      ],
      citySpecific: {
        description: `Relaxing wine tours and day trips from ${cityName} to New Jersey's finest wineries and attractions. We provide ${cityFeature}.`,
        localHighlight: `Popular with ${cityName} residents for weekend wine tours to NJ vineyards and day trips to Atlantic City, NYC attractions, and the Jersey Shore.`,
      },
    },
    'medical-appointments': {
      benefits: [
        'Wheelchair accessible vehicles',
        'Trained medical transport staff',
        'Door-to-door service',
        'Appointment scheduling assistance',
        'Insurance billing available',
        `Special feature: ${cityFeature}`,
      ],
      ideal_for: [
        'Senior Citizens',
        'Patients',
        'Medical Facilities',
        'Rehabilitation Centers',
        'Assisted Living',
      ],
      citySpecific: {
        description: `Reliable medical transportation for ${cityName} residents to local hospitals and specialists. We offer ${cityFeature}.`,
        localHighlight: `Trusted by ${cityName}'s healthcare providers and senior communities for safe, comfortable medical transportation.`,
      },
    },
    'school-transportation': {
      benefits: [
        'Certified and vetted drivers',
        'Safety-first approach',
        'GPS tracking for parents',
        'Flexible scheduling',
        'Special needs accommodation',
        `Special feature: ${cityFeature}`,
      ],
      ideal_for: [
        'Schools',
        'Day Care Centers',
        'Summer Camps',
        'After-school Programs',
        'Sports Teams',
      ],
      citySpecific: {
        description: `Safe and reliable school transportation services for ${cityName}'s educational institutions. We provide ${cityFeature}.`,
        localHighlight: `Partnering with ${cityName} schools for field trips, sports events, and daily transportation with our certified, background-checked drivers.`,
      },
    },
  }

  return contentMap[serviceSlug] || {}
}
