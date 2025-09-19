/**
 * Comprehensive Newark Airport (EWR) Transportation Content
 * Contains detailed, authoritative information for Essex County residents
 * Last Updated: January 2025
 */

export interface AirportTerminalInfo {
  name: string
  airlines: string[]
  gates: string
  amenities: string[]
  parking: {
    type: string
    rate: string
    walkTime: string
  }[]
}

export interface TownTransportInfo {
  name: string
  distance: string
  driveTime: string
  trafficTime: string
  uberCost: string
  lyftCost: string
  taxiCost: string
  privateCarCost: string
  publicTransit?: {
    route: string
    duration: string
    cost: string
  }
  popularPickupPoints: string[]
  localTips: string[]
}

export interface FrequentlyAskedQuestion {
  question: string
  answer: string
  category: 'general' | 'parking' | 'transportation' | 'terminals' | 'timing' | 'costs'
}

// Newark Airport Terminal Information
export const NEWARK_TERMINALS: AirportTerminalInfo[] = [
  {
    name: 'Terminal A',
    airlines: [
      'Air Canada',
      'Alaska Airlines',
      'American Airlines',
      'JetBlue Airways',
      'Southwest Airlines',
      'Spirit Airlines',
    ],
    gates: 'A20-A45',
    amenities: [
      'United Club Lounge',
      'Art & Lounge',
      'Duty Free Shopping',
      "Multiple dining options including Jersey Mike's, Starbucks",
      'Free WiFi throughout terminal',
      'Charging stations at every gate',
    ],
    parking: [
      { type: 'Terminal A Parking', rate: '$39/day', walkTime: '5 minutes' },
      { type: 'P1 Economy', rate: '$33/day', walkTime: '8 minutes via AirTrain' },
    ],
  },
  {
    name: 'Terminal B',
    airlines: [
      'Allegiant Air',
      'British Airways',
      'Delta Air Lines',
      'Icelandair',
      'TAP Air Portugal',
      'Virgin Atlantic',
    ],
    gates: 'B40-B68',
    amenities: [
      'Delta Sky Club',
      'Virgin Atlantic Clubhouse',
      'International First Class Lounges',
      'Global Bazaar Duty Free',
      'Chef-driven restaurants including Riviera Bar',
      'Kids play areas near gates B55-B58',
    ],
    parking: [
      { type: 'Terminal B Parking', rate: '$39/day', walkTime: '5 minutes' },
      { type: 'P4 Daily', rate: '$34/day', walkTime: '10 minutes via AirTrain' },
    ],
  },
  {
    name: 'Terminal C (United Hub)',
    airlines: [
      'United Airlines (Primary)',
      'Air India',
      'Austrian Airlines',
      'Brussels Airlines',
      'Copa Airlines',
      'Ethiopian Airlines',
      'Lufthansa',
      'Swiss International',
      'Turkish Airlines',
    ],
    gates: 'C70-C139',
    amenities: [
      'United Polaris Lounge (International First/Business)',
      'United Club (4 locations)',
      'Classified Restaurant (fine dining)',
      'Art installations throughout terminal',
      'Yoga room near gate C123',
      'Pet relief areas',
      'TSA PreCheck and CLEAR lanes',
    ],
    parking: [
      { type: 'Terminal C Parking Garage', rate: '$39/day', walkTime: '5-7 minutes' },
      { type: 'P6 Economy (Best Value)', rate: '$27/day', walkTime: '15 minutes via AirTrain' },
    ],
  },
]

