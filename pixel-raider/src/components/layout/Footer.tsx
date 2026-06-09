export function Footer() {
  const year = new Date().getFullYear()
  const cols = [
    { title: 'Platform', links: [['Home','#home'],['Ecosystem','#ecosystem'],['Projects','#projects'],['Roadmap','#roadmap']] },
    { title: 'Divisions', links: [['Pixel Raider AI','/ai'],['Labs','/labs'],['Security','/security'],['Community','/community']] },
    { title: 'Company', links: [['About','#about'],['Blog','/blog'],['Careers','/careers'],['Partners','/partners']] },
    { title: 'Legal', links: [['Privacy Policy','/privacy'],['Terms','/terms'],['Security','/security-policy'],['Contact','#contact']] },
  ]
  return (
    <footer className="relative border-t border-white/[0.06] bg-[var(--bg2)] pt-16 pb-8" role="contentinfo">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <span className="font-display font-bold text-sm tracking-wider" style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>PIXEL RAIDER</span>
            </div>
            <p className="text-xs text-[var(--text3)] leading-relaxed max-w-[200px]">Build Beyond Limits. A scalable technology ecosystem for builders.</p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-[var(--text2)] hover:text-[var(--cyan)] transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-[var(--text3)]">© {year} Pixel Raider. All rights reserved.</p>
          <p className="font-mono text-xs text-[var(--text3)]">v1.0.0 — Phase 1 // Build Beyond Limits</p>
        </div>
      </div>
    </footer>
  )
}
