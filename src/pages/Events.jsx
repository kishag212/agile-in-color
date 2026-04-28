import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function Events() {
  return (
    <>
      <Hero />
      <CampaignBand />
      <UpcomingEvents />
      <PastEvents />
      <StayInformed />
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
    <section className="bg-bg px-9 py-16 text-center md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">
          Where you'll find us
        </p>
        <h1 className="mt-3 font-serif text-5xl font-normal leading-none tracking-tight text-ink md:text-6xl">
          Events <em className="font-medium text-walnut">& gatherings</em>.
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-[60px] rounded-full bg-honey"
        />
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          Conferences, panels, and community gatherings where Agile in Color shows up — to
          speak, to teach, and to build the field of practitioners shaping what comes next.
        </p>
      </div>
    </section>
  )
}

function CampaignBand() {
  return (
    <section className="relative overflow-hidden bg-espresso px-9 py-12 text-cream-light">
      <ColorStripe />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-80px] top-12 h-72 w-72 rounded-full bg-walnut opacity-25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-wheat">2026 Campaign</p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-cream-light md:text-4xl">
          Three stops. <em className="font-medium text-wheat">One conversation.</em>
        </h2>
        <p className="mt-4 text-base leading-relaxed opacity-90 md:text-lg">
          Throughout 2026, Agile in Color is bringing one essential conversation — Reimagined
          Agility in an AI World — to three of the field's most important venues. Vancouver
          introduces the framework. AfroTech expands the audience. Agile 2026 is where the
          conversation becomes a movement.
        </p>
        <p className="mt-5 text-sm leading-relaxed opacity-80 md:text-base">
          The Agile 2026 Open Space is funding-dependent. Help us bring it to life.
        </p>
        <div className="mt-5 flex justify-center">
          <Link
            to="/sponsor"
            className="inline-flex items-center gap-2 rounded-full bg-wheat px-6 py-3 text-sm font-medium text-espresso no-underline transition-colors hover:bg-honey"
          >
            Fund the Open Space
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

const UPCOMING_EVENTS = [
  {
    borderClass: 'border-l-walnut',
    status: 'CONFIRMED',
    statusClass: 'bg-walnut/15 text-walnut',
    dateBig: 'May 3–6',
    dateSmall: '2026',
    accentClass: 'text-walnut',
    eyebrow: 'Conference · Vancouver, BC',
    title: 'Global Scrum Gathering',
    body:
      'Get ready for inspiration, innovation, and unforgettable moments — the Global Scrum Gathering heads to vibrant Vancouver. Find Agile in Color presenting the framework that will anchor our 2026 work.',
    sessionTitle: 'Agile Reimagined: Thriving Ethically in an AI-Driven World',
  },
  {
    borderClass: 'border-l-[#a06832]',
    status: 'PENDING',
    statusClass: 'bg-honey/30 text-[#b8843e]',
    dateBig: 'Nov',
    dateSmall: '2026',
    accentClass: 'text-caramel-deep',
    eyebrow: 'Conference · Houston, TX',
    title: 'AfroTech 2026',
    body:
      'Submitted to bring Reimagined Agility to AfroTech audiences — the largest gathering of Black tech professionals in the world. Pending acceptance.',
    sessionTitle: 'Reimagined Agility in an AI World with Diverse Voices',
  },
  {
    borderClass: 'border-l-[#b8843e]',
    status: 'FUNDING DEPENDENT',
    statusClass: 'bg-wheat/30 text-walnut',
    dateBig: 'Jul 26–28',
    dateSmall: '2026',
    accentClass: 'text-[#b8843e]',
    eyebrow: 'Conference · National Harbor, MD',
    title: 'Agile 2026 Open Space',
    body:
      "Our flagship event — a dedicated, participant-driven Open Space at the Gaylord National Resort during Agile Alliance's Agile 2026. Status: actively raising funds.",
    sessionTitle: 'Reimagined Agility in an AI World with Diverse Voices',
  },
]

function UpcomingEvents() {
  return (
    <section className="bg-bg px-9 py-14">
      <header className="mb-9 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">Upcoming</p>
        <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-ink md:text-4xl">
          What's <em className="font-medium text-walnut">next</em>
        </h2>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 md:grid-cols-3">
        {UPCOMING_EVENTS.map((e) => (
          <EventCard key={e.title} {...e} />
        ))}
      </div>
    </section>
  )
}

function EventCard({
  borderClass,
  status,
  statusClass,
  dateBig,
  dateSmall,
  accentClass,
  eyebrow,
  title,
  body,
  sessionTitle,
}) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-lg border-l-4 bg-surface ${borderClass}`}
    >
      <div className="flex h-full flex-col p-7">
        <div className="flex justify-end">
          <span
            className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest ${statusClass}`}
          >
            {status}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-2xl font-medium leading-none text-ink">{dateBig}</span>
          <span className="text-sm text-ink-soft">{dateSmall}</span>
        </div>
        <p
          className={`mt-3 text-[11px] font-medium uppercase tracking-[0.2em] ${accentClass}`}
        >
          {eyebrow}
        </p>
        <h3 className="mt-2 font-serif text-xl font-medium leading-tight text-ink md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft md:text-base">{body}</p>
        <div className="mt-4">
          <div aria-hidden="true" className="mb-3 h-px bg-ink/10" />
          <p className={`text-xs font-medium uppercase tracking-widest ${accentClass}`}>
            Session
          </p>
          <p className="font-serif text-sm italic text-ink">{sessionTitle}</p>
        </div>
      </div>
    </article>
  )
}

