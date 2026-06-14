import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Find a Speech Therapist for Autism | FindSLPSpecialist.com',
  description: 'A parent\'s guide to finding the right SLP for autism, AAC, and social communication. What to look for, what questions to ask, and how to find autism speech therapy near you.',
}

export default function AutismSLPGuidePage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="bg-gradient-mist py-16 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">How to Find a Speech Therapist for Autism</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">What parents need to know about autism and AAC — and how to find the right SLP.</p>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">Why Autism Requires a Specialist SLP</h2>
        <p className="text-slate-600 mb-6">Children on the autism spectrum often have complex communication profiles that go beyond simple speech delays. They may have strong vocabulary but difficulty with social communication and pragmatics. They may be nonspeaking or minimally speaking and need AAC (augmentative and alternative communication). Or they may have a combination of language strengths and significant social communication challenges. Not every SLP has training in autism-specific approaches — and the wrong approach can set back progress.</p>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">What to Look for in an Autism SLP</h2>
        <p className="text-slate-600 mb-4">Look for an SLP who specifically lists autism or social communication in their specialty area, and who has experience with:</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>AAC (Augmentative and Alternative Communication)</strong> — If your child is nonspeaking or minimally speaking, find an SLP with AAC experience. This includes high-tech devices (Tobii Dynavox, Proloquo2Go), low-tech systems (PECS, core boards), and the LAMP (Language Acquisition through Motor Planning) approach.</li>
          <li><strong>ESDM (Early Start Denver Model)</strong> — An evidence-based early intervention approach for toddlers with autism.</li>
          <li><strong>Social Communication Intervention</strong> — For children who speak but struggle with back-and-forth conversation, perspective-taking, and social pragmatics.</li>
          <li><strong>Gestalt Language Processing</strong> — A newer framework for understanding echolalia and supporting gestalt language learners.</li>
        </ul>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">Questions to Ask Before Your First Appointment</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-8 space-y-2">
          <li>What percentage of your caseload is children with autism?</li>
          <li>What approaches do you use for nonspeaking or minimally speaking children?</li>
          <li>Are you trained in AAC? What devices or systems do you work with?</li>
          <li>How do you involve parents in sessions?</li>
          <li>How do you track progress and communicate with families?</li>
        </ul>
        <div className="text-center">
          <Link href="/listings?specialty=Autism+%2F+AAC" className="btn-primary">Find Autism & AAC SLPs Near You →</Link>
        </div>
      </div>
    </article>
  )
}
