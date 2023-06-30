/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
});

module.exports = withPWA({
  reactStrictMode: false,

  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // svgr 설정 추가
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["nedrug.mfds.go.kr"],
  },
});
