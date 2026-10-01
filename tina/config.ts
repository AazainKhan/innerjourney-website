import { defineConfig } from 'tinacms'
import React from 'react'
import { about, careerCoaching, contact, home, leeds, mindsetCoaching, numerology, services } from './collections/pages'
import { podcast, post, resources } from './collections/resources'
import { bookingForm, footer, navbar, testimonials, typography } from './collections/site'

// Sidebar icon for the Theme Studio screen (paintbrush + droplet)
function ThemeStudioIcon() {
  return React.createElement(
    'svg',
    { viewBox: '0 0 24 24', width: 24, height: 24, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('circle', { cx: 13.5, cy: 6.5, r: '.5', fill: 'currentColor' }),
    React.createElement('circle', { cx: 17.5, cy: 10.5, r: '.5', fill: 'currentColor' }),
    React.createElement('circle', { cx: 8.5, cy: 7.5, r: '.5', fill: 'currentColor' }),
    React.createElement('circle', { cx: 6.5, cy: 12.5, r: '.5', fill: 'currentColor' }),
    React.createElement('path', { d: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z' }),
  )
}

// The Theme Studio screen embeds /theme-studio in an iframe so the editor lives
// inside the Tina admin chrome. Anyone who can reach /admin can reach the
// studio — no separate auth needed.
function ThemeStudioScreen() {
  return React.createElement('iframe', {
    src: '/theme-studio',
    style: { width: '100%', height: '100%', border: 0, display: 'block' },
    title: 'Theme Studio',
  })
}

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  // Register a fullscreen "Theme Studio" screen accessible from the Tina admin
  // sidebar under the "Site" category. Opens the existing /theme-studio page in
  // an iframe so the editor stays a single source of truth.
  cmsCallback: (cms) => {
    cms.plugins.add({
      __type: 'screen',
      name: 'Theme Studio',
      Icon: ThemeStudioIcon,
      layout: 'fullscreen',
      navCategory: 'Site',
      Component: ThemeStudioScreen,
    })
    return cms
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
      static: false,
    },
  },
  // Collection definitions live in tina/collections/*; shared field builders
  // and the visual pickers live in tina/shared.ts and tina/fields/*.
  // Theme colours are edited in Theme Studio (content/theme.json), not here.
  schema: {
    collections: [
      home,
      services,
      about,
      mindsetCoaching,
      careerCoaching,
      numerology,
      leeds,
      resources,
      post,
      podcast,
      contact,
      navbar,
      footer,
      testimonials,
      bookingForm,
      typography,
    ],
  },
})
