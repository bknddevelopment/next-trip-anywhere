/**
 * Destinations API
 * Mock API for destination data and comparisons
 */

import {
  DestinationComparison,
  TravelMetrics,
  WeatherMetrics,
  BudgetMetrics,
  WeatherData,
  SeasonalPricing,
  DestinationComparisonCategory,
  ComparisonScore
} from '../types/comparison'

// Mock destination data
const MOCK_DESTINATIONS = [
  {
    id: 'caribbean',
    name: 'Caribbean',
    region: 'Caribbean Islands',
    coordinates: { latitude: 18.0, longitude: -64.0 },
    distanceFromNewark: 1600,
    flightTime: 4,
    climate: 'tropical'
  },
  {
    id: 'mexico',
    name: 'Cancun, Mexico',
    region: 'Mexico',
    coordinates: { latitude: 21.16, longitude: -86.85 },
    distanceFromNewark: 1550,
    flightTime: 3.5,
    climate: 'tropical'
  },
  {
    id: 'bahamas',
    name: 'Bahamas',
    region: 'Caribbean',
    coordinates: { latitude: 25.03, longitude: -77.39 },
    distanceFromNewark: 1100,
    flightTime: 2.5,
    climate: 'tropical'
  },
  {
    id: 'bermuda',
    name: 'Bermuda',
    region: 'Atlantic',
    coordinates: { latitude: 32.32, longitude: -64.78 },
    distanceFromNewark: 775,
    flightTime: 2,
    climate: 'subtropical'
  },
  {
    id: 'hawaii',
    name: 'Hawaii',
    region: 'Pacific',
    coordinates: { latitude: 19.89, longitude: -155.58 },
    distanceFromNewark: 4950,
    flightTime: 11,
    climate: 'tropical'
  },
  {
    id: 'europe',
    name: 'Mediterranean',
    region: 'Europe',
    coordinates: { latitude: 41.89, longitude: 12.51 },
    distanceFromNewark: 4280,
    flightTime: 9,
    climate: 'mediterranean'
  }
]

// ============= Destination Data =============

export async function getDestinationData(id: string): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const destination = MOCK_DESTINATIONS.find(d => d.id === id)
  if (!destination) return null

  return {
    ...destination,
    description: generateDestinationDescription(destination),
    highlights: generateHighlights(destination),
    bestTimeToVisit: generateBestTime(destination)
  }
}

