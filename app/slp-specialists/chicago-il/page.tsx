import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Speech-Language Pathologist in Chicago, IL | SLP Specialist Directory',
  description:
    'Find speech-language pathologists in Chicago, IL. Browse SLPs specializing in pediatric language, stuttering, voice disorders, aphasia, dysphagia, and AAC across the Chicago metro.',
  alternates: { canonical: 'https://www.slpspecialistdirectory.com/slp-specialists/chicago-il' },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Illinois Medicaid cover speech therapy in Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Illinois Medicaid (the Medical Assistance Program) covers speech-language pathology services for both children and adults when medically necessary. For children, early intervention (EI) services cover SLP for eligible children under age 3 through Illinois\' Early Intervention Program. School-age children receive SLP through Chicago Public Schools\' special education programs. Adults on Illinois Medicaid can access SLP through hospital outpatient and rehab programs accepting Medicaid.',
      },
    },
    {
      '@type': 'Question',
      name: 'What speech disorders do Chicago SLPs commonly treat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chicago SLPs treat the full range of communication and swallowing disorders: aphasia and communication disorders after stroke (very common given the aging population), pediatric speech sound disorders and language delays, stuttering, voice disorders (nodules, vocal cord dysfunction), dysphagia (swallowing disorders) in both acute hospital and outpatient settings, AAC (augmentative and alternative communication) for nonverbal patients, and accent modification services serving Chicago\'s professional and international business community.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there pediatric speech therapists in Chicago for autism and developmental delays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Chicago has a strong pediatric SLP community serving children with autism, Down syndrome, developmental language disorders, and other complex needs. Organizations like Lurie Children\'s Hospital, LaRabida Children\'s Hospital, and a large private practice ecosystem serve pediatric populations across the metro. Chicago\'s Early Intervention Program also provides SLP for eligible children under age 3.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a bilingual SLP in Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chicago\'s diverse population creates high demand for bilingual SLPs — particularly Spanish, Polish, Arabic, Mandarin, and Tagalog. Some Chicago SLP practices specifically serve multilingual communities. When searching this directory, filter for language and look for therapists who list Spanish or other languages. Bilingual SLP waitlists can be long — if you need a specific language, contact potential practices early and ask about their waitlist status.',
      },
    },
  ],
}

export default async function ChicagoSLPPage() {
  const listings = await getListingsByCity('Chicago', 'IL', 20).catch(() => [])

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
          <Link href="/states/il" className="hover:text-brand">Illinois</Link>
          <span>/</span>
          <span className="text-gray-700">Chicago</span>
        </nav>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-2 text-blue-600 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Chicago, IL</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            Find a Speech-Language Pathologist in Chicago, IL
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Chicago's speech-language pathology market is one of the Midwest's largest, serving a diverse population across multiple languages and cultures. Northwestern Medicine's Roxelyn and Richard Pepper Department of Communication Sciences and Disorders and Rush University Medical Center both have established SLP programs. Chicago's public school system employs hundreds of school SLPs, while a robust private practice community serves adults with communication disorders, swallowing difficulties, and voice conditions.
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
                Speech-Language Pathologists in Chicago, IL
              </h2>
              <Link
                href="/listings?state=IL"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                All Illinois SLPs <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Browse all Illinois SLPs while we add more Chicago listings.</p>
            <Link
              href="/listings?state=IL"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700"
            >
              Search Illinois SLPs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Speech Therapy in Chicago: Common Questions
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
            Are you an SLP in Chicago?
          </h2>
          <p className="text-blue-100 text-sm mb-5 max-w-lg mx-auto">
            Get found by patients and families searching for speech therapy in Chicago. Free listing — add your profile today.
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
            <Link href="/listings?state=IL" className="text-sm text-blue-600 hover:opacity-80 font-medium">All Illinois SLPs &#x2192;</Link>
            <Link href="/specialties/pediatric-speech-therapy" className="text-sm text-blue-600 hover:opacity-80 font-medium">Pediatric Speech Therapy &#x2192;</Link>
            <Link href="/specialties/dysphagia" className="text-sm text-blue-600 hover:opacity-80 font-medium">Swallowing Disorders (Dysphagia) &#x2192;</Link>
            <Link href="/specialties/stuttering" className="text-sm text-blue-600 hover:opacity-80 font-medium">Stuttering Treatment &#x2192;</Link>
          </div>
        </div>
      </div>
    </>
  )
}
