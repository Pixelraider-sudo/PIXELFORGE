import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      // Gzip + Brotli for production
      compression({ algorithm: 'gzip', ext: '.gz' }),
      compression({ algorithm: 'brotliCompress', ext: '.br' }),
    ],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@constants': resolve(__dirname, 'src/constants'),
        '@types': resolve(__dirname, 'src/types'),
        '@lib': resolve(__dirname, 'src/lib'),
        '@context': resolve(__dirname, 'src/context'),
        '@config': resolve(__dirname, 'src/config'),
      },
    },

    build: {
      // Chunk splitting for optimal caching
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
      // Security: source maps only in dev
      sourcemap: mode === 'development',
      // Minify for production
      minify: 'esbuild',
      target: 'es2020',
      // Increase chunk warning limit
      chunkSizeWarningLimit: 1000,
    },

    server: {
      port: 5173,
      strictPort: true,
      // Security headers in dev
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },

    preview: {
      port: 4173,
      strictPort: true,
    },

    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  }
})
