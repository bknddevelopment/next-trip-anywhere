import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import OptimizedImage from '../OptimizedImage'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: vi.fn(
    ({
      src,
      alt,
      onError,
      priority,
      fill,
      placeholder,
      blurDataURL,
      quality,
      loader,
      unoptimized,
      onLoad,
      onLoadingComplete,
      sizes,
      ...props
    }) => {
      // Store the mock function for testing
      if ((global as any).mockImageOnError) {
        ;(global as any).mockImageOnError = onError
      }
      // Filter out Next.js specific props that shouldn't be passed to DOM
      const imgProps: any = { ...props, src, alt, 'data-testid': 'next-image' }

      // Add these as data attributes for testing if needed (not as boolean attributes)
      if (priority) {
        imgProps['data-priority'] = 'true'
      }
      if (fill) {
        imgProps['data-fill'] = 'true'
      }
      if (placeholder) {
        imgProps['data-placeholder'] = placeholder
      }
      if (blurDataURL) {
        imgProps['data-blurdataurl'] = blurDataURL
      }
      if (quality) {
        imgProps['data-quality'] = quality.toString()
      }

      return <img {...imgProps} />
    }
  ),
}))

// Mock the basePath utility
vi.mock('@/lib/basePath', () => ({
  normalizePath: vi.fn((path: string, isRuntime?: boolean) => {
    // Simple mock implementation
    if (path.startsWith('http')) {
      return path
    }
    if (isRuntime && typeof window !== 'undefined') {
      return `/mocked-base${path}`
    }
    return path
  }),
}))

