'use client'

import { useBooking } from '@/context/BookingContext'

interface BookingButtonProps {
  label?: string
  className?: string
}

export default function BookingButton({ label = 'Book A Free Clarity Call', className = 'btn-azure button-text' }: BookingButtonProps) {
  const { openBooking } = useBooking()
  return (
    <button onClick={openBooking} className={className}>
      {label}
    </button>
  )
}
