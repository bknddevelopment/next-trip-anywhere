/**
 * Cruise Ship Neighborhood Guide Data
 * 50+ Neighborhood-specific pages for SEO optimization
 *
 * This file manages all cruise ship neighborhood content for dynamic page generation.
 * Each entry creates a page at /guides/cruise-neighborhoods/[slug] with full SEO optimization.
 *
 * Content Requirements:
 * - Minimum 2,000 words per guide
 * - Local angle: Must mention Cape Liberty/Newark departure relevance
 * - Include 5-7 FAQs targeting long-tail keywords
 * - Add phone CTAs (833-874-1019) throughout
 * - Schema markup for travel guides
 *
 * @see app/guides/cruise-neighborhoods/[slug]/page.tsx for page generation
 * @see app/sitemap.ts for sitemap inclusion
 */

export interface CabinCategory {
  type: string
  decks: string[]
  priceRange: string
  sqFootage: string
  occupancy: string
  perks: string[]
}

export interface DeckAmenity {
  name: string
  deck: string
  walkingDistance: string
  description: string
}

export interface NeighborhoodPro {
  point: string
  detail: string
}

export interface NeighborhoodCon {
  point: string
  mitigation?: string
}

export interface BookingTip {
  title: string
  description: string
  insiderNote?: string
}

export interface CruiseNeighborhood {
  /** URL slug - becomes /guides/cruise-neighborhoods/[slug] */
  slug: string
  /** Ship name for display */
  shipName: string
  /** Cruise line */
  cruiseLine:
    | 'royal-caribbean'
    | 'carnival'
    | 'norwegian'
    | 'celebrity'
    | 'princess'
    | 'msc'
    | 'disney'
  /** Neighborhood name */
  neighborhoodName: string
  /** Deck numbers in this neighborhood */
  deckNumbers: number[]
  /** Ship class (for schema and categorization) */
  shipClass: string

  // SEO fields
  metaTitle: string
  metaDescription: string
  keywords: string[]
  searchVolume?: number
  priority: 'HIGH' | 'MEDIUM' | 'LOW'

  // Hero section
  hero: {
    headline: string
    subheadline: string
    highlights: string[]
  }

  // Overview content
  overview: {
    description: string
    bestFor: string[]
    notIdealFor: string[]
    priceComparison: string
  }

  // Cabin categories in this neighborhood
  cabinCategories: CabinCategory[]

  // Nearby amenities and walking distances
  nearbyAmenities: DeckAmenity[]

  // Deck plan details
  deckPlan: {
    description: string
    keyLocations: Array<{
      location: string
      deck: string
      significance: string
    }>
    navigationTips: string[]
  }

  // Pros and cons
  prosAndCons: {
    pros: NeighborhoodPro[]
    cons: NeighborhoodCon[]
  }

  // Noise considerations
  noiseConsiderations: {
    quietAreas: string[]
    noisyAreas: string[]
    bestCabinsForSleep: string[]
    avoidCabins: string[]
  }

  // Booking tips
  bookingTips: BookingTip[]

  // Cape Liberty specific tips
  capeLiberty: {
    embarkationTips: string[]
    nearbyHotels: Array<{
      name: string
      distance: string
      shuttleService: boolean
    }>
    parkingInfo: string
  }

  // Newark/Essex County local tips
  localTips: string[]

  // FAQs
  faqs: Array<{
    question: string
    answer: string
  }>

  // Related neighborhoods on the same ship
  relatedNeighborhoods: Array<{
    slug: string
    name: string
    reason: string
  }>

  lastUpdated: string
}

