import Image from "next/image";
import Container from "@/components/Container";
import React from "react";

interface Props {
  imageLink?: string;
  date: Date;
  title: string;
  dateColor?: string;
  dateBackgroundColor?: string;
  content?: string;
  className?: string;
  children?: any;
}

const NewsTopBanner: React.FC<Props> = ({
  imageLink,
  title,
  date,
  dateColor,
  content,
  dateBackgroundColor,
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
        <div className="md:w-1/2 px-6 md:px-14 py-10 md:py-16 justify-around flex flex-col space-y-5">
          <div>
            <div
              className="px-3 py-1 date-corner text-sm inline-block text-white font-bold"
              style={{
                backgroundColor: dateBackgroundColor,
                color: dateColor,
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
