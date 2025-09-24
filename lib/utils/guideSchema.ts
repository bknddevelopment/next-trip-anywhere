/**
 * Schema generators for travel guide, blog, and informational pages
 * Provides Article, HowTo, and Guide structured data for rich snippets
 */

import { BlogPost, BlogCategory } from '@/lib/types/blog'

// Type definitions for article and guide schemas
interface Article {
  '@context'?: string
  '@type': 'Article' | 'NewsArticle' | 'BlogPosting' | 'TravelGuide'
  '@id'?: string
  headline: string
  alternativeHeadline?: string
  description?: string
  image?: string | ImageObject | ImageObject[]
  datePublished: string
  dateModified?: string
  author?: Person | Organization
  publisher?: Organization
  mainEntityOfPage?: WebPage
  articleBody?: string
  articleSection?: string
  wordCount?: number
  keywords?: string | string[]
  inLanguage?: string
  isAccessibleForFree?: boolean
  isPartOf?: WebSite | Blog
  hasPart?: Article[]
  speakable?: SpeakableSpecification
  video?: VideoObject
  aggregateRating?: AggregateRating
  interactionStatistic?: InteractionCounter[]
  about?: Thing | Thing[]
  mentions?: Thing | Thing[]
  citation?: CreativeWork[]
}

interface Person {
  '@type': 'Person'
  '@id'?: string
  name: string
  url?: string
  image?: string
  jobTitle?: string
  worksFor?: Organization
  sameAs?: string[]
  description?: string
  email?: string
}

interface Organization {
  '@type': 'Organization'
  '@id'?: string
  name: string
  url?: string
  logo?: ImageObject | string
  sameAs?: string[]
  description?: string
  email?: string
  telephone?: string
}

interface ImageObject {
  '@type': 'ImageObject'
  '@id'?: string
  url: string
  width?: number
  height?: number
  caption?: string
  contentUrl?: string
  thumbnail?: ImageObject
}

interface VideoObject {
  '@type': 'VideoObject'
  '@id'?: string
  name: string
  description?: string
  thumbnailUrl?: string
  uploadDate?: string
  duration?: string
  contentUrl?: string
  embedUrl?: string
}

interface WebPage {
  '@type': 'WebPage'
  '@id'?: string
  url?: string
  name?: string
  description?: string
  breadcrumb?: BreadcrumbList
  primaryImageOfPage?: ImageObject
  lastReviewed?: string
}

interface WebSite {
  '@type': 'WebSite'
  '@id'?: string
  url: string
  name: string
  description?: string
  publisher?: Organization
  inLanguage?: string
}

interface Blog {
  '@type': 'Blog'
  '@id'?: string
  url: string
  name: string
  description?: string
  blogPost?: BlogPosting[]
}

interface BlogPosting extends Article {
  '@type': 'BlogPosting'
}

interface SpeakableSpecification {
  '@type': 'SpeakableSpecification'
  cssSelector?: string[]
  xpath?: string[]
}

interface AggregateRating {
  '@type': 'AggregateRating'
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}

interface InteractionCounter {
  '@type': 'InteractionCounter'
  interactionType: string
  userInteractionCount: number
}

interface Thing {
  '@type': string
  name: string
  description?: string
  url?: string
  sameAs?: string[]
}

interface CreativeWork {
  '@type': 'CreativeWork' | 'WebPage' | 'Article'
  name: string
  url?: string
  author?: Person | Organization
  datePublished?: string
}

interface HowTo {
  '@context'?: string
  '@type': 'HowTo'
  '@id'?: string
  name: string
  description: string
  image?: string | ImageObject | ImageObject[]
  estimatedCost?: MonetaryAmount
  supply?: HowToSupply[]
  tool?: HowToTool[]
  step?: HowToStep[]
  totalTime?: string
  prepTime?: string
  performTime?: string
  yield?: string
  author?: Person | Organization
  datePublished?: string
  dateModified?: string
  aggregateRating?: AggregateRating
  video?: VideoObject
  inLanguage?: string
}

interface MonetaryAmount {
  '@type': 'MonetaryAmount'
  currency: string
  value: number | string
  minValue?: number
  maxValue?: number
}

