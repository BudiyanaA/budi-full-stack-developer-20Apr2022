/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.pravatar.cc', 
      'tuk-cdn.s3.amazonaws.com',
      'images.unsplash.com',
      'tailus.io',
      'firebasestorage.googleapis.com',
    ]
  },
}

module.exports = nextConfig
