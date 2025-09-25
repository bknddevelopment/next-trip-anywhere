/**
 * Tools API
 * Mock API for various travel tools and utilities
 */

import {
  CurrencyRate,
  CurrencyConversion,
  TippingGuide,
  VisaRequirement,
  DocumentChecklist,
  Excursion,
  ExcursionPlan,
  Port,
  CruiseItinerary,
  WeatherData,
  SeasonalPricing
} from '../types/comparison'

// ============= Exchange Rates =============

const MOCK_CURRENCIES: CurrencyRate[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rateToUSD: 1.00, lastUpdated: new Date().toISOString(), country: 'United States', commonly_used: true },
  { code: 'EUR', name: 'Euro', symbol: '€', rateToUSD: 0.92, lastUpdated: new Date().toISOString(), country: 'European Union', commonly_used: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', rateToUSD: 0.79, lastUpdated: new Date().toISOString(), country: 'United Kingdom', commonly_used: true },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rateToUSD: 1.36, lastUpdated: new Date().toISOString(), country: 'Canada', commonly_used: true },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', rateToUSD: 17.05, lastUpdated: new Date().toISOString(), country: 'Mexico', commonly_used: true },
  { code: 'BSD', name: 'Bahamian Dollar', symbol: 'B$', rateToUSD: 1.00, lastUpdated: new Date().toISOString(), country: 'Bahamas', commonly_used: true },
  { code: 'BMD', name: 'Bermudian Dollar', symbol: '$', rateToUSD: 1.00, lastUpdated: new Date().toISOString(), country: 'Bermuda', commonly_used: true },
  { code: 'XCD', name: 'East Caribbean Dollar', symbol: 'EC$', rateToUSD: 2.70, lastUpdated: new Date().toISOString(), country: 'Eastern Caribbean', commonly_used: true },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', rateToUSD: 155.50, lastUpdated: new Date().toISOString(), country: 'Jamaica', commonly_used: true },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: 'Bds$', rateToUSD: 2.00, lastUpdated: new Date().toISOString(), country: 'Barbados', commonly_used: true }
]

export async function getExchangeRates(currencies?: string[]): Promise<CurrencyRate[]> {
  await new Promise(resolve => setTimeout(resolve, 100))

  if (currencies && currencies.length > 0) {
    return MOCK_CURRENCIES.filter(c => currencies.includes(c.code))
  }
  return MOCK_CURRENCIES
}

