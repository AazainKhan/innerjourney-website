import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import pageData from '@/content/pages/career-coaching.json'
import { loadTinaDoc } from '@/lib/tina-page'
import JsonLd from '@/components/JsonLd'
import { serviceGraph } from '@/lib/seo/schema'
import type { CareerCoachingQuery } from '@/tina/__generated__/types'
import CareerCoachingClient from './CareerCoachingClient'

export function generateMetadata(): Metadata {
  return pageMetadata(pageData.seo, {
    path: '/career-coaching',
    fallbackTitle: 'Career Coaching - Feel Clear and Confident in Your Career',
    fallbackDescription: "Feel clear and confident in your career again. Transform your career in just 12 weeks with Shanila's compassionate career coaching programme.",
    image: '/images/og-default.jpg',
    imageAlt: 'Career Coaching with Shanila',
  })
}

export default async function CareerCoachingPage() {
  const page = await loadTinaDoc<CareerCoachingQuery>('careerCoaching', 'career-coaching.json', pageData)
  return (
    <>
      <JsonLd data={serviceGraph({ name: 'Career Coaching', serviceType: 'Career coaching', path: '/career-coaching', description: pageData.seo?.description ?? '' })} />
      <CareerCoachingClient {...page} />
    </>
  )
}
