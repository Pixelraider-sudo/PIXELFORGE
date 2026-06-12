import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['developers.', 'builders.', 'creators.', 'makers.', 'you.']

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80&auto=format&fit=crop',
]

const LIVE_METRICS = [
  { label: 'Build Status', value: 'Passing', color: '#10D17A', dot: true },
  { label: 'Uptime', value: '99.9%', color: '#00C8E8', dot: false },
  { label: 'Deploy', value: 'Vercel', color: '#6E54F7', dot: false },
]

function StatCard({ n, label }: { n: string; label: string }) {
  return (
    <div className="text-center px-6 py-5 bg-white/[0.03] hover:bg-cyan/5 border-r border-white/[0.06] last:border-r-0 transition-colors flex-1 cursor-default">
      <div className="font-display font-black text-2xl bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent mb-1">
        {n}
      </div>
      <div className="text-xs text-pr-text3 uppercase tracking-widest font-mono">
        {label}
      </div>
    </div>
  )
}

export function HeroSection() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [bgIdx, setBgIdx] = useState(0)
  const [metricIdx, setMetricIdx] = useState(0)

  // Cursor glow follows mouse
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

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
      setWordIdx((i) => (i + 1) % WORDS.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, wordIdx])

  // Rotate BG images
  useEffect(() => {
    const t = setInterval(() => setBgIdx((i) => (i + 1) % BG_IMAGES.length), 6000)
    return () => clearInterval(t)
  }, [])

  // Cycle live metrics
  useEffect(() => {
    const t = setInterval(() => setMetricIdx((i) => (i + 1) % LIVE_METRICS.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-pr-bg"
      aria-label="Hero"
    >
      {/* Rotating background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${BG_IMAGES[bgIdx]})` }}
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* Overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-pr-bg/85 via-pr-bg/65 to-pr-bg pointer-events-none"
        aria-hidden="true"
      />
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />
      <div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[140px] bg-cyan pointer-events-none -translate-x-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] bg-violet pointer-events-none translate-x-1/4"
        aria-hidden="true"
      />

      <div className="container relative z-10 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ── Left copy ── */}
          <div className="flex-1 min-w-0 max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-1.5 text-xs font-mono font-semibold text-cyan tracking-widest uppercase mb-8"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"
                aria-hidden="true"
              />
              Phase 1 Deployed · Phase 2 Active
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black leading-[1.02] tracking-tight mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}
            >
              <span className="block bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
                BUILD
              </span>
              <span className="block text-pr-text">BEYOND</span>
              <span className="block bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent">
                LIMITS.
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
            >
              <p className="text-lg md:text-xl text-pr-text2 leading-relaxed mb-2">
                A scalable technology ecosystem built for
              </p>
              <div
                className="font-display font-bold text-2xl md:text-3xl text-cyan h-10 flex items-center"
                aria-live="polite"
                aria-label={`built for ${displayed}`}
              >
                {displayed}
                <span
                  className="inline-block w-0.5 h-7 bg-cyan ml-1 animate-[blink_0.8s_step-end_infinite]"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* Live status ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-3 mt-6 mb-8"
            >
              <span className="text-xs text-pr-text3 font-mono uppercase tracking-widest">
                Live status
              </span>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={metricIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  {LIVE_METRICS[metricIdx].dot && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: LIVE_METRICS[metricIdx].color }}
                    />
                  )}
                  <span
                    className="text-xs font-mono"
                    style={{ color: LIVE_METRICS[metricIdx].color }}
                  >
                    {LIVE_METRICS[metricIdx].label}: {LIVE_METRICS[metricIdx].value}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16"
            >
              <Link
                to="/ecosystem"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan to-violet text-black font-bold text-sm shadow-[0_0_24px_rgba(0,200,232,0.35)] hover:shadow-[0_0_40px_rgba(0,200,232,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Explore Ecosystem
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 text-pr-text font-semibold text-sm hover:border-cyan/30 hover:bg-white/[0.08] transition-all duration-200"
              >
                Our Mission
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="flex rounded-2xl overflow-hidden border border-white/[0.06]"
              role="list"
              aria-label="Platform stats"
            >
              {[
                ['9', 'Divisions'],
                ['12+', 'Products'],
                ['9', 'Phases'],
                ['5yr', 'Vision'],
              ].map(([n, label]) => (
                <StatCard key={label} n={n} label={label} />
              ))}
            </motion.div>
          </div>

          {/* ── Right — floating cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hero-cards w-full lg:w-[400px] flex-shrink-0 relative h-[500px]"
            aria-hidden="true"
          >
            {/* Main card */}
            <div
              className="absolute top-0 left-0 right-0 rounded-2xl border border-white/10 bg-pr-surface/80 backdrop-blur-xl overflow-hidden"
              style={{
                animation: 'float 7s ease-in-out infinite',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Real code screenshot */}
              <div className="relative w-full h-36 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?w=600&q=80&auto=format&fit=crop"
                  alt="Code editor"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pr-surface/95 via-pr-surface/40 to-transparent" />
                {/* Fake terminal bar */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-[10px] text-white/40">
                    pixel-raider/src/App.tsx
                  </span>
                </div>
                <div className="absolute bottom-2 left-3 font-mono text-xs text-cyan/80">
                  npm run dev — ready in 312ms
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs text-pr-text3 font-mono uppercase tracking-widest mb-1">
                      Ecosystem Status
                    </div>
                    <div className="font-display font-bold text-base text-pr-text">
                      Phase 2 Active
                    </div>
                  </div>
                  <div className="font-display font-black text-4xl bg-gradient-to-br from-cyan to-violet bg-clip-text text-transparent leading-none">
                    82%
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 mb-4 overflow-hidden">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan to-violet shadow-[0_0_12px_rgba(0,200,232,0.5)]" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['Phase 1', '#10D17A', true],
                    ['Security', '#10D17A', true],
                    ['Phase 2', '#00C8E8', true],
                    ['AI Engine', '#3D4E72', false],
                  ].map(([l, c, done]) => (
                    <div
                      key={String(l)}
                      style={{ color: String(c) }}
                      className="text-xs px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] font-mono font-medium flex items-center gap-1.5"
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: String(c), opacity: done ? 1 : 0.3 }}
                      />
                      {String(l)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 — workspace image */}
            <div
              className="absolute bottom-10 right-[-16px] w-[215px] rounded-xl border border-white/10 bg-pr-surface/80 backdrop-blur-xl overflow-hidden"
              style={{
                animation: 'float 7s ease-in-out 2s infinite',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80&auto=format&fit=crop"
                alt="Developer workspace"
                className="w-full h-24 object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <div className="text-[10px] text-pr-text3 font-mono uppercase tracking-widest mb-1.5">
                  Next Milestone
                </div>
                <div className="font-semibold text-sm text-pr-text mb-2">
                  Backend APIs
                </div>
                <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[8%] bg-gradient-to-r from-cyan to-violet" />
                </div>
                <div className="text-[10px] text-pr-text3 font-mono mt-1.5">
                  Phase 3 — Coming soon
                </div>
              </div>
            </div>

            {/* Card 3 — tech count */}
            <div
              className="absolute bottom-[185px] left-[-16px] w-[155px] rounded-xl border border-cyan/20 bg-pr-surface/80 backdrop-blur-xl p-4"
              style={{
                animation: 'float 7s ease-in-out 4s infinite',
                boxShadow: '0 0 30px rgba(0,200,232,0.08)',
              }}
            >
              <div className="text-[10px] text-pr-text3 font-mono mb-1.5">
                Technologies
              </div>
              <div className="font-display font-black text-3xl text-cyan leading-none">
                30+
              </div>
              <div className="text-xs text-pr-text2 mt-1.5">across the stack</div>
              <div className="flex gap-1.5 mt-3">
                {['#00C8E8', '#6E54F7', '#10D17A'].map((c) => (
                  <div
                    key={c}
                    className="w-2 h-2 rounded-full"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-pr-text3">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              stroke="#00C8E8"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="10" height="18" rx="5" />
              <circle cx="8" cy="9" r="1.5" fill="#00C8E8" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
