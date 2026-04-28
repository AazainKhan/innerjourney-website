'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown, type TinaMarkdownContent } from 'tinacms/dist/rich-text'
import type { ComponentProps } from 'react'
import BookingButton from '@/components/BookingButton'

// Render hero rich-text inline — strip the wrapping <p> so the surrounding
// <h1>/<p> in the JSX is the only block element. The `as any` works around
// Tina's `Components<>` generic constraint not composing with the base shape.
const inlineComponents: ComponentProps<typeof TinaMarkdown>['components'] = {
  p: (props: { children: React.ReactNode }) => <>{props.children}</>,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

interface ContactData {
  contact: {
    heroImage?: string | null
    heroHeading: TinaMarkdownContent
    heroSubtext: TinaMarkdownContent
    sectionHeading: string
    sectionSubtext: string
    email: string
    phone: string
    videoText: string
    location: string
    bookingCTALabel: string
    formHeading: string
  }
}

interface Props {
  query: string
  variables: { relativePath: string }
  data: ContactData
}

export default function ContactPageClient(props: Props) {
  const { data } = useTina<ContactData>({
    ...props,
    experimental___selectFormByFormId() {
      return `content/pages/${props.variables.relativePath}`
    },
  })
  const d = data.contact

  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setStatus(null)

    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formValues, form_type: 'contact' }),
      })
      const result = await res.json()
      if (result.success) {
        setStatus({ type: 'success', message: result.message || "Thank you! I'll be in touch soon." })
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus({ type: 'error', message: result.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const telDigits = (d.phone ?? '').replace(/[^+\d]/g, '')
  const contactItems: Array<{ icon: string; title: string; text: string; href?: string }> = [
    { icon: 'fa-envelope', title: 'Email', text: d.email, href: d.email ? `mailto:${d.email}` : undefined },
    { icon: 'fa-phone', title: 'Phone', text: d.phone, href: telDigits ? `tel:${telDigits}` : undefined },
    { icon: 'fa-video', title: 'Video Sessions', text: d.videoText },
    { icon: 'fa-map-marker-alt', title: 'Location', text: d.location },
  ]

  return (
    <>
      {/* Hero */}
      <section className="page-hero bg-black">
        <div className="absolute inset-0">
          <Image
            src={d.heroImage || '/images/contact-img-1200.webp'}
            alt="Contact background"
            fill
            className="object-cover object-center opacity-70"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-oxford/90 to-black/90"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-white font-dancing font-bold mb-6 leading-tight drop-shadow-2xl">
              <TinaMarkdown content={d.heroHeading} components={inlineComponents} />
            </h1>
            <p className="text-lg md:text-xl body-text-light text-white/90 leading-relaxed max-w-3xl mx-auto">
              <TinaMarkdown content={d.heroSubtext} components={inlineComponents} />
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  {d.sectionHeading}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {d.sectionSubtext}
                </p>
              </div>

              <div className="space-y-6">
                {contactItems.map((item) => (
                  <div key={item.title} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-oxford to-black rounded-lg flex items-center justify-center">
                      <i className={`fas ${item.icon} text-white text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-gray-600 hover:text-azure transition-colors">{item.text}</a>
                      ) : (
                        <p className="text-gray-600">{item.text}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex space-x-6 mt-8 justify-start">
                  {[
                    { href: 'https://www.facebook.com/innerjourneywithshanila/', icon: 'fa-facebook', gradient: 'from-azure to-azure/40', label: 'Facebook' },
                    { href: 'https://www.instagram.com/_.innerjourney_/', icon: 'fa-instagram', gradient: 'from-pink-500 to-yellow-400', label: 'Instagram' },
                    { href: 'https://www.youtube.com/channel/UCJbRrCiY4zXfojPTa17EKMg', icon: 'fa-youtube', gradient: 'from-red-600 to-red-400', label: 'YouTube' },
                    { href: 'https://api.whatsapp.com/send?phone=447387973382&', icon: 'fa-whatsapp', gradient: 'from-green-500 to-green-400', label: 'WhatsApp' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} className="transition-transform transform hover:scale-110" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      <span className={`inline-flex w-16 h-16 bg-gradient-to-br ${s.gradient} rounded-lg items-center justify-center shadow-lg`}>
                        <i className={`fab ${s.icon} text-white text-4xl`}></i>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <BookingButton label={d.bookingCTALabel} />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-carrot/5 p-8 rounded-lg shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {status && (
                  <div className={`p-4 mb-4 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status.message}
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{d.formHeading}</h3>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input type="text" id="name" name="name" required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-azure focus:border-transparent transition-all duration-200"
                    placeholder="Your full name" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-azure focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com" />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="flex space-x-2">
                    <select name="country_code" aria-label="Country code" className="w-1/4 px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-azure focus:border-transparent">
                      <option value="44">+44 (UK)</option>
                      <option value="1">+1 (US/CA)</option>
                      <option value="61">+61 (AU)</option>
                      <option value="971">+971 (UAE)</option>
                      <option value="91">+91 (IN)</option>
                      <option value="92">+92 (PK)</option>
                    </select>
                    <input type="tel" id="phone" name="phone"
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-azure focus:border-transparent"
                      placeholder="07xxx xxxxxx" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea id="message" name="message" required rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-azure focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell me about your goals, challenges, or questions..." />
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full bg-azure hover:bg-azure text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center disabled:opacity-60">
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send!'}
                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
