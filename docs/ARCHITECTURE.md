# Architecture — Pixel Raider

## Phase 1: Foundation Architecture

### Technology Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, SEO, edge-ready, file-based routing |
| Language | TypeScript 5 (strict) | Type safety catches bugs at compile time |
| Styling | Tailwind CSS + CSS Variables | Utility-first, design tokens, no runtime |
| Fonts | next/font (Google Fonts) | Self-hosted, no external requests at runtime |
| Linting | ESLint + security rules | Prevents common security anti-patterns |

### Directory Convention

- `src/app/` — Next.js App Router pages and API routes
- `src/components/ui/` — Primitive, reusable UI components (Button, Input, Card...)
- `src/components/layout/` — NavBar, Footer, Sidebar — structural chrome
- `src/components/sections/` — Full page sections (Hero, Ecosystem, Roadmap...)
- `src/constants/` — Single source of truth for all static data
- `src/types/` — Global TypeScript interfaces and type aliases
- `src/lib/` — Pure utility functions with no side effects
- `src/hooks/` — Custom React hooks

### Security Architecture

```
Request → Edge (Vercel) → Security Headers → Next.js → API Route → Validation → Handler
                ↑                               ↑
         CSP / HSTS                    Auth middleware (Phase 3)
         Rate limiting                 Input sanitization
         DDoS protection              RBAC
```

## Phase 3: Backend Architecture (Planned)

### Auth Stack
- NextAuth.js v5 — session management
- JWT (short-lived) + Refresh tokens (httpOnly cookies)
- OAuth2: Google, GitHub, Apple, Microsoft
- TOTP-based MFA
- RBAC: guest → user → pro → admin → superadmin

### API Design
- RESTful with versioning: `/api/v1/`
- Rate limiting per IP + per user
- Request validation with Zod
- Response envelopes: `{ success, data, error, meta }`

### Database Strategy
- PostgreSQL — relational data (users, auth, billing)
- MongoDB — document data (projects, content, AI history)
- Redis — sessions, cache, rate limiting, queues
