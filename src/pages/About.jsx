export default function About() {
  return (
    <>
      <Hero />
      <FoundingBand />
      <OverlapStorySection />
      <VisionMissionCards />
      <WhyNowBand />
      <PillarsSection />
    </>
  )
}

function ColorStripe() {
  return (
    <div className="absolute inset-x-0 top-0 flex h-1" aria-hidden="true">
      <div className="flex-1 bg-walnut" />
      <div className="flex-1 bg-caramel" />
      <div className="flex-1 bg-honey" />
      <div className="flex-1 bg-wheat" />
      <div className="flex-1 bg-cream-light" />
    </div>
  )
}

function Hero() {
  return (
    <section className="bg-panel px-9 py-14 text-center">
      <div className="inline-flex items-center gap-4">
        <span className="block h-px w-24 bg-cream-light/70" aria-hidden="true" />
        <span className="text-xs uppercase tracking-[0.3em] text-cream-light">Our story</span>
        <span className="block h-px w-24 bg-cream-light/70" aria-hidden="true" />
      </div>
      <h1 className="mt-4 font-serif text-5xl font-normal leading-none tracking-tight text-cream-light md:text-6xl">
        About <em className="font-medium not-italic">us</em>
      </h1>
    </section>
  )
}

function FoundingBand() {
  return (
    <section className="relative overflow-hidden bg-espresso px-9 py-16 text-cream-light">
      <ColorStripe />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full bg-walnut opacity-30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-4xl grid-cols-1 items-center gap-12 md:grid-cols-[auto_1fr]">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-wheat">Founded</p>
          <p className="mt-2 font-serif text-7xl font-medium leading-none text-cream-light md:text-8xl">
            2020
          </p>
          <span
            aria-hidden="true"
            className="mx-auto mt-3 block h-[2px] w-[50px] bg-honey-deep"
          />
        </div>

        <div>
          <h2 className="mb-3 font-serif text-3xl font-medium leading-tight text-cream-light">
            Born from a moment <em className="not-italic text-wheat">of reckoning</em>.
          </h2>
          <p className="text-sm leading-relaxed opacity-90 md:text-base">
            Agile in Color was founded in 2020 in the aftermath of George Floyd's murder — a
            moment that compelled the agile community to confront the gap between what we say we
            value and how we show up.
          </p>
          <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">
            We came together to build a space where Black, Indigenous, and other professionals of
            color could be seen, supported, and sustained — not as a footnote to inclusion, but as
            the people leading what comes next.
          </p>
        </div>
      </div>
    </section>
  )
}

function OverlapStorySection() {
  return (
    <section className="bg-panel px-9 py-14">
      <div className="mx-auto max-w-6xl space-y-12 md:space-y-16">
        <OverlapPair
          imageSide="left"
          photoSrc="/community/community-table.jpg"
          photoAlt="Members of the Agile in Color community gathered at a long table during Agile 2024, smiling and connecting"
          title="Our story"
          body="Agile in Color was founded to promote equality, diversity, and inclusion within the agile community. We provide a platform for professionals of color and underrepresented groups to thrive and lead in agile practices. What started as small meetups has grown into a global community, united by collaboration, respect, and transparency. Today, we continue to advocate for systemic change, ensuring diverse voices are central to the future of agile."
        />
        <OverlapPair
          imageSide="right"
          photoSrc="/community/community-selfie.jpg"
          photoAlt="Four members of the Agile in Color community in a joyful selfie at Agile 2024, including Dr. Kadidra Hurst wearing an Agile in Color shirt"
          objectStyle={{ objectPosition: '40% 25%' }}
          title="Our mission"
          body="To build a vibrant, inclusive community that drives transformation in agile. We are committed to advancing equity, fostering belonging, and amplifying the voices of professionals of color. Through mentorship, education, and networking, we empower diverse practitioners to lead and innovate — creating a stronger, more inclusive agile community."
        />
      </div>
    </section>
  )
}