// Essex County Towns Transportation Information
export const ESSEX_COUNTY_TRANSPORT: TownTransportInfo[] = [
  {
    name: 'Newark',
    distance: '5 miles',
    driveTime: '12-15 minutes',
    trafficTime: '20-35 minutes (rush hour)',
    uberCost: '$15-25',
    lyftCost: '$14-23',
    taxiCost: '$25-35',
    privateCarCost: '$45-65',
    publicTransit: {
      route: 'NJ Transit Bus #62 or Newark Light Rail to Penn Station, then AirTrain',
      duration: '35-45 minutes',
      cost: '$8.50 total',
    },
    popularPickupPoints: [
      'Newark Penn Station',
      'Downtown Newark (Broad & Market)',
      'Ironbound District',
      'University Heights',
    ],
    localTips: [
      'Avoid Route 78 during morning rush (7-9 AM)',
      'Use McCarter Highway (Route 21) as alternative',
      'Pre-book during Devils/concerts at Prudential Center',
    ],
  },
  {
    name: 'Montclair',
    distance: '14 miles',
    driveTime: '25-30 minutes',
    trafficTime: '35-50 minutes (rush hour)',
    uberCost: '$35-50',
    lyftCost: '$32-48',
    taxiCost: '$55-70',
    privateCarCost: '$75-95',
    publicTransit: {
      route: 'DeCamp Bus #33 to Newark Penn, then AirTrain',
      duration: '50-60 minutes',
      cost: '$12.00 total',
    },
    popularPickupPoints: [
      'Montclair State University',
      'Downtown Montclair (Church Street)',
      'Upper Montclair',
      'Watchung Plaza',
    ],
    localTips: [
      'Book early morning flights to avoid Bloomfield Ave traffic',
      'Consider Park Ridge Road route during peak times',
      'Allow extra time during Montclair Film Festival (May)',
    ],
  },
  {
    name: 'West Orange',
    distance: '10 miles',
    driveTime: '20-25 minutes',
    trafficTime: '30-45 minutes (rush hour)',
    uberCost: '$28-40',
    lyftCost: '$25-38',
    taxiCost: '$45-60',
    privateCarCost: '$65-85',
    publicTransit: {
      route: 'NJ Transit #71 bus to Newark Penn, then AirTrain',
      duration: '55-65 minutes',
      cost: '$9.25 total',
    },
    popularPickupPoints: [
      'Edison Village',
      'Pleasant Valley Way',
      'Eagle Rock Avenue',
      'Main Street',
    ],
    localTips: [
      'Use I-280 East for fastest route',
      'Avoid Main Street during school hours',
      'Pre-book for Turtle Back Zoo events',
    ],
  },
  {
    name: 'Livingston',
    distance: '14 miles',
    driveTime: '25-30 minutes',
    trafficTime: '35-50 minutes (rush hour)',
    uberCost: '$35-50',
    lyftCost: '$32-47',
    taxiCost: '$55-70',
    privateCarCost: '$75-95',
    publicTransit: {
      route: 'NJ Transit #70 to Newark Penn, then AirTrain',
      duration: '60-70 minutes',
      cost: '$9.75 total',
    },
    popularPickupPoints: [
      'Livingston Town Center',
      'Northfield Avenue businesses',
      'Route 10 corridor',
      'Collins Elementary area',
    ],
    localTips: [
      'Route 10 to I-280 is fastest',
      'Book 60+ minutes early for morning flights',
      'Consider shared rides with neighbors',
    ],
  },
  {
    name: 'Millburn',
    distance: '12 miles',
    driveTime: '22-28 minutes',
    trafficTime: '32-45 minutes (rush hour)',
    uberCost: '$32-45',
    lyftCost: '$30-43',
    taxiCost: '$50-65',
    privateCarCost: '$70-90',
    publicTransit: {
      route: 'NJ Transit train to Newark Penn, then AirTrain',
      duration: '45-55 minutes',
      cost: '$11.50 total',
    },
    popularPickupPoints: [
      'Short Hills Mall',
      'Millburn Train Station',
      'Downtown Millburn',
      'Taylor Park area',
    ],
    localTips: [
      'Avoid mall traffic during holidays',
      'Morris Turnpike offers scenic alternative',
      'Pre-book for Paper Mill Playhouse events',
    ],
  },
  {
    name: 'South Orange',
    distance: '11 miles',
    driveTime: '22-27 minutes',
    trafficTime: '30-42 minutes (rush hour)',
    uberCost: '$30-42',
    lyftCost: '$28-40',
    taxiCost: '$48-62',
    privateCarCost: '$65-85',
    publicTransit: {
      route: 'NJ Transit train to Newark Penn, then AirTrain',
      duration: '35-45 minutes',
      cost: '$10.50 total',
    },
    popularPickupPoints: [
      'South Orange Train Station',
      'Seton Hall University',
      'South Orange Avenue downtown',
      'Meadowland Park area',
    ],
    localTips: [
      'Train option is very convenient',
      'Avoid Vose Avenue during school drop-off',
      'Book early for Seton Hall graduation',
    ],
  },
  {
    name: 'Maplewood',
    distance: '11 miles',
    driveTime: '22-27 minutes',
    trafficTime: '30-42 minutes (rush hour)',
    uberCost: '$30-42',
    lyftCost: '$28-40',
    taxiCost: '$48-62',
    privateCarCost: '$65-85',
    publicTransit: {
      route: 'NJ Transit train to Newark Penn, then AirTrain',
      duration: '40-50 minutes',
      cost: '$10.50 total',
    },
    popularPickupPoints: [
      'Maplewood Village',
      'Springfield Avenue shops',
      'Memorial Park area',
      'Maplewood Train Station',
    ],
    localTips: [
      'Excellent train connections',
      'Valley Street provides quick access to I-78',
      'Book early during July 4th festivities',
    ],
  },
  {
    name: 'Bloomfield',
    distance: '8 miles',
    driveTime: '18-22 minutes',
    trafficTime: '28-38 minutes (rush hour)',
    uberCost: '$25-35',
    lyftCost: '$23-33',
    taxiCost: '$40-52',
    privateCarCost: '$60-75',
    publicTransit: {
      route: 'NJ Transit #11 or #28 to Newark Penn, then AirTrain',
      duration: '45-55 minutes',
      cost: '$8.75 total',
    },
    popularPickupPoints: [
      'Bloomfield Center',
      'Broad Street corridor',
      'Watsessing Park area',
      'Bloomfield Train Station',
    ],
    localTips: [
      'Garden State Parkway provides direct route',
      'Avoid Broad Street during rush hour',
      'Consider Belleville Turnpike alternative',
    ],
  },
  {
    name: 'Cedar Grove',
    distance: '16 miles',
    driveTime: '28-33 minutes',
    trafficTime: '38-52 minutes (rush hour)',
    uberCost: '$38-52',
    lyftCost: '$35-50',
    taxiCost: '$60-75',
    privateCarCost: '$80-100',
    popularPickupPoints: [
      'Pompton Avenue shops',
      'Cedar Grove Town Center',
      'Ridge Road businesses',
      'Little Falls Road area',
    ],
    localTips: [
      'Route 23 to I-280 is most reliable',
      'Allow extra time during winter weather',
      'Book 75+ minutes early for AM flights',
    ],
  },
  {
    name: 'East Orange',
    distance: '8 miles',
    driveTime: '18-22 minutes',
    trafficTime: '28-38 minutes (rush hour)',
    uberCost: '$22-32',
    lyftCost: '$20-30',
    taxiCost: '$38-50',
    privateCarCost: '$55-70',
    publicTransit: {
      route: 'NJ Transit #21 to Newark Penn, then AirTrain',
      duration: '40-50 minutes',
      cost: '$8.50 total',
    },
    popularPickupPoints: [
      'East Orange Train Station',
      'Main Street downtown',
      'Central Avenue corridor',
      'Brick Church Station area',
    ],
    localTips: [
      'I-280 to Route 21 is fastest',
      'Multiple public transit options available',
      'Avoid Central Ave during school hours',
    ],
  },
  {
    name: 'Irvington',
    distance: '6 miles',
    driveTime: '15-18 minutes',
    trafficTime: '22-32 minutes (rush hour)',
    uberCost: '$18-28',
    lyftCost: '$16-26',
    taxiCost: '$32-42',
    privateCarCost: '$50-65',
    publicTransit: {
      route: 'NJ Transit #13 or #39 to Newark Penn, then AirTrain',
      duration: '35-45 minutes',
      cost: '$8.25 total',
    },
    popularPickupPoints: [
      'Irvington Center',
      'Springfield Avenue',
      'Clinton Avenue shops',
      'Civic Square area',
    ],
    localTips: [
      'Close proximity means quick trips',
      'Garden State Parkway Exit 143 is convenient',
      'Morning traffic lighter before 6:30 AM',
    ],
  },
  {
    name: 'Nutley',
    distance: '10 miles',
    driveTime: '20-25 minutes',
    trafficTime: '30-42 minutes (rush hour)',
    uberCost: '$28-40',
    lyftCost: '$26-38',
    taxiCost: '$45-60',
    privateCarCost: '$65-80',
    popularPickupPoints: [
      'Franklin Avenue shops',
      'Centre Street downtown',
      'Park Avenue businesses',
      'Washington Avenue area',
    ],
    localTips: [
      'Route 21 South provides direct access',
      'Avoid Route 3 during rush hour',
      'Kingsland Street is good alternative',
    ],
  },
  {
    name: 'Belleville',
    distance: '7 miles',
    driveTime: '16-20 minutes',
    trafficTime: '25-35 minutes (rush hour)',
    uberCost: '$20-30',
    lyftCost: '$18-28',
    taxiCost: '$35-45',
    privateCarCost: '$55-70',
    publicTransit: {
      route: 'NJ Transit #13 to Newark Penn, then AirTrain',
      duration: '40-50 minutes',
      cost: '$8.50 total',
    },
    popularPickupPoints: [
      'Washington Avenue downtown',
      'Belleville Turnpike shops',
      'Joralemon Street area',
      'Municipal Building area',
    ],
    localTips: [
      'Route 21 is most direct route',
      'Silver Lake area adds 5 minutes',
      'Light traffic on weekends',
    ],
  },
  {
    name: 'Caldwell',
    distance: '17 miles',
    driveTime: '30-35 minutes',
    trafficTime: '40-55 minutes (rush hour)',
    uberCost: '$40-55',
    lyftCost: '$38-52',
    taxiCost: '$65-80',
    privateCarCost: '$85-105',
    popularPickupPoints: [
      'Bloomfield Avenue downtown',
      'Central Avenue shops',
      'Provost Square',
      'Grover Cleveland Park area',
    ],
    localTips: [
      'Bloomfield Ave to I-280 is standard route',
      'Allow extra time for winter weather',
      'Book 90 minutes early for morning flights',
    ],
  },
  {
    name: 'Verona',
    distance: '13 miles',
    driveTime: '24-29 minutes',
    trafficTime: '33-45 minutes (rush hour)',
    uberCost: '$33-45',
    lyftCost: '$30-43',
    taxiCost: '$52-68',
    privateCarCost: '$70-90',
    popularPickupPoints: [
      'Bloomfield Avenue shops',
      'Verona Park area',
      'Pompton Avenue',
      'Sunset Avenue businesses',
    ],
    localTips: [
      'Route 23 to I-280 works well',
      'Avoid Bloomfield Ave during events at Verona Park',
      'Pleasant Valley Way is scenic alternative',
    ],
  },
  {
    name: 'Glen Ridge',
    distance: '10 miles',
    driveTime: '20-25 minutes',
    trafficTime: '30-40 minutes (rush hour)',
    uberCost: '$28-38',
    lyftCost: '$26-36',
    taxiCost: '$45-58',
    privateCarCost: '$65-80',
    publicTransit: {
      route: 'NJ Transit train to Newark Penn, then AirTrain',
      duration: '40-50 minutes',
      cost: '$10.00 total',
    },
    popularPickupPoints: [
      'Glen Ridge Train Station',
      'Ridgewood Avenue downtown',
      'Bloomfield Avenue shops',
      'Bay Street area',
    ],
    localTips: [
      'Train service is excellent option',
      'Watchung Avenue provides quick access to I-280',
      'Quiet residential streets - respect neighbors',
    ],
  },
  {
    name: 'West Caldwell',
    distance: '18 miles',
    driveTime: '32-37 minutes',
    trafficTime: '42-58 minutes (rush hour)',
    uberCost: '$42-58',
    lyftCost: '$40-55',
    taxiCost: '$68-85',
    privateCarCost: '$90-110',
    popularPickupPoints: [
      'Bloomfield Avenue shops',
      'Passaic Avenue businesses',
      'Clinton Road area',
      'Westville Avenue',
    ],
    localTips: [
      'I-280 East is primary route',
      'Consider leaving extra early for international flights',
      'Shared rides popular with neighbors',
    ],
  },
  {
    name: 'Essex Fells',
    distance: '16 miles',
    driveTime: '28-33 minutes',
    trafficTime: '38-52 minutes (rush hour)',
    uberCost: '$40-55',
    lyftCost: '$38-52',
    taxiCost: '$65-80',
    privateCarCost: '$85-105',
    popularPickupPoints: [
      'Essex Fells Country Club area',
      'Roseland Avenue',
      'Fells Road',
      'Oak Lane residential area',
    ],
    localTips: [
      'Exclusive residential area - drivers need gate codes',
      'Pre-arrange pickup locations',
      'Allow extra time for estate pickups',
    ],
  },
  {
    name: 'Roseland',
    distance: '15 miles',
    driveTime: '27-32 minutes',
    trafficTime: '37-50 minutes (rush hour)',
    uberCost: '$38-52',
    lyftCost: '$35-50',
    taxiCost: '$60-75',
    privateCarCost: '$80-100',
    popularPickupPoints: [
      'Eagle Rock Avenue offices',
      'Eisenhower Parkway businesses',
      'Roseland Plaza',
      'Harrison Avenue area',
    ],
    localTips: [
      'Business district has heavy morning traffic',
      'I-280 East provides direct access',
      'Corporate accounts available for businesses',
    ],
  },
  {
    name: 'Fairfield',
    distance: '20 miles',
    driveTime: '35-40 minutes',
    trafficTime: '45-65 minutes (rush hour)',
    uberCost: '$45-65',
    lyftCost: '$42-62',
    taxiCost: '$75-95',
    privateCarCost: '$95-120',
    popularPickupPoints: [
      'Route 46 businesses',
      'Fairfield Business Campus',
      'Hollywood Avenue industrial area',
      'Bloomfield Avenue shops',
    ],
    localTips: [
      'Route 46 to I-80 to I-280 is standard',
      'Heavy truck traffic on Route 46',
      'Book 90+ minutes early for AM flights',
    ],
  },
  {
    name: 'North Caldwell',
    distance: '17 miles',
    driveTime: '30-35 minutes',
    trafficTime: '40-55 minutes (rush hour)',
    uberCost: '$42-57',
    lyftCost: '$40-54',
    taxiCost: '$67-82',
    privateCarCost: '$85-105',
    popularPickupPoints: [
      'Mountain Avenue estates',
      'Grandview Avenue',
      'Central Avenue',
      'Country Club area',
    ],
    localTips: [
      'Upscale residential - drivers need experience',
      'Mountain roads require caution in winter',
      'Premium service expected by residents',
    ],
  },
  {
    name: 'Orange',
    distance: '9 miles',
    driveTime: '19-24 minutes',
    trafficTime: '29-40 minutes (rush hour)',
    uberCost: '$25-35',
    lyftCost: '$23-33',
    taxiCost: '$42-55',
    privateCarCost: '$60-75',
    publicTransit: {
      route: 'NJ Transit train to Newark Penn, then AirTrain',
      duration: '45-55 minutes',
      cost: '$9.50 total',
    },
    popularPickupPoints: [
      'Orange Train Station',
      'Main Street downtown',
      'Central Avenue',
      'Valley area',
    ],
    localTips: [
      'I-280 provides quick access',
      'Multiple train options available',
      'Avoid Main Street during events',
    ],
  },
]

