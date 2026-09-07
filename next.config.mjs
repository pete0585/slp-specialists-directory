/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/sitemap.xml': ['./app/slp-specialists/**/page.tsx'],
    },
  },
}
export default nextConfig
