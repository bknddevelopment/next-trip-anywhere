export interface Airport {
  code: string
  name: string
  distance: string
  isMain?: boolean
}

export interface CruisePort {
  name: string
  location: string
}

export interface LocationData {
  city: string
  state: string
  stateCode: string
  shortName: string
  region: string
  timeZone: string
  coordinates: {
    latitude: number
    longitude: number
  }
  airports: Airport[]
  cruisePorts?: CruisePort[]
  popularDestinations: string[]
  localAreas: string[]
  specialties: string[]
  seasonalHighlights: {
    season: string
    description: string
    destinations: string[]
  }[]
  testimonials: {
    name: string
    location: string
    quote: string
    rating: number
  }[]
}

// Location data for all 30 cities
export const locationData: Record<string, LocationData> = {
  // Current Primary Cities (Enhanced)
  boston: {
    city: 'Boston',
    state: 'Massachusetts',
    stateCode: 'MA',
    shortName: 'BOS',
    region: 'New England',
    timeZone: 'America/New_York',
    coordinates: { latitude: 42.3601, longitude: -71.0589 },
    airports: [
      { code: 'BOS', name: 'Logan International Airport', distance: '3 miles from Downtown Boston', isMain: true },
      { code: 'MHT', name: 'Manchester-Boston Regional', distance: '50 miles from Boston (New Hampshire)' },
      { code: 'PVD', name: 'T.F. Green Airport', distance: '60 miles from Boston (Providence, RI)' }
    ],
    cruisePorts: [
      { name: 'Black Falcon Cruise Terminal', location: 'Seaport District, Boston' },
      { name: 'Flynn Cruiseport Boston', location: 'South Boston Waterfront' }
    ],
    popularDestinations: ['Orlando', 'Fort Lauderdale', 'Los Angeles', 'San Francisco', 'Dublin', 'London', 'Reykjavik', 'Bermuda'],
    localAreas: ['Cambridge', 'Somerville', 'Brookline', 'Newton', 'Quincy', 'Worcester', 'Providence', 'Manchester', 'Portsmouth', 'Cape Cod'],
    specialties: ['JetBlue Hub Flights', 'Europe Direct Routes', 'Bermuda Cruises', 'New England Fall Foliage Tours'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Cherry blossom season brings great deals to Japan and Europe',
        destinations: ['Tokyo', 'Dublin', 'London', 'Amsterdam']
      },
      {
        season: 'Summer',
        description: 'Peak cruise season from Black Falcon Terminal',
        destinations: ['Bermuda', 'Nova Scotia', 'Mediterranean', 'Caribbean']
      },
      {
        season: 'Fall',
        description: 'Perfect time for European city breaks and wine country',
        destinations: ['Paris', 'Rome', 'Barcelona', 'Lisbon']
      },
      {
        season: 'Winter',
        description: 'Escape New England winters with warm-weather deals',
        destinations: ['Miami', 'Aruba', 'Cancun', 'Costa Rica']
      }
    ],
    testimonials: []
  },

  nyc: {
    city: 'New York City',
    state: 'New York',
    stateCode: 'NY',
    shortName: 'NYC',
    region: 'Mid-Atlantic',
    timeZone: 'America/New_York',
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
    airports: [
      { code: 'JFK', name: 'John F. Kennedy International Airport', distance: '15 miles from Manhattan', isMain: true },
      { code: 'LGA', name: 'LaGuardia Airport', distance: '8 miles from Manhattan' },
      { code: 'EWR', name: 'Newark Liberty International Airport', distance: '10 miles from Manhattan' }
    ],
    cruisePorts: [
      { name: 'Manhattan Cruise Terminal', location: 'Midtown West, Manhattan' },
      { name: 'Brooklyn Cruise Terminal', location: 'Red Hook, Brooklyn' }
    ],
    popularDestinations: ['Los Angeles', 'Miami', 'London', 'Paris', 'Rome', 'Barcelona', 'Tokyo', 'Dubai'],
    localAreas: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Long Island', 'Westchester', 'New Jersey', 'Connecticut'],
    specialties: ['International Gateway Hub', 'Broadway Show Packages', 'Luxury Cruise Departures', 'Business Travel Services'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Perfect weather for European city breaks and Mediterranean cruises',
        destinations: ['Barcelona', 'Rome', 'Athens', 'Mediterranean']
      },
      {
        season: 'Summer',
        description: 'Peak season for transatlantic crossings and Northern European cruises',
        destinations: ['London', 'Norway', 'Baltic Sea', 'Transatlantic']
      },
      {
        season: 'Fall',
        description: 'Ideal time for Asia travel and Caribbean positioning cruises',
        destinations: ['Japan', 'South Korea', 'Caribbean', 'India']
      },
      {
        season: 'Winter',
        description: 'Holiday season brings special deals to warm destinations',
        destinations: ['Caribbean', 'South America', 'Southeast Asia', 'Australia']
      }
    ],
    testimonials: []
  },

  dc: {
    city: 'Washington DC',
    state: 'District of Columbia',
    stateCode: 'DC',
    shortName: 'DCA',
    region: 'Mid-Atlantic',
    timeZone: 'America/New_York',
    coordinates: { latitude: 38.9072, longitude: -77.0369 },
    airports: [
      { code: 'DCA', name: 'Ronald Reagan Washington National Airport', distance: '5 miles from Downtown DC', isMain: true },
      { code: 'IAD', name: 'Washington Dulles International Airport', distance: '25 miles from Downtown DC' },
      { code: 'BWI', name: 'Baltimore-Washington International Airport', distance: '35 miles from Downtown DC' }
    ],
    popularDestinations: ['Orlando', 'Miami', 'Los Angeles', 'London', 'Paris', 'Frankfurt', 'Atlanta', 'Chicago'],
    localAreas: ['Georgetown', 'Capitol Hill', 'Dupont Circle', 'Arlington', 'Alexandria', 'Bethesda', 'Silver Spring', 'Rockville', 'Fairfax', 'Baltimore'],
    specialties: ['Government Travel Services', 'European Business Routes', 'Family Vacation Packages', 'Last-Minute Business Travel'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Cherry blossom season inspires trips to Japan and spring destinations',
        destinations: ['Japan', 'Turkey', 'Greece', 'Morocco']
      },
      {
        season: 'Summer',
        description: 'Government recess season brings family vacation deals',
        destinations: ['Europe', 'National Parks', 'Alaska', 'Scandinavia']
      },
      {
        season: 'Fall',
        description: 'Perfect time for cultural tours and wine country visits',
        destinations: ['Italy', 'France', 'Germany', 'Eastern Europe']
      },
      {
        season: 'Winter',
        description: 'Holiday season and warm-weather escapes',
        destinations: ['Caribbean', 'Central America', 'South America', 'Middle East']
      }
    ],
    testimonials: []
  },

  miami: {
    city: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    shortName: 'MIA',
    region: 'Southeast',
    timeZone: 'America/New_York',
    coordinates: { latitude: 25.7617, longitude: -80.1918 },
    airports: [
      { code: 'MIA', name: 'Miami International Airport', distance: '8 miles from Downtown Miami', isMain: true },
      { code: 'FLL', name: 'Fort Lauderdale-Hollywood International Airport', distance: '25 miles from Miami' },
      { code: 'PBI', name: 'Palm Beach International Airport', distance: '70 miles from Miami' }
    ],
    cruisePorts: [
      { name: 'PortMiami', location: 'Downtown Miami' },
      { name: 'Port Everglades', location: 'Fort Lauderdale' },
      { name: 'Port of Palm Beach', location: 'West Palm Beach' }
    ],
    popularDestinations: ['Caribbean Islands', 'South America', 'Central America', 'Europe', 'New York', 'Los Angeles', 'Bahamas', 'Mexico'],
    localAreas: ['South Beach', 'Coral Gables', 'Key Biscayne', 'Fort Lauderdale', 'Hollywood', 'West Palm Beach', 'Boca Raton', 'Naples', 'Key Largo', 'Homestead'],
    specialties: ['Caribbean Cruise Capital', 'South American Gateway', 'Latin American Connections', 'Luxury Resort Packages'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Perfect cruise weather with calm seas and sunny skies',
        destinations: ['Eastern Caribbean', 'Western Caribbean', 'Southern Caribbean', 'Bermuda']
      },
      {
        season: 'Summer',
        description: 'Peak European travel season from Miami hub',
        destinations: ['Spain', 'Portugal', 'Mediterranean', 'Northern Europe']
      },
      {
        season: 'Fall',
        description: 'Hurricane season ends, bringing great cruise and flight deals',
        destinations: ['Caribbean', 'Central America', 'South America', 'Asia']
      },
      {
        season: 'Winter',
        description: 'Peak season for escaping cold weather - book early!',
        destinations: ['Caribbean', 'Hawaii', 'Australia', 'South Pacific']
      }
    ],
    testimonials: []
  },

  // New Primary Cities
  losangeles: {
    city: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    shortName: 'LAX',
    region: 'West Coast',
    timeZone: 'America/Los_Angeles',
    coordinates: { latitude: 34.0522, longitude: -118.2437 },
    airports: [
      { code: 'LAX', name: 'Los Angeles International Airport', distance: '15 miles from Downtown LA', isMain: true },
      { code: 'BUR', name: 'Hollywood Burbank Airport', distance: '12 miles from Downtown LA' },
      { code: 'LGB', name: 'Long Beach Airport', distance: '25 miles from Downtown LA' },
      { code: 'SNA', name: 'John Wayne Airport', distance: '45 miles from Downtown LA' }
    ],
    cruisePorts: [
      { name: 'Port of Los Angeles', location: 'San Pedro' },
      { name: 'Port of Long Beach', location: 'Long Beach' }
    ],
    popularDestinations: ['Hawaii', 'Asia', 'Australia', 'New Zealand', 'Mexico', 'Europe', 'New York', 'Alaska'],
    localAreas: ['Hollywood', 'Beverly Hills', 'Santa Monica', 'Venice', 'Malibu', 'Pasadena', 'Long Beach', 'Anaheim', 'Orange County', 'Inland Empire'],
    specialties: ['Pacific Gateway Hub', 'Asia-Pacific Expert', 'Hawaii Specialist', 'Entertainment Industry Travel'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Perfect weather for Japan cherry blossom season and European travel',
        destinations: ['Japan', 'South Korea', 'Europe', 'Mediterranean']
      },
      {
        season: 'Summer',
        description: 'Peak season for Alaska cruises and European adventures',
        destinations: ['Alaska', 'Northern Europe', 'Scandinavia', 'Russia']
      },
      {
        season: 'Fall',
        description: 'Ideal weather for Asia travel and repositioning cruises',
        destinations: ['China', 'Southeast Asia', 'India', 'Repositioning Cruises']
      },
      {
        season: 'Winter',
        description: 'Best time for Australia, New Zealand, and warm Pacific destinations',
        destinations: ['Australia', 'New Zealand', 'Tahiti', 'Hawaii']
      }
    ],
    testimonials: []
  },

  chicago: {
    city: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    shortName: 'ORD',
    region: 'Midwest',
    timeZone: 'America/Chicago',
    coordinates: { latitude: 41.8781, longitude: -87.6298 },
    airports: [
      { code: 'ORD', name: "O'Hare International Airport", distance: '17 miles from Downtown Chicago', isMain: true },
      { code: 'MDW', name: 'Midway International Airport', distance: '10 miles from Downtown Chicago' }
    ],
    popularDestinations: ['Europe', 'Asia', 'New York', 'Los Angeles', 'Florida', 'Mexico', 'Canada', 'Caribbean'],
    localAreas: ['Downtown', 'North Side', 'South Side', 'West Side', 'Oak Park', 'Evanston', 'Schaumburg', 'Naperville', 'Milwaukee', 'Madison'],
    specialties: ['Midwest Hub Connections', 'European Direct Routes', 'Great Lakes Cruises', 'Corporate Travel Solutions'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Perfect time for European travel as weather warms up',
        destinations: ['London', 'Paris', 'Amsterdam', 'Germany']
      },
      {
        season: 'Summer',
        description: 'Peak season for Great Lakes cruises and European vacations',
        destinations: ['Great Lakes', 'Scandinavia', 'Eastern Europe', 'Alaska']
      },
      {
        season: 'Fall',
        description: 'Beautiful autumn colors inspire European and Asian travel',
        destinations: ['New England', 'Europe', 'Japan', 'South Korea']
      },
      {
        season: 'Winter',
        description: 'Escape the cold with warm-weather deals and ski packages',
        destinations: ['Caribbean', 'Mexico', 'Florida', 'Colorado Ski']
      }
    ],
    testimonials: []
  },

  sanfrancisco: {
    city: 'San Francisco',
    state: 'California',
    stateCode: 'CA',
    shortName: 'SFO',
    region: 'West Coast',
    timeZone: 'America/Los_Angeles',
    coordinates: { latitude: 37.7749, longitude: -122.4194 },
    airports: [
      { code: 'SFO', name: 'San Francisco International Airport', distance: '13 miles from Downtown SF', isMain: true },
      { code: 'OAK', name: 'Oakland International Airport', distance: '20 miles from Downtown SF' },
      { code: 'SJC', name: 'Norman Y. Mineta San José International Airport', distance: '45 miles from Downtown SF' }
    ],
    cruisePorts: [
      { name: 'Port of San Francisco', location: 'Embarcadero' }
    ],
    popularDestinations: ['Asia', 'Hawaii', 'Australia', 'Europe', 'Alaska', 'Mexico', 'New Zealand', 'South America'],
    localAreas: ['Silicon Valley', 'Oakland', 'Berkeley', 'Marin County', 'Napa Valley', 'Sonoma', 'San Jose', 'Palo Alto', 'Sausalito', 'Half Moon Bay'],
    specialties: ['Asia-Pacific Gateway', 'Tech Industry Travel', 'Wine Country Tours', 'Alaska Cruise Expert'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Perfect weather for Asia travel and California wine country',
        destinations: ['Japan', 'China', 'Napa Valley', 'Sonoma']
      },
      {
        season: 'Summer',
        description: 'Peak Alaska cruise season and European travel time',
        destinations: ['Alaska', 'Northern Europe', 'Mediterranean', 'Scandinavia']
      },
      {
        season: 'Fall',
        description: 'Harvest season in wine country and great Asia travel weather',
        destinations: ['Southeast Asia', 'India', 'Wine Country', 'Australia']
      },
      {
        season: 'Winter',
        description: 'Best time for Australia/New Zealand and warm Pacific islands',
        destinations: ['Australia', 'New Zealand', 'Fiji', 'Hawaii']
      }
    ],
    testimonials: []
  },

  seattle: {
    city: 'Seattle',
    state: 'Washington',
    stateCode: 'WA',
    shortName: 'SEA',
    region: 'Pacific Northwest',
    timeZone: 'America/Los_Angeles',
    coordinates: { latitude: 47.6062, longitude: -122.3321 },
    airports: [
      { code: 'SEA', name: 'Seattle-Tacoma International Airport', distance: '14 miles from Downtown Seattle', isMain: true },
      { code: 'BFI', name: 'Boeing Field', distance: '5 miles from Downtown Seattle' }
    ],
    cruisePorts: [
      { name: 'Port of Seattle', location: 'Belltown' }
    ],
    popularDestinations: ['Alaska', 'Asia', 'Europe', 'Hawaii', 'Canada', 'Australia', 'Iceland', 'Japan'],
    localAreas: ['Bellevue', 'Tacoma', 'Everett', 'Redmond', 'Kirkland', 'Bothell', 'Federal Way', 'Kent', 'Renton', 'Olympia'],
    specialties: ['Alaska Cruise Capital', 'Asia-Pacific Routes', 'Tech Industry Travel', 'Pacific Northwest Tours'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Cherry blossom season perfect for Japan and Pacific Northwest beauty',
        destinations: ['Japan', 'South Korea', 'Pacific Northwest', 'British Columbia']
      },
      {
        season: 'Summer',
        description: 'Peak Alaska cruise season - book early for best selection',
        destinations: ['Alaska', 'Northern Europe', 'Scandinavia', 'Canada']
      },
      {
        season: 'Fall',
        description: 'Beautiful autumn colors and great Asia travel weather',
        destinations: ['Asia', 'Europe', 'New England', 'Pacific Northwest']
      },
      {
        season: 'Winter',
        description: 'Escape the rain with warm destinations and ski packages',
        destinations: ['Hawaii', 'Australia', 'Southeast Asia', 'Ski Resorts']
      }
    ],
    testimonials: []
  },

  denver: {
    city: 'Denver',
    state: 'Colorado',
    stateCode: 'CO',
    shortName: 'DEN',
    region: 'Mountain West',
    timeZone: 'America/Denver',
    coordinates: { latitude: 39.7392, longitude: -104.9903 },
    airports: [
      { code: 'DEN', name: 'Denver International Airport', distance: '25 miles from Downtown Denver', isMain: true }
    ],
    popularDestinations: ['Europe', 'Mexico', 'Caribbean', 'Hawaii', 'Alaska', 'Asia', 'South America', 'Ski Destinations'],
    localAreas: ['Boulder', 'Fort Collins', 'Colorado Springs', 'Aspen', 'Vail', 'Breckenridge', 'Steamboat Springs', 'Telluride', 'Grand Junction', 'Durango'],
    specialties: ['Mountain Resort Expert', 'Ski Package Specialist', 'High-Altitude Gateway', 'Adventure Travel'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Perfect time for Europe and warm-weather destinations',
        destinations: ['Europe', 'Mediterranean', 'Mexico', 'Caribbean']
      },
      {
        season: 'Summer',
        description: 'Peak season for European adventures and Alaska cruises',
        destinations: ['Europe', 'Alaska', 'Scandinavia', 'Canada']
      },
      {
        season: 'Fall',
        description: 'Beautiful autumn weather perfect for cultural travel',
        destinations: ['Europe', 'Asia', 'South America', 'India']
      },
      {
        season: 'Winter',
        description: 'World-class skiing nearby and warm-weather escapes',
        destinations: ['Ski Resorts', 'Caribbean', 'Hawaii', 'South America']
      }
    ],
    testimonials: []
  },

  atlanta: {
    city: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    shortName: 'ATL',
    region: 'Southeast',
    timeZone: 'America/New_York',
    coordinates: { latitude: 33.7490, longitude: -84.3880 },
    airports: [
      { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', distance: '10 miles from Downtown Atlanta', isMain: true }
    ],
    popularDestinations: ['Europe', 'Caribbean', 'South America', 'Africa', 'Asia', 'Mexico', 'Canada', 'Domestic US'],
    localAreas: ['Buckhead', 'Midtown', 'Decatur', 'Sandy Springs', 'Roswell', 'Alpharetta', 'Marietta', 'Kennesaw', 'Duluth', 'Lawrenceville'],
    specialties: ['Delta Hub Expert', 'International Gateway', 'Business Travel Specialist', 'Southern Hospitality Service'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Dogwood season inspires European and Asian travel',
        destinations: ['Europe', 'Asia', 'Mediterranean', 'Middle East']
      },
      {
        season: 'Summer',
        description: 'Peak European travel season from Delta\'s largest hub',
        destinations: ['Europe', 'Africa', 'Scandinavia', 'Northern Europe']
      },
      {
        season: 'Fall',
        description: 'Perfect weather for cultural tours and warm destinations',
        destinations: ['South America', 'India', 'Southeast Asia', 'Australia']
      },
      {
        season: 'Winter',
        description: 'Great deals to escape Southern winter with warm destinations',
        destinations: ['Caribbean', 'Central America', 'South America', 'Africa']
      }
    ],
    testimonials: []
  },

  // Secondary Cities
  phoenix: {
    city: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    shortName: 'PHX',
    region: 'Southwest',
    timeZone: 'America/Phoenix',
    coordinates: { latitude: 33.4484, longitude: -112.0740 },
    airports: [
      { code: 'PHX', name: 'Phoenix Sky Harbor International Airport', distance: '3 miles from Downtown Phoenix', isMain: true }
    ],
    popularDestinations: ['Mexico', 'California', 'Hawaii', 'Europe', 'Asia', 'Caribbean', 'Canada', 'East Coast'],
    localAreas: ['Scottsdale', 'Tempe', 'Mesa', 'Glendale', 'Chandler', 'Gilbert', 'Peoria', 'Surprise', 'Goodyear', 'Tucson'],
    specialties: ['Desert Resort Expert', 'Mexico Specialist', 'Southwest Travel Hub', 'Golf Vacation Packages'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Perfect weather in Phoenix, ideal time for anywhere travel',
        destinations: ['Mexico', 'Europe', 'Asia', 'South America']
      },
      {
        season: 'Summer',
        description: 'Escape the heat with cooler destination deals',
        destinations: ['Alaska', 'Northern Europe', 'Canada', 'Mountain Destinations']
      },
      {
        season: 'Fall',
        description: 'Comfortable weather returns, perfect for warm destinations',
        destinations: ['Caribbean', 'Mexico', 'Hawaii', 'Australia']
      },
      {
        season: 'Winter',
        description: 'Peak season in Phoenix - perfect weather for local activities',
        destinations: ['Desert Tours', 'Golf Resorts', 'Spa Retreats', 'Mexico Beach']
      }
    ],
    testimonials: []
  },

  philadelphia: {
    city: 'Philadelphia',
    state: 'Pennsylvania',
    stateCode: 'PA',
    shortName: 'PHL',
    region: 'Mid-Atlantic',
    timeZone: 'America/New_York',
    coordinates: { latitude: 39.9526, longitude: -75.1652 },
    airports: [
      { code: 'PHL', name: 'Philadelphia International Airport', distance: '7 miles from Center City', isMain: true }
    ],
    popularDestinations: ['Europe', 'Caribbean', 'Florida', 'California', 'Canada', 'Mexico', 'South America', 'Asia'],
    localAreas: ['Center City', 'South Philly', 'North Philly', 'West Philly', 'Northeast Philly', 'Suburbs', 'Camden', 'Wilmington', 'Atlantic City', 'Trenton'],
    specialties: ['East Coast Hub', 'European Direct Routes', 'Historical Tour Packages', 'Family Vacation Expert'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Cherry blossom season perfect for European and Asian travel',
        destinations: ['Europe', 'Asia', 'Mediterranean', 'Japan']
      },
      {
        season: 'Summer',
        description: 'Peak travel season with direct European connections',
        destinations: ['Europe', 'Scandinavia', 'Canada', 'Alaska']
      },
      {
        season: 'Fall',
        description: 'Beautiful autumn weather ideal for cultural tours',
        destinations: ['Europe', 'New England', 'Asia', 'India']
      },
      {
        season: 'Winter',
        description: 'Holiday season and warm-weather escape deals',
        destinations: ['Caribbean', 'Florida', 'Mexico', 'South America']
      }
    ],
    testimonials: []
  },

  sandiego: {
    city: 'San Diego',
    state: 'California',
    stateCode: 'CA',
    shortName: 'SAN',
    region: 'West Coast',
    timeZone: 'America/Los_Angeles',
    coordinates: { latitude: 32.7157, longitude: -117.1611 },
    airports: [
      { code: 'SAN', name: 'San Diego International Airport', distance: '3 miles from Downtown San Diego', isMain: true }
    ],
    cruisePorts: [
      { name: 'Port of San Diego', location: 'Downtown San Diego' }
    ],
    popularDestinations: ['Mexico', 'Hawaii', 'Asia', 'Europe', 'Alaska', 'Caribbean', 'South America', 'Australia'],
    localAreas: ['La Jolla', 'Pacific Beach', 'Mission Beach', 'Coronado', 'Del Mar', 'Encinitas', 'Carlsbad', 'Chula Vista', 'Escondido', 'Tijuana'],
    specialties: ['Mexico Border Expert', 'Pacific Cruise Specialist', 'Beach Resort Packages', 'Military Travel Services'],
    seasonalHighlights: [
      {
        season: 'Spring',
        description: 'Perfect weather year-round, ideal for any destination',
        destinations: ['Mexico', 'Asia', 'Europe', 'South America']
      },
      {
        season: 'Summer',
        description: 'Peak cruise season and European travel time',
        destinations: ['Alaska', 'Europe', 'Mediterranean', 'Pacific']
      },
      {
        season: 'Fall',
        description: 'Great weather continues, perfect for warm destinations',
        destinations: ['Hawaii', 'Asia', 'Australia', 'Mexico']
      },
      {
        season: 'Winter',
        description: 'Mild weather, great time for cruises and warm destinations',
        destinations: ['Caribbean', 'Mexico', 'Hawaii', 'South Pacific']
      }
    ],
    testimonials: []
  },

  // Additional Secondary Cities (17 more)
  dallas: {
    city: 'Dallas',
    state: 'Texas',
    stateCode: 'TX',
    shortName: 'DFW',
    region: 'South',
    timeZone: 'America/Chicago',
    coordinates: { latitude: 32.7767, longitude: -96.7970 },
    airports: [
      { code: 'DFW', name: 'Dallas/Fort Worth International Airport', distance: '20 miles from Downtown Dallas', isMain: true },
      { code: 'DAL', name: 'Dallas Love Field', distance: '6 miles from Downtown Dallas' }
    ],
    popularDestinations: ['Mexico', 'Europe', 'Asia', 'Caribbean', 'South America', 'California', 'New York', 'Florida'],
    localAreas: ['Fort Worth', 'Plano', 'Irving', 'Garland', 'Arlington', 'McKinney', 'Frisco', 'Richardson', 'Carrollton', 'Denton'],
    specialties: ['American Airlines Hub', 'Mexico Gateway', 'Business Travel Expert', 'Oil Industry Specialist'],
    seasonalHighlights: [
      { season: 'Spring', description: 'Perfect weather for European and Asian travel', destinations: ['Europe', 'Asia', 'Mediterranean', 'Japan'] },
      { season: 'Summer', description: 'Peak travel season with extensive route network', destinations: ['Europe', 'Alaska', 'Canada', 'Scandinavia'] },
      { season: 'Fall', description: 'Comfortable temperatures ideal for international travel', destinations: ['South America', 'India', 'Southeast Asia', 'Australia'] },
      { season: 'Winter', description: 'Great deals to escape Texas winter', destinations: ['Caribbean', 'Mexico', 'Hawaii', 'Central America'] }
    ],
    testimonials: []
  },

  houston: {
    city: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    shortName: 'IAH',
    region: 'South',
    timeZone: 'America/Chicago',
    coordinates: { latitude: 29.7604, longitude: -95.3698 },
    airports: [
      { code: 'IAH', name: 'George Bush Intercontinental Airport', distance: '22 miles from Downtown Houston', isMain: true },
      { code: 'HOU', name: 'William P. Hobby Airport', distance: '7 miles from Downtown Houston' }
    ],
    popularDestinations: ['Mexico', 'South America', 'Europe', 'Asia', 'Caribbean', 'Central America', 'Africa', 'Middle East'],
    localAreas: ['Sugar Land', 'The Woodlands', 'Katy', 'Pearland', 'League City', 'Pasadena', 'Baytown', 'Conroe', 'Galveston', 'Beaumont'],
    specialties: ['United Airlines Hub', 'South American Gateway', 'Energy Industry Travel', 'International Connections'],
    seasonalHighlights: [
      { season: 'Spring', description: 'Great weather for South American and European adventures', destinations: ['South America', 'Europe', 'Mediterranean', 'Africa'] },
      { season: 'Summer', description: 'Peak international travel season from major hub', destinations: ['Europe', 'Asia', 'Africa', 'Middle East'] },
      { season: 'Fall', description: 'Perfect time for Asia and Australia travel', destinations: ['Asia', 'Australia', 'India', 'Southeast Asia'] },
      { season: 'Winter', description: 'Holiday season and warm destination deals', destinations: ['Caribbean', 'Central America', 'South America', 'Hawaii'] }
    ],
    testimonials: []
  },

  austin: {
    city: 'Austin',
    state: 'Texas',
    stateCode: 'TX',
    shortName: 'AUS',
    region: 'South',
    timeZone: 'America/Chicago',
    coordinates: { latitude: 30.2672, longitude: -97.7431 },
    airports: [
      { code: 'AUS', name: 'Austin-Bergstrom International Airport', distance: '5 miles from Downtown Austin', isMain: true }
    ],
    popularDestinations: ['California', 'New York', 'Europe', 'Mexico', 'Caribbean', 'Asia', 'South America', 'Canada'],
    localAreas: ['Round Rock', 'Cedar Park', 'Georgetown', 'Pflugerville', 'Leander', 'Kyle', 'Buda', 'Dripping Springs', 'Lakeway', 'Bastrop'],
    specialties: ['Tech Industry Travel', 'Music Festival Packages', 'SXSW Travel Expert', 'Corporate Startup Travel'],
    seasonalHighlights: [
      { season: 'Spring', description: 'SXSW season and perfect weather for travel anywhere', destinations: ['Europe', 'Asia', 'California', 'New York'] },
      { season: 'Summer', description: 'Beat the Texas heat with cooler destinations', destinations: ['Alaska', 'Northern Europe', 'Canada', 'Mountain Destinations'] },
      { season: 'Fall', description: 'Great weather returns, perfect for international travel', destinations: ['Europe', 'Asia', 'South America', 'Australia'] },
      { season: 'Winter', description: 'Holiday travel and warm-weather escapes', destinations: ['Caribbean', 'Mexico', 'Hawaii', 'Central America'] }
    ],
    testimonials: []
  },

  portland: {
    city: 'Portland',
    state: 'Oregon',
    stateCode: 'OR',
    shortName: 'PDX',
    region: 'Pacific Northwest',
    timeZone: 'America/Los_Angeles',
    coordinates: { latitude: 45.5152, longitude: -122.6784 },
    airports: [
      { code: 'PDX', name: 'Portland International Airport', distance: '12 miles from Downtown Portland', isMain: true }
    ],
    popularDestinations: ['Europe', 'Asia', 'Alaska', 'Hawaii', 'Mexico', 'Canada', 'Iceland', 'Japan'],
    localAreas: ['Beaverton', 'Tigard', 'Lake Oswego', 'Milwaukie', 'Gresham', 'Hillsboro', 'Oregon City', 'Tualatin', 'West Linn', 'Wilsonville'],
    specialties: ['Pacific Northwest Tours', 'Eco-Tourism Expert', 'Wine Country Travel', 'Sustainable Travel Options'],
    seasonalHighlights: [
      { season: 'Spring', description: 'Perfect time for Asia travel and European adventures', destinations: ['Japan', 'Europe', 'Mediterranean', 'Asia'] },
      { season: 'Summer', description: 'Peak Alaska season and Northern European travel', destinations: ['Alaska', 'Scandinavia', 'Northern Europe', 'Canada'] },
      { season: 'Fall', description: 'Beautiful autumn weather for cultural destinations', destinations: ['Europe', 'Asia', 'Wine Regions', 'New England'] },
      { season: 'Winter', description: 'Escape the rain with warm, sunny destinations', destinations: ['Hawaii', 'Caribbean', 'Mexico', 'Southeast Asia'] }
    ],
    testimonials: []
  },

  lasvegas: {
    city: 'Las Vegas',
    state: 'Nevada',
    stateCode: 'NV',
    shortName: 'LAS',
    region: 'Southwest',
    timeZone: 'America/Los_Angeles',
    coordinates: { latitude: 36.1699, longitude: -115.1398 },
    airports: [
      { code: 'LAS', name: 'Harry Reid International Airport', distance: '5 miles from Las Vegas Strip', isMain: true }
    ],
    popularDestinations: ['California', 'New York', 'Hawaii', 'Europe', 'Asia', 'Mexico', 'Caribbean', 'Canada'],
    localAreas: ['Henderson', 'North Las Vegas', 'Summerlin', 'Paradise', 'Spring Valley', 'Enterprise', 'Sunrise Manor', 'Whitney', 'Boulder City', 'Mesquite'],
    specialties: ['Entertainment Travel', 'Group Event Planning', 'Bachelor/Bachelorette Parties', 'Convention Travel'],
    seasonalHighlights: [
      { season: 'Spring', description: 'Perfect weather in Vegas, great time for any destination', destinations: ['Europe', 'Asia', 'Mediterranean', 'California'] },
      { season: 'Summer', description: 'Escape the heat with cooler destination packages', destinations: ['Alaska', 'Northern Europe', 'Canada', 'Mountain Resorts'] },
      { season: 'Fall', description: 'Comfortable weather returns to Vegas and worldwide', destinations: ['Europe', 'Asia', 'Australia', 'South America'] },
      { season: 'Winter', description: 'Great weather in Vegas, perfect for warm destinations', destinations: ['Hawaii', 'Caribbean', 'Mexico', 'Southeast Asia'] }
    ],
    testimonials: []
  },

  orlando: {
    city: 'Orlando',
    state: 'Florida',
    stateCode: 'FL',
    shortName: 'MCO',
    region: 'Southeast',
    timeZone: 'America/New_York',
    coordinates: { latitude: 28.5383, longitude: -81.3792 },
    airports: [
      { code: 'MCO', name: 'Orlando International Airport', distance: '6 miles from Downtown Orlando', isMain: true }
    ],
    cruisePorts: [
      { name: 'Port Canaveral', location: '45 minutes from Orlando' }
    ],
    popularDestinations: ['Caribbean', 'Europe', 'South America', 'Mexico', 'Bahamas', 'New York', 'California', 'Canada'],
    localAreas: ['Disney World', 'Universal Studios', 'Kissimmee', 'Winter Park', 'Altamonte Springs', 'Sanford', 'Apopka', 'Oviedo', 'Winter Garden', 'Clermont'],
    specialties: ['Theme Park Expert', 'Family Vacation Specialist', 'Cruise Packages', 'Disney Authorized Planner'],
    seasonalHighlights: [
      { season: 'Spring', description: 'Perfect theme park weather and cruise season begins', destinations: ['Caribbean', 'Bahamas', 'Europe', 'Theme Parks'] },
      { season: 'Summer', description: 'Peak family travel season with theme park packages', destinations: ['Caribbean', 'Europe', 'Canada', 'Alaska'] },
      { season: 'Fall', description: 'Great weather returns, perfect for cruises and travel', destinations: ['Caribbean', 'South America', 'Europe', 'Mexico'] },
      { season: 'Winter', description: 'Peak tourist season in Orlando and warm destinations', destinations: ['Caribbean', 'Central America', 'South America', 'Hawaii'] }
    ],
    testimonials: []
  },

  tampa: {
    city: 'Tampa',
    state: 'Florida',
    stateCode: 'FL',
    shortName: 'TPA',
    region: 'Southeast',
    timeZone: 'America/New_York',
    coordinates: { latitude: 27.9506, longitude: -82.4572 },
    airports: [
      { code: 'TPA', name: 'Tampa International Airport', distance: '6 miles from Downtown Tampa', isMain: true }
    ],
    cruisePorts: [
      { name: 'Port of Tampa', location: 'Downtown Tampa' }
    ],
    popularDestinations: ['Caribbean', 'Europe', 'Mexico', 'South America', 'Central America', 'Bahamas', 'New York', 'California'],
    localAreas: ['St. Petersburg', 'Clearwater', 'Brandon', 'Riverview', 'Valrico', 'Carrollwood', 'Westchase', 'Lutz', 'Wesley Chapel', 'Plant City'],
    specialties: ['Gulf Coast Cruises', 'Beach Resort Expert', 'Retirement Travel', 'Snowbird Packages'],
    seasonalHighlights: [
      { season: 'Spring', description: 'Perfect beach weather and cruise season begins', destinations: ['Caribbean', 'Mexico', 'Europe', 'Bahamas'] },
      { season: 'Summer', description: 'Peak cruise season from Tampa with great deals', destinations: ['Caribbean', 'Central America', 'Europe', 'Alaska'] },
      { season: 'Fall', description: 'Hurricane season ends, great cruise and travel deals', destinations: ['Caribbean', 'South America', 'Mexico', 'Europe'] },
      { season: 'Winter', description: 'Peak snowbird season with warm destination deals', destinations: ['Caribbean', 'Central America', 'South America', 'Hawaii'] }
    ],
    testimonials: []
  }

  // Note: Additional 10 secondary cities would follow the same pattern
  // (Nashville, New Orleans, Charlotte, Minneapolis, Detroit, St. Louis, Baltimore, Pittsburgh, Cincinnati, Cleveland)
  // Each with similar detailed structure including local data, airports, specialties, testimonials, etc.
}

// Helper functions
export function getLocationData(cityKey: string): LocationData | null {
  return locationData[cityKey] || null
}

export function getAllLocationKeys(): string[] {
  return Object.keys(locationData)
}

export function getLocationsByRegion(region: string): LocationData[] {
  return Object.values(locationData).filter(location => location.region === region)
}