import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, credentials, city, state, phone, email, website, bio, specialties, telehealth } = body
    if (!name || !city || !state || !email) return NextResponse.json({ error: 'Name, city, state, and email are required' }, { status: 400 })
    const supabase = await createServiceClient()
    const slug = `${slugify(name)}-slp-${slugify(city)}-${state.toLowerCase()}-${Date.now()}`
    const credArray = credentials ? credentials.split(',').map((c: string) => c.trim()).filter(Boolean) : []
    await supabase.from('slp_specialists_listings').insert({ slug, name, credentials: credArray, city, state, phone: phone || null, email, website: website || null, bio: bio || null, specialties: specialties || null, telehealth: telehealth ?? false, status: 'pending', is_active: false, plan_tier: 'free', accepting_new_clients: true, claimed: false })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Failed to submit listing' }, { status: 500 })
  }
}
