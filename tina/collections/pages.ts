import type { Collection } from 'tinacms'
import {
  closingCta,
  emoji,
  eyebrow,
  gradient,
  headingWithHighlight,
  highlightedLine,
  icon,
  image,
  list,
  richText,
  section,
  seoSection,
  text,
  textarea,
  tone,
} from '../shared'

const singlePage = (name: string, label: string, file: string, route: string) =>
  ({
    name,
    label,
    path: 'content/pages',
    match: { include: file },
    format: 'json',
    ui: { router: () => route, allowedActions: { create: false, delete: false } },
  }) as const

/* ── Home ─────────────────────────────────────────────────────────────── */

export const home: Collection = {
  ...singlePage('home', 'Home Page', 'home', '/'),
  fields: [
    section('hero', 'Hero (top of page)', [
      image('image', 'Background image'),
      richText('heading', 'Heading'),
      richText('subtext', 'Subtext'),
      text('buttonLabel', 'Main button', { description: 'Opens the booking form.' }),
      text('secondaryButtonLabel', 'Second button', { description: 'Scrolls down to the services.' }),
    ]),
    section('locations', 'Where sessions happen', [
      text('inPerson', 'In person line', { description: 'e.g. "In person in Leeds"' }),
      text('online', 'Online line', { description: 'e.g. "Online, wherever you are in the world"' }),
      text('linkLabel', 'Link to the Leeds page', { description: 'Leave empty to hide the link.' }),
    ], 'The band directly under the hero, so visitors know straight away where coaching takes place.'),
    section('intro', 'Introduction', [
      text('heading', 'Heading'),
      richText('body', 'Text'),
      text('linkLabel', 'Link to services', { description: 'Small link under the text that scrolls to the services.' }),
    ], 'The first section under the hero.'),
    section('about', 'About Shanila', [
      text('heading', 'Heading'),
      image('image', 'Photo'),
      text('credential', 'Credential line', { description: 'Shown next to the star badge.' }),
      richText('body', 'Text'),
      text('buttonLabel', 'Button', { description: 'Links to the About page.' }),
    ]),
    section('reflection', 'Reflection questions', [
      text('heading', 'Heading'),
      text('tagline', 'Tagline', { description: 'Bold line under the heading.' }),
      textarea('questions', 'Questions', { description: 'One question per line.' }),
    ]),
    section('services', 'Services', [
      text('heading', 'Heading'),
      textarea('subtext', 'Subtext'),
      list('cards', 'Service cards', [
        text('title', 'Title'),
        textarea('description', 'Description'),
        icon(),
        text('href', 'Page it links to', { description: 'e.g. /mindset-coaching' }),
        text('buttonLabel', 'Button'),
        tone('tone', 'Card colour', ['secondary', 'primary']),
      ], { itemLabel: 'title', fallback: 'Service card', defaultItem: { title: 'New service', tone: 'secondary', icon: 'fa-star' } }),
    ]),
    closingCta([
      textarea('text', 'Text'),
      text('buttonLabel', 'Button'),
    ]),
    seoSection(),
  ],
}

/* ── Services ─────────────────────────────────────────────────────────── */

export const services: Collection = {
  ...singlePage('services', 'Services Page', 'services', '/services'),
  fields: [
    section('hero', 'Hero (top of page)', [text('heading', 'Heading'), richText('subtext', 'Subtext')]),
    list('cards', 'Service cards', [
      text('title', 'Title'),
      text('duration', 'Length', { description: 'Small line above the title, e.g. "12-Week Programme".' }),
      textarea('description', 'Description'),
      icon(),
      textarea('highlights', 'Highlights', { description: 'One per line — shown as a ticked list.' }),
      text('href', 'Page it links to', { description: 'e.g. /mindset-coaching' }),
      text('buttonLabel', 'Button on the card'),
      tone('tone', 'Card colour', ['secondary', 'primary']),
      text('fitHeading', 'Side heading', { description: 'Heading beside the card, e.g. "Is this for you?".' }),
      textarea('fitBody', 'Side text'),
      text('learnMoreLabel', 'Side link', { description: 'Link under the side text to the service page.' }),
    ], { itemLabel: 'title', fallback: 'Service card', defaultItem: { title: 'New service', tone: 'secondary', icon: 'fa-star', fitHeading: 'Is this for you?' } }),
    closingCta([text('heading', 'Heading'), textarea('subtext', 'Subtext'), text('buttonLabel', 'Button')]),
    seoSection(),
  ],
}

