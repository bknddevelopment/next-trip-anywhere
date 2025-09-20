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

export const metadata: Metadata = {
  title: "America's Premier Travel Agency | Save up to 40% on Flights, Cruises & Vacations",
  description:
    'Award-winning nationwide travel agency offering exclusive deals on flights, cruises & vacation packages from all major US cities. 24/7 support, expert travel planning. Book now & save!',
  keywords:
    'nationwide travel agency, cheap flights from all US cities, cruise deals, vacation packages, travel deals, best travel agency, discount cruises, all-inclusive vacations, flight deals, travel agent near me, coast to coast travel',
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

      {/* Trust Indicators Bar with semantic HTML */}
      <section className="bg-navy text-white py-4" aria-label="Trust Indicators">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <img
                src="/images/badges/experience-badge.svg"
                alt="15+ Years Experience"
                className="w-8 h-8"
              />
              15+ Years Experience
            </span>
            <span className="flex items-center gap-2">
              <img
                src="/images/badges/licensed-badge.svg"
                alt="Licensed & Bonded"
                className="w-8 h-8"
              />
              Licensed & Bonded
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              100% Satisfaction
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              24/7 Support
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

      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg m-4" />}>
        <WhyChooseUs />
      </Suspense>

      {/* Enhanced Visual SEO Content Section */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 m-4" />}>
        <TrustedAgencySection />
      </Suspense>

      {/* Detailed Trust Section */}
      <DetailedTrustSection />

      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-48 rounded-lg m-4" />}>
        <CTASection />
      </Suspense>

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </>
  )
}
