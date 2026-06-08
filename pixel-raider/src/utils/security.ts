/**
 * Pixel Raider — Security Utilities
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralized security helpers. All user-facing data must pass through these
 * before rendering or sending to the backend. This is the first line of
 * defense on the client side.
 *
 * Server-side validation is ALWAYS the authoritative layer — these are
 * supplementary client-side guards.
 */

import DOMPurify from 'dompurify'

// ─── DOMPurify Config ─────────────────────────────────────────────────────────
const PURIFY_STRICT: DOMPurify.Config = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'li', 'ol', 'a', 'code', 'pre'],
  ALLOWED_ATTR: ['href', 'class'],
  ALLOW_DATA_ATTR: false,
  FORBID_SCRIPTS: true,
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'style'],
}

/** Sanitize HTML for safe dangerouslySetInnerHTML use. */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, PURIFY_STRICT)
}

/** Strip ALL html — for plain text display. */
export function stripHtml(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
}

// ─── URL Validation ───────────────────────────────────────────────────────────
const ALLOWED_PROTOCOLS = new Set(['https:', 'http:'])
const BLOCKED_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1'])

export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) return false
    if (BLOCKED_HOSTS.has(parsed.hostname)) return false
    if (url.toLowerCase().startsWith('data:')) return false
    return true
  } catch {
    return false
  }
}

/** Always use for user-provided URLs in href attributes. */
export function safeUrl(url: string): string {
  return isSafeUrl(url) ? url : '#'
}

// ─── Input Sanitization ───────────────────────────────────────────────────────
export function sanitizeText(input: string, maxLength = 500): string {
  const escapeMap: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '&': '&amp;',
  }
  return input
    .slice(0, maxLength)
    .trim()
    .replace(/[<>'"&]/g, (char) => escapeMap[char] ?? char)
}

// ─── Client-side Rate Limiter ─────────────────────────────────────────────────
const _rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = _rateLimitStore.get(key)
  if (!entry || now > entry.resetAt) {
    _rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

// ─── Secure Local Storage Wrapper ─────────────────────────────────────────────
export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return fallback
      return JSON.parse(item) as T
    } catch {
      return fallback
    }
  },
  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Quota exceeded or private mode — silent fail
    }
  },
  remove(key: string): void {
    try { localStorage.removeItem(key) } catch { /* silent */ }
  },
}

// ─── CSP Nonce ────────────────────────────────────────────────────────────────
export function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
}
