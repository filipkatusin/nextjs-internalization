export interface StrapiImage {
  data: {
    attributes: {
      url: string;
      formats: Formats;
      name: string;
    };
  };
}

interface Formats {
  thumbnail: Format;
  large: Format;
  medium: Format;
  small: Format;
}

interface Format {
  url: string;
}

interface ImageLink {
  image: StrapiImage;
  link: string;
}

interface TitleLink {
  title: string;
  link: string;
}

export interface Contact {
  title: string;
  content: string;
  contact_form: Form;
}

interface Form {
  name: string;
  mail: string;
  phone: string;
  message: string;
  button_text: string;
}

export interface AboutUs {
  title: string;
  content: string;
  image: StrapiImage[];
}

export interface Titles {
  title_link: TitleLink[];
  type: string;
}

export interface Collections {
  title: string;
  title_color: string;
  title_background_color: string;
  image: StrapiImage;
  button_text: string;
  slug: string;
}

export interface News {
  title: string;
  content: string;
  date: Date;
  date_color: string;
  date_background_color: string;
  slug: string;
}

export interface NewPage {
  title: string;
  seo: SEO;
}

interface SEO {
  metaTitle: string;
  metaDescription: string;
  metaImage: StrapiImage;
  metaSocial: MetaSocial[];
  keywords: string;
  metaRobots: string;
  structuredData: JSON;
  metaViewport: string;
  canonicalURL: string;
}

interface MetaSocial {
  socialNetwork: string;
  title: string;
  description: string;
  image: StrapiImage;
}

export interface IFooter {
  logo_title: string;
  logo: StrapiImage;
  icons_link: ImageLink[];
  logo_link: ImageLink[];
  rights: string;
}

export interface Menu {
  title: string;
  path: string;
  items: Menu[];
}

export interface MainPage {
  link_section: LinkSection[];
  product_section: TitleButton;
  news_section: TitleButton;
  about_section: {
    content: string;
    logo: StrapiImage;
    button_title: string;
    button_link: string;
  };
  collections: CollectionsRelation;
  news: NewsRelation;
  products: ProductsRelation;
}

interface CollectionsRelation {
  data: CollectionRelation[];
}

interface CollectionRelation {
  attributes: Collections;
}

interface NewsRelation {
  data: NewRelation[];
}

interface NewRelation {
  attributes: News;
}

interface ProductsRelation {
  data: ProductRelation[];
}

interface ProductRelation {
  attributes: Products;
}

export interface Products {
  title: string;
  image: StrapiImage;
  slug: string;
}

interface LinkSection {
  title: string;
  content: string;
  icon: StrapiImage;
  button_title: string;
  button_link: string;
}

interface TitleButton {
  title: string;
  button_title: string;
  button_link: string;
}
