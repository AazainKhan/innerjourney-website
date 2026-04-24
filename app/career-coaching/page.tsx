import type { Metadata } from 'next'
import BookingButton from '@/components/BookingButton'

export const metadata: Metadata = {
  title: 'Career Coaching - Feel Clear and Confident in Your Career',
  description: 'Feel clear and confident in your career again. Transform your career in just 12 weeks with Shanila\'s compassionate career coaching programme.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/career-coaching' },
  openGraph: {
    title: 'Career Coaching - Shanila Khan | Transform Your Career in 12 Weeks',
    description: 'Feel clear and confident in your career again. Transform your career in just 12 weeks.',
    url: 'https://innerjourney-with-shanila.com/career-coaching',
  },
}

const situations = [
  'Stuck in middle management, feeling lost and uninspired',
  "Considering a career change, but you don't know where to start",
  'A new graduate, struggling to break into your industry',
  'Experiencing job loss or redundancy',
  'Feeling unfulfilled despite having a "good" job',
  'Wanting to set up your own business but lacking confidence',
]

const whatYouGet = [
  { icon: 'fa-comments', title: '12 Personalised Coaching Sessions', desc: 'Weekly one-to-one sessions focused entirely on your career goals and challenges.' },
  { icon: 'fa-map', title: 'Career Clarity Roadmap', desc: 'A clear action plan to help you navigate your next career move with confidence.' },
  { icon: 'fa-file-alt', title: 'CV & Interview Support', desc: 'Practical guidance to help you present yourself confidently to employers.' },
  { icon: 'fa-heart', title: 'Mindset & Confidence Coaching', desc: 'Address the limiting beliefs and fears holding you back from the career you deserve.' },
]

const outcomes = [
  'Identify your strengths, skills, and true career values',
  'Get clear on the career path that lights you up',
  'Overcome imposter syndrome and self-doubt',
  'Build the confidence to make bold career moves',
  'Create a realistic, actionable career plan',
  'Step into your next role feeling ready and excited',
]

export default function CareerCoachingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-oxford/95 via-[#1a2d50] to-[#0f1a2e]"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-azure/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl heading-primary text-white mb-8 leading-tight font-dancing font-bold animate-on-scroll">
              Feel clear and confident in your career again
            </h1>
            <p className="text-xl md:text-2xl body-text-light text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto animate-on-scroll">
              Take action and transform your career in just <span className="text-carrot font-bold">12 weeks</span>
            </p>
            <BookingButton label="Take the first step" className="btn-azure text-lg px-10 py-4 button-text transform hover:scale-105 transition-all duration-300 animate-on-scroll" />
          </div>
        </div>
      </section>

      {/* Unified Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[45%] right-[15%] w-[26rem] h-[26rem] bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-[20%] w-[30rem] h-[30rem] bg-azure/20 rounded-full blur-3xl"></div>

        {/* Gets Results */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-on-scroll">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  Career Coaching that <span className="text-carrot font-bold">gets results</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Your career is one of the biggest parts of your life. But our work paths can sometimes become difficult and confusing.
                </p>
              </div>

              <p className="text-xl text-gray-800 font-semibold mb-8 text-center animate-on-scroll">Perhaps you&apos;re&hellip;</p>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {situations.map((s) => (
                  <div key={s} className="flex items-start p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll">
                    <p className="text-gray-700 text-lg">{s}</p>
                  </div>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-3xl animate-on-scroll">
                <div className="absolute inset-0 bg-gradient-to-r from-oxford to-azure"></div>
                <div className="relative p-10 md:p-14 text-center">
                  <p className="text-xl md:text-2xl leading-relaxed text-white">
                    Whatever your situation —<br />
                    <span className="text-carrot font-bold text-2xl md:text-3xl">it&apos;s time to take back control of your career.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-24 brand-gradient-oxford relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl heading-secondary text-white mb-6">
                  What&apos;s <span className="text-carrot font-bold">included</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {whatYouGet.map((item) => (
                  <div key={item.title} className="flex items-start gap-6 animate-on-scroll">
                    <div className="w-14 h-14 bg-carrot/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className={`fas ${item.icon} text-carrot text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/80 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 animate-on-scroll">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  By the end of the programme, you will&hellip;
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-4 animate-on-scroll">
                    <i className="fas fa-check-circle text-azure text-xl mt-1 flex-shrink-0"></i>
                    <p className="text-gray-700 text-lg leading-relaxed">{outcome}</p>
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
              Ready to <span className="text-carrot font-bold">realign</span> your career?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-on-scroll">
              Book a free Clarity Call and let&apos;s talk about your career goals.
            </p>
            <BookingButton label="Book My Free Clarity Call" className="btn-azure text-lg px-10 py-4 button-text animate-on-scroll" />
          </div>
        </section>
      </div>
    </>
  )
}
