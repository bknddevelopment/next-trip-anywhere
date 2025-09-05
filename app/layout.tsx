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
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import ErrorBoundary from '@/components/ErrorBoundary'

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
    default: 'Next Trip Anywhere - East Coast Travel Agency | Flights, Cruises & Vacation Packages',
    template: '%s | Next Trip Anywhere', // Used for dynamic page titles
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
    email: false, // Prevents auto-linking of email-like text
    address: false, // Prevents auto-linking of address-like text
    telephone: false, // Prevents auto-linking of phone numbers
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
    card: 'summary_large_image', // Large preview card with image
    title: 'Next Trip Anywhere - East Coast Travel Agency',
    description:
      'Expert travel planning for flights, cruises, and vacation packages from NYC, Boston, Miami, and DC.',
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
 * JSON-LD Structured Data - Organization Schema
 *
 * @description
 * Structured data helps search engines understand our business.
 * This schema defines Next Trip Anywhere as a TravelAgency with:
 * - Service areas (NYC, Boston, Miami, DC)
 * - Contact information
 * - Social media profiles
 * - Service offerings
 *
 * Benefits:
 * - Rich snippets in search results
 * - Knowledge panel eligibility
 * - Voice search optimization
 * - Better local SEO
 *
 * @see https://schema.org/TravelAgency
 */
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Logo fix script for GitHub Pages deployment */}
        <script src="/next-trip-anywhere/logo-fix.js" defer />

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
      </body>
    </html>
  )
}
