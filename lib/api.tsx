import { AboutUs, Contact } from "@/lib/interfaces";
import { localization } from "@/lib/constants";

async function fetchAPI(url: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${url}?populate=*&locale=${localization}`,
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

export async function getContact(): Promise<Contact> {
  const data = await fetchAPI(`contact`);
  return data.attributes;
}

export async function getAboutUs(): Promise<AboutUs> {
  const data = await fetchAPI(`about-us`);
  return data.attributes;
}
