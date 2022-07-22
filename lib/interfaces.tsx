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

interface TitleContent {
  title: string;
  content: string;
}

interface TitleValues {
  title: string;
  values: {
    text: string;
  }[];
}

export enum FilterType {
  year = "year",
  cars = "cards",
  stickers = "stickers",
}

interface TitleType {
  title: string;
  filter_type: FilterType;
}

export interface Competition {
  attributes: {
    competition: string;
  };
}

export interface Contact {
  title: string;
  content: string;
  contact_form: Form;
}

export interface MyCard {
  title: string;
  title_content: TitleContent[];
  cardsAmounts: {
    title: string;
    cardAmountOption: CardAmountOption[];
    cardAmountText: {
      text: string;
    }[];
    additionalText: string;
  };
  card_amount_text: string;
  design: {
    title: string;
    design_option: {
      title: string;
      images: { data: StrapiImage[] };
    }[];
  };
  card_front_side: TitleValues;
  card_back_side: TitleValues;
  next_step_button_text: string;
}

interface CardAmountOption {
  amount: number;
  baseDesignPrice: string;
  advancedDesignPrice: string;
  customDesignPrice: string;
}

interface Form {
  name: string;
  mail: string;
  phone: string;
  message: string;
  button_text: string;
  name_placeholder: string;
  mail_placeholder: string;
  phone_placeholder: string;
  message_placeholder: string;
}

interface TextImage {
  text: string;
  image: { data: StrapiImage };
  id: number;
}

export interface AboutUs {
  title: string;
  content: string;
  images: { data: StrapiImage[] };
  subheading: string;
  about_general: TextImage[];
  about_crucial_year: TextImage[];
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
      title_type: TitleType[];
    };
  };
}

export enum IsPublished {
  published = "published",
  unpublished = "unpublished",
}

export enum CollectionType {
  cards = "cards",
  stickers = "stickers",
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
    shop_link: string;
    kolekcia_section: {
      title: string;
      text: string;
      image: { data: StrapiImage };
      id: number;
    }[];
    description: string;
    info_section: {
      start: string;
      start_input: string;
      sale: string;
      sale_input: string;
      album: string;
      album_input: string;
      pack: string;
      pack_input: string;
      content: string;
      content_input: string;
    };
    kolekcia: string;
    shop_button_text: string;
    checklist_button_text: string;
    info_title: string;
    collection_type: CollectionType;
    checklist: { data: StrapiImage };
    competition: {
      data: {
        attributes: {
          competition: string;
        };
      };
    };
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
  button_title: string;
  button_slug_title: string;
}

export interface CollectionInterface {
  title: string;
  date_of_release: string;
  filter_year: RelationTitles;
  filter_type: RelationTitles;
  filter_state: RelationTitles;
  filter_planned: RelationTitles;
  button_hover_text: string;
  filter_search_text: string;
  filter_search_placeholder: string;
  competition_filter_title: string;
  unpublished_collection_text: string;
  planned_collection_text: string;
}

export interface InitialCollectionsFilterValues {
  search: string;
  type: string[];
  year: string[];
  competition: string[];
  state: string[];
  plan: string[];
}

export interface CollectionsFilters {
  year: string;
  type: string;
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
  newslatter: Newsletter;
  card_production_section: CardProductionSection;
}

export interface FooterContact {
  title: string;
  title_value: TitleLink[];
}

export interface FooterSection {
  title: string;
  link: TitleLink[];
}

export interface ISocialNetworks {
  title: string;
  social_network_icons: ImageLink[];
  social_network_images: {
    link: string;
    imageurl: string;
  }[];
}

export interface CardProductionSection {
  title: string;
  logo: {
    data: StrapiImage[];
  };
}

export interface Newsletter {
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
  live_section: {
    title: string;
    text: string;
    button_text: string;
    button_link: string;
    logo: { data: StrapiImage };
    images: { data: StrapiImage[] };
  };
  gallery_section: { images: { data: StrapiImage[] } };
  collections: CollectionsRelation;
  news: NewsRelation;
  products: ProductsRelation;
  social_networks: {
    title: string;
    social_network_icon: ImageLink[];
    social_network_image: ImageLink[];
  };
}

export interface PlannedCollections {
  title: string;
  planned_date_text: string;
  published_collection_button_text: string;
  unpublished_collection_text: string;
  collections: {
    data: Collections[];
  };
  show_more_button_text: string;
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
    og_content: string;
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
  socials: {
    link: string;
    image: {
      data: StrapiImage;
    };
  }[];
  button_shop: HeaderComponent;
  button_my_card: HeaderComponent;
  sk_icon: { data: { attributes: { url: string } } };
  en_icon: { data: { attributes: { url: string } } };
}

export interface FaqPage {
  title: string;
  questions: TitleContent[];
  help_text: TitleContent;
  contact_text_button: string;
}

export interface GeneralCondition {
  title: string;
  conditions: string;
}
