export default function Pillar({
  icon: Icon,
  bgClass = 'bg-walnut',
  iconClass = 'text-cream-light',
  titleClass = 'text-walnut',
  title,
  body,
}) {
  return (
    <article className="rounded-lg border border-walnut/10 bg-bg p-9 transition-transform hover:-translate-y-1">
      {Icon && (
        <div
          className={`inline-flex h-[54px] w-[54px] items-center justify-center rounded-full ${bgClass}`}
        >
          <Icon size={24} className={iconClass} />
        </div>
      )}
      <h3 className={`mt-6 font-serif text-3xl font-medium ${titleClass}`}>{title}</h3>
      {body && (
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{body}</p>
      )}
    </article>
  )
}
