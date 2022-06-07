import Layout from "@/components/Layout";
import { getFooter, getMenu, getTitles } from "@/lib/api";
import TopMenu from "@/components/TopMenu";

export default function HomePage({ footer, titles, menu }) {
  return (
    <Layout title={"Úvod"} footer={footer} titles={titles}>
      <TopMenu menu={menu} />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  const footer = (await getFooter()) || [];
  const titles = (await getTitles("footer")) || [];
  const menu = (await getMenu()) || [];

  return {
    props: { footer, titles, menu },
  };
}
