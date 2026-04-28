import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/clarity-coaching.html', destination: '/clarity-coaching', permanent: true },
      { source: '/career-coaching.html', destination: '/career-coaching', permanent: true },
      { source: '/numerology.html', destination: '/numerology', permanent: true },
      { source: '/resources.html', destination: '/resources', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/blog', destination: '/resources', permanent: true },
      { source: '/podcast', destination: '/resources', permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
      },
    ],
  },
}

export default nextConfig
