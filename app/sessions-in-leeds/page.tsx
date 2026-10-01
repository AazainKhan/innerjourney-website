import type { Metadata } from 'next'
import pageData from '@/content/pages/leeds.json'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { breadcrumbs, faqGraph } from '@/lib/seo/schema'
import { loadTinaDoc } from '@/lib/tina-page'
import { LEEDS_PAGE_PATH } from '@/lib/routes'
import type { LeedsQuery } from '@/tina/__generated__/types'
import LeedsClient from './LeedsClient'

export function generateMetadata(): Metadata {
  return pageMetadata(pageData.seo, {
    path: LEEDS_PAGE_PATH,
    fallbackTitle: 'Confidence & Mindset Coach in Leeds | Shanila Khan',
    fallbackDescription: 'Coaching and numerology sessions in Leeds, in person or online.',
    image: '/images/og-default.jpg',
    imageAlt: 'Sessions in Leeds with Shanila Khan',
  })
}

export default async function LeedsPage() {
  const page = await loadTinaDoc<LeedsQuery>('leeds', 'leeds.json', pageData)
  const faq = faqGraph(pageData.faq?.items ?? [], LEEDS_PAGE_PATH)
  faq['@graph'].push(breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Sessions in Leeds', path: LEEDS_PAGE_PATH }]) as never)
  return (
    <>
      <JsonLd data={faq} />
      <LeedsClient {...page} />
    </>
  )
}
