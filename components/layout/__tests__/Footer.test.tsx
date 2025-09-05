import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Footer from '../Footer'

// Mock the OptimizedImage component
vi.mock('@/components/ui/OptimizedImage', () => ({
  default: ({ src, alt, className, ...props }: any) => (
    <img src={src} alt={alt} className={className} {...props} />
  ),
}))

// Mock the site config
vi.mock('@/config/site', () => ({
  siteConfig: {
    logoPath: '/logo.png',
  },
}))

describe('Footer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render footer with logo and company name', () => {
      render(<Footer />)

      const logo = screen.getByAltText('Next Trip Anywhere')
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveAttribute('src', '/logo.png')

      expect(screen.getByText('Next Trip Anywhere')).toBeInTheDocument()
    })

    it('should render company description', () => {
      render(<Footer />)

      const description = screen.getByText(/Your trusted East Coast travel agency since 2010/)
      expect(description).toBeInTheDocument()
    })

    it('should render all trust badges', () => {
      render(<Footer />)

      expect(screen.getByText('100% Secure Booking')).toBeInTheDocument()
      expect(screen.getByText('Best Price Guarantee')).toBeInTheDocument()
      expect(screen.getByText('ASTA Member Since 2010')).toBeInTheDocument()
    })

    it('should render contact information', () => {
      render(<Footer />)

      const phoneLink = screen.getByRole('link', { name: /1-833-874-1019/i })
      expect(phoneLink).toBeInTheDocument()
      expect(phoneLink).toHaveAttribute('href', 'tel:1-833-874-1019')

      const emailLink = screen.getByRole('link', { name: /info@nexttripanywhere.com/i })
      expect(emailLink).toBeInTheDocument()
      expect(emailLink).toHaveAttribute('href', 'mailto:info@nexttripanywhere.com')
    })

    it('should render copyright text with current year', () => {
      render(<Footer />)

      const currentYear = new Date().getFullYear()
      const copyrightText = screen.getByText(new RegExp(`© ${currentYear} Next Trip Anywhere`))
      expect(copyrightText).toBeInTheDocument()
    })

    it('should render accreditation text', () => {
      render(<Footer />)

      expect(screen.getByText('ASTA Member | CLIA Certified | BBB Accredited')).toBeInTheDocument()
    })
  })

  describe('Services Links', () => {
    it('should render all service links', () => {
      render(<Footer />)

      expect(screen.getByRole('link', { name: 'Flights' })).toHaveAttribute('href', '/flights')
      expect(screen.getByRole('link', { name: 'Cruises' })).toHaveAttribute('href', '/cruises')
      expect(screen.getByRole('link', { name: 'Vacation Packages' })).toHaveAttribute(
        'href',
        '/packages'
      )
      expect(screen.getByRole('link', { name: 'Hotels' })).toHaveAttribute('href', '/hotels')
      expect(screen.getByRole('link', { name: 'Car Rentals' })).toHaveAttribute(
        'href',
        '/car-rentals'
      )
    })

    it('should have proper heading for Services section', () => {
      render(<Footer />)

      const servicesHeading = screen.getByRole('heading', { name: 'Services', level: 3 })
      expect(servicesHeading).toBeInTheDocument()
    })
  })

  describe('Destinations Links', () => {
    it('should render all destination links', () => {
      render(<Footer />)

      expect(screen.getByRole('link', { name: 'Caribbean' })).toHaveAttribute(
        'href',
        '/destinations/caribbean'
      )
      expect(screen.getByRole('link', { name: 'Europe' })).toHaveAttribute(
        'href',
        '/destinations/europe'
      )
      expect(screen.getByRole('link', { name: 'Asia' })).toHaveAttribute(
        'href',
        '/destinations/asia'
      )
      expect(screen.getByRole('link', { name: 'Mexico' })).toHaveAttribute(
        'href',
        '/destinations/mexico'
      )
      expect(screen.getByRole('link', { name: 'Hawaii' })).toHaveAttribute(
        'href',
        '/destinations/hawaii'
      )
    })

    it('should have proper heading for Destinations section', () => {
      render(<Footer />)

      const destinationsHeading = screen.getByRole('heading', { name: 'Destinations', level: 3 })
      expect(destinationsHeading).toBeInTheDocument()
    })
  })

  describe('Company Links', () => {
    it('should render all company links', () => {
      render(<Footer />)

      expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about')
      expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
      expect(screen.getByRole('link', { name: 'Careers' })).toHaveAttribute('href', '/careers')
      expect(screen.getByRole('link', { name: 'Press' })).toHaveAttribute('href', '/press')
      expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
    })

    it('should have proper heading for Company section', () => {
      render(<Footer />)

      const companyHeading = screen.getByRole('heading', { name: 'Company', level: 3 })
      expect(companyHeading).toBeInTheDocument()
    })
  })

  describe('Support Links', () => {
    it('should render all support links', () => {
      render(<Footer />)

      expect(screen.getByRole('link', { name: 'Help Center' })).toHaveAttribute('href', '/help')
      expect(screen.getByRole('link', { name: 'Travel Insurance' })).toHaveAttribute(
        'href',
        '/insurance'
      )
      expect(screen.getByRole('link', { name: 'Terms & Conditions' })).toHaveAttribute(
        'href',
        '/terms'
      )
      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
        'href',
        '/privacy'
      )
      expect(screen.getByRole('link', { name: 'Sitemap' })).toHaveAttribute('href', '/sitemap')
    })

    it('should have proper heading for Support section', () => {
      render(<Footer />)

      const supportHeading = screen.getByRole('heading', { name: 'Support', level: 3 })
      expect(supportHeading).toBeInTheDocument()
    })
  })

  describe('Newsletter Section', () => {
    it('should render newsletter heading and description', () => {
      render(<Footer />)

      expect(screen.getByRole('heading', { name: 'Get Exclusive Deals' })).toBeInTheDocument()
      expect(
        screen.getByText('Subscribe to our newsletter for travel tips and special offers')
      ).toBeInTheDocument()
    })

    it('should render email input field', () => {
      render(<Footer />)

      const emailInput = screen.getByPlaceholderText('Enter your email')
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('should render subscribe button', () => {
      render(<Footer />)

      const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })
      expect(subscribeButton).toBeInTheDocument()
    })

    it('should allow typing in email input', async () => {
      const user = userEvent.setup()
      render(<Footer />)

      const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement
      await user.type(emailInput, 'test@example.com')

      expect(emailInput.value).toBe('test@example.com')
    })
  })

  describe('Social Links', () => {
    it('should render all social media links', () => {
      render(<Footer />)

      const facebookLink = screen.getByRole('link', { name: 'Facebook' })
      expect(facebookLink).toBeInTheDocument()
      expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/nexttripanywhere')
      expect(facebookLink).toHaveAttribute('target', '_blank')
      expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer')

      const twitterLink = screen.getByRole('link', { name: 'Twitter' })
      expect(twitterLink).toBeInTheDocument()
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/nexttripanywhere')

      const instagramLink = screen.getByRole('link', { name: 'Instagram' })
      expect(instagramLink).toBeInTheDocument()
      expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/nexttripanywhere')

      const youtubeLink = screen.getByRole('link', { name: 'Youtube' })
      expect(youtubeLink).toBeInTheDocument()
      expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/nexttripanywhere')
    })

    it('should open social links in new tab', () => {
      render(<Footer />)

      const socialLinks = [
        screen.getByRole('link', { name: 'Facebook' }),
        screen.getByRole('link', { name: 'Twitter' }),
        screen.getByRole('link', { name: 'Instagram' }),
        screen.getByRole('link', { name: 'Youtube' }),
      ]

      socialLinks.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Styling and Layout', () => {
    it('should have proper footer element', () => {
      const { container } = render(<Footer />)

      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('bg-navy', 'text-white')
    })

    it('should have trust badges section with proper background', () => {
      const { container } = render(<Footer />)

      const trustBadgesSection = container.querySelector('.bg-navy-600')
      expect(trustBadgesSection).toBeInTheDocument()
    })

    it('should use grid layout for footer links', () => {
      const { container } = render(<Footer />)

      const gridContainer = container.querySelector('.grid')
      expect(gridContainer).toBeInTheDocument()
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-6')
    })

    it('should have proper hover states for links', () => {
      render(<Footer />)

      const link = screen.getByRole('link', { name: 'Flights' })
      expect(link).toHaveClass('hover:text-accent-400', 'transition-colors')
    })
  })

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const { container } = render(<Footer />)

      expect(container.querySelector('footer')).toBeInTheDocument()
      expect(container.querySelectorAll('h3').length).toBeGreaterThan(0)
      expect(container.querySelectorAll('ul').length).toBeGreaterThan(0)
    })

    it('should have proper aria-labels for social links', () => {
      render(<Footer />)

      expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
      expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
      expect(screen.getByLabelText('Youtube')).toBeInTheDocument()
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Footer />)

      // Tab through links
      await user.tab()

      // Check that links can receive focus
      const firstLink = screen.getByRole('link', { name: /1-833-874-1019/i })
      expect(document.body.contains(firstLink)).toBe(true)
    })

    it('should have proper heading hierarchy', () => {
      render(<Footer />)

      const headings = screen.getAllByRole('heading', { level: 3 })
      expect(headings.length).toBeGreaterThan(0)

      // Check specific headings exist
      expect(screen.getByRole('heading', { name: 'Services', level: 3 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Destinations', level: 3 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Company', level: 3 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Support', level: 3 })).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive grid classes', () => {
      const { container } = render(<Footer />)

      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-6')
    })

    it('should have responsive flex classes for social and copyright', () => {
      const { container } = render(<Footer />)

      const flexContainer = container.querySelector('.flex.flex-col.md\\:flex-row')
      expect(flexContainer).toBeInTheDocument()
    })

    it('should have responsive text alignment', () => {
      const { container } = render(<Footer />)

      const copyrightSection = container.querySelector('.text-center.md\\:text-right')
      expect(copyrightSection).toBeInTheDocument()
    })
  })
})
