import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import { getDisplayName } from '@/lib/utils'
import ClaimPageClient from './client'

interface Props { params: Promise<{ id: string }>; searchParams: Promise<{ verified?: string; upgraded?: string; tier?: string }> }

export const metadata: Metadata = { title: 'Claim Your SLP Listing', description: 'Claim and manage your speech-language pathologist listing on FindSLPSpecialist.com.' }

export default async function ClaimPage({ params, searchParams }: Props) {
  const { id } = await params
  const sp = await searchParams
  const supabase = await createServiceClient()
  const { data: listing } = await supabase.from('slp_specialists_listings').select('*').eq('id', id).single()
  if (!listing) notFound()
  return <ClaimPageClient listing={listing} verified={sp.verified === 'true'} upgraded={sp.upgraded === 'true'} upgradedTier={sp.tier} />
}
