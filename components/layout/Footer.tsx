import Link from 'next/link'
import Image from 'next/image'
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
              <span>Best Price Guarantee</span>
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
                <Image
                  src="/NextTripAnywhere.PNG"
                  alt="Next Trip Anywhere"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">Next Trip Anywhere</h3>
                <p className="text-xs text-accent-400">Your East Coast Travel Expert</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Making dream vacations a reality since 2010. Expert travel planning for flights,
              cruises, and vacation packages from NYC, Boston, Miami, and DC.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
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

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Services</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Top Destinations</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Company</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-accent-400">Support</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-navy-600">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Get Exclusive Travel Deals</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for the best travel deals and insider tips
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:border-accent-400 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-navy-600 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Next Trip Anywhere. All rights reserved.</p>
          <p className="mt-2">IATA: 12345678 | CLIA: 00012345 | ARC: 12-3456789</p>
        </div>
      </div>
    </footer>
  )
}
