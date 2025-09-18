/**
 * Cruise destination data for SEO-optimized cruise pages
 * Includes detailed information for Mediterranean, European, Bahamas, and Hawaii cruises
 */

export interface CruiseDestination {
  id: string
  name: string
  slug: string
  metaTitle: string
  metaDescription: string
  searchVolume: number
  heroTitle: string
  heroDescription: string
  highlights: string[]
  popularPorts: {
    name: string
    country: string
    description: string
    attractions: string[]
  }[]
  cruiseLines: {
    name: string
    ships: string[]
    specialties: string[]
  }[]
  bestTimeToVisit: {
    season: string
    months: string[]
    reason: string
  }[]
  averageDuration: string
  priceRange: {
    min: number
    max: number
    currency: string
  }
  activities: string[]
  whyChooseUs: string[]
  faqs: {
    question: string
    answer: string
  }[]
}

export const mediterraneanCruise: CruiseDestination = {
  id: 'mediterranean',
  name: 'Mediterranean Cruises',
  slug: 'mediterranean',
  metaTitle: 'Mediterranean Cruises 2025 | Greek Isles, Italy & Spain from $899',
  metaDescription:
    'Book Mediterranean cruises visiting Greek Islands, Italian Riviera, Spain, and French ports. 7-14 day itineraries with exclusive perks. Free upgrades & onboard credits. Call 833-874-1019.',
  searchVolume: 33100,
  heroTitle: 'Discover the Mediterranean by Sea',
  heroDescription:
    'Explore ancient civilizations, stunning coastlines, and vibrant cultures on an unforgettable Mediterranean cruise. From the Greek Isles to the Italian Riviera, experience the best of Europe from the comfort of a luxury cruise ship.',
  highlights: [
    'Visit multiple countries in one trip',
    'UNESCO World Heritage Sites at every port',
    'Mediterranean cuisine and wine experiences',
    'Perfect weather from April to November',
    'Family-friendly and romantic options available',
  ],
  popularPorts: [
    {
      name: 'Barcelona',
      country: 'Spain',
      description: 'Gateway to Catalonia with stunning architecture and beaches',
      attractions: ['Sagrada Familia', 'Park Güell', 'Las Ramblas', 'Gothic Quarter'],
    },
    {
      name: 'Rome (Civitavecchia)',
      country: 'Italy',
      description: 'Access to the Eternal City and Vatican',
      attractions: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum'],
    },
    {
      name: 'Santorini',
      country: 'Greece',
      description: 'Iconic white-washed buildings and stunning sunsets',
      attractions: ['Oia Village', 'Red Beach', 'Ancient Thera', 'Wine Tours'],
    },
    {
      name: 'Dubrovnik',
      country: 'Croatia',
      description: 'The Pearl of the Adriatic with medieval walls',
      attractions: ['Old Town Walls', 'Lokrum Island', 'Cable Car Views', 'Game of Thrones Tours'],
    },
    {
      name: 'Venice',
      country: 'Italy',
      description: 'Romantic canals and Renaissance architecture',
      attractions: ["St. Mark's Basilica", 'Grand Canal', 'Rialto Bridge', 'Murano Glass Factory'],
    },
  ],
  cruiseLines: [
    {
      name: 'Royal Caribbean',
      ships: ['Odyssey of the Seas', 'Anthem of the Seas', 'Explorer of the Seas'],
      specialties: ['Family entertainment', 'Adventure activities', 'Broadway shows'],
    },
    {
      name: 'Norwegian Cruise Line',
      ships: ['Norwegian Epic', 'Norwegian Gem', 'Norwegian Pearl'],
      specialties: ['Freestyle cruising', 'Specialty dining', 'Entertainment'],
    },
    {
      name: 'MSC Cruises',
      ships: ['MSC Seaside', 'MSC Divina', 'MSC Meraviglia'],
      specialties: ['Mediterranean heritage', 'Authentic cuisine', 'Family programs'],
    },
    {
      name: 'Celebrity Cruises',
      ships: ['Celebrity Edge', 'Celebrity Apex', 'Celebrity Constellation'],
      specialties: ['Modern luxury', 'Culinary excellence', 'Spa & wellness'],
    },
  ],
  bestTimeToVisit: [
    {
      season: 'Peak Season',
      months: ['June', 'July', 'August'],
      reason: 'Warmest weather, longest days, busiest ports',
    },
    {
      season: 'Shoulder Season',
      months: ['April', 'May', 'September', 'October'],
      reason: 'Perfect weather, fewer crowds, better prices',
    },
    {
      season: 'Off Season',
      months: ['November', 'December', 'March'],
      reason: 'Lowest prices, intimate experiences, cooler weather',
    },
  ],
  averageDuration: '7-14 days',
  priceRange: {
    min: 899,
    max: 4999,
    currency: 'USD',
  },
  activities: [
    'Shore excursions to ancient ruins',
    'Wine tasting in local vineyards',
    'Beach days at pristine Mediterranean beaches',
    'Cooking classes with local chefs',
    'Shopping in local markets',
    'Historical walking tours',
    'Water sports and snorkeling',
    'Cultural performances and festivals',
  ],
  whyChooseUs: [
    'Exclusive group rates save you 20-50%',
    'Free cabin upgrades when available',
    '$100-$500 onboard credits per cabin',
    'Complimentary specialty dining packages',
    'Pre-paid gratuities on select sailings',
    'Price match guarantee',
    'Expert Mediterranean cruise specialists',
    '24/7 support throughout your journey',
  ],
  faqs: [
    {
      question: 'Do I need a passport for a Mediterranean cruise?',
      answer:
        'Yes, a valid passport is required for all Mediterranean cruises. We recommend your passport be valid for at least 6 months beyond your travel dates. Some countries may also require visas, which we can help you arrange.',
    },
    {
      question: 'What is the best Mediterranean cruise itinerary?',
      answer:
        'The Western Mediterranean (Spain, France, Italy) is perfect for first-timers, while the Eastern Mediterranean (Greece, Turkey, Croatia) offers more ancient history. Many cruises combine both regions in 10-14 day itineraries for the ultimate experience.',
    },
    {
      question: 'How much should I budget for a Mediterranean cruise?',
      answer:
        'Budget $150-$300 per person per day for a Mediterranean cruise, including the cruise fare, gratuities, shore excursions, and onboard expenses. We can help you find deals starting from $899 per person for 7-day cruises.',
    },
  ],
}

