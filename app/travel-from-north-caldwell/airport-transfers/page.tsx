/**
 * North Caldwell Airport Transfers Service Page
 * Generated for Essex County SEO - Phase 4
 * Enhanced with comprehensive Newark Airport content
 */

import { Metadata } from 'next'
import NewarkAirportTransfer from '@/components/essex-county/NewarkAirportTransfer'
import { getEnhancedAirportServiceContent } from '@/lib/seo/newark-airport-service'

const cityName = 'North Caldwell'
const citySlug = 'north-caldwell'

// Get comprehensive Newark Airport content for metadata
const content = getEnhancedAirportServiceContent('airport-transfers', cityName)

export const metadata: Metadata = {
  title:
    content?.seoContent.metaTitle || `Airport Transfers in North Caldwell, NJ | Next Trip Anywhere`,
  description:
    content?.seoContent.metaDescription ||
    `Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports. Serving North Caldwell and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `airport-transfers North Caldwell`,
    `North Caldwell airport transfers`,
    'airport transfers',
    'Newark airport',
    'EWR transportation',
    'airport shuttle',
    'airport limo',
    'Newark Liberty International',
    'EWR transfers',
    'airport car service North Caldwell',
    `North Caldwell NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-north-caldwell/airport-transfers`,
  },
  openGraph: {
    title: `Airport Transfers in North Caldwell | Next Trip Anywhere`,
    description: `Professional airport transfers for North Caldwell residents. Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports.`,
    url: `https://nexttripanywhere.com/travel-from-north-caldwell/airport-transfers`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function NorthCaldwellAirportTransfersPage() {
  return <NewarkAirportTransfer cityName={cityName} citySlug={citySlug} />
}