// Comprehensive FAQ Section
export const NEWARK_AIRPORT_FAQ: FrequentlyAskedQuestion[] = [
  // General Questions
  {
    question: 'What time should I arrive at Newark Airport for my flight?',
    answer:
      'For domestic flights, arrive 2 hours before departure. For international flights, arrive 3 hours before departure. During peak travel periods (holidays, summer), add an extra 30-60 minutes. TSA PreCheck passengers can reduce this by 30 minutes.',
    category: 'timing',
  },
  {
    question: 'What are the current TSA wait times at Newark Airport?',
    answer:
      'Average TSA wait times are 12-15 minutes during normal periods, 20-30 minutes during morning rush (5-8 AM), and can exceed 45 minutes during holidays. Terminal C typically has the shortest waits due to multiple checkpoints. Download the MyTSA app for real-time wait times.',
    category: 'timing',
  },
  {
    question: 'Which terminal is United Airlines at Newark?',
    answer:
      'United Airlines operates exclusively from Terminal C at Newark Airport. As their major hub, United handles 63% of all Newark passengers with gates C70-C139. United Express flights also depart from Terminal C.',
    category: 'terminals',
  },
  {
    question: 'How much does parking cost at Newark Airport?',
    answer:
      'Daily parking rates: Terminal Garages A/B/C ($39/day), P1/P3 Daily ($33/day), P4 Daily ($34/day), P6 Economy ($27/day - best value). Short-term parking is $8/half-hour up to $39/day. Valet parking available for $50/day.',
    category: 'parking',
  },
  {
    question: "What's the best way to get to Newark Airport from Essex County?",
    answer:
      'The best option depends on your location: From Newark/Irvington/East Orange - rideshare ($15-32) or public transit. From Montclair/Livingston/West Essex - private car service ($75-105) for reliability. From South Orange/Maplewood - NJ Transit train + AirTrain ($10.50, 40 minutes).',
    category: 'transportation',
  },
  {
    question: 'Is there a shuttle from Newark Penn Station to the airport?',
    answer:
      'Yes, the AirTrain connects Newark Penn Station to all terminals at Newark Airport. The ride takes 10-15 minutes and costs $8.50. Trains run every 3 minutes during peak hours and every 15 minutes late night. NJ Transit monthly pass holders get a discount.',
    category: 'transportation',
  },
  {
    question: 'What airlines fly international from Newark?',
    answer:
      'Newark serves as a major international gateway with 50+ airlines including United (Star Alliance hub), Lufthansa, Swiss, Air India, British Airways, Virgin Atlantic, TAP Portugal, Turkish Airlines, Emirates, Singapore Airlines, and more. Most international flights depart from Terminal B and C.',
    category: 'terminals',
  },
  {
    question: 'Can I get dropped off at Newark Airport for free?',
    answer:
      'Yes, passenger drop-off at terminal curbside is free but limited to active loading/unloading only (no waiting). For longer goodbyes, use the Cell Phone Lot (free for 30 minutes) or short-term parking ($8/half hour).',
    category: 'costs',
  },
  {
    question: "What's the difference between Newark Airport parking lots?",
    answer:
      'Terminal Garages (A/B/C): Closest, covered, $39/day. P1/P3: Outdoor daily lots, $33/day, 5-10 min to terminals. P4: Daily lot, $34/day, AirTrain required. P6 Economy: Best value at $27/day but furthest (15 min via AirTrain). Valet: Premium service, $50/day.',
    category: 'parking',
  },
  {
    question: 'How early should Essex County residents leave for Newark Airport?',
    answer:
      'From Newark: 60-90 minutes before flight. From Montclair/West Orange: 90-120 minutes. From Millburn/Livingston: 90-120 minutes. From West Essex (Caldwell/Fairfield): 120-150 minutes. Add 30 minutes during rush hour or bad weather.',
    category: 'timing',
  },
  {
    question: 'Are there direct buses from Essex County to Newark Airport?',
    answer:
      'Limited direct service exists. The GO28 bus serves some areas. Most riders take NJ Transit buses (#13, #21, #28, #39, #62, #70, #71) to Newark Penn Station, then connect via AirTrain ($8.50 additional). Total journey: 45-70 minutes depending on location.',
    category: 'transportation',
  },
  {
    question: "What's the cheapest way to get to Newark Airport?",
    answer:
      'Public transit is cheapest: $8.25-12.00 total from most Essex County towns (bus/train to Newark Penn + AirTrain). Shared rideshare during off-peak: $15-40. Airport Express shuttle (when available): $25-35. Avoid surge pricing by booking in advance.',
    category: 'costs',
  },
  {
    question: 'Does Newark Airport have CLEAR or TSA PreCheck?',
    answer:
      'Yes, all terminals have TSA PreCheck lanes (typically 5-10 minute wait). CLEAR is available in all terminals with dedicated lanes that connect to TSA PreCheck. Global Entry kiosks are in Terminal B and C for international arrivals.',
    category: 'general',
  },
  {
    question: 'What hotels offer Newark Airport shuttle service?',
    answer:
      'Marriott Newark Airport, Hilton Newark Airport, Renaissance Newark Airport, Courtyard Newark Elizabeth, Hampton Inn Newark Airport, and SpringHill Suites Newark Airport all offer free 24/7 shuttle service. Most Essex County hotels do not provide airport shuttles.',
    category: 'transportation',
  },
  {
    question: 'Can I take an Uber/Lyft from Newark Airport?',
    answer:
      'Yes, rideshare pickup is on Level P2 of each terminal parking garage (follow signs for "App-Based Rides"). Typical wait: 3-8 minutes. Costs to Essex County: $15-65 depending on destination. Avoid surge pricing during evening rush (5-7 PM) and Sunday nights.',
    category: 'transportation',
  },
  {
    question: 'What terminal do international flights arrive at Newark?',
    answer:
      'Most international arrivals are at Terminal B (gates B40-B68) and Terminal C (gates C70-C139). Terminal B handles most European carriers while Terminal C handles United international and Star Alliance partners. All terminals have Global Entry for expedited customs.',
    category: 'terminals',
  },
  {
    question: 'Is Newark Airport parking safe for long-term?',
    answer:
      'Yes, all Newark Airport parking facilities are secure with 24/7 security patrols, surveillance cameras, and emergency call boxes. P6 Economy is best for long-term parking (7+ days) at $27/day with regular AirTrain service. Never leave valuables visible in your car.',
    category: 'parking',
  },
  {
    question: "What's traffic like getting to Newark Airport?",
    answer:
      'Morning rush (7-9 AM): Add 15-30 minutes. Evening rush (4-7 PM): Add 20-40 minutes. Friday afternoons: Heavy traffic after 2 PM. Sunday evenings: Congested 4-8 PM. Route 78 and I-280 are main bottlenecks. Use Waze/Google Maps for real-time routing.',
    category: 'timing',
  },
  {
    question: 'Do I need a Real ID to fly from Newark Airport?',
    answer:
      'Starting May 7, 2025, Real ID or alternative acceptable ID (passport, military ID, Global Entry card) is required for domestic flights. New Jersey Real ID has a star in the upper right corner. International flights always require a passport.',
    category: 'general',
  },
  {
    question: 'What food options are available at Newark Airport?',
    answer:
      "Terminal A: Jersey Mike's, Starbucks, Tony Roma's. Terminal B: Riviera Bar, Saison, Grand Bar & Grill. Terminal C: Classified (fine dining), Caps Beer Garden, Vanguard Kitchen, multiple United Club restaurants. Most open 5 AM - 10 PM.",
    category: 'terminals',
  },
]

