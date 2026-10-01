import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import pageData from '@/content/pages/clarity-coaching.json'
import { loadTinaDoc } from '@/lib/tina-page'
import JsonLd from '@/components/JsonLd'
import { serviceGraph } from '@/lib/seo/schema'
import type { ClarityCoachingQuery } from '@/tina/__generated__/types'
import MindsetCoachingClient from './MindsetCoachingClient'

export function generateMetadata(): Metadata {
  return pageMetadata(pageData.seo, {
    path: '/mindset-coaching',
    fallbackTitle: 'Mindset Coaching - Transform Your Life in 12 Weeks',
    fallbackDescription: "Get answers and transform your life in just 12 weeks. Discover the missing piece to achieving lasting change with Shanila's compassionate mindset coaching.",
    image: '/images/og-default.jpg',
    imageAlt: 'Mindset Coaching with Shanila',
  })
}

export default async function MindsetCoachingPage() {
  const page = await loadTinaDoc<ClarityCoachingQuery>('clarityCoaching', 'clarity-coaching.json', pageData)
  return (
    <>
      <JsonLd data={serviceGraph({ name: 'Mindset Coaching', serviceType: 'Mindset coaching', path: '/mindset-coaching', description: pageData.seo?.description ?? '' })} />
      <MindsetCoachingClient {...page} />
    </>
  )
}
