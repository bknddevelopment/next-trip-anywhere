import type { Metadata } from 'next'
import { earlyBooking2027Deal } from '@/lib/data/promotional-deals'
import DealHero from '@/components/deals/DealHero'
import LimitedTimeOffer from '@/components/deals/LimitedTimeOffer'
import SavingsBreakdown from '@/components/deals/SavingsBreakdown'
import DestinationShowcase from '@/components/deals/DestinationShowcase'
import UpgradePackages from '@/components/deals/UpgradePackages'
import DealTerms from '@/components/deals/DealTerms'
import Link from 'next/link'

export const metadata: Metadata = {
  title: earlyBooking2027Deal.seo.metaTitle,
  description: earlyBooking2027Deal.seo.metaDescription,
  keywords: earlyBooking2027Deal.seo.keywords,
  openGraph: {
    title: earlyBooking2027Deal.seo.metaTitle,
    description: earlyBooking2027Deal.seo.metaDescription,
    url: 'https://nexttripanywhere.com/deals/early-booking-2027-2028',
    type: 'website',
    images: [
      {
        url: earlyBooking2027Deal.hero.imageUrl,
        width: 1920,
        height: 1080,
        alt: earlyBooking2027Deal.hero.imageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: earlyBooking2027Deal.seo.metaTitle,
    description: earlyBooking2027Deal.seo.metaDescription,
    images: [earlyBooking2027Deal.hero.imageUrl],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/deals/early-booking-2027-2028',
  },
}

export default function EarlyBookingDealPage() {
  const deal = earlyBooking2027Deal

  // Schema.org Offer markup
  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: deal.title,
    description: deal.hero.subheadline,
    url: 'https://nexttripanywhere.com/deals/early-booking-2027-2028',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'USD',
      price: 599,
      minPrice: 499,
    },
    validFrom: deal.validFrom,
    validThrough: deal.validUntil,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'TravelAgency',
      name: 'Next Trip Anywhere',
      telephone: deal.contact.phone,
      email: deal.contact.email,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'NJ',
        addressCountry: 'US',
      },
    },
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />

      {/* Hero Section */}
      <DealHero
        headline={deal.hero.headline}
        subheadline={deal.hero.subheadline}
        imageUrl={deal.hero.imageUrl}
        imageAlt={deal.hero.imageAlt}
        expirationDate={deal.validUntil}
      />

      {/* Sticky Limited Time Offer Banner */}
      <LimitedTimeOffer expirationDate={deal.validUntil} />

      {/* Savings Breakdown */}
      <SavingsBreakdown savings={deal.savings} />

      {/* Destinations */}
      <DestinationShowcase destinations={deal.destinations} />

      {/* Shore Excursions Section */}
      <section className="py-16 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {deal.shoreExcursions.title}
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            {deal.shoreExcursions.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {deal.shoreExcursions.examples.map((example, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20"
              >
                <p className="text-lg font-semibold">✨ {example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade Packages */}
      <UpgradePackages upgrades={deal.upgrades} />

      {/* Booking Section */}
      <section id="book-now" className="py-16 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Book Your Dream Cruise?
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Don't wait - these exclusive savings won't last long!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <a
              href="tel:8338741019"
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-xl px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3"
            >
              <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 833-874-1019
            </a>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Request a Quote Online
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto border border-white/30">
            <p className="text-lg mb-2">
              <strong>Office Hours:</strong>
            </p>
            <p className="text-white/90">{deal.contact.availability}</p>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <DealTerms
        restrictions={deal.terms.restrictions}
        promoCodes={deal.terms.promoCodes}
        campaignCode={deal.terms.campaignCode}
        depositInfo={deal.terms.depositInfo}
        additionalInfo={deal.terms.additionalInfo}
      />

      {/* Final CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions? We're Here to Help!
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
            Our travel experts are standing by to help you find the perfect cruise and maximize your savings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:8338741019"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors"
            >
              📞 Call Now
            </a>
            <a
              href="mailto:info@nexttripanywhere.com"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors"
            >
              ✉️ Email Us
            </a>
            <Link
              href="/"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors"
            >
              🏠 Return Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
