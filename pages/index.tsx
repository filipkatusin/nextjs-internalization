import Layout from "@/components/Layout";
import TopMenu from "@/components/TopMenu";

export default function HomePage() {
  return (
    <Layout title={"Úvod"}>
      <TopMenu />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Layout>
  );
}
