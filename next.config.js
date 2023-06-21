/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AUTH0_SECRET:
      "3be1fb71ac4aac307ca310a20f66af7f6c2fdcd3781014af8340f26425c5eb11",
    AUTH0_BASE_URL: "https://pomodoro-lief.vercel.app/",
    AUTH0_ISSUER_BASE_URL: "https://dev-lnq0xdir2fi6r8gx.us.auth0.com",
    AUTH0_CLIENT_ID: "E4bz0FJVbhdnKNQ2EuMeac4jasG8CJM8",
    AUTH0_CLIENT_SECRET:
      "bQOfTtihQ8K0D5ggBcxhGH5XFy8BBj2gdgAn5cQEQo1l_CINC1XovU-bjQL4YG4J",
  },
};

module.exports = nextConfig;
