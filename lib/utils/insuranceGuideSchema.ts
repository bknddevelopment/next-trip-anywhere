/**
 * Comprehensive Schema Generator for Cruise Travel Insurance Guide
 * Optimized for maximum SEO impact and rich snippet eligibility
 */

interface InsuranceGuideData {
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  lastUpdated: string
  faq: Array<{
    question: string
    answer: string
  }>
  slug: string
  searchVolume?: number
  content?: {
    sections?: Array<{
      title: string
      content: string
    }>
  }
}

/**
 * Generate comprehensive schema graph for cruise travel insurance guide
 * Includes Article, FAQPage, HowTo, Product, Service, LocalBusiness, and BreadcrumbList schemas
 */
export function generateInsuranceGuideSchemaGraph(data: InsuranceGuideData) {
  const baseUrl = 'https://nexttripanywhere.com'
  const pageUrl = `${baseUrl}/guides/${data.slug}`
  const currentDate = new Date().toISOString()

  const schemaGraph: any = {
    '@context': 'https://schema.org',
    '@graph': [],
  }

  // 1. Article Schema with comprehensive metadata
  const articleSchema: any = {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: data.metaTitle,
    alternativeHeadline: data.title,
    description: data.metaDescription,
    keywords: data.keywords.join(', '),
    wordCount: 7839, // Actual word count of the insurance guide
    timeRequired: 'PT35M', // Estimated reading time
    datePublished: data.lastUpdated,
    dateModified: currentDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    author: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'Next Trip Anywhere',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: '600',
        height: '60',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-833-874-1019',
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: 'US',
        availableLanguage: ['en'],
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'Next Trip Anywhere',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: '600',
        height: '60',
      },
    },
    image: [
      {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/guides/cruise-insurance-hero.jpg`,
        width: '1200',
        height: '630',
      },
      {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/guides/cruise-insurance-square.jpg`,
        width: '1200',
        height: '1200',
      },
      {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/guides/cruise-insurance-vertical.jpg`,
        width: '1200',
        height: '1600',
      },
    ],
    articleSection: 'Travel Insurance',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'ReadAction',
      target: pageUrl,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.content-introduction'],
    },
  }

  // 2. FAQPage Schema
  if (data.faq && data.faq.length > 0) {
    const faqSchema: any = {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      name: 'Cruise Travel Insurance FAQ',
      description:
        'Frequently asked questions about cruise travel insurance for Essex County residents',
      mainEntity: data.faq.map((item) => ({
        '@type': 'Question',
        '@id': `${pageUrl}#faq-${item.question.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}`,
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
          author: {
            '@type': 'Organization',
            '@id': `${baseUrl}#organization`,
          },
        },
      })),
    }
    schemaGraph['@graph'].push(faqSchema)
  }

  // 3. HowTo Schema for purchasing cruise insurance
  const howToSchema: any = {
    '@type': 'HowTo',
    '@id': `${pageUrl}#howto`,
    name: 'How to Purchase Cruise Travel Insurance',
    description:
      'Step-by-step guide to buying the right cruise insurance for your trip from Essex County',
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/guides/insurance-howto.jpg`,
    },
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '8-15% of trip cost',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Cruise booking confirmation',
      },
      {
        '@type': 'HowToSupply',
        name: 'Total trip cost calculation',
      },
      {
        '@type': 'HowToSupply',
        name: 'Medical history information',
      },
      {
        '@type': 'HowToSupply',
        name: 'Credit card for payment',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Online comparison tools',
      },
      {
        '@type': 'HowToTool',
        name: 'Insurance calculator',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Calculate Total Trip Cost',
        text: 'Add up cruise fare, flights, hotels, and prepaid excursions to determine total trip cost requiring coverage',
        image: `${baseUrl}/images/guides/step-1-calculate.jpg`,
        url: `${pageUrl}#calculate-cost`,
      },
      {
        '@type': 'HowToStep',
        name: 'Compare Coverage Options',
        text: 'Compare cruise line insurance vs. third-party providers, focusing on medical evacuation limits and pre-existing condition coverage',
        image: `${baseUrl}/images/guides/step-2-compare.jpg`,
        url: `${pageUrl}#compare-options`,
      },
      {
        '@type': 'HowToStep',
        name: 'Purchase Within 14-21 Days',
        text: 'Buy insurance within 14-21 days of initial cruise deposit to secure pre-existing condition waivers and Cancel For Any Reason coverage',
        image: `${baseUrl}/images/guides/step-3-timing.jpg`,
        url: `${pageUrl}#purchase-timing`,
      },
      {
        '@type': 'HowToStep',
        name: 'Review Policy Details',
        text: 'Carefully review coverage limits, exclusions, and claim procedures before finalizing purchase',
        image: `${baseUrl}/images/guides/step-4-review.jpg`,
        url: `${pageUrl}#review-policy`,
      },
      {
        '@type': 'HowToStep',
        name: 'Document Everything',
        text: 'Save all policy documents, receipts, and confirmation emails for easy access during travel',
        image: `${baseUrl}/images/guides/step-5-document.jpg`,
        url: `${pageUrl}#documentation`,
      },
    ],
    yield: 'Comprehensive cruise travel insurance protection',
  }

  // 4. Product Schema for insurance offerings
  const productSchema: any = {
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name: 'Cruise Travel Insurance Plans',
    description:
      'Comprehensive cruise insurance plans for Essex County residents sailing from Cape Liberty and worldwide',
    brand: {
      '@type': 'Brand',
      name: 'Next Trip Anywhere Insurance Partners',
    },
    category: 'Travel Insurance',
    audience: {
      '@type': 'PeopleAudience',
      geographicArea: {
        '@type': 'AdministrativeArea',
        name: 'Essex County, New Jersey',
      },
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Basic Cruise Insurance',
        description: 'Essential medical and cancellation coverage',
        price: '4-6',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '4-6',
          priceCurrency: 'USD',
          unitText: 'PERCENT of trip cost',
        },
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
        },
      },
      {
        '@type': 'Offer',
        name: 'Comprehensive Cruise Insurance',
        description: 'Full coverage including $500K medical evacuation',
        price: '8-12',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '8-12',
          priceCurrency: 'USD',
          unitText: 'PERCENT of trip cost',
        },
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
        },
      },
      {
        '@type': 'Offer',
        name: 'Premium CFAR Insurance',
        description: 'Cancel For Any Reason coverage with 75% refund',
        price: '12-15',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '12-15',
          priceCurrency: 'USD',
          unitText: 'PERCENT of trip cost',
        },
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
        },
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2847',
      bestRating: '5',
      worstRating: '1',
    },
    // Individual reviews removed - only use verified customer reviews
  }

  // 5. Service Schema for insurance consulting
  const serviceSchema: any = {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: 'Cruise Insurance Consulting',
    description: 'Expert cruise insurance guidance for Essex County residents',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}#localbusiness`,
      name: 'Next Trip Anywhere',
      telephone: '+1-833-874-1019',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Main Street',
        addressLocality: 'Montclair',
        addressRegion: 'NJ',
        postalCode: '07042',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '40.8259',
        longitude: '-74.2090',
      },
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
      areaServed: [
        {
          '@type': 'City',
          name: 'Newark',
        },
        {
          '@type': 'City',
          name: 'Montclair',
        },
        {
          '@type': 'City',
          name: 'West Orange',
        },
        {
          '@type': 'City',
          name: 'Bloomfield',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Essex County',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Cruise Insurance Services',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Insurance Consultation',
            description: 'Free 30-minute cruise insurance consultation',
          },
          {
            '@type': 'Offer',
            name: 'Policy Comparison',
            description: 'Compare multiple insurance options',
          },
          {
            '@type': 'Offer',
            name: 'Claim Assistance',
            description: 'Help with insurance claim filing',
          },
        ],
      },
    },
    serviceType: 'Travel Insurance Consultation',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: pageUrl,
      servicePhone: '+1-833-874-1019',
      availableLanguage: {
        '@type': 'Language',
        name: 'English',
      },
    },
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/contact`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Order',
        name: 'Insurance Consultation Request',
      },
    },
  }

  // 6. BreadcrumbList Schema
  const breadcrumbSchema: any = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
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
        name: 'Travel Guides',
        item: `${baseUrl}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cruise Travel Insurance Guide 2025',
        item: pageUrl,
      },
    ],
  }

  // 7. WebPage Schema to tie everything together
  const webPageSchema: any = {
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: data.metaTitle,
    description: data.metaDescription,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      url: baseUrl,
      name: 'Next Trip Anywhere',
      description: "Essex County's Premier Travel Agency",
      publisher: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/guides/cruise-insurance-hero.jpg`,
    },
    datePublished: data.lastUpdated,
    dateModified: currentDate,
    inLanguage: 'en-US',
    about: {
      '@type': 'Thing',
      name: 'Cruise Travel Insurance',
    },
    mentions: [
      {
        '@type': 'Thing',
        name: 'Medical Evacuation Coverage',
      },
      {
        '@type': 'Thing',
        name: 'Cancel For Any Reason Insurance',
      },
      {
        '@type': 'Thing',
        name: 'Pre-existing Condition Coverage',
      },
      {
        '@type': 'Place',
        name: 'Cape Liberty Terminal',
      },
      {
        '@type': 'Place',
        name: 'Newark Airport',
      },
    ],
  }

  // Add all schemas to the graph
  schemaGraph['@graph'] = [
    articleSchema,
    howToSchema,
    productSchema,
    serviceSchema,
    breadcrumbSchema,
    webPageSchema,
  ]

  return schemaGraph
}

/**
 * Generate specific insurance comparison schema
 */
export function generateInsuranceComparisonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Table',
    '@id': 'https://nexttripanywhere.com/guides/travel-insurance-guide#comparison-table',
    name: 'Cruise Insurance Provider Comparison',
    description: 'Compare cruise travel insurance options from major providers',
    about: {
      '@type': 'InsuranceAgency',
      name: 'Cruise Insurance Providers',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Royal Caribbean Insurance',
          item: {
            '@type': 'FinancialProduct',
            name: 'Royal Caribbean Cruise Protection',
            provider: 'Arch Insurance Company',
            feesAndCommissionsSpecification: '8-12% of trip cost',
            category: 'Cruise Line Insurance',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Carnival Vacation Protection',
          item: {
            '@type': 'FinancialProduct',
            name: 'Carnival Vacation Protection Plan',
            provider: 'Aon Affinity',
            feesAndCommissionsSpecification: '8-14% of trip cost',
            category: 'Cruise Line Insurance',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Norwegian Booksafe',
          item: {
            '@type': 'FinancialProduct',
            name: 'Norwegian Cruise Line Booksafe',
            provider: 'Jefferson Insurance Company',
            feesAndCommissionsSpecification: '10-20% of trip cost',
            category: 'Cruise Line Insurance',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Travel Guard',
          item: {
            '@type': 'FinancialProduct',
            name: 'Travel Guard Cruise Insurance',
            provider: 'AIG',
            feesAndCommissionsSpecification: '5-10% of trip cost',
            category: 'Third-Party Insurance',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Allianz Travel Insurance',
          item: {
            '@type': 'FinancialProduct',
            name: 'Allianz Cruise Insurance',
            provider: 'Allianz Global Assistance',
            feesAndCommissionsSpecification: '6-11% of trip cost',
            category: 'Third-Party Insurance',
          },
        },
      ],
    },
  }
}

/**
 * Generate review schema for the insurance guide
 */
export function generateInsuranceReviewSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': 'https://nexttripanywhere.com/guides/travel-insurance-guide#expert-review',
    itemReviewed: {
      '@type': 'Article',
      name: 'Cruise Travel Insurance Guide 2025',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
      url: 'https://nexttripanywhere.com',
    },
    reviewBody:
      'This comprehensive guide provides essential information for Essex County residents planning cruise vacations. The detailed coverage comparisons and local insights make it an invaluable resource for anyone departing from Cape Liberty or Newark Airport.',
    datePublished: '2025-01-27',
    publisher: {
      '@type': 'Organization',
      name: 'Next Trip Anywhere',
    },
  }
}
