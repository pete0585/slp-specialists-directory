'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
import { SLP_SPECIALTIES, INSURANCE_OPTIONS, US_STATES } from '@/types'

export default function FilterSidebar({ onClose, mobile = false }: { onClose?: () => void; mobile?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || value === '') params.delete(key)
    else params.set(key, value)
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  const clearAll = useCallback(() => router.push(pathname), [router, pathname])
  const hasFilters = ['state', 'specialty', 'insurance', 'telehealth', 'acceptingNew', 'tier'].some(k => searchParams.has(k))

  return (
    <div className={mobile ? 'p-4' : 'sticky top-20'}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-700">Filter Results</span>
        </div>
        <div className="flex gap-2">
          {hasFilters && <button onClick={clearAll} className="text-xs text-sky-500 hover:text-sky-600 font-medium">Clear all</button>}
          {onClose && <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>}
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label className="label">State</label>
          <select value={searchParams.get('state') ?? ''} onChange={(e) => updateFilter('state', e.target.value || null)} className="input text-sm">
            <option value="">All states</option>
            {US_STATES.map((s) => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={searchParams.get('telehealth') === 'true'} onChange={(e) => updateFilter('telehealth', e.target.checked ? 'true' : null)} className="h-4 w-4 rounded border-slate-300 text-sky focus:ring-sky-200" />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Telehealth available</span>
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={searchParams.get('acceptingNew') === 'true'} onChange={(e) => updateFilter('acceptingNew', e.target.checked ? 'true' : null)} className="h-4 w-4 rounded border-slate-300 text-sky focus:ring-sky-200" />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Accepting new clients</span>
          </label>
        </div>
        <div>
          <label className="label">Insurance Accepted</label>
          <select value={searchParams.get('insurance') ?? ''} onChange={(e) => updateFilter('insurance', e.target.value || null)} className="input text-sm">
            <option value="">Any insurance</option>
            {INSURANCE_OPTIONS.map((ins) => <option key={ins} value={ins}>{ins}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Specialty</label>
          <select value={searchParams.get('specialty') ?? ''} onChange={(e) => updateFilter('specialty', e.target.value || null)} className="input text-sm">
            <option value="">All specialties</option>
            {SLP_SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Listing Type</label>
          <div className="space-y-2">
            {[{ value: 'featured', label: '★ Featured SLP' }, { value: 'verified', label: '✓ Verified SLP' }].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={searchParams.get('tier') === opt.value} onChange={(e) => updateFilter('tier', e.target.checked ? opt.value : null)} className="h-4 w-4 rounded border-slate-300 text-sky focus:ring-sky-200" />
                <span className="text-sm text-slate-600 group-hover:text-slate-800">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
