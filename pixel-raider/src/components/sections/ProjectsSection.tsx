import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FEATURED_PROJECTS } from '@/constants'

const STATUS_V: Record<string, 'active' | 'building' | 'planned' | 'cyan'> = {
  live: 'active', beta: 'cyan', wip: 'building', 'coming-soon': 'planned',
}
const STATUS_L: Record<string, string> = {
  live: 'Live', beta: 'Beta', wip: 'In Progress', 'coming-soon': 'Coming Soon',
}
const PROJECT_ICONS: Record<string, string> = {
  'pr-homepage': '🌐', 'pr-ai-cmd': '🤖', 'pr-backend': '🔧', 'pr-security': '🛡️',
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section bg-pr-bg overflow-hidden">
      <div className="container">
        <SectionHeader
          tag="Projects"
          title="What we're"
          titleGrad="building."
          subtitle="From flagship products to experimental tools — every Pixel Raider project, in real time."
        />

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {FEATURED_PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22,1,0.36,1] }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-cyan/25 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,200,232,0.08)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-grad flex items-center justify-center text-xl">
                  {PROJECT_ICONS[p.id] ?? '⚡'}
                </div>
                <Badge variant={STATUS_V[p.status]}>{STATUS_L[p.status]}</Badge>
              </div>
              <h3 className="font-semibold text-base text-pr-text mb-2 group-hover:text-cyan transition-colors">{p.title}</h3>
              <p className="text-sm text-pr-text2 leading-relaxed mb-5">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                {p.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-cyan/8 text-cyan border border-cyan/15 font-mono">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-pr-text2 text-sm font-medium hover:border-cyan/25 hover:text-cyan transition-all"
          >
            View All Projects
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