describe('OptimizedImage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(global as any).mockImageOnError = null
    // Reset window object
    Object.defineProperty(window, 'location', {
      value: { pathname: '/' },
      writable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('should render with Next Image component by default', async () => {
      render(<OptimizedImage src="/test-image.jpg" alt="Test Image" />)

      const image = screen.getByTestId('next-image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('alt', 'Test Image')

      // The src will be updated by useEffect to include the base path
      await waitFor(() => {
        expect(image).toHaveAttribute('src', '/mocked-base/test-image.jpg')
      })
    })

    it('should pass through additional props to Image component', () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test Image"
          width={500}
          height={300}
          className="custom-class"
          priority
        />
      )

      const image = screen.getByTestId('next-image')
      expect(image).toHaveClass('custom-class')
      expect(image).toHaveAttribute('width', '500')
      expect(image).toHaveAttribute('height', '300')
    })

    it('should handle external URLs without modification', () => {
      render(<OptimizedImage src="https://example.com/image.jpg" alt="External Image" />)

      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
    })
  })

  describe('Runtime Path Handling', () => {
    it('should update image src with runtime base path on mount', async () => {
      render(<OptimizedImage src="/logo.png" alt="Logo" />)

      // Wait for useEffect to run
      await waitFor(() => {
        const image = screen.getByTestId('next-image')
        // The normalizePath mock returns /mocked-base prefix for runtime
        expect(image).toHaveAttribute('src', '/mocked-base/logo.png')
      })
    })

    it('should not update src for external URLs', async () => {
      render(<OptimizedImage src="https://cdn.example.com/image.jpg" alt="CDN Image" />)

      await waitFor(() => {
        const image = screen.getByTestId('next-image')
        expect(image).toHaveAttribute('src', 'https://cdn.example.com/image.jpg')
      })
    })
  })

  describe('Fallback Behavior', () => {
    it('should fallback to img tag on error', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      render(<OptimizedImage src="/broken-image.jpg" alt="Broken Image" />)

      // Get the onError handler that was passed to the Next Image component
      const NextImageMock = (await import('next/image')).default as any
      const lastCall = NextImageMock.mock.calls[NextImageMock.mock.calls.length - 1]
      const onError = lastCall[0].onError

      // Trigger the error handler
      act(() => {
        onError()
      })

      await waitFor(() => {
        // Should now render a regular img tag instead
        const fallbackImage = screen.getByAltText('Broken Image')
        expect(fallbackImage).toBeInTheDocument()
        expect(fallbackImage.tagName).toBe('IMG')
        expect(fallbackImage).not.toHaveAttribute('data-testid', 'next-image')
      })

      expect(consoleWarnSpy).toHaveBeenCalled()
      consoleWarnSpy.mockRestore()
    })

    it('should apply fill styles to fallback img when fill prop is true', async () => {
      render(
        <OptimizedImage src="/broken-image.jpg" alt="Fill Image" fill className="object-contain" />
      )

      // Trigger error to use fallback
      const NextImageMock = (await import('next/image')).default as any
      const lastCall = NextImageMock.mock.calls[NextImageMock.mock.calls.length - 1]
      const onError = lastCall[0].onError
      act(() => {
        onError()
      })

      await waitFor(() => {
        const fallbackImage = screen.getByAltText('Fill Image')
        const styles = window.getComputedStyle(fallbackImage)

        expect(styles.position).toBe('absolute')
        expect(styles.height).toBe('100%')
        expect(styles.width).toBe('100%')
        expect(styles.objectFit).toBe('contain')
      })
    })

    it('should use object-cover by default for fill images', async () => {
      render(<OptimizedImage src="/broken-image.jpg" alt="Cover Image" fill />)

      // Trigger error to use fallback
      const NextImageMock = (await import('next/image')).default as any
      const lastCall = NextImageMock.mock.calls[NextImageMock.mock.calls.length - 1]
      const onError = lastCall[0].onError
      act(() => {
        onError()
      })

      await waitFor(() => {
        const fallbackImage = screen.getByAltText('Cover Image')
        const styles = window.getComputedStyle(fallbackImage)

        expect(styles.objectFit).toBe('cover')
      })
    })

    it('should preserve custom styles in fallback mode', async () => {
      const customStyle = { border: '2px solid red', borderRadius: '10px' }

      render(<OptimizedImage src="/broken-image.jpg" alt="Styled Image" style={customStyle} />)

      // Trigger error to use fallback
      const NextImageMock = (await import('next/image')).default as any
      const lastCall = NextImageMock.mock.calls[NextImageMock.mock.calls.length - 1]
      const onError = lastCall[0].onError
      act(() => {
        onError()
      })

      await waitFor(() => {
        const fallbackImage = screen.getByAltText('Styled Image')
        const styles = window.getComputedStyle(fallbackImage)

        expect(styles.border).toBe('2px solid red')
        expect(styles.borderRadius).toBe('10px')
      })
    })

    it('should use runtime path for fallback src', async () => {
      render(<OptimizedImage src="/logo.png" alt="Logo" />)

      // Trigger error to use fallback
      const NextImageMock = (await import('next/image')).default as any
      const lastCall = NextImageMock.mock.calls[NextImageMock.mock.calls.length - 1]
      const onError = lastCall[0].onError
      act(() => {
        onError()
      })

      await waitFor(() => {
        const fallbackImage = screen.getByAltText('Logo')
        // The normalizePath mock returns /mocked-base prefix for runtime
        expect(fallbackImage).toHaveAttribute('src', '/mocked-base/logo.png')
      })
    })
  })

  describe('Props Handling', () => {
    it('should handle width and height props', () => {
      render(<OptimizedImage src="/sized-image.jpg" alt="Sized Image" width={400} height={200} />)

      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('width', '400')
      expect(image).toHaveAttribute('height', '200')
    })

    it('should handle fill prop', () => {
      render(<OptimizedImage src="/fill-image.jpg" alt="Fill Image" fill />)

      const image = screen.getByTestId('next-image')
      // The fill prop is passed through but may be handled differently by the mock
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('alt', 'Fill Image')
    })

    it('should handle priority prop', () => {
      render(<OptimizedImage src="/priority-image.jpg" alt="Priority Image" priority />)

      const image = screen.getByTestId('next-image')
      // The priority prop is passed through but may be handled differently by the mock
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('alt', 'Priority Image')
    })

    it('should handle className prop', () => {
      render(
        <OptimizedImage
          src="/classed-image.jpg"
          alt="Classed Image"
          className="rounded-lg shadow-xl"
        />
      )

      const image = screen.getByTestId('next-image')
      expect(image).toHaveClass('rounded-lg', 'shadow-xl')
    })

    it('should handle quality prop', () => {
      render(<OptimizedImage src="/quality-image.jpg" alt="Quality Image" quality={90} />)

      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('data-quality', '90')
    })

    it('should handle placeholder and blurDataURL props', () => {
      const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'

      render(
        <OptimizedImage
          src="/blur-image.jpg"
          alt="Blur Image"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      )

      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('data-placeholder', 'blur')
      expect(image).toHaveAttribute('data-blurdataurl', blurDataURL)
    })
  })

  describe('Accessibility', () => {
    it('should always include alt text', () => {
      render(<OptimizedImage src="/accessible-image.jpg" alt="Accessible Image" />)

      const image = screen.getByAltText('Accessible Image')
      expect(image).toBeInTheDocument()
    })

    it('should preserve alt text when falling back', async () => {
      render(<OptimizedImage src="/broken-image.jpg" alt="Fallback Alt Text" />)

      // Trigger error to use fallback
      const NextImageMock = (await import('next/image')).default as any
      const lastCall = NextImageMock.mock.calls[NextImageMock.mock.calls.length - 1]
      const onError = lastCall[0].onError
      act(() => {
        onError()
      })

      await waitFor(() => {
        const fallbackImage = screen.getByAltText('Fallback Alt Text')
        expect(fallbackImage).toBeInTheDocument()
      })
    })

    it('should handle empty alt text for decorative images', () => {
      render(<OptimizedImage src="/decorative.jpg" alt="" />)

      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('alt', '')
    })
  })

  describe('Error Logging', () => {
    it('should log warning when image fails to load', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      render(<OptimizedImage src="/error-image.jpg" alt="Error Image" />)

      // Trigger error
      const NextImageMock = (await import('next/image')).default as any
      const lastCall = NextImageMock.mock.calls[NextImageMock.mock.calls.length - 1]
      const onError = lastCall[0].onError
      act(() => {
        onError()
      })

      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Image failed to load'))
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('/error-image.jpg'))

      consoleWarnSpy.mockRestore()
    })
  })
})
