import Head from "next/head";
import React from "react";
import { isProduction } from "@/lib/utils";

interface Props {
  withSeoTags?: boolean;
  title?: string;
  image?: string;
  description?: string;
}

export default function Meta({
  withSeoTags = true,
  title,
  image,
  description,
}: Props) {
  const mainPage = "Sportzoo - " + title;

  return (
    <Head>
      <title>{mainPage}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/*<link*/}
      {/*  rel="apple-touch-icon"*/}
      {/*  sizes="180x180"*/}
      {/*  href="/favicon/apple-touch-icon.png"*/}
      {/*/>*/}
      {/*<link*/}
      {/*  rel="icon"*/}
      {/*  type="image/png"*/}
      {/*  sizes="32x32"*/}
      {/*  href="/favicon/favicon-32x32.png"*/}
      {/*/>*/}
      {/*<link*/}
      {/*  rel="icon"*/}
      {/*  type="image/png"*/}
      {/*  sizes="16x16"*/}
      {/*  href="/favicon/favicon-16x16.png"*/}
      {/*/>*/}
      {/*<link rel="manifest" href="/favicon/site.webmanifest" />*/}
      {/*<link rel="shortcut icon" href="/favicon/favicon.ico" />*/}
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="hokej, sportove, karticky, sport, trading"
      />

      <meta property="og:locale" content="sk" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Sportzoo" />
      <meta property="fb:app_id" content="259196337826599" />
      {withSeoTags && (
        <>
          <meta property="og:title" content={mainPage} key="ogTitle" />
          <meta
            property="og:description"
            content={description}
            key="ogDescription"
          />
          {image ? (
            <meta property="og:image" content={image} key="ogImage" />
          ) : (
            <meta property="og:image" key="ogImage" />
          )}
        </>
      )}

      {/* cookies */}
      {/*{isProduction && (*/}
      {/*  <script src="https://cmp.osano.com/16CVroSfyRw7C8hnN/a01051fc-d7f7-4939-b0a3-0ca8178d1fbc/osano.js" />*/}
      {/*)}*/}
    </Head>
  );
}
