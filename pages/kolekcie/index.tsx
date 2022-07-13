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
import FilterSection from "@/components/FilterSection";

interface Props {
  data: CollectionInterface;
  collections: Collections[];
}

export default function CollectionPage({ data, collections }: Props) {
  // const [filters, setFilters] = useState<CollectionsFilters>({
  //   year: data?.filter_year?.data?.attributes?.title_type?.find(
  //     (item) => item.filter_type == FilterType.all
  //   )?.title,
  //   type: data?.filter_type?.data?.attributes?.title_type?.find(
  //     (item) => item.filter_type == FilterType.all
  //   )?.filter_type,
  // });

  const [mobileFilterOpen, setMobileMenuOpen] = useState<boolean>(true);

  console.log(data);

  // const checkYear = (data: CollectionInterface, collection: Collections) => {
  //   return filters.year ===
  //     data?.filter_year?.data?.attributes?.title_type?.find(
  //       (item) => item.filter_type == FilterType.all
  //     )?.title
  //     ? true
  //     : new Date(collection.attributes.date).getFullYear().toString() ===
  //         filters.year;
  // };
  //
  // const filterCollections = (collection: Collections) => {
  //   if (filters.type === FilterType.all) {
  //     return checkYear(data, collection);
  //   }
  //
  //   if (
  //     filters.type === FilterType.created &&
  //     collection.attributes.is_published === IsPublished.published
  //   ) {
  //     return checkYear(data, collection);
  //   }
  //
  //   if (
  //     filters.type === FilterType.prepared &&
  //     collection.attributes.is_published === IsPublished.unpublished
  //   ) {
  //     return checkYear(data, collection);
  //   }
  // };

  return (
    <Layout>
      <Heading label={data.title} />
      <Container className={"flex items-start"}>
        <aside
          className={`mr-4 md:mr-12 xl:mr-20 fixed md:relative sm:block z-[200] bg-white w-[90%] md:w-[200px] lg:w-[240px] xl:w-[270px] h-full md:h-auto drop-shadow-xl md:drop-shadow-none left-${
            mobileFilterOpen ? "0" : "[-100%]"
          } md:left-auto top-0 md:top-auto px-10 md:px-0 py-20 md:py-0 transition-all`}
        >
          <button
            className={"absolute top-15 right-10 p-3 cursor-pointer md:hidden"}
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="/assets/close.svg"
              alt="close mobile filter button"
              className={"h-6"}
            />
          </button>
          <h4 className={"mb-4 md:text-2xl"}>Filter</h4>
          <div className={"mb-6"}>
            <h5 className={"mb-1 md:text-base"}>Vyhľadať</h5>
            <input
              type="text"
              placeholder={"Vyhľadať kolekciu..."}
              className={
                "w-full border-2 border-black px-4 py-2 font-bold capitalize placeholder:font-bold focus:outline-none"
              }
            />
          </div>

          <FilterSection data={data?.filter_type?.data?.attributes} />

          <div className={"bg-gray-footer h-[1px] w-full my-4"} />

          <FilterSection data={data?.filter_year?.data?.attributes} />
        </aside>

        <section className="flex-1 pb-20">
          <div className={"flex justify-start mb-6 md:hidden"}>
            <Button
              label={"Filter"}
              className={"py-2"}
              onClick={() => setMobileMenuOpen(true)}
            />
          </div>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-10"
            }
          >
            {/*{collections?.filter(filterCollections).map((collection, index) => (*/}
            {collections?.map((collection, index) => (
              <div key={index} className={"w-full max-w-md"}>
                {collection?.attributes?.image?.data && (
                  <div
                    className={` h-80 relative ${
                      collection.attributes.is_published ===
                      IsPublished.published
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
                        className={"hover:bg-red-hover uppercase"}
                      ></Button>
                    </div>
                  </div>
                )}

                {collection.attributes.is_published ===
                IsPublished.published ? (
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
          </div>
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
