import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { setPageMeta } from '@/utils/seo'

const FEATURES = [
    {
        title: 'AI-Powered Code Generation',
        description: 'Describe what you need in plain English and get production-ready code across the Pixel Raider stack — components, APIs, and configs generated instantly.',
        benefit: 'Ship features in hours, not days.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
            </svg>
        ),
    },
    {
        title: 'Real-Time Collaboration',
        description: 'Work alongside your team with live cursors, shared workspaces, and instant sync across every Pixel Raider division — no merge conflicts, no waiting.',
        benefit: 'Build together, in sync, in real time.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: 'One-Click Deployment',
        description: 'Push to your repository and watch it go live — automated CI/CD pipelines handle linting, testing, building, and deploying to the edge automatically.',
        benefit: 'From commit to production in minutes.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /><path d="M13 15v4M11 17h4" />
            </svg>
        ),
    },
    {
        title: 'Zero-Knowledge Security',
        description: 'Every credential and secret is encrypted client-side with AES-256 before it ever touches a server. Not even Pixel Raider can read your data.',
        benefit: 'Your data, encrypted before it leaves your device.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" /><polyline points="9 12 11 14 15 10" />
            </svg>
        ),
    },
    {
        title: 'Unified API Gateway',
        description: 'One API key, every division. Access AI, Security, Cloud, and Mobile services through a single consistent interface with shared rate limits and auth.',
        benefit: 'Less integration work, more building.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        title: 'Live Ecosystem Dashboard',
        description: 'Monitor every division\'s status, uptime, and performance from one screen — build status, deploy history, and live metrics, all in one view.',
        benefit: 'Total visibility into your entire stack.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    {
        title: 'Cross-Platform Mobile SDKs',
        description: 'Native Kotlin + Jetpack Compose for Android, Swift + SwiftUI for iOS — fully typed SDKs that mirror your web API, kept in sync automatically.',
        benefit: 'Write once, deploy to every platform.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.4" />
            </svg>
        ),
    },
    {
        title: 'Community Marketplace',
        description: 'Browse and install community-built templates, plugins, and prompt packs directly into your workspace — or publish your own and earn from them.',
        benefit: 'Extend your stack without writing it yourself.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
        ),
    },
]

export function FeaturesPage() {
    useEffect(() => {
        setPageMeta({
            title: 'Features — Pixel Raider',
            description: 'Explore the core features of the Pixel Raider ecosystem — AI code generation, real-time collaboration, one-click deployment, and more.',
            keywords: 'Pixel Raider features, AI, collaboration, deployment, API',
        })
    }, [])

    return (
        <main id="main-content" className="pt-28 pb-24">
            <div className="container">
                <SectionHeader
                    tag="Features"
                    title="Everything you need,"
                    titleGrad="nothing you don't."
                    subtitle="A complete toolkit for building, shipping, and scaling — designed to work together from day one."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ delay: (i % 3) * 0.07, duration: 0.5 }}
                            className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all duration-300 hover:border-cyan/25 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,200,232,0.08)]"
                        >
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-cyan transition-all group-hover:shadow-[0_0_20px_rgba(0,200,232,0.2)]"
                                style={{ background: 'linear-gradient(135deg, rgba(0,200,232,0.12), rgba(110,84,247,0.12))', border: '1px solid rgba(0,200,232,0.15)' }}>
                                {f.icon}
                            </div>
                            <h3 className="font-semibold text-base text-pr-text mb-2 group-hover:text-cyan transition-colors">{f.title}</h3>
                            <p className="text-sm text-pr-text2 leading-relaxed mb-4">{f.description}</p>
                            <div className="pt-4 border-t border-white/[0.05] flex items-center gap-2">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00C8E8" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                                <span className="text-xs text-cyan font-mono">{f.benefit}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center rounded-2xl border border-white/[0.07] bg-gradient-to-br from-cyan/[0.06] to-violet/[0.06] p-10 sm:p-14">
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-pr-text mb-3">Ready to start building?</h2>
                    <p className="text-pr-text2 max-w-lg mx-auto mb-8">
                        Create a free account and explore every division — no credit card required.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-black transition-all hover:scale-[1.02]"
                            style={{ background: 'linear-gradient(135deg, #00C8E8, #6E54F7)', boxShadow: '0 0 24px rgba(0,200,232,0.35)' }}
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/pricing"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 text-pr-text font-semibold text-sm hover:border-cyan/30 transition-all"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}