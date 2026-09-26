/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  serverExternalPackages: [],
  experimental: { staticGenerationMaxConcurrency: 1 }
};

module.exports = nextConfig;
