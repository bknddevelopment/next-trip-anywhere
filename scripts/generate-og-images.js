#!/usr/bin/env node

/**
 * Generate Open Graph social share images for nexttripanywhere.com
 * Creates 1200x630px JPG images using sharp
 */

const sharp = require('sharp');
const path = require('path');

// OG Image dimensions (Facebook/Twitter standard)
const WIDTH = 1200;
const HEIGHT = 630;

// Brand colors (travel industry blues/teals)
const COLORS = {
  primary: '#0369A1', // Ocean blue
  secondary: '#0891B2', // Teal
  accent: '#06B6D4', // Cyan
  white: '#FFFFFF',
  darkOverlay: 'rgba(3, 105, 161, 0.85)',
};

/**
 * Create SVG for homepage OG image
 */
function createHomeOgSvg() {
  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <!-- Gradient background -->
      <defs>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.primary};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${COLORS.secondary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.accent};stop-opacity:1" />
        </linearGradient>

        <!-- Wave pattern -->
        <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 50 Q 25 40, 50 50 T 100 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
          <path d="M0 60 Q 25 50, 50 60 T 100 60" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
        </pattern>
      </defs>

      <!-- Background with gradient -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#oceanGradient)"/>

      <!-- Wave pattern overlay -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#waves)" opacity="0.5"/>

      <!-- Decorative elements (ship/wave icons) -->
      <circle cx="150" cy="150" r="80" fill="rgba(255,255,255,0.05)"/>
      <circle cx="1050" cy="480" r="100" fill="rgba(255,255,255,0.05)"/>

      <!-- Content container with semi-transparent background -->
      <rect x="80" y="120" width="1040" height="390" rx="20" fill="rgba(0,0,0,0.3)"/>

      <!-- Main title -->
      <text
        x="${WIDTH / 2}"
        y="240"
        font-family="Arial, sans-serif"
        font-size="92"
        font-weight="bold"
        fill="${COLORS.white}"
        text-anchor="middle"
        letter-spacing="2">
        Next Trip Anywhere
      </text>

      <!-- Tagline -->
      <text
        x="${WIDTH / 2}"
        y="320"
        font-family="Arial, sans-serif"
        font-size="48"
        font-weight="300"
        fill="${COLORS.white}"
        text-anchor="middle"
        opacity="0.95">
        Your Essex County Travel Experts
      </text>

      <!-- Divider line -->
      <line
        x1="350"
        y1="360"
        x2="850"
        y2="360"
        stroke="${COLORS.white}"
        stroke-width="2"
        opacity="0.5"/>

      <!-- Phone number -->
      <text
        x="${WIDTH / 2}"
        y="430"
        font-family="Arial, sans-serif"
        font-size="58"
        font-weight="bold"
        fill="${COLORS.white}"
        text-anchor="middle">
        📞 833-874-1019
      </text>

      <!-- Bottom tagline -->
      <text
        x="${WIDTH / 2}"
        y="490"
        font-family="Arial, sans-serif"
        font-size="32"
        fill="${COLORS.white}"
        text-anchor="middle"
        opacity="0.9">
        Cruises • Vacations • Group Travel • Corporate
      </text>
    </svg>
  `;
}

/**
 * Create SVG for generic OG image (fallback)
 */
function createGenericOgSvg() {
  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <!-- Gradient background (slightly different) -->
      <defs>
        <linearGradient id="travelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0C4A6E;stop-opacity:1" />
          <stop offset="50%" style="stop-color:${COLORS.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.secondary};stop-opacity:1" />
        </linearGradient>

        <!-- Subtle pattern -->
        <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/>
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#travelGradient)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#dots)"/>

      <!-- Decorative circles -->
      <circle cx="100" cy="100" r="120" fill="rgba(255,255,255,0.03)"/>
      <circle cx="1100" cy="530" r="150" fill="rgba(255,255,255,0.03)"/>
      <circle cx="600" cy="315" r="200" fill="rgba(255,255,255,0.02)"/>

      <!-- Content box -->
      <rect x="100" y="140" width="1000" height="350" rx="15" fill="rgba(0,0,0,0.25)"/>

      <!-- Main title -->
      <text
        x="${WIDTH / 2}"
        y="260"
        font-family="Arial, sans-serif"
        font-size="88"
        font-weight="bold"
        fill="${COLORS.white}"
        text-anchor="middle"
        letter-spacing="1">
        Next Trip Anywhere
      </text>

      <!-- Subtitle -->
      <text
        x="${WIDTH / 2}"
        y="340"
        font-family="Arial, sans-serif"
        font-size="44"
        font-weight="300"
        fill="${COLORS.white}"
        text-anchor="middle"
        opacity="0.95">
        Essex County's Premier Travel Agency
      </text>

      <!-- Phone -->
      <text
        x="${WIDTH / 2}"
        y="420"
        font-family="Arial, sans-serif"
        font-size="52"
        font-weight="bold"
        fill="${COLORS.white}"
        text-anchor="middle">
        833-874-1019
      </text>
    </svg>
  `;
}

/**
 * Generate and save OG images
 */
async function generateOgImages() {
  const publicDir = path.join(__dirname, '..', 'public');

  console.log('🎨 Generating Open Graph images...\n');

  try {
    // Generate homepage OG image
    console.log('Creating og-home.jpg...');
    const homeSvg = Buffer.from(createHomeOgSvg());
    await sharp(homeSvg)
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(publicDir, 'og-home.jpg'));

    const homeStats = await sharp(path.join(publicDir, 'og-home.jpg')).metadata();
    console.log(`✅ og-home.jpg created: ${homeStats.width}x${homeStats.height}px`);

    // Generate generic OG image
    console.log('\nCreating og-image.jpg...');
    const genericSvg = Buffer.from(createGenericOgSvg());
    await sharp(genericSvg)
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(publicDir, 'og-image.jpg'));

    const genericStats = await sharp(path.join(publicDir, 'og-image.jpg')).metadata();
    console.log(`✅ og-image.jpg created: ${genericStats.width}x${genericStats.height}px`);

    console.log('\n🎉 Open Graph images generated successfully!');
    console.log('\n📍 Files created:');
    console.log('   - /public/og-home.jpg (Homepage social share)');
    console.log('   - /public/og-image.jpg (Default fallback)');
    console.log('\n📱 Optimized for:');
    console.log('   - Facebook: 1200x630px');
    console.log('   - Twitter: 1200x630px');
    console.log('   - LinkedIn: 1200x630px');

  } catch (error) {
    console.error('❌ Error generating OG images:', error);
    process.exit(1);
  }
}

// Run the generator
generateOgImages();