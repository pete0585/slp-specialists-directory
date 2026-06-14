import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import NewsletterFooterBar from '@/components/NewsletterFooterBar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://findslpspecialist.com'

export const metadata: Metadata = {
  title: {
    default: 'Find a Speech-Language Pathologist Near You | FindSLPSpecialist.com',
    template: '%s | FindSLPSpecialist.com',
  },
  description: 'Find a speech-language pathologist (SLP) near you. Search by specialty — apraxia, autism/AAC, feeding therapy, aphasia, stuttering, and more. Free to search.',
  keywords: ['speech therapist near me', 'speech language pathologist', 'SLP near me', 'find speech therapist', 'apraxia specialist', 'autism speech therapist', 'pediatric feeding therapist'],
  authors: [{ name: 'FindSLPSpecialist.com' }],
  creator: 'FindSLPSpecialist.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'FindSLPSpecialist.com',
    title: 'Find a Speech-Language Pathologist Near You | FindSLPSpecialist.com',
    description: 'Find a speech-language pathologist who specializes in what you need. Search by city and specialty — free, no sign-up required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find a Speech-Language Pathologist Near You | FindSLPSpecialist.com',
    description: 'Search for SLPs by specialty — apraxia, autism/AAC, feeding therapy, aphasia, and more.',
  },
  metadataBase: new URL(siteUrl),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <NewsletterFooterBar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
