/**
 * Promotional Deals Data
 * Structure for limited-time cruise and travel deals
 */

export interface PromotionalDeal {
  slug: string
  title: string
  subtitle: string
  validFrom: string
  validUntil: string
  hero: {
    headline: string
    subheadline: string
    imageUrl: string
    imageAlt: string
  }
  savings: {
    icon: string
    title: string
    description: string
    highlight: string
  }[]
  destinations: {
    name: string
    imageUrl: string
    description: string
    departurePort: string
    cruiseLines: string[]
    startingPrice: number
  }[]
  upgrades: {
    name: string
    description: string
    features: string[]
    value: string
  }[]
  shoreExcursions: {
    title: string
    description: string
    examples: string[]
  }
  contact: {
    phone: string
    email: string
    availability: string
  }
  terms: {
    restrictions: string[]
    promoCodes: {
      name: string
      code: string
    }[]
    campaignCode: string
    depositInfo: string
    additionalInfo: string[]
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export const earlyBooking2027Deal: PromotionalDeal = {
  slug: 'early-booking-2027-2028',
  title: 'Early Booking Bonus 2027/2028',
  subtitle: 'Book Now & Save Big on Your Next Cruise Adventure',
  validFrom: '2025-10-09',
  validUntil: '2025-10-31',
  hero: {
    headline: 'Early Booking Bonus: Save Up to 40% + Exclusive Perks',
    subheadline: 'Book 2027/2028 cruises from Newark & receive instant savings, free upgrades, and more',
    imageUrl: 'https://images.pexels.com/photos/13458326/pexels-photo-13458326.jpeg?auto=compress&cs=tinysrgb&w=1920',
    imageAlt: 'Luxury cruise ship at sunset - exclusive early booking deal from Next Trip Anywhere',
  },
  savings: [
    {
      icon: '💰',
      title: 'Up to 40% Off',
      description: 'Save up to 40% off select cruise fares',
      highlight: 'Launch Fare Discount',
    },
    {
      icon: '🎁',
      title: 'Up to $200 Instant Savings',
      description: '$100 per guest instant savings on qualifying cruises',
      highlight: 'Per Stateroom',
    },
    {
      icon: '⬆️',
      title: 'FREE Room Upgrade',
      description: 'Book the stateroom you want at a lower category price',
      highlight: 'Subject to Availability',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'FREE 3rd & 4th Guests',
      description: 'Bring the whole family on select voyages at no extra cost',
      highlight: 'Select Sailings',
    },
  ],
  destinations: [
    {
      name: 'Caribbean Paradise',
      imageUrl: '/images/destinations/caribbean.jpg',
      description: 'Turquoise waters, white sand beaches, and island hopping adventures',
      departurePort: 'Cape Liberty (Bayonne, NJ)',
      cruiseLines: ['Royal Caribbean', 'Norwegian', 'Carnival'],
      startingPrice: 599,
    },
    {
      name: 'Bermuda Getaway',
      imageUrl: '/images/destinations/bermuda.jpg',
      description: 'Pink sand beaches and British charm just a short cruise from NJ',
      departurePort: 'Cape Liberty (Bayonne, NJ)',
      cruiseLines: ['Norwegian', 'Celebrity', 'Carnival'],
      startingPrice: 499,
    },
    {
      name: 'Europe & Mediterranean',
      imageUrl: '/images/destinations/mediterranean.jpg',
      description: 'Explore ancient cities, coastal villages, and historic ports',
      departurePort: 'Newark to Barcelona/Rome',
      cruiseLines: ['Princess', 'Celebrity', 'Royal Caribbean'],
      startingPrice: 1299,
    },
    {
      name: 'Alaska Adventure',
      imageUrl: '/images/destinations/alaska.jpg',
      description: 'Glaciers, wildlife, and breathtaking natural beauty',
      departurePort: 'Newark to Seattle',
      cruiseLines: ['Princess', 'Holland America', 'Norwegian'],
      startingPrice: 899,
    },
    {
      name: 'Hawaii Islands',
      imageUrl: '/images/destinations/hawaii.jpg',
      description: 'Volcanoes, waterfalls, and Aloha spirit across multiple islands',
      departurePort: 'Newark to Honolulu',
      cruiseLines: ['Norwegian', 'Princess', 'Holland America'],
      startingPrice: 1199,
    },
    {
      name: 'Mexico Riviera',
      imageUrl: '/images/destinations/mexico.jpg',
      description: 'Ancient ruins, vibrant culture, and Pacific Coast charm',
      departurePort: 'Los Angeles (from Newark)',
      cruiseLines: ['Princess', 'Carnival', 'Royal Caribbean'],
      startingPrice: 699,
    },
  ],
  upgrades: [
    {
      name: 'All-Inclusive Beverage Package',
      description: 'Unlimited drinks throughout your cruise',
      features: [
        'Premium cocktails, beer, and wine',
        'Specialty coffees and juices',
        'Bottled water and soft drinks',
        'No daily limits',
      ],
      value: 'Up to $400 value',
    },
    {
      name: 'Premium Wi-Fi Package',
      description: 'Stay connected at sea with high-speed internet',
      features: [
        'Stream movies and music',
        'Video calls with family',
        'All devices included',
        'Works fleet-wide',
      ],
      value: 'Up to $200 value',
    },
    {
      name: 'Specialty Dining Package',
      description: 'Enjoy gourmet meals at premium restaurants',
      features: [
        '3-5 specialty restaurant meals',
        'Steakhouse, Italian, Asian fusion',
        'Priority reservations',
        'Wine pairings available',
      ],
      value: 'Up to $300 value',
    },
    {
      name: 'Shore Excursion Credits',
      description: 'Explore destinations with guided tours',
      features: [
        '$200-$400 onboard credit',
        'Apply to any shore excursion',
        'Snorkeling, sightseeing, adventure tours',
        'Book onboard or in advance',
      ],
      value: 'Up to $400 value',
    },
  ],
  shoreExcursions: {
    title: 'Your Adventure Continues on Shore',
    description: 'Brand new shore excursions extend the memory-making beyond the ship, with choices for every passion, preference, and pace.',
    examples: [
      'Snorkeling in crystal-clear Caribbean waters',
      'Historic walking tours of European cities',
      'Glacier hiking and wildlife watching in Alaska',
      'Beach clubs and water sports in Mexico',
      'Volcano exploration and cultural experiences in Hawaii',
    ],
  },
  contact: {
    phone: '833-874-1019',
    email: 'info@nexttripanywhere.com',
    availability: 'Monday-Friday: 9 AM - 8 PM ET | Saturday-Sunday: 10 AM - 6 PM ET',
  },
  terms: {
    restrictions: [
      'Available to residents of the United States 21 years and older',
      'Offers valid 10/09/2025 - 10/31/2025 on select, capacity-controlled cruises',
      'Cannot be combined with other offers; exclusions may apply',
      'Deposit required; amount varies by sailing and cruise line',
      'Subject to availability; Next Trip Anywhere may modify or revoke offers at any time',
    ],
    promoCodes: [
      { name: 'Base Discount Code', code: 'EARLY2027' },
      { name: 'Free Room Upgrade Code', code: 'UPGRADE27' },
      { name: 'Free 3rd & 4th Guests', code: 'FAMILY27' },
      { name: 'Loyalty Bonus Code', code: 'LOYALTY200' },
    ],
    campaignCode: 'NTA-EB-2027',
    depositInfo: 'Deposit amount varies by cruise line and sailing date. Typically $250-$500 per person for standard staterooms.',
    additionalInfo: [
      'Up to 40% off discount applies to select sailings and stateroom categories',
      'Instant savings of up to $200 per stateroom ($100 per guest) on qualifying 9+ day voyages',
      'Free room upgrade applies to like-to-like stateroom types (Interior to Interior, Balcony to Balcony, etc.)',
      'Excludes upgrades to premium categories, suites, or Sanctuary Collection rooms',
      'Free 3rd & 4th guests available on select departures; ask your travel advisor for details',
      'Pricing is per person based on double occupancy',
      'Government taxes, fees, and port charges are additional',
    ],
  },
  seo: {
    metaTitle: 'Save Up to 40% on 2027/2028 Cruises from Newark | Early Booking Deal - Next Trip Anywhere',
    metaDescription: 'Limited-time offer: Book early & save up to 40% + get $200 instant savings, free upgrades & more on cruises from Newark. Expires 10/31/25. Call 833-874-1019 today!',
    keywords: [
      'cruise deals 2027',
      'early booking cruise discount',
      'cruises from newark nj',
      'caribbean cruise deals',
      'bermuda cruise from newark',
      'alaska cruise 2027',
      'cruise sale 40% off',
      'free cruise upgrades',
      'essex county cruise deals',
    ],
  },
}

export const promotionalDeals: PromotionalDeal[] = [earlyBooking2027Deal]
