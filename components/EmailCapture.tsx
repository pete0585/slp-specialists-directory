'use client'
import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function EmailCapture({ specialty, city }: { specialty?: string; city?: string }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, specialty, city }) })
      setSubmitted(true)
    } catch {} finally { setLoading(false) }
  }

  if (submitted) return (
    <div className="rounded-2xl bg-teal-50 border border-teal-100 p-6 text-center">
      <p className="font-semibold text-teal-700">You're on the list!</p>
      <p className="text-sm text-teal-600 mt-1">We'll send you local SLP recommendations as our directory grows.</p>
    </div>
  )

  return (
    <div className="rounded-2xl bg-sky-50 border border-sky-100 p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100">
          <Mail className="h-5 w-5 text-sky-600" />
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">Get matched with local SLPs</p>
          <p className="text-xs text-slate-500">{specialty ? `We'll notify you when ${specialty} specialists near you are added.` : city ? `Get notified as new SLPs in ${city} join the directory.` : 'Get notified as new SLPs join the directory.'}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="input flex-1 py-2" />
        <button type="submit" disabled={loading} className="btn-primary py-2 px-4 shrink-0">{loading ? '…' : 'Notify me'}</button>
      </form>
    </div>
  )
}