export const europeanCruise: CruiseDestination = {
  id: 'european',
  name: 'European Cruises',
  slug: 'european',
  metaTitle: 'European Cruises 2025 | Baltic, Norwegian Fjords & River Cruises',
  metaDescription:
    'Discover Europe by cruise ship. Baltic capitals, Norwegian fjords, British Isles, and European river cruises. Exclusive deals and onboard credits. Book with experts - Call 833-874-1019.',
  searchVolume: 18100,
  heroTitle: 'Explore All of Europe by Cruise',
  heroDescription:
    "From the majestic Norwegian fjords to the romantic Danube River, discover Europe's diverse landscapes, rich history, and vibrant cultures on an unforgettable cruise adventure.",
  highlights: [
    'Multiple European regions in one trip',
    'No constant packing and unpacking',
    'Scenic sailing through fjords and rivers',
    'Local guides and cultural immersion',
    'All-inclusive river cruise options',
  ],
  popularPorts: [
    {
      name: 'Copenhagen',
      country: 'Denmark',
      description: "Scandinavia's coolest capital with royal palaces",
      attractions: ['Tivoli Gardens', 'Little Mermaid', 'Nyhavn Harbor', 'Royal Palaces'],
    },
    {
      name: 'St. Petersburg',
      country: 'Russia',
      description: 'Imperial city with world-class museums',
      attractions: [
        'Hermitage Museum',
        'Peterhof Palace',
        'Church of Spilled Blood',
        'Catherine Palace',
      ],
    },
    {
      name: 'Bergen',
      country: 'Norway',
      description: 'Gateway to the Norwegian fjords',
      attractions: ['Bryggen Wharf', 'Mount Fløyen', 'Fish Market', 'Fjord Tours'],
    },
    {
      name: 'Amsterdam',
      country: 'Netherlands',
      description: 'Charming canals and world-class museums',
      attractions: ['Anne Frank House', 'Van Gogh Museum', 'Canal Cruise', 'Jordaan District'],
    },
    {
      name: 'Edinburgh',
      country: 'Scotland',
      description: 'Historic castle and Royal Mile',
      attractions: ['Edinburgh Castle', 'Royal Mile', "Arthur's Seat", 'Scotch Whisky Experience'],
    },
  ],
  cruiseLines: [
    {
      name: 'Princess Cruises',
      ships: ['Sky Princess', 'Regal Princess', 'Crown Princess'],
      specialties: ['British Isles expertise', 'Afternoon tea', 'Enrichment programs'],
    },
    {
      name: 'Holland America',
      ships: ['Rotterdam', 'Nieuw Statendam', 'Zuiderdam'],
      specialties: ['Longer port stays', 'Cultural immersion', 'Culinary excellence'],
    },
    {
      name: 'Viking Ocean',
      ships: ['Viking Star', 'Viking Sea', 'Viking Sky'],
      specialties: ['Adults-only', 'Cultural enrichment', 'Nordic heritage'],
    },
    {
      name: 'Viking River',
      ships: ['Viking Longships', 'Viking Prestige', 'Viking Legend'],
      specialties: ['River cruising', 'Intimate experiences', 'All-inclusive'],
    },
  ],
  bestTimeToVisit: [
    {
      season: 'Summer',
      months: ['June', 'July', 'August'],
      reason: 'White nights in Baltics, warmest weather, midnight sun',
    },
    {
      season: 'Spring/Fall',
      months: ['May', 'September'],
      reason: 'Mild weather, fewer tourists, Northern Lights possible',
    },
    {
      season: 'Winter',
      months: ['December'],
      reason: 'Christmas markets river cruises, festive atmosphere',
    },
  ],
  averageDuration: '7-21 days',
  priceRange: {
    min: 1199,
    max: 8999,
    currency: 'USD',
  },
  activities: [
    'Fjord scenic cruising',
    'Medieval city tours',
    'Castle and palace visits',
    'Local market exploration',
    'Traditional music performances',
    'Beer and wine tasting',
    'Cycling tours in port cities',
    'Museums and art galleries',
  ],
  whyChooseUs: [
    'Specialized European cruise experts',
    'Exclusive shore excursion packages',
    'Multi-cruise combination deals',
    'Visa assistance for Russia and Turkey',
    'Pre and post cruise hotel packages',
    'Group rates for 8+ passengers',
    'Travel insurance included options',
    'Local currency exchange guidance',
  ],
  faqs: [
    {
      question: 'What is the difference between ocean and river cruises in Europe?',
      answer:
        'Ocean cruises visit coastal cities and offer more onboard amenities with 2,000+ passengers. River cruises sail through the heart of Europe with 150-200 passengers, docking in city centers with more intimate experiences and included excursions.',
    },
    {
      question: 'Do I need visas for a European cruise?',
      answer:
        'Most European countries are visa-free for US citizens for stays under 90 days. However, Russia requires a visa, though some cruise lines offer visa-free programs for their organized shore excursions. We handle all visa arrangements for you.',
    },
    {
      question: 'When is the best time for a Norwegian fjords cruise?',
      answer:
        'May through September offers the best weather with long daylight hours. June and July have nearly 24-hour daylight. For Northern Lights, consider September through March, though weather can be rougher.',
    },
  ],
}