interface HowToSupply {
  '@type': 'HowToSupply'
  name: string
  estimatedCost?: MonetaryAmount
  requiredQuantity?: number | string
}

interface HowToTool {
  '@type': 'HowToTool'
  name: string
  image?: string
  url?: string
}

interface HowToStep {
  '@type': 'HowToStep'
  '@id'?: string
  name: string
  text: string
  image?: string | ImageObject
  url?: string
  video?: VideoObject
}

interface Guide {
  '@context'?: string
  '@type': 'Guide'
  '@id'?: string
  name: string
  description: string
  about?: Thing | Thing[]
  author?: Person | Organization
  datePublished?: string
  dateModified?: string
  reviewedBy?: Person | Organization
  category?: string | string[]
  educationalLevel?: string
  assesses?: string
  teaches?: string
  educationalUse?: string
  timeRequired?: string
  typicalAgeRange?: string
  audience?: Audience
  inLanguage?: string
}

interface Audience {
  '@type': 'Audience'
  audienceType?: string
  geographicArea?: Place
  suggestedMinAge?: number
  suggestedMaxAge?: number
}

interface Place {
  '@type': 'Place'
  name: string
  address?: PostalAddress
  geo?: GeoCoordinates
}

interface PostalAddress {
  '@type': 'PostalAddress'
  addressLocality?: string
  addressRegion?: string
  addressCountry?: string
}

interface GeoCoordinates {
  '@type': 'GeoCoordinates'
  latitude: number
  longitude: number
}

interface BreadcrumbList {
  '@type': 'BreadcrumbList'
  itemListElement: ListItem[]
}

interface ListItem {
  '@type': 'ListItem'
  position: number
  name: string
  item?: string
}

interface ItemList {
  '@context'?: string
  '@type': 'ItemList'
  '@id'?: string
  name?: string
  description?: string
  itemListElement: ListItem[]
  numberOfItems?: number
  itemListOrder?: string
}

interface FAQPage {
  '@context'?: string
  '@type': 'FAQPage'
  '@id'?: string
  mainEntity: Question[]
  about?: Thing | Thing[]
  isPartOf?: WebSite
}

interface Question {
  '@type': 'Question'
  '@id'?: string
  name: string
  acceptedAnswer: Answer
  suggestedAnswer?: Answer[]
  answerCount?: number
  upvoteCount?: number
  dateCreated?: string
  author?: Person
}

interface Answer {
  '@type': 'Answer'
  '@id'?: string
  text: string
  dateCreated?: string
  upvoteCount?: number
  url?: string
  author?: Person
}

// Publisher organization (consistent across all articles)
const publisherOrg: Organization = {
  '@type': 'Organization',
  '@id': 'https://nexttripanywhere.com/#organization',
  name: 'Next Trip Anywhere',
  url: 'https://nexttripanywhere.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://nexttripanywhere.com/images/logo.png',
    width: 600,
    height: 60,
  },
  sameAs: [
    'https://www.facebook.com/nexttripanywhere',
    'https://www.instagram.com/nexttripanywhere',
    'https://www.linkedin.com/company/nexttripanywhere',
  ],
}

// Generate Article schema for blog posts
export function generateArticleSchema(
  post: BlogPost,
  content?: string,
  wordCount?: number
): Article {
  const article: Article = {
    '@type': 'BlogPosting',
    '@id': `https://nexttripanywhere.com/blog/${post.slug}#article`,
    headline: post.title,
    alternativeHeadline: post.seo?.metaTitle,
    description: post.seo?.metaDescription || post.excerpt,
    image: post.featuredImage
      ? {
          '@type': 'ImageObject',
          url: `https://nexttripanywhere.com${post.featuredImage}`,
          width: 1200,
          height: 630,
        }
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.author
      ? {
          '@type': 'Person',
          '@id': `https://nexttripanywhere.com/#author-${post.author.id}`,
          name: post.author.name,
          url: post.author.social?.linkedin,
          image: post.author.avatar,
          jobTitle: post.author.role,
          worksFor: publisherOrg,
          sameAs: post.author.social?.linkedin ? [post.author.social.linkedin] : undefined,
          description: post.author.bio,
        }
      : publisherOrg,
    publisher: publisherOrg,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nexttripanywhere.com/blog/${post.slug}`,
    },
    articleBody: content,
    articleSection: post.category,
    wordCount: wordCount,
    keywords: post.seo?.keywords?.join(', '),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://nexttripanywhere.com/blog#blog',
      url: 'https://nexttripanywhere.com/blog',
      name: 'Next Trip Anywhere Travel Blog',
      description: 'Travel tips, destination guides, and insider advice for Essex County travelers',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.article-summary'],
    },
  }

  // Add about entities if the post covers specific topics
  if (post.tags && post.tags.length > 0) {
    article.about = post.tags.map((tag: string) => ({
      '@type': 'Thing',
      name: tag,
      url: `https://nexttripanywhere.com/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    }))
  }

  return article
}

