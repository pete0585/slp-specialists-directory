import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Stuttering Specialists Near You | FindSLPSpecialist.com',
  description: 'Find speech-language pathologists who specialize in stuttering and fluency disorders. Search for Board Certified Specialists in Fluency (BCS-F) near you.',
}

export default async function StutteringPage() {
  const { listings } = await getListings({ specialty: 'Stuttering & Fluency Disorders', pageSize: 9 })
  return (
    <div className="min-h-screen bg-mist-100">
      <div className="bg-sky-600 py-16 px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-white mb-3">Stuttering & Fluency Specialists</h1>
        <p className="text-sky-100 max-w-2xl mx-auto">Find SLPs who specialize in stuttering and fluency disorders for children and adults. Includes Board Certified Specialists in Fluency (BCS-F).</p>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : <p className="text-center text-slate-500 py-12">Loading fluency specialists — check back as our directory grows.</p>}
        <div className="text-center">
          <Link href="/listings?specialty=Stuttering+%26+Fluency+Disorders" className="btn-primary">See All Stuttering Specialists</Link>
        </div>
      </div>
    </div>
  )
}
