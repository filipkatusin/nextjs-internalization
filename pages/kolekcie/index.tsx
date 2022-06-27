import Layout from "@/components/Layout";
import Container from "@/components/Container";

export default function CollectionPage() {
  return (
    <Layout>
      <Container>
        <div></div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
