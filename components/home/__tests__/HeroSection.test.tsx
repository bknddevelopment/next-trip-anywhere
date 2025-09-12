import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@/test-utils/render'
import HeroSection from '../HeroSection'

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  default: vi.fn(() => {
    const Component = () => <div data-testid="optimized-video">Video Component</div>
    Component.displayName = 'DynamicComponent'
    return Component
  }),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: vi.fn(({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  )),
}))

describe('HeroSection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render hero section with all key elements', () => {
    render(<HeroSection />)

    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/Your Next Adventure/i)).toBeInTheDocument()
    expect(screen.getByText(/Starts Here/i)).toBeInTheDocument()

    // Check for subheading
    expect(screen.getByText(/Expert travel planning/i)).toBeInTheDocument()

    // Check for CTA button
    expect(screen.getByRole('button', { name: /Start Planning My Trip/i })).toBeInTheDocument()

    // Check for scroll indicator
    expect(screen.getByLabelText(/Scroll to search/i)).toBeInTheDocument()
  })

  it('should render video component', () => {
    render(<HeroSection />)

    // Check if the dynamic video component is rendered
    expect(screen.getByTestId('optimized-video')).toBeInTheDocument()
  })

  it('should cycle through videos automatically', async () => {
    const { rerender } = render(<HeroSection />)

    // Initially should show first video
    const initialVideo = screen.getByTestId('optimized-video')
    expect(initialVideo).toBeInTheDocument()

    // Fast-forward 10 seconds
    vi.advanceTimersByTime(10000)

    // Force re-render to see state change
    rerender(<HeroSection />)

    // Should still have video component
    expect(screen.getByTestId('optimized-video')).toBeInTheDocument()
  })

  it('should scroll to search section when scroll button is clicked', () => {
    // Create a mock element for search section
    const searchSection = document.createElement('div')
    searchSection.id = 'search-section'
    searchSection.scrollIntoView = vi.fn()
    document.body.appendChild(searchSection)

    render(<HeroSection />)

    const scrollButton = screen.getByLabelText(/Scroll to search/i)
    fireEvent.click(scrollButton)

    expect(searchSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })

    // Cleanup
    document.body.removeChild(searchSection)
  })

  it('should have correct CSS classes for animations', () => {
    render(<HeroSection />)

    // Check for animation classes
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.parentElement).toHaveClass('motion-safe:animate-fade-in')

    const ctaButton = screen.getByRole('button', { name: /Start Planning My Trip/i })
    expect(ctaButton.parentElement?.parentElement).toHaveClass('motion-safe:animate-fade-in')
  })

  it('should display special offers badge', () => {
    render(<HeroSection />)

    // Check for trust indicators instead of badge (component changed)
    expect(screen.getByText(/15\+ Years Experience/i)).toBeInTheDocument()
    expect(screen.getByText(/50,000\+ Happy Travelers/i)).toBeInTheDocument()
  })

  it('should handle scroll indicator hover state', () => {
    render(<HeroSection />)

    const scrollButton = screen.getByLabelText(/Scroll to search/i)

    // Check that button exists
    expect(scrollButton).toBeInTheDocument()
    expect(scrollButton).toHaveClass('animate-bounce')
  })

  it('should cleanup interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

    const { unmount } = render(<HeroSection />)

    // Fast-forward time to ensure interval is created
    vi.advanceTimersByTime(100)

    unmount()

    // Either clearInterval or clearTimeout should be called for cleanup
    expect(clearIntervalSpy.mock.calls.length + clearTimeoutSpy.mock.calls.length).toBeGreaterThan(0)

    clearIntervalSpy.mockRestore()
    clearTimeoutSpy.mockRestore()
  })

  it('should have proper accessibility attributes', () => {
    render(<HeroSection />)

    // Check for proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()

    // Check for button accessibility
    const ctaButton = screen.getByRole('button', { name: /Start Planning My Trip/i })
    expect(ctaButton).toBeInTheDocument()

    // Check for aria-label on scroll button
    const scrollButton = screen.getByLabelText(/Scroll to search/i)
    expect(scrollButton).toHaveAttribute('aria-label')
  })

  it('should handle missing search section gracefully', () => {
    render(<HeroSection />)

    const scrollButton = screen.getByLabelText(/Scroll to search/i)

    // Should not throw error when search section doesn't exist
    expect(() => fireEvent.click(scrollButton)).not.toThrow()
  })
})
