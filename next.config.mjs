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
    // Windows-specific fixes
    webpack: (config, { isServer }) => {
      // Disable file system optimization that can cause issues on Windows
      config.resolve.symlinks = false;
      
      // Avoid problematic file system operations
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        };
      }
      
      return config;
    },
    // Disable SWC minification which can cause Windows issues
    swcMinify: false,
    // Experimental features
    experimental: {
      optimizePackageImports: ['lucide-react'],
      esmExternals: false,
    },
  }
  
  export default nextConfig
  