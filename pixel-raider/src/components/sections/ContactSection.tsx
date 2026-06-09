import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { isValidEmail, sanitizeString } from '@/utils/sanitize'
import { checkRateLimit } from '@/utils/sanitize'

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim() || form.name.length < 2) errs.name = 'Name must be at least 2 characters.'
    if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email address.'
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Message must be at least 10 characters.'
    if (form.message.length > 2000) errs.message = 'Message must be under 2000 characters.'
    return errs
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    // Rate limiting: 3 submissions per 60s per session
    if (!checkRateLimit('contact-form', 3, 60_000)) {
      setErrors({ form: 'Too many submissions. Please wait a minute before trying again.' })
      return
    }

    setStatus('sending')
    // Sanitize before sending
    const payload = {
      name: sanitizeString(form.name.trim()),
      email: form.email.trim().toLowerCase(),
      message: sanitizeString(form.message.trim()),
    }

    try {
      // Phase 3: replace with real API call
      await new Promise(r => setTimeout(r, 1200))
      console.warn('Contact form payload (Phase 3: send to API):', payload)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section relative overflow-hidden" aria-label="Contact form">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-[0.05] bg-[var(--violet)]" />
      </div>
      <div className="container relative z-10 max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[var(--cyan)] font-mono mb-4">
            <span className="w-8 h-px bg-[var(--cyan)]" aria-hidden="true" />
            Contact
            <span className="w-8 h-px bg-[var(--cyan)]" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-4xl mb-3">
            <span style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Get In Touch</span>
          </h2>
          <p className="text-[var(--text2)]">Partners, collaborators, or just want to say hello — we read every message.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
          {errors.form && (
            <div role="alert" className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{errors.form}</div>
          )}
          {status === 'sent' && (
            <div role="status" className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center">
              ✓ Message sent! We'll be in touch soon.
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="text-sm text-[var(--text2)] font-medium mb-1.5 block">Name</label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({...f, name: e.target.value}))}
                placeholder="Jane Mwangi"
                maxLength={100}
                autoComplete="name"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[var(--text)] placeholder-[var(--text3)] text-sm focus:outline-none focus:border-[var(--cyan)]/50 focus:ring-1 focus:ring-[var(--cyan)]/30 transition-all"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p id="name-error" role="alert" className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="text-sm text-[var(--text2)] font-medium mb-1.5 block">Email</label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({...f, email: e.target.value}))}
                placeholder="you@example.com"
                maxLength={254}
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[var(--text)] placeholder-[var(--text3)] text-sm focus:outline-none focus:border-[var(--cyan)]/50 focus:ring-1 focus:ring-[var(--cyan)]/30 transition-all"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm text-[var(--text2)] font-medium mb-1.5 block">Message</label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={e => setForm(f => ({...f, message: e.target.value}))}
                placeholder="Tell us about your project, collaboration idea, or inquiry..."
                rows={5}
                maxLength={2000}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[var(--text)] placeholder-[var(--text3)] text-sm focus:outline-none focus:border-[var(--cyan)]/50 focus:ring-1 focus:ring-[var(--cyan)]/30 transition-all resize-none"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              <div className="flex justify-between mt-1">
                {errors.message && <p id="message-error" role="alert" className="text-xs text-red-400">{errors.message}</p>}
                <span className="text-xs text-[var(--text3)] ml-auto font-mono">{form.message.length}/2000</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'sending'}
              className="w-full"
            >
              {status === 'sending' ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                  Sending...
                </>
              ) : 'Send Message →'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
