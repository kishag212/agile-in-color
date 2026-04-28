import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

const INITIAL_STATE = {
  email: '',
  full_name: '',
  preferred_name: '',
  location: '',
  linkedin_url: '',
  engagement_type: '',
  community_drew: '',
  community_hoping: '',
  community_practicing: '',
  committee_interests: [],
  committee_experience: '',
  committee_hours: '',
  partner_org_name: '',
  partner_role: '',
  partner_types: [],
  partner_details: '',
  partner_budget: '',
}

const ENGAGEMENT_OPTIONS = [
  {
    value: 'community',
    title: 'Community Member',
    description:
      'Join our community to learn, network, attend events, and stay connected with fellow professionals of color in agile.',
  },
  {
    value: 'committee',
    title: 'Committee Volunteer',
    description:
      'Roll up your sleeves on a working committee. Active service for 6+ months opens the path to Core Team.',
  },
  {
    value: 'partner',
    title: 'Organizational Partner',
    description:
      'Sponsor programs, hire from our community, or build a long-term partnership with Agile in Color.',
  },
]

const COMMITTEE_OPTIONS = [
  'Programs & Events',
  'Marketing & Communications',
  'Membership & Community',
  'Sponsorship & Partnerships',
  'Operations & Governance',
]

const PARTNER_TYPE_OPTIONS = [
  'Program sponsorship',
  'Event sponsorship',
  'Conference allyship / scholarship funding',
  'Hiring from our community',
  'Long-term strategic partnership',
  'Other (describe below)',
]

const PRACTICING_OPTIONS = [
  'Yes, currently',
  'Sometimes / part of my role',
  'Not currently',
  'Looking to break in',
]

const HOURS_OPTIONS = ['1-3 hours', '4-6 hours', '7-10 hours', '10+ hours']

const BUDGET_OPTIONS = [
  'Prefer not to say',
  'Under $2,500',
  '$2,500–$5,000',
  '$5,000–$10,000',
  '$10,000–$25,000',
  '$25,000+',
]

const SUCCESS_MESSAGES = {
  community:
    'We received your information. Look for an email from us within a few days with next steps to join the community.',
  committee:
    'We received your information. A core team member will reach out within the next two weeks to discuss committee placement.',
  partner:
    'We received your information. Our partnerships team will reach out within one week to set up a conversation about working together.',
}

const BRANCH_ACCENT = {
  community: { borderClass: 'border-walnut', textClass: 'text-walnut', label: 'Community Member' },
  committee: { borderClass: 'border-caramel', textClass: 'text-caramel-deep', label: 'Committee Volunteer' },
  partner: { borderClass: 'border-[#b8843e]', textClass: 'text-[#b8843e]', label: 'Organizational Partner' },
}

const inputClass =
  'w-full rounded-md border border-walnut/20 bg-bg px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors focus:border-walnut focus:outline-none focus:ring-1 focus:ring-walnut'

