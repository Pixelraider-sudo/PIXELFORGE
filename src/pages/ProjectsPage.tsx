import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/ui/PageHero'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { setPageMeta } from '@/utils/seo'
import { FEATURED_PROJECTS } from '@/constants'

const ALL_PROJECTS = [
  ...FEATURED_PROJECTS,
  {
    id: 'pr-docs',
    title: 'PR Documentation',
    description:
      'Comprehensive developer docs covering architecture, APIs, and guides for every division.',
    tags: ['MDX', 'TypeScript'],
    status: 'wip' as const,
    featured: false,
  },
  {
    id: 'pr-cli',
    title: 'Pixel Raider CLI',
    description:
      'Command-line tool for scaffolding, building, and deploying Pixel Raider projects.',
    tags: ['Node.js', 'Commander'],
    status: 'coming-soon' as const,
    featured: false,
  },
  {
    id: 'pr-mobile',
    title: 'PR Mobile App',
    description: 'Native Android and iOS companion app for the Pixel Raider ecosystem.',
    tags: ['Kotlin', 'Swift'],
    status: 'coming-soon' as const,
    featured: false,
  },
]

const STATUS_LABELS: Record<string, string> = {
  live: 'Live',
  beta: 'Beta',
  wip: 'In Progress',
  'coming-soon': 'Coming Soon',
}
const STATUS_VARIANT: Record<
  string,
  'active' | 'building' | 'planned' | 'cyan' | 'violet'
> = {
  live: 'active',
  beta: 'cyan',
  wip: 'building',
  'coming-soon': 'planned',
}

const FILTERS = ['All', 'Live', 'Beta', 'In Progress', 'Coming Soon']

export function ProjectsPage() {
  useEffect(() => {
    setPageMeta({
      title: 'Projects',
      description: 'All Pixel Raider projects — live, in progress, and planned.',
    })
  }, [])

  const [active, setActive] = useState('All')
  const filtered =
    active === 'All'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => STATUS_LABELS[p.status] === active)

  return (
    <>
      <PageHero
        tag="Projects"
        title="What we're"
        titleGrad="building."
        subtitle="From flagship products to experimental tools — every Pixel Raider project, tracked in real time."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
      />

      <section className="section bg-pr-bg">
        <div className="container">
          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === f
                    ? 'bg-cyan/10 text-cyan border border-cyan/30'
                    : 'bg-white/5 text-pr-text2 border border-white/[0.07] hover:text-pr-text hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-grad flex items-center justify-center text-black font-display font-bold text-sm">
                      {project.title.charAt(0)}
                    </div>
                    <Badge variant={STATUS_VARIANT[project.status]}>
                      {STATUS_LABELS[project.status]}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-base text-pr-text mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-pr-text2 leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-cyan/8 text-cyan border border-cyan/15 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-pr-text3">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
