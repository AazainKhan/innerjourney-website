'use client'

// Intentionally a no-op. Animation classes (.animate-on-scroll, .animate-fade-in,
// .animate-slide-left, .animate-slide-right) are now visible by default in the
// CSS. Keeping this component as a stub so layout.tsx imports still resolve and
// we have a place to add scroll-triggered animations back in if we ever want
// them — but in a way that doesn't hide content when the observer fails.

export default function ScrollAnimator() {
  return null
}
