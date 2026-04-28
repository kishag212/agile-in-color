import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const inputClass =
  'w-full rounded-md border border-walnut/20 bg-bg px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors focus:border-walnut focus:outline-none focus:ring-1 focus:ring-walnut'

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [submission, setSubmission] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const setField = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }))

  const isFormValid = Boolean(
    formData.name.trim() && formData.email.trim() && formData.message.trim()
  )

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isFormValid || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      if (!supabase) {
        throw new Error('Database not connected. Please email admin@agileincolor.org directly.')
      }
      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || null,
          message: formData.message,
        })
      if (insertError) {
        throw new Error(insertError.message || 'Something went wrong. Please try again.')
      }
      setSubmission({ name: formData.name })
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
      <section className="bg-surface px-9 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-9 md:grid-cols-12">
          <ContactInfo />
          <div className="md:col-span-7">
            <div className="rounded-xl border border-walnut/15 bg-bg p-7 md:p-8">
              {submission ? (
                <SuccessMessage submission={submission} reset={reset} />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <FormField label="Full Name" htmlFor="name" required>
                    <input
                      id="name"
                      type="text"
                      required
                      aria-required="true"
                      placeholder="First Last"
                      value={formData.name}
                      onChange={(e) => setField('name', e.target.value)}
                      className={inputClass}
                    />
                  </FormField>
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
                  <FormField
                    label="Subject"
                    htmlFor="subject"
                    helpText="Optional — what's this about?"
                  >
                    <input
                      id="subject"
                      type="text"
                      placeholder="Press, speaking, partnership, hello…"
                      value={formData.subject}
                      onChange={(e) => setField('subject', e.target.value)}
                      className={inputClass}
                    />
                  </FormField>
                  <FormField label="Message" htmlFor="message" required>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      aria-required="true"
                      placeholder="Tell us a bit about why you're reaching out…"
                      value={formData.message}
                      onChange={(e) => setField('message', e.target.value)}
                      className={inputClass}
                    />
                  </FormField>
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
          </div>
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
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">Connect with us</p>
        <h1 className="mt-3 font-serif text-5xl font-normal leading-none tracking-tight text-ink md:text-6xl">
          Get in <em className="font-medium text-walnut">touch</em>.
        </h1>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-[60px] rounded-full bg-honey"
        />
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          We'd love to hear from you — questions, ideas, press inquiries, speaking opportunities,
          or just to say hello. Drop us a line and we'll respond within a few business days.
        </p>
      </div>
    </section>
  )
}

function ContactInfo() {
  return (
    <div className="md:sticky md:top-5 md:col-span-5">
      <p className="text-xs uppercase tracking-[0.3em] text-walnut">Reach us</p>
      <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-ink md:text-4xl">
        Direct contact.
      </h2>
      <p className="mt-5 text-sm leading-relaxed text-ink-soft md:text-base">
        Prefer email? Reach our team directly. We respond to all inquiries within 3–5 business
        days.
      </p>
      <div className="mt-7 rounded-lg border-l-4 border-walnut bg-bg p-5">
        <p className="text-[10px] font-medium uppercase tracking-widest text-walnut">Email</p>
        <a
          href="mailto:admin@agileincolor.org"
          className="mt-2 block font-serif text-lg font-medium text-ink no-underline transition-colors hover:text-walnut md:text-xl"
        >
          admin@agileincolor.org
        </a>
      </div>
      <p className="mt-5 font-serif text-sm italic text-ink-soft">
        Looking to partner, sponsor, or join the community? The{' '}
        <Link to="/membership" className="text-walnut underline hover:text-walnut-deep">
          engagement form
        </Link>{' '}
        has tailored questions to help us route your inquiry faster.
      </p>
    </div>
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

function SubmitButton({ disabled, isSubmitting }) {
  const reallyDisabled = disabled || isSubmitting
  return (
    <div className="mt-2">
      <button
        type="submit"
        disabled={reallyDisabled}
        aria-busy={isSubmitting || undefined}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-walnut px-8 py-4 text-base font-medium text-bg transition-colors hover:bg-walnut-deep md:w-auto ${
          reallyDisabled ? 'cursor-not-allowed opacity-50 hover:bg-walnut' : ''
        }`}
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
        {!isSubmitting && <ArrowRight size={18} />}
      </button>
    </div>
  )
}

function SuccessMessage({ submission, reset }) {
  return (
    <div className="rounded-lg bg-bg p-3 text-center md:p-6">
      <h3 className="font-serif text-2xl font-medium text-ink">
        Thank you, {submission.name}!
      </h3>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">
        We received your message. Someone from our team will get back to you within 3–5 business
        days.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 text-sm text-walnut underline transition-colors hover:text-walnut-deep"
      >
        Send another message
      </button>
    </div>
  )
}

function FooterNote() {
  return (
    <section className="bg-bg px-9 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm leading-relaxed text-ink-soft">
          Partnership or membership inquiry?{' '}
          <Link to="/membership" className="text-walnut underline hover:text-walnut-deep">
            Use the engagement form
          </Link>{' '}
          for faster routing.
        </p>
      </div>
    </section>
  )
}
