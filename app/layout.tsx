import type { Metadata } from 'next'
import { Libre_Caslon_Display, Titillium_Web, Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingOverlay from '@/components/BookingOverlay'
import ScrollAnimator from '@/components/ScrollAnimator'
import { BookingProvider } from '@/context/BookingContext'
import themeData from '@/content/theme.json'
import navbarData from '@/content/navbar.json'
import bookingFormData from '@/content/booking-form.json'
import client from '@/tina/__generated__/client'

const caslonDisplay = Libre_Caslon_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-caslon',
  display: 'swap',
})

const titilliumWeb = Titillium_Web({
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-titillium',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://innerjourney-with-shanila.com'),
  title: {
    default: 'Shanila - Clarity and Mindset Coach | Transform Your Journey',
    template: '%s | Shanila Khan',
  },
  description: 'Transform your life with Shanila\'s expert Clarity and Mindset Coaching. Book A Consultation today and start your journey to success.',
  openGraph: {
    type: 'website',
    siteName: 'Inner Journey with Shanila',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Inner Journey with Shanila' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/images/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/favicon/favicon.ico' },
    ],
    apple: { url: '/images/favicon/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/images/favicon/site.webmanifest',
}

async function loadTheme() {
  try {
    const res = await client.queries.theme({ relativePath: 'theme.json' })
    return res.data.theme
  } catch {
    return themeData
  }
}

function hexToRgbTriplet(hex: string): string {
  const cleaned = hex.replace('#', '').trim()
  const expanded = cleaned.length === 3 ? cleaned.split('').map((c) => c + c).join('') : cleaned.slice(0, 6)
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return '0 0 0'
  const r = parseInt(expanded.slice(0, 2), 16)
  const g = parseInt(expanded.slice(2, 4), 16)
  const b = parseInt(expanded.slice(4, 6), 16)
  return `${r} ${g} ${b}`
}

function buildThemeStyle(t: { primaryColor?: string | null; secondaryColor?: string | null; accentColor?: string | null; neutralColor?: string | null }) {
  const primary = t.primaryColor || themeData.primaryColor
  const secondary = t.secondaryColor || themeData.secondaryColor
  const accent = t.accentColor || themeData.accentColor
  const neutral = t.neutralColor || themeData.neutralColor
  return `:root {
  --carrot-orange: ${primary};
  --oxford-blue: ${secondary};
  --azure-blue: ${accent};
  --platinum: ${neutral};
  --carrot-rgb: ${hexToRgbTriplet(primary)};
  --oxford-rgb: ${hexToRgbTriplet(secondary)};
  --azure-rgb: ${hexToRgbTriplet(accent)};
  --platinum-rgb: ${hexToRgbTriplet(neutral)};
  --primary: ${primary};
  --secondary: ${secondary};
  --brand-azure: ${accent};
  --accent: ${neutral};
  --gradient-primary: linear-gradient(135deg, ${primary} 0%, #f39c12 100%);
  --gradient-secondary: linear-gradient(135deg, ${secondary} 0%, #1e3a8a 100%);
  --gradient-azure: linear-gradient(135deg, ${accent} 0%, #1e63c9 100%);
  --gradient-dark: linear-gradient(135deg, #000000 0%, ${secondary} 100%);
}`
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await loadTheme()
  const themeStyle = buildThemeStyle(theme)
  return (
    <html lang="en" className={`${caslonDisplay.variable} ${titilliumWeb.variable} ${dancingScript.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[10000] focus:bg-azure focus:text-white focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
        <BookingProvider>
          <Navbar data={navbarData} />
          <main id="main">{children}</main>
          <Footer />
          <BookingOverlay copy={bookingFormData} />
          <ScrollAnimator />
        </BookingProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
