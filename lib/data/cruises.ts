/**
 * Cruise Destination Data for SEO-Optimized Pages
 *
 * This file manages all cruise-related content for dynamic page generation.
 * Each entry creates a page at /cruises/[slug] with full SEO optimization.
 *
 * Adding New Cruise Pages:
 * 1. Add a new object to cruiseDestinations array
 * 2. Include all required fields (slug, title, meta, content)
 * 3. Set priority based on search volume: HIGH >50K, MEDIUM 20-50K, LOW <20K
 * 4. Include 3-5 FAQs targeting long-tail keywords
 * 5. Add 3-5 internal links for SEO value
 *
 * Content Requirements:
 * - Minimum 1,500 words (achieved through description, highlights, tips, FAQs)
 * - Local angle: Must mention Essex County/Newark relevance
 * - Include starting prices to appear in rich snippets
 * - Port info required for location-based pages (from-newark, cape-liberty, etc.)
 *
 * @see app/cruises/[destination]/page.tsx for page generation
 * @see app/sitemap.ts for sitemap inclusion
 * @see lib/utils/cruiseSchema.ts for schema markup generation
 */

export interface CruiseDestination {
  /** URL slug - becomes /cruises/[slug] */
  slug: string
  /** Page H1 and breadcrumb title */
  title: string
  /** SEO meta title - max 60 characters */
  metaTitle: string
  /** SEO meta description - max 160 characters */
  metaDescription: string
  /** Target keywords for this page */
  keywords: string[]
  /** Monthly search volume for primary keyword */
  searchVolume: number
  /** SEO difficulty score (0-100) */
  difficulty: number
  /** Priority for sitemap and update frequency */
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  /** Main content sections */
  content: {
    hero: {
      headline: string
      subheadline: string
    }
    /** Main description - minimum 300 words */
    description: string
    /** 5-8 bullet points highlighting key features */
    highlights: string[]
    /** Required for port/departure pages */
    portInfo?: {
      name: string
      address: string
      distance: string
      parkingInfo: string
      directions: string
    }
    /** Cruise lines serving this route/port */
    popularCruiseLines?: string[]
    /** Seasonal information */
    bestTimeToVisit?: string
    /** Typical cruise length */
    averageDuration?: string
    /** Starting price for rich snippets */
    startingPrice?: number
    /** Local tips for Essex County residents */
    localTips?: string[]
  }
  /** FAQ section - targets long-tail keywords */
  faq?: Array<{
    question: string
    answer: string
  }>
  /** Internal links for SEO - include 3-5 related pages */
  internalLinks?: string[]
  /** Last update date for freshness */
  lastUpdated: string
}

