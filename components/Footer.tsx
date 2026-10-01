'use client'

import Link from 'next/link'
import { tinaField, useTina } from 'tinacms/dist/react'
import Icon from '@/components/Icon'
import { present, type TinaDocProps } from '@/lib/use-tina-doc'
import type { FooterQuery } from '@/tina/__generated__/types'

function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

function LinkItem({ href, children, className, field }: { href: string; children: React.ReactNode; className?: string; field?: string }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} data-tina-field={field}>
        {children}
      </a>
    )
  }
  return <Link href={href} className={className} data-tina-field={field}>{children}</Link>
}

/** Site-wide footer. Edited in Tina under "Site › Footer"; updates live in the preview. */
export default function Footer(props: TinaDocProps<FooterQuery>) {
  const { data } = useTina<FooterQuery>(props)
  const f = data.footer
  const telDigits = (f?.phone ?? '').replace(/[^+\d]/g, '')

  return (
    <footer className="bg-oxford text-on-secondary py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 data-tina-field={tinaField(f, 'brandHeading')} className="text-2xl font-bold text-carrot mb-4">{f?.brandHeading}</h3>
            <p data-tina-field={tinaField(f, 'brandDescription')} className="text-on-secondary/85">{f?.brandDescription}</p>
            {f?.location && (
              <p data-tina-field={tinaField(f, 'location')} className="mt-4 flex items-start gap-2 text-sm text-on-secondary/85">
                <i className="fas fa-map-marker-alt mt-1 text-carrot" aria-hidden="true"></i>
                <span>{f.location}</span>
              </p>
            )}
          </div>
          <div>
            <h4 data-tina-field={tinaField(f, 'quickLinksHeading')} className="text-lg font-semibold mb-4">{f?.quickLinksHeading}</h4>
            <ul className="space-y-2">
              {present(f?.quickLinks).map((l, i) => (
                <li key={`${l.label}-${i}`}>
                  <LinkItem href={l.href || '#'} field={tinaField(l)} className="link-muted transition-colors">{l.label}</LinkItem>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 data-tina-field={tinaField(f, 'servicesHeading')} className="text-lg font-semibold mb-4">{f?.servicesHeading}</h4>
            <ul className="space-y-2">
              {present(f?.serviceLinks).map((l, i) => (
                <li key={`${l.label}-${i}`}>
                  <LinkItem href={l.href || '#'} field={tinaField(l)} className="link-muted transition-colors">{l.label}</LinkItem>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 data-tina-field={tinaField(f, 'connectHeading')} className="text-lg font-semibold mb-4">{f?.connectHeading}</h4>
            <div className="flex space-x-4 mb-4">
              {present(f?.socialLinks).map((s, i) => (
                <a
                  key={`${s.label}-${i}`}
                  href={s.href || '#'}
                  data-tina-field={tinaField(s)}
                  className="link-muted transition-colors text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label ?? undefined}
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-on-secondary/85 text-sm">
              {f?.email && (
                <div>
                  <span data-tina-field={tinaField(f, 'emailLabel')} className="font-semibold">{f.emailLabel}</span><br />
                  <a href={`mailto:${f.email}`} data-tina-field={tinaField(f, 'email')} className="underline">{f.email}</a>
                </div>
              )}
              {f?.phone && (
                <div>
                  <span data-tina-field={tinaField(f, 'phoneLabel')} className="font-semibold">{f.phoneLabel}</span><br />
                  <a href={`tel:${telDigits}`} data-tina-field={tinaField(f, 'phone')} className="underline">{f.phone}</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-on-secondary/70">
          <p data-tina-field={tinaField(f, 'copyright')}>{f?.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
