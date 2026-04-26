'use client'

import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import BookingButton from '@/components/BookingButton'

interface ServicesData {
  services: {
    heroHeading: string
    heroSubtext: string
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

const cards = [
  {
    icon: 'fa-lightbulb',
    title: 'Clarity Coaching',
    duration: '12-Week Programme',
    description: 'My signature programme for women ready to get clear on their goals, values, decision-making, and life\'s direction. Through weekly one-to-one sessions, we\'ll uncover what\'s holding you back and build the clarity and confidence to move forward.',
    href: '/clarity-coaching',
    btnText: 'Start my clarity journey',
    gradient: 'brand-gradient-oxford',
    btnColor: 'text-oxford',
    highlights: ['12 one-to-one sessions', 'Personalised coaching plan', 'Practical tools & exercises', 'Email support between sessions'],
    isThisForYou: "If you feel stuck, lost, or like you're going through the motions — this programme is for you. We'll work together to uncover what you truly want and build the courage to go after it.",
  },
  {
    icon: 'fa-chart-line',
    title: 'Career Coaching',
    duration: '12-Week Programme',
    description: 'The career edition of my clarity coaching. Whether you\'re a graduate, considering a career change, feeling unsatisfied at work, or experiencing redundancy, you\'ll get clear and confident on your career path.',
    href: '/career-coaching',
    btnText: 'Realign my career',
    gradient: 'brand-gradient-orange',
    btnColor: 'text-orange-600',
    highlights: ['12 personalised sessions', 'Career clarity roadmap', 'CV & interview support', 'Mindset & confidence coaching'],
    isThisForYou: "If your career isn't lighting you up or you're at a crossroads professionally — this programme is for you. We'll get you clear, confident, and ready to take decisive action.",
  },
  {
    icon: 'fa-star',
    title: 'Numerology for Clarity',
    duration: '1-Hour Session',
    description: 'Need answers now? My 1-hour Numerology for Clarity session will help you glean crucial insight into your life path, relationships, and timing. Backed by ancient vedic practices for fast, focused clarity.',
    href: '/numerology',
    btnText: 'Book my numerology session',
    gradient: 'brand-gradient-oxford',
    btnColor: 'text-oxford',
    highlights: ['1-hour personalised session', 'Life path & expression numbers', 'Personal year cycle reading', 'Detailed follow-up notes'],
    isThisForYou: "If you need fast, focused insight and want a different perspective on your life's questions — this session is for you. Perfect when you need clarity but aren't ready for a longer coaching commitment.",
  },
]

export default function ServicesPageClient(props: Props) {
  const { data } = useTina<ServicesData>(props)
  const d = data.services

  return (
    <>
      <section className="relative pt-32 pb-20 bg-oxford overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl heading-primary text-white mb-6 leading-tight font-dancing font-bold">
              {d.heroHeading}
            </h1>
            <p className="text-xl md:text-2xl body-text-light text-white/90 leading-relaxed max-w-3xl mx-auto">
              {d.heroSubtext}
            </p>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-orange-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-blue-400/30 rounded-full blur-3xl"></div>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="space-y-16 max-w-5xl mx-auto">
              {cards.map((s, i) => (
                <div key={s.title} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''} animate-on-scroll`}>
                  <div className={`${s.gradient} p-10 rounded-2xl text-white shadow-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="text-5xl mb-6"><i className={`fas ${s.icon}`}></i></div>
                    <span className="inline-block text-white/60 text-sm uppercase tracking-widest mb-2">{s.duration}</span>
                    <h2 className="text-3xl font-bold mb-4">{s.title}</h2>
                    <p className="text-white/90 mb-6 text-lg leading-relaxed">{s.description}</p>
                    <ul className="space-y-2 mb-8">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-3">
                          <i className="fas fa-check text-carrot flex-shrink-0"></i>
                          <span className="text-white/90">{h}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={s.href} className={`bg-white ${s.btnColor} hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block text-center`}>
                      {s.btnText}
                    </Link>
                  </div>
                  <div className={`space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-2xl font-bold text-gray-900">Is this for you?</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{s.isThisForYou}</p>
                    <BookingButton label="Book A Free Clarity Call" className="btn-azure-outline px-8 py-3 button-text" />
                  </div>
                </div>
              ))}
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
            <BookingButton label={d.ctaButtonLabel} className="btn-azure text-lg px-10 py-4 button-text animate-on-scroll" />
          </div>
        </section>
      </div>
    </>
  )
}
