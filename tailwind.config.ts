import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // These gradient utilities are referenced from JSON / markdown frontmatter
  // (about.json credentials, blog posts, podcast episodes). Tailwind's content
  // scanner doesn't read content files, so without this safelist the classes
  // get purged and the gradient circles / card backgrounds render with no fill.
  safelist: [
    // About-page credential badges (saturated 500/600 pairs)
    'from-orange-500', 'to-orange-600',
    'from-blue-500', 'to-blue-600',
    'from-purple-500', 'to-purple-600',
    'from-amber-500', 'to-amber-600',
    'from-pink-500', 'to-pink-600',
    'from-teal-500', 'to-teal-600',
    // Blog / podcast card backdrops (light pastel pairs)
    'from-orange-100', 'to-orange-200',
    'from-blue-100', 'to-indigo-200',
    'from-purple-100', 'to-pink-200',
    'from-pink-100', 'to-rose-200',
    'from-green-100', 'to-emerald-200',
    // Podcast list-card glow (alpha-modified theme tokens)
    'from-carrot/30', 'to-orange-500/30',
    'from-azure/30', 'to-blue-600/30',
    'from-purple-400/30', 'to-indigo-600/30',
  ],
  theme: {
    extend: {
      colors: {
        oxford: 'rgb(var(--oxford-rgb) / <alpha-value>)',
        carrot: 'rgb(var(--carrot-rgb) / <alpha-value>)',
        azure: 'rgb(var(--azure-rgb) / <alpha-value>)',
        platinum: 'rgb(var(--platinum-rgb) / <alpha-value>)',
      },
      fontFamily: {
        caslon: ['var(--font-caslon)', 'serif'],
        titillium: ['var(--font-titillium)', 'sans-serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
      },
    },
  },
  plugins: [typography],
}

export default config
