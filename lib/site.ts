import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'

export const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://findslpspecialist.com'

/** Static city folders under app/slp-specialists follow {city}-{state}. */
const CITY_STATE_FOLDER = /^.+-[a-z]{2}$/

export function getCityPageSlugs(): string[] {
  const dir = path.join(process.cwd(), 'app', 'slp-specialists')
  if (!existsSync(dir)) return []

  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && CITY_STATE_FOLDER.test(entry.name))
    .filter((entry) => existsSync(path.join(dir, entry.name, 'page.tsx')))
    .map((entry) => entry.name)
    .sort()
}

export function cityPageUrl(slug: string): string {
  return `${BASE}/slp-specialists/${slug}`
}