export async function compareDestinations(
  destinationIds: string[],
  travelDates?: { start: string; end: string },
  preferences?: any
): Promise<DestinationComparison> {
  await new Promise(resolve => setTimeout(resolve, 200))

  const destinations = await Promise.all(
    destinationIds.map(id => getDestinationData(id))
  )
  const validDestinations = destinations.filter(d => d !== null)

  const categories = generateDestinationCategories(validDestinations)
  const scores = calculateDestinationScores(validDestinations, categories, preferences)

  return {
    id: generateComparisonId(),
    destinations: validDestinations,
    categories,
    travelDates,
    userPreferences: preferences,
    recommendations: generateRecommendations(validDestinations, scores),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

// ============= Travel Metrics =============

export async function getTravelMetrics(destinationId: string): Promise<TravelMetrics> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const destination = MOCK_DESTINATIONS.find(d => d.id === destinationId)
  if (!destination) {
    throw new Error('Destination not found')
  }

  const airlinesByDestination: Record<string, string[]> = {
    caribbean: ['United', 'American', 'JetBlue', 'Delta', 'Southwest'],
    mexico: ['United', 'American', 'Spirit', 'Frontier', 'Aeromexico'],
    bahamas: ['United', 'American', 'JetBlue', 'Southwest', 'Bahamasair'],
    bermuda: ['United', 'American', 'JetBlue', 'Delta'],
    hawaii: ['United', 'Hawaiian', 'American', 'Delta', 'Alaska'],
    europe: ['United', 'American', 'Delta', 'Lufthansa', 'British Airways']
  }

  const flightCosts: Record<string, number> = {
    caribbean: 450,
    mexico: 380,
    bahamas: 320,
    bermuda: 350,
    hawaii: 650,
    europe: 800
  }

  return {
    distanceFromNewark: destination.distanceFromNewark,
    flightTime: destination.flightTime,
    averageFlightCost: flightCosts[destinationId] || 500,
    directFlights: destination.flightTime < 5,
    airlines: airlinesByDestination[destinationId] || ['United', 'American'],
    visaRequired: destinationId === 'europe',
    bestAirport: 'Newark Liberty International (EWR)'
  }
}

// ============= Weather Metrics =============

export async function getWeatherData(
  destinationId: string,
  month?: number
): Promise<WeatherData> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const weatherByDestination: Record<string, any> = {
    caribbean: {
      temperature: { high: 85, low: 75, average: 80 },
      precipitation: month && month >= 6 && month <= 11 ? 8 : 4,
      rainyDays: month && month >= 6 && month <= 11 ? 12 : 6,
      humidity: 75,
      windSpeed: 15,
      seaTemperature: 82,
      uvIndex: 11,
      hurricaneRisk: month && month >= 6 && month <= 11
    },
    mexico: {
      temperature: { high: 88, low: 73, average: 80 },
      precipitation: month && month >= 5 && month <= 10 ? 10 : 3,
      rainyDays: month && month >= 5 && month <= 10 ? 14 : 4,
      humidity: 80,
      windSpeed: 12,
      seaTemperature: 84,
      uvIndex: 11,
      hurricaneRisk: month && month >= 6 && month <= 11
    },
    bahamas: {
      temperature: { high: 84, low: 72, average: 78 },
      precipitation: month && month >= 5 && month <= 10 ? 7 : 3,
      rainyDays: month && month >= 5 && month <= 10 ? 10 : 5,
      humidity: 72,
      windSpeed: 14,
      seaTemperature: 80,
      uvIndex: 10,
      hurricaneRisk: month && month >= 6 && month <= 11
    },
    bermuda: {
      temperature: { high: 78, low: 68, average: 73 },
      precipitation: 5,
      rainyDays: 8,
      humidity: 70,
      windSpeed: 18,
      seaTemperature: 75,
      uvIndex: 9,
      hurricaneRisk: month && month >= 7 && month <= 10
    },
    hawaii: {
      temperature: { high: 82, low: 72, average: 77 },
      precipitation: month && month >= 11 || month <= 3 ? 6 : 2,
      rainyDays: month && month >= 11 || month <= 3 ? 9 : 4,
      humidity: 65,
      windSpeed: 16,
      seaTemperature: 78,
      uvIndex: 10,
      hurricaneRisk: false
    },
    europe: {
      temperature: {
        high: month && month >= 6 && month <= 9 ? 82 : 60,
        low: month && month >= 6 && month <= 9 ? 68 : 45,
        average: month && month >= 6 && month <= 9 ? 75 : 52
      },
      precipitation: month && month >= 11 || month <= 3 ? 4 : 2,
      rainyDays: month && month >= 11 || month <= 3 ? 7 : 3,
      humidity: 60,
      windSpeed: 12,
      seaTemperature: month && month >= 6 && month <= 9 ? 72 : 58,
      uvIndex: month && month >= 6 && month <= 9 ? 8 : 3,
      hurricaneRisk: false
    }
  }

  const weather = weatherByDestination[destinationId] || weatherByDestination.caribbean

  return {
    destinationId,
    month: month || new Date().getMonth() + 1,
    ...weather,
    packingList: generatePackingList(weather, destinationId),
    activities: {
      recommended: generateRecommendedActivities(weather, destinationId),
      notRecommended: generateNotRecommendedActivities(weather, destinationId)
    }
  }
}

