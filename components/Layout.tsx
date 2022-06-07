import React from "react";
import Meta from "@/components/Meta";
import Footer from "@/components/Footer";
import { IFooter, Titles } from "@/lib/interfaces";

interface Props {
  children: any;
  showFooter?: boolean;
  showAppCta?: boolean;
  withSeoTags?: boolean;
  title?: string;
  image?: string;
  description?: string;
  footer: IFooter;
  titles: Titles;
}

export default function Layout({
  children,
  showFooter = true,
  withSeoTags = true,
  title,
  description,
  image,
  footer,
  titles,
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
      {showFooter && <Footer footer={footer} titles={titles} />}
    </>
  );
}
