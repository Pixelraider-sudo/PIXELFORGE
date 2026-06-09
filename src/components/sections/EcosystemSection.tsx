import { DIVISIONS } from '@/constants'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function EcosystemSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="ecosystem" className="section relative overflow-hidden" aria-label="Ecosystem divisions">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-[0.04] bg-[var(--cyan)]" />
      </div>
      <div className="container relative z-10">
        {/* Heading */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[var(--cyan)] font-mono mb-4">
            <span className="w-8 h-px bg-[var(--cyan)]" aria-hidden="true" />
            The Ecosystem
            <span className="w-8 h-px bg-[var(--cyan)]" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-[var(--text)]">
            Nine Divisions.<br />
            <span style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>One Mission.</span>
          </h2>
          <p className="text-[var(--text2)] max-w-xl mx-auto text-lg">Every division is designed to scale independently while feeding the greater Pixel Raider ecosystem.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Ecosystem divisions">
          {DIVISIONS.map((div, i) => (
            <div
              key={div.id}
              role="listitem"
              className="transition-all duration-700"
              style={{
                transitionDelay: `${i * 60}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : 'translateY(24px)',
              }}
            >
              <Card hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl" aria-hidden="true">{div.icon}</div>
                  <Badge variant={div.status as 'active' | 'building' | 'planned'}>
                    <span className={`w-1 h-1 rounded-full ${
                      div.status === 'active' ? 'bg-emerald-400' :
                      div.status === 'building' ? 'bg-amber-400' : 'bg-white/30'
                    }`} aria-hidden="true" />
                    {div.status === 'active' ? 'Active' : div.status === 'building' ? 'Building' : 'Planned'}
                  </Badge>
                </div>
                <h3 className="font-semibold text-base text-[var(--text)] mb-2">{div.name}</h3>
                <p className="text-sm text-[var(--text2)] leading-relaxed">{div.description}</p>
                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  <a href={div.href} className="text-xs text-[var(--cyan)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5 font-mono">
                    Explore
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
