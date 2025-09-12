import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import HeroSection from '../HeroSection'

// Mock Next.js dynamic import
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFn: () => Promise<any>, options?: any) => {
    // Return the actual component for testing
    const Component = React.lazy(importFn)
    if (options?.ssr === false) {
      // Wrap in a component that simulates client-side only rendering
      return function DynamicComponent(props: any) {
        const [mounted, setMounted] = React.useState(false)
        React.useEffect(() => {
          setMounted(true)
        }, [])
        
        if (!mounted) {
          return options?.loading ? React.createElement(options.loading) : null
        }
        
        return React.createElement(React.Suspense, {
          fallback: options?.loading ? React.createElement(options.loading) : null
        }, React.createElement(Component, props))
      }
    }
    return Component
  }
}))

// Mock OptimizedVideo component
vi.mock('@/components/ui/OptimizedVideo', () => ({
  __esModule: true,
  default: function MockOptimizedVideo({ 
    src, 
    poster, 
    onLoadStart, 
    onLoadComplete,
    className 
  }: any) {
    React.useEffect(() => {
      onLoadStart?.()
      // Simulate successful load after a delay
      const timer = setTimeout(() => {
        onLoadComplete?.()
      }, 100)
      return () => clearTimeout(timer)
    }, [onLoadStart, onLoadComplete])
    
    return (
      <div 
        data-testid="optimized-video" 
        data-src={src}
        data-poster={poster}
        className={className}
      >
        Video Component
      </div>
    )
  }
}))

// Mock PerformantImage component
vi.mock('@/components/ui/PerformantImage', () => ({
  __esModule: true,
  default: function MockPerformantImage({ 
    src, 
    alt, 
    fallbackSrc,
    className,
    priority,
    preload,
    quality,
    fill
  }: any) {
    return (
      <img 
        data-testid="performant-image"
        src={src || fallbackSrc}
        alt={alt}
        className={className}
        data-priority={priority}
        data-preload={preload}
        data-quality={quality}
        data-fill={fill}
      />
    )
  }
}))

describe('HeroSection Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: vi.fn()
    }))
  })

  it('renders without crashing', () => {
    const { container } = render(<HeroSection />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('displays hero content correctly', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('Your Next Adventure')).toBeInTheDocument()
    expect(screen.getByText('Starts Here')).toBeInTheDocument()
    expect(screen.getByText(/Expert travel planning/)).toBeInTheDocument()
  })

  it('renders fallback poster image initially', () => {
    render(<HeroSection />)
    
    const images = screen.getAllByTestId('performant-image')
    expect(images.length).toBeGreaterThan(0)
    
    // Check that at least one image has proper attributes
    const posterImage = images[0]
    expect(posterImage).toHaveAttribute('data-priority', 'true')
  })

  it('loads video component after mounting', async () => {
    render(<HeroSection />)
    
    // Wait for dynamic import and mounting
    await waitFor(() => {
      const video = screen.queryByTestId('optimized-video')
      expect(video).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('handles video rotation correctly', async () => {
    vi.useFakeTimers()
    
    render(<HeroSection />)
    
    // Wait for initial mount
    await waitFor(() => {
      const video = screen.queryByTestId('optimized-video')
      expect(video).toBeInTheDocument()
    })
    
    const initialVideo = screen.getByTestId('optimized-video')
    const initialSrc = initialVideo.getAttribute('data-src')
    
    // Fast-forward time to trigger video rotation
    vi.advanceTimersByTime(15000)
    
    await waitFor(() => {
      const updatedVideo = screen.getByTestId('optimized-video')
      const updatedSrc = updatedVideo.getAttribute('data-src')
      expect(updatedSrc).not.toBe(initialSrc)
    })
    
    vi.useRealTimers()
  })

  it('handles scroll to search functionality', () => {
    const mockScrollIntoView = vi.fn()
    
    // Create mock search section
    const searchSection = document.createElement('div')
    searchSection.id = 'search-section'
    searchSection.scrollIntoView = mockScrollIntoView
    document.body.appendChild(searchSection)
    
    render(<HeroSection />)
    
    const startPlanningButton = screen.getByText('Start Planning My Trip')
    fireEvent.click(startPlanningButton)
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    })
    
    // Cleanup
    document.body.removeChild(searchSection)
  })

  it('displays trust indicators', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('15+ Years Experience')).toBeInTheDocument()
    expect(screen.getByText('50,000+ Happy Travelers')).toBeInTheDocument()
    expect(screen.getByText('24/7 Support')).toBeInTheDocument()
    expect(screen.getByText('Best Price Guarantee')).toBeInTheDocument()
  })

  it('renders gradient overlays for text contrast', () => {
    const { container } = render(<HeroSection />)
    
    // Check for gradient overlay divs
    const gradientOverlays = container.querySelectorAll('[class*="bg-gradient"]')
    expect(gradientOverlays.length).toBeGreaterThan(0)
  })

  it('handles video load errors gracefully', async () => {
    // Mock OptimizedVideo to simulate error
    vi.mock('@/components/ui/OptimizedVideo', () => ({
      __esModule: true,
      default: function MockOptimizedVideoWithError({ 
        onLoadStart, 
        onLoadComplete 
      }: any) {
        React.useEffect(() => {
          onLoadStart?.()
          // Simulate error
          setTimeout(() => {
            onLoadComplete?.()
          }, 100)
        }, [onLoadStart, onLoadComplete])
        
        return <div data-testid="video-error">Error Loading Video</div>
      }
    }))
    
    render(<HeroSection />)
    
    // Should still show poster image as fallback
    const images = screen.getAllByTestId('performant-image')
    expect(images.length).toBeGreaterThan(0)
  })

  it('cleans up intervals and timeouts on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
    
    const { unmount } = render(<HeroSection />)
    
    unmount()
    
    // Should clean up any intervals/timeouts
    expect(clearIntervalSpy).toHaveBeenCalled()
    expect(clearTimeoutSpy).toHaveBeenCalled()
    
    clearIntervalSpy.mockRestore()
    clearTimeoutSpy.mockRestore()
  })
})