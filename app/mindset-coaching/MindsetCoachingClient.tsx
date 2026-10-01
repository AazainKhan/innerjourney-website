'use client'

import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import BookingButton from '@/components/BookingButton'
import HighlightedText from '@/components/HighlightedText'
import { toneClasses } from '@/lib/design-tokens'
import { present, usePageDoc, type TinaDocProps } from '@/lib/use-tina-doc'
import type { ClarityCoachingQuery } from '@/tina/__generated__/types'

export default function MindsetCoachingClient(props: TinaDocProps<ClarityCoachingQuery>) {
  const { clarityCoaching: d } = usePageDoc<ClarityCoachingQuery>(props)
  const { hero, whoItsFor, problemSolution, philosophy, journey, included, closingCta } = d
  const steps = present(journey?.steps)

  return (
    <>
      {/* Wrapper with background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-white to-azure/10"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-azure/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[45%] right-[15%] w-[26rem] h-[26rem] bg-oxford/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-[20%] w-[30rem] h-[30rem] bg-azure/20 rounded-full blur-3xl"></div>

        {/* Hero */}
        <section className="page-hero">
          <div className="absolute inset-0 brand-gradient-oxford-azure z-10"></div>
          <div className="absolute right-1/4 top-1/4 w-64 h-64 bg-carrot/20 rounded-full blur-3xl hidden lg:block z-10"></div>
          <div className="absolute right-10 bottom-20 w-48 h-48 bg-white/10 rounded-full blur-2xl hidden lg:block z-10"></div>
          <div className="absolute left-10 top-20 w-56 h-56 bg-azure/20 rounded-full blur-3xl hidden lg:block z-10"></div>

          <div className="container mx-auto px-6 relative z-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1 lg:max-w-xl lg:justify-self-center">
                <span data-tina-field={tinaField(hero, 'eyebrow')} className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-4">{hero?.eyebrow}</span>
                <h1 data-tina-field={tinaField(hero, 'heading')} className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight">
                  {hero?.heading}
                </h1>
                <div data-tina-field={tinaField(hero, 'subtext')} className="text-lg md:text-xl body-text text-on-secondary/90 mb-8 leading-relaxed space-y-4 [&_strong]:font-semibold [&_em]:italic">
                  <TinaMarkdown content={hero?.subtext} />
                </div>
                <BookingButton label={hero?.buttonLabel || undefined} field={tinaField(hero, 'buttonLabel')} />
              </div>
              <div className="hidden lg:flex items-center justify-center order-1 lg:order-2">
                <div className="text-center text-on-secondary">
                  <p data-tina-field={tinaField(hero, 'sideEmoji')} className="text-8xl mb-4">{hero?.sideEmoji}</p>
                  <p data-tina-field={tinaField(hero, 'sideHeading')} className="text-2xl font-semibold mb-2">{hero?.sideHeading}</p>
                  <p data-tina-field={tinaField(hero, 'sideSubtext')} className="text-lg text-on-secondary/80">{hero?.sideSubtext}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 data-tina-field={tinaField(whoItsFor, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  <HighlightedText text={whoItsFor?.heading} highlight={whoItsFor?.highlight} highlightClassName="text-carrot font-bold" />
                </h2>
                <p data-tina-field={tinaField(whoItsFor, 'subtext')} className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">{whoItsFor?.subtext}</p>
              </div>
              <div className="mb-16">
                <p data-tina-field={tinaField(whoItsFor, 'listIntro')} className="text-xl text-gray-800 font-semibold mb-10 text-center">{whoItsFor?.listIntro}</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  {present(whoItsFor?.items).map((item, i) => (
                    <div key={i} data-tina-field={tinaField(item)} className={`flex items-center gap-5 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all border-l-4 ${toneClasses(item.tone).border}`}>
                      <span data-tina-field={tinaField(item, 'emoji')} className="text-3xl flex-shrink-0">{item.emoji}</span>
                      <p data-tina-field={tinaField(item, 'text')} className="text-gray-700 text-lg">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl" data-tina-field={tinaField(whoItsFor, 'banner')}>
                <div className="absolute inset-0 brand-gradient-oxford-azure"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-carrot/20 -skew-x-12 translate-x-20"></div>
                <div className="relative p-10 md:p-14 text-center">
                  <p className="text-xl md:text-2xl leading-relaxed text-on-secondary">
                    <HighlightedText
                      text={whoItsFor?.banner?.text}
                      highlight={whoItsFor?.banner?.highlight}
                      highlightClassName="text-carrot font-bold text-2xl md:text-3xl"
                      breakBefore
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem and solution */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 data-tina-field={tinaField(problemSolution, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900">
                  <HighlightedText text={problemSolution?.heading} highlight={problemSolution?.highlight} highlightClassName="text-azure font-bold" />
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                <div data-tina-field={tinaField(problemSolution, 'problem')} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-xl" aria-hidden="true">❌</span>
                    <h3 data-tina-field={tinaField(problemSolution?.problem, 'title')} className="text-xl font-bold text-gray-800">{problemSolution?.problem?.title}</h3>
                  </div>
                  <div data-tina-field={tinaField(problemSolution?.problem, 'body')} className="space-y-5 text-lg leading-relaxed text-gray-600 [&_strong]:text-gray-800 [&_strong]:font-semibold [&_em]:italic">
                    <TinaMarkdown content={problemSolution?.problem?.body} />
                  </div>
                </div>
                <div data-tina-field={tinaField(problemSolution, 'solution')} className="bg-white rounded-3xl p-8 md:p-10 border border-azure/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl" aria-hidden="true">✨</span>
                    <h3 data-tina-field={tinaField(problemSolution?.solution, 'title')} className="text-xl font-bold text-gray-800">{problemSolution?.solution?.title}</h3>
                  </div>
                  <div data-tina-field={tinaField(problemSolution?.solution, 'body')} className="space-y-5 text-lg leading-relaxed text-gray-600 [&_strong]:text-carrot [&_strong]:text-xl [&_strong]:font-bold [&_em]:italic">
                    <TinaMarkdown content={problemSolution?.solution?.body} />
                  </div>
                  <p data-tina-field={tinaField(problemSolution?.solution, 'keyword')} className="text-4xl heading-secondary text-azure font-bold text-center py-4 mt-5">{problemSolution?.solution?.keyword}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 relative overflow-hidden">
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

        {/* Programme timeline */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span data-tina-field={tinaField(journey, 'eyebrow')} className="text-azure font-semibold text-sm uppercase tracking-widest mb-4 block">{journey?.eyebrow}</span>
                <h2 data-tina-field={tinaField(journey, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">
                  <HighlightedText text={journey?.heading} highlight={journey?.highlight} highlightClassName="text-azure font-bold" />
                </h2>
                <p data-tina-field={tinaField(journey, 'subtext')} className="text-lg text-gray-600 max-w-2xl mx-auto">{journey?.subtext}</p>
              </div>

              {/* Desktop horizontal timeline */}
              <div className="hidden lg:block mb-24">
                <div className="relative">
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-carrot via-azure to-carrot rounded-full"></div>
                  <div className="grid grid-cols-3 gap-8">
                    {steps.map((step, i) => {
                      const t = toneClasses(step.tone)
                      return (
                        <div key={i} className="relative" data-tina-field={tinaField(step)}>
                          <div className="flex justify-center mb-6">
                            <div data-tina-field={tinaField(step, 'number')} className={`w-16 h-16 rounded-full text-white text-2xl font-bold flex items-center justify-center shadow-lg relative z-10 ${t.bgSolid}`}>
                              {step.number}
                            </div>
                          </div>
                          <div className={`bg-gradient-to-b ${t.fromTint} to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border ${t.borderSoft} h-full transition-all duration-300 hover:-translate-y-1`}>
                            <div className="text-center mb-4">
                              <span data-tina-field={tinaField(step, 'weeks')} className={`text-xs font-bold ${t.text} uppercase tracking-wider`}>{step.weeks}</span>
                            </div>
                            <h3 data-tina-field={tinaField(step, 'title')} className="text-xl font-bold text-gray-900 mb-2 text-center">{step.title}</h3>
                            <p data-tina-field={tinaField(step, 'subtitle')} className={`${t.text} font-semibold text-sm mb-4 text-center`}>{step.subtitle}</p>
                            <p data-tina-field={tinaField(step, 'description')} className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile vertical cards */}
              <div className="lg:hidden space-y-6">
                {steps.map((step, i) => {
                  const t = toneClasses(step.tone)
                  return (
                    <div key={i} data-tina-field={tinaField(step)} className={`bg-gradient-to-r ${t.fromTint} to-white rounded-2xl p-6 shadow-lg border-l-4 ${t.border}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full text-white text-lg font-bold flex items-center justify-center ${t.bgSolid}`}>{step.number}</div>
                        <div>
                          <span className={`text-xs font-bold ${t.text} uppercase`}>{step.weeks}</span>
                          <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  )
                })}
              </div>

              <div className="text-center mt-28 lg:mt-32 relative z-10">
                <BookingButton label={journey?.buttonLabel || undefined} field={tinaField(journey, 'buttonLabel')} variant="secondary" />
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span data-tina-field={tinaField(included, 'eyebrow')} className="text-carrot font-semibold text-sm uppercase tracking-widest mb-4 block">{included?.eyebrow}</span>
                <h2 data-tina-field={tinaField(included, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">
                  <HighlightedText text={included?.heading} highlight={included?.highlight} highlightClassName="text-carrot font-bold" />
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {present(included?.items).map((item, i) => (
                  <div key={i} data-tina-field={tinaField(item)} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                    <div data-tina-field={tinaField(item, 'emoji')} className={`w-14 h-14 ${toneClasses(item.tone).bgSoft} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <h4 data-tina-field={tinaField(item, 'title')} className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p data-tina-field={tinaField(item, 'subtitle')} className="text-gray-600 text-sm">{item.subtitle}</p>
                  </div>
                ))}
              </div>
              {included?.bonus?.text && (
                <div data-tina-field={tinaField(included, 'bonus')} className="mt-8 brand-gradient-oxford-deep rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-3xl">{included.bonus.emoji}</span>
                    <p className="text-on-secondary text-lg">
                      <span className="font-bold">{included.bonus.label}</span> {included.bonus.text}
                    </p>
                  </div>
                </div>
              )}
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
          <div data-tina-field={tinaField(closingCta, 'body')} className="text-lg md:text-xl text-on-accent/90 mb-10 max-w-2xl mx-auto space-y-4 [&_strong]:text-on-accent [&_strong]:text-xl [&_strong]:md:text-2xl [&_strong]:font-semibold [&_em]:italic">
            <TinaMarkdown content={closingCta?.body} />
          </div>
          <BookingButton label={closingCta?.buttonLabel || undefined} field={tinaField(closingCta, 'buttonLabel')} variant="primaryOnDark" />
        </div>
      </section>
    </>
  )
}