// Cost Calculator Data
export const TRANSPORT_COST_FACTORS = {
  surgeMultiplier: {
    regular: 1.0,
    moderate: 1.5,
    high: 2.2,
    extreme: 3.0,
  },
  timeOfDay: {
    earlyMorning: { start: '04:00', end: '06:00', multiplier: 0.9 },
    morningRush: { start: '06:00', end: '09:00', multiplier: 1.3 },
    midDay: { start: '09:00', end: '16:00', multiplier: 1.0 },
    eveningRush: { start: '16:00', end: '19:00', multiplier: 1.4 },
    evening: { start: '19:00', end: '22:00', multiplier: 1.1 },
    lateNight: { start: '22:00', end: '04:00', multiplier: 1.2 },
  },
  dayOfWeek: {
    monday: 1.1,
    tuesday: 1.0,
    wednesday: 1.0,
    thursday: 1.1,
    friday: 1.3,
    saturday: 0.9,
    sunday: 1.2,
  },
  luggageCharges: {
    sedan: { base: 2, perBag: 0 },
    suv: { base: 3, perBag: 0 },
    van: { base: 4, perBag: 0 },
    limo: { base: 0, perBag: 0 },
  },
}

// Terminal-Specific Tips
export const TERMINAL_TIPS = {
  'Terminal A': [
    'Renovated in 2023 with modern amenities',
    'Best food court variety in Level 3',
    'TSA PreCheck usually fastest here',
    'Gates A20-A30 require extra walking time',
  ],
  'Terminal B': [
    'International terminal - arrive 3 hours early',
    'Duty-free shopping after security',
    'Multiple currency exchange locations',
    'Global Entry kiosks for returning passengers',
  ],
  'Terminal C': [
    'United hub - busiest terminal',
    'Four United Clubs for members',
    'Polaris Lounge for international business/first',
    'Gates C120-139 require train ride (add 10 min)',
  ],
}

