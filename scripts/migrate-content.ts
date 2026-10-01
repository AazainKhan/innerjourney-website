/**
 * One-time content migration to the sectioned Tina schema (Sept 2026).
 *
 *   npx tsx scripts/migrate-content.ts          # rewrite content/ in place
 *   npx tsx scripts/migrate-content.ts --check  # exit 1 if anything needs migrating
 *
 * Idempotent: documents already in the new shape are left untouched, so it is
 * safe to re-run after rebasing onto newer CMS edits from main.
 *
 * Nothing here changes wording. It only moves values to their new homes:
 *   - flat fields → section groups (hero, closingCta, …)
 *   - prefix + highlight pairs → full heading + words to colour
 *   - CSS class strings → tone / gradient preset names
 *   - Resources "featured" references → a Featured toggle on each post
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { joinHighlight } from '../lib/highlight'
import { normalizeGradient, normalizeTone } from '../lib/design-tokens'

type Json = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

const hl = (prefix: unknown, highlight: unknown) => ({
  heading: joinHighlight(prefix as string, highlight as string),
  highlight: (highlight as string) ?? '',
})
const line = (text: unknown, highlight: unknown) => ({
  text: joinHighlight(text as string, highlight as string),
  highlight: (highlight as string) ?? '',
})
const arr = <T = Json>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])

/** Drop undefined keys so the JSON stays tidy. */
function clean<T>(v: T): T {
  if (Array.isArray(v)) return v.map(clean) as T
  if (v && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype) {
    const out: Json = {}
    for (const [k, val] of Object.entries(v)) if (val !== undefined) out[k] = clean(val)
    return out as T
  }
  return v
}

const serviceTone = (scheme: unknown) => (scheme === 'orange' ? 'primary' : 'secondary')

