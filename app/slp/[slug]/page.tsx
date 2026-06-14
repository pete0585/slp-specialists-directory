import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ListingDetail from '@/components/ListingDetail'
import { getListingBySlug } from '@/lib/data'
import { getDisplayName, parseSpecialties } from '@/lib/utils'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) return { title: 'SLP Not Found' }
  const displayName = getDisplayName(listing)
  const credentials = (listing.credentials ?? []).join(', ')
  const specialties = parseSpecialties(listing.specialties)
  const credStr = credentials ? ` ${credentials}` : ''
  const specStr = specialties.length > 0 ? ` Specializes in ${specialties.slice(0, 2).join(', ')}.` : ''
  return {
    title: `${displayName}${credStr} — ${listing.city}, ${listing.state} Speech Therapist`,
    description: `Find ${displayName} in ${listing.city}, ${listing.state}.${specStr} ${listing.telehealth ? 'Telehealth available.' : ''} ${listing.accepting_new_clients ? 'Accepting new clients.' : ''}`.trim(),
    openGraph: { title: `${displayName} — Speech-Language Pathologist in ${listing.city}, ${listing.state}`, description: `SLP profile for ${displayName} in ${listing.city}, ${listing.state}.` },
  }
}

export default async function SLPDetailPage({ params }: Props) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) notFound()
  const displayName = getDisplayName(listing)
  const specialties = parseSpecialties(listing.specialties)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: displayName,
    description: listing.bio ?? `Speech-language pathologist in ${listing.city}, ${listing.state}`,
    address: { '@type': 'PostalAddress', addressLocality: listing.city, addressRegion: listing.state, postalCode: listing.zip ?? '' },
    telephone: listing.phone ?? undefined,
    url: listing.website ?? undefined,
    ...(listing.photo_url ? { image: listing.photo_url } : {}),
    knowsAbout: specialties,
    medicalSpecialty: 'Speech-Language Pathology',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-mist-100">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/listings" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
              <ArrowLeft className="h-4 w-4" />Back to results
            </Link>
          </div>
          <ListingDetail listing={listing} />
        </div>
      </div>
    </>
  )
}