export const bahamasCruise: CruiseDestination = {
  id: 'bahamas',
  name: 'Bahamas Cruises',
  slug: 'bahamas',
  metaTitle: 'Bahamas Cruises from Florida | 3-7 Day Caribbean Cruises from $299',
  metaDescription:
    'Bahamas cruises from Miami, Fort Lauderdale & Port Canaveral. Visit Nassau, Freeport, and private islands. Perfect beaches, water sports, and island culture. Book now - Call 833-874-1019.',
  searchVolume: 22200,
  heroTitle: 'Escape to Paradise in the Bahamas',
  heroDescription:
    'Just hours from Florida, discover crystal-clear waters, pristine beaches, and vibrant island culture on a Bahamas cruise. Perfect for families, couples, and quick getaways.',
  highlights: [
    'Short cruises from 3-7 days',
    'Depart from multiple Florida ports',
    'Private island experiences',
    'World-class beaches and snorkeling',
    'Family-friendly activities',
  ],
  popularPorts: [
    {
      name: 'Nassau',
      country: 'Bahamas',
      description: 'Capital city with colonial charm and modern attractions',
      attractions: ['Atlantis Resort', "Queen's Staircase", 'Straw Market', 'Blue Lagoon Island'],
    },
    {
      name: 'Freeport',
      country: 'Bahamas',
      description: 'Grand Bahama Island with beaches and nature',
      attractions: [
        'Lucayan National Park',
        'Port Lucaya Marketplace',
        'Garden of the Groves',
        'Taino Beach',
      ],
    },
    {
      name: 'Perfect Day at CocoCay',
      country: 'Bahamas',
      description: "Royal Caribbean's private island paradise",
      attractions: [
        'Thrill Waterpark',
        'Perfect Day Cabanas',
        'Oasis Lagoon Pool',
        'Up Up and Away Balloon',
      ],
    },
    {
      name: 'Half Moon Cay',
      country: 'Bahamas',
      description: "Holland America's private island",
      attractions: [
        'Horseback riding on beach',
        'Stingray encounter',
        'Beach barbecue',
        'Water sports',
      ],
    },
    {
      name: 'Princess Cays',
      country: 'Bahamas',
      description: 'Princess Cruises private resort',
      attractions: [
        'Sanctuary adults-only area',
        'Beach activities',
        'Local crafts market',
        'Snorkeling',
      ],
    },
  ],
  cruiseLines: [
    {
      name: 'Carnival Cruise Line',
      ships: ['Carnival Celebration', 'Carnival Sunshine', 'Carnival Elation'],
      specialties: ['Fun Ships', 'Affordable pricing', 'Party atmosphere'],
    },
    {
      name: 'Royal Caribbean',
      ships: ['Wonder of the Seas', 'Freedom of the Seas', 'Mariner of the Seas'],
      specialties: ['Private island CocoCay', 'Family activities', 'Entertainment'],
    },
    {
      name: 'Disney Cruise Line',
      ships: ['Disney Dream', 'Disney Fantasy', 'Disney Wish'],
      specialties: ['Family magic', 'Character experiences', 'Castaway Cay island'],
    },
    {
      name: 'MSC Cruises',
      ships: ['MSC Seashore', 'MSC Divina'],
      specialties: ['Ocean Cay Marine Reserve', 'Evening island stays', 'Eco-friendly'],
    },
  ],
  bestTimeToVisit: [
    {
      season: 'Peak Season',
      months: ['December', 'January', 'February', 'March'],
      reason: 'Perfect weather, escape winter, holiday cruises',
    },
    {
      season: 'Summer',
      months: ['June', 'July', 'August'],
      reason: 'School vacation, warm waters, family time',
    },
    {
      season: 'Value Season',
      months: ['September', 'October', 'November'],
      reason: 'Lower prices, fewer crowds, still warm',
    },
  ],
  averageDuration: '3-7 days',
  priceRange: {
    min: 299,
    max: 1999,
    currency: 'USD',
  },
  activities: [
    'Swimming with dolphins',
    'Snorkeling and scuba diving',
    'Beach relaxation',
    'Jet skiing and parasailing',
    'Island tours and culture',
    'Shopping for duty-free items',
    'Casino visits in Nassau',
    'Aquarium and marine parks',
  ],
  whyChooseUs: [
    'Best rates on short Caribbean cruises',
    'Florida resident discounts',
    'Free upgrades to balcony cabins',
    'Kids sail free promotions',
    'Drink package deals',
    'Group rates for reunions and weddings',
    'Pre-cruise hotel packages in Florida',
    'Transportation from Orlando to ports',
  ],
  faqs: [
    {
      question: 'Do I need a passport for a Bahamas cruise?',
      answer:
        "For closed-loop cruises (round-trip from US), you can use a birth certificate and driver's license. However, we strongly recommend a passport for emergencies and easier re-entry. Passports are required for fly-cruise packages.",
    },
    {
      question: 'Which Florida port is best for Bahamas cruises?',
      answer:
        'Miami and Fort Lauderdale offer the most options with daily departures. Port Canaveral (Orlando) is convenient for combining with theme parks. Jacksonville and Tampa offer longer, less crowded cruises to the Bahamas.',
    },
    {
      question: 'What is the best cruise length for first-timers?',
      answer:
        'A 3-4 day Bahamas cruise is perfect for first-timers to experience cruising without a long commitment. These short cruises visit Nassau and a private island, giving you a taste of the cruise lifestyle.',
    },
  ],
}

