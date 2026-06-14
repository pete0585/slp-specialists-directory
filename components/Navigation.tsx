'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MessageSquare } from 'lucide-react'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 group-hover:bg-sky-200 transition-colors">
              <MessageSquare className="h-4 w-4 text-sky-600" />
            </div>
            <span className="font-serif text-lg font-bold text-slate-800">
              Find<span className="text-sky-500">SLP</span>Specialist
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/listings" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Find an SLP</Link>
            <Link href="/resources/what-is-an-slp" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">What is an SLP?</Link>
            <Link href="/submit" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">List Your Practice</Link>
            <Link href="/submit" className="btn-primary py-2 text-xs">Get Listed Free</Link>
          </div>
          <button className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-1">
            <Link href="/listings" className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMobileOpen(false)}>Find an SLP</Link>
            <Link href="/resources/what-is-an-slp" className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMobileOpen(false)}>What is an SLP?</Link>
            <Link href="/submit" className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMobileOpen(false)}>List Your Practice</Link>
            <div className="px-4 pt-2"><Link href="/submit" className="btn-primary w-full text-center">Get Listed Free</Link></div>
          </div>
        )}
      </nav>
    </header>
  )
}
