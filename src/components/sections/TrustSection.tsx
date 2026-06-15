import { motion } from 'framer-motion'

const STATS = [
    { value: '50K+', label: 'Developers building' },
    { value: '4.8★', label: 'Rated on ProductHunt' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '30+', label: 'Technologies, one stack' },
]

const FEATURED_IN = ['TechCrunch', 'Dev.to', 'Hacker News', 'Product Hunt', 'IndieHackers', 'GitHub']

export function TrustSection() {
    return (
        <section className="section-sm border-y border-white/[0.05] bg-pr-bg2 overflow-hidden" aria-label="Trust and social proof">
            <div className="container">
                {/* Stat row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {STATS.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07, duration: 0.5 }}
                            className="text-center"
                        >
                            <div
                                className="font-display font-black text-2xl sm:text-3xl mb-1"
                                style={{ background: 'linear-gradient(135deg, #00C8E8, #6E54F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                            >
                                {s.value}
                            </div>
                            <div className="text-xs text-pr-text3 font-mono uppercase tracking-wide leading-tight">{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Featured-in marquee */}
                <div className="text-center mb-5">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-pr-text3">As seen on</span>
                </div>
                <div className="relative overflow-hidden">
                    <div className="flex items-center gap-12 whitespace-nowrap animate-[marquee_25s_linear_infinite] w-max">
                        {[...FEATURED_IN, ...FEATURED_IN].map((name, i) => (
                            <span key={i} className="text-base sm:text-lg font-display font-bold text-pr-text3 opacity-50 hover:opacity-90 hover:text-cyan transition-all duration-300 cursor-default">
                                {name}
                            </span>
                        ))}
                    </div>
                    {/* Fade edges */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-pr-bg2 to-transparent pointer-events-none" aria-hidden="true" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-pr-bg2 to-transparent pointer-events-none" aria-hidden="true" />
                </div>
            </div>
        </section>
    )
}