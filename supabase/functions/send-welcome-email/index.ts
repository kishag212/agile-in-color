// supabase/functions/send-welcome-email/index.ts
// Fires from a Supabase Database Webhook on INSERT into `engagement_submissions`.
// Sends the branded Agile in Color welcome email via Resend to every new member.
//
// Required function secrets (supabase secrets set ...):
//   RESEND_API_KEY   - Resend API key (re_...)
//   WELCOME_FROM     - verified sender, e.g. "Agile in Color <hello@agileincolor.org>"
//   WEBHOOK_SECRET   - shared secret; the DB webhook must send it as header x-webhook-secret
// Optional:
//   WELCOME_REPLY_TO - reply-to address (default kadidra@agileincolor.org)

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import {
  buildWelcomeHtml,
  buildWelcomeText,
  WELCOME_SUBJECT,
} from "./email.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const WELCOME_FROM =
  Deno.env.get("WELCOME_FROM") ?? "Agile in Color <hello@agileincolor.org>";
const WELCOME_REPLY_TO =
  Deno.env.get("WELCOME_REPLY_TO") ?? "kadidra@agileincolor.org";
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") ?? "";

interface SubmissionRecord {
  email?: string;
  full_name?: string;
  preferred_name?: string;
  engagement_type?: string;
}

interface WebhookPayload {
  type?: string;
  table?: string;
  record?: SubmissionRecord;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Verify the shared secret the database webhook sends.
  if (WEBHOOK_SECRET) {
    const provided = req.headers.get("x-webhook-secret");
    if (provided !== WEBHOOK_SECRET) {
      return json({ error: "Unauthorized" }, 401);
    }
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  // Only act on inserts; ignore anything else the webhook might send.
  if (payload.type && payload.type !== "INSERT") {
    return json({ skipped: `ignored event type ${payload.type}` });
  }

  const record = payload.record ?? {};
  const email = (record.email ?? "").trim();
  if (!email) {
    return json({ error: "No email on record" }, 400);
  }

  const name =
    (record.preferred_name ?? "").trim() ||
    (record.full_name ?? "").trim() ||
    "there";

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return json({ error: "Email service not configured" }, 500);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: WELCOME_FROM,
        to: [email],
        reply_to: WELCOME_REPLY_TO,
        subject: WELCOME_SUBJECT,
        html: buildWelcomeHtml(name),
        text: buildWelcomeText(name),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend send failed:", res.status, detail);
      return json({ error: "Failed to send", status: res.status, detail }, 502);
    }

    const result = await res.json();
    console.log(`Welcome email sent to ${email} (id: ${result.id ?? "?"})`);
    return json({ sent: true, id: result.id ?? null });
  } catch (err) {
    console.error("Send error:", err);
    return json({ error: String(err) }, 500);
  }
});
