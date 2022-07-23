import Link from "next/link";
import Image from "next/image";
import React from "react";
import { News } from "@/lib/interfaces";
import { getStrapiUrl } from "@/lib/get-strapi-url";

interface Props {
  novinka: News;
  newsLink: string;
}

export default function NewsSection({ novinka, newsLink }: Props) {
  return (
    <Link
      className={`w-full`}
      as={`/${newsLink}/${novinka?.attributes?.slug}`}
      href={`/${newsLink}/[slug]`}
    >
      <a style={{ backgroundColor: "#292929" }} className={"group"}>
        {novinka.attributes?.image.data && (
          <div className="h-[360px] sm:h-[400px] relative">
            <Image
              src={
                getStrapiUrl(
                  novinka?.attributes?.image?.data?.attributes?.url
                ) ?? ""
              }
              layout={"fill"}
              objectFit="cover"
              className={"group-hover:scale-[110%] transform transition"}
            />
          </div>
        )}
        <div className="px-6 md:px-10 mt-10 pb-10 ">
          <div className="flex ">
            <div
              className="px-3 py-1 text-sm text-white font-bold date-corner"
              style={{
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
          <div className="text-2xl text-white font mt-5 mb-4 md:w-3/4 group-hover:underline transition-colors">
            {novinka.attributes.title}
          </div>
          <p className={"text-white opacity-60"}>
            {novinka?.attributes?.card_text}
          </p>
        </div>
      </a>
    </Link>
  );
}
