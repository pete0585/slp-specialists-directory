import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Globe, Video, CheckCircle, Star, ArrowLeft, ShieldCheck } from 'lucide-react'
import { getListingBySlug } from '@/lib/data'
import { getDisplayName, parseSpecialties, formatPhone } from '@/lib/utils'
import ListingDetail from '@/components/ListingDetail'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)
  if (!listing) return { title: 'SLP Not Found' }

  const displayName = getDisplayName(listing)
  const credentials = (listing.credentials ?? []).join(', ')
  const specialties = parseSpecialties(listing.specialties)
  const credStr = credentials ? ` ${credentials}` : ''
  const specStr = specialties.length > 0 ? ` Specializes in ${specialties.slice(0, 2).join(', ')}.` : ''

  return {
    title: `${displayName}${credStr} — ${listing.city}, ${listing.state} Speech Therapist`,
    description: `Find ${displayName} in ${listing.city}, ${listing.state}.${specStr} ${listing.telehealth ? 'Telehealth available.' : ''} ${listing.accepting_new_clients ? 'Accepting new clients.' : ''}`.trim(),
    alternates: { canonical: `/listings/${slug}` },
    openGraph: {
      title: `${displayName} — Speech-Language Pathologist in ${listing.city}, ${listing.state}`,
      description: `SLP profile for ${displayName} in ${listing.city}, ${listing.state}.`,
    },
  }
}

export default async function SLPDetailPage({ params }: Props) {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)

  if (!listing) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/listings" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to directory
      </Link>

      <ListingDetail listing={listing} />

      {!listing.plan_tier || listing.plan_tier === 'free' ? (
        <div className="mt-8 rounded-2xl bg-sky-50 border border-sky-200 p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-sky-700">Is this your practice?</p>
            <p className="text-sm text-sky-600 mt-1">
              Claim your free listing to add contact info, get a verified badge, and be found by more patients.
            </p>
          </div>
          <Link href={`/claim/${listing.id}`} className="btn-primary shrink-0">
            Claim Listing
          </Link>
        </div>
      ) : null}
    </div>
  )
}
