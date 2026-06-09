export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  return re.test(email) && email.length <= 254
}

export function isValidUrl(url: string): boolean {
  try {
    const p = new URL(url)
    return ['http:', 'https:'].includes(p.protocol)
  } catch {
    return false
  }
}

const _rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(key: string, maxRequests = 5, windowMs = 60_000): boolean {
  const now = Date.now()
  const existing = _rateLimitStore.get(key)
  if (!existing || now > existing.resetAt) {
    _rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (existing.count >= maxRequests) return false
  existing.count++
  return true
}
