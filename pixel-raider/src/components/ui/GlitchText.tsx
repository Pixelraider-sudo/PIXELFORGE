import { useState, useCallback } from 'react'
import { cn } from '@/utils/cn'

interface GlitchTextProps { text: string; className?: string; tag?: keyof JSX.IntrinsicElements }
export function GlitchText({ text, className, tag: Tag = 'span' }: GlitchTextProps) {
  const [active, setActive] = useState(false)
  const trigger = useCallback(() => { setActive(true); setTimeout(() => setActive(false), 500) }, [])
  return (
    <Tag
      className={cn(className, active && '[animation:glitch_0.5s_steps(1)_1]')}
      onMouseEnter={trigger}
      data-text={text}
    >
      {text}
    </Tag>
  )
}
