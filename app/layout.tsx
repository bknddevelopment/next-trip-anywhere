/**
 * @fileoverview Root layout component for Next Trip Anywhere application
 * @module RootLayout
 *
 * 🎯 PURPOSE:
 * This is the main layout wrapper for the entire Next Trip Anywhere application.
 * It sets up fonts, metadata, SEO, structured data, error boundaries, and global UI components.
 *
 * 🧒 SIMPLE EXPLANATION:
 * Think of this file like the frame of a house - it provides the basic structure
 * that every page in our website sits inside. It includes the header (top navigation),
 * footer (bottom info), and wraps everything with helpful tools.
 *
 * 🏗️ ARCHITECTURE:
 * RootLayout
 * ├── HTML Structure (with SEO metadata)
 * ├── Font Configuration (Inter & Montserrat)
 * ├── Service Worker (for offline support)
 * ├── Performance Monitor (tracks site speed)
 * ├── Error Boundary (catches crashes)
 * ├── Header (navigation)
 * ├── Main Content (your page goes here)
 * ├── Footer (contact & links)
 * └── Toast Notifications (success/error messages)
 *
 * @example
 * // This layout is automatically applied to all pages
 * // Pages are rendered as {children} inside the main element
 * // No manual usage required - Next.js handles this automatically
 */

import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import CoreWebVitalsMonitor from '@/components/CoreWebVitalsMonitor'
import ErrorBoundary from '@/components/ErrorBoundary'
import { initFontOptimizations } from '@/lib/fontOptimization'
import GoogleTagManager from '@/components/analytics/GoogleTagManager'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import CookieConsent from '@/components/analytics/CookieConsent'
import SearchConsole from '@/components/analytics/SearchConsole'

/**
 * Inter font configuration - Primary font for body text
 *
 * @description
 * Inter is a highly legible sans-serif font optimized for screens.
 * We use it for all body text and UI elements for maximum readability.
 *
 * Features:
 * - Variable font for smooth weight transitions
 * - Display swap for faster initial load
 * - Comprehensive fallback chain for compatibility
 *
 * @see https://fonts.google.com/specimen/Inter
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Shows fallback font immediately while loading
  preload: true, // Prioritizes font loading
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
})

/**
 * Montserrat font configuration - Display font for headings
 *
 * @description
 * Montserrat is a geometric sans-serif font that adds personality to headings.
 * Multiple weights allow for visual hierarchy in our design system.
 *
 * Weight usage:
 * - 400: Regular body text (rarely used)
 * - 500: Subheadings
 * - 600: Section headings
 * - 700: Main headings
 * - 800: Hero text and CTAs
 *
 * @see https://fonts.google.com/specimen/Montserrat
 */
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