export async function convertCurrency(
  from: string,
  to: string,
  amount: number
): Promise<CurrencyConversion> {
  await new Promise(resolve => setTimeout(resolve, 50))

  const fromCurrency = MOCK_CURRENCIES.find(c => c.code === from)
  const toCurrency = MOCK_CURRENCIES.find(c => c.code === to)

  if (!fromCurrency || !toCurrency) {
    throw new Error('Invalid currency code')
  }

  // Convert to USD first, then to target currency
  const usdAmount = amount / fromCurrency.rateToUSD
  const converted = usdAmount * toCurrency.rateToUSD

  // Add a small fee for conversion
  const fee = amount * 0.025 // 2.5% fee
  const total = converted - (fee * toCurrency.rateToUSD / fromCurrency.rateToUSD)

  return {
    from: fromCurrency,
    to: toCurrency,
    amount,
    converted: parseFloat(converted.toFixed(2)),
    fee: parseFloat(fee.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    timestamp: new Date().toISOString()
  }
}

export async function getTippingGuide(country: string): Promise<TippingGuide> {
  await new Promise(resolve => setTimeout(resolve, 50))

  const tippingGuides: Record<string, TippingGuide> = {
    'United States': {
      country: 'United States',
      currency: 'USD',
      restaurant: { percentage: 18, included: false, notes: '15-20% standard, 20%+ for excellent service' },
      hotel: { housekeeping: 5, bellhop: 2, concierge: 10 },
      taxi: { percentage: 15, roundUp: true },
      tour: { guide: 10, driver: 5 },
      spa: { percentage: 20 }
    },
    'Mexico': {
      country: 'Mexico',
      currency: 'MXN',
      restaurant: { percentage: 10, included: false, notes: '10-15% standard in tourist areas' },
      hotel: { housekeeping: 50, bellhop: 20, concierge: 100 },
      taxi: { percentage: 10, roundUp: true },
      tour: { guide: 100, driver: 50 },
      spa: { percentage: 15 }
    },
    'Bahamas': {
      country: 'Bahamas',
      currency: 'BSD',
      restaurant: { percentage: 15, included: true, notes: 'Often included as service charge' },
      hotel: { housekeeping: 2, bellhop: 2, concierge: 5 },
      taxi: { percentage: 15, roundUp: false },
      tour: { guide: 10, driver: 5 },
      spa: { percentage: 15 }
    },
    'Bermuda': {
      country: 'Bermuda',
      currency: 'BMD',
      restaurant: { percentage: 17, included: true, notes: 'Usually included in bill' },
      hotel: { housekeeping: 3, bellhop: 2, concierge: 10 },
      taxi: { percentage: 15, roundUp: false },
      tour: { guide: 10, driver: 5 },
      spa: { percentage: 15 }
    },
    'Caribbean': {
      country: 'Caribbean',
      currency: 'USD',
      restaurant: { percentage: 15, included: true, notes: 'Check if service charge included' },
      hotel: { housekeeping: 3, bellhop: 2, concierge: 5 },
      taxi: { percentage: 10, roundUp: true },
      tour: { guide: 10, driver: 5 },
      spa: { percentage: 15 }
    },
    'Europe': {
      country: 'Europe',
      currency: 'EUR',
      restaurant: { percentage: 10, included: true, notes: 'Round up or leave 5-10% for good service' },
      hotel: { housekeeping: 2, bellhop: 1, concierge: 5 },
      taxi: { percentage: 10, roundUp: true },
      tour: { guide: 5, driver: 2 },
      spa: { percentage: 10 }
    }
  }

  return tippingGuides[country] || tippingGuides['United States']
}

// ============= Visa Requirements =============

export async function getVisaRequirements(
  citizenship: string,
  destinations: string[]
): Promise<VisaRequirement[]> {
  await new Promise(resolve => setTimeout(resolve, 150))

  const requirements: VisaRequirement[] = []

  // Simplified visa logic for US citizens
  if (citizenship === 'United States') {
    destinations.forEach(dest => {
      const visaData: Record<string, Partial<VisaRequirement>> = {
        'Caribbean': {
          visaRequired: false,
          duration: 90,
          validityRequired: 6,
          blankPagesRequired: 1,
          vaccinations: [],
          travelInsurance: false,
          notes: 'No visa required for stays up to 90 days'
        },
        'Mexico': {
          visaRequired: false,
          duration: 180,
          validityRequired: 6,
          blankPagesRequired: 1,
          vaccinations: [],
          travelInsurance: false,
          notes: 'Tourist card required, usually included in airfare'
        },
        'Bahamas': {
          visaRequired: false,
          duration: 90,
          validityRequired: 6,
          blankPagesRequired: 1,
          vaccinations: [],
          travelInsurance: false,
          notes: 'No visa required for stays up to 90 days'
        },
        'Bermuda': {
          visaRequired: false,
          duration: 90,
          validityRequired: 6,
          blankPagesRequired: 1,
          vaccinations: [],
          travelInsurance: false,
          notes: 'No visa required for stays up to 90 days'
        },
        'Europe': {
          visaRequired: false,
          visaType: 'ETIAS',
          eVisa: true,
          duration: 90,
          processingTime: 1,
          cost: 8,
          validityRequired: 3,
          blankPagesRequired: 2,
          vaccinations: [],
          travelInsurance: true,
          applicationUrl: 'https://travel-europe.europa.eu/etias_en',
          notes: 'ETIAS authorization required starting 2025'
        },
        'Hawaii': {
          visaRequired: false,
          duration: 365,
          validityRequired: 0,
          blankPagesRequired: 0,
          vaccinations: [],
          travelInsurance: false,
          notes: 'Domestic travel - no passport required'
        }
      }

      requirements.push({
        destinationId: dest.toLowerCase(),
        destinationName: dest,
        citizenship,
        visaRequired: false,
        duration: 90,
        processingTime: 0,
        cost: 0,
        documents: ['Valid passport', 'Return ticket', 'Proof of accommodation'],
        validityRequired: 6,
        blankPagesRequired: 1,
        vaccinations: [],
        travelInsurance: false,
        additionalRequirements: [],
        ...visaData[dest]
      } as VisaRequirement)
    })
  }

  return requirements
}

export async function getDocumentChecklist(
  citizenship: string,
  destinations: string[],
  travelDate: string
): Promise<DocumentChecklist> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const visaRequirements = await getVisaRequirements(citizenship, destinations)

  // Mock passport expiry (6 months from now)
  const passportExpiry = new Date()
  passportExpiry.setMonth(passportExpiry.getMonth() + 6)

  return {
    passport: {
      valid: true,
      expiryDate: passportExpiry.toISOString(),
      validityMonths: 6
    },
    visa: visaRequirements,
    vaccinations: [
      {
        name: 'COVID-19',
        required: false,
        recommended: true,
        description: 'Fully vaccinated status recommended for travel'
      },
      {
        name: 'Hepatitis A',
        required: false,
        recommended: true,
        description: 'Recommended for travel to Caribbean and Mexico'
      },
      {
        name: 'Typhoid',
        required: false,
        recommended: true,
        description: 'Recommended for Mexico and some Caribbean islands'
      }
    ],
    insurance: {
      required: destinations.includes('Europe'),
      minimumCoverage: 50000,
      covidCoverage: true
    },
    additionalDocs: [
      'Driver\'s license or ID',
      'Credit cards and cash',
      'Travel insurance documents',
      'Hotel confirmations',
      'Flight tickets',
      'Emergency contacts'
    ],
    reminders: [
      {
        id: '1',
        type: 'document',
        title: 'Check passport expiry',
        description: 'Ensure passport is valid for 6 months beyond travel date',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'medical',
        title: 'Update vaccinations',
        description: 'Visit travel clinic for recommended vaccines',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'booking',
        title: 'Purchase travel insurance',
        description: 'Get comprehensive travel insurance with medical coverage',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
        priority: 'high'
      }
    ]
  }
}

