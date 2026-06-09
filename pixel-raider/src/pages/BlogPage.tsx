import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link }        from 'react-router-dom'
import { PageHero }    from '@/components/ui/PageHero'
import { Card }        from '@/components/ui/Card'
import { Badge }       from '@/components/ui/Badge'
import { setPageMeta } from '@/utils/seo'

const POSTS = [
  { slug: 'phase-1-shipped', title: 'Phase 1 is Live — What We Built and Why', excerpt: 'From a blank repo to a deployed production site in days. The full breakdown of our Phase 1 architecture decisions, tech choices, and what we learned.', date: 'Jun 2025', tag: 'Engineering', readTime: '8 min', featured: true },
  { slug: 'tailwind-vite-setup', title: 'Setting Up Tailwind v3 with Vite 5 — The Right Way', excerpt: 'A complete guide on correctly wiring up Tailwind CSS, PostCSS, and Vite including the common pitfalls and how to avoid them.', date: 'Jun 2025', tag: 'Tutorial', readTime: '5 min', featured: false },
  { slug: 'security-phase1', title: 'Security-First: 10 Hardening Layers We Ship by Default', excerpt: 'CSP, HSTS, prototype pollution guards, input sanitization, rate limiting — here is every security layer baked into Pixel Raider from day one.', date: 'Jun 2025', tag: 'Security', readTime: '6 min', featured: false },
  { slug: 'react-router-phase2', title: 'Phase 2: React Router, Lazy Loading, and Page Transitions', excerpt: 'How we wired up BrowserRouter, implemented code splitting with lazy(), and added Framer Motion page transitions without breaking Suspense.', date: 'Jun 2025', tag: 'Engineering', readTime: '7 min', featured: false },
]

const TAG_COLORS: Record<string, string> = {
  Engineering: 'cyan', Tutorial: 'violet', Security: 'building', Design: 'active',
}

export function BlogPage() {
  useEffect(() => {
    setPageMeta({ title: 'Blog', description: 'Engineering posts, tutorials, and updates from the Pixel Raider team.' })
  }, [])

  const [featured, ...rest] = POSTS

  return (
    <>
      <PageHero
        tag="Blog"
        title="Build logs,"
        titleGrad="in public."
        subtitle="Engineering posts, tutorials, and real-time updates from across the Pixel Raider ecosystem."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
      />

      <section className="section bg-pr-bg">
        <div className="container max-w-5xl">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="text-xs font-mono text-pr-text3 uppercase tracking-widest mb-4">Featured Post</div>
            <Card glow="cyan" className="!p-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={TAG_COLORS[featured.tag] as 'cyan' | 'violet'}>{featured.tag}</Badge>
                <span className="text-xs text-pr-text3 font-mono">{featured.date}</span>
                <span className="text-xs text-pr-text3 font-mono">· {featured.readTime} read</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-pr-text mb-4 leading-tight">{featured.title}</h2>
              <p className="text-pr-text2 leading-relaxed mb-6">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-sm text-cyan font-mono hover:gap-4 transition-all duration-200 cursor-pointer">
                Read post <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </Card>
          </motion.div>

          {/* Post grid */}
          <div className="text-xs font-mono text-pr-text3 uppercase tracking-widest mb-5">All Posts</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <Card className="h-full flex flex-col cursor-pointer">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={TAG_COLORS[post.tag] as 'cyan' | 'violet' | 'building'}>{post.tag}</Badge>
                    <span className="text-xs text-pr-text3 font-mono ml-auto">{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-pr-text leading-snug mb-3 flex-1">{post.title}</h3>
                  <p className="text-xs text-pr-text2 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <span className="text-xs text-pr-text3 font-mono">{post.date}</span>
                    <span className="text-xs text-cyan font-mono">Read →</span>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Coming soon card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.45 }}
            >
              <Card className="h-full flex flex-col items-center justify-center text-center !border-dashed opacity-50 cursor-default">
                <div className="text-2xl mb-3">✍️</div>
                <p className="text-sm text-pr-text3">More posts coming soon</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
