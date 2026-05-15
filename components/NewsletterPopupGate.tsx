'use client'

import { usePathname } from 'next/navigation'
import NewsletterPopup from './NewsletterPopup'

// Mount the newsletter popup on every page EXCEPT /resources — that page
// already has a dedicated newsletter signup section at the bottom, so the
// floating popup + sticky pill would just be visual noise there.
export default function NewsletterPopupGate() {
  const pathname = usePathname()
  if (pathname?.startsWith('/resources')) return null
  return <NewsletterPopup />
}
