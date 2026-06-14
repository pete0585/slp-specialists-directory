import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Aphasia Speech Therapists Near You | FindSLPSpecialist.com',
  description: 'Find speech-language pathologists who specialize in aphasia treatment after stroke. Search for aphasia SLPs by city and state.',
}

export default async function AphasiaPage() {
  const { listings } = await getListings({ specialty: 'Aphasia', pageSize: 9 })
  return (
    <div className="min-h-screen bg-mist-100">
      <div className="bg-sky-600 py-16 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-white mb-3">Aphasia Speech Therapists</h1>
        <p className="text-sky-100 max-w-2xl mx-auto">Find SLPs who specialize in aphasia treatment — whether from stroke, TBI, or progressive neurological disease. Telehealth options available nationwide.</p>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : <p className="text-center text-slate-500 py-12">Loading aphasia specialists — check back as our directory grows.</p>}
        <div className="text-center space-x-4">
          <Link href="/listings?specialty=Aphasia" className="btn-primary">See All Aphasia Specialists</Link>
          <Link href="/resources/aphasia-speech-therapy-guide" className="btn-secondary">Aphasia Guide</Link>
        </div>
      </div>
    </div>
  )
}
