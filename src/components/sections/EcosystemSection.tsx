import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { DIVISIONS } from '@/constants'
import { Badge } from '@/components/ui/Badge'
import { DivisionIcon } from '@/components/ui/DivisionIcon'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// Quick stat shown in the hover preview per division
const DIVISION_STATS: Record<string, { label: string; value: string }> = {
  ai: { label: 'Tools planned', value: '8' },
  labs: { label: 'Experiments', value: '6' },
  security: { label: 'Hardening layers', value: '10' },
  cloud: { label: 'Regions (target)', value: '3' },
  mobile: { label: 'Platforms', value: '2' },
  community: { label: 'Launch phase', value: '8' },
  garage: { label: 'Concepts', value: '4' },
  marketplace: { label: 'Categories', value: '5' },
  media: { label: 'Channels', value: '4' },
}

// Each division gets its own accent color — used for icon glow and corner tint on hover
const DIVISION_COLORS: Record<string, string> = {
  ai: '#00C8E8',
  labs: '#6E54F7',
  security: '#10D17A',
  cloud: '#00C8E8',
  mobile: '#F5A623',
  community: '#EC4899',
  garage: '#F5A623',
  marketplace: '#6E54F7',
  media: '#00C8E8',
}

export function EcosystemSection() {
  const { ref, isVisible } = useScrollReveal()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="ecosystem" className="section relative overflow-hidden bg-pr-bg" aria-label="Ecosystem divisions">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-[160px] opacity-[0.04] bg-cyan pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10">

        {/* Heading — layout preserved */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-cyan font-mono mb-4">
            <span className="w-8 h-px bg-cyan" aria-hidden="true" />
            The Ecosystem
            <span className="w-8 h-px bg-cyan" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-pr-text">
            Nine Divisions.<br />
            <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">One Mission.</span>
          </h2>
          <p className="text-pr-text2 max-w-xl mx-auto text-lg">
            Every division is designed to scale independently while feeding the greater Pixel Raider ecosystem.
          </p>
        </div>

        {/* Grid — hover previews added */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Ecosystem divisions">
          {DIVISIONS.map((div, i) => {
            const stat = DIVISION_STATS[div.id]
            const isHovered = hovered === div.id
            const accent = DIVISION_COLORS[div.id] ?? '#00C8E8'

            return (
              <div
                key={div.id}
                role="listitem"
                className="transition-all duration-700"
                style={{ transitionDelay: `${i * 60}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'none' : 'translateY(24px)' }}
              >
                <Link
                  to={div.href}
                  onMouseEnter={() => setHovered(div.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(div.id)}
                  onBlur={() => setHovered(null)}
                  className="group relative flex flex-col h-full rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.05]"
                  style={{
                    borderColor: isHovered ? `${accent}4D` : undefined,
                    boxShadow: isHovered ? `0 12px 48px ${accent}1F` : undefined,
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    {/* SVG icon — scales up slightly on hover */}
                    <motion.div
                      animate={{ scale: isHovered ? 1.08 : 1 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="w-11 h-11 rounded-xl border flex items-center justify-center transition-shadow"
                      style={{
                        background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
                        borderColor: `${accent}26`,
                        color: accent,
                        boxShadow: isHovered ? `0 0 24px ${accent}40` : 'none',
                      }}
                    >
                      <DivisionIcon id={div.id} size={20} />
                    </motion.div>
                    <Badge variant={div.status as 'active' | 'building' | 'planned'}>
                      <span className={`w-1 h-1 rounded-full ${div.status === 'active' ? 'bg-emerald-400' : div.status === 'building' ? 'bg-amber-400' : 'bg-white/30'}`} aria-hidden="true" />
                      {div.status === 'active' ? 'Active' : div.status === 'building' ? 'Building' : 'Planned'}
                    </Badge>
                  </div>

                  <h3
                    className="font-semibold text-base text-pr-text mb-2 transition-colors"
                    style={{ color: isHovered ? accent : undefined }}
                  >
                    {div.name}
                  </h3>
                  <p className="text-sm text-pr-text2 leading-relaxed flex-1 mb-5">{div.description}</p>

                  {/* Footer — morphs between "Explore" and stat preview on hover */}
                  <div className="pt-4 border-t border-white/[0.05] min-h-[28px] flex items-center">
                    <AnimatePresence mode="wait" initial={false}>
                      {isHovered && stat ? (
                        <motion.div
                          key="stat"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="flex items-center justify-between w-full"
                        >
                          <span className="text-xs text-pr-text3 font-mono uppercase tracking-wider">{stat.label}</span>
                          <span className="font-display font-bold text-lg" style={{ color: accent }}>{stat.value}</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="explore"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="inline-flex items-center gap-1.5 text-xs font-mono group-hover:gap-3 transition-all duration-200"
                          style={{ color: accent }}
                        >
                          Explore
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                          </svg>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Subtle corner glow on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${accent}26, transparent 70%)` }}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}