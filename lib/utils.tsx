import { RECAPTCHA } from "@/lib/constants";

export const isProduction: boolean = process.env.NODE_ENV === "production";

export const getRecaptchaToken = () =>
  // @ts-ignore
  grecaptcha.execute(RECAPTCHA, { action: "login" });

export const formatDate = (date, isFull, locale) => {
  if (isFull) {
    let value = Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));

    return value.replace(/\. /g, "/");
  } else {
    let value = Intl.DateTimeFormat(locale, {
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));

    return value.replace(/\. /g, "/");
  }
};
