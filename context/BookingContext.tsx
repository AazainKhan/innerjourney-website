'use client'

import { createContext, useContext, useState } from 'react'

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
