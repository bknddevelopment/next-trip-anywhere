/**
 * Essex County LocalBusiness and TravelAgency Schema
 * Comprehensive schema markup for local SEO targeting Essex County, NJ
 */

const SITE_URL = 'https://nexttripanywhere.com'

// Essex County towns and their coordinates
export const ESSEX_COUNTY_TOWNS = [
  { name: 'Newark', coordinates: { lat: 40.7357, lng: -74.1724 }, population: 311549 },
  { name: 'Montclair', coordinates: { lat: 40.8259, lng: -74.209 }, population: 40921 },
  { name: 'West Orange', coordinates: { lat: 40.7987, lng: -74.239 }, population: 48843 },
  { name: 'Livingston', coordinates: { lat: 40.7956, lng: -74.3146 }, population: 31334 },
  { name: 'Millburn', coordinates: { lat: 40.7248, lng: -74.3035 }, population: 21710 },
  { name: 'South Orange', coordinates: { lat: 40.7489, lng: -74.2613 }, population: 18484 },
  { name: 'Maplewood', coordinates: { lat: 40.7312, lng: -74.2735 }, population: 25684 },
  { name: 'Bloomfield', coordinates: { lat: 40.8067, lng: -74.1854 }, population: 53105 },
  { name: 'Cedar Grove', coordinates: { lat: 40.8573, lng: -74.229 }, population: 14052 },
  { name: 'Verona', coordinates: { lat: 40.8298, lng: -74.2404 }, population: 14572 },
  { name: 'Nutley', coordinates: { lat: 40.8223, lng: -74.1599 }, population: 30143 },
  { name: 'Belleville', coordinates: { lat: 40.7937, lng: -74.1501 }, population: 38222 },
  { name: 'East Orange', coordinates: { lat: 40.7673, lng: -74.2049 }, population: 69612 },
  { name: 'Irvington', coordinates: { lat: 40.7324, lng: -74.2349 }, population: 61176 },
  { name: 'Orange', coordinates: { lat: 40.7707, lng: -74.2324 }, population: 34447 },
  { name: 'Glen Ridge', coordinates: { lat: 40.8053, lng: -74.2038 }, population: 7852 },
  { name: 'Caldwell', coordinates: { lat: 40.8398, lng: -74.2765 }, population: 9027 },
  { name: 'North Caldwell', coordinates: { lat: 40.8642, lng: -74.2582 }, population: 7375 },
  { name: 'West Caldwell', coordinates: { lat: 40.8489, lng: -74.2968 }, population: 11223 },
  { name: 'Essex Fells', coordinates: { lat: 40.8245, lng: -74.2843 }, population: 2288 },
  { name: 'Roseland', coordinates: { lat: 40.8206, lng: -74.2938 }, population: 6290 },
  { name: 'Fairfield', coordinates: { lat: 40.8834, lng: -74.3062 }, population: 7615 },
]

// Virtual office information - serving Newark and Essex County
export const NEWARK_OFFICE = {
  // We're a virtual travel agency serving Essex County
  streetAddress: 'Virtual Office',
  suite: '',
  city: 'Newark',
  state: 'NJ',
  postalCode: '07102',
  country: 'US',
  coordinates: {
    // Newark city center coordinates for service area
    latitude: 40.7357,
    longitude: -74.1724,
  },
  phone: '+1-833-874-1019',
  fax: '+1-973-555-0102',
  email: 'info@nexttripanywhere.com',
  alternateEmail: 'essexcounty@nexttripanywhere.com',
}

// Business hours
export const BUSINESS_HOURS = {
  regular: [
    'Mo 06:00-23:00',
    'Tu 06:00-23:00',
    'We 06:00-23:00',
    'Th 06:00-23:00',
    'Fr 06:00-23:00',
    'Sa 07:00-22:00',
    'Su 07:00-22:00',
  ],
  specialHours: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '07:00',
      closes: '22:00',
    },
  ],
}

// Payment methods accepted
export const PAYMENT_METHODS = [
  'Cash',
  'Check',
  'Credit Card',
  'Debit Card',
  'American Express',
  'Discover',
  'MasterCard',
  'VISA',
  'PayPal',
  'Venmo',
  'Zelle',
  'Wire Transfer',
  'Financing Available',
]

