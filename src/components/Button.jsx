import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-walnut text-cream-light hover:bg-walnut-deep',
  filled: 'bg-walnut-deep text-cream-light hover:bg-walnut',
  secondary: 'bg-wheat text-ink hover:bg-honey',
  ghost: 'border border-walnut text-walnut hover:bg-walnut hover:text-cream-light',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium transition-colors no-underline'

export default function Button({
  variant = 'primary',
  to,
  href,
  className = '',
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
