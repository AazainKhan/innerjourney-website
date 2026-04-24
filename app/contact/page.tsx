import type { Metadata } from 'next'
import contactData from '@/content/pages/contact.json'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Shanila - Clarity and Mindset Coach | Get In Touch',
  description: "Ready to start your transformation? Contact Shanila today to book a free consultation or ask any questions about clarity and mindset coaching.",
  alternates: { canonical: 'https://innerjourney-with-shanila.com/contact' },
  openGraph: {
    title: 'Contact Shanila - Clarity and Mindset Coach',
    description: 'Get in touch for a free consultation or to start your coaching journey.',
    url: 'https://innerjourney-with-shanila.com/contact',
    images: [{ url: '/images/contact-img.jpg' }],
  },
}

const QUERY = `
  query Contact($relativePath: String!) {
    contact(relativePath: $relativePath) {
      heroHeading
      heroSubtext
      sectionHeading
      sectionSubtext
      email
      phone
      videoText
      location
      bookingCTALabel
      formHeading
    }
  }
`

export default function ContactPage() {
  return (
    <ContactPageClient
      query={QUERY}
      variables={{ relativePath: 'contact.json' }}
      data={{ contact: contactData }}
    />
  )
}
