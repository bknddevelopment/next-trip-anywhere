/**
 * Travel deals data for generating Product and Event schema markup
 * Note: Fake deals and pricing have been removed
 */

import { TravelDealData, EventData } from '../seo/structured-data'

export const FEATURED_TRAVEL_DEALS: TravelDealData[] = []

export const TRAVEL_EVENTS: EventData[] = []

export const SEASONAL_PROMOTIONS = [
  {
    season: 'Winter',
    title: 'Warm Weather Escapes',
    description: 'Beat the winter blues with tropical destinations and warm weather getaways.',
    deals: ['Caribbean cruises', 'Beach resorts', 'Tropical destinations', 'Warm climate tours'],
    validPeriod: 'December - March',
  },
  {
    season: 'Spring',
    title: 'Spring Travel Opportunities',
    description: 'Perfect spring destinations for families, couples, and adventure seekers.',
    deals: ['Europe tours', 'Mediterranean cruises', 'Cultural tours', 'Spring festivals'],
    validPeriod: 'March - May',
  },
  {
    season: 'Summer',
    title: 'Summer Adventures',
    description: 'Make the most of summer with adventure tours and family-friendly destinations.',
    deals: ['Alaska cruises', 'European tours', 'National parks', 'Beach resorts'],
    validPeriod: 'June - August',
  },
  {
    season: 'Fall',
    title: 'Fall Cultural Tours',
    description: 'Experience autumn colors and cultural festivals around the world.',
    deals: ['New England tours', 'European culture', 'Asian tours', 'Wine regions'],
    validPeriod: 'September - November',
  },
]

/**
 * Get active deals (currently available)
 */
export function getActiveDeals(): TravelDealData[] {
  const now = new Date().toISOString()
  return FEATURED_TRAVEL_DEALS.filter(deal => 
    deal.validFrom <= now && deal.validUntil >= now
  )
}

/**
 * Get deals by category
 */
export function getDealsByCategory(category: TravelDealData['category']): TravelDealData[] {
  return FEATURED_TRAVEL_DEALS.filter(deal => deal.category === category)
}

/**
 * Get upcoming events
 */
export function getUpcomingEvents(): EventData[] {
  const now = new Date().toISOString()
  return TRAVEL_EVENTS.filter(event => event.startDate > now)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
}

/**
 * Get deals by destination
 */
export function getDealsByDestination(destination: string): TravelDealData[] {
  return FEATURED_TRAVEL_DEALS.filter(deal => 
    deal.destination.toLowerCase().includes(destination.toLowerCase())
  )
}

/**
 * Get flash sales (deals ending soon)
 */
export function getFlashSales(): TravelDealData[] {
  const now = new Date()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
  
  return FEATURED_TRAVEL_DEALS.filter(deal => 
    deal.validUntil <= tomorrow && deal.validUntil >= now.toISOString()
  )
}

/**
 * Get best value deals (highest discount percentage)
 */
export function getBestValueDeals(): TravelDealData[] {
  return FEATURED_TRAVEL_DEALS
    .filter(deal => deal.originalPrice)
    .sort((a, b) => {
      const discountA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100
      const discountB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100
      return discountB - discountA
    })
    .slice(0, 5)
}