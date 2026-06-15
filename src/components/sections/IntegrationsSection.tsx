import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

const INTEGRATIONS = [
    {
        name: 'GitHub', icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
        )
    },
    {
        name: 'GitLab', icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.65 10.43l-1.13-3.47-2.23-6.86a.44.44 0 0 0-.42-.3.44.44 0 0 0-.43.3L16.42 6.9H7.58L5.56 0.6A.44.44 0 0 0 5.13.3a.44.44 0 0 0-.42.3L2.48 6.96 1.35 10.43a.93.93 0 0 0 .34 1.05l10.31 7.49 10.31-7.49a.93.93 0 0 0 .34-1.05" /></svg>
        )
    },
    {
        name: 'Vercel', icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 19.5h20L12 2z" /></svg>
        )
    },
    {
        name: 'Firebase', icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.5 21l1.3-15.4L13 12 5.5 21zM18.5 21L13 12l2.6-2.6L21 18l-2.5 3zM5.5 21l5-12 2.5 2.4-7.5 9.6z" /></svg>
        )
    },
    {
        name: 'Slack', icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.5 15.5a1.5 1.5 0 1 1 0-3H7v3H5.5zM7 9.5H5.5a1.5 1.5 0 1 1 0-3H7v3zm1 0V8a1.5 1.5 0 1 1 3 0v1.5H8zm0 5h3v1.5a1.5 1.5 0 1 1-3 0V14.5zm5.5-5h1.5a1.5 1.5 0 1 1 0 3H13.5v-3zm0 5H15a1.5 1.5 0 1 1 0 3h-1.5v-3zm0-1.5V8a1.5 1.5 0 1 1 3 0v1.5h-3zm0 5v1.5a1.5 1.5 0 1 1-3 0V13h3z" /></svg>
        )
    },
    {
        name: 'Docker', icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.98 11.32h2.13v-2.13h-2.13v2.13zm-2.85 0h2.13v-2.13H11.1v2.13zm-2.86 0h2.13v-2.13H8.27v2.13zm-2.85 0h2.13v-2.13H5.42v2.13zm5.71-2.85h2.13V6.34H11.1v2.13zm2.85 0h2.13V6.34h-2.13v2.13zm-5.71 5.71h2.13v-2.13H8.27v2.13zm-2.85 0h2.13v-2.13H5.42v2.13zm5.71 0h2.13v-2.13H11.1v2.13zm2.85 0h2.13v-2.13h-2.13v2.13zm2.86-2.85h2.12v-2.13h-2.12v2.13zM23.4 10.36s-1.07-.96-3.2-.63c-.24-1.62-1.5-3.03-1.5-3.03s-1.27 1.5-1.27 3.27c0 .29.04.57.09.84-.46.21-1.36.5-2.54.5H1.05c-.34 1.36-.34 5.6 3.05 8.16 2.6 1.97 6.4 2.05 9.2.7 3.6-1.7 6.1-5.4 6.74-9.36 2.05.21 3.36-.45 3.36-.45z" /></svg>
        )
    },
    {
        name: 'Stripe', icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 6c-2.07 0-3.86 1.05-3.86 3.06 0 2.4 3.18 2.5 3.18 3.66 0 .47-.4.74-1.1.74-.94 0-2.34-.43-3.24-1l-.45 2.78c.84.5 2.27.93 3.65.93 2.36 0 4.04-1.13 4.04-3.18 0-2.5-3.2-2.6-3.2-3.68 0-.4.36-.7 1.07-.7.78 0 1.86.33 2.6.78l.45-2.7C15.86 6.3 14.7 6 13.5 6z" /></svg>
        )
    },
    {
        name: 'Figma', icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 1 0 0 8zM4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zM4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zM12 0h4a4 4 0 1 1 0 8h-4V0zM16 16a4 4 0 1 1-4-4 4 4 0 0 1 4 4z" /></svg>
        )
    },
]

export function IntegrationsSection() {
    return (
        <section className="section-sm bg-pr-bg overflow-hidden" aria-label="Integrations">
            <div className="container">
                <SectionHeader
                    tag="Integrations"
                    title="Works with the tools"
                    titleGrad="you already use."
                    subtitle="Connect Pixel Raider to your existing workflow — no rip-and-replace required."
                />
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4">
                    {INTEGRATIONS.map((tool, i) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-300 hover:border-cyan/25 hover:bg-cyan/[0.04] hover:-translate-y-1"
                        >
                            <div className="text-pr-text2 group-hover:text-cyan transition-colors">{tool.icon}</div>
                            <span className="text-xs font-mono text-pr-text3 group-hover:text-pr-text2 transition-colors">{tool.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}