import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import BrandMark from './BrandMark.jsx'
import Button from './Button.jsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/manifesto', label: 'Manifesto' },
  { to: '/programs', label: 'Programs' },
  { to: '/team', label: 'Team' },
  { to: '/events', label: 'Events' },
  { to: '/membership', label: 'Membership' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-walnut' : 'text-ink-soft hover:text-walnut'
    }`

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
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
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
            {LINKS.map((link) => (
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
