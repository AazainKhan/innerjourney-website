import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/clarity-coaching.html', destination: '/mindset-coaching', permanent: true },
      { source: '/clarity-coaching', destination: '/mindset-coaching', permanent: true },
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
      // YouTube auto-generated thumbnails — used when a podcast episode's
      // audioUrl points to YouTube and the editor doesn't upload a custom
      // cover. Pattern: https://i.ytimg.com/vi/{videoId}/hqdefault.jpg
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
}

export default nextConfig
