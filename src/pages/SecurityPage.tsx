import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageHero }    from '@/components/ui/PageHero'
import { Card }        from '@/components/ui/Card'
import { setPageMeta } from '@/utils/seo'

const TOOLS = [
  { icon: '🔑', title: 'Password Manager', desc: 'Zero-knowledge encrypted vault. Local-first with optional cloud sync.', status: 'Phase 3' },
  { icon: '🔍', title: 'URL Scanner', desc: 'Real-time malicious URL detection powered by threat intelligence feeds.', status: 'Phase 3' },
  { icon: '🛡️', title: 'Vulnerability Scanner', desc: 'Automated scanning for common web vulnerabilities in your projects.', status: 'Phase 4' },
  { icon: '🔒', title: 'Encryption Tools', desc: 'File and text encryption using AES-256-GCM with secure key management.', status: 'Phase 3' },
  { icon: '📁', title: 'File Scanner', desc: 'Malware and threat detection for uploaded files before processing.', status: 'Phase 4' },
  { icon: '📊', title: 'Security Reports', desc: 'Detailed audit reports for your Pixel Raider projects and configurations.', status: 'Phase 5' },
]

const POSTURE = [
  { label: 'CSP Headers', done: true },
  { label: 'HSTS + Preload', done: true },
  { label: 'Input Sanitization', done: true },
  { label: 'Rate Limiting', done: true },
  { label: 'Prototype Pollution Guard', done: true },
  { label: 'ESLint Security Plugin', done: true },
  { label: 'JWT Auth (Phase 3)', done: false },
  { label: 'Redis Rate Limiting (Phase 3)', done: false },
  { label: 'RBAC (Phase 4)', done: false },
  { label: 'Security Audit Logs (Phase 4)', done: false },
]

export function SecurityPage() {
  useEffect(() => {
    setPageMeta({ title: 'Security', description: 'Pixel Raider Security division — tools, posture, and reporting.' })
  }, [])

  return (
    <>
      <PageHero
        tag="Pixel Raider Security"
        title="Security is not"
        titleGrad="a feature."
        subtitle="It's the foundation. Every Pixel Raider product is built with a security-first architecture from day one — not bolted on after."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Ecosystem', to: '/ecosystem' }, { label: 'Security' }]}
      />

      {/* Current security posture */}
      <section className="section bg-pr-bg2 border-y border-white/[0.06]">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan">Current Posture</span>
            <h2 className="font-display font-bold text-3xl mt-2">Phase 1 & 2 Hardening</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POSTURE.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <span className={`text-base flex-shrink-0 ${item.done ? 'text-emerald-400' : 'text-pr-text3'}`}>
                  {item.done ? '✓' : '○'}
                </span>
                <span className={`text-sm font-mono ${item.done ? 'text-pr-text' : 'text-pr-text3'}`}>{item.label}</span>
                {!item.done && <span className="ml-auto text-xs text-pr-text3 border border-white/10 px-2 py-0.5 rounded-full">Planned</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future tools */}
      <section className="section bg-pr-bg">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan">Security Division</span>
            <h2 className="font-display font-bold text-4xl mt-2">Upcoming <span className="grad-text">Tools</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{tool.icon}</span>
                    <span className="text-xs font-mono text-pr-text3 border border-white/10 px-2 py-1 rounded-full">{tool.status}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-pr-text mb-2">{tool.title}</h3>
                  <p className="text-sm text-pr-text2 leading-relaxed">{tool.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-pr-text3 mt-10">
            To report a vulnerability, see{' '}
            <a href="/security-policy" className="text-cyan hover:underline">SECURITY.md</a>{' '}
            or email <span className="text-cyan font-mono">security@pixelraider.dev</span>
          </p>
        </div>
      </section>
    </>
  )
}
