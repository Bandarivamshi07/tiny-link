/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/healthz",
        destination: "/api/healthz",
      },
    ];
  },
};

module.exports = nextConfig;
