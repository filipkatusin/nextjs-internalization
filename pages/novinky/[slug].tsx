import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Image from "next/image";
import { News, NewPage } from "@/lib/interfaces";
import { getNewPage, getNews, getNewsBySlug } from "@/lib/api";
import NewsTopBanner from "@/components/NewsTopBanner";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import { useRouter } from "next/router";
import NewsSection from "@/components/NewsSection";

interface Props {
  news: News;
  nextNews: News[];
  newsPage: NewPage;
}

export default function NewsPageSlug({ news, nextNews, newsPage }: Props) {
  const router = useRouter();
  const newsLink = router.locale == "sk" ? "novinky" : "news";

  return (
    <Layout>
      {!news ? (
        <p className={"text-center py-20"}>
          {router.locale == "sk" ? "Načitava sa..." : "Loading..."}
        </p>
      ) : (
        <div className={"py-8 md:py-12"}>
          <NewsTopBanner
            className={"pointer-events-none"}
            date={news?.attributes?.date}
            title={news?.attributes?.title}
            imageLink={getStrapiUrl(
              news?.attributes?.image?.data?.attributes?.url
            )}
            dateBackgroundColor={news?.attributes?.date_background_color}
            dateColor={news?.attributes?.date_color}
            content={news?.attributes?.card_text}
          >
            <div className={"flex items-center space-x-4"}>
              {news?.attributes?.author_image?.data?.attributes?.url && (
                <Image
                  src={
                    getStrapiUrl(
                      news?.attributes?.author_image?.data?.attributes?.url
                    ) ?? ""
                  }
                  width={50}
                  height={50}
                  className={"rounded-full"}
                />
              )}
              <p className={"text-white font-bold"}>
                {news?.attributes?.author_name}
              </p>
            </div>
          </NewsTopBanner>

          <Container>
            <div className={"max-w-[700px] mx-auto flex flex-col"}>
              <article
                className="rich-text text-xl my-10 mt-14 md:mt-20"
                dangerouslySetInnerHTML={{
                  __html: news?.attributes?.content ?? "",
                }}
              />

              <div className={"flex items-center space-x-4"}>
                {news?.attributes?.author_image?.data?.attributes?.url && (
                  <Image
                    src={
                      getStrapiUrl(
                        news?.attributes?.author_image?.data?.attributes?.url
                      ) ?? ""
                    }
                    width={60}
                    height={60}
                    className={"rounded-full"}
                  />
                )}
                <p className={"text-black font-bold text-lg"}>
                  {news?.attributes?.author_name}
                </p>
              </div>
            </div>
          </Container>

          <Container
            className={"border-t border-black mt-16 md:mt-20 py-12 md:py-20"}
          >
            <h1 className={"text-center mb-8 md:mb-12"}>
              {newsPage?.slug_more_news_text}
            </h1>
            <div
              className={
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
              }
            >
              {nextNews?.map((item, index) => (
                <NewsSection key={index} novinka={item} newsLink={newsLink} />
              ))}
            </div>
          </Container>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps({ locale, params }) {
  const data = await getNews(locale, params.slug);
  const news = (await getNews(locale)) || [];
  const newsPage = (await getNewPage(locale)) || [];

  const threeNews = news
    .slice(0, 4)
    .filter((item) => item.attributes?.slug !== params.slug)
    .slice(0, 3);

  return {
    props: {
      news: {
        ...data[0],
      },
      nextNews: threeNews,
      newsPage: newsPage,
    },
  };
}

export async function getStaticPaths() {
  const allNews = (await getNewsBySlug()) || [];

  return {
    paths: allNews?.map((news) => `/novinky/${news.attributes.slug}`) || [],
    fallback: true,
  };
}
