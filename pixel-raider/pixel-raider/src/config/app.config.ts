/**
 * PIXEL RAIDER — App Configuration
 * Central config consumed throughout the app.
 * All env vars are validated here — fail fast on startup.
 */

const requiredEnvVars = [] as const // Add required vars here as app grows

function validateEnv(): void {
  const missing = requiredEnvVars.filter((key) => !import.meta.env[key])
  if (missing.length > 0) {
    throw new Error(`[PixelRaider] Missing environment variables: ${missing.join(', ')}`)
  }
}

validateEnv()

export const appConfig = {
  name: import.meta.env.VITE_APP_NAME ?? 'Pixel Raider',
  version: import.meta.env.VITE_APP_VERSION ?? '1.0.0',
  env: import.meta.env.VITE_APP_ENV ?? 'development',
  url: import.meta.env.VITE_APP_URL ?? 'http://localhost:5173',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  
  // Phase 1: Static content endpoints (expand in later phases)
  contact: {
    email: 'hello@pixelraider.dev',
    github: 'https://github.com/pixelraider',
    twitter: 'https://twitter.com/pixelraider',
  },

  // Navigation structure (Phase 1 — expand per roadmap)
  nav: {
    main: [
      { label: 'Home', path: '/', external: false },
      { label: 'About', path: '/about', external: false },
      { label: 'Projects', path: '/projects', external: false },
      { label: 'Labs', path: '/labs', external: false },
      { label: 'Blog', path: '/blog', external: false },
      { label: 'Community', path: '/community', external: false },
      { label: 'Contact', path: '/contact', external: false },
    ],
    ecosystem: [
      { label: 'AI', path: '/ai', badge: 'Coming Soon' },
      { label: 'Security', path: '/security', badge: 'Coming Soon' },
      { label: 'Garage', path: '/garage', badge: 'Coming Soon' },
      { label: 'Marketplace', path: '/marketplace', badge: 'Coming Soon' },
    ],
  },
} as const

export type AppConfig = typeof appConfig
