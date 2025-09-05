import { test, expect } from '@playwright/test'

test.describe('Critical User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Homepage', () => {
    test('should load homepage with all critical elements', async ({ page }) => {
      // Check header is present
      await expect(page.locator('header')).toBeVisible()

      // Check logo is visible
      await expect(page.locator('img[alt="Next Trip Anywhere"]').first()).toBeVisible()

      // Check main navigation items
      await expect(page.getByText('Services')).toBeVisible()
      await expect(page.getByText('Departing From')).toBeVisible()
      await expect(page.getByText('About')).toBeVisible()
      await expect(page.getByText('Contact')).toBeVisible()

      // Check hero section
      await expect(page.locator('h1')).toBeVisible()

      // Check CTA buttons
      await expect(page.getByRole('button', { name: /Get Quote/i }).first()).toBeVisible()

      // Check footer is present
      await expect(page.locator('footer')).toBeVisible()
    })

    test('should have responsive design on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      // Mobile menu button should be visible
      const menuButton = page.locator('button.lg\\:hidden').first()
      await expect(menuButton).toBeVisible()

      // Desktop navigation should be hidden
      const desktopNav = page.locator('nav.hidden.lg\\:flex')
      await expect(desktopNav).toBeHidden()

      // Open mobile menu
      await menuButton.click()

      // Mobile menu should be visible
      await expect(page.getByText('Services')).toBeVisible()
    })
  })

  test.describe('Navigation', () => {
    test('should navigate to service pages', async ({ page }) => {
      // Navigate to Flights page
      await page.getByRole('link', { name: 'Flights' }).first().click()
      await expect(page).toHaveURL('/flights')
      await expect(page.locator('h1')).toContainText(/Flight/i)

      // Navigate to Cruises page
      await page.getByRole('link', { name: 'Cruises' }).first().click()
      await expect(page).toHaveURL('/cruises')
      await expect(page.locator('h1')).toContainText(/Cruise/i)

      // Navigate to Packages page
      await page.getByRole('link', { name: 'Vacation Packages' }).first().click()
      await expect(page).toHaveURL('/packages')
      await expect(page.locator('h1')).toContainText(/Package/i)
    })

    test('should navigate using dropdown menus', async ({ page }) => {
      // Hover over Services dropdown
      await page.getByText('Services').first().hover()

      // Click on Flights from dropdown
      await page.getByRole('link', { name: 'Flights' }).first().click()
      await expect(page).toHaveURL('/flights')

      // Go back to homepage
      await page.goto('/')

      // Hover over Departing From dropdown
      await page.getByText('Departing From').first().hover()

      // Click on New York City
      await page.getByRole('link', { name: 'New York City' }).click()
      await expect(page).toHaveURL('/from/nyc')
    })
  })

  test.describe('Form Submission', () => {
    test('should submit lead capture form with valid data', async ({ page }) => {
      // Navigate to a page with the lead form (assuming it's on homepage)
      await page.goto('/')

      // Fill in the form if it exists on the page
      const formExists = await page
        .locator('form')
        .first()
        .isVisible()
        .catch(() => false)

      if (formExists) {
        // Fill out the form
        await page.fill('input[placeholder="John Doe"]', 'Test User')
        await page.fill('input[placeholder="john@example.com"]', 'test@example.com')
        await page.fill('input[placeholder*="555"]', '5551234567')

        // Select trip type
        const tripTypeSelect = page.locator('select').first()
        await tripTypeSelect.selectOption('cruise')

        // Submit the form
        await page.getByRole('button', { name: /Get.*Quote/i }).click()

        // Check for success message (toast notification)
        await expect(page.locator('text=/Thank you/i')).toBeVisible({ timeout: 10000 })
      }
    })

    test('should show validation errors for invalid form data', async ({ page }) => {
      // Navigate to a page with the lead form
      await page.goto('/')

      const formExists = await page
        .locator('form')
        .first()
        .isVisible()
        .catch(() => false)

      if (formExists) {
        // Try to submit empty form
        await page.getByRole('button', { name: /Get.*Quote/i }).click()

        // Check for validation errors
        await expect(page.locator('text=/at least 2 characters/i')).toBeVisible()
        await expect(page.locator('text=/valid email/i')).toBeVisible()
        await expect(page.locator('text=/valid phone/i')).toBeVisible()
      }
    })
  })

  test.describe('Search Functionality', () => {
    test('should search for flights', async ({ page }) => {
      // Navigate to flights page
      await page.goto('/flights')

      // Check if search form exists
      const searchFormExists = await page
        .locator('form')
        .first()
        .isVisible()
        .catch(() => false)

      if (searchFormExists) {
        // Fill in search criteria
        const fromInput = page.locator('input[placeholder*="From"]').first()
        const toInput = page.locator('input[placeholder*="To"]').first()

        if (await fromInput.isVisible()) {
          await fromInput.fill('New York')
          await toInput.fill('Los Angeles')

          // Select dates if date inputs exist
          const departureDateInput = page.locator('input[type="date"]').first()
          if (await departureDateInput.isVisible()) {
            const futureDate = new Date()
            futureDate.setDate(futureDate.getDate() + 30)
            await departureDateInput.fill(futureDate.toISOString().split('T')[0])
          }

          // Submit search
          await page.getByRole('button', { name: /Search/i }).click()

          // Check for results or loading state
          await expect(page.locator('text=/Loading|Results|No flights/i')).toBeVisible({
            timeout: 10000,
          })
        }
      }
    })
  })

  test.describe('Accessibility', () => {
    test('should be navigable with keyboard', async ({ page }) => {
      // Tab through main navigation
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // Check if an element is focused
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
      expect(focusedElement).toBeTruthy()

      // Navigate using Enter key
      await page.keyboard.press('Enter')

      // Should navigate to a new page or trigger an action
      await page.waitForTimeout(1000)
    })

    test('should have proper heading hierarchy', async ({ page }) => {
      // Check for h1
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBeGreaterThan(0)
      expect(h1Count).toBeLessThanOrEqual(1) // Should only have one h1

      // Check for proper heading structure
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents()
      expect(headings.length).toBeGreaterThan(0)
    })

    test('should have alt text for images', async ({ page }) => {
      // Get all images
      const images = page.locator('img')
      const imageCount = await images.count()

      if (imageCount > 0) {
        // Check each image has alt text
        for (let i = 0; i < imageCount; i++) {
          const altText = await images.nth(i).getAttribute('alt')
          expect(altText).toBeDefined()
        }
      }
    })
  })

  test.describe('Performance', () => {
    test('should load homepage within acceptable time', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000)
    })

    test('should have optimized images', async ({ page }) => {
      await page.goto('/')

      // Check for Next.js optimized images
      const optimizedImages = page.locator('img[src*="/_next/image"]')
      const optimizedCount = await optimizedImages.count()

      // Check for regular images
      const allImages = page.locator('img')
      const totalCount = await allImages.count()

      // Most images should be optimized (if using Next.js Image component)
      if (totalCount > 0) {
        const optimizationRatio = optimizedCount / totalCount
        // At least 50% of images should be optimized
        expect(optimizationRatio).toBeGreaterThanOrEqual(0.5)
      }
    })
  })

  test.describe('Error Handling', () => {
    test('should handle 404 pages gracefully', async ({ page }) => {
      // Navigate to non-existent page
      await page.goto('/non-existent-page-12345')

      // Should show 404 page or redirect
      const pageContent = await page.textContent('body')
      expect(pageContent).toMatch(/404|not found|page.*not.*exist/i)
    })

    test('should handle network errors gracefully', async ({ page, context }) => {
      // Block API calls to simulate network error
      await context.route('**/api/**', (route) => route.abort())

      await page.goto('/')

      // Try to submit a form
      const formExists = await page
        .locator('form')
        .first()
        .isVisible()
        .catch(() => false)

      if (formExists) {
        // Fill and submit form
        await page.fill('input[placeholder="John Doe"]', 'Test User')
        await page.fill('input[placeholder="john@example.com"]', 'test@example.com')
        await page.fill('input[placeholder*="555"]', '5551234567')

        const tripTypeSelect = page.locator('select').first()
        await tripTypeSelect.selectOption('cruise')

        await page.getByRole('button', { name: /Get.*Quote/i }).click()

        // Should show error message
        await expect(page.locator('text=/error|failed|try again/i')).toBeVisible({ timeout: 10000 })
      }
    })
  })
})
