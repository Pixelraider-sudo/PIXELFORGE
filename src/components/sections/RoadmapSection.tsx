import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ROADMAP_PHASES } from '@/constants'

const PHASE_IMAGES: Record<number, string> = {
  // Phase 1 — Brand & Foundation (landing page, design)
  1: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&q=80&auto=format&fit=crop',
  // Phase 2 — React Components & Routing (code/UI)
  2: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80&auto=format&fit=crop',
  // Phase 3 — Backend & APIs (server infrastructure)
  3: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80&auto=format&fit=crop',
  // Phase 4 — Dashboard, User Accounts, Analytics
  4: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80&auto=format&fit=crop',
  // Phase 5 — AI Integration (neural network / AI)
  5: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=80&auto=format&fit=crop',
  // Phase 6 — Mobile Apps (Android/iOS devices)
  6: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80&auto=format&fit=crop',
  // Phase 7 — Cloud & DevOps (data center / infrastructure)
  7: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80&auto=format&fit=crop',
  // Phase 8 — Community & Marketplace (people / collaboration)
  8: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80&auto=format&fit=crop',
  // Phase 9 — Enterprise & Global Expansion (city / scale)
  9: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80&auto=format&fit=crop',
}

export function RoadmapSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="roadmap" className="section relative overflow-hidden" aria-label="Development roadmap">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04] bg-violet pointer-events-none translate-x-1/2" aria-hidden="true" />

      <div className="container relative z-10">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-cyan font-mono mb-4">
            <span className="w-8 h-px bg-cyan" aria-hidden="true" />
            Development Phases
            <span className="w-8 h-px bg-cyan" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-pr-text">
            The{' '}
            <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">Roadmap.</span>
          </h2>
          <p className="text-pr-text2 max-w-xl mx-auto">
            9 phases. Each one building on the last. We plan, ship, document, and expand.
          </p>
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div
            className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #00C8E8, #6E54F7 70%, transparent)' }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {ROADMAP_PHASES.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="relative flex flex-col md:flex-row gap-8 items-start md:items-center"
                aria-label={`Phase ${phase.phase}: ${phase.title}`}
              >
                {/* Phase dot */}
                <div
                  className={`absolute left-0 md:left-1/2 w-11 h-11 md:-translate-x-1/2 rounded-xl flex items-center justify-center font-display font-bold text-sm z-10 border transition-all ${phase.status === 'active'
                    ? 'bg-cyan border-cyan text-black shadow-[0_0_20px_rgba(0,200,232,0.5)]'
                    : phase.status === 'building'
                      ? 'bg-violet/20 border-violet text-violet'
                      : 'bg-pr-surface border-white/10 text-pr-text3'
                    }`}
                  aria-hidden="true"
                >
                  {phase.phase}
                </div>

                {/* Content — alternating sides on desktop */}
                <div
                  className={`ml-16 md:ml-0 w-full md:w-[calc(50%-40px)] ${i % 2 === 0 ? 'md:pr-16 md:text-right md:ml-auto' : 'md:ml-16'
                    }`}
                >
                  <div className={`rounded-xl border p-5 transition-all duration-300 group hover:border-cyan/20 ${phase.status === 'active'
                    ? 'border-cyan/30 bg-cyan/[0.04] shadow-[0_0_24px_rgba(0,200,232,0.06)]'
                    : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]'
                    }`}>

                    {/* Image for active/early phases */}
                    {PHASE_IMAGES[phase.phase] && (
                      <div className={`w-full h-24 rounded-lg overflow-hidden mb-4 ${i % 2 === 0 ? 'md:order-last' : ''}`}>
                        <img
                          src={PHASE_IMAGES[phase.phase]}
                          alt={`Phase ${phase.phase} — ${phase.title}`}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className={`flex items-center gap-2 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="font-mono text-xs text-pr-text3">Phase {phase.phase}</span>
                      <Badge variant={phase.status === 'active' ? 'active' : phase.status === 'building' ? 'building' : 'planned'}>
                        {phase.status === 'active' ? 'Active' : phase.status === 'building' ? 'Building' : 'Planned'}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-pr-text mb-3">{phase.title}</h3>

                    <ul className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`} role="list">
                      {phase.items.map(item => (
                        <li key={item} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-pr-text3 font-mono border border-white/[0.05]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}