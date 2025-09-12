import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { env, publicEnv, isDevelopment, isProduction, isTest } from '../env'

describe('EnvironmentConfig', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('singleton instance', () => {
    it('should return the same instance', () => {
      const instance1 = env
      const instance2 = env
      expect(instance1).toBe(instance2)
    })
  })

  describe('publicConfig', () => {
    it('should have default values when env vars not set', () => {
      const config = env.publicConfig

      expect(config.appUrl).toBe('https://nexttripanywhere.com')
      expect(config.basePath).toBe('')
      expect(config.enableAnalytics).toBe(false)
      expect(config.enableErrorTracking).toBe(false)
      expect(config.enableMaintenanceMode).toBe(false)
    })

    it('should use environment variables when set', async () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://app.example.com'
      process.env.NEXT_PUBLIC_BASE_PATH = '/app'
      process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'true'

      vi.resetModules()
      const envModule = await import('../env')
      const { env: newEnv } = envModule
      const config = newEnv.publicConfig

      expect(config.appUrl).toBe('https://app.example.com')
      expect(config.basePath).toBe('/app')
      expect(config.enableAnalytics).toBe(true)
    })

    it('should handle optional environment variables', async () => {
      process.env.NEXT_PUBLIC_FORMSPREE_ID = 'test-form-id'
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'maps_key_123'

      vi.resetModules()
      const envModule = await import('../env')
      const { env: newEnv } = envModule
      const config = newEnv.publicConfig

      expect(config.formspreeId).toBe('test-form-id')
      expect(config.googleMapsApiKey).toBe('maps_key_123')
    })

    it('should parse boolean values correctly', async () => {
      process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'TRUE'
      process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING = 'false'
      process.env.NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE = 'invalid'

      vi.resetModules()
      const envModule = await import('../env')
      const { env: newEnv } = envModule
      const config = newEnv.publicConfig

      expect(config.enableAnalytics).toBe(true)
      expect(config.enableErrorTracking).toBe(false)
      expect(config.enableMaintenanceMode).toBe(false)
    })
  })

  describe('environment helpers', () => {
    it('should correctly identify development environment', async () => {
      (process.env as any).NODE_ENV = 'development'

      vi.resetModules()
      const envModule = await import('../env')
      const { env: newEnv } = envModule

      expect(newEnv.isDevelopment).toBe(true)
      expect(newEnv.isProduction).toBe(false)
      expect(newEnv.isTest).toBe(false)
    })

    it('should correctly identify production environment', async () => {
      (process.env as any).NODE_ENV = 'production'

      vi.resetModules()
      const envModule = await import('../env')
      const { env: newEnv } = envModule

      expect(newEnv.isDevelopment).toBe(false)
      expect(newEnv.isProduction).toBe(true)
      expect(newEnv.isTest).toBe(false)
    })

    it('should correctly identify test environment', async () => {
      (process.env as any).NODE_ENV = 'test'

      vi.resetModules()
      const envModule = await import('../env')
      const { env: newEnv } = envModule

      expect(newEnv.isDevelopment).toBe(false)
      expect(newEnv.isProduction).toBe(false)
      expect(newEnv.isTest).toBe(true)
    })
  })

  describe('validate method', () => {
    it('should not throw in development with missing vars', async () => {
      (process.env as any).NODE_ENV = 'development'

      vi.resetModules()
      const envModule = await import('../env')
      const { env: newEnv } = envModule

      expect(() => newEnv.validate()).not.toThrow()
    })

    it('should log warning in production for recommended variables', async () => {
      const originalWarn = console.warn
      const mockWarn = vi.fn()
      ;(console as any).warn = mockWarn

      // Ensure process.env exists before setting NODE_ENV
      if (!process.env) {
        process.env = {} as NodeJS.ProcessEnv
      }
      (process.env as any).NODE_ENV = 'production'

      vi.resetModules()
      const envModule = await import('../env')
      const { env: newEnv } = envModule

      newEnv.validate()

      expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('NEXT_PUBLIC_FORMSPREE_ID'))

      ;(console as any).warn = originalWarn
    })
  })

  describe('exported convenience accessors', () => {
    it('should export publicEnv correctly', () => {
      expect(publicEnv).toBeDefined()
      expect(publicEnv).toBe(env.publicConfig)
    })

    it('should export helper functions correctly', () => {
      expect(isDevelopment).toBe(env.isDevelopment)
      expect(isProduction).toBe(env.isProduction)
      expect(isTest).toBe(env.isTest)
    })
  })
})
