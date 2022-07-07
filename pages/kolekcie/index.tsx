import Layout from "@/components/Layout";
import Container from "@/components/Container";
import { getCollectionPage, getCollections } from "@/lib/api";
import {
  CollectionInterface,
  Collections,
  CollectionsFilters,
  FilterType,
  IsPublished,
} from "@/lib/interfaces";
import Heading from "@/components/Heading";
import Image from "next/image";
import { useState } from "react";

interface Props {
  data: CollectionInterface;
  collections: Collections[];
}

export default function CollectionPage({ data, collections }: Props) {
  const [filters, setFilters] = useState<CollectionsFilters>({
    year: data?.filter_year.data.attributes.title_type.find(
      (item) => item.filter_type == FilterType.all
    ).title,
    type: data?.filter_type.data.attributes.title_type.find(
      (item) => item.filter_type == FilterType.all
    ).filter_type,
  });

  const checkYear = (data: CollectionInterface, collection: Collections) => {
    return filters.year ===
      data?.filter_year.data.attributes.title_type.find(
        (item) => item.filter_type == FilterType.all
      ).title
      ? true
      : new Date(collection.attributes.date).getFullYear().toString() ===
          filters.year;
  };

  const filterCollections = (collection: Collections) => {
    if (filters.type === FilterType.all) {
      return checkYear(data, collection);
    }

    if (
      filters.type === FilterType.created &&
      collection.attributes.is_published === IsPublished.published
    ) {
      return checkYear(data, collection);
    }

    if (
      filters.type === FilterType.prepared &&
      collection.attributes.is_published === IsPublished.unpublished
    ) {
      return checkYear(data, collection);
    }
  };

  return (
    <Layout>
      <Heading label={data.title} />
      <Container>
        <div className="flex space-x-5 justify-center">
          {data?.filter_year?.data?.attributes?.title_type?.map(
            (title, index) => (
              <div
                key={index}
                className={`py-2 px-3 font-bold hover:text-red cursor-pointer transition-all ${
                  filters.year === title.title ? "text-red" : "text-black"
                }`}
                onClick={() => setFilters({ ...filters, year: title.title })}
              >
                {title.title}
              </div>
            )
          )}
        </div>

        <div className="flex space-x-10 justify-center mt-10">
          {data?.filter_type?.data?.attributes?.title_type?.map(
            (title, index) => (
              <div
                key={index}
                className={`hover:cursor-pointer hover:font-bold hover:text-red ${
                  filters.type === title.filter_type
                    ? "text-red font-bold"
                    : "text-black"
                }`}
                onClick={() =>
                  setFilters({ ...filters, type: title.filter_type })
                }
              >
                {title.title}
              </div>
            )
          )}
        </div>

        <section className="grid grid-cols-3 mt-20 gap-10">
          {collections?.filter(filterCollections).map((collection, index) => (
            <div key={index}>
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
    },
  };
}
