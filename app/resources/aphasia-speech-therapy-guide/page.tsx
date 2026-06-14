import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Finding an Aphasia SLP After Stroke | FindSLPSpecialist.com',
  description: 'A family guide to aphasia speech therapy. Learn what aphasia is, what to expect from treatment, and how to find an aphasia specialist near you.',
}

export default function AphasiaGuidePage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="bg-gradient-mist py-16 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">Finding an Aphasia SLP After Stroke</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">A guide for stroke survivors and families navigating aphasia diagnosis and finding the right speech-language pathologist.</p>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">What Is Aphasia?</h2>
        <p className="text-slate-600 mb-6">Aphasia is a language disorder caused by damage to the parts of the brain that control language — most often from stroke, but also from traumatic brain injury, brain tumor, or progressive neurological diseases. It affects the ability to speak, understand spoken language, read, and write. Critically, aphasia does not affect intelligence — it is a communication impairment, not a cognitive impairment. People with aphasia may know exactly what they want to say but be unable to retrieve the words or organize them into sentences.</p>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">Types of Aphasia</h2>
        <p className="text-slate-600 mb-4">Aphasia presents in many forms depending on which brain areas are affected:</p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Broca's Aphasia (Expressive)</strong> — Difficulty producing speech; comprehension may be relatively preserved. Speaking is effortful and non-fluent.</li>
          <li><strong>Wernicke's Aphasia (Receptive)</strong> — Fluent speech but poor comprehension; words may be substituted or jargon used.</li>
          <li><strong>Anomic Aphasia</strong> — Primary difficulty with word-finding; often the most common presentation post-stroke.</li>
          <li><strong>Global Aphasia</strong> — Severe impairment in both production and comprehension.</li>
        </ul>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">What to Look for in an Aphasia SLP</h2>
        <p className="text-slate-600 mb-6">Aphasia treatment is evidence-based and specialized. Look for SLPs who mention aphasia as a primary specialty, and who have experience with treatment approaches like Constraint-Induced Language Therapy (CILT), Script Training, and Aphasia Communication Partner Training. Telehealth is increasingly validated for aphasia treatment and may expand access when local specialists aren't available.</p>
        <div className="text-center">
          <Link href="/listings?specialty=Aphasia" className="btn-primary">Find Aphasia SLPs Near You →</Link>
        </div>
      </div>
    </article>
  )
}
