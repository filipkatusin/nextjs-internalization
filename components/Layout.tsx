import React from "react";
import Meta from "@/components/Meta";
import Footer from "@/components/Footer";

interface Props {
  children: any;
  showFooter?: boolean;
  showAppCta?: boolean;
  withSeoTags?: boolean;
  title?: string;
  image?: string;
  description?: string;
}

export default function Layout({
  children,
  showFooter = true,
  withSeoTags = true,
  title,
  description,
  image,
}: Props) {
  return (
    <>
      <Meta
        withSeoTags={withSeoTags}
        title={title}
        image={image}
        description={description}
      />
      <div className="min-h-full">
        <main>{children}</main>
      </div>
      {showFooter && <Footer />}
    </>
  );
}
