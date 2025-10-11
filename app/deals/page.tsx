import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, Calendar, DollarSign, Ship, TrendingUp } from 'lucide-react';
import { getActiveDeals, getFeaturedDeals } from '@/lib/data/featured-deals';
import OptimizedImage from '@/components/ui/OptimizedImage';

export const metadata: Metadata = {
  title: 'Travel Deals & Special Offers | Next Trip Anywhere',
  description: 'Exclusive travel deals on cruises, vacation packages, and more. Limited-time offers from your Essex County travel experts. Call 833-874-1019',
  keywords: ['travel deals', 'cruise deals', 'vacation packages', 'Newark NJ travel deals', 'Essex County travel offers'],
};

export default function DealsHubPage() {
  const activeDeals = getActiveDeals();
  const featuredDeals = getFeaturedDeals();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-full text-sm mb-6">
              <TrendingUp className="w-4 h-4" />
              EXCLUSIVE OFFERS
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Travel Deals & Special Offers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Limited-time deals on cruises, vacation packages, and unforgettable getaways
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:833-874-1019"
                className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call 833-874-1019
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
              >
                <Mail className="w-5 h-5" />
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Featured Deals
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredDeals.map((deal) => (
              <Link
                key={deal.slug}
                href={`/deals/${deal.slug}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-200"
              >
                <div className="relative h-64">
                  <OptimizedImage
                    src={deal.content.hero.image}
                    alt={deal.content.hero.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-lg text-sm">
                    LIMITED TIME
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Ship className="w-4 h-4" />
                    <span>{deal.provider}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {deal.content.hero.headline}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {deal.content.overview.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">Starting from</p>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-900">
                          {deal.content.pricing.startingPrice}
                        </span>
                        <span className="text-gray-600">pp</span>
                      </div>
                    </div>
                    <span className="text-blue-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                      View Deal →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Active Deals */}
      {activeDeals.length > featuredDeals.length && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              More Great Deals
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {activeDeals
                .filter((deal) => !deal.featured)
                .map((deal) => (
                  <Link
                    key={deal.slug}
                    href={`/deals/${deal.slug}`}
                    className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all border border-gray-200 flex"
                  >
                    <div className="relative w-1/3 flex-shrink-0">
                      <OptimizedImage
                        src={deal.content.hero.image}
                        alt={deal.content.hero.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{deal.dealType.toUpperCase()}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {deal.title}
                      </h3>
                      <div className="flex items-center gap-1 text-blue-900">
                        <span className="text-sm">From</span>
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xl font-bold">
                          {deal.content.pricing.startingPrice}
                        </span>
                        <span className="text-sm">pp</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Book With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Book Deals Through Next Trip Anywhere?
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Your Essex County travel experts are here to help you save more and travel better
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Best Price Guarantee</h3>
                <p className="text-gray-700">
                  We monitor prices constantly and ensure you get the best deal available
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-700">
                  Our team is available around the clock to assist with your travel needs
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ship className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Local Expertise</h3>
                <p className="text-gray-700">
                  Serving Essex County travelers with personalized service and local insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Our travel experts are standing by to help you find the perfect deal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:833-874-1019"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call 833-874-1019
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
