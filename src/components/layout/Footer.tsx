import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { isValidEmail } from '@/utils/sanitize'

const COLS = [
  { title: 'Platform', links: [['Home', '/'], ['Ecosystem', '/ecosystem'], ['Features', '/features'], ['Pricing', '/pricing'], ['Projects', '/projects']] },
  { title: 'Divisions', links: [['Pixel Raider AI', '/ai'], ['Labs', '/labs'], ['Security', '/security'], ['Community', '/community']] },
  { title: 'Company', links: [['About', '/about'], ['Blog', '/blog'], ['Careers', '/about'], ['Partners', '/about']] },
  { title: 'Legal', links: [['Privacy Policy', '/about'], ['Terms', '/about'], ['Security Policy', '/security'], ['Contact', '/contact']] },
]

const SOCIALS = [
  {
    label: 'GitHub', href: 'https://github.com', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
    )
  },
  {
    label: 'Twitter/X', href: 'https://twitter.com', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
    )
  },
  {
    label: 'Discord', href: '#', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
    )
  },
]

const COMPLIANCE_BADGES = [
  { label: 'SOC 2 Type II', icon: '🛡️' },
  { label: 'GDPR Ready', icon: '🔒' },
  { label: 'HIPAA Eligible', icon: '⚕️' },
]

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setStatus('error')
      return
    }
    // No backend yet — Phase 3 will wire this to an email service (Mailchimp / Resend / Buttondown)
    setStatus('success')
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm">
      <label htmlFor="footer-newsletter" className="sr-only">Email address</label>
      <input
        id="footer-newsletter"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value); setStatus('idle') }}
        placeholder="you@example.com"
        className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-[var(--text)] placeholder-[var(--text3)] outline-none transition-all focus:border-[var(--cyan)]/50 focus:ring-1 focus:ring-[var(--cyan)]/20"
        aria-describedby="newsletter-status"
      />
      <button
        type="submit"
        className="px-4 py-2.5 rounded-xl text-sm font-semibold text-black whitespace-nowrap transition-all hover:scale-[1.02]"
        style={{ background: 'linear-gradient(135deg, #00C8E8, #6E54F7)' }}
      >
        Subscribe
      </button>
      <p id="newsletter-status" role="status" className="sr-only">
        {status === 'success' ? 'Subscribed successfully' : status === 'error' ? 'Please enter a valid email' : ''}
      </p>
      {status === 'success' && (
        <span className="text-xs text-emerald-400 sm:hidden">✓ You're on the list!</span>
      )}
      {status === 'error' && (
        <span className="text-xs text-rose-400 sm:hidden">Enter a valid email</span>
      )}
    </form>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.06] bg-[var(--bg2)] pt-16 pb-8" role="contentinfo">
      <div className="container">
        {/* Newsletter row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-12 mb-12 border-b border-white/[0.06]">
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--text)] mb-1.5">Stay in the loop</h3>
            <p className="text-sm text-[var(--text2)]">Get notified about new divisions, features, and build-log updates.</p>
          </div>
          <NewsletterForm />
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group" aria-label="Pixel Raider home">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00C8E8, #6E54F7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className="font-display font-bold text-sm tracking-wider" style={{ background: 'linear-gradient(135deg, #00C8E8, #6E54F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                PIXEL RAIDER
              </span>
            </Link>
            <p className="text-xs text-[var(--text3)] leading-relaxed max-w-[200px] mb-5">
              Build Beyond Limits. A scalable technology ecosystem for builders.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-[var(--text3)] hover:text-[var(--cyan)] hover:border-[var(--cyan)]/30 hover:bg-[var(--cyan)]/5 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {COLS.map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--text3)] font-mono mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-[var(--text2)] hover:text-[var(--cyan)] transition-colors duration-150">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-10 border-b border-white/[0.06]">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--text3)] mr-2">Compliance</span>
          {COMPLIANCE_BADGES.map(badge => (
            <span key={badge.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-white/[0.07] bg-white/[0.03] text-[var(--text2)]">
              <span aria-hidden="true">{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text3)]">© {year} Pixel Raider. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[var(--text3)]">v2.0.0 — Phase 2 Active</span>
            <span className="w-1 h-1 rounded-full bg-[var(--cyan)] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-mono text-[var(--cyan)]">Build Beyond Limits</span>
          </div>
        </div>
      </div>
    </footer>
  )
}