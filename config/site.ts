/**
 * Site configuration for custom domain deployment
 */

const isProd = process.env.NODE_ENV === 'production'
// No base path needed for custom domain (nexttripanywhere.com)
export const BASE_PATH = ''

export const siteConfig = {
  basePath: BASE_PATH,
  logoPath: '/NextTripAnywhere.PNG', // Direct path without base path
  name: 'Next Trip Anywhere',
  description: 'Your trusted Essex County travel agency specializing in cruises, vacation packages, and flight bookings from Newark, NJ.',
  url: isProd ? 'https://nexttripanywhere.com' : 'http://localhost:3000',
  phone: '833-874-1019',
  email: 'info@nexttripanywhere.com',
  social: {
    facebook: 'https://facebook.com/nexttripanywhere',
    instagram: 'https://instagram.com/nexttripanywhere',
    twitter: 'https://twitter.com/nexttripanywhere',
  },
}
