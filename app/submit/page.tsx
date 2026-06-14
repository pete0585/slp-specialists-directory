import type { Metadata } from 'next'
import { CheckCircle, ShieldCheck, Star } from 'lucide-react'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'List Your SLP Practice | FindSLPSpecialist.com',
  description: 'Add your speech-language pathology practice to the nationwide specialty-first SLP directory. Free to list. Verified listings from $79/year.',
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-mist-100">
      <div className="bg-sky-600 py-16 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-white mb-4">Get Listed on FindSLPSpecialist.com</h1>
        <p className="text-sky-100 text-lg max-w-2xl mx-auto">The nationwide directory built to capture specialty-specific SLP searches. Free to list. Verified listings get full contact info and priority placement.</p>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">Add Your Practice</h2>
            <SubmitForm />
          </div>
          <div id="pricing">
            <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">Pricing</h2>
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-slate-800 mb-1">Free</h3>
                <p className="text-2xl font-bold text-slate-600 mb-3">$0<span className="text-sm font-normal text-slate-500">/forever</span></p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-slate-400 shrink-0" />Name, city, state visible</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-slate-400 shrink-0" />Claim listing flow</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-slate-400 shrink-0" />SEO-indexed profile page</li>
                </ul>
              </div>
              <div className="card p-5 border-2 border-sky-200">
                <div className="flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-sky-600" /><h3 className="font-semibold text-slate-800">Verified</h3></div>
                <p className="text-2xl font-bold text-sky-600 mb-3">$79<span className="text-sm font-normal text-slate-500">/year</span></p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500 shrink-0" />Full contact info + website</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500 shrink-0" />Specialty badges (up to 8)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500 shrink-0" />Insurance accepted list</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500 shrink-0" />Priority in city results</li>
                </ul>
              </div>
              <div className="card p-5 border-2 border-teal-200">
                <div className="flex items-center gap-2 mb-1"><Star className="h-4 w-4 text-teal-600" /><h3 className="font-semibold text-slate-800">Featured</h3></div>
                <p className="text-2xl font-bold text-teal-600 mb-3">$149<span className="text-sm font-normal text-slate-500">/year</span></p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />Everything in Verified</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />Top-3 placement in results</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />"Featured SLP" badge</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />Highlighted on specialty pages</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">One new patient covers the cost many times over. The average SLP patient is worth $1,200-$6,000 in first-year revenue.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
