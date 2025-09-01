import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { getBasePath, getAssetPath } from '../config'

describe('config utilities', () => {
  const originalNodeEnv = process.env.NODE_ENV

  beforeEach(() => {
    vi.unstubAllEnvs()
  })

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv
  })

  describe('getBasePath', () => {
    it('should return empty string in development', () => {
      process.env.NODE_ENV = 'development'
      expect(getBasePath()).toBe('')
    })

    it('should return base path in production', () => {
      process.env.NODE_ENV = 'production'
      expect(getBasePath()).toBe('/next-trip-anywhere')
    })

    it('should return empty string in test environment', () => {
      process.env.NODE_ENV = 'test'
      expect(getBasePath()).toBe('')
    })
  })

  describe('getAssetPath', () => {
    describe('in development', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'development'
      })

      it('should handle path with leading slash', () => {
        expect(getAssetPath('/images/logo.png')).toBe('/images/logo.png')
      })

      it('should add leading slash if missing', () => {
        expect(getAssetPath('images/logo.png')).toBe('/images/logo.png')
      })

      it('should handle empty string', () => {
        expect(getAssetPath('')).toBe('/')
      })

      it('should handle root path', () => {
        expect(getAssetPath('/')).toBe('/')
      })
    })

    describe('in production', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'production'
      })

      it('should prepend base path with leading slash', () => {
        expect(getAssetPath('/images/logo.png')).toBe('/next-trip-anywhere/images/logo.png')
      })

      it('should prepend base path and add leading slash', () => {
        expect(getAssetPath('images/logo.png')).toBe('/next-trip-anywhere/images/logo.png')
      })

      it('should handle empty string', () => {
        expect(getAssetPath('')).toBe('/next-trip-anywhere/')
      })

      it('should handle root path', () => {
        expect(getAssetPath('/')).toBe('/next-trip-anywhere/')
      })

      it('should handle complex paths', () => {
        expect(getAssetPath('/api/v1/users/123')).toBe('/next-trip-anywhere/api/v1/users/123')
      })
    })
  })

  describe('config object', () => {
    it('should have correct values in development', async () => {
      process.env.NODE_ENV = 'development'
      // Need to re-import to get new values
      vi.resetModules()
      const configModule = await import('../config')
      const { config: devConfig } = configModule

      expect(devConfig.basePath).toBe('')
      expect(devConfig.isProd).toBe(false)
    })

    it('should have correct values in production', async () => {
      process.env.NODE_ENV = 'production'
      // Need to re-import to get new values
      vi.resetModules()
      const configModule = await import('../config')
      const { config: prodConfig } = configModule

      expect(prodConfig.basePath).toBe('/next-trip-anywhere')
      expect(prodConfig.isProd).toBe(true)
    })

    it('should have correct values in test', async () => {
      process.env.NODE_ENV = 'test'
      // Need to re-import to get new values
      vi.resetModules()
      const configModule = await import('../config')
      const { config: testConfig } = configModule

      expect(testConfig.basePath).toBe('')
      expect(testConfig.isProd).toBe(false)
    })
  })
})
