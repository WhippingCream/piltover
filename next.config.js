module.exports = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/ornn-api/:path*",
        destination: `${process.env.BACK_URL}/api/:path*`,
      },
    ];
  },
  images: {
    domains: ["k.kakaocdn.net"],
  },
};
