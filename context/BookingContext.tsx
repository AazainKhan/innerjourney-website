'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getCalApi } from '@calcom/embed-react'

interface BookingContextType {
  isOpen: boolean
  openBooking: () => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  openBooking: () => {},
  closeBooking: () => {},
})

const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME
const CAL_EVENT_SLUG = process.env.NEXT_PUBLIC_CAL_EVENT_SLUG || 'discovery-call'
const CAL_ENABLED = Boolean(CAL_USERNAME)

/** Fired on window whenever the booking modal (Cal or the fallback form) opens. */
export const BOOKING_OPEN_EVENT = 'innerjourney:booking-open'

export function BookingProvider({ children }: { children: React.ReactNode }) {
  // Only used by the legacy email-only booking form. When CAL_ENABLED is
  // true `openBooking` triggers Cal's native modal directly and `isOpen`
  // stays false — BookingOverlay then renders nothing.
  const [isOpen, setIsOpen] = useState(false)

  function openBooking() {
    // Lets other floating UI (the newsletter popup) step aside while booking.
    window.dispatchEvent(new Event(BOOKING_OPEN_EVENT))
    if (CAL_ENABLED) {
      // Fire-and-forget — getCalApi resolves once the global Cal script
      // is loaded (already preloaded by <CalPreloader/> on mount).
      ;(async () => {
        try {
          const cal = await getCalApi({ namespace: CAL_EVENT_SLUG })
          cal('modal', { calLink: `${CAL_USERNAME}/${CAL_EVENT_SLUG}` })
        } catch {
          // If Cal fails to load, fall back to the legacy form so users
          // can still reach out.
          setIsOpen(true)
          document.body.style.overflow = 'hidden'
        }
      })()
      return
    }
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function closeBooking() {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  // Auto-open the modal on the Tina preview route for the booking form
  // (/preview/booking-form.json) so edits show side-by-side. ?previewBooking=1
  // still works for manual checks. In Cal mode this opens Cal's modal.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('previewBooking') === '1' || window.location.pathname === '/preview/booking-form.json') {
      openBooking()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
