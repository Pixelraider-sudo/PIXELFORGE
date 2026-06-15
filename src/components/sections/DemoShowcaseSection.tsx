import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

const TABS = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'api', label: 'API Playground' },
    { id: 'palette', label: 'Command Palette' },
] as const

type TabId = typeof TABS[number]['id']

const API_CODE = `// One API key. Every division.
const pr = new PixelRaider({ apiKey: 'pr_live_***' })

const result = await pr.ai.generate({
  prompt: 'Create a login form component',
  framework: 'react',
})

console.log(result.code)
// → Full React + Tailwind component ready to use`

function DashboardPreview() {
    return (
        <div className="rounded-xl border border-white/[0.08] bg-pr-bg overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-pr-text3">app.pixelraider.dev/dashboard</span>
            </div>
            <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: 'AI Requests', value: '12,482', delta: '+8.2%' },
                    { label: 'Active Users', value: '3,210', delta: '+2.1%' },
                    { label: 'Uptime', value: '99.97%', delta: '+0.0%' },
                    { label: 'Deploys', value: '47', delta: '+12' },
                ].map(stat => (
                    <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3.5">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-pr-text3 mb-1.5">{stat.label}</div>
                        <div className="font-display font-bold text-lg text-pr-text mb-1">{stat.value}</div>
                        <div className="text-xs font-mono text-emerald-400">{stat.delta}</div>
                    </div>
                ))}
            </div>
            <div className="px-5 pb-5">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="text-xs font-mono text-pr-text3 mb-3">Division Status</div>
                    <div className="space-y-2">
                        {[['AI Engine', '#10D17A', 'Operational'], ['Security', '#10D17A', 'Operational'], ['Cloud', '#F5A623', 'Degraded']].map(([name, color, status]) => (
                            <div key={String(name)} className="flex items-center justify-between text-xs">
                                <span className="text-pr-text2">{String(name)}</span>
                                <span className="flex items-center gap-1.5 font-mono" style={{ color: String(color) }}>
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: String(color) }} />
                                    {String(status)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function APIPreview() {
    return (
        <div className="rounded-xl border border-white/[0.08] bg-pr-bg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-pr-text3">playground.tsx</span>
            </div>
            <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
                <code className="text-pr-text2">{API_CODE.split('\n').map((line, i) => (
                    <div key={i}>
                        {line.startsWith('//') ? <span style={{ color: '#3D4E72' }}>{line}</span>
                            : line.includes('const') ? <>
                                <span style={{ color: '#6E54F7' }}>const</span>{line.replace('const', '')}
                            </>
                                : <span style={{ color: line.includes('→') ? '#00C8E8' : '#7A8BB5' }}>{line}</span>}
                    </div>
                ))}</code>
            </pre>
        </div>
    )
}

function PalettePreview() {
    const items = [
        { label: 'Go to Ecosystem', shortcut: 'G E' },
        { label: 'Open Projects', shortcut: 'G P' },
        { label: 'Toggle theme', shortcut: 'T' },
        { label: 'View Roadmap', shortcut: 'G R' },
        { label: 'Search documentation', shortcut: '⏎' },
    ]
    return (
        <div className="rounded-xl border border-white/[0.08] bg-pr-bg overflow-hidden p-5">
            <div className="rounded-lg border border-cyan/20 bg-white/[0.03] overflow-hidden" style={{ boxShadow: '0 0 30px rgba(0,200,232,0.08)' }}>
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3D4E72" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <span className="text-sm text-pr-text3 font-mono">Type a command or search...</span>
                    <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/10 text-pr-text3">ESC</kbd>
                </div>
                <div className="p-2">
                    {items.map((item, i) => (
                        <div
                            key={item.label}
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm"
                            style={{ background: i === 0 ? 'rgba(0,200,232,0.08)' : 'transparent', color: i === 0 ? '#00C8E8' : '#7A8BB5' }}
                        >
                            <span>{item.label}</span>
                            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/10">{item.shortcut}</kbd>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-center text-xs font-mono text-pr-text3 mt-4">
                Press <kbd className="px-1.5 py-0.5 rounded border border-white/10">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded border border-white/10">K</kbd> to open from anywhere
            </p>
        </div>
    )
}

export function DemoShowcaseSection() {
    const [tab, setTab] = useState<TabId>('dashboard')

    return (
        <section className="section bg-pr-bg overflow-hidden" aria-label="Product demo">
            <div className="container">
                <SectionHeader
                    tag="See it in action"
                    title="One ecosystem,"
                    titleGrad="every tool you need."
                    subtitle="A live look at the dashboard, API, and command palette that power Pixel Raider."
                />

                {/* Tabs */}
                <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                    {TABS.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className="px-4 sm:px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                            style={
                                tab === t.id
                                    ? { background: 'linear-gradient(135deg, #00C8E8, #6E54F7)', color: '#000' }
                                    : { background: 'rgba(255,255,255,0.04)', color: '#7A8BB5', border: '1px solid rgba(255,255,255,0.07)' }
                            }
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Panel */}
                <div className="max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-2 sm:p-3"
                            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
                        >
                            {tab === 'dashboard' && <DashboardPreview />}
                            {tab === 'api' && <APIPreview />}
                            {tab === 'palette' && <PalettePreview />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}