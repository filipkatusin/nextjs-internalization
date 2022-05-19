import "@/styles/main.css";
import { useEffect } from "react";
import { Router } from "next/router";
import { isProduction } from "@/lib/utils";
import { GTMPageView } from "@/lib/gtm";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isProduction) GTMPageView(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return <Component {...pageProps} />;
}