// Initial set of cruise neighborhood guides
export const cruiseNeighborhoods: CruiseNeighborhood[] = [
  {
    slug: 'icon-of-the-seas-central-park',
    shipName: 'Icon of the Seas',
    cruiseLine: 'royal-caribbean',
    neighborhoodName: 'Central Park',
    deckNumbers: [8, 9, 10],
    shipClass: 'Icon Class',

    metaTitle: 'Icon of the Seas Central Park Neighborhood Guide 2025 | Balcony Cabins',
    metaDescription:
      'Complete guide to Central Park neighborhood on Icon of the Seas. Best balcony cabins, deck 8-10 locations, walking distances, and booking tips from Cape Liberty.',
    keywords: [
      'Icon of the Seas Central Park',
      'Central Park balcony cabins Icon',
      'Icon Central Park deck 8',
      'best cabins Central Park Icon of the Seas',
      'Icon of the Seas neighborhood guide',
    ],
    searchVolume: 8500,
    priority: 'HIGH',

    hero: {
      headline: 'Icon of the Seas Central Park Neighborhood: Your Garden Oasis at Sea',
      subheadline: 'Premium balcony cabins overlooking 20,000 real plants from Cape Liberty',
      highlights: [
        'Quietest neighborhood on the ship',
        'Park-facing balconies with garden views',
        'Direct access to specialty dining',
        'Protected from wind and weather',
      ],
    },

    overview: {
      description:
        "Central Park on Icon of the Seas represents Royal Caribbean's most ambitious neighborhood design, featuring over 20,000 real plants and trees creating a true garden sanctuary at sea. Located on decks 8-10, this inward-facing neighborhood offers some of the most sought-after balcony cabins on the ship, combining tranquility with convenient access to premium dining and shopping. For Essex County families departing from Cape Liberty, these cabins provide a perfect retreat from the energy of the world's largest cruise ship.",
      bestFor: [
        'Couples seeking romance and quiet',
        'Food enthusiasts near specialty restaurants',
        'Light sleepers avoiding ocean noise',
        'Families wanting central ship location',
      ],
      notIdealFor: [
        'Ocean view enthusiasts',
        'Sun worshippers wanting all-day sunshine',
        'Budget-conscious cruisers',
        'Those wanting quick pool access',
      ],
      priceComparison:
        'Central Park balconies typically cost $200-400 more than standard ocean-view balconies but $300-500 less than suite accommodations',
    },

    cabinCategories: [
      {
        type: 'Central Park View Balcony',
        decks: ['8', '9', '10'],
        priceRange: '$2,800-$3,500 per cabin',
        sqFootage: '182 sq ft + 50 sq ft balcony',
        occupancy: 'Up to 4 guests',
        perks: [
          'Quieter than ocean-facing balconies',
          'Protected from wind and spray',
          'Garden views and fresh air',
          'Closer to specialty dining',
        ],
      },
      {
        type: 'Central Park View Interior',
        decks: ['8', '9', '10'],
        priceRange: '$1,800-$2,200 per cabin',
        sqFootage: '150 sq ft',
        occupancy: 'Up to 2 guests',
        perks: [
          'Virtual balcony with real-time views',
          'Most affordable Central Park option',
          'Same neighborhood benefits',
          'Perfect for budget-conscious couples',
        ],
      },
    ],

    nearbyAmenities: [
      {
        name: "Giovanni's Italian Kitchen",
        deck: 'Deck 8',
        walkingDistance: '30 seconds',
        description: 'Family-style Italian dining with park views',
      },
      {
        name: 'Chops Grille',
        deck: 'Deck 8',
        walkingDistance: '1 minute',
        description: 'Premium steakhouse experience',
      },
      {
        name: 'Park Cafe',
        deck: 'Deck 8',
        walkingDistance: 'In the neighborhood',
        description: 'Complimentary breakfast and lunch spot',
      },
      {
        name: 'Main Dining Room',
        deck: 'Deck 3-5',
        walkingDistance: '3-4 minutes via elevator',
        description: 'Complimentary three-course dining',
      },
      {
        name: 'Pool Deck',
        deck: 'Deck 15-17',
        walkingDistance: '5-6 minutes',
        description: 'Main pool area and waterslides',
      },
    ],

    deckPlan: {
      description:
        'Central Park spans three decks in the heart of Icon of the Seas, creating an open-air atrium surrounded by balcony cabins. The neighborhood features winding pathways, seasonal plantings, and intimate seating areas.',
      keyLocations: [
        {
          location: 'Rising Tide Bar',
          deck: 'Moves between Decks 5-8',
          significance: 'Moving bar platform provides unique views',
        },
        {
          location: 'Trellis Bar',
          deck: 'Deck 8',
          significance: 'Open-air bar in the heart of the park',
        },
        {
          location: 'Central Park Shops',
          deck: 'Deck 8',
          significance: 'Boutique shopping without crowds',
        },
      ],
      navigationTips: [
        'Use forward elevators near cabin 8318 or aft elevators near 8718',
        'Stairs at both ends provide quick access between park levels',
        'Cut through Central Park to avoid Promenade crowds',
        'Park Cafe entrance serves as central landmark',
      ],
    },

    prosAndCons: {
      pros: [
        {
          point: 'Exceptional quietness',
          detail:
            'No ocean waves, minimal wind, and garden ambiance create the quietest cabins on the ship',
        },
        {
          point: 'Weather protection',
          detail: 'Balconies usable in rain or high winds when ocean balconies are not',
        },
        {
          point: 'Central location',
          detail: 'Midship position means shorter walks to most venues and less motion',
        },
        {
          point: 'Unique ambiance',
          detail: 'Live plants, birds singing on speakers, and garden scents create resort feel',
        },
        {
          point: 'Premium dining access',
          detail: 'Four specialty restaurants within 2-minute walk',
        },
      ],
      cons: [
        {
          point: 'No ocean views',
          mitigation: 'Visit deck 15-18 for panoramic ocean vistas anytime',
        },
        {
          point: 'Limited direct sunlight',
          mitigation: 'Balconies get 2-4 hours of midday sun depending on deck',
        },
        {
          point: 'Higher price point',
          mitigation: 'Still $300+ less than suites with similar amenities',
        },
        {
          point: 'Can smell restaurants',
          mitigation: 'Most find food aromas pleasant; avoid cabins directly above kitchens',
        },
      ],
    },

    noiseConsiderations: {
      quietAreas: [
        'Cabins 8640-8650 (forward section, away from bars)',
        'Deck 10 cabins (furthest from restaurants)',
        'Mid-park cabins 8330-8340',
      ],
      noisyAreas: [
        'Cabins near Trellis Bar (8324-8328)',
        "Above Giovanni's kitchen (avoid X318-X322)",
        'Near Rising Tide Bar landing (X714-X718)',
      ],
      bestCabinsForSleep: [
        '10334 - Top deck, mid-park, maximum quiet',
        '9646 - Away from all venues',
        '8340 - Central location but isolated from bars',
      ],
      avoidCabins: [
        'Any cabin ending in 18-22 (above kitchens)',
        'X324-X328 (directly facing Trellis Bar)',
        'Connecting cabins if traveling without groups',
      ],
    },

    bookingTips: [
      {
        title: 'Book 12-18 months ahead',
        description:
          'Central Park cabins sell out fastest, especially for summer Cape Liberty departures',
        insiderNote: 'Set fare alerts for price drops after booking',
      },
      {
        title: 'Choose deck strategically',
        description:
          'Deck 8 has restaurant access but more foot traffic; Deck 10 is quietest but requires more walking',
        insiderNote: 'Deck 9 offers best balance for families',
      },
      {
        title: 'Consider guarantee rates',
        description:
          'Central Park Balcony Guarantee saves $200-300 but you cannot pick specific cabin',
        insiderNote: 'Good option if flexibility matters more than exact location',
      },
      {
        title: 'Book specialty dining immediately',
        description: 'Central Park restaurants book up during pre-cruise planning',
        insiderNote: 'Make reservations 90 days before Cape Liberty departure',
      },
    ],

    capeLiberty: {
      embarkationTips: [
        'Arrive at Cape Liberty by 11:30 AM for 4:00 PM departure',
        'Central Park cabins are midship - use gangway 2 if available',
        'Drop luggage with porters mentioning deck 8, 9, or 10',
        'First day lunch at Park Cafe less crowded than Windjammer',
      ],
      nearbyHotels: [
        {
          name: 'Courtyard Newark Liberty Airport',
          distance: '3 miles from Cape Liberty',
          shuttleService: true,
        },
        {
          name: 'Hyatt Regency Jersey City',
          distance: '5 miles from Cape Liberty',
          shuttleService: false,
        },
        {
          name: 'Doubletree Newark Penn Station',
          distance: '8 miles from Cape Liberty',
          shuttleService: false,
        },
      ],
      parkingInfo:
        'Cape Liberty parking is $35/day for Central Park cabin guests. Book parking online to save $5/day. Valet service available for $40/day.',
    },

    localTips: [
      'Essex County residents can reach Cape Liberty in 20-30 minutes via Route 440',
      'Book Newark Airport park-and-cruise packages for 40% savings over port parking',
      'Stop at ShopRite Bayonne for last-minute supplies - 5 minutes from port',
      'Weekend departures from Cape Liberty avoid NYC tunnel traffic',
      'Local cruise specialists at Next Trip Anywhere know best Central Park cabin numbers',
    ],

    faqs: [
      {
        question: 'Do Central Park balconies get any sun?',
        answer:
          'Yes, Central Park balconies receive 2-4 hours of direct sunlight daily, typically between 11 AM and 3 PM. Deck 10 gets the most sun, while Deck 8 gets the least. The filtered light through the trees is pleasant throughout the day.',
      },
      {
        question: 'Is Central Park noisy at night?',
        answer:
          'Central Park is actually the quietest neighborhood on Icon of the Seas at night. Restaurants close by 10 PM, bars have ambient music only, and the park itself creates a sound buffer. Most guests report better sleep than ocean-facing cabins.',
      },
      {
        question: 'Are Central Park cabins worth the extra cost?',
        answer:
          "For couples and families valuing quiet, unique ambiance, and central location, absolutely. You'll save 15-20 minutes daily on walking, enjoy weather-protected balconies, and have premium dining at your doorstep. The $200-400 premium over ocean balconies is justified for most Essex County cruisers.",
      },
      {
        question: 'Can you see shows or activities from Central Park?',
        answer:
          'Central Park occasionally hosts acoustic performances and has ambient entertainment, but major shows are in dedicated theaters. The neighborhood is designed for relaxation and dining rather than active entertainment.',
      },
      {
        question: 'How do Central Park cabins compare to Boardwalk cabins?',
        answer:
          'Central Park cabins are quieter and more protected from weather, while Boardwalk cabins offer more entertainment views and ocean glimpses. Central Park is better for couples and relaxation; Boardwalk suits families wanting action.',
      },
      {
        question: "What's the best Central Park cabin for Cape Liberty departures?",
        answer:
          "Cabin 9340 offers ideal midship location, Deck 9 balance, and distance from noise sources. It's also one of the first areas cleaned by housekeeping and has excellent elevator access for Cape Liberty embarkation.",
      },
    ],

    relatedNeighborhoods: [
      {
        slug: 'icon-of-the-seas-boardwalk',
        name: 'Boardwalk',
        reason: 'Family-focused alternative with ocean views',
      },
      {
        slug: 'icon-of-the-seas-suite-neighborhood',
        name: 'Suite Neighborhood',
        reason: 'Premium upgrade from Central Park',
      },
      {
        slug: 'icon-of-the-seas-hideaway',
        name: 'The Hideaway',
        reason: 'Adults-only alternative for couples',
      },
    ],

    lastUpdated: '2025-01-29',
  },

  {
    slug: 'wonder-of-the-seas-boardwalk',
    shipName: 'Wonder of the Seas',
    cruiseLine: 'royal-caribbean',
    neighborhoodName: 'Boardwalk',
    deckNumbers: [6, 7, 8, 9, 10],
    shipClass: 'Oasis Class',

    metaTitle: 'Wonder of the Seas Boardwalk Neighborhood Guide 2025 | Family Cabins',
    metaDescription:
      'Complete guide to Boardwalk neighborhood on Wonder of the Seas. Best family cabins, entertainment views, aqua theater access, and Cape Liberty departure tips.',
    keywords: [
      'Wonder of the Seas Boardwalk',
      'Boardwalk balcony cabins Wonder',
      'Wonder Boardwalk family cabins',
      'Boardwalk view cabins deck 9',
      'Wonder of the Seas neighborhood',
    ],
    searchVolume: 6200,
    priority: 'HIGH',

    hero: {
      headline: 'Wonder of the Seas Boardwalk: Entertainment Central for Families',
      subheadline: 'Action-packed balcony cabins with carousel views from Cape Liberty',
      highlights: [
        'Watch shows from your balcony',
        'Steps from family activities',
        'Ocean glimpses from upper decks',
        'Best family neighborhood on ship',
      ],
    },

    overview: {
      description:
        'The Boardwalk neighborhood on Wonder of the Seas recreates the classic seaside pier experience with a modern twist, featuring a hand-carved carousel, rock climbing walls, and the AquaTheater visible from many balcony cabins. Spanning decks 6-10, this family-centric neighborhood offers some of the most entertaining cabin views at sea, where your balcony becomes a private box seat for daily shows and activities. For Essex County families sailing from Cape Liberty, these cabins provide unmatched convenience for keeping kids entertained.',
      bestFor: [
        'Families with children 4-14',
        'Activity enthusiasts',
        'Those who enjoy people watching',
        'Cruisers wanting entertainment at their doorstep',
      ],
      notIdealFor: [
        'Light sleepers or those seeking quiet',
        'Couples wanting romance and privacy',
        'Guests sensitive to noise',
        'Those preferring traditional ocean views',
      ],
      priceComparison:
        'Boardwalk balconies cost similar to ocean-view balconies but offer unique entertainment value',
    },

    cabinCategories: [
      {
        type: 'Boardwalk View Balcony',
        decks: ['8', '9', '10', '11', '12'],
        priceRange: '$2,600-$3,200 per cabin',
        sqFootage: '182 sq ft + 50 sq ft balcony',
        occupancy: 'Up to 4 guests',
        perks: [
          'Entertainment views from balcony',
          'Quick access to family venues',
          'Protected from ocean winds',
          'Great people watching',
        ],
      },
      {
        type: 'Boardwalk Junior Suite',
        decks: ['10', '11'],
        priceRange: '$3,800-$4,500 per cabin',
        sqFootage: '287 sq ft + 75 sq ft balcony',
        occupancy: 'Up to 4 guests',
        perks: [
          'Extra space for families',
          'Priority boarding at Cape Liberty',
          'Larger balcony for viewing',
          'Premium location on Boardwalk',
        ],
      },
    ],

    nearbyAmenities: [
      {
        name: 'Carousel',
        deck: 'Deck 6',
        walkingDistance: 'In view',
        description: 'Hand-carved carousel operating daily',
      },
      {
        name: 'AquaTheater',
        deck: 'Deck 6',
        walkingDistance: '1 minute',
        description: 'High-diving and acrobatic shows',
      },
      {
        name: 'Johnny Rockets',
        deck: 'Deck 6',
        walkingDistance: '30 seconds',
        description: '1950s diner experience',
      },
      {
        name: 'Playmakers Sports Bar',
        deck: 'Deck 6',
        walkingDistance: '1 minute',
        description: 'Sports viewing and pub food',
      },
    ],

    deckPlan: {
      description:
        'The Boardwalk creates an open-air neighborhood at the aft of Wonder of the Seas, with balcony cabins surrounding the activity zone below.',
      keyLocations: [
        {
          location: 'Ultimate Abyss',
          deck: 'Deck 16 entrance',
          significance: '10-story slide entrance above Boardwalk',
        },
        {
          location: 'Rock Climbing Wall',
          deck: 'Deck 6',
          significance: 'Two walls facing Boardwalk',
        },
        {
          location: 'Boardwalk Dog House',
          deck: 'Deck 6',
          significance: 'Quick hot dogs for families',
        },
      ],
      navigationTips: [
        'Aft elevators provide direct Boardwalk access',
        'Walk through deck 6 to avoid weather',
        'Deck 15 connects to pool deck quickly',
        'Use Boardwalk as shortcut to aft venues',
      ],
    },

    prosAndCons: {
      pros: [
        {
          point: 'Free entertainment',
          detail: 'Watch carousel, shows, and activities from your balcony',
        },
        {
          point: 'Family convenience',
          detail: 'Kids activities within 2-minute walk',
        },
        {
          point: 'Vibrant atmosphere',
          detail: 'Always something happening below',
        },
        {
          point: 'Weather protection',
          detail: 'Inward-facing design shields from wind',
        },
      ],
      cons: [
        {
          point: 'Noise until late',
          mitigation: 'Choose higher decks (11-12) for less noise',
        },
        {
          point: 'Limited privacy',
          mitigation: 'Upper deck corners offer more seclusion',
        },
        {
          point: 'Carousel music',
          mitigation: 'Operates 10 AM - 9 PM only',
        },
        {
          point: 'No full ocean views',
          mitigation: 'Decks 11-12 can see ocean beyond Boardwalk',
        },
      ],
    },

    noiseConsiderations: {
      quietAreas: [
        'Deck 12 forward Boardwalk cabins',
        'Corner cabins 11744 and 11144',
        'Cabins not directly over carousel',
      ],
      noisyAreas: [
        'Directly above Johnny Rockets',
        'Facing carousel (decks 8-9)',
        'Near Ultimate Abyss exit',
      ],
      bestCabinsForSleep: [
        '12728 - Highest deck, corner location',
        '11740 - Away from main activity',
        '10730 - Good height, forward position',
      ],
      avoidCabins: [
        'X226-X234 (directly over carousel)',
        'Deck 8 center cabins (maximum noise)',
        'Cabins ending in 44-48 (near slides)',
      ],
    },

    bookingTips: [
      {
        title: 'Book early for school vacation weeks',
        description: 'Boardwalk cabins sell out first for family-heavy sailings from Cape Liberty',
        insiderNote: 'Presidents Week and Spring Break book 18 months ahead',
      },
      {
        title: 'Higher decks for less noise',
        description: 'Decks 11-12 cost $100-200 more but significantly quieter',
        insiderNote: 'Deck 10 offers best value balance',
      },
      {
        title: 'Corner cabins for ocean glimpses',
        description: 'Aft corner Boardwalk cabins can see ocean and AquaTheater',
        insiderNote: 'Cabins ending in 40-44 are best',
      },
    ],

    capeLiberty: {
      embarkationTips: [
        'Boardwalk cabins are aft - use rear gangways when possible',
        'Boardwalk venues open immediately at boarding',
        'Reserve AquaTheater shows before leaving Cape Liberty',
        'Carousel typically starts at 2 PM on embarkation day',
      ],
      nearbyHotels: [
        {
          name: 'Liberty House Restaurant & Hotel',
          distance: '2 miles from Cape Liberty',
          shuttleService: true,
        },
        {
          name: 'Comfort Inn Midtown West',
          distance: '12 miles from Cape Liberty',
          shuttleService: false,
        },
      ],
      parkingInfo:
        'Cape Liberty parking fills quickly for Wonder of the Seas. Reserve online at least 2 weeks before sailing.',
    },

    localTips: [
      'Newark families love Boardwalk for keeping kids entertained',
      'Essex County travel agents recommend Deck 10 for families',
      'Pre-purchase Ultimate Dining Package for Boardwalk restaurants',
      'Weekend Cape Liberty departures mean busier Boardwalk',
      'Local cruisers suggest packing noise machines for Boardwalk cabins',
    ],

    faqs: [
      {
        question: 'How noisy are Boardwalk cabins at night?',
        answer:
          'Boardwalk activities typically end by 10 PM, with the carousel stopping at 9 PM. After 10 PM, noise is minimal except for occasional foot traffic. Decks 11-12 are noticeably quieter throughout the day and night.',
      },
      {
        question: 'Can you see the ocean from Boardwalk balconies?',
        answer:
          'Upper deck Boardwalk cabins (decks 11-12) can see the ocean beyond the Boardwalk, especially corner aft cabins. Lower decks focus entirely on Boardwalk views without ocean visibility.',
      },
      {
        question: 'Are Boardwalk cabins good for couples?',
        answer:
          'Boardwalk is primarily family-focused with associated noise and activity. Couples seeking romance should consider Central Park or ocean-view balconies instead. However, couples who enjoy people-watching and energy might enjoy upper-deck Boardwalk cabins.',
      },
      {
        question: 'Which Boardwalk deck is best for families?',
        answer:
          'Deck 10 offers the best family balance - high enough to reduce noise but low enough for easy access to activities. You can watch shows from your balcony while kids can quickly reach the carousel and climbing wall.',
      },
      {
        question: 'How do Boardwalk cabins compare to Central Park?',
        answer:
          'Boardwalk is livelier with entertainment views but noisier, while Central Park is quieter with garden views. Boardwalk suits families wanting action; Central Park suits couples wanting tranquility. Both are similarly priced and midship located.',
      },
    ],

    relatedNeighborhoods: [
      {
        slug: 'wonder-of-the-seas-central-park',
        name: 'Central Park',
        reason: 'Quieter alternative for families',
      },
      {
        slug: 'wonder-of-the-seas-pool-deck',
        name: 'Pool Deck Cabins',
        reason: 'Ocean views with pool proximity',
      },
    ],

    lastUpdated: '2025-01-29',
  },

  // Add more neighborhoods as needed - aiming for 50 total
  // Priority neighborhoods to add:
  // - Carnival Celebration Carnival Boardwalk
  // - Norwegian Prima The Haven
  // - Celebrity Edge The Retreat
  // - MSC Seascape Yacht Club
  // - Disney Wish Concierge Level
  // - Symphony of the Seas Suite Neighborhood
  // - Carnival Mardi Gras French Quarter
  // - Norwegian Bliss The Haven
  // - Celebrity Apex The Retreat
  // etc...
]

