import type { Metadata } from 'next'
import { Libre_Caslon_Display, Titillium_Web, Dancing_Script } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingOverlay from '@/components/BookingOverlay'
import ScrollAnimator from '@/components/ScrollAnimator'
import { BookingProvider } from '@/context/BookingContext'

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
    images: [{ url: '/images/hero_img.jpg' }],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caslonDisplay.variable} ${titilliumWeb.variable} ${dancingScript.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body>
        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BookingOverlay />
          <ScrollAnimator />
        </BookingProvider>
      </body>
    </html>
  )
}
