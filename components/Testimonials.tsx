'use client'

import { useState, useEffect, useCallback } from 'react'

const testimonials = [
  {
    quote: "Shanila's sessions brought clarity and helped me navigate the complexities of my personal life. Her calm, thought-provoking questions uncovered hidden layers and empowered me to make confident decisions. I am grateful for her insightful guidance.",
    author: "Shashidhar Bairapu, Learned Environmentalist Dubai",
  },
  {
    quote: "During a phase of self-doubt and job uncertainty, Shanila helped me reevaluate my strengths and restore my confidence. Her coaching guided me to a successful job search. Now I'm a freelancer, balancing family time with my passions. Highly recommend Shanila for anyone seeking clarity and action.",
    author: "Shreyashi Das, Broadcast Designer USA",
  },
  {
    quote: "During a challenging phase with my partner and in-laws, Shanila provided a safe, non-judgmental space. Her positive approach helped me understand myself better and explore solutions aligned with my values. She's truly a change agent inspiring others to bring out their best.",
    author: "Jasmine, Student – Canada",
  },
  {
    quote: "Diagnosed with breast cancer in 2021, I was facing a daunting journey. Shanila's eye-opening sessions gave me the strength and courage to navigate this challenge, soothing my internal turbulence and providing a renewed perspective. Heartfelt gratitude for her unwavering support.",
    author: "Sapna R, Homemaker Dubai",
  },
  {
    quote: "After losing my parents to COVID-19, I was shattered. Shanila's patient, challenging questions helped me address my anxiety and look deep within myself. Her sessions instilled confidence and taught me to respond to my needs with calmness and acceptance. Highly recommend her non-judgmental coaching.",
    author: "Stuti Saxena, Homemaker Dubai",
  },
  {
    quote: "When my daughter was unwell for over a year with no improvement, Shanila explained the situation and provided remedies with an accurate timeline for recovery. Her positive, realistic approach and accurate readings for my family have been impressive. Highly recommend her numerology services.",
    author: "Afshan Rahim, Teacher - Calicut",
  },
  {
    quote: "After 17 years in an unhealthy marriage, Shanila's numerology readings accurately predicted my separation. Her guidance helped me navigate this transition. Now as a happy single mother, I'm grateful for her support. Highly recommend her approachable and reliable guidance to anyone facing tough times.",
    author: "Sonali Sharma, Interior Designer – Dubai",
  },
  {
    quote: "Planning a business partnership with constant delays was frustrating. Shanila's numerology reading gave me an accurate timeline—she predicted things would move in October 2023 and the business would open by mid-2024. We opened in May 2024! Highly recommend her guidance if you're feeling overwhelmed.",
    author: "Sabohi Nazar, Teacher - United Kingdom",
  },
  {
    quote: "Facing career difficulties in Dubai in 2015, we were uncertain about our future. Shanila's numerology reading gave us clarity and predicted a bright possibility in Canada. Moving to Canada in 2017 was the best decision of our lives. Eternal gratitude for her guidance that turned the table around. Highly recommend her numerology services.",
    author: "Hina Rohira, Elementary School Teacher, British Columbia - Canada",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const prev = useCallback(() => {
    setDirection('prev')
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  const next = useCallback(() => {
    setDirection('next')
    setCurrent(c => (c + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

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
