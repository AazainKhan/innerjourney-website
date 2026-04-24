'use client'

import { useTina } from 'tinacms/dist/react'
import BookingButton from '@/components/BookingButton'

interface ClarityData {
  clarityCoaching: {
    heroBadge: string
    heroHeading: string
    heroSubtext: string
    heroCTALabel: string
    heroSideEmoji: string
    heroSideWeeks: string
    heroSideSubtext: string

    resultsHeadingPrefix: string
    resultsHeadingHighlight: string
    resultsSubtext: string
    perhapsLabel: string
    perhapsItems: Array<{ emoji: string; text: string; borderColor: string }>
    bannerText: string
    bannerHighlight: string

    missingPieceHeadingPrefix: string
    missingPieceHeadingHighlight: string
    problemTitle: string
    problemParagraph1: string
    problemQuestion: string
    problemParagraph2: string
    problemParagraph3: string
    solutionTitle: string
    solutionParagraph1: string
    solutionEmphasis: string
    solutionParagraph2: string
    solutionWord: string

    philosophyLabel: string
    philosophyHeadingPrefix: string
    philosophyHeadingHighlight: string
    philosophyQuote: string
    philosophyParagraph1: string
    philosophyParagraph2: string
    philosophyBannerPrefix: string
    philosophyBannerHighlight: string
    philosophyClosingPrefix: string
    philosophyClosingHighlight: string

    timelineLabel: string
    timelineHeadingPrefix: string
    timelineHeadingHighlight: string
    timelineSubtext: string
    timelineSteps: Array<{
      number: string
      weeks: string
      title: string
      subtitle: string
      description: string
      accent: string
    }>
    timelineCTALabel: string

    experienceLabel: string
    experienceHeadingPrefix: string
    experienceHeadingHighlight: string
    experienceItems: Array<{ emoji: string; title: string; subtitle: string; bg: string }>
    bonusEmoji: string
    bonusPrefix: string
    bonusText: string

    ctaSectionHeadingPrefix: string
    ctaSectionHeadingHighlight: string
    ctaSectionParagraph1: string
    ctaSectionParagraph2: string
    ctaButtonLabel: string
  }
}

interface Props {
  query: string
  variables: { relativePath: string }
  data: ClarityData
}

function stepNumberClasses(accent: string) {
  if (accent === 'azure') return 'bg-gradient-to-br from-azure to-blue-700'
  return 'bg-gradient-to-br from-carrot to-orange-600'
}
function accentText(accent: string) {
  return accent === 'azure' ? 'text-azure' : 'text-carrot'
}
function accentBorder(accent: string) {
  return accent === 'azure' ? 'border-azure' : 'border-carrot'
}
function accentFrom(accent: string) {
  return accent === 'azure' ? 'from-blue-50' : 'from-orange-50'
}

