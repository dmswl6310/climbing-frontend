/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oruritest.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/bubu/*',
      },
    ],
  },
};

module.exports = nextConfig;
