import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, specialty, city } = await request.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    const supabase = await createServiceClient()
    await supabase.from('slp_subscribers').insert({ email, specialty, city, created_at: new Date().toISOString() }).onConflict('email').ignore()
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ success: true }) }
}
