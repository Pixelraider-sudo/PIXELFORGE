import React from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { TECH_STACK } from '@/constants'

const CAT_ICONS: Record<string, React.ReactElement> = {
  frontend: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  backend: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  databases: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  mobile: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  cloud: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  ai: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
    </svg>
  ),
}

const CAT_COLORS: Record<string, string> = {
  frontend: '#00C8E8',
  backend: '#6E54F7',
  databases: '#10D17A',
  mobile: '#F5A623',
  cloud: '#00C8E8',
  ai: '#A78BFA',
}

export function TechSection() {
  const { ref, isVisible } = useScrollReveal()
  const entries = Object.entries(TECH_STACK) as [string, readonly string[]][]

  return (
    <section
      className="section-sm relative overflow-hidden border-y border-white/[0.05]"
      style={{ background: 'var(--bg2)' }}
      aria-label="Technology stack"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 bg-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-cyan font-mono mb-4">
            <span className="w-8 h-px bg-cyan" aria-hidden="true" />
            Tech Stack
            <span className="w-8 h-px bg-cyan" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-pr-text mb-3">
            Built with{' '}
            <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
              precision.
            </span>
          </h2>
          <p className="text-pr-text2 max-w-lg mx-auto text-sm leading-relaxed">
            Every technology chosen intentionally — for performance, scalability, and
            developer experience.
          </p>
        </div>

        {/* Stack grid */}
        <div className="space-y-7">
          {entries.map(([cat, techs], i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              {/* Category row */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{
                    color: CAT_COLORS[cat] ?? '#00C8E8',
                    background: `${CAT_COLORS[cat] ?? '#00C8E8'}15`,
                  }}
                  aria-hidden="true"
                >
                  {CAT_ICONS[cat]}
                </div>
                <span className="text-xs font-mono font-semibold tracking-[0.15em] uppercase text-pr-text3 min-w-[80px]">
                  {cat}
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" aria-hidden="true" />
              </div>

              {/* Chips */}
              <div
                className="flex flex-wrap gap-2 pl-9"
                role="list"
                aria-label={`${cat} technologies`}
              >
                {techs.map((tech, ti) => (
                  <motion.span
                    key={tech}
                    role="listitem"
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 + ti * 0.025 }}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-pr-text2 font-mono cursor-default transition-all duration-150 hover:text-cyan hover:border-cyan/25 hover:bg-cyan/[0.06]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-pr-text3 font-mono mt-10"
        >
          Stack grows with each phase — more technologies added as we scale.
        </motion.p>
      </div>
    </section>
  )
}
