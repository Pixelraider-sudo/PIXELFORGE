import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security Headers — enforced at the edge
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Stop clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Force HTTPS for 2 years, include subdomains
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Disable browser-side XSS filter (CSP handles it now)
          { key: "X-XSS-Protection", value: "0" },
          // Control referrer info
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires these; tighten in production
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // Performance
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 86400,
  },

  // Build
  poweredByHeader: false, // Remove "X-Powered-By: Next.js"
  compress: true,
  reactStrictMode: true,

  // Experimental
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
