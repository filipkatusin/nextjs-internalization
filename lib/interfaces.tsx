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
  card_image: StrapiImage;
  date: Date;
  cover_image: StrapiImage;
  section: Section[];
  checklist: StrapiImage;
  info: string;
  type: string;
  eshop_link: string;
}

interface Section {
  title: string;
  content: string;
  image: StrapiImage;
}

export interface News {
  title: string;
  content: string;
  image: StrapiImage;
  date: Date;
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
  contact: FooterContact;
  section: FooterSection[];
  newslatter: Newslatter;
}

export interface FooterContact {
  title: string;
  title_value: Title_value[];
}

export interface FooterSection {
  title: string;
  link: TitleLink[];
}

export interface Title_value {
  title: string;
  value: string;
}

export interface Newslatter {
  title: string;
  input_placeholder: string;
  button_text: string;
  approval_text: string;
}

export interface Menu {
  title: string;
  path: string;
  items: Menu[];
}
