/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config) => {
    config.externalsType = "commonjs";
    config.externals = config.externals || [];
    config.externals.push({
      "@napi-rs/image": "@napi-rs/image",
    });

    return config;
  },
};

module.exports = nextConfig;
