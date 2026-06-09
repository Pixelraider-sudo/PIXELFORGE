import { TECH_STACK } from '@/constants'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function TechSection() {
  const { ref, isVisible } = useScrollReveal()
  const categories = Object.entries(TECH_STACK) as [string, readonly string[]][]

  return (
    <section className="section-sm relative overflow-hidden bg-[var(--bg2)] border-y border-white/[0.05]" aria-label="Technology stack">
      <div className="container relative z-10">
        <div ref={ref} className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[var(--cyan)] font-mono mb-3">
            <span className="w-8 h-px bg-[var(--cyan)]" aria-hidden="true" />
            Tech Stack
            <span className="w-8 h-px bg-[var(--cyan)]" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-3xl text-[var(--text)]">Built With The Best</h2>
        </div>

        <div className="space-y-6">
          {categories.map(([cat, techs], i) => (
            <div
              key={cat}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-mono tracking-widest uppercase text-[var(--text3)] min-w-[80px]">{cat}</span>
                <div className="flex-1 h-px bg-white/[0.05]" aria-hidden="true" />
              </div>
              <div className="flex flex-wrap gap-2" role="list" aria-label={`${cat} technologies`}>
                {techs.map((tech) => (
                  <span
                    key={tech}
                    role="listitem"
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-[var(--text2)] font-mono hover:bg-[var(--cyan)]/8 hover:border-[var(--cyan)]/25 hover:text-[var(--cyan)] transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
