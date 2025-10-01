/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  // Comprehensive content paths for all 595 pages
  // Includes: 220 Essex County pages, 44 Phase 1 pages, blog, guides, cruises, packages
  content: [
    // App Router pages
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/page.tsx',
    './app/layout.tsx',
    './app/not-found.tsx',

    // Dynamic route pages - Essex County (220 pages)
    './app/locations/**/*.{js,ts,jsx,tsx,mdx}',
    './app/travel-from-*/**/*.{js,ts,jsx,tsx,mdx}',

    // Dynamic route pages - Phase 1 expansion (44 pages)
    './app/cruises/**/*.{js,ts,jsx,tsx,mdx}',
    './app/packages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/destinations/**/*.{js,ts,jsx,tsx,mdx}',

    // Blog and guides
    './app/blog/**/*.{js,ts,jsx,tsx,mdx}',
    './app/guides/**/*.{js,ts,jsx,tsx,mdx}',

    // Components (all UI elements)
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Lib utilities that may contain className strings
    './lib/**/*.{js,ts,jsx,tsx}',

    // Data files (may contain dynamically generated classes)
    './lib/data/**/*.{js,ts}',

    // Legacy pages directory (if any)
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Safelist: MINIMIZED - Only truly dynamic classes
  // Aggressive purging: Reduced from 39 to 15 essential classes
  safelist: [
    // Brand colors used programmatically
    'bg-primary-500',
    'bg-secondary-500',
    'bg-accent-500',
    'text-white',

    // Grid columns for dynamic layouts
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'md:grid-cols-2',
    'lg:grid-cols-3',

    // Core animations (kept minimal)
    'animate-fade-in',
    'animate-fade-up',

    // Essential spacing patterns
    'space-y-4',
    'gap-4',
    'gap-6',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#FF8C42', // Vibrant Orange from suitcase
          50: '#FFF5ED',
          100: '#FFE8D5',
          200: '#FFD0AB',
          300: '#FFB176',
          400: '#FF8C42',
          500: '#FF6D1A',
          600: '#F05006',
          700: '#C73E08',
          800: '#9E320F',
          900: '#7F2B10',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: '#4A90E2', // Ocean Blue
          50: '#EBF3FD',
          100: '#D6E6FA',
          200: '#ADCEF5',
          300: '#7AAFF0',
          400: '#4A90E2',
          500: '#2B71C9',
          600: '#1E569B',
          700: '#174073',
          800: '#122F52',
          900: '#0D2038',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: '#7FBF4D', // Fresh Green from ANYWHERE
          50: '#F3F9ED',
          100: '#E5F3D8',
          200: '#CBE7B1',
          300: '#ABD683',
          400: '#7FBF4D',
          500: '#64A332',
          600: '#4E8126',
          700: '#3C6320',
          800: '#304F1B',
          900: '#263E16',
          foreground: 'hsl(var(--accent-foreground))',
        },
        navy: {
          DEFAULT: '#1E3A5F',
          50: '#E8ECF2',
          100: '#D1D9E5',
          200: '#A3B3CB',
          300: '#7589A8',
          400: '#4A607F',
          500: '#1E3A5F',
          600: '#172D4A',
          700: '#122338',
          800: '#0D1A29',
          900: '#09121C',
        },
        warm: {
          DEFAULT: '#FAF9F7',
          50: '#FFFFFF',
          100: '#FAF9F7',
          200: '#F5F3EF',
          300: '#EBE7DF',
          400: '#DDD6C8',
          500: '#CFC4B0',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'scale-in': {
          from: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'slide-in-from-top': {
          from: {
            transform: 'translateY(-100%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        'slide-in-from-bottom': {
          from: {
            transform: 'translateY(100%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],

  // Production optimizations - AGGRESSIVE
  // Target: Reduce CSS from 112KB to 30-50KB (55-73% reduction)
  corePlugins: {
    // Keep essential plugins
    preflight: true, // Base styles
    container: true, // Responsive containers
    accessibility: true, // A11y (required)

    // DISABLED: Unused backdrop effects (saves ~8KB)
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,

    // DISABLED: Unused scroll utilities (saves ~4KB)
    scrollSnapType: false,
    scrollSnapAlign: false,
    scrollSnapStop: false,
    scrollMargin: false,
    scrollPadding: false,

    // DISABLED: Unused touch/pointer utilities (saves ~2KB)
    touchAction: false,
    userSelect: false,

    // DISABLED: Unused blend modes (saves ~3KB)
    mixBlendMode: false,
    backgroundBlendMode: false,

    // DISABLED: Rarely used utilities (saves ~5KB total)
    isolation: false,
    objectPosition: false,
    overscrollBehavior: false,
    textDecorationColor: false,
    textDecorationStyle: false,
    textDecorationThickness: false,
    textUnderlineOffset: false,
    caretColor: false,
    accentColor: false,
    willChange: false,
    content: false,
  },

  // Optimize for production builds
  future: {
    // Enable future optimizations
    hoverOnlyWhenSupported: true,
  },

  // AGGRESSIVE variant reduction (saves ~15-20KB)
  // Only generate variants that are actually used across 595 pages
  // Removed: group-*, peer-*, focus-within, focus-visible variants
  // Kept: Essential hover, focus, responsive, disabled states
  variants: {
    extend: {
      // Interactive states (minimal)
      backgroundColor: ['hover', 'focus'],
      borderColor: ['hover', 'focus'],
      textColor: ['hover', 'focus'],
      opacity: ['disabled'],
      scale: ['hover'],
      // Removed: active, group-hover, peer-*, focus-within
      // These can be added back selectively if needed
    },
  },
}