function OverlapPair({
  imageSide,
  photoSrc,
  photoAlt,
  objectClass = 'object-center',
  objectStyle,
  gradient,
  placeholder,
  title,
  body,
}) {
  const imageLeft = imageSide === 'left'
  const gridTemplate = imageLeft
    ? 'md:grid-cols-[1.1fr_1fr]'
    : 'md:grid-cols-[1fr_1.1fr]'
  const cardOverlap = imageLeft ? 'md:ml-[-40px]' : 'md:mr-[-40px]'
  const imageOrder = imageLeft ? 'md:order-1' : 'md:order-2'
  const cardOrder = imageLeft ? 'md:order-2' : 'md:order-1'

  const image = (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg ${
        photoSrc ? '' : gradient ?? ''
      } ${imageOrder}`}
    >
      {photoSrc ? (
        <img
          src={photoSrc}
          alt={photoAlt}
          loading="lazy"
          style={objectStyle}
          className={`h-full w-full rounded-lg object-cover ${objectClass}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <span className="text-sm italic text-cream-light/70">{placeholder}</span>
        </div>
      )}
    </div>
  )

  const card = (
    <div
      className={`relative z-10 rounded-lg bg-bg p-9 shadow-md ${cardOverlap} ${cardOrder} mt-[-24px] md:mt-0`}
    >
      <h2 className="mb-4 font-serif text-3xl font-medium leading-tight text-ink">{title}</h2>
      <p className="text-base leading-relaxed text-ink-soft">{body}</p>
    </div>
  )

  return (
    <div className={`grid grid-cols-1 items-center gap-6 ${gridTemplate}`}>
      {image}
      {card}
    </div>
  )
}

function VisionMissionCards() {
  return (
    <section className="bg-bg px-9 py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        <article className="rounded-lg border-t-4 border-walnut bg-surface p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-walnut">Vision</p>
          <p className="font-serif text-xl font-normal italic leading-snug text-ink md:text-2xl">
            A world where professionals of color lead the future of agile, innovation, and modern
            work.
          </p>
        </article>
        <article className="rounded-lg border-t-4 border-caramel bg-surface p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-caramel-deep">Mission</p>
          <p className="text-base leading-relaxed text-ink">
            We <strong>develop, connect, and elevate</strong> professionals of color into
            confident leaders, trusted experts, and influential voices shaping organizations and
            industries.
          </p>
        </article>
      </div>
    </section>
  )
}

function WhyNowBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-espresso to-[#2a1a0d] px-9 py-16 text-cream-light">
      <ColorStripe />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-12 h-72 w-72 rounded-full bg-caramel opacity-25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-wheat">Why now</p>
        <h2 className="mb-6 font-serif text-3xl font-normal leading-tight tracking-tight text-cream-light md:text-4xl">
          The next decade of work is being{' '}
          <em className="italic font-medium text-wheat">written right now</em>.
        </h2>
        <p className="text-base leading-relaxed opacity-95 md:text-lg">
          As organizations rewire around AI, automation, and emerging ways of working, the people
          best positioned to lead that change must reflect the people that change affects most.
        </p>
        <p className="mt-4 text-base leading-relaxed opacity-85 md:text-lg">
          Without intentional investment, the same gaps that have always existed in tech and
          leadership will be hard-coded into the systems that shape every industry. Agile in
          Color exists to make sure that doesn't happen — by preparing professionals of color to
          lead what comes next, not just adapt to it.
        </p>
      </div>
    </section>
  )
}

const PILLARS = [
  {
    n: '1',
    title: 'Amplify',
    bg: 'bg-walnut',
    numColor: 'text-cream-light',
    titleColor: 'text-walnut',
    body: 'Highlight the voices of professionals of color and open new platforms.',
  },
  {
    n: '2',
    title: 'Boost',
    bg: 'bg-caramel',
    numColor: 'text-cream-light',
    titleColor: 'text-caramel-deep',
    body: "Mentorship, coaching, and learning that prepare members for what's emerging.",
  },
  {
    n: '3',
    title: 'Connect',
    bg: 'bg-honey',
    numColor: 'text-ink',
    titleColor: 'text-honey-deep',
    body: 'Build the relationships that move careers forward across disciplines.',
  },
]

function PillarsSection() {
  return (
    <section className="bg-surface px-9 py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-walnut">How we do it</p>
          <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-ink md:text-4xl">
            Amplify. Boost.{' '}
            <em className="font-medium not-italic text-walnut">Connect.</em>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.title} className="rounded-lg bg-bg p-7 text-center">
              <div
                className={`mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full ${p.bg}`}
              >
                <span className={`font-serif text-base font-medium ${p.numColor}`}>{p.n}</span>
              </div>
              <h3 className={`mt-3 font-serif text-xl font-medium ${p.titleColor}`}>{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
