/**
 * Custom logging utility with different log levels and structured logging
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogContext {
  userId?: string
  sessionId?: string
  requestId?: string
  action?: string
  duration?: number
  operation?: string
  metadata?: Record<string, unknown>
}

class Logger {
  private static instance: Logger
  private logLevel: LogLevel
  private isProduction: boolean

  private constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'
    this.logLevel = this.isProduction ? LogLevel.INFO : LogLevel.DEBUG
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  /**
   * Set the minimum log level
   */
  public setLogLevel(level: LogLevel): void {
    this.logLevel = level
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? JSON.stringify(context) : ''
    return `[${timestamp}] [${level}] ${message} ${contextStr}`
  }

  /**
   * Send logs to external service in production
   */
  private async sendToLogService(
    level: string,
    message: string,
    context?: LogContext,
    error?: Error
  ): Promise<void> {
    if (!this.isProduction) {
      return
    }

    try {
      // In production, send to log aggregation service
      const logData = {
        timestamp: new Date().toISOString(),
        level,
        message,
        context,
        error: error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : undefined,
        environment: process.env.NODE_ENV,
        app: 'next-trip-anywhere',
      }

      // Send to logging endpoint (e.g., Datadog, LogRocket, etc.)
      if (process.env.NEXT_PUBLIC_LOG_ENDPOINT) {
        fetch(process.env.NEXT_PUBLIC_LOG_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logData),
        }).catch(() => {
          // Fail silently to avoid disrupting the app
        })
      }
    } catch {
      // Fail silently
    }
  }

  /**
   * Debug level logging
   */
  public debug(message: string, context?: LogContext): void {
    if (this.logLevel > LogLevel.DEBUG) {
      return
    }

    const formatted = this.formatMessage('DEBUG', message, context)
    console.info(formatted)
  }

  /**
   * Info level logging
   */
  public info(message: string, context?: LogContext): void {
    if (this.logLevel > LogLevel.INFO) {
      return
    }

    const formatted = this.formatMessage('INFO', message, context)
    console.info(formatted)
    this.sendToLogService('INFO', message, context)
  }

  /**
   * Warning level logging
   */
  public warn(message: string, context?: LogContext): void {
    if (this.logLevel > LogLevel.WARN) {
      return
    }

    const formatted = this.formatMessage('WARN', message, context)
    console.warn(formatted)
    this.sendToLogService('WARN', message, context)
  }

  /**
   * Error level logging
   */
  public error(message: string, error?: Error, context?: LogContext): void {
    if (this.logLevel > LogLevel.ERROR) {
      return
    }

    const formatted = this.formatMessage('ERROR', message, context)
    console.error(formatted, error)
    this.sendToLogService('ERROR', message, context, error)
  }

  /**
   * Fatal level logging
   */
  public fatal(message: string, error?: Error, context?: LogContext): void {
    const formatted = this.formatMessage('FATAL', message, context)
    console.error(formatted, error)
    this.sendToLogService('FATAL', message, context, error)

    // In production, you might want to trigger alerts
    if (this.isProduction && process.env.NEXT_PUBLIC_ALERT_WEBHOOK) {
      fetch(process.env.NEXT_PUBLIC_ALERT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: 'FATAL',
          message,
          error: error?.message,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {})
    }
  }

  /**
   * Performance logging
   */
  public performance(operation: string, duration: number, context?: LogContext): void {
    const message = `Performance: ${operation} took ${duration}ms`

    if (duration > 1000) {
      this.warn(message, { ...context, duration, operation })
    } else {
      this.debug(message, { ...context, duration, operation })
    }
  }

  /**
   * Audit logging for important actions
   */
  public audit(action: string, userId: string, details?: Record<string, unknown>): void {
    const context: LogContext = {
      userId,
      action,
      metadata: details,
    }

    this.info(`Audit: ${action}`, context)

    // Store audit logs separately in production
    if (this.isProduction && process.env.NEXT_PUBLIC_AUDIT_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_AUDIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          action,
          userId,
          details,
        }),
      }).catch(() => {})
    }
  }
}

// Export singleton instance
export const logger = Logger.getInstance()

// Performance monitoring helper
export function measurePerformance<T>(
  operation: string,
  fn: () => T | Promise<T>,
  context?: LogContext
): T | Promise<T> {
  const start = performance.now()

  try {
    const result = fn()

    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = performance.now() - start
        logger.performance(operation, duration, context)
      })
    }

    const duration = performance.now() - start
    logger.performance(operation, duration, context)
    return result
  } catch (error) {
    const duration = performance.now() - start
    logger.error(`${operation} failed after ${duration}ms`, error as Error, context)
    throw error
  }
}

// Request ID generator for tracing
export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
