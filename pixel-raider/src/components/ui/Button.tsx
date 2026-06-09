import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'ghost-cyan'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  asChild?: boolean
}

const baseStyles = `
  inline-flex items-center justify-center gap-2 font-medium rounded-xl
  transition-all duration-200 ease-in-out cursor-pointer select-none
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`

const variants = {
  primary: `
    bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-semibold
    shadow-[0_0_20px_rgba(0,200,232,0.35)] hover:shadow-[0_0_32px_rgba(0,200,232,0.55)]
    hover:scale-[1.02] active:scale-[0.98]
  `,
  ghost: `
    bg-white/5 border border-white/10 text-[var(--text)]
    hover:bg-white/10 hover:border-[var(--cyan)]/40
  `,
  outline: `
    border border-[var(--cyan)]/40 text-[var(--cyan)]
    hover:bg-[var(--cyan)]/10 hover:border-[var(--cyan)]
  `,
  'ghost-cyan': `
    text-[var(--cyan)] hover:bg-[var(--cyan)]/10
    border border-transparent hover:border-[var(--cyan)]/30
  `,
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base rounded-2xl',
}

export function Button({
  variant = 'ghost',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
