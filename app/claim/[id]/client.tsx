'use client'
import { useState } from 'react'
import { ShieldCheck, Star, CheckCircle } from 'lucide-react'
import type { Listing } from '@/types'
import { getDisplayName } from '@/lib/utils'

interface Props { listing: Listing; verified: boolean; upgraded: boolean; upgradedTier?: string }

export default function ClaimPageClient({ listing, verified, upgraded, upgradedTier }: Props) {
  const [email, setEmail] = useState(listing.email ?? '')
  const [loading, setLoading] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [error, setError] = useState('')
  const displayName = getDisplayName(listing)

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/claim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ listingId: listing.id, email }) })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed to send verification email'); return }
      setClaimed(true)
    } catch { setError('Something went wrong. Please try again.') } finally { setLoading(false) }
  }

  async function handleUpgrade(tier: 'verified' | 'featured') {
    setLoading(true)
    try {
      const res = await fetch('/api/upgrade', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ listingId: listing.id, tier }) })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch { setLoading(false) }
  }

  if (upgraded) return (
    <div className="min-h-screen bg-mist-100 flex items-center justify-center px-4">
      <div className="card p-8 max-w-md w-full text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 mx-auto mb-4"><Star className="h-8 w-8 text-teal-600" /></div>
        <h1 className="font-serif text-2xl font-bold text-slate-800 mb-2">You're all set!</h1>
        <p className="text-slate-600">Your listing has been upgraded to <strong>{upgradedTier}</strong>. Your full profile with contact info and specialties is now live.</p>
      </div>
    </div>
  )

  if (claimed) return (
    <div className="min-h-screen bg-mist-100 flex items-center justify-center px-4">
      <div className="card p-8 max-w-md w-full text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 mx-auto mb-4"><CheckCircle className="h-8 w-8 text-sky-600" /></div>
        <h1 className="font-serif text-2xl font-bold text-slate-800 mb-2">Check your email</h1>
        <p className="text-slate-600">We sent a verification link to <strong>{email}</strong>. Click it to claim your listing.</p>
      </div>
    </div>
  )

  if (verified) return (
    <div className="min-h-screen bg-mist-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-4"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100"><CheckCircle className="h-5 w-5 text-green-600" /></div><div><p className="font-semibold text-slate-800">Listing claimed!</p><p className="text-sm text-slate-500">{displayName} — {listing.city}, {listing.state}</p></div></div>
          <p className="text-slate-600 text-sm">Your free listing is live. Upgrade to add contact info, full bio, specialty badges, and priority placement in search results.</p>
        </div>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4 text-center">Upgrade your listing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card p-6 border-2 border-sky-200">
            <div className="flex items-center gap-2 mb-3"><ShieldCheck className="h-5 w-5 text-sky-600" /><h3 className="font-serif text-lg font-bold text-slate-800">Verified</h3></div>
            <p className="text-3xl font-bold text-sky-600 mb-1">$79<span className="text-base font-normal text-slate-500">/year</span></p>
            <ul className="space-y-2 text-sm text-slate-600 mb-6 mt-4">
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500 shrink-0" />Full bio + contact info visible</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500 shrink-0" />Up to 8 specialty badges</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500 shrink-0" />Insurance accepted list</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500 shrink-0" />Priority in city search results</li>
            </ul>
            <button onClick={() => handleUpgrade('verified')} disabled={loading} className="btn-secondary w-full">Get Verified — $79/yr</button>
          </div>
          <div className="card p-6 border-2 border-teal-200 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-500 px-3 py-0.5 text-xs font-semibold text-white">Most Visible</div>
            <div className="flex items-center gap-2 mb-3"><Star className="h-5 w-5 text-teal-600" /><h3 className="font-serif text-lg font-bold text-slate-800">Featured</h3></div>
            <p className="text-3xl font-bold text-teal-600 mb-1">$149<span className="text-base font-normal text-slate-500">/year</span></p>
            <ul className="space-y-2 text-sm text-slate-600 mb-6 mt-4">
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />Everything in Verified</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />Top-3 placement in results</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />"Featured SLP" badge on listing</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />Highlighted on specialty pages</li>
            </ul>
            <button onClick={() => handleUpgrade('featured')} disabled={loading} className="btn-teal w-full">Get Featured — $149/yr</button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-mist-100 flex items-center justify-center px-4">
      <div className="card p-8 max-w-md w-full">
        <h1 className="font-serif text-2xl font-bold text-slate-800 mb-2">Claim Your Listing</h1>
        <p className="text-slate-600 mb-6">Enter your email to claim <strong>{displayName}</strong> in {listing.city}, {listing.state}. We'll send you a verification link.</p>
        <form onSubmit={handleClaim} className="space-y-4">
          <div>
            <label className="label">Email address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@mypractice.com" className="input" />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? 'Sending…' : 'Send Verification Email'}</button>
        </form>
      </div>
    </div>
  )
}
