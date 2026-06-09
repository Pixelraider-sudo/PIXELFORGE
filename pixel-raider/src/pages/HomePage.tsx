import { useEffect } from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { EcosystemSection } from '@/components/sections/EcosystemSection'
import { RoadmapSection } from '@/components/sections/RoadmapSection'
import { TechSection } from '@/components/sections/TechSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { setPageMeta } from '@/utils/seo'

export function HomePage() {
  useEffect(() => {
    setPageMeta({
      title: 'Pixel Raider',
      description: 'Build Beyond Limits. A scalable technology ecosystem for developers, creators, and innovators.',
      keywords: 'Pixel Raider, AI, Development, Technology, Ecosystem, React, TypeScript',
    })
  }, [])

  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <EcosystemSection />
      <TechSection />
      <RoadmapSection />
      <ContactSection />
    </main>
  )
}
