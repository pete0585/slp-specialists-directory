import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_auth', 'true', { httpOnly: true, secure: true, maxAge: 86400 * 7 })
  return response
}
