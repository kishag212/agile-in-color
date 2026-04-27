# Agile in Color

Website for **Agile in Color**, a 501(c)(3) nonprofit founded in 2020 that develops, connects, and elevates professionals of color into leaders shaping the future of agile, innovation, and modern work.

## Tech stack

- **Vite + React** (JavaScript)
- **Tailwind CSS** for styling
- **React Router** for client-side routing
- **lucide-react** for icons
- **@supabase/supabase-js** for the database / auth client
- **@stripe/stripe-js** for donation + membership checkout

## Run it

```bash
npm install
npm run dev
```

Dev server runs at http://localhost:5173.

```bash
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in keys when they're issued:

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase project → Settings → API → `anon` public key |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard → Developers → API keys → Publishable key |

The clients live in `src/lib/supabase.js` and `src/lib/stripe.js`. They warn (don't crash) if the keys are missing, so the app still boots before keys are wired up. **Never put Stripe secret keys in this repo** — those go on the server / a serverless function.

## Photos

- **Team headshots** → `public/team/`. Reference as `/team/firstname-lastname.jpg`.
- **Community / event photos** → `public/community/`. Reference as `/community/event-slug-01.jpg`.

See the README in each folder for naming + sizing.

## Folder structure

```
agile-in-color/
├── public/
│   ├── team/                 # headshot photos
│   ├── community/            # community / event photos
│   └── favicon.svg           # 5-bar brand mark
├── src/
│   ├── components/
│   │   ├── Layout.jsx        # Nav + Footer wrapper (Outlet)
│   │   ├── Nav.jsx           # sticky nav, hamburger on mobile
│   │   ├── Footer.jsx        # espresso footer with brand mark
│   │   ├── BrandMark.jsx     # 5 vertical bars + AGILE in COLOR wordmark
│   │   ├── Pillar.jsx        # reusable Amplify/Boost/Connect card
│   │   └── Button.jsx        # rounded-full pill button (variants)
│   ├── pages/                # Home, About, Manifesto, Team, Programs,
│   │                         # Events, Membership, Sponsor, Contact
│   ├── lib/
│   │   ├── supabase.js
│   │   └── stripe.js
│   ├── App.jsx               # Router setup
│   ├── main.jsx              # Entry
│   └── index.css             # Tailwind directives + base layer
├── index.html                # Google Fonts (Fraunces, Work Sans)
├── tailwind.config.js        # Brand color + font extensions
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Brand colors

| Token | Hex | Use |
| --- | --- | --- |
| `walnut` | `#8f531d` | Primary brand, button fill |
| `caramel` | `#c38842` | Italic accent ("in"), warm secondary |
| `honey` | `#dfad68` | Hover / mid-warm |
| `wheat` | `#f0c173` | Soft accent, icon chips |
| `cream-light` | `#ffdba9` | Light text on dark, lightest bar |
| `bg` | `#fdf6ec` | Page background |
| `surface` | `#f5e9d3` | Secondary surface / cards |
| `panel` | `#c9a276` | Wheat panel for About sections |
| `ink` | `#3d2817` | Headings / primary text |
| `ink-soft` | `#5a4128` | Body text |
| `espresso` | `#2a1a0d` | Footer / dark sections |
| `caramel-deep` | `#a06832` | Deeper caramel hover |
| `honey-deep` | `#b8843e` | Deeper honey hover |
| `walnut-deep` | `#7e5831` | Donate button, primary hover |

Use them as Tailwind classes: `bg-walnut`, `text-ink`, `border-surface`, etc.

### Type

- **Display / serif** — Fraunces 400/500/600 + italic → `font-serif`
- **Body / sans** — Work Sans 300/400/500/600 → `font-sans` (default)

Loaded via Google Fonts in `index.html`.

## Build order checklist

Pages are stubbed; we'll fill them in one at a time.

- [x] Step 1 — Project scaffold (this commit)
- [ ] Step 2 — Home: hero with "Building the leaders shaping what comes next"
- [ ] Step 3 — About: origin story (founded 2020, post-George Floyd), mission, vision
- [ ] Step 4 — Manifesto: principles
- [ ] Step 5 — Programs: Amplify, Boost, Connect
- [ ] Step 6 — Team: board, advisors, community leads
- [ ] Step 7 — Events: list driven by Supabase
- [ ] Step 8 — Membership: tiers + Stripe checkout
- [ ] Step 9 — Sponsor: sponsorship tiers + recurring donations
- [ ] Step 10 — Contact: form

## Choices worth noting

- **Component layout is flat** under `src/components/` (no `layout/` or `ui/` subfolders) per spec.
- **No `NotFound` page** — unmatched routes simply render the `Layout` shell with no inner content. Add a `*` route later if needed.
- **Tailwind v3** (not v4) for stable PostCSS integration.
- **`@/` alias** points to `src/` (configured in `vite.config.js`).
- **Stripe secret key is intentionally absent.** Donations / membership checkout will need a server endpoint (a Supabase Edge Function or similar) to mint a checkout session.
