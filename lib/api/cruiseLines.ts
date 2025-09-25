/**
 * Cruise Lines API
 * Mock API for cruise line data and comparisons
 */

import { CRUISE_LINES, CruiseLine } from '../data/cruise-lines'
import {
  CruiseLineComparison,
  FleetComparison,
  DiningComparison,
  EntertainmentComparison,
  ComparisonScore,
  CruiseComparisonCategory
} from '../types/comparison'

// ============= Data Fetching =============

export async function getCruiseLineData(id: string): Promise<CruiseLine | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  const cruiseLine = CRUISE_LINES.find(line => line.id === id)
  return cruiseLine || null
}

export async function getAllCruiseLines(): Promise<CruiseLine[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return CRUISE_LINES
}

export async function getCruiseLineFleet(id: string): Promise<FleetComparison | null> {
  await new Promise(resolve => setTimeout(resolve, 150))

  const cruiseLine = await getCruiseLineData(id)
  if (!cruiseLine) return null

  return {
    totalShips: cruiseLine.fleetSize,
    averageAge: calculateAverageFleetAge(cruiseLine),
    newestShip: getNewestShip(cruiseLine),
    largestShip: getLargestShip(cruiseLine),
    smallestShip: getSmallestShip(cruiseLine),
    averageCapacity: getAverageCapacity(cruiseLine)
  }
}

// ============= Comparison Functions =============

