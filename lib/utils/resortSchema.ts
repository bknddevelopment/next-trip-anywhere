/**
 * Resort Schema Generator for SEO
 *
 * Generates comprehensive structured data for all-inclusive resort pages
 * including TravelAgency, FAQPage, ItemList, and BreadcrumbList schemas.
 */

import { Resort } from '@/lib/data/all-inclusive-resorts'

interface SchemaConfig {
  resorts: Resort[]
  pageTitle: string
  pageDescription: string
  pageUrl: string
  faqs: Array<{ question: string; answer: string }>
  breadcrumbs: Array<{ name: string; url: string }>
}

/**
 * Generate complete schema graph for resort page
 */
export function generateResortSchemaGraph(config: SchemaConfig) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateTravelAgencySchema(config),
      generateFAQSchema(config.faqs),
      generateBreadcrumbSchema(config.breadcrumbs),
      generateItemListSchema(config.resorts, config.pageUrl),
      generateServiceSchema(config),
    ],
  }
}

/**
 * Generate TravelAgency schema
 */
function generateTravelAgencySchema(config: SchemaConfig) {
  return {
    '@type': 'TravelAgency',
    '@id': 'https://nexttripanywhere.com/#organization',
    name: 'Next Trip Anywhere',
    url: 'https://nexttripanywhere.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nexttripanywhere.com/images/logo.svg',
      width: '250',
      height: '60',
    },
    image: 'https://nexttripanywhere.com/images/hero-beach.jpg',
    description:
      "Essex County's premier travel agency specializing in all-inclusive resorts from Newark Airport",
    telephone: '+1-833-874-1019',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Newark',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'New Jersey',
        '@id': 'https://en.wikipedia.org/wiki/New_Jersey',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Essex County',
        '@id': 'https://en.wikipedia.org/wiki/Essex_County,_New_Jersey',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'All-Inclusive Resort Packages',
      itemListElement: config.resorts.slice(0, 10).map((resort, index) => ({
        '@type': 'Offer',
        position: index + 1,
        name: `${resort.name} - ${resort.destination}`,
        description: resort.description,
        priceRange: `$${resort.priceRange.min}-$${resort.priceRange.max}`,
        category: resort.category,
        itemOffered: {
          '@type': 'TouristTrip',
          name: resort.name,
          description: resort.description,
          touristType: resort.category === 'adults-only' ? 'Adults Only' : 'All Ages',
          includesAccommodation: true,
          includesMeals: true,
        },
      })),
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'All-Inclusive Resort Booking',
          description:
            'Complete vacation packages including flights from Newark, accommodations, meals, and activities',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Group Travel Planning',
          description:
            'Specialized planning for family reunions, destination weddings, and corporate retreats',
        },
      },
    ],
    knowsAbout: [
      'All-Inclusive Resorts',
      'Caribbean Vacations',
      'Mexico Resorts',
      'Family Travel',
      'Adults-Only Resorts',
      'Luxury Travel',
      'Newark Airport Departures',
    ],
    slogan: 'Your Essex County gateway to paradise',
    priceRange: '$$$',
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
    review: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '287',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

/**
 * Generate FAQ schema
 */
function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
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
 * Generate Breadcrumb schema
 */
function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

/**
 * Generate ItemList schema for resorts
 */
function generateItemListSchema(resorts: Resort[], pageUrl: string) {
  return {
    '@type': 'ItemList',
    url: pageUrl,
    name: 'All-Inclusive Resorts from Newark',
    description: '100+ carefully selected all-inclusive resorts accessible from Newark Airport',
    numberOfItems: resorts.length,
    itemListElement: resorts.map((resort, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Hotel',
        name: resort.name,
        description: resort.description,
        address: {
          '@type': 'PostalAddress',
          addressCountry: resort.destination,
          addressLocality: resort.location,
        },
        starRating: {
          '@type': 'Rating',
          ratingValue: resort.rating.toString(),
          bestRating: '5',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: resort.reviewScore.toString(),
          reviewCount: resort.reviewCount.toString(),
          bestRating: '10',
        },
        amenityFeature: resort.amenities.slice(0, 5).map((amenity) => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity,
          value: true,
        })),
        priceRange: `$${resort.priceRange.min}-$${resort.priceRange.max} per person (7 nights)`,
        makesOffer: {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: resort.priceRange.min,
            maxPrice: resort.priceRange.max,
            priceCurrency: 'USD',
            unitText: 'per person for 7 nights',
          },
        },
      },
    })),
  }
}

