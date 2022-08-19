/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
      locales: ['sk', 'cs'],
      defaultLocale: 'sk',
      localeDetection: false,
      domains: [
          {
              domain: "test.sportzoo.sk",
              defaultLocale: "sk",
          },
          {
              domain: "test.sportzoo.cz",
              defaultLocale: "cs",
          },
      ],
  },
}

module.exports = nextConfig
