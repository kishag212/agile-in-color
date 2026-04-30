import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { startCheckout } from '../lib/checkout'
import { STRIPE_PRICE_IDS } from '../lib/stripeProducts'

export default function Sponsor() {
  const [coverFee, setCoverFee] = useState(false)

  return (
    <>
      <Hero />
      <DonatePanel coverFee={coverFee} setCoverFee={setCoverFee} />
      <SponsorBenefits />
      <SponsorTiers coverFee={coverFee} />
      <ReimaginedSection coverFee={coverFee} />
      <OtherWaysToGive />
      <ImpactStrip />
      <ClosingNote />
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
    <section className="bg-gradient-to-b from-bg to-surface px-9 py-16 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">Support the mission</p>
        <h1 className="mt-3 font-serif text-5xl font-normal leading-none tracking-tight text-ink md:text-6xl">
          Fuel the <em className="font-medium text-walnut">next generation</em>.
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-[60px] rounded-full bg-honey"
        />
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          Your contribution underwrites scholarships, conference allyship, programming, and the
          community work that elevates professionals of color shaping the future of agile,
          innovation, and modern work.
        </p>
      </div>
    </section>
  )
}

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000]

function DonatePanel({ coverFee, setCoverFee }) {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const effectiveAmount = customAmount ? Number(customAmount) || 0 : selectedAmount
  const feeAmount = coverFee && effectiveAmount > 0
    ? (effectiveAmount * 0.03).toFixed(2)
    : null

  function pickAmount(amount) {
    setSelectedAmount(amount)
    setCustomAmount('')
  }
  function onCustomChange(value) {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const handleDonate = async () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount
    if (!amount || amount < 1) {
      alert('Please enter a valid donation amount')
      return
    }
    try {
      setIsLoading(true)
      await startCheckout({
        amountCents: Math.round(amount * 100),
        recurring: isRecurring,
        coverFee: coverFee,
      })
    } catch (err) {
      alert(`Checkout error: ${err.message}`)
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-bg px-9 py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-9 md:grid-cols-12">
        <div className="md:sticky md:top-5 md:col-span-5">
          <p className="text-xs uppercase tracking-[0.3em] text-walnut">One-time gift</p>
          <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-ink md:text-4xl">
            Donate <em className="font-medium text-walnut">today</em>.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
            Every dollar funds direct member support — scholarships to attend conferences,
            mentorship programs, and the community gatherings that build careers.
          </p>
          <p className="mt-5 rounded-md border-l-4 border-caramel bg-surface px-5 py-4 text-sm leading-relaxed text-ink-soft">
            <strong className="text-walnut">Tax-deductible.</strong> Agile in Color is a
            registered 501(c)(3) nonprofit. EIN provided on receipt.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="rounded-xl border border-walnut/15 bg-bg p-5 sm:p-6 md:p-8">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h3 className="font-serif text-xl font-medium text-ink">Choose an amount</h3>
              <span className="flex items-center gap-1.5 text-[11px] tracking-wider text-ink-soft">
                <Lock size={12} className="text-walnut" />
                Secured by Stripe
              </span>
            </div>

            <AmountPicker
              presets={PRESET_AMOUNTS}
              selected={selectedAmount}
              onPick={pickAmount}
            />

            <div className="mb-4">
              <label
                htmlFor="custom_amount"
                className="mb-1.5 block text-xs font-medium text-ink"
              >
                Or enter custom amount
              </label>
              <div className="flex min-h-[48px] items-center gap-2 rounded-md border border-walnut/20 bg-bg px-4 py-3 transition focus-within:border-walnut focus-within:ring-1 focus-within:ring-walnut">
                <span className="font-serif text-lg text-walnut">$</span>
                <input
                  id="custom_amount"
                  type="number"
                  min="1"
                  placeholder="Other amount"
                  value={customAmount}
                  onChange={(e) => onCustomChange(e.target.value)}
                  className="flex-1 border-none bg-transparent text-base text-ink outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="text-xs text-ink-soft opacity-70">USD</span>
              </div>
            </div>

            <RecurringToggle isRecurring={isRecurring} setIsRecurring={setIsRecurring} />

            <div
              className="mb-2 flex cursor-pointer items-center gap-3 rounded-md bg-surface px-4 py-3"
              onClick={() => setCoverFee(!coverFee)}
            >
              <div
                className={`relative h-5 w-9 flex-shrink-0 rounded-full transition-colors ${
                  coverFee ? 'bg-walnut' : 'bg-walnut/25'
                }`}
              >
                <div
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                    coverFee ? 'left-[18px]' : 'left-0.5'
                  }`}
                />
              </div>
              <label className="flex-1 cursor-pointer text-sm text-ink">
                Cover the 3% processing fee so 100% goes to programming
              </label>
            </div>
            {feeAmount && (
              <p className="mb-4 text-xs text-ink-soft">
                Adds about ${feeAmount} to your gift.
              </p>
            )}

            <button
              type="button"
              onClick={handleDonate}
              disabled={isLoading}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-walnut py-4 text-base font-medium text-bg transition-colors hover:bg-walnut-deep disabled:opacity-60"
            >
              {isLoading
                ? 'Redirecting...'
                : isRecurring
                  ? 'Continue to monthly gift'
                  : 'Continue to payment'}
              <ArrowRight size={16} />
            </button>
            <p className="mt-3.5 text-center text-[11px] text-ink-soft opacity-70">
              Cards · Apple Pay · Google Pay · Bank transfer
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AmountPicker({ presets, selected, onPick }) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {presets.map((amount) => {
        const isSelected = selected === amount
        return (
          <button
            key={amount}
            type="button"
            onClick={() => onPick(amount)}
            className={`flex min-h-[64px] cursor-pointer items-center justify-center rounded-xl border-2 px-3 py-4 text-center font-serif text-xl font-medium transition-all sm:text-2xl ${
              isSelected
                ? 'border-walnut bg-walnut text-bg'
                : 'border-walnut/20 bg-bg text-ink hover:border-walnut'
            }`}
          >
            ${amount}
          </button>
        )
      })}
    </div>
  )
}

function RecurringToggle({ isRecurring, setIsRecurring }) {
  return (
    <label className="mb-5 flex cursor-pointer items-center gap-3 rounded-md bg-surface px-4 py-3">
      <input
        type="checkbox"
        className="sr-only"
        checked={isRecurring}
        onChange={(e) => setIsRecurring(e.target.checked)}
      />
      <span
        aria-hidden="true"
        className={`relative inline-block h-5 w-9 flex-shrink-0 rounded-full transition-colors ${
          isRecurring ? 'bg-walnut' : 'bg-walnut/25'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
            isRecurring ? 'left-[18px]' : 'left-0.5'
          }`}
        />
      </span>
      <span className="text-sm text-ink">Make this a monthly recurring gift</span>
    </label>
  )
}

const ANNUAL_TIER_HEADERS = [
  { name: 'Bronze', amount: '$2,500/yr' },
  { name: 'Silver', amount: '$5,000/yr' },
  { name: 'Gold', amount: '$15,000/yr' },
]

const ANNUAL_BENEFITS = [
  {
    benefit: 'Logo on Agile in Color Sponsors page',
    bronze: '✓',
    silver: '✓',
    gold: '✓ Featured',
  },
  {
    benefit: 'Recognition across community channels (forum, social, future newsletter)',
    bronze: '✓',
    silver: '✓',
    gold: '✓ Named',
  },
  {
    benefit: 'Recognition at virtual community events',
    bronze: '✓',
    silver: '✓',
    gold: '✓',
  },
  {
    benefit: 'Annual Impact Report — sponsor recognition (beginning 2027)',
    bronze: '✓',
    silver: '✓',
    gold: '✓ Full-page feature',
  },
  {
    benefit: 'Annual Aggregated Insights Report (beginning 2027)',
    bronze: '—',
    silver: '✓',
    gold: '✓',
  },
  {
    benefit: 'Quarterly Community Trends Brief (beginning Q1 2027)',
    bronze: '—',
    silver: '✓',
    gold: '✓',
  },
  {
    benefit: 'Co-branded content opportunity (1 per year)',
    bronze: '—',
    silver: '—',
    gold: '✓',
  },
  {
    benefit: 'Speaking slot consideration at one community event',
    bronze: '—',
    silver: '—',
    gold: '✓',
  },
  {
    benefit: 'Custom recognition / partnership announcement',
    bronze: '—',
    silver: '—',
    gold: '✓',
  },
]

const REIMAGINED_RECOGNITION = [
  {
    title: 'Founding Partner',
    amount: '$26,692',
    benefits:
      "Top billing on all event materials and signage; named in opening remarks; full event recognition; logo on event site; post-event aggregated insights report",
  },
  {
    title: 'Lunch Sponsor',
    amount: '$8,400',
    benefits:
      'Branded recognition at lunch service; signage during meal; named in program; logo on event website',
  },
  {
    title: 'Beverage & Break Sponsor',
    amount: '$4,200',
    benefits:
      'Branded recognition at coffee/refreshment service; signage; named in program',
  },
  {
    title: 'Facilitator Travel Sponsor',
    amount: '$1,263',
    benefits: 'Recognition for funding facilitator travel; named in program',
  },
  {
    title: 'AI Readiness Cohort Fellow',
    amount: '$1,500',
    benefits: 'Funds one cohort fellow; named in cohort materials and post-cohort report',
  },
]

function SponsorBenefits() {
  return (
    <section className="bg-surface px-9 py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-walnut">Sponsor recognition</p>
          <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-ink md:text-5xl">
            What sponsors <em className="font-medium text-walnut">receive</em>.
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-3 block h-[3px] w-[60px] rounded-full bg-honey"
          />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Sponsorship enables Agile in Color to fund mission-aligned programming. In return,
            sponsors receive recognition that aligns with our values and protects our community's
            trust.
          </p>
        </header>

        <AnnualBenefitsTable />

        <ReimaginedRecognitionList />

        <SponsorshipFinePrint />
      </div>
    </section>
  )
}

function AnnualBenefitsTable() {
  return (
    <div className="mt-4">
      <div className="hidden overflow-hidden rounded-xl border border-walnut/15 bg-bg md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-walnut/15 bg-bg">
              <th className="w-[40%] px-6 py-5 text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
                Annual benefit
              </th>
              {ANNUAL_TIER_HEADERS.map((tier) => (
                <th
                  key={tier.name}
                  className="px-6 py-5 text-center align-bottom"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-walnut">
                    {tier.name}
                  </p>
                  <p className="mt-1 font-serif text-lg font-medium text-ink">
                    {tier.amount}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ANNUAL_BENEFITS.map((row, idx) => (
              <tr
                key={row.benefit}
                className={`border-b border-walnut/10 last:border-b-0 ${
                  idx % 2 === 1 ? 'bg-surface/40' : ''
                }`}
              >
                <td className="px-6 py-4 text-sm leading-relaxed text-ink-soft">
                  {row.benefit}
                </td>
                <td className="px-6 py-4 text-center text-sm text-ink">
                  <BenefitMark value={row.bronze} />
                </td>
                <td className="px-6 py-4 text-center text-sm text-ink">
                  <BenefitMark value={row.silver} />
                </td>
                <td className="px-6 py-4 text-center text-sm text-ink">
                  <BenefitMark value={row.gold} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-5 md:hidden">
        {ANNUAL_TIER_HEADERS.map((tier) => {
          const key = tier.name.toLowerCase()
          return (
            <article
              key={tier.name}
              className="rounded-xl border border-walnut/15 bg-bg p-6"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-walnut">
                {tier.name}
              </p>
              <p className="mt-1 font-serif text-2xl font-medium text-ink">
                {tier.amount}
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
                {ANNUAL_BENEFITS.map((row) => (
                  <li
                    key={row.benefit}
                    className="flex items-start gap-3 border-b border-walnut/10 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="min-w-[16px] pt-0.5 text-ink">
                      <BenefitMark value={row[key]} />
                    </span>
                    <span className="flex-1">{row.benefit}</span>
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function BenefitMark({ value }) {
  if (value === '—') {
    return <span className="text-ink-soft opacity-50">—</span>
  }
  if (value === '✓') {
    return <span className="text-walnut">✓</span>
  }
  return (
    <span className="inline-flex items-center justify-center text-xs font-medium text-walnut">
      {value}
    </span>
  )
}

function ReimaginedRecognitionList() {
  return (
    <div className="mt-14">
      <header className="mb-7 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-caramel-deep">
          Event sponsorships
        </p>
        <h3 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight text-ink md:text-3xl">
          Reimagined Agility — <em className="font-medium text-walnut">recognition by tier</em>.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
          Reimagined Agility is our flagship annual gathering. Event sponsorships are one-time
          gifts supporting conference programming, hospitality, and member access.
        </p>
      </header>

      <ul className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-walnut/15 bg-bg">
        {REIMAGINED_RECOGNITION.map((tier) => (
          <li
            key={tier.title}
            className="flex flex-col gap-3 border-b border-walnut/10 px-6 py-5 last:border-b-0 md:flex-row md:items-start md:gap-6"
          >
            <div className="md:w-[34%] md:flex-shrink-0">
              <p className="font-serif text-lg font-medium text-ink md:text-xl">
                {tier.title}
              </p>
              <p className="mt-1 font-serif text-base font-medium text-walnut">
                {tier.amount}
              </p>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-ink-soft">
              {tier.benefits}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SponsorshipFinePrint() {
  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-4 border-t border-walnut/15 pt-8 text-xs leading-relaxed text-ink-soft md:text-sm">
      <p>
        <strong className="text-walnut">A note on member privacy.</strong> Agile in Color does
        not share member contact information, individual data, or directory access with
        sponsors. All insights and trends reports are aggregated, anonymized, and themes-based —
        never individual data. Our community's trust comes first.
      </p>
      <p>
        <strong className="text-walnut">About reporting deliverables.</strong> Annual Impact
        Reports, Aggregated Insights Reports, and Quarterly Community Trends Briefs begin in
        2027 as we formalize our reporting infrastructure. 2026 sponsorships receive logo
        placement, community channel recognition, and event recognition immediately, with
        reporting benefits beginning in the 2027 reporting cycle.
      </p>
      <p>
        <strong className="text-walnut">Qualified sponsorship recognition.</strong> Per IRS
        guidance for 501(c)(3) organizations, sponsorship recognition consists of acknowledgment
        of the sponsor's name, logo, and value-neutral descriptive information. Agile in Color
        does not provide endorsements, comparative claims, or product advertising in exchange
        for sponsorship.
      </p>
    </div>
  )
}

const SPONSOR_TIERS = [
  {
    name: 'Bronze',
    key: 'bronze',
    tierName: 'Bronze Annual Sponsorship',
    amount: '$2,500',
    cadence: 'per year',
    items: [
      'Logo on website',
      'Newsletter recognition',
      'Social media shoutout',
      'Annual report listing',
    ],
    cardClass: 'border-t-4 border-walnut bg-bg',
    eyebrowClass: 'text-walnut',
    amountClass: 'text-ink',
    cadenceClass: 'text-ink-soft opacity-75',
    itemClass: 'text-ink-soft',
    buttonClass:
      'border-2 border-walnut bg-bg text-walnut hover:bg-walnut hover:text-bg',
    featured: false,
  },
  {
    name: 'Silver',
    key: 'silver',
    tierName: 'Silver Annual Sponsorship',
    amount: '$5,000',
    cadence: 'per year',
    items: [
      'Everything in Bronze',
      'Featured event sponsorship',
      'Speaker series spotlight',
      'Quarterly community newsletter',
      '2 conference scholarships funded',
    ],
    cardClass: 'border-2 border-caramel bg-bg shadow-lg shadow-caramel/20',
    eyebrowClass: 'text-caramel-deep',
    amountClass: 'text-ink',
    cadenceClass: 'text-ink-soft opacity-75',
    itemClass: 'text-ink-soft',
    buttonClass: 'bg-caramel text-bg hover:bg-caramel-deep',
    featured: true,
  },
  {
    name: 'Gold',
    key: 'gold',
    tierName: 'Gold Annual Sponsorship',
    amount: '$15,000',
    cadence: 'per year',
    items: [
      'Everything in Silver',
      'Logo on conference materials',
      'Co-branded webinar or panel',
      'Custom partnership programming',
      '5 conference scholarships funded',
      'Annual leadership council seat',
    ],
    cardClass: 'border-t-4 border-wheat bg-espresso text-cream-light',
    eyebrowClass: 'text-wheat',
    amountClass: 'text-cream-light',
    cadenceClass: 'text-cream-light opacity-70',
    itemClass: 'text-cream-light opacity-90',
    buttonClass: 'bg-wheat text-espresso hover:bg-cream-light',
    featured: false,
  },
]

function SponsorTiers({ coverFee }) {
  const handleSponsorTier = async (tierKey, tierName) => {
    try {
      await startCheckout({
        priceId: STRIPE_PRICE_IDS[tierKey],
        tierName,
        mode: 'subscription',
        coverFee: coverFee,
      })
    } catch (err) {
      alert(`Checkout error: ${err.message}`)
    }
  }

  return (
    <section className="bg-surface px-9 py-14 md:py-16">
      <header className="mb-9 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-caramel-deep">For organizations</p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-ink md:text-5xl">
          Become a <em className="font-medium text-walnut">sponsor</em>.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
          Annual partnerships that invest in our community while giving your organization
          meaningful visibility with the practitioners shaping the future of agile.
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 md:grid-cols-3">
        {SPONSOR_TIERS.map((tier) => (
          <SponsorTierCard
            key={tier.name}
            tier={tier}
            onSelect={() => handleSponsorTier(tier.key, tier.tierName)}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-ink-soft">
          Looking for a custom partnership? Let's design one together.
        </p>
        <Link
          to="/contact"
          className="mt-3 inline-block border-b border-walnut pb-0.5 text-sm font-medium text-walnut no-underline hover:text-walnut-deep"
        >
          Contact our partnerships team →
        </Link>
      </div>
    </section>
  )
}

function SponsorTierCard({ tier, onSelect }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-xl p-7 ${tier.cardClass} ${
        tier.featured ? '-translate-y-1.5' : ''
      }`}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-caramel px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-bg">
          Most Popular
        </span>
      )}
      <p
        className={`text-[11px] font-medium uppercase tracking-[0.25em] ${tier.eyebrowClass}`}
      >
        {tier.name}
      </p>
      <p
        className={`mt-2 font-serif text-3xl font-medium leading-none md:text-4xl ${tier.amountClass}`}
      >
        {tier.amount}
      </p>
      <p className={`mt-1 text-xs ${tier.cadenceClass}`}>{tier.cadence}</p>
      <ul className={`mt-5 space-y-1 text-sm leading-relaxed ${tier.itemClass}`}>
        {tier.items.map((item) => (
          <li key={item}>· {item}</li>
        ))}
      </ul>
      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={onSelect}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${tier.buttonClass}`}
        >
          Choose {tier.name}
        </button>
      </div>
    </article>
  )
}

const REIMAGINED_TIERS = [
  {
    title: 'Founding Partner',
    key: 'founding_partner',
    tierName: 'Reimagined Agility — Founding Partner',
    description:
      'Underwrite the entire event. Co-branded recognition on all materials. Closing remarks slot.',
    amount: '$26,692',
  },
  {
    title: 'Lunch Sponsor',
    key: 'lunch_sponsor',
    tierName: 'Reimagined Agility — Lunch Sponsor',
    description:
      'Catering for 120 — keeps participants fueled and connected during the longest stretch of the day.',
    amount: '$8,400',
  },
  {
    title: 'Beverage & Break Sponsor',
    key: 'beverage_break',
    tierName: 'Reimagined Agility — Beverage & Break Sponsor',
    description:
      'All-day coffee, tea, and the afternoon break that powers the back-half of the day.',
    amount: '$4,200',
  },
  {
    title: 'Facilitator Travel Sponsor',
    key: 'facilitator_travel',
    tierName: 'Reimagined Agility — Facilitator Travel Sponsor',
    description:
      "Cover one of our nine core facilitators' travel to the event. Choose your facilitator on confirmation.",
    amount: '$1,263',
  },
  {
    title: 'AI Readiness Cohort Fellow',
    key: 'ai_readiness_fellow',
    tierName: 'AI Readiness Cohort Fellow',
    description:
      "Sponsor one fellow's full participation in our flagship six-month cohort program.",
    amount: '$1,500',
  },
]

function ReimaginedSection({ coverFee }) {
  const handleReimaginedTier = async (tierKey, tierName) => {
    try {
      await startCheckout({
        priceId: STRIPE_PRICE_IDS[tierKey],
        tierName,
        mode: 'payment',
        coverFee: coverFee,
      })
    } catch (err) {
      alert(`Checkout error: ${err.message}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-espresso to-[#1f1209] px-9 py-16 text-cream-light md:py-20">
      <ColorStripe />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-100px] top-12 h-96 w-96 rounded-full bg-walnut opacity-25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-9">
          <span className="inline-block rounded-full bg-wheat/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-wheat">
            Flagship · Agile 2026
          </span>
          <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-tight text-cream-light md:text-5xl">
            Sponsor <em className="font-medium text-wheat">Reimagined Agility</em>.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-90 md:text-lg">
            An Open Space at Agile 2026 (July 26–28, National Harbor, MD) — our flagship 2026
            event. We need to raise $26,692 to fund facilitator travel, hotel catering for 120,
            and event programming. Pick a piece. Make it happen.
          </p>
        </div>

        <ul className="mx-auto max-w-3xl">
          {REIMAGINED_TIERS.map((tier) => (
            <ReimaginedTierRow
              key={tier.title}
              tier={tier}
              onSelect={() => handleReimaginedTier(tier.key, tier.tierName)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

function ReimaginedTierRow({ tier, onSelect }) {
  return (
    <li className="flex items-stretch gap-4 border-b border-wheat/15 py-4 last:border-b-0">
      <div className="flex-1">
        <p className="font-serif text-lg font-medium text-cream-light md:text-xl">
          {tier.title}
        </p>
        <p className="mt-1 text-sm leading-snug opacity-80">{tier.description}</p>
      </div>
      <p className="min-w-[110px] self-center text-right font-serif text-xl font-medium text-wheat md:text-2xl">
        {tier.amount}
      </p>
      <div className="self-center">
        <button
          type="button"
          onClick={onSelect}
          className="rounded-full bg-wheat px-5 py-2 text-xs font-medium text-espresso transition-colors hover:bg-cream-light"
        >
          Sponsor
        </button>
      </div>
    </li>
  )
}

function OtherWaysToGive() {
  const treasurerEmail = 'treasurer@agileincolor.org'
  const mailto = `mailto:${treasurerEmail}`

  return (
    <section className="bg-bg px-9 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-walnut">Other ways to give</p>
          <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-ink md:text-4xl">
            Prefer not to use a <em className="font-medium text-walnut">credit card</em>?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            We accept Zelle and mailed checks. Contributions are tax-deductible to the fullest
            extent allowed by law. Agile in Color is a 501(c)(3) nonprofit organization.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-walnut/15 bg-surface p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-medium text-ink">Donate via Zelle</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
              Send your gift directly to our account using the Zelle app at your bank.
            </p>

            <dl className="my-4 rounded-lg bg-bg p-4 text-sm">
              <dt className="text-xs uppercase tracking-wide text-ink-soft">Send to:</dt>
              <dd className="mt-1 font-mono text-ink">
                <a
                  href={mailto}
                  aria-label="Email Agile in Color treasurer"
                  className="text-walnut underline hover:text-walnut-deep"
                >
                  {treasurerEmail}
                </a>
              </dd>
              <dt className="mt-3 text-xs uppercase tracking-wide text-ink-soft">
                Recipient name:
              </dt>
              <dd className="mt-1 font-medium text-ink">Agile in Color</dd>
            </dl>

            <figure className="my-5 flex flex-col items-center">
              <img
                src="/images/zelle-qr.jpg"
                alt="Agile in Color Zelle QR code"
                className="w-full max-w-[200px] rounded-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <figcaption className="mt-2 text-xs text-ink-soft">
                Scan with your bank's Zelle feature
              </figcaption>
            </figure>

            <p className="mt-4 text-xs leading-relaxed text-ink-soft">
              After sending, please email{' '}
              <a
                href={mailto}
                aria-label="Email Agile in Color treasurer about your Zelle gift"
                className="text-walnut underline hover:text-walnut-deep"
              >
                {treasurerEmail}
              </a>{' '}
              with your name, donation amount, and mailing address so we can send you a tax
              receipt.
            </p>
          </article>

          <article className="rounded-2xl border border-walnut/15 bg-surface p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-medium text-ink">Donate by Mail</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
              We gratefully accept donations by check. Please make checks payable to Agile in
              Color.
            </p>

            <dl className="my-4 rounded-lg bg-bg p-4 text-sm">
              <dt className="text-xs uppercase tracking-wide text-ink-soft">
                Make checks payable to:
              </dt>
              <dd className="mt-1 font-medium text-ink">Agile in Color</dd>
            </dl>

            <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
              For our current mailing address, please email{' '}
              <a
                href={mailto}
                aria-label="Email Agile in Color treasurer for mailing address"
                className="text-walnut underline hover:text-walnut-deep"
              >
                {treasurerEmail}
              </a>{' '}
              and we will respond promptly with check delivery instructions.
            </p>

            <p className="mt-4 text-xs leading-relaxed text-ink-soft">
              Please include your name, mailing address, and a note with your check so we can
              send you a tax receipt.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

const IMPACT_STATS = [
  { amount: '$250', body: 'Funds one Share Your Story conversation session' },
  { amount: '$1,500', body: 'Sponsors one fellow in the AI Readiness Cohort' },
  { amount: '$5,000', body: 'Funds a year of mentorship matching for one cohort' },
]

function ImpactStrip() {
  return (
    <section className="bg-bg px-9 py-14 text-center">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">Your impact</p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-ink md:text-4xl">
          Your gift prepares our community to lead through the AI shift —{' '}
          <em className="font-medium text-walnut">and whatever comes after it</em>.
        </h2>
        <div className="mt-9 grid grid-cols-1 items-start gap-7 md:grid-cols-3">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.amount}>
              <p className="font-serif text-4xl font-medium leading-none text-walnut md:text-5xl">
                {stat.amount}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft md:text-base">
                {stat.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingNote() {
  return (
    <section className="bg-panel px-9 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-serif text-xl font-normal italic leading-relaxed text-cream-light md:text-2xl">
          Every dollar maps to direct community support. We report transparently on impact —
          quarterly to sponsors, annually to all donors.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-cream-light px-7 py-4 text-sm font-medium text-espresso no-underline transition-colors hover:bg-wheat"
          >
            Contact our team
            <ArrowUpRight size={16} />
          </Link>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 rounded-full border-2 border-cream-light bg-transparent px-7 py-4 text-sm font-medium text-cream-light no-underline transition-colors hover:bg-cream-light hover:text-espresso"
          >
            Read about our programs
          </Link>
        </div>
      </div>
    </section>
  )
}
