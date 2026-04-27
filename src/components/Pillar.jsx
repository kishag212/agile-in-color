export default function Pillar({ icon: Icon, title, body, className = '' }) {
  return (
    <article className={`rounded-2xl bg-bg p-6 shadow-sm ${className}`}>
      {Icon && (
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-wheat text-ink">
          <Icon size={20} />
        </div>
      )}
      <h3 className="mt-4 font-serif text-xl text-ink">{title}</h3>
      {body && <p className="mt-2 text-sm text-ink-soft">{body}</p>}
    </article>
  )
}
