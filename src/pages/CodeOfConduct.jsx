import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function CodeOfConduct() {
  return (
    <>
      <Hero />
      <ShortVersion />
      <DetailedQA />
      <Reporting />
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
    <section className="bg-panel px-9 py-14 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-cream-light">Community standards</p>
      <h1 className="mt-3 font-serif text-5xl font-normal leading-none tracking-tight text-cream-light md:text-6xl">
        Code of <em className="font-medium not-italic">Conduct</em>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream-light/90 md:text-lg">
        All Agile in Color members, event attendees, speakers, local and regional community
        leaders, sponsors, Officers, Board of Directors, and volunteers are required to comply
        with the following code of conduct. Organizers will enforce this code throughout Agile in
        Color events and operations. We expect cooperation from all participants to help ensure a
        safe environment for everybody.
      </p>
    </section>
  )
}

const SHORT_PARAGRAPHS = [
  'The Agile in Color community drives toward equality and inclusion of diversity representation, expertise, and involvement in the agile community. We value diverse idea representation to empower the agile community and enterprises and believe everyone is better off when more ideas are shared.',
  'In support of this mission, Agile in Color wants to ensure a respectful, safe, and inclusive environment for everyone, whenever they are engaged in Agile in Color activities, events, and operations.',
  'We do not tolerate harassing or disrespectful behavior, interactions, messages, or images, by any member, in any form. This includes business and social activities, regardless of location.',
  'We encourage everyone to help in creating a welcoming and safe environment. Please report any concerns, harassing behavior, suspicious or disruptive activity to a board member, event organizer, or volunteer.',
]

