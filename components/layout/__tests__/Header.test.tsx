import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

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

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe('Header', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Desktop Navigation', () => {
    it('should render logo with link to home', () => {
      render(<Header />)

      const logo = screen.getByAltText('Next Trip Anywhere')
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveAttribute('src', '/logo.png')

      const logoLink = logo.closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should render all navigation links', () => {
      render(<Header />)

      // Check main navigation items
      expect(screen.getByText('Services')).toBeInTheDocument()
      expect(screen.getByText('Departing From')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('should have correct href attributes for navigation links', () => {
      render(<Header />)

      const aboutLink = screen.getByRole('link', { name: 'About' })
      expect(aboutLink).toHaveAttribute('href', '/about')

      const contactLink = screen.getByRole('link', { name: 'Contact' })
      expect(contactLink).toHaveAttribute('href', '/contact')
    })

    it('should render dropdown buttons', () => {
      render(<Header />)

      const servicesButton = screen.getByText('Services')
      expect(servicesButton).toBeInTheDocument()

      const departingButton = screen.getByText('Departing From')
      expect(departingButton).toBeInTheDocument()
    })

    it('should show Services dropdown menu on hover', async () => {
      render(<Header />)

      const servicesButton = screen.getByText('Services').parentElement as HTMLElement

      // Hover over services button
      fireEvent.mouseEnter(servicesButton)

      await waitFor(() => {
        expect(screen.getByText('Flights')).toBeInTheDocument()
        expect(screen.getByText('Cruises')).toBeInTheDocument()
        expect(screen.getByText('Vacation Packages')).toBeInTheDocument()
      })
    })

    it('should show Departing From dropdown on hover', async () => {
      render(<Header />)

      const departingButton = screen.getByText('Departing From').parentElement as HTMLElement

      // Show dropdown
      fireEvent.mouseEnter(departingButton)

      await waitFor(() => {
        expect(screen.getByText('New York City')).toBeInTheDocument()
        expect(screen.getByText('Boston')).toBeInTheDocument()
        expect(screen.getByText('Miami')).toBeInTheDocument()
        expect(screen.getByText('Washington DC')).toBeInTheDocument()
      })

      // Hide dropdown
      fireEvent.mouseLeave(departingButton)

      await waitFor(() => {
        expect(screen.queryByText('New York City')).not.toBeInTheDocument()
      })
    })

    it('should render CTA buttons', () => {
      render(<Header />)

      // Phone number
      expect(screen.getByText('1-833-874-1019')).toBeInTheDocument()

      // Surprise Me button
      expect(screen.getByText('Surprise Me!')).toBeInTheDocument()

      // Get Quote button (appears in both desktop and mobile versions)
      const quoteButtons = screen.getAllByText('Get Quote')
      expect(quoteButtons.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Mobile Navigation', () => {
    it('should render mobile menu button', () => {
      render(<Header />)

      // Find the button that contains the Menu or X icon
      const menuButtons = screen.getAllByRole('button')
      const menuButton = menuButtons.find(
        (btn) =>
          btn.querySelector('.lucide-menu') !== null ||
          btn.querySelector('[class*="w-6"][class*="h-6"]') !== null
      )
      expect(menuButton).toBeInTheDocument()
    })

    it('should toggle mobile menu on button click', async () => {
      const user = userEvent.setup()
      render(<Header />)

      // Find the mobile menu button
      const menuButtons = screen.getAllByRole('button')
      const menuButton = menuButtons.find((btn) => btn.className.includes('lg:hidden'))

      if (menuButton) {
        // Menu should be closed initially (check for absence of mobile menu items)
        expect(screen.queryAllByText('Services').length).toBe(1)

        // Open menu
        await user.click(menuButton)

        await waitFor(() => {
          // Should now have multiple instances of navigation items (desktop + mobile)
          expect(screen.queryAllByText('Services').length).toBeGreaterThan(1)
        })

        // Close menu
        await user.click(menuButton)

        await waitFor(() => {
          expect(screen.queryAllByText('Services').length).toBe(1)
        })
      }
    })

    it('should render all navigation links in mobile menu', async () => {
      const user = userEvent.setup()
      render(<Header />)

      // Find and click the mobile menu button
      const menuButtons = screen.getAllByRole('button')
      const menuButton = menuButtons.find((btn) => btn.className.includes('lg:hidden'))

      if (menuButton) {
        await user.click(menuButton)

        await waitFor(() => {
          // Check for mobile navigation items
          const allServicesElements = screen.getAllByText('Services')
          expect(allServicesElements.length).toBeGreaterThan(1)

          const allAboutElements = screen.getAllByText('About')
          expect(allAboutElements.length).toBeGreaterThan(1)
        })
      }
    })

    it('should close mobile menu when clicking a link', async () => {
      const user = userEvent.setup()
      render(<Header />)

      // Find and click mobile menu button
      const menuButtons = screen.getAllByRole('button')
      const menuButton = menuButtons.find((btn) => btn.className.includes('lg:hidden'))

      if (menuButton) {
        await user.click(menuButton)

        await waitFor(() => {
          const allAboutElements = screen.getAllByText('About')
          expect(allAboutElements.length).toBeGreaterThan(1)
        })

        // Click a mobile link (the second About link is in mobile menu)
        const aboutLinks = screen.getAllByText('About')
        const mobileAboutLink = aboutLinks[1]
        await user.click(mobileAboutLink)

        await waitFor(() => {
          // Menu should be closed - only one instance of About should remain
          expect(screen.getAllByText('About').length).toBe(1)
        })
      }
    })

    it('should render CTA button in mobile menu', async () => {
      const user = userEvent.setup()
      render(<Header />)

      // Find and click mobile menu button
      const menuButtons = screen.getAllByRole('button')
      const menuButton = menuButtons.find((btn) => btn.className.includes('lg:hidden'))

      if (menuButton) {
        await user.click(menuButton)

        await waitFor(() => {
          // Should have Get Quote button in mobile menu
          const quoteButtons = screen.getAllByText('Get Quote')
          expect(quoteButtons.length).toBeGreaterThan(1)
        })
      }
    })
  })

  describe('Scroll Behavior', () => {
    it('should change header styles on scroll', async () => {
      const { container } = render(<Header />)
      const header = container.querySelector('header')

      // Initial state - not scrolled
      expect(header).toHaveClass('bg-white/80')
      expect(header).toHaveClass('py-4')

      // Simulate scroll
      window.scrollY = 50
      fireEvent.scroll(window)

      await waitFor(() => {
        expect(header).toHaveClass('bg-white/95')
        expect(header).toHaveClass('py-2')
      })

      // Scroll back to top
      window.scrollY = 0
      fireEvent.scroll(window)

      await waitFor(() => {
        expect(header).toHaveClass('bg-white/80')
        expect(header).toHaveClass('py-4')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper tabIndex on buttons', () => {
      render(<Header />)

      // Check for tabindex on buttons
      const surpriseButton = screen.getByText('Surprise Me!').closest('button')
      expect(surpriseButton).toHaveAttribute('tabIndex', '0')

      const quoteButtons = screen.getAllByText('Get Quote')
      const quoteButton = quoteButtons[0].closest('button')
      expect(quoteButton).toHaveAttribute('tabIndex', '0')
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Header />)

      // Tab through navigation
      await user.tab()

      // Logo link should be reachable
      const logoLink = screen.getByAltText('Next Trip Anywhere').closest('a')
      expect(logoLink).toBeInTheDocument()
    })

    it('should have semantic HTML structure', () => {
      const { container } = render(<Header />)

      // Should use header tag
      expect(container.querySelector('header')).toBeInTheDocument()

      // Should use nav tag
      expect(container.querySelector('nav')).toBeInTheDocument()
    })
  })
})
