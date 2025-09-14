/**
 * API Middleware utilities for caching, rate limiting, and error handling
 * Production-ready middleware for Next.js API routes
 */

import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, ApiErrorCode, RateLimitConfig, CacheConfig } from '@/types/destination'

/**
 * In-memory cache implementation
 * In production, consider using Redis or another distributed cache
 */
class MemoryCache {
  private cache: Map<string, { data: any; expires: number; etag?: string }> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000)
  }

  set(key: string, data: any, ttl: number, etag?: string) {
    const expires = Date.now() + ttl * 1000
    this.cache.set(key, { data, expires, etag })
  }

  get(key: string): { data: any; etag?: string } | null {
    const entry = this.cache.get(key)
    if (!entry) {
      return null
    }

    if (Date.now() > entry.expires) {
      this.cache.delete(key)
      return null
    }

    return { data: entry.data, etag: entry.etag }
  }

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) {
      return false
    }

    if (Date.now() > entry.expires) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  delete(key: string) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expires) {
        this.cache.delete(key)
      }
    }
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.cache.clear()
  }
}

// Global cache instance
const cache = new MemoryCache()

/**
 * Rate limiter implementation
 * Tracks request counts per IP address
 */
class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Clean up old entries every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 300000)
  }

  isAllowed(identifier: string, config: RateLimitConfig): boolean {
    const now = Date.now()
    const record = this.requests.get(identifier)

    if (!record || now > record.resetTime) {
      // Start new window
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + config.windowMs,
      })
      return true
    }

    if (record.count >= config.maxRequests) {
      return false
    }

    record.count++
    return true
  }

  getRemainingRequests(identifier: string, config: RateLimitConfig): number {
    const record = this.requests.get(identifier)
    if (!record || Date.now() > record.resetTime) {
      return config.maxRequests
    }
    return Math.max(0, config.maxRequests - record.count)
  }

  getResetTime(identifier: string, config: RateLimitConfig): number {
    const record = this.requests.get(identifier)
    if (!record) {
      return Date.now() + config.windowMs
    }
    return record.resetTime
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(key)
      }
    }
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.requests.clear()
  }
}

// Global rate limiter instance
const rateLimiter = new RateLimiter()

/**
 * Default rate limit configuration
 */
export const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  windowMs: 60000, // 1 minute
  maxRequests: 100, // 100 requests per minute
  message: 'Too many requests, please try again later',
}

/**
 * Strict rate limit for expensive operations
 */
export const STRICT_RATE_LIMIT: RateLimitConfig = {
  windowMs: 60000, // 1 minute
  maxRequests: 20, // 20 requests per minute
  message: 'Rate limit exceeded for this operation',
}

/**
 * Default cache configuration
 */
export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  ttl: 300, // 5 minutes
  staleWhileRevalidate: 60, // Serve stale for 1 minute while revalidating
}

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  // Check various headers for IP address
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback to a default identifier
  return 'unknown'
}

/**
 * Generate cache key from request
 */
function getCacheKey(request: NextRequest): string {
  const url = new URL(request.url)
  const params = Array.from(url.searchParams.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return `${url.pathname}${params ? `?${params}` : ''}`
}

/**
 * Generate ETag from data
 */
function generateETag(data: any): string {
  const str = JSON.stringify(data)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return `"${Math.abs(hash).toString(36)}"`
}

/**
 * Rate limiting middleware
 */
export function withRateLimit(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    const clientIp = getClientIp(request)
    const identifier = `rate-limit:${clientIp}`

    if (!rateLimiter.isAllowed(identifier, config)) {
      const resetTime = rateLimiter.getResetTime(identifier, config)
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)

      const response: ApiResponse<null> = {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED' as ApiErrorCode,
          message: config.message || 'Too many requests',
          details: {
            retryAfter,
            resetTime: new Date(resetTime).toISOString(),
          },
        },
      }

      return NextResponse.json(response, {
        status: 429,
        headers: {
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString(),
          'Retry-After': retryAfter.toString(),
        },
      })
    }

    const remaining = rateLimiter.getRemainingRequests(identifier, config)
    const resetTime = rateLimiter.getResetTime(identifier, config)

    const response = await handler(request, ...args)

    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', resetTime.toString())

    return response
  }
}

/**
 * Caching middleware with ETag support
 */
