/**
 * Pixel Raider — Security Utilities
 * ─────────────────────────────────────────────────────────────────────────────
 * Client-side sanitization + validation helpers
 */

import DOMPurify from 'dompurify'
import type { Config } from 'dompurify'

// ─────────────────────────────────────────────────────────────
// DOMPurify Config (FIXED: only valid DOMPurify options)
// ─────────────────────────────────────────────────────────────
const PURIFY_STRICT: Config = {
  ALLOWED_TAGS: [
    'b',
    'i',
    'em',
    'strong',
    'p',
    'br',
    'ul',
    'li',
    'ol',
    'a',
    'code',
    'pre',
    'span',
  ],
  ALLOWED_ATTR: ['href', 'class', 'target', 'rel'],
  ALLOW_DATA_ATTR: false,
}

// ─────────────────────────────────────────────────────────────
// HTML Sanitization
// ─────────────────────────────────────────────────────────────

/** Sanitize HTML for dangerouslySetInnerHTML */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, PURIFY_STRICT)
}

/** Strip ALL HTML → plain text output */
export function stripHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })
}

// ─────────────────────────────────────────────────────────────
// URL Validation
// ─────────────────────────────────────────────────────────────
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

/** Safe href fallback */
export function safeUrl(url: string): string {
  return isSafeUrl(url) ? url : '#'
}

// ─────────────────────────────────────────────────────────────
// Text Sanitization (escape + truncate)
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Client-side Rate Limiter
// ─────────────────────────────────────────────────────────────
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}

// ─────────────────────────────────────────────────────────────
// Secure Local Storage Wrapper
// ─────────────────────────────────────────────────────────────
export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key)
      if (!item) return fallback
      return JSON.parse(item) as T
    } catch {
      return fallback
    }
  },

  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore quota / private mode errors
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      // silent fail
    }
  },
}

// ─────────────────────────────────────────────────────────────
// CSP Nonce Generator
// ─────────────────────────────────────────────────────────────
export function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)

  return btoa(String.fromCharCode(...array))
}
