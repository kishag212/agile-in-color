import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import BrandMark from './BrandMark.jsx'
import Button from './Button.jsx'

const ABOUT_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/code-of-conduct', label: 'Code of Conduct' },
]

const ABOUT_PATHS = ABOUT_LINKS.map((l) => l.to)

const TOP_LINKS = [
  { to: '/manifesto', label: 'Manifesto' },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/membership', label: 'Membership' },
  { to: '/contact', label: 'Contact' },
]

const MOBILE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/code-of-conduct', label: 'Code of Conduct' },
  { to: '/manifesto', label: 'Manifesto' },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/membership', label: 'Membership' },
  { to: '/contact', label: 'Contact' },
]

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-walnut' : 'text-ink-soft hover:text-walnut'
  }`

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled ? 'bg-bg/80 backdrop-blur border-b border-surface' : 'bg-bg'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="no-underline">
          <BrandMark size="md" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <AboutDropdown />
          {TOP_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Button to="/sponsor" variant="filled" className="px-4 py-2 text-sm">
            Donate
          </Button>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-ink"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-surface bg-bg">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
            {MOBILE_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <Button
              to="/sponsor"
              variant="filled"
              className="mt-2 self-start px-4 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              Donate
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

function AboutDropdown() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const closeTimer = useRef(null)
  const location = useLocation()
  const isActive = ABOUT_PATHS.includes(location.pathname)

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    function onMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onMouseDown)
      cancelClose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex items-center text-sm font-medium transition-colors ${
          isActive ? 'text-walnut' : 'text-ink-soft hover:text-walnut'
        }`}
      >
        About
        <ChevronDown size={14} className="ml-1" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 min-w-[200px] rounded-lg border border-walnut/15 bg-bg py-2 shadow-lg"
        >
          {ABOUT_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={({ isActive: itemActive }) =>
                `block px-4 py-2.5 text-sm no-underline transition-colors hover:bg-surface hover:text-walnut ${
                  itemActive ? 'text-walnut' : 'text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