export async function getWeatherMetrics(destinationId: string): Promise<WeatherMetrics> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const weatherMetricsByDestination: Record<string, WeatherMetrics> = {
    caribbean: {
      averageTemp: { high: 85, low: 75 },
      rainyDays: 8,
      humidity: 75,
      hurricaneRisk: true,
      bestMonths: [1, 2, 3, 4, 12],
      worstMonths: [9, 10]
    },
    mexico: {
      averageTemp: { high: 88, low: 73 },
      rainyDays: 9,
      humidity: 80,
      hurricaneRisk: true,
      bestMonths: [1, 2, 3, 4, 11, 12],
      worstMonths: [8, 9, 10]
    },
    bahamas: {
      averageTemp: { high: 84, low: 72 },
      rainyDays: 7,
      humidity: 72,
      hurricaneRisk: true,
      bestMonths: [1, 2, 3, 4, 5, 12],
      worstMonths: [9, 10]
    },
    bermuda: {
      averageTemp: { high: 78, low: 68 },
      rainyDays: 8,
      humidity: 70,
      hurricaneRisk: true,
      bestMonths: [5, 6, 7, 8],
      worstMonths: [1, 2, 12]
    },
    hawaii: {
      averageTemp: { high: 82, low: 72 },
      rainyDays: 6,
      humidity: 65,
      hurricaneRisk: false,
      bestMonths: [4, 5, 6, 9, 10, 11],
      worstMonths: [1, 2]
    },
    europe: {
      averageTemp: { high: 71, low: 56 },
      rainyDays: 5,
      humidity: 60,
      hurricaneRisk: false,
      bestMonths: [5, 6, 7, 8, 9],
      worstMonths: [1, 2, 12]
    }
  }

  return weatherMetricsByDestination[destinationId] || weatherMetricsByDestination.caribbean
}

// ============= Budget Metrics =============

export async function getBudgetMetrics(destinationId: string): Promise<BudgetMetrics> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const budgetByDestination: Record<string, BudgetMetrics> = {
    caribbean: {
      dailyBudget: { budget: 100, midRange: 200, luxury: 500 },
      mealCost: 35,
      transportCost: 25,
      attractionCost: 40,
      hotelCost: { budget: 80, midRange: 150, luxury: 400 }
    },
    mexico: {
      dailyBudget: { budget: 75, midRange: 150, luxury: 400 },
      mealCost: 25,
      transportCost: 20,
      attractionCost: 30,
      hotelCost: { budget: 60, midRange: 120, luxury: 350 }
    },
    bahamas: {
      dailyBudget: { budget: 120, midRange: 250, luxury: 600 },
      mealCost: 45,
      transportCost: 30,
      attractionCost: 50,
      hotelCost: { budget: 100, midRange: 200, luxury: 500 }
    },
    bermuda: {
      dailyBudget: { budget: 150, midRange: 300, luxury: 700 },
      mealCost: 50,
      transportCost: 35,
      attractionCost: 45,
      hotelCost: { budget: 120, midRange: 250, luxury: 600 }
    },
    hawaii: {
      dailyBudget: { budget: 130, midRange: 280, luxury: 650 },
      mealCost: 40,
      transportCost: 35,
      attractionCost: 45,
      hotelCost: { budget: 110, midRange: 230, luxury: 550 }
    },
    europe: {
      dailyBudget: { budget: 110, midRange: 220, luxury: 500 },
      mealCost: 35,
      transportCost: 25,
      attractionCost: 35,
      hotelCost: { budget: 90, midRange: 180, luxury: 450 }
    }
  }

  return budgetByDestination[destinationId] || budgetByDestination.caribbean
}

// ============= Seasonal Pricing =============

export async function getSeasonalPricing(
  destinationId: string,
  month: number
): Promise<SeasonalPricing> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const isHighSeason = (destId: string, m: number): boolean => {
    const highSeasons: Record<string, number[]> = {
      caribbean: [12, 1, 2, 3, 4],
      mexico: [12, 1, 2, 3, 7, 8],
      bahamas: [12, 1, 2, 3, 4, 7, 8],
      bermuda: [6, 7, 8, 9],
      hawaii: [6, 7, 8, 12, 1],
      europe: [6, 7, 8, 9]
    }
    return highSeasons[destId]?.includes(m) || false
  }

  const isLowSeason = (destId: string, m: number): boolean => {
    const lowSeasons: Record<string, number[]> = {
      caribbean: [9, 10, 11],
      mexico: [5, 9, 10],
      bahamas: [9, 10, 11],
      bermuda: [1, 2, 3, 11, 12],
      hawaii: [4, 5, 9, 10],
      europe: [11, 12, 1, 2, 3]
    }
    return lowSeasons[destId]?.includes(m) || false
  }

  const season = isHighSeason(destinationId, month) ? 'peak' :
                 isLowSeason(destinationId, month) ? 'low' : 'shoulder'

  const priceMultiplier = season === 'peak' ? 1.3 :
                          season === 'low' ? 0.8 : 1.0

  const crowds = season === 'peak' ? 'heavy' :
                 season === 'low' ? 'light' : 'moderate'

  const seasonalEvents: Record<string, Record<number, string[]>> = {
    caribbean: {
      2: ['Carnival Season'],
      3: ['Spring Break'],
      12: ['Holiday Season']
    },
    mexico: {
      3: ['Spring Break'],
      11: ['Day of the Dead'],
      12: ['Holiday Season']
    }
  }

  return {
    destinationId,
    month,
    season,
    priceMultiplier,
    crowds,
    events: seasonalEvents[destinationId]?.[month] || [],
    pros: generateSeasonPros(season, destinationId, month),
    cons: generateSeasonCons(season, destinationId, month)
  }
}

