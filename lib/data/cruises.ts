/**
 * Cruise data for generating structured schema markup
 */

import { CruiseData } from '../seo/structured-data'

export const FEATURED_CRUISES: CruiseData[] = []

export const CRUISE_PORTS = [
  {
    name: 'Port of Miami',
    city: 'Miami',
    state: 'Florida',
    country: 'United States',
    description: 'The Cruise Capital of the World',
    coordinates: { latitude: 25.7617, longitude: -80.1918 },
    cruiseLines: ['Royal Caribbean', 'Norwegian Cruise Line', 'Carnival', 'Celebrity'],
  },
  {
    name: 'Port Canaveral',
    city: 'Cape Canaveral',
    state: 'Florida',
    country: 'United States',
    description: 'Close to Kennedy Space Center and Orlando attractions',
    coordinates: { latitude: 28.4158, longitude: -80.6034 },
    cruiseLines: ['Disney Cruise Line', 'Carnival', 'Royal Caribbean', 'Norwegian'],
  },
  {
    name: 'Port of Seattle',
    city: 'Seattle',
    state: 'Washington',
    country: 'United States',
    description: 'Gateway to Alaska cruises',
    coordinates: { latitude: 47.6062, longitude: -122.3321 },
    cruiseLines: ['Princess Cruises', 'Holland America', 'Celebrity', 'Norwegian'],
  },
  {
    name: 'Manhattan Cruise Terminal',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    description: 'Premier departure port for transatlantic and Caribbean cruises',
    coordinates: { latitude: 40.7678, longitude: -74.0059 },
    cruiseLines: ['Norwegian Cruise Line', 'Carnival', 'Celebrity', 'Cunard'],
  },
  {
    name: 'Port of Boston',
    city: 'Boston',
    state: 'Massachusetts',
    country: 'United States',
    description: 'Historic port serving New England and Canada cruises',
    coordinates: { latitude: 42.3601, longitude: -71.0589 },
    cruiseLines: ['Norwegian Cruise Line', 'Celebrity', 'Holland America'],
  },
  {
    name: 'Port of Baltimore',
    city: 'Baltimore',
    state: 'Maryland',
    country: 'United States',
    description: 'Convenient departure point for mid-Atlantic travelers',
    coordinates: { latitude: 39.2904, longitude: -76.6122 },
    cruiseLines: ['Royal Caribbean', 'Carnival', 'Celebrity'],
  },
]

/**
 * Get cruise data by name
 */
export function getCruiseByName(name: string): CruiseData | undefined {
  return FEATURED_CRUISES.find(cruise => 
    cruise.name.toLowerCase().replace(/\s+/g, '-') === name.toLowerCase()
  )
}

/**
 * Get cruises by cruise line
 */
export function getCruisesByCruiseLine(cruiseLine: string): CruiseData[] {
  return FEATURED_CRUISES.filter(cruise => 
    cruise.cruiseLine.toLowerCase() === cruiseLine.toLowerCase()
  )
}

/**
 * Get cruises by departure port
 */
export function getCruisesByPort(portName: string): CruiseData[] {
  return FEATURED_CRUISES.filter(cruise => 
    cruise.departurePort.toLowerCase().includes(portName.toLowerCase())
  )
}

/**
 * Get cruises by duration
 */
export function getCruisesByDuration(minDays: number, maxDays: number): CruiseData[] {
  return FEATURED_CRUISES.filter(cruise => 
    cruise.duration >= minDays && cruise.duration <= maxDays
  )
}

/**
 * Get cruises by price range
 */
export function getCruisesByPriceRange(minPrice: number, maxPrice: number): CruiseData[] {
  return FEATURED_CRUISES.filter(cruise => 
    cruise.price >= minPrice && cruise.price <= maxPrice
  )
}