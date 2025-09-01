import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test-utils/render'
import userEvent from '@testing-library/user-event'
import LeadCaptureForm from '../LeadCaptureForm'
import { mockApiResponse } from '@/test-utils/mocks'

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
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe('LeadCaptureForm', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = mockFetch
    mockFetch.mockResolvedValue(mockApiResponse({ success: true }))
  })

  describe('Rendering', () => {
    it('should render all form fields', () => {
      render(<LeadCaptureForm />)

      expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Your Phone/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Trip Type/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Departure Date/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Return Date/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Tell us about your dream trip/i)).toBeInTheDocument()
    })

    it('should render submit button', () => {
      render(<LeadCaptureForm />)

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('type', 'submit')
    })

    it('should render different variants correctly', () => {
      const { rerender } = render(<LeadCaptureForm variant="default" />)
      expect(screen.getByText(/Get Your Free Travel Consultation/i)).toBeInTheDocument()

      rerender(<LeadCaptureForm variant="compact" />)
      expect(screen.getByText(/Quick Contact/i)).toBeInTheDocument()

      rerender(<LeadCaptureForm variant="sidebar" />)
      expect(screen.getByText(/Need Help Planning/i)).toBeInTheDocument()
    })
  })

  describe('Validation', () => {
    it('should show validation errors for required fields', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Name must be at least 2 characters/i)).toBeInTheDocument()
        expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument()
        expect(screen.getByText(/Please enter a valid phone number/i)).toBeInTheDocument()
        expect(screen.getByText(/Please select a trip type/i)).toBeInTheDocument()
      })
    })

    it('should validate email format', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      const emailInput = screen.getByPlaceholderText(/Your Email/i)
      await user.type(emailInput, 'invalid-email')

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument()
      })
    })

    it('should validate phone number length', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      const phoneInput = screen.getByPlaceholderText(/Your Phone/i)
      await user.type(phoneInput, '123')

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid phone number/i)).toBeInTheDocument()
      })
    })

    it('should accept valid form data', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      // Fill in valid data
      await user.type(screen.getByPlaceholderText(/Your Name/i), 'John Doe')
      await user.type(screen.getByPlaceholderText(/Your Email/i), 'john@example.com')
      await user.type(screen.getByPlaceholderText(/Your Phone/i), '1234567890')
      await user.selectOptions(screen.getByLabelText(/Trip Type/i), 'leisure')

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled()
      })
    })
  })

  describe('Form Submission', () => {
    it('should submit form with correct data', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm source="homepage" />)

      // Fill form
      await user.type(screen.getByPlaceholderText(/Your Name/i), 'John Doe')
      await user.type(screen.getByPlaceholderText(/Your Email/i), 'john@example.com')
      await user.type(screen.getByPlaceholderText(/Your Phone/i), '1234567890')
      await user.selectOptions(screen.getByLabelText(/Trip Type/i), 'leisure')
      await user.type(screen.getByPlaceholderText(/Tell us about your dream trip/i), 'Test message')

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/leads',
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: expect.stringContaining('john@example.com'),
          })
        )
      })

      // Check that source is included
      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(callBody.source).toBe('homepage')
    })

    it('should show loading state during submission', async () => {
      const user = userEvent.setup()

      // Delay the response
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockApiResponse({ success: true })), 100)
          )
      )

      render(<LeadCaptureForm />)

      // Fill minimum required fields
      await user.type(screen.getByPlaceholderText(/Your Name/i), 'John Doe')
      await user.type(screen.getByPlaceholderText(/Your Email/i), 'john@example.com')
      await user.type(screen.getByPlaceholderText(/Your Phone/i), '1234567890')
      await user.selectOptions(screen.getByLabelText(/Trip Type/i), 'leisure')

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      // Should show loading state
      expect(screen.getByText(/Submitting.../i)).toBeInTheDocument()
      expect(submitButton).toBeDisabled()

      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.queryByText(/Submitting.../i)).not.toBeInTheDocument()
      })
    })

    it('should handle submission success', async () => {
      const user = userEvent.setup()
      const toast = await import('react-hot-toast')
      const toastSpy = vi.spyOn(toast.default, 'success')

      render(<LeadCaptureForm />)

      // Fill form
      await user.type(screen.getByPlaceholderText(/Your Name/i), 'John Doe')
      await user.type(screen.getByPlaceholderText(/Your Email/i), 'john@example.com')
      await user.type(screen.getByPlaceholderText(/Your Phone/i), '1234567890')
      await user.selectOptions(screen.getByLabelText(/Trip Type/i), 'leisure')

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toastSpy).toHaveBeenCalledWith(
          expect.stringContaining('Thank you for your interest'),
          expect.any(Object)
        )
      })

      // Form should be reset
      expect(screen.getByPlaceholderText(/Your Name/i)).toHaveValue('')
      expect(screen.getByPlaceholderText(/Your Email/i)).toHaveValue('')
    })

    it('should handle submission error', async () => {
      const user = userEvent.setup()
      const toast = await import('react-hot-toast')
      const toastSpy = vi.spyOn(toast.default, 'error')

      // Mock failed response
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      render(<LeadCaptureForm />)

      // Fill form
      await user.type(screen.getByPlaceholderText(/Your Name/i), 'John Doe')
      await user.type(screen.getByPlaceholderText(/Your Email/i), 'john@example.com')
      await user.type(screen.getByPlaceholderText(/Your Phone/i), '1234567890')
      await user.selectOptions(screen.getByLabelText(/Trip Type/i), 'leisure')

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toastSpy).toHaveBeenCalledWith(
          expect.stringContaining('Something went wrong'),
          expect.any(Object)
        )
      })

      // Form should not be reset on error
      expect(screen.getByPlaceholderText(/Your Name/i)).toHaveValue('John Doe')
    })
  })

  describe('Optional Fields', () => {
    it('should handle optional date fields', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      // Fill required fields
      await user.type(screen.getByPlaceholderText(/Your Name/i), 'John Doe')
      await user.type(screen.getByPlaceholderText(/Your Email/i), 'john@example.com')
      await user.type(screen.getByPlaceholderText(/Your Phone/i), '1234567890')
      await user.selectOptions(screen.getByLabelText(/Trip Type/i), 'leisure')

      // Add optional dates
      const departureInput = screen.getByLabelText(/Departure Date/i)
      const returnInput = screen.getByLabelText(/Return Date/i)

      await user.type(departureInput, '2024-12-01')
      await user.type(returnInput, '2024-12-15')

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
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
      await user.type(screen.getByPlaceholderText(/Your Name/i), 'John Doe')
      await user.type(screen.getByPlaceholderText(/Your Email/i), 'john@example.com')
      await user.type(screen.getByPlaceholderText(/Your Phone/i), '1234567890')
      await user.selectOptions(screen.getByLabelText(/Trip Type/i), 'leisure')

      // Select budget
      await user.selectOptions(screen.getByLabelText(/Budget/i), '$5000-$10000')

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      await waitFor(() => {
        const callBody = JSON.parse(mockFetch.mock.calls[0][1].body)
        expect(callBody.budget).toBe('$5000-$10000')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper form labels', () => {
      render(<LeadCaptureForm />)

      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Trip Type/i)).toBeInTheDocument()
    })

    it('should have proper ARIA attributes for errors', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      const submitButton = screen.getByRole('button', { name: /Get Free Consultation/i })
      await user.click(submitButton)

      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText(/Your Name/i)
        expect(nameInput).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      render(<LeadCaptureForm />)

      const nameInput = screen.getByPlaceholderText(/Your Name/i)
      nameInput.focus()

      // Tab through form elements
      await user.tab()
      expect(screen.getByPlaceholderText(/Your Email/i)).toHaveFocus()

      await user.tab()
      expect(screen.getByPlaceholderText(/Your Phone/i)).toHaveFocus()

      await user.tab()
      expect(screen.getByLabelText(/Trip Type/i)).toHaveFocus()
    })
  })
})
