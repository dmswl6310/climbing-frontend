/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/manage/edit",
        destination: "/manage",
        permanent: true,
      },
      {
        source: "/manage/comments",
        destination: "/manage",
        permanent: true,
      },
      {
        source: "/manage/chat",
        destination: "/manage",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oruritest.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/bubu/*",
      },
    ],
  },
};

module.exports = nextConfig;
