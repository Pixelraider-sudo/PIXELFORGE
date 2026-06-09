// ============================================================
//  Pixel Raider — Root Layout
//  Security-hardened metadata, font loading, theme provider
// ============================================================

import type { Metadata, Viewport } from "next";
import { Orbitron, Syne, JetBrains_Mono } from "next/font/google";
import { APP } from "@/constants";
import "@/styles/globals.css";

// ── Font Loading (self-hosted via next/font, no external requests) ──────────
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

// ── SEO & Social Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(`https://${APP.DOMAIN}`),
  title: {
    default: `${APP.NAME} — ${APP.TAGLINE}`,
    template: `%s | ${APP.NAME}`,
  },
  description:
    "Pixel Raider is a scalable technology ecosystem spanning AI, mobile, cloud, security, and developer tools. Built to last. Built to scale.",
  keywords: [
    "Pixel Raider", "technology ecosystem", "AI tools", "developer platform",
    "cyberpunk tech", "full stack development", "mobile apps", "cloud infrastructure",
  ],
  authors: [{ name: "Pixel Raider", url: `https://${APP.DOMAIN}` }],
  creator: "Pixel Raider",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${APP.DOMAIN}`,
    siteName: APP.NAME,
    title: `${APP.NAME} — ${APP.TAGLINE}`,
    description: "A scalable technology ecosystem. Built beyond limits.",
    images: [{ url: "/og/cover.png", width: 1200, height: 630, alt: "Pixel Raider" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP.NAME} — ${APP.TAGLINE}`,
    description: "A scalable technology ecosystem. Built beyond limits.",
    images: ["/og/cover.png"],
    creator: "@pixelraider",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/icons/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/assets/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#050810" },
    { media: "(prefers-color-scheme: light)", color: "#050810" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to font origins (already handled by next/font, belt-and-suspenders) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-pr-dark text-pr-text antialiased font-body overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
