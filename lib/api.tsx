import {
  AboutUs,
  Collections,
  Contact,
  IFooter,
  Menu,
  NewPage,
  News,
  Titles,
} from "@/lib/interfaces";
import { localization } from "@/lib/constants";

async function fetchAPI(url: string, slug?: string, type?: string) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL
      }/api/${url}?locale=${localization}${
        slug?.length > 2 ? `&filters[slug]=${slug}` : ""
      }${type?.length > 2 ? `&filters[type]=${type}` : ""}&populate=deep`,
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
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/navigation/render/navigation-${localization}?type=tree`,
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
      new Error("Failed to fetch APIMenu");
    }

    return json;
  } catch (e) {
    console.error(e);
  }
}

export async function getMenu(): Promise<Menu[]> {
  return await fetchAPIMenu();
}

export async function getTitles(type: string): Promise<Titles> {
  const data = await fetchAPI(`titles`, "", type);
  return data[0]?.attributes;
}

export async function getFooter(): Promise<IFooter> {
  const data = await fetchAPI(`footer`);
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
  const data = await fetchAPI(`new-page`);
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
