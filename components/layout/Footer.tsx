'use client'

import Link from 'next/link'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { siteConfig } from '@/config/site'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  Shield,
  CreditCard,
  Award,
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Flights', href: '/flights' },
    { name: 'Cruises', href: '/cruises' },
    { name: 'Vacation Packages', href: '/packages' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Car Rentals', href: '/car-rentals' },
  ],
  destinations: [
    { name: 'Caribbean', href: '/destinations/caribbean' },
    { name: 'Europe', href: '/destinations/europe' },
    { name: 'Asia', href: '/destinations/asia' },
    { name: 'Mexico', href: '/destinations/mexico' },
    { name: 'Hawaii', href: '/destinations/hawaii' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Travel Insurance', href: '/insurance' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Sitemap', href: '/sitemap' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/nexttripanywhere' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/nexttripanywhere' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/nexttripanywhere' },
  { name: 'Youtube', icon: Youtube, href: 'https://youtube.com/nexttripanywhere' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Trust Badges */}
      <div className="bg-navy-600 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-accent-400" />
              <span>100% Secure Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-accent-400" />
              <span>Exclusive Travel Deals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-accent-400" />
              <span>ASTA Member Since 2010</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10">
                <OptimizedImage
                  src={siteConfig.logoPath}
                  alt="Next Trip Anywhere"
                  fill
                  className="object-contain brightness-0 invert"
                  unoptimized
                />
              </div>
              <span className="text-xl font-bold">Next Trip Anywhere</span>
            </div>
            <p className="text-gray-300 mb-4">
              America's trusted nationwide travel agency since 2010. Expert travel planning for
              flights, cruises, and vacation packages coast to coast.
            </p>
            <div className="space-y-2">
              <a
                href="tel:1-833-874-1019"
                className="flex items-center space-x-2 hover:text-accent-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>1-833-874-1019</span>
              </a>
              <a
                href="mailto:info@nexttripanywhere.com"
                className="flex items-center space-x-2 hover:text-accent-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@nexttripanywhere.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h3 className="text-xl font-semibold mb-2">Get Exclusive Deals</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for travel tips and special offers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:border-accent-400 focus:outline-none text-white placeholder:text-gray-400"
              />
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe5Wy5yxW42FXTyFDsBPK7A0eqqcP_XKYCf-PHhd9vmlfvVWQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-full hover:bg-accent-500 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
            <div className="text-center md:text-right text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} Next Trip Anywhere. All rights reserved.</p>
              <p className="mt-1">ASTA Member | CLIA Certified | BBB Accredited</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
