import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-slate-800 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20">
                <MessageSquare className="h-4 w-4 text-sky-300" />
              </div>
              <span className="font-serif text-lg font-bold text-white">Find<span className="text-sky-300">SLP</span>Specialist</span>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              The nationwide directory of Speech-Language Pathologists searchable by specialty, condition, and location. Connecting families and patients with SLPs who specialize in exactly what they need.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Patients</h3>
            <ul className="space-y-2.5">
              <li><Link href="/listings" className="text-sm text-slate-300 hover:text-white transition-colors">Find a Speech Therapist</Link></li>
              <li><Link href="/resources/what-is-an-slp" className="text-sm text-slate-300 hover:text-white transition-colors">What is an SLP?</Link></li>
              <li><Link href="/listings?telehealth=true" className="text-sm text-slate-300 hover:text-white transition-colors">Telehealth SLPs</Link></li>
              <li><Link href="/specialties/childhood-apraxia" className="text-sm text-slate-300 hover:text-white transition-colors">Apraxia Specialists</Link></li>
              <li><Link href="/specialties/autism-aac" className="text-sm text-slate-300 hover:text-white transition-colors">Autism / AAC Therapists</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For SLPs</h3>
            <ul className="space-y-2.5">
              <li><Link href="/submit" className="text-sm text-slate-300 hover:text-white transition-colors">List Your Practice</Link></li>
              <li><Link href="/submit#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/admin" className="text-sm text-slate-300 hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Related Directories</h3>
            <ul className="space-y-2.5">
              <li><a href="https://lactationconsultantdirectory.com" target="_blank" rel="noopener" className="text-sm text-slate-300 hover:text-white transition-colors">Lactation Consultant Directory</a></li>
              <li><a href="https://menopausedirectory.co" target="_blank" rel="noopener" className="text-sm text-slate-300 hover:text-white transition-colors">Menopause Directory</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-700 pt-8">
          <p className="text-xs text-slate-400 max-w-3xl leading-relaxed mb-4">
            FindSLPSpecialist.com is an independent directory and is not affiliated with, endorsed by, or sponsored by ASHA (American Speech-Language-Hearing Association) or any professional licensing body. CCC-SLP and other credential marks are property of their respective organizations.
          </p>
          <p className="text-xs text-slate-400">© {currentYear} FindSLPSpecialist.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
