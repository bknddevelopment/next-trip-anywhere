/**
 * Featured Travel Deals
 *
 * Central data source for promotional cruise and vacation deals
 */

export interface FeaturedDeal {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  dealType: 'cruise' | 'package' | 'tour' | 'flight-hotel';
  provider: string;
  featured: boolean;
  active: boolean;
  startDate: string;
  endDate: string;
  searchVolume?: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  content: {
    hero: {
      headline: string;
      subheadline: string;
      image: string;
      imageAlt: string;
    };
    overview: string;
    highlights: string[];
    pricing: {
      startingPrice: number;
      currency: string;
      priceIncludes: string[];
      priceNote: string;
    };
    itinerary?: {
      duration: string;
      departurePort: string;
      visitingPorts: string[];
      dayByDay?: {
        day: number;
        port: string;
        description: string;
      }[];
    };
    sailingDates?: string[];
    whyBookWithUs: string[];
    localAngle: string;
    urgencyMessage: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  lastUpdated: string;
}

export const featuredDeals: Record<string, FeaturedDeal> = {
  'msc-alaska-2026-summer-cruise': {
    slug: 'msc-alaska-2026-summer-cruise',
    title: 'MSC Alaska Cruise 2026 | 7-Night Summer Sailings from $739',
    metaTitle: 'Alaska Cruise Deal 2026: 7 Nights from $739 | Book from Newark NJ',
    metaDescription: 'Explore Alaska aboard MSC Poesia! 7-night cruises from Seattle starting at $739pp. Multiple summer 2026 dates. Book through Essex County travel experts. Call 833-874-1019',
    keywords: [
      'Alaska cruise deals 2026',
      'MSC Alaska cruise',
      '7 night Alaska cruise',
      'Alaska cruise from Seattle',
      'summer Alaska cruise 2026',
      'Alaska cruise from Newark NJ',
      'MSC Poesia Alaska',
      'affordable Alaska cruise',
    ],
    dealType: 'cruise',
    provider: 'MSC Cruises',
    featured: true,
    active: true,
    startDate: '2026-05-01',
    endDate: '2026-09-15',
    searchVolume: 74000,
    priority: 'HIGH',
    content: {
      hero: {
        headline: 'Alaska Summer Cruise Deal 2026',
        subheadline: '7 Nights aboard MSC Poesia from $739 per person',
        image: '/images/deals/alaska-cruise-2026.jpg',
        imageAlt: 'MSC Poesia Alaska Cruise - Glacier views and stunning scenery',
      },
      overview: `Discover the breathtaking beauty of Alaska in summer 2026 aboard the magnificent MSC Poesia. This incredible 7-night roundtrip cruise from Seattle takes you through some of Alaska's most stunning destinations, including the majestic Tracy Arm Fjord, charming Ketchikan, historic Juneau, and picturesque Victoria, Canada. With sailings available throughout the peak Alaska season (May through September 2026), you'll experience the midnight sun, incredible wildlife, and glacial wonders that make Alaska one of the world's premier cruise destinations.`,
      highlights: [
        '7-night roundtrip cruise from Seattle, Washington',
        'Starting from just $739 per person (all fees and taxes included)',
        'Visit 5 incredible destinations including Juneau, Ketchikan, and Victoria',
        'Scenic cruising through the breathtaking Tracy Arm Fjord',
        'Multiple sailing dates: May through September 2026',
        'Aboard the beautiful MSC Poesia with world-class amenities',
        'Perfect for wildlife viewing: whales, bears, eagles, and more',
        'Personalized service from your Essex County travel experts',
      ],
      pricing: {
        startingPrice: 739,
        currency: 'USD',
        priceIncludes: [
          'All port fees and taxes',
          '7 nights accommodation aboard MSC Poesia',
          'All main dining room meals',
          'Access to ship amenities and entertainment',
          'Port calls at 5 amazing destinations',
        ],
        priceNote: 'Prices are per person based on double occupancy. Additional costs may include gratuities, specialty dining, shore excursions, and beverages.',
      },
      itinerary: {
        duration: '7 nights',
        departurePort: 'Seattle, Washington',
        visitingPorts: [
          'Seattle, Washington',
          'Ketchikan, Alaska',
          'Icy Strait Point, Alaska',
          'Tracy Arm Fjord, Alaska (scenic cruising)',
          'Juneau, Alaska',
          'Victoria, British Columbia, Canada',
          'Seattle, Washington',
        ],
        dayByDay: [
          {
            day: 1,
            port: 'Seattle, Washington',
            description: 'Board the MSC Poesia in Seattle and settle into your stateroom as you prepare for an unforgettable Alaskan adventure. Explore the ship\'s amenities and enjoy your first evening at sea.',
          },
          {
            day: 2,
            port: 'At Sea',
            description: 'Relax and enjoy a full day at sea as you cruise through the Inside Passage. Take advantage of the ship\'s pools, spa, entertainment, and dining options while scenic Pacific Northwest coastline glides by.',
          },
          {
            day: 3,
            port: 'Ketchikan, Alaska',
            description: 'Known as the "Salmon Capital of the World," Ketchikan offers stunning totem poles, charming Creek Street, and incredible opportunities for salmon fishing. Optional shore excursions include wildlife viewing and cultural experiences.',
          },
          {
            day: 4,
            port: 'Icy Strait Point, Alaska',
            description: 'Experience authentic Alaskan culture at this pristine destination. Go whale watching (humpback whales are frequently spotted!), visit the historic cannery, or try the world\'s longest zipline for thrill-seekers.',
          },
          {
            day: 5,
            port: 'Tracy Arm Fjord (Scenic Cruising)',
            description: 'Witness one of Alaska\'s most spectacular natural wonders as you cruise through this narrow fjord surrounded by towering granite cliffs, cascading waterfalls, and the magnificent Sawyer Glaciers. Keep your camera ready for seals, eagles, and possible whale sightings.',
          },
          {
            day: 6,
            port: 'Juneau, Alaska',
            description: 'Alaska\'s capital city offers stunning Mendenhall Glacier, excellent whale watching, and the historic Mt. Roberts Tramway with panoramic views. Don\'t miss the chance to visit a real Alaskan glacier up close!',
          },
          {
            day: 7,
            port: 'Victoria, British Columbia, Canada',
            description: 'This charming British colonial city features the famous Butchart Gardens, historic Inner Harbour, and elegant afternoon tea at the Fairmont Empress Hotel. Stroll the waterfront and enjoy Victoria\'s European charm.',
          },
          {
            day: 8,
            port: 'Seattle, Washington',
            description: 'Disembark in Seattle with incredible memories of your Alaskan adventure. Consider extending your stay to explore Seattle\'s Pike Place Market, Space Needle, and vibrant neighborhoods.',
          },
        ],
      },
      sailingDates: [
        'May 11, 2026',
        'May 18, 2026',
        'May 25, 2026',
        'June 1, 2026',
        'June 8, 2026',
        'June 15, 2026',
        'June 22, 2026',
        'June 29, 2026',
        'July 6, 2026',
        'July 13, 2026',
        'July 20, 2026',
        'July 27, 2026',
        'August 3, 2026',
        'August 10, 2026',
        'August 17, 2026',
        'August 24, 2026',
        'August 31, 2026',
        'September 7, 2026',
        'September 14, 2026',
      ],
      whyBookWithUs: [
        'Expert guidance from Essex County travel specialists who know Alaska cruising',
        'Assistance with flights from Newark Liberty International Airport (EWR) to Seattle',
        'Pre- and post-cruise hotel arrangements in Seattle',
        'Comprehensive travel insurance options tailored to your needs',
        'Shore excursion recommendations and booking assistance',
        'Group booking discounts for families and friends traveling together',
        '24/7 support before, during, and after your cruise',
        'Price matching and best rate guarantees',
        'Flexible payment plans available',
      ],
      localAngle: 'Traveling from Essex County or the Newark area? We specialize in helping New Jersey travelers plan seamless Alaska cruise vacations. Let us handle all the details - from finding the best flights from Newark Liberty International Airport to Seattle, to arranging convenient hotel stays and transfers. As your local travel experts based in New Jersey, we understand the unique needs of Northeast travelers heading to the West Coast for Alaska cruises.',
      urgencyMessage: 'Cabins are selling fast for these popular summer 2026 Alaska sailings! Best cabin selection and pricing available when you book early. Contact us today to secure your spot.',
    },
    faq: [
      {
        question: 'What is included in the $739 per person price?',
        answer: 'The $739 per person price includes your 7-night cruise accommodation, all main dining room meals, access to ship amenities and entertainment, all port fees and taxes, and port calls at 5 incredible destinations. Additional costs may include gratuities (approximately $16 per person per day), specialty dining, shore excursions, beverages, and spa services.',
      },
      {
        question: 'How do I get from Newark, NJ to Seattle for the cruise?',
        answer: 'We can help you find the best flights from Newark Liberty International Airport (EWR) to Seattle-Tacoma International Airport (SEA). Most non-stop flights take approximately 6 hours. We recommend arriving at least one day before your cruise departure to account for any travel delays. We can also arrange pre-cruise hotel accommodations in Seattle.',
      },
      {
        question: 'What is the best time to cruise Alaska?',
        answer: 'The Alaska cruise season runs from May through September, with each month offering unique experiences. May and September offer great value with fewer crowds, while June through August provide the warmest weather and longest daylight hours. July and August are peak season with the best weather for wildlife viewing.',
      },
      {
        question: 'What should I pack for an Alaska cruise?',
        answer: 'Pack layers! Alaska weather can be unpredictable. Bring waterproof jackets, comfortable walking shoes, binoculars for wildlife viewing, sunscreen, and warm layers including fleeces and light sweaters. Don\'t forget your camera and formal attire for elegant evening dining if desired.',
      },
      {
        question: 'Can you help with shore excursions?',
        answer: 'Absolutely! We can help you book shore excursions in advance or provide recommendations for each port. Popular options include whale watching in Juneau, salmon fishing in Ketchikan, glacier helicopter tours, dog sledding experiences, and cultural tours of native Alaskan villages.',
      },
      {
        question: 'Is travel insurance recommended for this cruise?',
        answer: 'Yes, we strongly recommend travel insurance for Alaska cruises. Insurance can protect your investment against trip cancellations, medical emergencies, travel delays, and lost luggage. We offer comprehensive travel insurance options tailored to cruise travelers. See our travel insurance guide for detailed information.',
      },
      {
        question: 'What cabin types are available and how do I choose?',
        answer: 'MSC Poesia offers interior, oceanview, balcony, and suite staterooms. For Alaska cruises, we highly recommend balcony cabins so you can enjoy the spectacular scenery from your private outdoor space. Contact us to discuss which cabin category best fits your needs and budget.',
      },
      {
        question: 'Are there any additional fees I should know about?',
        answer: 'Beyond the cruise fare, you should budget for gratuities (approximately $16/person/day), specialty dining if desired, beverages, shore excursions, spa services, and travel to/from Seattle. We provide a complete breakdown of expected costs when you book with us.',
      },
      {
        question: 'Can I extend my trip to explore Seattle?',
        answer: 'Yes! Many travelers add a few days in Seattle before or after the cruise. We can arrange hotel accommodations and help you plan your Seattle itinerary including visits to Pike Place Market, the Space Needle, Chihuly Garden and Glass, and more.',
      },
      {
        question: 'How do I book this Alaska cruise deal?',
        answer: 'Call us today at 833-874-1019 to speak with one of our Alaska cruise specialists, or fill out our contact form and we\'ll reach out to you within 24 hours. We\'ll help you select the perfect sailing date, cabin type, and arrange all travel details for your Essex County departure.',
      },
    ],
    lastUpdated: '2025-10-11',
  },
};

// Helper function to get active deals
export function getActiveDeals(): FeaturedDeal[] {
  return Object.values(featuredDeals).filter((deal) => deal.active);
}

// Helper function to get featured deals
export function getFeaturedDeals(): FeaturedDeal[] {
  return Object.values(featuredDeals).filter((deal) => deal.featured && deal.active);
}

// Helper function to get deal by slug
export function getDealBySlug(slug: string): FeaturedDeal | undefined {
  return featuredDeals[slug];
}
