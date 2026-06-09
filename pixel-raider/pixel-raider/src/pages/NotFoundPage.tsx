import { useEffect } from 'react'
import { setPageMeta } from '@/utils/seo'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  useEffect(() => {
    setPageMeta({ title: '404 — Not Found', description: 'Page not found.' })
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center text-center p-8" id="main-content" tabIndex={-1}>
      <div>
        <div
          className="font-display font-black text-[120px] leading-none mb-4"
          style={{background:'var(--grad)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}
        >
          404
        </div>
        <h1 className="font-display font-bold text-2xl text-[var(--text)] mb-3">Page Not Found</h1>
        <p className="text-[var(--text2)] mb-8">This sector of the Pixel Raider ecosystem doesn not exist yet.</p>
        <Button variant="primary" onClick={() => window.history.back()}>← Go Back</Button>
      </div>
    </main>
  )
}
