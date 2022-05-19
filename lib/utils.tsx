import { RECAPTCHA } from "@/lib/constants";

export const isProduction: boolean = process.env.NODE_ENV === "production";

export const getRecaptchaToken = () =>
  // @ts-ignore
  grecaptcha.execute(RECAPTCHA, { action: "login" });
