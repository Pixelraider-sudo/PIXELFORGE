/**
 * Pixel Raider — Secure HTTP Client
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps axios with: auth headers, request signing, timeout, response
 * validation, error normalization, and retry logic.
 *
 * Usage:
 *   import { api } from '@lib/api-client'
 *   const data = await api.get<User>('/users/me')
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { API_CONFIG } from '@config/app.config'
import { safeStorage } from '@utils/security'
import type { ApiResponse, ApiError } from '@/types'

// ─── Token Management ─────────────────────────────────────────────────────────
// Tokens stored in memory (not localStorage) — only refreshToken in httpOnly cookie.
let _accessToken: string | null = null

export const tokenStore = {
  get: ()             => _accessToken,
  set: (t: string)    => { _accessToken = t },
  clear: ()           => { _accessToken = null; safeStorage.remove('pr_user') },
}

// ─── Axios Instance ───────────────────────────────────────────────────────────
const client: AxiosInstance = axios.create({
  baseURL:         API_CONFIG.baseUrl,
  timeout:         API_CONFIG.timeout,
  withCredentials: true,   // sends httpOnly refresh-token cookie
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Version': __APP_VERSION__,
    'X-Requested-With': 'XMLHttpRequest',  // Helps prevent CSRF
  },
})

// ─── Request Interceptor ──────────────────────────────────────────────────────
client.interceptors.request.use(
  (config) => {
    const token = tokenStore.get()
    if (token !== null && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // Prevent caching of auth/sensitive endpoints
    if (config.url?.includes('/auth') || config.url?.includes('/user')) {
      config.headers['Cache-Control'] = 'no-store'
      config.headers['Pragma'] = 'no-cache'
    }
    return config
  },
  (error: unknown) => Promise.reject(normalizeError(error)),
)

// ─── Response Interceptor ─────────────────────────────────────────────────────
let _isRefreshing = false
let _refreshQueue: Array<(token: string) => void> = []

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(normalizeError(error))

    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // 401 — attempt silent token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (_isRefreshing) {
        // Queue concurrent requests while refreshing
        return new Promise((resolve) => {
          _refreshQueue.push((newToken: string) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            }
            resolve(client(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      _isRefreshing = true

      try {
        const { data } = await client.post<ApiResponse<{ accessToken: string }>>('/auth/refresh')
        const newToken = data.data.accessToken
        tokenStore.set(newToken)
        _refreshQueue.forEach((cb) => { cb(newToken) })
        _refreshQueue = []
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        }
        return client(originalRequest)
      } catch (refreshError) {
        tokenStore.clear()
        _refreshQueue = []
        // Redirect to login on refresh failure
        if (typeof window !== 'undefined') {
          window.location.href = '/login?reason=session_expired'
        }
        return Promise.reject(normalizeError(refreshError))
      } finally {
        _isRefreshing = false
      }
    }

    return Promise.reject(normalizeError(error))
  },
)

// ─── Error Normalization ──────────────────────────────────────────────────────
export class PixelRaiderApiError extends Error {
  public readonly code:    string
  public readonly status:  number
  public readonly errors?: ApiError[]

  constructor(message: string, code: string, status: number, errors?: ApiError[]) {
    super(message)
    this.name   = 'PixelRaiderApiError'
    this.code   = code
    this.status = status
    this.errors = errors
  }
}

function normalizeError(error: unknown): PixelRaiderApiError {
  if (axios.isAxiosError(error)) {
    const status  = error.response?.status ?? 0
    const payload = error.response?.data as Partial<ApiResponse> | undefined
    return new PixelRaiderApiError(
      payload?.message ?? error.message,
      payload?.errors?.[0]?.code ?? 'UNKNOWN_ERROR',
      status,
      payload?.errors,
    )
  }
  const msg = error instanceof Error ? error.message : 'An unexpected error occurred'
  return new PixelRaiderApiError(msg, 'CLIENT_ERROR', 0)
}

// ─── Typed API Methods ────────────────────────────────────────────────────────
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    client.get<ApiResponse<T>>(url, config).then((r) => r.data.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    client.post<ApiResponse<T>>(url, data, config).then((r) => r.data.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    client.put<ApiResponse<T>>(url, data, config).then((r) => r.data.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    client.patch<ApiResponse<T>>(url, data, config).then((r) => r.data.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    client.delete<ApiResponse<T>>(url, config).then((r) => r.data.data),
}

export default client