export const migrators: Record<string, { isNew: (d: Json) => boolean; migrate: (d: Json) => Json }> = {
  'pages/home.json': {
    isNew: (d) => 'hero' in d,
    migrate: (d) => ({
      hero: {
        image: d.heroImage,
        heading: d.heroHeading,
        subtext: d.heroSubtext,
        buttonLabel: d.heroCTALabel,
        secondaryButtonLabel: 'Learn More',
      },
      intro: { heading: d.ctaHeading, body: d.ctaBody, linkLabel: 'See how I can help' },
      about: {
        heading: d.aboutHeading,
        image: d.aboutImage,
        credential: d.aboutCredentialTitle,
        body: d.aboutBody,
        buttonLabel: 'Read More',
      },
      reflection: { heading: d.feelLikeYouHeading, tagline: d.feelLikeYouTagline, questions: d.feelLikeYouQuestions },
      services: {
        heading: d.servicesHeading,
        subtext: d.servicesSubtext,
        cards: arr(d.services).map((s) => ({
          title: s.title,
          description: s.description,
          icon: s.icon,
          href: s.href,
          buttonLabel: s.buttonLabel,
          tone: serviceTone(s.colorScheme),
        })),
      },
      closingCta: { text: d.bottomCTAText, buttonLabel: d.heroBottomCTALabel },
    }),
  },

  'pages/services.json': {
    isNew: (d) => 'hero' in d,
    migrate: (d) => ({
      hero: { heading: d.heroHeading, subtext: d.heroSubtext },
      cards: arr(d.services).map((s) => ({
        title: s.title,
        duration: s.duration,
        description: s.description,
        icon: s.icon,
        highlights: s.highlights,
        href: s.href,
        buttonLabel: s.buttonLabel,
        tone: serviceTone(s.colorScheme),
        fitHeading: 'Is this for you?',
        fitBody: s.isThisForYou,
        learnMoreLabel: `Learn more about ${String(s.title ?? '').toLowerCase()}`,
      })),
      closingCta: { heading: d.ctaHeading, subtext: d.ctaSubtext, buttonLabel: d.ctaButtonLabel },
    }),
  },

  'pages/about.json': {
    isNew: (d) => 'hero' in d,
    migrate: (d) => ({
      hero: { heading: d.heroHeading, subtext: d.heroSubtext },
      story: {
        heading: d.storyHeading,
        body: d.storyBody,
        badge: 'Certified Coach',
        videoUrl: 'https://www.youtube.com/embed/l-9i_aFrrI8?si=jYmGhpYZwKLPh5ZB&clip=UgkxIU9JKRh9xHPvGE-iocWYYbXnYUMpYuts&clipt=EIq5ERjb1xQ',
      },
      credentials: {
        heading: d.credentialsHeading,
        subtext: d.credentialsSubtext,
        items: arr(d.credentials).map((c) => ({
          title: c.title,
          description: c.description,
          icon: c.icon,
          gradient: normalizeGradient(c.gradient),
        })),
      },
      values: {
        heading: d.valuesHeading,
        subtext: d.valuesSubtext,
        items: arr(d.values).map((v) => ({ title: v.title, description: v.description, icon: v.icon })),
      },
    }),
  },

  'pages/clarity-coaching.json': {
    isNew: (d) => 'hero' in d,
    migrate: (d) => ({
      hero: {
        eyebrow: d.heroBadge,
        heading: d.heroHeading,
        subtext: d.heroSubtext,
        buttonLabel: d.heroCTALabel,
        sideEmoji: d.heroSideEmoji,
        sideHeading: d.heroSideWeeks,
        sideSubtext: d.heroSideSubtext,
      },
      whoItsFor: {
        ...hl(d.resultsHeadingPrefix, d.resultsHeadingHighlight),
        subtext: d.resultsSubtext,
        listIntro: d.perhapsLabel,
        items: arr(d.perhapsItems).map((i) => ({ emoji: i.emoji, text: i.text, tone: normalizeTone(i.borderColor) })),
        banner: line(d.bannerText, d.bannerHighlight),
      },
      problemSolution: {
        ...hl(d.missingPieceHeadingPrefix, d.missingPieceHeadingHighlight),
        problem: { title: d.problemTitle, body: d.problemBody },
        solution: { title: d.solutionTitle, body: d.solutionBody, keyword: d.solutionWord },
      },
      philosophy: {
        eyebrow: d.philosophyLabel,
        ...hl(d.philosophyHeadingPrefix, d.philosophyHeadingHighlight),
        quote: d.philosophyQuote,
        body: d.philosophyBody,
        banner: line(d.philosophyBannerPrefix, d.philosophyBannerHighlight),
        closing: line(d.philosophyClosingPrefix, d.philosophyClosingHighlight),
      },
      journey: {
        eyebrow: d.timelineLabel,
        ...hl(d.timelineHeadingPrefix, d.timelineHeadingHighlight),
        subtext: d.timelineSubtext,
        steps: arr(d.timelineSteps).map((s) => ({
          number: s.number,
          weeks: s.weeks,
          title: s.title,
          subtitle: s.subtitle,
          description: s.description,
          tone: normalizeTone(s.accent),
        })),
        buttonLabel: d.timelineCTALabel,
      },
      included: {
        eyebrow: d.experienceLabel,
        ...hl(d.experienceHeadingPrefix, d.experienceHeadingHighlight),
        items: arr(d.experienceItems).map((i) => ({ emoji: i.emoji, title: i.title, subtitle: i.subtitle, tone: normalizeTone(i.bg) })),
        bonus: { emoji: d.bonusEmoji, label: d.bonusPrefix, text: d.bonusText },
      },
      closingCta: {
        ...hl(d.ctaSectionHeadingPrefix, d.ctaSectionHeadingHighlight),
        body: d.ctaSectionBody,
        buttonLabel: d.ctaButtonLabel,
      },
    }),
  },

  'pages/career-coaching.json': {
    isNew: (d) => 'hero' in d,
    migrate: (d) => ({
      hero: { heading: d.heroHeading, subtext: d.heroSubtext, buttonLabel: d.heroCTALabel },
      whoItsFor: {
        ...hl(d.resultsHeadingPrefix, d.resultsHeadingHighlight),
        subtext: d.resultsSubtext,
        listIntro: d.perhapsLabel,
        situations: d.situations,
        banner: line(d.bannerPrefix, d.bannerHighlight),
      },
      approach: {
        ...hl(d.clarityHeadingPrefix, d.clarityHeadingHighlight),
        body: d.clarityBody,
        keyword: d.clarityBigWord,
      },
      philosophy: { ...hl(d.philosophyHeadingPrefix, d.philosophyHeadingHighlight), body: d.philosophyBody },
      // The old template hard-coded the "…" after the highlighted word.
      imagine: {
        heading: d.imagineHeadingHighlight ? `${d.imagineHeadingHighlight}…` : '',
        highlight: d.imagineHeadingHighlight ?? '',
        items: arr(d.imagineItems).map((i) => ({ emoji: i.emoji, text: i.text, tone: normalizeTone(i.borderColor) })),
      },
      journey: {
        ...hl(d.roadmapHeadingPrefix, d.roadmapHeadingHighlight),
        lead: d.roadmapSubtext1,
        intro: d.roadmapSubtext2,
        steps: arr(d.roadmapSteps).map((s) => ({
          number: s.number,
          weeks: s.weeks,
          title: s.title,
          subtitle: s.subtitle,
          tone: normalizeTone(s.subtitleColor),
          description: s.description,
        })),
        buttonLabel: d.roadmapCTALabel,
      },
      included: {
        ...hl(d.experienceHeadingPrefix, d.experienceHeadingHighlight),
        subtext: d.experienceSubtext,
        items: d.experienceItems,
      },
      closingCta: {
        ...hl(d.ctaSectionHeadingPrefix, d.ctaSectionHeadingHighlight),
        body: d.ctaSectionBody,
        buttonLabel: d.ctaButtonLabel,
      },
    }),
  },

  'pages/numerology.json': {
    isNew: (d) => 'hero' in d,
    migrate: (d) => ({
      hero: {
        eyebrow: d.heroBadge,
        heading: d.heroHeading,
        tagline: d.heroTagline,
        subtext: d.heroSubtext,
        buttonLabel: d.heroCTALabel,
      },
      whoItsFor: {
        ...hl(d.selfDiscoveryHeadingPrefix, d.selfDiscoveryHeadingHighlight),
        subtext: d.selfDiscoverySubtext,
        items: arr(d.selfDiscoveryItems).map((i) => ({ emoji: i.emoji, text: i.text, tone: normalizeTone(i.borderColor) })),
        statement: line(d.selfDiscoveryStatementPrefix, d.selfDiscoveryStatementHighlight),
      },
      whatItIs: {
        eyebrow: d.whatIsLabel,
        ...hl(d.whatIsHeadingPrefix, d.whatIsHeadingHighlight),
        isNot: d.whatIsIsntParagraph,
        isText: d.whatIsIsBody,
      },
      process: {
        eyebrow: d.processLabel,
        ...hl(d.processHeadingPrefix, d.processHeadingHighlight),
        steps: arr(d.processSteps).map((s) => ({ emoji: s.emoji, label: s.stepLabel, title: s.title, description: s.description })),
      },
      included: {
        eyebrow: d.includesLabel,
        ...hl(d.includesHeadingPrefix, d.includesHeadingHighlight),
        subtext: d.includesSubtext,
        items: arr(d.includes).map((i) => ({ emoji: i.emoji, title: i.title, description: i.description })),
      },
      philosophy: {
        eyebrow: d.philosophyLabel,
        ...hl(d.philosophyHeadingPrefix, d.philosophyHeadingHighlight),
        quote: d.philosophyQuote,
        body: d.philosophyBody,
        banner: { text: d.philosophyBanner ?? '', highlight: '' },
        closing: line(d.philosophyClosingPrefix, d.philosophyClosingHighlight),
      },
      closingCta: { heading: d.ctaSectionHeading, buttonLabel: d.ctaButtonLabel },
    }),
  },

  'pages/resources.json': {
    isNew: (d) => 'hero' in d,
    migrate: (d) => ({
      hero: { eyebrow: d.heroBadge, ...hl(d.heroHeading, d.heroHeadingHighlight), subtext: d.heroSubtext },
      sectionNav: [
        { label: 'Featured', icon: 'fa-star', target: 'featured' },
        { label: 'Blog Library', icon: 'fa-pen-fancy', target: 'blog' },
        { label: 'Podcast Library', icon: 'fa-podcast', target: 'podcast' },
      ],
      featured: { heading: d.featuredHeading },
      blogLibrary: {
        heading: d.blogLibraryHeading,
        readMoreLabel: 'Read more',
        backLinkLabel: 'Back to all posts',
        emptyPostMessage: 'This post is still being written — check back soon.',
      },
      podcastLibrary: { heading: d.podcastLibraryHeading, listenLabel: 'Listen now', comingSoonLabel: 'Coming soon' },
      newsletter: {
        heading: d.newsletterHeading,
        subtext: d.newsletterSubtext,
        placeholder: d.newsletterPlaceholder,
        buttonLabel: d.newsletterButton,
        successMessage: d.newsletterSuccessMessage,
      },
    }),
  },

  'pages/contact.json': {
    isNew: (d) => 'hero' in d,
    migrate: (d) => ({
      hero: { image: d.heroImage, heading: d.heroHeading, subtext: d.heroSubtext },
      intro: { heading: d.sectionHeading, subtext: d.sectionSubtext },
      details: {
        emailTitle: 'Email',
        email: d.email,
        phoneTitle: 'Phone',
        phone: d.phone,
        videoTitle: 'Video Sessions',
        video: d.videoText,
        locationTitle: 'Location',
        location: d.location,
        bookingButtonLabel: d.bookingCTALabel,
      },
      form: {
        heading: d.formHeading,
        nameLabel: 'Full Name',
        namePlaceholder: 'Your full name',
        emailLabel: 'Email Address',
        emailPlaceholder: 'your@email.com',
        phoneLabel: 'Phone Number',
        phonePlaceholder: '07xxx xxxxxx',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your goals, challenges, or questions...',
        submitLabel: 'Send!',
        submittingLabel: 'Sending...',
        privacyNote: 'By submitting this form, you agree to our privacy policy and terms of service.',
      },
    }),
  },

  'testimonials.json': {
    isNew: (d) => 'heading' in d,
    migrate: (d) => ({ heading: 'Client Transformations', items: d.items }),
  },

  'booking-form.json': {
    isNew: (d) => 'servicePlaceholder' in d,
    migrate: (d) => ({ ...d, servicePlaceholder: 'Select a service…' }),
  },
}

