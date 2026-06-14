import { createClient } from './supabase/server'
import { tierRank } from './utils'
import type { Listing } from '@/types'

const TABLE = 'slp_specialists_listings'

function sortByTier(listings: Listing[]): Listing[] {
  return [...listings].sort((a, b) => tierRank(a.plan_tier) - tierRank(b.plan_tier))
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data } = await supabase.from(TABLE).select('*').eq('slug', slug).single()
  return data
}

export async function getListings({
  state, city, specialty, insurance, telehealth, acceptingNew, search, tier,
  page = 1, pageSize = 20,
}: {
  state?: string; city?: string; specialty?: string; insurance?: string
  telehealth?: boolean; acceptingNew?: boolean; search?: string; tier?: string
  page?: number; pageSize?: number
}): Promise<{ listings: Listing[]; total: number }> {
  const supabase = await createClient()
  let query = supabase.from(TABLE).select('*', { count: 'exact' }).not('is_active', 'is', false)

  if (state) query = query.ilike('state', state)
  if (city) query = query.ilike('city', city)
  if (specialty) query = query.ilike('specialties', `%${specialty}%`)
  if (insurance) query = query.contains('insurance_accepted', [insurance])
  if (telehealth === true) query = query.eq('telehealth', true)
  if (acceptingNew === true) query = query.eq('accepting_new_clients', true)
  if (tier) query = query.eq('plan_tier', tier)

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to).order('name', { ascending: true })

  const { data, count } = await query
  const listings = sortByTier(data ?? [])
  return { listings, total: count ?? 0 }
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase.from(TABLE).select('*')
    .not('is_active', 'is', false)
    .in('plan_tier', ['verified', 'featured'])
    .limit(limit)
    .order('name', { ascending: true })
  return sortByTier(data ?? [])
}

export async function getListingsByCity(city: string, state: string, limit = 20): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase.from(TABLE).select('*')
    .not('is_active', 'is', false)
    .ilike('city', city).ilike('state', state)
    .limit(limit).order('name', { ascending: true })
  return sortByTier(data ?? [])
}

export async function getCitiesByState(stateAbbr: string): Promise<{ city: string; state: string; count: number }[]> {
  const supabase = await createClient()
  const { data } = await supabase.from(TABLE).select('city,state')
    .not('is_active', 'is', false).ilike('state', stateAbbr)
  if (!data) return []
  const counts: Record<string, number> = {}
  data.forEach(r => { const key = `${r.city}|${r.state}`; counts[key] = (counts[key] ?? 0) + 1 })
  return Object.entries(counts)
    .map(([key, count]) => { const [city, state] = key.split('|'); return { city, state, count } })
    .sort((a, b) => b.count - a.count)
}

export async function getTotalListingCount(): Promise<number> {
  const supabase = await createClient()
  const { count } = await supabase.from(TABLE).select('*', { count: 'exact', head: true })
    .not('is_active', 'is', false)
  return count ?? 0
}

export async function getActiveStates(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase.from(TABLE).select('state').not('is_active', 'is', false)
  const states = Array.from(new Set((data ?? []).map((r: { state: string }) => r.state))).sort()
  return states
}

export async function getCitiesWithCounts(limit = 200): Promise<{ city: string; state: string; count: number }[]> {
  const supabase = await createClient()
  const { data } = await supabase.from(TABLE).select('city,state').not('is_active', 'is', false).limit(5000)
  if (!data) return []
  const counts: Record<string, { city: string; state: string; count: number }> = {}
  data.forEach(r => {
    const key = `${r.city}|${r.state}`
    if (!counts[key]) counts[key] = { city: r.city, state: r.state, count: 0 }
    counts[key].count++
  })
  return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, limit)
}