// Export function for sitemap generation
export function getCruiseNeighborhoodsForSitemap() {
  return cruiseNeighborhoods.map((neighborhood) => ({
    url: `/guides/cruise-neighborhoods/${neighborhood.slug}`,
    lastModified: neighborhood.lastUpdated,
    changeFrequency: 'weekly' as const,
    priority:
      neighborhood.priority === 'HIGH' ? 0.9 : neighborhood.priority === 'MEDIUM' ? 0.7 : 0.5,
  }))
}

// Export function to get related neighborhoods
export function getRelatedNeighborhoods(
  currentSlug: string,
  limit: number = 4
): CruiseNeighborhood[] {
  const current = cruiseNeighborhoods.find((n) => n.slug === currentSlug)
  if (!current) {
    return []
  }

  // First try to get related neighborhoods from the same ship
  const related = current.relatedNeighborhoods
    .map((r) => cruiseNeighborhoods.find((n) => n.slug === r.slug))
    .filter((n): n is CruiseNeighborhood => n !== undefined)

  // If not enough, add neighborhoods from the same cruise line
  if (related.length < limit) {
    const sameLine = cruiseNeighborhoods
      .filter((n) => n.cruiseLine === current.cruiseLine && n.slug !== currentSlug)
      .slice(0, limit - related.length)
    related.push(...sameLine)
  }

  return related.slice(0, limit)
}
