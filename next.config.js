module.exports = {
  async rewrites() {
    return [
      {
        source: "/healthz",
        destination: "/healthz",
      },
    ];
  },
};
