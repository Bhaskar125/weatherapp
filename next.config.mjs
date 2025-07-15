/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: ['openweathermap.org'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'openweathermap.org',
          port: '',
          pathname: '/img/wn/**',
        },
      ],
      unoptimized: true,
    },
    experimental: {
      optimizePackageImports: ['lucide-react'],
    },
  }
  
  export default nextConfig
  