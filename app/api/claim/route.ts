import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { listingId, email } = await request.json()
    if (!listingId || !email) return NextResponse.json({ error: 'listingId and email are required' }, { status: 400 })
    const supabase = await createServiceClient()
    const { data: listing, error: listingError } = await supabase.from('slp_specialists_listings').select('id, name, full_name, email, claimed').eq('id', listingId).single()
    if (listingError || !listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    if (listing.claimed) return NextResponse.json({ error: 'This listing has already been claimed' }, { status: 400 })
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    const { error: claimError } = await supabase.from('slp_claims').insert({ listing_id: listingId, email, token, verified: false, expires_at: expiresAt })
    if (claimError) return NextResponse.json({ error: 'Failed to create claim' }, { status: 500 })
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://findslpspecialist.com'
    const claimUrl = `${siteUrl}/api/claim/verify?token=${token}`
    const displayName = listing.name || listing.full_name || 'Your listing'
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL ?? 'hello@mail.findslpspecialist.com', to: email, subject: `Claim your SLP listing on FindSLPSpecialist.com`, html: `<p>Hi there,</p><p>Click the link below to verify and claim your listing on FindSLPSpecialist.com:</p><p><strong>${displayName}</strong></p><p><a href="${claimUrl}" style="color:#0EA5E9;font-weight:bold;">Claim My Listing</a></p><p>This link expires in 30 days. If you didn't request this, you can safely ignore this email.</p>` }) })
    }
    return NextResponse.json({ success: true, listingName: displayName })
  } catch (err) {
    console.error('Claim error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
