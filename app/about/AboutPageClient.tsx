'use client'

import { useTina } from 'tinacms/dist/react'
import BookingButton from '@/components/BookingButton'
import RichText from '@/components/RichText'

interface AboutData {
  about: {
    heroHeading: string
    heroSubtext: string
    storyHeading: string
    storyParagraph1: string
    storyParagraph2: string
    credentialsHeading: string
    credentialsSubtext: string
    credentials: Array<{
      icon: string
      title: string
      description: string
      gradient: string
    }>
    valuesHeading: string
    valuesSubtext: string
    values: Array<{
      icon: string
      title: string
      description: string
    }>
    ctaHeading: string
    ctaSubtext: string
    ctaButtonLabel: string
  }
}

interface Props {
  query: string
  variables: { relativePath: string }
  data: AboutData
}

export default function AboutPageClient(props: Props) {
  const { data } = useTina<AboutData>(props)
  const d = data.about

  return (
    <>
      {/* Hero */}
      <section className="page-hero bg-oxford">
        <div className="absolute inset-0 bg-oxford/90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <RichText as="h1" className="text-4xl md:text-5xl lg:text-6xl heading-primary text-white mb-6 leading-tight drop-shadow-2xl">{d.heroHeading}</RichText>
            <RichText as="p" className="text-lg md:text-xl body-text-light text-white/90 leading-relaxed max-w-3xl mx-auto">{d.heroSubtext}</RichText>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                {d.storyHeading}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {d.storyParagraph1}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {d.storyParagraph2}
              </p>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-carrot text-xl"></i>
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
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-azure/10 to-azure/10"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-carrot/30 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-azure/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[30%] right-[20%] w-96 h-96 bg-oxford/25 rounded-full blur-3xl"></div>
        <div className="absolute top-[55%] left-[10%] w-[26rem] h-[26rem] bg-azure/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-[15%] w-96 h-96 bg-azure/30 rounded-full blur-3xl"></div>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                {d.credentialsHeading}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {d.credentialsSubtext}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {(d.credentials ?? []).map((c) => (
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
                {d.valuesHeading}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {d.valuesSubtext}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {(d.values ?? []).map((v) => (
                <div key={v.title} className="text-center animate-on-scroll">
                  <div className="w-20 h-20 bg-gradient-to-r from-carrot/50 to-carrot rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <i className={`fas ${v.icon} text-white text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{v.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{v.description}</p>
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
            <BookingButton label={d.ctaButtonLabel} className="animate-on-scroll" />
          </div>
        </section>
      </div>
    </>
  )
}
