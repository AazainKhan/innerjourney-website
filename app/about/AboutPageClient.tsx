'use client'

import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Icon from '@/components/Icon'
import RichText from '@/components/RichText'
import { gradientClasses } from '@/lib/design-tokens'
import { present, usePageDoc, type TinaDocProps } from '@/lib/use-tina-doc'
import type { AboutQuery } from '@/tina/__generated__/types'

export default function AboutPageClient(props: TinaDocProps<AboutQuery>) {
  const { about: d } = usePageDoc<AboutQuery>(props)
  const { hero, story, credentials, values } = d

  return (
    <>
      {/* Hero */}
      <section className="page-hero bg-oxford">
        <div className="absolute inset-0 bg-oxford/90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <RichText as="h1" field={tinaField(hero, 'heading')} className="text-4xl md:text-5xl lg:text-6xl heading-primary text-on-secondary font-dancing font-bold mb-6 leading-tight drop-shadow-2xl">{hero?.heading}</RichText>
            <div data-tina-field={tinaField(hero, 'subtext')} className="text-lg md:text-xl body-text-light text-on-secondary/90 leading-relaxed max-w-3xl mx-auto space-y-4 [&_strong]:font-semibold [&_em]:italic">
              <TinaMarkdown content={hero?.subtext} />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 data-tina-field={tinaField(story, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                {story?.heading}
              </h2>
              <div data-tina-field={tinaField(story, 'body')} className="space-y-6 text-lg text-gray-700 leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-semibold [&_em]:italic">
                <TinaMarkdown content={story?.body} />
              </div>
              {story?.badge && (
                <div className="flex items-center space-x-2" data-tina-field={tinaField(story, 'badge')}>
                  <i className="fas fa-check-circle text-carrot text-xl" aria-hidden="true"></i>
                  <span className="text-gray-700 font-medium">{story.badge}</span>
                </div>
              )}
            </div>
            {story?.videoUrl && (
              <div className="relative" data-tina-field={tinaField(story, 'videoUrl')}>
                <div className="w-full h-96 rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    width="560"
                    height="315"
                    src={story.videoUrl}
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
            )}
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
              <h2 data-tina-field={tinaField(credentials, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                {credentials?.heading}
              </h2>
              <p data-tina-field={tinaField(credentials, 'subtext')} className="text-xl text-gray-600 max-w-2xl mx-auto">
                {credentials?.subtext}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {present(credentials?.items).map((c, i) => (
                <div key={c.title || i} data-tina-field={tinaField(c)} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll">
                  <div data-tina-field={tinaField(c, 'gradient')} className={`w-16 h-16 bg-gradient-to-r ${gradientClasses(c.gradient)} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    <Icon name={c.icon} className="text-white text-2xl" />
                  </div>
                  <h3 data-tina-field={tinaField(c, 'title')} className="text-xl font-semibold text-gray-900 mb-4 text-center">{c.title}</h3>
                  <p data-tina-field={tinaField(c, 'description')} className="text-gray-600 text-center leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 data-tina-field={tinaField(values, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6">
                {values?.heading}
              </h2>
              <p data-tina-field={tinaField(values, 'subtext')} className="text-xl text-gray-600 max-w-2xl mx-auto">
                {values?.subtext}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {present(values?.items).map((v, i) => (
                <div key={v.title || i} data-tina-field={tinaField(v)} className="text-center animate-on-scroll">
                  <div data-tina-field={tinaField(v, 'icon')} className="w-20 h-20 bg-gradient-to-r from-carrot/50 to-carrot rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name={v.icon} className="text-on-primary text-3xl" />
                  </div>
                  <h3 data-tina-field={tinaField(v, 'title')} className="text-xl font-semibold text-gray-900 mb-4">{v.title}</h3>
                  <p data-tina-field={tinaField(v, 'description')} className="text-gray-600 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
