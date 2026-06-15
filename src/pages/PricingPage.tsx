import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { setPageMeta } from '@/utils/seo'

const TIERS = [
    {
        id: 'free',
        name: 'Free',
        tagline: 'For exploring the ecosystem',
        priceMonthly: 0,
        priceAnnual: 0,
        cta: 'Get Started Free',
        href: '/contact',
        highlight: false,
        features: [
            'Access to documentation & guides',
            'Community forum access',
            'Public roadmap visibility',
            'Blog & build-log updates',
            'Basic ecosystem dashboard',
            '1 project workspace',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        tagline: 'For builders shipping real products',
        priceMonthly: 29,
        priceAnnual: 24,
        cta: 'Start 14-Day Trial',
        href: '/contact',
        highlight: true,
        features: [
            'Everything in Free',
            'Full API access across divisions',
            'Priority email support (24h)',
            'Custom integrations & webhooks',
            'Unlimited project workspaces',
            'Advanced analytics dashboard',
            'Early access to new divisions',
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        tagline: 'For teams and organizations at scale',
        priceMonthly: null,
        priceAnnual: null,
        cta: 'Book a Demo',
        href: '/contact',
        highlight: false,
        features: [
            'Everything in Pro',
            'Dedicated account manager',
            '99.9% uptime SLA',
            'Self-hosted deployment option',
            'SSO & SAML authentication',
            'Custom contract & invoicing',
            'Onboarding & training sessions',
        ],
    },
]

const COMPARISON_ROWS = [
    { label: 'API Requests / month', free: '1,000', pro: '100,000', ent: 'Unlimited' },
    { label: 'Project Workspaces', free: '1', pro: 'Unlimited', ent: 'Unlimited' },
    { label: 'Support', free: 'Community', pro: 'Priority 24h', ent: 'Dedicated AM' },
    { label: 'Uptime SLA', free: '—', pro: '99.5%', ent: '99.9%' },
    { label: 'Self-hosting', free: '—', pro: '—', ent: '✓' },
    { label: 'SSO / SAML', free: '—', pro: '—', ent: '✓' },
    { label: 'Custom Integrations', free: '—', pro: '✓', ent: '✓' },
    { label: 'Early Access Divisions', free: '—', pro: '✓', ent: '✓' },
]

export function PricingPage() {
    const [annual, setAnnual] = useState(true)

    useEffect(() => {
        setPageMeta({
            title: 'Pricing — Pixel Raider',
            description: 'Simple, transparent pricing for the Pixel Raider ecosystem. Free, Pro, and Enterprise plans built to scale with you.',
            keywords: 'Pixel Raider pricing, plans, subscription, enterprise',
        })
    }, [])

    return (
        <main id="main-content" className="pt-28 pb-24">
            <div className="container">
                <SectionHeader
                    tag="Pricing"
                    title="Simple plans,"
                    titleGrad="built to scale."
                    subtitle="Start free, upgrade when you need more. No hidden fees, cancel anytime."
                />

                {/* Billing toggle */}
                <div className="flex items-center justify-center gap-4 mb-14">
                    <span className={`text-sm font-medium transition-colors ${!annual ? 'text-pr-text' : 'text-pr-text3'}`}>Monthly</span>
                    <button
                        onClick={() => setAnnual(a => !a)}
                        role="switch"
                        aria-checked={annual}
                        aria-label="Toggle annual billing"
                        className="relative w-14 h-7 rounded-full transition-colors"
                        style={{ background: annual ? 'linear-gradient(135deg, #00C8E8, #6E54F7)' : 'rgba(255,255,255,0.08)' }}
                    >
                        <motion.div
                            className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white"
                            animate={{ x: annual ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                    </button>
                    <span className={`text-sm font-medium transition-colors ${annual ? 'text-pr-text' : 'text-pr-text3'}`}>
                        Annual <span className="text-cyan font-mono text-xs ml-1">Save ~17%</span>
                    </span>
                </div>

                {/* Tier cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-24 max-w-5xl mx-auto">
                    {TIERS.map((tier, i) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="relative rounded-2xl border p-7 flex flex-col"
                            style={{
                                borderColor: tier.highlight ? 'rgba(0,200,232,0.35)' : 'rgba(255,255,255,0.07)',
                                background: tier.highlight ? 'rgba(0,200,232,0.04)' : 'rgba(255,255,255,0.03)',
                                boxShadow: tier.highlight ? '0 0 40px rgba(0,200,232,0.1)' : 'none',
                            }}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge variant="cyan">Most Popular</Badge>
                                </div>
                            )}

                            <h3 className="font-display font-bold text-xl text-pr-text mb-1">{tier.name}</h3>
                            <p className="text-sm text-pr-text2 mb-6">{tier.tagline}</p>

                            <div className="mb-6">
                                {tier.priceMonthly === null ? (
                                    <div className="font-display font-black text-3xl text-pr-text">Custom</div>
                                ) : tier.priceMonthly === 0 ? (
                                    <div className="font-display font-black text-4xl text-pr-text">$0</div>
                                ) : (
                                    <div className="flex items-baseline gap-1">
                                        <span className="font-display font-black text-4xl text-pr-text">
                                            ${annual ? tier.priceAnnual : tier.priceMonthly}
                                        </span>
                                        <span className="text-sm text-pr-text3 font-mono">/mo</span>
                                    </div>
                                )}
                                {tier.priceMonthly !== null && tier.priceMonthly > 0 && annual && (
                                    <p className="text-xs text-pr-text3 mt-1 font-mono">Billed annually (${tier.priceAnnual * 12}/yr)</p>
                                )}
                            </div>

                            <Link
                                to={tier.href}
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm mb-7 transition-all duration-200"
                                style={
                                    tier.highlight
                                        ? { background: 'linear-gradient(135deg, #00C8E8, #6E54F7)', color: '#000', boxShadow: '0 0 24px rgba(0,200,232,0.35)' }
                                        : { border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#E8EEFF' }
                                }
                            >
                                {tier.cta}
                            </Link>

                            <ul className="space-y-3 flex-1" role="list">
                                {tier.features.map(f => (
                                    <li key={f} className="flex items-start gap-2.5 text-sm text-pr-text2">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00C8E8" strokeWidth="2.5" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison table */}
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        tag="Compare"
                        title="Every plan,"
                        titleGrad="side by side."
                        subtitle="A closer look at what's included across all three tiers."
                    />
                    <div className="rounded-2xl border border-white/[0.07] overflow-hidden overflow-x-auto">
                        <table className="w-full text-sm min-w-[560px]">
                            <thead>
                                <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                                    <th className="text-left px-5 py-4 font-semibold text-pr-text">Feature</th>
                                    <th className="text-center px-5 py-4 font-semibold text-pr-text2">Free</th>
                                    <th className="text-center px-5 py-4 font-semibold text-cyan">Pro</th>
                                    <th className="text-center px-5 py-4 font-semibold text-pr-text2">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON_ROWS.map((row, i) => (
                                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white/[0.015]' : ''}>
                                        <td className="px-5 py-3.5 text-pr-text2 border-t border-white/[0.05]">{row.label}</td>
                                        <td className="px-5 py-3.5 text-center text-pr-text3 font-mono border-t border-white/[0.05]">{row.free}</td>
                                        <td className="px-5 py-3.5 text-center text-cyan font-mono border-t border-white/[0.05]">{row.pro}</td>
                                        <td className="px-5 py-3.5 text-center text-pr-text3 font-mono border-t border-white/[0.05]">{row.ent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-20">
                    <p className="text-pr-text2 mb-5">Still have questions about pricing?</p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 text-pr-text font-semibold text-sm hover:border-cyan/30 hover:bg-white/[0.08] transition-all"
                    >
                        Talk to Sales
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </Link>
                </div>
            </div>
        </main>
    )
}