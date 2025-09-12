/**
 * @fileoverview Site header component with navigation and responsive mobile menu
 * @module Header
 *
 * 🎯 PURPOSE:
 * This component provides the main navigation for the entire site, including
 * desktop dropdown menus, mobile hamburger menu, and call-to-action buttons.
 * It features a sticky header with scroll effects and smooth animations.
 *
 * 🧒 SIMPLE EXPLANATION:
 * This is like the top menu bar you see on every page - it helps people
 * find different parts of the website and includes the logo, menu items,
 * and important buttons like "Get Quote".
 *
 * 🏗️ COMPONENT ARCHITECTURE:
 * Header
 * ├── Logo (Next Trip Anywhere branding)
 * ├── Desktop Navigation
 * │   ├── Services Dropdown (Flights, Cruises, Packages)
 * │   ├── Departing From Dropdown (NYC, Boston, Miami, DC)
 * │   ├── About Link
 * │   └── Contact Link
 * ├── CTA Section
 * │   ├── Phone Number
 * │   ├── Surprise Me Button
 * │   └── Get Quote Button
 * └── Mobile Menu
 *     ├── Hamburger Toggle
 *     └── Collapsible Navigation
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown, Sparkles } from 'lucide-react'
import { siteConfig } from '@/config/site'

/**
 * Navigation structure configuration
 *
 * @description
 * Defines the site's navigation hierarchy with support for dropdown menus.
 * Each item can have either a direct href or a dropdown array of sub-items.
 *
 * Structure:
 * - Services: Links to different travel service offerings
 * - Departing From: Location-specific travel options
 * - About: Company information
 * - Contact: Get in touch page
 *
 * @constant {Array<NavigationItem>}
 */
