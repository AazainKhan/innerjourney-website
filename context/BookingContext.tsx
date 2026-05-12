'use client'

import { createContext, useContext, useEffect, useState } from 'react'

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

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  // Auto-open the modal when ?previewBooking=1 is in the URL — used by Tina
  // admin to render the booking form alongside the editor for side-by-side
  // preview of bookingForm.json edits.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('previewBooking') === '1') {
      setIsOpen(true)
      document.body.style.overflow = 'hidden'
    }
  }, [])

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        openBooking: () => { setIsOpen(true); document.body.style.overflow = 'hidden' },
        closeBooking: () => { setIsOpen(false); document.body.style.overflow = '' },
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