/**
 * Generate Service schema
 */
function generateServiceSchema(config: SchemaConfig) {
  return {
    '@type': 'Service',
    serviceType: 'All-Inclusive Resort Booking',
    provider: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
      telephone: '+1-833-874-1019',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Essex County, New Jersey',
    },
    description: config.pageDescription,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: Math.min(...config.resorts.map((r) => r.priceRange.min)),
      highPrice: Math.max(...config.resorts.map((r) => r.priceRange.max)),
      priceCurrency: 'USD',
      offerCount: config.resorts.length,
      availability: 'https://schema.org/InStock',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Resort Categories',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Adults-Only Resorts',
          description: 'Romantic getaways for couples',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Family Resorts',
          description: 'Resorts with kids clubs and family activities',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Luxury Resorts',
          description: '5-star properties with premium amenities',
        },
      ],
    },
  }
}

/**
 * Generate Resort Product schema for individual resort
 */
export function generateResortProductSchema(resort: Resort, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: resort.name,
    description: resort.description,
    image: `${baseUrl}/images/resorts/${resort.id}.jpg`,
    brand: {
      '@type': 'Brand',
      name: resort.brand || resort.name,
    },
    category: resort.category,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: resort.reviewScore,
      reviewCount: resort.reviewCount,
      bestRating: '10',
      worstRating: '1',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: resort.priceRange.min,
      highPrice: resort.priceRange.max,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'TravelAgency',
        name: 'Next Trip Anywhere',
        telephone: '+1-833-874-1019',
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Flight Time from Newark',
        value: `${resort.flightTime} hours`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Number of Restaurants',
        value: resort.restaurants,
      },
      {
        '@type': 'PropertyValue',
        name: 'Number of Bars',
        value: resort.bars,
      },
      {
        '@type': 'PropertyValue',
        name: 'Beachfront',
        value: resort.beachfront ? 'Yes' : 'No',
      },
    ],
  }
}

/**
 * Generate WebPage schema for resort listing page
 */
export function generateWebPageSchema(config: {
  title: string
  description: string
  url: string
  dateModified: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.title,
    description: config.description,
    url: config.url,
    inLanguage: 'en-US',
    datePublished: '2025-01-26',
    dateModified: config.dateModified,
    author: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nexttripanywhere.com/images/logo.svg',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'All-Inclusive Resorts Database',
      description: 'Comprehensive database of 100+ all-inclusive resorts',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-content', '.resort-intro', '.faq-section'],
    },
  }
}

/**
 * Generate HowTo schema for booking process
 */
export function generateHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Book an All-Inclusive Resort from Newark',
    description:
      'Step-by-step guide to booking your perfect all-inclusive vacation from Newark Airport',
    totalTime: 'PT30M',
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Travel dates',
      },
      {
        '@type': 'HowToSupply',
        name: 'Passport (for international travel)',
      },
      {
        '@type': 'HowToSupply',
        name: 'Credit card for booking',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Choose Your Destination',
        text: 'Select from Caribbean, Mexico, or Central America based on your preferences and budget',
        url: 'https://nexttripanywhere.com/all-inclusive-resorts-from-newark#destinations',
      },
      {
        '@type': 'HowToStep',
        name: 'Select Your Resort',
        text: 'Filter by category (adults-only, family, luxury), amenities, and price range',
        url: 'https://nexttripanywhere.com/all-inclusive-resorts-from-newark#resorts',
      },
      {
        '@type': 'HowToStep',
        name: 'Check Availability',
        text: 'Contact our Essex County office at 833-874-1019 for real-time availability and pricing',
        url: 'https://nexttripanywhere.com/contact',
      },
      {
        '@type': 'HowToStep',
        name: 'Book Your Package',
        text: 'Secure your reservation with a deposit and receive confirmation within 24 hours',
        url: 'https://nexttripanywhere.com/book',
      },
      {
        '@type': 'HowToStep',
        name: 'Prepare for Travel',
        text: 'Review travel documents, pack according to resort dress codes, and arrange Newark Airport parking',
        url: 'https://nexttripanywhere.com/travel-tips',
      },
    ],
  }
}
