const nextConfig = {
  output: 'standalone',
  
    serverExternalPackages: ['@better-auth/kysely-adapter', 'kysely'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
  },
};

export default nextConfig;