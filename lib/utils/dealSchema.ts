/**
 * Schema.org markup generator for travel deals
 */

import { FeaturedDeal } from '@/lib/data/featured-deals';
import { siteConfig } from '@/config/site';

export function generateDealSchemaGraph(deal: FeaturedDeal) {
  const baseUrl = siteConfig.url;
  const dealUrl = `${baseUrl}/deals/${deal.slug}`;

  const schemas = [];

  // Product schema with Offer
  schemas.push({
    '@type': 'Product',
    name: deal.title,
    description: deal.content.overview,
    image: `${baseUrl}${deal.content.hero.image}`,
    brand: {
      '@type': 'Brand',
      name: deal.provider,
    },
    offers: {
      '@type': 'Offer',
      url: dealUrl,
      priceCurrency: deal.content.pricing.currency,
      price: deal.content.pricing.startingPrice,
      priceValidUntil: deal.endDate,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'TravelAgency',
        name: siteConfig.name,
        telephone: siteConfig.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'West Orange',
          addressRegion: 'NJ',
          addressCountry: 'US',
        },
      },
    },
  });

  // Trip schema for cruise itinerary
  if (deal.content.itinerary) {
    schemas.push({
      '@type': 'Trip',
      name: deal.title,
      description: deal.content.overview,
      offers: {
        '@type': 'Offer',
        priceCurrency: deal.content.pricing.currency,
        price: deal.content.pricing.startingPrice,
      },
      itinerary: deal.content.itinerary.visitingPorts.map((port, index) => ({
        '@type': 'Place',
        name: port,
        position: index + 1,
      })),
    });
  }

  // TravelAgency schema
  schemas.push({
    '@type': 'TravelAgency',
    '@id': `${baseUrl}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/logo.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'West Orange',
      addressRegion: 'NJ',
      postalCode: '07052',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'New Jersey',
      },
      {
        '@type': 'City',
        name: 'Newark',
      },
    ],
    priceRange: '$$',
    sameAs: siteConfig.social
      ? Object.values(siteConfig.social).filter(Boolean)
      : [],
  });

  // FAQPage schema
  if (deal.faq && deal.faq.length > 0) {
    schemas.push({
      '@type': 'FAQPage',
      mainEntity: deal.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  // BreadcrumbList schema
  schemas.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Deals',
        item: `${baseUrl}/deals`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: deal.title,
        item: dealUrl,
      },
    ],
  });

  // WebPage schema
  schemas.push({
    '@type': 'WebPage',
    '@id': dealUrl,
    url: dealUrl,
    name: deal.metaTitle,
    description: deal.metaDescription,
    inLanguage: 'en-US',
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
    datePublished: deal.lastUpdated,
    dateModified: deal.lastUpdated,
  });

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}