// ============= Helper Functions =============

function generateDestinationDescription(destination: any): string {
  const descriptions: Record<string, string> = {
    caribbean: 'Crystal-clear waters, white sandy beaches, and tropical paradise await in the Caribbean islands.',
    mexico: 'Ancient Mayan ruins, vibrant culture, and stunning beaches make Mexico a perfect vacation destination.',
    bahamas: 'Just a short flight from Newark, the Bahamas offers world-class beaches and aquamarine waters.',
    bermuda: 'Pink sand beaches and British charm combine in this Atlantic island paradise.',
    hawaii: 'Experience aloha spirit, volcanic landscapes, and pristine beaches in America\'s tropical paradise.',
    europe: 'Rich history, diverse cultures, and stunning Mediterranean coastlines await in Europe.'
  }
  return descriptions[destination.id] || 'A wonderful travel destination.'
}

function generateHighlights(destination: any): string[] {
  const highlights: Record<string, string[]> = {
    caribbean: [
      'World-class beaches and diving',
      'Year-round warm weather',
      'Island hopping opportunities',
      'Water sports paradise',
      'Duty-free shopping'
    ],
    mexico: [
      'All-inclusive resorts',
      'Ancient Mayan sites',
      'Vibrant local culture',
      'Excellent cuisine',
      'Great value for money'
    ],
    bahamas: [
      'Swimming with pigs',
      'Atlantis Resort',
      'Quick flight from Newark',
      'Casino gaming',
      'World-class fishing'
    ],
    bermuda: [
      'Pink sand beaches',
      'British colonial charm',
      'Golf courses',
      'Crystal caves',
      'Shipwreck diving'
    ],
    hawaii: [
      'Volcanic landscapes',
      'Pearl Harbor',
      'Surfing paradise',
      'Luau experiences',
      'Whale watching'
    ],
    europe: [
      'Historical landmarks',
      'Diverse cuisines',
      'Art and museums',
      'Wine regions',
      'Scenic coastlines'
    ]
  }
  return highlights[destination.id] || ['Beautiful scenery', 'Great weather', 'Local culture']
}

function generateBestTime(destination: any): any {
  const bestTimes: Record<string, any> = {
    caribbean: {
      months: [1, 2, 3, 4, 12],
      description: 'December to April offers the best weather with less rain and no hurricanes'
    },
    mexico: {
      months: [1, 2, 3, 4, 11, 12],
      description: 'Winter and spring months offer perfect weather and avoid hurricane season'
    },
    bahamas: {
      months: [1, 2, 3, 4, 5, 12],
      description: 'Winter through late spring for ideal weather and calm seas'
    },
    bermuda: {
      months: [5, 6, 7, 8, 9],
      description: 'Late spring through early fall for warm beach weather'
    },
    hawaii: {
      months: [4, 5, 9, 10, 11],
      description: 'Spring and fall offer great weather with fewer crowds'
    },
    europe: {
      months: [5, 6, 7, 8, 9],
      description: 'Late spring through early fall for warm Mediterranean weather'
    }
  }
  return bestTimes[destination.id] || {
    months: [1, 2, 3, 4, 5],
    description: 'Check seasonal weather patterns for best travel times'
  }
}

