import {articles as editorialArticles} from '@/lib/editorial-blog'
import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { BASE, cityPageUrl, getCityPageSlugs } from '@/lib/site'

async function originalSitemap(): Promise<MetadataRoute.Sitemap> {
  let listings: { slug: string; updated_at: string | null }[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('slp_listings').select('slug, updated_at').not('is_active', 'is', false).limit(5000)
    listings = data ?? []
  } catch {
    listings = []
  }

  const staticPages = ['', '/listings', '/cities', '/states', '/submit', '/resources/what-is-an-slp', '/resources/how-to-find-slp-for-autism', '/resources/speech-therapy-for-childhood-apraxia', '/resources/pediatric-feeding-therapy-guide', '/resources/aphasia-speech-therapy-guide', '/specialties/childhood-apraxia', '/specialties/autism-aac', '/specialties/pediatric-feeding', '/specialties/aphasia', '/specialties/stuttering'].map(path => ({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: path === '' ? 1 : 0.8 }))

  const cityPages = getCityPageSlugs().map((slug) => ({
    url: cityPageUrl(slug),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const listingPages = listings.map(l => ({ url: `${BASE}/listings/${l.slug}`, lastModified: new Date(l.updated_at ?? Date.now()), changeFrequency: 'monthly' as const, priority: 0.7 }))

  return [...staticPages, ...cityPages, ...listingPages]
}

export default async function editorialSitemap():Promise<MetadataRoute.Sitemap>{const existing=await originalSitemap();const site="https://findslpspecialist.com";return [...existing,{url:site+'/blog',changeFrequency:'weekly'},...editorialArticles().map(p=>({url:site+'/blog/'+p.slug,lastModified:new Date(p.date),changeFrequency:'monthly' as const}))]}
