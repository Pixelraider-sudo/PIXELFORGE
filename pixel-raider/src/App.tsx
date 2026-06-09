import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider } from '@/context/ThemeContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { BlogPage } from '@/pages/BlogPage'
import { EcosystemPage } from '@/pages/EcosystemPage'
import { ContactPage } from '@/pages/ContactPage'
import { SecurityPage } from '@/pages/SecurityPage'
import { LabsPage } from '@/pages/LabsPage'
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

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-[var(--cyan)] text-black px-4 py-2 rounded-lg font-medium text-sm"
        >
          Skip to main content
        </a>

        <Suspense fallback={<LoadingFallback />}>
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/ecosystem" element={<EcosystemPage />} />
            <Route path="/labs" element={<LabsPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
