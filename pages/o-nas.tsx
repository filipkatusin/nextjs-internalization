import Layout from "@/components/Layout";
import { getAboutUsPage, getTitles } from "@/lib/api";
import { AboutUs, Titles } from "@/lib/interfaces";
import Container from "@/components/Container";

interface Props {
  about: AboutUs;
  titles: Titles;
}

export default function AboutUsPage({ about, titles }: Props) {
  return (
    <Layout title={about.title}>
      <Container>
        <div className="font-bold text-4xl my-10">{about.title}</div>
        <article dangerouslySetInnerHTML={{ __html: about.content ?? "" }} />
        {titles?.title_link?.map((t) => (
          <div>{t.title}</div>
        ))}
      </Container>
    </Layout>
  );
}

export async function getStaticProps(locale: string) {
  const about = (await getAboutUsPage(locale)) || [];
  const titles = (await getTitles("collection", locale)) || [];

  return {
    props: { about, titles },
  };
}
