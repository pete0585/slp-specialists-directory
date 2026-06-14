import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pediatric Feeding Therapy: What Parents Need to Know',
  description: 'Learn about pediatric feeding therapy, what a feeding SLP does, who needs it, and how to find the right feeding therapist for your child.',
}

export default function FeedingGuidePage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="bg-gradient-mist py-16 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">Pediatric Feeding Therapy: What Parents Need to Know</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">If your child refuses food, gags frequently, or struggles with certain textures, a feeding SLP may be exactly who you need.</p>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">What Does a Feeding Therapist Do?</h2>
        <p className="text-slate-600 mb-6">A feeding SLP specializes in the oral motor, sensory, and behavioral components of eating. They evaluate how a child chews and swallows food, whether they're managing textures safely, whether there's a sensory component to food refusal, and whether the child has the oral motor strength and coordination needed for various foods. Feeding therapy addresses picky eating, ARFID (Avoidant/Restrictive Food Intake Disorder), post-NICU feeding difficulties, and dysphagia (swallowing disorders) in children.</p>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">Signs Your Child May Need Feeding Therapy</h2>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Gagging or vomiting frequently during meals</li>
          <li>Refusing entire texture categories (nothing crunchy, nothing mushy)</li>
          <li>Eating fewer than 20 foods</li>
          <li>Mealtimes lasting more than 30 minutes</li>
          <li>Weight concerns related to food intake</li>
          <li>Coughing or choking during meals</li>
          <li>Still on purees past 12-18 months</li>
          <li>History of NICU stay, prematurity, or feeding tube</li>
        </ul>
        <p className="text-slate-600 mb-8">Evidence-based feeding therapy approaches include SOS (Sequential Oral Sensory) Approach, STEPS+, and ARFID-specific CBT. The right approach depends on whether the primary driver is sensory, motor, behavioral, or a combination.</p>
        <div className="text-center">
          <Link href="/listings?specialty=Pediatric+Feeding+%26+Swallowing" className="btn-primary">Find Pediatric Feeding SLPs Near You →</Link>
        </div>
      </div>
    </article>
  )
}
