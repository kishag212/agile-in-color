import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function Programs() {
  return (
    <>
      <Hero />
      <FlagshipAI />
      <SupportingPrograms />
      <SponsorCTA />
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
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">What we fund</p>
        <h1 className="mt-3 font-serif text-5xl font-normal leading-none tracking-tight text-ink md:text-6xl">
          Programs that <em className="font-medium text-walnut">build leaders</em>.
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-[60px] rounded-full bg-honey"
        />
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          Concrete initiatives that develop, connect, and elevate professionals of color.
          Sponsors and donors can underwrite specific programs or contribute to our general
          fund — every dollar maps to direct member support.
        </p>
      </div>
    </section>
  )
}

function FlagshipAI() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-espresso to-[#1f1209] px-9 py-16 text-cream-light md:py-20">
      <ColorStripe />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-100px] top-12 h-96 w-96 rounded-full bg-walnut opacity-25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="inline-block rounded-full bg-wheat/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-wheat">
              Flagship · 2026
            </span>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-tight text-cream-light md:text-5xl">
              AI Readiness <em className="font-medium text-wheat">Cohort</em>
            </h2>
            <p className="mt-5 text-base leading-relaxed opacity-95 md:text-lg">
              A six-month cohort program preparing agile practitioners of color to lead AI
              adoption inside their organizations — covering tooling, ethics, change management,
              and leadership presence.
            </p>
            <p className="mt-3 text-sm leading-relaxed opacity-85 md:text-base">
              Cohort members leave with a portfolio, a peer network, and the standing to be the
              person their organization turns to when the questions get hard.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-lg border border-wheat/20 bg-cream-light/[0.06] p-6 md:p-7">
              <DarkStatRow eyebrow="Funding goal" value="$45,000" />
              <DarkDivider />
              <DarkStatRow eyebrow="Cohort size" value="30 fellows" />
              <DarkDivider />
              <DarkStatRow eyebrow="Sponsor a fellow" value="$1,500" />
            </div>
            <div className="mt-4">
              <Link
                to="/sponsor"
                className="inline-flex items-center gap-2 rounded-full bg-wheat px-6 py-3 text-sm font-medium text-espresso no-underline transition-colors hover:bg-honey"
              >
                Sponsor this program
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DarkStatRow({ eyebrow, value }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest text-wheat opacity-80">{eyebrow}</p>
      <p className="font-serif text-3xl font-medium text-wheat md:text-4xl">{value}</p>
    </div>
  )
}

function DarkDivider() {
  return <div aria-hidden="true" className="my-5 h-px bg-wheat/15" />
}

const TIERS = [
  { label: 'Sponsor the Table — apps & a round for a group', amount: '$250' },
  { label: 'Host the Night — a full table, named recognition', amount: '$1,000' },
]

