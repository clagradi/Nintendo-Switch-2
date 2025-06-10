import { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil',
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Abilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { session_id } = req.query

  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'Missing session_id parameter' })
  }

  try {
    // Recupera la sessione Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id)

    // Recupera anche i dettagli del customer se presente
    let customerDetails: Stripe.Customer | Stripe.DeletedCustomer | null = null
    if (session.customer && typeof session.customer === 'string') {
      try {
        customerDetails = await stripe.customers.retrieve(session.customer)
      } catch (error) {
        console.warn('Failed to retrieve customer details:', error)
      }
    }

    return res.status(200).json({
      id: session.id,
      payment_status: session.payment_status,
      payment_intent: session.payment_intent,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
      currency: session.currency,
      created: session.created,
      customer_details: customerDetails,
      metadata: session.metadata
    })
  } catch (error) {
    console.error('Error retrieving payment status:', error)
    return res.status(500).json({ 
      error: 'Failed to retrieve payment status',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}