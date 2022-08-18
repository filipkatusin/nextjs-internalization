module.exports = {
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "localhost"],
  },
  i18n: {
    locales: ["sk", "cs"],
    defaultLocale: "sk",
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: "/news",
        destination: "/novinky",
      },
      {
        source: "/news/:slug",
        destination: "/novinky/:slug",
      },
      {
        source: "/collections",
        destination: "/kolekcie",
      },
      {
        source: "/collections/:slug",
        destination: "/kolekcie/:slug",
      },
      {
        source: "/about-us",
        destination: "/o-nas",
      },
      {
        source: "/contact",
        destination: "/kontakt",
      },
      {
        source: "/kolekce",
        destination: "/kolekcie",
      },
      {
        source: "/kolekce/:slug",
        destination: "/kolekcie/:slug",
      },
    ];
  },
};
