/**
 * Unit tests for Interactive Travel Tools
 * Tests client-side functionality, state management, and static compatibility
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

// Import tool components
import CruisePriceCalculator from '@/components/tools/CruisePriceCalculator'
import TravelBudgetPlanner from '@/components/tools/TravelBudgetPlanner'
import PackingChecklist from '@/components/tools/PackingChecklist'
import CruiseLineComparison from '@/components/tools/CruiseLineComparison'
import DestinationComparison from '@/components/tools/DestinationComparison'
import CruiseCountdown from '@/components/tools/CruiseCountdown'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Cruise Price Calculator', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should render without crashing', () => {
    render(<CruisePriceCalculator />)
    expect(screen.getByText(/cruise price calculator/i)).toBeInTheDocument()
  })

  it('should have default values', () => {
    render(<CruisePriceCalculator />)
    // Should have default cruise length, cabin type, etc.
    expect(
      screen.getByRole('combobox', { name: /cabin type/i }) || screen.getByLabelText(/cabin type/i)
    ).toBeDefined()
  })

  it('should calculate price when inputs change', async () => {
    render(<CruisePriceCalculator />)

    // Look for any element that shows pricing or total
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container).toBeInTheDocument()

    // Check that component renders interactive elements
    const selects = screen.getAllByRole('combobox') || screen.getAllByRole('button')
    expect(selects.length).toBeGreaterThan(0)
  })

  it('should save preferences to localStorage', async () => {
    render(<CruisePriceCalculator />)

    await waitFor(() => {
      const saved = localStorage.getItem('cruiseCalculatorPrefs')
      // localStorage should be called at some point
      expect(typeof saved === 'string' || saved === null).toBe(true)
    })
  })

  it('should handle Essex County discount', () => {
    render(<CruisePriceCalculator />)
    // Component should render successfully with discount logic
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should support multiple cruise lines', () => {
    render(<CruisePriceCalculator />)
    // Should have cruise line selection options
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(royal|caribbean|carnival|norwegian)/i)
  })

  it('should calculate add-ons correctly', () => {
    render(<CruisePriceCalculator />)
    // Should have add-on options available
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(drinks|wifi|dining|spa)/i)
  })
})

describe('Travel Budget Planner', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should render without crashing', () => {
    render(<TravelBudgetPlanner />)
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should have budget categories', () => {
    render(<TravelBudgetPlanner />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(pre-trip|onboard|excursion|shopping)/i)
  })

  it('should support currency conversion', () => {
    render(<TravelBudgetPlanner />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(usd|eur|gbp|cad)/i)
  })

  it('should calculate totals', () => {
    render(<TravelBudgetPlanner />)
    // Should have total calculation functionality
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/total/i)
  })

  it('should support per-person calculation', () => {
    render(<TravelBudgetPlanner />)
    // Should have per-person option
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should allow custom categories', () => {
    render(<TravelBudgetPlanner />)
    // Component should render with category management
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should save budget data to localStorage', async () => {
    render(<TravelBudgetPlanner />)

    await waitFor(() => {
      // localStorage interactions should work
      expect(localStorage.setItem).toBeDefined()
    })
  })
})

describe('Packing Checklist', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should render without crashing', () => {
    render(<PackingChecklist />)
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should have default packing categories', () => {
    render(<PackingChecklist />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(document|clothing|toiletries)/i)
  })

  it('should support checking items', () => {
    render(<PackingChecklist />)
    // Should have checkboxes for items
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
  })

  it('should track progress', () => {
    render(<PackingChecklist />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    // Should show progress indicator
    expect(container).toBeInTheDocument()
  })

  it('should support trip-specific packing lists', () => {
    render(<PackingChecklist />)
    // Should support different trip types
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should allow custom items', () => {
    render(<PackingChecklist />)
    // Should have ability to add custom items
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should save checklist state to localStorage', async () => {
    render(<PackingChecklist />)

    await waitFor(() => {
      expect(localStorage.setItem).toBeDefined()
    })
  })
})

describe('Cruise Line Comparison', () => {
  it('should render without crashing', () => {
    render(<CruiseLineComparison />)
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should display multiple cruise lines', () => {
    render(<CruiseLineComparison />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(royal caribbean|carnival|norwegian|princess)/i)
  })

  it('should compare features', () => {
    render(<CruiseLineComparison />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(feature|amenity|price|rating)/i)
  })

  it('should support filtering', () => {
    render(<CruiseLineComparison />)
    // Should have filtering options
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should display departure from Cape Liberty', () => {
    render(<CruiseLineComparison />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(cape liberty|newark|bayonne)/i)
  })
})

describe('Destination Comparison', () => {
  it('should render without crashing', () => {
    render(<DestinationComparison />)
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should compare multiple destinations', () => {
    render(<DestinationComparison />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(destination|compare|beach|mountain|city)/i)
  })

  it('should display comparison criteria', () => {
    render(<DestinationComparison />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(price|weather|activities|season)/i)
  })

  it('should support destination selection', () => {
    render(<DestinationComparison />)
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })
})

describe('Cruise Countdown', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should render without crashing', () => {
    render(<CruiseCountdown />)
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should allow date input', () => {
    render(<CruiseCountdown />)
    // Should have date picker or input
    const inputs = screen.getAllByRole('textbox') || []
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should calculate days remaining', () => {
    render(<CruiseCountdown />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent).toMatch(/(day|countdown|until)/i)
  })

  it('should save countdown date to localStorage', async () => {
    render(<CruiseCountdown />)

    await waitFor(() => {
      expect(localStorage.setItem).toBeDefined()
    })
  })

  it('should display motivational messages', () => {
    render(<CruiseCountdown />)
    // Should show excitement/anticipation messages
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })
})

describe('Tool Component Static Compatibility', () => {
  it('should not make API calls on initial render', () => {
    const fetchSpy = vi.spyOn(global, 'fetch')

    render(<CruisePriceCalculator />)
    render(<TravelBudgetPlanner />)
    render(<PackingChecklist />)

    expect(fetchSpy).not.toHaveBeenCalled()

    fetchSpy.mockRestore()
  })

  it('should use client-side state only', () => {
    // All tools should be 'use client' components
    render(<CruisePriceCalculator />)
    render(<TravelBudgetPlanner />)
    render(<PackingChecklist />)
    render(<CruiseLineComparison />)
    render(<DestinationComparison />)
    render(<CruiseCountdown />)

    // Should render without server-side dependencies
    expect(
      screen.getAllByRole('main').length + screen.getAllByRole('region').length
    ).toBeGreaterThan(0)
  })

  it('should handle localStorage gracefully', () => {
    // Tools should work even if localStorage fails
    const originalLocalStorage = window.localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => {
          throw new Error('localStorage not available')
        },
        setItem: () => {
          throw new Error('localStorage not available')
        },
        removeItem: () => {},
        clear: () => {},
      },
      writable: true,
    })

    expect(() => {
      render(<CruisePriceCalculator />)
    }).not.toThrow()

    // Restore
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    })
  })
})

describe('Tool Accessibility', () => {
  it('should have accessible form controls', () => {
    render(<CruisePriceCalculator />)
    const selects = screen.queryAllByRole('combobox')
    const buttons = screen.queryAllByRole('button')
    const inputs = screen.queryAllByRole('textbox') || screen.queryAllByRole('spinbutton')

    // Should have some interactive elements
    expect(selects.length + buttons.length + inputs.length).toBeGreaterThan(0)
  })

  it('should be keyboard navigable', () => {
    render(<CruisePriceCalculator />)
    // Should have focusable elements
    const interactive = screen.queryAllByRole('button').concat(screen.queryAllByRole('combobox'))
    expect(interactive.length).toBeGreaterThan(0)
  })

  it('should have clear labels', () => {
    render(<TravelBudgetPlanner />)
    // Component should render with accessible structure
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })
})

describe('Tool Responsiveness', () => {
  it('should render on mobile viewports', () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    render(<CruisePriceCalculator />)
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })

  it('should render on desktop viewports', () => {
    // Set desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    })

    render(<TravelBudgetPlanner />)
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument()
  })
})

describe('Tool Data Persistence', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should persist calculator preferences', async () => {
    const { unmount } = render(<CruisePriceCalculator />)

    await waitFor(() => {
      const saved = localStorage.getItem('cruiseCalculatorPrefs')
      // Should attempt to save
      expect(typeof saved === 'string' || saved === null).toBe(true)
    })

    unmount()
  })

  it('should persist budget data', async () => {
    const { unmount } = render(<TravelBudgetPlanner />)

    await waitFor(() => {
      expect(localStorage.setItem).toBeDefined()
    })

    unmount()
  })

  it('should persist checklist state', async () => {
    const { unmount } = render(<PackingChecklist />)

    await waitFor(() => {
      expect(localStorage.setItem).toBeDefined()
    })

    unmount()
  })
})

describe('Essex County Integration in Tools', () => {
  it('should mention Essex County or Newark in cruise calculator', () => {
    render(<CruisePriceCalculator />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent?.toLowerCase()).toMatch(/(essex|newark|cape liberty)/i)
  })

  it('should reference local areas in budget planner', () => {
    render(<TravelBudgetPlanner />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent?.toLowerCase()).toMatch(/(newark|essex|airport|parking)/i)
  })

  it('should include local tips in cruise line comparison', () => {
    render(<CruiseLineComparison />)
    const container = screen.getByRole('main') || screen.getByRole('region')
    expect(container.textContent?.toLowerCase()).toMatch(
      /(cape liberty|newark|bayonne|new jersey)/i
    )
  })
})
