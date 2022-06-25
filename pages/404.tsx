import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Layout>
        <Head>
          <title>
            {router.locale == "sk" ? "Stránka neexistuje" : "Wrong page"}
          </title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Container>
          <div className="text-center py-10">
            <h1 className="text-3xl">
              {router.locale == "sk"
                ? "Ľutujeme, požadovaná podstránka nebola nájdená"
                : "Sorry, the requested subpage was not found"}
            </h1>
            <p className="text-xl font-medium my-6">
              {router.locale == "sk" ? "Užitočné linky:" : "Useful links:"}
            </p>
            <div className="underline text-3xl font-bold">
              <Link href="/">
                <a>
                  {router.locale == "sk" ? "Domovská stránka" : "Home page"}
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}
