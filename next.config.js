module.exports = {
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "localhost"],
  },
  i18n: {
    locales: ["sk", "en"],
    defaultLocale: "sk",
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: "/en/about-us",
        destination: "/en/o-nas",
        locale: false,
      },
      {
        source: "/o-nas",
        destination: "/about-us",
        locale: false,
      },
      {
        source: "/en/news",
        destination: "/en/novinky",
        locale: false,
      },
      {
        source: "/novinky",
        destination: "/news",
        locale: false,
      },
      {
        source: "/en/news/:slug",
        destination: "/en/novinky/:slug",
        locale: false,
      },
      {
        source: "/novinky/:slug",
        destination: "/news/:slug",
        locale: false,
      },
      {
        source: "/en/collections",
        destination: "/en/kolekcie",
        locale: false,
      },
      {
        source: "/kolekcie",
        destination: "/collections",
        locale: false,
      },
      {
        source: "/en/collections/:slug",
        destination: "/en/kolekcie/:slug",
        locale: false,
      },
      {
        source: "/kolekcie/:slug",
        destination: "/collections/:slug",
        locale: false,
      },
      {
        source: "/en/contact",
        destination: "/en/kontakt",
        locale: false,
      },
      {
        source: "/kontakt",
        destination: "/contact",
        locale: false,
      },
      {
        source: "/en/preparing",
        destination: "/en/pripravujeme",
        locale: false,
      },
      {
        source: "/en/products",
        destination: "/en/produkty",
        locale: false,
      },
    ];
  },
};
