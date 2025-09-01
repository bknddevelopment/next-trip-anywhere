import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import {
  useOptimizedCallback,
  useDebounce,
  useThrottle,
  useLazyLoad,
} from '../useOptimizedCallback'

describe('useOptimizedCallback', () => {
  it('should return a stable callback reference', () => {
    let count = 0
    const callback = vi.fn(() => count++)

    const { result, rerender } = renderHook(({ deps }) => useOptimizedCallback(callback, deps), {
      initialProps: { deps: [1] },
    })

    const firstCallback = result.current

    // Rerender with same dependencies
    rerender({ deps: [1] })
    expect(result.current).toBe(firstCallback)

    // Rerender with different dependencies
    rerender({ deps: [2] })
    expect(result.current).toBe(firstCallback) // Still the same reference
  })

  it('should call the latest callback version', () => {
    let value = 1

    const { result, rerender } = renderHook(({ val }) => useOptimizedCallback(() => val, [val]), {
      initialProps: { val: value },
    })

    expect(result.current()).toBe(1)

    value = 2
    rerender({ val: value })

    // Even though the callback reference is stable, it should call the latest version
    expect(result.current()).toBe(2)
  })

  it('should pass arguments correctly', () => {
    const callback = vi.fn((a: number, b: number) => a + b)

    const { result } = renderHook(() => useOptimizedCallback(callback, []))

    expect(result.current(5, 3)).toBe(8)
    expect(callback).toHaveBeenCalledWith(5, 3)
  })
})

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    expect(result.current).toBe('initial')

    // Update value
    rerender({ value: 'updated', delay: 500 })

    // Value should not change immediately
    expect(result.current).toBe('initial')

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(499)
    })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toBe('updated')
  })

  it('should cancel previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'first' },
    })

    rerender({ value: 'second' })
    act(() => {
      vi.advanceTimersByTime(300)
    })

    rerender({ value: 'third' })
    act(() => {
      vi.advanceTimersByTime(300)
    })

    // Still should be initial value
    expect(result.current).toBe('first')

    act(() => {
      vi.advanceTimersByTime(200)
    })

    // Should update to the last value
    expect(result.current).toBe('third')
  })

  it('should handle different data types', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: { count: 1 } },
    })

    expect(result.current).toEqual({ count: 1 })

    rerender({ value: { count: 2 } })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toEqual({ count: 2 })
  })
})

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should throttle function calls', () => {
    const callback = vi.fn()

    const { result } = renderHook(() => useThrottle(callback, 1000))

    // First call should execute immediately
    act(() => {
      result.current('first')
    })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('first')

    // Rapid calls should be throttled
    act(() => {
      result.current('second')
      result.current('third')
    })
    expect(callback).toHaveBeenCalledTimes(1)

    // After delay, should allow another call
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenLastCalledWith('third')
  })

  it('should handle calls with different arguments', () => {
    const callback = vi.fn((x: number, y: number) => x + y)

    const { result } = renderHook(() => useThrottle(callback, 500))

    act(() => {
      result.current(1, 2)
    })
    expect(callback).toHaveBeenCalledWith(1, 2)

    act(() => {
      result.current(3, 4)
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(callback).toHaveBeenCalledWith(3, 4)
  })

  it('should clear timeout on rapid calls', () => {
    const callback = vi.fn()

    const { result } = renderHook(() => useThrottle(callback, 500))

    // First call
    act(() => {
      result.current('first')
    })

    // Multiple calls within throttle period
    act(() => {
      vi.advanceTimersByTime(100)
      result.current('second')
    })

    act(() => {
      vi.advanceTimersByTime(100)
      result.current('third')
    })

    act(() => {
      vi.advanceTimersByTime(100)
      result.current('fourth')
    })

    // Should only schedule the last call
    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenLastCalledWith('fourth')
  })
})

describe('useLazyLoad', () => {
  let observeMock: vi.Mock
  let unobserveMock: vi.Mock
  let disconnectMock: vi.Mock

  beforeEach(() => {
    observeMock = vi.fn()
    unobserveMock = vi.fn()
    disconnectMock = vi.fn()

    // Already mocked in setup, but we need to update the implementation
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => [],
    }))
  })

  it('should initialize with not visible', () => {
    const { result } = renderHook(() => useLazyLoad())

    const [ref, isVisible] = result.current
    expect(ref.current).toBe(null)
    expect(isVisible).toBe(false)
  })

  it('should observe element when ref is set', () => {
    const { result } = renderHook(() => useLazyLoad())

    const [ref] = result.current

    // Simulate setting ref
    act(() => {
      Object.defineProperty(ref, 'current', {
        value: document.createElement('div'),
        writable: true,
        configurable: true,
      })
    })

    // Force effect to run
    const { rerender } = renderHook(() => useLazyLoad())
    rerender()

    expect(observeMock).toHaveBeenCalled()
  })

  it('should set visible when element intersects', () => {
    let observerCallback: IntersectionObserverCallback | null = null

    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      observerCallback = callback
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: () => [],
      }
    })

    const { result } = renderHook(() => useLazyLoad())

    // Simulate intersection
    act(() => {
      if (observerCallback) {
        observerCallback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver
        )
      }
    })

    const [, isVisible] = result.current
    expect(isVisible).toBe(true)
    expect(disconnectMock).toHaveBeenCalled()
  })

  it('should accept custom rootMargin and threshold', () => {
    let capturedOptions: IntersectionObserverInit | undefined

    global.IntersectionObserver = vi.fn().mockImplementation((callback, options) => {
      capturedOptions = options
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: () => [],
      }
    })

    renderHook(() => useLazyLoad('100px', 0.5))

    expect(capturedOptions).toEqual({
      rootMargin: '100px',
      threshold: 0.5,
    })
  })

  it('should cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => useLazyLoad())

    const [ref] = result.current
    const element = document.createElement('div')

    act(() => {
      Object.defineProperty(ref, 'current', {
        value: element,
        writable: true,
        configurable: true,
      })
    })

    unmount()

    expect(unobserveMock).toHaveBeenCalledWith(element)
  })
})
