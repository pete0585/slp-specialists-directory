import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret') ?? request.headers.get('svix-signature')
  const expectedSecret = process.env.INBOUND_WEBHOOK_SECRET
  if (expectedSecret && secret !== expectedSecret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await request.json()
    const supabase = await createServiceClient()
    await supabase.from('inbound_emails').insert({ from_email: body.from ?? body.sender, subject: body.subject, text: body.text ?? body.plain, html: body.html, received_at: new Date().toISOString(), processed: false, directory_slug: 'slp-specialists' })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inbound email error:', err)
    return NextResponse.json({ error: 'Failed to store email' }, { status: 500 })
  }
}
