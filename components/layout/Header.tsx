'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown, Sparkles } from 'lucide-react'

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

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-32 h-16">
              <Image
                src="/NextTripAnywhere.PNG"
                alt="Next Trip Anywhere"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <button className="flex items-center space-x-1 text-navy hover:text-primary-500 transition-colors font-medium">
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-navy hover:text-primary-500 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[200px]"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
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

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:1-833-874-1019"
              className="flex items-center space-x-2 text-navy hover:text-primary-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">1-833-874-1019</span>
            </a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Surprise Me!</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Quote
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-200"
            >
              <nav className="space-y-2 mt-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                          {item.name}
                        </div>
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-6 py-2 text-navy hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-navy hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-6 space-y-3 px-3">
                <a
                  href="tel:1-833-874-1019"
                  className="flex items-center justify-center space-x-2 text-navy font-semibold py-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>1-833-874-1019</span>
                </a>

                <button className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg flex items-center justify-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Surprise Me!</span>
                </button>

                <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                  Get Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
