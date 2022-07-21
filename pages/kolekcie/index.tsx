import Layout from "@/components/Layout";
import Container from "@/components/Container";
import {
  getCollectionPage,
  getCollections,
  getCompetitions,
  getPlannedCollections,
} from "@/lib/api";
import {
  CollectionInterface,
  Collections,
  Competition,
  InitialCollectionsFilterValues,
  IsPublished,
  PlannedCollections,
} from "@/lib/interfaces";
import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
import { Field, Form, useFormikContext, withFormik } from "formik";
import FilterButton from "@/components/FilterButton";
import FilterSection from "@/components/FilterSection";
import { useRouter } from "next/router";
import Image from "next/image";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Button from "@/components/Button";
import Link from "next/link";

interface Props {
  data: CollectionInterface;
  collections: Collections[];
  competitions: Competition[];
  plannedCollections: PlannedCollections;
}

const initialValues: InitialCollectionsFilterValues = {
  search: "",
  type: [],
  year: [],
  competition: [],
  state: [],
  plan: [],
};

function CollectionPage({
  data,
  collections,
  competitions,
  plannedCollections,
}: Props) {
  const [mobileFilterOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [typeTitle, setTypeTitle] = useState({});
  const [typeState, setTypeState] = useState({});
  const [typePlan, setTypePlan] = useState({});
  const router = useRouter();
  const { values, setValues } =
    useFormikContext<InitialCollectionsFilterValues>();

  useEffect(() => {
    const resultTitles = {};
    data?.filter_type?.data?.attributes?.title_type?.map((type) => {
      resultTitles[type.filter_type] = type.title;
    });

    const resultStates = {};
    data?.filter_state?.data?.attributes?.title_type?.map((state) => {
      resultStates[state?.filter_type] = state.title;
    });

    const resultPlans = {};
    data?.filter_planned?.data?.attributes?.title_type?.map((plan) => {
      resultPlans[plan?.filter_type] = plan?.title;
    });

    setTypeState(resultStates);
    setTypeTitle(resultTitles);
    setTypePlan(resultPlans);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const search = params.get("search");
    const type = params.getAll("type");
    const year = params.getAll("year");
    const competition = params.getAll("competition");
    const state = params.getAll("state");
    const plan = params.getAll("plan");

    setValues((values) => ({
      ...values,
      search: search ?? "",
      type: type ?? [],
      year: year ?? [],
      competition: competition ?? [],
      state: state ?? [],
      plan: plan ?? [],
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

  const checkPlanStatus = (
    collection: Collections,
    filterValues: InitialCollectionsFilterValues
  ) => {
    if (
      (filterValues?.plan?.includes("planned") &&
        filterValues?.plan?.includes("notPlanned")) ||
      filterValues?.plan?.length === 0
    ) {
      return true;
    }

    if (filterValues?.plan?.includes("planned")) {
      return checkPlannedCollection(collection);
    }

    if (filterValues?.plan?.includes("notPlanned")) {
      return !checkPlannedCollection(collection);
    }
  };

  const checkPlannedCollection = (collection: Collections): boolean => {
    return (
      plannedCollections?.collections?.data?.findIndex(
        (item) => item?.attributes?.slug === collection?.attributes?.slug
      ) !== -1
    );
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
      checkState(collection, filterValues) &&
      checkPlanStatus(collection, filterValues)
    );
  };

  return (
    <Layout>
      <Heading label={data.title} />
      <Container className={"flex items-start"}>
        <Form
          className={`mr-4 md:mr-12 xl:mr-20 md:pb-16 fixed md:relative sm:block z-[200] md:z-[1] bg-white w-[90%] md:w-[200px] lg:w-[240px] xl:w-[270px] h-full md:h-auto drop-shadow-xl md:drop-shadow-none md:left-auto top-0 md:top-auto px-10 md:px-0 py-20 md:py-0 transition-all left-0 transform overflow-y-auto ${
            mobileFilterOpen
              ? "translate-x-0"
              : "-translate-x-[100%] md:translate-x-0"
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
            <h5 className={"mb-1 text-2xl md:text-lg"}>
              {data?.filter_search_text}
            </h5>
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

          {competitions.length > 0 && (
            <>
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
            </>
          )}

          {data?.filter_state?.data?.attributes?.title_type?.length > 0 && (
            <>
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
            </>
          )}

          {data?.filter_planned?.data?.attributes?.title_type?.length > 0 && (
            <>
              <div className={"bg-gray-footer h-[1px] w-full my-4"} />
              <FilterSection
                title={data?.filter_planned?.data?.attributes?.title}
                data={data?.filter_planned?.data?.attributes?.title_type?.map(
                  (state) => ({
                    label: state?.title,
                    value: state?.filter_type,
                  })
                )}
                name={"plan"}
              />
            </>
          )}
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

            {values?.plan?.map((item, index) => (
              <li key={index}>
                <FilterButton
                  label={typePlan[item]}
                  onClick={() =>
                    setValues({
                      ...values,
                      plan: [...values.plan.filter((item) => item !== item)],
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
              .map((collection, index) =>
                collection?.attributes?.is_published ===
                IsPublished.published ? (
                  <Link
                    key={index}
                    href={
                      collection?.attributes?.is_published ===
                      IsPublished.published
                        ? `/kolekcie/${collection.attributes.slug}`
                        : ""
                    }
                  >
                    <a className={`card-with-tooltip w-full max-w-md relative`}>
                      <div className="absolute top-2 right-2 z-40 h-11 w-11 bg-white p-1 pointer-events-none">
                        <img
                          src={getStrapiUrl(
                            collection?.attributes?.manufacturer_logo?.data
                              ?.attributes?.url
                          )}
                          alt=""
                        />
                      </div>
                      {collection?.attributes?.image?.data && (
                        <div className={` h-80 relative group`}>
                          <Image
                            src={getStrapiUrl(
                              collection?.attributes.image?.data.attributes
                                ?.url ?? ""
                            )}
                            layout="fill"
                            objectFit="cover"
                            className={
                              "transform transition-transform duration-300 group-hover:scale-[115%]"
                            }
                          />

                          <div
                            className={`absolute top-0 left-0 h-full w-full z-20 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 block`}
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.80)",
                            }}
                          >
                            <Button
                              label={data?.button_hover_text}
                              className={"hover:bg-red-hover uppercase"}
                            ></Button>
                          </div>
                        </div>
                      )}
                      <div className={"group pt-4"}>
                        <div
                          className={
                            "flex flex-wrap justify-between items-center"
                          }
                        >
                          {collection?.attributes.date && (
                            <h5
                              className={`cut-corner inline-block text-sm font-bold text-white py-2 pl-4 pr-5 ${
                                checkPlannedCollection(collection)
                                  ? "bg-blue cut-corner-blue"
                                  : "bg-red cut-corner-red"
                              }`}
                            >
                              {Intl.DateTimeFormat("sk", {
                                month: "2-digit",
                                year: "numeric",
                              }).format(new Date(collection?.attributes?.date))}
                            </h5>
                          )}

                          {checkPlannedCollection(collection) && (
                            <p className={"font-bold text-blue text-sm"}>
                              {data?.planned_collection_text}
                            </p>
                          )}
                        </div>

                        <h5 className="mt-4 font-bold md:text-2xl group-hover:text-red group-hover:underline underline-offset-1">
                          {collection.attributes?.title}
                        </h5>
                      </div>
                    </a>
                  </Link>
                ) : (
                  <div className="card-with-tooltip w-full max-w-md relative">
                    <div
                      className={
                        "bottom-triangle tooltip bg-black p-3 absolute rounded-md left-0 right-0 z-40 transform -translate-y-[120%] pointer-events-none"
                      }
                    >
                      <p className={"text-white text-center"}>
                        {data?.unpublished_collection_text}
                      </p>
                    </div>

                    <div className="absolute top-2 right-2 z-40 h-11 w-11 bg-white p-1 pointer-events-none">
                      <img
                        src={getStrapiUrl(
                          collection?.attributes?.manufacturer_logo?.data
                            ?.attributes?.url
                        )}
                        alt=""
                      />
                    </div>

                    {collection?.attributes?.image?.data && (
                      <div className="h-80 relative">
                        <Image
                          src={getStrapiUrl(
                            collection?.attributes.image?.data.attributes
                              ?.url ?? ""
                          )}
                          layout="fill"
                          objectFit="cover"
                          className={
                            "transform transition-transform duration-300 group-hover:scale-[115%]"
                          }
                          style={
                            collection?.attributes?.is_published ===
                              "unpublished" && {
                              opacity: "0.35",
                            }
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
                            className={"hover:bg-red-hover uppercase"}
                          ></Button>
                        </div>
                      </div>
                    )}
                    <div className={"group pt-4"}>
                      <div
                        className={
                          "flex flex-wrap justify-between items-center"
                        }
                      >
                        {collection?.attributes.date && (
                          <h5
                            className={`cut-corner inline-block text-sm font-bold text-white py-2 pl-4 pr-5 ${
                              checkPlannedCollection(collection)
                                ? "bg-blue cut-corner-blue"
                                : "bg-red cut-corner-red"
                            }`}
                          >
                            {Intl.DateTimeFormat("sk", {
                              month: "2-digit",
                              year: "numeric",
                            }).format(new Date(collection?.attributes?.date))}
                          </h5>
                        )}

                        {checkPlannedCollection(collection) && (
                          <p className={"font-bold text-blue text-sm"}>
                            {data?.planned_collection_text}
                          </p>
                        )}
                      </div>

                      <h5 className="mt-4 font-bold md:text-2xl">
                        {collection.attributes?.title}
                      </h5>
                    </div>
                  </div>
                )
              )}
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
  const plannedCollections = (await getPlannedCollections(
    locale
  )) as PlannedCollections;

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
      plannedCollections,
    },
  };
}
