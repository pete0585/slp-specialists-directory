import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Speech-Language Pathologist in Dallas, TX | SLP Specialist Directory',
  description:
    'Find speech-language pathologists in Dallas, TX. Browse SLPs specializing in pediatric language, stuttering, voice disorders, aphasia, dysphagia, and AAC across the Dallas metro.',
  alternates: { canonical: 'https://www.slpspecialistdirectory.com/slp-specialists/dallas-tx' },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Texas Medicaid (STAR) cover speech therapy in Dallas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Texas Medicaid (STAR program) covers SLP services for children and adults when medically necessary. Texas Early Childhood Intervention (ECI) provides services including SLP for eligible children under age 3. School-age children receive SLP through DISD, Plano ISD, Frisco ISD, and other DFW school districts through special education programs. Adult Texas Medicaid enrollees can access SLP through participating outpatient programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What SLP specialties are available in Dallas-Fort Worth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DFW SLPs cover the full scope of practice: pediatric language and speech sound disorders, autism communication, AAC, feeding and swallowing therapy, adult aphasia and stroke rehabilitation, dysphagia management, voice disorders, stuttering, cognitive communication (TBI, dementia), and accent modification services. UT Southwestern\'s Voice Center specializes in voice disorders for professional voice users and has a strong laryngology-SLP collaboration model.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there pediatric SLPs in the Plano-Frisco area?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. North Dallas — Plano, Frisco, Allen, McKinney, and The Colony — has a large concentration of pediatric therapy practices, many of which include SLP. The area\'s large family population and high education levels drive strong demand for early intervention and school-age language and literacy services. Many north Dallas pediatric SLP practices specialize in reading and academic language support alongside traditional speech therapy.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a bilingual Spanish-English SLP in Dallas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dallas\'s large Hispanic population creates strong demand for Spanish-English bilingual SLPs. Several DFW practices specifically serve Spanish-speaking families, and many school district SLP programs employ bilingual therapists. A bilingual evaluation is essential for children whose primary home language is Spanish to avoid misclassifying language difference as language disorder. Search this directory for bilingual SLPs in the Dallas metro.',
      },
    },
  ],
}

export default async function DallasSLPPage() {
  const listings = await getListingsByCity('Dallas', 'TX', 20).catch(() => [])

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
          <Link href="/states/tx" className="hover:text-brand">Texas</Link>
          <span>/</span>
          <span className="text-gray-700">Dallas</span>
        </nav>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-2 text-blue-600 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Dallas, TX</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            Find a Speech-Language Pathologist in Dallas, TX
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Dallas-Fort Worth is one of the country's largest metropolitan areas with a correspondingly large SLP market. UT Southwestern Medical Center has a nationally ranked communication disorders program. Children's Medical Center Dallas (Children's Health) has a comprehensive pediatric SLP program. The DFW private practice SLP community spans multiple districts — Uptown, Plano, Frisco, and Fort Worth — serving the metro's large and growing population.
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
                Speech-Language Pathologists in Dallas, TX
              </h2>
              <Link
                href="/listings?state=TX"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                All Texas SLPs <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Browse all Texas SLPs while we add more Dallas listings.</p>
            <Link
              href="/listings?state=TX"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700"
            >
              Search Texas SLPs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Speech Therapy in Dallas: Common Questions
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
            Are you an SLP in Dallas?
          </h2>
          <p className="text-blue-100 text-sm mb-5 max-w-lg mx-auto">
            Get found by patients and families searching for speech therapy in Dallas. Free listing — add your profile today.
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
            <Link href="/listings?state=TX" className="text-sm text-blue-600 hover:opacity-80 font-medium">All Texas SLPs &#x2192;</Link>
            <Link href="/specialties/pediatric-speech-therapy" className="text-sm text-blue-600 hover:opacity-80 font-medium">Pediatric Speech Therapy &#x2192;</Link>
            <Link href="/specialties/dysphagia" className="text-sm text-blue-600 hover:opacity-80 font-medium">Swallowing Disorders (Dysphagia) &#x2192;</Link>
            <Link href="/specialties/stuttering" className="text-sm text-blue-600 hover:opacity-80 font-medium">Stuttering Treatment &#x2192;</Link>
          </div>
        </div>
      </div>
    </>
  )
}
