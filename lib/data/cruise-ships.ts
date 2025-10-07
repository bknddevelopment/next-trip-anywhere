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

  // ============================================================
  // PHASE 3: Additional Royal Caribbean Ships
  // ============================================================

  {
    slug: 'independence-of-the-seas',
    name: 'Independence of the Seas',
    cruiseLine: 'Royal Caribbean',
    metaTitle: 'Independence of the Seas 2025 | Southampton Cruises from UK',
    metaDescription:
      'Book Independence of the Seas cruises from Southampton. Family-friendly Freedom-class ship with waterslides, FlowRider, ice shows. Book from Essex County NJ.',
    keywords: [
      'independence of the seas',
      'independence of the seas cruise',
      'royal caribbean independence',
      'independence cruise ship',
      'southampton cruises',
    ],
    searchVolume: 27100,
    difficulty: 43,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Independence of the Seas - European Adventures',
        subheadline: 'Year-Round Cruises from Southampton, UK',
      },
      description:
        "Sail aboard Independence of the Seas, a 154,407-ton Freedom-class ship homeported in Southampton, England. Perfect for Essex County travelers seeking European cruises, Independence offers exciting itineraries to the Mediterranean, Canary Islands, and Northern Europe. After a $120M renovation, the ship features three thrilling waterslides (including The Blaster aqua coaster), FlowRider surf simulator, escape room, laser tag, and completely redesigned dining and entertainment venues. With year-round departures from Southampton, it's easy to fly from Newark to London and embark on unforgettable European vacations combining iconic cities with Caribbean-style onboard fun.",
      shipSpecs: {
        launched: 2008,
        tonnage: 154407,
        passengers: 3634,
        crew: 1360,
        decks: 15,
        length: '1,112 feet',
      },
      highlights: [
        '$120M modernization completed 2018',
        'Year-round Southampton departures',
        'Three waterslides including aqua coaster',
        'FlowRider surf simulator',
        'Sky Pad bungee trampoline experience',
        'Laser tag & escape room',
        'Ice skating shows & Studio B ice rink',
        "15+ dining options including Jamie's Italian",
      ],
      features: [
        {
          category: 'Water Activities',
          items: [
            'The Blaster aqua coaster waterslide',
            'Perfect Storm twin racer slides',
            'Tidal Wave mat racer waterslide',
            'FlowRider surf simulator',
            'Splashaway Bay kids water park',
            'Three pools & six whirlpools',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Grease & Mamma Mia! Broadway shows',
            'Battle for Planet Z laser tag',
            'Escape the Rubicon escape room',
            'Ice skating spectacular in Studio B',
            'Sky Pad VR bungee trampoline',
            'Rock climbing wall',
          ],
        },
        {
          category: 'Dining',
          items: [
            'Windjammer Marketplace buffet',
            'Main Dining Room with My Time Dining',
            "Jamie's Italian by Jamie Oliver",
            'Chops Grille steakhouse',
            'Izumi Japanese cuisine',
            "Giovanni's Table Italian",
            'Playmakers Sports Bar & Arcade',
          ],
        },
        {
          category: 'Relaxation',
          items: [
            'Vitality Spa & Fitness Center',
            'Adults-only Solarium',
            'Diamond Lounge for suite guests',
            'Library & card room',
            'Outdoor movie screen',
          ],
        },
      ],
      localTips: [
        'Fly direct Newark (EWR) to London Heathrow, then train/transfer to Southampton (90 minutes)',
        'Consider pre-cruise hotel in Southampton to explore historic sites before embarkation',
        'Mediterranean cruises offer excellent value with included European city tours',
        'Book early for peak summer Mediterranean sailings - they sell out quickly',
      ],
    },
    faq: [
      {
        question: 'Where does Independence of the Seas sail from?',
        answer:
          'Independence of the Seas is year-round homeported in Southampton, England. From there, it sails to the Mediterranean (Spain, France, Italy), Canary Islands, and Northern Europe (Norway, Baltic). Easy to reach from Newark with direct flights to London.',
      },
      {
        question: 'What was added in the Independence renovation?',
        answer:
          'The $120M "Royal Amplified" renovation added three waterslides, laser tag, escape room, Sky Pad bungee trampoline, Playmakers Sports Bar, Izumi Japanese restaurant, redesigned kids clubs, and a complete refresh of all staterooms and public spaces.',
      },
      {
        question: 'Is Independence of the Seas good for families?',
        answer:
          'Absolutely! Three waterslides, Splashaway Bay aqua park, laser tag, ice shows, FlowRider, and Adventure Ocean kids programs make it perfect for families. Plus, European itineraries offer educational cultural experiences.',
      },
    ],
    internalLinks: [
      '/cruises/royal-caribbean',
      '/cruises/mediterranean',
      '/cruises/european',
      '/destinations',
      '/contact',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'brilliance-of-the-seas',
    name: 'Brilliance of the Seas',
    cruiseLine: 'Royal Caribbean',
    metaTitle: 'Brilliance of the Seas 2025 | Alaska & Europe Small Ship Cruises',
    metaDescription:
      'Book Brilliance of the Seas cruises - intimate Radiance-class ship for Alaska & Europe. Elegant mid-size ship with attentive service. Essex County experts.',
    keywords: [
      'brilliance of the seas',
      'brilliance of the seas cruise',
      'royal caribbean brilliance',
      'alaska cruise ship',
      'european cruise ship',
    ],
    searchVolume: 18100,
    difficulty: 45,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Brilliance of the Seas - Elegant Mid-Size Cruising',
        subheadline: 'Alaska, Europe & Panama Canal Voyages',
      },
      description:
        "Experience cruising at its finest aboard Brilliance of the Seas, a 90,090-ton Radiance-class ship offering the perfect balance of size and intimacy. With just 2,543 passengers, Brilliance provides more personalized service than mega-ships while still featuring rock climbing, full-size pools, and Broadway entertainment. Essex County travelers love Brilliance for its elegant Alaska Inside Passage cruises, Mediterranean voyages, and Panama Canal transits. The ship's floor-to-ceiling windows, panoramic elevators, and 827 ocean-view staterooms (over 80%!) ensure you won't miss a moment of spectacular scenery in Alaska's glaciers or Europe's coastlines.",
      shipSpecs: {
        launched: 2002,
        tonnage: 90090,
        passengers: 2543,
        crew: 859,
        decks: 12,
        length: '962 feet',
      },
      highlights: [
        'Intimate 2,543-passenger capacity',
        'Over 80% ocean-view staterooms',
        'Panoramic glass elevators with views',
        'Perfect for scenic Alaska cruises',
        'Rock climbing wall overlooking ocean',
        'Self-leveling pool tables',
        'Intimate dining experiences',
        'Adults-only Solarium',
      ],
      features: [
        {
          category: 'Unique Features',
          items: [
            'Floor-to-ceiling windows throughout',
            'Panoramic glass elevators',
            'Self-leveling pool tables',
            'Rock climbing wall',
            'Outdoor movie screen',
            '9-hole miniature golf',
          ],
        },
        {
          category: 'Dining',
          items: [
            'Windjammer Cafe buffet with ocean views',
            'Main Dining Room - two-story design',
            'Chops Grille steakhouse',
            "Giovanni's Table Italian trattoria",
            'Izumi Japanese cuisine',
            'Samba Grill Brazilian steakhouse',
            'Park Cafe casual dining',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Pacifica Theater with Broadway shows',
            'Live music in Schooner Bar',
            'Casino Royale',
            'R Bar cocktail lounge',
            'Bombay Billiard Club',
            'Champagne Bar',
          ],
        },
        {
          category: 'Relaxation',
          items: [
            'Vitality Spa with ocean-view treatment rooms',
            'Adults-only indoor/outdoor Solarium',
            'Outdoor pools and whirlpools',
            'Fitness center with panoramic views',
            'Library and card room',
          ],
        },
      ],
      localTips: [
        "Brilliance is ideal for Alaska cruises - smaller size allows access to ports mega-ships can't reach",
        'Book Solarium-view staterooms for Alaska - floor-to-ceiling windows showcase glaciers',
        "Europe itineraries include longer port stays due to ship's efficiency",
        'Request late dining for Alaska sailings to enjoy sunset views while dining',
      ],
    },
    faq: [
      {
        question: 'What makes Brilliance of the Seas different from larger Royal Caribbean ships?',
        answer:
          'Brilliance is a mid-size ship (2,543 passengers vs 5,000+ on mega-ships), offering more intimate service, higher percentage of ocean-view rooms (over 80%), and access to smaller ports. Perfect for scenic cruises where views matter - Alaska, Europe, Panama Canal.',
      },
      {
        question: 'Does Brilliance of the Seas have waterslides?',
        answer:
          'No, Brilliance is a Radiance-class ship focused on elegant cruising rather than waterpark thrills. It features pools, rock climbing, and panoramic views instead. For waterslides, consider Oasis or Freedom-class ships.',
      },
      {
        question: 'What are the best cabins on Brilliance of the Seas?',
        answer:
          'For Alaska: Solarium-view balconies (forward-facing floor-to-ceiling windows). For other cruises: Aft balconies offer large private balconies at lower cost than suites. Over 80% of cabins have ocean views!',
      },
    ],
    internalLinks: [
      '/cruises/royal-caribbean',
      '/cruises/alaska',
      '/cruises/mediterranean',
      '/cruises/european',
      '/contact',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'quantum-of-the-seas',
    name: 'Quantum of the Seas',
    cruiseLine: 'Royal Caribbean',
    metaTitle: 'Quantum of the Seas 2025 | Revolutionary Smart Ship Alaska Cruises',
    metaDescription:
      'Book Quantum of the Seas Alaska cruises - revolutionary Quantum-class ship with North Star, skydiving, bumper cars. Essex County cruise experts.',
    keywords: [
      'quantum of the seas',
      'quantum of the seas cruise',
      'royal caribbean quantum',
      'quantum alaska cruise',
      'north star cruise ship',
    ],
    searchVolume: 18100,
    difficulty: 45,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Quantum of the Seas - The Smart Ship',
        subheadline: 'Revolutionary Alaska Cruises with North Star & RipCord',
      },
      description:
        "Step into the future of cruising aboard Quantum of the Seas, Royal Caribbean's groundbreaking smart ship that redefined cruise innovation. This 168,666-ton marvel features the iconic North Star observation capsule rising 300 feet above the ocean, RipCord by iFLY skydiving simulator, bumper cars, and the Two70° entertainment venue with robotic screens. Perfect for Essex County travelers seeking Alaska adventures, Quantum sails from Seattle offering unparalleled glacier viewing from North Star, plus revolutionary technology including RFID WOWbands, robotic bartenders, and virtual balconies in inside cabins. Experience Alaska's majesty from the highest vantage point at sea!",
      shipSpecs: {
        launched: 2014,
        tonnage: 168666,
        passengers: 4180,
        crew: 1500,
        decks: 16,
        length: '1,141 feet',
      },
      highlights: [
        'North Star observation capsule - 300 feet high',
        'RipCord by iFLY skydiving simulator',
        'SeaPlex - bumper cars, roller skating, basketball',
        'Two70° venue with robotic screens & aerialists',
        'Virtual balconies with real-time ocean views',
        'Robotic bartenders in Bionic Bar',
        'Dynamic Dining - 18 restaurant choices',
        'Ripcord by iFLY indoor skydiving',
      ],
      features: [
        {
          category: 'Innovative Attractions',
          items: [
            'North Star glass capsule (highest viewing deck at sea)',
            'RipCord by iFLY indoor skydiving',
            'SeaPlex - largest indoor sports complex at sea',
            'Bumper cars & roller skating',
            'Two70° with 6 robotic screens',
            'Bionic Bar with robotic bartenders',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Two70° evening entertainment with Vistarama',
            'Music Hall live performances',
            'Starwater aerial shows',
            'Live bands & DJs',
            'Casino',
            'Rock climbing wall',
          ],
        },
        {
          category: 'Dining (Dynamic Dining)',
          items: [
            '18 restaurant choices with flexible dining',
            'Wonderland Imaginative Cuisine',
            "Jamie's Italian by Jamie Oliver",
            'Chops Grille steakhouse',
            'Silk Asian restaurant',
            "Michael's Genuine Pub",
            'Solarium Bistro',
            'Windjammer Marketplace',
          ],
        },
        {
          category: 'Technology',
          items: [
            'Virtual balconies in inside cabins (real-time ocean views)',
            'RFID WOWbands for room access & payments',
            'High-speed internet throughout',
            'Royal iQ app for planning & booking',
          ],
        },
      ],
      localTips: [
        'Book North Star reservations immediately when online check-in opens (free in Alaska for best views)',
        'Virtual balcony inside cabins offer amazing value - live ocean views without balcony price',
        'Dynamic Dining requires reservations - book restaurants when booking cruise',
        'Fly from Newark to Seattle 1-2 days early to explore Pike Place Market before embarkation',
      ],
    },
    faq: [
      {
        question: 'What is North Star and how much does it cost?',
        answer:
          "North Star is a glass observation capsule that rises 300 feet above the ocean on a mechanical arm, offering 360° views. In Alaska it's complimentary (first-come, first-served). On other itineraries it may have a fee. Book early when online check-in opens!",
      },
      {
        question: 'What is Dynamic Dining on Quantum of the Seas?',
        answer:
          'Instead of traditional fixed dining times, Quantum offers 18 different restaurants you can book anytime. No main dining room - choose from specialty restaurants included in your fare. Reservations required; book when you book your cruise.',
      },
      {
        question: 'Are virtual balconies worth it?',
        answer:
          'Absolutely! Inside cabins with virtual balconies have 80-inch HD screens showing real-time ocean views and sound. You get the view without the balcony price. Perfect for Alaska where weather makes balconies less usable.',
      },
    ],
    internalLinks: [
      '/cruises/royal-caribbean',
      '/cruises/alaska',
      '/cruises/from-seattle',
      '/guides/alaska-cruise-tips',
      '/contact',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'vision-of-the-seas',
    name: 'Vision of the Seas',
    cruiseLine: 'Royal Caribbean',
    metaTitle: 'Vision of the Seas 2025 | Caribbean & Europe Small Ship Cruises',
    metaDescription:
      'Book Vision of the Seas cruises - intimate Vision-class ship for Caribbean & Europe. Personalized service, elegant design. Essex County travel agency.',
    keywords: [
      'vision of the seas',
      'vision of the seas cruise',
      'royal caribbean vision',
      'small cruise ship',
      'intimate caribbean cruise',
    ],
    searchVolume: 18100,
    difficulty: 39,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Vision of the Seas - Classic Cruising Perfected',
        subheadline: 'Intimate Caribbean & European Voyages',
      },
      description:
        "Discover the charm of cruising aboard Vision of the Seas, a 78,491-ton Vision-class ship offering an intimate alternative to mega-ship cruising. With just 2,416 passengers, Vision delivers personalized service and a relaxed atmosphere while still featuring rock climbing, pools, casino, and excellent entertainment. Essex County travelers appreciate Vision's Caribbean itineraries from San Juan and European adventures, where the smaller size allows access to charming ports that larger ships can't visit. Recently renovized with new dining venues, updated staterooms, and modern amenities, Vision perfectly balances classic cruise elegance with contemporary comforts.",
      shipSpecs: {
        launched: 1998,
        tonnage: 78491,
        passengers: 2416,
        crew: 765,
        decks: 11,
        length: '915 feet',
      },
      highlights: [
        'Intimate 2,416-passenger capacity',
        'Recently renovated with modern updates',
        'Caribbean cruises from San Juan',
        'European cruises to smaller ports',
        'Rock climbing wall',
        'Full-size pools & Viking Crown Lounge',
        'Excellent value pricing',
        'Attentive, personalized service',
      ],
      features: [
        {
          category: 'Activities',
          items: [
            'Rock climbing wall',
            'Outdoor pools and whirlpools',
            'Golf simulator',
            'Basketball court',
            '9-hole miniature golf',
            'Jogging track',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Masquerade Theater with Broadway shows',
            'Schooner Bar piano lounge',
            'Viking Crown Lounge 360° views',
            'Casino Royale',
            'Live music & dancing',
            'Movie theater',
          ],
        },
        {
          category: 'Dining',
          items: [
            'Windjammer Cafe buffet',
            'Main Dining Room (two levels)',
            'Chops Grille steakhouse',
            "Giovanni's Table Italian",
            'Park Cafe deli',
            'Boardwalk Dog House hot dogs',
            'Izumi Hibachi & Sushi',
          ],
        },
        {
          category: 'Relaxation',
          items: [
            'Vitality Spa & Fitness Center',
            'Adults-only Solarium',
            'Library and card room',
            'Outdoor Movie Screen',
            'Peaceful observation decks',
          ],
        },
      ],
      localTips: [
        "Vision's San Juan homeport means fly to Puerto Rico (easy from Newark), explore Old San Juan, then cruise",
        'Smaller size = less crowding, easier embarkation/debarkation, more personalized service',
        'Excellent value for budget-conscious travelers - same Royal Caribbean quality at lower price',
        "European itineraries access charming small ports mega-ships can't reach",
      ],
    },
    faq: [
      {
        question: 'How is Vision of the Seas different from newer Royal Caribbean ships?',
        answer:
          'Vision is smaller (2,416 vs 5,000+ passengers), offering a more intimate, relaxed experience. No waterslides or surf simulators, but you get rock climbing, pools, shows, and excellent service. Perfect if you prefer fewer crowds and classic cruising.',
      },
      {
        question: 'Does Vision of the Seas have good dining options?',
        answer:
          "Yes! Recent renovations added Chops Grille steakhouse, Giovanni's Italian, Izumi Japanese, and Park Cafe. You get Royal Caribbean's quality dining in a more intimate setting. Main dining room and Windjammer buffet are included.",
      },
      {
        question: 'Is Vision of the Seas good for families?',
        answer:
          "Absolutely! Rock climbing, pools, Adventure Ocean kids programs, and family-friendly shows. It's not as kid-focused as Oasis-class ships (no waterslides), but offers plenty for families in a less overwhelming environment.",
      },
    ],
    internalLinks: [
      '/cruises/royal-caribbean',
      '/cruises/caribbean',
      '/cruises/from-san-juan',
      '/cruises/european',
      '/contact',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'serenade-of-the-seas',
    name: 'Serenade of the Seas',
    cruiseLine: 'Royal Caribbean',
    metaTitle: 'Serenade of the Seas 2025 | Alaska & Panama Canal Cruises',
    metaDescription:
      'Book Serenade of the Seas Alaska cruises - elegant Radiance-class ship with panoramic views. Perfect for scenic cruising. Essex County experts.',
    keywords: [
      'serenade of the seas',
      'serenade of the seas cruise',
      'royal caribbean serenade',
      'alaska cruise ship',
      'panama canal cruise',
    ],
    searchVolume: 14800,
    difficulty: 49,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Serenade of the Seas - Panoramic Elegance',
        subheadline: 'Alaska, Panama Canal & World Cruises',
      },
      description:
        "Sail aboard Serenade of the Seas, a 90,090-ton Radiance-class ship designed for breathtaking scenic cruising. With floor-to-ceiling windows, panoramic glass elevators, and 827 ocean-view staterooms (over 80%), Serenade ensures you won't miss a moment of Alaska's glaciers, Panama Canal's engineering marvels, or Pacific sunsets. Essex County travelers choose Serenade for its perfect balance - intimate enough for personalized service (2,476 passengers), yet large enough for full resort amenities. The ship's recent $30M renovation added new dining venues, modernized staterooms, and enhanced entertainment while preserving the elegant, window-filled design that makes Serenade perfect for destination-focused cruises.",
      shipSpecs: {
        launched: 2003,
        tonnage: 90090,
        passengers: 2476,
        crew: 894,
        decks: 12,
        length: '962 feet',
      },
      highlights: [
        'Over 80% ocean-view staterooms',
        'Floor-to-ceiling windows throughout',
        'Panoramic glass elevators',
        'Alaska Inside Passage specialist',
        'Panama Canal transit cruises',
        'Recent $30M renovation',
        'Self-leveling pool tables',
        'Intimate 2,476-passenger size',
      ],
      features: [
        {
          category: 'Scenic Features',
          items: [
            'Floor-to-ceiling windows in all public areas',
            'Panoramic glass elevators with ocean views',
            'Observation decks on multiple levels',
            'Self-leveling pool tables',
            'Rock climbing wall overlooking ocean',
            'Outdoor Movie Screen',
          ],
        },
        {
          category: 'Dining',
          items: [
            'Windjammer Marketplace with panoramic windows',
            'Two-story main dining room',
            'Chops Grille steakhouse',
            "Giovanni's Table Italian",
            'Izumi Japanese cuisine',
            'Park Cafe grab-and-go',
            "Sorrento's pizzeria",
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Tropical Theater with Broadway productions',
            'Schooner Bar piano lounge',
            'R Bar cocktail lounge',
            'Casino Royale',
            'Champagne Bar',
            'Live music venues',
          ],
        },
        {
          category: 'Relaxation',
          items: [
            'Vitality Spa with ocean-view treatment rooms',
            'Adults-only Solarium (indoor/outdoor)',
            'Pools and whirlpools',
            'Fitness center with panoramic views',
            'Library and card room',
          ],
        },
      ],
      localTips: [
        'Book forward-facing Solarium-view balconies for Alaska - floor-to-ceiling windows showcase glaciers',
        "Serenade is ideal for scenic cruising - windows everywhere mean you won't miss views",
        'Panama Canal cruises: Book port-side cabins for best canal lock views',
        "Ship's smaller size allows tender access to scenic Alaska ports mega-ships can't visit",
      ],
    },
    faq: [
      {
        question: 'What makes Serenade of the Seas special for Alaska cruises?',
        answer:
          "Serenade is a Radiance-class ship designed for scenic cruising. Over 80% of staterooms have ocean views, floor-to-ceiling windows are throughout the ship, and glass elevators offer panoramic views. You won't miss any of Alaska's glaciers, wildlife, or scenery!",
      },
      {
        question: 'How is Serenade different from mega-ships?',
        answer:
          'Serenade carries 2,476 passengers (vs 5,000+ on mega-ships), offering more intimate service and access to smaller ports. No waterslides, but you get elegant design, amazing views, and a focus on the destination rather than onboard waterparks.',
      },
      {
        question: 'Does Serenade of the Seas sail through the Panama Canal?',
        answer:
          "Yes! Serenade offers Panama Canal cruises and repositioning voyages. The ship's size is perfect for full canal transit. Panoramic windows and observation decks provide excellent viewing of the locks and engineering marvels.",
      },
    ],
    internalLinks: [
      '/cruises/royal-caribbean',
      '/cruises/alaska',
      '/cruises/panama-canal',
      '/cruises/hawaii',
      '/contact',
    ],
    lastUpdated: '2025-01-10',
  },

  // ============================================================
  // CARNIVAL SHIPS - High Search Volume
  // ============================================================

  {
    slug: 'carnival-dream',
    name: 'Carnival Dream',
    cruiseLine: 'Carnival Cruise Line',
    metaTitle: 'Carnival Dream 2025 | Galveston Caribbean Cruises Year-Round',
    metaDescription:
      'Book Carnival Dream cruises from Galveston - Dream-class ship with WaterWorks, RedFrog Pub, spa. Year-round Caribbean. Essex County experts.',
    keywords: [
      'carnival dream',
      'carnival dream cruise',
      'carnival dream galveston',
      'galveston cruise ship',
      'carnival dream caribbean',
    ],
    searchVolume: 14800,
    difficulty: 59,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Carnival Dream - Fun Ships Perfected',
        subheadline: 'Year-Round Caribbean Cruises from Galveston',
      },
      description:
        'Set sail aboard Carnival Dream, a 130,000-ton Dream-class ship offering the ultimate Carnival "Fun Ship" experience. Homeported year-round in Galveston, Texas, Dream features the massive WaterWorks aqua park with Twister slide, RedFrog Rum Bar, Serenity adults-only retreat, and Carnival\'s signature entertainment including Playlist Productions and Punchliner Comedy Club. Essex County travelers love the easy fly-and-cruise from Newark to Houston, then just 45 minutes to Galveston for weekly 7-night Western Caribbean sailings. With 1,823 staterooms and endless activities, Carnival Dream delivers non-stop fun for families, couples, and groups at Carnival\'s unbeatable value pricing.',
      shipSpecs: {
        launched: 2009,
        tonnage: 130000,
        passengers: 3646,
        crew: 1367,
        decks: 14,
        length: '1,004 feet',
      },
      highlights: [
        'Year-round Galveston homeport (easy from Houston)',
        'WaterWorks aqua park with Twister waterslide',
        'RedFrog Rum Bar with Caribbean atmosphere',
        'Serenity adults-only retreat',
        'Cloud 9 Spa staterooms available',
        'Playlist Productions themed shows',
        "Guy's Burger Joint (free)",
        'Western Caribbean weekly departures',
      ],
      features: [
        {
          category: 'Water Activities',
          items: [
            'WaterWorks aqua park',
            'Twister 300-foot corkscrew waterslide',
            'Pools and whirlpools',
            'Splash Zone kids water park',
            'Serenity adults-only sun deck',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Playlist Productions music-themed shows',
            'Punchliner Comedy Club by George Lopez',
            'Liquid Nightclub & Lounge',
            'RedFrog Pub with live music',
            'Casino',
            'IMAX Theater',
          ],
        },
        {
          category: 'Dining',
          items: [
            "Guy's Burger Joint (complimentary)",
            'BlueIguana Cantina Mexican (complimentary)',
            'Two-story main dining room',
            'Lido Marketplace buffet',
            'Cucina del Capitano Italian',
            'Fahrenheit 555 Steakhouse',
            'Bonsai Sushi',
            'RedFrog Rum Bar',
          ],
        },
        {
          category: 'Special Features',
          items: [
            'Cloud 9 Spa staterooms with spa access',
            'Ocean Plaza social hub',
            'SportSquare with mini golf, basketball, ropes course',
            'Carnival Multiplex with video game arcade',
            'Library and internet cafe',
          ],
        },
      ],
      localTips: [
        'Fly Newark to Houston IAH (direct flights), then 45-minute drive/shuttle to Galveston cruise terminal',
        'Western Caribbean itineraries include Cozumel, Grand Cayman, Jamaica - excellent value',
        'Book Cloud 9 Spa staterooms for unlimited spa thermal suite access (great value)',
        "Consider Faster to the Fun (priority boarding) - worth it for Galveston's large terminal",
      ],
    },
    faq: [
      {
        question: 'Where does Carnival Dream sail from?',
        answer:
          'Carnival Dream is year-round homeported in Galveston, Texas (45 minutes from Houston). Weekly 7-night Western Caribbean cruises to Cozumel, Grand Cayman, Jamaica, and private island Mahogany Bay. Easy fly-and-cruise from Newark to Houston.',
      },
      {
        question: 'What is WaterWorks on Carnival Dream?',
        answer:
          "WaterWorks is Carnival's massive onboard aqua park featuring Twister, a 300-foot corkscrew waterslide, plus Drainpipe slide, splash zones for kids, pools, and whirlpools. All complimentary - no extra charge. Perfect for families!",
      },
      {
        question: 'Are Cloud 9 Spa staterooms worth it on Carnival Dream?',
        answer:
          'Absolutely! Cloud 9 Spa staterooms include unlimited access to the thermal suite (steam rooms, saunas, heated loungers), priority spa appointments, special amenities, and are located near the spa. Excellent value compared to buying thermal suite passes separately.',
      },
    ],
    internalLinks: [
      '/cruises/carnival',
      '/cruises/from-galveston',
      '/cruises/caribbean',
      '/packages/family-resorts-from-newark',
      '/contact',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'carnival-firenze',
    name: 'Carnival Firenze',
    cruiseLine: 'Carnival Cruise Line',
    metaTitle: 'Carnival Firenze 2025 | Long Beach Mexican Riviera Cruises',
    metaDescription:
      'Book Carnival Firenze cruises from Long Beach - Italian-themed ship with WaterWorks, RedFrog Pub. Baja Mexico year-round. Essex County experts.',
    keywords: [
      'carnival firenze',
      'carnival firenze cruise',
      'long beach cruises',
      'mexican riviera cruise',
      'carnival firenze ensenada',
    ],
    searchVolume: 22200,
    difficulty: 46,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Carnival Firenze - Italian Fun Meets Mexican Riviera',
        subheadline: 'Long Beach to Baja Mexico Year-Round',
      },
      description:
        "Experience Carnival Firenze, Carnival's newest ship and the only one with an Italian flair! Originally Costa Toscana, this 135,225-ton beauty was redesigned with Carnival favorites while keeping Italian elegance. Homeported year-round in Long Beach, California, Firenze offers convenient 3-4 night Baja Mexico getaways to Ensenada, plus longer Mexican Riviera cruises. Essex County travelers love the fly-and-cruise option from Newark to LAX, then short drive to Long Beach for weekend escapes. Features include massive WaterWorks aqua park, RedFrog Rum Bar, Guy's Burger Joint, and unique Italian piazzas with Tuscan-inspired decor.",
      shipSpecs: {
        launched: 2021,
        tonnage: 135225,
        passengers: 5224,
        crew: 1678,
        decks: 16,
        length: '1,055 feet',
      },
      highlights: [
        "Carnival's newest ship (joined fleet 2024)",
        'Year-round Long Beach homeport (near LA)',
        'Quick 3-4 night Baja Mexico getaways',
        'Italian design meets Carnival fun',
        'WaterWorks aqua park',
        'RedFrog Rum Bar',
        "Guy's Burger Joint & BlueIguana",
        'Mexican Riviera specialist',
      ],
      features: [
        {
          category: 'Water Activities',
          items: [
            'WaterWorks aqua park with slides',
            'Twister waterslide',
            'Multiple pools and hot tubs',
            'Splash Zone kids water area',
            'Serenity adults-only sun deck',
          ],
        },
        {
          category: 'Italian Features',
          items: [
            'Piazza-style central gathering area',
            'Tuscan-inspired decor throughout',
            'Italian coffee bars',
            'European promenade design',
            'Elegant stateroom styling',
          ],
        },
        {
          category: 'Dining',
          items: [
            "Guy's Burger Joint (complimentary)",
            'BlueIguana Cantina (complimentary)',
            'Main dining room - two levels',
            'Lido Marketplace buffet',
            'Cucina del Capitano Italian',
            'Fahrenheit 555 Steakhouse',
            'Bonsai Sushi',
            'RedFrog Rum Bar',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Playlist Productions shows',
            'Punchliner Comedy Club',
            'Liquid Nightclub',
            'RedFrog Pub',
            'Casino',
            'Live music venues',
          ],
        },
      ],
      localTips: [
        'Long Beach is 30 minutes from LAX - easy fly-and-cruise from Newark',
        '3-4 night Baja cruises perfect for quick getaways - long weekend to Mexico!',
        'Ensenada is great for wine tasting (Guadalupe Valley), shopping, fish tacos',
        'Book early for peak summer sailings - shorter cruises sell out quickly',
      ],
    },
    faq: [
      {
        question: 'Where does Carnival Firenze cruise from?',
        answer:
          'Carnival Firenze is year-round homeported in Long Beach, California (30 minutes from LAX airport). Offers 3-4 night Baja Mexico cruises to Ensenada, plus longer 7-night Mexican Riviera cruises to Cabo, Mazatlan, and Puerto Vallarta.',
      },
      {
        question: 'What makes Carnival Firenze different from other Carnival ships?',
        answer:
          "Firenze is Carnival's newest ship (2024) and has unique Italian design elements including piazza-style gathering areas and Tuscan decor, originally built as Costa Toscana. It combines Italian elegance with Carnival's fun, casual atmosphere and signature features.",
      },
      {
        question: 'Are 3-4 night Baja Mexico cruises worth it?',
        answer:
          'Absolutely! Perfect for first-time cruisers, quick getaways, or testing Carnival before booking longer cruises. You get full cruise ship experience - dining, entertainment, pools, activities - plus visit Ensenada for wine tasting, shopping, and authentic Mexican food.',
      },
    ],
    internalLinks: [
      '/cruises/carnival',
      '/cruises/from-long-beach',
      '/cruises/mexican-riviera',
      '/cruises/weekend-getaways',
      '/contact',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'carnival-radiance',
    name: 'Carnival Radiance',
    cruiseLine: 'Carnival Cruise Line',
    metaTitle: 'Carnival Radiance 2025 | Long Beach Alaska & Mexico Cruises',
    metaDescription:
      "Book Carnival Radiance cruises - renovated Sunshine-class ship with WaterWorks, Guy's Pig & Anchor. Long Beach departures. Essex County experts.",
    keywords: [
      'carnival radiance',
      'carnival radiance cruise',
      'long beach cruise ship',
      'carnival radiance alaska',
      'carnival radiance mexico',
    ],
    searchVolume: 18100,
    difficulty: 48,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Carnival Radiance - Fun Reimagined',
        subheadline: 'Alaska & Mexican Riviera from Long Beach',
      },
      description:
        "Discover Carnival Radiance, a beautifully transformed 101,509-ton ship that completed a $200M renovation in 2021. Sailing from Long Beach, California, Radiance offers seasonal Alaska cruises (summer) and year-round Mexican Riviera getaways. Essex County travelers appreciate the easy Newark-to-LAX fly-and-cruise option to access this modernized vessel featuring WaterWorks aqua park, Guy's Pig & Anchor Bar-B-Que, RedFrog Rum Bar, and Playlist Productions shows. The extensive renovation added new restaurants, redesigned staterooms, enhanced kids areas, and modern entertainment while preserving Carnival's signature Fun Ship atmosphere. Perfect for families and couples seeking value-priced Alaska or Mexico adventures.",
      shipSpecs: {
        launched: 2000,
        tonnage: 101509,
        passengers: 2984,
        crew: 1031,
        decks: 13,
        length: '952 feet',
      },
      highlights: [
        '$200M renovation completed 2021',
        'Seasonal Alaska cruises from Long Beach',
        'Year-round Mexican Riviera sailings',
        'WaterWorks aqua park with slides',
        "Guy's Pig & Anchor Smokehouse",
        'RedFrog Rum Bar & BlueIguana Cantina',
        'Playlist Productions music shows',
        'Serenity adults-only retreat',
      ],
      features: [
        {
          category: 'Water Activities',
          items: [
            'WaterWorks aqua park',
            'Twister waterslide',
            'Speedway Splash racing slide',
            'Pools and whirlpools',
            'Splash Zone kids water park',
            'Serenity adults-only sun deck',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Playlist Productions themed shows (Rock, Country, Disco)',
            'Punchliner Comedy Club',
            'RedFrog Pub with live music',
            'Liquid Nightclub',
            'Casino',
            'IMAX Theater',
          ],
        },
        {
          category: 'Dining',
          items: [
            "Guy's Pig & Anchor Bar-B-Que Smokehouse",
            "Guy's Burger Joint (complimentary)",
            'BlueIguana Cantina (complimentary)',
            'Main dining room',
            'Lido Marketplace buffet',
            'Fahrenheit 555 Steakhouse',
            'Cucina del Capitano Italian',
            'Bonsai Sushi',
          ],
        },
        {
          category: 'Family Features',
          items: [
            'Camp Ocean kids club (ages 2-11)',
            'Circle C tweens program (12-14)',
            'Club O2 teens lounge (15-17)',
            'Dr. Seuss WaterWorks water park',
            'Video arcade',
            'Mini golf',
          ],
        },
      ],
      localTips: [
        'Alaska cruises (May-September): Inside Passage, Juneau, Ketchikan, Victoria - excellent value',
        'Mexican Riviera (October-April): Cabo, Mazatlan, Puerto Vallarta - warm winter escape',
        'Long Beach terminal is 30 min from LAX - book pre-cruise hotel to explore LA',
        "Guy's Pig & Anchor serves lunch & dinner - get there early as it fills up!",
      ],
    },
    faq: [
      {
        question: 'Where does Carnival Radiance cruise from?',
        answer:
          'Carnival Radiance is homeported year-round in Long Beach, California (near Los Angeles). Summer: 7-day Alaska Inside Passage cruises. Fall/Winter/Spring: 3-7 day Mexican Riviera cruises to Cabo, Mazatlan, Puerto Vallarta, and Ensenada.',
      },
      {
        question: 'What was added in the Carnival Radiance renovation?',
        answer:
          "The $200M renovation added WaterWorks aqua park, Guy's Pig & Anchor BBQ, RedFrog Rum Bar, Playlist Productions theater, completely redesigned staterooms, upgraded kids clubs, IMAX theater, and modern decor throughout. Essentially a new ship!",
      },
      {
        question: 'Is Carnival Radiance good for Alaska cruises?',
        answer:
          'Yes! Radiance offers 7-day Alaska Inside Passage cruises with stops at Juneau, Skagway, Ketchikan, and Victoria BC. WaterWorks, Serenity deck, and indoor entertainment are perfect for cooler Alaska weather. Excellent value compared to luxury Alaska ships.',
      },
    ],
    internalLinks: [
      '/cruises/carnival',
      '/cruises/from-long-beach',
      '/cruises/alaska',
      '/cruises/mexican-riviera',
      '/contact',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'carnival-pride',
    name: 'Carnival Pride',
    cruiseLine: 'Carnival Cruise Line',
    metaTitle: 'Carnival Pride 2025 | Baltimore Caribbean & Canada Cruises',
    metaDescription:
      'Book Carnival Pride cruises from Baltimore - Spirit-class ship with WaterWorks, RedFrog Pub. Caribbean & Canada/New England. Essex County experts.',
    keywords: [
      'carnival pride',
      'carnival pride cruise',
      'baltimore cruise ship',
      'carnival pride caribbean',
      'baltimore cruises',
    ],
    searchVolume: 12100,
    difficulty: 41,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Carnival Pride - East Coast Favorite',
        subheadline: 'Caribbean, Bermuda & Canada Cruises from Baltimore',
      },
      description:
        "Sail aboard Carnival Pride, an 88,500-ton Spirit-class ship offering convenient East Coast departures from Baltimore, Maryland. Just a 3-hour drive from Essex County, Pride delivers easy drive-to cruising without airfare hassles! After a $200M FunShip 2.0 renovation, Pride features WaterWorks aqua park, Guy's Burger Joint, RedFrog Rum Bar, and Serenity adults-only retreat. Seasonal itineraries include 7-day Caribbean (winter), 7-day Bermuda (summer), and spectacular 10-day Canada/New England fall foliage cruises. With 2,124 passengers, Pride offers a more intimate Carnival experience with all the fun and value you expect, perfect for Newark-area travelers who prefer driving to the port.",
      shipSpecs: {
        launched: 2001,
        tonnage: 88500,
        passengers: 2124,
        crew: 930,
        decks: 12,
        length: '963 feet',
      },
      highlights: [
        'Baltimore homeport - 3-hour drive from Essex County!',
        'No airfare needed - drive-to cruising',
        'WaterWorks aqua park (post-renovation)',
        '7-day Bermuda cruises (summer)',
        'Fall foliage Canada/New England sailings',
        'Winter Caribbean escapes',
        "RedFrog Rum Bar & Guy's Burger Joint",
        'Intimate 2,124-passenger size',
      ],
      features: [
        {
          category: 'Water Activities',
          items: [
            'WaterWorks aqua park',
            'Twister waterslide',
            'Pools and whirlpools',
            'Serenity adults-only sun deck',
            'Splash Zone kids area',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            'Playlist Productions shows',
            'Punchliner Comedy Club',
            'RedFrog Pub with live Caribbean music',
            'Liquid Nightclub',
            'Piano bar',
            'Casino',
          ],
        },
        {
          category: 'Dining',
          items: [
            "Guy's Burger Joint (complimentary)",
            'BlueIguana Cantina Mexican (complimentary)',
            'Main dining room',
            'Lido Marketplace buffet',
            'Fahrenheit 555 Steakhouse',
            'Cucina del Capitano Italian',
            'Bonsai Sushi',
          ],
        },
        {
          category: 'Baltimore Advantage',
          items: [
            'Drive from Newark - no flights!',
            'Free/cheap parking at port',
            'Easy 3-hour drive via I-95',
            "Explore Baltimore's Inner Harbor before cruise",
            'No airport hassles or baggage fees',
          ],
        },
      ],
      localTips: [
        'Drive from Essex County via I-95 South - 3 hours, easy drive, free parking at port',
        "Bermuda cruises: 7 days with 3 full days docked in King's Wharf - explore entire island",
        'Canada/New England: October sailings for peak fall foliage - Boston, Bar Harbor, Halifax',
        'Winter Caribbean: 7-day Eastern Caribbean (St. Thomas, St. Maarten, Grand Turk)',
      ],
    },
    faq: [
      {
        question: 'Can I drive to Carnival Pride from New Jersey?',
        answer:
          'Yes! Baltimore is 3 hours from Essex County via I-95 South. Parking available at the port ($17/day covered, $13/day uncovered). Many Newark-area travelers prefer driving - no flights, no baggage fees, bring as much luggage as your car fits!',
      },
      {
        question: 'What cruises does Carnival Pride offer from Baltimore?',
        answer:
          'Year-round from Baltimore: Winter (Dec-Apr): 7-day Eastern/Western Caribbean. Summer (May-Sep): 7-day Bermuda with 3 full days docked. Fall (Sep-Nov): 10-day Canada/New England fall foliage cruises.',
      },
      {
        question: 'Why choose Bermuda cruises on Carnival Pride?',
        answer:
          "Pride's Bermuda cruises spend 3 full days docked in King's Wharf, allowing you to explore the entire island - beaches, Hamilton, St. George, caves. More port time than any Caribbean itinerary. Perfect for drive-to cruise from NJ!",
      },
    ],
    internalLinks: [
      '/cruises/carnival',
      '/cruises/from-baltimore',
      '/cruises/bermuda',
      '/cruises/caribbean',
      '/cruises/canada-new-england',
    ],
    lastUpdated: '2025-01-10',
  },

  // ============================================================
  // NORWEGIAN CRUISE LINE SHIPS
  // ============================================================

  {
    slug: 'norwegian-escape',
    name: 'Norwegian Escape',
    cruiseLine: 'Norwegian Cruise Line',
    metaTitle: 'Norwegian Escape 2025 | Caribbean Cruises from Miami Year-Round',
    metaDescription:
      'Book Norwegian Escape cruises - Breakaway Plus-class ship with Aqua Park, Margaritaville at Sea, Freestyle Dining. Miami departures. Essex County experts.',
    keywords: [
      'norwegian escape',
      'norwegian escape cruise',
      'norwegian escape miami',
      'ncl escape',
      'norwegian caribbean cruise',
    ],
    searchVolume: 18100,
    difficulty: 40,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Norwegian Escape - Ultimate Freestyle Cruising',
        subheadline: 'Year-Round Caribbean Adventures from Miami',
      },
      description:
        'Experience Norwegian Escape, a spectacular 164,600-ton Breakaway Plus-class ship offering the freedom of Freestyle Cruising from Miami. This innovative vessel features the largest Aqua Park at sea with five waterslides (including the thrilling Free Fall), Margaritaville at Sea with 5 o\'clock Somewhere bar, 28 dining options, plus Tony Award-winning Broadway show "After Midnight." Essex County travelers appreciate easy Newark-to-Miami flights and Norwegian\'s Freestyle Cruising - no set dining times, casual dress code, and endless choices. With 164,600 tons of space, The Haven luxury suite complex, and activities for every age, Norwegian Escape delivers ultimate vacation freedom on 7-day Eastern & Western Caribbean itineraries.',
      shipSpecs: {
        launched: 2015,
        tonnage: 164600,
        passengers: 4266,
        crew: 1733,
        decks: 20,
        length: '1,069 feet',
      },
      highlights: [
        'Largest Aqua Park at sea (5 multi-story slides)',
        "Margaritaville at Sea with 5 o'clock Somewhere bar",
        '28 dining options with Freestyle Dining',
        'The Haven luxury ship-within-a-ship',
        'Tony Award-winning "After Midnight" Broadway show',
        'Ropes course 3 stories above the ocean',
        'Sports Complex with basketball, volleyball, mini golf',
        'Year-round Miami departures (easy from Newark)',
      ],
      features: [
        {
          category: 'Aqua Park',
          items: [
            'Free Fall - fastest waterslide at sea (4 deck drop)',
            'Aqua Loop - first looping slide at sea',
            'Whip - twin racing slides',
            'Side-by-side dueling slides',
            'Kids Aqua Park area',
            'Four pools & eight hot tubs',
          ],
        },
        {
          category: 'Entertainment',
          items: [
            '"After Midnight" Tony Award-winning musical',
            'Million Dollar Quartet musical',
            'For the Record: The Brat Pack live music show',
            'Howl at the Moon dueling piano bar',
            'Margaritaville at Sea',
            'Casino',
            'Ice Bar (25°F)',
          ],
        },
        {
          category: 'Dining (Freestyle - No Set Times)',
          items: [
            '3 main dining rooms (complimentary)',
            "Cagney's Steakhouse",
            'Le Bistro French',
            'Moderno Churrascaria Brazilian',
            'Ocean Blue seafood by Geoffrey Zakarian',
            'Food Republic Asian fusion',
            'La Cucina Italian',
            'Teppanyaki',
            "Jimmy Buffett's Margaritaville at Sea",
          ],
        },
        {
          category: 'The Haven (Luxury Suite Complex)',
          items: [
            'Private sundeck with pool & hot tubs',
            'Exclusive Haven restaurant',
            '24-hour butler & concierge service',
            'Private lounge & bar',
            'Priority embarkation & debarkation',
            'Largest suites at sea (some 3-bedroom)',
          ],
        },
      ],
      localTips: [
        'Newark to Miami direct flights - easy fly-and-cruise, arrive day before for South Beach',
        'Freestyle Dining = eat when you want, dress casual - no formal nights required',
        'Book Haven suites for ultimate luxury - private ship-within-a-ship experience',
        'Aqua Park = pack swimsuits & waterproof phone case - kids love the slides!',
      ],
    },
    faq: [
      {
        question: 'What is Freestyle Cruising on Norwegian Escape?',
        answer:
          "Freestyle Cruising means no set dining times (eat 5:30pm-11pm whenever you want), no formal dress code (resort casual always acceptable), and freedom to choose from 28 restaurants. It's the most flexible cruise experience - perfect if you don't like rigid schedules.",
      },
      {
        question: "What makes Norwegian Escape's Aqua Park special?",
        answer:
          'Norwegian Escape has the largest Aqua Park at sea with 5 multi-story slides including Free Fall (fastest drop slide at sea - 4 decks!), Aqua Loop (first looping slide at sea), and twin racers. All complimentary - no extra charge!',
      },
      {
        question: 'Is The Haven worth it on Norwegian Escape?',
        answer:
          'If budget allows, yes! The Haven is a ship-within-a-ship luxury complex with private sundeck, pool, restaurant, butler service, and concierge. You get the best of both worlds - luxury experience plus access to all Norwegian Escape activities.',
      },
    ],
    internalLinks: [
      '/cruises/norwegian',
      '/cruises/from-miami',
      '/cruises/caribbean',
      '/packages/all-inclusive-caribbean',
      '/contact',
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
