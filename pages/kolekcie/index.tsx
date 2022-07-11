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
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Button from "@/components/Button";
import Link from "next/link";

interface Props {
  data: CollectionInterface;
  collections: Collections[];
}

export default function CollectionPage({ data, collections }: Props) {
  const [filters, setFilters] = useState<CollectionsFilters>({
    year: data?.filter_year?.data?.attributes?.title_type?.find(
      (item) => item.filter_type == FilterType.all
    )?.title,
    type: data?.filter_type?.data?.attributes?.title_type?.find(
      (item) => item.filter_type == FilterType.all
    )?.filter_type,
  });

  const checkYear = (data: CollectionInterface, collection: Collections) => {
    return filters.year ===
      data?.filter_year?.data?.attributes?.title_type?.find(
        (item) => item.filter_type == FilterType.all
      )?.title
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
        <div className="flex space-x-5 flex-wrap justify-center max-w-4xl mx-auto">
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

        <div className="flex space-x-10 justify-center mt-8">
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

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center mt-16 gap-10 pb-20">
          {collections?.filter(filterCollections).map((collection, index) => (
            <div key={index} className={"w-full max-w-md"}>
              {collection?.attributes?.image?.data && (
                <div
                  className={` h-80 relative ${
                    collection.attributes.is_published === IsPublished.published
                      ? "group cursor-pointer"
                      : ""
                  }`}
                >
                  <Image
                    src={getStrapiUrl(
                      collection?.attributes.image?.data.attributes?.url
                    )}
                    layout="fill"
                    objectFit="cover"
                    className={
                      "transform transition-transform duration-300 group-hover:scale-[115%]"
                    }
                  />
                  <div
                    className={`absolute top-0 left-0 h-full w-full z-20 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                      collection.attributes.is_published ==
                      IsPublished.unpublished
                        ? "hidden"
                        : "block"
                    }`}
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.80)",
                    }}
                  >
                    <Button
                      label={data?.button_hover_text}
                      link={`/kolekcie/${collection.attributes.slug}`}
                      className={"hover:bg-red uppercase"}
                    ></Button>
                  </div>
                </div>
              )}

              {collection.attributes.is_published === IsPublished.published ? (
                <Link href={`/kolekcie/${collection.attributes.slug}`}>
                  <h5 className="mt-5 mb-4 text-red hover:text-red-hover font-bold md:text-2xl cursor-pointer hover:underline underline-offset-2 transition-colors">
                    {collection.attributes?.title}
                  </h5>
                </Link>
              ) : (
                <h5 className="mt-5 mb-4 text-red font-bold md:text-2xl">
                  {collection.attributes?.title}
                </h5>
              )}

              {collection?.attributes.date && (
                <div>
                  <p className="font-bold mb-1 text-lg">
                    {data?.date_of_release}
                  </p>
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

  data?.filter_year?.data?.attributes?.title_type?.sort(function (a, b) {
    return b.title?.localeCompare(a.title);
  });

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
