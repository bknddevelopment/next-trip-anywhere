/**
 * Cruise deals data for deals pages
 * Comprehensive list of cruise offers, promotions, and packages
 */

export interface CruiseDeal {
  id: string
  title: string
  cruiseLine: string
  ship: string
  duration: number // in days
  departurePort: string
  destinations: string[]
  offerType: 'special' | 'group-rate' | 'last-minute' | 'premium' | 'value'
  badge: string // e.g., "Limited Time", "Popular Choice", etc.
  departureDate: string
  returnDate: string
  cabinType: string
  perks: string[]
  isLastMinute: boolean
  isValue: boolean
  year: number
  featured: boolean
  availability: 'available' | 'limited' | 'sold-out'
  bookingDeadline?: string
  image?: string
}

export const cruiseDeals: CruiseDeal[] = [
  // Featured Deals
  {
    id: 'caribbean-7day-royal',
    title: '7-Night Caribbean Adventure',
    cruiseLine: 'Royal Caribbean',
    ship: 'Symphony of the Seas',
    duration: 7,
    departurePort: 'Miami, FL',
    destinations: ['Cozumel', 'Jamaica', 'Grand Cayman'],
    offerType: 'special',
    badge: 'Limited Time Offer',
    departureDate: '2025-02-15',
    returnDate: '2025-02-22',
    cabinType: 'Balcony',
    perks: ['Onboard Credit Included', 'Free Beverage Package', 'Free WiFi'],
    isLastMinute: false,
    isValue: true,
    year: 2025,
    featured: true,
    availability: 'available',
    bookingDeadline: '2025-02-01',
  },
  {
    id: 'alaska-7day-princess',
    title: 'Alaska Glacier Bay Cruise',
    cruiseLine: 'Princess Cruises',
    ship: 'Discovery Princess',
    duration: 7,
    departurePort: 'Seattle, WA',
    destinations: ['Juneau', 'Skagway', 'Glacier Bay', 'Ketchikan'],
    offerType: 'premium',
    badge: 'Popular Choice',
    departureDate: '2025-05-20',
    returnDate: '2025-05-27',
    cabinType: 'Oceanview',
    perks: ['Princess Plus Package', 'Specialty Dining', 'Photo Package'],
    isLastMinute: false,
    isValue: false,
    year: 2025,
    featured: true,
    availability: 'available',
  },
  {
    id: 'mediterranean-10day-celebrity',
    title: 'Mediterranean Highlights',
    cruiseLine: 'Celebrity Cruises',
    ship: 'Celebrity Edge',
    duration: 10,
    departurePort: 'Barcelona, Spain',
    destinations: ['Monaco', 'Florence', 'Rome', 'Naples', 'Santorini', 'Athens'],
    offerType: 'premium',
    badge: 'Best Value',
    departureDate: '2025-06-10',
    returnDate: '2025-06-20',
    cabinType: 'Infinite Veranda',
    perks: ['Always Included Package', 'Shore Excursion Credit', 'Premium WiFi'],
    isLastMinute: false,
    isValue: false,
    year: 2025,
    featured: true,
    availability: 'limited',
  },

  // Last Minute Deals
  {
    id: 'bahamas-3day-carnival-lastminute',
    title: '3-Day Bahamas Quick Getaway',
    cruiseLine: 'Carnival Cruise Line',
    ship: 'Carnival Conquest',
    duration: 3,
    departurePort: 'Miami, FL',
    destinations: ['Nassau', 'Princess Cays'],
    offerType: 'last-minute',
    badge: 'Last Minute Deal',
    departureDate: '2025-01-20',
    returnDate: '2025-01-23',
    cabinType: 'Interior',
    perks: ['Cheers! Beverage Package 50% Off'],
    isLastMinute: true,
    isValue: true,
    year: 2025,
    featured: false,
    availability: 'limited',
    bookingDeadline: '2025-01-18',
  },
  {
    id: 'bermuda-5day-norwegian-lastminute',
    title: 'Bermuda Escape',
    cruiseLine: 'Norwegian Cruise Line',
    ship: 'Norwegian Joy',
    duration: 5,
    departurePort: 'New York, NY',
    destinations: ['Kings Wharf, Bermuda'],
    offerType: 'last-minute',
    badge: 'Flash Sale',
    departureDate: '2025-01-25',
    returnDate: '2025-01-30',
    cabinType: 'Oceanview',
    perks: ['Free at Sea Package', 'Shore Excursion Credit'],
    isLastMinute: true,
    isValue: true,
    year: 2025,
    featured: false,
    availability: 'available',
    bookingDeadline: '2025-01-22',
  },
  {
    id: 'caribbean-5day-msc-lastminute',
    title: 'Western Caribbean Express',
    cruiseLine: 'MSC Cruises',
    ship: 'MSC Seashore',
    duration: 5,
    departurePort: 'Port Canaveral, FL',
    destinations: ['Ocean Cay', 'Costa Maya', 'Cozumel'],
    offerType: 'last-minute',
    badge: 'Limited Availability',
    departureDate: '2025-02-01',
    returnDate: '2025-02-06',
    cabinType: 'Interior',
    perks: ['Drinks & WiFi Package', 'Kids Sail Free'],
    isLastMinute: true,
    isValue: true,
    year: 2025,
    featured: false,
    availability: 'available',
    bookingDeadline: '2025-01-28',
  },

  // Value Cruises
  {
    id: 'mexico-4day-carnival-cheap',
    title: '4-Day Baja Mexico',
    cruiseLine: 'Carnival Cruise Line',
    ship: 'Carnival Radiance',
    duration: 4,
    departurePort: 'Long Beach, CA',
    destinations: ['Catalina Island', 'Ensenada'],
    offerType: 'value',
    badge: 'Great Value',
    departureDate: '2025-03-15',
    returnDate: '2025-03-19',
    cabinType: 'Interior',
    perks: ['Onboard Credit Available'],
    isLastMinute: false,
    isValue: true,
    year: 2025,
    featured: false,
    availability: 'available',
  },
  {
    id: 'bahamas-4day-royal-cheap',
    title: 'Bahamas & Perfect Day',
    cruiseLine: 'Royal Caribbean',
    ship: 'Freedom of the Seas',
    duration: 4,
    departurePort: 'Fort Lauderdale, FL',
    destinations: ['Nassau', 'Perfect Day at CocoCay'],
    offerType: 'value',
    badge: 'Family Favorite',
    departureDate: '2025-04-10',
    returnDate: '2025-04-14',
    cabinType: 'Interior',
    perks: ['50% Off Second Guest', 'Kids Sail Free'],
    isLastMinute: false,
    isValue: true,
    year: 2025,
    featured: false,
    availability: 'available',
  },
  {
    id: 'caribbean-6day-msc-cheap',
    title: 'Eastern Caribbean Value Cruise',
    cruiseLine: 'MSC Cruises',
    ship: 'MSC Divina',
    duration: 6,
    departurePort: 'Miami, FL',
    destinations: ['Ocean Cay', 'Nassau', 'Key West'],
    offerType: 'value',
    badge: 'Best Deal',
    departureDate: '2025-05-05',
    returnDate: '2025-05-11',
    cabinType: 'Interior',
    perks: ['Easy Drinks Package Included'],
    isLastMinute: false,
    isValue: true,
    year: 2025,
    featured: false,
    availability: 'available',
  },

  // 2025 Cruises
  {
    id: 'transatlantic-14day-cunard-2025',
    title: 'Transatlantic Crossing',
    cruiseLine: 'Cunard',
    ship: 'Queen Mary 2',
    duration: 14,
    departurePort: 'New York, NY',
    destinations: ['Southampton, UK'],
    offerType: 'premium',
    badge: 'Iconic Journey',
    departureDate: '2025-07-15',
    returnDate: '2025-07-29',
    cabinType: 'Balcony',
    perks: ['Classic Beverage Package', 'Gratuities Included', 'Onboard Credit'],
    isLastMinute: false,
    isValue: false,
    year: 2025,
    featured: true,
    availability: 'available',
  },
  {
    id: 'northern-europe-12day-holland-2025',
    title: 'Norwegian Fjords & Baltic',
    cruiseLine: 'Holland America',
    ship: 'Rotterdam',
    duration: 12,
    departurePort: 'Amsterdam, Netherlands',
    destinations: ['Bergen', 'Flam', 'Copenhagen', 'Stockholm', 'Helsinki', 'St. Petersburg'],
    offerType: 'premium',
    badge: 'Exclusive Itinerary',
    departureDate: '2025-08-20',
    returnDate: '2025-09-01',
    cabinType: 'Verandah',
    perks: ['Have It All Package', 'Shore Excursions Included', 'Specialty Dining'],
    isLastMinute: false,
    isValue: false,
    year: 2025,
    featured: true,
    availability: 'available',
  },
  {
    id: 'hawaii-15day-princess-2025',
    title: 'Hawaiian Islands',
    cruiseLine: 'Princess Cruises',
    ship: 'Ruby Princess',
    duration: 15,
    departurePort: 'San Francisco, CA',
    destinations: ['Maui', 'Oahu', 'Kauai', 'Big Island', 'Ensenada'],
    offerType: 'premium',
    badge: 'Island Paradise',
    departureDate: '2025-09-15',
    returnDate: '2025-09-30',
    cabinType: 'Mini-Suite',
    perks: ['Princess Premier Package', 'Lei Greeting', 'Photo Package'],
    isLastMinute: false,
    isValue: false,
    year: 2025,
    featured: true,
    availability: 'limited',
  },
  {
    id: 'caribbean-holiday-7day-disney-2025',
    title: 'Very Merrytime Caribbean',
    cruiseLine: 'Disney Cruise Line',
    ship: 'Disney Fantasy',
    duration: 7,
    departurePort: 'Port Canaveral, FL',
    destinations: ['Castaway Cay', 'Cozumel', 'Grand Cayman', 'Jamaica'],
    offerType: 'premium',
    badge: 'Holiday Special',
    departureDate: '2025-12-20',
    returnDate: '2025-12-27',
    cabinType: 'Verandah',
    perks: ['Holiday Activities', 'Character Meet & Greets', 'Onboard Credit'],
    isLastMinute: false,
    isValue: false,
    year: 2025,
    featured: true,
    availability: 'limited',
  },

  // More Regular Deals
  {
    id: 'caribbean-7day-ncl-regular',
    title: 'Eastern Caribbean Paradise',
    cruiseLine: 'Norwegian Cruise Line',
    ship: 'Norwegian Getaway',
    duration: 7,
    departurePort: 'Miami, FL',
    destinations: ['St. Thomas', 'Tortola', 'Great Stirrup Cay'],
    offerType: 'special',
    badge: 'Popular Route',
    departureDate: '2025-03-22',
    returnDate: '2025-03-29',
    cabinType: 'Balcony',
    perks: ['Free at Sea - Pick 2', 'Gratuities Included'],
    isLastMinute: false,
    isValue: false,
    year: 2025,
    featured: false,
    availability: 'available',
  },
  {
    id: 'asia-14day-celebrity-2025',
    title: 'Best of Asia',
    cruiseLine: 'Celebrity Cruises',
    ship: 'Celebrity Solstice',
    duration: 14,
    departurePort: 'Singapore',
    destinations: ['Kuala Lumpur', 'Phuket', 'Colombo', 'Cochin', 'Goa', 'Mumbai'],
    offerType: 'premium',
    badge: 'Exotic Adventure',
    departureDate: '2025-11-01',
    returnDate: '2025-11-15',
    cabinType: 'Concierge Class',
    perks: ['Always Included', 'Business Class Air Credit', 'Suite Upgrade Available'],
    isLastMinute: false,
    isValue: false,
    year: 2025,
    featured: false,
    availability: 'available',
  },
]

