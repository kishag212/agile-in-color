import { Linkedin, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const officers = [
  {
    name: 'Kisha Wright',
    role: 'President',
    photo: '/team/kisha-wright.jpg',
    linkedin_url: 'https://www.linkedin.com/in/kisha-wright-banks-872b0a37/',
    bio: null, // TODO: add bio
  },
  {
    name: 'Andrea Robinson',
    role: 'Vice President',
    photo: '/team/andrea-robinson.jpg',
    linkedin_url: 'https://www.linkedin.com/in/andreacrobinson/',
    bio: null, // TODO: add bio
  },
  {
    name: 'Adriane Lowrie',
    role: 'Treasurer',
    photo: '/team/adriane-lowrie.jpg',
    linkedin_url: 'https://www.linkedin.com/in/adriane-lowrie-302956355',
    bio: null, // TODO: add bio
  },
  {
    name: 'Keira Des Anges',
    role: 'Secretary',
    photo: null, // TODO: photo not yet uploaded
    linkedin_url: null, // TODO: confirm URL
    bio: null, // TODO: add bio
  },
]

const coreTeam = [
  { name: 'Christopher Richardson', role: 'Core Team', photo: '/team/christopher-richardson.jpg', linkedin_url: 'https://www.linkedin.com/in/cprichard92/' },
  { name: 'Dr. Kadidra Hurst', role: 'Core Team', photo: '/team/kadidra-hurst.jpg', linkedin_url: 'https://www.linkedin.com/in/kadidra/' },
  { name: 'Matt Carlson', role: 'Core Team', photo: '/team/matt-carlson.jpg', linkedin_url: 'https://www.linkedin.com/in/littleroom/' },
  { name: 'Nicole Spence-Goon', role: 'Core Team', photo: '/team/nicole-spence-goon.jpg', linkedin_url: 'https://www.linkedin.com/in/nicole-spence-goon/' },
  { name: 'Louria Lindauer', role: 'Core Team', photo: '/team/louria-lindauer.jpg', linkedin_url: 'https://www.linkedin.com/in/louria-lindauer/' },
  { name: 'Ibrahim Adam', role: 'Core Team', photo: '/team/ibrahim-adam.png', linkedin_url: 'https://www.linkedin.com/in/ibrahim-adam-csa/' },
]

export default function Team() {
  return (
    <>
      <Hero />
      <Officers />
      <CoreTeamSection />
      <JoinCTA />
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

function PhotoOrPlaceholder({ photo, name, aspect }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={`${aspect} w-full object-cover object-top`}
      />
    )
  }
  return (
    <div
      className={`${aspect} flex w-full items-center justify-center bg-gradient-to-br from-walnut to-caramel`}
    >
      <span className="font-serif text-sm italic text-cream-light">Photo coming soon</span>
    </div>
  )
}

function LinkedInBadge({ url, size = 18 }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="inline-flex text-walnut transition-colors hover:text-walnut-deep"
      >
        <Linkedin size={size} />
      </a>
    )
  }
  return (
    <span aria-hidden="true" className="inline-flex text-walnut opacity-30">
      <Linkedin size={size} />
    </span>
  )
}

function Hero() {
  return (
    <section className="bg-bg px-9 py-16 text-center md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">
          The people behind the work
        </p>
        <h1 className="mt-3 font-serif text-5xl font-normal leading-none tracking-tight text-ink md:text-6xl">
          Meet the <em className="font-medium text-walnut">team</em>.
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-[60px] rounded-full bg-honey"
        />
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
          A community of practitioners, leaders, and advocates building Agile in Color into the
          home for professionals of color shaping the future of agile.
        </p>
      </div>
    </section>
  )
}

function Officers() {
  return (
    <section className="bg-surface px-9 py-14">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-caramel-deep">Officers</p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-ink">Leadership</h2>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 md:grid-cols-4 md:gap-6">
        {officers.map((o) => (
          <OfficerCard key={o.name} {...o} />
        ))}
      </div>
    </section>
  )
}

function OfficerCard({ name, role, photo, linkedin_url, bio }) {
  return (
    <article className="overflow-hidden rounded-lg bg-bg shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <PhotoOrPlaceholder photo={photo} name={name} aspect="aspect-[4/5]" />
      <div className="p-7">
        <h3 className="font-serif text-2xl font-medium leading-tight text-ink">{name}</h3>
        <p className="mt-1 text-sm font-medium uppercase tracking-widest text-walnut">{role}</p>
        {bio && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{bio}</p>}
        <div className="mt-4">
          <LinkedInBadge url={linkedin_url} size={18} />
        </div>
      </div>
    </article>
  )
}

function CoreTeamSection() {
  return (
    <section className="bg-bg px-9 py-14">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">The team</p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-ink">Core team</h2>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {coreTeam.map((m) => (
          <CoreCard key={m.name} {...m} />
        ))}
      </div>
    </section>
  )
}

function CoreCard({ name, role, photo, linkedin_url }) {
  return (
    <article className="overflow-hidden rounded-lg bg-surface transition hover:-translate-y-1">
      <PhotoOrPlaceholder photo={photo} name={name} aspect="aspect-square" />
      <div className="p-5">
        <h3 className="font-serif text-lg font-medium leading-tight text-ink">{name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-walnut">{role}</p>
        <div className="mt-3">
          <LinkedInBadge url={linkedin_url} size={16} />
        </div>
      </div>
    </article>
  )
}

function JoinCTA() {
  return (
    <section className="relative overflow-hidden bg-espresso px-9 py-14 text-center text-cream-light">
      <ColorStripe />
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-3xl font-normal tracking-tight text-cream-light md:text-4xl">
          Want to <em className="font-medium text-wheat">join us</em>?
        </h2>
        <p className="mt-3 text-base leading-relaxed opacity-90 md:text-lg">
          Core Team positions are elected and require six or more months of committee service.
          The path starts with engagement — get involved with a committee, attend events, and
          grow into leadership.
        </p>
        <div className="mt-7 flex justify-center">
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 rounded-full bg-wheat px-7 py-4 text-sm font-medium text-espresso no-underline transition-colors hover:bg-honey"
          >
            Join the community
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