// Generate HowTo schema for guide content
export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>,
  options?: {
    estimatedCost?: { min: number; max: number }
    totalTime?: string
    supplies?: Array<{ name: string; cost?: number }>
    tools?: string[]
  }
): HowTo {
  const howTo: HowTo = {
    '@type': 'HowTo',
    '@id': `https://nexttripanywhere.com/#howto-${title.toLowerCase().replace(/\s+/g, '-')}`,
    name: title,
    description: description,
    author: publisherOrg,
    datePublished: new Date().toISOString().split('T')[0],
    inLanguage: 'en-US',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      '@id': `#step${index + 1}`,
      name: `Step ${index + 1}: ${step.name}`,
      text: step.text,
      image: step.image ? `https://nexttripanywhere.com${step.image}` : undefined,
    })),
  }

  if (options?.estimatedCost) {
    howTo.estimatedCost = {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      minValue: options.estimatedCost.min,
      maxValue: options.estimatedCost.max,
      value: `${options.estimatedCost.min}-${options.estimatedCost.max}`,
    }
  }

  if (options?.totalTime) {
    howTo.totalTime = options.totalTime
  }

  if (options?.supplies) {
    howTo.supply = options.supplies.map((supply) => ({
      '@type': 'HowToSupply',
      name: supply.name,
      estimatedCost: supply.cost
        ? {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: supply.cost,
          }
        : undefined,
    }))
  }

  if (options?.tools) {
    howTo.tool = options.tools.map((tool) => ({
      '@type': 'HowToTool',
      name: tool,
    }))
  }

  return howTo
}

// Generate Guide schema for comprehensive travel guides
export function generateGuideSchema(
  title: string,
  description: string,
  category: string,
  options?: {
    about?: string[]
    teaches?: string[]
    timeRequired?: string
    audience?: string
    lastReviewed?: string
  }
): Guide {
  const guide: Guide = {
    '@type': 'Guide',
    '@id': `https://nexttripanywhere.com/#guide-${title.toLowerCase().replace(/\s+/g, '-')}`,
    name: title,
    description: description,
    category: category,
    author: publisherOrg,
    datePublished: new Date().toISOString().split('T')[0],
    inLanguage: 'en-US',
  }

  if (options?.about) {
    guide.about = options.about.map((topic) => ({
      '@type': 'Thing',
      name: topic,
    }))
  }

  if (options?.teaches) {
    guide.teaches = options.teaches.join(', ')
  }

  if (options?.timeRequired) {
    guide.timeRequired = options.timeRequired
  }

  if (options?.audience) {
    guide.audience = {
      '@type': 'Audience',
      audienceType: options.audience,
      geographicArea: {
        '@type': 'Place',
        name: 'Essex County, New Jersey',
      },
    }
  }

  if (options?.lastReviewed) {
    guide.dateModified = options.lastReviewed
    guide.reviewedBy = publisherOrg
  }

  return guide
}

// Generate ItemList schema for listicle content
export function generateListicleSchema(
  title: string,
  items: Array<{ name: string; position: number; url?: string; description?: string }>
): ItemList {
  return {
    '@type': 'ItemList',
    '@id': `https://nexttripanywhere.com/#list-${title.toLowerCase().replace(/\s+/g, '-')}`,
    name: title,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
    numberOfItems: items.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
  }
}

