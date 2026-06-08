import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function HeroSection() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero">
      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />

      {/* Animated grid */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] bg-[var(--cyan)] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px] bg-[var(--violet)] pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10 pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-8"
            style={{animation:'fadeUp 0.6s ease both'}}
          >
            <Badge variant="cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse" aria-hidden="true" />
              Phase 1 // Live
            </Badge>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-black leading-[1.05] mb-6 tracking-tight"
            style={{fontSize:'clamp(48px,8vw,96px)', animation:'fadeUp 0.7s 0.1s ease both', opacity:0, animationFillMode:'forwards'}}
          >
            <span
              className="block"
              style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}
            >
              BUILD
            </span>
            <span className="block text-[var(--text)]">BEYOND</span>
            <span
              className="block"
              style={{background:'var(--grad-r)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}
            >
              LIMITS
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl text-[var(--text2)] max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{animation:'fadeUp 0.7s 0.2s ease both', opacity:0, animationFillMode:'forwards'}}
          >
            Pixel Raider is a scalable technology ecosystem — spanning AI, security, cloud, 
            mobile, community, and beyond. Built for developers who refuse to ship mediocrity.
          </p>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            style={{animation:'fadeUp 0.7s 0.3s ease both', opacity:0, animationFillMode:'forwards'}}
          >
            <Button variant="primary" size="lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Explore the Ecosystem
            </Button>
            <Button variant="ghost" size="lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              View Roadmap
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.06]"
            style={{animation:'fadeUp 0.7s 0.4s ease both', opacity:0, animationFillMode:'forwards'}}
            role="list"
            aria-label="Platform statistics"
          >
            {[
              { n: '9', label: 'Divisions' },
              { n: '12+', label: 'Planned Products' },
              { n: '9', label: 'Dev Phases' },
              { n: '5yr', label: 'Vision' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.03] px-6 py-5 text-center hover:bg-[var(--cyan)]/5 transition-colors"
                role="listitem"
              >
                <div
                  className="font-display font-bold text-2xl mb-1"
                  style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}
                >
                  {stat.n}
                </div>
                <div className="text-xs text-[var(--text3)] uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40" aria-hidden="true">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text3)] font-mono">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--cyan)] to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  )
}
