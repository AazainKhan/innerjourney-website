'use client'

import Image from 'next/image'
import Link from 'next/link'
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import type { ComponentProps } from 'react'
import Testimonials from '@/components/Testimonials'
import HomeClient from '@/components/HomeClient'
import Icon from '@/components/Icon'
import footerData from '@/content/footer.json'
import { cardSurface } from '@/lib/design-tokens'
import { LEEDS_PAGE_PATH } from '@/lib/routes'
import { lines, present, usePageDoc, type TinaDocProps } from '@/lib/use-tina-doc'
import type { HomeQuery, TestimonialsQuery } from '@/tina/__generated__/types'

// Render hero rich-text inline — strip the wrapping <p> so the surrounding
// <h1>/<p> in the JSX is the only block element. The `as any` is unavoidable:
// Tina's `Components<>` generic constrains custom keys to take `(props: object)`
// which doesn't compose with the typed base `p` shape.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inlineComponents: ComponentProps<typeof TinaMarkdown>['components'] = {
  p: (props: { children: React.ReactNode }) => <>{props.children}</>,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

/** Plain text of a rich-text AST, used to skip rendering an empty heading. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function richTextPlain(content: any): string {
  if (!content) return ''
  if (typeof content === 'string') return content.trim()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((content?.children || []) as any[])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .flatMap((b: any) => (b?.children || []) as any[])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((n: any) => (typeof n?.text === 'string' ? n.text : ''))
    .join('')
    .trim()
}

type Props = TinaDocProps<HomeQuery> & { testimonials: TinaDocProps<TestimonialsQuery> }

export default function HomePageClient(props: Props) {
  const { home: d } = usePageDoc<HomeQuery>(props)
  const hero = d.hero
  const locations = d.locations
  const intro = d.intro
  const about = d.about
  const reflection = d.reflection
  const services = d.services
  const closing = d.closingCta
  const questions = lines(reflection?.questions)
  const socialLinks = present(footerData.socialLinks)
  // The editor can clear the hero heading (letting the subtext carry the hero);
  // don't render an empty <h1> taking up vertical space.
  const hasHeroHeading = richTextPlain(hero?.heading).length > 0

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('services')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative hero-section flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-carrot/20 z-10"></div>
        <div className="absolute inset-0 overflow-hidden hero-media" aria-hidden="true">
          <Image
            src={hero?.image || '/images/hero_img-1200.webp'}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: '20% top' }}
            priority
            sizes="100vw"
          />
        </div>

        <div className="absolute top-20 left-20 w-32 h-32 bg-carrot/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-oxford/25 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>

        <div className="container mx-auto px-6 relative z-20 h-full flex items-end pb-32 md:pb-20 md:items-end">
          <div className="max-w-2xl w-full md:ml-auto text-center md:text-right">
            {hasHeroHeading && (
              <h1 data-tina-field={tinaField(hero, 'heading')} className="text-5xl md:text-7xl heading-primary text-white mb-6 leading-tight drop-shadow-2xl font-dancing font-bold animate-on-scroll">
                <TinaMarkdown content={hero?.heading} components={inlineComponents} />
              </h1>
            )}
            <div data-tina-field={tinaField(hero, 'subtext')} className="text-xl md:text-2xl body-text-light text-white/90 mb-8 leading-relaxed animate-on-scroll space-y-4 [&_strong]:font-semibold [&_em]:italic">
              <TinaMarkdown content={hero?.subtext} />
            </div>
            <HomeClient
              ctaLabel={hero?.buttonLabel ?? undefined}
              secondaryLabel={hero?.secondaryButtonLabel ?? undefined}
              ctaField={tinaField(hero, 'buttonLabel')}
              secondaryField={tinaField(hero, 'secondaryButtonLabel')}
            />
            <div className="hidden md:flex justify-end mt-6 space-x-4 hero-social-icons">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="link-muted transition-colors text-2xl opacity-90 hover:opacity-100" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Social Bar */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 bg-oxford py-4 px-4 z-20">
          <div className="flex justify-center space-x-8">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} className="text-on-secondary text-xl hover:text-carrot transition-colors" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Background Wrapper */}
      <div className="relative overflow-hidden" style={{ marginTop: '-5px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-azure/5 via-azure/10 to-azure/10"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-carrot/30 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-azure/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] right-[40%] w-96 h-96 bg-oxford/25 rounded-full blur-3xl"></div>
        <div className="absolute top-[35%] left-[5%] w-[26rem] h-[26rem] bg-azure/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[50%] right-[15%] w-[28rem] h-[28rem] bg-azure/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[65%] left-[35%] w-96 h-96 bg-azure/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[80%] right-[25%] w-[26rem] h-[26rem] bg-oxford/28 rounded-full blur-3xl"></div>
        <div className="absolute bottom-5 left-[15%] w-96 h-96 bg-azure/30 rounded-full blur-3xl"></div>

        {/* Where sessions happen — straight after the hero so location is never ambiguous. */}
        {(locations?.inPerson || locations?.online) && (
          <section aria-label="Where sessions happen" className="relative z-10 pt-10 px-6">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white border border-oxford/10 shadow-md px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">
              {locations?.inPerson && (
                <p data-tina-field={tinaField(locations, 'inPerson')} className="text-gray-900 font-semibold">
                  <i className="fas fa-map-marker-alt text-carrot mr-2" aria-hidden="true"></i>
                  {locations.inPerson}
                </p>
              )}
              {locations?.online && (
                <p data-tina-field={tinaField(locations, 'online')} className="text-gray-900 font-semibold">
                  <i className="fas fa-globe text-azure mr-2" aria-hidden="true"></i>
                  {locations.online}
                </p>
              )}
              {locations?.linkLabel && (
                <Link href={LEEDS_PAGE_PATH} data-tina-field={tinaField(locations, 'linkLabel')} className="text-azure font-semibold hover:underline whitespace-nowrap">
                  {locations.linkLabel} <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Introduction */}
        <section className="pt-20 pb-12 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 data-tina-field={tinaField(intro, 'heading')} className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-8 animate-on-scroll">
                {intro?.heading}
              </h2>
              <div data-tina-field={tinaField(intro, 'body')} className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed animate-on-scroll [&_strong]:text-gray-900 [&_strong]:font-semibold [&_em]:italic">
                <TinaMarkdown content={intro?.body} />
              </div>
              {/* Softer mid-page link rather than a third "Book a call" button —
               * scrolls to the services so visitors see the options before
               * they're asked to convert. Booking CTAs live in the hero and
               * the closing band. */}
              {intro?.linkLabel && (
                <div className="pt-2 animate-on-scroll">
                  <a
                    href="#services"
                    data-tina-field={tinaField(intro, 'linkLabel')}
                    className="inline-flex items-center gap-2 text-azure font-semibold hover:gap-3 transition-all"
                    onClick={scrollToServices}
                  >
                    {intro.linkLabel} <span aria-hidden="true">↓</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 brand-gradient-oxford relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-carrot/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-azure/10 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-left">
              <h2 data-tina-field={tinaField(about, 'heading')} className="text-4xl md:text-5xl heading-secondary text-on-secondary mb-8 animate-on-scroll">
                {about?.heading}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-on-scroll">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-carrot/50 to-carrot rounded-full flex items-center justify-center">
                    <i className="fas fa-star text-on-primary text-xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 data-tina-field={tinaField(about, 'credential')} className="text-xl font-semibold text-on-secondary">{about?.credential}</h3>
                  </div>
                </div>
                <div data-tina-field={tinaField(about, 'body')} className="space-y-6 text-lg text-on-secondary/85 leading-relaxed [&_strong]:text-on-secondary [&_strong]:font-semibold [&_em]:italic">
                  <TinaMarkdown content={about?.body} />
                </div>
                {about?.buttonLabel && (
                  <div className="flex flex-wrap gap-4">
                    <Link href="/about" data-tina-field={tinaField(about, 'buttonLabel')} className="btn-azure-outline font-semibold inline-block text-center">
                      {about.buttonLabel}
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative fade-in-left animate-on-scroll">
                <div className="w-full h-auto md:h-[32rem] overflow-visible relative" data-tina-field={tinaField(about, 'image')}>
                  <Image
                    src={about?.image || '/images/about-image-1200.webp'}
                    alt="Shanila - Confidence and Mindset Coach"
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

        {/* Reflection questions */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6 order-2 md:order-1 animate-on-scroll" data-tina-field={tinaField(reflection, 'questions')}>
                {questions.map((q, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-carrot rounded-full mt-3"></div>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
              <div className="order-1 md:order-2 animate-on-scroll">
                <h2 data-tina-field={tinaField(reflection, 'heading')} className="text-4xl md:text-6xl heading-secondary text-gray-900 mb-6 leading-tight">
                  {reflection?.heading}
                </h2>
                <div className="w-20 h-1 bg-carrot mb-6"></div>
                <p data-tina-field={tinaField(reflection, 'tagline')} className="text-xl md:text-2xl text-gray-900 font-semibold leading-relaxed">
                  {reflection?.tagline}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials {...props.testimonials} />

        {/* Services Section */}
        <section id="services" className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 data-tina-field={tinaField(services, 'heading')} className="text-4xl md:text-5xl heading-secondary text-oxford font-bold mb-4">
                {services?.heading}
              </h2>
              <p data-tina-field={tinaField(services, 'subtext')} className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mt-4">
                {services?.subtext}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12 mt-16">
              {present(services?.cards).map((card, i) => {
                const look = cardSurface(card.tone)
                return (
                  <div key={card.title || i} data-tina-field={tinaField(card)} className="service-card group animate-on-scroll">
                    <div className={`${look.surface} ${look.text} p-8 rounded-2xl h-full transition-all duration-500 transform group-hover:scale-105 shadow-xl flex flex-col`}>
                      <div className="text-4xl mb-6" data-tina-field={tinaField(card, 'icon')}><Icon name={card.icon} /></div>
                      <h3 data-tina-field={tinaField(card, 'title')} className="text-2xl font-bold mb-4">{card.title}</h3>
                      <p data-tina-field={tinaField(card, 'description')} className={`${look.textSoft} mb-6 flex-grow`}>{card.description}</p>
                      <Link href={card.href || '#'} data-tina-field={tinaField(card, 'buttonLabel')} className={`bg-white ${look.buttonText} hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 mt-auto inline-block text-center`}>
                        {card.buttonLabel}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Closing call to action */}
      <section className="py-20 brand-gradient-azure">
        <div className="container mx-auto px-6 text-center">
          <h2 data-tina-field={tinaField(closing, 'text')} className="text-2xl md:text-3xl lg:text-4xl font-bold text-on-accent mb-6 animate-on-scroll">
            {closing?.text}
          </h2>
          <HomeClient buttonOnly variant="onAzure" ctaLabel={closing?.buttonLabel ?? undefined} ctaField={tinaField(closing, 'buttonLabel')} />
        </div>
      </section>
    </>
  )
}
