import { Metadata } from 'next'
import LocationHero from '@/components/locations/LocationHero'
import LocationDeals from '@/components/locations/LocationDeals'
import LocationAirports from '@/components/locations/LocationAirports'
import LeadCaptureForm from '@/components/forms/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'Boston Travel Agency | Flights from Logan Airport | Cruises from Boston',
  description:
    'Book flights from Logan Airport, cruises from Black Falcon Terminal, and vacation packages. Expert Boston travel agency serving Massachusetts, New Hampshire, Rhode Island, and New England.',
  keywords:
    'Boston travel agency, flights from Logan Airport, Boston cruises, Black Falcon cruise terminal, Massachusetts travel, New England vacation packages, cheap flights from Boston',
  openGraph: {
    title: 'Boston Travel Agency - Expert Travel Planning from New England',
    description:
      'Your trusted Boston travel experts. Best deals on flights from Logan Airport and cruises from Black Falcon Terminal. Serving all of New England.',
    url: 'https://nexttripanywhere.com/from/boston',
    images: [
      {
        url: '/images/boston-travel.jpg',
        width: 1200,
        height: 630,
        alt: 'Boston Travel Agency - Next Trip Anywhere',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boston Travel Agency | Flights & Cruises from Boston',
    description:
      'Book your next trip from Boston with expert local travel agents. Best deals from Logan Airport.',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/from/boston',
  },
}

const bostonData = {
  city: 'Boston',
  shortName: 'BOS',
  airports: [
    { code: 'BOS', name: 'Logan International Airport', distance: '3 miles from Downtown Boston' },
    {
      code: 'MHT',
      name: 'Manchester-Boston Regional',
      distance: '50 miles from Boston (New Hampshire)',
    },
    { code: 'PVD', name: 'T.F. Green Airport', distance: '60 miles from Boston (Providence, RI)' },
  ],
  cruisePorts: [
    { name: 'Black Falcon Cruise Terminal', location: 'Seaport District, Boston' },
    { name: 'Flynn Cruiseport Boston', location: 'South Boston Waterfront' },
  ],
  popularDestinations: [
    'Orlando',
    'Fort Lauderdale',
    'Los Angeles',
    'San Francisco',
    'Dublin',
    'London',
    'Reykjavik',
    'Bermuda',
  ],
  localAreas: [
    'Cambridge',
    'Somerville',
    'Brookline',
    'Newton',
    'Quincy',
    'Worcester',
    'Providence',
    'Manchester',
    'Portsmouth',
    'Cape Cod',
  ],
}

// JSON-LD for Boston location
const bostonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://nexttripanywhere.com/from/boston',
  name: 'Next Trip Anywhere - Boston',
  description:
    'Full-service travel agency serving Boston and New England with expert flight, cruise, and vacation package planning.',
  url: 'https://nexttripanywhere.com/from/boston',
  telephone: '+1-833-874-1019',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Boston',
    addressRegion: 'MA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.3601,
    longitude: -71.0589,
  },
  areaServed: [
    {
      '@type': 'State',
      name: 'Massachusetts',
    },
    {
      '@type': 'State',
      name: 'New Hampshire',
    },
    {
      '@type': 'State',
      name: 'Rhode Island',
    },
    {
      '@type': 'State',
      name: 'Connecticut',
    },
    {
      '@type': 'State',
      name: 'Maine',
    },
    {
      '@type': 'State',
      name: 'Vermont',
    },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
}

export default function BostonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bostonJsonLd),
        }}
      />

      <LocationHero location={bostonData} />
      <LocationAirports location={bostonData} />

      {/* Trust Building Section */}
      <section className="py-16 bg-gradient-to-br from-navy to-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-sm opacity-90">Years Serving Boston</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">Happy New England Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Travel Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Price Match Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      <LocationDeals location={bostonData} />

      {/* Lead Capture with Urgency */}
      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              LIMITED TIME: Save up to $500 on Boston Departures
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">
              Boston&apos;s Most Trusted Travel Agency
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Join thousands of satisfied New England travelers who save time and money with our
              exclusive deals from Logan Airport and Black Falcon Terminal.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">IATA Certified Agency</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Avoya Travel Network Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">BBB A+ Rating</span>
              </div>
            </div>
          </div>
          <LeadCaptureForm source="boston-location" />
        </div>
      </section>

      {/* Local SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>Expert Travel Services for Boston and New England</h2>
            <p>
              Next Trip Anywhere is Boston&apos;s premier travel agency, specializing in departures
              from Logan International Airport and cruises from Black Falcon Terminal. Whether
              you&apos;re in Back Bay, Cambridge, or anywhere in Greater Boston, we provide
              personalized travel planning with unbeatable deals on flights, cruises, and vacation
              packages.
            </p>

            <h3>Why Boston Travelers Choose Next Trip Anywhere</h3>
            <ul>
              <li>
                <strong>Logan Airport Experts:</strong> We know the best routes, airlines, and
                timing for Logan departures
              </li>
              <li>
                <strong>Cruise Specialists:</strong> Exclusive group rates from Black Falcon
                Terminal to Bermuda, Caribbean, and Canada
              </li>
              <li>
                <strong>New England Coverage:</strong> Serving Massachusetts, Rhode Island, New
                Hampshire, Maine, Vermont, and Connecticut
              </li>
              <li>
                <strong>JetBlue Partnership:</strong> Special rates on JetBlue&apos;s Boston hub
                flights
              </li>
              <li>
                <strong>24/7 Support:</strong> Always available for Boston&apos;s busy professionals
                and families
              </li>
            </ul>

            <h3>Popular Vacations from Boston</h3>
            <p>
              Bostonians love our direct flights to warm destinations like Florida, California, and
              the Caribbean. Our most popular packages include:
            </p>
            <ul>
              <li>
                <strong>Bermuda Cruises:</strong> 7-day sailings from Black Falcon (May-October)
              </li>
              <li>
                <strong>Europe Flights:</strong> Non-stop to Dublin, London, Paris, and Reykjavik
              </li>
              <li>
                <strong>Florida Escapes:</strong> Direct flights to Orlando, Miami, Fort Lauderdale,
                and Tampa
              </li>
              <li>
                <strong>Caribbean All-Inclusives:</strong> Packages to Aruba, Jamaica, and Turks &
                Caicos
              </li>
              <li>
                <strong>West Coast Adventures:</strong> Direct flights to Los Angeles, San
                Francisco, and Seattle
              </li>
            </ul>

            <h3>Serving All of Greater Boston and New England</h3>
            <p>
              Our travel experts understand the unique needs of New England travelers. We serve
              clients from Boston proper, Cambridge, Somerville, Brookline, Newton, Quincy, and
              throughout the metro area. We also welcome travelers from Worcester, Providence,
              Manchester, Portsmouth, and Cape Cod who prefer our personalized service and exclusive
              deals.
            </p>

            <h3>Book with Confidence</h3>
            <p>
              As an established Boston travel agency with over 10 years of experience and thousands
              of satisfied customers, we guarantee the best prices on all travel from Boston. Our
              team of certified travel advisors ensures your trip is perfectly planned from Logan
              Airport gate to your final destination.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
