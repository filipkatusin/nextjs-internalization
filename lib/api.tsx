import {
  AboutUs,
  CollectionInterface,
  Collections,
  Contact,
  FaqPage,
  GeneralCondition,
  Header,
  IFooter,
  ISocialNetworks,
  MainPage,
  Menu,
  NewPage,
  News,
  ProductsInfo,
} from "@/lib/interfaces";

async function fetchAPI(url: string, slug?: string, type?: string) {
  if (slug === "cz") {
    slug = "cs";
  }

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

    const res3 = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/navigation/render/navigation-cz?type=tree`,
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

    if (res2.status != 200) {
      new Error("Failed request3");
    }

    const json = await res.json();
    const json2 = await res2.json();
    const json3 = await res3.json();
    if (json.errors) {
      console.error(json.errors);
      new Error("Failed to fetch APIMenu");
    }

    if (json2.errors) {
      console.error(json2.errors);
      new Error("Failed to fetch APIMenu2");
    }

    if (json3.errors) {
      console.error(json3.errors);
      new Error("Failed to fetch APIMenu3");
    }

    return [[...json], [...json2], [...json3]];
  } catch (e) {
    console.error(e);
  }
}

export async function getMenu(): Promise<Menu[][]> {
  return await fetchAPIMenu();
}

export async function getFooter(): Promise<IFooter> {
  const data = await fetchAPIExternalData(`footer`);
  return data?.attributes;
}

export async function getSocialNetworks(): Promise<ISocialNetworks> {
  const data = await fetchAPIExternalData(`social-network`);
  return data?.attributes;
}

export async function getContactPage(localization: string): Promise<Contact> {
  const data = await fetchAPI(`contact?locale=${localization}`);
  return data?.attributes;
}

export async function getFaqPage(localization: string): Promise<FaqPage> {
  const data = await fetchAPI(`faq?locale=${localization}`);
  return data?.attributes;
}

export async function getGeneralConditionsPage(
  localization: string
): Promise<GeneralCondition> {
  const data = await fetchAPI(`general-condition?locale=${localization}`);
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
  return await fetchAPI(
    `collections?locale=${localization}&pagination[pageSize]=100`,
    slug,
    type
  );
}

export async function getCollectionBySlug(): Promise<Collections[]> {
  const data = await fetchAPI(`collections?locale=all`);
  return data?.attributes;
}

export async function getCompetitions(localization: string) {
  return await fetchAPI(`competitions?locale=${localization}`);
}

export async function getNews(
  localization: string,
  slug?: string
): Promise<News[]> {
  return await fetchAPI(`news?locale=${localization}&sort=date:desc`, slug);
}

export async function getNewsBySlug(): Promise<News[]> {
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

export async function getProductsInfo(
  localization: string
): Promise<ProductsInfo> {
  const data = await fetchAPI(`product-info?locale=${localization}`);
  return data?.attributes ?? {};
}

export async function getPlannedCollections(localization: string) {
  const data = await fetchAPI(`planned-collection?locale=${localization}`);
  return data?.attributes;
}

export async function getHeader(): Promise<Header> {
  const data = await fetchAPIExternalData(`header`);
  return data?.attributes;
}
export async function createFormSubmission(formValues) {
  const data = {
    data: {
      name: formValues.name,
      mail: formValues.mail,
      phone: formValues.phone,
      message_type: formValues.message_type,
      message: formValues.message,
      send_email: formValues.send_email,
    },
  };
  await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contact-form-submissions`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res);
      console.log("values", data);
    })
    .catch((res) => {
      console.log(res);
    });
}
