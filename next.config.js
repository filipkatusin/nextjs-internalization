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
              domain: "filip.the-software.sk",
              defaultLocale: "sk",
          },
          {
              domain: "filip.the-software.cz",
              defaultLocale: "cs",
          },
      ],
  },
}

module.exports = nextConfig
