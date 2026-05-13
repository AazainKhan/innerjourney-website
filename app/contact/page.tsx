import type { Metadata } from 'next'
import contactData from '@/content/pages/contact.json'
import client from '@/tina/__generated__/client'
import ContactPageClient from './ContactPageClient'

const inline = (s: string) => ({ type: 'root', children: [{ type: 'p', children: [{ type: 'text', text: s }] }] })

export const metadata: Metadata = {
  title: 'Contact Shanila - Confidence and Mindset Coach | Get In Touch',
  description: "Ready to start your transformation? Contact Shanila today to book a free consultation or ask any questions about confidence and mindset coaching.",
  alternates: { canonical: 'https://innerjourney-with-shanila.com/contact' },
  openGraph: {
    title: 'Contact Shanila - Confidence and Mindset Coach',
    description: 'Get in touch for a free consultation or to start your coaching journey.',
    url: 'https://innerjourney-with-shanila.com/contact',
    images: [{ url: '/images/og-contact.jpg', width: 1200, height: 630, alt: "Let's Connect" }],
  },
}

export default async function ContactPage() {
  const res = await client.queries
    .contact({ relativePath: 'contact.json' })
    .catch(() => null)

  if (!res) {
    return (
      <ContactPageClient
        query=""
        variables={{ relativePath: 'contact.json' }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={{ contact: { ...contactData, heroHeading: inline(contactData.heroHeading), heroSubtext: inline(contactData.heroSubtext) } as any }}
      />
    )
  }

  return (
    <ContactPageClient
      query={res.query}
      variables={res.variables}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={res.data as any}
    />
  )
}
