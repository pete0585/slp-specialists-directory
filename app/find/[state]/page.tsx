import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCitiesByState } from '@/lib/data'
import { stateAbbreviationToName, cityStateToSlug } from '@/lib/utils'

interface Props { params: Promise<{ state: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const stateAbbr = state.toUpperCase()
  const stateName = stateAbbreviationToName(stateAbbr)
  return { title: `Speech Therapists in ${stateName}`, description: `Find speech-language pathologists across ${stateName}. Browse by city and specialty.` }
}

export default async function StatePage({ params }: Props) {
  const { state } = await params
  const stateAbbr = state.toUpperCase()
  const stateName = stateAbbreviationToName(stateAbbr)
  const cities = await getCitiesByState(stateAbbr)

  return (
    <div className="min-h-screen bg-mist-100">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6"><Link href="/states" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"><ArrowLeft className="h-4 w-4" />All states</Link></div>
        <h1 className="font-serif text-3xl font-bold text-slate-800 mb-2">Speech Therapists in {stateName}</h1>
        <p className="text-slate-500 mb-8">{cities.length > 0 ? `${cities.length} cities with speech-language pathologists in ${stateName}.` : `No listings yet in ${stateName}. Check back as our directory grows.`}</p>
        {cities.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cities.map(c => (
              <Link key={`${c.city}-${c.state}`} href={`/find/${state}/${cityStateToSlug(c.city, c.state)}`} className="rounded-xl bg-white px-4 py-3 shadow-soft hover:shadow-card transition-shadow group">
                <p className="text-sm font-semibold text-slate-700 group-hover:text-sky-600 transition-colors">{c.city}</p>
                <p className="text-xs text-slate-400 mt-0.5">{c.count} SLP{c.count !== 1 ? 's' : ''}</p>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-8 text-center"><Link href="/listings" className="btn-secondary">Search all speech therapists</Link></div>
      </div>
    </div>
  )
}
