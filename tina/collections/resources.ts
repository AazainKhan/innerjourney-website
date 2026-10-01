import type { Collection, TinaField } from 'tinacms'
import { libraryManagerField } from '../fields'
import { previewRoute } from '../../lib/tina-select'
import { eyebrow, headingWithHighlight, icon, image, list, section, seoSection, slugify, text, textarea, tone } from '../shared'

const manage = (kind: 'post' | 'podcast', label: string): TinaField => ({
  type: 'string',
  list: false,
  name: 'manage',
  label,
  ui: { component: libraryManagerField(kind) },
})

export const resources: Collection = {
  name: 'resources',
  label: 'Resources Page',
  path: 'content/pages',
  match: { include: 'resources' },
  format: 'json',
  ui: { router: () => '/resources', allowedActions: { create: false, delete: false } },
  fields: [
    section('hero', 'Hero (top of page)', [eyebrow(), ...headingWithHighlight(), textarea('subtext', 'Subtext')]),
    list('sectionNav', 'Jump buttons', [
      text('label', 'Label'),
      icon(),
      {
        type: 'string',
        name: 'target',
        label: 'Jumps to',
        options: [
          { value: 'featured', label: 'Featured' },
          { value: 'blog', label: 'Blog library' },
          { value: 'podcast', label: 'Podcast library' },
        ],
      },
    ], {
      itemLabel: 'label',
      fallback: 'Jump button',
      description: 'The round buttons in the hero that jump down the page. Add, remove or drag to reorder. A button hides itself while its section is empty.',
      defaultItem: { label: 'Blog Library', icon: 'fa-pen-fancy', target: 'blog' },
    }),
    section('featured', 'Featured', [text('heading', 'Badge text')], 'To feature a post or episode, open it and switch on “Feature on Resources page”.'),
    section('blogLibrary', 'Blog library', [
      text('heading', 'Heading'),
      manage('post', 'Blog posts'),
      text('readMoreLabel', 'Card link text'),
      text('backLinkLabel', 'Back link on each post page'),
      text('emptyPostMessage', 'Message on a post with no text yet'),
      section('postEnding', 'End of each post', [
        text('serviceEyebrow', 'Service card — small label'),
        text('serviceHeading', 'Service card — heading', { description: 'Write {service} where the service name should go, e.g. "Ready to go further with {service}?"' }),
        textarea('serviceText', 'Service card — text'),
        text('serviceButton', 'Service card — button', { description: 'Write {service} where the service name should go.' }),
        text('relatedHeading', 'Heading above related posts'),
      ], 'The card suggesting a service and the "keep reading" posts shown after every blog post.'),
    ]),
    section('podcastLibrary', 'Podcast library', [
      text('heading', 'Heading'),
      manage('podcast', 'Podcast episodes'),
      text('listenLabel', 'Listen button'),
      text('comingSoonLabel', 'Button when there is no link yet'),
    ]),
    section('newsletter', 'Newsletter sign-up', [
      text('heading', 'Heading'),
      textarea('subtext', 'Subtext'),
      text('placeholder', 'Email box hint text'),
      text('buttonLabel', 'Button'),
      text('successMessage', 'Thank-you message'),
    ]),
    seoSection(),
  ],
}

const STATUS = { type: 'string', name: 'status', label: 'Status', options: ['Published', 'Coming Soon', 'Draft'] } as TinaField

const featured: TinaField = {
  type: 'boolean',
  name: 'featured',
  label: 'Feature on Resources page',
  description: 'Shows this at the top of the Resources page, above the library.',
}

const cardStyle = (defaultIcon: string): TinaField =>
  section('cardStyle', 'Card look (when there’s no cover image)', [
    icon('icon', 'Icon'),
    tone('tone', 'Colour', ['primary', 'accent', 'secondary']),
  ], `Used only when no cover image is set. Default icon: ${defaultIcon.replace('fa-', '')}.`)

export const post: Collection = {
  name: 'post',
  label: 'Resources › Blog posts',
  path: 'content/posts',
  format: 'md',
  ui: {
    router: ({ document }) => `/blog/${document._sys.filename}`,
    filename: { readonly: false, slugify },
  },
  defaultItem: () => ({
    title: 'New Blog Post',
    publishedAt: new Date().toISOString(),
    status: 'Draft',
    featured: false,
    excerpt: 'Write a short excerpt for the preview card…',
    cardStyle: { icon: 'fa-pen-fancy', tone: 'primary' },
    relatedService: 'mindset',
  }),
  fields: [
    { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
    { type: 'datetime', name: 'publishedAt', label: 'Published date' },
    STATUS,
    featured,
    textarea('excerpt', 'Short summary', { description: 'Shown on the card and under the title.' }),
    image('image', 'Cover image', { description: 'Shown on the card and behind the title.' }),
    cardStyle('fa-pen-fancy'),
    {
      type: 'string',
      name: 'relatedService',
      label: 'Service to suggest at the end',
      description: 'A short card after the post invites readers to this service.',
      options: [
        { value: 'mindset', label: 'Mindset Coaching' },
        { value: 'career', label: 'Career Coaching' },
        { value: 'numerology', label: 'Numerology' },
        { value: 'none', label: 'None' },
      ],
    },
    seoSection(true),
    { type: 'rich-text', name: 'body', label: 'Post', isBody: true },
  ],
}

export const podcast: Collection = {
  name: 'podcast',
  label: 'Resources › Podcast episodes',
  path: 'content/podcasts',
  format: 'md',
  // Episodes have no page of their own (cards link out to the listen URL), so
  // they preview on the Resources page with this episode's form open.
  ui: {
    router: ({ document }) => previewRoute(`podcasts/${document._sys.filename}.md`),
    filename: { readonly: false, slugify },
  },
  defaultItem: () => ({
    title: 'New Episode',
    episode: 'Episode XX',
    publishedAt: new Date().toISOString(),
    status: 'Coming Soon',
    featured: false,
    excerpt: 'Write a short excerpt…',
    cardStyle: { icon: 'fa-microphone-alt', tone: 'primary' },
  }),
  fields: [
    { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
    text('episode', 'Episode label', { description: 'e.g. "Episode 01"' }),
    { type: 'datetime', name: 'publishedAt', label: 'Published date' },
    STATUS,
    featured,
    text('audioUrl', 'Listen link', { description: 'Spotify, Apple Podcasts or YouTube link. Leave empty to show “Coming soon”.' }),
    textarea('excerpt', 'Short summary', { description: 'Shown on the card.' }),
    image('image', 'Cover image'),
    cardStyle('fa-microphone-alt'),
    { type: 'rich-text', name: 'body', label: 'Show notes', isBody: true },
  ],
}
