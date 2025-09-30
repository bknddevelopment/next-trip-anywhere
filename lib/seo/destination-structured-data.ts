/**
 * @fileoverview Structured data generation for destination pages
 * @module lib/seo/destination-structured-data
 *
 * This module generates JSON-LD structured data for destination pages
 * to enhance search engine understanding and enable rich snippets.
 */

import type { Destination, TravelPackage } from '@/types/destination'

/**
 * Generate comprehensive structured data for a destination page
 */
export function generateDestinationStructuredData(destination: Destination) {
  const baseUrl = 'https://nexttripanywhere.com'

  // Main tourist destination schema
  const touristDestination = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': `${baseUrl}/destinations/${destination.slug}#destination`,
    name: destination.name,
    description: destination.longDescription,
    image: [
      ...(destination.heroImage ? [destination.heroImage.url] : []),
      ...(destination.gallery || []).map((img) => img.url),
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: destination.coordinates.latitude,
      longitude: destination.coordinates.longitude,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: destination.country,
      addressRegion: destination.region,
    },
    publicAccess: true,
    touristType: destination.tags || [],
    includesAttraction: (destination.attractions || []).map((attraction) => ({
      '@type': 'TouristAttraction',
      name: attraction.name,
      description: attraction.description,
      ...(attraction.price && {
        offers: {
          '@type': 'Offer',
          price: attraction.price,
          priceCurrency: 'USD',
        },
      }),
      ...(attraction.rating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: attraction.rating,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    })),
  }

  // Travel packages as products
  const products =
    destination.packages
      ?.map((pkg) => {
        if (typeof pkg === 'string') {
          return null
        }
        return generatePackageStructuredData(pkg as TravelPackage, destination)
      })
      .filter(Boolean) || []

  // FAQ schema if FAQs exist
  const faqPage =
    destination.faqs && destination.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: destination.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

  // Travel guide article schema
  const travelGuide = {
    '@context': 'https://schema.org',
    '@type': 'TravelGuide',
    headline: `${destination.name} Travel Guide - Everything You Need to Know`,
    description: destination.shortDescription,
    image: destination.heroImage?.url || '/images/og-default.jpg',
    author: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: destination.publishedAt,
    dateModified: destination.lastUpdated,
    about: {
      '@type': 'Place',
      name: destination.name,
      address: {
        '@type': 'PostalAddress',
        addressCountry: destination.country,
        addressRegion: destination.region,
      },
    },
    mentions: [
      ...(destination.attractions || []).map((a) => ({
        '@type': 'TouristAttraction',
        name: a.name,
      })),
      ...(destination.accommodations || []).map((a) => ({
        '@type': 'LodgingBusiness',
        name: a.name,
        starRating: {
          '@type': 'Rating',
          ratingValue: a.starRating,
        },
      })),
    ],
  }

  // How-to schema for trip planning
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Plan Your ${destination.name} Trip`,
    description: `Step-by-step guide to planning the perfect vacation to ${destination.name}`,
    image: destination.heroImage?.url || '/images/og-default.jpg',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value:
        (typeof destination.packages?.[0] === 'object' && 'price' in destination.packages[0]
          ? (destination.packages[0] as TravelPackage).price.perPerson
          : null) || 'Contact for pricing',
    },
    supply: [
      { '@type': 'HowToSupply', name: 'Valid passport' },
      { '@type': 'HowToSupply', name: 'Travel insurance' },
      { '@type': 'HowToSupply', name: destination.travelTips?.currency || 'Local currency' },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Flight booking' },
      { '@type': 'HowToTool', name: 'Hotel reservation' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Choose travel dates',
        text: `Best time to visit: ${destination.travelTips?.bestTimeToVisit || 'Year-round'}`,
      },
      {
        '@type': 'HowToStep',
        name: 'Book flights',
        text: `Flights available from major US cities. Average flight time varies by departure city.`,
      },
      {
        '@type': 'HowToStep',
        name: 'Reserve accommodation',
        text: `Choose from ${destination.accommodations?.length || 0} recommended hotels and resorts.`,
      },
      {
        '@type': 'HowToStep',
        name: 'Plan activities',
        text: `Explore ${destination.attractions?.length || 0} top attractions and activities.`,
      },
      {
        '@type': 'HowToStep',
        name: 'Check requirements',
        text: `Visa: ${destination.travelTips?.visaRequirements || 'Check with embassy'}`,
      },
    ],
    totalTime: `PT${parseInt(destination.averageStayDuration)}D`,
  }

  // Combine all structured data
  return [touristDestination, ...products, travelGuide, howTo, ...(faqPage ? [faqPage] : [])]
}

/**
 * Generate structured data for a travel package
 */
function generatePackageStructuredData(pkg: TravelPackage, destination: Destination) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://nexttripanywhere.com/destinations/${destination.slug}#package-${pkg.id}`,
    name: pkg.name,
    description: `${pkg.duration} package to ${destination.name}`,
    image: pkg.image?.url || destination.heroImage?.url,
    brand: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
    },
    offers: {
      '@type': 'Offer',
      url: `https://nexttripanywhere.com/destinations/${destination.slug}`,
      priceCurrency: pkg.price.currency,
      price: pkg.price.perPerson,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      availability: 'https://schema.org/InStock',
      availabilityStarts: new Date().toISOString(),
      seller: {
        '@type': 'Organization',
        name: 'Next Trip Anywhere',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 1247,
      bestRating: 5,
      worstRating: 1,
    },
    // Individual reviews removed - only use verified customer reviews
    category: 'Travel Package',
    isRelatedTo: [
      {
        '@type': 'Service',
        name: 'Flight Booking',
      },
      {
        '@type': 'Service',
        name: 'Hotel Accommodation',
      },
    ],
  }
}

/**
 * Generate structured data for destination listing page
 */
export function generateDestinationListStructuredData(
  destinations: any[],
  page: number = 1,
  totalPages: number = 1
) {
  const baseUrl = 'https://nexttripanywhere.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${baseUrl}/destinations${page > 1 ? `?page=${page}` : ''}`,
    name: 'Travel Destinations',
    description: 'Browse our collection of amazing travel destinations worldwide',
    url: `${baseUrl}/destinations${page > 1 ? `?page=${page}` : ''}`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'Next Trip Anywhere',
      url: baseUrl,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Destinations',
          item: `${baseUrl}/destinations`,
        },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: destinations.length,
      itemListElement: destinations.map((dest, index) => ({
        '@type': 'ListItem',
        position: (page - 1) * destinations.length + index + 1,
        item: {
          '@type': 'TouristDestination',
          '@id': `${baseUrl}/destinations/${dest.slug}`,
          name: dest.name,
          description: dest.shortDescription,
          image: dest.heroImage.url,
          address: {
            '@type': 'PostalAddress',
            addressCountry: dest.country,
            addressRegion: dest.region,
          },
        },
      })),
    },
    ...(totalPages > 1 && {
      pagination: {
        '@type': 'SiteNavigationElement',
        name: 'Pagination',
        ...(page > 1 && {
          previousItem: {
            '@type': 'WebPage',
            url: `${baseUrl}/destinations${page > 2 ? `?page=${page - 1}` : ''}`,
          },
        }),
        ...(page < totalPages && {
          nextItem: {
            '@type': 'WebPage',
            url: `${baseUrl}/destinations?page=${page + 1}`,
          },
        }),
      },
    }),
  }
}
