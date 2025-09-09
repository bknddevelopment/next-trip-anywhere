/**
 * Location data for generating LocalBusiness schema markup
 * Includes coordinates, airports, and service area information
 */

import { LocationData } from '../seo/structured-data'

export const LOCATIONS: Record<string, LocationData> = {
  nyc: {
    city: 'New York City',
    state: 'New York',
    population: 8336817,
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    airports: [
      {
        code: 'JFK',
        name: 'John F. Kennedy International Airport',
        distance: '16 miles southeast',
      },
      {
        code: 'LGA',
        name: 'LaGuardia Airport',
        distance: '8 miles northeast',
      },
      {
        code: 'EWR',
        name: 'Newark Liberty International Airport',
        distance: '10 miles southwest',
      },
    ],
  },
  boston: {
    city: 'Boston',
    state: 'Massachusetts',
    population: 695506,
    coordinates: {
      latitude: 42.3601,
      longitude: -71.0589,
    },
    airports: [
      {
        code: 'BOS',
        name: 'Logan International Airport',
        distance: '3 miles northeast',
      },
      {
        code: 'MHT',
        name: 'Manchester-Boston Regional Airport',
        distance: '55 miles north',
      },
      {
        code: 'PVD',
        name: 'T.F. Green Airport Providence',
        distance: '59 miles south',
      },
    ],
  },
  miami: {
    city: 'Miami',
    state: 'Florida',
    population: 467963,
    coordinates: {
      latitude: 25.7617,
      longitude: -80.1918,
    },
    airports: [
      {
        code: 'MIA',
        name: 'Miami International Airport',
        distance: '8 miles northwest',
      },
      {
        code: 'FLL',
        name: 'Fort Lauderdale-Hollywood International Airport',
        distance: '28 miles north',
      },
      {
        code: 'PBI',
        name: 'Palm Beach International Airport',
        distance: '68 miles north',
      },
    ],
  },
  dc: {
    city: 'Washington',
    state: 'District of Columbia',
    population: 705749,
    coordinates: {
      latitude: 38.9072,
      longitude: -77.0369,
    },
    airports: [
      {
        code: 'DCA',
        name: 'Ronald Reagan Washington National Airport',
        distance: '5 miles south',
      },
      {
        code: 'IAD',
        name: 'Washington Dulles International Airport',
        distance: '26 miles west',
      },
      {
        code: 'BWI',
        name: 'Baltimore/Washington International Airport',
        distance: '32 miles northeast',
      },
    ],
  },
  'los-angeles': {
    city: 'Los Angeles',
    state: 'California',
    population: 3898747,
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    airports: [
      {
        code: 'LAX',
        name: 'Los Angeles International Airport',
        distance: '18 miles southwest',
      },
      {
        code: 'BUR',
        name: 'Hollywood Burbank Airport',
        distance: '12 miles northwest',
      },
      {
        code: 'LGB',
        name: 'Long Beach Airport',
        distance: '22 miles southeast',
      },
      {
        code: 'SNA',
        name: 'John Wayne Airport Orange County',
        distance: '45 miles southeast',
      },
    ],
  },
  chicago: {
    city: 'Chicago',
    state: 'Illinois',
    population: 2693976,
    coordinates: {
      latitude: 41.8781,
      longitude: -87.6298,
    },
    airports: [
      {
        code: 'ORD',
        name: "O'Hare International Airport",
        distance: '17 miles northwest',
      },
      {
        code: 'MDW',
        name: 'Chicago Midway International Airport',
        distance: '8 miles southwest',
      },
      {
        code: 'RFD',
        name: 'Chicago Rockford International Airport',
        distance: '68 miles northwest',
      },
    ],
  },
  seattle: {
    city: 'Seattle',
    state: 'Washington',
    population: 737015,
    coordinates: {
      latitude: 47.6062,
      longitude: -122.3321,
    },
    airports: [
      {
        code: 'SEA',
        name: 'Seattle-Tacoma International Airport',
        distance: '14 miles south',
      },
      {
        code: 'BFI',
        name: 'Boeing Field/King County International Airport',
        distance: '7 miles south',
      },
      {
        code: 'PAE',
        name: 'Snohomish County Airport',
        distance: '25 miles north',
      },
    ],
  },
  denver: {
    city: 'Denver',
    state: 'Colorado',
    population: 715522,
    coordinates: {
      latitude: 39.7392,
      longitude: -104.9903,
    },
    airports: [
      {
        code: 'DEN',
        name: 'Denver International Airport',
        distance: '25 miles northeast',
      },
      {
        code: 'COS',
        name: 'Colorado Springs Airport',
        distance: '78 miles south',
      },
    ],
  },
  atlanta: {
    city: 'Atlanta',
    state: 'Georgia',
    population: 498715,
    coordinates: {
      latitude: 33.7490,
      longitude: -84.3880,
    },
    airports: [
      {
        code: 'ATL',
        name: 'Hartsfield-Jackson Atlanta International Airport',
        distance: '10 miles south',
      },
      {
        code: 'PDK',
        name: 'DeKalb-Peachtree Airport',
        distance: '10 miles northeast',
      },
    ],
  },
  dallas: {
    city: 'Dallas',
    state: 'Texas',
    population: 1343573,
    coordinates: {
      latitude: 32.7767,
      longitude: -96.7970,
    },
    airports: [
      {
        code: 'DFW',
        name: 'Dallas/Fort Worth International Airport',
        distance: '18 miles northwest',
      },
      {
        code: 'DAL',
        name: 'Dallas Love Field',
        distance: '6 miles northwest',
      },
    ],
  },
  phoenix: {
    city: 'Phoenix',
    state: 'Arizona',
    population: 1608139,
    coordinates: {
      latitude: 33.4484,
      longitude: -112.0740,
    },
    airports: [
      {
        code: 'PHX',
        name: 'Phoenix Sky Harbor International Airport',
        distance: '3 miles southeast',
      },
      {
        code: 'SDL',
        name: 'Scottsdale Airport',
        distance: '15 miles northeast',
      },
    ],
  },
  'las-vegas': {
    city: 'Las Vegas',
    state: 'Nevada',
    population: 651319,
    coordinates: {
      latitude: 36.1699,
      longitude: -115.1398,
    },
    airports: [
      {
        code: 'LAS',
        name: 'Harry Reid International Airport',
        distance: '5 miles south',
      },
      {
        code: 'HND',
        name: 'Henderson Executive Airport',
        distance: '12 miles southeast',
      },
    ],
  },
  'san-francisco': {
    city: 'San Francisco',
    state: 'California',
    population: 873965,
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
    airports: [
      {
        code: 'SFO',
        name: 'San Francisco International Airport',
        distance: '13 miles south',
      },
      {
        code: 'OAK',
        name: 'Oakland International Airport',
        distance: '12 miles east',
      },
      {
        code: 'SJC',
        name: 'Norman Y. Mineta San José International Airport',
        distance: '48 miles southeast',
      },
    ],
  },
  philadelphia: {
    city: 'Philadelphia',
    state: 'Pennsylvania',
    population: 1603797,
    coordinates: {
      latitude: 39.9526,
      longitude: -75.1652,
    },
    airports: [
      {
        code: 'PHL',
        name: 'Philadelphia International Airport',
        distance: '7 miles southwest',
      },
      {
        code: 'ABE',
        name: 'Lehigh Valley International Airport',
        distance: '65 miles north',
      },
    ],
  },
  houston: {
    city: 'Houston',
    state: 'Texas',
    population: 2320268,
    coordinates: {
      latitude: 29.7604,
      longitude: -95.3698,
    },
    airports: [
      {
        code: 'IAH',
        name: 'George Bush Intercontinental Airport',
        distance: '23 miles north',
      },
      {
        code: 'HOU',
        name: 'William P. Hobby Airport',
        distance: '7 miles southeast',
      },
    ],
  },
  detroit: {
    city: 'Detroit',
    state: 'Michigan',
    population: 639111,
    coordinates: {
      latitude: 42.3314,
      longitude: -83.0458,
    },
    airports: [
      {
        code: 'DTW',
        name: 'Detroit Metropolitan Wayne County Airport',
        distance: '20 miles southwest',
      },
      {
        code: 'DET',
        name: 'Coleman A. Young International Airport',
        distance: '6 miles northeast',
      },
    ],
  },
  minneapolis: {
    city: 'Minneapolis',
    state: 'Minnesota',
    population: 429954,
    coordinates: {
      latitude: 44.9778,
      longitude: -93.2650,
    },
    airports: [
      {
        code: 'MSP',
        name: 'Minneapolis-Saint Paul International Airport',
        distance: '12 miles south',
      },
    ],
  },
  portland: {
    city: 'Portland',
    state: 'Oregon',
    population: 652503,
    coordinates: {
      latitude: 45.5152,
      longitude: -122.6784,
    },
    airports: [
      {
        code: 'PDX',
        name: 'Portland International Airport',
        distance: '9 miles northeast',
      },
    ],
  },
  'salt-lake-city': {
    city: 'Salt Lake City',
    state: 'Utah',
    population: 199723,
    coordinates: {
      latitude: 40.7608,
      longitude: -111.8910,
    },
    airports: [
      {
        code: 'SLC',
        name: 'Salt Lake City International Airport',
        distance: '4 miles west',
      },
    ],
  },
  'san-diego': {
    city: 'San Diego',
    state: 'California',
    population: 1423851,
    coordinates: {
      latitude: 32.7157,
      longitude: -117.1611,
    },
    airports: [
      {
        code: 'SAN',
        name: 'San Diego International Airport',
        distance: '3 miles northwest',
      },
    ],
  },
  orlando: {
    city: 'Orlando',
    state: 'Florida',
    population: 307573,
    coordinates: {
      latitude: 28.5383,
      longitude: -81.3792,
    },
    airports: [
      {
        code: 'MCO',
        name: 'Orlando International Airport',
        distance: '6 miles southeast',
      },
      {
        code: 'SFB',
        name: 'Orlando Sanford International Airport',
        distance: '18 miles northeast',
      },
    ],
  },
}

/**
 * Get location data by key
 */
export function getLocationData(locationKey: string): LocationData | null {
  return LOCATIONS[locationKey] || null
}

/**
 * Get all available locations
 */
export function getAllLocations(): Array<{ key: string; data: LocationData }> {
  return Object.entries(LOCATIONS).map(([key, data]) => ({ key, data }))
}

/**
 * Get locations by state
 */
export function getLocationsByState(state: string): Array<{ key: string; data: LocationData }> {
  return Object.entries(LOCATIONS)
    .filter(([_, data]) => data.state?.toLowerCase() === state.toLowerCase())
    .map(([key, data]) => ({ key, data }))
}

/**
 * Get major airports across all locations
 */
export function getAllAirports() {
  return Object.values(LOCATIONS).flatMap(location => 
    location.airports || []
  ).filter((airport, index, self) => 
    // Remove duplicates based on airport code
    index === self.findIndex(a => a.code === airport.code)
  ).sort((a, b) => a.code.localeCompare(b.code))
}