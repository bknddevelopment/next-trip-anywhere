import { Metadata } from 'next'
import CruiseHero from '@/components/services/CruiseHero'
import CruiseSearch from '@/components/services/CruiseSearch'
import CruiseDeals from '@/components/services/CruiseDeals'
import LeadCaptureForm from '@/components/forms/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'Cruise Deals from All US Ports | Caribbean Cruises from $299 | Next Trip Anywhere',
  description:
    'Book cruises from all major US ports - Miami, NYC, LA, Seattle, and more. Free upgrades, onboard credits, exclusive group rates. Caribbean, Bahamas, Alaska cruises. CLIA certified agents. Save up to 50%!',
  keywords:
    'cruise deals, Caribbean cruises, Alaska cruises, cruises from Miami, cruises from LA, cruises from Seattle, NYC cruises, cheap cruises, cruise packages, Royal Caribbean, Carnival, Norwegian',
  openGraph: {
    title: 'Cruise Deals from All US Ports | Save up to 50%',
    description:
      'Expert cruise specialists with free cabin upgrades and onboard credits. Book your dream cruise today!',
    url: 'https://nexttripanywhere.com/cruises',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/cruise-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Cruise Deals from All US Ports',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/cruises',
  },
}

// Cruise Service JSON-LD
const cruiseServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cruise Booking Services',
  provider: {
    '@type': 'TravelAgency',
    name: 'Next Trip Anywhere',
  },
  description:
    'Expert cruise booking with exclusive rates, free upgrades, and onboard credits from all major US ports nationwide.',
  areaServed: [
    'PortMiami',
    'Port Everglades',
    'Manhattan Cruise Terminal',
    'Port of Baltimore',
    'Black Falcon Terminal Boston',
    'Port of Los Angeles',
    'Port of San Francisco',
    'Port of Seattle',
    'Port of New Orleans',
    'Port of Galveston',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cruise Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Caribbean Cruises',
        description: '3-7 day cruises to Caribbean islands',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '299',
          priceCurrency: 'USD',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'Bahamas Cruises',
        description: 'Short cruises to Nassau and private islands',
      },
      {
        '@type': 'Offer',
        name: 'Bermuda Cruises',
        description: 'Seasonal cruises from Northeast ports',
      },
      {
        '@type': 'Offer',
        name: 'European Cruises',
        description: 'Mediterranean, Northern Europe, and Alaska cruises',
      },
    ],
  },
}

const cruiseFAQJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What cruise perks can travel agents provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As certified cruise specialists, we can provide free cabin upgrades, onboard credits ($50-$500), complimentary specialty dining, free beverage packages, prepaid gratuities, and exclusive group rates that save you 20-50% off published prices.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which cruise lines depart from US ports nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Major cruise lines operate from all US ports including Royal Caribbean, Carnival, Norwegian, MSC, Disney, Celebrity, and Princess. Popular departure ports include Miami, Fort Lauderdale, Los Angeles, Seattle, New York, Baltimore, New Orleans, and Galveston.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is the best time to book a cruise for the best price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wave Season (January-March) offers the best promotions, but we have access to exclusive group rates year-round. Last-minute cruises (30-60 days out) can offer deep discounts. We monitor prices and rebook if rates drop.',
      },
    },
  ],
}

