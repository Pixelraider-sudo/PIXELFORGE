import { cn } from '@/utils/cn'

interface SectionHeaderProps {
  tag: string
  title: string
  titleGrad?: string   // part of title to gradient
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ tag, title, titleGrad, subtitle, align = 'center', className }: SectionHeaderProps) {
  const isCenter = align === 'center'
  return (
    <div className={cn(isCenter && 'text-center', 'mb-16', className)}>
      {/* Tag */}
      <div className={cn('inline-flex items-center gap-2 mb-4', isCenter && 'justify-center')}>
        <span className="w-8 h-px bg-cyan" aria-hidden="true" />
        <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-cyan">{tag}</span>
        <span className="w-8 h-px bg-cyan" aria-hidden="true" />
      </div>
      {/* Title */}
      <h2 className="font-display font-bold leading-[1.1] mb-4" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
        {titleGrad ? (
          <>
            {title}{' '}
            <span className="grad-text">{titleGrad}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {/* Subtitle */}
      {subtitle && (
        <p className={cn('text-pr-text2 text-lg leading-relaxed', isCenter && 'max-w-xl mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
