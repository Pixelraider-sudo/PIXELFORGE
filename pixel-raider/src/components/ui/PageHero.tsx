import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface Breadcrumb { label: string; to?: string }
interface PageHeroProps {
  tag: string
  title: string
  titleGrad?: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
  className?: string
}

export function PageHero({ tag, title, titleGrad, subtitle, breadcrumbs, className }: PageHeroProps) {
  return (
    <section className={cn('relative pt-32 pb-20 overflow-hidden', className)}>
      {/* Grid bg */}
      <div className="bg-grid" aria-hidden="true" />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 bg-cyan pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-mono text-pr-text3 mb-6"
          >
            {breadcrumbs.map((bc, i) => (
              <span key={bc.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {bc.to
                  ? <Link to={bc.to} className="hover:text-cyan transition-colors">{bc.label}</Link>
                  : <span className="text-pr-text2">{bc.label}</span>
                }
              </span>
            ))}
          </motion.nav>
        )}

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 text-xs font-mono font-semibold text-cyan tracking-widest uppercase mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" aria-hidden="true" />
          {tag}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-display font-black leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
        >
          {titleGrad ? (
            <>
              {title}<br />
              <span className="grad-text">{titleGrad}</span>
            </>
          ) : title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg text-pr-text2 leading-relaxed max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
