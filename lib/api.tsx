import {
  AboutUs,
  Collections,
  Contact,
  Header,
  IFooter,
  MainPage,
  Menu,
  NewPage,
  News,
  Titles,
} from "@/lib/interfaces";
import { localization } from "../lib/constants";

async function fetchAPI(url: string, slug?: string, type?: string) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL
      }/api/${url}?locale=${localization}${
        slug ? `&filters[slug]=${slug}` : ""
      }${type ? `&filters[type]=${type}` : ""}&populate=deep`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status != 200) {
      new Error("Failed request");
    }

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      new Error("Failed to fetch API");
    }

    return json.data;
  } catch (e) {
    console.error(e);
  }
}

async function fetchAPIExternalData(url: string) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${url}?locale=all&populate=deep`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status != 200) {
      new Error("Failed request");
    }

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      new Error("Failed to fetch API");
    }

    return json.data;
  } catch (e) {
    console.error(e);
  }
}

async function fetchAPIMenu() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/navigation/render/navigation-sk?type=tree`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/navigation/render/navigation-en?type=tree`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status != 200) {
      new Error("Failed request");
    }

    if (res2.status != 200) {
      new Error("Failed request2");
    }

    const json = await res.json();
    const json2 = await res2.json();
    if (json.errors) {
      console.error(json.errors);
      new Error("Failed to fetch APIMenu");
    }

    if (json2.errors) {
      console.error(json2.errors);
      new Error("Failed to fetch APIMenu2");
    }

    return [[...json], [...json2]];
  } catch (e) {
    console.error(e);
  }
}

export async function getMenu(): Promise<Menu[][]> {
  return await fetchAPIMenu();
}

export async function getTitles(type: string): Promise<Titles> {
  const data = await fetchAPI(`titles`, "", type);
  return data?.[0]?.attributes;
}

export async function getFooter(): Promise<IFooter> {
  const data = await fetchAPIExternalData(`footer`);
  return data?.attributes;
}

export async function getContactPage(): Promise<Contact> {
  const data = await fetchAPI(`contact`);
  return data?.attributes;
}

export async function getAboutUsPage(): Promise<AboutUs> {
  const data = await fetchAPI(`about-us`);
  return data?.attributes;
}

export async function getCollectionPage(): Promise<NewPage> {
  const data = await fetchAPI(`collection-page`);
  return data?.attributes;
}

export async function getCollections(type: string): Promise<Collections> {
  const data = await fetchAPI(`collection`, "", type);
  return data?.attributes;
}

export async function getCollectionBySlug(slug: string): Promise<Collections> {
  const data = await fetchAPI(`collections`, slug);
  return data?.attributes;
}

export async function getNews(): Promise<News> {
  const data = await fetchAPI(`news`);
  return data?.attributes;
}

export async function getNewsBySlug(slug: string): Promise<News> {
  const data = await fetchAPI(`news`, slug);
  return data?.attributes;
}

export async function getNewPage(): Promise<NewPage> {
  const data = await fetchAPI(`new-page`);
  return data?.attributes;
}

export async function getMainPage(): Promise<MainPage> {
  const data = await fetchAPI(`main-page`);
  return data?.attributes;
}

export async function getHeader(): Promise<Header> {
  const data = await fetchAPIExternalData(`header`);
  return data?.attributes;
}
