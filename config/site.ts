/**
 * Site configuration for GitHub Pages deployment
 */

const isProd = process.env.NODE_ENV === 'production'
export const BASE_PATH = isProd ? '/next-trip-anywhere' : ''

export const siteConfig = {
  basePath: BASE_PATH,
  logoPath: `${BASE_PATH}/NextTripAnywhere.PNG`,
  name: 'Next Trip Anywhere',
  url: isProd ? 'https://bknddevelopment.github.io/next-trip-anywhere' : 'http://localhost:3000',
}