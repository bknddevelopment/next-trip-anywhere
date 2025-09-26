import { SeasonalDeal } from '@/lib/data/seasonal-deals'

export function generateSeasonalSchema(deal: SeasonalDeal) {
  const baseUrl = 'https://nexttripanywhere.com'

  // Create the schema graph
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Travel Agency Organization
      {
        '@type': 'TravelAgency',
        '@id': `${baseUrl}/#organization`,
        name: 'Next Trip Anywhere',
        url: baseUrl,
        logo: `${baseUrl}/images/logo.png`,
        telephone: '833-874-1019',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          addressCountry: 'US'
        },
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 40.735657,
            longitude: -74.172367
          },
          geoRadius: '50000'
        }
      },

      // 2. Special Offer Schema
      {
        '@type': 'SpecialAnnouncement',
        '@id': `${baseUrl}/deals/seasonal/${deal.slug}/#offer`,
        name: deal.title,
        text: deal.metaDescription,
        datePosted: deal.lastUpdated,
        expires: deal.validThrough,
        category: 'https://www.wikidata.org/wiki/Q7805',
        announcementLocation: {
          '@type': 'CivicStructure',
          name: 'Cape Liberty Cruise Port',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '14 Port Terminal Blvd',
            addressLocality: 'Bayonne',
            addressRegion: 'NJ',
            postalCode: '07002'
          }
        },
        provider: {
          '@id': `${baseUrl}/#organization`
        }
      },

      // 3. Offer Schema with Time Validity
      {
        '@type': 'Offer',
        '@id': `${baseUrl}/deals/seasonal/${deal.slug}/#seasonal-offer`,
        name: deal.title,
        description: deal.content.description.substring(0, 500),
        url: `${baseUrl}/deals/seasonal/${deal.slug}`,
        priceCurrency: 'USD',
        priceValidFrom: deal.validFrom,
        priceValidUntil: deal.validThrough,
        availability: 'https://schema.org/LimitedAvailability',
        validFrom: deal.validFrom,
        validThrough: deal.validThrough,
        seller: {
          '@id': `${baseUrl}/#organization`
        },
        // Add lowest price from cruise lines
        lowPrice: Math.min(...deal.content.cruiseLines.map(line => line.startingPrice)),
        highPrice: Math.max(...deal.content.cruiseLines.map(line => line.startingPrice)) * 2,
        // Add aggregate offers for each cruise line
        offers: deal.content.cruiseLines.map(line => ({
          '@type': 'Offer',
          name: `${line.name} ${deal.holidayType ? deal.holidayType.replace(/-/g, ' ') : deal.season} Cruise`,
          price: line.startingPrice,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: line.name
          }
        }))
      },

      // 4. Event Schema for Holiday/Seasonal Events
      ...(deal.holidayType ? [{
        '@type': 'Event',
        '@id': `${baseUrl}/deals/seasonal/${deal.slug}/#event`,
        name: `${deal.holidayType.split('-').map(w =>
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ')} Cruise ${new Date(deal.validFrom).getFullYear()}`,
        description: deal.metaDescription,
        startDate: deal.validFrom,
        endDate: deal.validThrough,
        location: {
          '@type': 'Place',
          name: 'Cape Liberty Cruise Port',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '14 Port Terminal Blvd',
            addressLocality: 'Bayonne',
            addressRegion: 'NJ',
            postalCode: '07002'
          }
        },
        organizer: {
          '@id': `${baseUrl}/#organization`
        },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: Math.min(...deal.content.cruiseLines.map(line => line.startingPrice)),
          highPrice: Math.max(...deal.content.cruiseLines.map(line => line.startingPrice)) * 2,
          priceCurrency: 'USD',
          availability: 'https://schema.org/LimitedAvailability',
          validFrom: deal.validFrom,
          validThrough: deal.bookingDeadline || deal.validThrough,
          url: `${baseUrl}/deals/seasonal/${deal.slug}`
        },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
      }] : []),

      // 5. FAQ Schema
      ...(deal.faq && deal.faq.length > 0 ? [{
        '@type': 'FAQPage',
        '@id': `${baseUrl}/deals/seasonal/${deal.slug}/#faq`,
        mainEntity: deal.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }] : []),

      // 6. BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/deals/seasonal/${deal.slug}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Deals',
            item: `${baseUrl}/deals`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Seasonal Deals',
            item: `${baseUrl}/deals/seasonal`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: deal.title,
            item: `${baseUrl}/deals/seasonal/${deal.slug}`
          }
        ]
      },

      // 7. Product Schema for Pricing Tiers
      ...(deal.pricingTiers ? deal.pricingTiers.map((tier, index) => ({
        '@type': 'Product',
        '@id': `${baseUrl}/deals/seasonal/${deal.slug}/#product-${index}`,
        name: `${tier.category} - ${deal.title}`,
        description: tier.features.join('. '),
        offers: {
          '@type': 'Offer',
          price: tier.startingPrice,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: deal.validFrom,
          validThrough: deal.validThrough,
          seller: {
            '@id': `${baseUrl}/#organization`
          }
        }
      })) : []),

      // 8. Service Schema
      {
        '@type': 'Service',
        '@id': `${baseUrl}/deals/seasonal/${deal.slug}/#service`,
        name: deal.title,
        description: deal.content.description.substring(0, 300),
        provider: {
          '@id': `${baseUrl}/#organization`
        },
        serviceType: 'Cruise Vacation',
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 40.735657,
            longitude: -74.172367
          },
          geoRadius: '50000'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${deal.season.charAt(0).toUpperCase() + deal.season.slice(1)} Cruise Deals`,
          itemListElement: deal.content.cruiseLines.map(line => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: `${line.name} Cruise`,
              provider: {
                '@type': 'Organization',
                name: line.name
              }
            },
            price: line.startingPrice,
            priceCurrency: 'USD'
          }))
        }
      }
    ]
  }

  return schemaGraph
}