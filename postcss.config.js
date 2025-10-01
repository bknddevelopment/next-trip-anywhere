/**
 * PostCSS Configuration - Simplified for Next.js compatibility
 *
 * Target: Reduce CSS from 112KB to 30-50KB through:
 * 1. Tailwind's built-in purging (configured in tailwind.config.js)
 * 2. Next.js CSS minification
 * 3. Critical CSS inlining (in layout.tsx)
 */

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
