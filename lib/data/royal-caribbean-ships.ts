/**
 * Royal Caribbean Fleet Data
 * Comprehensive information about Royal Caribbean ships
 */

export interface RoyalCaribbeanShip {
  id: string
  name: string
  class: string
  yearBuilt: number
  refurbished?: number
  passengerCapacity: number
  crew: number
  grossTonnage: number
  length: number
  decks: number
  staterooms: number
  homeports: string[]
  currentItineraries: string[]
  highlights: string[]
  dining: string[]
  entertainment: string[]
  activities: string[]
  familyFeatures: string[]
}

export const SHIP_CLASSES = {
  ICON: 'Icon Class',
  OASIS: 'Oasis Class',
  QUANTUM: 'Quantum Class',
  FREEDOM: 'Freedom Class',
  VOYAGER: 'Voyager Class',
  RADIANCE: 'Radiance Class',
  VISION: 'Vision Class',
}

export const ROYAL_CARIBBEAN_SHIPS: RoyalCaribbeanShip[] = [
  // Icon Class
  {
    id: 'icon-of-the-seas',
    name: 'Icon of the Seas',
    class: SHIP_CLASSES.ICON,
    yearBuilt: 2024,
    passengerCapacity: 7600,
    crew: 2350,
    grossTonnage: 250800,
    length: 1198,
    decks: 20,
    staterooms: 2805,
    homeports: ['Miami, FL'],
    currentItineraries: ['7-Night Eastern Caribbean', '7-Night Western Caribbean'],
    highlights: [
      "World's largest cruise ship",
      'Category 6 water park',
      'First ship with 8 neighborhoods',
      'Largest waterpark at sea',
      'AquaDome with 55-foot waterfall',
      "Crown's Edge thrill experience",
    ],
    dining: [
      'Empire Supper Club',
      'Aquadome Market',
      'The Pearl',
      'Pier 7',
      "Lou's Donut Shop",
      '15+ specialty restaurants',
    ],
    entertainment: [
      'AquaTheater shows',
      'Ice skating shows',
      'The Wizard of Oz musical',
      'Comedy club',
      'Jazz club',
    ],
    activities: [
      'FlowRider surf simulator',
      'Rock climbing wall',
      'Mini golf',
      'Basketball court',
      'Ice skating rink',
      'Zip line',
    ],
    familyFeatures: [
      'Surfside neighborhood for families',
      'Splashaway Bay water park',
      'Adventure Ocean kids club',
      'Teen lounge',
      'Arcade',
    ],
  },

  // Oasis Class
  {
    id: 'wonder-of-the-seas',
    name: 'Wonder of the Seas',
    class: SHIP_CLASSES.OASIS,
    yearBuilt: 2022,
    passengerCapacity: 6988,
    crew: 2300,
    grossTonnage: 236857,
    length: 1188,
    decks: 18,
    staterooms: 2867,
    homeports: ['Port Canaveral, FL', 'Fort Lauderdale, FL'],
    currentItineraries: ['7-Night Eastern Caribbean', '7-Night Western Caribbean', 'Mediterranean'],
    highlights: [
      'Ultimate Abyss - tallest slide at sea',
      'Central Park with 20,000 plants',
      'Boardwalk neighborhood',
      'Suite Neighborhood',
      'Wonder Playscape',
      'The Mason Jar Southern Restaurant',
    ],
    dining: [
      'Wonder Playscape',
      "Giovanni's Italian Kitchen",
      'Chops Grille',
      'Izumi Hibachi & Sushi',
      'Wonderland',
      '20+ dining venues',
    ],
    entertainment: [
      'AquaTheater high-diving shows',
      'Broadway show: The Effectors',
      'Ice skating shows',
      'Comedy shows',
      'Live music venues',
    ],
    activities: [
      'Twin FlowRider simulators',
      '10-story Ultimate Abyss slide',
      'Zip line',
      'Rock climbing walls',
      'Basketball court',
      'Mini golf',
    ],
    familyFeatures: [
      'Ultimate Family Suite',
      'Splashaway Bay',
      'Adventure Ocean',
      'Teen spaces',
      'Carousel on Boardwalk',
    ],
  },
  {
    id: 'symphony-of-the-seas',
    name: 'Symphony of the Seas',
    class: SHIP_CLASSES.OASIS,
    yearBuilt: 2018,
    passengerCapacity: 6680,
    crew: 2200,
    grossTonnage: 228081,
    length: 1188,
    decks: 18,
    staterooms: 2759,
    homeports: ['Miami, FL', 'Fort Lauderdale, FL', 'Barcelona, Spain'],
    currentItineraries: ['7-Night Caribbean', 'Mediterranean', 'Perfect Day Cruises'],
    highlights: [
      'Ultimate Family Suite with slide',
      'Battle for Planet Z laser tag',
      'Sugar Beach candy store',
      'Central Park',
      'Boardwalk',
      'Royal Promenade',
    ],
    dining: [
      'Hooked Seafood',
      'Playmakers Sports Bar',
      'El Loco Fresh',
      "Jamie's Italian",
      'Wonderland',
      '20+ restaurants',
    ],
    entertainment: [
      'Hairspray Broadway musical',
      'Flight: Dare to Dream',
      'Hiro aqua show',
      '1977 ice show',
      'Comedy club',
    ],
    activities: [
      'Perfect Storm waterslides',
      'FlowRider surf simulators',
      'Ultimate Abyss',
      'Zip line',
      'Rock climbing',
      'Basketball',
    ],
    familyFeatures: [
      'Ultimate Family Suite',
      'Splashaway Bay',
      'Adventure Ocean',
      'Teen club',
      'Boardwalk carousel',
    ],
  },
  {
    id: 'harmony-of-the-seas',
    name: 'Harmony of the Seas',
    class: SHIP_CLASSES.OASIS,
    yearBuilt: 2016,
    refurbished: 2024,
    passengerCapacity: 6687,
    crew: 2200,
    grossTonnage: 226963,
    length: 1188,
    decks: 18,
    staterooms: 2747,
    homeports: ['Galveston, TX', 'Fort Lauderdale, FL'],
    currentItineraries: ['7-Night Western Caribbean', '7-Night Eastern Caribbean'],
    highlights: [
      'Perfect Storm waterslides trio',
      'Ultimate Abyss slide',
      'Central Park',
      'Boardwalk',
      'Bionic Bar with robot bartenders',
      '7 distinct neighborhoods',
    ],
    dining: [
      'Sabor Mexican',
      'Wonderland',
      "Jamie's Italian",
      'Chops Grille',
      'Izumi Japanese',
      'Coastal Kitchen',
    ],
    entertainment: [
      'Grease Broadway musical',
      'Columbus aqua show',
      'Ice shows',
      'Comedy shows',
      'Jazz performances',
    ],
    activities: [
      'Twin FlowRiders',
      'Rock climbing walls',
      'Zip line',
      'Sports court',
      'Mini golf',
      'Jogging track',
    ],
    familyFeatures: [
      'Splashaway Bay',
      'Adventure Ocean',
      'Teen lounge',
      'Nursery',
      'Family activities',
    ],
  },

  // Quantum Class
  {
    id: 'odyssey-of-the-seas',
    name: 'Odyssey of the Seas',
    class: SHIP_CLASSES.QUANTUM,
    yearBuilt: 2021,
    passengerCapacity: 4198,
    crew: 1663,
    grossTonnage: 169300,
    length: 1138,
    decks: 16,
    staterooms: 2090,
    homeports: ['Seattle, WA', 'Fort Lauderdale, FL', 'Rome, Italy'],
    currentItineraries: ['7-Night Alaska', 'Caribbean', 'Mediterranean'],
    highlights: [
      'North Star observation capsule',
      'RipCord by iFLY skydiving',
      'Two70 transformative venue',
      'SeaPlex largest indoor activity space',
      'Virtual balconies',
      "Giovanni's Italian Kitchen & Bar",
    ],
    dining: [
      'Teppanyaki',
      "Giovanni's Italian",
      'Chops Grille',
      'Wonderland',
      'Izumi',
      'Playmakers Sports Bar',
    ],
    entertainment: [
      'The Book musical',
      'Showgirl! cabaret',
      'Two70 spectacular shows',
      'Music Hall',
      'Comedy shows',
    ],
    activities: [
      'FlowRider',
      'iFLY skydiving',
      'North Star',
      'Rock climbing',
      'SeaPlex activities',
      'Bumper cars',
    ],
    familyFeatures: [
      'SeaPlex with bumper cars',
      'Adventure Ocean',
      'Teen lounge',
      'Splashaway Bay',
      'Xbox gaming',
    ],
  },
  {
    id: 'anthem-of-the-seas',
    name: 'Anthem of the Seas',
    class: SHIP_CLASSES.QUANTUM,
    yearBuilt: 2015,
    refurbished: 2022,
    passengerCapacity: 4905,
    crew: 1500,
    grossTonnage: 168666,
    length: 1141,
    decks: 16,
    staterooms: 2090,
    homeports: ['Cape Liberty, NJ', 'Southampton, UK'],
    currentItineraries: ['Bahamas', 'Caribbean', 'Canada/New England', 'Transatlantic'],
    highlights: [
      'North Star viewing capsule',
      'RipCord by iFLY',
      'Two70 venue',
      'SeaPlex with bumper cars',
      'Bionic Bar',
      'Virtual balconies',
    ],
    dining: [
      "Jamie's Italian",
      'Wonderland',
      'Chops Grille',
      'Izumi',
      'Johnny Rockets',
      'Cafe Promenade',
    ],
    entertainment: [
      'We Will Rock You musical',
      "Spectra's Cabaret",
      'Live music venues',
      'Comedy shows',
      'Two70 shows',
    ],
    activities: [
      'FlowRider',
      'Rock climbing',
      'North Star',
      'iFLY simulator',
      'SeaPlex activities',
      'Fitness center',
    ],
    familyFeatures: [
      'SeaPlex',
      'Adventure Ocean',
      'H2O Zone water park',
      'Teen spaces',
      'Family activities',
    ],
  },

  // Freedom Class
  {
    id: 'freedom-of-the-seas',
    name: 'Freedom of the Seas',
    class: SHIP_CLASSES.FREEDOM,
    yearBuilt: 2006,
    refurbished: 2020,
    passengerCapacity: 4515,
    crew: 1360,
    grossTonnage: 156271,
    length: 1112,
    decks: 15,
    staterooms: 1817,
    homeports: ['Miami, FL', 'San Juan, PR'],
    currentItineraries: ['Bahamas', 'Caribbean', 'Perfect Day'],
    highlights: [
      'FlowRider surf simulator',
      'Perfect Storm waterslides',
      'Rock climbing wall',
      'Ice skating rink',
      'Splashaway Bay',
      'Royal Promenade',
    ],
    dining: [
      "Giovanni's Table",
      'Chops Grille',
      'Sabor',
      'Izumi',
      'Johnny Rockets',
      'Playmakers Sports Bar',
    ],
    entertainment: [
      'Ice skating shows',
      'Theater productions',
      'Comedy shows',
      'Live music',
      'Poolside movies',
    ],
    activities: [
      'FlowRider',
      'Rock climbing',
      'Ice skating',
      'Basketball court',
      'Mini golf',
      'Jogging track',
    ],
    familyFeatures: [
      'Splashaway Bay',
      'Adventure Ocean',
      'Teen club',
      'Arcade',
      'Family activities',
    ],
  },
  {
    id: 'liberty-of-the-seas',
    name: 'Liberty of the Seas',
    class: SHIP_CLASSES.FREEDOM,
    yearBuilt: 2007,
    refurbished: 2021,
    passengerCapacity: 4960,
    crew: 1360,
    grossTonnage: 156271,
    length: 1112,
    decks: 15,
    staterooms: 1815,
    homeports: ['Galveston, TX', 'Fort Lauderdale, FL'],
    currentItineraries: ['Western Caribbean', 'Bahamas', 'Eastern Caribbean'],
    highlights: [
      'Tidal Wave waterslide',
      'Perfect Storm slides',
      'FlowRider',
      'Rock climbing',
      'Ice skating rink',
      'Renovated in 2021',
    ],
    dining: [
      'Sabor Modern Mexican',
      "Giovanni's Table",
      'Chops Grille',
      'Izumi',
      'Fish & Ships',
      'Playmakers Sports Bar',
    ],
    entertainment: [
      'Saturday Night Fever musical',
      'Ice shows',
      'Comedy club',
      'Live music venues',
      'Outdoor movies',
    ],
    activities: [
      'FlowRider',
      'Waterslides',
      'Rock climbing',
      'Ice skating',
      'Sports court',
      'Mini golf',
    ],
    familyFeatures: ['Splashaway Bay', 'Adventure Ocean', 'Teen spaces', 'Arcade', 'Family shows'],
  },
]

export function getShipBySlug(slug: string): RoyalCaribbeanShip | undefined {
  return ROYAL_CARIBBEAN_SHIPS.find((ship) => ship.id === slug)
}

export function getShipsByClass(shipClass: string): RoyalCaribbeanShip[] {
  return ROYAL_CARIBBEAN_SHIPS.filter((ship) => ship.class === shipClass)
}

export function getShipsByHomeport(homeport: string): RoyalCaribbeanShip[] {
  return ROYAL_CARIBBEAN_SHIPS.filter((ship) =>
    ship.homeports.some((port) => port.toLowerCase().includes(homeport.toLowerCase()))
  )
}

export function getNewestShips(count: number = 5): RoyalCaribbeanShip[] {
  return [...ROYAL_CARIBBEAN_SHIPS].sort((a, b) => b.yearBuilt - a.yearBuilt).slice(0, count)
}

export function getLargestShips(count: number = 5): RoyalCaribbeanShip[] {
  return [...ROYAL_CARIBBEAN_SHIPS]
    .sort((a, b) => b.passengerCapacity - a.passengerCapacity)
    .slice(0, count)
}
