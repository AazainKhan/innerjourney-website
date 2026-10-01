import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import servicesData from '@/content/pages/services.json'
import { loadTinaDoc } from '@/lib/tina-page'
import type { ServicesQuery } from '@/tina/__generated__/types'
import ServicesPageClient from './ServicesPageClient'

export function generateMetadata(): Metadata {
  return pageMetadata(servicesData.seo, {
    path: '/services',
    fallbackTitle: 'Services - Coaching & Numerology',
    fallbackDescription: 'Explore Shanila\'s coaching services including Mindset Coaching, Career Coaching, and Numerology. Find the right path for your transformation.',
    image: '/images/og-default.jpg',
    imageAlt: 'Services with Shanila',
  })
}

export default async function ServicesPage() {
  const page = await loadTinaDoc<ServicesQuery>('services', 'services.json', servicesData)
  return <ServicesPageClient {...page} />
}
