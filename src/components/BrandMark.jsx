const HEIGHTS = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
}

export default function BrandMark({ size = 'md', className = '' }) {
  const height = HEIGHTS[size] ?? HEIGHTS.md
  return (
    <img
      src="/AIC_logo.svg"
      alt="Agile in Color"
      className={`${height} w-auto transition-opacity hover:opacity-80 ${className}`}
    />
  )
}