// ============= Shore Excursions =============

export async function getPortExcursions(portId: string): Promise<Excursion[]> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const excursionsByPort: Record<string, Excursion[]> = {
    'cozumel': [
      {
        id: 'coz-1',
        portId: 'cozumel',
        name: 'Chankanaab Beach Adventure',
        description: 'Snorkel in crystal clear waters and relax on beautiful beaches',
        duration: 240,
        price: { adult: 89, child: 69, currency: 'USD' },
        difficulty: 'easy',
        activityType: 'beach',
        includes: ['Transportation', 'Snorkel equipment', 'Beach access', 'Lunch'],
        excludes: ['Drinks', 'Photos', 'Tips'],
        accessibility: {
          wheelchairAccessible: true,
          mobilityLevel: 'easy',
          walkingDistance: 500,
          stairs: false,
          uneven_terrain: false,
          restrooms: true,
          assistance_available: true
        },
        minimumAge: 5,
        maximumGroupSize: 30,
        availability: 'daily',
        rating: 4.5,
        reviewCount: 1234,
        photos: ['/images/excursions/chankanaab.jpg'],
        meetingPoint: 'Main pier exit',
        operator: 'Cozumel Tours',
        shipExcursion: true
      },
      {
        id: 'coz-2',
        portId: 'cozumel',
        name: 'Mayan Ruins of Tulum',
        description: 'Explore ancient Mayan ruins overlooking the Caribbean Sea',
        duration: 420,
        price: { adult: 129, child: 99, currency: 'USD' },
        difficulty: 'moderate',
        activityType: 'cultural',
        includes: ['Transportation', 'Ferry', 'Guide', 'Entrance fees', 'Lunch'],
        excludes: ['Drinks', 'Tips', 'Photos'],
        accessibility: {
          wheelchairAccessible: false,
          mobilityLevel: 'moderate',
          walkingDistance: 2000,
          stairs: true,
          uneven_terrain: true,
          restrooms: true,
          assistance_available: false
        },
        minimumAge: 8,
        maximumGroupSize: 25,
        availability: 'daily',
        rating: 4.7,
        reviewCount: 892,
        photos: ['/images/excursions/tulum.jpg'],
        meetingPoint: 'Ferry terminal',
        operator: 'Maya Adventures',
        shipExcursion: true
      }
    ],
    'nassau': [
      {
        id: 'nas-1',
        portId: 'nassau',
        name: 'Swimming with Pigs',
        description: 'Swim with the famous swimming pigs in crystal clear waters',
        duration: 360,
        price: { adult: 239, child: 199, currency: 'USD' },
        difficulty: 'easy',
        activityType: 'adventure',
        includes: ['Boat transfer', 'Snorkel gear', 'Lunch', 'Drinks', 'Pig interaction'],
        excludes: ['Tips', 'Photos', 'Souvenirs'],
        accessibility: {
          wheelchairAccessible: false,
          mobilityLevel: 'moderate',
          walkingDistance: 300,
          stairs: false,
          uneven_terrain: true,
          restrooms: true,
          assistance_available: true
        },
        minimumAge: 6,
        maximumGroupSize: 20,
        availability: 'daily',
        rating: 4.8,
        reviewCount: 2145,
        photos: ['/images/excursions/swimming-pigs.jpg'],
        meetingPoint: 'Port main entrance',
        operator: 'Exuma Excursions',
        shipExcursion: false
      },
      {
        id: 'nas-2',
        portId: 'nassau',
        name: 'Atlantis Day Pass',
        description: 'Full access to Atlantis Resort pools, beaches, and aquarium',
        duration: 480,
        price: { adult: 195, child: 145, currency: 'USD' },
        difficulty: 'easy',
        activityType: 'beach',
        includes: ['Resort access', 'Beach chairs', 'Aquarium', 'Water slides'],
        excludes: ['Food', 'Drinks', 'Casino', 'Dolphin encounter'],
        accessibility: {
          wheelchairAccessible: true,
          mobilityLevel: 'easy',
          walkingDistance: 1000,
          stairs: false,
          uneven_terrain: false,
          restrooms: true,
          assistance_available: true
        },
        minimumAge: 0,
        maximumGroupSize: 0,
        availability: 'daily',
        rating: 4.4,
        reviewCount: 3456,
        photos: ['/images/excursions/atlantis.jpg'],
        meetingPoint: 'Self-guided',
        operator: 'Atlantis Resort',
        shipExcursion: true
      }
    ],
    'st-thomas': [
      {
        id: 'stt-1',
        portId: 'st-thomas',
        name: 'Magens Bay Beach Break',
        description: 'Relax at one of the world\'s most beautiful beaches',
        duration: 240,
        price: { adult: 45, child: 35, currency: 'USD' },
        difficulty: 'easy',
        activityType: 'beach',
        includes: ['Transportation', 'Beach entry', 'Beach chair'],
        excludes: ['Food', 'Drinks', 'Water sports'],
        accessibility: {
          wheelchairAccessible: true,
          mobilityLevel: 'easy',
          walkingDistance: 200,
          stairs: false,
          uneven_terrain: false,
          restrooms: true,
          assistance_available: true
        },
        minimumAge: 0,
        maximumGroupSize: 50,
        availability: 'daily',
        rating: 4.6,
        reviewCount: 1789,
        photos: ['/images/excursions/magens-bay.jpg'],
        meetingPoint: 'Havensight Mall',
        operator: 'Island Tours VI',
        shipExcursion: true
      }
    ]
  }

  return excursionsByPort[portId] || []
}

