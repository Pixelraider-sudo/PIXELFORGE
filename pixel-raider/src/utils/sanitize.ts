// src/utils/sanitize.ts

// -----------------------------
// STRING SANITIZATION
// -----------------------------
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return ''

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// -----------------------------
// EMAIL VALIDATION
// -----------------------------
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false

  return (
    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email) &&
    email.length <= 254
  )
}

// -----------------------------
// URL VALIDATION
// -----------------------------
export function isValidUrl(url: string): boolean {
  if (typeof url !== 'string') return false

  try {
    const p = new URL(url)
    return ['http:', 'https:'].includes(p.protocol)
  } catch {
    return false
  }
}

// -----------------------------
// RATE LIMIT (SAFE VERSION)
// -----------------------------
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  if (typeof window === 'undefined') {
    // prevents crashes during SSR / testing
    return true
  }

  try {
    const now = Date.now()

    const stored = localStorage.getItem(key)

    let timestamps: number[] = []

    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          timestamps = parsed.filter((n) => typeof n === 'number')
        }
      } catch {
        // corrupted localStorage → reset safely
        timestamps = []
      }
    }

    // keep only timestamps inside window
    timestamps = timestamps.filter((time) => now - time < windowMs)

    if (timestamps.length >= limit) {
      return false
    }

    timestamps.push(now)

    localStorage.setItem(key, JSON.stringify(timestamps))

    return true
  } catch {
    // if localStorage fails (privacy mode, blocked storage, etc.)
    return true
  }
}