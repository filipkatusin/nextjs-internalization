import Layout from "@/components/Layout";
import Container from "@/components/Container";
import {
  getCollectionPage,
  getCollections,
  getPlannedCollections,
} from "@/lib/api";
import {
  CollectionInterface,
  Collections,
  CollectionsFilters,
  IsPublished,
} from "@/lib/interfaces";
import Heading from "@/components/Heading";
import Image from "next/image";
import { useState } from "react";

interface Props {
  data: CollectionInterface;
  collections: Collections[];
  plannedCollectionsVuids: string[];
}

export default function CollectionPage({
  data,
  collections,
  plannedCollectionsVuids,
}: Props) {
  const [filters, setFilters] = useState<CollectionsFilters>({
    year: data?.filter_year?.data?.attributes?.title_link[0].title,
    type: data?.filter_type?.data?.attributes?.title_link[0].title,
  });

  const filterCollections = (collection) => {
    //vsetky typy
    if (
      filters.type === data?.filter_type?.data?.attributes?.title_link[0].title
    ) {
      return filters.year ===
        data?.filter_year?.data?.attributes?.title_link[0].title
        ? true
        : new Date(collection.attributes.date).getFullYear().toString() ===
            filters.year;
    }

    //vytvorene
    if (
      filters.type ===
        data?.filter_type?.data?.attributes?.title_link[1].title &&
      !plannedCollectionsVuids.includes(collection.attributes.vuid)
    ) {
      return filters.year ===
        data?.filter_year?.data?.attributes?.title_link[0].title
        ? true
        : new Date(collection.attributes.date).getFullYear().toString() ===
            filters.year;
    }

    //pripravujeme
    if (
      filters.type ===
        data?.filter_type?.data?.attributes?.title_link[2].title &&
      plannedCollectionsVuids.includes(collection.attributes.vuid)
    ) {
      return filters.year ===
        data?.filter_year?.data?.attributes?.title_link[0].title
        ? true
        : new Date(collection.attributes.date).getFullYear().toString() ===
            filters.year;
    }
  };

  return (
    <Layout>
      <Heading label={data.title} />
      <Container>
        <div className="flex space-x-5 justify-center">
          {data?.filter_year?.data?.attributes?.title_link?.map((title) => (
            <div
              className={`py-2 px-3 font-bold hover:text-red cursor-pointer transition-all ${
                filters.year === title.title ? "text-red" : "text-black"
              }`}
              onClick={() => setFilters({ ...filters, year: title.title })}
            >
              {title.title}
            </div>
          ))}
        </div>

        <div className="flex space-x-10 justify-center mt-10">
          {data?.filter_type?.data?.attributes?.title_link?.map((title) => (
            <div
              className={`hover:cursor-pointer hover:font-bold hover:text-red ${
                filters.type === title.title
                  ? "text-red font-bold"
                  : "text-black"
              }`}
              onClick={() => setFilters({ ...filters, type: title.title })}
            >
              {title.title}
            </div>
          ))}
        </div>

        <section className="grid grid-cols-3 mt-20 gap-10">
          {collections?.filter(filterCollections).map((collection, index) => (
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
  const data = ((await getCollectionPage(locale)) || []) as CollectionInterface;
  const collections = ((await getCollections(locale)) || []) as Collections[];
  const plannedCollections = (await getPlannedCollections(locale)) || [];

  data?.filter_year?.data?.attributes?.title_link?.sort(function (a, b) {
    return b.title?.localeCompare(a.title);
  });

  if (data?.filter_type?.data?.attributes) {
    data.filter_type.data.attributes.title_link =
      data.filter_type.data.attributes.title_link.reverse();
  }

  collections?.sort(function (a, b) {
    return b.attributes?.date
      ?.toString()
      .localeCompare(a.attributes?.date?.toString());
  });

  return {
    props: {
      data,
      collections,
      plannedCollectionsVuids:
        plannedCollections.collections?.data
          .filter(
            (item) => item.attributes.is_published === IsPublished.published
          )
          .map((item) => item.attributes.vuid) ?? [],
    },
  };
}