function generateDestinationCategories(destinations: any[]): DestinationComparisonCategory[] {
  const categories: DestinationComparisonCategory[] = []

  // Travel Category
  categories.push({
    id: 'travel',
    type: 'travel',
    name: 'Travel & Access',
    icon: '✈️',
    weight: 0.2,
    metrics: destinations.map(dest => ({
      category: 'travel',
      label: dest.name,
      value: `${dest.flightTime} hours`,
      unit: 'flight time',
      description: `${dest.distanceFromNewark} miles from Newark`
    }))
  })

  // Weather Category
  categories.push({
    id: 'weather',
    type: 'weather',
    name: 'Weather & Climate',
    icon: '☀️',
    weight: 0.25,
    metrics: destinations.map(dest => ({
      category: 'weather',
      label: dest.name,
      value: dest.climate,
      description: `Tropical paradise with year-round warmth`
    }))
  })

  // Budget Category
  categories.push({
    id: 'budget',
    type: 'budget',
    name: 'Budget & Cost',
    icon: '💵',
    weight: 0.25,
    metrics: destinations.map(dest => ({
      category: 'budget',
      label: dest.name,
      value: getBudgetLevel(dest.id),
      description: `Daily budget from $${getDailyBudget(dest.id)}`
    }))
  })

  // Activities Category
  categories.push({
    id: 'activities',
    type: 'activities',
    name: 'Activities',
    icon: '🏖️',
    weight: 0.15,
    metrics: destinations.map(dest => ({
      category: 'activities',
      label: dest.name,
      value: getActivityScore(dest.id),
      unit: 'options',
      description: getTopActivities(dest.id)
    }))
  })

  // Safety Category
  categories.push({
    id: 'safety',
    type: 'safety',
    name: 'Safety',
    icon: '🛡️',
    weight: 0.15,
    metrics: destinations.map(dest => ({
      category: 'safety',
      label: dest.name,
      value: getSafetyRating(dest.id),
      unit: '/5',
      description: getSafetyDescription(dest.id)
    }))
  })

  return categories
}

function calculateDestinationScores(
  destinations: any[],
  categories: DestinationComparisonCategory[],
  preferences?: any
): ComparisonScore[] {
  return destinations.map((dest, index) => {
    const categoryScores: Record<string, number> = {}
    let totalScore = 0

    categories.forEach(category => {
      const score = calculateDestinationCategoryScore(dest, category, preferences)
      categoryScores[category.id] = score
      totalScore += score * (category.weight || 0.2)
    })

    return {
      itemId: dest.id,
      totalScore: Math.round(totalScore),
      categoryScores,
      rank: 0,
      recommendation: generateDestinationRecommendation(dest, totalScore)
    }
  }).sort((a, b) => b.totalScore - a.totalScore)
    .map((score, index) => ({ ...score, rank: index + 1 }))
}

function calculateDestinationCategoryScore(
  destination: any,
  category: DestinationComparisonCategory,
  preferences?: any
): number {
  let score = 50

  switch (category.type) {
    case 'travel':
      // Closer is better
      if (destination.flightTime <= 3) score += 30
      else if (destination.flightTime <= 5) score += 20
      else if (destination.flightTime <= 8) score += 10
      break

    case 'weather':
      if (destination.climate === 'tropical') score += 20
      if (destination.climate === 'mediterranean') score += 15
      break

    case 'budget':
      const budget = getDailyBudget(destination.id)
      if (preferences?.budget === 'budget' && budget < 100) score += 30
      else if (preferences?.budget === 'luxury' && budget > 200) score += 30
      break

    case 'activities':
      score += getActivityScore(destination.id) * 5
      break

    case 'safety':
      score += getSafetyRating(destination.id) * 10
      break
  }

  return Math.min(100, Math.max(0, score))
}

function generateRecommendations(destinations: any[], scores: ComparisonScore[]): any[] {
  return scores.slice(0, 3).map(score => {
    const dest = destinations.find(d => d.id === score.itemId)
    return {
      itemId: score.itemId,
      reason: generateDestinationRecommendation(dest, score.totalScore),
      score: score.totalScore,
      pros: generateDestinationPros(dest),
      cons: generateDestinationCons(dest),
      bestFor: generateBestFor(dest)
    }
  })
}