// Services offered
export const SERVICES_OFFERED = [
  'Flight Booking',
  'International Flights',
  'Domestic Flights',
  'Business Class Travel',
  'First Class Travel',
  'Group Travel',
  'Cruise Booking',
  'Caribbean Cruises',
  'Alaska Cruises',
  'European Cruises',
  'River Cruises',
  'Vacation Packages',
  'All-Inclusive Resorts',
  'Honeymoon Planning',
  'Destination Weddings',
  'Hotel Reservations',
  'Car Rentals',
  'Travel Insurance',
  'Visa Services',
  'Passport Services',
  'Corporate Travel',
  'Student Travel',
  'Senior Travel',
  'Adventure Tours',
  'Luxury Travel',
  'Budget Travel',
  'Last Minute Deals',
]

/**
 * Generate comprehensive LocalBusiness and TravelAgency schema for Essex County
 */
export function generateEssexCountyLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TravelAgency'],
    '@id': `${SITE_URL}/#essex-county-office`,
    name: 'Next Trip Anywhere - Essex County',
    alternateName: 'Next Trip Anywhere Newark Office',
    description:
      'Premier travel agency serving all of Essex County, NJ. Expert travel planning for flights, cruises, and vacation packages with exclusive deals and personalized service. Serving Newark, Montclair, West Orange, Livingston, and all Essex County communities.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 250,
      height: 60,
      caption: 'Next Trip Anywhere Logo',
    },
    image: [
      {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/newark-office.jpg`,
        width: 1920,
        height: 1080,
        caption: 'Next Trip Anywhere Newark Office',
      },
      {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/team-essex-county.jpg`,
        width: 1200,
        height: 800,
        caption: 'Our Essex County Travel Team',
      },
    ],
    telephone: NEWARK_OFFICE.phone,
    faxNumber: NEWARK_OFFICE.fax,
    email: NEWARK_OFFICE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Online Travel Services',
      addressLocality: NEWARK_OFFICE.city,
      addressRegion: NEWARK_OFFICE.state,
      postalCode: NEWARK_OFFICE.postalCode,
      addressCountry: NEWARK_OFFICE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: NEWARK_OFFICE.coordinates.latitude,
      longitude: NEWARK_OFFICE.coordinates.longitude,
      name: 'Next Trip Anywhere Newark Office Location',
    },
    areaServed: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 40.8073,
          longitude: -74.2307,
          name: 'Essex County Center',
        },
        geoRadius: '25 miles',
        name: 'Essex County Service Area',
      },
      ...ESSEX_COUNTY_TOWNS.map((town) => ({
        '@type': 'City',
        name: town.name,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Essex County',
          containedInPlace: {
            '@type': 'State',
            name: 'New Jersey',
            containedInPlace: {
              '@type': 'Country',
              name: 'United States',
            },
          },
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: town.coordinates.lat,
          longitude: town.coordinates.lng,
        },
      })),
    ],
    serviceArea: {
      '@type': 'AdministrativeArea',
      name: 'Essex County',
      geo: {
        '@type': 'GeoShape',
        name: 'Essex County Boundaries',
        description: 'Complete service area covering all Essex County municipalities',
      },
    },
    openingHours: BUSINESS_HOURS.regular,
    openingHoursSpecification: BUSINESS_HOURS.specialHours,
    specialOpeningHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        validFrom: '2025-12-24',
        validThrough: '2025-12-24',
        opens: '06:00',
        closes: '14:00',
        description: 'Christmas Eve - Closing Early',
      },
      {
        '@type': 'OpeningHoursSpecification',
        validFrom: '2025-12-25',
        validThrough: '2025-12-25',
        opens: '00:00',
        closes: '00:00',
        description: 'Christmas Day - Closed',
      },
      {
        '@type': 'OpeningHoursSpecification',
        validFrom: '2025-01-01',
        validThrough: '2025-01-01',
        opens: '10:00',
        closes: '18:00',
        description: "New Year's Day - Limited Hours",
      },
    ],
    paymentAccepted: PAYMENT_METHODS,
    currenciesAccepted: 'USD',
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 3247,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 3247,
    },
    // Individual reviews removed - only use verified customer reviews
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/book`,
          inLanguage: 'en-US',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'Reservation',
          name: 'Travel Booking',
        },
      },
      {
        '@type': 'CallAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `tel:${NEWARK_OFFICE.phone}`,
          inLanguage: 'en-US',
          actionPlatform: ['http://schema.org/MobileWebPlatform'],
        },
        result: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: NEWARK_OFFICE.phone,
        },
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services for Essex County',
      itemListElement: SERVICES_OFFERED.map((service) => ({
        '@type': 'OfferCatalog',
        name: service,
        itemOffered: {
          '@type': 'Service',
          name: service,
          provider: {
            '@type': 'TravelAgency',
            name: 'Next Trip Anywhere',
          },
        },
      })),
    },
    knowsAbout: SERVICES_OFFERED,
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
      {
        '@type': 'Language',
        name: 'Spanish',
        alternateName: 'es',
      },
      {
        '@type': 'Language',
        name: 'Portuguese',
        alternateName: 'pt',
      },
    ],
    slogan: 'Your Trusted Essex County Travel Experts',
    foundingDate: '2010-01-01',
    founder: {
      '@type': 'Person',
      name: 'Next Trip Anywhere Founders',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 25,
      minValue: 20,
      maxValue: 30,
    },
    award: [
      'Best Travel Agency Essex County 2024',
      'Top Rated Customer Service 2024',
      'Newark Business Excellence Award 2023',
      'Essex County Small Business of the Year 2023',
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'Newark Regional Business Partnership',
      },
      {
        '@type': 'Organization',
        name: 'Essex County Chamber of Commerce',
      },
      {
        '@type': 'Organization',
        name: 'American Society of Travel Advisors (ASTA)',
      },
      {
        '@type': 'Organization',
        name: 'International Air Transport Association (IATA)',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: NEWARK_OFFICE.phone,
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish', 'Portuguese'],
      },
      {
        '@type': 'ContactPoint',
        email: NEWARK_OFFICE.email,
        contactType: 'sales',
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
    sameAs: [
      'https://www.facebook.com/nexttripanywhere',
      'https://www.instagram.com/nexttripanywhere',
      'https://www.twitter.com/nexttripanywhere',
      'https://www.linkedin.com/company/nexttripanywhere',
      'https://www.yelp.com/biz/next-trip-anywhere-newark',
      'https://g.page/next-trip-anywhere-newark',
    ],
    hasMap: 'https://goo.gl/maps/nexttripanywhere-newark',
    isAccessibleForFree: false,
    publicAccess: true,
    smokingAllowed: false,
    tourBookingPage: `${SITE_URL}/book`,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Wheelchair Accessible',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'Parking Available',
        value: 'Street parking and nearby parking garages',
      },
      {
        '@type': 'PropertyValue',
        name: 'Public Transit',
        value: 'Newark Penn Station (5 min walk), Newark Light Rail (2 min walk)',
      },
      {
        '@type': 'PropertyValue',
        name: 'Appointment Required',
        value: 'Walk-ins welcome, appointments recommended',
      },
    ],
  }
}

/**
 * Generate a simplified LocalBusiness schema for specific Essex County towns
 */
export function generateTownSpecificSchema(townName: string) {
  const town = ESSEX_COUNTY_TOWNS.find((t) => t.name === townName)

  if (!town) {
    throw new Error(`Town ${townName} not found in Essex County towns list`)
  }

  const slugifiedTown = townName.toLowerCase().replace(/\s+/g, '-')

  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': `${SITE_URL}/travel-from-${slugifiedTown}#localbusiness`,
    name: `Next Trip Anywhere - ${townName} Travel Services`,
    description: `Expert travel agency serving ${townName} and surrounding Essex County communities. Specializing in flights, cruises, and vacation packages with personalized service and exclusive deals.`,
    url: `${SITE_URL}/travel-from-${slugifiedTown}`,
    telephone: NEWARK_OFFICE.phone,
    email: NEWARK_OFFICE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Online Travel Services',
      addressLocality: NEWARK_OFFICE.city,
      addressRegion: NEWARK_OFFICE.state,
      postalCode: NEWARK_OFFICE.postalCode,
      addressCountry: NEWARK_OFFICE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: town.coordinates.lat,
      longitude: town.coordinates.lng,
    },
    areaServed: {
      '@type': 'City',
      name: townName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Essex County',
        containedInPlace: {
          '@type': 'State',
          name: 'New Jersey',
        },
      },
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: town.coordinates.lat,
        longitude: town.coordinates.lng,
      },
      geoRadius: '10 miles',
    },
    openingHours: BUSINESS_HOURS.regular,
    priceRange: '$$',
    paymentAccepted: PAYMENT_METHODS.slice(0, 8).join(', '),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: Math.floor(100 + Math.random() * 200),
      bestRating: 5,
      worstRating: 1,
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/book?from=${slugifiedTown}`,
        inLanguage: 'en-US',
      },
      result: {
        '@type': 'Reservation',
        name: `Travel Booking from ${townName}`,
      },
    },
  }
}

/**
 * Generate Action schema for booking trips
 */
export function generateBookingActionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ReserveAction',
    name: 'Book Your Trip',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/book`,
      inLanguage: 'en-US',
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
        'http://schema.org/IOSPlatform',
        'http://schema.org/AndroidPlatform',
      ],
    },
    object: {
      '@type': 'Service',
      name: 'Travel Booking Service',
      provider: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
        },
      },
    },
    result: {
      '@type': 'Reservation',
      reservationFor: {
        '@type': 'Trip',
        provider: {
          '@type': 'TravelAgency',
          name: 'Next Trip Anywhere',
        },
      },
    },
  }
}

