'use client'

import { useTina } from 'tinacms/dist/react'
import BookingButton from '@/components/BookingButton'

const insights = [
  { icon: 'fa-route', title: 'Your Life Path', desc: 'Understand your core life purpose and the opportunities aligned with your journey.' },
  { icon: 'fa-heart', title: 'Relationships', desc: 'Gain insight into your relationship patterns and what you need to thrive in love and partnership.' },
  { icon: 'fa-briefcase', title: 'Career & Purpose', desc: 'Discover which career paths and environments are most aligned with your numerological profile.' },
  { icon: 'fa-calendar', title: 'Timing & Cycles', desc: 'Learn about the personal year cycles that influence when to act, rest, and make big changes.' },
  { icon: 'fa-puzzle-piece', title: 'Strengths & Challenges', desc: 'Identify your natural gifts and the recurring challenges your numbers reveal.' },
  { icon: 'fa-compass', title: 'Decision Making', desc: 'Use your numbers as a guide when facing important decisions at key crossroads.' },
]

interface NumerologyData {
  numerology: {
    heroBadge: string
    heroHeading: string
    heroTagline: string
    heroSubtext: string
    heroCTALabel: string
    whatIsHeading: string
    whatIsSubtext: string
    comparisonText: string
    powerText: string
    sessionIncludes: string[]
    ctaSectionHeading: string
    ctaSectionSubtext: string
    ctaButtonLabel: string
  }
}

interface NumerologyClientProps {
  query: string
  variables: { relativePath: string }
  data: NumerologyData
}

export default function NumerologyClient(props: NumerologyClientProps) {
  const { data } = useTina<NumerologyData>(props)
  const d = data.numerology

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-oxford via-[#1a2d50] to-[#0d1829]"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['7', '3', '9', '1', '5', '8'].map((n, i) => (
            <span
              key={n + i}
              className="absolute font-bold text-carrot/10"
              style={{
                fontSize: `${7 + (i % 3)}rem`,
                top: `${[20, 40, 70, 15, 50, 30][i]}%`,
                left: i % 2 === 0 ? `${[10, 20, 20, 5][i % 4]}%` : undefined,
                right: i % 2 === 1 ? `${[15, 25, 8][Math.floor(i / 2)]}%` : undefined,
                animation: `numberFloat ${6 + i}s ease-in-out infinite`,
                animationDelay: `${i}s`,
              }}
            >
              {n}
            </span>
          ))}
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-azure/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center py-32">
            <span className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6 animate-on-scroll">{d.heroBadge}</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl heading-primary text-white mb-6 leading-tight font-dancing font-bold animate-on-scroll">
              {d.heroHeading}
            </h1>
            <p className="text-2xl md:text-3xl text-carrot font-semibold mb-4 animate-on-scroll">{d.heroTagline}</p>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-on-scroll">{d.heroSubtext}</p>
            <BookingButton label={d.heroCTALabel} className="btn-azure text-lg px-10 py-4 button-text transform hover:scale-105 transition-all duration-300 animate-on-scroll" />
          </div>
        </div>

        <style>{`
          @keyframes numberFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
          }
        `}</style>
      </section>

      {/* Unified Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>

        {/* What Is Numerology */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 animate-on-scroll">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  {d.whatIsHeading}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">{d.whatIsSubtext}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-2xl p-8 shadow-lg animate-on-scroll">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Unlike Western Numerology...</h3>
                  <p className="text-gray-600 leading-relaxed">{d.comparisonText}</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg animate-on-scroll">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">The power of numbers</h3>
                  <p className="text-gray-600 leading-relaxed">{d.powerText}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Gain */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 animate-on-scroll">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  What you&apos;ll gain <span className="text-azure font-bold">insight into</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {insights.map((item) => (
                  <div key={item.title} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll">
                    <div className="w-14 h-14 bg-gradient-to-r from-oxford to-azure rounded-xl flex items-center justify-center mb-4">
                      <i className={`fas ${item.icon} text-white text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Session Includes */}
        <section className="py-24 brand-gradient-oxford relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl heading-secondary text-white mb-6">
                  Your session <span className="text-carrot font-bold">includes</span>
                </h2>
              </div>
              <div className="space-y-4">
                {d.sessionIncludes?.map((item) => (
                  <div key={item} className="flex items-center gap-4 animate-on-scroll">
                    <i className="fas fa-check-circle text-carrot text-xl flex-shrink-0"></i>
                    <p className="text-white text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6 animate-on-scroll">
              {d.ctaSectionHeading}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-on-scroll">{d.ctaSectionSubtext}</p>
            <BookingButton label={d.ctaButtonLabel} className="btn-azure text-lg px-10 py-4 button-text animate-on-scroll" />
          </div>
        </section>
      </div>
    </>
  )
}