export async function compareCruiseLines(
  cruiseLineIds: string[],
  preferences?: any
): Promise<CruiseLineComparison> {
  await new Promise(resolve => setTimeout(resolve, 200))

  const cruiseLines = await Promise.all(
    cruiseLineIds.map(id => getCruiseLineData(id))
  )
  const validCruiseLines = cruiseLines.filter(line => line !== null) as CruiseLine[]

  const categories = generateComparisonCategories(validCruiseLines)
  const scores = calculateComparisonScores(validCruiseLines, categories, preferences)

  return {
    id: generateComparisonId(),
    cruiseLines: validCruiseLines,
    categories,
    score: scores,
    userPreferences: preferences,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

function generateComparisonCategories(cruiseLines: CruiseLine[]): CruiseComparisonCategory[] {
  const categories: CruiseComparisonCategory[] = []

  // Fleet Category
  categories.push({
    id: 'fleet',
    type: 'fleet',
    name: 'Fleet & Ships',
    icon: '🚢',
    weight: 0.15,
    metrics: cruiseLines.map(line => ({
      category: 'fleet',
      label: line.name,
      value: line.fleetSize,
      unit: 'ships',
      description: `${line.ships[0]} is their newest ship`
    }))
  })

  // Destinations Category
  categories.push({
    id: 'destinations',
    type: 'destinations',
    name: 'Destinations',
    icon: '🌍',
    weight: 0.2,
    metrics: cruiseLines.map(line => ({
      category: 'destinations',
      label: line.name,
      value: line.destinations.length,
      unit: 'regions',
      description: line.destinations.slice(0, 3).join(', ') + '...'
    }))
  })

  // Pricing Category
  categories.push({
    id: 'pricing',
    type: 'pricing',
    name: 'Price Range',
    icon: '💰',
    weight: 0.25,
    metrics: cruiseLines.map(line => ({
      category: 'pricing',
      label: line.name,
      value: `$${line.priceRange.min}-$${line.priceRange.max}`,
      unit: 'per night',
      description: `Average: $${line.priceRange.average}`
    }))
  })

  // Dining Category
  categories.push({
    id: 'dining',
    type: 'dining',
    name: 'Dining Options',
    icon: '🍽️',
    weight: 0.15,
    metrics: cruiseLines.map(line => ({
      category: 'dining',
      label: line.name,
      value: getDiningScore(line),
      unit: 'options',
      description: getDiningHighlights(line)
    }))
  })

  // Entertainment Category
  categories.push({
    id: 'entertainment',
    type: 'entertainment',
    name: 'Entertainment',
    icon: '🎭',
    weight: 0.15,
    metrics: cruiseLines.map(line => ({
      category: 'entertainment',
      label: line.name,
      value: getEntertainmentScore(line),
      unit: 'score',
      description: getEntertainmentHighlights(line)
    }))
  })

  // Loyalty Program Category
  categories.push({
    id: 'loyalty',
    type: 'loyalty',
    name: 'Loyalty Program',
    icon: '⭐',
    weight: 0.1,
    metrics: cruiseLines.map(line => ({
      category: 'loyalty',
      label: line.name,
      value: line.loyaltyProgram,
      description: `Member benefits and perks`
    }))
  })

  return categories
}

function calculateComparisonScores(
  cruiseLines: CruiseLine[],
  categories: CruiseComparisonCategory[],
  preferences?: any
): ComparisonScore[] {
  return cruiseLines.map((line, index) => {
    const categoryScores: Record<string, number> = {}
    let totalScore = 0

    categories.forEach(category => {
      const score = calculateCategoryScore(line, category, preferences)
      categoryScores[category.id] = score
      totalScore += score * (category.weight || 0.1)
    })

    return {
      itemId: line.id,
      totalScore: Math.round(totalScore),
      categoryScores,
      rank: 0, // Will be set after sorting
      recommendation: generateRecommendation(line, totalScore)
    }
  }).sort((a, b) => b.totalScore - a.totalScore)
    .map((score, index) => ({ ...score, rank: index + 1 }))
}

// ============= Dining Comparison =============

export async function getDiningComparison(cruiseLineId: string): Promise<DiningComparison | null> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const cruiseLine = await getCruiseLineData(cruiseLineId)
  if (!cruiseLine) return null

  // Mock dining data based on cruise line
  const diningData: Record<string, DiningComparison> = {
    'royal-caribbean': {
      mainDiningRooms: 3,
      specialtyRestaurants: 12,
      complimentaryOptions: 8,
      roomService24h: true,
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Kosher', 'Halal'],
      signatureDining: ['Wonderland', 'Chops Grille', 'Giovanni\'s', 'Izumi', '150 Central Park']
    },
    'carnival': {
      mainDiningRooms: 2,
      specialtyRestaurants: 6,
      complimentaryOptions: 10,
      roomService24h: false,
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
      signatureDining: ['Guy\'s Burger Joint', 'BlueIguana Cantina', 'Fahrenheit 555', 'Bonsai Sushi']
    },
    'norwegian': {
      mainDiningRooms: 2,
      specialtyRestaurants: 15,
      complimentaryOptions: 7,
      roomService24h: true,
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Kosher'],
      signatureDining: ['Cagney\'s Steakhouse', 'Le Bistro', 'Teppanyaki', 'La Cucina', 'Ocean Blue']
    },
    'princess': {
      mainDiningRooms: 3,
      specialtyRestaurants: 7,
      complimentaryOptions: 6,
      roomService24h: true,
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Kosher'],
      signatureDining: ['Crown Grill', 'Sabatini\'s', 'Bistro Sur La Mer', 'The Catch', 'Salty Dog Gastropub']
    },
    'celebrity': {
      mainDiningRooms: 4,
      specialtyRestaurants: 10,
      complimentaryOptions: 5,
      roomService24h: true,
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Kosher', 'Raw'],
      signatureDining: ['Le Petit Chef', 'Murano', 'Tuscan Grille', 'Raw on 5', 'Eden Restaurant']
    }
  }

  return diningData[cruiseLineId] || {
    mainDiningRooms: 2,
    specialtyRestaurants: 5,
    complimentaryOptions: 5,
    roomService24h: true,
    dietaryOptions: ['Vegetarian', 'Gluten-Free'],
    signatureDining: ['Main Restaurant', 'Buffet', 'Specialty Dining']
  }
}

// ============= Entertainment Comparison =============

export async function getEntertainmentComparison(cruiseLineId: string): Promise<EntertainmentComparison | null> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const cruiseLine = await getCruiseLineData(cruiseLineId)
  if (!cruiseLine) return null

  const entertainmentData: Record<string, EntertainmentComparison> = {
    'royal-caribbean': {
      shows: ['Broadway Shows', 'Ice Shows', 'AquaTheater', 'Comedy Club', 'Live Music'],
      activities: ['FlowRider', 'Rock Climbing', 'Zip Line', 'Mini Golf', 'Basketball'],
      kidsPrograms: true,
      teenPrograms: true,
      adultOnly: ['Solarium', 'Viking Crown Lounge', 'Adults-only pool'],
      casinos: true,
      nightlife: ['Night Club', 'Jazz Club', 'Piano Bar', 'Karaoke', 'Silent Disco']
    },
    'carnival': {
      shows: ['Playlist Productions', 'Comedy Club', 'Hasbro Game Shows', 'Live Music'],
      activities: ['BOLT Coaster', 'WaterWorks', 'Mini Golf', 'Basketball', 'Jogging Track'],
      kidsPrograms: true,
      teenPrograms: true,
      adultOnly: ['Serenity Adult Retreat', 'Adults-only hot tub'],
      casinos: true,
      nightlife: ['Night Club', 'Piano Bar', 'Comedy Club', 'RedFrog Pub', 'Alchemy Bar']
    },
    'norwegian': {
      shows: ['Broadway Shows', 'Comedy Club', 'Live Music', 'Magic Shows'],
      activities: ['Go-Karts', 'Laser Tag', 'Aqua Park', 'Ropes Course', 'Mini Golf'],
      kidsPrograms: true,
      teenPrograms: true,
      adultOnly: ['Spice H2O', 'Vibe Beach Club', 'The Haven'],
      casinos: true,
      nightlife: ['Night Club', 'Howl at the Moon', 'Bliss Ultra Lounge', 'Headliners Comedy']
    },
    'princess': {
      shows: ['Princess Theater', 'Movies Under Stars', 'Live Music', 'Guest Entertainers'],
      activities: ['The Sanctuary', 'Lotus Spa', 'Art Gallery', 'Library', 'Sports Court'],
      kidsPrograms: true,
      teenPrograms: true,
      adultOnly: ['The Sanctuary', 'Adults-only pool area'],
      casinos: true,
      nightlife: ['Vista Lounge', 'Explorers Lounge', 'Wheelhouse Bar', 'Club 6']
    },
    'celebrity': {
      shows: ['Theater Productions', 'Live Music', 'Guest Performers', 'Silent Disco'],
      activities: ['Lawn Club', 'Hot Glass Show', 'Art Gallery', 'Library', 'Sports Court'],
      kidsPrograms: true,
      teenPrograms: true,
      adultOnly: ['Solarium', 'The Retreat', 'Adults-only pool'],
      casinos: true,
      nightlife: ['Eden', 'The Club', 'Ensemble Lounge', 'World Class Bar', 'Martini Bar']
    }
  }

  return entertainmentData[cruiseLineId] || {
    shows: ['Theater Shows', 'Live Music'],
    activities: ['Pool', 'Fitness Center', 'Sports Court'],
    kidsPrograms: true,
    teenPrograms: false,
    adultOnly: ['Adults-only area'],
    casinos: true,
    nightlife: ['Lounge', 'Bar']
  }
}

