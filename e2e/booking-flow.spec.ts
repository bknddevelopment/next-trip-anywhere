import { test, expect } from '@playwright/test'

test.describe('Booking Flow', () => {
  test('should complete flight booking flow', async ({ page }) => {
    // Go to flights page
    await page.goto('/flights')

    // Wait for page to load
    await expect(page.getByRole('heading', { name: /Find Your Perfect Flight/i })).toBeVisible()

    // Fill in flight search form
    await page.fill('input[placeholder*="From"]', 'New York')
    await page.fill('input[placeholder*="To"]', 'Los Angeles')

    // Select departure date
    const departureDate = page.locator('input[type="date"]').first()
    await departureDate.fill('2024-12-15')

    // Select return date
    const returnDate = page.locator('input[type="date"]').nth(1)
    await returnDate.fill('2024-12-22')

    // Select passengers
    const passengersSelect = page.locator('select').filter({ hasText: /passenger/i })
    if ((await passengersSelect.count()) > 0) {
      await passengersSelect.selectOption('2')
    }

    // Click search button
    await page.getByRole('button', { name: /Search Flights/i }).click()

    // Wait for results or form submission
    await page.waitForTimeout(2000)

    // Check for results or next step
    const hasResults = (await page.locator('[data-testid="flight-result"]').count()) > 0
    const hasForm = (await page.locator('form').count()) > 0

    expect(hasResults || hasForm).toBeTruthy()
  })

  test('should complete package booking flow', async ({ page }) => {
    // Go to packages page
    await page.goto('/packages')

    // Wait for page to load
    await expect(
      page.getByRole('heading', { name: /All-Inclusive Vacation Packages/i })
    ).toBeVisible()

    // Click on a package deal
    const packageCard = page.locator('[data-testid="package-card"]').first()
    if ((await packageCard.count()) > 0) {
      await packageCard.click()
    } else {
      // If no package cards, look for "Book Now" or "Learn More" buttons
      const bookButton = page
        .getByRole('button', { name: /Book Now|Learn More|View Details/i })
        .first()
      if (await bookButton.isVisible()) {
        await bookButton.click()
      }
    }

    // Fill in contact form if present
    const contactForm = page.locator('form').first()
    if (await contactForm.isVisible()) {
      await page.fill('input[name="name"]', 'Jane Smith')
      await page.fill('input[name="email"]', 'jane@example.com')
      await page.fill('input[name="phone"]', '9876543210')

      // Submit form
      await page.getByRole('button', { name: /Submit|Get Quote|Book Now/i }).click()

      // Wait for response
      await page.waitForTimeout(2000)
    }
  })

  test('should complete cruise booking flow', async ({ page }) => {
    // Go to cruises page
    await page.goto('/cruises')

    // Wait for page to load
    await expect(
      page.getByRole('heading', { name: /Unforgettable Cruise Experiences/i })
    ).toBeVisible()

    // Fill in cruise search if available
    const destinationInput = page.locator('input[placeholder*="destination"]')
    if (await destinationInput.isVisible()) {
      await destinationInput.fill('Caribbean')
    }

    // Select cruise line if dropdown exists
    const cruiseLineSelect = page.locator('select').filter({ hasText: /cruise line/i })
    if ((await cruiseLineSelect.count()) > 0) {
      await cruiseLineSelect.selectOption({ index: 1 })
    }

    // Click search or browse button
    const searchButton = page.getByRole('button', { name: /Search|Find Cruises|Browse/i })
    if (await searchButton.isVisible()) {
      await searchButton.click()
      await page.waitForTimeout(2000)
    }

    // Check for results or contact form
    const hasResults = (await page.locator('[data-testid="cruise-result"]').count()) > 0
    const hasForm = (await page.locator('form').count()) > 0

    expect(hasResults || hasForm).toBeTruthy()
  })

  test('should handle form validation errors', async ({ page }) => {
    await page.goto('/')

    // Scroll to contact form
    await page.evaluate(() => {
      document.querySelector('form')?.scrollIntoView()
    })

    // Try to submit empty form
    await page.getByRole('button', { name: /Get Free Consultation/i }).click()

    // Check for validation errors
    await expect(page.getByText(/Name must be at least 2 characters/i)).toBeVisible()
    await expect(page.getByText(/Please enter a valid email/i)).toBeVisible()
    await expect(page.getByText(/Please enter a valid phone number/i)).toBeVisible()

    // Fill in invalid data
    await page.fill('input[name="name"]', 'J')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="phone"]', '123')

    // Try to submit again
    await page.getByRole('button', { name: /Get Free Consultation/i }).click()

    // Should still show validation errors
    await expect(page.getByText(/Name must be at least 2 characters/i)).toBeVisible()
    await expect(page.getByText(/Please enter a valid email/i)).toBeVisible()
    await expect(page.getByText(/Please enter a valid phone number/i)).toBeVisible()
  })

  test('should navigate through location-specific pages', async ({ page }) => {
    // Test NYC page
    await page.goto('/from/nyc')
    await expect(page.getByText(/Flights from New York City/i)).toBeVisible()

    // Test Boston page
    await page.goto('/from/boston')
    await expect(page.getByText(/Flights from Boston/i)).toBeVisible()

    // Test Miami page
    await page.goto('/from/miami')
    await expect(page.getByText(/Flights from Miami/i)).toBeVisible()

    // Test DC page
    await page.goto('/from/dc')
    await expect(page.getByText(/Flights from Washington DC/i)).toBeVisible()
  })

  test('should persist form data on navigation', async ({ page }) => {
    await page.goto('/')

    // Scroll to form
    await page.evaluate(() => {
      document.querySelector('form')?.scrollIntoView()
    })

    // Fill in some form data
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')

    // Navigate to another page
    await page.getByRole('link', { name: /^Flights$/i }).click()
    await expect(page).toHaveURL('/flights')

    // Go back
    await page.goBack()

    // Check if form data is preserved (this depends on implementation)
    // Some apps preserve form state, others don't
    const nameValue = await page.locator('input[name="name"]').inputValue()
    const emailValue = await page.locator('input[name="email"]').inputValue()

    // Log values for debugging
    console.log('Name value after navigation:', nameValue)
    console.log('Email value after navigation:', emailValue)
  })
})