/* ── Markdown posts / episodes ────────────────────────────────────────── */

export function migrateFrontmatter(data: Json, featured: boolean): Json | null {
  if ('cardStyle' in data) return null
  const { icon, iconColor, gradient, badgeColor, ...rest } = data
  // Colour follows the badge (what an editor actually picked), then the gradient.
  const tone = normalizeTone(badgeColor ?? iconColor ?? gradient, 'primary')
  return clean({ ...rest, featured, cardStyle: { icon, tone } })
}

/** Slugs featured on the old Resources page, read before it is migrated. */
export function featuredSlugs(resources: Json): { posts: Set<string>; podcasts: Set<string> } {
  const slug = (ref: unknown) => (typeof ref === 'string' ? ref.replace(/^.*\//, '').replace(/\.md$/, '') : null)
  return {
    posts: new Set(arr(resources.featuredPosts).map((i) => slug(i.post)).filter(Boolean) as string[]),
    podcasts: new Set(arr(resources.featuredPodcasts).map((i) => slug(i.podcast)).filter(Boolean) as string[]),
  }
}

export function migrateJson(relPath: string, data: Json): Json | null {
  const m = migrators[relPath]
  if (!m || m.isNew(data)) return null
  return clean(m.migrate(data))
}

/* ── CLI ──────────────────────────────────────────────────────────────── */

function run(root: string, check: boolean) {
  const contentDir = path.join(root, 'content')
  const changed: string[] = []
  const read = (rel: string) => JSON.parse(fs.readFileSync(path.join(contentDir, rel), 'utf8'))

  const featured = featuredSlugs(read('pages/resources.json'))

  for (const rel of Object.keys(migrators)) {
    const file = path.join(contentDir, rel)
    if (!fs.existsSync(file)) continue
    const next = migrateJson(rel, read(rel))
    if (!next) continue
    changed.push(rel)
    if (!check) fs.writeFileSync(file, JSON.stringify(next, null, 2) + '\n')
  }

  for (const [dir, set] of [['posts', featured.posts], ['podcasts', featured.podcasts]] as const) {
    const abs = path.join(contentDir, dir)
    if (!fs.existsSync(abs)) continue
    for (const f of fs.readdirSync(abs).filter((f) => f.endsWith('.md'))) {
      const raw = fs.readFileSync(path.join(abs, f), 'utf8')
      const parsed = matter(raw)
      const next = migrateFrontmatter(parsed.data, set.has(f.replace(/\.md$/, '')))
      if (!next) continue
      changed.push(`${dir}/${f}`)
      if (!check) fs.writeFileSync(path.join(abs, f), matter.stringify(parsed.content, next, { lineWidth: -1 } as never))
    }
  }

  if (changed.length === 0) console.log('Content is already in the new shape — nothing to do.')
  else console.log(`${check ? 'Needs migrating' : 'Migrated'}:\n  ${changed.join('\n  ')}`)
  if (check && changed.length) process.exitCode = 1
}

const invokedDirectly = process.argv[1] && /migrate-content\.[tj]s$/.test(process.argv[1])
if (invokedDirectly) run(process.cwd(), process.argv.includes('--check'))
