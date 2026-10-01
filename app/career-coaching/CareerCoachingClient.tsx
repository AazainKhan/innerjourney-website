'use client'

import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import BookingButton from '@/components/BookingButton'
import HighlightedText from '@/components/HighlightedText'
import { toneClasses } from '@/lib/design-tokens'
import { lines, present, usePageDoc, type TinaDocProps } from '@/lib/use-tina-doc'
import type { CareerCoachingQuery } from '@/tina/__generated__/types'

export default function CareerCoachingClient(props: TinaDocProps<CareerCoachingQuery>) {
  const { careerCoaching: d } = usePageDoc<CareerCoachingQuery>(props)
  const { hero, whoItsFor, approach, philosophy, imagine, journey, included, closingCta } = d
  const situations = lines(whoItsFor?.situations)
  const includedItems = lines(included?.items)

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute inset-0 brand-gradient-oxford-deep"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-carrot/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-azure/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 data-tina-field={tinaField(hero, 'heading')} className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight">
              {hero?.heading}
            </h1>
            <div data-tina-field={tinaField(hero, 'subtext')} className="text-lg md:text-xl body-text-light text-on-secondary/90 mb-8 leading-relaxed max-w-3xl mx-auto space-y-4 [&_strong]:text-carrot [&_strong]:font-bold [&_em]:italic">
              <TinaMarkdown content={hero?.subtext} />
            </div>
            <BookingButton label={hero?.buttonLabel || undefined} field={tinaField(hero, 'buttonLabel')} />
          </div>
        </div>
      </section>

      {/* Wrapper */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-white to-azure/10"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-azure/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[45%] right-[15%] w-[26rem] h-[26rem] bg-oxford/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-[20%] w-[30rem] h-[30rem] bg-azure/20 rounded-full blur-3xl"></div>

        {/* Who it's for */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 data-tina-field={tinaField(whoItsFor, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  <HighlightedText text={whoItsFor?.heading} highlight={whoItsFor?.highlight} highlightClassName="text-carrot font-bold" />
                </h2>
                <p data-tina-field={tinaField(whoItsFor, 'subtext')} className="text-lg md:text-xl text-gray-700 leading-relaxed">{whoItsFor?.subtext}</p>
              </div>
              <div className="mb-12">
                <p data-tina-field={tinaField(whoItsFor, 'listIntro')} className="text-xl text-gray-800 font-semibold mb-8 text-center">{whoItsFor?.listIntro}</p>
                <div data-tina-field={tinaField(whoItsFor, 'situations')} className="grid md:grid-cols-2 gap-6">
                  {situations.map((s, i) => (
                    <div key={i} className="flex items-start p-4 rounded-xl bg-gradient-to-br from-azure/5 to-azure/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <p className="text-gray-700 text-lg">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div data-tina-field={tinaField(whoItsFor, 'banner')} className="text-center brand-gradient-oxford-deep rounded-2xl p-10">
                <p className="text-xl md:text-2xl leading-relaxed text-on-secondary">
                  <HighlightedText text={whoItsFor?.banner?.text} highlight={whoItsFor?.banner?.highlight} highlightClassName="text-carrot font-bold" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The missing piece */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 data-tina-field={tinaField(approach, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  <HighlightedText text={approach?.heading} highlight={approach?.highlight} highlightClassName="text-azure font-bold" />
                </h2>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
                <div data-tina-field={tinaField(approach, 'body')} className="space-y-6 text-lg text-gray-700 leading-relaxed [&_strong]:text-carrot [&_strong]:text-xl [&_strong]:font-bold [&_em]:italic">
                  <TinaMarkdown content={approach?.body} />
                </div>
                <p data-tina-field={tinaField(approach, 'keyword')} className="text-3xl md:text-4xl heading-secondary text-azure font-bold text-center py-6 mt-6">
                  {approach?.keyword}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Philosophy (on dark oxford bg) */}
      <section className="py-20 brand-gradient-oxford relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-carrot/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-azure/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 data-tina-field={tinaField(philosophy, 'heading')} className="text-4xl md:text-5xl heading-secondary text-on-secondary mb-6">
                <HighlightedText text={philosophy?.heading} highlight={philosophy?.highlight} highlightClassName="text-carrot font-bold" />
              </h2>
            </div>
            <div data-tina-field={tinaField(philosophy, 'body')} className="space-y-6 text-lg text-on-secondary/85 leading-relaxed [&_strong]:text-carrot [&_strong]:font-semibold [&_em]:italic">
              <TinaMarkdown content={philosophy?.body} />
            </div>
          </div>
        </div>
      </section>

      {/* Imagine */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-white to-azure/10"></div>
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 data-tina-field={tinaField(imagine, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  <HighlightedText text={imagine?.heading} highlight={imagine?.highlight} highlightClassName="text-carrot font-bold" />
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {present(imagine?.items).map((item, i) => {
                  const t = toneClasses(item.tone)
                  return (
                    <div key={i} data-tina-field={tinaField(item)} className={`flex items-start space-x-4 p-5 rounded-xl border-l-4 ${t.border} bg-gradient-to-r ${t.fromTint} to-white transition-all duration-300 hover:translate-x-2`}>
                      <span data-tina-field={tinaField(item, 'emoji')} className="text-2xl">{item.emoji}</span>
                      <p data-tina-field={tinaField(item, 'text')} className="text-gray-700 text-lg">{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Programme roadmap */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 data-tina-field={tinaField(journey, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">
                  <HighlightedText text={journey?.heading} highlight={journey?.highlight} highlightClassName="text-azure font-bold" />
                </h2>
                <p data-tina-field={tinaField(journey, 'lead')} className="text-xl text-gray-700">{journey?.lead}</p>
                <p data-tina-field={tinaField(journey, 'intro')} className="text-lg text-gray-600 mt-2">{journey?.intro}</p>
              </div>
              {present(journey?.steps).map((step, i) => (
                <div key={step.number || i} data-tina-field={tinaField(step)} className="relative mb-12 md:mb-16 last:mb-0">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    <div className="flex items-center gap-4 md:flex-col md:items-center">
                      <div className="w-16 h-16 rounded-full text-white text-2xl font-bold flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom, var(--carrot-orange), var(--azure-blue))' }}>
                        {step.number}
                      </div>
                      <div data-tina-field={tinaField(step, 'weeks')} className="text-sm font-semibold text-gray-500 uppercase tracking-wide md:mt-2">{step.weeks}</div>
                    </div>
                    <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                      <h3 data-tina-field={tinaField(step, 'title')} className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p data-tina-field={tinaField(step, 'subtitle')} className={`${toneClasses(step.tone).text} font-semibold text-lg mb-4`}>{step.subtitle}</p>
                      <p data-tina-field={tinaField(step, 'description')} className="text-gray-700 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center mt-16">
                <BookingButton label={journey?.buttonLabel || undefined} field={tinaField(journey, 'buttonLabel')} variant="secondary" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* What's included (dark) */}
      <section className="py-20 brand-gradient-oxford relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-carrot/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-azure/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 data-tina-field={tinaField(included, 'heading')} className="text-4xl md:text-5xl heading-secondary text-on-secondary mb-4">
                <HighlightedText text={included?.heading} highlight={included?.highlight} highlightClassName="text-carrot font-bold" />
              </h2>
              <p data-tina-field={tinaField(included, 'subtext')} className="text-xl text-on-secondary/85">{included?.subtext}</p>
            </div>
            <div data-tina-field={tinaField(included, 'items')} className="grid md:grid-cols-2 gap-6">
              {includedItems.map((item, i) => (
                <div key={i} className={`flex items-start space-x-4 py-4 border-on-secondary/40 border-b ${i === includedItems.length - 1 ? 'md:col-span-2 border-b-0' : ''}`}>
                  <span className="text-carrot text-xl mt-1" aria-hidden="true">✓</span>
                  <p className="text-on-secondary/85 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="py-20 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 data-tina-field={tinaField(closingCta, 'heading')} className="text-3xl md:text-4xl font-bold text-on-accent mb-6">
            <HighlightedText text={closingCta?.heading} highlight={closingCta?.highlight} highlightClassName="text-carrot font-bold" />
          </h2>
          <div data-tina-field={tinaField(closingCta, 'body')} className="text-lg md:text-xl text-on-accent/90 mb-10 max-w-2xl mx-auto space-y-4 [&_strong]:text-on-accent [&_strong]:text-xl [&_strong]:md:text-2xl [&_strong]:font-semibold [&_em]:italic">
            <TinaMarkdown content={closingCta?.body} />
          </div>
          <BookingButton label={closingCta?.buttonLabel || undefined} field={tinaField(closingCta, 'buttonLabel')} variant="primaryOnDark" />
        </div>
      </section>
    </>
  )
}
