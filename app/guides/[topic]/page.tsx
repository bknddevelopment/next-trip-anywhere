/**
 * Dynamic Travel Guide Pages
 * SEO-optimized travel guides with comprehensive content and local SEO focus
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { travelGuides, getTravelGuideBySlug, type TravelGuide } from '@/lib/data/travel-guides'
import {
  Phone,
  MapPin,
  Clock,
  DollarSign,
  AlertCircle,
  Shield,
  CheckCircle,
  Star,
} from 'lucide-react'
import {
  generateInsuranceGuideSchemaGraph,
  generateInsuranceComparisonSchema,
  generateInsuranceReviewSchema,
} from '@/lib/utils/insuranceGuideSchema'

// Lazy load non-critical components
const ContactForm = dynamic(() => import('@/components/forms/ContactFormWithAnalytics'), {
  loading: () => (
    <div
      className="h-96 bg-gray-50 animate-pulse rounded-lg"
      aria-label="Loading contact form..."
    />
  ),
})

const InsuranceComparisonTable = dynamic(
  () => import('@/components/guides/InsuranceComparisonTable'),
  {
    loading: () => (
      <div
        className="h-64 bg-gray-50 animate-pulse rounded-lg"
        aria-label="Loading comparison table..."
      />
    ),
  }
)

const FAQAccordion = dynamic(() => import('@/components/guides/FAQAccordion'), {
  loading: () => (
    <div className="h-96 bg-gray-50 animate-pulse rounded-lg" aria-label="Loading FAQ section..." />
  ),
})

// Generate static params for all travel guides
export async function generateStaticParams() {
  return travelGuides.map((guide) => ({
    topic: guide.slug,
  }))
}

// Generate metadata for each guide page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const guide = getTravelGuideBySlug(resolvedParams.topic)

  if (!guide) {
    return {
      title: 'Guide Not Found',
      description: 'The requested travel guide could not be found.',
    }
  }

  const canonical = `https://nexttripanywhere.com/guides/${resolvedParams.topic}`
  const isInsuranceGuide = guide.slug === 'travel-insurance-guide'

  // Enhanced metadata for insurance guide
  const enhancedTitle = isInsuranceGuide
    ? `${guide.metaTitle} | Save 40% on Coverage`
    : guide.metaTitle

  const enhancedDescription = isInsuranceGuide
    ? `⭐ ${guide.metaDescription} Expert advice saves Essex County cruisers thousands. Call 833-874-1019.`
    : guide.metaDescription

  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: guide.keywords.join(', '),
    authors: [{ name: 'Next Trip Anywhere Travel Experts' }],
    creator: 'Next Trip Anywhere',
    publisher: 'Next Trip Anywhere',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title: enhancedTitle,
      description: enhancedDescription,
      url: canonical,
      type: 'article',
      publishedTime: guide.lastUpdated,
      modifiedTime: new Date().toISOString(),
      authors: ['Next Trip Anywhere Travel Experts'],
      section: isInsuranceGuide ? 'Travel Insurance' : 'Travel Guides',
      tags: guide.keywords,
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
      images: [
        {
          url: isInsuranceGuide
            ? 'https://nexttripanywhere.com/images/guides/cruise-insurance-hero.jpg'
            : guide.featuredImage || '/images/guides/travel-guide-default.jpg',
          width: 1200,
          height: 630,
          alt: `${guide.title} - Essential Guide for Essex County Travelers`,
        },
        {
          url: isInsuranceGuide
            ? 'https://nexttripanywhere.com/images/guides/cruise-insurance-square.jpg'
            : guide.featuredImage || '/images/guides/travel-guide-square.jpg',
          width: 1200,
          height: 1200,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@NextTripAnywhere',
      creator: '@NextTripAnywhere',
      title: enhancedTitle,
      description: enhancedDescription,
      images: [
        isInsuranceGuide
          ? 'https://nexttripanywhere.com/images/guides/cruise-insurance-hero.jpg'
          : guide.featuredImage || '/images/guides/travel-guide-default.jpg',
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    category: isInsuranceGuide ? 'Travel Insurance' : 'Travel',
  }
}

// Table of Contents component for long guides
const TableOfContents = ({
  sections,
}: {
  sections?: Array<{ title: string; content: string }>
}) => {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <nav className="bg-blue-50 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Navigation</h2>
      <ul className="space-y-2">
        {sections.map((section, index) => (
          <li key={index}>
            <a
              href={`#section-${index}`}
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
            >
              <span className="mr-2">→</span>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Hero section with enhanced insurance guide features
const HeroSection = ({ guide }: { guide: TravelGuide }) => {
  const isInsuranceGuide = guide.slug === 'travel-insurance-guide'

  return (
    <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 text-sm uppercase tracking-wider opacity-90">
            {guide.category.replace('-', ' ')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {guide.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            {guide.metaDescription}
          </p>

          {/* Quick Stats for Insurance Guide */}
          {isInsuranceGuide && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 hover:bg-white/20 transition-colors">
                  <div className="text-2xl font-bold">$250K+</div>
                  <div className="text-sm text-blue-200">Avg Evacuation Cost</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 hover:bg-white/20 transition-colors">
                  <div className="text-2xl font-bold">8-15%</div>
                  <div className="text-sm text-blue-200">Of Trip Cost</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 hover:bg-white/20 transition-colors">
                  <div className="text-2xl font-bold">14-21</div>
                  <div className="text-sm text-blue-200">Day Window</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 hover:bg-white/20 transition-colors">
                  <div className="text-2xl font-bold">2025</div>
                  <div className="text-sm text-blue-200">Updated Guide</div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-yellow-400" />
                  <span>2,847+ Cruisers Protected</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  <span>Licensed in NJ</span>
                </div>
              </div>

              {/* Immediate CTA for insurance guide */}
              <div className="mt-8">
                <a
                  href="tel:833-874-1019"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-lg"
                >
                  <Phone className="w-6 h-6 mr-3" />
                  Get Free Insurance Quote: 833-874-1019
                </a>
                <p className="mt-4 text-blue-200 text-sm">
                  Speak with an Essex County cruise insurance expert today
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// Content section with sections
const ContentSection = ({ guide }: { guide: TravelGuide }) => {
  const isInsuranceGuide = guide.slug === 'travel-insurance-guide'

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed text-lg">{guide.content.introduction}</p>
          </div>

          {/* Table of Contents for long guides */}
          {guide.content.sections && guide.content.sections.length > 3 && (
            <TableOfContents sections={guide.content.sections} />
          )}

          {/* Insurance Comparison Table for insurance guide */}
          {isInsuranceGuide && (
            <div className="mb-12">
              <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse rounded-lg" />}>
                <InsuranceComparisonTable />
              </Suspense>
            </div>
          )}

          {/* Main Content Sections with Enhanced Internal Linking for Insurance Guide */}
          {guide.content.sections &&
            guide.content.sections.map((section, idx) => {
              const sectionId = `section-${idx}`
              const isInsuranceSection = isInsuranceGuide

              // Add internal links based on section content for insurance guide
              const enhancedContent = isInsuranceSection ? (
                <div className="prose prose-lg max-w-none">
                  {section.content.split('\n\n').map((paragraph, pIdx) => {
                    // Add strategic internal links for insurance guide sections
                    let enhancedParagraph = paragraph

                    if (isInsuranceGuide) {
                      // Add contextual internal links based on content
                      if (paragraph.includes('Royal Caribbean')) {
                        enhancedParagraph = paragraph.replace(
                          'Royal Caribbean',
                          '<a href="/cruises/royal-caribbean" class="text-blue-600 hover:text-blue-800 underline">Royal Caribbean</a>'
                        )
                      }
                      if (paragraph.includes('Carnival')) {
                        enhancedParagraph = enhancedParagraph.replace(
                          'Carnival',
                          '<a href="/cruises/carnival" class="text-blue-600 hover:text-blue-800 underline">Carnival</a>'
                        )
                      }
                      if (paragraph.includes('Norwegian')) {
                        enhancedParagraph = enhancedParagraph.replace(
                          'Norwegian',
                          '<a href="/cruises/norwegian" class="text-blue-600 hover:text-blue-800 underline">Norwegian</a>'
                        )
                      }
                      if (paragraph.includes('Cape Liberty')) {
                        enhancedParagraph = enhancedParagraph.replace(
                          'Cape Liberty',
                          '<a href="/cruises/from-newark" class="text-blue-600 hover:text-blue-800 underline">Cape Liberty</a>'
                        )
                      }
                      if (paragraph.includes('Caribbean')) {
                        enhancedParagraph = enhancedParagraph.replace(
                          /Caribbean(?! cruise)/,
                          '<a href="/cruises/caribbean" class="text-blue-600 hover:text-blue-800 underline">Caribbean</a>'
                        )
                      }
                      if (paragraph.includes('Mediterranean')) {
                        enhancedParagraph = enhancedParagraph.replace(
                          /Mediterranean(?! cruise)/,
                          '<a href="/cruises/mediterranean" class="text-blue-600 hover:text-blue-800 underline">Mediterranean</a>'
                        )
                      }
                      if (paragraph.includes('Alaska')) {
                        enhancedParagraph = enhancedParagraph.replace(
                          /Alaska(?! cruise)/,
                          '<a href="/cruises/alaska" class="text-blue-600 hover:text-blue-800 underline">Alaska</a>'
                        )
                      }
                      if (paragraph.includes('Essex County')) {
                        enhancedParagraph = enhancedParagraph.replace(
                          /Essex County(?!'s)/,
                          '<a href="/locations/essex-county" class="text-blue-600 hover:text-blue-800 underline">Essex County</a>'
                        )
                      }
                    }

                    return (
                      <p
                        key={pIdx}
                        className="text-gray-700 leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: enhancedParagraph }}
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="prose prose-lg max-w-none">
                  {section.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )

              return (
                <div key={idx} id={sectionId} className="mb-12 scroll-mt-20">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.title}</h2>
                  {enhancedContent}

                  {/* Add CTA every 3 sections with insurance-specific messaging */}
                  {(idx + 1) % 3 === 0 && (
                    <div className="my-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-6 border-l-4 border-blue-600">
                      <div className="flex items-start">
                        <Shield className="w-8 h-8 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-gray-900 mb-2">
                            {isInsuranceGuide
                              ? '🔒 Protect Your Cruise Investment Today'
                              : 'Need Expert Guidance?'}
                          </p>
                          <p className="text-gray-700 mb-4">
                            {isInsuranceGuide
                              ? "Don't risk thousands on medical emergencies at sea. Our insurance experts help Essex County cruisers save 30-40% while maximizing coverage."
                              : `Our Essex County travel experts are ready to help you navigate your travel planning.`}
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <a
                              href="tel:833-874-1019"
                              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Phone className="w-5 h-5 mr-2" />
                              Call 833-874-1019
                            </a>
                            {isInsuranceGuide && (
                              <Link
                                href="/contact"
                                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors"
                              >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Get Free Quote
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add specific internal link sections for insurance guide */}
                  {isInsuranceGuide && idx === 2 && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Link
                          href="/cruises/royal-caribbean"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Royal Caribbean Insurance Analysis
                        </Link>
                        <Link
                          href="/cruises/carnival"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Carnival Cruise Protection Plans
                        </Link>
                        <Link
                          href="/cruises/norwegian"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Norwegian Booksafe Coverage
                        </Link>
                        <Link
                          href="/guides/passport-requirements-nj"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Passport Requirements Guide
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

          {/* Local Tips Section */}
          {guide.content.localTips && (
            <div className="mb-12 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-8 border-2 border-teal-600">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-8 h-8 mr-3 text-teal-600" />
                Essex County Insider Tips
              </h2>
              <div className="prose prose-lg max-w-none">
                {guide.content.localTips.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {guide.content.conclusion && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Thoughts</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{guide.content.conclusion}</p>
              </div>
            </div>
          )}

          {/* For destination guides - Getting There Section */}
          {guide.content.gettingThereFromEssexCounty && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Getting There from Essex County
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4">
                  {guide.content.gettingThereFromEssexCounty.overview}
                </p>
                {guide.content.gettingThereFromEssexCounty.flightOptions.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Flight Options</h3>
                    <ul className="list-disc list-inside">
                      {guide.content.gettingThereFromEssexCounty.flightOptions.map(
                        (option, idx) => (
                          <li key={idx} className="text-gray-700">
                            {option}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {guide.content.gettingThereFromEssexCounty.cruiseOptions.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Cruise Options</h3>
                    <ul className="list-disc list-inside">
                      {guide.content.gettingThereFromEssexCounty.cruiseOptions.map(
                        (option, idx) => (
                          <li key={idx} className="text-gray-700">
                            {option}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                <p className="text-gray-700 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <strong>Travel Time:</strong>{' '}
                  {guide.content.gettingThereFromEssexCounty.travelTime}
                </p>
              </div>
            </div>
          )}

          {/* For destination guides - Top Attractions */}
          {guide.content.topAttractions && guide.content.topAttractions.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Attractions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {guide.content.topAttractions.map((attraction, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-2">{attraction.title}</h3>
                    <p className="text-gray-700 mb-3">{attraction.description}</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <strong>Duration:</strong> {attraction.duration}
                      </p>
                      <p className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <strong>Cost:</strong> {attraction.cost}
                      </p>
                      {attraction.mustSee && (
                        <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          Must See
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best Time to Visit */}
          {guide.content.bestTimeToVisit && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Time to Visit</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700">{guide.content.bestTimeToVisit.overview}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = ({ guide }: { guide: TravelGuide }) => (
  <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Let our Essex County travel experts help you plan the perfect trip
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:833-874-1019"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call 833-874-1019
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors shadow-lg"
          >
            Request Quote Online
          </Link>
        </div>

        {guide.slug === 'travel-insurance-guide' && (
          <div className="mt-8 bg-white/10 backdrop-blur rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-100 text-sm">
              <AlertCircle className="inline w-4 h-4 mr-1" />
              Remember: Purchase insurance within 14-21 days of your initial deposit for maximum
              benefits
            </p>
          </div>
        )}
      </div>
    </div>
  </section>
)

// Schema markup generator
function generateGuideSchema(guide: TravelGuide) {
  // Use comprehensive schema for insurance guide
  if (guide.slug === 'travel-insurance-guide') {
    return generateInsuranceGuideSchemaGraph(guide)
  }

  // Default schema for other guides
  const baseSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.title,
        description: guide.metaDescription,
        keywords: guide.keywords.join(', '),
        datePublished: guide.lastUpdated,
        dateModified: guide.lastUpdated,
        author: {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
          url: 'https://nexttripanywhere.com',
          telephone: '833-874-1019',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Montclair',
            addressRegion: 'NJ',
            postalCode: '07042',
            addressCountry: 'US',
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'Next Trip Anywhere',
          logo: {
            '@type': 'ImageObject',
            url: 'https://nexttripanywhere.com/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://nexttripanywhere.com/guides/${guide.slug}`,
        },
      },
      {
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
            name: guide.title,
            item: `https://nexttripanywhere.com/guides/${guide.slug}`,
          },
        ],
      },
    ],
  }

  // Add FAQPage schema if FAQ exists
  if (guide.faq && guide.faq.length > 0) {
    const faqSchema: any = {
      '@type': 'FAQPage',
      mainEntity: guide.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }
    baseSchema['@graph'].push(faqSchema)
  }

  return baseSchema
}

// Main page component
export default async function TravelGuidePage({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = await params
  const guide = getTravelGuideBySlug(resolvedParams.topic)

  if (!guide) {
    notFound()
  }

  const schemaData = generateGuideSchema(guide)
  const isInsuranceGuide = guide.slug === 'travel-insurance-guide'

  // Generate additional schemas for insurance guide
  const additionalSchemas = isInsuranceGuide
    ? [generateInsuranceComparisonSchema(), generateInsuranceReviewSchema()]
    : []

  return (
    <>
      {/* Primary Schema markup */}
      <Script
        id="guide-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Additional Insurance Guide Schemas */}
      {isInsuranceGuide &&
        additionalSchemas.map((schema, idx) => (
          <Script
            key={`additional-schema-${idx}`}
            id={`additional-schema-${idx}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      {/* Main content */}
      <main>
        <HeroSection guide={guide} />

        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/guides" className="hover:text-blue-600 transition-colors">
                Travel Guides
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{guide.title}</span>
            </nav>
          </div>
        </div>

        <ContentSection guide={guide} />

        {/* FAQ Section with Accordion */}
        {guide.faq && guide.faq.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Suspense
                  fallback={<div className="h-96 bg-white animate-pulse rounded-lg shadow-lg" />}
                >
                  <FAQAccordion items={guide.faq} />
                </Suspense>
              </div>
            </div>
          </section>
        )}

        <CTASection guide={guide} />

        {/* Contact Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {isInsuranceGuide
                  ? 'Get Your Personalized Insurance Quote'
                  : 'Need Help Planning Your Trip?'}
              </h2>
              <Suspense
                fallback={<div className="h-96 bg-white animate-pulse rounded-lg shadow-lg" />}
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              More Travel Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {travelGuides
                .filter((g) => g.slug !== guide.slug)
                .slice(0, 3)
                .map((relatedGuide) => (
                  <Link
                    key={relatedGuide.slug}
                    href={`/guides/${relatedGuide.slug}`}
                    className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="text-sm text-blue-600 uppercase tracking-wider mb-2">
                      {relatedGuide.category.replace('-', ' ')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{relatedGuide.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {relatedGuide.metaDescription}
                    </p>
                    <div className="mt-4 text-blue-600 font-semibold text-sm">Read More →</div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
