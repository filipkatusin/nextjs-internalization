import {Contact} from "@/lib/interfaces";

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
      contact() {
        title
        content
        form {
            name
            mail
            phone
            message
            text_button
        }
      }
    }
  `
    );

    return data.contact;
}