export const hawaiiCruise: CruiseDestination = {
  id: 'hawaii',
  name: 'Hawaii Cruises',
  slug: 'hawaii',
  metaTitle: 'Hawaii Cruises 2025 | 7-15 Day Island Hopping from $1,499',
  metaDescription:
    'Experience all Hawaiian islands on one cruise. Maui, Kauai, Big Island & Oahu. NCL Pride of America plus repositioning cruises. No flying between islands. Call 833-874-1019.',
  searchVolume: 18100,
  heroTitle: 'Experience All of Hawaii by Cruise Ship',
  heroDescription:
    'Visit four Hawaiian islands in one trip without the hassle of inter-island flights. Experience diverse landscapes, from active volcanoes to pristine beaches, all while unpacking just once.',
  highlights: [
    'Visit 4 islands in 7 days',
    'No inter-island flights needed',
    'Overnight stays in Maui and Kauai',
    'Year-round departures from Honolulu',
    '15-day cruises from mainland US',
  ],
  popularPorts: [
    {
      name: 'Honolulu (Oahu)',
      country: 'Hawaii',
      description: 'State capital with Pearl Harbor and Waikiki Beach',
      attractions: ['Pearl Harbor', 'Diamond Head', 'Waikiki Beach', 'Polynesian Cultural Center'],
    },
    {
      name: 'Kahului (Maui)',
      country: 'Hawaii',
      description: 'Valley Isle with road to Hana and Haleakala',
      attractions: [
        'Road to Hana',
        'Haleakala Sunrise',
        'Snorkeling at Molokini',
        'Old Lahaina Town',
      ],
    },
    {
      name: 'Nawiliwili (Kauai)',
      country: 'Hawaii',
      description: 'Garden Isle with dramatic cliffs and canyons',
      attractions: ['Napali Coast', 'Waimea Canyon', 'Wailua River', 'Poipu Beach'],
    },
    {
      name: 'Hilo (Big Island)',
      country: 'Hawaii',
      description: 'Tropical side with waterfalls and rainforests',
      attractions: [
        'Volcanoes National Park',
        'Rainbow Falls',
        'Akaka Falls',
        'Black sand beaches',
      ],
    },
    {
      name: 'Kona (Big Island)',
      country: 'Hawaii',
      description: 'Sunny side with coffee farms and historic sites',
      attractions: [
        'Kona coffee farms',
        'Captain Cook monument',
        "Pu'uhonua o Honaunau",
        'Manta ray diving',
      ],
    },
  ],
  cruiseLines: [
    {
      name: 'Norwegian Cruise Line',
      ships: ['Pride of America'],
      specialties: ['Only US-flagged ship', 'Year-round Hawaii', 'Freestyle cruising'],
    },
    {
      name: 'Princess Cruises',
      ships: ['Ruby Princess', 'Grand Princess'],
      specialties: ['15-day round trips', 'Pacific crossings', 'Enrichment programs'],
    },
    {
      name: 'Celebrity Cruises',
      ships: ['Celebrity Eclipse', 'Celebrity Solstice'],
      specialties: ['Upscale experience', 'Culinary focus', 'Modern luxury'],
    },
    {
      name: 'Holland America',
      ships: ['Koningsdam', 'Eurodam'],
      specialties: ['Circle Pacific cruises', 'Cultural immersion', 'Longer itineraries'],
    },
  ],
  bestTimeToVisit: [
    {
      season: 'Spring',
      months: ['April', 'May'],
      reason: 'Fewer crowds, good weather, whale watching',
    },
    {
      season: 'Fall',
      months: ['September', 'October', 'November'],
      reason: 'Best prices, perfect weather, harvest festivals',
    },
    {
      season: 'Winter',
      months: ['December', 'January', 'February', 'March'],
      reason: 'Whale watching season, escape mainland winter',
    },
  ],
  averageDuration: '7-15 days',
  priceRange: {
    min: 1499,
    max: 5999,
    currency: 'USD',
  },
  activities: [
    'Volcano tours and lava viewing',
    'Snorkeling with sea turtles',
    'Traditional luau experiences',
    'Helicopter tours',
    'Waterfall hikes',
    'Beach time at world-famous shores',
    'Coffee and pineapple plantation tours',
    'Pearl Harbor memorial visit',
  ],
  whyChooseUs: [
    'Exclusive Pride of America rates',
    'Pre-cruise Waikiki hotel packages',
    'Shore excursion bundles save 20%',
    'Inter-island cruise specialists',
    'Repositioning cruise deals from mainland',
    'Hawaii honeymoon packages',
    'Group rates for Hawaii cruises',
    'Local Hawaiian guides network',
  ],
  faqs: [
    {
      question: 'What makes Hawaii cruises unique?',
      answer:
        'Hawaii cruises are the only way to see multiple Hawaiian islands without booking inter-island flights and changing hotels. The NCL Pride of America is the only cruise ship that sails exclusively in Hawaii year-round, offering overnight port stays.',
    },
    {
      question: 'Should I cruise one-way or round-trip to Hawaii?',
      answer:
        'Round-trip from the mainland (15+ days) includes relaxing sea days but requires more time. One-way repositioning cruises (7-10 days) are faster but require flights. The 7-day Pride of America cruise from Honolulu focuses solely on Hawaii.',
    },
    {
      question: 'When can I see whales in Hawaii?',
      answer:
        'Humpback whale season runs from December through April, with peak sightings in January-March. Hawaii cruises during this time often include whale watching from the ship and offer specialized whale watching excursions in Maui.',
    },
  ],
}

