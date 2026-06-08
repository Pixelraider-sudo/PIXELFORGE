import { ROADMAP_PHASES } from '@/constants'
import { Badge } from '@/components/ui/Badge'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function RoadmapSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="roadmap" className="section relative overflow-hidden" aria-label="Development roadmap">
      <div className="container relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[var(--cyan)] font-mono mb-4">
            <span className="w-8 h-px bg-[var(--cyan)]" aria-hidden="true" />
            Development Phases
            <span className="w-8 h-px bg-[var(--cyan)]" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
            The{' '}
            <span style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Roadmap</span>
          </h2>
          <p className="text-[var(--text2)] max-w-xl mx-auto">9 phases. Each one building on the last. We ship, we scale, we expand.</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--cyan)] via-[var(--violet)] to-transparent" aria-hidden="true" />

          <div className="space-y-8">
            {ROADMAP_PHASES.map((phase, i) => (
              <div
                key={phase.phase}
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Dot */}
                <div
                  className={`absolute left-0 md:left-1/2 w-11 h-11 md:-translate-x-1/2 rounded-xl flex items-center justify-center font-display font-bold text-sm z-10 border ${
                    phase.status === 'active'
                      ? 'bg-[var(--cyan)] border-[var(--cyan)] text-black shadow-[0_0_20px_rgba(0,200,232,0.5)]'
                      : phase.status === 'building'
                      ? 'bg-[var(--violet)]/20 border-[var(--violet)] text-[var(--violet)]'
                      : 'bg-[var(--surface)] border-white/10 text-[var(--text3)]'
                  }`}
                  aria-hidden="true"
                >
                  {phase.phase}
                </div>

                {/* Content — alternating sides on desktop */}
                <div
                  className={`ml-16 md:ml-0 w-full md:w-[calc(50%-40px)] ${
                    i % 2 === 0 ? 'md:pr-16 md:text-right md:ml-auto' : 'md:ml-16'
                  }`}
                  aria-label={`Phase ${phase.phase}: ${phase.title}`}
                >
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:border-[var(--cyan)]/25 hover:bg-white/[0.05] transition-all group">
                    <div className={`flex items-center gap-2 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="font-mono text-xs text-[var(--text3)]">Phase {phase.phase}</span>
                      <Badge variant={phase.status === 'active' ? 'active' : phase.status === 'building' ? 'building' : 'planned'}>
                        {phase.status === 'active' ? '▶ Active' : phase.status === 'building' ? '⚡ Building' : '○ Planned'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-[var(--text)] mb-3">{phase.title}</h3>
                    <ul className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`} role="list">
                      {phase.items.map((item) => (
                        <li key={item} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[var(--text3)] font-mono">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
