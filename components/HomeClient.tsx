'use client'

import { useBooking } from '@/context/BookingContext'

interface HomeClientProps {
  buttonOnly?: boolean
  ctaLabel?: string
}

export default function HomeClient({ buttonOnly, ctaLabel }: HomeClientProps) {
  const { openBooking } = useBooking()

  function scrollToServices() {
    const el = document.getElementById('services')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (buttonOnly) {
    return (
      <button
        onClick={openBooking}
        className="btn-azure-outline text-lg px-8 py-3 button-text font-semibold animate-on-scroll"
      >
        {ctaLabel ?? 'Book A Consultation'}
      </button>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end animate-on-scroll">
      <button onClick={openBooking} className="btn-azure text-sm px-6 py-2 button-text">
        Start Your Journey
      </button>
      <button onClick={scrollToServices} className="btn-azure-outline text-sm px-6 py-2 button-text">
        Learn More
      </button>
    </div>
  )
}