/* ── About ────────────────────────────────────────────────────────────── */

export const about: Collection = {
  ...singlePage('about', 'About Page', 'about', '/about'),
  fields: [
    section('hero', 'Hero (top of page)', [text('heading', 'Heading'), richText('subtext', 'Subtext')]),
    section('story', 'My story', [
      text('heading', 'Heading'),
      richText('body', 'Text'),
      text('badge', 'Tick line', { description: 'Short line with a tick under the story.' }),
      text('videoUrl', 'Video link', { description: 'A YouTube embed link (starts with https://www.youtube.com/embed/). Leave empty to hide the video.' }),
    ]),
    section('credentials', 'Qualifications', [
      text('heading', 'Heading'),
      textarea('subtext', 'Subtext'),
      list('items', 'Qualifications', [
        text('title', 'Title'),
        textarea('description', 'Description'),
        icon(),
        gradient('gradient', 'Badge colour'),
      ], { itemLabel: 'title', fallback: 'Qualification', defaultItem: { title: 'New qualification', icon: 'fa-certificate', gradient: 'orange' } }),
    ]),
    section('values', 'Values', [
      text('heading', 'Heading'),
      textarea('subtext', 'Subtext'),
      list('items', 'Values', [text('title', 'Title'), textarea('description', 'Description'), icon()], {
        itemLabel: 'title',
        fallback: 'Value',
        defaultItem: { title: 'New value', icon: 'fa-heart' },
      }),
    ]),
    seoSection(),
  ],
}

/* ── Shared pieces for the three service pages ────────────────────────── */

const situationItem = (textLabel = 'Text') =>
  [emoji(), textarea('text', textLabel), tone('tone', 'Accent colour')]

const philosophy = (opts: { eyebrow?: boolean; quote?: boolean; banner?: boolean; closing?: boolean }) =>
  section('philosophy', 'Philosophy', [
    ...(opts.eyebrow ? [eyebrow()] : []),
    ...headingWithHighlight(),
    ...(opts.quote ? [textarea('quote', 'Quote')] : []),
    richText('body', 'Text'),
    ...(opts.banner ? [highlightedLine('banner', 'Dark banner')] : []),
    ...(opts.closing ? [highlightedLine('closing', 'Closing line')] : []),
  ])

const bookingCta = () =>
  closingCta([...headingWithHighlight(), richText('body', 'Text'), text('buttonLabel', 'Button')])

/* ── Mindset Coaching ─────────────────────────────────────────────────── */
// Internal name/file kept as clarityCoaching / clarity-coaching.json so the
// Tina document id is stable; the page lives at /mindset-coaching.

export const mindsetCoaching: Collection = {
  ...singlePage('clarityCoaching', 'Mindset Coaching Page', 'clarity-coaching', '/mindset-coaching'),
  fields: [
    section('hero', 'Hero (top of page)', [
      eyebrow(),
      text('heading', 'Heading'),
      richText('subtext', 'Subtext'),
      text('buttonLabel', 'Button'),
      emoji('sideEmoji', 'Side emoji'),
      text('sideHeading', 'Side heading', { description: 'Large text beside the hero on desktop, e.g. "12 Weeks".' }),
      text('sideSubtext', 'Side subtext'),
    ]),
    section('whoItsFor', "Who it's for", [
      ...headingWithHighlight(),
      textarea('subtext', 'Subtext'),
      text('listIntro', 'Line above the list'),
      list('items', 'Situations', situationItem(), {
        itemLabel: 'text',
        fallback: 'Situation',
        defaultItem: { emoji: '✨', text: 'New situation', tone: 'primary' },
      }),
      highlightedLine('banner', 'Banner', 'The dark banner under the list. The coloured words show on their own line.'),
    ]),
    section('problemSolution', 'Problem and solution', [
      ...headingWithHighlight(),
      section('problem', 'Problem card', [text('title', 'Title'), richText('body', 'Text')]),
      section('solution', 'Solution card', [
        text('title', 'Title'),
        richText('body', 'Text'),
        text('keyword', 'Big word', { description: 'Large word at the bottom of the card.' }),
      ]),
    ]),
    philosophy({ eyebrow: true, quote: true, banner: true, closing: true }),
    section('journey', 'Programme timeline', [
      eyebrow(),
      ...headingWithHighlight(),
      textarea('subtext', 'Subtext'),
      list('steps', 'Steps', [
        text('number', 'Number'),
        text('weeks', 'Weeks'),
        text('title', 'Title'),
        text('subtitle', 'Subtitle'),
        textarea('description', 'Description'),
        tone('tone', 'Accent colour'),
      ], { itemLabel: 'title', fallback: 'Step', defaultItem: { title: 'New step', tone: 'primary' } }),
      text('buttonLabel', 'Button under the timeline'),
    ]),
    section('included', "What's included", [
      eyebrow(),
      ...headingWithHighlight(),
      list('items', 'Items', [emoji(), text('title', 'Title'), text('subtitle', 'Subtitle'), tone('tone', 'Bubble colour')], {
        itemLabel: 'title',
        fallback: 'Item',
        defaultItem: { emoji: '✨', title: 'New item', tone: 'primary' },
      }),
      section('bonus', 'Bonus line', [emoji(), text('label', 'Bold start', { description: 'e.g. "Plus:"' }), text('text', 'Text')]),
    ]),
    bookingCta(),
    seoSection(),
  ],
}

