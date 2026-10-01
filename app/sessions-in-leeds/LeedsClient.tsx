'use client'

import Link from 'next/link'
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import BookingButton from '@/components/BookingButton'
import HighlightedText from '@/components/HighlightedText'
import Icon from '@/components/Icon'
import { lines, present, usePageDoc, type TinaDocProps } from '@/lib/use-tina-doc'
import type { LeedsQuery } from '@/tina/__generated__/types'

export default function LeedsClient(props: TinaDocProps<LeedsQuery>) {
  const { leeds: d } = usePageDoc<LeedsQuery>(props)
  const { hero, intro, offerings, whoIHelp, howItWorks, whyShanila, faq, closingCta } = d

  return (
    <>
      {/* Hero */}
      <section className="page-hero brand-gradient-oxford-azure">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <span data-tina-field={tinaField(hero, 'eyebrow')} className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6">{hero?.eyebrow}</span>
            <h1 data-tina-field={tinaField(hero, 'heading')} className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight">
              {hero?.heading}
            </h1>
            <div data-tina-field={tinaField(hero, 'subtext')} className="text-lg md:text-xl text-on-secondary/90 mb-8 leading-relaxed max-w-3xl mx-auto space-y-4 [&_strong]:font-semibold [&_em]:italic">
              <TinaMarkdown content={hero?.subtext} />
            </div>
            <BookingButton label={hero?.buttonLabel || undefined} field={tinaField(hero, 'buttonLabel')} />
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-white to-azure/10"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] left-10 w-[28rem] h-[28rem] bg-azure/20 rounded-full blur-3xl"></div>

        {/* Introduction */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 data-tina-field={tinaField(intro, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-8">
                <HighlightedText text={intro?.heading} highlight={intro?.highlight} highlightClassName="text-carrot font-bold" />
              </h2>
              <div data-tina-field={tinaField(intro, 'body')} className="space-y-5 text-lg md:text-xl text-gray-700 leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-semibold [&_em]:italic">
                <TinaMarkdown content={intro?.body} />
              </div>
            </div>
          </div>
        </section>

        {/* Coaching on offer */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 data-tina-field={tinaField(offerings, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">{offerings?.heading}</h2>
                <p data-tina-field={tinaField(offerings, 'subtext')} className="text-lg md:text-xl text-gray-600">{offerings?.subtext}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {present(offerings?.items).map((item, i) => (
                  <div key={item.title || i} data-tina-field={tinaField(item)} className="bg-white rounded-2xl p-8 shadow-lg flex flex-col">
                    <div className="w-14 h-14 rounded-full bg-carrot/10 text-carrot text-2xl flex items-center justify-center mb-5" data-tina-field={tinaField(item, 'icon')}>
                      <Icon name={item.icon} />
                    </div>
                    <h3 data-tina-field={tinaField(item, 'title')} className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p data-tina-field={tinaField(item, 'description')} className="text-gray-600 leading-relaxed mb-6 flex-grow">{item.description}</p>
                    {item.href && item.linkLabel && (
                      <Link href={item.href} data-tina-field={tinaField(item, 'linkLabel')} className="text-azure font-semibold hover:underline">
                        {item.linkLabel} <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who I help + why Shanila */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
                <h2 data-tina-field={tinaField(whoIHelp, 'heading')} className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-6">{whoIHelp?.heading}</h2>
                <ul data-tina-field={tinaField(whoIHelp, 'items')} className="space-y-4">
                  {lines(whoIHelp?.items).map((line) => (
                    <li key={line} className="flex items-start gap-3 text-lg text-gray-700">
                      <i className="fas fa-check text-carrot mt-1.5 flex-shrink-0" aria-hidden="true"></i>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="brand-gradient-oxford rounded-2xl p-8 md:p-10 shadow-lg text-on-secondary">
                <h2 data-tina-field={tinaField(whyShanila, 'heading')} className="text-3xl md:text-4xl heading-secondary text-on-secondary mb-6">{whyShanila?.heading}</h2>
                <ul data-tina-field={tinaField(whyShanila, 'points')} className="space-y-4 mb-8">
                  {lines(whyShanila?.points).map((line) => (
                    <li key={line} className="flex items-start gap-3 text-lg text-on-secondary/90">
                      <i className="fas fa-certificate text-carrot mt-1.5 flex-shrink-0" aria-hidden="true"></i>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                {whyShanila?.linkLabel && (
                  <Link href="/about" data-tina-field={tinaField(whyShanila, 'linkLabel')} className="btn-azure-outline font-semibold inline-block">
                    {whyShanila.linkLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* In person or online */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <h2 data-tina-field={tinaField(howItWorks, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-10 text-center">{howItWorks?.heading}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { block: howItWorks?.inPerson, icon: 'fas fa-map-marker-alt text-carrot', bubble: 'bg-carrot/10' },
                  { block: howItWorks?.online, icon: 'fas fa-globe text-azure', bubble: 'bg-azure/10' },
                ].map(({ block, icon, bubble }, i) => (
                  <div key={i} data-tina-field={tinaField(block)} className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className={`w-14 h-14 rounded-full ${bubble} text-2xl flex items-center justify-center mb-5`}>
                      <i className={icon} aria-hidden="true"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{block?.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{block?.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Questions and answers */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 data-tina-field={tinaField(faq, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-10 text-center">{faq?.heading}</h2>
              <div className="space-y-4">
                {present(faq?.items).map((item, i) => (
                  <details key={i} data-tina-field={tinaField(item)} className="group bg-white rounded-2xl shadow-md open:shadow-lg transition-shadow" open={i === 0}>
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6 text-lg font-semibold text-gray-900">
                      <span>{item.question}</span>
                      <i className="fas fa-chevron-down text-azure transition-transform group-open:rotate-180" aria-hidden="true"></i>
                    </summary>
                    <p className="px-6 pb-6 -mt-2 text-gray-700 leading-relaxed">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Closing call to action */}
      <section className="py-20 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 data-tina-field={tinaField(closingCta, 'heading')} className="text-3xl md:text-4xl font-bold text-on-accent mb-6">
            <HighlightedText text={closingCta?.heading} highlight={closingCta?.highlight} highlightClassName="text-carrot font-bold" />
          </h2>
          <div data-tina-field={tinaField(closingCta, 'body')} className="text-lg md:text-xl text-on-accent/90 mb-10 max-w-2xl mx-auto space-y-4 [&_strong]:text-on-accent [&_strong]:font-semibold [&_em]:italic">
            <TinaMarkdown content={closingCta?.body} />
          </div>
          <BookingButton label={closingCta?.buttonLabel || undefined} field={tinaField(closingCta, 'buttonLabel')} variant="primaryOnDark" />
        </div>
      </section>
    </>
  )
}
