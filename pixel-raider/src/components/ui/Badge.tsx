import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps { children: ReactNode; variant?: 'cyan' | 'violet' | 'active' | 'building' | 'planned'; className?: string }
const variants = {
  cyan: 'bg-[var(--cyan)]/10 text-[var(--cyan)] border-[var(--cyan)]/20',
  violet: 'bg-[var(--violet)]/10 text-[var(--text-violet)] border-[var(--violet)]/20',
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  building: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  planned: 'bg-white/5 text-[var(--text2)] border-white/10',
}
export function Badge({ children, variant = 'cyan', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border', variants[variant], className)}>
      {children}
    </span>
  )
}
