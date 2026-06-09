# Security Policy — Pixel Raider

## Reporting a Vulnerability

**DO NOT** open a public GitHub issue for security vulnerabilities.

Send a detailed report to: **security@pixelraider.dev**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We aim to respond within **48 hours** and resolve within **7 days** for critical issues.

## Scope

| Division | Status |
|----------|--------|
| pixelraider.dev (frontend) | In scope |
| api.pixelraider.dev (Phase 3) | In scope |
| GitHub repositories | In scope |

## Security Measures (Phase 1)

- Content Security Policy (CSP) headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff  
- Strict-Transport-Security (HSTS)
- Input sanitization on all user-facing forms
- Rate limiting on contact form submissions
- No secrets in version control (enforced via .gitignore)
- ESLint security plugin (eslint-plugin-security)
- Prototype pollution guard (Object.freeze)
- npm audit in CI pipeline
- Source maps disabled in production

## Phase 3+ Additions

- JWT with refresh token rotation
- Argon2id password hashing
- CSRF tokens
- Redis rate limiting
- SQL parameterized queries only
- RBAC authorization layer
- Security audit logs