function ShortVersion() {
  return (
    <section className="bg-bg px-9 py-14">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-walnut">Short version</p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-ink md:text-4xl">
          What we stand for, in plain terms.
        </h2>
        <div className="mt-7 max-w-2xl">
          {SHORT_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              className={`${i === 0 ? '' : 'mt-5'} text-base leading-relaxed text-ink-soft md:text-lg`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function QABlock({ question, children, isFirst, borderClass = 'border-walnut/15', headingClass }) {
  return (
    <div className={`${isFirst ? '' : `border-t ${borderClass} mt-7 pt-7`} py-7 first:pt-0`}>
      <h3 className={headingClass}>{question}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function DetailedQA() {
  const qHeadingClass =
    'mb-3 font-serif text-xl font-medium leading-snug text-ink md:text-2xl'
  const bodyClass = 'text-base leading-relaxed text-ink-soft'
  const listClass = 'list-disc space-y-2 pl-6 text-base leading-relaxed text-ink-soft'

  return (
    <section className="bg-surface px-9 py-14 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-caramel-deep">
          Detailed expectations
        </p>
        <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-ink md:text-4xl">
          The full picture.
        </h2>

        <div className="mt-9">
          <QABlock
            question="Who does the Code of Conduct apply to?"
            isFirst
            headingClass={qHeadingClass}
          >
            <p className={bodyClass}>
              Everyone. All participants in any Agile in Color activity, including members, event
              attendees, speakers, sponsors, volunteers, contributors, local and regional
              community leaders, sponsors, Officers, Board of Directors, and volunteers are
              required to agree with and adhere to the code of conduct.
            </p>
          </QABlock>

          <QABlock
            question="Where and when does this Code of Conduct apply?"
            headingClass={qHeadingClass}
          >
            <p className={bodyClass}>
              Agile in Color offers many opportunities for our members and affiliates to come
              together to network and collaborate. These include in-person and online conferences,
              sponsored events, initiatives, and online or personal contributions. This code of
              conduct applies in all cases and covers business and social activities, regardless
              of location.
            </p>
          </QABlock>

          <QABlock
            question="What is considered harassment / a breach of the Code of Conduct?"
            headingClass={qHeadingClass}
          >
            <p className={bodyClass}>Harassment includes (but is not limited to):</p>
            <ul className={listClass}>
              <li>Intimidating, harassing, abusive, discriminatory, derogatory, or demeaning conduct</li>
              <li>
                Offensive verbal or written comments related to gender, gender identity, sexual
                orientation, disability, race, ethnicity, age, religion, political views,
                technology choices
              </li>
              <li>
                Inappropriate use of nudity and/or sexual images in public spaces (including
                presentation slides)
              </li>
              <li>Deliberate intimidation, stalking or following</li>
              <li>Harassing photography or recording</li>
              <li>Sustained disruption of talks or other events</li>
              <li>
                Non-consenting and/or inappropriate physical contact, or unwelcome sexual attention
              </li>
            </ul>
            <p className={`${bodyClass} pt-1`}>
              Sexual language and imagery are not appropriate for any situation, including talks,
              workshops, special events, meetings, and online presentations. Event sponsors should
              not use sexualized images, activities, or other material. Booth staff (including
              volunteers) should not use sexualized clothing/uniforms/costumes or otherwise create
              a sexualized environment.
            </p>
            <p className={bodyClass}>
              Some venues are shared with members of the public; please be respectful to all
              patrons of these locations.
            </p>
          </QABlock>

          <QABlock
            question="What are the consequences of violating the Code of Conduct?"
            headingClass={qHeadingClass}
          >
            <p className={bodyClass}>
              Event organizers and volunteers, Program Directors, staff, and board members will
              enforce this code throughout all Agile in Color activities. Participants in any
              Agile in Color activity asked to stop any harassing behavior are expected to comply
              immediately. Consequences may include:
            </p>
            <ul className={listClass}>
              <li>Removal from an event without refund</li>
              <li>Revoke membership with Agile in Color</li>
              <li>Removal from the Board of Directors</li>
              <li>Removal from Program teams</li>
              <li>Revoke the local community affiliation with Agile in Color</li>
            </ul>
          </QABlock>
        </div>
      </div>
    </section>
  )
}

function Reporting() {
  const qHeadingClass =
    'mb-3 font-serif text-lg font-medium text-wheat md:text-xl'
  const bodyClass = 'text-base leading-relaxed text-cream-light/90'
  const mutedBodyClass = 'text-base leading-relaxed text-cream-light/80'
  const listClass = 'list-disc space-y-2 pl-6 text-base leading-relaxed text-cream-light/90'

  return (
    <section className="relative overflow-hidden bg-espresso px-9 py-14 text-cream-light md:py-16">
      <ColorStripe />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-wheat">Reporting</p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-cream-light md:text-4xl">
          When something happens, <em className="font-medium text-wheat">tell us</em>.
        </h2>

        <div className="mt-7">
          <div>
            <h3 className={qHeadingClass}>When should I seek help or report an incident?</h3>
            <p className={bodyClass}>
              Every incident is important, no matter how minor it might seem at the time. Please
              seek help as soon as possible for anything you consider harassment or a breach of
              the Code of Conduct. You should also report all incidents as soon as possible after
              the incident occurs to a board member, event organizer, or volunteer.
            </p>
            <p className={`mt-3 ${mutedBodyClass}`}>
              It is everybody's responsibility to create and maintain a safe and respectful
              environment. As such, you should report incidents:
            </p>
            <ul className={`mt-3 ${listClass}`}>
              <li>If it is something that has happened to you</li>
              <li>If someone shared something with you, or you were with them when it happened</li>
              <li>If you saw something happen from afar</li>
            </ul>
          </div>

          <div className="mt-7 border-t border-wheat/15 pt-7">
            <h3 className={qHeadingClass}>How do I find help or report an incident?</h3>
            <p className={bodyClass}>
              If you need help or need to report an incident, please contact any of the following:
            </p>
            <ul className={`mt-3 ${listClass}`}>
              <li>Agile in Color core team members — see our Team page for the current roster</li>
              <li>Event organizer at any Agile in Color event</li>
              <li>
                Email: conduct@agileincolor.org{' '}
                <span className="text-cream-light/60">(TODO: confirm correct contact email)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function SignOff() {
  return (
    <section className="bg-bg px-9 py-12 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="font-serif text-xl font-normal italic leading-relaxed text-ink md:text-2xl">
          Agree to the code of conduct and become part of a community committed to building
          something better — together.
        </p>
        <div className="mt-7 flex justify-center">
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 rounded-full bg-walnut px-7 py-4 text-sm font-medium text-bg no-underline transition-colors hover:bg-walnut-deep"
          >
            Join the community
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
