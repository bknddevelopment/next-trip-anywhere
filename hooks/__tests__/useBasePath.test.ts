import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useBasePath } from '../useBasePath'

describe('useBasePath', () => {
  const originalNodeEnv = process.env.NODE_ENV

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv
  })

  describe('in development environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development'
    })

    it('should return empty base path', () => {
      const { result } = renderHook(() => useBasePath())
      expect(result.current.basePath).toBe('')
    })

    it('should return image src without base path for local images', () => {
      const { result } = renderHook(() => useBasePath())

      expect(result.current.getImageSrc('/images/logo.png')).toBe('/images/logo.png')
      expect(result.current.getImageSrc('images/logo.png')).toBe('/images/logo.png')
    })

    it('should handle external URLs', () => {
      const { result } = renderHook(() => useBasePath())

      expect(result.current.getImageSrc('https://example.com/image.jpg')).toBe(
        'https://example.com/image.jpg'
      )
      expect(result.current.getImageSrc('http://example.com/image.jpg')).toBe(
        'http://example.com/image.jpg'
      )
    })
  })

  describe('in production environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production'
    })

    it('should return base path for GitHub Pages', () => {
      const { result } = renderHook(() => useBasePath())
      expect(result.current.basePath).toBe('/next-trip-anywhere')
    })

    it('should prepend base path to local images', () => {
      const { result } = renderHook(() => useBasePath())

      expect(result.current.getImageSrc('/images/logo.png')).toBe(
        '/next-trip-anywhere/images/logo.png'
      )
      expect(result.current.getImageSrc('images/logo.png')).toBe(
        '/next-trip-anywhere/images/logo.png'
      )
    })

    it('should not modify external URLs', () => {
      const { result } = renderHook(() => useBasePath())

      expect(result.current.getImageSrc('https://example.com/image.jpg')).toBe(
        'https://example.com/image.jpg'
      )
      expect(result.current.getImageSrc('http://example.com/image.jpg')).toBe(
        'http://example.com/image.jpg'
      )
    })

    it('should handle edge cases', () => {
      const { result } = renderHook(() => useBasePath())

      // Empty string
      expect(result.current.getImageSrc('')).toBe('/next-trip-anywhere/')

      // Just a slash
      expect(result.current.getImageSrc('/')).toBe('/next-trip-anywhere/')

      // Complex path
      expect(result.current.getImageSrc('/assets/images/gallery/photo.jpg')).toBe(
        '/next-trip-anywhere/assets/images/gallery/photo.jpg'
      )
    })
  })

  describe('in test environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'test'
    })

    it('should return empty base path', () => {
      const { result } = renderHook(() => useBasePath())
      expect(result.current.basePath).toBe('')
    })

    it('should return image src without base path', () => {
      const { result } = renderHook(() => useBasePath())

      expect(result.current.getImageSrc('/images/logo.png')).toBe('/images/logo.png')
      expect(result.current.getImageSrc('images/logo.png')).toBe('/images/logo.png')
    })
  })
})
