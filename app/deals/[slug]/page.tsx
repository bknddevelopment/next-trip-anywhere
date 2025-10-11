import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, Mail, Clock, MapPin, Ship, Calendar, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { getDealBySlug, featuredDeals } from '@/lib/data/featured-deals';
import { generateDealSchemaGraph } from '@/lib/utils/dealSchema';
import OptimizedImage from '@/components/ui/OptimizedImage';

export async function generateStaticParams() {
  return Object.keys(featuredDeals).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    return {
      title: 'Deal Not Found',
    };
  }

  return {
    title: deal.metaTitle,
    description: deal.metaDescription,
    keywords: deal.keywords,
    openGraph: {
      title: deal.metaTitle,
      description: deal.metaDescription,
      type: 'website',
      images: [
        {
          url: deal.content.hero.image,
          alt: deal.content.hero.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: deal.metaTitle,
      description: deal.metaDescription,
      images: [deal.content.hero.image],
    },
  };
}

export default async function DealPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal || !deal.active) {
    notFound();
  }

  const schemaGraph = generateDealSchemaGraph(deal);

  return (
    <>
      <Script
        id="deal-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <article className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-full text-sm mb-6">
                LIMITED TIME OFFER
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {deal.content.hero.headline}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {deal.content.hero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:833-874-1019"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  Call 833-874-1019
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Get a Quote
                </a>
              </div>
              <p className="mt-6 text-sm text-blue-200">
                <AlertCircle className="inline w-4 h-4 mr-1" />
                {deal.content.urgencyMessage}
              </p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[400px] md:h-[500px]">
          <OptimizedImage
            src={deal.content.hero.image}
            alt={deal.content.hero.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Experience the Magic of Alaska
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{deal.content.overview}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Deal Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {deal.content.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Incredible Pricing
              </h2>
              <div className="bg-white text-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl">
                <div className="mb-6">
                  <p className="text-lg text-gray-600 mb-2">Starting from</p>
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="w-12 h-12 text-blue-900" />
                    <span className="text-6xl md:text-7xl font-bold text-blue-900">
                      {deal.content.pricing.startingPrice}
                    </span>
                    <span className="text-2xl text-gray-600">pp</span>
                  </div>
                  <p className="text-gray-600 mt-2">{deal.content.pricing.priceNote}</p>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="font-bold text-xl mb-4">Price Includes:</h3>
                  <ul className="space-y-2 text-left max-w-2xl mx-auto">
                    {deal.content.pricing.priceIncludes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Section */}
        {deal.content.itinerary && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Your 7-Night Itinerary
                </h2>
                <div className="flex items-center justify-center gap-6 mb-8 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Ship className="w-5 h-5 text-blue-600" />
                    <span>{deal.provider}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{deal.content.itinerary.departurePort}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>{deal.content.itinerary.duration}</span>
                  </div>
                </div>

                {deal.content.itinerary.dayByDay && (
                  <div className="space-y-6">
                    {deal.content.itinerary.dayByDay.map((day, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {day.port}
                            </h3>
                            <p className="text-gray-700">{day.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Sailing Dates */}
        {deal.content.sailingDates && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Available Sailing Dates
                </h2>
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {deal.content.sailingDates.map((date, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-blue-50 px-4 py-3 rounded-lg border border-blue-200"
                      >
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">{date}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-center mt-6 text-gray-600">
                    Call us to check cabin availability for your preferred date
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Why Book With Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Why Book Through Next Trip Anywhere?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {deal.content.whyBookWithUs.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                  >
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800">{reason}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  Essex County & Newark Area Travelers
                </h3>
                <p className="text-gray-700">{deal.content.localAngle}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {deal.faq && deal.faq.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {deal.faq.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {item.question}
                      </h3>
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA Section */}
        <section id="contact" className="py-16 bg-gradient-to-br from-blue-900 to-teal-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Book Your Alaska Adventure?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Contact our Essex County travel specialists today. We're here to help you plan the perfect Alaska cruise vacation.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <a
                  href="tel:833-874-1019"
                  className="bg-white text-blue-900 p-6 rounded-lg hover:bg-yellow-400 transition-all group"
                >
                  <Phone className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-lg">Call Us</p>
                  <p className="text-sm">833-874-1019</p>
                </a>

                <a
                  href="mailto:info@nexttripanywhere.com"
                  className="bg-white text-blue-900 p-6 rounded-lg hover:bg-yellow-400 transition-all group"
                >
                  <Mail className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-lg">Email Us</p>
                  <p className="text-sm">info@nexttripanywhere.com</p>
                </a>

                <Link
                  href="/contact"
                  className="bg-white text-blue-900 p-6 rounded-lg hover:bg-yellow-400 transition-all group"
                >
                  <Mail className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-lg">Contact Form</p>
                  <p className="text-sm">Get a personalized quote</p>
                </Link>
              </div>

              <p className="text-sm text-blue-200">
                Office hours: Monday - Friday, 9am - 6pm EST | 24/7 emergency support
              </p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Pages</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/cruises/alaska-cruises"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Alaska Cruise Guide
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/guides/travel-insurance-guide"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Travel Insurance Guide
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Contact Us
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Travel Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
