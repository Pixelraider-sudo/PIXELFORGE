import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageHero }      from '@/components/ui/PageHero'
import { Card }          from '@/components/ui/Card'
import { Badge }         from '@/components/ui/Badge'
import { setPageMeta }   from '@/utils/seo'

const EXPERIMENTS = [
  { icon: '🤖', title: 'Robotics OS', desc: 'Custom operating system layer for embedded robotics and automation rigs.', status: 'research', eta: '2026' },
  { icon: '🏠', title: 'Smart Home Stack', desc: 'Self-hosted IoT hub with sensor mesh networking and local AI inference.', status: 'research', eta: '2026' },
  { icon: '🚁', title: 'Drone Software Suite', desc: 'Flight controller firmware, telemetry dashboard, and autonomous path planning.', status: 'concept', eta: '2027' },
  { icon: '🌐', title: 'Experimental Browser', desc: 'Privacy-first browser engine with built-in ad blocking and local AI assistant.', status: 'concept', eta: '2027' },
  { icon: '🔍', title: 'PR Search Engine', desc: 'Semantic search engine with RAG pipeline for the Pixel Raider knowledge base.', status: 'concept', eta: '2026' },
  { icon: '💻', title: 'Pixel Raider OS', desc: 'Long-term experiment: a minimal Linux distribution optimized for developers.', status: 'longterm', eta: '2028+' },
]

const STATUS_STYLES: Record<string, string> = {
  research: 'bg-cyan/10 text-cyan border-cyan/20',
  concept:  'bg-violet/10 text-violet border-violet/20',
  longterm: 'bg-white/5 text-pr-text3 border-white/10',
}

export function LabsPage() {
  useEffect(() => {
    setPageMeta({ title: 'Labs', description: 'Pixel Raider Labs — experimental technology and future research projects.' })
  }, [])

  return (
    <>
      <PageHero
        tag="Pixel Raider Labs"
        title="Where ideas"
        titleGrad="get dangerous."
        subtitle="Labs is our experimental division. No guarantees, no timelines, just pure R&D. These are the moonshots."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Ecosystem', to: '/ecosystem' }, { label: 'Labs' }]}
      />

      {/* Warning banner */}
      <div className="bg-amber-500/5 border-y border-amber-500/15">
        <div className="container py-4">
          <p className="text-sm text-amber-400 font-mono flex items-center gap-2">
            <span>⚠️</span>
            Labs projects are experimental. They may be abandoned, pivoted, or combined with other divisions at any time.
          </p>
        </div>
      </div>

      <section className="section bg-pr-bg">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERIMENTS.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{exp.icon}</span>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-mono font-semibold ${STATUS_STYLES[exp.status]}`}>
                        {exp.status}
                      </span>
                      <span className="text-xs text-pr-text3 font-mono">ETA {exp.eta}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-base text-pr-text mb-2">{exp.title}</h3>
                  <p className="text-sm text-pr-text2 leading-relaxed flex-1">{exp.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-2xl border border-cyan/15 bg-cyan/5 text-center"
          >
            <h2 className="font-display font-bold text-2xl mb-3">Have an experiment idea?</h2>
            <p className="text-pr-text2 mb-6">Labs is always looking for interesting problems to throw compute at.</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-grad text-black font-semibold text-sm shadow-cyan-sm hover:shadow-cyan hover:scale-[1.02] transition-all">
              Pitch an experiment →
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