export default function CruisesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cruiseServiceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cruiseFAQJsonLd),
        }}
      />

      <CruiseHero />

      {/* Special Offers Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-center">
            <span className="font-bold text-lg">TODAY ONLY:</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">FREE Balcony Upgrade</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">$300 Onboard Credit</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Free Beverage Package</span>
            <span className="animate-pulse font-semibold">Call Now: 1-833-874-1019</span>
          </div>
        </div>
      </section>

      <CruiseSearch />

      {/* Cruise Line Partners */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-navy mb-8">
            Official Partners with Every Major Cruise Line
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-700">Royal Caribbean</div>
              <div className="text-sm text-gray-500">Crown & Anchor Partner</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-700">Carnival</div>
              <div className="text-sm text-gray-500">VIFP Specialist</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-700">Norwegian</div>
              <div className="text-sm text-gray-500">Latitudes Expert</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-700">MSC</div>
              <div className="text-sm text-gray-500">Voyagers Club</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-700">Celebrity</div>
              <div className="text-sm text-gray-500">Captain&apos;s Club</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-700">Disney</div>
              <div className="text-sm text-gray-500">Authorized Agent</div>
            </div>
          </div>
        </div>
      </section>

      <CruiseDeals />

      {/* Lead Capture with Benefits */}
      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-bounce">
              48-HOUR FLASH SALE: Extra $200 OFF Per Cabin
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">
              Get Exclusive Cruise Perks You Can&apos;t Find Online
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              As certified cruise specialists, we secure perks worth $500-$2000 that aren&apos;t
              available when booking direct. Plus, we handle everything from dining to shore
              excursions.
            </p>

            {/* Perks Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-left max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-navy mb-3">Exclusive Perks Include:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Free cabin upgrades (up to 2 categories)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Onboard credits ($50-$500)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Complimentary beverage packages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Free specialty dining</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Prepaid gratuities</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-navy mb-3">Plus Our Services:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Best cabin selection assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Dining & show reservations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Shore excursion planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Price drop monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>24/7 emergency support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <LeadCaptureForm source="cruises-page" />
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>America\'s Cruise Experts Since 2010</h2>
            <p>
              Next Trip Anywhere is your premier nationwide cruise specialist, with expertise in all
              major departure ports from Miami to Seattle, Los Angeles to New York. As certified
              cruise counselors with every major cruise line, we provide exclusive perks and savings
              you simply can&apos;t get when booking directly.
            </p>

            <h3>Major US Cruise Ports We Serve Nationwide</h3>
            <ul>
              <li>
                <strong>PortMiami:</strong> The cruise capital of the world with year-round
                Caribbean departures
              </li>
              <li>
                <strong>Port Everglades (Fort Lauderdale):</strong> Second busiest cruise port with
                excellent flight connections
              </li>
              <li>
                <strong>Port Canaveral (Orlando):</strong> Perfect for Disney cruises and Caribbean
                sailings
              </li>
              <li>
                <strong>Manhattan Cruise Terminal:</strong> Convenient NYC departures to Bermuda,
                Canada, and transatlantic
              </li>
              <li>
                <strong>Port of Baltimore:</strong> Year-round cruises to Bahamas, Caribbean, and
                Bermuda
              </li>
              <li>
                <strong>Black Falcon Terminal (Boston):</strong> Seasonal Bermuda and Canada/New
                England cruises
              </li>
              <li>
                <strong>Port of Los Angeles (San Pedro):</strong> Gateway to Pacific Coast and
                Mexico cruises
              </li>
              <li>
                <strong>Port of San Francisco:</strong> Alaska, Hawaii, and Pacific Coast departures
              </li>
              <li>
                <strong>Port of Seattle:</strong> Premier Alaska cruise destination and Pacific
                tours
              </li>
              <li>
                <strong>Port of New Orleans:</strong> Western Caribbean and Mississippi River
                cruises
              </li>
              <li>
                <strong>Port of Galveston:</strong> Texas departures to Western Caribbean and Mexico
              </li>
            </ul>

            <h3>Why Book Your Cruise with Next Trip Anywhere?</h3>
            <p>
              While online booking sites show you prices, they can&apos;t provide the insider
              knowledge and exclusive perks that come with booking through a certified cruise
              specialist:
            </p>
            <ul>
              <li>
                <strong>Group Rates:</strong> Access to unadvertised group space with rates 20-50%
                below published prices
              </li>
              <li>
                <strong>Free Upgrades:</strong> Relationships with cruise lines allow us to secure
                complimentary cabin upgrades
              </li>
              <li>
                <strong>Added Value:</strong> Onboard credits, beverage packages, and dining that
                can total $500-$2000 in value
              </li>
              <li>
                <strong>Expert Guidance:</strong> We know which cabins to avoid, best dining times,
                and money-saving tips
              </li>
              <li>
                <strong>Full Service:</strong> From flights to shore excursions, we handle every
                detail of your cruise vacation
              </li>
            </ul>

            <h3>Popular Cruise Destinations from US Ports</h3>
            <p>
              US travelers enjoy easy access to these incredible destinations from ports nationwide:
            </p>
            <ul>
              <li>
                <strong>Caribbean:</strong> Eastern, Western, and Southern routes to tropical
                paradise
              </li>
              <li>
                <strong>Bahamas:</strong> Quick 3-4 day getaways to Nassau and private islands
              </li>
              <li>
                <strong>Bermuda:</strong> Pink sand beaches from NYC, Boston, and Baltimore
              </li>
              <li>
                <strong>Canada/New England:</strong> Fall foliage cruises from Boston and NYC
              </li>
              <li>
                <strong>Transatlantic:</strong> Cross the Atlantic in style from NYC or Miami
              </li>
              <li>
                <strong>Alaska:</strong> Scenic glacier cruises from Seattle and San Francisco
              </li>
              <li>
                <strong>Hawaii:</strong> Island hopping from West Coast ports
              </li>
              <li>
                <strong>Mexican Riviera:</strong> Pacific Coast departures to Cabo and Mazatlan
              </li>
              <li>
                <strong>Mediterranean:</strong> Transatlantic departures from East Coast ports
              </li>
            </ul>

            <h3>Book Your Dream Cruise Today</h3>
            <p>
              Don&apos;t miss out on exclusive perks and savings. Our cruise specialists are
              standing by to help you plan the perfect cruise vacation from your preferred US port
              nationwide. With our price match guarantee and exclusive amenities, you&apos;ll get
              more value than booking anywhere else. Contact us today for a free, no-obligation
              cruise consultation.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