// Seasonal Travel Advisories
export const SEASONAL_ADVISORIES = {
  winter: {
    months: ['December', 'January', 'February'],
    tips: [
      'Allow extra 30-45 minutes for potential weather delays',
      'Check flight status before leaving home',
      'Consider staying at airport hotel night before early flights',
      'Pack deicer in car for return trip parking',
    ],
  },
  summer: {
    months: ['June', 'July', 'August'],
    tips: [
      'Heaviest travel season - arrive 30 minutes earlier',
      'Book transportation 48+ hours in advance',
      'Afternoon thunderstorms may cause delays',
      'Parking lots fill up - consider P6 Economy',
    ],
  },
  holidays: {
    periods: ['Thanksgiving Week', 'Christmas Week', 'Spring Break', 'July 4th Weekend'],
    tips: [
      'Book transportation 1 week+ in advance',
      'Arrive 1 hour earlier than normal recommendation',
      'Expect surge pricing on rideshares',
      'Consider park-and-fly hotel packages',
    ],
  },
}

// Local Expert Tips by Municipality
export const LOCAL_EXPERT_TIPS: Record<string, string[]> = {
  Newark: [
    'Use McCarter Highway (Route 21) to avoid Route 78 congestion',
    'Newark Penn Station offers cheapest route via AirTrain ($8.50)',
    'Ironbound residents: Take Ferry Street to Route 21 North',
    'Downtown parking at Edison ParkFast + Uber can be cheaper than airport parking',
  ],
  Montclair: [
    'Book private car for early morning flights - more reliable than rideshare',
    'DeCamp Bus Line #33 offers direct service to NYC airports',
    'Avoid Bloomfield Avenue 3-6 PM on weekdays',
    'Upper Montclair: Use Park Street to Valley Road for quicker access to I-280',
  ],
  'West Orange': [
    'Eagle Rock Reservation route scenic but slower - avoid if running late',
    'Pleasant Valley Way to I-280 typically fastest',
    'Essex Green Shopping Center is good rideshare pickup spot',
    'Consider Livingston park-and-ride for long trips (cheaper parking)',
  ],
  Livingston: [
    'Route 10 to I-280 faster than local roads',
    'Form neighborhood airport ride groups for cost sharing',
    'Town Center has dedicated rideshare pickup area',
    'Avoid Livingston Circle during rush hours',
  ],
  Millburn: [
    'Short Hills Mall traffic adds 15+ minutes during holidays',
    'Train to Newark Penn + AirTrain very convenient ($11.50)',
    'Millburn Avenue to Route 124 avoids mall traffic',
    'Paper Mill Playhouse events cause evening congestion',
  ],
  'South Orange': [
    'Excellent train service - often faster than driving',
    'Seton Hall graduation/move-in creates major traffic',
    'South Orange Avenue has dedicated bus lanes (faster)',
    "Village area has 2-hour parking limits - don't leave car",
  ],
}

