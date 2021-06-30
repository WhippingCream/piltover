module.exports = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_SERVER_PATH}/api/:path*`,
      },
    ];
  },
};
