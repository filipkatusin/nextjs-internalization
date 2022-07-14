import Layout from "@/components/Layout";
import Container from "@/components/Container";
import { getCollectionPage, getCollections } from "@/lib/api";
import {
  CollectionInterface,
  Collections,
  IsPublished,
} from "@/lib/interfaces";
import Heading from "@/components/Heading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Button from "@/components/Button";
import Link from "next/link";
import FilterSection from "@/components/FilterSection";
import { Field, Formik } from "formik";
import FilterButton from "@/components/FilterButton";

interface Props {
  data: CollectionInterface;
  collections: Collections[];
}

interface InitialValues {
  search: string;
  type: string[];
  year: string[];
}

const initialValues: InitialValues = {
  search: "",
  type: [],
  year: [],
};

export default function CollectionPage({ data, collections }: Props) {
  const [mobileFilterOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [typeTitle, setTypeTitle] = useState({});

  useEffect(() => {
    const titleTypes = data?.filter_type?.data?.attributes?.title_type;
    const result = {};

    titleTypes.map((type) => {
      result[type.filter_type] = type.title;
    });

    setTypeTitle(result);
  }, []);

  console.log(typeTitle);

  const checkYear = (collection: Collections, values: InitialValues) => {
    return values.year.length === 0
      ? true
      : values.year.includes(
          new Date(collection.attributes.date).getFullYear().toString()
        );
  };

  const checkType = (collection: Collections, values: InitialValues) => {
    return values.type.length === 0
      ? true
      : values.type.includes(typeTitle[collection.attributes.collection_type]);
  };

  const filterCollections = (
    collection: Collections,
    values: InitialValues
  ) => {
    return checkYear(collection, values) && checkType(collection, values);
  };

  return (
    <Layout>
      <Heading label={data.title} />
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setValues }) => (
          <Container className={"flex items-start"}>
            <aside
              className={`mr-4 md:mr-12 xl:mr-20 fixed md:relative sm:block z-[200] bg-white w-[90%] md:w-[200px] lg:w-[240px] xl:w-[270px] h-full md:h-auto drop-shadow-xl md:drop-shadow-none ${
                mobileFilterOpen ? "left-0" : "-left-[100%]"
              } md:left-auto top-0 md:top-auto px-10 md:px-0 py-20 md:py-0 transition-all`}
            >
              <button
                className={
                  "absolute top-[70px] right-10 p-3 cursor-pointer md:hidden"
                }
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
                <h5 className={"mb-1 md:text-base"}>
                  {data?.filer_search_text}
                </h5>
                <Field
                  type="text"
                  name="search"
                  placeholder={data?.filter_search_placeholder}
                  className={
                    "w-full border-2 border-black px-4 py-2 font-bold capitalize placeholder:font-bold focus:outline-none"
                  }
                />
              </div>

              <FilterSection
                data={data?.filter_type?.data?.attributes}
                name={"type"}
              />

              <div className={"bg-gray-footer h-[1px] w-full my-4"} />

              <FilterSection
                data={data?.filter_year?.data?.attributes}
                name={"year"}
              />
            </aside>

            <section className="flex-1 pb-20">
              <div className={"flex justify-start mb-6 md:hidden"}>
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className={`button-hover-effect bg-white px-5 py-2 flex justify-center  items-center border-2 border-black text-sm font-semibold transition-colors hover:bg-black hover:text-white group`}
                >
                  Filter
                  <img src="/assets/filter.svg" alt="" className={"h-4 ml-1"} />
                </button>
              </div>

              <ul className={"flex flex-wrap custom-gap"}>
                {values.search && (
                  <li>
                    <FilterButton
                      label={values.search}
                      onClick={() =>
                        setValues({
                          ...values,
                          search: "",
                        })
                      }
                    />
                  </li>
                )}

                {values?.type?.map((type, index) => (
                  <li key={type + index}>
                    <FilterButton
                      label={type}
                      onClick={() =>
                        setValues({
                          ...values,
                          type: [
                            ...values.type.filter((item) => item !== type),
                          ],
                        })
                      }
                    />
                  </li>
                ))}

                {values?.year
                  ?.sort((a, b) => parseFloat(a) - parseFloat(b))
                  ?.reverse()
                  ?.map((year, index) => (
                    <li key={year + index}>
                      <FilterButton
                        label={year}
                        onClick={() =>
                          setValues({
                            ...values,
                            year: [
                              ...values.year.filter((item) => item !== year),
                            ],
                          })
                        }
                      />
                    </li>
                  ))}
              </ul>

              <div
                className={
                  "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-10 mt-10"
                }
              >
                {collections
                  ?.filter((item) => filterCollections(item, values))
                  .map((collection, index) => (
                    /*{collections?.map((collection, index) => (*/
                    <div key={index} className={"w-full max-w-md"}>
                      {collection?.attributes?.image?.data && (
                        <div
                          className={` h-80 relative mb-6 ${
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

                      {collection?.attributes.date && (
                        <h5
                          className={
                            "cut-corner bg-red inline-block text-sm font-bold text-white py-2 pl-4 pr-6"
                          }
                        >
                          {Intl.DateTimeFormat("sk", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          }).format(new Date(collection?.attributes?.date))}
                        </h5>
                      )}

                      {collection.attributes.is_published ===
                      IsPublished.published ? (
                        <Link href={`/kolekcie/${collection.attributes.slug}`}>
                          <h5 className="mb-4 hover:text-red font-bold md:text-2xl cursor-pointer hover:underline underline-offset-2 transition-colors mt-4">
                            {collection.attributes?.title}
                          </h5>
                        </Link>
                      ) : (
                        <h5 className="mb-4 font-bold md:text-2xl mt-4">
                          {collection.attributes?.title}
                        </h5>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          </Container>
        )}
      </Formik>
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
