import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Video, CheckCircle, ShieldCheck, Star } from 'lucide-react'
import type { Listing } from '@/types'
import { truncate, parseSpecialties, getDisplayName } from '@/lib/utils'

export default function ListingCard({ listing, featured = false }: { listing: Listing; featured?: boolean }) {
  const isVerified = listing.plan_tier === 'verified'
  const isFeatured = listing.plan_tier === 'featured'
  const displayName = getDisplayName(listing)
  const specialties = parseSpecialties(listing.specialties)
  const credentials = listing.credentials ?? []

  return (
    <Link href={`/slp/${listing.slug}`} className={`card block p-5 group ${featured ? 'border-2 border-sky-200' : ''}`}>
      <div className="flex gap-4">
        <div className="shrink-0">
          {listing.photo_url ? (
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-mist-200">
              <Image src={listing.photo_url} alt={displayName} fill className="object-cover" sizes="64px" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 text-xl font-serif font-bold">
              {displayName.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-serif font-semibold text-slate-800 group-hover:text-sky-600 transition-colors truncate">{displayName}</h3>
              {credentials.length > 0 && (
                <p className="text-xs text-slate-500 mt-0.5">{credentials.join(', ')}</p>
              )}
            </div>
            <div className="shrink-0">
              {isFeatured && <span className="badge-featured"><Star className="h-3 w-3" />Featured</span>}
              {!isFeatured && isVerified && <span className="badge-verified"><ShieldCheck className="h-3 w-3" />Verified</span>}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-sky-400" />
            <span>{listing.city}, {listing.state}</span>
          </div>
          {listing.bio && (
            <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">{truncate(listing.bio, 120)}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {listing.telehealth && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-600">
                <Video className="h-3 w-3" />Telehealth
              </span>
            )}
            {listing.accepting_new_clients && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">
                <CheckCircle className="h-3 w-3" />Accepting clients
              </span>
            )}
            {(listing.insurance_accepted ?? []).length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">Insurance accepted</span>
            )}
          </div>
          {specialties.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {specialties.slice(0, 3).map((s) => (
                <span key={s} className="rounded-full bg-teal-50 px-2 py-0.5 text-xs text-teal-600">{s}</span>
              ))}
              {specialties.length > 3 && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">+{specialties.length - 3} more</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
