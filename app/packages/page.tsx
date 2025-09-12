import { Metadata } from 'next'
import PackageHero from '@/components/services/PackageHero'
import PackageCategories from '@/components/services/PackageCategories'
import PackageDeals from '@/components/services/PackageDeals'
import {
  ServiceSchema,
  BreadcrumbSchema,
  FAQSchema,
  TripSchema,
  TourSchema,
  ProductSchema,
  AggregateRatingSchema
} from '@/components/seo/StructuredData'
import { VACATION_PACKAGES, getFeaturedPackages, VacationPackage } from '@/lib/data/vacation-packages'
import { Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'All-Inclusive Vacation Packages from $599 | East Coast Departures',
  description:
    'Bundle & save up to 50% on all-inclusive vacation packages from NYC, Boston, Miami & DC. Caribbean resorts, European tours, Disney packages. Flights + hotels + meals included!',
  keywords:
    'all inclusive vacations, vacation packages, Caribbean packages, Mexico resorts, European tours, Disney packages, honeymoon packages, family vacations, beach resorts',
  openGraph: {
    title: 'All-Inclusive Vacation Packages | Save up to 50%',
    description:
      'Everything included: flights, hotels, meals, drinks & more. Expert planning from East Coast.',
    url: 'https://nexttripanywhere.com/packages',
    images: [
      {
        url: 'https://nexttripanywhere.com/images/packages-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'All-Inclusive Vacation Packages',
      },
    ],
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com/packages',
  },
}

// Get package data for schema markup
const featuredPackages = getFeaturedPackages()
const samplePackage = VACATION_PACKAGES.length > 0 ? VACATION_PACKAGES[0] : null
const tourPackage = VACATION_PACKAGES.length > 1 ? VACATION_PACKAGES[1] : null

// Schema markup data
const breadcrumbs = [
  { name: 'Home', url: 'https://nexttripanywhere.com' },
  { name: 'Vacation Packages', url: 'https://nexttripanywhere.com/packages' },
]

const packageFAQs = [
  {
    question: 'What is included in an all-inclusive vacation package?',
    answer: 'Our all-inclusive packages typically include round-trip flights, airport transfers, hotel accommodations, all meals and drinks (including alcohol at most resorts), entertainment, activities, and gratuities. Some packages also include spa credits, excursions, and water sports.',
  },
  {
    question: 'How much can I save by booking a package vs. separately?',
    answer: 'Vacation packages typically save 20-50% compared to booking components separately. We have exclusive contracts with resorts and airlines that provide bulk discounts not available to individuals. Plus, many resorts offer free nights and upgrades only available through packages.',
  },
  {
    question: 'Can you customize vacation packages?',
    answer: 'Absolutely! While we offer pre-designed packages, we specialize in creating custom vacations. We can adjust length of stay, upgrade rooms, add excursions, arrange special celebrations, and accommodate dietary restrictions or accessibility needs.',
  },
  {
    question: 'Do vacation packages include travel insurance?',
    answer: 'Travel insurance is available as an add-on to all packages and we highly recommend it. Our insurance options cover trip cancellation, medical emergencies, baggage protection, and travel delays. We offer competitive rates from multiple providers.',
  },
  {
    question: 'What payment options are available for vacation packages?',
    answer: 'We offer flexible payment options including full payment upfront, monthly payment plans, and low deposits to hold your vacation. Most packages can be secured with just $99 per person deposit, with final payment due 45-60 days before departure.',
  },
]

const packageRating = {
  ratingValue: 4.8,
  reviewCount: 3247,
  bestRating: 5,
  worstRating: 1,
}

// Transform vacation package to Trip schema data
const transformPackageToTrip = (pkg: VacationPackage) => ({
  name: pkg.name,
  description: pkg.description,
  destination: pkg.destination,
  duration: pkg.duration,
  price: pkg.price,
  currency: pkg.currency,
  includes: pkg.includes,
  itinerary: pkg.itinerary,
  image: pkg.image,
})

// Transform vacation package to Tour schema data
const transformPackageToTour = (pkg: VacationPackage) => ({
  name: pkg.name,
  description: pkg.description,
  provider: 'Next Trip Anywhere',
  duration: `${pkg.duration} days`,
  language: ['en', 'es'],
  price: pkg.price,
  currency: pkg.currency,
  includes: pkg.includes,
  meetingPoint: 'Departure airport',
  image: pkg.image,
})

