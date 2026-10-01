'use client'

import { useBooking } from '@/context/BookingContext'

interface HomeClientProps {
  buttonOnly?: boolean
  ctaLabel?: string
  /** Label for the hero's second button, which scrolls to the services. */
  secondaryLabel?: string
  /** Tina click-to-edit targets for the two buttons. */
  ctaField?: string
  secondaryField?: string
  /** "outline" = azure text + border on light bg (default).
   *  "onAzure" = white text + white border, for use on the blue gradient section. */
  variant?: 'outline' | 'onAzure'
}

export default function HomeClient({ buttonOnly, ctaLabel, secondaryLabel, ctaField, secondaryField, variant = 'outline' }: HomeClientProps) {
  const { openBooking } = useBooking()

  function scrollToServices() {
    const el = document.getElementById('services')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (buttonOnly) {
    const className = variant === 'onAzure'
      ? 'bg-white text-azure hover:bg-azure/5 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-azure border border-white/40 button-text animate-on-scroll'
      : 'btn-azure-outline text-lg px-8 py-3 button-text font-semibold animate-on-scroll'
    return (
      <button onClick={openBooking} className={className} data-tina-field={ctaField || undefined}>
        {ctaLabel || 'Book A Consultation'}
      </button>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end animate-on-scroll">
      <button onClick={openBooking} className="btn-azure text-sm px-6 py-2 button-text" data-tina-field={ctaField || undefined}>
        {ctaLabel || 'Start Your Journey'}
      </button>
      {secondaryLabel && (
        <button onClick={scrollToServices} className="btn-azure-outline text-sm px-6 py-2 button-text" data-tina-field={secondaryField || undefined}>
          {secondaryLabel}
        </button>
      )}
    </div>
  )
}
