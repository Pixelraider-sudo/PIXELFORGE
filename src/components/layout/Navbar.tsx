import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'Ecosystem', href: '/#ecosystem' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Projects', href: '/#projects' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[var(--bg)]/90 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      )}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-[68px]" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Pixel Raider home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] flex items-center justify-center shadow-[0_0_16px_rgba(0,200,232,0.4)] group-hover:shadow-[0_0_24px_rgba(0,200,232,0.6)] transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg tracking-wider">
              <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>PIXEL</span>
              <span className="text-[var(--text)]"> RAIDER</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    className="px-3.5 py-2 rounded-lg text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] hover:bg-white/5 transition-all duration-150"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="px-3.5 py-2 rounded-lg text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] hover:bg-white/5 transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-[var(--text2)] hover:text-[var(--cyan)] hover:border-[var(--cyan)]/30 transition-all"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>

            {/* Get Started CTA — desktop */}
            <Button
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => navigate('/contact')}
            >
              Get Started Free
            </Button>

            {/* Mock user avatar dropdown — desktop */}
            <div className="hidden lg:block relative" ref={avatarRef}>
              <button
                onClick={() => setAvatarOpen(o => !o)}
                aria-label="Account menu"
                aria-expanded={avatarOpen}
                className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 hover:border-[var(--cyan)]/40 transition-all flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(0,200,232,0.15), rgba(110,84,247,0.15))' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              {avatarOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/[0.08] bg-[var(--bg)]/95 backdrop-blur-xl p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  role="menu"
                >
                  <div className="px-3 py-2.5 border-b border-white/[0.06] mb-1">
                    <p className="text-sm font-medium text-[var(--text)]">Guest Builder</p>
                    <p className="text-xs text-[var(--text3)] font-mono">Free plan</p>
                  </div>
                  {[
                    ['Dashboard', '/contact'],
                    ['Pricing', '/pricing'],
                    ['Documentation', '/about'],
                    ['Sign Out', '/'],
                  ].map(([label, to]) => (
                    <Link
                      key={label}
                      to={to}
                      onClick={() => setAvatarOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-white/5 transition-all"
                      role="menuitem"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              }
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--bg)]/95 backdrop-blur-xl border-b border-white/[0.07] p-4" role="dialog" aria-label="Mobile menu">
            <ul className="flex flex-col gap-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/#') ? (
                    <a href={link.href} className="block px-4 py-3 rounded-lg text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-white/5 transition-all" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="block px-4 py-3 rounded-lg text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-white/5 transition-all" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="flex gap-2 mt-3 pt-3 border-t border-white/[0.07]">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { setMobileOpen(false); navigate('/pricing') }}>
                  View Pricing
                </Button>
                <Button variant="primary" size="sm" className="flex-1" onClick={() => { setMobileOpen(false); navigate('/contact') }}>
                  Get Started
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}