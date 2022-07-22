import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";
import React from "react";
import { NewsSlug } from "@/lib/interfaces";
import { useRouter } from "next/router";

interface Props {
  imageLink?: string;
  date: Date;
  title: string;
  dateColor?: string;
  content?: string;
  newsSlug?: string;
  className?: string;
  children?: any;
}

const NewsTopBanner: React.FC<Props> = ({
  imageLink,
  title,
  date,
  dateColor,
  content,
  className,
  children,
}) => {
  return (
    <Container className={className}>
      <div
        className="flex flex-col md:flex-row md:max-h-[620px] group"
        style={{ backgroundColor: "#292929" }}
      >
        {imageLink && (
          <div className="md:w-1/2 aspect-square max-h-[500px] md:max-h-[none] relative">
            <Image
              src={imageLink ?? ""}
              layout={"fill"}
              objectFit="cover"
              priority
              className={"group-hover:scale-105 transform transition"}
            />
          </div>
        )}
        <div className="md:w-1/2 px-14 py-10 md:py-16 justify-around flex flex-col space-y-5">
          <div>
            <div
              className="px-3 py-1 cut-corner cut-corner-dark text-sm inline-block text-white font-bold"
              style={{
                backgroundColor: dateColor,
              }}
            >
              {date &&
                Intl.DateTimeFormat("sk", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })?.format(new Date(date))}
            </div>
          </div>

          <h2 className="text-white leading-snug lg:w-3/4 group-hover:underline">
            {title}
          </h2>
          <article
            className="text-white opacity-60"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          <div className={"flex justify-start"}>{children}</div>
        </div>
      </div>
    </Container>
  );
};

export default NewsTopBanner;