// Helper functions to filter deals
export function getLastMinuteDeals(): CruiseDeal[] {
  return cruiseDeals.filter((deal) => deal.isLastMinute)
}

export function getValueCruises(): CruiseDeal[] {
  return cruiseDeals.filter((deal) => deal.isValue)
}

// Legacy function for backward compatibility - renamed from getCheapCruises
export function getCheapCruises(): CruiseDeal[] {
  return getValueCruises()
}

// Legacy function for backward compatibility - filter by offer type
export function getDealsByPriceRange(minPrice: number, maxPrice: number): CruiseDeal[] {
  // Since we no longer have prices, return deals based on offer type
  if (maxPrice <= 1000) {
    return cruiseDeals.filter(
      (deal) => deal.offerType === 'value' || deal.offerType === 'last-minute'
    )
  } else if (maxPrice <= 2000) {
    return cruiseDeals.filter(
      (deal) => deal.offerType === 'special' || deal.offerType === 'group-rate'
    )
  } else {
    return cruiseDeals.filter((deal) => deal.offerType === 'premium')
  }
}

export function get2025Cruises(): CruiseDeal[] {
  return cruiseDeals.filter((deal) => deal.year === 2025)
}

export function getFeaturedDeals(): CruiseDeal[] {
  return cruiseDeals.filter((deal) => deal.featured)
}

