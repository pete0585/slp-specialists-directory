import { NextResponse } from 'next/server'

// Pending records are mirrored into a legacy public table. Fail closed until
// that separate moderation boundary has been reviewed and repaired.
export async function POST() {
  return NextResponse.json({ error: 'New listing submissions are temporarily unavailable while privacy protections are completed. Your entries have been kept.', code: 'intake_temporarily_unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
}