function generateDestinationRecommendation(destination: any, score: number): string {
  if (score >= 80) {
    return `${destination.name} is an excellent choice with perfect weather, great value, and easy access from Newark.`
  } else if (score >= 60) {
    return `${destination.name} offers a good balance of attractions, weather, and accessibility.`
  } else {
    return `${destination.name} may require more travel time but offers unique experiences.`
  }
}

function generateDestinationPros(destination: any): string[] {
  const pros: Record<string, string[]> = {
    caribbean: ['Perfect beaches', 'Year-round warmth', 'Island variety'],
    mexico: ['Great value', 'All-inclusive options', 'Rich culture'],
    bahamas: ['Quick flight', 'English speaking', 'Family friendly'],
    bermuda: ['Unique pink sand', 'Safe and clean', 'British charm'],
    hawaii: ['US destination', 'Diverse landscapes', 'No passport needed'],
    europe: ['Rich history', 'Cultural diversity', 'Excellent food']
  }
  return pros[destination.id] || ['Great destination', 'Good weather']
}

function generateDestinationCons(destination: any): string[] {
  const cons: Record<string, string[]> = {
    caribbean: ['Hurricane season', 'Can be pricey', 'Crowded in peak season'],
    mexico: ['Language barrier', 'Safety concerns in some areas', 'Tourist traps'],
    bahamas: ['Expensive food', 'Limited cultural sites', 'Casino focus'],
    bermuda: ['Very expensive', 'Limited beaches', 'Formal atmosphere'],
    hawaii: ['Long flight', 'Expensive', 'Time zone adjustment'],
    europe: ['Long flight', 'Jet lag', 'Language barriers']
  }
  return cons[destination.id] || ['Peak season crowds', 'Variable weather']
}

function generateBestFor(destination: any): string[] {
  const bestFor: Record<string, string[]> = {
    caribbean: ['Beach lovers', 'Water sports', 'Relaxation'],
    mexico: ['Budget travelers', 'Culture seekers', 'All-inclusive fans'],
    bahamas: ['Quick getaways', 'Families', 'Casino enthusiasts'],
    bermuda: ['Golf enthusiasts', 'Couples', 'Pink sand seekers'],
    hawaii: ['Adventure seekers', 'Nature lovers', 'Surfers'],
    europe: ['History buffs', 'Food lovers', 'Art enthusiasts']
  }
  return bestFor[destination.id] || ['General travelers', 'Vacation seekers']
}

function generatePackingList(weather: any, destinationId: string): string[] {
  const baseList = [
    'Sunscreen SPF 50+',
    'Sunglasses',
    'Light clothing',
    'Swimwear',
    'Sandals'
  ]

  if (weather.hurricaneRisk) {
    baseList.push('Light rain jacket', 'Umbrella')
  }

  if (destinationId === 'europe') {
    baseList.push('Comfortable walking shoes', 'Light jacket', 'Dress clothes')
  }

  if (destinationId === 'hawaii') {
    baseList.push('Hiking shoes', 'Reef-safe sunscreen', 'Snorkel gear')
  }

  return baseList
}

function generateRecommendedActivities(weather: any, destinationId: string): string[] {
  const activities: Record<string, string[]> = {
    caribbean: ['Beach relaxation', 'Snorkeling', 'Island tours', 'Water sports'],
    mexico: ['Resort pools', 'Mayan ruins', 'Cenote swimming', 'Tequila tasting'],
    bahamas: ['Swimming with pigs', 'Atlantis water park', 'Beach clubs', 'Fishing'],
    bermuda: ['Pink sand beaches', 'Golf', 'Crystal caves', 'Snorkeling'],
    hawaii: ['Volcano tours', 'Surfing lessons', 'Pearl Harbor', 'Luau'],
    europe: ['City tours', 'Museum visits', 'Wine tasting', 'Beach clubs']
  }
  return activities[destinationId] || ['Sightseeing', 'Beach time', 'Local tours']
}

