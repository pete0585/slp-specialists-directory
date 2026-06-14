import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')
  if (!auth?.value) redirect('/admin/login')
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-lg font-bold">FindSLPSpecialist Admin</h1>
        <form action="/api/admin/logout" method="POST"><button type="submit" className="text-sm text-slate-300 hover:text-white">Sign out</button></form>
      </div>
      {children}
    </div>
  )
}
