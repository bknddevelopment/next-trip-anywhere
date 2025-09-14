/**
 * @fileoverview Destinations index page component
 * @module app/destinations/page
 *
 * This page displays all available destinations with filtering and search capabilities.
 */

import { Metadata } from 'next'
import { Suspense } from 'react'
import { DestinationRepository } from '@/lib/repositories/destination-repository'
import DestinationsGrid from '@/components/destinations/DestinationsGrid'

export const metadata: Metadata = {
  title: 'Travel Destinations | Explore 75+ Amazing Places Worldwide',
  description:
    'Discover your next adventure from our collection of 75+ handpicked destinations. From tropical beaches to historic cities, find the perfect vacation spot with Next Trip Anywhere.',
  keywords: [
    'travel destinations',
    'vacation spots',
    'tourist destinations',
    'beach destinations',
    'city breaks',
    'adventure travel',
    'luxury destinations',
    'family destinations',
  ],
  openGraph: {
    title: 'Explore 75+ Amazing Travel Destinations',
    description:
      "Browse our curated collection of the world's best travel destinations. Find your perfect vacation spot with detailed guides, travel tips, and exclusive packages.",
    images: [
      {
        url: '/og-destinations.jpg',
        width: 1200,
        height: 630,
        alt: 'Collage of travel destinations',
      },
    ],
  },
}

/**
 * Destinations index page
 * Server component that displays all destinations
 * Client-side filtering is handled by DestinationsGrid
 */
export default async function DestinationsPage() {
  // Fetch all destinations for initial load
  const response = await DestinationRepository.getAll({
    page: 1,
    perPage: 100, // Get more destinations for client-side filtering
    filters: {
      sortBy: 'popularity',
      order: 'desc',
    },
  })

  // Fetch filter options
  const [regions, availableTags] = await Promise.all([
    DestinationRepository.getRegions(),
    DestinationRepository.getTags(),
  ])

  // Generate structured data for the listing page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Travel Destinations',
    description: 'Browse our collection of amazing travel destinations worldwide',
    numberOfItems: response.total,
    itemListElement: response.destinations.slice(0, 20).map((dest, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristDestination',
        name: dest.name,
        description: dest.shortDescription,
        image: dest.heroImage?.url || '/images/placeholder-destination.jpg',
        url: `https://nexttripanywhere.com/destinations/${dest.slug}`,
      },
    })),
  }

  return (
    <>
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Page content */}
      <div className="min-h-screen bg-gray-50">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Amazing Destinations</h1>
            <p className="text-xl max-w-3xl">
              Discover your perfect vacation spot from our handpicked collection of the world&apos;s
              most amazing destinations. From pristine beaches to vibrant cities, your next
              adventure awaits.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg" />
                ))}
              </div>
            }
          >
            <DestinationsGrid
              destinations={response.destinations}
              total={response.total}
              page={1}
              perPage={12}
              totalPages={Math.ceil(response.total / 12)}
              regions={regions}
              tags={availableTags}
              currentFilters={{}}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}
