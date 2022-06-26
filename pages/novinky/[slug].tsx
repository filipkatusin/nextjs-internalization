import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Image from "next/image";
import { getNews, getNewsBySlug } from "@/lib/api";
import { NewsSlug } from "@/lib/interfaces";

interface Props {
  news: NewsSlug;
}

export default function NewsPageSlug({ news }: Props) {
  return (
    <Layout>
      <div className="relative w-full h-80">
        {news?.attributes?.image?.data && (
          <Image
            src={news?.attributes?.image?.data?.attributes.url}
            layout="fill"
            objectFit="cover"
          />
        )}
        <Container>
          {news?.attributes?.date && (
            <div className="absolute top-10 text-white bg-red-700 px-4 py-2 font-bold rounded-xl">
              {Intl.DateTimeFormat("sk", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }).format(new Date(news?.attributes?.date))}
            </div>
          )}
          <h2 className="absolute bottom-10 text-white backdrop-blur-md shadow-2xl rounded-full px-5">
            {news?.attributes?.title}
          </h2>
        </Container>
      </div>
      <Container>
        <article
          className="text-xl sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60 my-10"
          dangerouslySetInnerHTML={{ __html: news?.attributes?.content ?? "" }}
        />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ locale, params }) {
  const data = await getNews(locale, params.slug);

  return {
    props: {
      news: {
        ...data[0],
      },
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
