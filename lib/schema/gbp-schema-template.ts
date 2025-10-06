/**
 * Google Business Profile Schema Templates
 *
 * Use these templates to update app/layout.tsx schema after GBP setup is complete.
 * Replace placeholder values with actual GBP data.
 */

/**
 * SERVICE AREA BUSINESS SCHEMA
 * Use this if you set up GBP as service area business (no physical address shown)
 */
export const serviceAreaBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': 'https://nexttripanywhere.com/#organization',
  name: 'Next Trip Anywhere',
  alternateName: 'NTA Travel',
  url: 'https://nexttripanywhere.com',

  // Add your Google Business Profile URL here after setup
  sameAs: [
    'https://g.page/nexttripanywhere', // ← REPLACE with actual GBP URL
    'https://www.facebook.com/nexttripanywhere',
    'https://www.instagram.com/nexttripanywhere',
    'https://www.twitter.com/nexttripanywhere',
    'https://www.linkedin.com/company/nexttripanywhere',
    'https://www.youtube.com/nexttripanywhere',
  ],

  // Service Area Business (no physical address shown publicly)
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    // Optional: add city/state if you want some location specificity
    // addressLocality: 'Newark',
    // addressRegion: 'NJ',
  },

  // Define your service areas (choose ONE of the options below):

  // OPTION 1: Serve entire states
  areaServed: [
    { '@type': 'State', name: 'New Jersey' },
    { '@type': 'State', name: 'New York' },
    { '@type': 'State', name: 'Pennsylvania' },
    { '@type': 'State', name: 'Connecticut' },
  ],

  // OPTION 2: Serve specific counties (comment out Option 1, uncomment this)
  // areaServed: [
  //   { '@type': 'AdministrativeArea', name: 'Essex County, NJ' },
  //   { '@type': 'AdministrativeArea', name: 'Hudson County, NJ' },
  //   { '@type': 'AdministrativeArea', name: 'Bergen County, NJ' },
  //   { '@type': 'AdministrativeArea', name: 'Union County, NJ' },
  // ],

  // OPTION 3: Serve specific cities (comment out Option 1, uncomment this)
  // areaServed: [
  //   { '@type': 'City', name: 'Newark, NJ' },
  //   { '@type': 'City', name: 'East Orange, NJ' },
  //   { '@type': 'City', name: 'Montclair, NJ' },
  //   { '@type': 'City', name: 'Bloomfield, NJ' },
  //   // ... add up to 20 cities
  // ],

  telephone: '+1-833-874-1019',
  email: 'info@nexttripanywhere.com',

  // Add reviews ONLY after collecting real GBP reviews
  // aggregateRating: {
  //   '@type': 'AggregateRating',
  //   ratingValue': '4.8',      // ← REPLACE with actual GBP rating
  //   reviewCount': '27',        // ← REPLACE with actual GBP review count
  //   bestRating': '5',
  //   worstRating': '1',
  // },
}

/**
 * PHYSICAL LOCATION BUSINESS SCHEMA
 * Use this if you set up GBP with a physical storefront address
 */
