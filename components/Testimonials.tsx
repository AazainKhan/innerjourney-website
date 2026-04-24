'use client'

import { useState, useEffect, useCallback } from 'react'
import testimonialsData from '@/content/testimonials.json'

interface TestimonialItem {
  quote: string
  author: string
}

interface TestimonialsProps {
  items?: TestimonialItem[]
}

export default function Testimonials({ items }: TestimonialsProps = {}) {
  const testimonials = items ?? testimonialsData.items

  const [current, setCurrent] = useState(0)
  const [, setDirection] = useState<'next' | 'prev'>('next')

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const prev = useCallback(() => {
    setDirection('prev')
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const next = useCallback(() => {
    setDirection('next')
    setCurrent(c => (c + 1) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  if (!testimonials.length) return null

  return (
    <div className="testimonials-section-wrapper py-12 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl heading-secondary text-gray-900 mb-4">
            Client Transformations
          </h2>
        </div>
        <div className="testimonials-container">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial ${i === current ? 'active' : i === (current - 1 + testimonials.length) % testimonials.length ? 'prev' : 'next'}`}
            >
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg md:text-2xl text-gray-800 leading-relaxed mb-4 font-medium relative px-10 md:px-16" style={{ minHeight: '140px' }}>
                  <span className="absolute left-0 top-0 text-7xl text-orange-500 -mt-4 font-serif italic">&ldquo;</span>
                  {t.quote}
                  <span className="absolute right-0 bottom-0 text-7xl text-orange-500 -mb-4 font-serif italic">&rdquo;</span>
                </p>
                <div className="text-xl md:text-2xl text-gray-700 font-semibold mt-2">
                  — {t.author}
                </div>
              </div>
            </div>
          ))}

          <button id="testimonial-prev" onClick={prev} aria-label="Previous testimonial" className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-azure border border-white/60 shadow-md items-center justify-center transition">
            <i className="fas fa-chevron-left text-sm"></i>
          </button>
          <button id="testimonial-next" onClick={next} aria-label="Next testimonial" className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-azure border border-white/60 shadow-md items-center justify-center transition">
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
        </div>

        <div id="testimonial-dots" className="flex justify-center mt-2 space-x-3 md:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