export async function planExcursions(
  itinerary: CruiseItinerary,
  preferences?: any
): Promise<ExcursionPlan> {
  await new Promise(resolve => setTimeout(resolve, 200))

  const selectedExcursions: Excursion[] = []
  let totalCost = 0
  let totalDuration = 0

  // Get excursions for each port
  for (const port of itinerary.ports) {
    const portExcursions = await getPortExcursions(port.id)

    // Select best excursion based on preferences
    if (portExcursions.length > 0) {
      const selected = selectBestExcursion(portExcursions, preferences)
      if (selected) {
        selectedExcursions.push(selected)
        totalCost += selected.price.adult * (preferences?.groupSize || 2)
        totalDuration += selected.duration
      }
    }
  }

  // Get recommendations
  const recommendations = await getExcursionRecommendations(itinerary, preferences)

  return {
    cruiseItinerary: itinerary,
    selectedExcursions,
    totalCost,
    totalDuration,
    conflicts: checkExcursionConflicts(selectedExcursions, itinerary),
    recommendations
  }
}

function selectBestExcursion(excursions: Excursion[], preferences?: any): Excursion | null {
  if (!excursions.length) return null

  // Filter by preferences
  let filtered = [...excursions]

  if (preferences?.budget === 'budget') {
    filtered = filtered.filter(e => e.price.adult < 100)
  }

  if (preferences?.accessibility?.wheelchairAccessible) {
    filtered = filtered.filter(e => e.accessibility.wheelchairAccessible)
  }

  if (preferences?.difficulty) {
    filtered = filtered.filter(e => e.difficulty === preferences.difficulty)
  }

  // Sort by rating
  filtered.sort((a, b) => b.rating - a.rating)

  return filtered[0] || excursions[0]
}

