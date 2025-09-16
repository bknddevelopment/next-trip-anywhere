/**
 * Service Metadata Generation
 * Helper functions for generating SEO metadata for service pages
 */

import { Metadata } from 'next'

interface ServiceInfo {
  name: string
  slug: string
  description: string
  keywords: string[]
}

interface CityInfo {
  name: string
  slug: string
  population: number
}

export function generateServiceMetadata(service: ServiceInfo, city: CityInfo): Metadata {
  const title = `${service.name} in ${city.name}, NJ | Next Trip Anywhere`
  const description = `${service.description} Serving ${city.name} and surrounding Essex County areas. Call 833-874-1019 for immediate assistance.`
  const url = `https://nexttripanywhere.com/travel-from-${city.slug}/${service.slug}`

  return {
    title,
    description,
    keywords: [
      `${service.slug} ${city.name}`,
      `${city.name} ${service.name.toLowerCase()}`,
      ...service.keywords,
      `${city.name} NJ`,
      'Essex County',
      'Next Trip Anywhere',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'en_US',
      siteName: 'Next Trip Anywhere',
      images: [
        {
          url: 'https://nexttripanywhere.com/images/og-service.jpg',
          width: 1200,
          height: 630,
          alt: `${service.name} in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.substring(0, 160),
      images: ['https://nexttripanywhere.com/images/twitter-service.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