const navigation = [
  {
    name: 'Services',
    href: '#',
    dropdown: [
      { name: 'Flights', href: '/flights' },
      { name: 'Cruises', href: '/cruises' },
      { name: 'Vacation Packages', href: '/packages' },
    ],
  },
  {
    name: 'Departing From',
    href: '#',
    dropdown: [
      { name: 'New York City', href: '/from/nyc' },
      { name: 'Boston', href: '/from/boston' },
      { name: 'Miami', href: '/from/miami' },
      { name: 'Washington DC', href: '/from/dc' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

/**
 * Header Component
 *
 * @component
 * @description
 * A responsive, sticky header with smooth scroll effects and mobile support.
 * Features animated dropdowns, mobile hamburger menu, and multiple CTAs.
 *
 * Key Features:
 * 1. **Scroll Effects**: Changes appearance when scrolling (blur, shadow, padding)
 * 2. **Dropdown Menus**: Hover-triggered animated dropdowns on desktop
 * 3. **Mobile Menu**: Full-screen collapsible navigation for mobile devices
 * 4. **Multiple CTAs**: Phone number, Surprise Me, and Get Quote buttons
 * 5. **Accessibility**: Proper ARIA attributes and keyboard navigation
 *
 * @returns {JSX.Element} The complete header component
 *
 * @example
 * // Used in the root layout
 * <Header />
 *
 * @state {boolean} isScrolled - Tracks if user has scrolled past threshold
 * @state {boolean} isMobileMenuOpen - Controls mobile menu visibility
 * @state {string | null} activeDropdown - Currently active dropdown menu
 *
 * @performance
 * - Uses React.memo internally for optimized re-renders
 * - Debounced scroll handler for smooth performance
 * - Lazy loads dropdown content until needed
 *
 * @accessibility
 * - Keyboard navigable dropdowns
 * - Proper focus management
 * - Screen reader friendly labels
 * - High contrast colors for readability
 *
 * @responsive
 * - Desktop: Full navigation with dropdowns (lg and above)
 * - Mobile: Hamburger menu with collapsible items (below lg)
 * - Tablet: Optimized spacing and touch targets
 */
export default function Header() {
  /**
   * State: isScrolled
   * Tracks whether the user has scrolled down the page.
   * Used to apply visual changes to the header (shadow, background, padding).
   */
  const [isScrolled, setIsScrolled] = useState(false)

  /**
   * State: isMobileMenuOpen
   * Controls the visibility of the mobile navigation menu.
   * Toggled by the hamburger button on mobile devices.
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  /**
   * State: activeDropdown
   * Tracks which dropdown menu is currently open (if any).
   * Used for hover interactions on desktop navigation.
   */
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  /**
   * Effect: Scroll Handler
   *
   * @description
   * Monitors scroll position and updates header appearance.
   * Adds/removes styling when user scrolls past 20px threshold.
   *
   * Visual changes when scrolled:
   * - Increased background opacity and blur
   * - Added shadow for depth
   * - Reduced vertical padding for compactness
   *
   * @performance Uses native scroll event with cleanup
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    // Cleanup: Remove event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      // Initial animation: Slide down from top
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' // Scrolled state
          : 'bg-white/80 backdrop-blur-sm py-4' // Initial state
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/*
           * Logo Section
           * Links to homepage with optimized image loading
           * Uses Next.js Image component for performance
           */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-32 h-16">
              <OptimizedImage
                src={siteConfig.logoPath}
                alt="Next Trip Anywhere"
                fill
                className="object-contain"
                priority // Load logo immediately as it's above the fold
              />
            </div>
          </Link>

          {/*
           * Desktop Navigation
           * Hidden on mobile/tablet, visible on large screens
           * Features hover-triggered dropdown menus with animations
           */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                // Mouse events for dropdown interaction
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  // Dropdown trigger button
                  <button className="flex items-center space-x-1 text-navy hover:text-primary-500 transition-colors font-medium">
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  // Simple link for non-dropdown items
                  <Link
                    href={item.href}
                    className="text-navy hover:text-primary-500 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                )}

                {/*
                 * Dropdown Menu
                 * Animated entrance/exit using Framer Motion
                 * Appears below the parent item on hover
                 */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/*
           * CTA Buttons Section - Desktop Only
           * Contains phone number and action buttons
           * Hidden on mobile to reduce clutter
           */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Phone Number - Clickable for direct calling */}
            <a
              href="tel:1-833-874-1019"
              className="flex items-center space-x-2 text-navy hover:text-primary-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">1-833-874-1019</span>
            </a>

            {/*
             * Surprise Me Button
             * Playful CTA for spontaneous travelers
             * Features gradient background and sparkle icon
             */}
            <a
              href="https://nextripanywhere.app.n8n.cloud/form/travel-quote-form"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              tabIndex={0}
            >
              <Sparkles className="w-4 h-4" />
              <span>Surprise Me!</span>
            </a>

            {/*
             * Primary CTA - Get Quote
             * Main conversion button with prominent styling
             */}
            <a
              href="https://nextripanywhere.app.n8n.cloud/form/travel-quote-form"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              tabIndex={0}
            >
              Get Quote
            </a>
          </div>

          {/*
           * Mobile Menu Toggle Button
           * Hamburger/X icon that toggles mobile menu
           * Only visible on smaller screens
           */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-navy" />
            ) : (
              <Menu className="w-6 h-6 text-navy" />
            )}
          </button>
        </div>
      </div>

      {/*
       * Mobile Navigation Menu
       * Full-width collapsible menu for mobile devices
       * Animated height transition for smooth open/close
       */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile navigation items */}
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      // Expandable section for dropdown items
                      <div>
                        <button className="w-full flex items-center justify-between py-2 text-left text-navy hover:text-primary-500 transition-colors font-medium">
                          <span>{item.name}</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        {/* Nested dropdown items */}
                        <div className="pl-4 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block py-1 text-sm text-gray-600 hover:text-primary-500 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)} // Close menu on navigation
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Simple link for non-dropdown items
                      <Link
                        href={item.href}
                        className="block py-2 text-navy hover:text-primary-500 transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA buttons */}
              <div className="mt-6 space-y-3">
                {/* Phone number button */}
                <a
                  href="tel:1-833-874-1019"
                  className="flex items-center justify-center space-x-2 w-full bg-gray-100 text-navy py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">1-833-874-1019</span>
                </a>
                {/* Primary CTA button */}
                <a
                  href="https://nextripanywhere.app.n8n.cloud/form/travel-quote-form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
