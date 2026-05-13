'use client'

import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown, type TinaMarkdownContent } from 'tinacms/dist/rich-text'
import BookingButton from '@/components/BookingButton'
import RichText from '@/components/RichText'

interface ServicesData {
  services: {
    heroHeading: string
    heroSubtext: TinaMarkdownContent
    services: ({
      title?: string | null
      duration?: string | null
      description?: string | null
      icon?: string | null
      href?: string | null
      buttonLabel?: string | null
      highlights?: string | null
      isThisForYou?: string | null
      colorScheme?: string | null
    } | null)[] | null
    ctaHeading: string
    ctaSubtext: string
    ctaButtonLabel: string
  }
}

interface Props {
  query: string
  variables: { relativePath: string }
  data: ServicesData
}

const SERVICE_COLOR_BUNDLES = {
  oxford: {
    gradient: 'brand-gradient-oxford',
    textClass: 'text-on-secondary',
    textSoftClass: 'text-on-secondary/90',
    textMutedClass: 'text-on-secondary/60',
    btnColor: 'text-oxford',
  },
  orange: {
    gradient: 'brand-gradient-orange',
    textClass: 'text-on-primary',
    textSoftClass: 'text-on-primary/90',
    textMutedClass: 'text-on-primary/60',
    btnColor: 'text-carrot',
  },
} as const

export default function ServicesPageClient(props: Props) {
  const { data } = useTina<ServicesData>({
    ...props,
    experimental___selectFormByFormId() {
      return `content/pages/${props.variables.relativePath}`
    },
  })
  const d = data.services
  const cards = (d.services || []).filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <>
      <section className="page-hero bg-oxford">
        <div className="absolute top-0 right-0 w-96 h-96 bg-carrot/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-azure/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <RichText as="h1" className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight">{d.heroHeading}</RichText>
            <div className="text-lg md:text-xl body-text-light text-on-secondary/90 leading-relaxed max-w-3xl mx-auto space-y-4 [&_strong]:font-semibold [&_em]:italic">
              <TinaMarkdown content={d.heroSubtext} />
            </div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-azure/10 to-azure/10"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-carrot/30 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-azure/30 rounded-full blur-3xl"></div>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="space-y-16 max-w-5xl mx-auto">
              {cards.map((s, i) => {
                const bundle = SERVICE_COLOR_BUNDLES[(s.colorScheme as keyof typeof SERVICE_COLOR_BUNDLES)] || SERVICE_COLOR_BUNDLES.oxford
                const highlights = (s.highlights || '').split('\n').map((h) => h.trim()).filter(Boolean)
                return (
                  <div key={s.title || i} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''} animate-on-scroll`}>
                    <div className={`${bundle.gradient} ${bundle.textClass} p-10 rounded-2xl shadow-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="text-5xl mb-6"><i className={`fas ${s.icon || ''}`}></i></div>
                      <span className={`inline-block ${bundle.textMutedClass} text-sm uppercase tracking-widest mb-2`}>{s.duration}</span>
                      <h2 className="text-3xl font-bold mb-4">{s.title}</h2>
                      <p className={`${bundle.textSoftClass} mb-6 text-lg leading-relaxed`}>{s.description}</p>
                      <ul className="space-y-2 mb-8">
                        {highlights.map((h) => (
                          <li key={h} className="flex items-center gap-3">
                            <i className={`fas fa-check ${bundle.textClass} flex-shrink-0`}></i>
                            <span className={bundle.textSoftClass}>{h}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={s.href || '#'} className={`bg-white ${bundle.btnColor} hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block text-center`}>
                        {s.buttonLabel}
                      </Link>
                    </div>
                    <div className={`space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <h3 className="text-2xl font-bold text-gray-900">Is this for you?</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{s.isThisForYou}</p>
                      <Link href={s.href || '#'} className="inline-flex items-center gap-2 text-azure font-semibold hover:underline">
                        Learn more about {(s.title || '').toLowerCase()} <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6 animate-on-scroll">
              {d.ctaHeading}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-on-scroll">
              {d.ctaSubtext}
            </p>
            <BookingButton label={d.ctaButtonLabel} className="animate-on-scroll" />
          </div>
        </section>
      </div>
    </>
  )
}
