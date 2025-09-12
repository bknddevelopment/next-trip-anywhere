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
  url: isProd ? 'https://nexttripanywhere.com' : 'http://localhost:3000',
}
