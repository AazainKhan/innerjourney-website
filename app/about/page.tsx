import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import aboutData from '@/content/pages/about.json'
import { loadTinaDoc } from '@/lib/tina-page'
import type { AboutQuery } from '@/tina/__generated__/types'
import AboutPageClient from './AboutPageClient'

export function generateMetadata(): Metadata {
  return pageMetadata(aboutData.seo, {
    path: '/about',
    fallbackTitle: 'About Shanila - Confidence and Mindset Coach',
    fallbackDescription: 'Learn more about Shanila, a certified Confidence and Mindset Coach with over 10 years of experience helping people rewrite their story with clarity and confidence.',
    image: '/images/og-about.jpg',
    imageAlt: 'Meet Shanila Khan',
  })
}

export default async function AboutPage() {
  const page = await loadTinaDoc<AboutQuery>('about', 'about.json', aboutData)
  return <AboutPageClient {...page} />
}
