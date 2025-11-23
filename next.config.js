/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    N8N_BASE_URL: process.env.N8N_BASE_URL,
    N8N_API_KEY: process.env.N8N_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
