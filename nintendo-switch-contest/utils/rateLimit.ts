import { VercelRequest, VercelResponse } from '@vercel/node'

// Simple in-memory rate limiting (in production, use Redis or similar)
const requests = new Map<string, { count: number; resetTime: number }>()

interface RateLimitOptions {
  windowMs: number  // Time window in milliseconds
  maxRequests: number  // Max requests per window
}

export function rateLimit(options: RateLimitOptions) {
  return (req: VercelRequest, res: VercelResponse, next: () => void) => {
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
    const key = `${clientIp}`
    const now = Date.now()
    
    // Cleanup old entries
    for (const [k, v] of requests.entries()) {
      if (now > v.resetTime) {
        requests.delete(k)
      }
    }
    
    const current = requests.get(key)
    
    if (!current) {
      // First request from this IP
      requests.set(key, {
        count: 1,
        resetTime: now + options.windowMs
      })
      return next()
    }
    
    if (now > current.resetTime) {
      // Window has reset
      requests.set(key, {
        count: 1,
        resetTime: now + options.windowMs
      })
      return next()
    }
    
    if (current.count >= options.maxRequests) {
      // Rate limit exceeded
      return res.status(429).json({ 
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil((current.resetTime - now) / 1000)
      })
    }
    
    // Increment counter
    current.count++
    next()
  }
}

// Predefined rate limits
export const paymentRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // max 5 payment attempts per 15 minutes
})

export const webhookRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100 // max 100 webhook calls per minute
})

export const statusRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30 // max 30 status checks per minute
})
