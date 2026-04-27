import Link from 'next/link'
import footerData from '@/content/footer.json'

function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

function LinkItem({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return <Link href={href} className={className}>{children}</Link>
}

export default function Footer() {
  const f = footerData
  const telDigits = (f.phone ?? '').replace(/[^+\d]/g, '')

  return (
    <footer className="bg-oxford text-platinum py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-carrot mb-4">{f.brandHeading}</h3>
            <p className="text-platinum">{f.brandDescription}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{f.quickLinksHeading}</h4>
            <ul className="space-y-2">
              {(f.quickLinks ?? []).map((l) => (
                <li key={`${l.label}-${l.href}`}>
                  <LinkItem href={l.href} className="link-muted transition-colors">{l.label}</LinkItem>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{f.servicesHeading}</h4>
            <ul className="space-y-2">
              {(f.serviceLinks ?? []).map((l) => (
                <li key={`${l.label}-${l.href}`}>
                  <LinkItem href={l.href} className="link-muted transition-colors">{l.label}</LinkItem>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{f.connectHeading}</h4>
            <div className="flex space-x-4 mb-4">
              {(f.socialLinks ?? []).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="link-muted transition-colors text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <i className={`fab ${s.icon}`}></i>
                </a>
              ))}
            </div>
            <div className="space-y-2 text-platinum text-sm">
              {f.email && (
                <div>
                  <span className="font-semibold">{f.emailLabel}</span><br />
                  <a href={`mailto:${f.email}`} className="underline">{f.email}</a>
                </div>
              )}
              {f.phone && (
                <div>
                  <span className="font-semibold">{f.phoneLabel}</span><br />
                  <a href={`tel:${telDigits}`} className="underline">{f.phone}</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-platinum/80">
          <p>{f.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
