/**
 * Vacation package data for generating Trip and Tour schema markup
 */

export interface VacationPackage {
  id: string
  name: string
  description: string
  destination: string
  duration: number
  price: number
  originalPrice?: number
  currency?: string
  includes: string[]
  itinerary?: string[]
  image?: string
  category: 'all-inclusive' | 'city-break' | 'adventure' | 'beach' | 'honeymoon' | 'family'
  validFrom: string
  validUntil: string
  availability: 'InStock' | 'OutOfStock' | 'LimitedAvailability'
  highlights: string[]
  departureFrom: string[]
}

export const VACATION_PACKAGES: VacationPackage[] = []

/**
 * Get package by ID
 */
export function getPackageById(id: string): VacationPackage | undefined {
  return VACATION_PACKAGES.find(pkg => pkg.id === id)
}

/**
 * Get packages by category
 */
export function getPackagesByCategory(category: VacationPackage['category']): VacationPackage[] {
  return VACATION_PACKAGES.filter(pkg => pkg.category === category)
}

/**
 * Get packages by destination
 */
export function getPackagesByDestination(destination: string): VacationPackage[] {
  return VACATION_PACKAGES.filter(pkg => 
    pkg.destination.toLowerCase().includes(destination.toLowerCase())
  )
}

/**
 * Get packages by price range
 */
export function getPackagesByPriceRange(minPrice: number, maxPrice: number): VacationPackage[] {
  return VACATION_PACKAGES.filter(pkg => 
    pkg.price >= minPrice && pkg.price <= maxPrice
  )
}

/**
 * Get packages by duration
 */
export function getPackagesByDuration(minDays: number, maxDays: number): VacationPackage[] {
  return VACATION_PACKAGES.filter(pkg => 
    pkg.duration >= minDays && pkg.duration <= maxDays
  )
}

/**
 * Get packages available from specific departure city
 */
export function getPackagesByDeparture(departureCity: string): VacationPackage[] {
  return VACATION_PACKAGES.filter(pkg => 
    pkg.departureFrom.some(city => 
      city.toLowerCase().includes(departureCity.toLowerCase())
    )
  )
}

/**
 * Get featured packages (limited availability or special deals)
 */
export function getFeaturedPackages(): VacationPackage[] {
  return VACATION_PACKAGES.filter(pkg => 
    pkg.availability === 'LimitedAvailability' || 
    (pkg.originalPrice && pkg.originalPrice > pkg.price)
  ).slice(0, 4)
}

/**
 * Get package categories with counts
 */
export function getPackageCategories(): Array<{ category: string; count: number }> {
  const categories = [...new Set(VACATION_PACKAGES.map(pkg => pkg.category))]
  return categories.map(category => ({
    category,
    count: VACATION_PACKAGES.filter(pkg => pkg.category === category).length
  }))
}