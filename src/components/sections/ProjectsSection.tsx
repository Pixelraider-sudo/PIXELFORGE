import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FEATURED_PROJECTS } from '@/constants'

const STATUS_V: Record<string, 'active' | 'building' | 'planned' | 'cyan'> = {
  live: 'active',
  beta: 'cyan',
  wip: 'building',
  'coming-soon': 'planned',
}
const STATUS_L: Record<string, string> = {
  live: 'Live',
  beta: 'Beta',
  wip: 'In Progress',
  'coming-soon': 'Coming Soon',
}

// Real Unsplash images per project
const PROJECT_IMAGES: Record<string, string> = {
  'pr-homepage':
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80&auto=format&fit=crop',
  'pr-ai-cmd':
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop',
  'pr-backend':
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&auto=format&fit=crop',
  'pr-security':
    'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80&auto=format&fit=crop',
}

const PROJECT_ICONS: Record<string, React.ReactElement> = {
  'pr-homepage': (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  'pr-ai-cmd': (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
    </svg>
  ),
  'pr-backend': (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  'pr-security': (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section bg-pr-bg overflow-hidden">
      <div className="container">
        <SectionHeader
          tag="Projects"
          title="What we're"
          titleGrad="building."
          subtitle="From flagship products to experimental tools — every Pixel Raider project, tracked in real time."
        />

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {FEATURED_PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-cyan/25 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,200,232,0.08)]"
            >
              {/* Project image */}
              <div className="relative w-full h-36 overflow-hidden">
                <img
                  src={PROJECT_IMAGES[p.id]}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pr-bg/90 via-pr-bg/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge variant={STATUS_V[p.status]}>{STATUS_L[p.status]}</Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 border border-cyan/15 flex items-center justify-center text-cyan flex-shrink-0">
                    {PROJECT_ICONS[p.id]}
                  </div>
                  <h3 className="font-semibold text-base text-pr-text group-hover:text-cyan transition-colors">
                    {p.title}
                  </h3>
                </div>

                <p className="text-sm text-pr-text2 leading-relaxed mb-4">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-cyan/[0.08] text-cyan border border-cyan/15 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
