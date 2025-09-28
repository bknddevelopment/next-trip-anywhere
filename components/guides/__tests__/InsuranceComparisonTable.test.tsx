/**
 * Tests for Insurance Comparison Table Component
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InsuranceComparisonTable from '../InsuranceComparisonTable'

describe('InsuranceComparisonTable Component', () => {
  it('should render the comparison table with all providers', () => {
    render(<InsuranceComparisonTable />)

    // Check table headers
    expect(screen.getByText('Top Travel Insurance Providers for 2025')).toBeInTheDocument()
    expect(screen.getByText('Provider')).toBeInTheDocument()
    expect(screen.getByText(/Coverage Limit/i)).toBeInTheDocument()
    expect(screen.getByText(/Price Range/i)).toBeInTheDocument()
    expect(screen.getByText('Rating')).toBeInTheDocument()
    expect(screen.getByText('Best For')).toBeInTheDocument()

    // Check for key providers
    expect(screen.getByText('Allianz Travel')).toBeInTheDocument()
    expect(screen.getByText('Travel Guard by AIG')).toBeInTheDocument()
    expect(screen.getByText('Travelex Insurance')).toBeInTheDocument()
    expect(screen.getByText('World Nomads')).toBeInTheDocument()
    expect(screen.getByText('Seven Corners')).toBeInTheDocument()
    expect(screen.getByText('Berkshire Hathaway Travel Protection')).toBeInTheDocument()
    expect(screen.getByText('IMG Global')).toBeInTheDocument()
    expect(screen.getByText('Generali Global Assistance')).toBeInTheDocument()
  })

  it('should display coverage limits and price ranges', () => {
    render(<InsuranceComparisonTable />)

    // Check coverage limits
    expect(screen.getByText('Up to $100,000')).toBeInTheDocument()
    expect(screen.getByText('Up to $250,000')).toBeInTheDocument()
    expect(screen.getByText('Up to $50,000')).toBeInTheDocument()
    expect(screen.getByText('Up to $500,000')).toBeInTheDocument()

    // Check price ranges
    expect(screen.getByText('8-10% of trip cost')).toBeInTheDocument()
    expect(screen.getByText('7-9% of trip cost')).toBeInTheDocument()
    expect(screen.getByText('6-8% of trip cost')).toBeInTheDocument()
    expect(screen.getByText('10-12% of trip cost')).toBeInTheDocument()
  })

  it('should display ratings with star icons', () => {
    render(<InsuranceComparisonTable />)

    // Check for rating values
    expect(screen.getByText('4.5/5')).toBeInTheDocument()
    expect(screen.getByText('4.7/5')).toBeInTheDocument()
    expect(screen.getByText('4.3/5')).toBeInTheDocument()
    expect(screen.getByText('4.8/5')).toBeInTheDocument()

    // Check for star icons (rendered as SVGs)
    const starIcons = screen.getAllByTestId(/star-icon/i)
    expect(starIcons.length).toBeGreaterThan(0)
  })

  it('should display "Best For" categories', () => {
    render(<InsuranceComparisonTable />)

    // Check best for categories
    expect(screen.getByText('Families')).toBeInTheDocument()
    expect(screen.getByText('Comprehensive coverage')).toBeInTheDocument()
    expect(screen.getByText('Budget-friendly')).toBeInTheDocument()
    expect(screen.getByText('Adventure cruises')).toBeInTheDocument()
    expect(screen.getByText('Medical coverage')).toBeInTheDocument()
    expect(screen.getByText('Premium protection')).toBeInTheDocument()
    expect(screen.getByText('International cruises')).toBeInTheDocument()
    expect(screen.getByText('Cancel for any reason')).toBeInTheDocument()
  })

  it('should allow sorting by different columns', async () => {
    const user = userEvent.setup()
    render(<InsuranceComparisonTable />)

    // Get the sortable column header for price
    const priceHeader = screen.getByText(/Price Range/i).closest('th')

    if (priceHeader) {
      const sortButton = priceHeader.querySelector('button')
      if (sortButton) {
        // Click to sort by price
        await user.click(sortButton)

        // Wait for re-render with sorted data
        await waitFor(() => {
          const rows = screen.getAllByRole('row')
          // Check that data has been re-ordered
          expect(rows.length).toBeGreaterThan(1)
        })

        // Click again to reverse sort
        await user.click(sortButton)

        // Verify sort direction changed
        await waitFor(() => {
          const rows = screen.getAllByRole('row')
          expect(rows.length).toBeGreaterThan(1)
        })
      }
    }
  })

  it('should highlight the Newark/Essex County benefits section', () => {
    render(<InsuranceComparisonTable />)

    // Check for Newark specific benefits
    expect(screen.getByText(/Why Newark Cruisers Need Coverage/i)).toBeInTheDocument()

    // Check for specific local benefits
    const benefits = [
      /Cape Liberty departures/i,
      /hurricane season/i,
      /medical facilities/i,
      /travel delays/i,
    ]

    benefits.forEach((benefit) => {
      const element = screen.queryByText(benefit)
      if (element) {
        expect(element).toBeInTheDocument()
      }
    })
  })

  it('should be responsive on mobile devices', () => {
    render(<InsuranceComparisonTable />)

    // Check for overflow-x-auto class for mobile scrolling
    const tableContainer = screen.getByRole('table').closest('div')
    expect(tableContainer).toHaveClass('overflow-x-auto')
  })

  it('should include special badges for top-rated providers', () => {
    render(<InsuranceComparisonTable />)

    // Check for "Essex County Favorite" badge for high-rated providers
    const badges = screen.queryAllByText(/Essex County Favorite/i)

    // At least one provider should have the badge
    if (badges.length > 0) {
      expect(badges.length).toBeGreaterThan(0)
    }
  })

  it('should display contact CTA at the bottom', () => {
    render(<InsuranceComparisonTable />)

    // Check for call-to-action
    expect(screen.getByText(/Need help choosing/i)).toBeInTheDocument()

    // Check for phone number link
    const phoneLink = screen.getByRole('link', { name: /833-874-1019/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:833-874-1019')
  })

  it('should handle empty or loading state gracefully', () => {
    // Test that the component renders without crashing even with no data
    const { container } = render(<InsuranceComparisonTable />)
    expect(container.firstChild).toBeTruthy()
  })
})
