// supabase/functions/create-checkout-session/index.ts
// Creates a Stripe Checkout session for donations and sponsorships.
// Supports one-time, recurring, sponsor tiers, and donor-pays-fees.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Stripe nonprofit fee: 2.2% + $0.30
// To make donor pay the fee: amount_with_fee = (amount + 0.30) / (1 - 0.022)
function calculateFeeCoveredAmount(baseCents: number): number {
  const baseDollars = baseCents / 100;
  const withFee = (baseDollars + 0.30) / (1 - 0.022);
  return Math.round(withFee * 100);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      mode,
      tier_name,
      price_id,
      amount_cents,
      recurring,
      cover_fee,
      success_url,
      cancel_url,
    } = body;

    const origin = req.headers.get("origin") || "https://agile-in-color.vercel.app";
    const successUrl = success_url || `${origin}/sponsor/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = cancel_url || `${origin}/sponsor/cancel`;

    let lineItems: any[] = [];
    let metadata: any = {};

    if (price_id) {
      let unitAmount: number | null = null;
      if (cover_fee) {
        const price = await stripe.prices.retrieve(price_id);
        const baseCents = price.unit_amount || 0;
        unitAmount = calculateFeeCoveredAmount(baseCents);
        lineItems = [{
          price_data: {
            currency: "usd",
            product_data: {
              name: `${tier_name || "Sponsorship"} (with processing fee)`,
            },
            unit_amount: unitAmount,
            ...(price.recurring ? { recurring: price.recurring } : {}),
          },
          quantity: 1,
        }];
      } else {
        lineItems = [{ price: price_id, quantity: 1 }];
      }
      metadata = {
        tier_name: tier_name || "",
        fee_covered: cover_fee ? "true" : "false",
        donation_type: mode === "subscription" ? "recurring" : "sponsor_tier",
      };
    } else if (amount_cents) {
      let finalAmount = amount_cents;
      if (cover_fee) {
        finalAmount = calculateFeeCoveredAmount(amount_cents);
      }
      lineItems = [{
        price_data: {
          currency: "usd",
          product_data: {
            name: recurring
              ? "Monthly recurring donation to Agile in Color"
              : "Donation to Agile in Color",
          },
          unit_amount: finalAmount,
          ...(recurring ? { recurring: { interval: "month" } } : {}),
        },
        quantity: 1,
      }];
      metadata = {
        donation_type: recurring ? "recurring" : "one_time",
        original_amount_cents: amount_cents.toString(),
        fee_covered: cover_fee ? "true" : "false",
      };
    } else {
      return new Response(
        JSON.stringify({ error: "Either price_id or amount_cents is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: mode === "subscription" || recurring ? "subscription" : "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      ...(mode !== "subscription" && !recurring ? { submit_type: "donate" } : {}),
      billing_address_collection: "auto",
      custom_text: {
        submit: {
          message: "Thank you for supporting Agile in Color. Your gift makes a real difference.",
        },
      },
    });

    return new Response(
      JSON.stringify({ url: session.url, session_id: session.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Checkout session error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});