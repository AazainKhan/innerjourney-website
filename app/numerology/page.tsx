import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import pageData from '@/content/pages/numerology.json'
import { loadTinaDoc } from '@/lib/tina-page'
import JsonLd from '@/components/JsonLd'
import { serviceGraph } from '@/lib/seo/schema'
import type { NumerologyQuery } from '@/tina/__generated__/types'
import NumerologyClient from './NumerologyClient'

export function generateMetadata(): Metadata {
  return pageMetadata(pageData.seo, {
    path: '/numerology',
    fallbackTitle: 'Numerology - Vedic Numerology Readings',
    fallbackDescription: 'Get answers fast with a personalised numerology reading. Invaluable insight into your life choices, backed by ancient vedic practices. Book your session today.',
    image: '/images/og-default.jpg',
    imageAlt: 'Numerology with Shanila',
  })
}

export default async function NumerologyPage() {
  const page = await loadTinaDoc<NumerologyQuery>('numerology', 'numerology.json', pageData)
  return (
    <>
      <JsonLd data={serviceGraph({ name: 'Numerology', serviceType: 'Vedic numerology reading', path: '/numerology', description: pageData.seo?.description ?? '' })} />
      <NumerologyClient {...page} />
    </>
  )
}