/* ── Career Coaching ──────────────────────────────────────────────────── */

export const careerCoaching: Collection = {
  ...singlePage('careerCoaching', 'Career Coaching Page', 'career-coaching', '/career-coaching'),
  fields: [
    section('hero', 'Hero (top of page)', [text('heading', 'Heading'), richText('subtext', 'Subtext'), text('buttonLabel', 'Button')]),
    section('whoItsFor', "Who it's for", [
      ...headingWithHighlight(),
      textarea('subtext', 'Subtext'),
      text('listIntro', 'Line above the list'),
      textarea('situations', 'Situations', { description: 'One per line.' }),
      highlightedLine('banner', 'Banner', 'The dark banner under the list.'),
    ]),
    section('approach', 'The missing piece', [
      ...headingWithHighlight(),
      richText('body', 'Text'),
      text('keyword', 'Big word', { description: 'Large word at the bottom of the card.' }),
    ]),
    philosophy({}),
    section('imagine', 'Imagine', [
      ...headingWithHighlight(),
      list('items', 'Items', situationItem(), {
        itemLabel: 'text',
        fallback: 'Item',
        defaultItem: { emoji: '✨', text: 'New item', tone: 'primary' },
      }),
    ]),
    section('journey', 'Programme roadmap', [
      ...headingWithHighlight(),
      text('lead', 'Line under heading'),
      text('intro', 'Intro to the steps'),
      list('steps', 'Steps', [
        text('number', 'Number'),
        text('weeks', 'Weeks'),
        text('title', 'Title'),
        text('subtitle', 'Subtitle'),
        tone('tone', 'Subtitle colour'),
        textarea('description', 'Description'),
      ], { itemLabel: 'title', fallback: 'Step', defaultItem: { title: 'New step', tone: 'primary' } }),
      text('buttonLabel', 'Button under the roadmap'),
    ]),
    section('included', "What's included", [
      ...headingWithHighlight(),
      text('subtext', 'Subtext'),
      textarea('items', 'Items', { description: 'One per line — shown as a ticked list.' }),
    ]),
    bookingCta(),
    seoSection(),
  ],
}

/* ── Numerology ───────────────────────────────────────────────────────── */

export const numerology: Collection = {
  ...singlePage('numerology', 'Numerology Page', 'numerology', '/numerology'),
  fields: [
    section('hero', 'Hero (top of page)', [
      eyebrow(),
      text('heading', 'Heading'),
      text('tagline', 'Tagline'),
      richText('subtext', 'Subtext'),
      text('buttonLabel', 'Button'),
    ]),
    section('whoItsFor', "Who it's for", [
      ...headingWithHighlight(),
      textarea('subtext', 'Subtext'),
      list('items', 'Situations', situationItem(), {
        itemLabel: 'text',
        fallback: 'Situation',
        defaultItem: { emoji: '✨', text: 'New situation', tone: 'primary' },
      }),
      highlightedLine('statement', 'Closing line'),
    ]),
    section('whatItIs', 'What numerology is', [
      eyebrow(),
      ...headingWithHighlight(),
      textarea('isNot', 'What it isn’t', { description: 'The grey box.' }),
      richText('isText', 'What it is', { description: 'The blue box.' }),
    ]),
    section('process', 'How it works', [
      eyebrow(),
      ...headingWithHighlight(),
      list('steps', 'Steps', [emoji(), text('label', 'Step label', { description: 'e.g. "Step One"' }), text('title', 'Title'), textarea('description', 'Description')], {
        itemLabel: 'title',
        fallback: 'Step',
        defaultItem: { emoji: '✨', title: 'New step' },
      }),
    ]),
    section('included', "What's included", [
      eyebrow(),
      ...headingWithHighlight(),
      text('subtext', 'Subtext'),
      list('items', 'Items', [emoji(), text('title', 'Title'), textarea('description', 'Description')], {
        itemLabel: 'title',
        fallback: 'Item',
        defaultItem: { emoji: '✨', title: 'New item' },
      }),
    ]),
    philosophy({ eyebrow: true, quote: true, banner: true, closing: true }),
    closingCta([text('heading', 'Heading'), text('buttonLabel', 'Button')]),
    seoSection(),
  ],
}

