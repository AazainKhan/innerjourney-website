import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import homeData from '@/content/pages/home.json'
import testimonialsData from '@/content/testimonials.json'
import { loadTinaDoc } from '@/lib/tina-page'
import type { HomeQuery, TestimonialsQuery } from '@/tina/__generated__/types'
import HomePageClient from './HomePageClient'

export function generateMetadata(): Metadata {
  return pageMetadata(homeData.seo, {
    path: '/',
    fallbackTitle: 'Shanila - Confidence and Mindset Coach | Transform Your Journey',
    fallbackDescription: 'Transform your life with Shanila\'s expert Confidence and Mindset Coaching. Book A Consultation today and start your journey to success.',
    image: '/images/og-default.jpg',
    imageAlt: 'Your path back to purpose',
  })
}

export default async function HomePage() {
  const [page, testimonials] = await Promise.all([
    loadTinaDoc<HomeQuery>('home', 'home.json', homeData),
    loadTinaDoc<TestimonialsQuery>('testimonials', 'testimonials.json', testimonialsData),
  ])
  return <HomePageClient {...page} testimonials={testimonials} />
}
