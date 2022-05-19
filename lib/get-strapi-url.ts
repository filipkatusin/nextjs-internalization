import {StrapiImage} from "./interfaces";


export const getStrapiUrl = (path: string | StrapiImage): string => {
  if (path == null) {
    return "";
  }

  return `${
    typeof path !== "string" || path.startsWith("/")
      ? process.env.NEXT_PUBLIC_STRAPI_API_URL
      : ""
  }${path}`;
};
