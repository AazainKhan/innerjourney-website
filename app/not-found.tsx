import type { Metadata } from 'next'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you’re looking for doesn’t exist — but your inner journey continues.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="page-hero brand-gradient-oxford-azure text-center">
      <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-carrot font-semibold text-sm uppercase tracking-widest mb-4">404 — Page Not Found</p>
          <h1 className="text-5xl md:text-7xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight">
            This page took a <span className="text-carrot">detour</span>
          </h1>
          <p className="text-lg md:text-xl text-on-secondary/90 leading-relaxed mb-10">
            The link you followed may be broken, or the page may have moved. Here are a few good places to land instead.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="primaryOnDark" size="lg">
              Back to home
            </Button>
            <Button href="/services" variant="ghostOnDark" size="lg">
              Explore services
            </Button>
            <Button href="/contact" variant="ghostOnDark" size="lg">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
