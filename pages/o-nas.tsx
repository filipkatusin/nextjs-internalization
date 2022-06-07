import Layout from "@/components/Layout";
import { getAboutUsPage, getFooter, getTitles } from "@/lib/api";
import { AboutUs, IFooter, Titles } from "@/lib/interfaces";
import Container from "@/components/Container";

interface Props {
  about: AboutUs;
  titles: Titles;
  footer: IFooter;
  titles_footer: Titles;
}

export default function AboutUsPage({
  about,
  titles,
  titles_footer,
  footer,
}: Props) {
  return (
    <Layout footer={footer} titles={titles_footer} title={about.title}>
      <Container>
        <div className="font-bold text-4xl my-10">{about.title}</div>
        <article dangerouslySetInnerHTML={{ __html: about.content ?? "" }} />
        {titles.title_link.map((t) => (
          <div>{t.title}</div>
        ))}
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const about = (await getAboutUsPage()) || [];
  const titles_footer = (await getTitles("footer")) || [];
  const titles = (await getTitles("collection")) || [];
  const footer = (await getFooter()) || [];

  return {
    props: { about, titles, footer, titles_footer },
  };
}
