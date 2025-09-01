import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@/test-utils/render'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

// Mock next/link
vi.mock('next/link', () => ({
  default: vi.fn(({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: vi.fn(({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  )),
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe('Header', () => {
  beforeEach(() => {
    // Reset viewport
    global.innerWidth = 1024
    global.dispatchEvent(new Event('resize'))
  })

  describe('Desktop Navigation', () => {
    it('should render logo with link to home', () => {
      render(<Header />)

      const logo = screen.getByAltText(/Next Trip Anywhere/i)
      expect(logo).toBeInTheDocument()

      const logoLink = logo.closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should render all navigation links', () => {
      render(<Header />)

      expect(screen.getByRole('link', { name: /^Flights$/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /^Packages$/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /^Cruises$/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /^About$/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /^Contact$/i })).toBeInTheDocument()
    })

    it('should have correct href attributes for navigation links', () => {
      render(<Header />)

      expect(screen.getByRole('link', { name: /^Flights$/i })).toHaveAttribute('href', '/flights')
      expect(screen.getByRole('link', { name: /^Packages$/i })).toHaveAttribute('href', '/packages')
      expect(screen.getByRole('link', { name: /^Cruises$/i })).toHaveAttribute('href', '/cruises')
      expect(screen.getByRole('link', { name: /^About$/i })).toHaveAttribute('href', '/about')
      expect(screen.getByRole('link', { name: /^Contact$/i })).toHaveAttribute('href', '/contact')
    })

    it('should render location dropdown', () => {
      render(<Header />)

      const locationsButton = screen.getByRole('button', { name: /Locations/i })
      expect(locationsButton).toBeInTheDocument()
    })

    it('should show location dropdown menu on hover', async () => {
      render(<Header />)

      const locationsButton = screen.getByRole('button', { name: /Locations/i })

      // Hover over locations button
      fireEvent.mouseEnter(locationsButton.parentElement as HTMLElement)

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /New York City/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Boston/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Miami/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Washington DC/i })).toBeInTheDocument()
      })
    })

    it('should hide location dropdown on mouse leave', async () => {
      render(<Header />)

      const locationsButton = screen.getByRole('button', { name: /Locations/i })

      // Show dropdown
      fireEvent.mouseEnter(locationsButton.parentElement as HTMLElement)

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /New York City/i })).toBeInTheDocument()
      })

      // Hide dropdown
      fireEvent.mouseLeave(locationsButton.parentElement as HTMLElement)

      await waitFor(() => {
        expect(screen.queryByRole('link', { name: /New York City/i })).not.toBeInTheDocument()
      })
    })

    it('should render CTA button', () => {
      render(<Header />)

      const ctaButton = screen.getByRole('button', { name: /Get Quote/i })
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveClass('bg-orange')
    })
  })

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      // Set mobile viewport
      global.innerWidth = 375
      global.dispatchEvent(new Event('resize'))
    })

    it('should render mobile menu button', () => {
      render(<Header />)

      const menuButton = screen.getByLabelText(/Toggle menu/i)
      expect(menuButton).toBeInTheDocument()
    })

    it('should toggle mobile menu on button click', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const menuButton = screen.getByLabelText(/Toggle menu/i)

      // Menu should be closed initially
      expect(screen.queryByRole('navigation', { name: /Mobile menu/i })).not.toBeInTheDocument()

      // Open menu
      await user.click(menuButton)

      await waitFor(() => {
        expect(screen.getByRole('navigation', { name: /Mobile menu/i })).toBeInTheDocument()
      })

      // Close menu
      await user.click(menuButton)

      await waitFor(() => {
        expect(screen.queryByRole('navigation', { name: /Mobile menu/i })).not.toBeInTheDocument()
      })
    })

    it('should render all navigation links in mobile menu', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const menuButton = screen.getByLabelText(/Toggle menu/i)
      await user.click(menuButton)

      await waitFor(() => {
        const mobileNav = screen.getByRole('navigation', { name: /Mobile menu/i })

        expect(within(mobileNav).getByRole('link', { name: /^Flights$/i })).toBeInTheDocument()
        expect(within(mobileNav).getByRole('link', { name: /^Packages$/i })).toBeInTheDocument()
        expect(within(mobileNav).getByRole('link', { name: /^Cruises$/i })).toBeInTheDocument()
        expect(within(mobileNav).getByRole('link', { name: /New York City/i })).toBeInTheDocument()
        expect(within(mobileNav).getByRole('link', { name: /Boston/i })).toBeInTheDocument()
        expect(within(mobileNav).getByRole('link', { name: /Miami/i })).toBeInTheDocument()
        expect(within(mobileNav).getByRole('link', { name: /Washington DC/i })).toBeInTheDocument()
        expect(within(mobileNav).getByRole('link', { name: /^About$/i })).toBeInTheDocument()
        expect(within(mobileNav).getByRole('link', { name: /^Contact$/i })).toBeInTheDocument()
      })
    })

    it('should close mobile menu when clicking a link', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const menuButton = screen.getByLabelText(/Toggle menu/i)
      await user.click(menuButton)

      await waitFor(() => {
        expect(screen.getByRole('navigation', { name: /Mobile menu/i })).toBeInTheDocument()
      })

      const flightsLink = screen.getByRole('link', { name: /^Flights$/i })
      await user.click(flightsLink)

      await waitFor(() => {
        expect(screen.queryByRole('navigation', { name: /Mobile menu/i })).not.toBeInTheDocument()
      })
    })

    it('should render CTA button in mobile menu', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const menuButton = screen.getByLabelText(/Toggle menu/i)
      await user.click(menuButton)

      await waitFor(() => {
        const mobileNav = screen.getByRole('navigation', { name: /Mobile menu/i })
        const ctaButton = within(mobileNav).getByRole('button', { name: /Get Quote/i })
        expect(ctaButton).toBeInTheDocument()
      })
    })
  })

  describe('Scroll Behavior', () => {
    it('should add shadow on scroll', async () => {
      render(<Header />)

      const header = screen.getByRole('banner')

      // Initial state - no shadow
      expect(header).not.toHaveClass('shadow-lg')

      // Simulate scroll
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 100,
      })

      fireEvent.scroll(window)

      await waitFor(() => {
        expect(header).toHaveClass('shadow-lg')
      })
    })

    it('should remove shadow when scrolled to top', async () => {
      render(<Header />)

      const header = screen.getByRole('banner')

      // Scroll down first
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 100,
      })
      fireEvent.scroll(window)

      await waitFor(() => {
        expect(header).toHaveClass('shadow-lg')
      })

      // Scroll back to top
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 0,
      })
      fireEvent.scroll(window)

      await waitFor(() => {
        expect(header).not.toHaveClass('shadow-lg')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Header />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('should have proper focus management', async () => {
      const user = userEvent.setup()
      render(<Header />)

      // Tab through navigation
      await user.tab()
      expect(screen.getByAltText(/Next Trip Anywhere/i).closest('a')).toHaveFocus()

      await user.tab()
      expect(screen.getByRole('link', { name: /^Flights$/i })).toHaveFocus()

      await user.tab()
      expect(screen.getByRole('link', { name: /^Packages$/i })).toHaveFocus()
    })

    it('should have keyboard accessible dropdown', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const locationsButton = screen.getByRole('button', { name: /Locations/i })

      // Focus on locations button
      locationsButton.focus()

      // Open dropdown with Enter key
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /New York City/i })).toBeInTheDocument()
      })
    })

    it('should trap focus in mobile menu', async () => {
      const user = userEvent.setup()
      global.innerWidth = 375
      global.dispatchEvent(new Event('resize'))

      render(<Header />)

      const menuButton = screen.getByLabelText(/Toggle menu/i)
      await user.click(menuButton)

      await waitFor(() => {
        expect(screen.getByRole('navigation', { name: /Mobile menu/i })).toBeInTheDocument()
      })

      // Focus should be within mobile menu
      const mobileNav = screen.getByRole('navigation', { name: /Mobile menu/i })
      const firstLink = within(mobileNav).getByRole('link', { name: /^Flights$/i })

      firstLink.focus()
      expect(firstLink).toHaveFocus()
    })
  })
})

// Import within from testing library
import { within } from '@testing-library/react'
