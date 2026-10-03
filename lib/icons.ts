/**
 * Curated Font Awesome 6 (free) icon registry.
 *
 * Content stores the icon id (e.g. "fa-brain"). The Tina icon picker shows
 * these with friendly names, and <Icon> uses `brand` to pick the right
 * Font Awesome style prefix (solid "fas" vs brands "fab").
 *
 * To offer a new icon: add a row here (the id must exist in Font Awesome 6.0
 * free), then run `npm run build-icons` so the site's cut-down icon font
 * includes it. tests/icons.test.ts fails until you do.
 */

export type IconCategory = 'Mindset' | 'Growth' | 'Work' | 'Connection' | 'Content' | 'Contact' | 'Social'

export interface IconDef {
  id: string
  label: string
  category: IconCategory
  brand?: boolean
}

export const ICON_CATEGORIES: IconCategory[] = ['Mindset', 'Growth', 'Work', 'Connection', 'Content', 'Contact', 'Social']

export const ICONS: IconDef[] = [
  // Mindset
  { id: 'fa-lightbulb', label: 'Lightbulb / idea', category: 'Mindset' },
  { id: 'fa-brain', label: 'Brain / mind', category: 'Mindset' },
  { id: 'fa-heart', label: 'Heart', category: 'Mindset' },
  { id: 'fa-bullseye', label: 'Target / focus', category: 'Mindset' },
  { id: 'fa-eye', label: 'Eye / awareness', category: 'Mindset' },
  { id: 'fa-compass', label: 'Compass / direction', category: 'Mindset' },
  { id: 'fa-key', label: 'Key', category: 'Mindset' },
  { id: 'fa-yin-yang', label: 'Balance', category: 'Mindset' },
  { id: 'fa-spa', label: 'Calm / wellbeing', category: 'Mindset' },
  { id: 'fa-dove', label: 'Dove / peace', category: 'Mindset' },
  { id: 'fa-star', label: 'Star', category: 'Mindset' },
  { id: 'fa-gem', label: 'Gem', category: 'Mindset' },
  { id: 'fa-infinity', label: 'Infinity', category: 'Mindset' },
  { id: 'fa-hashtag', label: 'Number / numerology', category: 'Mindset' },
  { id: 'fa-magic', label: 'Magic wand', category: 'Mindset' },

  // Growth
  { id: 'fa-seedling', label: 'Seedling / growth', category: 'Growth' },
  { id: 'fa-leaf', label: 'Leaf', category: 'Growth' },
  { id: 'fa-sun', label: 'Sun', category: 'Growth' },
  { id: 'fa-mountain', label: 'Mountain', category: 'Growth' },
  { id: 'fa-route', label: 'Route / journey', category: 'Growth' },
  { id: 'fa-road', label: 'Road', category: 'Growth' },
  { id: 'fa-rocket', label: 'Rocket', category: 'Growth' },
  { id: 'fa-fire', label: 'Fire / energy', category: 'Growth' },
  { id: 'fa-feather', label: 'Feather / lightness', category: 'Growth' },
  { id: 'fa-arrow-down', label: 'Arrow down / go deeper', category: 'Growth' },

  // Work
  { id: 'fa-chart-line', label: 'Chart / progress', category: 'Work' },
  { id: 'fa-briefcase', label: 'Briefcase / career', category: 'Work' },
  { id: 'fa-graduation-cap', label: 'Graduation cap', category: 'Work' },
  { id: 'fa-certificate', label: 'Certificate', category: 'Work' },
  { id: 'fa-award', label: 'Award', category: 'Work' },
  { id: 'fa-medal', label: 'Medal', category: 'Work' },
  { id: 'fa-trophy', label: 'Trophy', category: 'Work' },
  { id: 'fa-calendar-alt', label: 'Calendar', category: 'Work' },
  { id: 'fa-clock', label: 'Clock', category: 'Work' },

  // Connection
  { id: 'fa-comments', label: 'Conversation', category: 'Connection' },
  { id: 'fa-comment-dots', label: 'Speech bubble', category: 'Connection' },
  { id: 'fa-handshake', label: 'Handshake', category: 'Connection' },
  { id: 'fa-hand-holding-heart', label: 'Hand holding heart', category: 'Connection' },
  { id: 'fa-hands-helping', label: 'Helping hands', category: 'Connection' },
  { id: 'fa-users', label: 'People', category: 'Connection' },
  { id: 'fa-user', label: 'Person', category: 'Connection' },
  { id: 'fa-smile', label: 'Smile', category: 'Connection' },

  // Content
  { id: 'fa-pen-fancy', label: 'Pen / writing', category: 'Content' },
  { id: 'fa-book-open', label: 'Open book', category: 'Content' },
  { id: 'fa-quote-left', label: 'Quote', category: 'Content' },
  { id: 'fa-microphone-alt', label: 'Microphone', category: 'Content' },
  { id: 'fa-podcast', label: 'Podcast', category: 'Content' },
  { id: 'fa-headphones', label: 'Headphones', category: 'Content' },
  { id: 'fa-play-circle', label: 'Play', category: 'Content' },
  { id: 'fa-video', label: 'Video', category: 'Content' },
  { id: 'fa-envelope-open-text', label: 'Newsletter', category: 'Content' },

  // Contact
  { id: 'fa-envelope', label: 'Email', category: 'Contact' },
  { id: 'fa-phone', label: 'Phone', category: 'Contact' },
  { id: 'fa-map-marker-alt', label: 'Location pin', category: 'Contact' },
  { id: 'fa-globe', label: 'Globe / online', category: 'Contact' },

  // Social (Font Awesome brands)
  { id: 'fa-facebook', label: 'Facebook', category: 'Social', brand: true },
  { id: 'fa-instagram', label: 'Instagram', category: 'Social', brand: true },
  { id: 'fa-youtube', label: 'YouTube', category: 'Social', brand: true },
  { id: 'fa-whatsapp', label: 'WhatsApp', category: 'Social', brand: true },
  { id: 'fa-linkedin', label: 'LinkedIn', category: 'Social', brand: true },
  { id: 'fa-tiktok', label: 'TikTok', category: 'Social', brand: true },
  { id: 'fa-twitter', label: 'X / Twitter', category: 'Social', brand: true },
  { id: 'fa-pinterest', label: 'Pinterest', category: 'Social', brand: true },
  { id: 'fa-spotify', label: 'Spotify', category: 'Social', brand: true },
  { id: 'fa-apple', label: 'Apple Podcasts', category: 'Social', brand: true },
]

const BY_ID = new Map(ICONS.map((i) => [i.id, i]))

export function getIcon(id: string | null | undefined): IconDef | undefined {
  return id ? BY_ID.get(id.trim()) : undefined
}

/**
 * Full class string for an icon id. Accepts the bare id ("fa-brain") or a
 * legacy value that already carries a prefix ("fas fa-brain").
 */
export function iconClass(id: string | null | undefined): string {
  if (!id) return ''
  const bare = id.trim().split(/\s+/).find((part) => part.startsWith('fa-') && part !== 'fa-solid') ?? ''
  if (!bare) return ''
  const def = BY_ID.get(bare)
  return `${def?.brand ? 'fab' : 'fas'} ${bare}`
}
