/**
 * Pixel Raider — Secure HTTP Client
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

import { safeStorage } from '@utils/security'

/* ─────────────────────────────────────────────────────────────
   FIX: Local API config (no AppConfig dependency)
───────────────────────────────────────────────────────────── */
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  timeout: 15000,
}

/* ─────────────────────────────────────────────────────────────
   FIX: App version (Vite replacement for __APP_VERSION__)
───────────────────────────────────────────────────────────── */
const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? import.meta.env.MODE ?? '1.0.0'

/* ─────────────────────────────────────────────────────────────
   FIX: Local safe types (prevents missing '@/types' errors)
───────────────────────────────────────────────────────────── */
export type ApiError = {
  code: string
  message?: string
}

export type ApiResponse<T> = {
  data: T
  message?: string
  errors?: ApiError[]
}

/* ─────────────────────────────────────────────────────────────
   Token storage
───────────────────────────────────────────────────────────── */
let _accessToken: string | null = null

export const tokenStore = {
  get: () => _accessToken,
  set: (t: string) => (_accessToken = t),
  clear: () => {
    _accessToken = null
    safeStorage.remove('pr_user')
  },
}

/* ─────────────────────────────────────────────────────────────
   Axios client
───────────────────────────────────────────────────────────── */
const client: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Version': APP_VERSION,
    'X-Requested-With': 'XMLHttpRequest',
  },
})

/* ─────────────────────────────────────────────────────────────
   Request interceptor
───────────────────────────────────────────────────────────── */
client.interceptors.request.use(
  (config) => {
    const token = tokenStore.get()

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.url?.includes('/auth') || config.url?.includes('/user')) {
      config.headers = config.headers ?? {}
      config.headers['Cache-Control'] = 'no-store'
      config.headers['Pragma'] = 'no-cache'
    }

    return config
  },
  (error) => Promise.reject(normalizeError(error))
)

/* ─────────────────────────────────────────────────────────────
   Response interceptor (refresh logic)
───────────────────────────────────────────────────────────── */
let _isRefreshing = false
let _refreshQueue: Array<(token: string) => void> = []

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(normalizeError(error))
    }

    const originalRequest: any = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (_isRefreshing) {
        return new Promise((resolve) => {
          _refreshQueue.push((newToken: string) => {
            originalRequest.headers = originalRequest.headers ?? {}
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            resolve(client(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      _isRefreshing = true

      try {
        const { data } =
          await client.post<ApiResponse<{ accessToken: string }>>('/auth/refresh')

        const newToken = data.data.accessToken
        tokenStore.set(newToken)

        _refreshQueue.forEach((cb) => cb(newToken))
        _refreshQueue = []

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return client(originalRequest)
      } catch (refreshError) {
        tokenStore.clear()
        _refreshQueue = []

        if (typeof window !== 'undefined') {
          window.location.href = '/login?reason=session_expired'
        }

        return Promise.reject(normalizeError(refreshError))
      } finally {
        _isRefreshing = false
      }
    }

    return Promise.reject(normalizeError(error))
  }
)

/* ─────────────────────────────────────────────────────────────
   Error class (FIXED constructor order)
───────────────────────────────────────────────────────────── */
export class PixelRaiderApiError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: string,
    public readonly status: number,
    public readonly errors?: ApiError[]
  ) {
    super(message)
    this.name = 'PixelRaiderApiError'
  }
}

/* ─────────────────────────────────────────────────────────────
   Error normalizer (FIXED payload typing + safe errors)
───────────────────────────────────────────────────────────── */
function normalizeError(error: unknown): PixelRaiderApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0
    const payload = error.response?.data as ApiResponse<unknown> | undefined

    const message = payload?.message ?? error.message ?? 'Request failed'

    const code = payload?.errors?.[0]?.code ?? 'UNKNOWN_ERROR'

    const errors = payload?.errors ?? []

    return new PixelRaiderApiError(message, code, status, errors)
  }

  const msg = error instanceof Error ? error.message : 'An unexpected error occurred'

  return new PixelRaiderApiError(msg, 'CLIENT_ERROR', 0, [])
}

/* ─────────────────────────────────────────────────────────────
   API wrapper
───────────────────────────────────────────────────────────── */
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
