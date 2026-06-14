'use client'
import { useState } from 'react'

export default function NewsletterFooterBar() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      setSubmitted(true)
    } catch {}
  }

  if (submitted) return (
    <div className="bg-sky-600 py-4 px-4 text-center">
      <p className="text-sm text-white font-medium">Thanks! We'll keep you updated.</p>
    </div>
  )

  return (
    <div className="bg-sky-600 py-5 px-4">
      <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-white font-medium text-center sm:text-left shrink-0">Get SLP resources delivered to your inbox</p>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto flex-1">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="input flex-1 py-2 text-sm" />
          <button type="submit" className="btn-primary py-2 px-4 shrink-0 bg-white text-sky-600 hover:bg-sky-50 border-0">Subscribe</button>
        </form>
      </div>
    </div>
  )
}
