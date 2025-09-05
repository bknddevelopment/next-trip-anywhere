import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LeadCaptureForm from '../LeadCaptureForm'

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe('LeadCaptureForm', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = mockFetch
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('should render form heading and description', () => {
      render(<LeadCaptureForm />)

      expect(screen.getByText('Get Your Free Travel Quote')).toBeInTheDocument()
      expect(screen.getByText(/Tell us about your dream trip/)).toBeInTheDocument()
    })

    it('should render all form fields', () => {
      render(<LeadCaptureForm />)

      // Required fields
      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('(555) 123-4567')).toBeInTheDocument()
      expect(screen.getByText('Trip Type')).toBeInTheDocument()

      // Optional fields
      expect(screen.getAllByText('Departure Date')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Return Date')[0]).toBeInTheDocument()
      expect(screen.getByText('Budget Range')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Tell us about your ideal trip/)).toBeInTheDocument()
    })

    it('should render submit button', () => {
      render(<LeadCaptureForm />)

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('type', 'submit')
    })

    it('should render privacy disclaimer', () => {
      render(<LeadCaptureForm />)

      expect(screen.getByText(/By submitting this form/)).toBeInTheDocument()
      expect(screen.getByText(/We respect your privacy/)).toBeInTheDocument()
    })

    it('should render field icons', () => {
      render(<LeadCaptureForm />)

      // Check for label text with icons
      expect(screen.getByText('Full Name')).toBeInTheDocument()
      expect(screen.getByText('Email Address')).toBeInTheDocument()
      expect(screen.getByText('Phone Number')).toBeInTheDocument()
    })

    it('should apply different variant styles', () => {
      const { container, rerender } = render(<LeadCaptureForm variant="default" />)
      expect(container.querySelector('.max-w-2xl')).toBeInTheDocument()

      rerender(<LeadCaptureForm variant="compact" />)
      expect(container.querySelector('.max-w-md')).toBeInTheDocument()

      rerender(<LeadCaptureForm variant="sidebar" />)
      expect(container.querySelector('.p-6')).toBeInTheDocument()
    })
  })

  describe('Validation', () => {
    it('should show validation errors for required fields', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
        expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
        expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument()
        expect(screen.getByText('Please select a trip type')).toBeInTheDocument()
      })
    })

    it.skip('should validate email format', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      // Fill in invalid email
      const emailInput = screen.getByPlaceholderText('john@example.com')
      await user.type(emailInput, 'invalid-email')

      // Fill other required fields with valid data
      await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
      await user.type(screen.getByPlaceholderText('(555) 123-4567'), '5551234567')
      await user.selectOptions(screen.getAllByRole('combobox')[0], 'flight')

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      // Check that email error is shown
      await waitFor(() => {
        const errors = screen.queryAllByText(/valid email/i)
        expect(errors.length).toBeGreaterThan(0)
      })
    })

    it.skip('should validate phone number length', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      // Fill in invalid phone
      const phoneInput = screen.getByPlaceholderText('(555) 123-4567')
      await user.type(phoneInput, '123')

      // Fill other required fields with valid data
      await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
      await user.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
      await user.selectOptions(screen.getAllByRole('combobox')[0], 'cruise')

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      await waitFor(() => {
        const errors = screen.queryAllByText(/valid phone/i)
        expect(errors.length).toBeGreaterThan(0)
      })
    })

    it('should validate name length', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      const nameInput = screen.getByPlaceholderText('John Doe')
      await user.type(nameInput, 'J')

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
      })
    })
  })

  describe('Trip Type Options', () => {
    it('should render all trip type options', () => {
      render(<LeadCaptureForm />)

      const tripTypeSelect = screen.getByRole('combobox')

      // Check for options
      expect(tripTypeSelect).toContainHTML('<option value="">Select trip type</option>')
      expect(tripTypeSelect).toContainHTML('<option value="flight">Flight Only</option>')
      expect(tripTypeSelect).toContainHTML('<option value="cruise">Cruise</option>')
      expect(tripTypeSelect).toContainHTML('<option value="package">Vacation Package</option>')
      expect(tripTypeSelect).toContainHTML('<option value="hotel">Hotel Only</option>')
      expect(tripTypeSelect).toContainHTML(
        '<option value="allinclusive">All-Inclusive Resort</option>'
      )
      expect(tripTypeSelect).toContainHTML('<option value="custom">Custom Itinerary</option>')
    })
  })

  describe('Budget Options', () => {
    it('should render all budget range options', () => {
      render(<LeadCaptureForm />)

      const budgetSelects = screen.getAllByRole('combobox')
      const budgetSelect = budgetSelects[1] // Second select is budget

      expect(budgetSelect).toContainHTML('<option value="">Select budget range</option>')
      expect(budgetSelect).toContainHTML('<option value="under-1000">Under $1,000</option>')
      expect(budgetSelect).toContainHTML('<option value="1000-2500">$1,000 - $2,500</option>')
      expect(budgetSelect).toContainHTML('<option value="2500-5000">$2,500 - $5,000</option>')
      expect(budgetSelect).toContainHTML('<option value="5000-10000">$5,000 - $10,000</option>')
      expect(budgetSelect).toContainHTML('<option value="over-10000">Over $10,000</option>')
    })
  })

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm source="test-page" />)

      // Fill form
      await user.type(screen.getByPlaceholderText('John Doe'), 'Jane Smith')
      await user.type(screen.getByPlaceholderText('john@example.com'), 'jane@example.com')
      await user.type(screen.getByPlaceholderText('(555) 123-4567'), '5551234567')
      await user.selectOptions(screen.getAllByRole('combobox')[0], 'cruise')
      await user.type(
        screen.getByPlaceholderText(/Tell us about your ideal trip/),
        'Caribbean cruise'
      )

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled()
        const [url, options] = mockFetch.mock.calls[0]
        expect(url).toContain('formspree.io')
        expect(options.method).toBe('POST')
        expect(options.headers).toEqual({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        })

        const body = JSON.parse(options.body)
        expect(body.name).toBe('Jane Smith')
        expect(body.email).toBe('jane@example.com')
        expect(body.phone).toBe('5551234567')
        expect(body.tripType).toBe('cruise')
        expect(body.message).toBe('Caribbean cruise')
        expect(body.source).toBe('test-page')
        expect(body._subject).toBe('New Travel Inquiry from Jane Smith')
      })
    })

    it('should show loading state during submission', async () => {
      const user = userEvent.setup()

      // Delay the response
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ success: true }),
                }),
              100
            )
          )
      )

      render(<LeadCaptureForm />)

      // Fill minimum required fields
      await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
      await user.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('(555) 123-4567'), '5551234567')
      await user.selectOptions(screen.getAllByRole('combobox')[0], 'flight')

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      // Should show loading state
      expect(screen.getByText('Sending...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()

      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.queryByText('Sending...')).not.toBeInTheDocument()
      })
    })

    it('should handle submission success', async () => {
      const user = userEvent.setup()
      const toast = await import('react-hot-toast')
      const toastSpy = vi.spyOn(toast.default, 'success')

      render(<LeadCaptureForm />)

      // Fill form
      await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
      await user.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('(555) 123-4567'), '5551234567')
      await user.selectOptions(screen.getAllByRole('combobox')[0], 'package')

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toastSpy).toHaveBeenCalledWith(
          "Thank you! We'll contact you within 24 hours with personalized travel options."
        )
      })

      // Form should be reset
      expect(screen.getByPlaceholderText('John Doe')).toHaveValue('')
      expect(screen.getByPlaceholderText('john@example.com')).toHaveValue('')
    })

    it('should handle submission error', async () => {
      const user = userEvent.setup()
      const toast = await import('react-hot-toast')
      const toastSpy = vi.spyOn(toast.default, 'error')

      // Mock failed response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Server error' }),
      })

      render(<LeadCaptureForm />)

      // Fill form
      await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
      await user.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('(555) 123-4567'), '5551234567')
      await user.selectOptions(screen.getAllByRole('combobox')[0], 'hotel')

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toastSpy).toHaveBeenCalledWith(
          'Something went wrong. Please try again or call us directly.'
        )
      })

      // Form should not be reset on error
      expect(screen.getByPlaceholderText('John Doe')).toHaveValue('John Doe')
    })

    it('should handle network error', async () => {
      const user = userEvent.setup()
      const toast = await import('react-hot-toast')
      const toastSpy = vi.spyOn(toast.default, 'error')

      // Mock network error
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      render(<LeadCaptureForm />)

      // Fill form
      await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
      await user.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('(555) 123-4567'), '5551234567')
      await user.selectOptions(screen.getAllByRole('combobox')[0], 'cruise')

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toastSpy).toHaveBeenCalledWith(
          'Something went wrong. Please try again or call us directly.'
        )
      })
    })
  })

  describe('Optional Fields', () => {
    it('should handle optional date fields', async () => {
      const user = userEvent.setup()
      const { container } = render(<LeadCaptureForm />)

      // Fill required fields
      await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
      await user.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('(555) 123-4567'), '5551234567')
      await user.selectOptions(screen.getAllByRole('combobox')[0], 'package')

      // Add optional dates - use container query to find date inputs
      const dateInputs = container.querySelectorAll('input[type="date"]')
      const departureInput = dateInputs[0] as HTMLInputElement
      const returnInput = dateInputs[1] as HTMLInputElement

      await user.type(departureInput, '2024-12-01')
      await user.type(returnInput, '2024-12-15')

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      await waitFor(() => {
        const callBody = JSON.parse(mockFetch.mock.calls[0][1].body)
        expect(callBody.departureDate).toBe('2024-12-01')
        expect(callBody.returnDate).toBe('2024-12-15')
      })
    })

    it('should handle optional budget field', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      // Fill required fields
      await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
      await user.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('(555) 123-4567'), '5551234567')
      await user.selectOptions(screen.getAllByRole('combobox')[0], 'allinclusive')

      // Select budget
      await user.selectOptions(screen.getAllByRole('combobox')[1], '2500-5000')

      const submitButton = screen.getByRole('button', { name: 'Get My Free Quote' })
      await user.click(submitButton)

      await waitFor(() => {
        const callBody = JSON.parse(mockFetch.mock.calls[0][1].body)
        expect(callBody.budget).toBe('2500-5000')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper form labels', () => {
      render(<LeadCaptureForm />)

      expect(screen.getByText('Full Name')).toBeInTheDocument()
      expect(screen.getByText('Email Address')).toBeInTheDocument()
      expect(screen.getByText('Phone Number')).toBeInTheDocument()
      expect(screen.getByText('Trip Type')).toBeInTheDocument()
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      const nameInput = screen.getByPlaceholderText('John Doe')
      nameInput.focus()

      // Tab through form elements
      await user.tab()
      expect(screen.getByPlaceholderText('john@example.com')).toHaveFocus()

      await user.tab()
      expect(screen.getByPlaceholderText('(555) 123-4567')).toHaveFocus()

      await user.tab()
      expect(screen.getAllByRole('combobox')[0]).toHaveFocus() // Trip type select
    })

    it('should have proper input types', () => {
      const { container } = render(<LeadCaptureForm />)

      expect(screen.getByPlaceholderText('john@example.com')).toHaveAttribute('type', 'email')
      expect(screen.getByPlaceholderText('(555) 123-4567')).toHaveAttribute('type', 'tel')
      expect(screen.getByPlaceholderText('John Doe')).toHaveAttribute('type', 'text')

      const dateInputs = container.querySelectorAll('input[type="date"]')
      expect(dateInputs[0]).toHaveAttribute('type', 'date') // Departure date
      expect(dateInputs[1]).toHaveAttribute('type', 'date') // Return date
    })
  })
})
