// ============================================================
//  Pixel Raider — Home Page (Phase 1)
//  Server Component — no client-side state here
// ============================================================

import type { Metadata } from "next";
import { APP, ROADMAP, ECOSYSTEM, TECH_STACK } from "@/constants";

export const metadata: Metadata = {
  title: `${APP.NAME} — ${APP.TAGLINE}`,
};

// ── Sub-components (inline for Phase 1 simplicity) ─────────

function NavBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-12 h-16"
      style={{ background: "rgba(8,12,26,0.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,200,232,0.08)" }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-3 group" aria-label="Pixel Raider home">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-display font-black"
          style={{ background: "linear-gradient(135deg, #00C8E8, #6E54F7)" }}
        >
          PR
        </div>
        <span className="font-display font-bold text-base text-pr-text tracking-wider">
          PIXEL<span className="grad-text">RAIDER</span>
        </span>
      </a>

      {/* Nav links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-1" role="list">
        {[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Projects", href: "/projects" },
          { label: "Labs", href: "/labs" },
          { label: "Docs", href: "/docs" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            role="listitem"
            className="px-4 py-2 rounded-pr text-sm font-medium text-pr-text-2 hover:text-pr-cyan hover:bg-white/[0.04] transition-all duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <a
          href={APP.GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm px-4 py-2"
          aria-label="View Pixel Raider on GitHub (opens in new tab)"
        >
          GitHub
        </a>
        <a href="/auth/register" className="btn-primary text-sm px-4 py-2">
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg scanline"
      aria-labelledby="hero-heading"
    >
      {/* Background radial glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(0,200,232,0.4) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(110,84,247,0.5) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      {/* Animated corner brackets */}
      <div aria-hidden="true" className="absolute top-24 left-8 w-8 h-8 opacity-30" style={{ borderTop: "2px solid #00C8E8", borderLeft: "2px solid #00C8E8" }} />
      <div aria-hidden="true" className="absolute top-24 right-8 w-8 h-8 opacity-30" style={{ borderTop: "2px solid #00C8E8", borderRight: "2px solid #00C8E8" }} />
      <div aria-hidden="true" className="absolute bottom-24 left-8 w-8 h-8 opacity-30" style={{ borderBottom: "2px solid #6E54F7", borderLeft: "2px solid #6E54F7" }} />
      <div aria-hidden="true" className="absolute bottom-24 right-8 w-8 h-8 opacity-30" style={{ borderBottom: "2px solid #6E54F7", borderRight: "2px solid #6E54F7" }} />

      <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">
        {/* Status pill */}
        <div className="flex justify-center mb-8">
          <span className="section-tag animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-pr-cyan animate-pulse-cyan inline-block" />
            Phase 1 — Foundation Active
          </span>
        </div>

        {/* Main headline */}
        <h1
          id="hero-heading"
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards", opacity: 0 }}
        >
          <span className="text-pr-text">BUILD</span>
          <br />
          <span className="grad-text">BEYOND</span>
          <br />
          <span className="text-pr-text">LIMITS</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-pr-text-2 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards", opacity: 0 }}
        >
          Pixel Raider is a scalable technology ecosystem spanning{" "}
          <span className="text-pr-cyan">AI</span>,{" "}
          <span className="text-pr-cyan">mobile</span>,{" "}
          <span className="text-pr-cyan">cloud</span>,{" "}
          <span className="text-pr-cyan">security</span>, and developer tools.
          Built to last. Built to scale.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards", opacity: 0 }}
        >
          <a href="/auth/register" className="btn-primary text-base px-8 py-3.5">
            Join the Waitlist →
          </a>
          <a href="#ecosystem" className="btn-ghost text-base px-8 py-3.5">
            Explore Ecosystem
          </a>
        </div>

        {/* Terminal badge */}
        <div
          className="mt-16 inline-flex items-center gap-3 glass rounded-pr px-5 py-3 animate-fade-up"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards", opacity: 0 }}
        >
          <span className="font-mono text-xs text-pr-text-3">v{APP.VERSION}</span>
          <span className="w-px h-4 bg-pr-border" />
          <span className="font-mono text-xs text-pr-cyan">Phase 1 — Active</span>
          <span className="w-px h-4 bg-pr-border" />
          <span className="font-mono text-xs text-pr-text-3">9 Phases Planned</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <span className="font-mono text-xs text-pr-text-3 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-pr-cyan to-transparent animate-float" />
      </div>
    </section>
  );
}

