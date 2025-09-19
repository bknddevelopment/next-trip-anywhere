/**
 * Belleville Airport Transfers Service Page
 * Generated for Essex County SEO - Phase 4
 * Enhanced with comprehensive Newark Airport content
 */

import { Metadata } from 'next'
import NewarkAirportTransfer from '@/components/essex-county/NewarkAirportTransfer'
import { getEnhancedAirportServiceContent } from '@/lib/seo/newark-airport-service'

const cityName = 'Belleville'
const citySlug = 'belleville'

// Get comprehensive Newark Airport content for metadata
const content = getEnhancedAirportServiceContent('airport-transfers', cityName)

export const metadata: Metadata = {
  title:
    content?.seoContent.metaTitle || `Airport Transfers in Belleville, NJ | Next Trip Anywhere`,
  description:
    content?.seoContent.metaDescription ||
    `Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports. Serving Belleville and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`,
  keywords: [
    `airport-transfers Belleville`,
    `Belleville airport transfers`,
    'airport transfers',
    'Newark airport',
    'EWR transportation',
    'airport shuttle',
    'airport limo',
    'Newark Liberty International',
    'EWR transfers',
    'airport car service Belleville',
    `Belleville NJ`,
    'Essex County',
  ],
  alternates: {
    canonical: `https://nexttripanywhere.com/travel-from-belleville/airport-transfers`,
  },
  openGraph: {
    title: `Airport Transfers in Belleville | Next Trip Anywhere`,
    description: `Professional airport transfers for Belleville residents. Reliable airport transportation to Newark Airport (EWR), JFK, LGA, and Philadelphia airports.`,
    url: `https://nexttripanywhere.com/travel-from-belleville/airport-transfers`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Next Trip Anywhere',
  },
}

export default function BellevilleAirportTransfersPage() {
  return <NewarkAirportTransfer cityName={cityName} citySlug={citySlug} />
}
