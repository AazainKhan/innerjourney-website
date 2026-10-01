import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    // CMS colour choices map to classes in lib/design-tokens.ts, written out in
    // full so they're found here — content files never hold class names, so
    // no safelist is needed.
    './lib/**/*.{js,ts,jsx,tsx}',
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
