import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

interface AnimatedCounterProps {
    /** Target numeric value to count up to */
    value: number

    /** Text shown after the number, e.g. "+", "yr", "%" */
    suffix?: string

    /** Text shown before the number, e.g. "$" */
    prefix?: string

    /** Animation duration in seconds */
    duration?: number

    /** Extra className applied to the wrapping span */
    className?: string

    /** Inline style applied to the wrapping span */
    style?: React.CSSProperties
}

/**
 * Counts up from 0 to `value` when scrolled into view.
 *
 * Usage:
 * <AnimatedCounter value={9} />
 * <AnimatedCounter value={50} suffix="K+" />
 * <AnimatedCounter value={5} suffix="yr" />
 */
export function AnimatedCounter({
    value,
    suffix = '',
    prefix = '',
    duration = 1.6,
    className,
    style,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, {
        once: true,
        margin: '-40px',
    })

    const [display, setDisplay] = useState(0)

    useEffect(() => {
        if (!isInView) return

        const controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => {
                setDisplay(Math.round(latest))
            },
        })

        return () => controls.stop()
    }, [isInView, value, duration])

    return (
        <span
            ref={ref}
            className={className}
            style={style}
        >
            {prefix}
            {display}
            {suffix}
        </span>
    )
}