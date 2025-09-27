import { TravelInfoGuide } from '@/lib/data/travel-info-guides'
import { NEXT_TRIP_ANYWHERE } from '@/lib/utils/baseSchema'

export function generateTravelGuideSchemaGraph(guide: TravelInfoGuide) {
  const baseUrl = 'https://nexttripanywhere.com'
  const guideUrl = `${baseUrl}/travel-guides/${guide.slug}`

  // HowTo Schema for guides that are instructional
  const howToSchema =
    guide.guideType === 'packing' || guide.guideType === 'planning'
      ? {
          '@type': 'HowTo',
          '@id': `${guideUrl}#howto`,
          name: guide.title,
          description: guide.metaDescription,
          totalTime: 'PT30M',
          supply: guide.content.sections[0]?.checklist || [],
          step: guide.content.sections.map((section, index) => ({
            '@type': 'HowToStep',
            name: section.title,
            text: section.content,
            position: index + 1,
          })),
        }
      : null

  // Article Schema
  const articleSchema = {
    '@type': 'Article',
    '@id': `${guideUrl}#article`,
    headline: guide.title,
    description: guide.metaDescription,
    image: `${baseUrl}/images/cruise-hero.jpg`,
    datePublished: '2025-01-23',
    dateModified: guide.lastUpdated,
    author: {
      '@type': 'Organization',
      ...NEXT_TRIP_ANYWHERE,
    },
    publisher: {
      '@type': 'Organization',
      ...NEXT_TRIP_ANYWHERE,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': guideUrl,
    },
    keywords: guide.keywords.join(', '),
    articleSection: guide.guideType,
    wordCount: 2000, // Approximate based on requirements
  }

  // FAQ Schema
  const faqSchema =
    guide.faq && guide.faq.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${guideUrl}#faq`,
          mainEntity: guide.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${guideUrl}#breadcrumb`,
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
        item: `${baseUrl}/travel-guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: guideUrl,
      },
    ],
  }

  // WebPage Schema
  const webPageSchema = {
    '@type': 'WebPage',
    '@id': guideUrl,
    url: guideUrl,
    name: guide.title,
    description: guide.metaDescription,
    breadcrumb: {
      '@id': `${guideUrl}#breadcrumb`,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      url: baseUrl,
      name: 'Next Trip Anywhere',
      description: "Essex County's Premier Travel Agency",
      publisher: {
        '@id': `${baseUrl}#organization`,
      },
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/cruise-hero.jpg`,
    },
    datePublished: '2025-01-23',
    dateModified: guide.lastUpdated,
  }

  // Build the graph
  const graph: any[] = [
    {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      ...NEXT_TRIP_ANYWHERE,
    },
    webPageSchema,
    articleSchema,
    breadcrumbSchema,
  ]

  // Add optional schemas if they exist
  if (howToSchema) {
    graph.push(howToSchema)
  }

  if (faqSchema) {
    graph.push(faqSchema)
  }

  // Add speakable schema for voice search optimization
  if (guide.featuredSnippet) {
    graph.push({
      '@type': 'SpeakableSpecification',
      '@id': `${guideUrl}#speakable`,
      cssSelector: ['.featured-snippet'],
      url: guideUrl,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