function EcosystemSection() {
  const statusColors = {
    live:     { bg: "rgba(16,209,122,0.1)", text: "#10D17A", border: "rgba(16,209,122,0.2)" },
    building: { bg: "rgba(0,200,232,0.1)",  text: "#00C8E8", border: "rgba(0,200,232,0.2)" },
    planned:  { bg: "rgba(74,90,130,0.1)",  text: "#4A5A82", border: "rgba(74,90,130,0.2)" },
  } as const;

  return (
    <section id="ecosystem" className="py-32 px-4 md:px-8" aria-labelledby="ecosystem-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag mb-4 inline-block">✦ Ecosystem</span>
          <h2 id="ecosystem-heading" className="section-title mb-4">
            One Platform.<br />
            <span className="grad-text">Infinite Divisions.</span>
          </h2>
          <p className="text-pr-text-2 text-lg max-w-xl mx-auto">
            Every division is a product in itself — built modularly so each can scale independently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ECOSYSTEM.map((item, i) => {
            const colors = statusColors[item.status];
            return (
              <article
                key={item.key}
                className="pr-card group cursor-default"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full capitalize"
                    style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-pr-text mb-2 text-sm tracking-wider">
                  {item.label.toUpperCase()}
                </h3>
                <p className="text-pr-text-3 text-xs leading-relaxed mb-3">{item.description}</p>
                <div className="font-mono text-xs text-pr-text-3">
                  Phase <span className="text-pr-violet">{item.phase}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  const statusStyle = {
    active:   { bar: "linear-gradient(90deg,#00C8E8,#6E54F7)", dot: "#00C8E8", label: "Active" },
    complete: { bar: "#10D17A", dot: "#10D17A", label: "Complete" },
    planned:  { bar: "rgba(74,90,130,0.4)", dot: "#4A5A82", label: "Planned" },
  } as const;

  return (
    <section
      id="roadmap"
      className="py-32 px-4 md:px-8"
      style={{ background: "rgba(8,12,26,0.6)", borderTop: "1px solid rgba(0,200,232,0.06)", borderBottom: "1px solid rgba(0,200,232,0.06)" }}
      aria-labelledby="roadmap-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag mb-4 inline-block">✦ Roadmap</span>
          <h2 id="roadmap-heading" className="section-title mb-4">
            5-Year <span className="grad-text">Master Plan</span>
          </h2>
          <p className="text-pr-text-2 text-lg max-w-xl mx-auto">
            9 phases. Every phase ships something real. No vaporware.
          </p>
        </div>

        {/* Phase timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROADMAP.map((phase, i) => {
            const style = statusStyle[phase.status];
            const isActive = phase.status === "active";
            return (
              <article
                key={phase.phase}
                className="relative glass rounded-pr-lg p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: isActive ? "rgba(0,200,232,0.3)" : "rgba(255,255,255,0.06)",
                  boxShadow: isActive ? "0 0 30px rgba(0,200,232,0.1)" : undefined,
                }}
                aria-label={`Phase ${phase.phase}: ${phase.title}`}
              >
                {/* Phase number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded"
                    style={{ background: isActive ? "rgba(0,200,232,0.15)" : "rgba(255,255,255,0.05)", color: isActive ? "#00C8E8" : "#4A5A82" }}
                  >
                    PHASE {String(phase.phase).padStart(2, "0")}
                  </div>
                  <span
                    className="text-xs font-mono"
                    style={{ color: isActive ? "#00C8E8" : "#4A5A82" }}
                  >
                    {phase.eta}
                  </span>
                </div>

                <h3 className="font-display font-bold text-pr-text text-base mb-2 tracking-wide">
                  {phase.title}
                </h3>
                <p className="text-pr-text-3 text-xs mb-4 leading-relaxed">{phase.description}</p>

                {/* Items */}
                <ul className="space-y-1.5" aria-label={`Phase ${phase.phase} deliverables`}>
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs font-mono text-pr-text-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: style.dot }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Progress bar */}
                <div className="mt-5 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: phase.status === "active" ? "30%" : phase.status === "complete" ? "100%" : "0%",
                      background: style.bar,
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section id="tech" className="py-32 px-4 md:px-8" aria-labelledby="tech-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag mb-4 inline-block">✦ Tech Stack</span>
          <h2 id="tech-heading" className="section-title mb-4">
            Built With <span className="grad-text">Best-in-Class</span> Technology
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TECH_STACK.map((cat) => (
            <div key={cat.label} className="glass rounded-pr-lg p-5">
              <h3 className="font-mono text-xs font-bold text-pr-cyan tracking-widest mb-4 uppercase">
                {cat.label}
              </h3>
              <ul className="space-y-2" aria-label={`${cat.label} technologies`}>
                {cat.items.map((tech) => (
                  <li key={tech} className="flex items-center gap-2 text-sm text-pr-text-2 font-mono">
                    <span className="w-1 h-1 rounded-full bg-pr-cyan/50 flex-shrink-0" aria-hidden="true" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      id="cta"
      className="py-32 px-4 md:px-8 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(0,200,232,0.05), rgba(110,84,247,0.08))", borderTop: "1px solid rgba(0,200,232,0.08)" }}
      aria-labelledby="cta-heading"
    >
      <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 id="cta-heading" className="section-title mb-6">
          Ready to <span className="grad-text">Build Beyond</span> Limits?
        </h2>
        <p className="text-pr-text-2 text-lg mb-10">
          Join the Pixel Raider waitlist. Be among the first to access the ecosystem when Phase 3 launches.
        </p>

        {/* Email capture form — Phase 1 placeholder */}
        <form
          action="/api/waitlist"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          aria-label="Waitlist signup form"
        >
          {/* CSRF protection will be added in Phase 3 with full backend */}
          <label htmlFor="waitlist-email" className="sr-only">Email address</label>
          <input
            id="waitlist-email"
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder="your@email.com"
            autoComplete="email"
            className="flex-1 px-4 py-3 rounded-pr text-sm font-mono text-pr-text placeholder-pr-text-3 focus:outline-none focus:ring-1 focus:ring-pr-cyan"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,200,232,0.2)" }}
          />
          <button type="submit" className="btn-primary text-sm px-6 py-3 whitespace-nowrap">
            Claim Your Spot →
          </button>
        </form>

        <p className="mt-4 text-xs text-pr-text-3 font-mono">
          No spam. No selling your data. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

function FooterSection() {
  const year = new Date().getFullYear();
  const footerLinks = [
    { label: "About",     href: "/about" },
    { label: "Projects",  href: "/projects" },
    { label: "Docs",      href: "/docs" },
    { label: "GitHub",    href: APP.GITHUB, external: true },
    { label: "Privacy",   href: "/privacy" },
    { label: "Terms",     href: "/terms" },
    { label: "Security",  href: "/security" },
    { label: "Contact",   href: `mailto:${APP.EMAIL}`, external: true },
  ];

  return (
    <footer
      className="py-12 px-4 md:px-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#050810" }}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3" aria-label="Pixel Raider home">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-display font-black"
              style={{ background: "linear-gradient(135deg, #00C8E8, #6E54F7)" }}
            >
              PR
            </div>
            <span className="font-display font-bold text-sm text-pr-text tracking-wider">
              PIXEL<span className="grad-text">RAIDER</span>
            </span>
          </a>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-mono text-pr-text-3 hover:text-pr-cyan transition-colors duration-200"
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="font-mono text-xs text-pr-text-3">
            © {year} {APP.NAME}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-pr-text-3">
            Built with{" "}
            <span className="text-pr-cyan">♦</span>{" "}
            by Pixel Raider — v{APP.VERSION}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Page ────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <NavBar />
      <main id="main-content">
        <HeroSection />
        <EcosystemSection />
        <RoadmapSection />
        <TechStackSection />
        <CtaSection />
      </main>
      <FooterSection />
    </>
  );
}