export default function Membership() {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [submission, setSubmission] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const setField = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }))

  const toggleArrayField = (name, value) =>
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((v) => v !== value)
        : [...prev[name], value],
    }))

  const coreValid = Boolean(
    formData.email.trim() &&
      formData.full_name.trim() &&
      formData.preferred_name.trim() &&
      formData.location.trim() &&
      formData.engagement_type
  )

  let branchValid = false
  if (formData.engagement_type === 'community') {
    branchValid = true
  } else if (formData.engagement_type === 'committee') {
    branchValid = Boolean(formData.committee_experience.trim())
  } else if (formData.engagement_type === 'partner') {
    branchValid = Boolean(
      formData.partner_org_name.trim() &&
        formData.partner_role.trim() &&
        formData.partner_details.trim()
    )
  }

  const isFormValid = coreValid && branchValid

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isFormValid || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    let branch_data = {}
    if (formData.engagement_type === 'community') {
      branch_data = {
        motivation: formData.community_drew,
        goals: formData.community_hoping,
        role_status: formData.community_practicing,
      }
    } else if (formData.engagement_type === 'committee') {
      branch_data = {
        interests: formData.committee_interests,
        experience: formData.committee_experience,
        hours: formData.committee_hours,
      }
    } else if (formData.engagement_type === 'partner') {
      branch_data = {
        org_name: formData.partner_org_name,
        role: formData.partner_role,
        types: formData.partner_types,
        description: formData.partner_details,
        budget: formData.partner_budget,
      }
    }

    try {
      if (!supabase) {
        throw new Error('Database not connected. Please contact us directly.')
      }
      const { error: insertError } = await supabase
        .from('engagement_submissions')
        .insert({
          email: formData.email,
          full_name: formData.full_name,
          preferred_name: formData.preferred_name,
          location: formData.location,
          linkedin_url: formData.linkedin_url || null,
          engagement_type: formData.engagement_type,
          branch_data,
        })
      if (insertError) {
        throw new Error(insertError.message || 'Something went wrong. Please try again.')
      }
      setSubmission({
        preferred_name: formData.preferred_name,
        engagement_type: formData.engagement_type,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function reset() {
    setFormData(INITIAL_STATE)
    setSubmission(null)
    setError(null)
  }

  return (
    <>
      <Hero />
      <section className="bg-surface px-9 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          {submission ? (
            <SuccessMessage submission={submission} reset={reset} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <CoreFields formData={formData} setField={setField} />
              <Divider />
              <EngagementSelector value={formData.engagement_type} setField={setField} />
              {formData.engagement_type && (
                <BranchSection type={formData.engagement_type}>
                  {formData.engagement_type === 'community' && (
                    <CommunityFields formData={formData} setField={setField} />
                  )}
                  {formData.engagement_type === 'committee' && (
                    <CommitteeFields
                      formData={formData}
                      setField={setField}
                      toggleArrayField={toggleArrayField}
                    />
                  )}
                  {formData.engagement_type === 'partner' && (
                    <PartnerFields
                      formData={formData}
                      setField={setField}
                      toggleArrayField={toggleArrayField}
                    />
                  )}
                </BranchSection>
              )}
              {error && (
                <p
                  role="alert"
                  className="rounded-md border border-walnut/30 bg-walnut/5 px-4 py-3 text-sm text-walnut"
                >
                  {error}
                </p>
              )}
              <SubmitButton disabled={!isFormValid} isSubmitting={isSubmitting} />
            </form>
          )}
        </div>
      </section>
      <FooterNote />
    </>
  )
}

function Hero() {
  return (
    <section className="bg-bg px-9 py-14 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">Get involved</p>
        <h1 className="mt-3 font-serif text-5xl font-normal leading-none tracking-tight text-ink md:text-6xl">
          Engagement <em className="font-medium text-walnut">form</em>.
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-[60px] rounded-full bg-honey"
        />
        <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
          Thank you for your interest in Agile in Color. We are a global community committed to
          advancing professionals of color in agile, innovation, and modern work — and we are
          glad you're here.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
          Tell us how you'd like to engage. Based on your selection below, you'll see follow-up
          questions for general membership, committee involvement, or organizational
          partnerships.
        </p>
        <p className="mx-auto mt-4 max-w-xl rounded-md border-l-2 border-walnut bg-surface px-5 py-3 text-left text-sm italic text-ink-soft">
          Strategic leadership (Core Team) positions are elected roles. Active service on a
          committee for at least six months is required to be eligible for Core Team
          consideration.
        </p>
      </div>
    </section>
  )
}

function FormField({ label, htmlFor, required, helpText, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-walnut">*</span>}
      </label>
      {children}
      {helpText && <span className="mt-1 block text-xs text-ink-soft">{helpText}</span>}
    </div>
  )
}

