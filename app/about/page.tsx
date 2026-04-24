import type { Metadata } from 'next'
import Image from 'next/image'
import BookingButton from '@/components/BookingButton'

export const metadata: Metadata = {
  title: 'About Shanila - Clarity and Mindset Coach',
  description: 'Learn more about Shanila, a certified Clarity and Mindset Coach with over 10 years of experience helping people rewrite their story with clarity and confidence.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/about' },
  openGraph: {
    title: 'About Shanila - Clarity and Mindset Coach | Your Journey to Success',
    description: 'Learn more about Shanila, a certified Clarity and Mindset Coach with years of experience helping people build clarity and confidence.',
    url: 'https://innerjourney-with-shanila.com/about',
    images: [{ url: '/images/about-image.jpg' }],
  },
}

const credentials = [
  {
    icon: 'fa-brain',
    title: 'Master Practitioner in NLP',
    description: 'Advanced certification in Neuro-Linguistic Programming techniques for personal transformation and behavioral change.',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    icon: 'fa-heart',
    title: 'Certified Emotional Intelligence Practitioner',
    description: 'Specialized training in understanding and applying emotional intelligence for personal and professional growth.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: 'fa-certificate',
    title: 'ICF Qualified Associate Certified Coach',
    description: 'International Coaching Federation accredited coach, meeting the highest standards of professional coaching practice.',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    icon: 'fa-star',
    title: 'Vedic Numerologist',
    description: 'Certified in Vedic Numerology to provide deep insights into life paths, relationships, and personal patterns.',
    gradient: 'from-carrot to-yellow-600',
  },
]

const values = [
  {
    icon: 'fa-compass',
    title: 'Clarity',
    description: 'I help you cut through the noise and find the clear path that aligns with who you truly are and what you genuinely want.',
  },
  {
    icon: 'fa-shield-alt',
    title: 'Authenticity',
    description: 'I believe in honest, real conversations. No judgment, no pretense — just genuine support for your unique journey.',
  },
  {
    icon: 'fa-rocket',
    title: 'Empowerment',
    description: 'My goal is to empower you with the tools, mindset, and confidence to take decisive action and create lasting change.',
  },
  {
    icon: 'fa-heart',
    title: 'Compassion',
    description: 'I approach every coaching relationship with deep empathy and understanding, meeting you exactly where you are.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-oxford overflow-hidden">
        <div className="absolute inset-0 bg-oxford/90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl heading-primary text-white mb-6 leading-tight drop-shadow-2xl font-dancing font-bold">
              Meet Shanila
            </h1>
            <p className="text-xl md:text-2xl body-text-light text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Your dedicated Clarity and Mindset Coach, committed to helping you unlock your potential and create the life you&apos;ve always dreamed of.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                Clarity, Mindset, and Transformation – My Story
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Shanila, an accomplished coach with a ten year track record, possesses a deep understanding of coaching methodologies, guiding individuals to achieve personal and professional goals. Committed to continuous learning and known for her empathetic approach, she empowers clients to overcome challenges and unlock their potential. Her dedicated coaching experience reflects a commitment to excellence and passion for positive change.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Trained by internationally acclaimed coach (Global Guru) Vikram Dhar, Shanila&apos;s coaching approach is infused with a global perspective and proven methodologies, enabling her to drive impactful transformations. Boasting diverse credentials, including a Master Practitioner in NLP, Certified Emotional Intelligence Practitioner, ICF qualified Associate Certified Coach, and Vedic Numerologist.
              </p>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-orange-500 text-xl"></i>
                <span className="text-gray-700 font-medium">Certified Coach</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/l-9i_aFrrI8?si=jYmGhpYZwKLPh5ZB&clip=UgkxIU9JKRh9xHPvGE-iocWYYbXnYUMpYuts&clipt=EIq5ERjb1xQ"
                  title="Shanila Khan - Coach introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials + Values */}
      <div className="relative overflow-hidden" style={{ marginTop: '-5px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-orange-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[30%] right-[20%] w-96 h-96 bg-purple-400/25 rounded-full blur-3xl"></div>
        <div className="absolute top-[55%] left-[10%] w-[26rem] h-[26rem] bg-indigo-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-[15%] w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Qualifications</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                I&apos;m committed to continuous learning and professional development to provide you with the best coaching experience.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {credentials.map((c) => (
                <div key={c.title} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll">
                  <div className={`w-16 h-16 bg-gradient-to-r ${c.gradient} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    <i className={`fas ${c.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{c.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                My Coaching <span className="text-carrot font-bold">Values</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((v) => (
                <div key={v.title} className="text-center animate-on-scroll">
                  <div className="w-16 h-16 bg-oxford rounded-full flex items-center justify-center mb-4 mx-auto">
                    <i className={`fas ${v.icon} text-carrot text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6 animate-on-scroll">
              Ready to start your <span className="text-carrot font-bold">journey</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-on-scroll">
              Book a free Clarity Call and let&apos;s explore how coaching can help you create the change you&apos;re seeking.
            </p>
            <BookingButton label="Book Your Free Clarity Call" className="btn-azure text-lg px-10 py-4 button-text animate-on-scroll" />
          </div>
        </section>
      </div>
    </>
  )
}
