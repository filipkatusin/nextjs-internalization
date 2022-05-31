import { AboutUs, Contact } from "@/lib/interfaces";
import { localization } from "@/lib/constants";

async function fetchAPI(query: string, { variables = {} } = {}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
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
  const data = await fetchAPI(
    `
    {
      contact(locale: "${localization}")  {
        data {
          attributes {
            title
            content
            contact_form {
              name
              mail
              phone
              message
              button_text
            }
          }
        }
      }
    }
  `
  );
  return data.contact.data.attributes;
}

export async function getAboutUs(): Promise<AboutUs> {
  const data = await fetchAPI(
    `
    {
      aboutUs(locale: "${localization}")  {
        data {
          attributes {
            title
            content
            images {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `
  );
  return data.aboutUs.data.attributes;
}