// ============= Helper Functions =============

function calculateAverageFleetAge(cruiseLine: CruiseLine): number {
  // Mock calculation - in reality would use ship launch dates
  const ageMap: Record<string, number> = {
    'royal-caribbean': 12,
    'carnival': 15,
    'norwegian': 10,
    'princess': 13,
    'celebrity': 11
  }
  return ageMap[cruiseLine.id] || 15
}

function getNewestShip(cruiseLine: CruiseLine): string {
  return cruiseLine.ships[0] // Ships are ordered by newest first in our data
}

function getLargestShip(cruiseLine: CruiseLine): string {
  // Mock data - in reality would use actual ship sizes
  const largestShips: Record<string, string> = {
    'royal-caribbean': 'Icon of the Seas',
    'carnival': 'Mardi Gras',
    'norwegian': 'Norwegian Prima',
    'princess': 'Sun Princess',
    'celebrity': 'Celebrity Beyond'
  }
  return largestShips[cruiseLine.id] || cruiseLine.ships[0]
}

function getSmallestShip(cruiseLine: CruiseLine): string {
  return cruiseLine.ships[cruiseLine.ships.length - 1]
}

function getAverageCapacity(cruiseLine: CruiseLine): number {
  const capacityMap: Record<string, number> = {
    'royal-caribbean': 4500,
    'carnival': 3500,
    'norwegian': 3000,
    'princess': 3000,
    'celebrity': 2900
  }
  return capacityMap[cruiseLine.id] || 3000
}

function getDiningScore(cruiseLine: CruiseLine): number {
  // Simple scoring based on highlights mentioning dining
  const diningKeywords = ['restaurant', 'dining', 'food', 'chef', 'cuisine', 'grill', 'pizza']
  const diningHighlights = cruiseLine.highlights.filter(h =>
    diningKeywords.some(keyword => h.toLowerCase().includes(keyword))
  )
  return 10 + diningHighlights.length * 2
}

