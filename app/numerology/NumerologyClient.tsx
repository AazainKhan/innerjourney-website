'use client'

import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import BookingButton from '@/components/BookingButton'
import HighlightedText from '@/components/HighlightedText'
import { toneClasses } from '@/lib/design-tokens'
import { present, usePageDoc, type TinaDocProps } from '@/lib/use-tina-doc'
import type { NumerologyQuery } from '@/tina/__generated__/types'

// Decorative digits scattered behind the hero.
const FLOATING_NUMBERS = [
  { n: '7', pos: 'top-20 left-[10%]', size: 'text-8xl', color: 'text-carrot/10' },
  { n: '3', pos: 'top-40 right-[15%]', size: 'text-9xl', color: 'text-azure/10' },
  { n: '9', pos: 'bottom-32 left-[20%]', size: 'text-7xl', color: 'text-white/5' },
  { n: '1', pos: 'bottom-20 right-[25%]', size: 'text-8xl', color: 'text-carrot/10' },
  { n: '5', pos: 'top-1/2 left-[5%]', size: 'text-6xl', color: 'text-azure/10' },
  { n: '8', pos: 'top-1/3 right-[8%]', size: 'text-7xl', color: 'text-white/5' },
]

export default function NumerologyClient(props: TinaDocProps<NumerologyQuery>) {
  const { numerology: d } = usePageDoc<NumerologyQuery>(props)
  const { hero, whoItsFor, whatItIs, process, included, philosophy, closingCta } = d

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute inset-0 brand-gradient-oxford-deep"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {FLOATING_NUMBERS.map((f, i) => (
            <span key={i} className={`absolute ${f.pos} ${f.size} font-bold ${f.color}`}>{f.n}</span>
          ))}
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-azure/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <span data-tina-field={tinaField(hero, 'eyebrow')} className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6">{hero?.eyebrow}</span>
            <h1 data-tina-field={tinaField(hero, 'heading')} className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-4 leading-tight">
              {hero?.heading}
            </h1>
            <p data-tina-field={tinaField(hero, 'tagline')} className="text-xl md:text-2xl text-carrot font-semibold mb-4">{hero?.tagline}</p>
            <div data-tina-field={tinaField(hero, 'subtext')} className="text-lg md:text-xl text-on-secondary/80 mb-8 max-w-2xl mx-auto leading-relaxed space-y-4 [&_strong]:text-carrot [&_strong]:font-semibold [&_em]:italic">
              <TinaMarkdown content={hero?.subtext} />
            </div>
            <BookingButton label={hero?.buttonLabel || undefined} field={tinaField(hero, 'buttonLabel')} />
          </div>
        </div>
      </section>

      {/* Unified Gradient Background Wrapper */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-white to-azure/10"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-azure/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[30%] right-[40%] w-96 h-96 bg-oxford/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[35%] w-96 h-96 bg-carrot/15 rounded-full blur-3xl"></div>

        {/* Who it's for */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 data-tina-field={tinaField(whoItsFor, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  <HighlightedText text={whoItsFor?.heading} highlight={whoItsFor?.highlight} highlightClassName="text-carrot font-bold" />
                </h2>
                <p data-tina-field={tinaField(whoItsFor, 'subtext')} className="text-xl text-gray-700 max-w-2xl mx-auto">{whoItsFor?.subtext}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {present(whoItsFor?.items).map((item, i) => (
                  <div
                    key={i}
                    data-tina-field={tinaField(item)}
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${toneClasses(item.tone).border} ${i % 2 === 1 ? 'md:translate-y-8' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <span data-tina-field={tinaField(item, 'emoji')} className="text-3xl flex-shrink-0">{item.emoji}</span>
                      <p data-tina-field={tinaField(item, 'text')} className="text-gray-700 text-lg">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p data-tina-field={tinaField(whoItsFor, 'statement')} className="text-2xl md:text-3xl text-gray-900 font-semibold">
                  <HighlightedText text={whoItsFor?.statement?.text} highlight={whoItsFor?.statement?.highlight} highlightClassName="text-carrot" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What numerology is */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span data-tina-field={tinaField(whatItIs, 'eyebrow')} className="text-azure font-semibold text-sm uppercase tracking-widest mb-4 block">{whatItIs?.eyebrow}</span>
                <h2 data-tina-field={tinaField(whatItIs, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900">
                  <HighlightedText text={whatItIs?.heading} highlight={whatItIs?.highlight} highlightClassName="text-azure font-bold" />
                </h2>
              </div>
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl flex-shrink-0" aria-hidden="true">🪄</span>
                    <p data-tina-field={tinaField(whatItIs, 'isNot')} className="text-lg text-gray-700 leading-relaxed">{whatItIs?.isNot}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-azure/10 to-azure/5 rounded-2xl p-8 border border-azure/20 shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 bg-azure/20 rounded-full flex items-center justify-center text-xl flex-shrink-0" aria-hidden="true">✨</span>
                    <div data-tina-field={tinaField(whatItIs, 'isText')} className="space-y-4 text-lg text-gray-700 leading-relaxed [&_strong]:text-azure [&_strong]:font-semibold [&_em]:italic">
                      <TinaMarkdown content={whatItIs?.isText} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span data-tina-field={tinaField(process, 'eyebrow')} className="text-carrot font-semibold text-sm uppercase tracking-widest mb-4 block">{process?.eyebrow}</span>
                <h2 data-tina-field={tinaField(process, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900">
                  <HighlightedText text={process?.heading} highlight={process?.highlight} highlightClassName="text-carrot font-bold" />
                </h2>
              </div>
              <div className="space-y-16">
                {present(process?.steps).map((step, i) => {
                  const labelColor = i % 2 === 0 ? 'text-carrot' : 'text-azure'
                  return (
                    <div key={i} data-tina-field={tinaField(step)} className={`flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-8 items-center transition-all duration-300 hover:-translate-y-1`}>
                      <div data-tina-field={tinaField(step, 'emoji')} className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-lg ${i % 2 === 1 ? 'brand-gradient-orange text-on-primary' : 'brand-gradient-oxford-azure text-on-secondary'}`}>
                        <span>{step.emoji}</span>
                      </div>
                      <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg">
                        <span data-tina-field={tinaField(step, 'label')} className={`${labelColor} font-bold text-sm uppercase tracking-wider`}>{step.label}</span>
                        <h3 data-tina-field={tinaField(step, 'title')} className="text-2xl font-bold text-gray-900 mt-2 mb-4">{step.title}</h3>
                        <p data-tina-field={tinaField(step, 'description')} className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span data-tina-field={tinaField(included, 'eyebrow')} className="text-azure font-semibold text-sm uppercase tracking-widest mb-4 block">{included?.eyebrow}</span>
                <h2 data-tina-field={tinaField(included, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">
                  <HighlightedText text={included?.heading} highlight={included?.highlight} highlightClassName="text-azure font-bold" />
                </h2>
                <p data-tina-field={tinaField(included, 'subtext')} className="text-xl text-gray-600">{included?.subtext}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {present(included?.items).map((item, i) => (
                  <div key={item.title || i} data-tina-field={tinaField(item)} className="bg-gradient-to-br from-white to-azure/5 rounded-3xl p-6 shadow-lg hover:shadow-xl border border-azure/10 transition-all duration-300 hover:-translate-y-1">
                    <div data-tina-field={tinaField(item, 'emoji')} className="w-14 h-14 bg-azure/10 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <h3 data-tina-field={tinaField(item, 'title')} className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p data-tina-field={tinaField(item, 'description')} className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span data-tina-field={tinaField(philosophy, 'eyebrow')} className="text-carrot font-semibold text-sm uppercase tracking-widest mb-4 block">{philosophy?.eyebrow}</span>
                <h2 data-tina-field={tinaField(philosophy, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900">
                  <HighlightedText text={philosophy?.heading} highlight={philosophy?.highlight} highlightClassName="text-carrot font-bold" />
                </h2>
              </div>
              <div className="space-y-8">
                <blockquote data-tina-field={tinaField(philosophy, 'quote')} className="text-2xl md:text-3xl text-oxford leading-relaxed italic text-center max-w-3xl mx-auto">
                  <span className="text-carrot text-3xl md:text-4xl">&ldquo;</span>
                  {philosophy?.quote}
                  <span className="text-carrot text-3xl md:text-4xl">&rdquo;</span>
                </blockquote>
                <div data-tina-field={tinaField(philosophy, 'body')} className="space-y-6 text-lg text-gray-600 leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-semibold [&_em]:italic">
                  <TinaMarkdown content={philosophy?.body} />
                </div>
                <div data-tina-field={tinaField(philosophy, 'banner')} className="brand-gradient-oxford-deep rounded-2xl p-8 text-center">
                  <p className="text-xl md:text-2xl text-on-secondary font-semibold">
                    <HighlightedText text={philosophy?.banner?.text} highlight={philosophy?.banner?.highlight} highlightClassName="text-carrot" />
                  </p>
                </div>
                <p data-tina-field={tinaField(philosophy, 'closing')} className="text-lg text-gray-600 leading-relaxed text-center">
                  <HighlightedText text={philosophy?.closing?.text} highlight={philosophy?.closing?.highlight} highlightClassName="text-oxford font-semibold" />
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Closing call to action */}
      <section className="py-24 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 data-tina-field={tinaField(closingCta, 'heading')} className="text-4xl md:text-5xl font-bold text-on-accent mb-8">{closingCta?.heading}</h2>
          <BookingButton label={closingCta?.buttonLabel || undefined} field={tinaField(closingCta, 'buttonLabel')} variant="primaryOnDark" />
        </div>
      </section>
    </>
  )
}
