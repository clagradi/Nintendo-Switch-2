/* ------------------------------------------------------------------
   Stripe service – production implementation (Checkout redirect)
   ------------------------------------------------------------------ */

import { loadStripe } from '@stripe/stripe-js'

/**
 * Publishable key – only the pk_* value is exposed to the browser.
 * The secret key must live in the serverless function environment.
 */
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
)

/* ------------------------------------------------------------------ */

export interface PaymentData {
  ticketCount: number
  userEmail: string
  userName: string
  amount: number // cents – derived from priceHelpers
}

interface CheckoutSessionResponse {
  url: string
}

export const stripeService = {
  /**
   * Create a Stripe Checkout Session via backend and redirect the user.
   */
  async initiatePayment(paymentData: PaymentData) {
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe JS failed to load')

      // Call backend route that creates the Checkout session
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      })

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(`Backend error: ${msg}`)
      }

      const { url } = (await res.json()) as CheckoutSessionResponse
      window.location.href = url // Hard redirect to Stripe Checkout
      return { success: true }
    } catch (err) {
      console.error('Stripe payment error:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  },

  /** Stub – you can extend with real webhook polling if needed. */
  async verifyPayment(): Promise<{ success: boolean; status: string }> {
    return { success: true, status: 'pending' }
  }
}

/* ------------------------------------------------------------------
   Price helpers in cents to avoid floating point precision issues
   ------------------------------------------------------------------ */
export const priceHelpers = {
  TICKET_PRICE: (Number(import.meta.env.VITE_TICKET_PRICE) || 10) * 100, // €10 -> 1000 cents

  calculateTotal(ticketCount: number): number {
    return ticketCount * this.TICKET_PRICE
  },

  formatPrice(cents: number): string {
    return `€ ${(cents / 100).toFixed(2)}`
  }
}
