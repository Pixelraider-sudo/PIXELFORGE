# Security Policy — Pixel Raider

## Supported Versions

| Version | Supported |
|---|---|
| 0.1.x (Phase 1) | ✅ Yes |

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

### How to Report

1. **Email:** security@pixelraider.dev
2. **Subject:** `[SECURITY] Brief description`
3. **Include:** Description, steps to reproduce, impact, suggested fix (optional)
4. **PGP:** PGP key available at pixelraider.dev/pgp.txt

### Response Timeline

| Stage | SLA |
|---|---|
| Acknowledgment | 48 hours |
| Triage | 5 business days |
| Patch (critical) | 7 days |
| Patch (high) | 30 days |
| Patch (medium/low) | 90 days |

We follow responsible disclosure — you'll be credited in our Hall of Fame if desired.

## Security Measures

- HTTP Security Headers (CSP, HSTS, X-Frame-Options)
- Strict TypeScript typing
- ESLint security rules (no-eval, no-implied-eval)
- Gitleaks secret scanning in CI
- npm audit on every push
- Dependabot for automated security updates
- Environment secrets never in version control
