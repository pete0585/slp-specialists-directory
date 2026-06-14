import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Globe, Video, CheckCircle, ShieldCheck, Star, Mail } from 'lucide-react'
import type { Listing } from '@/types'
import { parseSpecialties, getDisplayName, formatPhone } from '@/lib/utils'

export default function ListingDetail({ listing }: { listing: Listing }) {
  const displayName = getDisplayName(listing)
  const specialties = parseSpecialties(listing.specialties)
  const credentials = listing.credentials ?? []
  const insurance = listing.insurance_accepted ?? []
  const languages = listing.languages ?? []
  const isFeatured = listing.plan_tier === 'featured'
  const isVerified = listing.plan_tier === 'verified' || isFeatured
  const isPaid = listing.plan_tier !== 'free'

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="shrink-0">
            {listing.photo_url ? (
              <div className="relative h-32 w-32 rounded-2xl overflow-hidden bg-mist-200">
                <Image src={listing.photo_url} alt={displayName} fill className="object-cover" sizes="128px" />
              </div>
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 text-4xl font-serif font-bold">{displayName.charAt(0)}</div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <h1 className="font-serif text-2xl font-bold text-slate-800">{displayName}</h1>
              {isFeatured && <span className="badge-featured mt-1"><Star className="h-3 w-3" />Featured SLP</span>}
              {!isFeatured && isVerified && <span className="badge-verified mt-1"><ShieldCheck className="h-3 w-3" />Verified SLP</span>}
            </div>
            {credentials.length > 0 && <p className="text-slate-600 font-medium mb-2">{credentials.join(', ')}</p>}
            <div className="flex items-center gap-1.5 text-slate-500 mb-3">
              <MapPin className="h-4 w-4 text-sky-400 shrink-0" />
              <span>{listing.city}, {listing.state}{listing.zip ? ` ${listing.zip}` : ''}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {listing.telehealth && <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"><Video className="h-3 w-3" />Telehealth available</span>}
              {listing.accepting_new_clients && <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"><CheckCircle className="h-3 w-3" />Accepting new clients</span>}
            </div>
          </div>
        </div>
        {listing.bio && <div className="mt-6 pt-6 border-t border-slate-100"><p className="text-slate-600 leading-relaxed">{listing.bio}</p></div>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {specialties.length > 0 && (
          <div className="card p-6">
            <h2 className="font-serif text-lg font-semibold text-slate-800 mb-3">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {specialties.map(s => <span key={s} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">{s}</span>)}
            </div>
          </div>
        )}
        {insurance.length > 0 && (
          <div className="card p-6">
            <h2 className="font-serif text-lg font-semibold text-slate-800 mb-3">Insurance Accepted</h2>
            <div className="flex flex-wrap gap-2">
              {insurance.map(i => <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{i}</span>)}
            </div>
          </div>
        )}
      </div>

      {isPaid && (listing.phone || listing.email || listing.website) && (
        <div className="card p-6 mb-6">
          <h2 className="font-serif text-lg font-semibold text-slate-800 mb-4">Contact Information</h2>
          <div className="space-y-3">
            {listing.phone && <a href={`tel:${listing.phone}`} className="flex items-center gap-3 text-slate-700 hover:text-sky-600 transition-colors"><Phone className="h-4 w-4 text-sky-400 shrink-0" />{formatPhone(listing.phone)}</a>}
            {listing.email && <a href={`mailto:${listing.email}`} className="flex items-center gap-3 text-slate-700 hover:text-sky-600 transition-colors"><Mail className="h-4 w-4 text-sky-400 shrink-0" />{listing.email}</a>}
            {listing.website && <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 hover:text-sky-600 transition-colors"><Globe className="h-4 w-4 text-sky-400 shrink-0" />{listing.website.replace(/^https?:\/\//, '')}</a>}
          </div>
        </div>
      )}

      {languages.length > 0 && (
        <div className="card p-6 mb-6">
          <h2 className="font-serif text-lg font-semibold text-slate-800 mb-3">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {languages.map(l => <span key={l} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">{l}</span>)}
          </div>
        </div>
      )}

      {!listing.claimed && (
        <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6 mb-6">
          <h3 className="font-serif text-lg font-semibold text-slate-800 mb-2">Is this your listing?</h3>
          <p className="text-sm text-slate-600 mb-4">Claim your free listing to add your contact info, bio, and specialties. One new patient more than covers the cost of upgrading.</p>
          <Link href={`/claim/${listing.id}`} className="btn-primary">Claim This Listing</Link>
        </div>
      )}
    </div>
  )
}