export default function PackagesPage() {
  return (
    <>
      {/* Comprehensive Schema Markup */}
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema service="packages" />
      <FAQSchema faqs={packageFAQs} />
      <AggregateRatingSchema rating={packageRating} />
      
      {/* Featured Package Schemas */}
      {samplePackage && <TripSchema trip={transformPackageToTrip(samplePackage)} />}
      {tourPackage && <TourSchema tour={transformPackageToTour(tourPackage)} />}
      
      {/* Individual Package Product Schemas */}
      {featuredPackages.slice(0, 3).map((pkg, index) => (
        <ProductSchema
          key={`package-${index}`}
          product={{
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            priceCurrency: pkg.currency || 'USD',
            availability: pkg.availability === 'InStock' ? 'InStock' : pkg.availability === 'OutOfStock' ? 'OutOfStock' : 'PreOrder',
            validFrom: pkg.validFrom,
            validThrough: pkg.validUntil,
            destination: pkg.destination,
            image: pkg.image,
          }}
        />
      ))}

      <PackageHero />

      {/* Limited Time Offers */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="text-2xl font-bold">🏝️ WINTER SPECIAL</span>
            <span className="text-lg">Save $500+ on Caribbean All-Inclusives</span>
            <span className="bg-white text-orange-500 px-4 py-1 rounded-full font-bold animate-pulse">
              Book by Friday!
            </span>
          </div>
        </div>
      </section>

      <PackageCategories />

      {/* Why Package with Us */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-navy mb-12">
            Why Smart Travelers Choose Vacation Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-navy mb-2">Competitive Packages</h3>
              <p className="text-gray-600">
                Bundling flights, hotels, and extras often provides savings compared to booking separately.
                Our industry connections help find competitive rates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-navy mb-2">One Price, No Surprises</h3>
              <p className="text-gray-600">
                Know your total vacation cost upfront. All meals, drinks, tips, and activities
                included means no unexpected expenses.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-navy mb-2">Worry-Free Travel</h3>
              <p className="text-gray-600">
                Everything is coordinated and confirmed. Plus, package bookings get priority
                assistance if anything changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PackageDeals />

      {/* Lead Capture with Urgency */}
      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              PROFESSIONAL: Expert Travel Planning Available
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">Your Dream Vacation Awaits</h2>
            <p className="text-lg text-gray-600 mb-6">
              From romantic honeymoons to family adventures, we create vacation packages
              designed to provide value and eliminate stress. Let our experts handle every detail.
            </p>

            {/* Package Benefits */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-3xl mx-auto">
              <h3 className="font-bold text-navy mb-4">Every Package Includes:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Round-trip flights from your city</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Premium hotel accommodations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Airport transfers both ways</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>All meals and snacks</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Unlimited drinks (including alcohol)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Daily activities and entertainment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Taxes and gratuities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>24/7 travel support</span>
                  </div>
                </div>
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

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2>All-Inclusive Vacation Packages from East Coast Cities</h2>
            <p>
              Next Trip Anywhere specializes in creating unforgettable vacation packages that take
              the stress out of travel planning while saving you significant money. Our
              all-inclusive packages from New York, Boston, Miami, and Washington DC combine
              flights, accommodations, meals, and activities into one unbeatable price.
            </p>

            <h3>Popular Package Destinations</h3>
            <p>Our East Coast travelers love these incredible package destinations:</p>
            <ul>
              <li>
                <strong>Caribbean All-Inclusives:</strong> Turks & Caicos, Jamaica, Dominican
                Republic, Aruba, and Mexico&apos;s Riviera Maya
              </li>
              <li>
                <strong>European Tours:</strong> Italy, Greece, Spain, France, and multi-country
                adventures
              </li>
              <li>
                <strong>Disney Vacations:</strong> Walt Disney World, Disneyland, and Disney Cruise
                packages
              </li>
              <li>
                <strong>Hawaii Packages:</strong> Maui, Oahu, Kauai, and Big Island with
                inter-island flights
              </li>
              <li>
                <strong>Exotic Escapes:</strong> Bali, Thailand, Costa Rica, and African safaris
              </li>
              <li>
                <strong>Ski Packages:</strong> Colorado, Utah, Vermont, and European Alps
              </li>
            </ul>

            <h3>The All-Inclusive Advantage</h3>
            <p>
              When you book an all-inclusive package through Next Trip Anywhere, you&apos;re getting
              far more than just convenience:
            </p>
            <ul>
              <li>
                <strong>Massive Savings:</strong> Our packages save 20-50% compared to booking
                separately
              </li>
              <li>
                <strong>No Hidden Costs:</strong> One price covers everything - no surprise expenses
                on vacation
              </li>
              <li>
                <strong>VIP Treatment:</strong> Room upgrades, resort credits, and perks not
                available to other guests
              </li>
              <li>
                <strong>Peace of Mind:</strong> Everything is confirmed and coordinated before you
                leave
              </li>
              <li>
                <strong>Group Benefits:</strong> Special rates and perks for weddings, reunions, and
                celebrations
              </li>
            </ul>

            <h3>Customized Packages for Every Traveler</h3>
            <p>
              While we offer incredible pre-designed packages, we excel at creating custom vacations
              tailored to your specific needs:
            </p>
            <ul>
              <li>
                <strong>Honeymoons:</strong> Romantic escapes with special amenities and privacy
              </li>
              <li>
                <strong>Family Vacations:</strong> Kid-friendly resorts with activities for all ages
              </li>
              <li>
                <strong>Adventure Packages:</strong> Active vacations with excursions and
                experiences
              </li>
              <li>
                <strong>Luxury Escapes:</strong> 5-star resorts with premium inclusions
              </li>
              <li>
                <strong>Budget Packages:</strong> Maximum value without sacrificing quality
              </li>
            </ul>

            <h3>Why Book Packages with Next Trip Anywhere?</h3>
            <p>
              As East Coast package specialists, we have exclusive contracts with resorts and
              airlines that provide benefits you can&apos;t get anywhere else. Our team personally
              visits resorts, knows which rooms have the best views, and can arrange special
              celebrations or dietary accommodations. Plus, our packages are financially protected
              and include 24/7 support throughout your vacation.
            </p>

            <h3>Start Planning Your Perfect Vacation Package</h3>
            <p>
              Whether you&apos;re dreaming of toes in the sand at a Caribbean resort, exploring
              ancient ruins in Europe, or creating magical memories at Disney, we&apos;ll design the
              perfect package at an unbeatable price. Contact our vacation specialists today for a
              free consultation and discover how much you can save on your next all-inclusive
              getaway.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">Expert</div>
              <div className="text-sm text-gray-600">Travel Planning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">Best</div>
              <div className="text-sm text-gray-600">Price Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">100%</div>
              <div className="text-sm text-gray-600">Protected Travel</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">24/7</div>
              <div className="text-sm text-gray-600">Expert Support</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