// Corporate Account Benefits
export const CORPORATE_BENEFITS = [
  'Dedicated account manager for your company',
  'Monthly invoicing with detailed trip reports',
  'Priority booking and vehicle upgrades',
  'Meet & greet service included',
  'Flexible cancellation up to 2 hours before',
  'Volume discounts starting at 10 trips/month',
  'Direct billing to corporate credit cards',
  'VIP lounge access for executives',
  'Road warrior rewards program',
  'Integration with Concur and expense systems',
]

// Vehicle Fleet Options
export const VEHICLE_OPTIONS = [
  {
    type: 'Economy Sedan',
    capacity: '3 passengers + 2 bags',
    examples: 'Toyota Camry, Honda Accord',
    bestFor: 'Individual business travelers, couples',
    features: ['WiFi', 'Phone chargers', 'Water bottles'],
  },
  {
    type: 'Premium Sedan',
    capacity: '3 passengers + 3 bags',
    examples: 'BMW 5 Series, Mercedes E-Class',
    bestFor: 'Executives, special occasions',
    features: ['Leather seats', 'WiFi', 'Newspapers', 'Refreshments'],
  },
  {
    type: 'SUV',
    capacity: '5 passengers + 5 bags',
    examples: 'Chevrolet Suburban, Cadillac Escalade',
    bestFor: 'Families, group travel, lots of luggage',
    features: ['Extra luggage space', 'Third row seating', 'Entertainment system'],
  },
  {
    type: 'Van',
    capacity: '10 passengers + 10 bags',
    examples: 'Mercedes Sprinter, Ford Transit',
    bestFor: 'Large groups, sports teams, wedding parties',
    features: ['Individual seats', 'Luggage trailer available', 'Multiple zones'],
  },
  {
    type: 'Stretch Limousine',
    capacity: '8 passengers',
    examples: 'Lincoln Town Car, Chrysler 300',
    bestFor: 'Special events, celebrations, VIP service',
    features: ['Bar service', 'Mood lighting', 'Privacy partition', 'Entertainment'],
  },
]

// Special Services
export const SPECIAL_SERVICES = {
  'Meet & Greet': 'Driver meets you at baggage claim with name sign, assists with luggage',
  'Curbside Pickup': 'Driver coordinates meeting at terminal curb after you land',
  'Child Seats': 'Infant, convertible, and booster seats available (request when booking)',
  'Pet Transport': 'Pet-friendly vehicles with carriers available',
  'Wheelchair Accessible': 'ADA-compliant vehicles with ramps or lifts',
  'Multiple Stops': 'Add stops for hotel pickups or dropping off colleagues',
  'Flight Monitoring': 'Real-time flight tracking adjusts pickup time automatically',
  'Corporate Billing': 'Direct billing to company with detailed monthly statements',
  'Hourly Charter': 'Keep driver and vehicle for multiple stops or waiting time',
  'VIP Security': 'Discrete, professional drivers with security clearance',
}
