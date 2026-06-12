import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const WORDS = ['developers.', 'builders.', 'creators.', 'makers.', 'you.']

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=90&auto=format&fit=crop',
]

const LIVE_METRICS = [
  { label: 'Build Status', value: 'Passing', color: '#10D17A', dot: true },
  { label: 'Uptime', value: '99.9%', color: '#00C8E8', dot: false },
  { label: 'Deploy', value: 'Vercel', color: '#6E54F7', dot: false },
]

// Gradient text style helper
const gradStyle = (from: string, to: string) => ({
  background: `linear-gradient(135deg, ${from}, ${to})`,
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
})

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [bgIdx, setBgIdx] = useState(0)
  const [metricIdx, setMetricIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Framer scroll for parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax — image moves up at 40% of scroll speed
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  // Text fades and moves up as user scrolls out
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-18%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Track raw scrollY for additional effects
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cursor glow — desktop only
  useEffect(() => {
    if (isMobile) return
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [isMobile])

  // Typewriter
  useEffect(() => {
    const word = WORDS[wordIdx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < word.length) {
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 75)
    } else if (!deleting && displayed.length === word.length) {
      t = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % WORDS.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, wordIdx])

  // Rotate BG images every 6s
  useEffect(() => {
    const t = setInterval(() => setBgIdx(i => (i + 1) % BG_IMAGES.length), 6000)
    return () => clearInterval(t)
  }, [])

  // Cycle live metrics
  useEffect(() => {
    const t = setInterval(() => setMetricIdx(i => (i + 1) % LIVE_METRICS.length), 2800)
    return () => clearInterval(t)
  }, [])

  // Scroll-based image brightness — gets slightly dimmer as you scroll
  const imgOpacity = Math.max(0.12, 0.28 - scrollY * 0.0004)

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-pr-bg"
      aria-label="Hero"
    >
      {/* ── Parallax BG image ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIdx}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: imgOpacity, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none will-change-transform"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BG_IMAGES[bgIdx]})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Layered overlays ── */}
      {/* Dark vignette — lighter than before so image shows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(8,11,20,0.55) 0%, rgba(8,11,20,0.45) 50%, rgba(8,11,20,0.92) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Subtle colour tint — gives the image the Pixel Raider palette feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(0,200,232,0.08) 0%, transparent 60%, rgba(110,84,247,0.1) 100%)' }}
        aria-hidden="true"
      />

      {/* Grid */}
      <div className="bg-grid" aria-hidden="true" />
      {/* Scan line */}
      <div className="scan-line" aria-hidden="true" />

      {/* Cursor glow — desktop only */}
      {!isMobile && <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />}

      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 left-0 rounded-full pointer-events-none -translate-x-1/3"
        style={{ width: 500, height: 500, background: 'rgba(0,200,232,0.08)', filter: 'blur(120px)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 rounded-full pointer-events-none translate-x-1/4"
        style={{ width: 450, height: 450, background: 'rgba(110,84,247,0.07)', filter: 'blur(110px)' }}
        aria-hidden="true"
      />

      {/* ── Content — scrolls and fades with parallax ── */}
      <motion.div
        style={isMobile ? {} : { y: contentY, opacity: contentOp }}
        className="container relative z-10 w-full pt-24 sm:pt-28 pb-16 sm:pb-20"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

          {/* Left copy */}
          <div className="w-full lg:flex-1 lg:min-w-0 text-center lg:text-left">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black leading-[1.02] tracking-tight mb-5"
              style={{ fontSize: 'clamp(36px, 7vw, 82px)' }}
            >
              <span className="block" style={gradStyle('#00C8E8', '#6E54F7')}>BUILD</span>
              <span className="block" style={{ color: '#E8EEFF' }}>BEYOND</span>
              <span className="block" style={gradStyle('#6E54F7', '#00C8E8')}>LIMITS.</span>
            </motion.h1>

            {/* Typewriter line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4"
            >
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-1.5" style={{ color: 'rgba(232,238,255,0.75)' }}>
                A scalable technology ecosystem built for
              </p>
              <div
                className="font-display font-bold text-xl sm:text-2xl md:text-3xl flex items-center justify-center lg:justify-start h-9 sm:h-10"
                style={{ color: '#00C8E8' }}
                aria-live="polite"
                aria-label={`built for ${displayed}`}
              >
                {displayed}
                <span
                  className="inline-block w-0.5 h-6 sm:h-7 ml-1"
                  style={{ background: '#00C8E8', animation: 'blink 0.8s step-end infinite' }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* Live status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center justify-center lg:justify-start gap-3 mt-5 mb-7"
            >
              <span className="text-xs font-mono uppercase tracking-widest hidden sm:block" style={{ color: '#3D4E72' }}>
                Live
              </span>
              <div className="h-px flex-1 hidden sm:block" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={metricIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  {LIVE_METRICS[metricIdx].dot && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: LIVE_METRICS[metricIdx].color, animation: 'pulse 2s infinite' }}
                    />
                  )}
                  <span className="text-xs font-mono" style={{ color: LIVE_METRICS[metricIdx].color }}>
                    {LIVE_METRICS[metricIdx].label}: {LIVE_METRICS[metricIdx].value}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10 sm:mb-14"
            >
              <Link
                to="/ecosystem"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-black font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #00C8E8, #6E54F7)',
                  boxShadow: '0 0 24px rgba(0,200,232,0.4)',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(0,200,232,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(0,200,232,0.4)')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Explore Ecosystem
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#E8EEFF',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,232,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              >
                Our Mission
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-4 rounded-xl sm:rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
              role="list"
              aria-label="Platform stats"
            >
              {[['9', 'Divisions'], ['12+', 'Products'], ['9', 'Phases'], ['5yr', 'Vision']].map(([n, label], i) => (
                <div
                  key={label}
                  role="listitem"
                  className="text-center px-2 sm:px-4 py-3 sm:py-4 cursor-default transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,200,232,0.05)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                >
                  <div
                    className="font-display font-black text-lg sm:text-2xl mb-0.5"
                    style={gradStyle('#00C8E8', '#6E54F7')}
                  >
                    {n}
                  </div>
                  <div className="text-[9px] sm:text-xs uppercase tracking-widest font-mono leading-tight" style={{ color: '#3D4E72' }}>
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right floating cards — desktop only ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block w-[400px] flex-shrink-0 relative h-[500px]"
            aria-hidden="true"
          >
            {/* Main card */}
            <div
              className="absolute top-0 left-0 right-0 rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(20,28,48,0.85)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                animation: 'float 7s ease-in-out infinite',
              }}
            >
              <div className="relative w-full h-36 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?w=600&q=80&auto=format&fit=crop"
                  alt="Code editor"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,28,48,0.95) 0%, rgba(20,28,48,0.3) 60%, transparent 100%)' }} />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(239,68,68,0.8)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(234,179,8,0.8)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(34,197,94,0.8)' }} />
                  <span className="ml-2 font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>pixel-raider/src/App.tsx</span>
                </div>
                <div className="absolute bottom-2 left-3 font-mono text-xs" style={{ color: 'rgba(0,200,232,0.8)' }}>
                  npm run dev — ready in 312ms
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: '#3D4E72' }}>Ecosystem Status</div>
                    <div className="font-display font-bold text-base" style={{ color: '#E8EEFF' }}>Build Beyond Limits</div>
                  </div>
                  <div className="font-display font-black text-4xl leading-none" style={gradStyle('#00C8E8', '#6E54F7')}>82%</div>
                </div>
                <div className="w-full h-2 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full w-[82%] rounded-full" style={{ background: 'linear-gradient(90deg, #00C8E8, #6E54F7)', boxShadow: '0 0 12px rgba(0,200,232,0.5)' }} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[['Frontend', '#10D17A', true], ['Security', '#10D17A', true], ['Backend', '#00C8E8', true], ['AI Engine', '#3D4E72', false]].map(([l, c, done]) => (
                    <div
                      key={String(l)}
                      className="text-xs px-3 py-2 rounded-lg font-mono font-medium flex items-center gap-1.5"
                      style={{ color: String(c), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: String(c), opacity: done ? 1 : 0.3 }} />
                      {String(l)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="absolute bottom-10 right-[-16px] w-[215px] rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(20,28,48,0.85)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                animation: 'float 7s ease-in-out 2s infinite',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80&auto=format&fit=crop"
                alt="Developer workspace"
                className="w-full h-24 object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <div className="text-[10px] font-mono uppercase tracking-widest mb-1.5" style={{ color: '#3D4E72' }}>Next Milestone</div>
                <div className="font-semibold text-sm mb-2" style={{ color: '#E8EEFF' }}>Backend APIs</div>
                <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full w-[8%]" style={{ background: 'linear-gradient(90deg,#00C8E8,#6E54F7)' }} />
                </div>
                <div className="text-[10px] font-mono mt-1.5" style={{ color: '#3D4E72' }}>Coming in Phase 3</div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="absolute bottom-[185px] left-[-16px] w-[155px] rounded-xl p-4"
              style={{
                border: '1px solid rgba(0,200,232,0.2)',
                background: 'rgba(20,28,48,0.85)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 30px rgba(0,200,232,0.1)',
                animation: 'float 7s ease-in-out 4s infinite',
              }}
            >
              <div className="text-[10px] font-mono mb-1.5" style={{ color: '#3D4E72' }}>Technologies</div>
              <div className="font-display font-black text-3xl leading-none" style={{ color: '#00C8E8' }}>30+</div>
              <div className="text-xs mt-1.5" style={{ color: '#7A8BB5' }}>across the stack</div>
              <div className="flex gap-1.5 mt-3">
                {['#00C8E8', '#6E54F7', '#10D17A'].map(c => (
                  <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - scrollY * 0.008) }}
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: '#3D4E72' }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="#00C8E8" strokeWidth="1.5">
              <rect x="3" y="3" width="10" height="18" rx="5" />
              <circle cx="8" cy="9" r="1.5" fill="#00C8E8" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}