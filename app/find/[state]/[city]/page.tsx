import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import EmailCapture from '@/components/EmailCapture'
import { getListingsByCity } from '@/lib/data'
import { stateAbbreviationToName } from '@/lib/utils'

interface Props { params: Promise<{ state: string; city: string }> }

function decodeCity(citySlug: string): string {
  return citySlug.replace(/-[a-z]{2}$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params
  const stateAbbr = state.toUpperCase()
  const cityName = decodeCity(city)
  const stateName = stateAbbreviationToName(stateAbbr)
  return {
    title: `Speech Therapists in ${cityName}, ${stateAbbr}`,
    description: `Find speech-language pathologists in ${cityName}, ${stateName}. Search by specialty — apraxia, autism/AAC, feeding therapy, aphasia, and more.`,
  }
}

export default async function CityPage({ params }: Props) {
  const { state, city } = await params
  const stateAbbr = state.toUpperCase()
  const cityName = decodeCity(city)
  const stateName = stateAbbreviationToName(stateAbbr)
  const listings = await getListingsByCity(cityName, stateAbbr, 30)

  return (
    <div className="min-h-screen bg-mist-100">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href={`/find/${state}`} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"><ArrowLeft className="h-4 w-4" />Back to {stateName}</Link>
        </div>
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-slate-800 mb-2">Speech Therapists in {cityName}, {stateAbbr}</h1>
          <p className="text-slate-500">{listings.length > 0 ? `${listings.length} speech-language pathologist${listings.length !== 1 ? 's' : ''} found in ${cityName}, ${stateName}.` : `No speech therapists found yet in ${cityName}. Check back as our directory grows.`}</p>
        </div>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
            {listings.map(listing => <ListingCard key={listing.id} listing={listing} />)}
          </div>
        ) : null}
        <EmailCapture city={cityName} />
        <div className="mt-8 text-center">
          <Link href="/listings" className="btn-secondary">Search all speech therapists</Link>
        </div>
      </div>
    </div>
  )
}
