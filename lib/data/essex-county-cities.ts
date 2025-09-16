// Essex County cities data with demographics and local landmarks

export interface CityLandmark {
  name: string
  type: string
  description: string
  address?: string
}

export interface CityData {
  id: string
  name: string
  county: string
  state: string
  population: number
  squareMiles: number
  establishedYear: number
  zipCodes: string[]
  description: string
  landmarks: CityLandmark[]
  nearbyAirports: {
    name: string
    code: string
    distance: string
  }[]
  majorHighways: string[]
  neighboringTowns: string[]
  localAttractions: string[]
  businessDistricts: string[]
  demographics: {
    medianIncome: number
    medianHomeValue: number
    primaryIndustries: string[]
  }
  transportationNeeds: string[]
}

export const essexCountyCities: CityData[] = [
  {
    id: 'belleville',
    name: 'Belleville',
    county: 'Essex',
    state: 'NJ',
    population: 38000,
    squareMiles: 3.4,
    establishedYear: 1839,
    zipCodes: ['07109'],
    description:
      'Belleville is a vibrant township in Essex County, known for its diverse community, excellent schools, and convenient location between Newark and the Passaic River. The township offers a perfect blend of residential charm and commercial activity.',
    landmarks: [
      {
        name: 'Branch Brook Park',
        type: 'Park',
        description:
          'Historic park featuring the largest collection of cherry blossom trees in the United States',
        address: 'Park Avenue, Belleville, NJ',
      },
      {
        name: 'Belleville Public Library and Museum',
        type: 'Cultural',
        description: 'Historic building serving as both library and local history museum',
        address: '221 Washington Ave, Belleville, NJ',
      },
      {
        name: 'Silver Lake',
        type: 'Recreation',
        description: 'Scenic lake area popular for walking and community events',
        address: 'Silver Lake, Belleville, NJ',
      },
      {
        name: 'Hendricks Field Golf Course',
        type: 'Recreation',
        description: 'Public golf course offering recreational activities',
        address: 'Franklin Ave, Belleville, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '8 miles' },
      { name: 'LaGuardia', code: 'LGA', distance: '22 miles' },
      { name: 'John F. Kennedy International', code: 'JFK', distance: '28 miles' },
    ],
    majorHighways: ['Route 21', 'Route 3', 'Garden State Parkway'],
    neighboringTowns: ['Newark', 'Nutley', 'Bloomfield', 'North Arlington'],
    localAttractions: [
      'Branch Brook Park Cherry Blossom Festival',
      'Clara Maass Medical Center',
      'The Mills at Jersey Gardens',
      'Riverbank Park',
    ],
    businessDistricts: [
      'Washington Avenue Business District',
      'Joralemon Street Shopping Area',
      'Belleville Turnpike Commercial Zone',
    ],
    demographics: {
      medianIncome: 65000,
      medianHomeValue: 385000,
      primaryIndustries: ['Healthcare', 'Education', 'Retail', 'Professional Services'],
    },
    transportationNeeds: [
      'Airport transfers for business travelers',
      'Medical transportation to Clara Maass Medical Center',
      'Shopping trips to NYC',
      'Corporate travel to Newark and Manhattan',
    ],
  },
  {
    id: 'nutley',
    name: 'Nutley',
    county: 'Essex',
    state: 'NJ',
    population: 28000,
    squareMiles: 3.4,
    establishedYear: 1874,
    zipCodes: ['07110'],
    description:
      'Nutley is a charming suburban township known for its tree-lined streets, excellent schools, and strong sense of community. Located along the Passaic River, it offers easy access to major highways and New York City.',
    landmarks: [
      {
        name: 'Kingsland Manor',
        type: 'Historic',
        description: 'Historic 18th-century Dutch Colonial house and museum',
        address: '3 Kingsland St, Nutley, NJ',
      },
      {
        name: 'Yanticaw Park',
        type: 'Park',
        description: 'Large park with sports facilities, playground, and walking paths',
        address: 'Chestnut St, Nutley, NJ',
      },
      {
        name: 'Annie Sez Museum',
        type: 'Cultural',
        description: "Local history museum showcasing Nutley's heritage",
        address: '65 Church St, Nutley, NJ',
      },
      {
        name: 'Memorial Park',
        type: 'Park',
        description: 'Community park with athletic fields and memorial monuments',
        address: 'Passaic Ave, Nutley, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '10 miles' },
      { name: 'LaGuardia', code: 'LGA', distance: '20 miles' },
      { name: 'Teterboro', code: 'TEB', distance: '12 miles' },
    ],
    majorHighways: ['Route 3', 'Route 21', 'Garden State Parkway'],
    neighboringTowns: ['Belleville', 'Bloomfield', 'Clifton', 'Lyndhurst'],
    localAttractions: [
      'Nutley Little Theatre',
      'Franklin Avenue Business District',
      'Hoffman-La Roche Campus',
      'Parks and Recreation facilities',
    ],
    businessDistricts: [
      'Franklin Avenue Downtown',
      'Centre Street Commercial Area',
      'Bloomfield Avenue Corridor',
    ],
    demographics: {
      medianIncome: 82000,
      medianHomeValue: 425000,
      primaryIndustries: ['Pharmaceuticals', 'Healthcare', 'Education', 'Professional Services'],
    },
    transportationNeeds: [
      'Corporate travel to pharmaceutical companies',
      'Airport transfers for executives',
      'NYC commuter services',
      'Special event transportation',
    ],
  },
  {
    id: 'bloomfield',
    name: 'Bloomfield',
    county: 'Essex',
    state: 'NJ',
    population: 53000,
    squareMiles: 5.3,
    establishedYear: 1812,
    zipCodes: ['07003'],
    description:
      'Bloomfield is a diverse township combining residential neighborhoods with a thriving business district. Known for its historic architecture and cultural diversity, it offers excellent transportation links and community amenities.',
    landmarks: [
      {
        name: 'Bloomfield Green',
        type: 'Historic',
        description: 'Historic town center and gathering place',
        address: 'Broad St & Bloomfield Ave, Bloomfield, NJ',
      },
      {
        name: 'Watsessing Park',
        type: 'Park',
        description: 'County park with lake, walking trails, and sports facilities',
        address: 'Glenwood Ave, Bloomfield, NJ',
      },
      {
        name: 'Bloomfield College',
        type: 'Education',
        description: 'Private liberal arts college founded in 1868',
        address: '467 Franklin St, Bloomfield, NJ',
      },
      {
        name: 'Oakes Pond',
        type: 'Recreation',
        description: 'Scenic pond area with walking paths',
        address: 'Oak Tree Rd, Bloomfield, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '11 miles' },
      { name: 'LaGuardia', code: 'LGA', distance: '23 miles' },
      { name: 'John F. Kennedy International', code: 'JFK', distance: '30 miles' },
    ],
    majorHighways: ['Garden State Parkway', 'Route 3', 'Bloomfield Avenue'],
    neighboringTowns: ['Newark', 'Nutley', 'Montclair', 'Glen Ridge', 'Belleville'],
    localAttractions: [
      'Bloomfield Center Alliance Events',
      'Westminster Arts Center',
      "Holsten's Ice Cream (Sopranos filming location)",
      'Watsessing Park Events',
    ],
    businessDistricts: [
      'Bloomfield Center',
      'Broad Street Business District',
      'Bloomfield Avenue Commercial Corridor',
    ],
    demographics: {
      medianIncome: 68000,
      medianHomeValue: 395000,
      primaryIndustries: ['Healthcare', 'Education', 'Retail', 'Manufacturing'],
    },
    transportationNeeds: [
      'College transportation services',
      'Medical appointment transfers',
      'Shopping and entertainment trips',
      'Airport transfers for families',
    ],
  },
  {
    id: 'verona',
    name: 'Verona',
    county: 'Essex',
    state: 'NJ',
    population: 14572,
    squareMiles: 2.8,
    establishedYear: 1907,
    zipCodes: ['07044'],
    description:
      'Verona is an affluent suburban township known for its excellent schools, beautiful parks, and strong community spirit. The town offers a perfect balance of quiet residential life and convenient access to urban amenities.',
    landmarks: [
      {
        name: 'Verona Park',
        type: 'Park',
        description: 'Scenic 54-acre park with lake, walking trails, and boathouse',
        address: 'Lakeside Ave, Verona, NJ',
      },
      {
        name: 'Verona Community Center',
        type: 'Recreation',
        description: 'Multi-purpose facility hosting community events and activities',
        address: '880 Bloomfield Ave, Verona, NJ',
      },
      {
        name: 'White Rock Lake',
        type: 'Recreation',
        description: 'Picturesque lake popular for fishing and kayaking',
        address: 'White Rock Lake, Verona, NJ',
      },
      {
        name: 'Verona High School Athletic Complex',
        type: 'Recreation',
        description: 'Modern sports facilities serving the community',
        address: 'Sampson Dr, Verona, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '15 miles' },
      { name: 'Teterboro', code: 'TEB', distance: '15 miles' },
      { name: 'LaGuardia', code: 'LGA', distance: '25 miles' },
    ],
    majorHighways: ['Route 23', 'Bloomfield Avenue', 'Pompton Avenue'],
    neighboringTowns: ['Montclair', 'Cedar Grove', 'West Orange', 'North Caldwell'],
    localAttractions: [
      'Verona Park Concerts',
      'Annual Verona Fair',
      'Holiday Tree Lighting',
      'Farmers Market',
    ],
    businessDistricts: [
      'Bloomfield Avenue Business District',
      'Pompton Avenue Shops',
      'Lakeside Avenue Commercial Area',
    ],
    demographics: {
      medianIncome: 115000,
      medianHomeValue: 525000,
      primaryIndustries: ['Professional Services', 'Finance', 'Healthcare', 'Education'],
    },
    transportationNeeds: [
      'Executive airport transfers',
      'NYC commuter services',
      'Special event transportation',
      'Wine tour departures',
    ],
  },
  {
    id: 'glen-ridge',
    name: 'Glen Ridge',
    county: 'Essex',
    state: 'NJ',
    population: 7852,
    squareMiles: 1.3,
    establishedYear: 1895,
    zipCodes: ['07028'],
    description:
      'Glen Ridge is a small, upscale borough known for its gas-lit streets, historic homes, and strong sense of community. This walkable town offers excellent schools and easy access to New York City via train.',
    landmarks: [
      {
        name: 'Glen Ridge Train Station',
        type: 'Historic',
        description: 'Historic train station on the Montclair-Boonton Line',
        address: 'Depot Pl, Glen Ridge, NJ',
      },
      {
        name: 'The Glen Ridge Country Club',
        type: 'Recreation',
        description: 'Private country club with golf course and facilities',
        address: '555 Ridgewood Ave, Glen Ridge, NJ',
      },
      {
        name: 'Hurrell Field',
        type: 'Recreation',
        description: 'Community athletic complex',
        address: 'Carteret St, Glen Ridge, NJ',
      },
      {
        name: 'Glen Ridge Congregational Church',
        type: 'Historic',
        description: 'Historic church and community landmark',
        address: '195 Ridgewood Ave, Glen Ridge, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '13 miles' },
      { name: 'Teterboro', code: 'TEB', distance: '16 miles' },
      { name: 'LaGuardia', code: 'LGA', distance: '24 miles' },
    ],
    majorHighways: ['Bloomfield Avenue', 'Ridgewood Avenue', 'Route 280'],
    neighboringTowns: ['Montclair', 'Bloomfield', 'East Orange', 'Orange'],
    localAttractions: [
      'Gas-lit streets (town tradition)',
      "Glen Ridge Women's Club",
      'Annual Town Picnic',
      'Holiday traditions',
    ],
    businessDistricts: [
      'Ridgewood Avenue Business District',
      'Bloomfield Avenue Shops',
      'Bay Street Commercial Area',
    ],
    demographics: {
      medianIncome: 165000,
      medianHomeValue: 750000,
      primaryIndustries: ['Finance', 'Professional Services', 'Media', 'Technology'],
    },
    transportationNeeds: [
      'Executive car service to Manhattan',
      'Airport transfers for business travel',
      'Train station shuttles',
      'Special event limousines',
    ],
  },
  {
    id: 'fairfield',
    name: 'Fairfield',
    county: 'Essex',
    state: 'NJ',
    population: 7615,
    squareMiles: 10.3,
    establishedYear: 1798,
    zipCodes: ['07004'],
    description:
      'Fairfield is a business-friendly township that successfully balances commercial development with residential areas. Known for its corporate parks and hotels, it serves as an important business hub in Essex County.',
    landmarks: [
      {
        name: 'Fairfield Recreation Complex',
        type: 'Recreation',
        description: 'Modern sports and recreation facility',
        address: 'Plymouth Rd, Fairfield, NJ',
      },
      {
        name: 'Willow Brook Country Club',
        type: 'Recreation',
        description: 'Private golf club with scenic course',
        address: '60 Rock Spring Rd, Fairfield, NJ',
      },
      {
        name: 'Dutch Reformed Church',
        type: 'Historic',
        description: 'Historic church dating back to colonial times',
        address: 'Fairfield Rd, Fairfield, NJ',
      },
      {
        name: 'Fairfield Inn Shopping Center',
        type: 'Commercial',
        description: 'Major retail and dining destination',
        address: 'Route 46, Fairfield, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '16 miles' },
      { name: 'Teterboro', code: 'TEB', distance: '12 miles' },
      { name: 'Morristown Municipal', code: 'MMU', distance: '10 miles' },
    ],
    majorHighways: ['Route 46', 'Route 80', 'Route 280', 'Route 10'],
    neighboringTowns: ['West Caldwell', 'North Caldwell', 'Wayne', 'Montville', 'Pine Brook'],
    localAttractions: [
      'Willowbrook Mall (nearby)',
      'Corporate business parks',
      'Hotels and conference centers',
      'Golf courses',
    ],
    businessDistricts: [
      'Route 46 Commercial Corridor',
      'Fairfield Business Campus',
      'Corporate Drive Business Park',
    ],
    demographics: {
      medianIncome: 95000,
      medianHomeValue: 485000,
      primaryIndustries: ['Corporate Services', 'Hospitality', 'Retail', 'Manufacturing'],
    },
    transportationNeeds: [
      'Corporate shuttle services',
      'Hotel to airport transfers',
      'Business meeting transportation',
      'Conference and event shuttles',
    ],
  },
  {
    id: 'roseland',
    name: 'Roseland',
    county: 'Essex',
    state: 'NJ',
    population: 6000,
    squareMiles: 3.6,
    establishedYear: 1908,
    zipCodes: ['07068'],
    description:
      'Roseland is an affluent borough known for its excellent schools, low crime rate, and family-friendly atmosphere. The town features beautiful residential neighborhoods and convenient access to major highways.',
    landmarks: [
      {
        name: 'Becker Park',
        type: 'Park',
        description: 'Community park with sports facilities and playground',
        address: 'Harrison Ave, Roseland, NJ',
      },
      {
        name: 'Roseland Free Public Library',
        type: 'Cultural',
        description: 'Modern library serving the community',
        address: '20 Roseland Ave, Roseland, NJ',
      },
      {
        name: 'Essex County Environmental Center',
        type: 'Education',
        description: 'Environmental education facility with trails',
        address: '621 Eagle Rock Ave, Roseland, NJ',
      },
      {
        name: 'Roseland Historical Society',
        type: 'Historic',
        description: 'Local history preservation and education',
        address: 'Roseland Ave, Roseland, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '17 miles' },
      { name: 'Morristown Municipal', code: 'MMU', distance: '8 miles' },
      { name: 'Teterboro', code: 'TEB', distance: '18 miles' },
    ],
    majorHighways: ['Route 280', 'Eagle Rock Avenue', 'Eisenhower Parkway'],
    neighboringTowns: ['West Caldwell', 'Essex Fells', 'Livingston', 'East Hanover'],
    localAttractions: [
      'Roseland Centennial Events',
      'Community Day Festival',
      'Youth sports programs',
      'Holiday celebrations',
    ],
    businessDistricts: [
      'Eagle Rock Avenue Business Area',
      'Eisenhower Parkway Office Parks',
      'Roseland Plaza',
    ],
    demographics: {
      medianIncome: 125000,
      medianHomeValue: 625000,
      primaryIndustries: ['Professional Services', 'Finance', 'Healthcare', 'Technology'],
    },
    transportationNeeds: [
      'Executive airport transfers',
      'Corporate travel services',
      'Family vacation transportation',
      'Special occasion limousines',
    ],
  },
  {
    id: 'essex-fells',
    name: 'Essex Fells',
    county: 'Essex',
    state: 'NJ',
    population: 2100,
    squareMiles: 1.4,
    establishedYear: 1902,
    zipCodes: ['07021'],
    description:
      'Essex Fells is an exclusive borough known for its winding roads, magnificent estates, and pristine natural beauty. This affluent community offers privacy and tranquility while maintaining proximity to urban centers.',
    landmarks: [
      {
        name: 'Essex Fells Country Club',
        type: 'Recreation',
        description: 'Prestigious private country club with golf course',
        address: '219 Plymouth Ave, Essex Fells, NJ',
      },
      {
        name: 'Grover Cleveland Park',
        type: 'Historic',
        description: 'Park honoring the former president who lived in the area',
        address: 'Roseland Ave, Essex Fells, NJ',
      },
      {
        name: 'Essex Fells Borough Hall',
        type: 'Historic',
        description: 'Historic municipal building',
        address: '255 Roseland Ave, Essex Fells, NJ',
      },
      {
        name: 'The Essex Hunt Club',
        type: 'Recreation',
        description: 'Historic private club',
        address: 'Oak Ln, Essex Fells, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '18 miles' },
      { name: 'Morristown Municipal', code: 'MMU', distance: '9 miles' },
      { name: 'Teterboro', code: 'TEB', distance: '19 miles' },
    ],
    majorHighways: ['Route 280', 'Roseland Avenue', 'Bloomfield Avenue'],
    neighboringTowns: ['West Caldwell', 'North Caldwell', 'Roseland', 'Verona'],
    localAttractions: [
      'Essex Fells Country Club',
      'Grover Cleveland birthplace nearby',
      'Historic estates',
      'Nature preserves',
    ],
    businessDistricts: [
      'Limited commercial (primarily residential)',
      'Nearby Caldwell business district',
      'Roseland Avenue services',
    ],
    demographics: {
      medianIncome: 200000,
      medianHomeValue: 950000,
      primaryIndustries: ['Finance', 'Executive Management', 'Law', 'Medicine'],
    },
    transportationNeeds: [
      'Private jet connections',
      'Luxury airport transfers',
      'Corporate executive transport',
      'High-end event transportation',
    ],
  },
  {
    id: 'north-caldwell',
    name: 'North Caldwell',
    county: 'Essex',
    state: 'NJ',
    population: 7375,
    squareMiles: 3.0,
    establishedYear: 1898,
    zipCodes: ['07006'],
    description:
      "North Caldwell is an affluent borough known for its spacious properties, excellent schools, and suburban tranquility. Famous as the filming location for Tony Soprano's house, it offers luxury living with convenient access to New York City.",
    landmarks: [
      {
        name: "Tony Soprano's House",
        type: 'Cultural',
        description: 'Famous filming location from The Sopranos TV series',
        address: 'Private residence, North Caldwell, NJ',
      },
      {
        name: 'Green Brook Country Club',
        type: 'Recreation',
        description: 'Private country club with championship golf course',
        address: '225 Mountain Ave, North Caldwell, NJ',
      },
      {
        name: 'Memorial Park',
        type: 'Park',
        description: 'Community park with recreational facilities',
        address: 'Gould Ave, North Caldwell, NJ',
      },
      {
        name: 'North Caldwell Public Library',
        type: 'Cultural',
        description: 'Community library and cultural center',
        address: '2 Gould Ave, North Caldwell, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '16 miles' },
      { name: 'Morristown Municipal', code: 'MMU', distance: '10 miles' },
      { name: 'Teterboro', code: 'TEB', distance: '17 miles' },
    ],
    majorHighways: ['Route 280', 'Bloomfield Avenue', 'Mountain Avenue'],
    neighboringTowns: ['West Caldwell', 'Caldwell', 'Fairfield', 'Essex Fells', 'Verona'],
    localAttractions: [
      'The Sopranos tour locations',
      'Green Brook Country Club',
      'Grover Cleveland Park',
      'Local parks and trails',
    ],
    businessDistricts: [
      'Mountain Avenue Commercial Area',
      'Bloomfield Avenue Shops',
      'Central Avenue Business District',
    ],
    demographics: {
      medianIncome: 155000,
      medianHomeValue: 775000,
      primaryIndustries: ['Finance', 'Healthcare', 'Professional Services', 'Real Estate'],
    },
    transportationNeeds: [
      'Executive transportation to NYC',
      'Airport transfers for international travel',
      'Country club event transportation',
      'Luxury shopping trips',
    ],
  },
  {
    id: 'orange',
    name: 'Orange',
    county: 'Essex',
    state: 'NJ',
    population: 34447,
    squareMiles: 2.2,
    establishedYear: 1806,
    zipCodes: ['07050', '07051', '07052'],
    description:
      'Orange is a diverse city with a rich history, featuring Victorian architecture and a thriving downtown district. Known for its cultural diversity and convenient transit connections, Orange offers urban amenities with suburban charm.',
    landmarks: [
      {
        name: 'Orange Public Library',
        type: 'Cultural',
        description: 'Historic Carnegie library serving the community',
        address: '348 Main St, Orange, NJ',
      },
      {
        name: 'Orange Music Studio',
        type: 'Cultural',
        description: 'Community music education and performance center',
        address: '612 Freeman St, Orange, NJ',
      },
      {
        name: 'Central Park',
        type: 'Park',
        description: 'Community park with recreational facilities',
        address: 'Central Ave, Orange, NJ',
      },
      {
        name: 'Orange Train Station',
        type: 'Transportation',
        description: 'NJ Transit station on the Morris & Essex Line',
        address: 'Lincoln Ave, Orange, NJ',
      },
    ],
    nearbyAirports: [
      { name: 'Newark Liberty International', code: 'EWR', distance: '10 miles' },
      { name: 'LaGuardia', code: 'LGA', distance: '22 miles' },
      { name: 'John F. Kennedy International', code: 'JFK', distance: '27 miles' },
    ],
    majorHighways: ['Route 280', 'Main Street', 'Central Avenue'],
    neighboringTowns: ['East Orange', 'West Orange', 'South Orange', 'Glen Ridge'],
    localAttractions: [
      'Orange Historical Society',
      'Valley Arts District',
      'Hat City Kitchen',
      'Orange Farmers Market',
    ],
    businessDistricts: [
      'Main Street Business District',
      'Central Avenue Commercial Corridor',
      'Valley Arts District',
    ],
    demographics: {
      medianIncome: 45000,
      medianHomeValue: 285000,
      primaryIndustries: ['Healthcare', 'Education', 'Retail', 'Transportation'],
    },
    transportationNeeds: [
      'Airport transportation for families',
      'Medical appointment shuttles',
      'Shopping trips to nearby malls',
      'Train station connections',
    ],
  },
]

// Helper function to get city by ID
export function getCityById(id: string): CityData | undefined {
  return essexCountyCities.find((city) => city.id === id)
}

// Helper function to get all city IDs
export function getAllCityIds(): string[] {
  return essexCountyCities.map((city) => city.id)
}

// Helper function to get city names for display
export function getCityNames(): Array<{ id: string; name: string }> {
  return essexCountyCities.map((city) => ({ id: city.id, name: city.name }))
}

// Helper function to get cities by population range
export function getCitiesByPopulation(minPop: number, maxPop: number): CityData[] {
  return essexCountyCities.filter((city) => city.population >= minPop && city.population <= maxPop)
}

// Helper function to get nearby cities
export function getNearbyCities(cityId: string): string[] {
  const city = getCityById(cityId)
  return city ? city.neighboringTowns : []
}
