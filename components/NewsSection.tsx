import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function NewsSection({ novinka, newsLink }) {
  return (
    <Link
      as={`/${newsLink}/${novinka?.attributes?.slug}`}
      href={`/${newsLink}/[slug]`}
    >
      <a
        className="md:mx-10 xl:mx-0 max-w-[440px]"
        style={{ backgroundColor: "#292929" }}
      >
        {novinka.attributes?.image.data && (
          <div className="h-[360px]  relative">
            <Image
              src={novinka?.attributes?.image?.data?.attributes?.url ?? ""}
              layout={"fill"}
              objectFit="cover"
            />
          </div>
        )}
        <div className="px-10 mt-10 pb-10 ">
          <div className="flex ">
            <div
              className="px-3 py-1 text-xs date-corner"
              style={{
                color: novinka.attributes.date_color,
                backgroundColor: novinka.attributes.date_background_color,
              }}
            >
              {Intl.DateTimeFormat("sk", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }).format(new Date(novinka.attributes.date))}
            </div>
          </div>
          <div className="text-2xl text-white font mt-5 mb-10 w-3/4">
            {novinka.attributes.title}
          </div>
          <article
            className="text-white opacity-60"
            dangerouslySetInnerHTML={{
              __html: novinka?.attributes?.og_content,
            }}
          />
        </div>
      </a>
    </Link>
  );
}
