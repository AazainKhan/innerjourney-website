import type { Metadata } from 'next'
import BookingButton from '@/components/BookingButton'

export const metadata: Metadata = {
  title: 'Clarity Coaching - Transform Your Life in 12 Weeks',
  description: 'Get answers and transform your life in just 12 weeks. Discover the missing piece to achieving lasting change with Shanila\'s compassionate clarity coaching.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/clarity-coaching' },
  openGraph: {
    title: 'Clarity Coaching - Shanila Khan | Transform Your Life in 12 Weeks',
    description: 'Get answers and transform your life in just 12 weeks with compassionate clarity coaching.',
    url: 'https://innerjourney-with-shanila.com/clarity-coaching',
  },
}

const perhapsItems = [
  { emoji: '🔀', text: 'At a crossroads, struggling to make a decision', border: 'border-carrot' },
  { emoji: '🏠', text: 'Experiencing a big life change, like becoming a parent, or a house move', border: 'border-azure' },
  { emoji: '💔', text: 'In a relationship dynamic that no longer serves you', border: 'border-carrot' },
  { emoji: '🎭', text: "Fed up of being the supporting role in everyone else's life", border: 'border-azure' },
  { emoji: '⏸️', text: 'Bored of putting your own goals on pause, but struggling to make progress', border: 'border-carrot' },
]

const whatYouGetItems = [
  { icon: 'fa-comments', title: '12 One-to-One Sessions', desc: 'Weekly 60-minute coaching sessions tailored entirely to you and your goals.' },
  { icon: 'fa-book-open', title: 'Personalised Coaching Plan', desc: 'A bespoke plan built around your unique challenges, values, and desired outcomes.' },
  { icon: 'fa-tools', title: 'Practical Tools & Exercises', desc: 'Proven techniques and exercises to build clarity, confidence, and forward momentum.' },
  { icon: 'fa-envelope', title: 'Ongoing Support', desc: 'Email support between sessions so you\'re never alone on your journey.' },
]

const outcomes = [
  'Get clear on your values and what truly matters to you',
  'Make confident decisions aligned with your authentic self',
  'Break through the mental blocks holding you back',
  'Build the courage to take action towards your goals',
  'Develop lasting habits and a growth mindset',
  'Step into the next chapter of your life with clarity',
]

export default function ClarityCoachingPage() {
  return (
    <>
      {/* Unified Gradient Background Wrapper */}
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
          <div className="container mx-auto px-6 relative z-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <span className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-4 animate-on-scroll">12-Week Transformation Programme</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl heading-primary text-white lg:text-gray-900 mb-6 leading-tight font-dancing font-bold animate-on-scroll">
                  Get answers and transform your life
                </h1>
                <p className="text-lg md:text-xl body-text text-white/90 lg:text-gray-600 mb-8 leading-relaxed max-w-xl animate-on-scroll">
                  Discover the missing piece to achieving lasting change, and the life you deserve
                </p>
                <BookingButton label="Take the first step" className="btn-azure text-lg px-10 py-4 button-text transform hover:scale-105 transition-all duration-300 animate-on-scroll" />
              </div>
              <div className="hidden lg:flex items-center justify-center order-1 lg:order-2">
                <div className="text-center text-white">
                  <p className="text-8xl mb-4">✨</p>
                  <p className="text-2xl font-semibold mb-2">12 Weeks</p>
                  <p className="text-lg text-white/80">To lasting clarity</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gets Results */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 animate-on-scroll">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                  Clarity Coaching that <span className="text-carrot font-bold">gets results</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  There comes a time in life when you find yourself on a challenging path, but can&apos;t find a clear way through.
                </p>
              </div>

              <div className="mb-16">
                <p className="text-xl text-gray-800 font-semibold mb-10 text-center animate-on-scroll">Perhaps you&apos;re&hellip;</p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  {perhapsItems.map((item) => (
                    <div key={item.text} className={`flex items-center gap-5 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all border-l-4 ${item.border} animate-on-scroll`} style={{ transition: 'all 0.3s ease' }}>
                      <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                      <p className="text-gray-700 text-lg">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl animate-on-scroll">
                <div className="absolute inset-0 bg-gradient-to-r from-oxford to-azure"></div>
                <div className="relative p-10 md:p-14 text-center">
                  <p className="text-xl md:text-2xl leading-relaxed text-white">
                    You&apos;re done going through the motions —<br />
                    <span className="text-carrot font-bold text-2xl md:text-3xl">it&apos;s time to get answers.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clarity: Your Missing Piece */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-on-scroll">
                <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900">
                  Clarity: your <span className="text-azure font-bold">missing piece</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: 'fa-compass', title: 'Direction', desc: 'When you have clarity, you know exactly which path to take — even when things get uncertain.' },
                  { icon: 'fa-bolt', title: 'Confidence', desc: 'Clarity gives you the confidence to make bold decisions without second-guessing yourself.' },
                  { icon: 'fa-fire', title: 'Energy', desc: 'When you\'re aligned with your purpose, you stop wasting energy on what doesn\'t matter.' },
                ].map((c) => (
                  <div key={c.title} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-azure to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <i className={`fas ${c.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{c.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
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
                {whatYouGetItems.map((item) => (
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
              Ready to get <span className="text-carrot font-bold">clear</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-on-scroll">
              Book a free Clarity Call and let&apos;s explore if this programme is the right fit for you.
            </p>
            <BookingButton label="Book My Free Clarity Call" className="btn-azure text-lg px-10 py-4 button-text animate-on-scroll" />
          </div>
        </section>
      </div>
    </>
  )
}
