import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Childhood Apraxia of Speech: Finding the Right SLP',
  description: 'What is childhood apraxia of speech (CAS)? How to find an SLP who specializes in CAS, what credentials to look for, and what evidence-based treatments work.',
}

export default function ApraxiaGuidePage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="bg-gradient-mist py-16 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">Childhood Apraxia of Speech: Finding the Right SLP</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">CAS is one of the most misunderstood and misdiagnosed speech disorders. Here's what parents need to know to get the right help.</p>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">What Is Childhood Apraxia of Speech?</h2>
        <p className="text-slate-600 mb-6">Childhood Apraxia of Speech (CAS) is a motor speech disorder. The child knows what they want to say — but the brain has difficulty sending the right signals to the muscles that control speech. Unlike articulation disorders, CAS is not about weakness in the speech muscles. It's about the neural planning and programming of movement sequences required for speech. Children with CAS often have inconsistent errors, difficulty with longer words and phrases, and prosody that sounds unusual.</p>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">Why You Need a CAS Specialist</h2>
        <p className="text-slate-600 mb-6">CAS requires specialized, intensive intervention. The general strategies used for other speech disorders (articulation therapy, minimal pairs therapy) are not effective for CAS and may actually slow progress. CAS-specific intervention requires high practice variability, lots of repetition within sessions, and specific feedback techniques. The evidence-based approaches for CAS include DTTC (Dynamic Temporal and Tactile Cueing), NDP3, ReST, and PROMPT.</p>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">Credentials to Look For</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>PROMPT Certified</strong> — PROMPT (Prompts for Restructuring Oral Muscular Phonetic Targets) is one of the most established CAS interventions. PROMPT-certified SLPs have completed specific training in this tactile-kinesthetic approach.</li>
          <li><strong>ReST Training</strong> — Rapid Syllable Transition Treatment, developed at the University of Queensland, is another evidence-based approach specifically for CAS.</li>
          <li><strong>CASANA Training</strong> — The Apraxia Kids organization offers SLP training. Look for SLPs who have completed CASANA's workshops.</li>
        </ul>
        <div className="text-center">
          <Link href="/listings?specialty=Childhood+Apraxia+of+Speech+%28CAS%29" className="btn-primary">Find CAS Specialists Near You →</Link>
        </div>
      </div>
    </article>
  )
}
