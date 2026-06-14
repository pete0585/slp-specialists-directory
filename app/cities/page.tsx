import type { Metadata } from 'next'
import Link from 'next/link'
import { getCitiesWithCounts } from '@/lib/data'
import { cityStateToSlug } from '@/lib/utils'

export const metadata: Metadata = { title: 'Browse Speech Therapists by City', description: 'Find speech-language pathologists in cities across the US.' }

export default async function CitiesPage() {
  const cities = await getCitiesWithCounts(200)
  const grouped: Record<string, typeof cities> = {}
  cities.forEach(c => { const letter = c.city.charAt(0).toUpperCase(); if (!grouped[letter]) grouped[letter] = []; grouped[letter].push(c) })

  return (
    <div className="min-h-screen bg-mist-100">
      <div className="bg-sky-600 py-12 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Browse SLPs by City</h1>
        <p className="text-sky-100">Find speech therapists in cities across the United States.</p>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {cities.length === 0 ? (
          <p className="text-center text-slate-500 py-12">Cities will appear here as our directory grows.</p>
        ) : (
          Object.entries(grouped).sort().map(([letter, cs]) => (
            <div key={letter} className="mb-8">
              <h2 className="font-serif text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">{letter}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cs.map(c => (
                  <Link key={`${c.city}-${c.state}`} href={`/find/${c.state.toLowerCase()}/${cityStateToSlug(c.city, c.state)}`} className="rounded-xl bg-white px-3 py-2.5 shadow-soft hover:shadow-card transition-shadow group">
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-sky-600 transition-colors">{c.city}</p>
                    <p className="text-xs text-slate-400">{c.state} · {c.count} SLP{c.count !== 1 ? 's' : ''}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
