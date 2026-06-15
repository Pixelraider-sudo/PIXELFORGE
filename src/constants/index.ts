import type { Division, Project, Stat } from '@/types'

export const DIVISIONS: Division[] = [
  {
    id: 'ai',
    icon: 'ai',
    name: 'Pixel Raider AI',
    description:
      'Chat, code generation, image synthesis, voice assistant, and intelligent workflow automation — all in one platform.',
    status: 'building',
    href: '/ai',
  },
  {
    id: 'labs',
    icon: 'labs',
    name: 'Pixel Raider Labs',
    description:
      'Experimental tech division: robotics firmware, IoT mesh networks, custom OS experiments, and drone autonomy software.',
    status: 'planned',
    href: '/labs',
  },
  {
    id: 'security',
    icon: 'security',
    name: 'Pixel Raider Security',
    description:
      'Zero-knowledge password manager, vulnerability scanner, AES-256 encryption tools, and real-time URL threat detection.',
    status: 'building',
    href: '/security',
  },
  {
    id: 'cloud',
    icon: 'cloud',
    name: 'Pixel Raider Cloud',
    description:
      'Managed cloud infrastructure, auto-scaling CI/CD pipelines, distributed monitoring, and serverless compute at the edge.',
    status: 'planned',
    href: '/cloud',
  },
  {
    id: 'mobile',
    icon: 'mobile',
    name: 'Pixel Raider Mobile',
    description:
      'Native Android (Kotlin + Jetpack Compose) and iOS (Swift + SwiftUI) applications across the full Pixel Raider ecosystem.',
    status: 'planned',
    href: '/mobile',
  },
  {
    id: 'community',
    icon: 'community',
    name: 'Pixel Raider Community',
    description:
      'Developer forums, global hackathons, leaderboards, team profiles, live events, and open coding challenges.',
    status: 'planned',
    href: '/community',
  },
  {
    id: 'garage',
    icon: 'garage',
    name: 'Pixel Raider Garage',
    description:
      'Smart vehicle companions, real-time digital dashboards, performance telemetry logging, and custom RGB lighting control.',
    status: 'planned',
    href: '/garage',
  },
  {
    id: 'marketplace',
    icon: 'marketplace',
    name: 'Pixel Raider Marketplace',
    description:
      'Buy and sell premium UI templates, components, plugins, AI prompt packs, developer courses, and productivity tools.',
    status: 'planned',
    href: '/marketplace',
  },
  {
    id: 'media',
    icon: 'media',
    name: 'Pixel Raider Media',
    description:
      'YouTube build logs, technical podcast, engineering blog, livestreamed dev sessions, tutorials, and developer documentation.',
    status: 'active',
    href: '/blog',
  },
]

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'pr-homepage',
    title: 'Pixel Raider Homepage',
    description:
      'The flagship brand website — Phase 1 & 2 of the full ecosystem. React, TypeScript, Tailwind, deployed on Vercel.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    status: 'live',
    featured: true,
    href: 'https://pixelforge-u8gc.vercel.app',
  },
  {
    id: 'pr-ai-cmd',
    title: 'AI Command Center',
    description:
      'Streaming AI chat interface powered by the Anthropic API with markdown rendering and full conversation history.',
    tags: ['React', 'Anthropic API', 'Streaming'],
    status: 'beta',
    featured: true,
  },
  {
    id: 'pr-backend',
    title: 'Backend Architecture',
    description:
      'Full authentication system, REST + GraphQL APIs, RBAC authorization layer, and multi-database strategy document.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL'],
    status: 'wip',
    featured: true,
  },
  {
    id: 'pr-security',
    title: 'Security Toolkit',
    description:
      'Zero-knowledge password manager, AES-256 encryption, real-time URL scanner, and file threat detection engine.',
    tags: ['TypeScript', 'Crypto API', 'WebCrypto'],
    status: 'coming-soon',
    featured: true,
  },
]

export const STATS: Stat[] = [
  { label: 'Lines of Code', value: '50K', suffix: '+' },
  { label: 'Ecosystem Divisions', value: '9', suffix: '' },
  { label: 'Planned Products', value: '12', suffix: '+' },
  { label: 'Years Vision', value: '5', suffix: 'yr' },
]

export const TECH_STACK = {
  frontend: ['React 18', 'TypeScript 5', 'Vite 5', 'Framer Motion', 'Tailwind CSS'],
  backend: ['Node.js', 'Express.js', 'NestJS', 'GraphQL', 'REST APIs', 'WebSockets'],
  databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase'],
  mobile: ['Kotlin', 'Jetpack Compose', 'Swift', 'SwiftUI'],
  cloud: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'GitHub Actions', 'Vercel'],
  ai: ['Anthropic API', 'OpenAI', 'RAG', 'Embeddings', 'AI Agents', 'Fine-tuning'],
} as const

export type RoadmapStatus = 'active' | 'building' | 'planned'

export const ROADMAP_PHASES: Array<{
  phase: number
  title: string
  status: RoadmapStatus
  items: string[]
}> = [
  {
    phase: 1,
    title: 'Brand & Foundation',
    status: 'active',
    items: ['Brand identity', 'Landing page', 'GitHub setup', 'Documentation'],
  },
  {
    phase: 2,
    title: 'React Components',
    status: 'building',
    items: ['Component library', 'Routing', 'Animations', 'Page transitions'],
  },
  {
    phase: 3,
    title: 'Backend & APIs',
    status: 'planned',
    items: ['REST APIs', 'Database schemas', 'Authentication', 'Rate limiting'],
  },
  {
    phase: 4,
    title: 'Dashboard',
    status: 'planned',
    items: ['User accounts', 'Admin panel', 'Analytics', 'Billing'],
  },
  {
    phase: 5,
    title: 'AI Integration',
    status: 'planned',
    items: ['AI chat', 'Code assistant', 'Image generation', 'Voice'],
  },
  {
    phase: 6,
    title: 'Mobile Apps',
    status: 'planned',
    items: ['Android app', 'iOS app', 'Push notifications'],
  },
  {
    phase: 7,
    title: 'Cloud & DevOps',
    status: 'planned',
    items: ['CI/CD pipelines', 'Monitoring', 'Auto-scaling', 'CDN'],
  },
  {
    phase: 8,
    title: 'Community & Market',
    status: 'planned',
    items: ['Forums', 'Marketplace', 'Media channels', 'Events'],
  },
  {
    phase: 9,
    title: 'Enterprise & Global',
    status: 'planned',
    items: ['Enterprise licensing', 'Global expansion', 'Partner network'],
  },
]
