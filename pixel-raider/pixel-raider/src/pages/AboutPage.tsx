import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { setPageMeta } from '@/utils/seo'
import { ROADMAP_PHASES } from '@/constants'

const STACK_ITEMS = [
  { icon: '⚡', label: 'React 18 + TypeScript 5', sub: 'Frontend foundation' },
  { icon: '🎨', label: 'Tailwind CSS + Framer Motion', sub: 'Styling & animations' },
  { icon: '🔐', label: 'Security-first architecture', sub: 'CSP, HSTS, sanitization' },
  { icon: '☁️', label: 'Vercel + GitHub Actions', sub: 'CI/CD & deployment' },
  { icon: '🤖', label: 'Anthropic API (Phase 5)', sub: 'AI integration roadmap' },
  { icon: '📦', label: 'Vite 5 build system', sub: 'Brotli/Gzip compression' },
]

const VALUES = [
  {
    title: 'Build in public',
    desc: 'Every phase shipped and documented. No stealth mode — progress is the product.',
  },
  {
    title: 'Security by default',
    desc: 'CSP headers, input sanitization, rate limiting, and prototype pollution guards from day one.',
  },
  {
    title: 'Ship then iterate',
    desc: 'Phase 1 was live in days. Phase 2 follows immediately. Momentum over perfection.',
  },
  {
    title: 'Ecosystem thinking',
    desc: 'Every feature built to serve the broader ecosystem, not just the immediate problem.',
  },
]

export function AboutPage() {
  useEffect(() => {
    setPageMeta({
      title: 'About',
      description: 'The vision, values, and team behind Pixel Raider.',
    })
  }, [])

  return (
    <>
      <PageHero
        tag="About Pixel Raider"
        title="Built by a builder,"
        titleGrad="for builders."
        subtitle="Pixel Raider started as a personal technology lab and is growing into a full ecosystem. Here's the vision and the architecture behind it."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      {/* Mission */}
      <section className="section bg-pr-bg">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                tag="The Mission"
                title="One Vision."
                titleGrad="Nine Divisions."
                align="left"
                className="mb-8"
              />
              <div className="space-y-4 text-pr-text2 leading-relaxed">
                <p>
                  Pixel Raider is not a portfolio. It's a technology ecosystem designed to
                  grow for years — spanning AI, security, cloud, mobile, community, and
                  beyond.
                </p>
                <p>
                  Built as a solo developer lab first, then architected to scale into a
                  real company with real products. Every phase is planned, shipped, and
                  documented.
                </p>
                <p>
                  The philosophy: build the infrastructure right the first time, so every
                  division that follows can scale without being rewritten.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Card className="!p-4">
                    <h3 className="font-semibold text-sm text-pr-text mb-1">{v.title}</h3>
                    <p className="text-xs text-pr-text2 leading-relaxed">{v.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="section bg-pr-bg2 border-y border-white/[0.06]">
        <div className="container">
          <SectionHeader
            tag="Tech Stack"
            title="Built with"
            titleGrad="precision."
            subtitle="Every technology chosen for a reason — performance, scalability, and developer experience."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {STACK_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <Card className="!p-5 text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="font-semibold text-sm text-pr-text mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-pr-text3">{item.sub}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap overview */}
      <section className="section bg-pr-bg">
        <div className="container max-w-3xl">
          <SectionHeader
            tag="9 Phases"
            title="The"
            titleGrad="Roadmap."
            subtitle="From brand to global ecosystem — each phase builds on the last."
          />
          <div className="space-y-3">
            {ROADMAP_PHASES.map((p, i) => (
              <motion.div
                key={p.phase}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan/20 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm flex-shrink-0 ${
                    p.status === 'active'
                      ? 'bg-cyan text-black shadow-cyan-sm'
                      : p.status === 'building'
                        ? 'bg-violet/20 text-violet border border-violet/40'
                        : 'bg-white/5 text-pr-text3 border border-white/10'
                  }`}
                >
                  {p.phase}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm text-pr-text">{p.title}</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {p.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-pr-text3 font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <Badge
                  variant={
                    p.status === 'active'
                      ? 'active'
                      : p.status === 'building'
                        ? 'building'
                        : 'planned'
                  }
                >
                  {p.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
