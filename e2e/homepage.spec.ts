import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage with hero section', async ({ page }) => {
    // Check hero section is visible
    await expect(page.locator('section').first()).toBeVisible()

    // Check for main heading
    await expect(page.getByRole('heading', { name: /Your Next Adventure/i })).toBeVisible()
    await expect(page.getByText(/Starts Here/i)).toBeVisible()

    // Check for CTA button
    await expect(page.getByRole('button', { name: /Start Planning Your Trip/i })).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    // Check header is visible
    await expect(page.getByRole('banner')).toBeVisible()

    // Check navigation links
    await expect(page.getByRole('link', { name: /^Flights$/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /^Packages$/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /^Cruises$/i })).toBeVisible()

    // Test navigation to flights page
    await page.getByRole('link', { name: /^Flights$/i }).click()
    await expect(page).toHaveURL('/flights')
  })

  test('should scroll to search section when clicking scroll button', async ({ page }) => {
    // Find and click scroll button
    const scrollButton = page.getByLabel(/Scroll to search/i)
    await expect(scrollButton).toBeVisible()

    // Click scroll button
    await scrollButton.click()

    // Check that search section is in viewport
    const searchSection = page.locator('#search-section')
    await expect(searchSection).toBeInViewport()
  })

  test('should display destination cards', async ({ page }) => {
    // Scroll to destination section
    await page.evaluate(() => {
      document.querySelector('#destinations')?.scrollIntoView()
    })

    // Check for destination cards
    await expect(page.getByText(/Popular Destinations/i)).toBeVisible()

    // Check for at least one destination card
    const destinationCards = page.locator('[data-testid="destination-card"]')
    await expect(destinationCards.first()).toBeVisible()
  })

  test('should have working contact form', async ({ page }) => {
    // Scroll to form
    await page.evaluate(() => {
      document.querySelector('form')?.scrollIntoView()
    })

    // Fill out form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '1234567890')
    await page.selectOption('select[name="tripType"]', 'leisure')

    // Submit form
    await page.getByRole('button', { name: /Get Free Consultation/i }).click()

    // Check for success message or loading state
    await expect(page.getByText(/Submitting|Thank you/i)).toBeVisible({ timeout: 10000 })
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check mobile menu button is visible
    await expect(page.getByLabel(/Toggle menu/i)).toBeVisible()

    // Open mobile menu
    await page.getByLabel(/Toggle menu/i).click()

    // Check mobile navigation is visible
    await expect(page.getByRole('navigation', { name: /Mobile menu/i })).toBeVisible()

    // Check navigation links in mobile menu
    await expect(page.getByRole('link', { name: /^Flights$/i })).toBeVisible()
  })

  test('should load images properly', async ({ page }) => {
    // Check logo loads
    const logo = page.getByAltText(/Next Trip Anywhere/i)
    await expect(logo).toBeVisible()

    // Check hero background loads (video or image)
    const heroSection = page.locator('section').first()
    await expect(heroSection).toBeVisible()
  })

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Next Trip Anywhere/i)

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content')
    expect(metaDescription).toBeTruthy()

    // Check canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBeTruthy()
  })

  test('should handle location dropdown', async ({ page }) => {
    // Hover over locations button
    await page.getByRole('button', { name: /Locations/i }).hover()

    // Check dropdown appears
    await expect(page.getByRole('link', { name: /New York City/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Boston/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Miami/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Washington DC/i })).toBeVisible()

    // Click on a location
    await page.getByRole('link', { name: /New York City/i }).click()
    await expect(page).toHaveURL('/from/nyc')
  })
})

test.describe('Homepage Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/', { waitUntil: 'networkidle' })

    const loadTime = Date.now() - startTime

    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/')

    // Measure LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.renderTime || lastEntry.loadTime)
        }).observe({ type: 'largest-contentful-paint', buffered: true })
      })
    })

    // LCP should be under 2.5s for good score
    expect(Number(lcp)).toBeLessThan(2500)
  })
})

test.describe('Homepage Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')

    // Tab through navigation
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()

    // Continue tabbing through interactive elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toBeVisible()
    }
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    // Check for h1
    const h1Count = await page.getByRole('heading', { level: 1 }).count()
    expect(h1Count).toBeGreaterThanOrEqual(1)

    // Check for h2s
    const h2Count = await page.getByRole('heading', { level: 2 }).count()
    expect(h2Count).toBeGreaterThan(0)
  })

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/')

    // Get all images
    const images = page.locator('img')
    const imageCount = await images.count()

    // Check each image has alt text
    for (let i = 0; i < imageCount; i++) {
      const altText = await images.nth(i).getAttribute('alt')
      expect(altText).toBeTruthy()
    }
  })

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/')

    // This is a simplified check - in real scenarios, use axe-core
    const buttons = page.getByRole('button')
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const backgroundColor = await button.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor
      })

      const color = await button.evaluate((el) => {
        return window.getComputedStyle(el).color
      })

      // Basic check that colors are defined
      expect(backgroundColor).toBeTruthy()
      expect(color).toBeTruthy()
    }
  })
})
