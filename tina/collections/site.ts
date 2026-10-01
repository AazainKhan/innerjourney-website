import type { Collection, TinaField } from 'tinacms'
import { icon, list, text, textarea } from '../shared'
import { previewRoute } from '../../lib/tina-select'

/** Site-wide documents live in /content and preview on a page that shows them (see app/preview). */
const siteDoc = (name: string, label: string, file: string) =>
  ({
    name,
    label,
    path: 'content',
    match: { include: file },
    format: 'json',
    ui: {
      router: () => previewRoute(`${file}.json`),
      allowedActions: { create: false, delete: false },
    },
  }) as const

const link = (): TinaField[] => [text('label', 'Label'), text('href', 'Link', { description: 'A page like /about, or a full https:// address.' })]

export const navbar: Collection = {
  ...siteDoc('navbar', 'Site › Navigation bar', 'navbar'),
  fields: [
    text('brandLabel', 'Name next to the logo'),
    text('ctaLabel', 'Booking button'),
    list('links', 'Menu links', [...link(), { type: 'boolean', name: 'showDropdown', label: 'Show the "Work with me" dropdown on this link' }], {
      itemLabel: 'label',
      fallback: 'Menu link',
    }),
    list('workWithMeDropdown', '"Work with me" dropdown', link(), { itemLabel: 'label', fallback: 'Dropdown link' }),
  ],
}

export const bookingForm: Collection = {
  ...siteDoc('bookingForm', 'Site › Booking form', 'booking-form'),
  fields: [
    text('overlayTitle', 'Title'),
    text('firstNameLabel', 'First name — label'),
    text('lastNameLabel', 'Last name — label'),
    text('emailLabel', 'Email — label'),
    text('countryCodeLabel', 'Country code — label'),
    text('phoneLabel', 'Phone — label'),
    text('serviceLabel', 'Service — label'),
    text('servicePlaceholder', 'Service — hint text'),
    { type: 'string', name: 'services', label: 'Service choices', list: true },
    text('messageLabel', 'Message — label'),
    text('messagePlaceholder', 'Message — hint text'),
    text('submitLabel', 'Send button'),
    text('submittingLabel', 'Send button while sending'),
    textarea('successMessage', 'Thank-you message'),
    textarea('errorMessage', 'Error message'),
  ],
}

export const footer: Collection = {
  ...siteDoc('footer', 'Site › Footer', 'footer'),
  fields: [
    text('brandHeading', 'Name'),
    textarea('brandDescription', 'Short description'),
    text('location', 'Location line', { description: 'Shown under the description, e.g. "Leeds, UK · Coaching online worldwide".' }),
    text('quickLinksHeading', 'First link column — heading'),
    list('quickLinks', 'First link column', link(), { itemLabel: 'label', fallback: 'Link' }),
    text('servicesHeading', 'Second link column — heading'),
    list('serviceLinks', 'Second link column', link(), { itemLabel: 'label', fallback: 'Link' }),
    text('connectHeading', 'Social column — heading'),
    list('socialLinks', 'Social links', [text('label', 'Name'), icon('icon', 'Icon', ['Social']), text('href', 'Link')], {
      itemLabel: 'label',
      fallback: 'Social link',
      description: 'Also used for the social icons on the Home and Contact pages.',
      defaultItem: { label: 'Instagram', icon: 'fa-instagram' },
    }),
    text('emailLabel', 'Email — title'),
    text('email', 'Email address'),
    text('phoneLabel', 'Phone — title'),
    text('phone', 'Phone number'),
    text('copyright', 'Copyright line'),
  ],
}

export const typography: Collection = {
  ...siteDoc('typography', 'Site › Fonts', 'typography'),
  fields: [
    {
      type: 'string',
      name: 'headingFont',
      label: 'Heading font',
      description: 'Used for section headings across the site.',
      options: [
        { value: 'caslon', label: 'Libre Caslon (elegant serif)' },
        { value: 'dancing', label: 'Dancing Script (handwritten)' },
        { value: 'titillium', label: 'Titillium Web (clean sans-serif)' },
      ],
    },
    {
      type: 'string',
      name: 'headingWeight',
      label: 'Heading weight',
      options: [
        { value: '400', label: 'Regular' },
        { value: '600', label: 'Semibold' },
        { value: '700', label: 'Bold' },
      ],
    },
    {
      type: 'string',
      name: 'headingStyle',
      label: 'Heading style',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'italic', label: 'Italic' },
      ],
    },
    {
      type: 'string',
      name: 'bodyFont',
      label: 'Body font',
      options: [
        { value: 'titillium', label: 'Titillium Web' },
        { value: 'caslon', label: 'Libre Caslon' },
      ],
    },
    {
      type: 'string',
      name: 'bodyWeight',
      label: 'Body weight',
      options: [
        { value: '300', label: 'Light' },
        { value: '400', label: 'Regular' },
        { value: '600', label: 'Semibold' },
      ],
    },
    { type: 'number', name: 'baseFontSize', label: 'Body text size (px)', description: 'Default: 16' },
  ],
}

export const testimonials: Collection = {
  ...siteDoc('testimonials', 'Testimonials', 'testimonials'),
  fields: [
    text('heading', 'Heading'),
    list('items', 'Testimonials', [textarea('quote', 'Quote'), text('author', 'Name and role')], {
      itemLabel: 'author',
      fallback: 'Testimonial',
    }),
  ],
}
