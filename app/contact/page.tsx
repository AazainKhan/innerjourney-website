import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import pageData from '@/content/pages/contact.json'
import { loadTinaDoc } from '@/lib/tina-page'
import type { ContactQuery } from '@/tina/__generated__/types'
import ContactPageClient from './ContactPageClient'

export function generateMetadata(): Metadata {
  return pageMetadata(pageData.seo, {
    path: '/contact',
    fallbackTitle: 'Contact Shanila - Confidence and Mindset Coach | Get In Touch',
    fallbackDescription: "Ready to start your transformation? Contact Shanila today to book a free consultation or ask any questions about confidence and mindset coaching.",
    image: '/images/og-contact.jpg',
    imageAlt: "Let's connect",
  })
}

export default async function ContactPage() {
  const page = await loadTinaDoc<ContactQuery>('contact', 'contact.json', pageData)
  return <ContactPageClient {...page} />
}