export const cruiseDestinations: CruiseDestination[] = [
  {
    slug: 'from-newark',
    title: 'Cruises from Newark',
    metaTitle: 'Newark Cruises 2025 | Departures from Cape Liberty Port',
    metaDescription:
      'Find the best cruise deals departing from Newark. Cape Liberty cruise port offers convenient access for Essex County residents. Book your dream cruise today!',
    keywords: [
      'cruises from newark',
      'cape liberty cruises',
      'nj cruises',
      'newark cruise port',
      'cruises from new jersey',
      'cape liberty departures',
      'newark cruise deals',
    ],
    searchVolume: 9900,
    difficulty: 15,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Cruises from Newark & Cape Liberty Port',
        subheadline: 'Your Gateway to Dream Vacations from Essex County',
      },
      description:
        "Discover amazing cruise opportunities departing from Newark's convenient Cape Liberty port. Located just minutes from Essex County, Cape Liberty Cruise Port offers easy access to Caribbean, Bermuda, and transatlantic cruises without the hassle of traveling to distant ports.",
      highlights: [
        'Only 15 minutes from downtown Newark',
        'Free parking available for NJ residents',
        'Direct access from Newark Airport',
        'Major cruise lines including Royal Caribbean, Celebrity, and NCL',
        'Year-round departures to popular destinations',
      ],
      portInfo: {
        name: 'Cape Liberty Cruise Port',
        address: '14 Port Terminal Blvd, Bayonne, NJ 07002',
        distance: '15 minutes from Newark, 30 minutes from most Essex County towns',
        parkingInfo:
          'Secure parking available at $23/day for standard vehicles. Oversized vehicles $35/day. Reserve in advance for guaranteed spots.',
        directions:
          'From Newark: Take I-78 E to NJ-440 S. Follow signs to Cape Liberty Cruise Port. From Essex County: Take Route 280 E to NJ Turnpike, exit 14A to Bayonne.',
      },
      popularCruiseLines: [
        'Royal Caribbean International',
        'Celebrity Cruises',
        'Norwegian Cruise Line',
        'Princess Cruises (seasonal)',
        'MSC Cruises (select dates)',
      ],
      bestTimeToVisit: 'Year-round departures with peak season April-October',
      averageDuration: '7-14 nights',
      startingPrice: 599,
      localTips: [
        'Book parking in advance during peak season',
        'Arrive 2-3 hours before departure',
        'Consider staying at a Newark hotel the night before',
        'Use our shuttle service from Essex County locations',
        'Check passport expiration dates 6 months in advance',
      ],
    },
    faq: [
      {
        question: 'How far is Cape Liberty from Newark Airport?',
        answer:
          'Cape Liberty Cruise Port is approximately 20 minutes from Newark Liberty International Airport (EWR), making it convenient for fly-cruise packages or international travelers.',
      },
      {
        question: 'What cruise lines sail from Newark/Cape Liberty?',
        answer:
          'Major cruise lines departing from Cape Liberty include Royal Caribbean, Celebrity Cruises, and Norwegian Cruise Line, offering routes to the Caribbean, Bermuda, Canada, and transatlantic voyages.',
      },
      {
        question: 'Is parking available at Cape Liberty Cruise Port?',
        answer:
          'Yes, secure parking is available at $23/day for standard vehicles and $35/day for oversized vehicles. We recommend booking parking in advance, especially during peak cruise season.',
      },
      {
        question: 'How early should I arrive at Cape Liberty for my cruise?',
        answer:
          'We recommend arriving 2-3 hours before your scheduled departure time to allow for check-in, security, and boarding procedures.',
      },
      {
        question: 'Can I get transportation from Essex County to Cape Liberty?',
        answer:
          'Yes! Next Trip Anywhere offers convenient shuttle and private car services from all Essex County locations directly to Cape Liberty Cruise Port.',
      },
    ],
    internalLinks: [
      '/cruises/caribbean',
      '/cruises/bahamas',
      '/cruises/cape-liberty-port',
      '/services/cruise-transfers',
      '/locations/essex-county',
    ],
    lastUpdated: '2025-01-23',
  },
  {
    slug: 'caribbean',
    title: 'Caribbean Cruises from New Jersey',
    metaTitle: 'Caribbean Cruises from NJ 2025 | Essex County Departures',
    metaDescription:
      'Book Caribbean cruises departing from New Jersey. Sail from Cape Liberty to tropical paradises. Expert planning for Essex County residents. Best deals guaranteed!',
    keywords: [
      'caribbean cruises from nj',
      'caribbean cruises from new jersey',
      'cape liberty caribbean',
      'newark caribbean cruises',
      'eastern caribbean from nj',
      'western caribbean from newark',
      'southern caribbean cruises nj',
    ],
    searchVolume: 18150,
    difficulty: 22,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Caribbean Cruises from New Jersey',
        subheadline: 'Escape to Paradise from Cape Liberty Port',
      },
      description:
        "Experience the ultimate Caribbean getaway with cruises departing from New Jersey's Cape Liberty port. From the pristine beaches of the Eastern Caribbean to the ancient ruins of the Western Caribbean, your tropical adventure starts just minutes from Essex County.",
      highlights: [
        'Direct routes to Eastern, Western, and Southern Caribbean',
        '7-14 night itineraries available year-round',
        'Visit multiple islands in one trip',
        'All-inclusive dining and entertainment onboard',
        'Family-friendly and adults-only options',
        'No flying required for Essex County residents',
      ],
      popularCruiseLines: [
        'Royal Caribbean - Anthem of the Seas',
        'Celebrity Cruises - Summit',
        'Norwegian Cruise Line - Gem',
        'Princess Cruises - Enchanted Princess',
      ],
      bestTimeToVisit: 'October-April for ideal weather, avoiding hurricane season',
      averageDuration: '7-10 nights',
      startingPrice: 699,
      localTips: [
        'Book balcony cabins for Caribbean sunsets',
        'Pack reef-safe sunscreen for eco-friendly islands',
        'Consider travel insurance during hurricane season',
        'Book shore excursions early for popular ports',
        'Bring formal wear for elegant nights',
      ],
    },
    faq: [
      {
        question: 'What Caribbean islands can I visit from Cape Liberty?',
        answer:
          'Popular destinations include Bermuda, Bahamas, Cozumel, Jamaica, Grand Cayman, Aruba, Barbados, St. Thomas, St. Maarten, and Puerto Rico, depending on your chosen itinerary.',
      },
      {
        question: 'When is the best time for Caribbean cruises from New Jersey?',
        answer:
          'The best time is October through April when the weather is ideal and hurricane risk is lower. However, summer cruises offer great value and family-friendly schedules.',
      },
      {
        question: 'How long are Caribbean cruises from Cape Liberty?',
        answer:
          'Most Caribbean cruises from Cape Liberty range from 7 to 14 nights, with some extended voyages up to 21 nights for Southern Caribbean itineraries.',
      },
      {
        question: 'Do I need a passport for Caribbean cruises from NJ?',
        answer:
          'While closed-loop cruises (returning to the same port) technically only require a birth certificate and ID, we strongly recommend a passport for all international travel.',
      },
    ],
    internalLinks: [
      '/cruises/from-newark',
      '/cruises/bahamas',
      '/destinations/caribbean-from-nj',
      '/packages/all-inclusive-caribbean',
    ],
    lastUpdated: '2025-01-23',
  },
  {
    slug: 'bahamas',
    title: 'Bahamas Cruises from Newark',
    metaTitle: 'Bahamas Cruise from Newark 2025 | Cape Liberty Departures',
    metaDescription:
      "Sail to the Bahamas from Newark's Cape Liberty port. Nassau, Freeport & private islands await. Essex County's gateway to paradise. Book your Bahamas cruise today!",
    keywords: [
      'bahamas cruise from newark',
      'bahamas cruise from nj',
      'cape liberty bahamas',
      'nassau cruise from newark',
      'freeport cruise new jersey',
      'perfect day cococay from nj',
      'bahamas vacation from newark',
    ],
    searchVolume: 22200,
    difficulty: 15,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Bahamas Cruises from Newark & Cape Liberty',
        subheadline: 'Crystal Waters & White Sand Beaches Just a Sail Away',
      },
      description:
        "Discover the beauty of the Bahamas with convenient cruise departures from Newark's Cape Liberty port. From the vibrant culture of Nassau to the pristine beaches of private islands, your Bahamian adventure is closer than you think for Essex County residents.",
      highlights: [
        'Short 3-7 night cruises perfect for quick getaways',
        'Visit Nassau, Freeport, and private islands',
        'Perfect Day at CocoCay exclusive experiences',
        'Family-friendly beaches and activities',
        'World-class snorkeling and diving',
        'Duty-free shopping in Nassau',
      ],
      popularCruiseLines: [
        'Royal Caribbean - Anthem of the Seas',
        'Celebrity Cruises - Summit',
        'Norwegian Cruise Line - Gem',
        'Carnival Cruise Line (select dates)',
      ],
      bestTimeToVisit: 'Year-round destination with best weather November-May',
      averageDuration: '3-7 nights',
      startingPrice: 449,
      localTips: [
        'Book weekend cruises early - they sell out fast',
        'Perfect Day at CocoCay requires advance booking',
        'Bring cash for local vendors and taxis',
        'Pack snorkeling gear to save on rentals',
        'Try conch fritters and rum cake in Nassau',
      ],
    },
    faq: [
      {
        question: 'How long does it take to cruise to the Bahamas from Cape Liberty?',
        answer:
          'It typically takes 1.5-2 days of sailing to reach the Bahamas from Cape Liberty, with most cruises including 1-2 sea days each way.',
      },
      {
        question: 'What Bahamas ports do cruises from Newark visit?',
        answer:
          'Common ports include Nassau (capital), Freeport (Grand Bahama), and private islands like Perfect Day at CocoCay (Royal Caribbean) or Great Stirrup Cay (NCL).',
      },
      {
        question: 'Are Bahamas cruises good for families?',
        answer:
          'Yes! Bahamas cruises are perfect for families with short durations, beautiful beaches, kid-friendly excursions, and onboard activities for all ages.',
      },
      {
        question: "What's the shortest Bahamas cruise from Cape Liberty?",
        answer:
          'The shortest Bahamas cruises are typically 3-4 night weekend getaways, perfect for a quick escape from Essex County.',
      },
    ],
    internalLinks: [
      '/cruises/from-newark',
      '/cruises/caribbean',
      '/destinations/bahamas-from-newark',
      '/packages/family-resorts-from-newark',
    ],
    lastUpdated: '2025-01-23',
  },
  {
    slug: 'cape-liberty-port',
    title: 'Cape Liberty Cruise Port Guide',
    metaTitle: 'Cape Liberty Cruise Port Guide 2025 | Complete Essex County Resource',
    metaDescription:
      'Everything you need to know about Cape Liberty Cruise Port. Parking, directions, hotels, cruise lines, and transportation from Essex County. Your complete port guide.',
    keywords: [
      'cape liberty cruise port',
      'cape liberty parking',
      'cape liberty directions',
      'bayonne cruise terminal',
      'new jersey cruise port',
      'cape liberty hotels',
      'cape liberty transportation',
      'port liberty cruise terminal',
    ],
    searchVolume: 8100,
    difficulty: 10,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Complete Cape Liberty Cruise Port Guide',
        subheadline: "Essex County's Gateway to World Cruising",
      },
      description:
        'Cape Liberty Cruise Port in Bayonne, New Jersey, serves as the primary cruise departure point for the New York/New Jersey metropolitan area. This comprehensive guide covers everything Essex County residents need to know about cruising from Cape Liberty.',
      highlights: [
        'Located in Bayonne, NJ - 15 minutes from Newark',
        'Services 4 major cruise lines',
        'Over 1 million passengers annually',
        'Secure parking and modern facilities',
        'Easy access from all Essex County locations',
        'Year-round departures to worldwide destinations',
      ],
      portInfo: {
        name: 'Cape Liberty Cruise Port',
        address: '14 Port Terminal Blvd, Bayonne, NJ 07002',
        distance: 'Newark: 15 min | Montclair: 25 min | West Orange: 20 min | Livingston: 25 min',
        parkingInfo:
          'Official port parking: $23/day standard, $35/day oversized. Off-site options from $15/day with shuttle service. Reserve online for guaranteed spots and discounts.',
        directions:
          'From I-78: Take Exit 14 to Bayonne, follow Route 440 S to Port Terminal Blvd. From Garden State Parkway: Exit 129 to Route 440 S. GPS coordinates: 40.6628° N, 74.0778° W',
      },
      popularCruiseLines: [
        'Royal Caribbean International - Largest presence with Anthem of the Seas',
        'Celebrity Cruises - Premium cruises on Celebrity Summit',
        'Norwegian Cruise Line - Norwegian Gem homeported seasonally',
        'Princess Cruises - Seasonal sailings',
        'MSC Cruises - Select Mediterranean-style voyages',
      ],
      localTips: [
        'Book parking 30+ days in advance for best rates',
        'Consider staying at Newark Airport hotels with shuttle service',
        'Uber/Lyft from Essex County typically $30-50',
        'Check traffic on Route 440 before departure',
        'Port opens at 10:30 AM for most sailings',
        'Bring documentation in waterproof holder',
        'Download cruise line app before arriving',
      ],
    },
    faq: [
      {
        question: 'How do I get to Cape Liberty from Essex County?',
        answer:
          'Options include driving (15-30 minutes), rideshare ($30-50), our private shuttle service, or Newark Airport hotels with cruise shuttles. We offer door-to-door service from all Essex County locations.',
      },
      {
        question: 'What time should I arrive at Cape Liberty?',
        answer:
          'Arrive between 11:00 AM and 1:00 PM for smooth boarding. The terminal opens at 10:30 AM, and boarding typically begins at 11:30 AM. Final boarding is usually 3:00 PM.',
      },
      {
        question: 'Is Cape Liberty parking safe?',
        answer:
          'Yes, the official port parking is secure, monitored 24/7, and fully fenced. Your vehicle is safe for the duration of your cruise. We recommend the official port parking over off-site options.',
      },
      {
        question: 'Can I see the Statue of Liberty from Cape Liberty?',
        answer:
          'Yes! Cape Liberty offers stunning views of the Statue of Liberty, Manhattan skyline, and Verrazzano Bridge. Ships sail past the Statue of Liberty during departure - have your camera ready!',
      },
      {
        question: 'What hotels are near Cape Liberty?',
        answer:
          'Nearby hotels include Hyatt Regency Jersey City, Courtyard Newark Airport, and several Bayonne hotels. Many offer park-and-cruise packages with shuttle service to the port.',
      },
    ],
    internalLinks: [
      '/cruises/from-newark',
      '/services/cruise-transfers',
      '/locations/essex-county/newark/cruise-transfers',
      '/blog/cape-liberty-parking-guide',
    ],
    lastUpdated: '2025-01-23',
  },
  {
    slug: 'from-bayonne',
    title: 'Cruises from Bayonne NJ',
    metaTitle: 'Cruises from Bayonne 2025 | Cape Liberty Port Essex County',
    metaDescription:
      'Cruise from Bayonne NJ Cape Liberty port. Convenient departures for Essex County residents. Caribbean, Bermuda & transatlantic cruises. Book your vacation today!',
    keywords: [
      'cruises from bayonne',
      'bayonne cruise port',
      'cape liberty bayonne',
      'bayonne nj cruises',
      'cruises from bayonne new jersey',
      'bayonne cruise terminal',
      'cape liberty port bayonne',
    ],
    searchVolume: 6600,
    difficulty: 12,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Cruises from Bayonne, New Jersey',
        subheadline: 'Your Local Port to Paradise at Cape Liberty',
      },
      description:
        "Bayonne's Cape Liberty Cruise Port offers Essex County residents the ultimate convenience for cruise vacations. Located just across Newark Bay, this modern port facility provides easy access to Caribbean, Bermuda, and European cruises without the hassle of flying or traveling to distant ports. With year-round departures from major cruise lines, your dream vacation starts right here in Hudson County.",
      highlights: [
        'Located directly in Bayonne, NJ',
        'Only 20 minutes from most Essex County towns',
        'Free shuttle from light rail station',
        'Covered parking garage available',
        'Modern terminal with amenities',
        'Direct highway access via Route 440',
        'Security checkpoint on-site',
        'Porter services available',
      ],
      portInfo: {
        name: 'Cape Liberty Cruise Port (Bayonne)',
        address: '14 Port Terminal Blvd, Bayonne, NJ 07002',
        distance: 'Newark: 15 min | Montclair: 25 min | Bloomfield: 20 min | Orange: 20 min',
        parkingInfo:
          'On-site covered garage $25/day, outdoor lot $23/day. Premium valet service $35/day. EV charging stations available.',
        directions:
          'From Essex County: Take I-280 E to NJ Turnpike Extension. Exit 14A to Route 440 S. Follow signs to Cape Liberty Cruise Port.',
      },
      popularCruiseLines: [
        'Royal Caribbean - Anthem of the Seas (year-round)',
        'Celebrity Cruises - Celebrity Summit',
        'Norwegian Cruise Line - Norwegian Gem',
        'Princess Cruises (seasonal)',
        'MSC Cruises (limited sailings)',
      ],
      bestTimeToVisit: 'Year-round port with peak season April-November',
      averageDuration: '7-12 nights',
      startingPrice: 549,
      localTips: [
        'Use Hudson-Bergen Light Rail with free port shuttle',
        'Book parking online for $2/day discount',
        'Arrive by noon for smooth check-in',
        'Hotels in Bayonne offer park-and-cruise packages',
        'Local restaurants perfect for pre-cruise dinner',
        'Check traffic on Route 440 before departure',
      ],
    },
    faq: [
      {
        question: 'How do I get to Cape Liberty from Essex County without driving?',
        answer:
          'Take NJ Transit to Newark Penn Station, then PATH to Jersey City, and finally the Hudson-Bergen Light Rail to 34th Street Station in Bayonne. Cape Liberty offers a free shuttle from the light rail station on cruise days.',
      },
      {
        question: 'Is Bayonne parking cheaper than Newark Airport parking?',
        answer:
          "Yes! Cape Liberty parking at $23-25/day is significantly cheaper than Newark Airport long-term parking. Plus, it's more convenient with no shuttle required - you park right at the port.",
      },
      {
        question: 'What cruise destinations are available from Bayonne?',
        answer:
          'From Cape Liberty Bayonne, you can cruise to the Caribbean (Eastern, Western, Southern), Bermuda, Bahamas, New England/Canada, and transatlantic voyages to Europe.',
      },
      {
        question: 'Are there hotels near Cape Liberty in Bayonne?',
        answer:
          'Yes, several hotels in Bayonne and Jersey City offer cruise packages with parking and shuttle service. The Hyatt House Jersey City and Courtyard Bayonne are popular choices, both within 10 minutes of the port.',
      },
      {
        question: 'Can Essex County groups charter buses to Cape Liberty?',
        answer:
          'Absolutely! We arrange group transportation from all Essex County locations to Cape Liberty. Charter buses are perfect for family reunions, corporate groups, or friends traveling together.',
      },
    ],
    internalLinks: [
      '/cruises/from-newark',
      '/cruises/cape-liberty-port',
      '/cruises/caribbean',
      '/services/cruise-transfers',
      '/locations/essex-county/newark/cruise-transfers',
    ],
    lastUpdated: '2025-01-23',
  },
  {
    slug: 'cheap-deals-nj',
    title: 'Cheap Cruise Deals from New Jersey',
    metaTitle: 'Cheap Cruises from NJ 2025 | Best Deals Under $500 Newark',
    metaDescription:
      "Find cheap cruise deals from New Jersey starting at $299. Last-minute discounts from Cape Liberty. Essex County's best cruise prices. Save up to 70% today!",
    keywords: [
      'cheap cruises from nj',
      'cheap cruise deals new jersey',
      'discount cruises from newark',
      'budget cruises cape liberty',
      'cruise deals under 500',
      'last minute cruise deals nj',
      'affordable cruises from new jersey',
    ],
    searchVolume: 14500,
    difficulty: 35,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Unbeatable Cruise Deals from New Jersey',
        subheadline: 'Premium Vacations at Budget Prices from Cape Liberty',
      },
      description:
        "Don't let budget concerns keep you from your dream cruise vacation! Our exclusive deals from Cape Liberty offer Essex County residents incredible values on top cruise lines. From last-minute specials to early booking discounts, repositioning cruises to off-season rates, we find the best prices without compromising quality. Many deals include free upgrades, onboard credits, and prepaid gratuities.",
      highlights: [
        'Cruises starting at just $299 per person',
        'Last-minute deals up to 70% off',
        'Free upgrades to balcony cabins',
        'Onboard credit up to $500',
        'Kids sail free promotions',
        'Reduced deposits as low as $50',
        'Military and senior discounts',
        'Group rates for 8+ passengers',
      ],
      popularCruiseLines: [
        'MSC Cruises - Best value pricing',
        'Norwegian Cruise Line - Free at Sea promotions',
        'Royal Caribbean - Kids Sail Free deals',
        "Princess Cruises - Captain's Circle discounts",
        'Carnival (from NYC) - Fun Ship deals',
      ],
      bestTimeToVisit: 'Best deals: Late August-early December (excluding holidays)',
      averageDuration: '3-7 nights for best value',
      startingPrice: 299,
      localTips: [
        'Book repositioning cruises for huge savings',
        'Travel during wave season (January-March) for perks',
        'Consider guarantee cabins for lowest prices',
        'Join cruise line loyalty programs for exclusive deals',
        'Book directly after holiday seasons for discounts',
        'Follow our newsletter for flash sales',
        'Ask about New Jersey resident rates',
      ],
    },
    faq: [
      {
        question: 'How can cruises be so cheap from New Jersey?',
        answer:
          'Cape Liberty offers competitive pricing due to less demand than Florida ports, repositioning cruises, last-minute inventory, and special New Jersey resident rates. Plus, you save on airfare by departing locally!',
      },
      {
        question: "What's included in cheap cruise deals?",
        answer:
          'Even budget cruises include accommodations, main dining room meals, entertainment, kids clubs, pools, and basic beverages. Some deals add perks like drink packages, WiFi, specialty dining, or gratuities.',
      },
      {
        question: 'When are the cheapest times to cruise from Cape Liberty?',
        answer:
          "The cheapest times are late August through early December (avoiding holidays), January after New Year's, and early May. Hurricane season (September-October) often has the lowest prices.",
      },
      {
        question: 'Are cheap cruises worth it?',
        answer:
          "Absolutely! The ships and itineraries are identical regardless of price. You're getting the same vacation experience, just at a better price by being flexible with dates or booking at the right time.",
      },
      {
        question: 'How far in advance should I book for the best deals?',
        answer:
          'It varies! Wave season (January-March) offers great early booking perks. Last-minute deals appear 30-60 days before sailing. Sign up for our alerts to catch the best prices for your preferred dates.',
      },
    ],
    internalLinks: [
      '/cruises/last-minute-from-newark',
      '/cruises/from-newark',
      '/packages/budget-beach-vacations',
      '/cruises/caribbean',
      '/cruises/bahamas',
    ],
    lastUpdated: '2025-01-23',
  },
  {
    slug: 'last-minute-from-newark',
    title: 'Last Minute Cruises from Newark',
    metaTitle: 'Last Minute Cruises from Newark 2025 | Deals Departing This Week',
    metaDescription:
      "Book last minute cruises from Newark Cape Liberty. Departures within 90 days up to 75% off. Essex County's source for urgent cruise deals. Sail this week!",
    keywords: [
      'last minute cruises from newark',
      'last minute cruise deals nj',
      'cruises departing this week',
      'urgent cruise deals newark',
      'cape liberty last minute',
      'cruises leaving soon from nj',
      'quick getaway cruises newark',
    ],
    searchVolume: 8900,
    difficulty: 20,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Last Minute Cruise Escapes from Newark',
        subheadline: 'Pack Your Bags - Departing Within 90 Days!',
      },
      description:
        'Spontaneous travelers rejoice! Incredible last-minute cruise deals are departing from Cape Liberty within the next 90 days. Whether you have a sudden vacation opportunity, unexpected time off, or simply love spontaneous adventures, these deeply discounted cruises from Newark offer Essex County residents the chance to escape immediately. With savings up to 75% off regular prices, now is the time to book that impromptu getaway.',
      highlights: [
        'Departures within 7-90 days',
        'Savings up to 75% off brochure rates',
        'Upgrade deals on available cabins',
        'Reduced or waived deposits',
        'Quick booking process',
        'Instant confirmation available',
        'Flexible payment options',
        'Same-day booking possible',
      ],
      popularCruiseLines: [
        'Royal Caribbean - Weekly last-minute releases',
        'Norwegian Cruise Line - Upgrade sales',
        'Celebrity Cruises - Cabin clearance deals',
        'MSC Cruises - Flash sales',
        "Princess Cruises - Captain's Circle last-minute",
      ],
      bestTimeToVisit: 'Check daily - new deals released Tuesday/Wednesday',
      averageDuration: '3-7 nights',
      startingPrice: 399,
      localTips: [
        'Be flexible with cabin categories',
        'Consider guarantee staterooms for best prices',
        'Have passport ready for immediate booking',
        'Pack versatile clothing for any itinerary',
        'Book parking immediately after cruise',
        'Join cruise line emails for flash alerts',
        'Call us for unpublished deals',
      ],
    },
    faq: [
      {
        question: 'How last-minute can I book a cruise from Newark?',
        answer:
          'You can often book up to the day before departure if cabins are available! However, we recommend booking at least 3-7 days in advance to arrange parking, complete online check-in, and prepare for your trip.',
      },
      {
        question: 'Why are last-minute cruises so cheap?',
        answer:
          'Cruise lines prefer sailing at full capacity. Empty cabins generate no revenue, so they offer steep discounts to fill remaining spaces. This creates amazing opportunities for flexible Essex County travelers.',
      },
      {
        question: 'Can I get a specific cabin on a last-minute deal?',
        answer:
          'Last-minute deals often involve "guarantee" cabins where the cruise line assigns your room. You\'ll get at least the category you pay for, possibly better, but cannot choose specific locations.',
      },
      {
        question: 'What documents do I need for last-minute booking?',
        answer:
          "You'll need a valid passport or birth certificate and government ID for closed-loop cruises. Passports are strongly recommended and required for fly-back situations or international emergencies.",
      },
      {
        question: 'Are flights included in last-minute cruise deals from Newark?',
        answer:
          'Since Cape Liberty is local, no flights are needed! This is a huge advantage for Essex County residents - you can book last-minute without worrying about expensive airfare or connections.',
      },
    ],
    internalLinks: [
      '/cruises/cheap-deals-nj',
      '/cruises/from-newark',
      '/cruises/weekend-getaways',
      '/cruises/caribbean',
      '/services/cruise-transfers',
    ],
    lastUpdated: '2025-01-23',
  },
  {
    slug: 'family-cruises-nj',
    title: 'Family Cruises from New Jersey',
    metaTitle: 'Family Cruises from NJ 2025 | Kids Sail Free Cape Liberty',
    metaDescription:
      'Family-friendly cruises from New Jersey. Kids sail free deals, family suites, youth programs. Essex County families love our Cape Liberty departures. Book today!',
    keywords: [
      'family cruises from nj',
      'family cruises from new jersey',
      'kids sail free cape liberty',
      'family cruise deals newark',
      'multi-generation cruises nj',
      'family vacation cruises newark',
      'disney cruise from new york',
    ],
    searchVolume: 12100,
    difficulty: 25,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Unforgettable Family Cruises from New Jersey',
        subheadline: 'Where Kids Sail Free and Memories Last Forever',
      },
      description:
        'Create magical family memories with cruises designed for all ages departing from Cape Liberty. From toddlers to grandparents, modern cruise ships offer something for everyone - kids clubs, teen zones, adult-only retreats, and family activities that bring everyone together. Essex County families love the convenience of local departures, avoiding airport hassles while enjoying world-class family vacations.',
      highlights: [
        'Kids sail free promotions (ages 2-17)',
        'Complimentary youth programs',
        'Family connecting staterooms',
        'Character meet-and-greets',
        'Water slides and mini golf',
        'Ice skating and rock climbing',
        'Broadway-style shows for all ages',
        'Flexible dining times for families',
      ],
      popularCruiseLines: [
        'Royal Caribbean - Adventure Ocean kids program',
        'Norwegian Cruise Line - Splash Academy',
        'MSC Cruises - LEGO Experience at sea',
        'Disney Cruise Line (from Manhattan) - Character experiences',
        'Princess Cruises - Camp Discovery youth centers',
      ],
      bestTimeToVisit: 'School breaks: Summer, Spring Break, Winter holidays',
      averageDuration: '7 nights',
      startingPrice: 599,
      localTips: [
        'Book early for school vacation weeks',
        'Request family connecting rooms ASAP',
        'Pack swimsuits in carry-on bags',
        'Bring sunscreen and medication supplies',
        'Download cruise line apps for daily schedules',
        'Book popular activities on embarkation day',
        'Consider travel insurance for family groups',
      ],
    },
    faq: [
      {
        question: 'What age do kids sail free from Cape Liberty?',
        answer:
          'Most cruise lines offer kids sail free for ages 2-17 when sharing a cabin with two paying adults. Some lines extend this to 3rd and 4th guests of any age. Infants under 2 typically cruise free but count toward cabin capacity.',
      },
      {
        question: 'Are kids programs really free on cruises?',
        answer:
          'Yes! Daytime youth programs (usually 9am-10pm) are complimentary for ages 3-17. Late-night group babysitting may have nominal fees. Programs include activities, games, crafts, movies, and video games.',
      },
      {
        question: 'Can we get adjoining rooms for our family?',
        answer:
          'Absolutely! Cape Liberty cruises offer family staterooms sleeping up to 6, connecting cabins, and adjacent rooms. Book early for best selection, especially during Essex County school vacations.',
      },
      {
        question: 'Is cruising safe for kids with food allergies?',
        answer:
          "Very safe! Cruise lines excel at handling food allergies. Notify them at booking and speak with the restaurant manager on embarkation day. They'll prepare safe meals throughout your voyage, giving parents peace of mind.",
      },
      {
        question: 'What if my child gets seasick?',
        answer:
          "Modern ships have advanced stabilizers minimizing motion. The medical center stocks children's seasickness medication. Pack dramamine, ginger candies, and sea-bands. Most kids adjust quickly and love the gentle rocking motion!",
      },
    ],
    internalLinks: [
      '/cruises/from-newark',
      '/packages/family-resorts-from-newark',
      '/cruises/bahamas',
      '/cruises/caribbean',
      '/services/group-travel',
    ],
    lastUpdated: '2025-01-23',
  },
  {
    slug: 'seniors-from-essex-county',
    title: 'Senior Cruises from Essex County',
    metaTitle: 'Senior Cruises from Essex County NJ 2025 | 55+ Deals Cape Liberty',
    metaDescription:
      'Senior cruise specials from Essex County. 55+ discounts, accessible cabins, mature traveler amenities. Cape Liberty departures perfect for NJ seniors. Book now!',
    keywords: [
      'senior cruises from essex county',
      'senior cruises from nj',
      '55 plus cruises newark',
      'mature traveler cruises',
      'aarp cruise discounts nj',
      'accessible cruises cape liberty',
      'senior citizen cruise deals',
    ],
    searchVolume: 7700,
    difficulty: 18,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Premium Senior Cruises from Essex County',
        subheadline: 'Comfortable, Convenient & Specially Priced for 55+',
      },
      description:
        "Experience the golden age of travel with cruises perfectly suited for mature Essex County residents. Cape Liberty's proximity means no exhausting flights or lengthy transfers - just easy boarding and smooth sailing. With senior discounts, accessible accommodations, enrichment programs, and a relaxed pace, these cruises offer the ideal blend of adventure and comfort for discerning travelers 55 and better.",
      highlights: [
        'Senior discounts up to 25% off',
        'AARP member benefits',
        'Accessible staterooms available',
        'Enrichment lectures and classes',
        'Bridge and card tournaments',
        'Gentler shore excursion options',
        'Medical facilities onboard',
        'Special dietary accommodations',
      ],
      popularCruiseLines: [
        'Princess Cruises - Extensive enrichment programs',
        'Holland America - Classic cruising experience',
        'Celebrity Cruises - Premium amenities',
        'Royal Caribbean - Multi-generational options',
        'Oceania Cruises (from NYC) - Culinary focused',
      ],
      bestTimeToVisit: 'Spring and Fall for ideal weather and smaller crowds',
      averageDuration: '7-14 nights',
      startingPrice: 699,
      localTips: [
        'Book accessible cabins early if needed',
        'Consider travel insurance for pre-existing conditions',
        'Pack medications in original containers',
        'Request late dining for relaxed meals',
        'Join senior meet-and-greets onboard',
        'Take advantage of port shuttle services',
        'Book spa treatments on port days for discounts',
      ],
    },
    faq: [
      {
        question: 'What senior discounts are available from Cape Liberty?',
        answer:
          'Seniors 55+ receive 5-25% discounts on select sailings. AARP members get additional perks. Some lines offer reduced deposits, onboard credits, and free gratuities for senior travelers.',
      },
      {
        question: 'Are Cape Liberty cruises suitable for mobility concerns?',
        answer:
          'Yes! Ships feature accessible cabins, elevators, ramps, and wide corridors. Cape Liberty terminal is fully accessible. We can arrange wheelchair assistance and ensure your needs are met throughout your journey.',
      },
      {
        question: 'What medical facilities are available onboard?',
        answer:
          'All ships have medical centers with doctors and nurses. They handle routine care, medications, and emergencies. Dialysis and oxygen can often be arranged in advance. Travel insurance is highly recommended.',
      },
      {
        question: 'Can dietary restrictions be accommodated?',
        answer:
          'Absolutely! Cruise lines excel at handling low-sodium, diabetic, gluten-free, and other dietary needs. Notify us at booking and speak with dining staff on embarkation day for personalized meal planning.',
      },
      {
        question: 'Are there quiet areas away from families and parties?',
        answer:
          'Yes! Ships have adult-only pools, quiet lounges, libraries, and specialty restaurants. Some lines like Princess and Holland America cater specifically to mature travelers with a more refined atmosphere.',
      },
    ],
    internalLinks: [
      '/cruises/from-newark',
      '/cruises/caribbean',
      '/services/accessible-travel',
      '/packages/luxury-caribbean',
      '/locations/essex-county',
    ],
    lastUpdated: '2025-01-23',
  },
  {
    slug: 'weekend-getaways',
    title: 'Weekend Cruise Getaways from Newark',
    metaTitle: 'Weekend Cruises from Newark 2025 | 3-4 Day Quick Escapes NJ',
    metaDescription:
      'Weekend cruise getaways from Newark Cape Liberty. 3-4 night Bahamas & nowhere cruises. Perfect Essex County escapes. Friday departures, Monday returns!',
    keywords: [
      'weekend cruises from newark',
      'short cruises from nj',
      '3 day cruises cape liberty',
      '4 day cruises from newark',
      'weekend getaway cruises',
      'quick cruise escapes nj',
      'mini cruises from new jersey',
    ],
    searchVolume: 10200,
    difficulty: 22,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Weekend Cruise Getaways from Newark',
        subheadline: 'Mini-Vacations That Maximize Your Time Off',
      },
      description:
        "Don't wait for a long vacation to experience cruise luxury! Weekend cruises from Cape Liberty offer Essex County residents the perfect quick escape. These 3-4 night sailings typically depart Thursday or Friday and return Sunday or Monday, ideal for long weekends or when you need a brief respite from routine. Enjoy all the amenities of longer cruises - dining, entertainment, spa, casino - in a condensed timeframe.",
      highlights: [
        'Thursday/Friday departures',
        'Sunday/Monday returns',
        '3-4 night durations',
        'Bahamas destinations',
        'Sea day relaxation cruises',
        'All cruise amenities included',
        'Perfect for first-time cruisers',
        'Minimal time off work needed',
      ],
      popularCruiseLines: [
        'Royal Caribbean - Weekend Bahamas escapes',
        'Norwegian Cruise Line - 3-night Bahamas',
        'MSC Cruises - 4-night Caribbean samplers',
        'Carnival (from NYC) - Weekend party cruises',
        'Celebrity Cruises - Nowhere luxury escapes',
      ],
      bestTimeToVisit: 'Year-round, especially holiday weekends',
      averageDuration: '3-4 nights',
      startingPrice: 349,
      localTips: [
        'Book early for holiday weekends',
        'Consider Thursday departures for smaller crowds',
        'Pack light - casual dress codes on short cruises',
        'Pre-book specialty dining for short sailings',
        'Arrive early to enjoy ship amenities Day 1',
        'Perfect for celebrating special occasions',
        'Great for testing cruise compatibility',
      ],
    },
    faq: [
      {
        question: 'Where do weekend cruises from Newark go?',
        answer:
          'Most weekend cruises visit the Bahamas (Nassau or Freeport) or are "cruises to nowhere" - relaxing sea days enjoying the ship\'s amenities without ports. Perfect for pure relaxation!',
      },
      {
        question: 'Are weekend cruises worth it?',
        answer:
          "Absolutely! You experience all ship amenities, multiple dining venues, entertainment, and relaxation in a long weekend. It's perfect for busy Essex County professionals who can't take extended time off.",
      },
      {
        question: 'Do I need a passport for weekend cruises?',
        answer:
          "For closed-loop cruises (returning to Cape Liberty), a birth certificate and driver's license suffice. However, we strongly recommend passports for all international travel, even short Bahamas trips.",
      },
      {
        question: "What's included on a 3-night cruise?",
        answer:
          "Everything longer cruises offer: accommodations, meals, entertainment, pools, fitness center, kids clubs, and activities. You'll enjoy 6-9 meals, 2-3 shows, and full ship amenities despite the shorter duration.",
      },
      {
        question: 'When should I book weekend cruises?',
        answer:
          'Book 2-3 months ahead for best selection, especially for holiday weekends (Memorial Day, July 4th, Labor Day). Last-minute deals occasionally appear but popular weekends sell out quickly.',
      },
    ],
    internalLinks: [
      '/cruises/from-newark',
      '/cruises/bahamas',
      '/cruises/last-minute-from-newark',
      '/packages/memorial-day-getaways',
      '/packages/labor-day-escapes',
    ],
    lastUpdated: '2025-01-23',
  },
]

// Helper functions for data access
export function getCruiseBySlug(slug: string): CruiseDestination | undefined {
  return cruiseDestinations.find((cruise) => cruise.slug === slug)
}

export function getAllCruiseSlugs(): string[] {
  return cruiseDestinations.map((cruise) => cruise.slug)
}

export function getHighPriorityCruises(): CruiseDestination[] {
  return cruiseDestinations.filter((cruise) => cruise.priority === 'HIGH')
}

export function getCruisesByDifficulty(maxDifficulty: number): CruiseDestination[] {
  return cruiseDestinations.filter((cruise) => cruise.difficulty <= maxDifficulty)
}

// Generate static params for Next.js
export function generateCruiseStaticParams() {
  return cruiseDestinations.map((cruise) => ({
    destination: cruise.slug,
  }))
}
