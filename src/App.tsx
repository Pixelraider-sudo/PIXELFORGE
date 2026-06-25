import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { ThemeProvider } from '@/context/ThemeContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgressBar } from '@/components/ui/ScrollprogressBar'

import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { BlogPage } from '@/pages/BlogPage'
import { EcosystemPage } from '@/pages/EcosystemPage'
import { ContactPage } from '@/pages/ContactPage'
import { SecurityPage } from '@/pages/SecurityPage'
import { LabsPage } from '@/pages/LabsPage'
import { PricingPage } from '@/pages/PricingPage'
import { FeaturesPage } from '@/pages/FeaturesPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import '@/styles/globals.css'

function LoadingFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] animate-pulse"
          aria-hidden="true"
        />
        <span className="font-mono text-xs text-[var(--text3)] tracking-widest uppercase">
          Loading...
        </span>
      </div>
    </div>
  )
}

/**
 * Separate component so useLocation() can run inside BrowserRouter
 * and provide a unique `key` to AnimatePresence for exit animations.
 */
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    fetch('http://localhost:4000/health')
      .then((res) => res.json())
      .then((data) => {
        console.log('Backend response:', data)
      })
      .catch((err) => {
        console.error('❌ Connection failed:', err)
      })
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Scroll progress bar — always visible at very top of viewport */}
        <ScrollProgressBar />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-[var(--cyan)] text-black px-4 py-2 rounded-lg font-medium text-sm"
        >
          Skip to main content
        </a>

        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}