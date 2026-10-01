/**
 * Field builders shared by every collection.
 *
 * Conventions (see PRODUCT.md "Owner-editable by default"):
 *  - Each page is split into section groups ("Hero", "Closing call to action"…)
 *    that open as their own panel in the editor.
 *  - Field names describe the *role* ("heading", "buttonLabel"), never the
 *    current copy, so renaming the words on the page never makes the label lie.
 *  - Colours, icons, gradients and emojis are always visual pickers.
 */
import type { TinaField } from 'tinacms'
import { EmojiPickerField, GradientPickerField, iconPickerField, tonePickerField } from './fields'
import type { IconCategory } from '../lib/icons'
import type { Tone } from '../lib/design-tokens'

type Opts = { description?: string; required?: boolean }

export const text = (name: string, label: string, opts: Opts = {}): TinaField => ({ type: 'string', name, label, ...opts })

export const textarea = (name: string, label: string, opts: Opts = {}): TinaField => ({
  type: 'string',
  list: false,
  name,
  label,
  ui: { component: 'textarea' },
  ...opts,
})

export const richText = (name: string, label: string, opts: Opts = {}): TinaField => ({ type: 'rich-text', name, label, ...opts })

export const image = (name: string, label: string, opts: Opts = {}): TinaField => ({ type: 'image', name, label, ...opts })

export const icon = (name = 'icon', label = 'Icon', categories?: IconCategory[]): TinaField => ({
  type: 'string',
  list: false,
  name,
  label,
  ui: { component: iconPickerField(categories) },
})

export const tone = (name = 'tone', label = 'Colour', tones: Tone[] = ['primary', 'accent'], opts: Opts = {}): TinaField => ({
  type: 'string',
  list: false,
  name,
  label,
  ui: { component: tonePickerField(tones) },
  ...opts,
})

export const gradient = (name = 'gradient', label = 'Badge colour'): TinaField => ({
  type: 'string',
  list: false,
  name,
  label,
  ui: { component: GradientPickerField },
})

export const emoji = (name = 'emoji', label = 'Emoji'): TinaField => ({
  type: 'string',
  list: false,
  name,
  label,
  ui: { component: EmojiPickerField },
})

/** Small uppercase label that sits above a section heading. */
export const eyebrow = () => text('eyebrow', 'Small label above heading')

/** A full heading plus the words inside it to colour. */
export const headingWithHighlight = (label = 'Heading'): TinaField[] => [
  text('heading', label),
  text('highlight', 'Words to colour', {
    description: 'Copy a few words from the heading above to show them in colour. Leave empty for no colour.',
  }),
]

/** A sentence with some coloured words, grouped as one panel (banners, closing lines). */
export const highlightedLine = (name: string, label: string, description?: string): TinaField => ({
  type: 'object',
  name,
  label,
  description,
  fields: [
    textarea('text', 'Text'),
    text('highlight', 'Words to colour', { description: 'Copy a few words from the text above to show them in colour.' }),
  ],
})

/** A collapsible section panel. */
export const section = (name: string, label: string, fields: TinaField[], description?: string): TinaField => ({
  type: 'object',
  name,
  label,
  description,
  fields,
})

/** A reorderable list whose items are labelled by one of their fields. */
export const list = (
  name: string,
  label: string,
  fields: TinaField[],
  opts: { itemLabel: string; fallback: string; description?: string; defaultItem?: Record<string, unknown> },
): TinaField => ({
  type: 'object',
  name,
  label,
  list: true,
  description: opts.description,
  ui: {
    itemProps: (item: Record<string, unknown> | undefined) => {
      const v = item?.[opts.itemLabel]
      return { label: typeof v === 'string' && v.trim() ? v : opts.fallback }
    },
    ...(opts.defaultItem ? { defaultItem: opts.defaultItem } : {}),
  },
  fields,
})

/** The booking-button band at the bottom of most pages. */
export const closingCta = (fields: TinaField[]): TinaField =>
  section('closingCta', 'Closing call to action', fields, 'The coloured band at the bottom of the page. Its button opens the booking form.')

/** Filename slug for new posts/episodes, derived from the title. */
export const slugify = (values: Record<string, unknown>) =>
  String(values.title || 'untitled')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** "How this page appears in Google" — the search result title and snippet. */
export const seoSection = (optional = false): TinaField =>
  section(
    'seo',
    'Google search listing',
    [
      text('title', 'Title in Google', {
        description: 'The blue link in search results. Aim for about 50–60 characters, most important words first.',
      }),
      textarea('description', 'Description in Google', {
        description: 'The grey text under the link. Aim for about 140–160 characters that make someone want to click.',
      }),
    ],
    optional
      ? 'Optional. Leave empty to use the title and short summary.'
      : 'How this page appears in Google results and when shared on social media.',
  )
