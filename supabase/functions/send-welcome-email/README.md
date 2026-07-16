# send-welcome-email

Sends the Agile in Color welcome email whenever someone submits the membership
form. It fires from a **Supabase Database Webhook** on `INSERT` into
`engagement_submissions` and delivers a branded email through **Resend**.

Everyone who submits gets it (community, committee, and partner).

## Files

- `index.ts` — webhook handler + Resend send
- `email.ts` — HTML + plain-text email template (edit copy here)

## One-time setup

### 1. Resend

1. Create an account at [resend.com](https://resend.com).
2. Add and **verify the `agileincolor.org` domain** (Resend gives you DNS
   records — SPF/DKIM — to add at your registrar). Email won't send from
   `@agileincolor.org` until the domain is verified.
3. Create an API key (starts with `re_`).

### 2. Set the function secrets

Run from the repo root (swap in your real values):

```bash
supabase secrets set \
  RESEND_API_KEY="re_your_key_here" \
  WELCOME_FROM="Agile in Color <hello@agileincolor.org>" \
  WELCOME_REPLY_TO="kadidra@agileincolor.org" \
  WEBHOOK_SECRET="$(openssl rand -hex 24)"
```

Copy the `WEBHOOK_SECRET` value it generates — you need it in step 4.
(Run `supabase secrets list` to see it again.)

### 3. Deploy the function

```bash
supabase functions deploy send-welcome-email
```

### 4. Create the database webhook

In the Supabase dashboard: **Database → Webhooks → Create a new hook**

- **Table:** `engagement_submissions`
- **Events:** `Insert`
- **Type:** Supabase Edge Function → `send-welcome-email`
- **HTTP Headers:** add one header
  - Name: `x-webhook-secret`
  - Value: the `WEBHOOK_SECRET` from step 2

Save. That's it — new submissions now trigger the welcome email.

## Test it

Submit the membership form on the site (or insert a test row), then check:

```bash
supabase functions logs send-welcome-email
```

You should see `Welcome email sent to ...`. To test the function directly:

```bash
curl -i -X POST \
  "https://<your-project-ref>.functions.supabase.co/send-welcome-email" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: <your WEBHOOK_SECRET>" \
  -d '{"type":"INSERT","table":"engagement_submissions","record":{"email":"you@example.com","preferred_name":"Test"}}'
```

## Editing the email

All copy and styling live in `email.ts`. Change wording, links, or the chair
names there and redeploy with `supabase functions deploy send-welcome-email`.
