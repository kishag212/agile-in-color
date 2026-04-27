import { Link } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/manifesto', label: 'Manifesto' },
  { to: '/programs', label: 'Programs' },
  { to: '/team', label: 'Team' },
  { to: '/events', label: 'Events' },
  { to: '/membership', label: 'Membership' },
  { to: '/sponsor', label: 'Sponsor' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream-light">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <BrandMark size="sm" />
            <p className="mt-4 text-sm text-cream-light/80">
              Developing, connecting, and elevating professionals of color into leaders shaping
              the future of agile, innovation, and modern work.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-cream-light/70">
              Explore
            </h4>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-cream-light/90 no-underline hover:text-wheat">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-cream-light/70">
              Stay in touch
            </h4>
            <p className="mt-3 text-sm text-cream-light/80">
              Subscribe for program updates, events, and ways to get involved.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-cream-light/10 pt-6 text-xs text-cream-light/60">
          © {new Date().getFullYear()} Agile in Color. 501(c)(3) nonprofit. Founded 2020.
        </div>
      </div>
    </footer>
  )
}
