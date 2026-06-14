import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Childhood Apraxia of Speech Specialists Near You',
  description: 'Find speech-language pathologists who specialize in childhood apraxia of speech (CAS). Search by city and find PROMPT-certified and CAS-trained SLPs.',
}

export default async function ApraxiaSpecialtyPage() {
  const { listings } = await getListings({ specialty: 'Childhood Apraxia of Speech (CAS)', pageSize: 9 })
  return (
    <div className="min-h-screen bg-mist-100">
      <div className="bg-sky-600 py-16 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-white mb-3">Childhood Apraxia of Speech Specialists</h1>
        <p className="text-sky-100 max-w-2xl mx-auto">Speech-language pathologists with specialized training in Childhood Apraxia of Speech (CAS), including PROMPT-certified therapists and CASANA-trained clinicians.</p>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : <p className="text-center text-slate-500 py-12">Loading CAS specialists — check back as our directory grows.</p>}
        <div className="text-center space-x-4">
          <Link href="/listings?specialty=Childhood+Apraxia+of+Speech+%28CAS%29" className="btn-primary">See All CAS Specialists</Link>
          <Link href="/resources/speech-therapy-for-childhood-apraxia" className="btn-secondary">Guide to CAS</Link>
        </div>
      </div>
    </div>
  )
}
