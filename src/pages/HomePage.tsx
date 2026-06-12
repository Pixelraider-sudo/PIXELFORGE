import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HeroSection } from '@/components/sections/HeroSection'
import { EcosystemSection } from '@/components/sections/EcosystemSection'
import { TechSection } from '@/components/sections/TechSection'
import { RoadmapSection } from '@/components/sections/RoadmapSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { setPageMeta } from '@/utils/seo'

// ── Social proof strip between hero and ecosystem ──
function TrustStrip() {
  const items = [
    { label: 'Deployed on', value: 'Vercel Edge' },
    { label: 'Built with', value: 'React 18 + TypeScript' },
    { label: 'Secured by', value: 'CSP + HSTS' },
    { label: 'Version', value: 'v2.0.0 Phase 2' },
    { label: 'CI Status', value: 'Passing' },
  ]
  return (
    <div
      className="border-y border-white/[0.06] bg-pr-bg2 overflow-hidden py-4"
      aria-label="Platform info"
    >
      <div className="flex items-center gap-10 whitespace-nowrap animate-[marquee_20s_linear_infinite] w-max">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-1 h-1 rounded-full bg-cyan flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-xs font-mono text-pr-text3">{item.label}:</span>
            <span className="text-xs font-mono text-cyan">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Stats section ──
function StatsSection() {
  const stats = [
    {
      n: '50K+',
      label: 'Lines of Code',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      n: '9',
      label: 'Ecosystem Divisions',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
    },
    {
      n: '12+',
      label: 'Planned Products',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      ),
    },
    {
      n: '5yr',
      label: 'Long-term Vision',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ]

  return (
    <section className="section-sm bg-pr-bg border-y border-white/[0.05] overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 text-center hover:border-cyan/25 hover:bg-cyan/[0.03] transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/15 to-violet/15 border border-cyan/10 flex items-center justify-center text-cyan mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(0,200,232,0.2)] transition-all">
                {s.icon}
              </div>
              <div className="font-display font-black text-3xl bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent mb-1">
                {s.n}
              </div>
              <div className="text-xs text-pr-text3 font-mono uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA banner before contact ──
function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan/[0.05] via-transparent to-violet/[0.05]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-[0.06] bg-cyan pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 text-xs font-mono font-semibold text-cyan tracking-widest uppercase mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"
              aria-hidden="true"
            />
            Phase 2 Active — Join the Build
          </div>

          <h2 className="font-display font-black text-4xl md:text-6xl mb-6 leading-tight text-pr-text">
            Ready to{' '}
            <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
              build
            </span>
            ?
          </h2>

          <p className="text-lg text-pr-text2 max-w-xl mx-auto mb-10 leading-relaxed">
            Follow the journey as Pixel Raider grows from a brand into a full technology
            ecosystem — one phase at a time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/ecosystem"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-violet text-black font-bold shadow-[0_0_24px_rgba(0,200,232,0.3)] hover:shadow-[0_0_40px_rgba(0,200,232,0.5)] hover:scale-[1.02] transition-all"
            >
              Explore All Divisions
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-pr-text font-semibold hover:border-cyan/25 hover:bg-white/[0.08] transition-all"
            >
              Read the Build Log
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Contact strip ──
function ContactStrip() {
  return (
    <section
      id="contact"
      className="section border-t border-white/[0.06]"
      style={{ background: 'var(--bg2)' }}
    >
      <div className="container max-w-2xl mx-auto">
        <ContactSection />
      </div>
    </section>
  )
}

// ── Main HomePage ──
export function HomePage() {
  useEffect(() => {
    setPageMeta({
      title: 'Pixel Raider',
      description:
        'Build Beyond Limits. A scalable technology ecosystem for developers, creators, and innovators.',
      keywords: 'Pixel Raider, AI, Development, Technology, Ecosystem, React, TypeScript',
    })
  }, [])

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <EcosystemSection />
      <StatsSection />
      <TechSection />
      <ProjectsSection />
      <RoadmapSection />
      <CTABanner />
      <ContactStrip />
    </>
  )
}
