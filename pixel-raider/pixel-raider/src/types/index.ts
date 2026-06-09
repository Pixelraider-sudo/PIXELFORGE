/**
 * PIXEL RAIDER — Global Type Definitions
 * Shared interfaces consumed across the app.
 */

export interface NavItem {
  label: string
  path: string
  external?: boolean
  badge?: string
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'live' | 'beta' | 'coming-soon' | 'wip'
  href?: string
  github?: string
  featured?: boolean
}

export interface Division {
  id: string
  icon: string
  name: string
  description: string
  status: 'active' | 'building' | 'planned'
  href: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar?: string
  social?: {
    github?: string
    twitter?: string
    linkedin?: string
  }
}

export interface Stat {
  label: string
  value: string
  suffix?: string
}

export type Theme = 'dark' | 'light'

export interface SEOMeta {
  title: string
  description: string
  keywords?: string
  ogImage?: string
}
