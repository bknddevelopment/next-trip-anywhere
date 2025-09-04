import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nexttripanywhere.com'),
  title: {
    default: 'Next Trip Anywhere - East Coast Travel Agency | Flights, Cruises & Vacation Packages',
    template: '%s | Next Trip Anywhere',
  },
  description:
    'Plan your perfect getaway with Next Trip Anywhere. Expert travel planning for flights, cruises, and vacation packages from NYC, Boston, Miami, and DC. Get personalized deals today!',
  keywords: [
    'travel agency',
    'flights',
    'cruises',
    'vacation packages',
    'East Coast travel',
    'NYC travel',
    'Boston travel',
    'Miami travel',
    'DC travel',
  ],
  authors: [{ name: 'Next Trip Anywhere' }],
  creator: 'Next Trip Anywhere',
  publisher: 'Next Trip Anywhere',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Next Trip Anywhere - Your East Coast Travel Expert',
    description:
      'Plan your perfect getaway with Next Trip Anywhere. Expert travel planning for flights, cruises, and vacation packages.',
    url: 'https://nexttripanywhere.com',
    siteName: 'Next Trip Anywhere',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Next Trip Anywhere - Travel Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Trip Anywhere - East Coast Travel Agency',
    description:
      'Expert travel planning for flights, cruises, and vacation packages from NYC, Boston, Miami, and DC.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

// JSON-LD Structured Data
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Next Trip Anywhere',
  url: 'https://nexttripanywhere.com',
  logo: 'https://nexttripanywhere.com/logo.png',
  description:
    'East Coast premier travel agency specializing in flights, cruises, and vacation packages from NYC, Boston, Miami, and Washington DC.',
  foundingDate: '2015',
  areaServed: [
    {
      '@type': 'City',
      name: 'New York City',
    },
    {
      '@type': 'City',
      name: 'Boston',
    },
    {
      '@type': 'City',
      name: 'Miami',
    },
    {
      '@type': 'City',
      name: 'Washington DC',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+1-833-874-1019',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
      contactOption: 'TollFree',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
  ],
  sameAs: [
    'https://www.facebook.com/nexttripanywhere',
    'https://www.instagram.com/nexttripanywhere',
    'https://www.twitter.com/nexttripanywhere',
    'https://www.linkedin.com/company/nexttripanywhere',
  ],
  priceRange: '$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Travel Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Flight Booking',
          description: 'Domestic and international flight reservations',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cruise Packages',
          description: 'Caribbean, Mediterranean, and Alaska cruises',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Vacation Packages',
          description: 'All-inclusive resort and tour packages',
        },
      },
    ],
  },
}

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Next Trip Anywhere',
  url: 'https://nexttripanywhere.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://nexttripanywhere.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="/next-trip-anywhere/logo-fix.js" defer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased min-h-screen bg-warm-50`}
      >
        <ServiceWorkerRegistration />
        <PerformanceMonitor />
        <ErrorBoundary>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ErrorBoundary>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1E3A5F',
              color: '#fff',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#7FBF4D',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
