import Container from "@/components/Container";
import Layout from "@/components/Layout";

export default function CollectionPageSlug() {
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
