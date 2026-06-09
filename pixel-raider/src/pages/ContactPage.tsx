import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageHero }        from '@/components/ui/PageHero'
import { ContactSection }  from '@/components/sections/ContactSection'
import { setPageMeta }     from '@/utils/seo'

const CHANNELS = [
  { icon: '📧', label: 'Email', value: 'hello@pixelraider.dev', href: 'mailto:hello@pixelraider.dev' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/pixelraider', href: 'https://github.com' },
  { icon: '🐦', label: 'Twitter / X', value: '@pixelraider', href: 'https://twitter.com' },
  { icon: '🔐', label: 'Security', value: 'security@pixelraider.dev', href: 'mailto:security@pixelraider.dev' },
]

export function ContactPage() {
  useEffect(() => {
    setPageMeta({ title: 'Contact', description: 'Get in touch with the Pixel Raider team.' })
  }, [])

  return (
    <>
      <PageHero
        tag="Contact"
        title="Let's build"
        titleGrad="something."
        subtitle="Partners, collaborators, security researchers, or just saying hello — we read every message."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="section bg-pr-bg">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Channels */}
            <div>
              <h2 className="font-display font-bold text-2xl mb-8">Other ways to reach us</h2>
              <div className="space-y-4">
                {CHANNELS.map((ch, i) => (
                  <motion.a
                    key={ch.label}
                    href={ch.href}
                    target={ch.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-cyan/30 hover:bg-cyan/5 transition-all group"
                  >
                    <span className="text-2xl">{ch.icon}</span>
                    <div>
                      <div className="text-xs text-pr-text3 font-mono uppercase tracking-widest mb-0.5">{ch.label}</div>
                      <div className="text-sm font-medium text-pr-text group-hover:text-cyan transition-colors">{ch.value}</div>
                    </div>
                    <svg className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </motion.a>
                ))}
              </div>
            </div>
            {/* Form */}
            <div>
              <h2 className="font-display font-bold text-2xl mb-8">Send a message</h2>
              <ContactSection compact />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