export default function ClarityCoachingClient(props: Props) {
  const { data } = useTina<ClarityData>(props)
  const d = data.clarityCoaching

  return (
    <>
      {/* Wrapper with background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[45%] right-[15%] w-[26rem] h-[26rem] bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-[20%] w-[30rem] h-[30rem] bg-azure/20 rounded-full blur-3xl"></div>

        {/* Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-oxford via-[#1a2d50] to-azure hidden lg:block z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-oxford to-azure lg:hidden z-10"></div>
          <div className="absolute right-1/4 top-1/4 w-64 h-64 bg-carrot/20 rounded-full blur-3xl hidden lg:block z-10"></div>
          <div className="absolute right-10 bottom-20 w-48 h-48 bg-white/10 rounded-full blur-2xl hidden lg:block z-10"></div>

          <div className="container mx-auto px-6 relative z-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <span className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-4">{d.heroBadge}</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-white lg:text-gray-900 mb-6 leading-tight font-dancing font-bold">
                  {d.heroHeading}
                </h1>
                <p className="text-lg md:text-xl body-text text-white/90 lg:text-gray-600 mb-8 leading-relaxed max-w-xl">
                  {d.heroSubtext}
                </p>
                <BookingButton label={d.heroCTALabel} className="btn-azure text-lg px-10 py-4 button-text transform hover:scale-105 transition-all duration-300" />
              </div>
              <div className="hidden lg:flex items-center justify-center order-1 lg:order-2">
                <div className="text-center text-white">
                  <p className="text-8xl mb-4">{d.heroSideEmoji}</p>
                  <p className="text-2xl font-semibold mb-2">{d.heroSideWeeks}</p>
                  <p className="text-lg text-white/80">{d.heroSideSubtext}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  {d.resultsHeadingPrefix} <span className="text-carrot font-bold">{d.resultsHeadingHighlight}</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">{d.resultsSubtext}</p>
              </div>
              <div className="mb-16">
                <p className="text-xl text-gray-800 font-semibold mb-10 text-center">{d.perhapsLabel}</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  {(d.perhapsItems ?? []).map((item, i) => (
                    <div key={i} className={`flex items-center gap-5 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all border-l-4 ${item.borderColor}`}>
                      <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                      <p className="text-gray-700 text-lg">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-oxford to-azure"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-carrot/20 -skew-x-12 translate-x-20"></div>
                <div className="relative p-10 md:p-14 text-center">
                  <p className="text-xl md:text-2xl leading-relaxed text-white">
                    {d.bannerText}<br />
                    <span className="text-carrot font-bold text-2xl md:text-3xl">{d.bannerHighlight}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missing Piece */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900">
                  {d.missingPieceHeadingPrefix} <span className="text-azure font-bold">{d.missingPieceHeadingHighlight}</span>
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-xl">❌</span>
                    <h3 className="text-xl font-bold text-gray-800">{d.problemTitle}</h3>
                  </div>
                  <div className="space-y-5 text-gray-600">
                    <p className="text-lg leading-relaxed">{d.problemParagraph1}</p>
                    <p className="text-lg font-semibold text-gray-800">{d.problemQuestion}</p>
                    <p className="text-lg leading-relaxed">{d.problemParagraph2}</p>
                    <p className="text-lg leading-relaxed">{d.problemParagraph3}</p>
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-azure/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">✨</span>
                    <h3 className="text-xl font-bold text-gray-800">{d.solutionTitle}</h3>
                  </div>
                  <div className="space-y-5 text-gray-600">
                    <p className="text-lg leading-relaxed">{d.solutionParagraph1}</p>
                    <p className="text-xl text-carrot font-bold">{d.solutionEmphasis}</p>
                    <p className="text-lg leading-relaxed">{d.solutionParagraph2}</p>
                    <p className="text-4xl heading-secondary text-azure font-bold text-center py-4">{d.solutionWord}</p>
                  </div>
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
                <span className="text-carrot font-semibold text-sm uppercase tracking-widest mb-4 block">{d.philosophyLabel}</span>
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900">
                  {d.philosophyHeadingPrefix} <span className="text-carrot font-bold">{d.philosophyHeadingHighlight}</span>
                </h2>
              </div>
              <div className="space-y-8">
                <blockquote className="text-2xl md:text-3xl text-oxford leading-relaxed italic text-center max-w-3xl mx-auto">
                  <span className="text-carrot text-3xl md:text-4xl">&ldquo;</span>
                  {d.philosophyQuote}
                  <span className="text-carrot text-3xl md:text-4xl">&rdquo;</span>
                </blockquote>
                <p className="text-lg text-gray-600 leading-relaxed">{d.philosophyParagraph1}</p>
                <p className="text-lg text-gray-600 leading-relaxed">{d.philosophyParagraph2}</p>
                <div className="bg-gradient-to-r from-oxford to-[#1a2d50] rounded-2xl p-8 text-center">
                  <p className="text-xl md:text-2xl text-white font-semibold">
                    {d.philosophyBannerPrefix} <span className="text-carrot">{d.philosophyBannerHighlight}</span>
                  </p>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed text-center">
                  {d.philosophyClosingPrefix} <span className="text-oxford font-semibold">{d.philosophyClosingHighlight}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-azure font-semibold text-sm uppercase tracking-widest mb-4 block">{d.timelineLabel}</span>
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">
                  {d.timelineHeadingPrefix} <span className="text-azure font-bold">{d.timelineHeadingHighlight}</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{d.timelineSubtext}</p>
              </div>

              {/* Desktop horizontal timeline */}
              <div className="hidden lg:block mb-24">
                <div className="relative">
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-carrot via-azure to-carrot rounded-full"></div>
                  <div className="grid grid-cols-3 gap-8">
                    {(d.timelineSteps ?? []).map((step, i) => (
                      <div key={i} className="relative">
                        <div className="flex justify-center mb-6">
                          <div className={`w-16 h-16 rounded-full text-white text-2xl font-bold flex items-center justify-center shadow-lg relative z-10 ${stepNumberClasses(step.accent)}`}>
                            {step.number}
                          </div>
                        </div>
                        <div className={`bg-gradient-to-b ${accentFrom(step.accent)} to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-${step.accent === 'azure' ? 'blue' : 'orange'}-100 h-full transition-all duration-300 hover:-translate-y-1`}>
                          <div className="text-center mb-4">
                            <span className={`text-xs font-bold ${accentText(step.accent)} uppercase tracking-wider`}>{step.weeks}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{step.title}</h3>
                          <p className={`${accentText(step.accent)} font-semibold text-sm mb-4 text-center`}>{step.subtitle}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile vertical cards */}
              <div className="lg:hidden space-y-6">
                {(d.timelineSteps ?? []).map((step, i) => (
                  <div key={i} className={`bg-gradient-to-r ${accentFrom(step.accent)} to-white rounded-2xl p-6 shadow-lg border-l-4 ${accentBorder(step.accent)}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full text-white text-lg font-bold flex items-center justify-center ${stepNumberClasses(step.accent)}`}>{step.number}</div>
                      <div>
                        <span className={`text-xs font-bold ${accentText(step.accent)} uppercase`}>{step.weeks}</span>
                        <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-28 lg:mt-32 relative z-10">
                <BookingButton label={d.timelineCTALabel} className="btn-azure-outline text-lg px-10 py-4 button-text transform hover:scale-105 transition-all duration-300 shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-carrot font-semibold text-sm uppercase tracking-widest mb-4 block">{d.experienceLabel}</span>
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">
                  {d.experienceHeadingPrefix} <span className="text-carrot font-bold">{d.experienceHeadingHighlight}</span>
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(d.experienceItems ?? []).map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                    <div className={`w-14 h-14 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.subtitle}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-gradient-to-r from-oxford to-[#1a2d50] rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-3xl">{d.bonusEmoji}</span>
                  <p className="text-white text-lg">
                    <span className="font-bold">{d.bonusPrefix}</span> {d.bonusText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="py-20 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {d.ctaSectionHeadingPrefix} <span className="text-carrot font-bold">{d.ctaSectionHeadingHighlight}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-4 max-w-2xl mx-auto">{d.ctaSectionParagraph1}</p>
          <p className="text-xl md:text-2xl text-white font-semibold mb-10 max-w-2xl mx-auto">{d.ctaSectionParagraph2}</p>
          <BookingButton label={d.ctaButtonLabel} className="bg-white text-azure hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-azure border border-white/40" />
        </div>
      </section>
    </>
  )
}
