import Layout from "@/components/Layout";
import Container from "@/components/Container";
import { getCollectionPage, getCollections, getCompetitions } from "@/lib/api";
import {
  CollectionInterface,
  Collections,
  Competition,
  InitialCollectionsFilterValues,
  IsPublished,
} from "@/lib/interfaces";
import Heading from "@/components/Heading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Button from "@/components/Button";
import Link from "next/link";
import { Field, Form, useFormikContext, withFormik } from "formik";
import FilterButton from "@/components/FilterButton";
import FilterSection from "@/components/FilterSection";
import { useRouter } from "next/router";

interface Props {
  data: CollectionInterface;
  collections: Collections[];
  competitions: Competition[];
}

const initialValues: InitialCollectionsFilterValues = {
  search: "",
  type: [],
  year: [],
  competition: [],
  state: [],
};

function CollectionPage({ data, collections, competitions }: Props) {
  const [mobileFilterOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [typeTitle, setTypeTitle] = useState({});
  const [typeState, setTypeState] = useState({});
  const router = useRouter();
  const { values, setValues, initialValues } =
    useFormikContext<InitialCollectionsFilterValues>();

  useEffect(() => {
    const titleTypes = data?.filter_type?.data?.attributes?.title_type;
    const resultTitles = {};

    titleTypes.map((type) => {
      resultTitles[type.filter_type] = type.title;
    });

    const resultStates = {};

    data?.filter_state?.data?.attributes.title_type.map((state) => {
      resultStates[state?.filter_type] = state.title;
    });

    setTypeState(resultStates);
    setTypeTitle(resultTitles);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const search = params.get("search");
    const type = params.getAll("type");
    const year = params.getAll("year");
    const competition = params.getAll("competition");
    const state = params.getAll("state");

    setValues((values) => ({
      ...values,
      search: search ?? "",
      type: type ?? [],
      year: year ?? [],
      competition: competition ?? [],
      state: state ?? [],
    }));
  }, []);

  useEffect(() => {
    const keys = Object.keys(values);

    keys.forEach((key) => {
      if (values[key].length) {
        router.query[key] = values[key];
      } else {
        delete router.query[key];
      }
    });

    router.push({ query: router.query }, undefined, { shallow: true });
  }, [values]);

  const checkYear = (
    collection: Collections,
    filterValues: InitialCollectionsFilterValues
  ) => {
    return filterValues.year.length === 0
      ? true
      : filterValues.year.includes(
          new Date(collection.attributes.date).getFullYear().toString()
        );
  };

  const checkType = (
    collection: Collections,
    filterValues: InitialCollectionsFilterValues
  ) => {
    return filterValues.type.length === 0
      ? true
      : filterValues.type.includes(collection?.attributes?.collection_type);
  };

  const checkSearch = (
    collection: Collections,
    filterValues: InitialCollectionsFilterValues
  ) => {
    return filterValues.search.length === 0
      ? true
      : filterValues?.search
          ?.toLowerCase()
          ?.split(" ")
          ?.every((word) =>
            collection?.attributes?.title
              ?.toLowerCase()
              ?.split(" ")
              .find((title) => title.startsWith(word))
          );
  };

  const checkCompetition = (
    collection: Collections,
    filterValues: InitialCollectionsFilterValues
  ) => {
    return filterValues?.competition.length === 0
      ? true
      : filterValues?.competition?.includes(
          collection?.attributes?.competition?.data?.attributes?.competition
        );
  };

  const checkState = (
    collection: Collections,
    filterValues: InitialCollectionsFilterValues
  ) => {
    return filterValues?.state?.length === 0
      ? true
      : filterValues?.state?.includes(collection?.attributes?.is_published);
  };

  const filterCollections = (
    collection: Collections,
    filterValues: InitialCollectionsFilterValues
  ) => {
    return (
      checkYear(collection, filterValues) &&
      checkType(collection, filterValues) &&
      checkSearch(collection, filterValues) &&
      checkCompetition(collection, filterValues) &&
      checkState(collection, filterValues)
    );
  };

  return (
    <Layout>
      <Heading label={data.title} />
      <Container className={"flex items-start"}>
        <Form
          className={`mr-4 md:mr-12 xl:mr-20 md:pb-16 fixed md:relative sm:block z-[200] md:z-[1] bg-white w-[90%] md:w-[200px] lg:w-[240px] xl:w-[270px] h-full md:h-auto drop-shadow-xl md:drop-shadow-none md:left-auto top-0 md:top-auto px-10 md:px-0 py-20 md:py-0 transition-all left-0 transform ${
            mobileFilterOpen ? "translate-x-0" : "-translate-x-[100%]"
          }`}
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
            <h5 className={"mb-1 md:text-base"}>{data?.filer_search_text}</h5>
            <Field
              type="text"
              name="search"
              placeholder={data?.filter_search_placeholder}
              className={
                "w-full border-2 border-black px-4 py-2 font-bold placeholder:font-bold focus:outline-none"
              }
            />
          </div>

          <FilterSection
            title={data?.filter_type?.data?.attributes?.title}
            data={data?.filter_type?.data?.attributes?.title_type?.map(
              (type) => {
                return { label: type?.title, value: type?.filter_type };
              }
            )}
            name={"type"}
          />

          <div className={"bg-gray-footer h-[1px] w-full my-4"} />

          <FilterSection
            title={data?.filter_year?.data?.attributes?.title}
            data={data?.filter_year?.data?.attributes?.title_type?.map(
              (year) => {
                return { label: year?.title, value: year?.title };
              }
            )}
            name={"year"}
          />

          <div className={"bg-gray-footer h-[1px] w-full my-4"} />

          <FilterSection
            title={data?.competition_filter_title}
            data={competitions?.map((item) => {
              return {
                label: item?.attributes?.competition,
                value: item?.attributes?.competition,
              };
            })}
            name={"competition"}
          />

          <div className={"bg-gray-footer h-[1px] w-full my-4"} />
          <FilterSection
            title={data?.filter_state?.data?.attributes?.title}
            data={data?.filter_state?.data?.attributes?.title_type?.map(
              (state) => ({
                label: state?.title,
                value: state?.filter_type,
              })
            )}
            name={"state"}
          />
        </Form>

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
                  label={typeTitle[type]}
                  onClick={() =>
                    setValues({
                      ...values,
                      type: [...values.type.filter((item) => item !== type)],
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
                        year: [...values.year.filter((item) => item !== year)],
                      })
                    }
                  />
                </li>
              ))}

            {values?.competition?.map((competition, index) => (
              <li key={competition + index}>
                <FilterButton
                  label={competition}
                  onClick={() =>
                    setValues({
                      ...values,
                      competition: [
                        ...values.competition.filter(
                          (item) => item !== competition
                        ),
                      ],
                    })
                  }
                />
              </li>
            ))}

            {values?.state?.map((state, index) => (
              <li key={index}>
                <FilterButton
                  label={typeState[state]}
                  onClick={() =>
                    setValues({
                      ...values,
                      state: [...values.state.filter((item) => item !== state)],
                    })
                  }
                />
              </li>
            ))}
          </ul>

          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-center gap-10 mt-10"
            }
          >
            {collections
              ?.filter((item) => filterCollections(item, values))
              .map((collection, index) => (
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
                          collection?.attributes.image?.data.attributes?.url ??
                            ""
                        )}
                        layout="fill"
                        objectFit="cover"
                        className={
                          "transform transition-transform duration-300 group-hover:scale-[115%]"
                        }
                        style={
                          collection?.attributes?.is_published ===
                            "unpublished" && {
                            filter: "grayscale(80%)",
                          }
                        }
                      />
                      <Link href={`/kolekcie/${collection.attributes.slug}`}>
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
                            className={"hover:bg-red-hover uppercase"}
                          ></Button>
                        </div>
                      </Link>
                    </div>
                  )}
                  <div className={"flex flex-wrap justify-between"}>
                    {collection?.attributes.date && (
                      <h5
                        className={
                          "cut-corner bg-red inline-block text-sm font-bold text-white py-2 pl-4 pr-5"
                        }
                      >
                        {Intl.DateTimeFormat("sk", {
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(collection?.attributes?.date))}
                      </h5>
                    )}

                    {collection?.attributes?.is_published === "unpublished" && (
                      <h5
                        className={
                          "cut-corner-black bg-black inline-block text-sm font-bold text-white py-2 pl-5 pr-4 ml-auto"
                        }
                      >
                        {data?.unpublished_collection_text}
                      </h5>
                    )}
                  </div>

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
    </Layout>
  );
}

export default withFormik({
  handleSubmit: (values) => {},
  mapPropsToValues: () => ({
    ...initialValues,
  }),
})(CollectionPage);

export async function getStaticProps({ locale }) {
  const data = ((await getCollectionPage(locale)) || []) as CollectionInterface;
  const collections = ((await getCollections(locale)) || []) as Collections[];
  const competitions = (await getCompetitions(locale)) || [];

  data?.filter_year?.data?.attributes?.title_type?.sort(function (a, b) {
    return b.title?.localeCompare(a.title);
  });

  collections
    ?.sort(function (a, b) {
      return (
        b.attributes?.date
          ?.toString()
          .localeCompare(a.attributes?.date?.toString()) ||
        a?.attributes?.title?.localeCompare(b?.attributes?.title)
      );
    })
    .sort((a, b) => {
      return a?.attributes?.is_published.localeCompare(
        b?.attributes?.is_published
      );
    });

  return {
    props: {
      data,
      collections,
      competitions,
    },
  };
}
