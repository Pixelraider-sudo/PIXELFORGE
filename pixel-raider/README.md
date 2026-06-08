# PIXEL RAIDER 🚀

**Build Beyond Limits** — A scalable technology ecosystem for developers, creators, and innovators.

[![CI](https://github.com/pixelraider/pixel-raider/actions/workflows/ci.yml/badge.svg)](https://github.com/pixelraider/pixel-raider/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node 20+](https://img.shields.io/badge/node-20+-green.svg)](https://nodejs.org)

## Quick Start

```bash
# Clone
git clone https://github.com/pixelraider/pixel-raider.git
cd pixel-raider

# Use correct Node version
nvm use

# Install
npm install

# Copy env
cp .env.example .env

# Dev server
npm run dev
```

Open http://localhost:5173

## Project Structure

```
pixel-raider/
├── public/               # Static assets, security headers, manifest
│   ├── _headers          # Netlify/Cloudflare security headers
│   ├── robots.txt        # SEO + security (blocks /api, /admin)
│   └── manifest.json     # PWA manifest
├── src/
│   ├── components/
│   │   ├── common/       # Shared non-UI components
│   │   ├── layout/       # Navbar, Footer, Layout wrappers
│   │   ├── sections/     # Page sections (Hero, Ecosystem, etc.)
│   │   └── ui/           # Atomic design tokens: Button, Card, Badge
│   ├── config/           # App config + env validation
│   ├── constants/        # Static data (divisions, roadmap, tech stack)
│   ├── context/          # React context (Theme)
│   ├── hooks/            # Custom hooks (useScrollReveal, useMediaQuery)
│   ├── lib/              # Third-party wrappers
│   ├── pages/            # Route-level page components
│   ├── styles/           # Global CSS design system
│   ├── types/            # TypeScript interfaces
│   └── utils/            # Utilities: sanitize, seo, cn
├── .github/
│   └── workflows/        # CI, CD, security audit
├── vite.config.ts        # Vite + security headers + chunk splitting
├── tsconfig.json         # Strict TypeScript
├── .eslintrc.cjs         # ESLint + security plugin
└── SECURITY.md           # Vulnerability reporting policy
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Lint + security scan |
| `npm run type-check` | TypeScript check |
| `npm run format` | Format code |
| `npm test` | Run tests |

## Tech Stack (Phase 1)

- **Framework**: React 18 + TypeScript 5
- **Build**: Vite 5 (Brotli + Gzip compression)
- **Animation**: Framer Motion
- **Fonts**: Orbitron + Syne + JetBrains Mono
- **Quality**: ESLint (security plugin) + Prettier + Vitest

## Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Brand, Landing Page, GitHub | ✅ Active |
| 2 | React Components, Routing | ⚡ Building |
| 3 | Backend, APIs, Auth | 📋 Planned |
| 4 | Dashboard, Analytics | 📋 Planned |
| 5 | AI Integration | 📋 Planned |
| 6 | Mobile Apps | 📋 Planned |
| 7 | Cloud, CI/CD | 📋 Planned |
| 8 | Community, Marketplace | 📋 Planned |
| 9 | Enterprise, Global | 📋 Planned |

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting and current security posture.

---

**Pixel Raider** — Built with purpose. Shipped with precision.
