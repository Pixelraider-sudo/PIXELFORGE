export function sanitizeString(input: string): string {
  return input.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;').replace(/\//g,'&#x2F;')
}
export function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email) && email.length <= 254
}
export function isValidUrl(url: string): boolean {
  try { const p = new URL(url); return ['http:','https:'].includes(p.protocol) } catch { return false }
}
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now()

  const stored = localStorage.getItem(key)

  let timestamps: number[] = stored ? JSON.parse(stored) : []

  // Keep only timestamps inside the current window
  timestamps = timestamps.filter(
    (time) => now - time < windowMs
  )

  if (timestamps.length >= limit) {
    return false
  }

  timestamps.push(now)

  localStorage.setItem(key, JSON.stringify(timestamps))

  return true
}