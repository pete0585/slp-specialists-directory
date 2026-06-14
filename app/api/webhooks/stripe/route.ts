import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 })
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
  const supabase = await createServiceClient()
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const listingId = session.metadata?.listing_id
      const planTier = session.metadata?.plan_tier as 'verified' | 'featured' | undefined
      if (!listingId || !planTier) {
        console.error('STRIPE WEBHOOK: checkout.session.completed missing metadata', { sessionId: session.id })
        if (process.env.RESEND_API_KEY) {
          await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL ?? 'hello@mail.findslpspecialist.com', to: 'adam@thestrategicveteran.com', subject: '⚠️ Stripe payment received but SLP listing NOT upgraded', html: `<p>A Stripe checkout completed but listing_id or plan_tier metadata was missing.</p><p>Session ID: ${session.id}</p>` }) }).catch(console.error)
        }
        break
      }
      await supabase.from('slp_specialists_listings').update({ plan_tier: planTier, stripe_customer_id: session.customer as string, plan_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() }).eq('id', listingId)
      await supabase.from('slp_payments').insert({ listing_id: listingId, stripe_payment_intent_id: session.payment_intent as string, tier: planTier, amount_cents: session.amount_total ?? 0, period_start: new Date().toISOString(), period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() })
      break
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const listingId = subscription.metadata?.listing_id
      if (!listingId) break
      await supabase.from('slp_specialists_listings').update({ plan_tier: 'free', plan_expires_at: null }).eq('id', listingId)
      break
    }
  }
  return NextResponse.json({ received: true })
}
