import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Speech-Language Pathologist in Los Angeles, CA | SLP Specialist Directory',
  description:
    'Find speech-language pathologists in Los Angeles, CA. Browse SLPs specializing in pediatric language, stuttering, voice disorders, aphasia, dysphagia, and AAC across the Los Angeles metro.',
  alternates: { canonical: 'https://www.slpspecialistdirectory.com/slp-specialists/los-angeles-ca' },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are there voice SLPs in Los Angeles for performers and entertainers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — LA has a specialized niche of SLPs focused on professional voice users: actors, singers, broadcasters, voice-over artists, and on-camera talent. Several LA SLP practices have specific expertise in performance voice care, vocal health maintenance, and rehabilitating voice disorders that affect professional speaking and singing. SLPs in this area often collaborate with laryngologists (voice-specialized ENTs) at academic centers like UCLA or Cedars-Sinai.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does California Medicaid (Medi-Cal) cover speech therapy in Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Medi-Cal covers speech-language pathology services when medically necessary, for both children and adults. Children under 3 may qualify for the California Early Start program for early intervention SLP. School-age children receive SLP through LAUSD\'s special education program. Adult Medi-Cal enrollees can access SLP through participating outpatient and hospital-based programs. Private pay and commercial insurance SLPs are also widely available throughout LA.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a multilingual SLP in Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LA\'s diversity means bilingual and multilingual SLPs are more available here than in most US markets. Spanish, Korean, Mandarin, Cantonese, Armenian, Farsi, and Tagalog are among the languages available from LA SLPs. Search this directory with language filters or contact practices directly to ask about multilingual therapists. For less common languages, university programs or hospital-based SLP departments may have access to trained bilingual therapy assistants.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas of LA have the most speech therapists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Westside (Santa Monica, West LA, Brentwood) and San Fernando Valley (Sherman Oaks, Woodland Hills, Studio City) have high concentrations of private-practice SLPs. South Bay (Torrance, Redondo Beach) and the SGV (Pasadena, Arcadia, Alhambra) also have active SLP communities. Downtown and East LA are underserved relative to population — patients in these areas often access SLP through hospital outpatient programs like Keck Medicine or LA County facilities.',
      },
    },
  ],
}

export default async function LosAngelesSLPPage() {
  const listings = await getListingsByCity('Los Angeles', 'CA', 20).catch(() => [])

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
          <Link href="/states/ca" className="hover:text-brand">California</Link>
          <span>/</span>
          <span className="text-gray-700">Los Angeles</span>
        </nav>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-2 text-blue-600 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Los Angeles, CA</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            Find a Speech-Language Pathologist in Los Angeles, CA
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Los Angeles has one of the largest and most diverse speech-language pathology markets in the country, serving a multilingual, multicultural population across sprawling geography. UCLA Health, Cedars-Sinai, and USC Keck Medicine all have major SLP programs. The entertainment industry creates unique demand for voice care — performers, actors, singers, and on-camera talent represent a meaningful LA market segment for voice SLPs and vocal health practitioners.
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
                Speech-Language Pathologists in Los Angeles, CA
              </h2>
              <Link
                href="/listings?state=CA"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                All California SLPs <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Browse all California SLPs while we add more Los Angeles listings.</p>
            <Link
              href="/listings?state=CA"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700"
            >
              Search California SLPs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Speech Therapy in Los Angeles: Common Questions
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
            Are you an SLP in Los Angeles?
          </h2>
          <p className="text-blue-100 text-sm mb-5 max-w-lg mx-auto">
            Get found by patients and families searching for speech therapy in Los Angeles. Free listing — add your profile today.
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
            <Link href="/listings?state=CA" className="text-sm text-blue-600 hover:opacity-80 font-medium">All California SLPs &#x2192;</Link>
            <Link href="/specialties/pediatric-speech-therapy" className="text-sm text-blue-600 hover:opacity-80 font-medium">Pediatric Speech Therapy &#x2192;</Link>
            <Link href="/specialties/dysphagia" className="text-sm text-blue-600 hover:opacity-80 font-medium">Swallowing Disorders (Dysphagia) &#x2192;</Link>
            <Link href="/specialties/stuttering" className="text-sm text-blue-600 hover:opacity-80 font-medium">Stuttering Treatment &#x2192;</Link>
          </div>
        </div>
      </div>
    </>
  )
}
