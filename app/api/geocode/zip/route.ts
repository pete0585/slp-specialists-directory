import { NextRequest, NextResponse } from 'next/server'

const ZIP_DATA: Record<string, { city: string; state: string; state_abbr: string; lat: number; lng: number }> = {
  '10001': { city: 'New York', state: 'New York', state_abbr: 'NY', lat: 40.7484, lng: -73.9967 },
  '90210': { city: 'Beverly Hills', state: 'California', state_abbr: 'CA', lat: 34.0901, lng: -118.4065 },
  '60601': { city: 'Chicago', state: 'Illinois', state_abbr: 'IL', lat: 41.8858, lng: -87.6181 },
  '77001': { city: 'Houston', state: 'Texas', state_abbr: 'TX', lat: 29.7499, lng: -95.3677 },
  '85001': { city: 'Phoenix', state: 'Arizona', state_abbr: 'AZ', lat: 33.4484, lng: -112.0740 },
  '78201': { city: 'San Antonio', state: 'Texas', state_abbr: 'TX', lat: 29.4241, lng: -98.4936 },
}

export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get('zip')
  if (!zip || !/^\d{5}$/.test(zip)) return NextResponse.json({ error: 'Invalid zip' }, { status: 400 })
  if (ZIP_DATA[zip]) return NextResponse.json(ZIP_DATA[zip])
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json&limit=1`, { headers: { 'User-Agent': 'FindSLPSpecialist.com/1.0' } })
    const data = await res.json()
    if (data.length > 0) {
      const r = data[0]
      const parts = (r.display_name as string).split(', ')
      return NextResponse.json({ city: parts[0], state: parts[parts.length - 3] ?? '', state_abbr: zip.slice(0, 2), lat: parseFloat(r.lat), lng: parseFloat(r.lon) })
    }
  } catch {}
  return NextResponse.json({ error: 'Zip code not found' }, { status: 404 })
}
