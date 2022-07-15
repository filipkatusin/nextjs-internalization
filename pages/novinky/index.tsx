import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import { getNewPage, getNews } from "@/lib/api";
import { NewPage, NewsSlug } from "@/lib/interfaces";
import Container from "@/components/Container";
import Button from "@/components/Button";
import React, { useState } from "react";
import { useRouter } from "next/router";
import NewsSection from "@/components/NewsSection";
import Link from "next/link";
import Image from "next/image";

interface Props {
  news: NewsSlug[];
  newPage: NewPage;
}

export default function NewsPage({ news, newPage }: Props) {
  const router = useRouter();
  const newsLink = router.locale == "sk" ? "novinky" : "news";
  const [newsNumber, setNewsNumber] = useState(7);

  return (
    <Layout>
      <Heading label={newPage?.title} />
      <Container>
        {news?.slice(0, 1).map((novinka, index) => (
          <Link
            as={`/${newsLink}/${novinka?.attributes?.slug}`}
            href={`/${newsLink}/[slug]`}
            key={index}
          >
            <a
              className="flex flex-col md:flex-row"
              style={{ backgroundColor: "#292929" }}
            >
              {novinka.attributes?.image?.data && (
                <div className="md:w-1/2 h-80 md:h-[600px] relative">
                  <Image
                    src={novinka?.attributes?.image?.data?.attributes?.url}
                    layout={"fill"}
                    objectFit="cover"
                    priority
                  />
                </div>
              )}
              <div className="md:w-1/2 px-14 py-10 md:py-20 justify-around flex flex-col space-y-5">
                <div>
                  <div
                    className="px-3 py-1 date-corner inline-block"
                    style={{
                      color: novinka.attributes.date_color,
                      backgroundColor: novinka.attributes.date_background_color,
                    }}
                  >
                    {Intl.DateTimeFormat("sk", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }).format(new Date(novinka?.attributes?.date))}
                  </div>
                </div>

                <h2 className="text-white leading-snug lg:w-3/4">
                  {novinka?.attributes?.title}
                </h2>
                <article
                  className="text-white opacity-60"
                  dangerouslySetInnerHTML={{
                    __html: novinka?.attributes?.og_content,
                  }}
                />
                {newPage?.button_slug_title && (
                  <Button
                    className="-ml-1"
                    label={newPage?.button_slug_title}
                    arrow={true}
                    link={`${newsLink}/${novinka?.attributes?.slug}`}
                  />
                )}
              </div>
            </a>
          </Link>
        ))}
      </Container>
      <Container className="grid md:grid-cols-2 xl:grid-cols-3 my-10 md:my-20 gap-10 z-10">
        {news?.slice(1, newsNumber).map((novinka, index) => (
          <NewsSection novinka={novinka} key={index} newsLink={newsLink} />
        ))}
      </Container>
      {newPage?.button_title && (
        <div className="flex justify-center my-10">
          <Button
            onClick={() => setNewsNumber(newsNumber + 6)}
            label={newPage?.button_title}
          />
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const newPage = (await getNewPage(locale)) || [];
  const news = (await getNews(locale)) || [];

  return {
    props: { news, newPage },
  };
}
