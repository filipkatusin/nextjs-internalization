import React from "react";
import Meta from "@/components/Meta";
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";
import Link from "next/link";

interface Props {
  children: any;
  showFooter?: boolean;
  showAppCta?: boolean;
  withSeoTags?: boolean;
  title?: string;
  image?: string;
  description?: string;
  preview: boolean;
}

export default function Layout({
  children,
  showFooter = true,
  withSeoTags = true,
  title,
  description,
  image,
  preview,
}: Props) {
  return (
    <>
      <Meta
        withSeoTags={withSeoTags}
        title={title}
        image={image}
        description={description}
      />
      {preview && (
        <div
          className={
            "flex items-center justify-center text-bold p-2 bg-red text-white fixed bottom-0 left-0 right-0 z-[5000000000000000]"
          }
        >
          <p>Preview je zapnutý</p>{" "}
          <Link href={"/api/disable-preview"}>
            <button
              className={"font-bold uppercase underline cursor-pointer ml-2"}
            >
              Vypnuť
            </button>
          </Link>
        </div>
      )}
      <TopMenu />
      <div className="min-h-full">
        <main>{children}</main>
      </div>
      {showFooter && <Footer />}
    </>
  );
}