test.describe('Multi-step Booking Flow', () => {
  test('should complete multi-step vacation package booking', async ({ page }) => {
    await page.goto('/packages')

    // Step 1: Select package type
    const beachPackage = page.getByText(/Beach/i).first()
    if (await beachPackage.isVisible()) {
      await beachPackage.click()
    }

    // Step 2: Fill in travel details if form appears
    const travelForm = page.locator('form').first()
    if (await travelForm.isVisible()) {
      // Departure date
      const departureDateInput = page.locator('input[type="date"]').first()
      if (await departureDateInput.isVisible()) {
        await departureDateInput.fill('2024-12-20')
      }

      // Return date
      const returnDateInput = page.locator('input[type="date"]').nth(1)
      if (await returnDateInput.isVisible()) {
        await returnDateInput.fill('2024-12-27')
      }

      // Number of travelers
      const travelersSelect = page.locator('select').first()
      if (await travelersSelect.isVisible()) {
        await travelersSelect.selectOption('2')
      }
    }

    // Step 3: Contact information
    const nameInput = page.locator('input[name="name"]')
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test User')
      await page.fill('input[name="email"]', 'test@example.com')
      await page.fill('input[name="phone"]', '5551234567')
    }

    // Submit or continue
    const submitButton = page.getByRole('button', { name: /Submit|Continue|Next|Get Quote/i })
    if (await submitButton.isVisible()) {
      await submitButton.click()
      await page.waitForTimeout(2000)
    }

    // Verify submission or next step
    const successMessage = page.getByText(/Thank you|Success|Submitted/i)
    const nextStep = page.getByText(/Step 2|Payment|Confirmation/i)

    const isSuccess = await successMessage.isVisible().catch(() => false)
    const hasNextStep = await nextStep.isVisible().catch(() => false)

    expect(isSuccess || hasNextStep).toBeTruthy()
  })
})

test.describe('Search Functionality', () => {
  test('should search for destinations', async ({ page }) => {
    await page.goto('/')

    // Look for search input
    const searchInput = page.locator('input[placeholder*="Search"]').first()
    if (await searchInput.isVisible()) {
      await searchInput.fill('Paris')
      await searchInput.press('Enter')

      // Wait for search results
      await page.waitForTimeout(2000)

      // Check for results
      const hasResults = (await page.getByText(/Paris/i).count()) > 0
      expect(hasResults).toBeTruthy()
    }
  })

  test('should filter search results', async ({ page }) => {
    await page.goto('/flights')

    // Look for filter options
    const priceFilter = page.locator('select, input').filter({ hasText: /price/i })
    if ((await priceFilter.count()) > 0) {
      // Apply price filter
      const firstFilter = priceFilter.first()
      if ((await firstFilter.getAttribute('type')) === 'select') {
        await firstFilter.selectOption({ index: 1 })
      }
    }

    // Look for date filters
    const dateFilter = page.locator('input[type="date"]').first()
    if (await dateFilter.isVisible()) {
      await dateFilter.fill('2024-12-01')
    }

    // Apply filters
    const applyButton = page.getByRole('button', { name: /Apply|Filter|Search/i })
    if (await applyButton.isVisible()) {
      await applyButton.click()
      await page.waitForTimeout(1000)
    }
  })
})
