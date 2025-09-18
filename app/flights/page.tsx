import { Metadata } from 'next'
import FlightHero from '@/components/services/FlightHero'
import FlightSearch from '@/components/services/FlightSearch'
import FlightDeals from '@/components/services/FlightDeals'
import FAQSection, { flightsFAQs } from '@/components/faq/FAQSection'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { FlashSaleUrgency } from '@/components/marketing/UrgencyBanner'
import { TrustBadges } from '@/components/ui/TrustSignals'

export const metadata: Metadata = {
  title: 'Cheap Flights Nationwide | Save 40% on Airfare | Next Trip Anywhere',
  description:
    'Book cheap flights from all major US cities. Exclusive unpublished fares, 24/7 support, insider deals. Expert agents find deals you can&apos;t get online. Free quote!',
  keywords:
    'cheap flights, flights from NYC, flights from LA, Chicago flights, Seattle flights, Boston flights, Miami flights, DC flights, discount airfare, flight deals, cheap tickets, airline tickets, nationwide flights',
  openGraph: {
    title: 'Save up to 40% on Flights from All US Cities',
    description:
      'Expert travel agents with exclusive airline partnerships. Better prices than online. Free consultation.',
    url: 'https://nexttripanywhere.com/flights',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/flights-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Book Cheap Flights with Next Trip Anywhere',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/flights',
  },
}

// Flight Service JSON-LD
const flightServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Flight Booking Services',
  provider: {
    '@type': 'TravelAgency',
    name: 'Next Trip Anywhere',
  },
  description:
    'Expert flight booking services with exclusive access to unpublished fares and bulk discounts from all major US airports nationwide.',
  areaServed: [
    'New York City',
    'Los Angeles',
    'Chicago',
    'Miami',
    'Seattle',
    'Boston',
    'Washington DC',
    'Denver',
    'Atlanta',
    'Dallas',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Flight Deals',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Domestic Flights',
        description: 'Discounted domestic flights within the United States',
      },
      {
        '@type': 'Offer',
        name: 'International Flights',
        description: 'Exclusive international flight deals from all US cities',
      },
      {
        '@type': 'Offer',
        name: 'Business Class Deals',
        description: 'Premium cabin flights at economy prices',
      },
      {
        '@type': 'Offer',
        name: 'Last Minute Flights',
        description: 'Deep discounts on last-minute flight bookings',
      },
    ],
  },
}

const breadcrumbItems = [{ label: 'Flights', href: '/flights', current: true }]

const flightFAQJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do travel agents get cheaper flights?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We have access to unpublished consolidator fares, bulk purchasing agreements, and exclusive contracts with airlines that aren&apos;t available to the public. This allows us to offer flights up to 40% cheaper than online booking sites.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which airlines do you work with from US airports nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with all major carriers including American, Delta, United, JetBlue, Southwest, Alaska Airlines, and international airlines. We have strong partnerships with airlines that hub at major airports nationwide including JFK, LAX, ORD, ATL, DEN, SEA, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help with complex multi-city itineraries?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Our expertise shines with complex bookings. We can create multi-city itineraries, open-jaw tickets, and around-the-world fares that save you thousands compared to booking segments separately.',
      },
    },
  ],
}

export default function FlightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(flightServiceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(flightFAQJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.label,
              item: `https://nexttripanywhere.com${item.href}`,
            })),
          }),
        }}
      />

      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <FlightHero />

      {/* Enhanced Urgency Banner */}
      <FlashSaleUrgency />

      <FlightSearch />

      {/* Enhanced Trust Building */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Travelers Choose Us for Flights
            </h2>
            <TrustBadges />
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
              <div className="text-gray-700">Average Savings</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">2M+</div>
              <div className="text-gray-700">Flights Booked</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-700">Flight Support</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-700">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <FlightDeals />

      {/* FAQ Section */}
      <FAQSection
        title="Flight Booking FAQ"
        subtitle="Get answers to common questions about booking flights with Next Trip Anywhere"
        faqs={flightsFAQs}
        categories={['Savings', 'Pricing', 'Changes', 'Locations']}
        className="bg-white"
      />

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>Expert Flight Booking from East Coast Airports</h2>
            <p>
              Next Trip Anywhere specializes in finding the best flight deals from all major East
              Coast airports. Our team of flight specialists has decades of combined experience and
              exclusive partnerships with airlines that allow us to offer fares significantly lower
              than what you&apos;ll find on public booking sites.
            </p>

            <h3>Why Book Flights with a Travel Agent?</h3>
            <p>
              In the age of online booking, many travelers don&apos;t realize the significant
              advantages of using a professional travel agent for flights:
            </p>
            <ul>
              <li>
                <strong>Unpublished Fares:</strong> Access to consolidator tickets and negotiated
                rates not available to the public
              </li>
              <li>
                <strong>Complex Itineraries:</strong> Expert routing for multi-city trips, saving
                you time and money
              </li>
              <li>
                <strong>Schedule Changes:</strong> We handle rebooking when airlines change your
                flights
              </li>
              <li>
                <strong>Group Discounts:</strong> Special rates for 10+ passengers traveling
                together
              </li>
              <li>
                <strong>Upgrade Assistance:</strong> Help securing upgrades using points, miles, or
                cash
              </li>
            </ul>

            <h3>East Coast Airport Expertise</h3>
            <p>
              Our location-specific knowledge helps you choose the best airport and airline for your
              journey:
            </p>
            <ul>
              <li>
                <strong>New York:</strong> Whether to fly from JFK (international), LGA (domestic),
                or EWR (United hub)
              </li>
              <li>
                <strong>Boston:</strong> Logan&apos;s best terminals and airlines, plus alternatives
                like Manchester or Providence
              </li>
              <li>
                <strong>Miami:</strong> MIA for Latin America or FLL for budget carriers and
                Caribbean
              </li>
              <li>
                <strong>DC:</strong> DCA for short flights, Dulles for international, or BWI for
                Southwest
              </li>
            </ul>

            <h3>Book with Confidence</h3>
            <p>
              Every flight booking with Next Trip Anywhere includes our satisfaction guarantee, 24/7
              support, and expert assistance with any changes or issues. Let us handle the
              complexities of flight booking while you enjoy the savings and peace of mind.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
