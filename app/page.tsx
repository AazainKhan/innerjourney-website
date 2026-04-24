import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Testimonials from '@/components/Testimonials'
import HomeClient from '@/components/HomeClient'

export const metadata: Metadata = {
  title: 'Shanila - Clarity and Mindset Coach | Transform Your Journey',
  description: 'Transform your life with Shanila\'s expert Clarity and Mindset Coaching. Book A Consultation today and start your journey to success.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/' },
  openGraph: {
    title: 'Shanila - Clarity and Mindset Coach | Transform Your Journey',
    description: 'Transform your journey with Shanila\'s Clarity and Mindset Coaching.',
    url: 'https://innerjourney-with-shanila.com/',
    images: [{ url: '/images/hero_img.jpg' }],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative hero-section flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-orange-900/20 z-10"></div>
        <div className="absolute inset-0 overflow-hidden hero-media" aria-hidden="true">
          <Image
            src="/images/hero_img-1200.webp"
            alt="Abstract wellness background"
            fill
            className="object-cover"
            style={{ objectPosition: '20% top' }}
            priority
            sizes="100vw"
          />
        </div>

        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-oxford/25 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>

        <div className="container mx-auto px-6 relative z-20 h-full flex items-end pb-32 md:pb-20 md:items-end">
          <div className="max-w-2xl w-full md:ml-auto text-center md:text-right">
            <h1 className="text-5xl md:text-7xl heading-primary text-white mb-6 leading-tight drop-shadow-2xl font-dancing font-bold animate-on-scroll">
              Your Path back to Purpose
            </h1>
            <p className="text-xl md:text-2xl body-text-light text-white/90 mb-8 leading-relaxed animate-on-scroll">
              I help female leaders and homemakers to cultivate self-awareness, shift inner narratives, and take aligned action with confidence.
            </p>
            <HomeClient />
            <div className="hidden md:flex justify-end mt-6 space-x-4 hero-social-icons">
              <a href="https://www.facebook.com/innerjourneywithshanila/" className="link-muted transition-colors text-2xl opacity-90 hover:opacity-100" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/_.innerjourney_/" className="link-muted transition-colors text-2xl opacity-90 hover:opacity-100" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCJbRrCiY4zXfojPTa17EKMg" className="link-muted transition-colors text-2xl opacity-90 hover:opacity-100" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://api.whatsapp.com/send?phone=447387973382&" className="link-muted transition-colors text-2xl opacity-90 hover:opacity-100" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Social Bar */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 bg-oxford py-4 px-4 z-20">
          <div className="flex justify-center space-x-8">
            <a href="https://www.facebook.com/innerjourneywithshanila/" className="text-white text-xl hover:text-orange-400 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/_.innerjourney_/" className="text-white text-xl hover:text-orange-400 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/channel/UCJbRrCiY4zXfojPTa17EKMg" className="text-white text-xl hover:text-orange-400 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="https://api.whatsapp.com/send?phone=447387973382&" className="text-white text-xl hover:text-orange-400 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </section>

      {/* Unified Background Wrapper */}
      <div className="relative overflow-hidden" style={{ marginTop: '-5px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-orange-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] right-[40%] w-96 h-96 bg-purple-400/25 rounded-full blur-3xl"></div>
        <div className="absolute top-[35%] left-[5%] w-[26rem] h-[26rem] bg-indigo-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[50%] right-[15%] w-[28rem] h-[28rem] bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[65%] left-[35%] w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[80%] right-[25%] w-[26rem] h-[26rem] bg-purple-500/28 rounded-full blur-3xl"></div>
        <div className="absolute bottom-5 left-[15%] w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>

        {/* CTA Section */}
        <section className="pt-20 pb-12 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-8 animate-on-scroll">
                You&apos;ve felt <span className="text-carrot font-bold">lost</span> now for long enough
              </h2>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed animate-on-scroll">
                <p>Do you &apos;have it all&apos; on paper, but deep down this isn&apos;t lighting you up?</p>
                <p>Are you ignoring the quiet nag that you&apos;re meant for more?</p>
                <p>Does your spark feel dimmed?</p>
              </div>
              <div className="py-6 animate-on-scroll">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-2">
                  I&apos;m here to tell you that it&apos;s still there, inside you.
                </p>
                <p className="text-xl md:text-2xl text-gray-900 font-semibold">
                  You just need to look within, and take that first step.
                </p>
              </div>
              <div className="pt-4 animate-on-scroll">
                <HomeClient buttonOnly ctaLabel="Help me get clarity" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 brand-gradient-oxford relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl heading-secondary text-white mb-8 animate-on-scroll">
                Hi, I&apos;m <span className="text-carrot font-bold">Shanila</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-on-scroll">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-star text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Certified Clarity and Mindset Coach</h3>
                  </div>
                </div>
                <p className="text-lg text-gray-200 leading-relaxed">
                  Hi, I&apos;m Shanila — a coach, a facilitator with ten years of experience helping people create meaningful and lasting change in both their personal and professional lives. Over the years, I&apos;ve had the privilege of supporting them to break through barriers, reinvent their beliefs, and lead life with intentions and clarity to be the best version of themselves.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed">
                  I had the opportunity to be trained and mentored by internationally acclaimed coach (Global Guru) Vikram Dhar, whose guidance gave me a global perspective and equipped me with proven methodologies that I weave into the coaching practice.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/about" className="btn-azure-outline font-semibold inline-block text-center">
                    Read More
                  </Link>
                </div>
              </div>
              <div className="relative fade-in-left animate-on-scroll">
                <div className="w-full h-auto md:h-[32rem] overflow-visible relative">
                  <Image
                    src="/images/about-image-1200.webp"
                    alt="Shanila - Clarity and Mindset Coach"
                    width={1200}
                    height={800}
                    className="w-full md:w-auto md:max-h-full mx-auto object-cover md:object-contain shadow-2xl"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feel Like You Again Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6 order-2 md:order-1 animate-on-scroll">
                {[
                  'What if you could rewrite your story?',
                  'To feel fired up, instead of fed up, at the start of the day?',
                  'To remember what YOU felt like, before work, family, and responsibilities took over?',
                  "To get back in the driver's seat of your life, clear and confident about the road ahead?",
                ].map((q) => (
                  <div key={q} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-carrot rounded-full mt-3"></div>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
              <div className="order-1 md:order-2 animate-on-scroll">
                <h2 className="text-4xl md:text-6xl heading-secondary text-gray-900 mb-6 leading-tight">
                  Feel like <span className="text-carrot font-bold">YOU</span> again
                </h2>
                <div className="w-20 h-1 bg-carrot mb-6"></div>
                <p className="text-xl md:text-2xl text-gray-900 font-semibold leading-relaxed">
                  That&apos;s what clarity coaching can give you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Services Section */}
        <section id="services" className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className="text-4xl md:text-5xl heading-secondary text-oxford font-bold mb-4">
                Your Inner Journey starts <span className="text-carrot font-bold">here</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mt-4">
                With over ten years&apos; of experience helping individuals break through barriers in work and at home, let me take that first step with you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12 mt-16">
              {[
                {
                  icon: 'fa-lightbulb',
                  title: 'Clarity Coaching',
                  description: 'My signature 12-week coaching programme for women ready to get clear on their goals, values, decision-making, and life\'s direction.',
                  href: '/clarity-coaching',
                  btnText: 'Start my clarity journey',
                  gradient: 'brand-gradient-oxford',
                  btnColor: 'text-oxford',
                },
                {
                  icon: 'fa-chart-line',
                  title: 'Career Coaching',
                  description: 'The career edition of my clarity coaching. Whether you\'re a graduate, considering a career change, or feeling unsatisfied at work, you\'ll get clear and confident on your career path.',
                  href: '/career-coaching',
                  btnText: 'Realign my career',
                  gradient: 'brand-gradient-orange',
                  btnColor: 'text-orange-600',
                },
                {
                  icon: 'fa-star',
                  title: 'Numerology for Clarity',
                  description: 'Need answers now? My 1-hour Numerology for Clarity session will help you glean crucial insight into your life path and relationships, giving you the tools and confidence to take action today.',
                  href: '/numerology',
                  btnText: 'Book my numerology session',
                  gradient: 'brand-gradient-oxford',
                  btnColor: 'text-oxford',
                },
              ].map((service) => (
                <div key={service.title} className="service-card group animate-on-scroll">
                  <div className={`${service.gradient} p-8 rounded-2xl text-white h-full transition-all duration-500 transform group-hover:scale-105 shadow-xl flex flex-col`}>
                    <div className="text-4xl mb-6"><i className={`fas ${service.icon}`}></i></div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-white/90 mb-6 flex-grow">{service.description}</p>
                    <Link href={service.href} className={`bg-white ${service.btnColor} hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 mt-auto inline-block text-center`}>
                      {service.btnText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="py-20 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-3xl font-bold text-white mb-6 animate-on-scroll">
            Not sure what service is right for you? Book your free Clarity Call, and we&apos;ll find the right fit.
          </h2>
          <HomeClient buttonOnly ctaLabel="Book A Consultation" />
        </div>
      </section>
    </>
  )
}
