// Service types and data for Essex County luxury transportation services

export interface ServiceType {
  id: string
  name: string
  shortDescription: string
  longDescription: string
  keywords: string[]
  benefits: string[]
  vehicles: string[]
  priceRange: {
    min: number
    max: number
    unit: string
  }
  popularDestinations?: string[]
  serviceFeatures: string[]
  idealFor: string[]
}

export const essexCountyServices: ServiceType[] = [
  {
    id: 'airport-transfers',
    name: 'Airport Transfers',
    shortDescription:
      'Premium airport transportation to Newark, JFK, LaGuardia, and Philadelphia airports',
    longDescription:
      'Experience stress-free airport transfers with our luxury fleet. Our professional chauffeurs ensure punctual pickups and drop-offs, with real-time flight monitoring and meet-and-greet services. Perfect for business travelers and families seeking reliable transportation to major airports.',
    keywords: [
      'airport transfer',
      'airport limo service',
      'Newark airport transportation',
      'JFK airport transfer',
      'LaGuardia transportation',
      'luxury airport shuttle',
      'private airport car service',
      'executive airport transfer',
    ],
    benefits: [
      'Flight tracking for on-time service',
      'Meet and greet at baggage claim',
      'Free waiting time included',
      'Door-to-door service',
      '24/7 availability',
      'Luggage assistance',
    ],
    vehicles: ['Executive Sedan', 'Luxury SUV', 'Mercedes Sprinter Van', 'Stretch Limousine'],
    priceRange: {
      min: 75,
      max: 350,
      unit: 'per trip',
    },
    popularDestinations: [
      'Newark Liberty International Airport (EWR)',
      'John F. Kennedy International Airport (JFK)',
      'LaGuardia Airport (LGA)',
      'Philadelphia International Airport (PHL)',
      'Teterboro Airport (TEB)',
    ],
    serviceFeatures: [
      'Real-time flight monitoring',
      'Complimentary bottled water',
      'WiFi available',
      'Child car seats upon request',
      'Newspaper and magazines',
      'Phone chargers available',
    ],
    idealFor: [
      'Business travelers',
      'Family vacations',
      'International flights',
      'Group travel',
      'Early morning flights',
      'Red-eye flights',
    ],
  },
  {
    id: 'corporate-travel',
    name: 'Corporate Travel',
    shortDescription: 'Executive transportation solutions for businesses and corporate events',
    longDescription:
      "Elevate your corporate image with our premium business transportation services. From executive meetings to corporate roadshows, we provide reliable, professional chauffeur services that reflect your company's commitment to excellence. Our fleet of luxury vehicles ensures comfort and productivity on the move.",
    keywords: [
      'corporate transportation',
      'executive car service',
      'business travel',
      'corporate limo service',
      'executive transportation',
      'corporate shuttle service',
      'business meeting transportation',
      'corporate event transportation',
    ],
    benefits: [
      'Professional, suited chauffeurs',
      'Corporate billing accounts',
      'Detailed trip reporting',
      'Priority booking for executives',
      'Confidential and discrete service',
      'Productivity on the go',
    ],
    vehicles: [
      'Executive Sedan',
      'Luxury SUV',
      'Mercedes S-Class',
      'Executive Sprinter Van',
      'Mini Coach Bus',
    ],
    priceRange: {
      min: 85,
      max: 500,
      unit: 'per hour',
    },
    popularDestinations: [
      'Manhattan Business District',
      'Newark Business Center',
      'Jersey City Financial District',
      'MetroPark Station',
      'Corporate headquarters',
      'Convention centers',
    ],
    serviceFeatures: [
      'WiFi and mobile office setup',
      'Privacy partitions',
      'Conference call capabilities',
      'Multiple pickup coordination',
      'Executive amenities',
      'Real-time GPS tracking',
    ],
    idealFor: [
      'Board meetings',
      'Client entertainment',
      'Roadshows',
      'Team building events',
      'Executive recruitment',
      'Corporate relocations',
    ],
  },
  {
    id: 'cruise-transfers',
    name: 'Cruise Transfers',
    shortDescription: 'Luxury transportation to cruise ports in New York, New Jersey, and beyond',
    longDescription:
      'Start your cruise vacation in style with our premium cruise port transfer service. We specialize in transportation to Manhattan, Brooklyn, and Cape Liberty cruise terminals, ensuring you arrive relaxed and on time. Our spacious vehicles accommodate luggage for extended voyages.',
    keywords: [
      'cruise port transfer',
      'cruise terminal transportation',
      'Cape Liberty cruise transfer',
      'Manhattan cruise terminal',
      'Brooklyn cruise port',
      'cruise ship transportation',
      'port transfer service',
      'luxury cruise shuttle',
    ],
    benefits: [
      'Luggage handling assistance',
      'Timely arrival for boarding',
      'Group and family accommodations',
      'Return trip scheduling',
      'Port traffic navigation expertise',
      'Flexible pickup times',
    ],
    vehicles: ['Luxury SUV', 'Mercedes Sprinter Van', 'Executive Mini Bus', 'Stretch Limousine'],
    priceRange: {
      min: 150,
      max: 450,
      unit: 'per trip',
    },
    popularDestinations: [
      'Cape Liberty Cruise Port (Bayonne)',
      'Manhattan Cruise Terminal',
      'Brooklyn Cruise Terminal',
      'Philadelphia Cruise Port',
      'Baltimore Cruise Port',
    ],
    serviceFeatures: [
      'Extra luggage space',
      'Pre-cruise grocery stops',
      'Port drop-off assistance',
      'Cruise line coordination',
      'Round-trip bookings',
      'Multi-family vehicle options',
    ],
    idealFor: [
      'Family cruises',
      'Group travel',
      'Honeymoon cruises',
      'Senior travelers',
      'International voyages',
      'Back-to-back cruises',
    ],
  },
  {
    id: 'wedding-transportation',
    name: 'Wedding Transportation',
    shortDescription: 'Elegant wedding day transportation for your special celebration',
    longDescription:
      'Make your wedding day unforgettable with our luxury wedding transportation services. From classic stretch limousines to modern luxury SUVs, we provide elegant transportation for the wedding party, guests, and newlyweds. Our professional chauffeurs ensure seamless coordination throughout your special day.',
    keywords: [
      'wedding limo service',
      'wedding transportation',
      'bridal party transportation',
      'wedding car service',
      'luxury wedding vehicles',
      'wedding shuttle service',
      'reception transportation',
      'honeymoon airport transfer',
    ],
    benefits: [
      'Red carpet service',
      'Complimentary champagne',
      'Decorated vehicles available',
      'Multiple vehicle coordination',
      'Photo opportunity stops',
      'Professional, formal chauffeurs',
    ],
    vehicles: [
      'Stretch Limousine',
      'Luxury SUV Limo',
      'Classic Rolls Royce',
      'Mercedes S-Class',
      'Party Bus',
      'Vintage Cars',
    ],
    priceRange: {
      min: 350,
      max: 2500,
      unit: 'per event',
    },
    popularDestinations: [
      'Local churches',
      'Wedding venues',
      'Photo locations',
      'Reception halls',
      'Hotels',
      'Airports for honeymoon',
    ],
    serviceFeatures: [
      'Just Married decorations',
      'Champagne service',
      'Red carpet rollout',
      'Wedding party coordination',
      'Guest shuttle service',
      'Getaway car service',
    ],
    idealFor: [
      'Bride and groom transport',
      'Bridal party',
      'Parent transportation',
      'Guest shuttles',
      'Bachelor/bachelorette parties',
      'Rehearsal dinners',
    ],
  },
  {
    id: 'special-events',
    name: 'Special Events',
    shortDescription: 'Premium transportation for concerts, sports events, and celebrations',
    longDescription:
      'Enhance any special occasion with our luxury transportation services. Whether attending a Broadway show, sporting event, or celebrating a milestone, we provide safe, stylish transportation that adds elegance to your experience. Avoid parking hassles and enjoy door-to-door service.',
    keywords: [
      'special event transportation',
      'concert limo service',
      'sports event transportation',
      'birthday limo',
      'prom limousine',
      'anniversary transportation',
      'night out limo service',
      'event car service',
    ],
    benefits: [
      'Door-to-door service',
      'Group transportation options',
      'Avoid parking hassles',
      'Safe designated driver',
      'VIP treatment',
      'Flexible scheduling',
    ],
    vehicles: [
      'Stretch Limousine',
      'Party Bus',
      'Luxury SUV',
      'Executive Sprinter Van',
      'Classic Cars',
    ],
    priceRange: {
      min: 200,
      max: 1500,
      unit: 'per event',
    },
    popularDestinations: [
      'MetLife Stadium',
      'Prudential Center',
      'Madison Square Garden',
      'Broadway Theaters',
      'Atlantic City Casinos',
      'Concert Venues',
    ],
    serviceFeatures: [
      'Multiple stop coordination',
      'Beverage service',
      'Entertainment systems',
      'Mood lighting',
      'Privacy features',
      'Celebratory decorations',
    ],
    idealFor: [
      'Birthday celebrations',
      'Anniversary dinners',
      'Prom and homecoming',
      'Bachelor/bachelorette parties',
      'Concert groups',
      'Sporting events',
    ],
  },
  {
    id: 'wine-tours',
    name: 'Wine Tours & Day Trips',
    shortDescription: 'Chauffeured wine tours and scenic day trips throughout the tri-state area',
    longDescription:
      'Discover the finest wineries and scenic destinations with our luxury day trip services. Our knowledgeable chauffeurs provide safe, comfortable transportation for wine tastings, brewery tours, and sightseeing adventures. Enjoy the journey without worrying about driving.',
    keywords: [
      'wine tour transportation',
      'winery limo service',
      'day trip car service',
      'brewery tour transportation',
      'sightseeing tours',
      'vineyard transportation',
      'luxury day trips',
      'scenic tour service',
    ],
    benefits: [
      'Safe transportation for tastings',
      'Custom itinerary planning',
      'Local area expertise',
      'Group accommodations',
      'Picnic and cooler storage',
      'Flexible timing',
    ],
    vehicles: ['Luxury SUV', 'Mercedes Sprinter Van', 'Stretch Limousine', 'Executive Mini Bus'],
    priceRange: {
      min: 500,
      max: 1500,
      unit: 'per day',
    },
    popularDestinations: [
      'Long Island Wine Country',
      'Hudson Valley Wineries',
      'New Jersey Vineyards',
      'Finger Lakes Region',
      'Connecticut Wine Trail',
      'Local Breweries',
    ],
    serviceFeatures: [
      'Winery reservations assistance',
      'Cooler and storage space',
      'Multiple stop coordination',
      'Local recommendations',
      'Flexible scheduling',
      'Group discounts',
    ],
    idealFor: [
      'Wine enthusiasts',
      'Birthday celebrations',
      'Corporate team building',
      'Couples retreats',
      'Friend groups',
      'Tourism and sightseeing',
    ],
  },
  {
    id: 'medical-appointments',
    name: 'Medical Appointments',
    shortDescription: 'Reliable, compassionate transportation for medical and healthcare needs',
    longDescription:
      'Trust our professional service for safe, comfortable medical transportation. We understand the importance of punctuality for medical appointments and provide door-to-door service with extra care and assistance. Our drivers are trained to accommodate special needs and mobility requirements.',
    keywords: [
      'medical transportation',
      'hospital transfer service',
      'doctor appointment transportation',
      'medical appointment car service',
      'non-emergency medical transport',
      'healthcare transportation',
      'clinic transfer service',
      'patient transportation',
    ],
    benefits: [
      'Door-to-door assistance',
      'Wheelchair accessible options',
      'Punctual, reliable service',
      'Compassionate drivers',
      'Wait and return service',
      'Caregiver accommodation',
    ],
    vehicles: ['Comfortable Sedan', 'Accessible Van', 'Luxury SUV', 'Medical Transport Van'],
    priceRange: {
      min: 50,
      max: 200,
      unit: 'per trip',
    },
    popularDestinations: [
      'Local hospitals',
      'Medical centers',
      'Specialist offices',
      'Rehabilitation centers',
      'Diagnostic centers',
      'Surgical centers',
    ],
    serviceFeatures: [
      'Wheelchair accessibility',
      'Door-to-door assistance',
      'Wait time included',
      'Recurring appointment scheduling',
      'Caregiver transport',
      'Medication reminders',
    ],
    idealFor: [
      'Senior citizens',
      'Post-surgery patients',
      'Dialysis appointments',
      'Chemotherapy sessions',
      'Physical therapy',
      'Regular check-ups',
    ],
  },
  {
    id: 'school-transportation',
    name: 'School Transportation',
    shortDescription: 'Safe, reliable private school transportation for students',
    longDescription:
      "Ensure your child's safety and punctuality with our professional school transportation services. Our vetted, experienced drivers provide reliable daily transportation to private schools, after-school activities, and educational programs. Parents receive real-time updates for peace of mind.",
    keywords: [
      'private school transportation',
      'student car service',
      'school shuttle service',
      'after school transportation',
      'student transportation',
      'private school pickup',
      'educational transport',
      'school commute service',
    ],
    benefits: [
      'Background-checked drivers',
      'Real-time tracking for parents',
      'Door-to-door service',
      'Consistent driver assignment',
      'Flexible scheduling',
      'Safe, reliable vehicles',
    ],
    vehicles: ['Luxury SUV', 'Executive Van', 'Town Car', 'Mini Bus'],
    priceRange: {
      min: 40,
      max: 150,
      unit: 'per trip',
    },
    popularDestinations: [
      'Private schools',
      'Preparatory schools',
      'After-school programs',
      'Tutoring centers',
      'Sports practices',
      'Music lessons',
    ],
    serviceFeatures: [
      'Morning and afternoon service',
      'Parent notification system',
      'Consistent driver program',
      'Sibling coordination',
      'Activity transportation',
      'Emergency contact protocols',
    ],
    idealFor: [
      'Daily school commute',
      'After-school activities',
      'Sports team transport',
      'Field trips',
      'Summer programs',
      'Test day transportation',
    ],
  },
]

// Helper function to get service by ID
export function getServiceById(id: string): ServiceType | undefined {
  return essexCountyServices.find((service) => service.id === id)
}

// Helper function to get all service IDs
export function getAllServiceIds(): string[] {
  return essexCountyServices.map((service) => service.id)
}

// Helper function to get service keywords for SEO
export function getServiceKeywords(serviceId: string): string[] {
  const service = getServiceById(serviceId)
  return service ? service.keywords : []
}
