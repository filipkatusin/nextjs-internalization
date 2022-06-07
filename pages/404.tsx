import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import { getFooter, getTitles } from "@/lib/api";

export default function NotFound({ footer, titles }) {
  return (
    <>
      <Layout footer={footer} titles={titles}>
        <Head>
          <title>Stránka neexistuje</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Container>
          <div className="text-center py-10">
            <h1 className="text-3xl">
              Ľutujeme, požadovaná podstránka nebola nájdená
            </h1>
            <p className="text-xl font-medium my-6">Užitočné linky:</p>
            <div className="underline text-3xl font-bold">
              <Link href="/">
                <a>Domovská stránka</a>
              </Link>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const footer = (await getFooter()) || [];
  const titles = (await getTitles("footer")) || [];

  return {
    props: { footer, titles },
  };
}
