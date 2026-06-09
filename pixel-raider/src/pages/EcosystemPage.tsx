import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageHero }      from '@/components/ui/PageHero'
import { Card }          from '@/components/ui/Card'
import { Badge }         from '@/components/ui/Badge'
import { setPageMeta }   from '@/utils/seo'
import { DIVISIONS }     from '@/constants'

const STATUS_V: Record<string, 'active' | 'building' | 'planned'> = {
  active: 'active', building: 'building', planned: 'planned',
}

export function EcosystemPage() {
  useEffect(() => {
    setPageMeta({ title: 'Ecosystem', description: 'Explore all 9 divisions of the Pixel Raider ecosystem.' })
  }, [])

  return (
    <>
      <PageHero
        tag="The Ecosystem"
        title="Nine Divisions."
        titleGrad="One Vision."
        subtitle="Every division designed to scale independently while strengthening the whole. This is the Pixel Raider ecosystem."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Ecosystem' }]}
      />

      <section className="section bg-pr-bg">
        <div className="container">
          {/* Status legend */}
          <div className="flex items-center gap-4 flex-wrap mb-12 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <span className="text-xs text-pr-text3 font-mono uppercase tracking-widest">Status:</span>
            {(['active','building','planned'] as const).map(s => (
              <Badge key={s} variant={STATUS_V[s]}>
                <span className={`w-1.5 h-1.5 rounded-full ${s === 'active' ? 'bg-emerald-400' : s === 'building' ? 'bg-amber-400' : 'bg-white/30'}`} />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Badge>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIVISIONS.map((div, i) => (
              <motion.div
                key={div.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col group">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl" aria-hidden="true">{div.icon}</span>
                    <Badge variant={STATUS_V[div.status]}>
                      <span className={`w-1 h-1 rounded-full ${div.status === 'active' ? 'bg-emerald-400' : div.status === 'building' ? 'bg-amber-400' : 'bg-white/30'}`} />
                      {div.status === 'active' ? 'Active' : div.status === 'building' ? 'Building' : 'Planned'}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-base text-pr-text mb-2">{div.name}</h3>
                  <p className="text-sm text-pr-text2 leading-relaxed flex-1 mb-5">{div.description}</p>
                  <div className="pt-4 border-t border-white/[0.05]">
                    <Link
                      to={div.href}
                      className="inline-flex items-center gap-1.5 text-xs text-cyan font-mono hover:gap-3 transition-all duration-200"
                    >
                      Explore division
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
