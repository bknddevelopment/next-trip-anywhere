/**
 * Dynamic Travel Guide Pages
 * SEO-optimized travel guides with comprehensive content and local SEO focus
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense, lazy } from 'react'
import { travelGuides, getTravelGuideBySlug, type TravelGuide } from '@/lib/data/travel-guides'

// Lazy load non-critical components
const ContactForm = dynamic(() => import('@/components/forms/ContactFormWithAnalytics'), {
  loading: () => (
    <div
      className="h-96 bg-gray-50 animate-pulse rounded-lg"
      aria-label="Loading contact form..."
    />
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

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords.join(', '),
    alternates: {
      canonical,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: canonical,
      type: 'article',
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
      images: [
        {
          url: guide.featuredImage || '/images/guides/travel-guide-default.jpg',
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: [guide.featuredImage || '/images/guides/travel-guide-default.jpg'],
    },
  }
}

// Hero section
const HeroSection = ({ guide }: { guide: TravelGuide }) => (
  <section className="relative bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4 text-sm uppercase tracking-wider opacity-90">
          {guide.category.replace('-', ' ')}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{guide.title}</h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
          {guide.metaDescription}
        </p>
      </div>
    </div>
  </section>
)

// Content section with sections
const ContentSection = ({ guide }: { guide: TravelGuide }) => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed">{guide.content.introduction}</p>
        </div>

        {/* Dynamic Sections */}
        {guide.content.sections.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.title}</h2>
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap">{section.content}</div>
            </div>
          </div>
        ))}

        {/* Local Tips Section */}
        {guide.content.localTips && (
          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 mt-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Essex County Travel Tips</h2>
            <div className="text-blue-800 whitespace-pre-wrap">{guide.content.localTips}</div>
          </div>
        )}

        {/* Conclusion */}
        {guide.content.conclusion && (
          <div className="bg-gray-50 p-8 rounded-lg mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
            <p className="text-gray-700">{guide.content.conclusion}</p>
          </div>
        )}
      </div>
    </div>
  </section>
)

// CTA Section
const CTASection = ({ guide }: { guide: TravelGuide }) => (
  <section className="bg-blue-600 py-16">
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
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call 833-874-1019
          </a>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Explore Travel Tools
          </Link>
        </div>
      </div>
    </div>
  </section>
)

// Schema markup generator
function generateGuideSchema(guide: TravelGuide) {
  return {
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
}

// Main page component
export default async function TravelGuidePage({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = await params
  const guide = getTravelGuideBySlug(resolvedParams.topic)

  if (!guide) {
    notFound()
  }

  const schemaData = generateGuideSchema(guide)

  return (
    <>
      {/* Schema markup */}
      <Script
        id="guide-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Main content */}
      <main>
        <HeroSection guide={guide} />

        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/guides" className="hover:text-blue-600">
                Travel Guides
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{guide.title}</span>
            </nav>
          </div>
        </div>

        <ContentSection guide={guide} />

        {/* FAQ Section */}
        {guide.faq && guide.faq.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {guide.faq.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <CTASection guide={guide} />

        {/* Contact Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Need Help Planning Your Trip?
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
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              More Travel Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {travelGuides
                .filter((g) => g.slug !== guide.slug)
                .slice(0, 3)
                .map((relatedGuide) => (
                  <Link
                    key={relatedGuide.slug}
                    href={`/guides/${relatedGuide.slug}`}
                    className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
                  >
                    <div className="text-sm text-blue-600 uppercase tracking-wider mb-2">
                      {relatedGuide.category.replace('-', ' ')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedGuide.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {relatedGuide.metaDescription.substring(0, 100)}...
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