export const caribbeanCruise: CruiseDestination = {
  id: 'caribbean',
  name: 'Caribbean Cruises',
  slug: 'caribbean',
  metaTitle: 'Caribbean Cruises 2025 | Eastern, Western & Southern Routes from $599',
  metaDescription:
    'Discover paradise with Caribbean cruises. Eastern, Western & Southern routes to pristine beaches, crystal waters & vibrant cultures. Save up to 75% - Call 833-874-1019.',
  searchVolume: 60500,
  heroTitle: 'Caribbean Cruises: Your Gateway to Paradise',
  heroDescription:
    'Explore turquoise waters, white sand beaches, and vibrant island cultures with our exclusive Caribbean cruise packages.',
  highlights: [
    'Year-round sunshine and warm weather',
    'Visit multiple islands in one trip',
    'World-class beaches and water sports',
    'Duty-free shopping opportunities',
    'Family-friendly and romantic options',
  ],
  popularPorts: [
    {
      name: 'Cozumel',
      country: 'Mexico',
      description: "Mexico's premier island destination with world-class diving",
      attractions: ['Tulum ruins', 'Chankanaab Beach Park', 'Coral reefs', 'Mayan culture'],
    },
    {
      name: 'St. Thomas',
      country: 'USVI',
      description: 'Shopping paradise with stunning beaches',
      attractions: ['Magens Bay', 'Paradise Point Skyride', 'Coral World', 'Duty-free shopping'],
    },
    {
      name: 'Grand Cayman',
      country: 'Cayman Islands',
      description: 'Famous for Stingray City and Seven Mile Beach',
      attractions: ['Stingray City', 'Seven Mile Beach', 'Turtle Centre', 'Rum distillery'],
    },
    {
      name: 'Jamaica',
      country: 'Jamaica',
      description: 'Reggae culture and adventure activities',
      attractions: ["Dunn's River Falls", 'Blue Mountain coffee', 'Bamboo rafting', "Rick's Cafe"],
    },
    {
      name: 'Aruba',
      country: 'Aruba',
      description: 'One happy island with perfect beaches',
      attractions: ['Eagle Beach', 'Natural Pool', 'Ostrich farm', 'Butterfly farm'],
    },
  ],
  cruiseLines: [
    {
      name: 'Royal Caribbean',
      ships: ['Icon of the Seas', 'Wonder of the Seas', 'Symphony of the Seas'],
      specialties: ['Largest ships', 'Perfect Day at CocoCay', 'Entertainment'],
    },
    {
      name: 'Carnival Cruise Line',
      ships: ['Mardi Gras', 'Carnival Celebration', 'Carnival Horizon'],
      specialties: ['Fun ships', 'Best value', 'Family-friendly'],
    },
    {
      name: 'Norwegian Cruise Line',
      ships: ['Norwegian Prima', 'Norwegian Bliss', 'Norwegian Getaway'],
      specialties: ['Freestyle cruising', 'Great Stirrup Cay', 'The Haven suites'],
    },
    {
      name: 'Celebrity Cruises',
      ships: ['Celebrity Beyond', 'Celebrity Edge', 'Celebrity Apex'],
      specialties: ['Modern luxury', 'Culinary excellence', 'Adults-focused'],
    },
  ],
  bestTimeToVisit: [
    {
      season: 'Peak Season',
      months: ['December', 'January', 'February', 'March', 'April'],
      reason: 'Perfect weather, low humidity, minimal rain',
    },
    {
      season: 'Shoulder Season',
      months: ['May', 'November'],
      reason: 'Great weather, fewer crowds, better prices',
    },
    {
      season: 'Hurricane Season',
      months: ['June', 'July', 'August', 'September', 'October'],
      reason: 'Lower prices, fewer crowds, weather risk',
    },
  ],
  averageDuration: '7 days',
  priceRange: {
    min: 599,
    max: 2999,
    currency: 'USD',
  },
  activities: [
    'Beach relaxation and swimming',
    'Snorkeling and scuba diving',
    'Water sports and parasailing',
    'Island tours and cultural experiences',
    'Zip-lining and adventure parks',
    'Duty-free shopping',
    'Local cuisine tasting',
    'Historical site visits',
  ],
  whyChooseUs: [
    'Exclusive group rates save 20-50%',
    'Free cabin upgrades available',
    'Onboard credits up to $500',
    'Beverage packages included deals',
    'Shore excursion discounts',
    'Price match guarantee',
    'Caribbean cruise specialists',
    '24/7 support during travel',
  ],
  faqs: [
    {
      question: 'What is the difference between Eastern and Western Caribbean?',
      answer:
        'Eastern Caribbean focuses on islands like St. Thomas, St. Maarten, and Puerto Rico, known for beaches and shopping. Western Caribbean includes Cozumel, Jamaica, and Grand Cayman, offering more adventure and Mayan culture. Southern Caribbean features Aruba, Barbados, and Curacao with more exotic, less-traveled destinations.',
    },
    {
      question: 'Do I need a passport for a Caribbean cruise?',
      answer:
        "For closed-loop cruises from the US, you can use a birth certificate and driver's license, but we strongly recommend a passport for flexibility and emergencies. Some islands require passports, and you'll need one if flying to or from a port.",
    },
    {
      question: 'What is included in the cruise price?',
      answer:
        'Your cruise fare includes accommodation, main dining room meals, buffet, entertainment, pools, and fitness center. Not included are gratuities ($14-16/day), alcoholic beverages, specialty restaurants, spa services, shore excursions, and internet access.',
    },
  ],
}

