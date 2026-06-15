import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

const FAQS = [
    {
        q: "What's included in the Free plan?",
        a: "The Free plan gives you access to our full documentation, community forums, public roadmap, blog updates, and a basic ecosystem dashboard with one project workspace — everything you need to explore the platform before upgrading.",
    },
    {
        q: 'Can I self-host Pixel Raider?',
        a: 'Yes — self-hosted deployment is available on our Enterprise plan, including full source access, custom infrastructure configuration, and dedicated onboarding support to get your instance running.',
    },
    {
        q: "What's your uptime SLA?",
        a: 'Pro plans include a 99.5% uptime guarantee, while Enterprise plans come with a 99.9% SLA backed by dedicated infrastructure monitoring and a committed incident response time.',
    },
    {
        q: 'Do you have a REST API?',
        a: 'Yes — every division in the Pixel Raider ecosystem (AI, Security, Cloud, Mobile, and more) is accessible through a unified REST API with a single API key. Full API documentation is available in our docs.',
    },
    {
        q: 'Can I switch plans later?',
        a: 'Absolutely. You can upgrade, downgrade, or cancel at any time from your account dashboard. Changes take effect at the start of your next billing cycle, and we prorate any differences automatically.',
    },
    {
        q: 'Is my data encrypted?',
        a: 'Yes. All sensitive data is encrypted client-side using AES-256 before it ever reaches our servers — a zero-knowledge architecture means even we cannot read your stored credentials or secrets.',
    },
    {
        q: 'Do you offer discounts for startups or students?',
        a: "We're working on a startup and education program as part of our Phase 3 rollout. Reach out via the contact page and we'll keep you posted as soon as it's available.",
    },
]

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border-b border-white/[0.07] last:border-b-0">
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            >
                <span className="font-medium text-sm sm:text-base text-pr-text group-hover:text-cyan transition-colors">{q}</span>
                <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300"
                    style={{
                        borderColor: isOpen ? 'rgba(0,200,232,0.4)' : 'rgba(255,255,255,0.1)',
                        background: isOpen ? 'rgba(0,200,232,0.08)' : 'transparent',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#00C8E8' : '#7A8BB5'} strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="text-sm text-pr-text2 leading-relaxed pb-5 pr-10">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(0)

    return (
        <section className="section bg-pr-bg2 border-y border-white/[0.05]" aria-label="Frequently asked questions">
            <div className="container max-w-2xl mx-auto">
                <SectionHeader
                    tag="FAQ"
                    title="Questions?"
                    titleGrad="We've got answers."
                    subtitle="Can't find what you're looking for? Reach out and we'll get back to you."
                />
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6">
                    {FAQS.map((faq, i) => (
                        <FAQItem
                            key={faq.q}
                            q={faq.q}
                            a={faq.a}
                            isOpen={openIdx === i}
                            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}