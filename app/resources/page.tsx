import type { Metadata } from 'next'
import BookingButton from '@/components/BookingButton'

export const metadata: Metadata = {
  title: 'Resources - Blog Posts & Podcasts for Inner Growth',
  description: 'Explore free resources including blog posts and podcasts on clarity, mindset, personal development and transformation. Start your inner journey today.',
  alternates: { canonical: 'https://innerjourney-with-shanila.com/resources' },
}

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-oxford via-[#1a2d50] to-azure">
        <div className="absolute top-20 right-20 w-72 h-72 bg-carrot/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-20 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-carrot font-semibold text-sm uppercase tracking-widest mb-6 animate-on-scroll">Free Resources</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl heading-primary text-white mb-6 leading-tight font-dancing font-bold animate-on-scroll">
              Resources for Your <span className="text-carrot">Inner Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed animate-on-scroll">
              Explore insights, stories, and tools to help you cultivate clarity, confidence, and purpose
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100"></div>
        <div className="absolute top-0 right-10 w-[30rem] h-[30rem] bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>

        {/* Coming Soon */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl heading-secondary text-gray-900 mb-8 animate-on-scroll">
                Featured <span className="text-carrot font-bold">Content</span>
              </h2>

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-on-scroll">
                <div className="p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-azure to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-pen-fancy text-white text-3xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Blog Posts Coming Soon</h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                    I&apos;m working on sharing insights on clarity, mindset, and personal transformation to help you on your inner journey. Check back soon!
                  </p>
                  <span className="inline-block bg-azure/10 text-azure font-semibold px-6 py-2 rounded-full">Coming Soon</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-on-scroll mt-8">
                <div className="p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-oxford to-azure rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-podcast text-white text-3xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Podcast Episodes Coming Soon</h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                    Conversations about clarity, confidence, and creating the life you deserve — launching soon. Stay tuned!
                  </p>
                  <span className="inline-block bg-oxford/10 text-oxford font-semibold px-6 py-2 rounded-full">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YouTube */}
        <section className="py-20 brand-gradient-oxford relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl heading-secondary text-white mb-4">
                Watch on <span className="text-carrot">YouTube</span>
              </h2>
              <p className="text-white/80 text-lg">Subscribe for free coaching insights and tips</p>
            </div>
            <div className="flex justify-center">
              <a
                href="https://www.youtube.com/channel/UCJbRrCiY4zXfojPTa17EKMg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <i className="fab fa-youtube text-2xl"></i>
                Visit My YouTube Channel
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-6 animate-on-scroll">
              Ready to take the <span className="text-carrot font-bold">next step</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-on-scroll">
              Resources are great, but real transformation happens in coaching. Book your free Clarity Call today.
            </p>
            <BookingButton label="Book My Free Clarity Call" className="btn-azure text-lg px-10 py-4 button-text animate-on-scroll" />
          </div>
        </section>
      </div>
    </>
  )
}
