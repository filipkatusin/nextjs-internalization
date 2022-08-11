import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import { getNewPage, getNews } from "@/lib/api";
import { NewPage, News } from "@/lib/interfaces";
import Container from "@/components/Container";
import Button from "@/components/Button";
import React, { useState } from "react";
import { useRouter } from "next/router";
import NewsSection from "@/components/NewsSection";
import Link from "next/link";
import NewsTopBanner from "@/components/NewsTopBanner";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import navigationLinks from "../../navigationLinks.json";

interface Props {
  news: News[];
  newPage: NewPage;
  preview: boolean;
}

export default function NewsPage({ news, newPage, preview }: Props) {
  const router = useRouter();
  const [newsNumber, setNewsNumber] = useState(7);

  const firstNew = news[0]?.attributes;

  return (
    <Layout preview={preview}>
      <Heading label={newPage?.title} className={"text-center"} center={true} />
      <Link
        as={`/${navigationLinks.news[router.locale]}/${firstNew?.slug}`}
        href={`/${navigationLinks.news[router.locale]}/[slug]`}
      >
        <a>
          <NewsTopBanner
            date={firstNew?.date}
            dateColor={firstNew?.date_color}
            dateBackgroundColor={firstNew?.date_background_color}
            title={firstNew?.title}
            content={firstNew?.card_text}
            imageLink={getStrapiUrl(firstNew?.image?.data?.attributes?.url)}
          >
            <Button
              label={newPage?.button_title}
              className={"bg-transparent text-white border-white"}
              arrow={true}
              arrowColor={"white"}
            />
          </NewsTopBanner>
        </a>
      </Link>

      <Container className="grid md:grid-cols-2 xl:grid-cols-3 justify-center my-10 md:my-20 gap-6 lg:gap-8 z-10">
        {news?.slice(1, newsNumber).map((novinka, index) => (
          <NewsSection
            novinka={novinka}
            newsLink={navigationLinks.news[router.locale]}
            key={index}
          />
        ))}
      </Container>
      {newPage?.button_title && news.length > newsNumber && (
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

export async function getStaticProps({ locale, preview = false }) {
  const newPage = (await getNewPage(locale)) || [];
  const news = (await getNews(locale)) || [];

  return {
    props: { news, newPage, preview },
  };
}