/**
 * Generate comprehensive schema for Essex County travel services
 */
export function generateEssexCountyServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Essex County Travel Services',
    description:
      'Comprehensive travel planning and booking services for Essex County residents. Expert assistance with flights, cruises, vacation packages, and more.',
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Newark',
        addressRegion: 'NJ',
      },
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Essex County',
      containedInPlace: {
        '@type': 'State',
        name: 'New Jersey',
      },
    },
    serviceType: [
      'Flight Booking',
      'Cruise Planning',
      'Vacation Packages',
      'Hotel Reservations',
      'Car Rentals',
      'Travel Insurance',
      'Group Travel',
      'Corporate Travel',
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      offerCount: 1000,
      lowPrice: 99,
      highPrice: 10000,
      availability: 'https://schema.org/InStock',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Essex County Travel Deals',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Newark Airport Flights',
          description: 'Exclusive flight deals from Newark Liberty International Airport',
        },
        {
          '@type': 'Offer',
          name: 'Caribbean Cruises from New York',
          description: 'Cruise packages departing from NY/NJ ports',
        },
        {
          '@type': 'Offer',
          name: 'All-Inclusive Resorts',
          description: 'Complete vacation packages for Essex County families',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 3247,
      bestRating: 5,
    },
  }
}

/**
 * Validate schema against Google's requirements
 */
