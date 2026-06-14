import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://findslpspecialist.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const { data: listings } = await supabase.from('slp_specialists_listings').select('slug, updated_at').not('is_active', 'is', false).limit(5000)

  const staticPages = ['', '/listings', '/cities', '/states', '/submit', '/resources/what-is-an-slp', '/resources/how-to-find-slp-for-autism', '/resources/speech-therapy-for-childhood-apraxia', '/resources/pediatric-feeding-therapy-guide', '/resources/aphasia-speech-therapy-guide', '/specialties/childhood-apraxia', '/specialties/autism-aac', '/specialties/pediatric-feeding', '/specialties/aphasia', '/specialties/stuttering'].map(path => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: path === '' ? 1 : 0.8 }))

  const listingPages = (listings ?? []).map(l => ({ url: `${siteUrl}/slp/${l.slug}`, lastModified: new Date(l.updated_at ?? Date.now()), changeFrequency: 'monthly' as const, priority: 0.7 }))

  return [...staticPages, ...listingPages]
}