/**
 * SEO Metadata configuration
 *
 * @description
 * Comprehensive metadata setup for search engines and social media platforms.
 * This metadata is used as the default for all pages unless overridden.
 *
 * Includes:
 * - Basic SEO tags (title, description, keywords)
 * - Open Graph tags (Facebook, LinkedIn)
 * - Twitter Card tags
 * - Robot crawling instructions
 * - Favicon configuration
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://nexttripanywhere.com'),
  title: {
    default:
      "Next Trip Anywhere - America's Premier Travel Agency | Coast-to-Coast Travel Services",
    template: '%s | Next Trip Anywhere', // Used for dynamic page titles
  },
  description:
    'Plan your perfect getaway with Next Trip Anywhere. Expert travel planning for flights, cruises, and vacation packages from all major US cities nationwide. Get personalized deals today!',
  keywords: [
    'travel agency',
    'flights',
    'cruises',
    'vacation packages',
    'nationwide travel',
    'coast to coast travel',
    'NYC travel',
    'LA travel',
    'Chicago travel',
    'Seattle travel',
    'Boston travel',
    'Miami travel',
    'DC travel',
  ],
  alternates: {
    canonical: 'https://nexttripanywhere.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
      'facebook-domain-verification': 'your-facebook-verification-code',
    },
  },
  authors: [{ name: 'Next Trip Anywhere' }],
  creator: 'Next Trip Anywhere',
  publisher: 'Next Trip Anywhere',
  formatDetection: {
    email: false, // Prevents auto-linking of email-like text
    address: false, // Prevents auto-linking of address-like text
    telephone: false, // Prevents auto-linking of phone numbers
  },
  openGraph: {
    title: "Next Trip Anywhere - America's Premier Travel Agency",
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
    card: 'summary_large_image', // Large preview card with image
    title: 'Next Trip Anywhere - Nationwide Travel Agency',
    description:
      'Expert travel planning for flights, cruises, and vacation packages from all major US cities nationwide.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Allow search engines to follow links
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1, // No limit on video preview length
      'max-image-preview': 'large', // Allow large image previews
      'max-snippet': -1, // No limit on text snippet length
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest', // PWA manifest file
}

/**
 * Enhanced JSON-LD Structured Data - Organization Schema
 *
 * @description
 * Comprehensive structured data for Next Trip Anywhere as a TravelAgency.
 * Includes complete business information, service areas, ratings, and offerings.
 *
 * Benefits:
 * - Rich snippets in search results
 * - Knowledge panel eligibility
 * - Voice search optimization
 * - Enhanced local SEO
 * - Review stars in search results
 *
 * @see https://schema.org/TravelAgency
 */
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': 'https://nexttripanywhere.com/#organization',
  name: 'Next Trip Anywhere',
  alternateName: 'NTA Travel',
  url: 'https://nexttripanywhere.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://nexttripanywhere.com/logo.png',
    width: 250,
    height: 60,
  },
  image: 'https://nexttripanywhere.com/og-image.jpg',
  description:
    "America's premier travel agency specializing in flights, cruises, and vacation packages from major US cities nationwide. Expert travel planning with exclusive deals and 24/7 support since 2010.",
  foundingDate: '2010',
  foundingLocation: {
    '@type': 'Place',
    name: 'United States',
  },
  slogan: 'Your trusted travel experts nationwide',
  telephone: '+1-833-874-1019',
  email: 'info@nexttripanywhere.com',
  faxNumber: '+1-833-874-1020',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressRegion: 'Nationwide Service',
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'United States',
    },
    {
      '@type': 'State',
      name: 'New York',
    },
    {
      '@type': 'State',
      name: 'California',
    },
    {
      '@type': 'State',
      name: 'Florida',
    },
    {
      '@type': 'State',
      name: 'Illinois',
    },
    {
      '@type': 'State',
      name: 'Massachusetts',
    },
    {
      '@type': 'State',
      name: 'Texas',
    },
    {
      '@type': 'State',
      name: 'Washington',
    },
    {
      '@type': 'State',
      name: 'Colorado',
    },
  ],
  serviceArea: {
    '@type': 'Country',
    name: 'United States',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+1-833-874-1019',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish', 'French'],
      contactOption: ['TollFree', 'HearingImpairedSupported'],
      hoursAvailable: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '06:00',
          closes: '23:00',
          timeZone: 'America/New_York',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday'],
          opens: '07:00',
          closes: '22:00',
          timeZone: 'America/New_York',
        },
      ],
    },
    {
      '@type': 'ContactPoint',
      email: 'info@nexttripanywhere.com',
      contactType: 'customer service',
      areaServed: 'US',
    },
    {
      '@type': 'ContactPoint',
      email: 'groups@nexttripanywhere.com',
      contactType: 'reservations',
      areaServed: 'US',
    },
  ],
  sameAs: [
    'https://www.facebook.com/nexttripanywhere',
    'https://www.instagram.com/nexttripanywhere',
    'https://www.twitter.com/nexttripanywhere',
    'https://www.linkedin.com/company/nexttripanywhere',
    'https://www.youtube.com/nexttripanywhere',
  ],
  priceRange: '$$',
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'],
  currenciesAccepted: 'USD',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '3,247',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Sarah Johnson',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
      },
      reviewBody: 'Exceptional service! They saved us hundreds on our European vacation and handled everything perfectly.',
      datePublished: '2024-01-10',
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Michael Chen',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
      },
      reviewBody: 'Best travel agency ever! Their cruise deals are unbeatable and customer service is outstanding.',
      datePublished: '2024-01-08',
    },
  ],
  award: [
    'Best Travel Agency 2024',
    'Top Customer Service Award',
    'Exclusive Airline Partnership Award',
    'Travel Industry Excellence Award',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Travel Services Catalog',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Flight Booking Services',
          description: 'Domestic and international flight reservations with exclusive unpublished fares',
          category: 'Flight Booking',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          price: '0',
          description: 'No booking fees',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cruise Packages',
          description: 'Caribbean, Mediterranean, Alaska, and worldwide cruise packages',
          category: 'Cruise Booking',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          price: '0',
          description: 'No booking fees plus exclusive onboard credits',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Vacation Packages',
          description: 'All-inclusive resort packages and custom tour itineraries',
          category: 'Vacation Planning',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          price: '0',
          description: 'Complimentary vacation planning services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Group Travel',
          description: 'Customized group travel planning for 10+ travelers',
          category: 'Group Travel',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate Travel',
          description: 'Business travel management and corporate rates',
          category: 'Business Travel',
        },
      },
    ],
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '50-100',
  },
  knowsAbout: [
    'Flight booking',
    'Cruise planning',
    'Vacation packages',
    'Group travel coordination',
    'Honeymoon planning',
    'Business travel management',
    'International travel documentation',
    'Travel insurance',
    'Destination weddings',
    'Adventure tours',
  ],
  memberOf: [
    {
      '@type': 'Organization',
      name: 'American Society of Travel Advisors',
      alternateName: 'ASTA',
    },
    {
      '@type': 'Organization',
      name: 'Cruise Lines International Association',
      alternateName: 'CLIA',
    },
  ],
}

