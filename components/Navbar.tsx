'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useBooking } from '@/context/BookingContext'

interface NavLink { label: string; href: string; showDropdown?: boolean }
interface NavbarData {
  brandLabel: string
  ctaLabel: string
  links: NavLink[]
  workWithMeDropdown: Array<{ label: string; href: string }>
}

export default function Navbar({ data }: { data: NavbarData }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false)
  const { openBooking } = useBooking()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav id="navbar" className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'scrolled' : ''}`}>
        <div className="mx-auto px-2 md:px-6 py-6">
          <div className="flex items-center justify-between gap-4 xl:gap-12">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <Image
                src="/images/logo_transparent-480.png"
                alt="Shanila Khan Mindset Coaching Logo"
                width={240}
                height={60}
                className="h-14 w-auto"
                priority
              />
              <div className="text-2xl heading-primary text-on-secondary whitespace-nowrap">{data.brandLabel}</div>
            </Link>

            {/* Desktop nav — only shows from lg up. At md (768-1023) the
             * combined logo + brand + 4 nav links + CTA can't breathe so we
             * stay on the hamburger menu for that range. */}
            <div className="hidden lg:flex items-center space-x-8">
              {data.links.map((link) => link.showDropdown ? (
                <div key={link.href} className="nav-dropdown">
                  <Link href={link.href} className="nav-link nav-text text-on-secondary hover:text-carrot transition-colors uppercase">
                    {link.label} <i className="fas fa-chevron-down ml-1 text-xs"></i>
                  </Link>
                  <div className="nav-dropdown-menu">
                    {data.workWithMeDropdown.map((d) => (
                      <Link key={d.href} href={d.href} className="nav-dropdown-item">{d.label}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="nav-link nav-text text-on-secondary hover:text-carrot transition-colors uppercase">{link.label}</Link>
              ))}
            </div>

            {/* Desktop-only booking CTA. We wrap in a div with the hidden/inline
             * toggle so .btn-azure's inherent `display: inline-block` doesn't
             * override Tailwind's `hidden` utility (source order conflict). */}
            <div className="hidden lg:inline-flex">
              <button
                id="booking-btn"
                onClick={openBooking}
                className="booking-btn btn-azure btn-sm button-text"
              >
                {data.ctaLabel}
              </button>
            </div>

            {/* Hamburger — visible below lg. Hidden while the mobile menu is
             * open so it doesn't stack visually behind the menu's X close. */}
            {!mobileOpen && (
              <div className="lg:hidden mr-2">
                <button
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open navigation menu"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-menu"
                  className="text-on-secondary text-2xl"
                >
                  <i className="fas fa-bars" aria-hidden="true"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu — full-screen sheet with a clear hierarchy:
       *   header  : close button (top-right)
       *   primary : centered nav links
       *   footer  : divider, single CTA, social row
       * The footer sits at the bottom of the sheet so the CTA feels like
       * the obvious next action, not a floating link mid-page.
       */}
      <div
        id="mobile-menu"
        className={`${mobileOpen ? 'show' : ''}`}
        style={{ display: mobileOpen ? 'flex' : 'none' }}
      >
        <div id="mobile-menu-overlay" className="mobile-menu-overlay">
          <button
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <span className="close-icon">&times;</span>
          </button>

          <div className="mobile-menu-content flex flex-col items-stretch w-full max-w-sm px-6 pt-16 pb-8 h-full">
            <nav className="flex-1 flex flex-col items-center justify-center gap-5">
              {data.links.map((link) => link.showDropdown ? (
                <div key={link.href} className="w-full text-center">
                  <button
                    className="inline-flex items-center gap-2 text-white hover:text-carrot transition-colors uppercase tracking-widest text-lg font-semibold"
                    onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
                    aria-expanded={workDropdownOpen}
                  >
                    {link.label}
                    <i className={`fas fa-chevron-down text-xs transition-transform ${workDropdownOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  {workDropdownOpen && (
                    <div className="space-y-2 mt-3">
                      {data.workWithMeDropdown.map((d) => (
                        <Link key={d.href} href={d.href} className="block text-white/80 hover:text-carrot transition-colors text-sm" onClick={() => setMobileOpen(false)}>{d.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="block text-white hover:text-carrot transition-colors uppercase tracking-widest text-lg font-semibold" onClick={() => setMobileOpen(false)}>{link.label}</Link>
              ))}
            </nav>

            {/* Footer block of the menu — hairline divider, CTA, social row */}
            <div className="flex-shrink-0 mt-8">
              <div className="border-t border-white/15 mb-6" aria-hidden="true" />
              <button
                onClick={() => { setMobileOpen(false); openBooking() }}
                className="booking-btn w-full btn-azure button-text mb-6"
              >
                {data.ctaLabel}
              </button>
              <div className="flex justify-center space-x-6">
                <a href="https://www.facebook.com/innerjourneywithshanila/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/80 text-2xl hover:text-carrot">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/_.innerjourney_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 text-2xl hover:text-carrot">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCJbRrCiY4zXfojPTa17EKMg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/80 text-2xl hover:text-carrot">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://api.whatsapp.com/send?phone=447387973382&" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/80 text-2xl hover:text-carrot">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