function checkExcursionConflicts(
  excursions: Excursion[],
  itinerary: CruiseItinerary
): any[] {
  const conflicts: any[] = []

  excursions.forEach((excursion, index) => {
    const port = itinerary.ports.find(p => p.id === excursion.portId)
    if (port) {
      // Check if excursion duration fits in port time
      const portTime = calculatePortTime(port.arrivalTime, port.allAboardTime)
      if (excursion.duration > portTime - 60) { // Leave 1 hour buffer
        conflicts.push({
          type: 'timing',
          description: `${excursion.name} may not leave enough time to return to ship`,
          severity: 'warning',
          resolution: 'Consider a shorter excursion or ship-sponsored tour'
        })
      }
    }
  })

  return conflicts
}

function calculatePortTime(arrival: string, departure: string): number {
  // Simple calculation - in reality would parse times
  return 420 // 7 hours
}

async function getExcursionRecommendations(
  itinerary: CruiseItinerary,
  preferences?: any
): Promise<Excursion[]> {
  const recommendations: Excursion[] = []

  for (const port of itinerary.ports) {
    const excursions = await getPortExcursions(port.id)
    const topRated = excursions
      .filter(e => e.rating >= 4.5)
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, 2)

    recommendations.push(...topRated)
  }

  return recommendations
}

// ============= Weather History =============

export async function getWeatherHistory(
  destinationId: string,
  months: number[]
): Promise<WeatherData[]> {
  await new Promise(resolve => setTimeout(resolve, 150))

  const weatherData: WeatherData[] = []

  for (const month of months) {
    // Import the function from destinations API
    const { getWeatherData } = await import('./destinations')
    const monthData = await getWeatherData(destinationId, month)
    weatherData.push(monthData)
  }

  return weatherData
}

export async function getSeasonalPricingHistory(
  destinationId: string
): Promise<SeasonalPricing[]> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const pricingData: SeasonalPricing[] = []

  for (let month = 1; month <= 12; month++) {
    const { getSeasonalPricing } = await import('./destinations')
    const pricing = await getSeasonalPricing(destinationId, month)
    pricingData.push(pricing)
  }

  return pricingData
}

// ============= Mock Cruise Itineraries =============

