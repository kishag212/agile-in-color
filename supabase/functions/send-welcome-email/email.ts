// supabase/functions/send-welcome-email/email.ts
// Builds the branded HTML + plain-text welcome email sent to new members.
// Content adapted from the "Welcome to Agile in Color" membership letter.

const MEETUP_URL = "https://www.meetup.com/agile-in-color/";
const EVENTS_URL = "https://www.agileincolor.org/events";
const SITE_URL = "https://www.agileincolor.org";
const LINKEDIN_URL = "https://www.linkedin.com/company/agile-in-color/";
const INSTAGRAM_URL = "https://www.instagram.com/agileincolor/";
const YOUTUBE_URL = "https://www.youtube.com/@agileincolor";
const VOLUNTEER_EMAIL = "kadidra@agileincolor.org";

// Brand palette (from tailwind.config.js)
const C = {
  bg: "#fdf6ec",
  surface: "#f5e9d3",
  walnut: "#8f531d",
  honey: "#dfad68",
  ink: "#3d2817",
  inkSoft: "#5a4128",
  espresso: "#2a1a0d",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const WELCOME_SUBJECT =
  "Welcome to Agile in Color – inspiring the next generation of global POC Agile leaders!";

export function buildWelcomeHtml(name: string): string {
  const greetingName = escapeHtml(name);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to Agile in Color</title>
</head>
<body style="margin:0;padding:0;background-color:${C.surface};font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:${C.ink};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.surface};padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${C.bg};border-radius:12px;overflow:hidden;">
          <!-- Color stripe -->
          <tr>
            <td style="height:6px;line-height:6px;font-size:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                <td style="background-color:#8f531d;height:6px;">&nbsp;</td>
                <td style="background-color:#c38842;height:6px;">&nbsp;</td>
                <td style="background-color:#dfad68;height:6px;">&nbsp;</td>
                <td style="background-color:#f0c173;height:6px;">&nbsp;</td>
                <td style="background-color:#ffdba9;height:6px;">&nbsp;</td>
              </tr></table>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:36px 40px 8px 40px;">
              <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${C.walnut};">Agile in Color</p>
              <h1 style="margin:10px 0 0 0;font-size:30px;line-height:1.15;font-weight:600;color:${C.ink};">Welcome to the community.</h1>
              <div style="width:60px;height:3px;background-color:${C.honey};border-radius:3px;margin-top:14px;"></div>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:20px 40px 0 40px;font-size:16px;line-height:1.6;color:${C.inkSoft};">
              <p style="margin:0 0 16px 0;">Dear ${greetingName},</p>
              <p style="margin:0 0 16px 0;">We are excited to have you join our community dedicated to amplifying underrepresented voices in Agile. As a member, you&rsquo;ll have access to opportunities for personal and professional growth, meaningful connections, and impactful contributions to our shared mission.</p>
            </td>
          </tr>

          <!-- Getting started -->
          <tr>
            <td style="padding:24px 40px 0 40px;">
              <h2 style="margin:0 0 4px 0;font-size:20px;font-weight:600;color:${C.ink};">Getting started</h2>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${C.inkSoft};">Here&rsquo;s how you can start engaging based on your area of interest:</p>

              ${section(
                "Conference / Public Speaking",
                "Build confidence and refine your presentation skills with our Colourful Voices Committee. Whether you&rsquo;re polishing an existing talk or starting from scratch, we&rsquo;ll give you timely, actionable feedback. Our Colourful Voices chair, Matt Carlson, will reach out to discuss your goals.",
              )}
              ${section(
                "Training / Certifications",
                "Agile in Color regularly receives free or reduced-cost training and certification offers from trainers. We share these with members as they arise, filled first-come, first-served, with priority for members who haven&rsquo;t been selected before. Keep an eye out for these emails.",
              )}
              ${section(
                "Coaching / Mentoring",
                "Our Coaching and Mentoring program is being reorganized and is temporarily unavailable. We&rsquo;ll add you to the interested-participants list and reach out as soon as it re-launches.",
              )}
            </td>
          </tr>

          <!-- Connect -->
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <h2 style="margin:0 0 4px 0;font-size:20px;font-weight:600;color:${C.ink};">Ways to connect</h2>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${C.inkSoft};">There are many ways to connect with other POC Agilists:</p>

              ${section(
                "Join our Meetup",
                `Our meetups feature guest speakers, networking, member updates, and lively discussion of Agile practice. <a href="${MEETUP_URL}" style="color:${C.walnut};font-weight:600;">Join the Agile in Color Meetup &rarr;</a>`,
              )}
              ${section(
                "Join a committee",
                "Get involved and make a difference while building lasting relationships. Our committees include Membership &amp; Events (home to the <strong>Share Your Story</strong> series with Nicole Spence-Goon and the <strong>Colourful Voices</strong> initiative with Matt Carlson), Social Media &amp; Branding (Keira Des Anges), Coaching &amp; Mentoring (Louria Lindauer), Sponsorship, and Programming. Reply to this email and we&rsquo;ll connect you with the right people.",
              )}
              ${section(
                "Volunteer",
                `We&rsquo;re currently looking for a Producer, a Sponsorship &amp; Partnership volunteer, a Technology Manager, and a Marketing &amp; Branding volunteer. Interested? Email <a href="mailto:${VOLUNTEER_EMAIL}" style="color:${C.walnut};font-weight:600;">${VOLUNTEER_EMAIL}</a>.`,
              )}
            </td>
          </tr>

          <!-- Stay connected -->
          <tr>
            <td style="padding:28px 40px 0 40px;">
              <div style="background-color:${C.surface};border-radius:10px;padding:22px 24px;">
                <h2 style="margin:0 0 10px 0;font-size:18px;font-weight:600;color:${C.ink};">Stay connected</h2>
                <p style="margin:0 0 8px 0;font-size:15px;line-height:1.6;color:${C.inkSoft};">
                  Follow us on
                  <a href="${LINKEDIN_URL}" style="color:${C.walnut};font-weight:600;">LinkedIn</a>,
                  <a href="${INSTAGRAM_URL}" style="color:${C.walnut};font-weight:600;">Instagram</a>, and
                  <a href="${YOUTUBE_URL}" style="color:${C.walnut};font-weight:600;">YouTube</a>.
                </p>
                <p style="margin:0;font-size:15px;line-height:1.6;color:${C.inkSoft};">
                  Mark your calendar &mdash; <a href="${EVENTS_URL}" style="color:${C.walnut};font-weight:600;">see upcoming events &rarr;</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:28px 40px 8px 40px;font-size:15px;line-height:1.6;color:${C.inkSoft};">
              <p style="margin:0 0 16px 0;">Thank you for being part of Agile in Color. Together, we&rsquo;re building a more inclusive, empowered, and innovative Agile community. We can&rsquo;t wait to see what you&rsquo;ll achieve.</p>
              <p style="margin:0;">Warm regards,</p>
              <p style="margin:4px 0 0 0;font-weight:600;color:${C.ink};">Kadidra Hurst</p>
              <p style="margin:0;font-size:13px;color:${C.inkSoft};">Membership Officer, Agile in Color</p>
              <p style="margin:2px 0 0 0;font-size:13px;"><a href="mailto:${VOLUNTEER_EMAIL}" style="color:${C.walnut};">${VOLUNTEER_EMAIL}</a></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px 40px;border-top:1px solid #e7d6bb;margin-top:16px;">
              <p style="margin:16px 0 0 0;font-size:12px;color:${C.inkSoft};opacity:0.7;">
                Agile in Color &middot; <a href="${SITE_URL}" style="color:${C.walnut};">agileincolor.org</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function section(title: string, body: string): string {
  return `<div style="border-left:3px solid ${C.honey};padding:2px 0 2px 16px;margin:0 0 16px 0;">
    <p style="margin:0 0 4px 0;font-size:15px;font-weight:600;color:${C.walnut};">${title}</p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:${C.inkSoft};">${body}</p>
  </div>`;
}

export function buildWelcomeText(name: string): string {
  return `Dear ${name},

Welcome to Agile in Color! We are excited to have you join our community dedicated to amplifying underrepresented voices in Agile. As a member, you'll have access to opportunities for personal and professional growth, meaningful connections, and impactful contributions to our shared mission.

GETTING STARTED

Conference / Public Speaking
Build confidence and refine your presentation skills with our Colourful Voices Committee. Our chair, Matt Carlson, will reach out to discuss your goals.

Training / Certifications
We regularly receive free or reduced-cost training and certification offers and share them with members first-come, first-served. Keep an eye out for these emails.

Coaching / Mentoring
This program is being reorganized and is temporarily unavailable. We'll add you to the interested list and reach out when it re-launches.

WAYS TO CONNECT

Join our Meetup: ${MEETUP_URL}

Join a committee: Membership & Events (Share Your Story - Nicole Spence-Goon; Colourful Voices - Matt Carlson), Social Media & Branding (Keira Des Anges), Coaching & Mentoring (Louria Lindauer), Sponsorship, and Programming. Reply to this email and we'll connect you.

Volunteer: We're looking for a Producer, Sponsorship & Partnership volunteer, Technology Manager, and Marketing & Branding volunteer. Email ${VOLUNTEER_EMAIL}.

STAY CONNECTED
Follow us on LinkedIn, Instagram, and YouTube. See upcoming events: ${EVENTS_URL}

Thank you for being part of Agile in Color. Together, we're building a more inclusive, empowered, and innovative Agile community.

Warm regards,
Kadidra Hurst
Membership Officer, Agile in Color
${VOLUNTEER_EMAIL}
${SITE_URL}`;
}
