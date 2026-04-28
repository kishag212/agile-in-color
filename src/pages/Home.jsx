import { Link } from 'react-router-dom'
import { ArrowUpRight, Megaphone, Rocket, Link2, Quote } from 'lucide-react'
import Pillar from '../components/Pillar.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <TaglineStrip />
      <Pillars />
      <EventsPreview />
      <Testimonial />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-16 pb-20 sm:pt-20 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full bg-honey opacity-30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-[280px] w-[280px] rounded-full bg-caramel opacity-20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <div className="mb-7 flex items-center gap-3">
              <span className="block h-px w-12 bg-walnut" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.3em] text-ink">
                A nonprofit community
              </span>
            </div>

            <h1 className="font-serif text-5xl font-normal leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Building the leaders shaping{' '}
              <em className="not-italic text-walnut">what comes next</em>
              <span className="text-caramel">.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Agile in Color develops, connects, and elevates professionals of color into
              confident leaders, trusted experts, and influential voices reshaping organizations
              and industries — for the future of work, however it unfolds.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/sponsor"
                className="inline-flex items-center gap-2 rounded-full bg-walnut px-7 py-4 font-medium text-bg no-underline transition-colors hover:bg-walnut-deep"
              >
                Support the mission
                <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-transparent px-7 py-4 font-medium text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="md:col-span-4">
            <HeroPhoto />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroPhoto() {
  return (
    <div className="relative mx-auto w-full">
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 z-0 h-full w-full rounded-2xl bg-wheat opacity-30 md:rounded-3xl"
      />
      <img
        src="/community/community-hero.png"
        alt="Members of the Agile in Color community gathered together at Agile 2024, smiling and connecting"
        loading="eager"
        fetchPriority="high"
        className="relative z-10 aspect-[3/2] w-full rounded-2xl object-cover object-center shadow-xl shadow-walnut/15 md:aspect-[4/5] md:rounded-3xl"
      />
    </div>
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

function TaglineStrip() {
  return (
    <section className="relative bg-espresso px-9 py-8 text-center text-cream-light">
      <ColorStripe />
      <p className="font-serif text-xl italic tracking-wide">
        Mentorship for today. Leadership for what's{' '}
        <em className="font-medium not-italic text-wheat">emerging</em>.
      </p>
    </section>
  )
}

function Pillars() {
  return (
    <section className="bg-surface px-9 py-16">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-12 text-center">
          <p className="text-xs uppercase tracking-wide text-walnut">Our mission</p>
          <h2 className="mt-3 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
            Amplify. Boost.{' '}
            <em className="font-medium not-italic text-walnut">Connect.</em>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Pillar
            icon={Megaphone}
            bgClass="bg-walnut"
            iconClass="text-cream-light"
            titleClass="text-walnut"
            title="Amplify"
            body="Highlight the voices of professionals of color and open new platforms for their work."
          />
          <Pillar
            icon={Rocket}
            bgClass="bg-caramel"
            iconClass="text-cream-light"
            titleClass="text-caramel-deep"
            title="Boost"
            body="Mentorship, coaching, and learning that prepare members for what's emerging."
          />
          <Pillar
            icon={Link2}
            bgClass="bg-honey"
            iconClass="text-ink"
            titleClass="text-honey-deep"
            title="Connect"
            body="Build the relationships that move careers forward across disciplines and industries."
          />
        </div>
      </div>
    </section>
  )
}

// TODO: confirm real dates with org
const EVENTS = [
  {
    accent: 'walnut',
    month: 'May',
    day: '04',
    eyebrow: 'Conference · Vancouver, BC',
    title: 'Scrum Gathering Vancouver',
    body:
      'Join Agile in Color at the Scrum Alliance Global Gathering — sessions, networking, and our community meetup.',
  },
  {
    accent: 'caramel',
    month: 'Jul',
    day: '27',
    eyebrow: 'Conference · Washington, D.C.',
    title: 'Agile 2026',
    body:
      "The flagship gathering of the agile community. Find Agile in Color in the nation's capital for sessions, panels, and our hospitality space.",
  },
]

function EventsPreview() {
  return (
    <section className="bg-bg px-9 py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-walnut">What's next</p>
            <h2 className="mt-3 font-serif text-4xl font-normal leading-tight tracking-tight text-ink">
              Upcoming{' '}
              <em className="font-medium not-italic text-walnut">events</em>
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full border-2 border-walnut px-5 py-2.5 text-sm font-medium text-walnut no-underline transition-colors hover:bg-walnut hover:text-bg"
          >
            View all events →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {EVENTS.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EventCard({ accent, month, day, eyebrow, title, body }) {
  const borderClass = accent === 'walnut' ? 'border-l-walnut' : 'border-l-caramel'
  const dateBgClass = accent === 'walnut' ? 'bg-walnut' : 'bg-caramel'
  const eyebrowClass = accent === 'walnut' ? 'text-walnut' : 'text-caramel-deep'

  return (
    <article
      className={`rounded-lg border-l-4 bg-surface p-7 ${borderClass} transition-transform hover:-translate-y-1`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`min-w-[64px] rounded-md p-3 text-center text-bg ${dateBgClass}`}
        >
          <div className="text-[11px] uppercase tracking-widest opacity-85">{month}</div>
          <div className="mt-1 font-serif text-2xl font-medium leading-none">{day}</div>
        </div>
        <div>
          <p className={`mb-1 text-[11px] uppercase tracking-widest ${eyebrowClass}`}>
            {eyebrow}
          </p>
          <h4 className="mb-2 font-serif text-xl font-medium text-ink">{title}</h4>
          <p className="text-sm leading-snug text-ink-soft">{body}</p>
        </div>
      </div>
    </article>
  )
}

function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-espresso px-9 py-16 text-cream-light">
      <ColorStripe />
      <div className="mx-auto max-w-3xl text-center">
        <Quote size={38} className="mx-auto mb-5 text-wheat" aria-hidden="true" />
        <blockquote className="mb-5 font-serif text-2xl font-normal italic leading-snug sm:text-3xl">
          “After two decades in tech, finding a community of professionals of color has been
          transformative — a space to learn, lead, and grow alongside people who share the
          journey.”
        </blockquote>
        <p className="text-xs uppercase tracking-widest text-wheat opacity-85">
          — Member voice
        </p>
      </div>
    </section>
  )
}
