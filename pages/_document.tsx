import Document, { Html, Head, Main, NextScript } from "next/document";
import { RECAPTCHA } from "@/lib/constants";
import { isProduction } from "@/lib/utils";
import React from "react";

const GTM_ID = "GTM-KKNFZZP";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="sk">
        <Head>
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA}`}
          />
          {/*<link rel="stylesheet" href="/assets/tailwind.min.css" />*/}
          {/*<link rel="stylesheet" href="/assets/theme.css" />*/}
        </Head>
        <body className="dark_">
          <Main />
          <NextScript />

          {/* Google Tag Manager */}
          {isProduction && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
          )}
          {/* End Google Tag Manager */}
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          {/* End Google Tag Manager (noscript) */}
        </body>
      </Html>
    );
  }
}
