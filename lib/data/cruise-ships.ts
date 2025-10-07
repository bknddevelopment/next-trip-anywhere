/**
 * Cruise Ship Data for SEO-Optimized Ship-Specific Pages
 *
 * This file manages individual ship pages for high-search-volume vessels.
 * Each entry creates a page at /cruises/ships/[slug]
 *
 * PHASE 2: Ship-Specific Pages (400K+ monthly searches)
 */

export interface CruiseShip {
  slug: string
  name: string
  cruiseLine: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  searchVolume: number
  difficulty: number
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  content: {
    hero: {
      headline: string
      subheadline: string
    }
    description: string
    shipSpecs: {
      launched: number
      tonnage: number
      passengers: number
      crew: number
      decks: number
      length: string
    }
    highlights: string[]
    features: {
      category: string
      items: string[]
    }[]
    localTips: string[]
  }
  faq: {
    question: string
    answer: string
  }[]
  internalLinks: string[]
  lastUpdated: string
}

export const cruiseShips: CruiseShip[] = [
  // ============================================================
  // ROYAL CARIBBEAN SHIPS - Highest Search Volume
  // ============================================================

  {
    slug: 'utopia-of-the-seas',
    name: 'Utopia of the Seas',
    cruiseLine: 'Royal Caribbean',
    metaTitle: 'Utopia of the Seas 2025 | Royal Caribbean Newest Ship Reviews',
    metaDescription:
      "Book Utopia of the Seas - Royal Caribbean's newest Oasis-class ship. Short getaways from Port Canaveral. Essex County cruise experts.",
    keywords: [
      'utopia of the seas',
      'utopia of the seas cruise',
      'royal caribbean utopia',
      'utopia cruise ship',
      'utopia of the seas 2025',
    ],
    searchVolume: 135000,
    difficulty: 43,
    priority: 'HIGH',
    content: {
      hero: {
        headline: "Utopia of the Seas - Royal Caribbean's Newest Wonder",
        subheadline: 'Ultimate Short Getaways from Port Canaveral',
      },
      description:
        "Welcome aboard Utopia of the Seas, Royal Caribbean's sixth and newest Oasis-class ship, debuting in July 2024. Designed specifically for short getaways, this 236,857-ton marvel offers Essex County travelers the perfect weekend escape from nearby Port Canaveral, Florida. With exclusive neighborhoods including the all-new Utopia neighborhood, Royal Railway dining, and the thrilling Scary-oke karaoke bar, Utopia delivers Royal Caribbean's signature over-the-top entertainment in convenient 3-4 night sailings. Whether you're seeking adrenaline-pumping waterslides, Broadway shows, or relaxation in the adults-only Solarium, Utopia of the Seas packs a full week's worth of experiences into short Caribbean cruises perfect for Newark-area travelers.",
      shipSpecs: {
        launched: 2024,
        tonnage: 236857,
        passengers: 5668,
        crew: 2300,
        decks: 18,
        length: '1,188 feet',
      },
      highlights: [
        'Brand new ship - launched July 2024',
        'Perfect for 3-4 night weekend getaways',
        'Departs from Port Canaveral (90 min from Orlando)',
        '8 distinct neighborhoods including new Utopia neighborhood',
        'Ultimate Abyss - tallest slide at sea (10 decks)',
        'Perfect Storm waterslides & FlowRider surf simulator',
        'Royal Theatre with Broadway-caliber productions',
        ' 20+ dining options including new Royal Railway',
      ],
      features: [
        {
          category: 'Entertainment',
          items: [
            'AquaTheater with high-diving shows',
            'Ice skating rink with professional performances',
            'Royal Theatre Broadway productions',
            'Music Hall with live bands',
            'Scary-oke karaoke bar',
            'Bionic Bar with robotic bartenders',
          ],
        },
        {
          category: 'Dining',
          items: [
            'Royal Railway - immersive dining experience',
            'Main Dining Room with rotating menus',
            'Windjammer Marketplace buffet',
            "Giovanni's Italian Kitchen",
            'Chops Grille steakhouse',
            'Izumi Japanese cuisine',
            '150 Central Park - upscale dining',
            'Johnny Rockets 1950s diner',
          ],
        },
        {
          category: 'Activities',
          items: [
            'Ultimate Abyss slide (10 stories)',
            'Perfect Storm waterslides',
            'FlowRider surf simulators (2)',
            'Rock climbing walls',
            'Zip line 9 decks above boardwalk',
            'Mini golf course',
            'Basketball & volleyball courts',
            'Fitness center & jogging track',
          ],
        },
        {
          category: 'Pools & Relaxation',
          items: [
            'Main pool deck with multiple pools',
            'Beach Pool with entry steps',
            'Sports Pool for activities',
            'Solarium (adults-only) with pools',
            'Vitality Spa & Fitness Center',
            'Hot tubs throughout ship',
            'Central Park - living tree-lined promenade',
          ],
        },
      ],
      localTips: [
        'Fly from Newark (EWR) to Orlando (MCO) - 2.5 hours, then 90-minute drive or shuttle to Port Canaveral',
        'Weekend sailings perfect for quick getaways (depart Friday, return Monday)',
        "Book interior cabins for best value on short cruises - you won't spend much time in the room",
        'Pre-book dining reservations 90 days out - Royal Railway and specialty restaurants fill quickly',
        'Consider 1-night pre-cruise hotel in Orlando - makes embarkation day stress-free',
      ],
    },
    faq: [
      {
        question: 'How do I get to Utopia of the Seas from Newark/New Jersey?',
        answer:
          'Fly from Newark Airport (EWR) to Orlando (MCO) - about 2.5 hours. Port Canaveral is 90 minutes from Orlando. We can arrange flights, hotel, and port transfers as a complete package.',
      },
      {
        question: 'What makes Utopia of the Seas different from other Royal Caribbean ships?',
        answer:
          'Utopia is specifically designed for short getaways (3-4 nights) with quick turnarounds. It features the new Utopia neighborhood, Royal Railway dining experience, and focuses on maximum fun in minimal time - perfect for weekend escapes.',
      },
      {
        question: 'Is Utopia of the Seas good for families?',
        answer:
          'Absolutely! With the Ultimate Abyss slide, FlowRider surf simulator, waterslides, ice shows, and Adventure Ocean kids programs, Utopia offers incredible family entertainment. Adults also get exclusive Solarium and specialty dining.',
      },
    ],
    internalLinks: [
      '/cruises/royal-caribbean',
      '/cruises/bahamas',
      '/cruises/from-florida',
      '/cruises/weekend-getaways',
      '/packages/family-resorts-from-newark',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'adventure-of-the-seas',
    name: 'Adventure of the Seas',
    cruiseLine: 'Royal Caribbean',
    metaTitle: 'Adventure of the Seas 2025 | Royal Caribbean Ship Reviews',
    metaDescription:
      'Book Adventure of the Seas cruises. Voyager-class ship with Caribbean itineraries. Perfect for families. Newark area cruise specialists.',
    keywords: [
      'adventure of the seas',
      'adventure of the seas cruise',
      'royal caribbean adventure',
      'adventure ship royal caribbean',
    ],
    searchVolume: 33100,
    difficulty: 42,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Adventure of the Seas - Classic Caribbean Fun',
        subheadline: 'Family-Friendly Voyager-Class Excellence',
      },
      description:
        "Set sail on Adventure of the Seas, Royal Caribbean's beloved Voyager-class ship offering exceptional value and fun for Essex County families. Launched in 2001 and refreshed in 2018, Adventure delivers all the signature Royal Caribbean experiences - ice skating shows, rock climbing, FlowRider surf simulator, and vibrant nightlife - at more accessible pricing than newer megaships. With year-round Caribbean itineraries from Fort Lauderdale and seasonal sailings from other ports, this 3,114-passenger ship strikes the perfect balance between amenities and intimacy, making it ideal for first-time cruisers and families seeking maximum entertainment without overwhelming size.",
      shipSpecs: {
        launched: 2001,
        tonnage: 137276,
        passengers: 3114,
        crew: 1185,
        decks: 15,
        length: '1,020 feet',
      },
      highlights: [
        'Affordable Voyager-class with full amenities',
        'Ice skating rink with professional shows',
        'FlowRider surf simulator',
        'Rock climbing wall & mini golf',
        'Royal Promenade - indoor street with shops',
        'Johnny Rockets 1950s diner',
        'Adventure Ocean kids programs',
        'Caribbean itineraries year-round',
      ],
      features: [
        {
          category: 'Signature Activities',
          items: [
            'Studio B ice skating rink',
            'FlowRider surf simulator',
            '40-foot rock climbing wall',
            'Miniature golf course',
            'Basketball court',
            'Jogging track',
            'Fitness center',
          ],
        },
        {
          category: 'Dining',
          items: [
            'Main Dining Room (3 venues)',
            'Windjammer Cafe buffet',
            'Chops Grille steakhouse',
            "Giovanni's Table Italian",
            'Izumi Japanese',
            'Johnny Rockets',
            'Cafe Promenade',
            'Room service 24/7',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Ice Spectacular shows',
            'Lyric Theater productions',
            'Casino Royale',
            'On Air Club karaoke',
            'Schooner Bar piano lounge',
            'Boleros Latin lounge',
            'Teen disco',
          ],
        },
      ],
      localTips: [
        'Fly Newark to Fort Lauderdale (FLL) - 3 hours, easiest access to year-round Caribbean sailings',
        'Mid-tier cabins offer best value - save money for experiences and excursions',
        'Book 7-night Eastern or Western Caribbean for best port variety',
        'Pre-book FlowRider and specialty dining reservations online before cruise',
      ],
    },
    faq: [
      {
        question: 'How does Adventure of the Seas compare to newer Royal Caribbean ships?',
        answer:
          'Adventure offers the same core Royal Caribbean experiences (ice shows, FlowRider, rock climbing) at lower prices. Newer ships have more waterslides and restaurants, but Adventure provides excellent value with all the essentials.',
      },
      {
        question: 'Is Adventure of the Seas good for kids?',
        answer:
          'Yes! Adventure Ocean kids clubs (ages 3-17), FlowRider, ice shows, rock climbing, and pools make it very family-friendly. The mid-size ship is easier for kids to navigate than mega-ships.',
      },
      {
        question: 'Where does Adventure of the Seas sail from?',
        answer:
          'Primarily Fort Lauderdale year-round with 6-8 night Caribbean itineraries. Seasonal deployments to other ports. We arrange flights from Newark plus hotel and transfers.',
      },
    ],
    internalLinks: [
      '/cruises/royal-caribbean',
      '/cruises/caribbean',
      '/cruises/from-florida',
      '/packages/family-resorts-from-newark',
      '/cruises/7-day-caribbean',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'mariner-of-the-seas',
    name: 'Mariner of the Seas',
    cruiseLine: 'Royal Caribbean',
    metaTitle: 'Mariner of the Seas 2025 | Royal Caribbean Cruises',
    metaDescription:
      'Book Mariner of the Seas cruises. Voyager-class ship with waterslides. Caribbean & Bahamas itineraries. NJ travel experts.',
    keywords: [
      'mariner of the seas',
      'mariner of the seas cruise',
      'royal caribbean mariner',
      'mariner cruise ship',
    ],
    searchVolume: 27100,
    difficulty: 54,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Mariner of the Seas - Amplified Caribbean Adventures',
        subheadline: 'Voyager-Class with Thrilling Waterslides',
      },
      description:
        'Experience the thrill of Mariner of the Seas, a completely reimagined Voyager-class ship following Royal Caribbean\'s $120 million "Amplification" in 2018. This transformation added three waterslides including The Blaster aqua coaster, glow-in-the-dark laser tag, escape rooms, and completely redesigned dining venues. Essex County travelers enjoy the perfect combination of Voyager-class value with modern amenities rivaling newer ships. Sailing from Port Canaveral with convenient Florida access, Mariner delivers action-packed Caribbean and Bahamas cruises with something exciting for every age - from toddlers to grandparents.',
      shipSpecs: {
        launched: 2003,
        tonnage: 138279,
        passengers: 3114,
        crew: 1186,
        decks: 15,
        length: '1,020 feet',
      },
      highlights: [
        'The Blaster - aqua coaster waterslide',
        'Typhoon & Cyclone racing waterslides',
        'Battle for Planet Z laser tag',
        'The Escape Room (additional fee)',
        'FlowRider surf simulator',
        'Playmakers Sports Bar & Arcade',
        'Perfect for 3-5 night Bahamas getaways',
        'Port Canaveral departures (drive from NJ possible)',
      ],
      features: [
        {
          category: 'Water Features',
          items: [
            'The Blaster aqua coaster',
            'Typhoon & Cyclone waterslides',
            'Splashaway Bay kids aqua park',
            'Main pool deck',
            'FlowRider surf simulator',
            'Hot tubs (multiple)',
          ],
        },
        {
          category: 'Dining',
          items: [
            'Main Dining Room',
            'Windjammer Marketplace buffet',
            'Playmakers Sports Bar',
            "Giovanni's Italian",
            'Chops Grille steakhouse',
            'Izumi Hibachi & Sushi',
            'Johnny Rockets',
            'El Loco Fresh Mexican',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Battle for Planet Z laser tag',
            'The Escape Room',
            'Ice Spectacular shows',
            'Royal Theater productions',
            'Live music venues',
            'Casino Royale',
            'Teen club & arcade',
          ],
        },
      ],
      localTips: [
        'Port Canaveral is drivable from NJ (18-20 hours) - consider a fun road trip with stops',
        'Better option: Fly Newark to Orlando, 90-minute drive or shuttle to port',
        'Perfect for long weekends - 3-4 night Bahamas cruises available',
        'Book waterslides and laser tag times as soon as you board',
      ],
    },
    faq: [
      {
        question: 'What was added during Mariner of the Seas amplification?',
        answer:
          'The $120M "Amplification" added three waterslides (including The Blaster aqua coaster), laser tag, escape rooms, Playmakers Sports Bar, Splashaway Bay kids area, and completely redesigned dining venues. It\'s essentially a new ship!',
      },
      {
        question: 'Is Mariner of the Seas good for kids?',
        answer:
          'Excellent! Three waterslides, Splashaway Bay aqua park, laser tag, FlowRider, ice shows, and Adventure Ocean kids clubs make it one of the best Royal Caribbean ships for families with children.',
      },
      {
        question: 'How long are typical Mariner of the Seas cruises?',
        answer:
          'Primarily 3-5 night Bahamas and short Caribbean cruises from Port Canaveral, perfect for quick getaways. Some 6-8 night Caribbean itineraries also available seasonally.',
      },
    ],
    internalLinks: [
      '/cruises/royal-caribbean',
      '/cruises/bahamas',
      '/cruises/from-florida',
      '/cruises/weekend-getaways',
      '/packages/family-resorts-from-newark',
    ],
    lastUpdated: '2025-01-10',
  },
]

// Helper functions
export function getShipBySlug(slug: string): CruiseShip | undefined {
  return cruiseShips.find((ship) => ship.slug === slug)
}

export function getShipsByCruiseLine(line: string): CruiseShip[] {
  return cruiseShips.filter((ship) => ship.cruiseLine === line)
}

export function getHighPriorityShips(): CruiseShip[] {
  return cruiseShips.filter((ship) => ship.priority === 'HIGH')
}

export function getAllShipSlugs(): string[] {
  return cruiseShips.map((ship) => ship.slug)
}

// Generate static params for Next.js
export function generateShipStaticParams() {
  return cruiseShips.map((ship) => ({
    ship: ship.slug,
  }))
}