/* ── Contact ──────────────────────────────────────────────────────────── */

export const contact: Collection = {
  ...singlePage('contact', 'Contact Page', 'contact', '/contact'),
  fields: [
    section('hero', 'Hero (top of page)', [image('image', 'Background image'), richText('heading', 'Heading'), richText('subtext', 'Subtext')]),
    section('intro', 'Introduction', [text('heading', 'Heading'), textarea('subtext', 'Subtext')]),
    section('details', 'Contact details', [
      text('emailTitle', 'Email — title'),
      text('email', 'Email address'),
      text('phoneTitle', 'Phone — title'),
      text('phone', 'Phone number'),
      text('videoTitle', 'Video sessions — title'),
      text('video', 'Video sessions — text'),
      text('locationTitle', 'Location — title'),
      text('location', 'Location'),
      text('bookingButtonLabel', 'Booking button', { description: 'Opens the booking form.' }),
    ], 'The social icons come from the Footer (Site-Wide) settings.'),
    section('form', 'Message form', [
      text('heading', 'Heading'),
      text('nameLabel', 'Name — label'),
      text('namePlaceholder', 'Name — hint text'),
      text('emailLabel', 'Email — label'),
      text('emailPlaceholder', 'Email — hint text'),
      text('phoneLabel', 'Phone — label'),
      text('phonePlaceholder', 'Phone — hint text'),
      text('messageLabel', 'Message — label'),
      text('messagePlaceholder', 'Message — hint text'),
      text('submitLabel', 'Send button'),
      text('submittingLabel', 'Send button while sending'),
      textarea('privacyNote', 'Small print under the button'),
    ]),
    seoSection(),
  ],
}

/* ── Sessions in Leeds (local landing page) ───────────────────────────── */

export const leeds: Collection = {
  ...singlePage('leeds', 'Sessions in Leeds Page', 'leeds', '/sessions-in-leeds'),
  fields: [
    section('hero', 'Hero (top of page)', [
      eyebrow(),
      text('heading', 'Heading'),
      richText('subtext', 'Subtext'),
      text('buttonLabel', 'Button', { description: 'Opens the booking form.' }),
    ]),
    section('intro', 'Introduction', [...headingWithHighlight(), richText('body', 'Text')]),
    section('offerings', 'Sessions on offer', [
      text('heading', 'Heading'),
      textarea('subtext', 'Subtext'),
      list('items', 'Services', [
        icon(),
        text('title', 'Title'),
        textarea('description', 'Description'),
        text('href', 'Page it links to', { description: 'e.g. /mindset-coaching' }),
        text('linkLabel', 'Link text'),
      ], { itemLabel: 'title', fallback: 'Service', defaultItem: { icon: 'fa-star', title: 'New service' } }),
    ]),
    section('whoIHelp', 'Who I help', [text('heading', 'Heading'), textarea('items', 'Points', { description: 'One per line — shown as a ticked list.' })]),
    section('howItWorks', 'In person or online', [
      text('heading', 'Heading'),
      section('inPerson', 'In person', [text('title', 'Title'), textarea('body', 'Text')]),
      section('online', 'Online', [text('title', 'Title'), textarea('body', 'Text')]),
    ]),
    section('whyShanila', 'Why work with Shanila', [
      text('heading', 'Heading'),
      textarea('points', 'Points', { description: 'One per line.' }),
      text('linkLabel', 'Link to the About page'),
    ]),
    section('faq', 'Questions and answers', [
      text('heading', 'Heading'),
      list('items', 'Questions', [text('question', 'Question'), textarea('answer', 'Answer')], {
        itemLabel: 'question',
        fallback: 'Question',
        defaultItem: { question: 'New question?' },
      }),
    ]),
    bookingCta(),
    seoSection(),
  ],
}
