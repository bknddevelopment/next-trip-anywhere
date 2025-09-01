import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test-utils/render'
import userEvent from '@testing-library/user-event'
import FlightSearch from '../FlightSearch'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe('FlightSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Form Rendering', () => {
    it('should render all search form fields', () => {
      render(<FlightSearch />)

      expect(screen.getByPlaceholderText(/From/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/To/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Departure/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Return/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Passengers/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Class/i)).toBeInTheDocument()
    })

    it('should render trip type radio buttons', () => {
      render(<FlightSearch />)

      expect(screen.getByLabelText(/Round Trip/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/One Way/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Multi-City/i)).toBeInTheDocument()
    })

    it('should render search button', () => {
      render(<FlightSearch />)

      const searchButton = screen.getByRole('button', { name: /Search Flights/i })
      expect(searchButton).toBeInTheDocument()
      expect(searchButton).toHaveAttribute('type', 'submit')
    })
  })

  describe('Trip Type Selection', () => {
    it('should default to round trip', () => {
      render(<FlightSearch />)

      const roundTripRadio = screen.getByLabelText(/Round Trip/i) as HTMLInputElement
      expect(roundTripRadio.checked).toBe(true)
    })

    it('should hide return date for one way trips', async () => {
      const user = userEvent.setup()
      render(<FlightSearch />)

      // Initially return date should be visible
      expect(screen.getByLabelText(/Return/i)).toBeInTheDocument()

      // Select one way
      await user.click(screen.getByLabelText(/One Way/i))

      // Return date should be hidden
      expect(screen.queryByLabelText(/Return/i)).not.toBeInTheDocument()
    })

    it('should show multiple flight fields for multi-city', async () => {
      const user = userEvent.setup()
      render(<FlightSearch />)

      // Select multi-city
      await user.click(screen.getByLabelText(/Multi-City/i))

      // Should show multiple flight segments
      await waitFor(() => {
        expect(screen.getByText(/Flight 1/i)).toBeInTheDocument()
        expect(screen.getByText(/Add Another Flight/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Validation', () => {
    it('should require from and to fields', async () => {
      const user = userEvent.setup()
      render(<FlightSearch />)

      // Try to submit empty form
      await user.click(screen.getByRole('button', { name: /Search Flights/i }))

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText(/Please enter departure city/i)).toBeInTheDocument()
        expect(screen.getByText(/Please enter destination city/i)).toBeInTheDocument()
      })
    })

    it('should validate date selection', async () => {
      const user = userEvent.setup()
      render(<FlightSearch />)

      const departureInput = screen.getByLabelText(/Departure/i)
      const returnInput = screen.getByLabelText(/Return/i)

      // Set return date before departure
      await user.type(departureInput, '2024-12-20')
      await user.type(returnInput, '2024-12-15')

      await user.click(screen.getByRole('button', { name: /Search Flights/i }))

      await waitFor(() => {
        expect(screen.getByText(/Return date must be after departure date/i)).toBeInTheDocument()
      })
    })

    it('should validate passenger count', async () => {
      userEvent.setup()
      render(<FlightSearch />)

      const passengerSelect = screen.getByLabelText(/Passengers/i)

      // Should have valid options
      expect(passengerSelect).toBeInTheDocument()

      const options = screen.getAllByRole('option')
      expect(options.length).toBeGreaterThan(0)
      expect(options[0]).toHaveTextContent('1')
    })
  })

  describe('Form Submission', () => {
    it('should handle successful form submission', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn()

      render(<FlightSearch onSearch={onSearch} />)

      // Fill in the form
      await user.type(screen.getByPlaceholderText(/From/i), 'New York')
      await user.type(screen.getByPlaceholderText(/To/i), 'Los Angeles')
      await user.type(screen.getByLabelText(/Departure/i), '2024-12-15')
      await user.type(screen.getByLabelText(/Return/i), '2024-12-22')
      await user.selectOptions(screen.getByLabelText(/Passengers/i), '2')
      await user.selectOptions(screen.getByLabelText(/Class/i), 'business')

      // Submit form
      await user.click(screen.getByRole('button', { name: /Search Flights/i }))

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith(
          expect.objectContaining({
            from: 'New York',
            to: 'Los Angeles',
            departure: '2024-12-15',
            return: '2024-12-22',
            passengers: '2',
            class: 'business',
          })
        )
      })
    })

    it('should show loading state during submission', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn(() => new Promise((resolve) => setTimeout(resolve, 100)))

      render(<FlightSearch onSearch={onSearch} />)

      // Fill minimum required fields
      await user.type(screen.getByPlaceholderText(/From/i), 'New York')
      await user.type(screen.getByPlaceholderText(/To/i), 'Los Angeles')
      await user.type(screen.getByLabelText(/Departure/i), '2024-12-15')

      // Submit form
      await user.click(screen.getByRole('button', { name: /Search Flights/i }))

      // Should show loading state
      expect(screen.getByText(/Searching.../i)).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.queryByText(/Searching.../i)).not.toBeInTheDocument()
      })
    })

    it('should handle submission error', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn().mockRejectedValue(new Error('Search failed'))

      render(<FlightSearch onSearch={onSearch} />)

      // Fill and submit form
      await user.type(screen.getByPlaceholderText(/From/i), 'New York')
      await user.type(screen.getByPlaceholderText(/To/i), 'Los Angeles')
      await user.type(screen.getByLabelText(/Departure/i), '2024-12-15')

      await user.click(screen.getByRole('button', { name: /Search Flights/i }))

      await waitFor(() => {
        expect(screen.getByText(/Search failed. Please try again./i)).toBeInTheDocument()
      })
    })
  })

  describe('Airport Autocomplete', () => {
    it('should show airport suggestions', async () => {
      const user = userEvent.setup()
      render(<FlightSearch />)

      const fromInput = screen.getByPlaceholderText(/From/i)

      // Type to trigger autocomplete
      await user.type(fromInput, 'New')

      // Should show suggestions
      await waitFor(() => {
        expect(screen.getByText(/New York/i)).toBeInTheDocument()
        expect(screen.getByText(/Newark/i)).toBeInTheDocument()
      })
    })

    it('should select airport from suggestions', async () => {
      const user = userEvent.setup()
      render(<FlightSearch />)

      const fromInput = screen.getByPlaceholderText(/From/i)

      // Type and select suggestion
      await user.type(fromInput, 'Los')

      await waitFor(() => {
        expect(screen.getByText(/Los Angeles/i)).toBeInTheDocument()
      })

      await user.click(screen.getByText(/Los Angeles/i))

      expect(fromInput).toHaveValue('Los Angeles (LAX)')
    })
  })

  describe('Date Restrictions', () => {
    it('should not allow past dates for departure', () => {
      render(<FlightSearch />)

      const departureInput = screen.getByLabelText(/Departure/i) as HTMLInputElement

      // Check min date is set
      const minDate = departureInput.getAttribute('min')
      const today = new Date().toISOString().split('T')[0]

      expect(minDate).toBe(today)
    })

    it('should update return date minimum based on departure', async () => {
      const user = userEvent.setup()
      render(<FlightSearch />)

      const departureInput = screen.getByLabelText(/Departure/i)
      const returnInput = screen.getByLabelText(/Return/i) as HTMLInputElement

      // Set departure date
      await user.type(departureInput, '2024-12-20')

      // Return date min should be updated
      const minReturnDate = returnInput.getAttribute('min')
      expect(minReturnDate).toBe('2024-12-20')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<FlightSearch />)

      expect(screen.getByLabelText(/From/i)).toHaveAttribute('aria-label')
      expect(screen.getByLabelText(/To/i)).toHaveAttribute('aria-label')
      expect(screen.getByLabelText(/Departure/i)).toHaveAttribute('aria-label')
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      render(<FlightSearch />)

      // Tab through form elements
      await user.tab()
      expect(screen.getByLabelText(/Round Trip/i)).toHaveFocus()

      await user.tab()
      expect(screen.getByLabelText(/One Way/i)).toHaveFocus()

      await user.tab()
      expect(screen.getByLabelText(/Multi-City/i)).toHaveFocus()

      await user.tab()
      expect(screen.getByPlaceholderText(/From/i)).toHaveFocus()
    })

    it('should announce errors to screen readers', async () => {
      const user = userEvent.setup()
      render(<FlightSearch />)

      // Submit invalid form
      await user.click(screen.getByRole('button', { name: /Search Flights/i }))

      await waitFor(() => {
        const errorMessages = screen.getAllByRole('alert')
        expect(errorMessages.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Responsive Design', () => {
    it('should stack fields on mobile', () => {
      // Set mobile viewport
      global.innerWidth = 375
      global.dispatchEvent(new Event('resize'))

      render(<FlightSearch />)

      const form = screen.getByRole('form')
      expect(form).toHaveClass('space-y-4')
    })

    it('should show fields inline on desktop', () => {
      // Set desktop viewport
      global.innerWidth = 1024
      global.dispatchEvent(new Event('resize'))

      render(<FlightSearch />)

      const form = screen.getByRole('form')
      expect(form).toHaveClass('md:grid')
    })
  })
})
