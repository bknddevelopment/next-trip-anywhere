/**
 * @fileoverview Dynamic destination page component
 * @module app/destinations/[slug]/page
 *
 * This is the main page component for individual destination pages.
 * It uses Next.js 14+ App Router with server components for optimal performance.
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DestinationRepository } from '@/lib/repositories/destination-repository'
import DestinationPageTemplate from '@/components/destinations/DestinationPageTemplate'
import { generateDestinationMetadata } from '@/lib/seo/destination-metadata'
import { generateDestinationStructuredData } from '@/lib/seo/destination-structured-data'

/**
 * Generate static params for all destination pages
 * This enables static generation at build time for better performance
 */
export async function generateStaticParams() {
  const response = await DestinationRepository.getAll()

  return response.destinations.map((destination) => ({
    slug: destination.slug,
  }))
}

/**
 * Generate metadata for the destination page
 * This is used for SEO and social media sharing
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const destination = await DestinationRepository.getBySlug(slug)

  if (!destination) {
    return {
      title: 'Destination Not Found',
      description: 'The requested destination could not be found.',
    }
  }

  return generateDestinationMetadata(destination)
}

/**
 * Destination page component
 * Server component that fetches and displays destination data
 */
export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Fetch destination data
  const destination = await DestinationRepository.getBySlug(slug)

  // Handle 404 if destination not found
  if (!destination) {
    notFound()
  }

  // Fetch related destinations for recommendations
  const relatedDestinations = await DestinationRepository.getRelated(destination, 4)

  // Generate structured data for SEO
  const structuredData = generateDestinationStructuredData(destination)

  return (
    <>
      {/* Inject structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Main destination page content */}
      <DestinationPageTemplate
        destination={destination}
        relatedDestinations={relatedDestinations}
      />
    </>
  )
}