export function getDealsByCruiseLine(cruiseLine: string): CruiseDeal[] {
  return cruiseDeals.filter((deal) => deal.cruiseLine.toLowerCase() === cruiseLine.toLowerCase())
}

export function getDealsByPort(port: string): CruiseDeal[] {
  return cruiseDeals.filter((deal) => deal.departurePort.toLowerCase().includes(port.toLowerCase()))
}

export function getDealsByDuration(minDays: number, maxDays: number): CruiseDeal[] {
  return cruiseDeals.filter((deal) => deal.duration >= minDays && deal.duration <= maxDays)
}

// Cruise lines for filtering
export const cruiseLines = [
  'Royal Caribbean',
  'Carnival Cruise Line',
  'Norwegian Cruise Line',
  'Princess Cruises',
  'Celebrity Cruises',
  'MSC Cruises',
  'Holland America',
  'Disney Cruise Line',
  'Cunard',
  'Virgin Voyages',
  'Oceania Cruises',
  'Regent Seven Seas',
  'Silversea',
  'Viking Ocean',
  'Azamara',
]

// Popular departure ports
export const departurePorts = [
  { city: 'Miami', state: 'FL', region: 'Southeast' },
  { city: 'Fort Lauderdale', state: 'FL', region: 'Southeast' },
  { city: 'Port Canaveral', state: 'FL', region: 'Southeast' },
  { city: 'Tampa', state: 'FL', region: 'Southeast' },
  { city: 'New York', state: 'NY', region: 'Northeast' },
  { city: 'Baltimore', state: 'MD', region: 'Mid-Atlantic' },
  { city: 'Boston', state: 'MA', region: 'Northeast' },
  { city: 'Seattle', state: 'WA', region: 'Pacific Northwest' },
  { city: 'Los Angeles', state: 'CA', region: 'West Coast' },
  { city: 'San Francisco', state: 'CA', region: 'West Coast' },
  { city: 'New Orleans', state: 'LA', region: 'Gulf Coast' },
  { city: 'Galveston', state: 'TX', region: 'Gulf Coast' },
]

// Popular destinations
export const popularDestinations = [
  'Caribbean',
  'Bahamas',
  'Mexico',
  'Alaska',
  'Mediterranean',
  'Northern Europe',
  'Hawaii',
  'Transatlantic',
  'Asia',
  'Australia & New Zealand',
  'South Pacific',
  'Canada & New England',
]
