import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'

export default function Manifesto() {
  return (
    <>
      <Hero />
      <PullQuote />
      <Tenets />
      <EthicalAI />
      <SignOff />
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
    <section className="relative overflow-hidden bg-gradient-to-b from-espresso to-[#2a1a0d] px-9 py-20 text-cream-light md:py-24">
      <ColorStripe />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-100px] top-16 h-80 w-80 rounded-full bg-walnut opacity-25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-wheat">Our manifesto</p>
        <h1 className="mt-4 font-serif text-5xl font-normal leading-none tracking-tight text-cream-light md:text-6xl">
          A new manifesto for{' '}
          <em className="font-medium text-wheat">a new era</em>.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed opacity-90 md:text-lg">
          Twenty-five years ago, seventeen people gathered in a ski lodge in Utah and wrote the
          Agile Manifesto. They were brilliant, frustrated with how software was being built, and
          determined to change it. They did.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed opacity-80 md:text-lg">
          But they were not thinking about models that make decisions at scale in milliseconds.
          We are.
        </p>
      </div>
    </section>
  )
}

function PullQuote() {
  return (
    <section className="bg-panel px-9 py-12">
      <div className="mx-auto max-w-3xl">
        <figure className="rounded-lg border-l-4 border-walnut bg-bg p-9 shadow-md md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-walnut">Where we stand</p>
          <blockquote className="mt-3 font-serif text-xl font-normal italic leading-snug text-ink md:text-2xl">
            “The original Manifesto said we value individuals and interactions over processes and
            tools. I still believe that. But in an AI-driven world I would add — we value the
            individuals our systems affect, not just the individuals building them. Because those
            are not always the same people.”
          </blockquote>
        </figure>
      </div>
    </section>
  )
}

const TENETS = [
  {
    n: '01',
    color: 'text-walnut',
    title: 'Outcomes over output.',
    body: (
      <>
        Not just working software. Software that works for the people it was built to serve.{' '}
        <strong>All of them.</strong>
      </>
    ),
  },
  {
    n: '02',
    color: 'text-caramel-deep',
    title: 'Transparency over confidence.',
    body:
      'If we cannot explain how a decision was made, we are not done. A model that cannot be interrogated is not an asset. It is a liability.',
  },
  {
    n: '03',
    color: 'text-honey-deep',
    title: 'Representation over assumption.',
    body:
      'Whose data, whose experience, whose perspective shapes what we build determines who that system serves — and who it harms.',
  },
  {
    n: '04',
    color: 'text-walnut',
    title: 'Responsibility over velocity.',
    body: (
      <>
        Speed is not the goal. Speed in service of the right outcome is the goal. If we are
        moving fast in the wrong direction, we are not being agile.{' '}
        <strong>We are being reckless.</strong>
      </>
    ),
  },
  {
    n: '05',
    color: 'text-caramel-deep',
    title: 'Equity is not a feature. It is a foundation.',
    body:
      'You do not add it at the end. You build it in from the start — into your Definition of Done, into your sprint review, into the question you ask before a single line of code gets written.',
  },
]

function Tenets() {
  return (
    <section className="bg-bg px-9 py-16 md:py-20">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">
          If we were writing the next one
        </p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-ink md:text-4xl">
          Here is what we would{' '}
          <em className="font-medium text-walnut">want it to say</em>.
        </h2>
      </header>

      <div className="mx-auto max-w-3xl">
        {TENETS.map((t, i) => (
          <Tenet key={t.n} tenet={t} isLast={i === TENETS.length - 1} />
        ))}
      </div>
    </section>
  )
}

function Tenet({ tenet, isLast }) {
  return (
    <article
      className={`grid grid-cols-1 items-start gap-6 border-t border-walnut/20 py-8 sm:grid-cols-[auto_1fr] ${
        isLast ? 'border-b' : ''
      }`}
    >
      <span
        className={`min-w-[60px] font-serif text-4xl font-normal italic leading-none md:text-5xl ${tenet.color}`}
      >
        {tenet.n}
      </span>
      <div>
        <h3 className={`mb-2 font-serif text-xl font-medium leading-snug md:text-2xl ${tenet.color}`}>
          {tenet.title}
        </h3>
        <p className="text-base leading-relaxed text-ink">{tenet.body}</p>
      </div>
    </article>
  )
}

const COMMITMENTS = [
  {
    title: 'We invest in practitioners who can interrogate, not just deploy.',
    body:
      'Our AI Readiness Cohort trains members to ask hard questions about the systems they help build — model behavior, training data, who benefits, who is harmed.',
  },
  {
    title: 'We center the people systems affect, not just the people who build them.',
    body:
      'Our programming asks who is missing from the room before it asks what feature ships next. Equity is a lens we apply to every conversation about emerging technology.',
  },
  {
    title: 'We use AI ourselves with the same scrutiny we ask of others.',
    body:
      'When we use AI tools internally — for writing, research, or operations — we disclose it, review for bias, and prioritize human judgment over machine output for anything that affects our community.',
  },
  {
    title: "We protect our members' data and stories.",
    body:
      'No member information, written content, or community discussion is used to train external AI models. Period.',
  },
]

function EthicalAI() {
  return (
    <section className="relative overflow-hidden bg-espresso px-9 py-16 text-cream-light md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-80px] top-16 h-72 w-72 rounded-full bg-caramel opacity-[0.18] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <header className="mb-9 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-wheat">In practice</p>
          <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-cream-light md:text-4xl">
            Our commitment to{' '}
            <em className="font-medium text-wheat">ethical AI</em>.
          </h2>
          <p className="mt-4 text-base leading-relaxed opacity-90 md:text-lg">
            These principles are not a statement. They are a working contract. Here is how we
            live them inside Agile in Color.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {COMMITMENTS.map((c) => (
            <EthicalAICard key={c.title} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EthicalAICard({ title, body }) {
  return (
    <article className="rounded-lg border border-wheat/20 bg-cream-light/[0.06] p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-wheat text-espresso">
          <Check size={16} aria-hidden="true" />
        </span>
        <div>
          <h4 className="mb-1 font-serif text-lg font-medium text-wheat">{title}</h4>
          <p className="text-sm leading-relaxed opacity-90 md:text-base">{body}</p>
        </div>
      </div>
    </article>
  )
}

function SignOff() {
  return (
    <section className="bg-bg px-9 py-16 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="mb-7 font-serif text-xl font-normal italic leading-relaxed text-ink md:text-2xl">
          If you build, lead, or fund the systems shaping the future of work — these are the
          principles we are asking you to build with us.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 rounded-full bg-walnut px-7 py-4 text-sm font-medium text-bg no-underline transition-colors hover:bg-walnut-deep"
          >
            Read our programs
            <ArrowUpRight size={16} />
          </Link>
          <Link
            to="/sponsor"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-transparent px-7 py-4 text-sm font-medium text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
          >
            Become a partner
          </Link>
        </div>
      </div>
    </section>
  )
}
