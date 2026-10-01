import type { Metadata } from 'next'
import HomePage from '@/app/page'
import ContactPage from '@/app/contact/page'
import ResourcesPage from '@/app/resources/page'

// Editor-only preview for documents that don't have a page of their own.
// Renders the page that shows the document; the page's Tina hook then opens
// that document's form (see lib/tina-select.ts).
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function PreviewPage({ params }: { params: Promise<{ doc: string[] }> }) {
  const { doc } = await params
  const [first] = doc
  if (first === 'podcasts') return <ResourcesPage />
  if (first === 'booking-form.json') return <ContactPage />
  return <HomePage />
}
