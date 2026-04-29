// supabase/functions/stripe-webhook/index.ts
// Receives webhook events from Stripe when payments succeed or fail.
// Records donations in the Supabase `donations` table.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider()
    );
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const amountTotal = session.amount_total || 0;
      const metadata = session.metadata || {};
      const originalAmount = parseInt(metadata.original_amount_cents || "0") || amountTotal;
      const feeCovered = metadata.fee_covered === "true";
      const feeAmount = feeCovered ? amountTotal - originalAmount : 0;
      
      const stripeFee = Math.round(amountTotal * 0.022) + 30;
      const netAmount = amountTotal - stripeFee;
      
      let donationType: string = metadata.donation_type || "one_time";
      
      const { error: insertError } = await supabase
        .from("donations")
        .insert([{
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          stripe_subscription_id: session.subscription as string,
          stripe_customer_id: session.customer as string,
          amount_cents: amountTotal,
          currency: session.currency || "usd",
          donation_type: donationType,
          tier_name: metadata.tier_name || null,
          recurring_interval: session.mode === "subscription" ? "month" : null,
          fee_covered: feeCovered,
          fee_amount_cents: feeAmount,
          net_amount_cents: netAmount,
          donor_email: session.customer_details?.email || null,
          donor_name: session.customer_details?.name || null,
          status: "succeeded",
          completed_at: new Date().toISOString(),
        }]);

      if (insertError) {
        console.error("Failed to insert donation:", insertError);
        return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});