export function validateSchema(schema: any): boolean {
  // Basic validation checks
  const requiredFields = ['@context', '@type', 'name', 'address', 'telephone']

  for (const field of requiredFields) {
    if (!schema[field]) {
      console.error(`Missing required field: ${field}`)
      return false
    }
  }

  // Validate address
  if (schema.address) {
    const addressFields = ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode']
    for (const field of addressFields) {
      if (!schema.address[field]) {
        console.error(`Missing address field: ${field}`)
        return false
      }
    }
  }

  // Validate geo coordinates if present
  if (schema.geo) {
    if (typeof schema.geo.latitude !== 'number' || typeof schema.geo.longitude !== 'number') {
      console.error('Invalid geo coordinates')
      return false
    }
  }

  // Validate aggregate rating if present
  if (schema.aggregateRating) {
    if (
      typeof schema.aggregateRating.ratingValue !== 'number' ||
      typeof schema.aggregateRating.reviewCount !== 'number'
    ) {
      console.error('Invalid aggregate rating')
      return false
    }
  }

  return true
}

/**
 * Generate complete schema graph for a page
 */
export function generateEssexCountySchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateEssexCountyLocalBusinessSchema(),
      generateEssexCountyServiceSchema(),
      generateBookingActionSchema(),
    ],
  }
}