export function withCache(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  config: CacheConfig = DEFAULT_CACHE_CONFIG
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    // Only cache GET requests
    if (request.method !== 'GET') {
      return handler(request, ...args)
    }

    const cacheKey = getCacheKey(request)
    const cachedEntry = cache.get(cacheKey)

    // Check if client has cached version (ETag)
    const clientETag = request.headers.get('if-none-match')
    if (cachedEntry && clientETag && clientETag === cachedEntry.etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          ETag: cachedEntry.etag,
          'Cache-Control': `public, max-age=${config.ttl}, stale-while-revalidate=${config.staleWhileRevalidate || 0}`,
        },
      })
    }

    // Return cached data if available
    if (cachedEntry) {
      return NextResponse.json(cachedEntry.data, {
        headers: {
          'X-Cache': 'HIT',
          ETag: cachedEntry.etag || '',
          'Cache-Control': `public, max-age=${config.ttl}, stale-while-revalidate=${config.staleWhileRevalidate || 0}`,
        },
      })
    }

    // Execute handler and cache the result
    const response = await handler(request, ...args)

    // Only cache successful responses
    if (response.status === 200) {
      try {
        const data = await response.json()
        const etag = generateETag(data)

        cache.set(cacheKey, data, config.ttl, etag)

        return NextResponse.json(data, {
          headers: {
            'X-Cache': 'MISS',
            ETag: etag,
            'Cache-Control': `public, max-age=${config.ttl}, stale-while-revalidate=${config.staleWhileRevalidate || 0}`,
          },
        })
      } catch (error) {
        // If response is not JSON, return as-is
        return response
      }
    }

    return response
  }
}

/**
 * CORS middleware
 */
export function withCORS(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  allowedOrigins: string[] = ['*']
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    const origin = request.headers.get('origin') || ''

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      const headers = new Headers()

      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        headers.set('Access-Control-Allow-Origin', allowedOrigins.includes('*') ? '*' : origin)
        headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        headers.set('Access-Control-Max-Age', '86400')
      }

      return new NextResponse(null, { status: 204, headers })
    }

    const response = await handler(request, ...args)

    // Add CORS headers to response
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      response.headers.set(
        'Access-Control-Allow-Origin',
        allowedOrigins.includes('*') ? '*' : origin
      )
    }

    return response
  }
}

/**
 * Error handling wrapper
 */
export function withErrorHandling(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    try {
      return await handler(request, ...args)
    } catch (error) {
      // Error logged: API Error:

      const response: ApiResponse<null> = {
        success: false,
        error: {
          code: 'INTERNAL_ERROR' as ApiErrorCode,
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
          details: process.env.NODE_ENV === 'development' ? { error: String(error) } : undefined,
        },
      }

      return NextResponse.json(response, { status: 500 })
    }
  }
}

/**
 * Combine multiple middleware functions
 */
export function compose(...middlewares: Array<(handler: any) => any>) {
  return (handler: any) => {
    const composed = middlewares.reduceRight((acc, middleware) => middleware(acc), handler)
    // Return a function that properly passes all arguments
    return (request: NextRequest, ...args: any[]) => composed(request, ...args)
  }
}

/**
 * Invalidate cache by pattern
 */
export function invalidateCache(pattern?: string) {
  if (!pattern) {
    cache.clear()
  } else {
    // This is a simple implementation - in production, use proper pattern matching
    cache.clear() // For now, clear all cache
  }
}

/**
 * API response helpers
 */
export function successResponse<T>(data: T, meta?: Record<string, any>): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta,
  }
  return NextResponse.json(response)
}

export function errorResponse(
  code: ApiErrorCode,
  message: string,
  status: number = 400,
  details?: Record<string, any>
): NextResponse {
  const response: ApiResponse<null> = {
    success: false,
    error: {
      code,
      message,
      details,
    },
  }
  return NextResponse.json(response, { status })
}

/**
 * Validate query parameters
 */
export function validateQueryParams<T extends Record<string, any>>(
  params: URLSearchParams,
  schema: Record<
    keyof T,
    {
      type: 'string' | 'number' | 'boolean' | 'array'
      required?: boolean
      default?: any
      validate?: (value: any) => boolean
    }
  >
): T {
  const result: any = {}

  for (const [key, config] of Object.entries(schema)) {
    const value = params.get(key)

    if (!value && config.required) {
      throw new Error(`Missing required parameter: ${key}`)
    }

    if (!value && config.default !== undefined) {
      result[key] = config.default
      continue
    }

    if (!value) {
      continue
    }

    let parsed: any = value

    switch (config.type) {
      case 'number':
        parsed = Number(value)
        if (isNaN(parsed)) {
          throw new Error(`Invalid number for parameter: ${key}`)
        }
        break
      case 'boolean':
        parsed = value === 'true'
        break
      case 'array':
        parsed = value.split(',').map((v) => v.trim())
        break
    }

    if (config.validate && !config.validate(parsed)) {
      throw new Error(`Invalid value for parameter: ${key}`)
    }

    result[key] = parsed
  }

  return result as T
}
