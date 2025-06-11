

import { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'

// Debug environment variables
console.log('🔍 Backend env check:', {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ? 'SET' : 'MISSING',
  hasValidKey: process.env.STRIPE_SECRET_KEY?.startsWith('sk_') ? 'VALID' : 'INVALID'
})

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil',
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      return res.status(200).end()
    }
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    console.log('🔍 Environment check:', {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      keyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) || 'MISSING',
      method: req.method,
      body: req.body
    })

    // Verify that the Stripe key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY not configured')
      return res.status(500).json({ error: 'Server configuration error: STRIPE_SECRET_KEY missing' })
    }

  const { amount, userEmail, userName, ticketCount } = req.body

  if (!amount || !userEmail || !userName) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Nintendo Switch Raffle Entry',
              description: `${ticketCount} ticket${ticketCount > 1 ? 's' : ''} for ${userName}`,
            },
            unit_amount: amount, // Il frontend manda già i centesimi
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        userName,
        ticketCount: ticketCount.toString(),
      },
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('❌ Stripe session creation error:', err)
    
    // Log dettagliato dell'errore
    if (err instanceof Error) {
      console.error('Error message:', err.message)
      console.error('Error stack:', err.stack)
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      details: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }
}