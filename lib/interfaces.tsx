export interface StrapiImage {
  attributes: {
    url: string;
    formats: Formats;
    name: string;
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
  image: { data: StrapiImage };
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
  images: { data: StrapiImage[] };
}

export interface Titles {
  title;
  title_link: TitleLink[];
  type: string;
}

export interface RelationTitles {
  data: {
    attributes: {
      title;
      title_link: TitleLink[];
      type: string;
    };
  };
}

export enum IsPublished {
  published = "published",
  unpublished = "unpublished",
}

export interface Collections {
  attributes: {
    title: string;
    title_color: string;
    title_background_color: string;
    image: { data: StrapiImage };
    date: Date;
    slug: string;
    manufacturer_logo: {
      data: StrapiImage;
    };
    is_published: IsPublished;
  };
}

export interface News {
  title: string;
  content: string;
  image: { data: StrapiImage };
  date: Date;
  date_color: string;
  date_background_color: string;
  slug: string;
}

export interface NewPage {
  title: string;
  seo: SEO;
}

export interface CollectionInterface {
  title: string;
  date_of_release: string;
  filter_year: RelationTitles;
  filter_type: RelationTitles;
}

interface SEO {
  metaTitle: string;
  metaDescription: string;
  metaImage: { data: StrapiImage };
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
  image: { data: StrapiImage };
}

export interface IFooter {
  logo_title: string;
  logo: { data: StrapiImage };
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

export interface CardProductionSection {
  title: string;
  logo: {
    data: StrapiImage[];
  };
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

export interface MainPage {
  collection_button: string;
  link_section: LinkSection[];
  product_section: TitleButton;
  news_section: TitleButton;
  about_section: {
    content: string;
    logo: { data: StrapiImage };
    button_title: string;
    button_link: string;
  };
  collections: CollectionsRelation;
  news: NewsRelation;
  products: ProductsRelation;
  card_production_section: CardProductionSection;
}

export interface PlannedCollections {
  title: string;
  planned_date_text: string;
  published_collection_button_text: string;
  unpublished_collection_text: string;
  collections: {
    data: Collections[];
  };
}

interface CollectionsRelation {
  data: Collections[];
}

interface NewsRelation {
  data: NewRelation[];
}

interface NewRelation {
  attributes: News;
}

export interface NewsSlug {
  attributes: {
    title: string;
    content: string;
    image: { data: StrapiImage };
    date: Date;
    date_color: string;
    date_background_color: string;
    slug: string;
  };
}

interface ProductsRelation {
  data: ProductRelation[];
}

interface ProductRelation {
  attributes: Products;
}

export interface Products {
  title: string;
  image: { data: StrapiImage };
  slug: string;
}

interface LinkSection {
  title: string;
  content: string;
  icon: { data: StrapiImage };
  button_title: string;
  button_link: string;
}

interface TitleButton {
  title: string;
  button_title: string;
  button_link: string;
}

interface HeaderComponent {
  id: number;
  name: string;
  link: string;
}

export interface Header {
  socials: HeaderComponent[];
  button_shop: HeaderComponent;
  button_my_card: HeaderComponent;
  sk_icon: { data: { attributes: { url: string } } };
  en_icon: { data: { attributes: { url: string } } };
}
