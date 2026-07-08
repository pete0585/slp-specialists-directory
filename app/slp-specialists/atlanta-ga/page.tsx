import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Speech-Language Pathologist in Atlanta, GA | SLP Specialist Directory',
  description:
    'Find speech-language pathologists in Atlanta, GA. Browse SLPs specializing in pediatric language, stuttering, voice disorders, aphasia, dysphagia, and AAC across the Atlanta metro.',
  alternates: { canonical: 'https://www.slpspecialistdirectory.com/slp-specialists/atlanta-ga' },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Georgia Medicaid cover speech therapy in Atlanta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Georgia Medicaid (Georgia Gateway) covers SLP services for children and adults when medically necessary. Georgia\'s IDEA Part C program provides early intervention services including SLP for eligible children under age 3. School-age children receive SLP through Atlanta Public Schools and surrounding county school district special education programs. Adult Medicaid enrollees can access SLP through hospital outpatient programs that accept Georgia Medicaid.',
      },
    },
    {
      '@type': 'Question',
      name: 'What SLP services does Children\'s Healthcare of Atlanta (CHOA) offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Children\'s Healthcare of Atlanta is one of the Southeast\'s leading pediatric health systems, with comprehensive SLP services including: feeding and swallowing evaluation and therapy, augmentative and alternative communication (AAC) programs, autism communication support, voice and fluency treatment, and neurological communication disorders. CHOA has SLP services at multiple Atlanta locations. Waitlists for specialized pediatric SLP at CHOA can be long — private practice alternatives can often provide faster access.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there stuttering-focused SLPs in Atlanta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Atlanta has several SLPs who specialize in fluency disorders and stuttering treatment, including evidence-based approaches like the Lidcombe Program (for young children), PFSP (Precision Fluency Shaping Program), and acceptance-based stuttering therapy for adults and teens. The National Stuttering Association has a Georgia chapter with Atlanta-area connections — they can refer to local specialists. Telehealth stuttering therapy has also expanded access to specialized fluency treatment in Atlanta.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a pediatric SLP in the Atlanta suburbs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gwinnett County, Cobb County, and the Decatur area have active private-practice pediatric SLP communities. Dunwoody, Alpharetta, and Johns Creek in North Fulton have concentrations of pediatric therapy practices. Many suburban Atlanta SLP practices offer both in-clinic and school-based consultation services. Search this directory by zip code or city to find SLPs convenient to your location in the metro.',
      },
    },
  ],
}

export default async function AtlantaSLPPage() {
  const listings = await getListingsByCity('Atlanta', 'GA', 20).catch(() => [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span>/</span>
          <Link href="/find" className="hover:text-brand">Find an SLP</Link>
          <span>/</span>
          <Link href="/states/ga" className="hover:text-brand">Georgia</Link>
          <span>/</span>
          <span className="text-gray-700">Atlanta</span>
        </nav>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-2 text-blue-600 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Atlanta, GA</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            Find a Speech-Language Pathologist in Atlanta, GA
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Atlanta's speech-language pathology market serves a large and growing metropolitan population across Fulton, DeKalb, Gwinnett, and Cobb counties. Emory University Hospital and Children's Healthcare of Atlanta (CHOA) have nationally respected SLP programs. The region's large stroke population, active pediatric early intervention network, and growing private practice community make Atlanta one of the Southeast's most active SLP markets.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+ SLPs listed` : 'SLPs listed'}</span>
            <span>·</span>
            <span>Pediatric &amp; adult specialties</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Speech-Language Pathologists in Atlanta, GA
              </h2>
              <Link
                href="/listings?state=GA"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                All Georgia SLPs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center mb-12">
            <p className="text-gray-500 mb-4">Browse all Georgia SLPs while we add more Atlanta listings.</p>
            <Link
              href="/listings?state=GA"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700"
            >
              Search Georgia SLPs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Speech Therapy in Atlanta: Common Questions
          </h2>
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

        <div className="bg-blue-600 rounded-2xl p-8 text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2">
            Are you an SLP in Atlanta?
          </h2>
          <p className="text-blue-100 text-sm mb-5 max-w-lg mx-auto">
            Get found by patients and families searching for speech therapy in Atlanta. Free listing — add your profile today.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
          >
            Add Your Profile &#x2192;
          </Link>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=GA" className="text-sm text-blue-600 hover:opacity-80 font-medium">All Georgia SLPs &#x2192;</Link>
            <Link href="/specialties/pediatric-speech-therapy" className="text-sm text-blue-600 hover:opacity-80 font-medium">Pediatric Speech Therapy &#x2192;</Link>
            <Link href="/specialties/dysphagia" className="text-sm text-blue-600 hover:opacity-80 font-medium">Swallowing Disorders (Dysphagia) &#x2192;</Link>
            <Link href="/specialties/stuttering" className="text-sm text-blue-600 hover:opacity-80 font-medium">Stuttering Treatment &#x2192;</Link>
          </div>
        </div>
      </div>
    </>
  )
}
