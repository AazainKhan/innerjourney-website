'use client'

import { useTina } from 'tinacms/dist/react'
import BookingButton from '@/components/BookingButton'

interface NumerologyData {
  numerology: {
    heroBadge: string
    heroHeading: string
    heroTagline: string
    heroSubtext: string
    heroCTALabel: string

    selfDiscoveryHeadingPrefix: string
    selfDiscoveryHeadingHighlight: string
    selfDiscoverySubtext: string
    selfDiscoveryItems: Array<{ emoji: string; text: string; borderColor: string }>
    selfDiscoveryStatementPrefix: string
    selfDiscoveryStatementHighlight: string

    whatIsLabel: string
    whatIsHeadingPrefix: string
    whatIsHeadingHighlight: string
    whatIsIsntParagraph: string
    whatIsIsParagraph1: string
    whatIsIsParagraph2: string

    processLabel: string
    processHeadingPrefix: string
    processHeadingHighlight: string
    processSteps: Array<{ emoji: string; stepLabel: string; title: string; description: string }>

    includesLabel: string
    includesHeadingPrefix: string
    includesHeadingHighlight: string
    includesSubtext: string
    includes: Array<{ emoji: string; title: string; description: string }>

    philosophyLabel: string
    philosophyHeadingPrefix: string
    philosophyHeadingHighlight: string
    philosophyQuote: string
    philosophyParagraph1: string
    philosophyParagraph2: string
    philosophyBanner: string
    philosophyClosingPrefix: string
    philosophyClosingHighlight: string

    ctaSectionHeading: string
    ctaButtonLabel: string
  }
}

interface Props {
  query: string
  variables: { relativePath: string }
  data: NumerologyData
}

export default function NumerologyClient(props: Props) {
  const { data } = useTina<NumerologyData>(props)
  const d = data.numerology

  const floatingNumbers = [
    { n: '7', pos: 'top-20 left-[10%]', size: 'text-8xl', color: 'text-carrot/10' },
    { n: '3', pos: 'top-40 right-[15%]', size: 'text-9xl', color: 'text-azure/10' },
    { n: '9', pos: 'bottom-32 left-[20%]', size: 'text-7xl', color: 'text-white/5' },
    { n: '1', pos: 'bottom-20 right-[25%]', size: 'text-8xl', color: 'text-carrot/10' },
    { n: '5', pos: 'top-1/2 left-[5%]', size: 'text-6xl', color: 'text-azure/10' },
    { n: '8', pos: 'top-1/3 right-[8%]', size: 'text-7xl', color: 'text-white/5' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-oxford via-[#1a2d50] to-[#0d1829]"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingNumbers.map((f, i) => (
            <span key={i} className={`absolute ${f.pos} ${f.size} font-bold ${f.color}`}>{f.n}</span>
          ))}
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-azure/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6">{d.heroBadge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-white font-dancing font-bold mb-4 leading-tight">
              {d.heroHeading}
            </h1>
            <p className="text-xl md:text-2xl text-carrot font-semibold mb-4">{d.heroTagline}</p>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">{d.heroSubtext}</p>
            <BookingButton label={d.heroCTALabel} />
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

        {/* Self-Discovery */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  {d.selfDiscoveryHeadingPrefix} <span className="text-carrot font-bold">{d.selfDiscoveryHeadingHighlight}</span>
                </h2>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">{d.selfDiscoverySubtext}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {(d.selfDiscoveryItems ?? []).map((item, i) => (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${item.borderColor} ${i % 2 === 1 ? 'md:translate-y-8' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                      <p className="text-gray-700 text-lg">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl text-gray-900 font-semibold">
                  {d.selfDiscoveryStatementPrefix} <span className="text-carrot">{d.selfDiscoveryStatementHighlight}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-azure font-semibold text-sm uppercase tracking-widest mb-4 block">{d.whatIsLabel}</span>
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900">
                  {d.whatIsHeadingPrefix} <span className="text-azure font-bold">{d.whatIsHeadingHighlight}</span>
                </h2>
              </div>
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl flex-shrink-0">🪄</span>
                    <p className="text-lg text-gray-700 leading-relaxed">{d.whatIsIsntParagraph}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-azure/10 to-azure/5 rounded-2xl p-8 border border-azure/20 shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 bg-azure/20 rounded-full flex items-center justify-center text-xl flex-shrink-0">✨</span>
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 leading-relaxed">{d.whatIsIsParagraph1}</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{d.whatIsIsParagraph2}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-carrot font-semibold text-sm uppercase tracking-widest mb-4 block">{d.processLabel}</span>
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900">
                  {d.processHeadingPrefix} <span className="text-carrot font-bold">{d.processHeadingHighlight}</span>
                </h2>
              </div>
              <div className="space-y-16">
                {(d.processSteps ?? []).map((step, i) => {
                  const labelColor = i % 2 === 0 ? 'text-carrot' : 'text-azure'
                  return (
                    <div key={i} className={`flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-8 items-center transition-all duration-300 hover:-translate-y-1`}>
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white flex-shrink-0 shadow-lg"
                        style={{ background: i % 2 === 1 ? 'linear-gradient(135deg, #ea9223 0%, #d17f1a 100%)' : 'linear-gradient(135deg, #14213d 0%, #237bea 100%)' }}
                      >
                        <span>{step.emoji}</span>
                      </div>
                      <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg">
                        <span className={`${labelColor} font-bold text-sm uppercase tracking-wider`}>{step.stepLabel}</span>
                        <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Includes */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-azure font-semibold text-sm uppercase tracking-widest mb-4 block">{d.includesLabel}</span>
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">
                  {d.includesHeadingPrefix} <span className="text-azure font-bold">{d.includesHeadingHighlight}</span>
                </h2>
                <p className="text-xl text-gray-600">{d.includesSubtext}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(d.includes ?? []).map((item) => (
                  <div key={item.title} className="bg-gradient-to-br from-white to-azure/5 rounded-3xl p-6 shadow-lg hover:shadow-xl border border-azure/10 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-azure/10 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
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
                  <p className="text-xl md:text-2xl text-white font-semibold">{d.philosophyBanner}</p>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed text-center">
                  {d.philosophyClosingPrefix} <span className="text-oxford font-semibold">{d.philosophyClosingHighlight}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="py-24 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{d.ctaSectionHeading}</h2>
          <BookingButton label={d.ctaButtonLabel} variant="primaryOnDark" />
        </div>
      </section>
    </>
  )
}
