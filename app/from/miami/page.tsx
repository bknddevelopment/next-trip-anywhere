import { Metadata } from 'next'
import Image from 'next/image'
import LocationHero from '@/components/locations/LocationHero'
import LocationDeals from '@/components/locations/LocationDeals'
import LocationAirports from '@/components/locations/LocationAirports'
import LeadCaptureForm from '@/components/forms/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'Miami Travel Agency | Flights from MIA & FLL | Cruises from PortMiami',
  description:
    'Book flights from Miami International and Fort Lauderdale airports, cruises from PortMiami, and vacation packages. South Florida&apos;s trusted travel agency serving Miami-Dade, Broward, and Palm Beach.',
  keywords:
    'Miami travel agency, flights from MIA, Fort Lauderdale airport, PortMiami cruises, South Florida travel, Caribbean cruises from Miami, cheap flights from Miami, Florida vacation packages',
  openGraph: {
    title: 'Miami Travel Agency - Your Gateway to the Caribbean & Latin America',
    description:
      'Expert Miami travel planning. Best deals on flights from MIA/FLL and cruises from PortMiami. Serving all of South Florida.',
    url: 'https://nexttripanywhere.com/from/miami',
    images: [
      {
        url: '/images/miami-travel.jpg',
        width: 1200,
        height: 630,
        alt: 'Miami Travel Agency - Next Trip Anywhere',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miami Travel Agency | Caribbean Cruises & International Flights',
    description:
      'Your South Florida travel experts. Best deals from Miami International Airport and PortMiami.',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/from/miami',
    languages: {
      es: 'https://nexttripanywhere.com/es/from/miami',
    },
  },
}

const miamiData = {
  city: 'Miami',
  shortName: 'MIA',
  airports: [
    { code: 'MIA', name: 'Miami International Airport', distance: '8 miles from Downtown Miami' },
    {
      code: 'FLL',
      name: 'Fort Lauderdale-Hollywood International',
      distance: '28 miles from Miami',
    },
    { code: 'PBI', name: 'Palm Beach International', distance: '70 miles from Miami' },
  ],
  cruisePorts: [
    { name: 'PortMiami', location: 'Downtown Miami - Cruise Capital of the World' },
    { name: 'Port Everglades', location: 'Fort Lauderdale - 30 minutes from Miami' },
    { name: 'Port of Palm Beach', location: 'West Palm Beach - 75 minutes from Miami' },
  ],
  popularDestinations: [
    'Cancun',
    'San Juan',
    'Aruba',
    'Nassau',
    'New York',
    'Los Angeles',
    'Madrid',
    'Buenos Aires',
    'Bogota',
    'Lima',
  ],
  localAreas: [
    'Miami Beach',
    'Coral Gables',
    'Aventura',
    'Brickell',
    'Kendall',
    'Fort Lauderdale',
    'Hollywood',
    'Boca Raton',
    'West Palm Beach',
    'Key West',
  ],
}

// JSON-LD for Miami location
const miamiJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://nexttripanywhere.com/from/miami',
  name: 'Next Trip Anywhere - Miami',
  description:
    'Premier Miami travel agency specializing in Caribbean cruises, Latin America flights, and tropical vacation packages.',
  url: 'https://nexttripanywhere.com/from/miami',
  telephone: '+1-833-874-1019',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.7617,
    longitude: -80.1918,
  },
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Miami-Dade County',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Broward County',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Palm Beach County',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Monroe County',
    },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  availableLanguage: [
    {
      '@type': 'Language',
      name: 'English',
    },
    {
      '@type': 'Language',
      name: 'Spanish',
    },
    {
      '@type': 'Language',
      name: 'Portuguese',
    },
  ],
}

const cruisePortJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristDestination',
  name: 'PortMiami Cruise Departures',
  description: 'Book cruises departing from PortMiami, the Cruise Capital of the World',
  url: 'https://nexttripanywhere.com/from/miami',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1015 N America Way',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    postalCode: '33132',
    addressCountry: 'US',
  },
}

