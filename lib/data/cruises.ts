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
    metaTitle: 'Newark Cruises 2026 | Departures from Cape Liberty Port',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'caribbean',
    title: 'Caribbean Cruises from New Jersey',
    metaTitle: 'Caribbean Cruises from NJ 2026 | Essex County Departures',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'bahamas',
    title: 'Bahamas Cruises from Newark',
    metaTitle: 'Bahamas Cruise from Newark 2026 | Cape Liberty Departures',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'cape-liberty-port',
    title: 'Cape Liberty Cruise Port Guide',
    metaTitle: 'Cape Liberty Cruise Port Guide 2026 | Complete Essex County Resource',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'from-bayonne',
    title: 'Cruises from Bayonne NJ',
    metaTitle: 'Cruises from Bayonne 2026 | Cape Liberty Port Essex County',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'cheap-deals-nj',
    title: 'Cheap Cruise Deals from New Jersey',
    metaTitle: 'Cheap Cruises from NJ 2026 | Best Deals Under $500 Newark',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'last-minute-from-newark',
    title: 'Last Minute Cruises from Newark',
    metaTitle: 'Last Minute Cruises from Newark 2026 | Deals Departing This Week',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'family-cruises-nj',
    title: 'Family Cruises from New Jersey',
    metaTitle: 'Family Cruises from NJ 2026 | Kids Sail Free Cape Liberty',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'seniors-from-essex-county',
    title: 'Senior Cruises from Essex County',
    metaTitle: 'Senior Cruises from Essex County NJ 2026 | 55+ Deals Cape Liberty',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'weekend-getaways',
    title: 'Weekend Cruise Getaways from Newark',
    metaTitle: 'Weekend Cruises from Newark 2026 | 3-4 Day Quick Escapes NJ',
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
    lastUpdated: '2025-09-25',
  },
  {
    slug: 'new-years-eve-caribbean',
    title: "New Year's Eve Caribbean Cruises from Newark 2025-2026",
    metaTitle: "New Year's Eve Cruises 2025-2026 | Caribbean NYE from Newark NJ",
    metaDescription:
      "Ring in 2026 on a Caribbean cruise from Newark! New Year's Eve cruises from Cape Liberty with champagne toasts, fireworks & tropical celebrations. Book your NYE escape!",
    keywords: [
      'new years eve cruises 2025',
      'new years eve cruise from newark',
      'nye caribbean cruise 2026',
      'new years cruise cape liberty',
      'caribbean new years cruise nj',
      'new years eve cruise deals',
      'holiday cruises from newark',
      'december 2025 cruises newark',
    ],
    searchVolume: 150000,
    difficulty: 28,
    priority: 'HIGH',
    content: {
      hero: {
        headline: "Ring in 2026 on a Caribbean New Year's Eve Cruise from Newark",
        subheadline: 'Champagne Toasts, Tropical Fireworks & Midnight Celebrations at Sea',
      },
      description:
        "Celebrate the arrival of 2026 in spectacular style with a New Year's Eve cruise from Cape Liberty, departing December 2025. Leave winter behind and welcome the new year under Caribbean stars with champagne toasts, gourmet midnight feasts, dazzling fireworks displays over turquoise waters, and unforgettable celebrations on luxurious cruise ships. Essex County residents can skip the crowded Times Square scene and instead enjoy tropical paradise, world-class entertainment, and once-in-a-lifetime NYE parties - all departing just minutes from home. Whether you're seeking family-friendly celebrations, romantic getaways, or adults-only parties, New Year's Eve cruises offer the perfect blend of relaxation and revelry as you sail into the new year.",
      highlights: [
        'Midnight champagne toast and balloon drop at sea',
        "Gourmet New Year's Eve gala dinners",
        'Multiple party venues - casual to black-tie',
        'Live entertainment and DJ dance parties',
        'Tropical destinations: Bahamas, St. Barts, Turks & Caicos',
        'Fireworks displays over Caribbean waters',
        'No driving home after celebrations',
        "Wake up to New Year's Day in paradise",
      ],
      portInfo: {
        name: 'Cape Liberty Cruise Port',
        address: '14 Port Terminal Blvd, Bayonne, NJ 07002',
        distance: 'Only 15 minutes from Newark - easy access for Essex County residents',
        parkingInfo:
          'Secure parking $23-25/day. Book online for discounts. Consider pre-cruise hotel packages with parking included.',
        directions:
          'From Essex County: Take I-280 E to NJ Turnpike. Exit 14A to Route 440 S. Follow signs to Cape Liberty. Allow extra time for holiday traffic. Arrive 2-3 hours before departure.',
      },
      popularCruiseLines: [
        'Royal Caribbean - Odyssey of the Seas (7-night Perfect Day Bahamas departing Dec 28, 2025)',
        'Virgin Voyages - Adults-only NYE parties with Scarlet Lady and Valiant Lady from Miami (easy connections from Newark Airport)',
        'Celebrity Cruises - Premium celebrations with complimentary champagne at midnight',
        'Norwegian Cruise Line - Freestyle celebrations with multiple party venues',
        'MSC Cruises - European-style NYE with themed costume parties and confetti cannons',
      ],
      bestTimeToVisit: 'December 26-30, 2025 departures to be at sea for NYE',
      averageDuration: '7-8 nights',
      startingPrice: 1456,
      localTips: [
        'Book NOW - NYE cruises sell out 6-9 months in advance',
        'Request dining times for 2nd seating (8:30pm) to enjoy leisurely NYE dinner',
        'Pack formal wear - most ships have black-tie optional NYE galas',
        "Reserve specialty restaurants for New Year's Eve dinner early",
        "Book spa treatments for New Year's Day (discounted on sea days)",
        'Arrive at Cape Liberty a day early to avoid December 28th traffic',
        'Download cruise line app for onboard countdown party schedules',
        "Bring noisemakers and party hats (or buy onboard for ship's theme)",
      ],
    },
    faq: [
      {
        question: "What happens on New Year's Eve on a cruise ship?",
        answer:
          'Ships host multiple celebration venues from formal gala dinners to casual deck parties. Expect live bands, DJs, champagne toasts at midnight, balloon drops, confetti cannons, and fireworks displays. Many ships feature themed parties like 1920s Gatsby, masquerade balls, or white parties. All celebrations are included in your cruise fare with complimentary champagne at midnight. You can party-hop between venues or enjoy intimate celebrations in specialty lounges.',
      },
      {
        question: "How much do New Year's Eve cruises cost from Cape Liberty?",
        answer:
          "NYE cruises from Cape Liberty range from $1,456 per person for inside cabins on 7-night Bahamas sailings to $3,500+ for balcony suites on premium lines. Prices are 30-50% higher than non-holiday weeks. Book 6-9 months in advance for best rates. Essex County advantage: No airfare costs since you're departing locally, saving $400-800 per person compared to fly-cruise packages.",
      },
      {
        question: "Where do New Year's Eve cruises from Newark go?",
        answer:
          "Popular NYE itineraries include 7-night Perfect Day Bahamas (visiting Nassau, CocoCay, and Freeport), Eastern Caribbean routes to St. Thomas and St. Maarten, and luxury sailings to St. Barts, Turks & Caicos, and Barbados. Most departures are December 26-30, ensuring you're at sea or in a tropical port for New Year's Eve celebrations. Some Caribbean islands like St. Barts and Barbados host spectacular beach fireworks displays visible from your ship.",
      },
      {
        question: "Are New Year's Eve cruises family-friendly?",
        answer:
          'Absolutely! Most cruise lines offer family-friendly NYE celebrations with kid-appropriate countdown parties (early evening for younger children), teen-only dance parties, family-friendly comedy shows, and complimentary sparkling cider for kids at midnight. Royal Caribbean and Norwegian excel at multi-generational celebrations. For adults-only NYE, consider Virgin Voyages departing from Miami (easy Newark Airport connections) or book adults-only specialty venues on family ships.',
      },
      {
        question: "Is there a dress code for New Year's Eve on cruises?",
        answer:
          "Most ships designate New Year's Eve as a formal or black-tie optional night. Main dining rooms and gala events expect cocktail dresses, suits, or tuxedos. However, casual venues like buffets and deck parties have no dress code. Pack versatile outfits: formal wear for dinner and midnight gala, then comfortable party clothes for late-night dancing. Sequins, sparkles, and festive attire are always encouraged!",
      },
      {
        question: "When should I book a New Year's Eve cruise from Cape Liberty?",
        answer:
          "Book NOW for 2025-2026 departures - NYE cruises sell out 6-9 months ahead, especially affordable inside and oceanview cabins. Premium balcony and suite inventory moves fastest. Wave season (January-March) sometimes offers perks like onboard credits or free upgrades, but availability shrinks rapidly. Essex County residents have an advantage booking early since you don't need to coordinate flights, just secure your cabin and parking.",
      },
      {
        question: "Can I see fireworks on a New Year's Eve cruise?",
        answer:
          "Yes! Ships typically host their own onboard fireworks displays at midnight (regulations permitting). If you're docked at Caribbean ports like St. Barts, Barbados, Turks & Caicos, or Nassau, you'll witness spectacular beach and harbor fireworks from your ship. Balcony cabins offer private viewing, or head to open decks for 360-degree views. Some sailings position the ship specifically for optimal fireworks viewing from multiple Caribbean islands simultaneously.",
      },
      {
        question: "What's included in New Year's Eve cruise pricing?",
        answer:
          'Your cruise fare includes all NYE festivities: gala dinners, champagne toasts, balloon drops, entertainment, DJ parties, and most activities. Premium extras like specialty dining, premium alcohol, shore excursions, spa treatments, and gratuities are additional. Some lines offer beverage packages (highly recommended for NYE). Virgin Voyages includes most beverages, tips, and WiFi in base fares. Celebrity often bundles perks during NYE sailings like drink packages or onboard credits.',
      },
    ],
    internalLinks: [
      '/cruises/from-newark',
      '/cruises/caribbean',
      '/cruises/bahamas',
      '/packages/all-inclusive-caribbean',
      '/services/cruise-transfers',
      '/locations/essex-county',
    ],
    lastUpdated: '2025-10-04',
  },

  // ============================================================
  // PHASE 1 EXPANSION: High-Volume Missing Keywords
  // ============================================================

  {
    slug: 'viking',
    title: 'Viking Ocean & River Cruises from Newark',
    metaTitle: 'Viking Cruises 2025 | River & Ocean Cruises from New Jersey',
    metaDescription:
      'Book Viking river and ocean cruises. Award-winning small-ship experience with cultural immersion. Newark area travel agency specializing in Viking voyages.',
    keywords: [
      'viking cruises',
      'viking ocean cruises',
      'viking river cruises',
      'viking cruise deals',
      'viking cruises 2025',
      'viking cruise packages',
    ],
    searchVolume: 165000,
    difficulty: 66,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Award-Winning Viking Cruises - Culture & Discovery',
        subheadline: 'Intimate Ships, Enriching Experiences, Exceptional Value',
      },
      description:
        "Experience the world with Viking Cruises, the thinking person's cruise. From European river voyages along the Rhine and Danube to ocean expeditions across all seven continents, Viking offers Essex County travelers an unmatched combination of cultural immersion, destination-focused itineraries, and small-ship elegance. With no casinos, kids' clubs, or gimmicks, Viking cruises are designed for discerning adults seeking meaningful travel experiences. Every voyage includes shore excursions in every port, onboard enrichment programs, and all meals with complimentary wine and beer at lunch and dinner.",
      highlights: [
        'Small ships (190-930 guests) for intimate experiences',
        'Destination-focused itineraries across 7 continents',
        'Included shore excursions in every port',
        'All meals with wine & beer included',
        'Cultural enrichment programs & expert lecturers',
        'No nickel-and-diming - most amenities included',
        'Award-winning customer service',
        'Adults-only environment (18+)',
      ],
      localTips: [
        'Newark-area travelers can fly from EWR to connect with Viking cruises worldwide',
        'Popular embarkation points include Amsterdam, Barcelona, Venice, and Miami',
        'We coordinate your entire journey including flights, hotel stays, and transfers',
        "Viking's all-inclusive pricing makes budgeting simple - no surprise charges",
      ],
    },
    faq: [
      {
        question: 'What makes Viking Cruises different?',
        answer:
          'Viking focuses on cultural enrichment rather than entertainment. Ships are smaller, itineraries are destination-focused with included excursions, and the atmosphere is sophisticated yet relaxed. No casinos, no kids, no upselling.',
      },
      {
        question: 'Are Viking river cruises worth the price?',
        answer:
          'Absolutely. When you factor in included excursions ($100+ per port), wine/beer with meals, Wi-Fi, and gratuities, Viking offers exceptional value. Plus, their European river routes visit cities larger ships cannot reach.',
      },
      {
        question: 'Can I book Viking cruises from Newark?',
        answer:
          'Yes! We arrange your entire journey including flights from Newark Airport, pre/post hotel stays, and transfers to the ship. Most Viking cruises embark from European or coastal U.S. cities.',
      },
    ],
    internalLinks: [
      '/cruises/river-cruises',
      '/cruises/european',
      '/cruises/mediterranean',
      '/cruises/alaska',
      '/packages/all-inclusive-caribbean',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'oceania',
    title: 'Oceania Cruises - Upscale Culinary Voyages',
    metaTitle: 'Oceania Cruises 2025 | Luxury Small-Ship Cruises from NJ',
    metaDescription:
      'Book Oceania Cruises - upscale small-ship voyages with gourmet dining. New Jersey travel experts specializing in Oceania Riviera, Marina & Vista sailings.',
    keywords: [
      'oceania cruises',
      'oceania cruise deals',
      'oceania cruises 2025',
      'luxury small ship cruises',
      'oceania riviera',
      'oceania marina',
    ],
    searchVolume: 90500,
    difficulty: 55,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Oceania Cruises - Gourmet Dining at Sea',
        subheadline: 'Boutique Ships, Extraordinary Cuisines, Endless Discoveries',
      },
      description:
        'Discover the world in comfort and style with Oceania Cruises, where culinary excellence meets destination immersion. Featuring mid-size ships (684-1,250 guests), Oceania offers Essex County travelers the perfect balance between intimacy and amenities. With multiple gourmet restaurants, country club casual atmosphere, and longer port stays, Oceania appeals to sophisticated travelers who appreciate fine dining and in-depth cultural experiences. All Oceania cruises include specialty dining, exceptional service, and destination-rich itineraries spanning the globe.',
      highlights: [
        'Finest cuisine at sea by master chef Jacques Pépin',
        'Mid-size ships with boutique hotel ambiance',
        'Longer port stays & overnight stays in key cities',
        'Included specialty restaurants (no upcharges)',
        '6 open-seating restaurants on every ship',
        'Country club casual dress code',
        'High staff-to-guest ratio',
        'Destinations across all 7 continents',
      ],
      localTips: [
        'Newark Airport offers convenient connections to Oceania embarkation ports worldwide',
        'Popular departure cities include Miami, Barcelona, Venice, and Athens',
        'We recommend arriving a day early for international departures',
        'Our Oceania specialists can arrange pre-cruise hotel packages and transfers',
      ],
    },
    faq: [
      {
        question: 'How does Oceania compare to Viking and other cruise lines?',
        answer:
          'Oceania offers more onboard amenities than Viking (pools, casino, entertainment) while maintaining a refined, upscale atmosphere. The culinary experience is unmatched, with menus by Jacques Pépin and all specialty dining included.',
      },
      {
        question: 'What is included in an Oceania cruise?',
        answer:
          'All specialty restaurant dining, soft drinks and bottled water, shuttle service in ports, and fitness classes are included. Shore excursions, alcoholic beverages, Wi-Fi, and gratuities are extra (though often included in promotions).',
      },
      {
        question: 'Are Oceania ships adults-only?',
        answer:
          'No, children are welcome, but the sophisticated atmosphere naturally attracts mostly adult travelers. There are no dedicated kids facilities or programs.',
      },
    ],
    internalLinks: [
      '/cruises/mediterranean',
      '/cruises/caribbean',
      '/packages/all-inclusive-caribbean',
      '/cruises/alaska',
      '/destinations/europe-luxury-tours',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'disney',
    title: 'Disney Cruise Line - Magical Family Vacations at Sea',
    metaTitle: 'Disney Cruises 2025 | Disney Cruise Line from Newark NJ',
    metaDescription:
      'Book Disney Cruise Line vacations. Family-friendly voyages with character experiences, Broadway shows & kids clubs. Essex County Disney cruise experts.',
    keywords: [
      'disney cruises',
      'disney cruise line',
      'disney cruise 2025',
      'disney cruise deals',
      'disney fantasy cruise',
      'disney wish cruise',
    ],
    searchVolume: 40500,
    difficulty: 69,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Disney Cruise Line - Where Dreams Set Sail',
        subheadline: 'Magical Family Adventures with World-Class Service',
      },
      description:
        "Set sail on a magical journey with Disney Cruise Line, where enchantment awaits families from Essex County and beyond. From character meet-and-greets and Broadway-caliber shows to exceptional kids' clubs and adult-exclusive areas, Disney cruises deliver legendary service and entertainment for all ages. With five stunning ships visiting the Caribbean, Bahamas, Alaska, Europe, and exotic destinations worldwide, every Disney cruise combines premium amenities with the magic only Disney can deliver. Rotational dining, included kids' activities, and immersive themed experiences make Disney Cruise Line the gold standard for family vacations at sea.",
      highlights: [
        'Character experiences & meet-and-greets throughout the voyage',
        "Award-winning kids' clubs (ages 3 months - 17 years)",
        'Broadway-style Disney shows every night',
        'Rotational dining with character dining experiences',
        'Adults-only pools, restaurants & lounge areas',
        'Private island: Disney Castaway Cay',
        'All soft drinks, ice cream & room service included',
        'Exceptional crew-to-guest ratio',
      ],
      localTips: [
        'Many Disney cruises depart from nearby ports: New York, Cape Liberty (Bayonne), Port Canaveral (Orlando)',
        'Newark families can drive to NY/NJ departures or fly from EWR to Orlando for Caribbean sailings',
        'Book 12-18 months ahead for best cabin selection, especially for holiday sailings',
        'We offer exclusive Disney cruise booking perks and onboard credit',
      ],
    },
    faq: [
      {
        question: 'Are Disney cruises worth the higher price?',
        answer:
          "For families, absolutely. When you factor in included kids' clubs (free childcare!), character experiences, Broadway shows, rotational dining, soft drinks, and Disney's legendary service, the value is exceptional. No other cruise line offers this level of family programming.",
      },
      {
        question: 'Which Disney ship is best for families?',
        answer:
          'Disney Wish (newest, 2022) and Disney Fantasy offer the most space and newest amenities. Disney Dream is excellent for Caribbean sailings. All ships have fantastic kids programs, so choose based on itinerary and budget.',
      },
      {
        question: 'Can adults enjoy Disney cruises without kids?',
        answer:
          'Definitely! Adults-only areas include pools, restaurants, lounges, and the Senses Spa. Many couples cruise Disney for the exceptional service, rotational dining, and Broadway entertainment.',
      },
    ],
    internalLinks: [
      '/cruises/bahamas',
      '/cruises/caribbean',
      '/cruises/alaska',
      '/packages/family-resorts-from-newark',
      '/destinations/orlando-family-vacations',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'river-cruises',
    title: 'River Cruises 2025 - European & American River Voyages',
    metaTitle: 'River Cruises 2025 | European & USA River Cruise Deals from NJ',
    metaDescription:
      'Book river cruises on the Rhine, Danube, Mississippi & more. Small-ship cultural immersion. Newark area river cruise specialists with exclusive deals.',
    keywords: [
      'river cruises',
      'european river cruises',
      'rhine river cruise',
      'danube river cruise',
      'mississippi river cruise',
      'river cruise deals',
    ],
    searchVolume: 27100,
    difficulty: 93,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'River Cruises - Intimate Journeys Through the Heart of Regions',
        subheadline: 'European Rivers, American Waterways & Exotic Asian Routes',
      },
      description:
        "Experience destinations from the inside out with intimate river cruises that dock in the heart of cities large ships cannot reach. From the romantic castles of the Rhine to the cultural treasures along the Danube, from Mississippi paddle wheelers to the temples of Southeast Asia's Mekong, river cruising offers Essex County travelers unparalleled access to destinations and cultures. Small ships (100-190 guests) create a boutique hotel atmosphere with personalized service, regional cuisines, and expert local guides. Most river cruises include excursions, gratuities, and beverages, making them exceptional value for culturally curious travelers.",
      highlights: [
        'Dock in city centers - walk off ship to explore',
        'Small ships (100-190 guests) for intimate experiences',
        'Mostly included excursions & gratuities',
        'Unpacking once while visiting 7-10+ destinations',
        'Regional cuisine & local wines included',
        'Expert enrichment programs & lectures',
        'European rivers: Rhine, Danube, Seine, Rhône, Douro',
        'American classics: Mississippi, Columbia, Snake Rivers',
      ],
      localTips: [
        'Most European river cruises require flights from Newark to Amsterdam, Budapest, or other gateway cities',
        'Book airfare through us for coordinated timing and better pricing',
        'Peak season (May-October) books out 12+ months ahead - plan early!',
        'Shoulder season (April, November) offers fewer crowds and better value',
      ],
    },
    faq: [
      {
        question: 'How do river cruises differ from ocean cruises?',
        answer:
          'River ships are smaller (100-190 vs 2,000+ guests), dock in city centers, and focus on cultural immersion rather than onboard entertainment. Almost everything is included (excursions, tips, drinks), and you unpack once while visiting many destinations.',
      },
      {
        question: 'What is the best river cruise for first-timers?',
        answer:
          'The Rhine or Danube in Europe offer classic experiences with stunning castles, charming villages, and well-developed infrastructure. For U.S. cruises, the Mississippi on American Queen Voyages combines nostalgia with Southern hospitality.',
      },
      {
        question: 'Are river cruises good value?',
        answer:
          'Yes, when you factor in included shore excursions ($100+ per port), all meals with wine/beer, gratuities, and Wi-Fi. The per-day cost is comparable to quality ocean cruises but with far more inclusions.',
      },
    ],
    internalLinks: [
      '/cruises/viking',
      '/cruises/european',
      '/packages/europe-tours',
      '/destinations/europe-river-cruise-guide',
      '/guides/river-cruise-planning',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'all-inclusive',
    title: 'All-Inclusive Cruises - Premium Packages with Everything Included',
    metaTitle: 'All-Inclusive Cruises 2025 | Drinks, Wi-Fi, Tips & More Included',
    metaDescription:
      'Book all-inclusive cruise packages with drinks, Wi-Fi, gratuities & shore excursions included. Newark area specialists in premium cruise packages.',
    keywords: [
      'all inclusive cruises',
      'all inclusive cruise packages',
      'cruises with everything included',
      'premium cruise packages',
      'luxury all inclusive cruises',
    ],
    searchVolume: 18100,
    difficulty: 74,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'All-Inclusive Cruises - True Worry-Free Vacations',
        subheadline: 'Drinks, Dining, Wi-Fi, Tips & Excursions All Included',
      },
      description:
        'Say goodbye to surprise charges and hello to genuine all-inclusive cruise vacations where nearly everything is covered in your upfront price. From premium beverage packages and specialty dining to gratuities, Wi-Fi, and even shore excursions, these comprehensive packages let Essex County travelers budget with confidence and relax completely. Cruise lines like Regent Seven Seas, Oceania, and Virgin Voyages offer varying levels of all-inclusive luxury, while mainstream lines like Royal Caribbean and Norwegian offer premium packages that bundle amenities for significant savings compared to paying separately.',
      highlights: [
        'All specialty dining included (no extra charges)',
        'Premium beverage packages (top-shelf liquor included)',
        'Pre-paid gratuities for crew',
        'Unlimited Wi-Fi on most packages',
        'Shore excursions in every port (on ultra-luxury)',
        'Room service & in-cabin dining',
        'Fitness classes & wellness programs',
        'Transparent pricing - no bill shock',
      ],
      localTips: [
        'For true all-inclusive value, compare total cost versus ala carte pricing',
        'Royal Caribbean Beverage Package ($90/day) + Wi-Fi ($30/day) + tips ($16/day) + dining ($50/night) = $186/day extras',
        'An all-inclusive package at $220/day total often includes far more value',
        'We help calculate which option saves you the most money',
      ],
    },
    faq: [
      {
        question: 'Which cruise lines are truly all-inclusive?',
        answer:
          'Regent Seven Seas, Seabourn, and Silversea are ultra-luxury all-inclusive (everything included). Oceania, Celebrity, and Virgin Voyages offer "almost all-inclusive" with most amenities included. Mainstream lines sell all-inclusive packages that bundle beverages, Wi-Fi, gratuities, and dining.',
      },
      {
        question: 'Are all-inclusive cruises worth the higher cost?',
        answer:
          'Absolutely, if you plan to use the amenities. For travelers who drink alcohol, dine at specialty restaurants, use Wi-Fi daily, and take excursions, all-inclusive packages offer 30-50% savings versus paying separately. Plus, the peace of mind is priceless.',
      },
      {
        question: 'What is still NOT included on all-inclusive cruises?',
        answer:
          'Even on ultra-luxury lines, spa treatments, casino, premium shore excursions (private tours), and shopping are extra. Most packages also exclude premium wines above a certain price point.',
      },
    ],
    internalLinks: [
      '/cruises/oceania',
      '/cruises/viking',
      '/packages/luxury-resort-packages',
      '/cruises/caribbean',
      '/cruises/mediterranean',
    ],
    lastUpdated: '2025-01-10',
  },

  // ============================================================
  // PHASE 2 EXPANSION: Additional Cruise Lines & Port Pages
  // ============================================================

  {
    slug: 'holland-america',
    title: 'Holland America Line - Premium Alaska & Europe Cruises',
    metaTitle: 'Holland America Cruises 2025 | Alaska & Europe Cruise Experts',
    metaDescription:
      'Book Holland America Line cruises. Premium mid-size ships specializing in Alaska, Europe & world voyages. Newark area HAL cruise specialists.',
    keywords: [
      'holland america cruises',
      'holland america line',
      'holland america alaska',
      'hal cruises',
      'holland america 2025',
    ],
    searchVolume: 18100,
    difficulty: 43,
    priority: 'MEDIUM',
    content: {
      hero: {
        headline: 'Holland America Line - Premium Mid-Size Elegance',
        subheadline: 'Alaska Specialists & European Experts Since 1873',
      },
      description:
        'Discover the refined elegance of Holland America Line, where 150+ years of maritime expertise meets modern luxury. Specializing in Alaska and European itineraries, HAL offers Essex County travelers mid-size ships (1,200-2,650 guests) with exceptional service, enriching onboard programs, and longer port stays for deeper destination immersion. From the glaciers of Alaska to the canals of Amsterdam, from Panama Canal transits to exotic world voyages, Holland America delivers sophisticated travel experiences for discerning cruisers seeking culture, cuisine, and comfort without the crowds of mega-ships.',
      highlights: [
        'Mid-size ships (1,200-2,650 guests) - more intimate than mega-ships',
        '#1 rated Alaska cruise line by Condé Nast Traveler',
        'Longer port stays & overnight stays in key cities',
        "America's Test Kitchen partnership for culinary excellence",
        'BBC Earth programming & enrichment lectures',
        'Lincoln Center Stage classical music performances',
        "Explorer's Lounge for panoramic views",
        'Exceptional service with high crew-to-guest ratio',
      ],
      localTips: [
        'Alaska cruises (May-Sept): Fly Newark to Seattle or Vancouver for 7-day Inside Passage sailings',
        'Europe cruises: Newark to Amsterdam connections available, many itineraries embark/disembark Amsterdam',
        'Book Pinnacle-class ships (Koningsdam, Nieuw Statendam) for newest amenities',
        'Have Mariners rewards? Loyalty perks include onboard credits and priority bookings',
      ],
    },
    faq: [
      {
        question: 'What makes Holland America different from other cruise lines?',
        answer:
          "HAL focuses on destination immersion with longer port stays, enrichment programs (BBC Earth, culinary arts, music), mid-size ships for easier navigation, and exceptional service. It's ideal for travelers seeking culture and refinement over waterslides and casinos.",
      },
      {
        question: 'Is Holland America good for Alaska cruises?',
        answer:
          "Absolutely - HAL is consistently rated #1 for Alaska cruising. Their expertise includes exclusive glacier viewing, Denali add-ons, and onboard naturalists. Plus, they've been sailing Alaska longer than any other premium line.",
      },
      {
        question: 'What age group cruises Holland America?',
        answer:
          "While all ages are welcome, HAL attracts mostly 50+ travelers seeking sophistication and enrichment. Families cruise during summer Alaska and holidays, but it's not as kid-focused as Carnival or Royal Caribbean.",
      },
    ],
    internalLinks: [
      '/cruises/alaska',
      '/cruises/european',
      '/cruises/river-cruises',
      '/destinations/alaska-cruise-guide',
      '/packages/europe-tours',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'from-galveston',
    title: 'Cruises from Galveston Texas - Year-Round Caribbean Departures',
    metaTitle: 'Cruises from Galveston 2025 | Texas Cruise Port Deals from NJ',
    metaDescription:
      'Book cruises from Galveston, TX. Year-round Caribbean sailings. Royal Caribbean, Carnival, Disney. Newark travelers fly to Houston. Texas cruise experts.',
    keywords: [
      'cruises from galveston',
      'galveston cruises',
      'cruises out of galveston',
      'galveston cruise terminal',
      'texas cruises',
      'galveston cruise port',
    ],
    searchVolume: 51100,
    difficulty: 44,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Cruises from Galveston, Texas - Your Gulf Coast Gateway',
        subheadline: 'Year-Round Caribbean & Mexico Sailings',
      },
      description:
        'Embark on your Caribbean adventure from Galveston, Texas - the fourth-busiest cruise port in North America and the premier Gulf Coast departure point. Essex County travelers enjoy convenient connections through Houston airports (IAH or HBY), avoiding Miami and Fort Lauderdale crowds. With year-round sailings from Royal Caribbean, Carnival, and Disney Cruise Line, Galveston offers 4-7 night Western Caribbean and Mexico itineraries perfect for beach lovers seeking Cozumel, Costa Maya, and stunning Cayman Islands. The historic island city itself makes a great pre-cruise destination with beaches, Victorian architecture, and fresh Gulf seafood.',
      highlights: [
        'Year-round departures - no seasonal gaps',
        'Royal Caribbean, Carnival & Disney Cruise Line',
        '4-7 night Western Caribbean & Mexico itineraries',
        'Fly Newark to Houston (IAH) - 4 hours, then 45-min drive',
        'Popular ports: Cozumel, Costa Maya, Grand Cayman, Roatán',
        'Less crowded than Florida cruise terminals',
        'Historic Galveston Island makes great pre-cruise stop',
        'Warm-weather cruising year-round',
      ],
      portInfo: {
        name: 'Port of Galveston',
        address: 'Galveston Cruise Terminal, Galveston, TX 77550',
        distance: '45 minutes from Houston IAH Airport',
        parkingInfo: 'Covered parking $85-$100/week, outdoor $70-$85/week. Reserve in advance.',
        directions:
          'From Houston: Take I-45 South directly to Galveston Island. Follow signs to cruise terminals. GPS: Pier 10 or Pier 28 depending on cruise line.',
      },
      localTips: [
        'Fly Newark (EWR) to Houston (IAH) - United direct flights available, 4 hours',
        'Book 1-night pre-cruise hotel in Galveston - embarkation day is stress-free',
        'Galveston has excellent seafood restaurants on historic Strand district',
        'Weather: Mild winters (60s-70s), hot summers (80s-90s), occasional hurricanes Aug-Oct',
        'Parking: Pre-book parking online for guaranteed spots and lower rates',
      ],
    },
    faq: [
      {
        question: 'Which cruise lines sail from Galveston?',
        answer:
          'Royal Caribbean (Allure, Harmony, Liberty of the Seas), Carnival (Breeze, Jubilee, Vista), and Disney Cruise Line (Disney Magic) all offer year-round sailings from Galveston with Western Caribbean and Mexico itineraries.',
      },
      {
        question: 'How do I get to Galveston cruise port from Newark?',
        answer:
          'Fly Newark (EWR) to Houston (IAH) - about 4 hours. Then drive or shuttle 45 minutes to Galveston. We can arrange complete packages including flights, hotel, and port transfers.',
      },
      {
        question: 'What destinations can I visit from Galveston cruises?',
        answer:
          'Western Caribbean and Mexico ports including Cozumel, Costa Maya, Grand Cayman, Roatán (Honduras), Belize, Progreso, and Jamaica. Most cruises are 5-7 nights with 2-3 port stops.',
      },
    ],
    internalLinks: [
      '/cruises/royal-caribbean',
      '/cruises/carnival',
      '/cruises/disney',
      '/cruises/caribbean',
      '/destinations/cozumel-mexico',
    ],
    lastUpdated: '2025-01-10',
  },

  {
    slug: 'from-new-york',
    title: 'Cruises from New York City - Manhattan & Brooklyn Cruise Terminal',
    metaTitle: 'Cruises from New York 2025 | NYC Cruise Port - Drive from NJ',
    metaDescription:
      'Book cruises from New York Manhattan. Drive from Newark/Essex County. Bermuda, Caribbean, Canada/New England. NYC cruise terminal experts.',
    keywords: [
      'cruises from new york',
      'cruises from nyc',
      'manhattan cruise terminal',
      'new york cruise port',
      'cruises leaving from new york',
      'brooklyn cruise terminal',
    ],
    searchVolume: 22200,
    difficulty: 43,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Cruises from New York City - Your Local Departure Port',
        subheadline: 'Drive from Essex County - No Flying Required!',
      },
      description:
        'Set sail from your own backyard! Essex County residents enjoy the ultimate convenience of cruises departing from Manhattan and Brooklyn - just a 20-40 minute drive from Newark with no flights, no airports, and no hassle. The Manhattan Cruise Terminal on the West Side and Brooklyn Cruise Terminal in Red Hook offer seasonal sailings (April-November) to Bermuda, Caribbean, Canada/New England, and even transatlantic to Europe. Norwegian Cruise Line, Celebrity, Carnival, and Princess operate regularly from NYC, making it effortless for New Jersey travelers to embark on world-class voyages without leaving the tri-state area.',
      highlights: [
        'Drive from Newark - 20-40 minutes, no flying required!',
        'Manhattan Cruise Terminal (West Side) & Brooklyn Terminal (Red Hook)',
        'Seasonal sailings April-November',
        'Popular routes: Bermuda (7-day), Caribbean, Canada/New England',
        'Norwegian, Celebrity, Carnival, Princess cruise lines',
        'Park at terminal or use ride-share/taxi',
        'Explore NYC before/after cruise',
        'Perfect for first-time cruisers',
      ],
      portInfo: {
        name: 'Manhattan Cruise Terminal',
        address: '711 12th Avenue, New York, NY 10019',
        distance: '25 minutes from Newark via Holland Tunnel',
        parkingInfo:
          'Limited terminal parking $40/day. Better: Park at Newark Airport long-term ($20/day) and Uber to terminal ($40).',
        directions:
          'From Newark: Take NJ Turnpike to Holland Tunnel. Exit tunnel, head north on West Side Highway to 55th St. Terminal on right at Pier 88/90/92.',
      },
      localTips: [
        'Essex County residents can drive - no flights needed! Holland Tunnel to Manhattan is fastest',
        'Parking option: Park at Newark Airport long-term lot, Uber/Lyft to Manhattan terminal',
        'Bermuda cruises (7-day) are most popular - warm weather, no passport required for US citizens',
        'Canada/New England fall foliage cruises (Sept-Oct) are spectacular',
        'Book spring/fall for best weather - summer can be hot and humid',
      ],
    },
    faq: [
      {
        question: 'Can I really drive to NYC cruise terminals from New Jersey?',
        answer:
          'Yes! Manhattan Cruise Terminal is 25 minutes from Newark via Holland Tunnel. Brooklyn Cruise Terminal is 30 minutes via Verrazano Bridge. No flying required - just drive and board!',
      },
      {
        question: 'Where should I park for NYC cruises?',
        answer:
          'Terminal parking is limited and expensive ($40/day). Better options: Park at Newark Airport long-term ($20/day) and Uber ($40), or use ride-share directly to terminal. Some cruise  packages include hotel parking.',
      },
      {
        question: 'What cruises leave from New York?',
        answer:
          'Seasonal (April-November): 7-day Bermuda roundtrips, 7-14 day Caribbean, 7-10 day Canada/New England fall foliage, and transatlantic repositioning cruises to Europe. Norwegian, Celebrity, Carnival, and Princess are primary operators.',
      },
    ],
    internalLinks: [
      '/cruises/from-newark',
      '/cruises/caribbean',
      '/destinations/bermuda-from-ny',
      '/cruises/norwegian',
      '/cruises/celebrity',
    ],
    lastUpdated: '2025-01-10',
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