// Generate FAQ schema for guide FAQs
export function generateGuideFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
  about?: string
): FAQPage {
  return {
    '@type': 'FAQPage',
    '@id': `https://nexttripanywhere.com/#faq-guide`,
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `#question${index + 1}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        '@id': `#answer${index + 1}`,
        text: faq.answer,
        dateCreated: new Date().toISOString().split('T')[0],
      },
      answerCount: 1,
    })),
    about: about
      ? {
          '@type': 'Thing',
          name: about,
        }
      : undefined,
    isPartOf: {
      '@type': 'WebSite',
      url: 'https://nexttripanywhere.com',
      name: 'Next Trip Anywhere',
    },
  }
}

// Generate BreadcrumbList for guides
export function generateGuideBreadcrumbSchema(
  pageName: string,
  category: string,
  slug: string
): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nexttripanywhere.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Travel Guides',
        item: 'https://nexttripanywhere.com/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category,
        item: `https://nexttripanywhere.com/guides/${category.toLowerCase().replace(/\s+/g, '-')}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: pageName,
        item: `https://nexttripanywhere.com/guides/${slug}`,
      },
    ],
  }
}

// Generate complete schema graph for guide pages
export function generateGuideSchemaGraph(options: {
  title: string
  description: string
  category: string
  type: 'article' | 'howto' | 'guide' | 'listicle'
  slug: string
  publishedDate?: string
  modifiedDate?: string
  author?: Person
  content?: string
  wordCount?: number
  steps?: Array<{ name: string; text: string; image?: string }>
  listItems?: Array<{ name: string; position: number; url?: string }>
  faqs?: Array<{ question: string; answer: string }>
  estimatedCost?: { min: number; max: number }
  totalTime?: string
}) {
  const schemas = []

  // Add main organization
  schemas.push(publisherOrg)

  // Add primary content schema based on type
  switch (options.type) {
    case 'article': {
      const articlePost: Partial<BlogPost> = {
        slug: options.slug,
        title: options.title,
        excerpt: options.description,
        category: options.category as BlogCategory,
        publishedAt: options.publishedDate || new Date().toISOString().split('T')[0],
        updatedAt: options.modifiedDate,
        author: options.author
          ? {
              id: 'custom',
              name: options.author.name,
              role: options.author.jobTitle || 'Travel Expert',
              bio: options.author.description || '',
              avatar: options.author.image || '/images/authors/placeholder.svg',
            }
          : undefined,
        seo: {
          metaTitle: options.title,
          metaDescription: options.description,
          keywords: [],
        },
      }
      schemas.push(
        generateArticleSchema(articlePost as BlogPost, options.content, options.wordCount)
      )
      break
    }

    case 'howto': {
      if (options.steps) {
        schemas.push(
          generateHowToSchema(options.title, options.description, options.steps, {
            estimatedCost: options.estimatedCost,
            totalTime: options.totalTime,
          })
        )
      }
      break
    }

    case 'guide': {
      schemas.push(
        generateGuideSchema(options.title, options.description, options.category, {
          lastReviewed: options.modifiedDate,
          audience: 'Travelers',
        })
      )
      break
    }

    case 'listicle': {
      if (options.listItems) {
        schemas.push(generateListicleSchema(options.title, options.listItems))
      }
      break
    }
  }

  // Add FAQ schema if FAQs exist
  if (options.faqs && options.faqs.length > 0) {
    schemas.push(generateGuideFAQSchema(options.faqs, options.title))
  }

  // Add breadcrumb
  schemas.push(generateGuideBreadcrumbSchema(options.title, options.category, options.slug))

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}

// Export all types
export type {
  Article,
  Person,
  Organization,
  ImageObject,
  VideoObject,
  WebPage,
  WebSite,
  Blog,
  BlogPosting,
  SpeakableSpecification,
  AggregateRating,
  InteractionCounter,
  Thing,
  CreativeWork,
  HowTo,
  MonetaryAmount,
  HowToSupply,
  HowToTool,
  HowToStep,
  Guide,
  Audience,
  Place,
  PostalAddress,
  GeoCoordinates,
  BreadcrumbList,
  ListItem,
  ItemList,
  FAQPage,
  Question,
  Answer,
}
