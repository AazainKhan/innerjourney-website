/** Routes referenced from more than one place. */
export const LEEDS_PAGE_PATH = '/sessions-in-leeds'

/** Service pages, keyed by the value editors pick for a blog post's "Service to suggest". */
export const SERVICE_PAGES = {
  mindset: { title: 'Mindset Coaching', path: '/mindset-coaching' },
  career: { title: 'Career Coaching', path: '/career-coaching' },
  numerology: { title: 'Numerology', path: '/numerology' },
} as const

export type ServiceKey = keyof typeof SERVICE_PAGES