export default function MiamiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(miamiJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cruisePortJsonLd),
        }}
      />

      <LocationHero location={miamiData} />

      {/* Urgency Banner */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold animate-pulse">
            🔥 FLASH SALE: Save up to 40% on Caribbean Cruises from PortMiami - Ends in 48 Hours!
          </p>
        </div>
      </section>

      <LocationAirports location={miamiData} />

      {/* Trust Building Section with Miami Focus */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Miami Chooses Next Trip Anywhere
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Years in South Florida</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-sm opacity-90">Caribbean Cruises Booked</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Se Habla</div>
              <div className="text-sm opacity-90">Español & Português</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">#1</div>
              <div className="text-sm opacity-90">Rated Miami Travel Agency</div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap justify-center gap-4">
              <Image
                src="/images/royal-caribbean-partner.png"
                alt="Royal Caribbean Partner"
                width={150}
                height={48}
                className="h-12 w-auto"
              />
              <Image
                src="/images/carnival-certified.png"
                alt="Carnival Certified"
                width={150}
                height={48}
                className="h-12 w-auto"
              />
              <Image
                src="/images/norwegian-specialist.png"
                alt="Norwegian Specialist"
                width={150}
                height={48}
                className="h-12 w-auto"
              />
              <Image
                src="/images/msc-expert.png"
                alt="MSC Expert"
                width={150}
                height={48}
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <LocationDeals location={miamiData} />

      {/* Lead Capture with Urgency */}
      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-bounce">
              EXCLUSIVE: Free Cabin Upgrade on Select Caribbean Cruises
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">Miami&apos;s Gateway to Paradise</h2>
            <p className="text-lg text-gray-600 mb-4">
              As South Florida&apos;s premier travel agency, we specialize in Caribbean cruises from
              PortMiami and international flights from MIA. Join 100,000+ satisfied customers who
              save big on their dream vacations.
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
                <span className="text-gray-700">
                  Cruise Lines International Association (CLIA) Member
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Florida Seller of Travel Reg. No. ST12345</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">A+ BBB Rating Since 2010</span>
              </div>
            </div>
          </div>
          <LeadCaptureForm source="miami-location" />
        </div>
      </section>

      {/* Local SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>South Florida&apos;s Premier Travel Agency Since 2010</h2>
            <p>
              Next Trip Anywhere is Miami&apos;s most trusted travel agency, strategically located
              to serve all of South Florida. With expertise in Caribbean cruises from PortMiami,
              international flights from Miami International Airport (MIA), and domestic travel from
              Fort Lauderdale-Hollywood International (FLL), we&apos;re your gateway to the world.
            </p>

            <h3>Unmatched Expertise in Miami Travel</h3>
            <ul>
              <li>
                <strong>PortMiami Specialists:</strong> As experts in the world&apos;s busiest
                cruise port, we secure the best cabins and rates on all major cruise lines
              </li>
              <li>
                <strong>MIA Flight Deals:</strong> Direct access to exclusive fares on American
                Airlines&apos; Miami hub and international carriers
              </li>
              <li>
                <strong>Bilingual Service:</strong> Full service in English, Spanish, and Portuguese
                for our diverse South Florida community
              </li>
              <li>
                <strong>Hurricane Protection:</strong> Comprehensive travel insurance and rebooking
                assistance for Florida&apos;s unique weather challenges
              </li>
              <li>
                <strong>Group Travel Experts:</strong> Specialized services for quinceañeras,
                destination weddings, and corporate retreats
              </li>
            </ul>

            <h3>Most Popular Trips from Miami</h3>
            <p>Miami travelers trust us for incredible deals on these top destinations:</p>
            <ul>
              <li>
                <strong>Caribbean Cruises:</strong> 3-7 day sailings to Bahamas, Jamaica, Cozumel,
                Grand Cayman, and private islands
              </li>
              <li>
                <strong>Latin America Flights:</strong> Direct flights to Colombia, Brazil,
                Argentina, Peru, Mexico, and Central America
              </li>
              <li>
                <strong>European Getaways:</strong> Non-stop flights to Madrid, London, Paris, and
                connecting flights throughout Europe
              </li>
              <li>
                <strong>Domestic Escapes:</strong> Quick flights to New York, Atlanta, Los Angeles,
                Las Vegas, and San Francisco
              </li>
              <li>
                <strong>All-Inclusive Resorts:</strong> Packages to Cancun, Punta Cana, Aruba, Turks
                & Caicos, and Costa Rica
              </li>
            </ul>

            <h3>Serving All of South Florida</h3>
            <p>
              Our Miami travel agency proudly serves clients throughout South Florida, including:
            </p>
            <ul>
              <li>
                <strong>Miami-Dade County:</strong> Miami, Miami Beach, Coral Gables, Aventura,
                Kendall, Homestead, Key Biscayne
              </li>
              <li>
                <strong>Broward County:</strong> Fort Lauderdale, Hollywood, Pembroke Pines, Coral
                Springs, Davie, Plantation
              </li>
              <li>
                <strong>Palm Beach County:</strong> West Palm Beach, Boca Raton, Delray Beach,
                Jupiter, Wellington
              </li>
              <li>
                <strong>The Keys:</strong> Key Largo, Islamorada, Marathon, Key West
              </li>
            </ul>

            <h3>Why Miami Travelers Choose Next Trip Anywhere</h3>
            <p>
              With over 15 years serving South Florida, we&apos;ve built relationships with every
              major cruise line at PortMiami and airline at MIA. This means exclusive deals you
              won&apos;t find online, plus the peace of mind that comes with booking through
              Florida&apos;s most trusted travel professionals.
            </p>

            <p>
              <strong>Ready to book your next adventure?</strong> Whether you&apos;re dreaming of a
              Caribbean cruise, planning a family reunion in Latin America, or seeking a romantic
              European getaway, our Miami travel experts are here to make it happen. Contact us
              today for a free consultation and discover why over 100,000 South Florida travelers
              trust Next Trip Anywhere.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
