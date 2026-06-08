/**
 * PIXEL RAIDER — App Constants
 * Single source of truth for static data.
 */
import type { Division, Project, Stat } from '@types'

export const DIVISIONS: Division[] = [
  { id: 'ai', icon: '🤖', name: 'Pixel Raider AI', description: 'Chat, code generation, image AI, voice assistant, and intelligent automation tools.', status: 'building', href: '/ai' },
  { id: 'labs', icon: '🔬', name: 'Pixel Raider Labs', description: 'Experimental tech: robotics, IoT, custom OS, smart home, and drone software.', status: 'planned', href: '/labs' },
  { id: 'security', icon: '🔐', name: 'Pixel Raider Security', description: 'Password manager, vulnerability scanner, encryption tools, and URL scanner.', status: 'building', href: '/security' },
  { id: 'cloud', icon: '☁️', name: 'Pixel Raider Cloud', description: 'Scalable cloud infrastructure, CI/CD pipelines, monitoring, and managed services.', status: 'planned', href: '/cloud' },
  { id: 'mobile', icon: '📱', name: 'Pixel Raider Mobile', description: 'Native Android (Kotlin) and iOS (Swift) applications for the ecosystem.', status: 'planned', href: '/mobile' },
  { id: 'community', icon: '👥', name: 'Pixel Raider Community', description: 'Forums, hackathons, leaderboards, developer profiles, and live events.', status: 'planned', href: '/community' },
  { id: 'garage', icon: '🚗', name: 'Pixel Raider Garage', description: 'Smart vehicle companions, digital dashboards, telemetry, and RGB concepts.', status: 'planned', href: '/garage' },
  { id: 'marketplace', icon: '🛒', name: 'Pixel Raider Marketplace', description: 'Templates, themes, components, plugins, courses, and AI prompts.', status: 'planned', href: '/marketplace' },
  { id: 'media', icon: '📺', name: 'Pixel Raider Media', description: 'YouTube, podcast, blog, tutorials, livestreams, and developer documentation.', status: 'active', href: '/blog' },
]

export const FEATURED_PROJECTS: Project[] = [
  { id: 'pr-homepage', title: 'Pixel Raider Homepage', description: 'The flagship brand website — Phase 1 of the full ecosystem.', tags: ['React', 'TypeScript', 'Framer Motion'], status: 'live', featured: true },
  { id: 'pr-ai-cmd', title: 'AI Command Center', description: 'Streaming AI chat interface powered by the Anthropic API.', tags: ['React', 'Anthropic API', 'WebSockets'], status: 'beta', featured: true },
  { id: 'pr-backend', title: 'Backend Architecture', description: 'Full auth, REST/GraphQL APIs, RBAC, and multi-database strategy.', tags: ['Node.js', 'PostgreSQL', 'Redis'], status: 'wip', featured: true },
  { id: 'pr-security', title: 'Security Toolkit', description: 'Password manager, URL scanner, and encryption utilities.', tags: ['TypeScript', 'Crypto API'], status: 'coming-soon', featured: true },
]

export const STATS: Stat[] = [
  { label: 'Lines of Code', value: '50K', suffix: '+' },
  { label: 'Ecosystem Divisions', value: '9', suffix: '' },
  { label: 'Planned Products', value: '12', suffix: '+' },
  { label: 'Years Vision', value: '5', suffix: 'yr' },
]

export const TECH_STACK = {
  frontend: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Tailwind CSS'],
  backend: ['Node.js', 'Express.js', 'NestJS', 'GraphQL', 'REST APIs'],
  databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
  mobile: ['Kotlin', 'Swift', 'Jetpack Compose', 'SwiftUI'],
  cloud: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'GitHub Actions'],
  ai: ['Anthropic API', 'RAG', 'Embeddings', 'AI Agents', 'Fine-tuning'],
} as const

export const ROADMAP_PHASES = [
  { phase: 1, title: 'Brand & Foundation', status: 'active', items: ['Brand identity', 'Landing page', 'GitHub setup', 'Documentation'] },
  { phase: 2, title: 'React Components', status: 'building', items: ['Component library', 'Routing', 'Animations', 'Dark/light mode'] },
  { phase: 3, title: 'Backend & APIs', status: 'planned', items: ['REST APIs', 'Database schemas', 'Authentication', 'Rate limiting'] },
  { phase: 4, title: 'Dashboard', status: 'planned', items: ['User accounts', 'Admin panel', 'Analytics', 'Billing'] },
  { phase: 5, title: 'AI Integration', status: 'planned', items: ['AI chat', 'Code assistant', 'Image generation', 'Voice'] },
  { phase: 6, title: 'Mobile Apps', status: 'planned', items: ['Android app', 'iOS app', 'Push notifications'] },
  { phase: 7, title: 'Cloud & DevOps', status: 'planned', items: ['CI/CD pipelines', 'Monitoring', 'Auto-scaling', 'CDN'] },
  { phase: 8, title: 'Community & Market', status: 'planned', items: ['Forums', 'Marketplace', 'Media channels', 'Events'] },
  { phase: 9, title: 'Enterprise & Global', status: 'planned', items: ['Enterprise licensing', 'Global expansion', 'Partner network'] },
] as const
