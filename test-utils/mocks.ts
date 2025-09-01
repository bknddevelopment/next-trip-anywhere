import { vi } from 'vitest'

// Mock data generators
export const mockDestination = (overrides = {}) => ({
  id: '1',
  name: 'Paris',
  country: 'France',
  image: '/images/paris.jpg',
  price: 1200,
  description: 'The City of Light',
  rating: 4.8,
  ...overrides,
})

export const mockFlight = (overrides = {}) => ({
  id: 'FL123',
  airline: 'Test Airlines',
  from: 'New York',
  to: 'London',
  departureTime: '2024-12-01T10:00:00Z',
  arrivalTime: '2024-12-01T22:00:00Z',
  price: 450,
  duration: '7h',
  ...overrides,
})

export const mockCruise = (overrides = {}) => ({
  id: 'CR456',
  name: 'Caribbean Adventure',
  ship: 'Ocean Explorer',
  duration: '7 nights',
  departure: 'Miami',
  ports: ['Cozumel', 'Jamaica', 'Grand Cayman'],
  price: 1500,
  ...overrides,
})

export const mockPackage = (overrides = {}) => ({
  id: 'PKG789',
  name: 'Beach Paradise',
  destination: 'Maldives',
  duration: '5 nights',
  includes: ['Flight', 'Hotel', 'Meals'],
  price: 2500,
  ...overrides,
})

export const mockFormData = (overrides = {}) => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  message: 'Test message',
  ...overrides,
})

// API mock responses
export const mockApiResponse = (data: unknown, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: vi.fn().mockResolvedValue(data),
  text: vi.fn().mockResolvedValue(JSON.stringify(data)),
})

// Mock fetch implementation
export const createMockFetch = () => {
  return vi.fn().mockImplementation((url: string) => {
    // Default mock responses based on URL patterns
    if (url.includes('/api/destinations')) {
      return Promise.resolve(mockApiResponse([mockDestination()]))
    }
    if (url.includes('/api/flights')) {
      return Promise.resolve(mockApiResponse([mockFlight()]))
    }
    if (url.includes('/api/cruises')) {
      return Promise.resolve(mockApiResponse([mockCruise()]))
    }
    if (url.includes('/api/packages')) {
      return Promise.resolve(mockApiResponse([mockPackage()]))
    }

    // Default response
    return Promise.resolve(mockApiResponse({ success: true }))
  })
}

// Mock localStorage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key])
    }),
  }
}

// Mock window methods
export const mockWindow = () => ({
  scrollTo: vi.fn(),
  alert: vi.fn(),
  confirm: vi.fn().mockReturnValue(true),
  open: vi.fn(),
  location: {
    href: '',
    pathname: '/',
    search: '',
    hash: '',
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  },
})

// Performance mock
export const mockPerformance = () => ({
  now: vi.fn().mockReturnValue(1000),
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn().mockReturnValue([]),
  clearMarks: vi.fn(),
  clearMeasures: vi.fn(),
})
