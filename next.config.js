/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AUTH0_SECRET:
      "96a3474d9a432890065d78cdd2d791e848ed37aafafd4d5682c6459764a5b748",
    AUTH0_BASE_URL: "https://pomodoro-lief.vercel.app/",
    AUTH0_ISSUER_BASE_URL: "https://dev-lnq0xdir2fi6r8gx.us.auth0.com",
    AUTH0_CLIENT_ID: "E4bz0FJVbhdnKNQ2EuMeac4jasG8CJM8",
    AUTH0_CLIENT_SECRET:
      "bQOfTtihQ8K0D5ggBcxhGH5XFy8BBj2gdgAn5cQEQo1l_CINC1XovU-bjQL4YG4J",
  },
};

module.exports = nextConfig;
