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
                alt="Shanila Khan Clarity and Mindset Coaching Logo"
                width={240}
                height={60}
                className="h-14 w-auto"
                priority
              />
              <div className="text-2xl heading-primary text-white">{data.brandLabel}</div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {data.links.map((link) => link.showDropdown ? (
                <div key={link.href} className="nav-dropdown">
                  <Link href={link.href} className="nav-link nav-text text-white hover:text-carrot transition-colors uppercase">
                    {link.label} <i className="fas fa-chevron-down ml-1 text-xs"></i>
                  </Link>
                  <div className="nav-dropdown-menu">
                    {data.workWithMeDropdown.map((d) => (
                      <Link key={d.href} href={d.href} className="nav-dropdown-item">{d.label}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="nav-link nav-text text-white hover:text-carrot transition-colors uppercase">{link.label}</Link>
              ))}
            </div>

            <button
              id="booking-btn"
              onClick={openBooking}
              className="booking-btn btn-azure btn-sm button-text hidden md:inline-flex"
            >
              {data.ctaLabel}
            </button>

            <div className="md:hidden mr-2">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Toggle navigation menu"
                className="text-white text-2xl"
              >
                <i className="fas fa-bars" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
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
          <div className="px-6 py-4 space-y-4 mobile-menu-content">
            {data.links.map((link) => link.showDropdown ? (
              <div key={link.href} className="mobile-nav-dropdown">
                <button
                  className="mobile-dropdown-toggle block text-white hover:text-carrot transition-colors uppercase w-full text-left"
                  onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
                >
                  {link.label} <i className={`fas fa-chevron-down ml-1 text-xs transition-transform ${workDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {workDropdownOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {data.workWithMeDropdown.map((d) => (
                      <Link key={d.href} href={d.href} className="block text-white hover:text-carrot transition-colors" onClick={() => setMobileOpen(false)}>{d.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href} className="block text-white hover:text-carrot transition-colors uppercase" onClick={() => setMobileOpen(false)}>{link.label}</Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); openBooking() }}
              className="booking-btn w-full btn-azure button-text"
            >
              {data.ctaLabel}
            </button>
            <div className="flex justify-center mt-4 space-x-6">
              <a href="https://www.facebook.com/innerjourneywithshanila/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white text-2xl hover:text-orange-400">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/_.innerjourney_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white text-2xl hover:text-orange-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCJbRrCiY4zXfojPTa17EKMg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white text-2xl hover:text-orange-400">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://api.whatsapp.com/send?phone=447387973382&" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white text-2xl hover:text-orange-400">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
