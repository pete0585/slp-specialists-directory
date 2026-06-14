import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Search, Star, ArrowRight, Video, CheckCircle } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import { getFeaturedListings, getTotalListingCount } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Speech-Language Pathologist Near You | FindSLPSpecialist.com',
  description: 'Find a speech-language pathologist who specializes in exactly what you need — apraxia, autism/AAC, feeding therapy, aphasia, stuttering, and more. Free to search.',
}

const TOP_CITIES = [
  { name: 'New York', state: 'NY', slug: 'new-york-ny' },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca' },
  { name: 'Chicago', state: 'IL', slug: 'chicago-il' },
  { name: 'Houston', state: 'TX', slug: 'houston-tx' },
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix-az' },
  { name: 'Austin', state: 'TX', slug: 'austin-tx' },
  { name: 'Denver', state: 'CO', slug: 'denver-co' },
  { name: 'Seattle', state: 'WA', slug: 'seattle-wa' },
  { name: 'Miami', state: 'FL', slug: 'miami-fl' },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta-ga' },
  { name: 'Boston', state: 'MA', slug: 'boston-ma' },
  { name: 'San Diego', state: 'CA', slug: 'san-diego-ca' },
]

const SPECIALTY_HIGHLIGHTS = [
  { label: 'Childhood Apraxia', href: '/specialties/childhood-apraxia', emoji: '🗣️' },
  { label: 'Autism / AAC', href: '/specialties/autism-aac', emoji: '💬' },
  { label: 'Pediatric Feeding', href: '/specialties/pediatric-feeding', emoji: '🍼' },
  { label: 'Aphasia', href: '/specialties/aphasia', emoji: '🧠' },
  { label: 'Stuttering', href: '/specialties/stuttering', emoji: '🎯' },
  { label: 'Telehealth SLPs', href: '/listings?telehealth=true', emoji: '💻' },
  { label: 'Voice Disorders', href: '/listings?specialty=Voice+Disorders', emoji: '🎤' },
  { label: 'Dysphagia', href: '/listings?specialty=Dysphagia+%28Adult%29', emoji: '⚕️' },
]

export default async function HomePage() {
  const [featured, listingCount] = await Promise.all([
    getFeaturedListings(6).catch(() => []),
    getTotalListingCount().catch(() => 0),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-mist pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-4 py-2 text-sm text-sky-600 mb-6">
            <Search className="h-4 w-4" />
            <span>{listingCount > 0 ? `${listingCount.toLocaleString()} speech-language pathologists in the US` : 'The SLP directory that finds specialists, not just generalists'}</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-slate-800 leading-tight sm:text-5xl md:text-6xl text-balance">
            Find an SLP who specializes in{' '}
            <span className="text-sky-500">exactly what you need</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Finding a speech therapist is easy. Finding one who specializes in childhood apraxia, autism/AAC, pediatric feeding, or aphasia is hard. We fix that.
          </p>
          <div className="mt-8 flex justify-center">
            <SearchBar size="large" />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Video className="h-4 w-4 text-sky-400" />Telehealth available</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-sky-400" />Insurance filters</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-teal-500" />Verified credentials</span>
          </div>
        </div>
      </section>

      {/* Why this directory */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 mx-auto mb-4"><ShieldCheck className="h-7 w-7 text-sky-600" /></div>
              <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Specialty-First Search</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Unlike ASHA ProFind or Healthgrades, we let you search by condition — not just by zip code. Find an SLP who specifically treats childhood apraxia, not just any SLP within 10 miles.</p>
            </div>
            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 mx-auto mb-4"><Star className="h-7 w-7 text-teal-500" /></div>
              <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Individual SEO Pages</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Every SLP gets their own searchable profile page. When a parent Googles "apraxia speech therapist Austin TX," this directory shows up — because we build the pages that rank for those searches.</p>
            </div>
            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist-200 mx-auto mb-4"><Search className="h-7 w-7 text-slate-500" /></div>
              <h3 className="font-serif text-xl font-semibold text-slate-800 mb-2">Free to Search</h3>
              <p className="text-sm text-slate-500 leading-relaxed">No account required. No association membership gate. Search by city, state, insurance, and specialty — completely free. No ASHA membership needed to appear in results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by specialty */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-mist-100">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="section-heading">What are you looking for?</h2>
            <p className="section-subheading">Find a speech-language pathologist who specializes in your specific need.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {SPECIALTY_HIGHLIGHTS.map((s) => (
              <Link key={s.label} href={s.href} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-soft hover:shadow-card transition-shadow group">
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-sky-600 transition-colors leading-tight">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      {featured.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="section-heading">Featured Speech Therapists</h2>
                <p className="section-subheading">Verified, specialty-focused, and accepting new clients.</p>
              </div>
              <Link href="/listings" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-sky-500 hover:text-sky-600">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((listing) => <ListingCard key={listing.id} listing={listing} featured />)}
            </div>
          </div>
        </section>
      )}

      {/* Browse by city */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-mist-100">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="section-heading">Search by City</h2>
            <p className="section-subheading">Speech-language pathologists serving families across the country.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOP_CITIES.map((city) => (
              <Link key={city.slug} href={`/find/${city.state.toLowerCase()}/${city.slug}`} className="rounded-xl bg-white px-3 py-3 text-center shadow-soft hover:shadow-card transition-shadow group">
                <p className="text-sm font-semibold text-slate-700 group-hover:text-sky-600 transition-colors">{city.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{city.state}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/cities" className="btn-secondary">Browse all cities <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/states" className="btn-secondary">Browse by state <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* For SLPs CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-sky-600">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Are you a speech-language pathologist in private practice?</h2>
          <p className="text-sky-100 text-lg mb-8 leading-relaxed">
            Get a free listing on the only nationwide directory built to capture specialty-specific searches. Verified listings start at $99/year — one new patient more than covers it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-sky-600 hover:bg-sky-50 transition-colors">Get Listed Free</Link>
            <Link href="/submit#pricing" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-4 text-base font-semibold text-white hover:border-white transition-colors">View Pricing</Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-10 px-4 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-400" />Free to search, always</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal-500" />Credential-verified listings</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-sky-400" />Specialty-first search</span>
          </div>
        </div>
      </section>
    </div>
  )
}
