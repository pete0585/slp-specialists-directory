'use client'
import { useState } from 'react'
import { US_STATES, SLP_SPECIALTIES } from '@/types'

export default function SubmitForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', credentials: '', city: '', state: '', phone: '', email: '', website: '', bio: '', specialties: '', telehealth: false })

  const set = (field: string, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setSubmitted(true)
    } catch {} finally { setLoading(false) }
  }

  if (submitted) return (
    <div className="card p-8 text-center">
      <div className="text-4xl mb-4">✓</div>
      <h2 className="font-serif text-2xl font-bold text-slate-800 mb-2">Listing Submitted!</h2>
      <p className="text-slate-600">We'll review your submission and activate your listing within 24 hours. You'll receive an email confirmation shortly.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Full Name *</label>
          <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. Jane Smith" className="input" />
        </div>
        <div>
          <label className="label">Credentials</label>
          <input value={form.credentials} onChange={e => set('credentials', e.target.value)} placeholder="CCC-SLP, MS, PhD" className="input" />
        </div>
        <div>
          <label className="label">City *</label>
          <input required value={form.city} onChange={e => set('city', e.target.value)} placeholder="Austin" className="input" />
        </div>
        <div>
          <label className="label">State *</label>
          <select required value={form.state} onChange={e => set('state', e.target.value)} className="input">
            <option value="">Select state</option>
            {US_STATES.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Phone</label>
          <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 123-4567" className="input" />
        </div>
        <div>
          <label className="label">Email *</label>
          <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@mypractice.com" className="input" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Website</label>
          <input type="url" value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://mypractice.com" className="input" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Primary Specialty</label>
          <select value={form.specialties} onChange={e => set('specialties', e.target.value)} className="input">
            <option value="">Select your primary specialty</option>
            {SLP_SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label">Bio</label>
          <textarea value={form.bio} onChange={e => set('bio', e.target.value)} rows={4} placeholder="Describe your practice, approach, and experience…" className="input resize-none" />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.telehealth} onChange={e => set('telehealth', e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky focus:ring-sky-200" />
            <span className="text-sm font-medium text-slate-700">I offer telehealth sessions</span>
          </label>
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full py-4">{loading ? 'Submitting…' : 'Submit My Listing (Free)'}</button>
      <p className="text-xs text-slate-500 text-center">Free listings include basic info. Upgrade to Verified ($99/yr) for full contact details and specialty badges.</p>
    </form>
  )
}
