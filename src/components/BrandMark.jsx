const SIZES = {
  md: { bar: 'w-[7px] h-[22px]', gap: 'gap-[3px]', text: 'text-xl', mark: 'gap-3' },
  sm: { bar: 'w-[5px] h-[16px]', gap: 'gap-[2px]', text: 'text-base', mark: 'gap-2' },
}

const BAR_COLORS = ['bg-walnut', 'bg-caramel', 'bg-honey', 'bg-wheat', 'bg-cream-light']

export default function BrandMark({ size = 'md', className = '' }) {
  const s = SIZES[size] ?? SIZES.md
  return (
    <span className={`inline-flex items-center ${s.mark} ${className}`}>
      <span className={`flex items-end ${s.gap}`} aria-hidden="true">
        {BAR_COLORS.map((color, i) => (
          <span key={i} className={`${s.bar} ${color} rounded-sm`} />
        ))}
      </span>
      <span className={`font-serif font-semibold tracking-wide ${s.text} text-walnut-deep`}>
        AGILE <em className="font-serif italic font-semibold text-caramel normal-case lowercase">in</em> COLOR
      </span>
    </span>
  )
}
