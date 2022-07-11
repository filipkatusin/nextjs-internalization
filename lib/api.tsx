import {
  AboutUs,
  CollectionInterface,
  Collections,
  Contact,
  Header,
  IFooter,
  MainPage,
  Menu,
  NewPage,
  NewsSlug,
  Titles,
} from "@/lib/interfaces";

async function fetchAPI(url: string, slug?: string, type?: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${url}${
        slug ? `&filters[slug]=${slug}` : ""
      }${type ? `&filters[type]=${type}` : ""}&populate=deep,4`,
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

export async function getTitles(
  type: string,
  localization: string
): Promise<Titles> {
  const data = await fetchAPI(`titles?locale=${localization}`, "", type);
  return data?.[0]?.attributes;
}

export async function getFooter(): Promise<IFooter> {
  const data = await fetchAPIExternalData(`footer`);
  return data?.attributes;
}

export async function getContactPage(localization: string): Promise<Contact> {
  const data = await fetchAPI(`contact?locale=${localization}`);
  return data?.attributes;
}

export async function getMyCardPage(localization: string): Promise<any> {
  const data = await fetchAPI(`my-card?locale=${localization}`);
  return data?.attributes;
}

export async function getAboutUsPage(localization: string): Promise<AboutUs> {
  const data = await fetchAPI(`about-us?locale=${localization}`);
  return data?.attributes;
}

export async function getCollectionPage(
  localization: string
): Promise<CollectionInterface> {
  const data = await fetchAPI(`collection-page?locale=${localization}`);
  return data?.attributes;
}

export async function getCollections(
  localization: string,
  slug?: string,
  type?: string
): Promise<Collections> {
  return await fetchAPI(`collections?locale=${localization}`, slug, type);
}

export async function getCollectionBySlug(
  localization: string
): Promise<Collections> {
  const data = await fetchAPI(`collections?locale=${localization}`);
  return data?.attributes;
}

export async function getNews(
  localization: string,
  slug?: string
): Promise<NewsSlug[]> {
  return await fetchAPI(`news?locale=${localization}`, slug);
}

export async function getNewsBySlug(): Promise<NewsSlug[]> {
  const data = await fetchAPI(`news?locale=all`);
  return data?.attributes;
}

export async function getNewPage(localization: string): Promise<NewPage> {
  const data = await fetchAPI(`new-page?locale=${localization}`);
  return data?.attributes;
}

export async function getMainPage(localization: string): Promise<MainPage> {
  const data = await fetchAPI(`main-page?locale=${localization}`);
  return data?.attributes;
}

export async function getPlannedCollections(localization: string) {
  const data = await fetchAPI(`planned-collection?locale=${localization}`);
  return data?.attributes;
}

export async function getHeader(): Promise<Header> {
  const data = await fetchAPIExternalData(`header`);
  return data?.attributes;
}
