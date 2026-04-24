import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        oxford: '#14213d',
        carrot: '#ea9223',
        azure: '#237bea',
        platinum: '#e5e5e5',
      },
      fontFamily: {
        caslon: ['var(--font-caslon)', 'serif'],
        titillium: ['var(--font-titillium)', 'sans-serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
      },
    },
  },
  plugins: [],
}

export default config
