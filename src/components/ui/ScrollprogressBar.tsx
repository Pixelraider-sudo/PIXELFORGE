import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin progress bar fixed to the very top of the viewport.
 * Fills left-to-right based on how far the user has scrolled down the page.
 *
 * Mount once near the root of the app (e.g. in App.tsx, just inside
 * <BrowserRouter>) so it persists across route changes.
 */
export function ScrollProgressBar() {
    const { scrollYProgress } = useScroll()

    // Smooth out the raw scroll progress so the bar glides rather than jumps
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 280,
        damping: 32,
        mass: 0.3,
    })

    return (
        <motion.div
            style={{
                scaleX,
                transformOrigin: '0%',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #00C8E8, #6E54F7)',
                boxShadow: '0 0 12px rgba(0,200,232,0.5)',
                zIndex: 9999,
                pointerEvents: 'none',
            }}
            aria-hidden="true"
        />
    )
}