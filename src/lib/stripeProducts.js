// src/lib/stripeProducts.js
// Maps tier names to Stripe price IDs.
// IMPORTANT: These are LIVE MODE price IDs.

export const STRIPE_PRICE_IDS = {
  // Annual organizational sponsorships (unchanged)
  bronze: 'price_1__price_1TRvWAJ36ImLVnHott8ksyvD',
  silver: 'price_1__price_1TRvXFJ36ImLVnHoHEBQiFAV',
  gold: 'price_1__price_1TRvYRJ36ImLVnHohLAyU225',

  // Members' Night Out at Agile 2026 — one-time gifts (LIVE mode).
  seat: 'price_1TthXiJ36ImLVnHogVzJ57xO', // $75 — Buy a Seat
  table: 'price_1TthYzJ36ImLVnHoBnD3CAca', // $250 — Sponsor the Table
  host: 'price_1TthaaJ36ImLVnHog5sEtQ9e', // $1,000 — Host the Night
};
