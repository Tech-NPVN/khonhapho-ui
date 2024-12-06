/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.pexels.com',
    //     port: '',
    //     pathname: '**',
    //   },
    // ],
  },
};

export default nextConfig;
