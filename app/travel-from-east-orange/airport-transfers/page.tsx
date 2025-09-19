/**
 * East Orange Airport Transfers Service Page
 * Generated for Essex County SEO - Phase 4
 * Enhanced with comprehensive Newark Airport content
 */

import { Metadata } from 'next'
import NewarkAirportTransfer from '@/components/essex-county/NewarkAirportTransfer'
import { getEnhancedAirportServiceContent } from '@/lib/seo/newark-airport-service'

const cityName = 'East Orange'
const citySlug = 'east-orange'

// Get comprehensive Newark Airport content for metadata
const content = getEnhancedAirportServiceContent('airport-transfers', cityName)

export const metadata: Metadata = {
  title:
    content?.seoContent.metaTitle || `Airport Transfers in East Orange, NJ | Next Trip Anywhere`,
  description:
    content?.seoContent.metaDescription ||
    `Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports. Serving East Orange and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `airport-transfers East Orange`,
    `East Orange airport transfers`,
    'airport transfers',
    'Newark airport',
    'EWR transportation',
    'airport shuttle',
    'airport limo',
    'Newark Liberty International',
    'EWR transfers',
    'airport car service East Orange',
    `East Orange NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-east-orange/airport-transfers`,
  },
  openGraph: {
    title: `Airport Transfers in East Orange | Next Trip Anywhere`,
    description: `Professional airport transfers for East Orange residents. Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports.`,
    url: `https://nexttripanywhere.com/travel-from-east-orange/airport-transfers`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function EastOrangeAirportTransfersPage() {
  return <NewarkAirportTransfer cityName={cityName} citySlug={citySlug} />
}
