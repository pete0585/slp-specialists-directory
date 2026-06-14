'use client'
import { useState } from 'react'
import type { Listing } from '@/types'
import { getDisplayName, parseSpecialties } from '@/lib/utils'

export default function AdminTable({ listings }: { listings: Listing[] }) {
  const [updating, setUpdating] = useState<string | null>(null)

  async function updateListing(id: string, data: Partial<Listing>) {
    setUpdating(id)
    try {
      await fetch(`/api/admin/listing/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      window.location.reload()
    } catch { setUpdating(null) }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Name</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">City, State</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Specialties</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Tier</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Claimed</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {listings.map((l) => (
            <tr key={l.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-800">{getDisplayName(l)}</p>
                <p className="text-xs text-slate-500">{(l.credentials ?? []).join(', ')}</p>
              </td>
              <td className="px-4 py-3 text-slate-600">{l.city}, {l.state}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {parseSpecialties(l.specialties).slice(0, 2).map(s => <span key={s} className="rounded-full bg-teal-50 px-2 py-0.5 text-xs text-teal-600">{s}</span>)}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${l.plan_tier === 'featured' ? 'bg-teal-50 text-teal-600' : l.plan_tier === 'verified' ? 'bg-sky-50 text-sky-600' : 'bg-slate-100 text-slate-500'}`}>
                  {l.plan_tier}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">{l.claimed ? '✓' : '—'}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button onClick={() => updateListing(l.id, { is_active: !l.is_active })} disabled={updating === l.id}
                    className={`text-xs px-2 py-1 rounded border ${l.is_active ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}>
                    {l.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <a href={`/slp/${l.slug}`} target="_blank" rel="noopener" className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50">View</a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
