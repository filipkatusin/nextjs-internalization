import Layout from "@/components/Layout";
import { getAboutUs } from "@/lib/api";
import { AboutUs } from "@/lib/interfaces";

interface Props {
  about: AboutUs;
}

export default function AboutUsPage({ about }: Props) {
  return (
    <Layout title={about.title}>
      <div>
        <div className="font-bold text-4xl">{about.title}</div>
        <article dangerouslySetInnerHTML={{ __html: about.content ?? "" }} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const about = (await getAboutUs()) || [];

  return {
    props: { about },
  };
}
