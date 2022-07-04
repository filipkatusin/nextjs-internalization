import Layout from "@/components/Layout";
import Container from "@/components/Container";
import { getCollectionPage, getCollections } from "@/lib/api";
import { CollectionInterface, Collections } from "@/lib/interfaces";
import Heading from "@/components/Heading";
import Image from "next/image";

interface Props {
  data: CollectionInterface;
  collections: Collections[];
}

export default function CollectionPage({ data, collections }: Props) {
  data?.filter_year?.data?.attributes?.title_link?.sort(function (a, b) {
    return b.title?.localeCompare(a.title);
  });

  collections?.sort(function (a, b) {
    return b.attributes?.date
      ?.toString()
      .localeCompare(a.attributes?.date?.toString());
  });

  return (
    <Layout>
      <Heading label={data.title} />
      <Container>
        <div className="flex space-x-10 justify-center">
          {data?.filter_year?.data?.attributes?.title_link?.map((title) => (
            <div>{title.title}</div>
          ))}
        </div>
        <div className="flex space-x-10 justify-center mt-20">
          {data?.filter_type?.data?.attributes?.title_link?.map((title) => (
            <div>{title.title}</div>
          ))}
        </div>
        <section className="grid grid-cols-3 mt-20 gap-10">
          {collections?.map((collection, index) => (
            <div>
              {collection?.attributes?.image?.data && (
                <div className="h-80 relative">
                  <Image
                    src={collection?.attributes.image?.data.attributes?.url}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <h5 className="mt-5">{collection.attributes?.title}</h5>
              {collection?.attributes.date && (
                <div>
                  <div className="my-2">{data?.date_of_release}</div>
                  <h5>
                    {Intl.DateTimeFormat("sk", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }).format(new Date(collection?.attributes?.date))}
                  </h5>
                </div>
              )}
            </div>
          ))}
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const data = (await getCollectionPage(locale)) || [];
  const collections = (await getCollections(locale)) || [];

  return {
    props: { data, collections },
  };
}
