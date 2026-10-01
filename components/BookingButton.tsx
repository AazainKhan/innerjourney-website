'use client'

import { useBooking } from '@/context/BookingContext'
import Button from './Button'

interface BookingButtonProps {
  label?: string
  variant?: 'primary' | 'primaryOnDark' | 'secondary' | 'ghostOnDark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Tina click-to-edit target (tinaField(...)) for the label. */
  field?: string
}

export default function BookingButton({
  label = 'Book A Free Discovery Call',
  variant = 'primary',
  size = 'lg',
  className,
  field,
}: BookingButtonProps) {
  const { openBooking } = useBooking()
  return (
    <Button onClick={openBooking} variant={variant} size={size} className={className} data-tina-field={field || undefined}>
      {label}
    </Button>
  )
}
