export default function CollectionPage() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