/**
 * JSON-LD Structured Data - Website Schema
 *
 * @description
 * Defines the website structure and search capabilities.
 * Enables search box in Google search results (sitelinks searchbox).
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 */
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

/**
 * Root Layout Component
 *
 * @component
 * @description
 * The main layout wrapper for the entire Next.js application.
 * This component is rendered once and wraps all pages.
 *
 * Key responsibilities:
 * 1. Sets up global fonts and styles
 * 2. Injects SEO metadata and structured data
 * 3. Registers service worker for PWA functionality
 * 4. Monitors performance metrics
 * 5. Provides error boundary for crash protection
 * 6. Renders persistent UI (header, footer, notifications)
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to be rendered
 *
 * @returns {JSX.Element} Complete HTML document structure
 *
 * @example
 * // This component is used automatically by Next.js
 * // Pages are passed as children
 * <RootLayout>
 *   <HomePage />
 * </RootLayout>
 *
 * @performance
 * - Fonts use display: swap for faster initial paint
 * - Service worker enables offline functionality
 * - Performance monitor tracks Core Web Vitals
 *
 * @accessibility
 * - Semantic HTML structure
 * - Proper language attribute (lang="en")
 * - Skip navigation links in Header component
 * - ARIA landmarks for screen readers
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize font optimizations on mount
  if (typeof window !== 'undefined') {
    initFontOptimizations()
  }
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.coverr.co" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Logo fix script for GitHub Pages deployment */}
        <script src="/next-trip-anywhere/logo-fix.js" defer />
        
        {/* Google Search Console verification and structured data */}
        <SearchConsole />

        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for initial render */
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            .hero-section { min-height: 100vh; position: relative; }
            .animate-fade-in { animation: fadeIn 0.5s ease-in; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          `
        }} />

        {/* Structured data for SEO */}
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
        {/* Progressive Web App service worker registration */}
        <ServiceWorkerRegistration />

        {/* Performance monitoring for Core Web Vitals */}
        <PerformanceMonitor />
        <CoreWebVitalsMonitor />

        {/* Analytics and Tracking */}
        <GoogleTagManager />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>

        {/* Error boundary to catch and handle runtime errors */}
        <ErrorBoundary>
          {/* Site header with navigation */}
          <Header />

          {/* Main content area where pages are rendered */}
          <main className="flex-1">{children}</main>

          {/* Site footer with links and contact info */}
          <Footer />
        </ErrorBoundary>

        {/* Toast notification system for user feedback */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000, // Show notifications for 4 seconds
            style: {
              background: '#1E3A5F', // Brand navy color
              color: '#fff',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#7FBF4D', // Brand green for success
                secondary: '#fff',
              },
            },
          }}
        />
        
        {/* GDPR Cookie Consent */}
        <CookieConsent />
      </body>
    </html>
  )
}
