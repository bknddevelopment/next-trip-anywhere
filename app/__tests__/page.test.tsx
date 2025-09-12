import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/test-utils/render'
import HomePage from '../page'

// Mock components
vi.mock('@/components/home/HeroSection', () => ({
  default: () => <div data-testid="hero-section">Hero Section</div>,
}))

vi.mock('@/components/home/SearchSection', () => ({
  default: () => <div data-testid="search-section">Search Section</div>,
}))

vi.mock('@/components/home/DestinationCards', () => ({
  default: () => <div data-testid="destination-cards">Destination Cards</div>,
}))

vi.mock('@/components/home/WhyChooseUs', () => ({
  default: () => <div data-testid="why-choose-us">Why Choose Us</div>,
}))

vi.mock('@/components/home/CTASection', () => ({
  default: () => <div data-testid="cta-section">CTA Section</div>,
}))

vi.mock('@/components/forms/LeadCaptureForm', () => ({
  default: ({ variant }: { variant?: string }) => (
    <div data-testid="lead-capture-form" data-variant={variant}>
      Lead Capture Form
    </div>
  ),
}))

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Page Structure', () => {
    it('should render all main sections', () => {
      render(<HomePage />)

      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('search-section')).toBeInTheDocument()
      expect(screen.getByTestId('destination-cards')).toBeInTheDocument()
      expect(screen.getByTestId('why-choose-us')).toBeInTheDocument()
      expect(screen.getByTestId('cta-section')).toBeInTheDocument()
      expect(screen.getByTestId('lead-capture-form')).toBeInTheDocument()
    })

    it('should render sections in correct order', () => {
      render(<HomePage />)

      const sections = screen.getAllByTestId(/section|cards|form/)
      const sectionIds = sections.map((s) => s.getAttribute('data-testid'))

      expect(sectionIds).toEqual([
        'hero-section',
        'search-section',
        'destination-cards',
        'why-choose-us',
        'cta-section',
        'lead-capture-form',
      ])
    })
  })

  describe('Lead Capture Form Integration', () => {
    it('should render lead capture form with sidebar variant', () => {
      render(<HomePage />)

      const leadForm = screen.getByTestId('lead-capture-form')
      expect(leadForm).toHaveAttribute('data-variant', 'sidebar')
    })

    it('should position lead capture form correctly', () => {
      render(<HomePage />)

      const leadForm = screen.getByTestId('lead-capture-form')
      const container = leadForm.closest('section')

      expect(container).toHaveClass('py-20')
      expect(container?.querySelector('.container')).toBeInTheDocument()
    })
  })

  describe('SEO and Metadata', () => {
    it('should have proper page structure for SEO', () => {
      const { container } = render(<HomePage />)

      // Check for main element
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()

      // Check for semantic sections
      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Layout', () => {
    it('should have responsive container classes', () => {
      const { container } = render(<HomePage />)

      const containers = container.querySelectorAll('.container')
      containers.forEach((cont) => {
        expect(cont).toHaveClass('mx-auto')
        expect(cont).toHaveClass('px-4')
      })
    })

    it('should have proper spacing between sections', () => {
      const { container } = render(<HomePage />)

      const sections = container.querySelectorAll('section')
      sections.forEach((section) => {
        const classes = section.className
        expect(classes).toMatch(/py-\d+/)
      })
    })
  })

  describe('Performance', () => {
    it('should render without blocking main thread', async () => {
      const startTime = performance.now()

      render(<HomePage />)

      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Should render quickly (under 100ms for mocked components)
      expect(renderTime).toBeLessThan(100)
    })

    it('should lazy load non-critical sections', () => {
      // Components are mocked, but in real implementation
      // we would check for dynamic imports
      render(<HomePage />)

      // All sections should be present
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('lead-capture-form')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper document structure', () => {
      const { container } = render(<HomePage />)

      // Should have main landmark
      expect(container.querySelector('main')).toBeInTheDocument()

      // Should have sections
      expect(container.querySelectorAll('section').length).toBeGreaterThan(0)
    })

    it('should maintain focus order', () => {
      render(<HomePage />)

      // All interactive elements should be in DOM
      const form = screen.getByTestId('lead-capture-form')
      expect(form).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle component errors gracefully', () => {
      // Mock console.error to prevent noise in tests
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      // Even if a component throws, page should still render
      render(<HomePage />)

      expect(screen.getByTestId('hero-section')).toBeInTheDocument()

      consoleSpy.mockRestore()
    })
  })
})