export const alaskaCruise: CruiseDestination = {
  id: 'alaska',
  name: 'Alaska Cruises',
  slug: 'alaska',
  metaTitle: 'Alaska Cruises 2025 | Glacier Bay, Inside Passage & Wildlife from $799',
  metaDescription:
    'Experience the last frontier with Alaska cruises. Glacier Bay, Inside Passage, whales & bears. Expert planning & exclusive deals. Call 833-874-1019.',
  searchVolume: 74000,
  heroTitle: 'Alaska Cruises: Journey to the Last Frontier',
  heroDescription:
    'Witness towering glaciers, majestic wildlife, and breathtaking landscapes on an unforgettable Alaskan adventure.',
  highlights: [
    'Spectacular glacier viewing',
    'Incredible wildlife sightings',
    'Scenic Inside Passage cruising',
    'Gold Rush history',
    'Unique shore excursions',
  ],
  popularPorts: [
    {
      name: 'Juneau',
      country: 'USA',
      description: "Alaska's capital with glaciers and whale watching",
      attractions: [
        'Mendenhall Glacier',
        'Whale watching',
        'Dog sledding',
        'Mount Roberts Tramway',
      ],
    },
    {
      name: 'Ketchikan',
      country: 'USA',
      description: 'First City with Native culture and salmon',
      attractions: ['Creek Street', 'Totem poles', 'Misty Fjords', 'Great Alaskan Lumberjack Show'],
    },
    {
      name: 'Skagway',
      country: 'USA',
      description: 'Gold Rush town with historic railway',
      attractions: ['White Pass Railway', 'Klondike Gold Rush', 'Dog mushing', 'Yukon territory'],
    },
    {
      name: 'Glacier Bay',
      country: 'USA',
      description: 'UNESCO World Heritage Site with 16 glaciers',
      attractions: ['Margerie Glacier', 'Wildlife viewing', 'Ranger programs', 'Scenic cruising'],
    },
    {
      name: 'Sitka',
      country: 'USA',
      description: 'Russian heritage and wildlife',
      attractions: [
        "Russian Bishop's House",
        'Fortress of the Bear',
        'Sea otter quest',
        'Raptor center',
      ],
    },
  ],
  cruiseLines: [
    {
      name: 'Princess Cruises',
      ships: ['Discovery Princess', 'Ruby Princess', 'Sapphire Princess'],
      specialties: ['Alaska expertise', 'Glacier Bay permits', 'Naturalist programs'],
    },
    {
      name: 'Holland America',
      ships: ['Koningsdam', 'Eurodam', 'Noordam'],
      specialties: ['75+ years in Alaska', 'Land tours', 'Culinary excellence'],
    },
    {
      name: 'Norwegian Cruise Line',
      ships: ['Norwegian Bliss', 'Norwegian Jewel', 'Norwegian Sun'],
      specialties: ['Freestyle cruising', 'Observation lounges', 'Alaska-themed activities'],
    },
    {
      name: 'Royal Caribbean',
      ships: ['Ovation of the Seas', 'Quantum of the Seas', 'Radiance of the Seas'],
      specialties: ['Family programs', 'North Star viewing pod', 'Adventure activities'],
    },
  ],
  bestTimeToVisit: [
    {
      season: 'Peak Season',
      months: ['June', 'July', 'August'],
      reason: 'Warmest weather, longest days, all excursions available',
    },
    {
      season: 'Shoulder Season',
      months: ['May', 'September'],
      reason: 'Cooler temps, fewer crowds, good wildlife viewing, lower prices',
    },
    {
      season: 'Special Interest',
      months: ['September'],
      reason: 'Northern Lights possible, fall colors, salmon runs',
    },
  ],
  averageDuration: '7 days',
  priceRange: {
    min: 799,
    max: 3999,
    currency: 'USD',
  },
  activities: [
    'Glacier viewing and calving',
    'Whale watching tours',
    'Dog sledding on glaciers',
    'Helicopter glacier landings',
    'Wildlife spotting (bears, eagles, seals)',
    'Salmon fishing',
    'Native cultural experiences',
    'Gold panning and mining tours',
  ],
  whyChooseUs: [
    'Best Alaska cruise rates guaranteed',
    'Exclusive Glacier Bay permits',
    'Pre and post cruise land packages',
    'Wildlife viewing guarantees',
    'Local Alaskan guides',
    'Specialty dining credits',
    'Photography workshop cruises',
    'Small group shore excursions',
  ],
  faqs: [
    {
      question: 'What should I pack for an Alaska cruise?',
      answer:
        'Pack layers including waterproof jacket and pants, warm fleece, comfortable walking shoes, hat and gloves, binoculars for wildlife, camera, and sunscreen. Weather can change quickly, and mornings/evenings are cool even in summer.',
    },
    {
      question: 'Which side of the ship is best for Alaska?',
      answer:
        'For northbound cruises, book starboard (right side) for best coastal views. For southbound, choose port (left side). However, ships often turn for optimal viewing of glaciers and wildlife, so both sides get great views.',
    },
    {
      question: 'Is a balcony worth it for Alaska?',
      answer:
        "Yes! A balcony is highly recommended for Alaska cruises. You'll enjoy private glacier viewing, wildlife spotting from your room, and the stunning Inside Passage scenery without crowds on deck.",
    },
  ],
}

export const cruiseDestinations: CruiseDestination[] = [
  mediterraneanCruise,
  europeanCruise,
  bahamasCruise,
  hawaiiCruise,
  caribbeanCruise,
  alaskaCruise,
]

export const getCruiseDestinationBySlug = (slug: string): CruiseDestination | undefined => {
  return cruiseDestinations.find((destination) => destination.slug === slug)
}

export const getCruiseDestinationById = (id: string): CruiseDestination | undefined => {
  return cruiseDestinations.find((destination) => destination.id === id)
}
