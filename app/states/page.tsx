import type { Metadata } from 'next'
import Link from 'next/link'
import { getActiveStates } from '@/lib/data'
import { stateAbbreviationToName } from '@/lib/utils'

export const metadata: Metadata = { title: 'Browse Speech Therapists by State', description: 'Find speech-language pathologists in every US state.' }

export default async function StatesPage() {
  const states = await getActiveStates()
  return (
    <div className="min-h-screen bg-mist-100">
      <div className="bg-sky-600 py-12 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Browse SLPs by State</h1>
        <p className="text-sky-100">Find speech-language pathologists across the United States.</p>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {states.length === 0 ? (
          <p className="text-center text-slate-500 py-12">States will appear here as our directory grows.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {states.map(abbr => (
              <Link key={abbr} href={`/find/${abbr.toLowerCase()}`} className="rounded-xl bg-white px-4 py-3 shadow-soft hover:shadow-card transition-shadow group">
                <p className="text-sm font-semibold text-slate-700 group-hover:text-sky-600 transition-colors">{stateAbbreviationToName(abbr)}</p>
                <p className="text-xs text-slate-400">{abbr}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
