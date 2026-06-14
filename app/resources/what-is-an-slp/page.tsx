import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What Is a Speech-Language Pathologist? A Complete Guide',
  description: 'Learn what speech-language pathologists (SLPs) do, what conditions they treat, how to find one, and what credentials to look for — CCC-SLP, BCS-F, PROMPT, and more.',
}

export default function WhatIsAnSLPPage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="bg-gradient-mist py-16 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">What Is a Speech-Language Pathologist?</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">A complete guide to what SLPs do, who they help, and how to find the right one for your needs.</p>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 prose prose-slate">
        <h2>What Does an SLP Do?</h2>
        <p>A speech-language pathologist (SLP) — also called a speech therapist — is a healthcare professional who specializes in diagnosing and treating communication and swallowing disorders. SLPs work with patients of all ages, from newborns in the NICU to adults recovering from stroke. Their scope of practice is remarkably broad: it includes speech sounds, language comprehension and expression, fluency (stuttering), voice, feeding and swallowing, cognitive-communication, and augmentative and alternative communication (AAC).</p>
        <p>SLPs hold a master's degree or doctoral degree in speech-language pathology, complete a clinical fellowship, and must pass a national board examination. The credential "CCC-SLP" (Certificate of Clinical Competence in Speech-Language Pathology) from ASHA is the gold-standard qualification in the United States.</p>

        <h2>What Conditions Do SLPs Treat?</h2>
        <p>Speech-language pathologists treat an enormous range of conditions. Some of the most common include:</p>
        <ul>
          <li><strong>Childhood Apraxia of Speech (CAS)</strong> — A motor speech disorder where the brain has difficulty sending the right signals to the muscles involved in speech. Requires intensive, specialized intervention.</li>
          <li><strong>Autism Spectrum Disorder / AAC</strong> — Many children with autism benefit from SLP services for language development, social communication, and augmentative and alternative communication devices.</li>
          <li><strong>Pediatric Feeding and Swallowing Disorders</strong> — Infants and children who have difficulty eating, drinking, or swallowing safely. Often follows NICU stays, premature birth, or neurological conditions.</li>
          <li><strong>Aphasia</strong> — Language impairment after stroke or brain injury that affects the ability to speak, understand language, read, and write.</li>
          <li><strong>Stuttering and Fluency Disorders</strong> — Disruptions in the flow of speech. SLPs use evidence-based techniques to improve fluency and reduce the impact of stuttering.</li>
          <li><strong>Voice Disorders</strong> — Including vocal nodules, paralysis, gender-affirming voice therapy, and professional voice care.</li>
          <li><strong>Dysphagia</strong> — Swallowing difficulties in adults, often after stroke, Parkinson's disease, or head and neck cancer.</li>
          <li><strong>Language Delays</strong> — Late talkers, expressive and receptive language disorders in children.</li>
        </ul>

        <h2>SLP Credentials to Know</h2>
        <p>Not all SLPs have the same training. These are the most important credentials to look for:</p>
        <ul>
          <li><strong>CCC-SLP</strong> — Certificate of Clinical Competence from ASHA. The baseline credential for licensed SLPs in the US. Requires a master's or doctoral degree, supervised clinical hours, and a national board exam.</li>
          <li><strong>BCS-F</strong> — Board Certified Specialist in Fluency. An advanced credential for SLPs with specialized training in stuttering and fluency disorders.</li>
          <li><strong>BCS-CL</strong> — Board Certified Specialist in Child Language. Advanced specialization in pediatric language disorders.</li>
          <li><strong>PROMPT Certified</strong> — Trained in Prompts for Restructuring Oral Muscular Phonetic Targets, a tactile-kinesthetic approach to motor speech disorders including CAS.</li>
          <li><strong>LSVT Loud Certified</strong> — Trained in Lee Silverman Voice Treatment, an evidence-based intervention for Parkinson's disease and other neurological conditions affecting voice and speech.</li>
        </ul>

        <h2>Private Practice vs. Hospital vs. School SLPs</h2>
        <p>SLPs work in many settings, and the setting matters for what services you'll receive. Hospital SLPs typically focus on acute care — evaluating swallowing in newly hospitalized patients, working with stroke patients in inpatient rehab. School SLPs focus on educational impact — helping students access the curriculum — but have caseloads of 40-60+ students and limited time per child. Private practice SLPs offer more individualized, specialized care with longer session times, more parent/caregiver involvement, and the ability to focus on specific conditions without educational eligibility requirements.</p>
        <p>If your child has been diagnosed with apraxia, autism, or a specific feeding disorder, a private practice SLP who specializes in that condition will typically offer more focused, intensive intervention than a school SLP can provide within the school setting.</p>

        <h2>How to Find the Right SLP</h2>
        <p>The key is matching the SLP's specialty to your specific need. A general SLP may be excellent at language delays but have limited experience with apraxia — and vice versa. Start by identifying the primary condition or goal: Is this about speech sounds and apraxia? Language delays? Feeding? Stuttering? Once you know the specialty, search for an SLP who explicitly lists that as a focus area and has relevant advanced training (PROMPT certification for apraxia, BCS-F for stuttering, etc.).</p>
        <Link href="/listings" className="btn-primary no-underline">Search for SLPs by Specialty →</Link>
      </div>
    </article>
  )
}
