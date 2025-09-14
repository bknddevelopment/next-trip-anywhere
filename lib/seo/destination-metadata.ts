/**
 * @fileoverview SEO metadata generation for destination pages
 * @module lib/seo/destination-metadata
 *
 * This module generates comprehensive SEO metadata for destination pages,
 * including OpenGraph tags, Twitter cards, and other meta information.
 */

import { Metadata } from 'next'
import type { Destination } from '@/types/destination'

/**
 * Generate complete metadata for a destination page
 * Optimized for search engines and social media sharing
 */
export function generateDestinationMetadata(destination: Destination): Metadata {
  const baseUrl = 'https://nexttripanywhere.com'
  const url = `${baseUrl}/destinations/${destination.slug}`

  // Generate dynamic title with location and key features
  const title =
    destination.seo?.title ||
    `${destination.name} Travel Guide 2024 | ${destination.country} Vacation Packages`

  // Generate comprehensive description
  const description =
    destination.seo?.description ||
    `Plan your perfect ${destination.name} vacation. ${destination.shortDescription} Find exclusive deals on flights, hotels, and packages from major US cities.`

  // Combine SEO keywords with destination-specific terms
  const keywords = [
    destination.name,
    destination.country,
    ...(destination.region ? [destination.region] : []),
    ...(destination.seo?.keywords || []),
    'travel guide',
    'vacation packages',
    'travel deals',
    ...(destination.tags || []),
  ]

  return {
    title,
    description,
    keywords: keywords.join(', '),

    // Canonical URL for duplicate content prevention
    alternates: {
      canonical: url,
    },

    // OpenGraph metadata for social media
    openGraph: {
      title,
      description,
      url,
      siteName: 'Next Trip Anywhere',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: destination.heroImage?.url || '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: `${destination.name} - ${destination.heroImage?.alt || 'Travel Destination'}`,
        },
        // Add gallery images for richer previews
        ...(destination.gallery || []).slice(0, 3).map((img) => ({
          url: img.url,
          width: 800,
          height: 600,
          alt: img.alt,
        })),
      ],
    },

    // Twitter Card metadata
    twitter: {
      card: 'summary_large_image',
      site: '@nexttripanywhere',
      creator: '@nexttripanywhere',
      title: title.length > 70 ? title.substring(0, 67) + '...' : title,
      description: description.length > 200 ? description.substring(0, 197) + '...' : description,
      images: [destination.heroImage?.url || '/images/og-default.jpg'],
    },

    // Additional metadata
    authors: [{ name: 'Next Trip Anywhere Travel Experts' }],
    creator: 'Next Trip Anywhere',
    publisher: 'Next Trip Anywhere',

    // Robots directives
    robots: {
      index: destination.status === 'published',
      follow: true,
      googleBot: {
        index: destination.status === 'published',
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification codes (inherited from root layout)
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },

    // Format detection
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // Other metadata
    category: 'travel',
    classification: 'Travel & Tourism',
  }
}

/**
 * Generate metadata for destination listing pages
 */
export function generateDestinationListMetadata(
  page: number = 1,
  region?: string,
  totalDestinations?: number
): Metadata {
  const baseTitle = region ? `${region} Travel Destinations` : 'Travel Destinations'

  const title =
    page > 1
      ? `${baseTitle} - Page ${page} | Next Trip Anywhere`
      : `${baseTitle} | Explore ${totalDestinations || '75+'} Amazing Places`

  const description = region
    ? `Discover the best travel destinations in ${region}. Browse vacation packages, travel guides, and exclusive deals for your next ${region} adventure.`
    : `Explore our collection of ${totalDestinations || '75+'} handpicked travel destinations worldwide. Find detailed guides, travel tips, and exclusive vacation packages.`

  return {
    title,
    description,
    keywords: [
      'travel destinations',
      'vacation spots',
      'tourist destinations',
      ...(region ? [region, `${region} travel`, `${region} vacations`] : []),
      'travel guides',
      'vacation packages',
      'travel deals',
    ].join(', '),

    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Next Trip Anywhere',
      locale: 'en_US',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

/**
 * Generate breadcrumb metadata for destination pages
 */
export function generateDestinationBreadcrumbs(destination: Destination) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nexttripanywhere.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Destinations',
        item: 'https://nexttripanywhere.com/destinations',
      },
      ...(destination.region
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: destination.region,
              item: `https://nexttripanywhere.com/destinations?region=${encodeURIComponent(destination.region)}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: destination.region ? 4 : 3,
        name: destination.name,
        item: `https://nexttripanywhere.com/destinations/${destination.slug}`,
      },
    ],
  }
}
