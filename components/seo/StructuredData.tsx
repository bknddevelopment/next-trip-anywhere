/**
 * Structured Data Component for SEO Schema Markup
 * Dynamically generates JSON-LD structured data for different page types
 */

import React from 'react'
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateProductSchema,
  generateArticleSchema,
  generateEventSchema,
  generateReviewSchema,
  generateAggregateRatingSchema,
  generateSchemaGraph,
  generateEnhancedLocalBusinessSchema,
  generateTripSchema,
  generateTourSchema,
  generateCruiseSchema,
  generateLodgingBusinessSchema,
  generateTravelDealProductSchema,
  BreadcrumbItem,
  FAQItem,
  LocationData,
  ReviewData,
  EventData,
  TravelDealData,
  CruiseData,
  HotelData,
} from '@/lib/seo/structured-data'

interface StructuredDataProps {
  type: 'organization' | 'website' | 'breadcrumbs' | 'faq' | 'local-business' | 'service' | 'product' | 'article' | 'event' | 'review' | 'rating' | 'trip' | 'tour' | 'cruise' | 'hotel' | 'travel-deal'
  data?: any
  multiple?: any[]
}

export default function StructuredData({ type, data, multiple }: StructuredDataProps) {
  const generateSchema = () => {
    switch (type) {
      case 'organization':
        return generateOrganizationSchema()
      
      case 'website':
        return generateWebSiteSchema()
      
      case 'breadcrumbs':
        return generateBreadcrumbSchema(data as BreadcrumbItem[])
      
      case 'faq':
        return generateFAQSchema(data as FAQItem[])
      
      case 'local-business':
        return generateEnhancedLocalBusinessSchema(data as LocationData)
      
      case 'service':
        return generateServiceSchema(data as 'flights' | 'cruises' | 'packages')
      
      case 'product':
        return generateProductSchema(data)
      
      case 'article':
        return generateArticleSchema(data)
      
      case 'event':
        return generateEventSchema(data as EventData)
      
      case 'review':
        return generateReviewSchema(data as ReviewData)
      
      case 'rating':
        return generateAggregateRatingSchema(data)
      
      case 'trip':
        return generateTripSchema(data)
      
      case 'tour':
        return generateTourSchema(data)
      
      case 'cruise':
        return generateCruiseSchema(data as CruiseData)
      
      case 'hotel':
        return generateLodgingBusinessSchema(data as HotelData)
      
      case 'travel-deal':
        return generateTravelDealProductSchema(data as TravelDealData)
      
      default:
        return null
    }
  }

  const schema = multiple ? generateSchemaGraph(multiple) : generateSchema()

  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}

// Convenience components for common schema types
export const OrganizationSchema = () => <StructuredData type="organization" />
export const WebsiteSchema = () => <StructuredData type="website" />

export const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => (
  <StructuredData type="breadcrumbs" data={items} />
)

export const FAQSchema = ({ faqs }: { faqs: FAQItem[] }) => (
  <StructuredData type="faq" data={faqs} />
)

export const LocalBusinessSchema = ({ location }: { location: LocationData }) => (
  <StructuredData type="local-business" data={location} />
)

export const ServiceSchema = ({ service }: { service: 'flights' | 'cruises' | 'packages' }) => (
  <StructuredData type="service" data={service} />
)

export const ProductSchema = ({ product }: { product: any }) => (
  <StructuredData type="product" data={product} />
)

export const ArticleSchema = ({ article }: { article: any }) => (
  <StructuredData type="article" data={article} />
)

export const EventSchema = ({ event }: { event: EventData }) => (
  <StructuredData type="event" data={event} />
)

export const ReviewSchema = ({ review }: { review: ReviewData }) => (
  <StructuredData type="review" data={review} />
)

export const AggregateRatingSchema = ({ rating }: { rating: any }) => (
  <StructuredData type="rating" data={rating} />
)

export const TripSchema = ({ trip }: { trip: any }) => (
  <StructuredData type="trip" data={trip} />
)

export const TourSchema = ({ tour }: { tour: any }) => (
  <StructuredData type="tour" data={tour} />
)

export const CruiseSchema = ({ cruise }: { cruise: CruiseData }) => (
  <StructuredData type="cruise" data={cruise} />
)

export const HotelSchema = ({ hotel }: { hotel: HotelData }) => (
  <StructuredData type="hotel" data={hotel} />
)

export const TravelDealSchema = ({ deal }: { deal: TravelDealData }) => (
  <StructuredData type="travel-deal" data={deal} />
)

// Multi-schema component for complex pages
export const MultiSchema = ({ schemas }: { schemas: any[] }) => (
  <StructuredData type="organization" multiple={schemas} />
)