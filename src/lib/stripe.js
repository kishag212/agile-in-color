import { loadStripe } from '@stripe/stripe-js'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!publishableKey) {
  console.warn(
    '[stripe] VITE_STRIPE_PUBLISHABLE_KEY is missing. Add it to .env.local — see .env.example.'
  )
}

let stripePromise = null

export function getStripe() {
  if (!publishableKey) return null
  if (!stripePromise) stripePromise = loadStripe(publishableKey)
  return stripePromise
}