const PAST_EVENTS = [
  {
    dateTop: 'Past event',
    dateBottom: 'November 2025',
    eyebrow: 'Conference · Cologne, Germany',
    title: 'Women in Agile Europe',
    body:
      'Agile in Color was honored to be represented in Europe by Angeley Mullins and Nancy A., debuting a panel discussion alongside our European agile community.',
  },
  {
    dateTop: 'Past event',
    dateBottom: 'TBD', // TODO: confirm date and details for Scrum Gathering Germany
    eyebrow: 'Conference · Germany',
    title: 'Scrum Gathering Germany',
    body:
      'Agile in Color community gathering and panel representation at the European Scrum Gathering.',
  },
]

function PastEvents() {
  return (
    <section className="bg-surface px-9 py-14">
      <header className="mb-9 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-caramel-deep">Where we've been</p>
        <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-ink md:text-4xl">
          Past <em className="font-medium text-caramel-deep">events</em>
        </h2>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        {PAST_EVENTS.map((e) => (
          <PastEventCard key={e.title} {...e} />
        ))}
      </div>
    </section>
  )
}

function PastEventCard({ dateTop, dateBottom, eyebrow, title, body }) {
  return (
    <article className="flex items-start gap-4 rounded-lg bg-bg p-6">
      <div className="min-w-[80px]">
        <p className="text-[10px] font-medium uppercase tracking-widest text-walnut">
          {dateTop}
        </p>
        <p className="font-serif text-base font-medium leading-tight text-ink">{dateBottom}</p>
      </div>
      <div>
        <p className="mb-1 text-[11px] uppercase tracking-widest text-walnut">{eyebrow}</p>
        <h4 className="mb-2 font-serif text-lg font-medium text-ink">{title}</h4>
        <p className="text-sm leading-relaxed text-ink-soft">{body}</p>
      </div>
    </article>
  )
}

function StayInformed() {
  return (
    <section className="bg-panel px-9 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cream-light">Stay in the loop</p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-cream-light md:text-4xl">
          Get the next event in <em className="font-medium text-bg">your inbox</em>.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-cream-light/90 md:text-lg">
          We send a short note when something's happening — new event dates, scholarship windows,
          speaker calls. No spam, ever.
        </p>
        <div className="mt-7 flex justify-center">
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 rounded-full bg-cream-light px-7 py-4 text-sm font-medium text-espresso no-underline transition-colors hover:bg-wheat"
          >
            Join the community
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
