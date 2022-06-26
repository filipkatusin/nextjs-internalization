import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import { getNewPage, getNews } from "@/lib/api";
import { NewPage, NewsSlug } from "@/lib/interfaces";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";

interface Props {
  news: NewsSlug[];
  newPage: NewPage;
}

export default function NewsPage({ news, newPage }: Props) {
  return (
    <Layout>
      <Heading label={newPage.title} />
      <Container className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10 mb-10">
        {news.map((one, index) => (
          <Link
            key={index}
            as={`/novinky/${one?.attributes?.slug}`}
            href="/novinky/[slug]"
          >
            <a className="relative transition-all opacity-40 hover:opacity-100 hover:scale-105 duration-500">
              {one.attributes?.image?.data && (
                <div className="h-[250px] sm:h-[350px] md:h-[400px] relative">
                  <Image
                    src={one?.attributes?.image?.data?.attributes.url}
                    layout={"fill"}
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="font-bold my-3">
                {Intl.DateTimeFormat("sk", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).format(new Date(one.attributes.date))}
              </div>
              <h4 style={{ color: "#ff0000" }}>{one.attributes.title}</h4>
            </a>
          </Link>
        ))}
      </Container>
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
