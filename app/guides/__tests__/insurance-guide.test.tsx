/**
 * Tests for Travel Insurance Guide Page
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TravelGuidePage from '../[topic]/page'
import { getTravelGuideBySlug } from '@/lib/data/travel-guides'

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

vi.mock('next/script', () => ({
  default: ({ children, ...props }: any) => <script {...props}>{children}</script>,
}))

// Mock dynamic imports
vi.mock('next/dynamic', () => ({
  default: (loader: any, options: any) => {
    // Return the component immediately for testing
    const Component = ({ children }: any) => <div data-testid="dynamic-component">{children}</div>
    return Component
  },
}))

// Mock components
vi.mock('@/components/forms/ContactFormWithAnalytics', () => ({
  default: () => <div data-testid="contact-form">Contact Form</div>,
}))

vi.mock('@/components/guides/InsuranceComparisonTable', () => ({
  default: () => (
    <div data-testid="insurance-comparison-table">
      <h3>Top Travel Insurance Providers</h3>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Coverage Limit</th>
            <th>Price Range</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Allianz Travel</td>
            <td>$100,000</td>
            <td>8-10%</td>
            <td>4.5/5</td>
          </tr>
          <tr>
            <td>Travel Guard</td>
            <td>$250,000</td>
            <td>7-9%</td>
            <td>4.7/5</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
}))

vi.mock('@/components/guides/FAQAccordion', () => ({
  default: ({ items }: { items: Array<{ question: string; answer: string }> }) => (
    <div data-testid="faq-accordion">
      <h2>Frequently Asked Questions</h2>
      {items.map((item, idx) => (
        <details key={idx} data-testid={`faq-item-${idx}`}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  ),
}))

describe('Travel Insurance Guide Page', () => {
  const mockParams = { topic: 'travel-insurance-guide' }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the insurance guide page with all key sections', async () => {
    const { container } = render(await TravelGuidePage({ params: Promise.resolve(mockParams) }))

    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /cruise travel insurance guide/i
    )

    // Check for hero section stats
    expect(screen.getByText('$250K+')).toBeInTheDocument()
    expect(screen.getByText('8-15%')).toBeInTheDocument()
    expect(screen.getByText('14-21')).toBeInTheDocument()

    // Check for trust indicators
    expect(screen.getByText(/2,847\+ Cruisers Protected/i)).toBeInTheDocument()
    expect(screen.getByText(/4.8\/5 Rating/i)).toBeInTheDocument()
    expect(screen.getByText(/Licensed in NJ/i)).toBeInTheDocument()

    // Check for CTA with phone number
    const phoneLinks = screen.getAllByRole('link', { name: /833-874-1019/i })
    expect(phoneLinks.length).toBeGreaterThan(0)
    expect(phoneLinks[0]).toHaveAttribute('href', 'tel:833-874-1019')
  })

  it('should render the insurance comparison table', async () => {
    render(await TravelGuidePage({ params: Promise.resolve(mockParams) }))

    await waitFor(() => {
      const comparisonTable = screen.getByTestId('insurance-comparison-table')
      expect(comparisonTable).toBeInTheDocument()
      expect(screen.getByText('Allianz Travel')).toBeInTheDocument()
      expect(screen.getByText('Travel Guard')).toBeInTheDocument()
      expect(screen.getByText('$100,000')).toBeInTheDocument()
      expect(screen.getByText('$250,000')).toBeInTheDocument()
    })
  })

  it('should render the FAQ accordion with questions', async () => {
    render(await TravelGuidePage({ params: Promise.resolve(mockParams) }))

    await waitFor(() => {
      const faqSection = screen.getByTestId('faq-accordion')
      expect(faqSection).toBeInTheDocument()
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()

      // Check that FAQ items are rendered
      const faqItems = screen.getAllByTestId(/faq-item-/i)
      expect(faqItems.length).toBeGreaterThan(0)
    })
  })

  it('should include proper schema markup for SEO', async () => {
    const { container } = render(await TravelGuidePage({ params: Promise.resolve(mockParams) }))

    // Check for schema script tags
    const schemaScripts = container.querySelectorAll('script[type="application/ld+json"]')
    expect(schemaScripts.length).toBeGreaterThan(0)

    // Verify main guide schema is present
    const mainSchema = container.querySelector('script#guide-schema')
    expect(mainSchema).toBeInTheDocument()

    // Verify additional insurance schemas
    const additionalSchemas = container.querySelectorAll('script[id^="additional-schema-"]')
    expect(additionalSchemas.length).toBeGreaterThan(0)
  })

  it('should display breadcrumb navigation', async () => {
    render(await TravelGuidePage({ params: Promise.resolve(mockParams) }))

    const homeLink = screen.getByRole('link', { name: /home/i })
    const guidesLink = screen.getByRole('link', { name: /travel guides/i })

    expect(homeLink).toHaveAttribute('href', '/')
    expect(guidesLink).toHaveAttribute('href', '/guides')
    expect(screen.getByText(/cruise travel insurance guide/i)).toBeInTheDocument()
  })

  it('should include internal links to cruise pages', async () => {
    render(await TravelGuidePage({ params: Promise.resolve(mockParams) }))

    // Check for internal links in related resources section
    await waitFor(() => {
      const links = screen.getAllByRole('link')
      const cruiseLinks = links.filter((link) => {
        const href = link.getAttribute('href')
        return (
          href &&
          (href.includes('/cruises/royal-caribbean') ||
            href.includes('/cruises/carnival') ||
            href.includes('/cruises/norwegian'))
        )
      })
      expect(cruiseLinks.length).toBeGreaterThan(0)
    })
  })

  it('should render contact form section', async () => {
    render(await TravelGuidePage({ params: Promise.resolve(mockParams) }))

    await waitFor(() => {
      const contactForm = screen.getByTestId('contact-form')
      expect(contactForm).toBeInTheDocument()
      expect(screen.getByText(/get your personalized insurance quote/i)).toBeInTheDocument()
    })
  })

  it('should display related guides section', async () => {
    render(await TravelGuidePage({ params: Promise.resolve(mockParams) }))

    const relatedSection = screen.getByText(/more travel guides/i)
    expect(relatedSection).toBeInTheDocument()

    // Check for related guide links
    const relatedLinks = screen.getAllByRole('link').filter((link) => {
      const href = link.getAttribute('href')
      return href && href.startsWith('/guides/') && href !== '/guides/travel-insurance-guide'
    })
    expect(relatedLinks.length).toBeGreaterThan(0)
  })

  it('should display Essex County specific tips', async () => {
    render(await TravelGuidePage({ params: Promise.resolve(mockParams) }))

    // Check for Essex County insider tips section
    const essexSection = screen.getByText(/essex county insider tips/i)
    expect(essexSection).toBeInTheDocument()
  })

  it('should handle non-existent guide gracefully', async () => {
    const { notFound } = await import('next/navigation')
    const invalidParams = { topic: 'non-existent-guide' }

    render(await TravelGuidePage({ params: Promise.resolve(invalidParams) }))

    expect(notFound).toHaveBeenCalled()
  })
})