function FlagshipReimagined() {
  return (
    <section className="relative overflow-hidden bg-panel px-9 py-16 md:py-20">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-start gap-9 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="inline-block rounded-full bg-espresso/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-espresso">
              Community · Agile 2026
            </span>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-tight text-espresso md:text-5xl">
              Members' <em className="font-medium text-walnut">Night Out</em> in DC
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink md:text-lg">
              On Monday, July 27, during Agile 2026, we took Agile in Color members out to The
              Brass Tap, a Black-owned bar in DC, for our first Members' Night Out. Drinks, apps,
              and the kind of connection that carries people through a big conference.
            </p>
            <p className="mt-4 font-serif text-base italic leading-snug text-espresso md:text-xl">
              No one should navigate a room that big alone.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
              The venue was free, so donations go straight to the tab. We're still closing a
              $1,500 gap to cover the members who came, and whatever's left over seeds next
              year's gathering.
            </p>

            <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-walnut">
              Ways to give
            </p>
            <ul className="mt-3">
              {TIERS.map((t, i) => (
                <li
                  key={t.label}
                  className={`flex items-baseline justify-between py-2.5 text-sm ${
                    i === TIERS.length - 1 ? '' : 'border-b border-espresso/15'
                  }`}
                >
                  <span className="text-ink">{t.label}</span>
                  <span className="font-serif text-base font-medium text-espresso">
                    {t.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-lg border border-espresso/15 bg-bg p-6 md:p-7">
              <LightStatRow eyebrow="Funding goal" value="$1,500" />
              <LightDivider />
              <LightStatRow eyebrow="Date" value="Mon, July 27" />
              <LightDivider />
              <LightStatRow eyebrow="Time" value="5:30–7:30 PM" />
              <LightDivider />
              <LightStatRow eyebrow="Members covered" value="20" />
            </div>
            <div className="mt-4">
              <Link
                to="/sponsor"
                className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-medium text-cream-light no-underline transition-colors hover:bg-walnut-deep"
              >
                Help cover it
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <p className="mt-3 text-xs italic text-ink-soft">
              We hosted it. Your gift helps us cover the cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function LightStatRow({ eyebrow, value }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest text-walnut opacity-80">{eyebrow}</p>
      <p className="font-serif text-3xl font-medium text-espresso md:text-4xl">{value}</p>
    </div>
  )
}

function LightDivider() {
  return <div aria-hidden="true" className="my-5 h-px bg-espresso/15" />
}

const SUPPORTING_PROGRAMS = [
  {
    eyebrow: 'On-demand',
    title: 'Colourful Voices',
    body:
      'When speaking opportunities surface — a panel, a podcast, a conference invite — we activate. We connect members to the platform and provide practice runs to sharpen the message before they take the stage. The goal: make sure professionals of color show up where the field is having its biggest conversations.',
    fundingLabel: 'Funding',
    fundingAmount: '$12,000 / year',
    borderClass: 'border-l-caramel',
    accentClass: 'text-caramel-deep',
  },
  {
    eyebrow: 'Conversation series',
    title: 'Share Your Story',
    body:
      'An ongoing series of intimate conversations with leaders of color across agile, tech, and modern work. Members hear unfiltered career journeys, navigate real challenges together, and build relationships that move the field forward.',
    fundingLabel: 'Per session',
    fundingAmount: '$1,500',
    borderClass: 'border-l-honey',
    accentClass: 'text-[#b8843e]',
  },
  {
    eyebrow: 'Year-round',
    title: 'Conference Scholarship Fund',
    body:
      'Direct grants for members to attend industry conferences — Scrum Gathering, Agile, AfroTech, and emerging-tech events that would otherwise be out of reach.',
    fundingLabel: 'One scholarship',
    fundingAmount: '$1,000',
    borderClass: 'border-l-walnut',
    accentClass: 'text-walnut',
  },
  {
    eyebrow: 'Ongoing',
    title: 'Mentorship Matching',
    body:
      'Pairs members with senior agile leaders for structured one-on-one mentorship across career stages and disciplines.',
    fundingLabel: 'Cohort match',
    fundingAmount: '$2,500',
    borderClass: 'border-l-[#a06832]',
    accentClass: 'text-caramel-deep',
  },
]

function SupportingPrograms() {
  return (
    <section className="bg-bg px-9 py-14">
      <header className="mb-9 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">More programs</p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-ink">
          How your support compounds
        </h2>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        {SUPPORTING_PROGRAMS.map((p) => (
          <ProgramCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  )
}

function ProgramCard({
  eyebrow,
  title,
  body,
  fundingLabel,
  fundingAmount,
  borderClass,
  accentClass,
}) {
  return (
    <article className={`rounded-lg border-l-4 bg-surface p-7 ${borderClass}`}>
      <p className={`text-[11px] font-medium uppercase tracking-[0.2em] ${accentClass}`}>
        {eyebrow}
      </p>
      <h3 className="mt-2 font-serif text-xl font-medium leading-tight text-ink md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">{body}</p>
      <div aria-hidden="true" className="mt-4 mb-3 h-px bg-ink/10" />
      <div className="flex items-baseline justify-between">
        <span className={`text-xs font-medium uppercase tracking-widest ${accentClass}`}>
          {fundingLabel}
        </span>
        <span className="font-serif text-base font-medium text-ink">{fundingAmount}</span>
      </div>
    </article>
  )
}

function SponsorCTA() {
  return (
    <section className="relative overflow-hidden bg-espresso px-9 py-14 text-cream-light">
      <ColorStripe />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-wheat">Partner with us</p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-cream-light md:text-4xl">
          Fund a program. <em className="font-medium text-wheat">Shape the field.</em>
        </h2>
        <p className="mt-4 text-base leading-relaxed opacity-90 md:text-lg">
          Every program named here can be underwritten in full or in part. We design partnerships
          around your priorities — diversity in tech, leadership pipeline, AI workforce equity,
          scholarship access — and report transparently on impact.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/sponsor"
            className="inline-flex items-center gap-2 rounded-full bg-wheat px-7 py-4 text-sm font-medium text-espresso no-underline transition-colors hover:bg-honey"
          >
            Sponsor a program
            <ArrowUpRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-cream-light bg-transparent px-7 py-4 text-sm font-medium text-cream-light no-underline transition-colors hover:bg-cream-light hover:text-espresso"
          >
            Talk to our team
          </Link>
        </div>
      </div>
    </section>
  )
}
