/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:code",
        destination: "/code/:code",
      },
    ];
  },
};

module.exports = nextConfig;
