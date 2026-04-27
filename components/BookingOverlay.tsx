'use client'

import { useState, useRef, useEffect } from 'react'
import { useBooking } from '@/context/BookingContext'
import CalEmbed from './CalEmbed'

const CAL_ENABLED = Boolean(process.env.NEXT_PUBLIC_CAL_USERNAME)

interface BookingFormCopy {
  overlayTitle: string
  firstNameLabel: string
  lastNameLabel: string
  emailLabel: string
  countryCodeLabel: string
  phoneLabel: string
  serviceLabel: string
  messageLabel: string
  messagePlaceholder: string
  submitLabel: string
  submittingLabel: string
  successMessage: string
  errorMessage: string
  services: string[]
}

const COUNTRY_CODES = [
  { value: '44', label: 'UK (+44)' },
  { value: '1', label: 'USA (+1)' },
  { value: '91', label: 'India (+91)' },
  { value: '61', label: 'Australia (+61)' },
  { value: '92', label: 'Pakistan (+92)' },
  { value: '971', label: 'UAE (+971)' },
  { value: '966', label: 'Saudi Arabia (+966)' },
  { value: '1', label: 'Canada (+1)' },
  { value: '49', label: 'Germany (+49)' },
  { value: '33', label: 'France (+33)' },
  { value: '39', label: 'Italy (+39)' },
  { value: '34', label: 'Spain (+34)' },
  { value: '31', label: 'Netherlands (+31)' },
  { value: '27', label: 'South Africa (+27)' },
  { value: '64', label: 'New Zealand (+64)' },
  { value: '86', label: 'China (+86)' },
  { value: '81', label: 'Japan (+81)' },
]

export default function BookingOverlay({ copy }: { copy: BookingFormCopy }) {
  const { isOpen, closeBooking } = useBooking()
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!isOpen) setStatus(null)
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setStatus(null)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, form_type: 'booking' }),
      })
      const result = await res.json()
      if (result.success) {
        setStatus({ type: 'success', message: result.message || copy.successMessage })
        formRef.current?.reset()
      } else {
        setStatus({ type: 'error', message: result.error || copy.errorMessage })
      }
    } catch {
      setStatus({ type: 'error', message: copy.errorMessage })
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      id="booking-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-overlay-title"
      className="fixed inset-0 flex items-start justify-center overflow-y-auto py-4 md:py-8"
      style={{ zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeBooking() }}
    >
      <div
        id="overlay-content"
        className="relative w-full max-w-2xl m-4 bg-white rounded-lg shadow-2xl overflow-y-auto"
        style={{ maxHeight: '95vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeBooking}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
          aria-label="Close booking form"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="sticky top-0 bg-oxford text-white p-3 md:p-4 rounded-t-lg z-10">
          <h2 id="booking-overlay-title" className="text-xl font-bold text-center">{copy.overlayTitle}</h2>
        </div>

        <div className="p-3 md:p-4 space-y-2">
          {CAL_ENABLED ? (
            <CalEmbed />
          ) : (<>
          <div role="status" aria-live="polite" aria-atomic="true" className={status ? '' : 'sr-only'}>
            {status && (
              <div className={`p-4 mb-4 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status.message}
              </div>
            )}
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            {/* Honeypot — bots auto-fill this, humans never see it. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
              className="absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <label htmlFor="b-first-name" className="block text-xs font-medium text-gray-700 mb-0.5">{copy.firstNameLabel} *</label>
                <input type="text" id="b-first-name" name="first_name" required aria-required="true"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent"
                  placeholder={copy.firstNameLabel} />
              </div>
              <div>
                <label htmlFor="b-last-name" className="block text-xs font-medium text-gray-700 mb-0.5">{copy.lastNameLabel} *</label>
                <input type="text" id="b-last-name" name="last_name" required aria-required="true"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent"
                  placeholder={copy.lastNameLabel} />
              </div>
            </div>

            <div>
              <label htmlFor="b-email" className="block text-xs font-medium text-gray-700 mb-0.5">{copy.emailLabel} *</label>
              <input type="email" id="b-email" name="email" required aria-required="true"
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent"
                placeholder="your@email.com" />
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <label htmlFor="b-country-code" className="block text-xs font-medium text-gray-700 mb-0.5">{copy.countryCodeLabel} *</label>
                <select id="b-country-code" name="country_code" required aria-required="true"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent">
                  {COUNTRY_CODES.map((c, i) => (
                    <option key={`${c.value}-${i}`} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="b-phone" className="block text-xs font-medium text-gray-700 mb-0.5">{copy.phoneLabel}</label>
                <input type="tel" id="b-phone" name="phone"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent"
                  placeholder="07xxx xxxxxx" />
              </div>
            </div>

            <div>
              <label htmlFor="b-service" className="block text-xs font-medium text-gray-700 mb-0.5">{copy.serviceLabel} *</label>
              <select id="b-service" name="service" required aria-required="true"
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent">
                <option value="">Select a service…</option>
                {copy.services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="b-message" className="block text-xs font-medium text-gray-700 mb-0.5">{copy.messageLabel}</label>
              <textarea id="b-message" name="message" rows={3}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent resize-none"
                placeholder={copy.messagePlaceholder} />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-azure text-white hover:brightness-110 shadow-azure font-semibold py-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {copy.submittingLabel}
                </>
              ) : copy.submitLabel}
            </button>
          </form>
          </>)}
        </div>
      </div>
    </div>
  )
}
