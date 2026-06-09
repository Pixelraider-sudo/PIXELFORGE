import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps { children: ReactNode; className?: string; glow?: 'cyan' | 'violet' | 'none'; hover?: boolean }
export function Card({ children, className, glow = 'none', hover = true }: CardProps) {
  return (
    <div className={cn(
      'relative rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl p-6',
      'transition-all duration-300',
      hover && 'hover:border-[var(--cyan)]/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,200,232,0.1)]',
      glow === 'cyan' && 'shadow-[0_0_40px_rgba(0,200,232,0.12)]',
      glow === 'violet' && 'shadow-[0_0_40px_rgba(110,84,247,0.12)]',
      className
    )}>
      {children}
    </div>
  )
}
