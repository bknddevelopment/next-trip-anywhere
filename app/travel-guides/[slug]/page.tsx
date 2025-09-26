import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CruiseHero } from '@/components/services/CruiseHero'
import ContactFormWithAnalytics from '@/components/forms/ContactFormWithAnalytics'
import { travelInfoGuides } from '@/lib/data/travel-info-guides'
import { generateTravelGuideSchemaGraph } from '@/lib/utils/travelGuideSchema'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const guide = travelInfoGuides.find((g) => g.slug === params.slug)

  if (!guide) {
    return {
      title: 'Travel Guide Not Found | Next Trip Anywhere',
    }
  }

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords.join(', '),
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `https://nexttripanywhere.com/travel-guides/${guide.slug}`,
      siteName: 'Next Trip Anywhere',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
    alternates: {
      canonical: `https://nexttripanywhere.com/travel-guides/${guide.slug}`,
    },
  }
}

export async function generateStaticParams() {
  return travelInfoGuides.map((guide) => ({
    slug: guide.slug,
  }))
}

export default function TravelGuidePage({ params }: { params: { slug: string } }) {
  const guide = travelInfoGuides.find((g) => g.slug === params.slug)

  if (!guide) {
    notFound()
  }

  const schemaGraph = generateTravelGuideSchemaGraph(guide)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Hero Section */}
      <CruiseHero />

      {/* Main Content */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Main Article */}
            <article className="lg:col-span-2">
              {/* Guide Metadata */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>📅 Last updated: {new Date(guide.lastUpdated).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>
                      📚 Type:{' '}
                      {guide.guideType.charAt(0).toUpperCase() +
                        guide.guideType.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  {guide.featuredSnippet && (
                    <div className="w-full mt-4 p-4 bg-blue-50 border-l-4 border-blue-500">
                      <p className="text-sm font-medium text-blue-900">Quick Answer:</p>
                      <p className="text-sm text-blue-800 mt-1">{guide.featuredSnippet}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Introduction */}
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <p className="text-lg leading-relaxed text-gray-700">
                  {guide.content.introduction}
                </p>
              </section>

              {/* Main Sections */}
              {guide.content.sections.map((section, index) => (
                <section key={index} className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p className="leading-relaxed mb-6">{section.content}</p>

                    {section.tips && section.tips.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Tips:</h3>
                        <ul className="space-y-2">
                          {section.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start">
                              <span className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0">
                                ✓
                              </span>
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.checklist && section.checklist.length > 0 && (
                      <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Checklist:</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {section.checklist.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start">
                              <input type="checkbox" className="mt-1 mr-3" />
                              <label className="text-gray-700">{item}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.localNote && (
                      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                        <p className="text-sm font-medium text-yellow-900">Local Tip:</p>
                        <p className="text-sm text-yellow-800 mt-1">{section.localNote}</p>
                      </div>
                    )}
                  </div>
                </section>
              ))}

              {/* Local Advantages */}
              {guide.content.localAdvantages && guide.content.localAdvantages.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Advantages for Essex County Residents
                  </h2>
                  <ul className="space-y-3">
                    {guide.content.localAdvantages.map((advantage, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0">✓</span>
                        <span className="text-gray-700">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQ Section */}
              {guide.faq && guide.faq.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <dl className="space-y-6">
                    {guide.faq.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                        <dt className="text-lg font-semibold text-gray-900 mb-3">
                          {item.question}
                        </dt>
                        <dd className="text-gray-700 leading-relaxed">{item.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* Call to Action */}
              <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Ready to Start Planning?</h2>
                <p className="text-lg mb-6 text-blue-50">{guide.content.callToAction}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:8338741019"
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-center"
                  >
                    Call 833-874-1019
                  </a>
                  <Link
                    href="/contact"
                    className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition text-center"
                  >
                    Contact Us Online
                  </Link>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 mt-8 lg:mt-0">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get Expert Advice</h3>
                <p className="text-gray-600 mb-6">
                  Our travel experts can help you plan the perfect trip. Get personalized
                  recommendations and exclusive deals.
                </p>
                <ContactFormWithAnalytics />
              </div>

              {/* Related Guides */}
              {guide.relatedGuides && guide.relatedGuides.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Related Guides</h3>
                  <ul className="space-y-3">
                    {guide.relatedGuides.map((relatedSlug, index) => {
                      const relatedGuide = travelInfoGuides.find(
                        (g) =>
                          g.slug === relatedSlug.replace('/travel-guides/', '') ||
                          `/travel-guides/${g.slug}` === relatedSlug
                      )

                      if (relatedGuide) {
                        return (
                          <li key={index}>
                            <Link
                              href={`/travel-guides/${relatedGuide.slug}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {relatedGuide.title}
                            </Link>
                          </li>
                        )
                      }

                      // For non-guide links (like /cruises/from-newark)
                      return (
                        <li key={index}>
                          <Link
                            href={relatedSlug}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {relatedSlug
                              .split('/')
                              .pop()
                              ?.replace(/-/g, ' ')
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Quick Facts */}
              <div className="bg-blue-50 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">ℹ️ Quick Facts</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-gray-700">Search Volume:</dt>
                    <dd className="text-gray-600">
                      {guide.searchVolume.toLocaleString()} monthly searches
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Guide Type:</dt>
                    <dd className="text-gray-600 capitalize">
                      {guide.guideType.replace('-', ' ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Target Keywords:</dt>
                    <dd className="text-gray-600">{guide.keywords.slice(0, 3).join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Last Updated:</dt>
                    <dd className="text-gray-600">
                      {new Date(guide.lastUpdated).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
