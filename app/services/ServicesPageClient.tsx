'use client'

import Link from 'next/link'
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import BookingButton from '@/components/BookingButton'
import Icon from '@/components/Icon'
import RichText from '@/components/RichText'
import { cardSurface } from '@/lib/design-tokens'
import { lines, present, usePageDoc, type TinaDocProps } from '@/lib/use-tina-doc'
import type { ServicesQuery } from '@/tina/__generated__/types'

export default function ServicesPageClient(props: TinaDocProps<ServicesQuery>) {
  const { services: d } = usePageDoc<ServicesQuery>(props)
  const hero = d.hero
  const closing = d.closingCta
  const cards = present(d.cards)

  return (
    <>
      <section className="page-hero bg-oxford">
        <div className="absolute top-0 right-0 w-96 h-96 bg-carrot/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-azure/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <RichText as="h1" field={tinaField(hero, 'heading')} className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight">{hero?.heading}</RichText>
            <div data-tina-field={tinaField(hero, 'subtext')} className="text-lg md:text-xl body-text-light text-on-secondary/90 leading-relaxed max-w-3xl mx-auto space-y-4 [&_strong]:font-semibold [&_em]:italic">
              <TinaMarkdown content={hero?.subtext} />
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
              {cards.map((card, i) => {
                const look = cardSurface(card.tone)
                const flipped = i % 2 === 1
                return (
                  <div key={card.title || i} data-tina-field={tinaField(card)} className="grid lg:grid-cols-2 gap-12 items-center animate-on-scroll">
                    <div className={`${look.surface} ${look.text} p-10 rounded-2xl shadow-2xl ${flipped ? 'lg:order-2' : ''}`}>
                      <div className="text-5xl mb-6" data-tina-field={tinaField(card, 'icon')}><Icon name={card.icon} /></div>
                      <span data-tina-field={tinaField(card, 'duration')} className={`inline-block ${look.textMuted} text-sm uppercase tracking-widest mb-2`}>{card.duration}</span>
                      <h2 data-tina-field={tinaField(card, 'title')} className="text-3xl font-bold mb-4">{card.title}</h2>
                      <p data-tina-field={tinaField(card, 'description')} className={`${look.textSoft} mb-6 text-lg leading-relaxed`}>{card.description}</p>
                      <ul data-tina-field={tinaField(card, 'highlights')} className="space-y-2 mb-8">
                        {lines(card.highlights).map((h) => (
                          <li key={h} className="flex items-center gap-3">
                            <i className={`fas fa-check ${look.text} flex-shrink-0`} aria-hidden="true"></i>
                            <span className={look.textSoft}>{h}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={card.href || '#'} data-tina-field={tinaField(card, 'buttonLabel')} className={`bg-white ${look.buttonText} hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block text-center`}>
                        {card.buttonLabel}
                      </Link>
                    </div>
                    <div className={`space-y-6 ${flipped ? 'lg:order-1' : ''}`}>
                      {card.fitHeading && (
                        <h3 data-tina-field={tinaField(card, 'fitHeading')} className="text-2xl font-bold text-gray-900">{card.fitHeading}</h3>
                      )}
                      <p data-tina-field={tinaField(card, 'fitBody')} className="text-gray-600 text-lg leading-relaxed">{card.fitBody}</p>
                      {card.learnMoreLabel && (
                        <Link href={card.href || '#'} data-tina-field={tinaField(card, 'learnMoreLabel')} className="inline-flex items-center gap-2 text-azure font-semibold hover:underline">
                          {card.learnMoreLabel} <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 data-tina-field={tinaField(closing, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6 animate-on-scroll">
              {closing?.heading}
            </h2>
            <p data-tina-field={tinaField(closing, 'subtext')} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-on-scroll">
              {closing?.subtext}
            </p>
            <BookingButton label={closing?.buttonLabel || undefined} field={tinaField(closing, 'buttonLabel')} className="animate-on-scroll" />
          </div>
        </section>
      </div>
    </>
  )
}
