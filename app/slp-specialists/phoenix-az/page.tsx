import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Speech-Language Pathologist in Phoenix, AZ | SLP Specialist Directory',
  description:
    'Find speech-language pathologists in Phoenix, AZ. Browse SLPs specializing in pediatric language, stuttering, voice disorders, aphasia, dysphagia, and AAC across the Phoenix metro.',
  alternates: { canonical: 'https://www.slpspecialistdirectory.com/slp-specialists/phoenix-az' },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Arizona Medicaid (AHCCCS) cover speech therapy in Phoenix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. AHCCCS (Arizona\'s Medicaid program) covers speech-language pathology services for children and adults when medically necessary. Children under age 3 may qualify for Arizona Early Intervention Program (AzEIP) services. School-age children receive SLP through Arizona public school special education programs. Adult AHCCCS enrollees can access SLP through outpatient and hospital-based programs that accept AHCCCS. Coverage details vary by AHCCCS managed care plan — verify with your plan before scheduling.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the most common reasons Phoenix adults see a speech therapist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Phoenix\'s large retiree population means adult SLP services focus heavily on: dysphagia (swallowing disorders after stroke or neurological disease), aphasia rehabilitation after stroke, cognitive communication disorders (memory, attention, problem-solving deficits after brain injury), voice disorders, and Parkinson\'s disease-related communication impairment. LSVT LOUD is a widely used Parkinson\'s voice treatment in Phoenix. Telehealth SLP has expanded access for Phoenix patients in outer Valley communities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there pediatric SLPs in Phoenix for autism and feeding disorders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Phoenix Children\'s Hospital has one of the Southwest\'s most comprehensive pediatric SLP programs, including specialized feeding and swallowing clinics, AAC programs, and autism communication support. The private practice SLP market in Scottsdale, Chandler, and Gilbert also serves pediatric populations with autism, language delays, and feeding difficulties. Demand for pediatric SLP in Phoenix consistently exceeds supply — expect waitlists for specialized services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a Spanish-speaking SLP in Phoenix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Phoenix\'s large Spanish-speaking population makes Spanish-English bilingual SLPs more available here than in most markets. Several Phoenix SLP practices advertise Spanish-language services. Search this directory for bilingual SLPs or contact practices directly to ask about Spanish-speaking therapists. For children with Spanish as a home language, a bilingual assessment is important to distinguish language difference from language disorder.',
      },
    },
  ],
}

export default async function PhoenixSLPPage() {
  const listings = await getListingsByCity('Phoenix', 'AZ', 20).catch(() => [])

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
          <Link href="/states/az" className="hover:text-brand">Arizona</Link>
          <span>/</span>
          <span className="text-gray-700">Phoenix</span>
        </nav>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-2 text-blue-600 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Phoenix, AZ</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            Find a Speech-Language Pathologist in Phoenix, AZ
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Phoenix is a rapidly growing SLP market driven by population growth, a large retiree and aging population, and a strong school district SLP workforce. Phoenix Children's Hospital has a nationally recognized SLP program for pediatric complex needs. The Mayo Clinic's Scottsdale campus and Banner Health both have adult SLP services for stroke, swallowing, and voice disorders. The Valley's private practice SLP community has grown substantially with the metro's population.
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
                Speech-Language Pathologists in Phoenix, AZ
              </h2>
              <Link
                href="/listings?state=AZ"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                All Arizona SLPs <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Browse all Arizona SLPs while we add more Phoenix listings.</p>
            <Link
              href="/listings?state=AZ"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700"
            >
              Search Arizona SLPs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Speech Therapy in Phoenix: Common Questions
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
            Are you an SLP in Phoenix?
          </h2>
          <p className="text-blue-100 text-sm mb-5 max-w-lg mx-auto">
            Get found by patients and families searching for speech therapy in Phoenix. Free listing — add your profile today.
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
            <Link href="/listings?state=AZ" className="text-sm text-blue-600 hover:opacity-80 font-medium">All Arizona SLPs &#x2192;</Link>
            <Link href="/specialties/pediatric-speech-therapy" className="text-sm text-blue-600 hover:opacity-80 font-medium">Pediatric Speech Therapy &#x2192;</Link>
            <Link href="/specialties/dysphagia" className="text-sm text-blue-600 hover:opacity-80 font-medium">Swallowing Disorders (Dysphagia) &#x2192;</Link>
            <Link href="/specialties/stuttering" className="text-sm text-blue-600 hover:opacity-80 font-medium">Stuttering Treatment &#x2192;</Link>
          </div>
        </div>
      </div>
    </>
  )
}
