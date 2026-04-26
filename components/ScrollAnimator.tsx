'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SELECTOR = '.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right'

export default function ScrollAnimator() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const observe = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains('animate-visible')) observer.observe(el)
      })
    }

    observe()

    // Catch elements that mount asynchronously (Tina admin iframe re-renders content
    // after fetching GraphQL data; without this they'd stay at opacity 0 forever).
    const mutation = new MutationObserver(() => observe())
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [pathname])

  return null
}