function getDiningHighlights(cruiseLine: CruiseLine): string {
  const diningMap: Record<string, string> = {
    'royal-caribbean': 'Specialty dining at Central Park, Wonderland, Chops Grille',
    'carnival': 'Guy Fieri restaurants, 24/7 pizza and ice cream',
    'norwegian': '25+ dining options, no fixed dining times',
    'princess': 'Culinary experiences with Chef Curtis Stone',
    'celebrity': 'Michelin-starred chef partnerships, Le Petit Chef'
  }
  return diningMap[cruiseLine.id] || 'Various dining options available'
}

function getEntertainmentScore(cruiseLine: CruiseLine): number {
  const entertainmentKeywords = ['show', 'entertainment', 'theater', 'broadway', 'activity']
  const entertainmentHighlights = cruiseLine.highlights.filter(h =>
    entertainmentKeywords.some(keyword => h.toLowerCase().includes(keyword))
  )
  return 10 + entertainmentHighlights.length * 2
}

function getEntertainmentHighlights(cruiseLine: CruiseLine): string {
  const entertainmentMap: Record<string, string> = {
    'royal-caribbean': 'Broadway shows, Ice skating, AquaTheater',
    'carnival': 'BOLT roller coaster, Comedy Club, Hasbro shows',
    'norwegian': 'Go-kart tracks, Broadway shows, Freestyle entertainment',
    'princess': 'Movies Under the Stars, Discovery at Sea programs',
    'celebrity': 'Edge innovations, Hot Glass Show, Eden experiences'
  }
  return entertainmentMap[cruiseLine.id] || 'Various entertainment options'
}

function calculateCategoryScore(
  cruiseLine: CruiseLine,
  category: CruiseComparisonCategory,
  preferences?: any
): number {
  // Simple scoring algorithm - would be more complex in production
  let score = 50 // Base score

  switch (category.type) {
    case 'fleet':
      score += cruiseLine.fleetSize * 2
      break
    case 'destinations':
      score += cruiseLine.destinations.length * 3
      break
    case 'pricing':
      if (preferences?.budget === 'budget' && cruiseLine.priceRange.min < 400) {
        score += 30
      } else if (preferences?.budget === 'luxury' && cruiseLine.priceRange.max > 2500) {
        score += 30
      }
      break
    case 'dining':
      score += getDiningScore(cruiseLine)
      break
    case 'entertainment':
      score += getEntertainmentScore(cruiseLine)
      break
    default:
      score += cruiseLine.rating.value * 10
  }

  return Math.min(100, Math.max(0, score))
}

function generateRecommendation(cruiseLine: CruiseLine, score: number): string {
  if (score >= 80) {
    return `Excellent choice! ${cruiseLine.name} excels in most categories and offers great value.`
  } else if (score >= 60) {
    return `Good option. ${cruiseLine.name} has strong offerings with some areas for consideration.`
  } else {
    return `Consider your priorities. ${cruiseLine.name} may be suitable for specific preferences.`
  }
}

function generateComparisonId(): string {
  return `comparison-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// ============= Popular Comparisons =============

export async function getPopularComparisons(): Promise<Array<{
  cruiseLines: string[]
  count: number
  title: string
}>> {
  await new Promise(resolve => setTimeout(resolve, 50))

  return [
    {
      cruiseLines: ['royal-caribbean', 'carnival'],
      count: 1543,
      title: 'Family Cruise Giants'
    },
    {
      cruiseLines: ['norwegian', 'royal-caribbean', 'carnival'],
      count: 987,
      title: 'Top 3 Mainstream Lines'
    },
    {
      cruiseLines: ['celebrity', 'princess'],
      count: 654,
      title: 'Premium Cruise Experience'
    },
    {
      cruiseLines: ['royal-caribbean', 'norwegian'],
      count: 521,
      title: 'Innovation Leaders'
    }
  ]
}

// ============= Recommendations =============

export async function getRecommendedCruiseLines(preferences: any): Promise<CruiseLine[]> {
  await new Promise(resolve => setTimeout(resolve, 150))

  let recommendations = [...CRUISE_LINES]

  // Filter by budget
  if (preferences.budget === 'budget') {
    recommendations = recommendations.filter(line => line.priceRange.min < 500)
  } else if (preferences.budget === 'luxury') {
    recommendations = recommendations.filter(line => line.priceRange.average > 1000)
  }

  // Filter by ideal for
  if (preferences.travelStyle?.includes('family')) {
    recommendations = recommendations.filter(line =>
      line.idealFor.some(ideal => ideal.toLowerCase().includes('famil'))
    )
  }

  // Sort by rating
  recommendations.sort((a, b) => b.rating.value - a.rating.value)

  return recommendations.slice(0, 3)
}