function CoreFields({ formData, setField }) {
  return (
    <div className="space-y-6">
      <FormField label="Email" htmlFor="email" required>
        <input
          id="email"
          type="email"
          required
          aria-required="true"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setField('email', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <FormField label="Full Name" htmlFor="full_name" required>
        <input
          id="full_name"
          type="text"
          required
          aria-required="true"
          placeholder="First Last"
          value={formData.full_name}
          onChange={(e) => setField('full_name', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <FormField
        label="Preferred Name"
        htmlFor="preferred_name"
        required
        helpText="What you'd like us to call you"
      >
        <input
          id="preferred_name"
          type="text"
          required
          aria-required="true"
          placeholder="What we should call you"
          value={formData.preferred_name}
          onChange={(e) => setField('preferred_name', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <FormField label="Location" htmlFor="location" required>
        <input
          id="location"
          type="text"
          required
          aria-required="true"
          placeholder="City, State/Country"
          value={formData.location}
          onChange={(e) => setField('location', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <FormField
        label="LinkedIn URL"
        htmlFor="linkedin_url"
        helpText="Optional but encouraged"
      >
        <input
          id="linkedin_url"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={formData.linkedin_url}
          onChange={(e) => setField('linkedin_url', e.target.value)}
          className={inputClass}
        />
      </FormField>
    </div>
  )
}

function Divider() {
  return (
    <div className="my-8 flex items-center gap-3">
      <span aria-hidden="true" className="h-px flex-1 bg-walnut/20" />
      <span className="text-xs uppercase tracking-[0.3em] text-ink-soft">
        Engagement preference
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-walnut/20" />
    </div>
  )
}

function EngagementSelector({ value, setField }) {
  return (
    <fieldset>
      <legend className="mb-3 block text-sm font-medium text-ink">
        How would you like to engage?
        <span className="ml-0.5 text-walnut">*</span>
      </legend>
      <div role="radiogroup" className="space-y-3">
        {ENGAGEMENT_OPTIONS.map((option) => (
          <EngagementCard
            key={option.value}
            option={option}
            selected={value === option.value}
            onSelect={() => setField('engagement_type', option.value)}
          />
        ))}
      </div>
    </fieldset>
  )
}

function EngagementCard({ option, selected, onSelect }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-5 transition-all ${
        selected ? 'border-walnut bg-walnut/5' : 'border-walnut/15 bg-bg'
      }`}
    >
      <input
        type="radio"
        name="engagement_type"
        value={option.value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-walnut"
      >
        {selected && <span className="h-3 w-3 rounded-full bg-walnut" />}
      </span>
      <span>
        <span className="block font-serif text-lg font-medium text-ink">{option.title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
          {option.description}
        </span>
      </span>
    </label>
  )
}

function BranchSection({ type, children }) {
  const accent = BRANCH_ACCENT[type]
  return (
    <div className={`rounded-lg border-l-4 bg-bg p-6 ${accent.borderClass}`}>
      <p
        className={`text-[11px] font-medium uppercase tracking-widest ${accent.textClass}`}
      >
        Follow-up · {accent.label}
      </p>
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  )
}

function CommunityFields({ formData, setField }) {
  return (
    <>
      <FormField label="What drew you to Agile in Color?" htmlFor="community_drew">
        <textarea
          id="community_drew"
          rows={3}
          placeholder="Share what brought you here..."
          value={formData.community_drew}
          onChange={(e) => setField('community_drew', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <FormField
        label="What are you hoping to get out of being part of the community?"
        htmlFor="community_hoping"
      >
        <textarea
          id="community_hoping"
          rows={3}
          placeholder="Mentorship, networking, career growth, learning..."
          value={formData.community_hoping}
          onChange={(e) => setField('community_hoping', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <FormField
        label="Are you currently working in agile / scrum / product / coaching?"
        htmlFor="community_practicing"
      >
        <select
          id="community_practicing"
          value={formData.community_practicing}
          onChange={(e) => setField('community_practicing', e.target.value)}
          className={inputClass}
        >
          <option value="">Select an option</option>
          {PRACTICING_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </FormField>
    </>
  )
}

function CheckboxGroup({ legend, name, options, selected, toggle }) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium text-ink">{legend}</legend>
      <div className="space-y-2">
        {options.map((option) => {
          const id = `${name}-${option.replace(/\s+/g, '-').toLowerCase()}`
          return (
            <label key={option} htmlFor={id} className="flex cursor-pointer items-start gap-2">
              <input
                id={id}
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(name, option)}
                className="mt-1 h-4 w-4 accent-walnut"
              />
              <span className="text-sm text-ink">{option}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function CommitteeFields({ formData, setField, toggleArrayField }) {
  return (
    <>
      <CheckboxGroup
        legend="Which committees are you most interested in?"
        name="committee_interests"
        options={COMMITTEE_OPTIONS}
        selected={formData.committee_interests}
        toggle={toggleArrayField}
      />
      <FormField label="What relevant experience do you bring?" htmlFor="committee_experience" required>
        <textarea
          id="committee_experience"
          rows={4}
          required
          aria-required="true"
          placeholder="Skills, prior volunteer work, areas of expertise..."
          value={formData.committee_experience}
          onChange={(e) => setField('committee_experience', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <FormField
        label="How many hours per month can you reliably commit?"
        htmlFor="committee_hours"
      >
        <select
          id="committee_hours"
          value={formData.committee_hours}
          onChange={(e) => setField('committee_hours', e.target.value)}
          className={inputClass}
        >
          <option value="">Select an option</option>
          {HOURS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </FormField>
    </>
  )
}

function PartnerFields({ formData, setField, toggleArrayField }) {
  return (
    <>
      <FormField label="Organization name" htmlFor="partner_org_name" required>
        <input
          id="partner_org_name"
          type="text"
          required
          aria-required="true"
          placeholder="Your organization"
          value={formData.partner_org_name}
          onChange={(e) => setField('partner_org_name', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <FormField label="Your role at the organization" htmlFor="partner_role" required>
        <input
          id="partner_role"
          type="text"
          required
          aria-required="true"
          placeholder="Title / position"
          value={formData.partner_role}
          onChange={(e) => setField('partner_role', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <CheckboxGroup
        legend="What type of partnership are you exploring?"
        name="partner_types"
        options={PARTNER_TYPE_OPTIONS}
        selected={formData.partner_types}
        toggle={toggleArrayField}
      />
      <FormField
        label="Tell us more about what you're hoping to do together."
        htmlFor="partner_details"
        required
      >
        <textarea
          id="partner_details"
          rows={4}
          required
          aria-required="true"
          placeholder="What problem are you solving, what programs interest you, what's your timeline..."
          value={formData.partner_details}
          onChange={(e) => setField('partner_details', e.target.value)}
          className={inputClass}
        />
      </FormField>
      <FormField label="Approximate budget range (optional)" htmlFor="partner_budget">
        <select
          id="partner_budget"
          value={formData.partner_budget}
          onChange={(e) => setField('partner_budget', e.target.value)}
          className={inputClass}
        >
          <option value="">Select an option</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </FormField>
    </>
  )
}

function SubmitButton({ disabled, isSubmitting }) {
  const reallyDisabled = disabled || isSubmitting
  return (
    <div className="mt-8">
      <button
        type="submit"
        disabled={reallyDisabled}
        aria-busy={isSubmitting || undefined}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-walnut px-8 py-4 text-base font-medium text-bg transition-colors hover:bg-walnut-deep md:w-auto ${
          reallyDisabled ? 'cursor-not-allowed opacity-50 hover:bg-walnut' : ''
        }`}
      >
        {isSubmitting ? 'Submitting…' : 'Submit'}
        {!isSubmitting && <ArrowRight size={18} />}
      </button>
    </div>
  )
}

function SuccessMessage({ submission, reset }) {
  return (
    <div className="rounded-lg bg-bg p-9 text-center">
      <h3 className="font-serif text-2xl font-medium text-ink">
        Thank you, {submission.preferred_name}!
      </h3>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">
        {SUCCESS_MESSAGES[submission.engagement_type]}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 text-sm text-walnut underline transition-colors hover:text-walnut-deep"
      >
        Submit another response
      </button>
    </div>
  )
}

function FooterNote() {
  return (
    <section className="bg-bg px-9 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm leading-relaxed text-ink-soft">
          Questions before submitting?{' '}
          <Link to="/contact" className="text-walnut underline hover:text-walnut-deep">
            Reach out directly
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
