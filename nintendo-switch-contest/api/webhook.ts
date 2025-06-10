import { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil',
})

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Abilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Stripe-Signature')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sig = req.headers['stripe-signature'] as string
  let event: Stripe.Event

  try {
    // Verifica la firma del webhook
    event = stripe.webhooks.constructEvent(
      req.body as string | Buffer,
      sig,
      endpointSecret
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return res.status(400).json({ error: 'Invalid signature' })
  }

  try {
    // Gestisci gli eventi di Stripe
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break
      
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout session completed:', session.id)
  
  try {
    // Aggiorna lo stato del pagamento in Supabase
    if (session.customer_email) {
      const { error } = await supabase
        .from('partecipanti')
        .update({ 
          stato_pagamento: 'completed',
          stripe_session_id: session.id,
          data_pagamento: new Date().toISOString()
        })
        .eq('email', session.customer_email)
      
      if (error) {
        console.error('Error updating payment status:', error)
      } else {
        console.log('Payment status updated for:', session.customer_email)
      }
    }
  } catch (error) {
    console.error('Error in handleCheckoutSessionCompleted:', error)
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment intent succeeded:', paymentIntent.id)
  
  try {
    // Aggiorna ulteriori dettagli del pagamento se necessario
    const { error } = await supabase
      .from('partecipanti')
      .update({ 
        stripe_payment_intent_id: paymentIntent.id,
        importo_pagato: paymentIntent.amount / 100 // Converti da centesimi
      })
      .eq('stripe_session_id', paymentIntent.metadata?.session_id)
    
    if (error) {
      console.error('Error updating payment intent details:', error)
    }
  } catch (error) {
    console.error('Error in handlePaymentIntentSucceeded:', error)
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment intent failed:', paymentIntent.id)
  
  try {
    // Aggiorna lo stato a fallito
    const { error } = await supabase
      .from('partecipanti')
      .update({ 
        stato_pagamento: 'failed',
        stripe_payment_intent_id: paymentIntent.id
      })
      .eq('stripe_session_id', paymentIntent.metadata?.session_id)
    
    if (error) {
      console.error('Error updating failed payment status:', error)
    }
  } catch (error) {
    console.error('Error in handlePaymentIntentFailed:', error)
  }
}