export const physicalLocationBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': 'https://nexttripanywhere.com/#organization',
  name: 'Next Trip Anywhere',
  alternateName: 'NTA Travel',
  url: 'https://nexttripanywhere.com',

  // Add your Google Business Profile URL here
  sameAs: [
    'https://g.page/nexttripanywhere', // ← REPLACE with actual GBP URL
    'https://www.facebook.com/nexttripanywhere',
    'https://www.instagram.com/nexttripanywhere',
    'https://www.twitter.com/nexttripanywhere',
    'https://www.linkedin.com/company/nexttripanywhere',
    'https://www.youtube.com/nexttripanywhere',
  ],

  // Physical address (shown publicly in GBP)
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Main Street, Suite 100', // ← REPLACE with actual address
    addressLocality: 'Newark', // ← REPLACE with actual city
    addressRegion: 'NJ', // ← REPLACE with actual state
    postalCode: '07102', // ← REPLACE with actual ZIP
    addressCountry: 'US',
  },

  // Geographic coordinates (get from Google Maps)
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.7357', // ← REPLACE with actual latitude
    longitude: '-74.1724', // ← REPLACE with actual longitude
  },

  // Service area (optional - can serve beyond physical location)
  areaServed: [
    { '@type': 'State', name: 'New Jersey' },
    { '@type': 'State', name: 'New York' },
    { '@type': 'State', name: 'Pennsylvania' },
  ],

  telephone: '+1-833-874-1019',
  email: 'info@nexttripanywhere.com',

  // Opening hours (match your GBP hours exactly)
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '23:00',
      timeZone: 'America/New_York',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '07:00',
      closes: '22:00',
      timeZone: 'America/New_York',
    },
  ],

  // Add reviews ONLY after collecting real GBP reviews
  // aggregateRating: {
  //   '@type': 'AggregateRating',
  //   ratingValue: '4.9',      // ← REPLACE with actual GBP rating
  //   reviewCount: '42',        // ← REPLACE with actual GBP review count
  //   bestRating: '5',
  //   worstRating: '1',
  // },

  // Add individual reviews (first 5-10 from GBP)
  // review: [
  //   {
  //     '@type': 'Review',
  //     author: {
  //       '@type': 'Person',
  //       name: 'Sarah Johnson', // ← Real customer name from GBP
  //     },
  //     datePublished: '2025-09-15', // ← Actual review date
  //     reviewBody: 'Amazing service! They planned our entire Caribbean cruise...', // ← Actual review text (first 200 chars)
  //     reviewRating: {
  //       '@type': 'Rating',
  //       ratingValue: '5',
  //       bestRating: '5',
  //     },
  //   },
  //   // ... add 4-9 more real reviews
  // ],
}

/**
 * HYBRID SCHEMA (Physical address but hidden, service area shown)
 * Use this if you have an office but primarily serve remotely
 */
export const hybridBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': 'https://nexttripanywhere.com/#organization',
  name: 'Next Trip Anywhere',
  url: 'https://nexttripanywhere.com',

  // Physical address (verified in GBP but can be hidden from customers)
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Newark', // Show city but not full address
    addressRegion: 'NJ',
    addressCountry: 'US',
    // streetAddress omitted = address hidden from public
  },

  // Service areas (what's shown to customers)
  areaServed: [
    { '@type': 'State', name: 'New Jersey' },
    { '@type': 'State', name: 'New York' },
    { '@type': 'State', name: 'Pennsylvania' },
    { '@type': 'State', name: 'Connecticut' },
  ],

  telephone: '+1-833-874-1019',
  email: 'info@nexttripanywhere.com',

  // GBP link
  sameAs: [
    'https://g.page/nexttripanywhere', // ← REPLACE with actual GBP URL
    // ... other social links
  ],
}

/**
 * HOW TO USE THESE TEMPLATES
 *
 * 1. After setting up your Google Business Profile, choose the appropriate schema above
 * 2. Replace all ← REPLACE comments with your actual data
 * 3. Copy the completed schema object
 * 4. Paste into app/layout.tsx replacing the current jsonLdOrganization constant
 * 5. Run: npm run build
 * 6. Verify the schema in Google's Rich Results Test: https://search.google.com/test/rich-results
 * 7. Deploy to production
 *
 * IMPORTANT: Only add aggregateRating AFTER collecting real reviews from GBP!
 */

/**
 * REVIEW SCHEMA EXAMPLE (Add after 10+ real reviews)
 */
export const reviewSchemaExample = {
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Michael Chen',
      },
      datePublished: '2025-10-01',
      reviewBody:
        'Excellent service from start to finish! They found us an amazing deal on a Mediterranean cruise and handled all the details. Highly recommend!',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Jennifer Martinez',
      },
      datePublished: '2025-09-28',
      reviewBody:
        'Great experience booking our family vacation. The agent was knowledgeable and patient with all our questions. Will definitely use again.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'David Thompson',
      },
      datePublished: '2025-09-20',
      reviewBody:
        'Saved us hundreds on our Alaska cruise. Very responsive and professional. Only minor issue was response time during peak hours.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8', // Average of all reviews
    reviewCount: '27', // Total reviews in GBP
    bestRating: '5',
    worstRating: '1',
  },
}

/**
 * VALIDATION CHECKLIST
 *
 * Before deploying schema changes:
 * □ All ← REPLACE comments removed
 * □ Real data from GBP inserted
 * □ GBP URL matches actual profile
 * □ Service areas match GBP settings
 * □ Reviews are real (from actual GBP)
 * □ Ratings match GBP exactly
 * □ Tested in Rich Results Test tool
 * □ No schema validation errors
 * □ Build completes successfully
 */
