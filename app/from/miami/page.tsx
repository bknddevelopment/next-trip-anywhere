import { Metadata } from 'next'
import Image from 'next/image'
import LocationHero from '@/components/locations/LocationHero'
import LocationDeals from '@/components/locations/LocationDeals'
import LocationAirports from '@/components/locations/LocationAirports'
import { 
  LocalBusinessSchema, 
  BreadcrumbSchema, 
  FAQSchema, 
  AggregateRatingSchema,
  TravelDealSchema
} from '@/components/seo/StructuredData'
import { getLocationData } from '@/lib/data/locations'
import { getDealsByDestination } from '@/lib/data/travel-deals'
import { Phone, Mail } from 'lucide-react'

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

// Get structured data
const locationData = getLocationData('miami')
const miamiDeals = getDealsByDestination('Miami')

// Schema markup data
const breadcrumbs = [
  { name: 'Home', url: 'https://nexttripanywhere.com' },
  { name: 'From Miami', url: 'https://nexttripanywhere.com/from/miami' },
]

const miamiLocationFAQs = [
  {
    question: 'What airports serve the Miami area?',
    answer: 'Miami is served by three major airports: Miami International Airport (MIA) - the primary hub, Fort Lauderdale-Hollywood International (FLL) - 28 miles north, and Palm Beach International (PBI) - 70 miles north. We provide expert booking from all three airports.',
  },
  {
    question: 'Which cruise ports operate in South Florida?',
    answer: 'PortMiami is the world\'s busiest cruise port, followed by Port Everglades in Fort Lauderdale, and Port of Palm Beach. We specialize in securing the best cabin categories and onboard credits from all South Florida cruise terminals.',
  },
  {
    question: 'What languages do you speak at your Miami location?',
    answer: 'Our Miami travel specialists are fluent in English, Spanish, and Portuguese to serve South Florida\'s diverse community. We understand the unique travel needs of our multicultural clientele.',
  },
  {
    question: 'Do you offer hurricane protection for Florida travelers?',
    answer: 'Yes! We provide comprehensive travel insurance specifically designed for Florida residents, including hurricane and named storm coverage. We also offer flexible rebooking policies during severe weather events.',
  },
  {
    question: 'What are the most popular destinations from Miami?',
    answer: 'From Miami, the most popular destinations include Caribbean cruises (Bahamas, Jamaica, Cozumel), Latin America flights (Colombia, Brazil, Argentina), European getaways (Madrid, London, Paris), and all-inclusive resorts (Cancun, Punta Cana, Aruba).',
  },
]

const miamiRating = {
  ratingValue: 4.9,
  reviewCount: 2847,
  bestRating: 5,
  worstRating: 1,
}

export default function MiamiPage() {
  return (
    <>
      {/* Comprehensive Schema Markup for Miami Location */}
      <BreadcrumbSchema items={breadcrumbs} />
      {locationData && <LocalBusinessSchema location={locationData} />}
      <FAQSchema faqs={miamiLocationFAQs} />
      <AggregateRatingSchema rating={miamiRating} />
      
      {/* Miami-specific Travel Deals Schema */}
      {miamiDeals.slice(0, 3).map((deal, index) => (
        <TravelDealSchema key={`miami-deal-${index}`} deal={deal} />
      ))}

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
          {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-navy mb-4">
                Ready to Book Your Trip?
              </h3>
              <p className="text-gray-700 mb-6">
                Our expert travel agents are standing by to help you find the best deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1-833-874-1019"
                  className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 1-833-874-1019
                </a>
                <a
                  href="mailto:info@nexttripanywhere.com"
                  className="inline-flex items-center justify-center bg-secondary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-secondary-700 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email for Quote
                </a>
              </div>
            </div>
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