function generateNotRecommendedActivities(weather: any, destinationId: string): string[] {
  if (weather.hurricaneRisk) {
    return ['Deep sea fishing', 'Sailing trips', 'Outdoor camping']
  }
  if (weather.temperature.average < 70) {
    return ['Beach swimming', 'Water sports', 'Snorkeling']
  }
  return ['Extreme outdoor activities during midday heat']
}

function generateSeasonPros(season: string, destinationId: string, month: number): string[] {
  if (season === 'peak') {
    return ['Best weather', 'All attractions open', 'Festive atmosphere', 'Full entertainment schedule']
  } else if (season === 'low') {
    return ['Lower prices', 'Fewer crowds', 'Better deals', 'More personal service']
  } else {
    return ['Good weather', 'Moderate prices', 'Balanced crowds', 'Good availability']
  }
}

function generateSeasonCons(season: string, destinationId: string, month: number): string[] {
  if (season === 'peak') {
    return ['Higher prices', 'Crowded attractions', 'Limited availability', 'Advance booking required']
  } else if (season === 'low') {
    return ['Variable weather', 'Some attractions closed', 'Limited events', 'Possible rain']
  } else {
    return ['Some crowds', 'Variable weather possible', 'Moderate prices']
  }
}

function getBudgetLevel(destinationId: string): string {
  const budgetLevels: Record<string, string> = {
    caribbean: '$$',
    mexico: '$',
    bahamas: '$$$',
    bermuda: '$$$$',
    hawaii: '$$$',
    europe: '$$'
  }
  return budgetLevels[destinationId] || '$$'
}

function getDailyBudget(destinationId: string): number {
  const budgets: Record<string, number> = {
    caribbean: 150,
    mexico: 100,
    bahamas: 200,
    bermuda: 250,
    hawaii: 180,
    europe: 140
  }
  return budgets[destinationId] || 150
}

function getActivityScore(destinationId: string): number {
  const scores: Record<string, number> = {
    caribbean: 9,
    mexico: 10,
    bahamas: 8,
    bermuda: 7,
    hawaii: 10,
    europe: 10
  }
  return scores[destinationId] || 7
}

function getTopActivities(destinationId: string): string {
  const activities: Record<string, string> = {
    caribbean: 'Beaches, diving, water sports',
    mexico: 'Ruins, beaches, cenotes',
    bahamas: 'Swimming with pigs, Atlantis',
    bermuda: 'Pink sand beaches, golf',
    hawaii: 'Volcanoes, surfing, Pearl Harbor',
    europe: 'History, culture, cuisine'
  }
  return activities[destinationId] || 'Various activities'
}

function getSafetyRating(destinationId: string): number {
  const ratings: Record<string, number> = {
    caribbean: 4.2,
    mexico: 3.8,
    bahamas: 4.3,
    bermuda: 4.7,
    hawaii: 4.8,
    europe: 4.5
  }
  return ratings[destinationId] || 4.0
}

function getSafetyDescription(destinationId: string): string {
  const descriptions: Record<string, string> = {
    caribbean: 'Generally safe for tourists',
    mexico: 'Stay in resort areas',
    bahamas: 'Tourist areas are safe',
    bermuda: 'Very safe destination',
    hawaii: 'Extremely safe, US territory',
    europe: 'Safe with normal precautions'
  }
  return descriptions[destinationId] || 'Exercise normal precautions'
}

function generateComparisonId(): string {
  return `dest-comparison-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// ============= Popular Destinations =============

export async function getPopularDestinations(): Promise<any[]> {
  await new Promise(resolve => setTimeout(resolve, 50))

  return MOCK_DESTINATIONS.slice(0, 4).map(dest => ({
    ...dest,
    bookingCount: Math.floor(Math.random() * 1000) + 500,
    rating: (Math.random() * 2 + 3).toFixed(1)
  }))
}

export async function getRecommendedDestinations(preferences: any): Promise<any[]> {
  await new Promise(resolve => setTimeout(resolve, 100))

  let recommendations = [...MOCK_DESTINATIONS]

  if (preferences.budget === 'budget') {
    recommendations = recommendations.filter(d =>
      ['mexico', 'bahamas'].includes(d.id)
    )
  }

  if (preferences.duration?.max <= 5) {
    recommendations = recommendations.filter(d => d.flightTime <= 5)
  }

  return recommendations.slice(0, 3)
}