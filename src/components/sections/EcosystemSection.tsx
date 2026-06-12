import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DIVISIONS } from '@/constants'
import { Badge } from '@/components/ui/Badge'
import { DivisionIcon } from '../../components/ui/DivisionIcon'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function EcosystemSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section
      id="ecosystem"
      className="section relative overflow-hidden bg-pr-bg"
      aria-label="Ecosystem divisions"
    >
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
          <div className="section-tag">The Ecosystem</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-5 text-pr-text leading-tight">
            Nine Divisions.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              One Mission.
            </span>
          </h2>
          <p className="text-pr-text2 max-w-xl mx-auto text-lg leading-relaxed">
            Every division is designed to scale independently while feeding the greater
            Pixel Raider ecosystem.
          </p>
        </div>

        {/* Division cards grid — same 3-col layout */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-label="Ecosystem divisions"
        >
          {DIVISIONS.map((div, i) => (
            <motion.div
              key={div.id}
              role="listitem"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={div.href}
                className="group flex flex-col h-full rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-cyan/30 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,200,232,0.1)] hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between mb-5">
                  {/* SVG icon — no emojis */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan/15 to-violet/15 border border-cyan/15 flex items-center justify-center text-cyan group-hover:shadow-[0_0_20px_rgba(0,200,232,0.25)] group-hover:border-cyan/30 transition-all">
                    <DivisionIcon id={div.id} size={20} />
                  </div>
                  <Badge variant={div.status as 'active' | 'building' | 'planned'}>
                    <span
                      className={`w-1 h-1 rounded-full ${
                        div.status === 'active'
                          ? 'bg-emerald-400'
                          : div.status === 'building'
                            ? 'bg-amber-400'
                            : 'bg-white/30'
                      }`}
                      aria-hidden="true"
                    />
                    {div.status === 'active'
                      ? 'Active'
                      : div.status === 'building'
                        ? 'Building'
                        : 'Planned'}
                  </Badge>
                </div>

                <h3 className="font-semibold text-base text-pr-text mb-2 group-hover:text-cyan transition-colors duration-200">
                  {div.name}
                </h3>
                <p className="text-sm text-pr-text2 leading-relaxed flex-1 mb-5">
                  {div.description}
                </p>

                <div className="pt-4 border-t border-white/[0.05]">
                  <span className="inline-flex items-center gap-1.5 text-xs text-cyan font-mono group-hover:gap-3 transition-all duration-200">
                    Explore
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14"
        >
          <Link
            to="/ecosystem"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan/20 bg-cyan/5 text-cyan text-sm font-semibold hover:bg-cyan/10 hover:border-cyan/40 transition-all"
          >
            View Full Ecosystem Map
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
