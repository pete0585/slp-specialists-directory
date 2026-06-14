import { createServiceClient } from '@/lib/supabase/server'
import AdminTable from '@/components/AdminTable'

export default async function AdminPage() {
  const supabase = await createServiceClient()
  const { data: listings } = await supabase.from('slp_specialists_listings').select('*').order('created_at', { ascending: false }).limit(100)
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-slate-800">Listings ({listings?.length ?? 0})</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <AdminTable listings={listings ?? []} />
      </div>
    </div>
  )
}
