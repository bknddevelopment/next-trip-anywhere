import dynamic from 'next/dynamic'
import { Suspense } from 'react'
// Using the performant hero section with optimized images
import HeroSectionPerformant from '@/components/home/HeroSectionPerformant'
import { Metadata } from 'next'
import ExitIntentPopup from '@/components/marketing/ExitIntentPopup'
import { DetailedTrustSection } from '@/components/ui/TrustSignals'

// Lazy load heavy components with optimized settings
const DestinationCards = dynamic(() => import('@/components/home/DestinationCards'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg m-4" />,
})

const WhyChooseUs = dynamic(() => import('@/components/home/WhyChooseUs'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg m-4" />,
})

const CTASection = dynamic(() => import('@/components/home/CTASection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded-lg m-4" />,
})

const TrustedAgencySection = dynamic(() => import('@/components/home/TrustedAgencySection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg m-4" />,
})

const LegitTrustBadges = dynamic(() => import('@/components/home/LegitTrustBadges'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg m-4" />,
})

const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg m-4" />,
})

export const metadata: Metadata = {
  title: 'Travel Agency | Flights, Cruises & Vacations | Next Trip Anywhere',
  description:
    'Expert travel planning nationwide. Flights, cruises & vacation packages from all US cities. 15+ years experience. Direct cruise line partnerships. 24/7 support. Call 833-874-1019.',
  keywords:
    'travel agency, nationwide travel services, cruise deals, vacation packages, flight booking, all-inclusive resorts, travel planning, professional travel agent, cruise specialists, vacation experts',
  openGraph: {
    title: 'Next Trip Anywhere - Nationwide Travel Agency',
    description:
      'Save up to 40% on your next vacation! Expert travel planning with exclusive deals from coast to coast. Free consultation available.',
    type: 'website',
    url: 'https://nexttripanywhere.com',
    images: [
      {
        url: 'https://nexttripanywhere.com/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Next Trip Anywhere - Your Nationwide Travel Experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Save Big on Travel Nationwide | Next Trip Anywhere',
    description:
      'Exclusive deals on flights, cruises & vacations from all major US cities. Book now & save up to 40%!',
  },
  alternates: {
    canonical: 'https://nexttripanywhere.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification',
    other: {
      'msvalidate.01': 'your-bing-verification',
    },
  },
}

// Homepage JSON-LD Structured Data
const homepageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://nexttripanywhere.com/#webpage',
  url: 'https://nexttripanywhere.com',
  name: "America's Premier Travel Agency | Next Trip Anywhere",
  isPartOf: {
    '@id': 'https://nexttripanywhere.com/#website',
  },
  about: {
    '@id': 'https://nexttripanywhere.com/#organization',
  },
  description:
    'Award-winning nationwide travel agency specializing in flights, cruises, and vacation packages from all major US cities coast to coast.',
  breadcrumb: {
    '@id': 'https://nexttripanywhere.com/#breadcrumb',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nexttripanywhere.com/#breadcrumb',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://nexttripanywhere.com',
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can Next Trip Anywhere help me save on travel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We leverage our industry connections and expertise to find competitive rates and add value through personalized service. Our travel agents work to find the best options within your budget and handle all the details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you charge booking fees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No! Our services are completely free. We earn commissions from our travel partners, so you pay the same or less than booking direct, plus you get our expert planning and 24/7 support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which airports do you serve nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve all major US airports nationwide including JFK, LGA, EWR (New York), Logan (Boston), MIA, FLL (South Florida), DCA, IAD, BWI (DC area), LAX, SFO (West Coast), ORD (Chicago), DEN (Denver), ATL (Atlanta), DFW (Dallas), and many more.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I need to cancel or change my trip?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We handle all changes and cancellations for you, often negotiating better terms than travelers can get on their own. We also offer comprehensive travel insurance to protect your investment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you available for emergency travel assistance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We provide 24/7 emergency support to all our clients. Whether you need help with a missed connection, lost luggage, or last-minute changes, we&apos;re always just a phone call away.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <HeroSectionPerformant />

      {/* Trust Indicators Bar - Professional Minimal Design */}
      <section className="bg-primary-500 text-white py-6" aria-label="Trust Indicators">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-medium">
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Since 2010</span>
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>ASTA Certified</span>
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>24/7 Support</span>
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Best Price Guarantee</span>
            </span>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg m-4" />}>
        <DestinationCards />
      </Suspense>

      {/* Services Section with structured data */}
      <section
        className="py-16 bg-gradient-to-r from-blue-50 to-teal-50"
        aria-label="Company Services"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-navy mb-12">
            Professional Travel Services Nationwide
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">Expert</div>
              <div className="text-gray-700">Travel Planning</div>
              <div className="text-sm text-gray-500 mt-1">Personalized Service</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-700">Support</div>
              <div className="text-sm text-gray-500 mt-1">Always Available</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">Exclusive</div>
              <div className="text-gray-700">Travel Deals</div>
              <div className="text-sm text-gray-500 mt-1">Insider Access</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">All</div>
              <div className="text-gray-700">Major Cities</div>
              <div className="text-sm text-gray-500 mt-1">Nationwide Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Consolidated Why Choose Us Section */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg m-4" />}>
        <WhyChooseUs />
      </Suspense>

      {/* Customer Testimonials */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg m-4" />}>
        <TestimonialsSection />
      </Suspense>

      {/* Nationwide Coverage Section (Consolidated from TrustedAgencySection) */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 m-4" />}>
        <TrustedAgencySection />
      </Suspense>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-48 rounded-lg m-4" />}>
        <CTASection />
      </Suspense>

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </>
  )
}
