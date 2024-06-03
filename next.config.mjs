/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['m.media-amazon.com', 'food-delivery.s3.amazonaws.com',]
    domains: ['s3.ap-southeast-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '/**'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*' // Set your origin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ];
  },
  reactStrictMode: false
};

export default nextConfig;
