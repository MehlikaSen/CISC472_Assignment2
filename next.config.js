/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  serverExternalPackages: []
};

module.exports = nextConfig;
