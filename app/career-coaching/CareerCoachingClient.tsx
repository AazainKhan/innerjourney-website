'use client'

import { useTina } from 'tinacms/dist/react'
import BookingButton from '@/components/BookingButton'

interface CareerData {
  careerCoaching: {
    heroHeading: string
    heroSubtextPrefix: string
    heroSubtextHighlight: string
    heroCTALabel: string

    resultsHeadingPrefix: string
    resultsHeadingHighlight: string
    resultsSubtext: string
    perhapsLabel: string
    situations: string[]
    bannerPrefix: string
    bannerHighlight: string

    clarityHeadingPrefix: string
    clarityHeadingHighlight: string
    clarityParagraph1: string
    clarityQuestion: string
    clarityParagraph2: string
    clarityParagraph3: string
    clarityEmphasis: string
    clarityParagraph4: string
    clarityParagraph5: string
    clarityBigWord: string

    philosophyHeadingPrefix: string
    philosophyHeadingHighlight: string
    philosophyParagraph1: string
    philosophyParagraph2Prefix: string
    philosophyParagraph2Highlight: string
    philosophyParagraph3: string
    philosophyEmphasis: string
    philosophyClosing: string

    imagineHeadingHighlight: string
    imagineItems: Array<{ emoji: string; text: string; borderColor: string; bg: string }>

    roadmapHeadingPrefix: string
    roadmapHeadingHighlight: string
    roadmapSubtext1: string
    roadmapSubtext2: string
    roadmapSteps: Array<{
      number: string
      weeks: string
      title: string
      subtitle: string
      subtitleColor: string
      description: string
    }>
    roadmapCTALabel: string

    experienceHeadingPrefix: string
    experienceHeadingHighlight: string
    experienceSubtext: string
    experienceItems: string[]

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
  data: CareerData
}

export default function CareerCoachingClient(props: Props) {
  const { data } = useTina<CareerData>({
    ...props,
    experimental___selectFormByFormId() {
      return `content/pages/${props.variables.relativePath}`
    },
  })
  const d = data.careerCoaching

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight">
              {d.heroHeading}
            </h1>
            <p className="text-lg md:text-xl body-text-light text-on-secondary/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              {d.heroSubtextPrefix} <span className="text-carrot font-bold">{d.heroSubtextHighlight}</span>
            </p>
            <BookingButton label={d.heroCTALabel} />
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

        {/* Results */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  {d.resultsHeadingPrefix} <span className="text-carrot font-bold">{d.resultsHeadingHighlight}</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{d.resultsSubtext}</p>
              </div>
              <div className="mb-12">
                <p className="text-xl text-gray-800 font-semibold mb-8 text-center">{d.perhapsLabel}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {(d.situations ?? []).map((s, i) => (
                    <div key={i} className="flex items-start p-4 rounded-xl bg-gradient-to-br from-azure/5 to-azure/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <p className="text-gray-700 text-lg">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center brand-gradient-oxford-deep rounded-2xl p-10">
                <p className="text-xl md:text-2xl leading-relaxed">
                  <span className="text-on-secondary">{d.bannerPrefix} </span>
                  <span className="text-carrot font-bold">{d.bannerHighlight}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Clarity for Career */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  {d.clarityHeadingPrefix} <span className="text-azure font-bold">{d.clarityHeadingHighlight}</span>
                </h2>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{d.clarityParagraph1}</p>
                <p className="text-xl text-gray-900 font-semibold mb-6">{d.clarityQuestion}</p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">{d.clarityParagraph2}</p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{d.clarityParagraph3}</p>
                <p className="text-xl text-carrot font-bold mb-8">{d.clarityEmphasis}</p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{d.clarityParagraph4}</p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">{d.clarityParagraph5}</p>
                <p className="text-3xl md:text-4xl heading-secondary text-azure font-bold text-center py-6">
                  {d.clarityBigWord}
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
              <h2 className="text-4xl md:text-5xl heading-secondary text-on-secondary mb-6">
                {d.philosophyHeadingPrefix} <span className="text-carrot font-bold">{d.philosophyHeadingHighlight}</span>
              </h2>
            </div>
            <div className="space-y-6 text-lg text-on-secondary/85 leading-relaxed">
              <p>{d.philosophyParagraph1}</p>
              <p>
                {d.philosophyParagraph2Prefix} <span className="text-carrot font-semibold">{d.philosophyParagraph2Highlight}</span>
              </p>
              <p>{d.philosophyParagraph3}</p>
              <p className="text-xl text-on-secondary font-semibold">{d.philosophyEmphasis}</p>
              <p>{d.philosophyClosing}</p>
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
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  <span className="text-carrot font-bold">{d.imagineHeadingHighlight}</span>…
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {(d.imagineItems ?? []).map((item, i) => (
                  <div key={i} className={`flex items-start space-x-4 p-5 rounded-xl border-l-4 ${item.borderColor} bg-gradient-to-r ${item.bg} transition-all duration-300 hover:translate-x-2`}>
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="text-gray-700 text-lg">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">
                  {d.roadmapHeadingPrefix} <span className="text-azure font-bold">{d.roadmapHeadingHighlight}</span>
                </h2>
                <p className="text-xl text-gray-700">{d.roadmapSubtext1}</p>
                <p className="text-lg text-gray-600 mt-2">{d.roadmapSubtext2}</p>
              </div>
              {(d.roadmapSteps ?? []).map((step) => (
                <div key={step.number} className="relative mb-12 md:mb-16 last:mb-0">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    <div className="flex items-center gap-4 md:flex-col md:items-center">
                      <div className="w-16 h-16 rounded-full text-white text-2xl font-bold flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom, var(--carrot-orange), var(--azure-blue))' }}>
                        {step.number}
                      </div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide md:mt-2">{step.weeks}</div>
                    </div>
                    <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className={`${step.subtitleColor} font-semibold text-lg mb-4`}>{step.subtitle}</p>
                      <p className="text-gray-700 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center mt-16">
                <BookingButton label={d.roadmapCTALabel} variant="secondary" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Experience (dark) */}
      <section className="py-20 brand-gradient-oxford relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-carrot/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-azure/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl heading-secondary text-on-secondary mb-4">
                {d.experienceHeadingPrefix} <span className="text-carrot font-bold">{d.experienceHeadingHighlight}</span>
              </h2>
              <p className="text-xl text-on-secondary/85">{d.experienceSubtext}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {(d.experienceItems ?? []).map((item, i) => (
                <div key={i} className={`flex items-start space-x-4 py-4 border-on-secondary/40 border-b ${i === (d.experienceItems ?? []).length - 1 ? 'md:col-span-2 border-b-0' : ''}`}>
                  <span className="text-carrot text-xl mt-1">✓</span>
                  <p className="text-on-secondary/85 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-on-accent mb-6">
            {d.ctaSectionHeadingPrefix} <span className="text-carrot font-bold">{d.ctaSectionHeadingHighlight}</span>
          </h2>
          <p className="text-lg md:text-xl text-on-accent/90 mb-4 max-w-2xl mx-auto">{d.ctaSectionParagraph1}</p>
          <p className="text-xl md:text-2xl text-on-accent font-semibold mb-10 max-w-2xl mx-auto">{d.ctaSectionParagraph2}</p>
          <BookingButton label={d.ctaButtonLabel} variant="primaryOnDark" />
        </div>
      </section>
    </>
  )
}