export async function getCruiseItineraries(cruiseLineId?: string): Promise<CruiseItinerary[]> {
  await new Promise(resolve => setTimeout(resolve, 100))

  const itineraries: CruiseItinerary[] = [
    {
      cruiseLineId: 'royal-caribbean',
      shipName: 'Icon of the Seas',
      ports: [
        {
          id: 'cozumel',
          name: 'Cozumel, Mexico',
          country: 'Mexico',
          arrivalTime: '08:00',
          departureTime: '17:00',
          allAboardTime: '16:30',
          excursions: [],
          distance: 3,
          transportation: ['Taxi', 'Walking', 'Rental'],
          highlights: ['Beaches', 'Mayan Ruins', 'Snorkeling']
        },
        {
          id: 'nassau',
          name: 'Nassau, Bahamas',
          country: 'Bahamas',
          arrivalTime: '09:00',
          departureTime: '18:00',
          allAboardTime: '17:30',
          excursions: [],
          distance: 5,
          transportation: ['Taxi', 'Water Taxi'],
          highlights: ['Atlantis', 'Beaches', 'Shopping']
        },
        {
          id: 'perfect-day',
          name: 'Perfect Day at CocoCay',
          country: 'Bahamas',
          arrivalTime: '07:00',
          departureTime: '17:00',
          allAboardTime: '16:30',
          excursions: [],
          distance: 0,
          transportation: ['Walking'],
          highlights: ['Water Park', 'Beaches', 'Zip Line']
        }
      ],
      embarkation: {
        id: 'miami',
        name: 'Miami, Florida',
        country: 'USA',
        arrivalTime: '11:00',
        departureTime: '16:00',
        allAboardTime: '15:00',
        excursions: [],
        distance: 8,
        transportation: ['Taxi', 'Uber', 'Shuttle'],
        highlights: []
      },
      disembarkation: {
        id: 'miami',
        name: 'Miami, Florida',
        country: 'USA',
        arrivalTime: '06:00',
        departureTime: '10:00',
        allAboardTime: '',
        excursions: [],
        distance: 8,
        transportation: ['Taxi', 'Uber', 'Shuttle'],
        highlights: []
      },
      seaDays: 2,
      totalDays: 7
    },
    {
      cruiseLineId: 'carnival',
      shipName: 'Mardi Gras',
      ports: [
        {
          id: 'cozumel',
          name: 'Cozumel, Mexico',
          country: 'Mexico',
          arrivalTime: '08:00',
          departureTime: '16:00',
          allAboardTime: '15:30',
          excursions: [],
          distance: 3,
          transportation: ['Taxi', 'Walking'],
          highlights: ['Beaches', 'Diving', 'Shopping']
        },
        {
          id: 'costa-maya',
          name: 'Costa Maya, Mexico',
          country: 'Mexico',
          arrivalTime: '09:00',
          departureTime: '17:00',
          allAboardTime: '16:30',
          excursions: [],
          distance: 2,
          transportation: ['Walking', 'Beach Shuttle'],
          highlights: ['Beach Club', 'Ruins', 'Shopping']
        }
      ],
      embarkation: {
        id: 'port-canaveral',
        name: 'Port Canaveral, Florida',
        country: 'USA',
        arrivalTime: '11:00',
        departureTime: '16:00',
        allAboardTime: '15:00',
        excursions: [],
        distance: 45,
        transportation: ['Shuttle', 'Uber', 'Rental Car'],
        highlights: []
      },
      disembarkation: {
        id: 'port-canaveral',
        name: 'Port Canaveral, Florida',
        country: 'USA',
        arrivalTime: '07:00',
        departureTime: '10:00',
        allAboardTime: '',
        excursions: [],
        distance: 45,
        transportation: ['Shuttle', 'Uber', 'Rental Car'],
        highlights: []
      },
      seaDays: 3,
      totalDays: 7
    }
  ]

  if (cruiseLineId) {
    return itineraries.filter(i => i.cruiseLineId === cruiseLineId)
  }

  return itineraries
}

// ============= Popular Tool Searches =============

export async function getPopularToolSearches(): Promise<any[]> {
  await new Promise(resolve => setTimeout(resolve, 50))

  return [
    {
      tool: 'cruise-comparison',
      searches: ['Royal Caribbean vs Carnival', 'Norwegian vs Celebrity', 'Best family cruise lines'],
      count: 5432
    },
    {
      tool: 'destination-comparison',
      searches: ['Caribbean vs Mexico', 'Bahamas vs Bermuda', 'Hawaii vs Caribbean'],
      count: 3210
    },
    {
      tool: 'currency-converter',
      searches: ['USD to EUR', 'USD to MXN', 'USD to GBP'],
      count: 2156
    },
    {
      tool: 'visa-checker',
      searches: ['US citizen Europe', 'US citizen Mexico', 'US citizen Caribbean'],
      count: 1876
    }
  ]
}