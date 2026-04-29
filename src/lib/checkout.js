// src/lib/checkout.js
// Calls the Supabase Edge Function to create a Stripe Checkout session and redirects.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function startCheckout({
  priceId = null,
  amountCents = null,
  tierName = null,
  recurring = false,
  coverFee = false,
  mode = 'payment',
}) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase not configured');
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      mode,
      price_id: priceId,
      amount_cents: amountCents,
      tier_name: tierName,
      recurring,
      cover_fee: coverFee,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Checkout failed' }));
    throw new Error(error.error || 'Checkout failed');
  }

  const { url } = await response.json();
  if (url) {
    window.location.href = url;
  } else {
    throw new Error('No checkout URL returned');
  }
}
