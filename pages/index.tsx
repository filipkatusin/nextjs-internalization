import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  getCollections,
  getMainPage,
  getPlannedCollections,
  getProductsInfo,
} from "@/lib/api";
import {
  Collections,
  IsPublished,
  MainPage,
  PlannedCollections,
  PlannedStatus,
  ProductsInfo,
  SlugStrapiImage,
} from "@/lib/interfaces";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import useWindowDimensions from "@/components/useWindowDimensions";
import Layout from "@/components/Layout";
import TextEllipsis from "react-text-ellipsis";
import Button from "@/components/Button";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SocialNetworks from "@/components/SocialNetworks";
import SlidesPerView from "@/components/SlidesPerView";
import { formatDate } from "@/lib/utils";

interface Props {
  main: MainPage;
  planned_collections: PlannedCollections;
  collections_images: SlugStrapiImage[];
  preview: boolean;
  productsInfo: ProductsInfo;
  collections: Collections[];
}

export default function HomePage({
  main,
  planned_collections,
  collections_images,
  preview,
  productsInfo,
  collections,
}: Props) {
  const router = useRouter();
  const locale = router.locale;
  const colLink = router.locale == "sk" ? "kolekcie" : "collections";
  const newsLink = router.locale == "sk" ? "novinky" : "news";
  const [collectionImages, setCollectionImages] = useState<SlugStrapiImage[]>(
    []
  );

  let windowWidth = 0;
  if (typeof window !== "undefined") {
    const size = useWindowDimensions();
    windowWidth = size.width;
  }

  useEffect(() => {
    const images = collections_images
      ?.sort(() => Math.random() - 0.5)
      .slice(0, 10);

    setCollectionImages(images);
  }, []);

  const filterPlannedCollections = (
    collections: Collections[]
  ): Collections[] => {
    return collections?.filter(
      (item) => item?.attributes?.planned_status === PlannedStatus.planned
    );
  };

  return (
    <Layout preview={preview}>
      <Splide
        options={{
          speed: 1500,
          perPage: 1,
          type: "loop",
          pauseOnFocus: true,
          pauseOnHover: true,
          autoplay: true,
          interval: 5000,
          pagination: false,
          gap: 30,
          dragMinThreshold: {
            touch: 10,
            mouse: 10,
          },
          padding:
            windowWidth > 1024
              ? { left: "32%", right: "32%" }
              : windowWidth > 600
              ? { left: "20%", right: "20%" }
              : { left: "0%", right: "0%" },
        }}
        className="splide-main-page mb-20"
      >
        {main?.collections?.data
          ?.sort(
            (collection1, collection2) =>
              new Date(collection1?.attributes?.date).getTime() -
              new Date(collection2?.attributes?.date).getTime()
          )
          ?.reverse()
          ?.map((collection, index) => (
            <SplideSlide
              key={index}
              className="relative h-[300px] md:h-[350px] lg:h-[400px] 2xl:h-[480px] 3xl:h-[560px] splide-slide-main-page"
            >
              <Link
                rel="prefetch"
                as={`/${colLink}/${collection?.attributes?.slug}`}
                href={`/${colLink}/[slug]`}
              >
                <a>
                  <Image
                    src={
                      collection?.attributes?.image?.data?.attributes?.url ?? ""
                    }
                    layout={"fill"}
                    objectFit="cover"
                    priority
                  />
                  <div
                    style={{
                      background:
                        "linear-gradient(360deg, #191919 -8.52%, rgba(25, 25, 25, 0) 100%)",
                    }}
                    className={`absolute top-0 left-0 w-full h-full z-10 transition-all hover:opacity-60 
                }`}
                  />
                  <h5
                    style={{
                      color: collection?.attributes?.title_color,
                      backgroundColor:
                        collection?.attributes?.title_background_color,
                    }}
                    className="absolute bottom-5 md:top-1/2 left-2 md:left-10 p-5 w-1/2 h-20 lg:h-28 flex items-center collections-corner overflow-hidden z-20 pointer-events-none"
                  >
                    <TextEllipsis
                      lines={2}
                      tag={"div"}
                      ellipsisChars={"..."}
                      tagClass={"className"}
                      debounceTimeoutOnResize={200}
                    >
                      {collection?.attributes?.title}
                    </TextEllipsis>
                  </h5>
                  <div className="absolute bottom-5 right-2 md:left-10 z-20 pointer-events-none">
                    <div className="flex">
                      <button
                        className={` splide-slide-main-page-button bg-white px-5 py-3 flex justify-center  items-center border-2 border-black text-sm md:text-base font-semibold transition-colors`}
                      >
                        {main?.collection_button}
                        <div className="arrow h-3 w-3 ml-3" />
                      </button>
                    </div>
                  </div>
                </a>
              </Link>
            </SplideSlide>
          ))}
      </Splide>
      {/*<Container className="grid sm:grid-cols-3 gap-14 mt-20 md:mt-32">
        {main?.link_section?.map((link, index) => (
          <section className="text-center" key={index}>
            <div className="h-[200px] relative">
              <Image
                src={link.icon.data.attributes.url}
                layout={"fill"}
                objectFit="contain"
              />
            </div>
            <h4 className="text-center">{link?.title}</h4>
            <article
              className="text-center mt-7"
              dangerouslySetInnerHTML={{ __html: link?.content ?? "" }}
            />
            <Link href={link?.button_link ?? ""}>
              <a className="inline-block mt-8">
                <button className="button-hover-effect border-2 px-5 py-3 flex justify-center font-semibold items-center transition-all hover:bg-black hover:text-white">
                  {link?.button_title}
                  <div className="arrow h-3 w-3 ml-3" />
                </button>
              </a>
            </Link>
          </section>
        ))}
      </Container>*/}

      {/*
      <Container className="my-20 ">
        <div className="border-[0.1px] border-gray flex opacity-20 " />
      </Container>
*/}

      {filterPlannedCollections(collections)?.length > 0 && (
        <Container>
          <h2
            className={
              "text-center text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] mb-8 sm:mb-10 md:mb-16"
            }
          >
            {planned_collections?.title}
          </h2>
          <ul className={"space-y-1 max-w-[1200px] mx-auto"}>
            {filterPlannedCollections(collections)
              ?.slice(0, 3)
              ?.map((collection, index) => (
                <li
                  key={index}
                  className={
                    "bg-gray-footer flex flex-col md:flex-row justify-between items-center p-4 sm:p-6 md:p-8 space-y-8 md:space-y-0 md:space-x-8"
                  }
                >
                  <div className={"flex items-center"}>
                    {collection?.attributes?.manufacturer_logo?.data?.attributes
                      ?.url && (
                      <img
                        className={"h-12 mr-4 md:mr-8"}
                        src={getStrapiUrl(
                          collection?.attributes?.manufacturer_logo?.data
                            ?.attributes?.url
                        )}
                        alt="manufacturer_logo"
                      />
                    )}
                    <div className={"space-y-1"}>
                      <h6 className={"font-bold"}>
                        {collection?.attributes?.title}
                      </h6>
                      {collection?.attributes?.date && (
                        <p className={"text-gray"}>
                          {`${planned_collections?.planned_date_text}: `}
                          {formatDate(
                            collection?.attributes?.date,
                            collection?.attributes?.date_full,
                            locale
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  {collection?.attributes?.is_published ===
                  IsPublished?.published ? (
                    <Button
                      label={
                        planned_collections?.published_collection_button_text
                      }
                      arrow={true}
                      link={`kolekcie/${collection?.attributes?.slug}`}
                    />
                  ) : (
                    <p className={"text-gray"}>
                      {planned_collections?.unpublished_collection_text}
                    </p>
                  )}
                </li>
              ))}
          </ul>
          {filterPlannedCollections(collections)?.length > 3 && (
            <div className={"flex justify-center mt-6 md:mt-8"}>
              <Button
                label={planned_collections?.show_more_button_text}
                link={"kolekcie?plan=planned"}
              />
            </div>
          )}
        </Container>
      )}

      <Container className="my-20 md:my-40">
        <div className="border-[0.1px] border-gray flex opacity-20 " />
      </Container>
      <Container>
        <h2 className="font-bold mb-5">{main?.product_section?.title}</h2>
      </Container>
      <Splide
        options={{
          speed: 1500,
          rewind: true,
          perPage: SlidesPerView(),
          pauseOnFocus: false,
          pauseOnHover: false,
          autoplay: true,
          interval: 5000,
          pagination: false,
          dragMinThreshold: {
            touch: 10,
            mouse: 10,
          },
          padding:
            windowWidth > 1400
              ? { left: "", right: "12%" }
              : windowWidth > 1000
              ? { left: "0%", right: "15%" }
              : windowWidth > 600
              ? { left: "0%", right: "20%" }
              : { left: "0%", right: "3%" },
          gap: 20,
        }}
        className="splide-products container-products"
      >
        {main?.products?.data.map((product, index) => (
          <SplideSlide key={index}>
            <a
              className={"group mt-auto mb-0"}
              href={product?.attributes?.eshop_url}
              target={"_blank"}
              key={index}
            >
              <img src={product?.attributes?.image} alt="" />
              <div
                className={
                  "flex flex-wrap items-center justify-between px-10 pb-4 pt-2 custom-gap"
                }
              >
                <p className="px-4 py-1 cut-corner cut-corner-white inline-block bg-black text-white">
                  {product?.attributes?.price} €
                </p>

                <p
                  className={`px-4 py-1 text-white ${
                    product?.attributes?.isAvailable
                      ? "cut-corner-left-green"
                      : "cut-corner-left-red"
                  }`}
                >
                  {product?.attributes?.isAvailable
                    ? productsInfo?.available_text
                    : productsInfo?.unavailable_text}
                </p>
              </div>
              <h5 className=" px-10 group-hover:underline">
                {product?.attributes?.title}
              </h5>
            </a>
          </SplideSlide>
        ))}
      </Splide>
      <Container className="mt-10 flex justify-center sm:justify-start">
        <Button
          label={main?.product_section?.button_title}
          link={main?.product_section?.button_link}
        />
      </Container>
      <section
        className="flex flex-col mt-40 relative"
        style={{ backgroundColor: "#191919" }}
      >
        <div className=" pointer-events-none absolute w-full h-full flex">
          <Image
            src="/assets/v.svg"
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <h2 className="text-center text-white z-10 pt-10 md:pt-32">
          {main?.news_section?.title}
        </h2>
        <Container className="grid xl:grid-cols-3 my-10 md:my-20 gap-1 z-10">
          {main?.news?.data?.map((news, index) => (
            <Link
              key={index}
              as={`/${newsLink}/${news?.attributes?.slug}`}
              href={`/${newsLink}/[slug]`}
            >
              <a
                className="sm:mx-20 md:mx-40 lg:mx-60 xl:mx-0 "
                style={{ backgroundColor: "#292929" }}
              >
                {news.attributes?.image.data && (
                  <div className="h-[250px] sm:h-[350px] md:h-[400px] relative">
                    <Image
                      src={news?.attributes?.image?.data?.attributes?.url ?? ""}
                      layout={"fill"}
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="px-5 sm:px-14 mt-10">
                  <div className="flex ">
                    <div
                      className="px-3 py-1 text-xs date-corner"
                      style={{
                        color: news.attributes.date_color,
                        backgroundColor: news.attributes.date_background_color,
                      }}
                    >
                      {Intl.DateTimeFormat("sk", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      }).format(new Date(news.attributes.date))}
                    </div>
                  </div>
                  <div className="text-white text-2xl font mt-5 mb-5 md:w-2/3">
                    {news.attributes.title}
                  </div>
                  <article
                    style={{ opacity: "0.6" }}
                    className="text-white pb-10 md:w-3/4"
                    dangerouslySetInnerHTML={{
                      __html: news.attributes.card_text ?? "",
                    }}
                  />
                </div>
              </a>
            </Link>
          ))}
        </Container>
        <div className="inline-flex justify-center">
          <Link href={main?.news_section?.button_link ?? ""}>
            <a className="mb-10 md:mb-20 inline-block justify-center">
              <button className="button-hover-effect-black border text-white border-2 border-white px-5 py-3 flex justify-center items-center transition-all hover:bg-white hover:border-black hover:text-black">
                {main?.product_section?.button_title}
                <div className="arrow h-3 w-3 ml-3" />
              </button>
            </a>
          </Link>
        </div>
      </section>
      <Container className="flex flex-col text-center justify-center mb-20 mt-16 md:mb-32 md:mt-24">
        <div className="bg-[#F7F7F7] mb-16 flex md:mx-10 flex-col lg:flex-row lg:pb-0 justify-between">
          <div className="flex flex-col items-start basis-2/5 p-6 md:p-12">
            {main && (
              <img
                src={main?.live_section?.logo?.data?.attributes?.url}
                alt={""}
                className={`h-16`}
              />
            )}
            <h3 className="mt-10 text-lg md:text-2xl lg:text-3xl xl:text-4xl bold-text">
              {main?.live_section?.title}
            </h3>
            <article
              className="text-left mt-3"
              dangerouslySetInnerHTML={{
                __html: main?.live_section?.text ?? "",
              }}
            ></article>
            <Link href={main?.live_section?.button_link ?? ""}>
              <a className="inline-block mt-10 justify-center">
                <button className="button-hover-effect bg-white px-5 py-3 flex justify-center  items-center border-2 border-black text-sm md:text-base font-semibold transition-colors hover:bg-black hover:text-white">
                  {main?.live_section?.button_text}
                  <div className="arrow h-3 w-3 ml-3" />
                </button>
              </a>
            </Link>
          </div>
          <div className="flex items-center lg:justify-start justify-center space-x-8 overflow-hidden max-w-[680px]">
            {main?.live_section?.images?.data?.map((image, index) => (
              <img
                key={index}
                src={image?.attributes?.url}
                alt={""}
                className={`h-60 md:h-80`}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <img
            className="w-20 h-20"
            src={main?.about_section?.logo?.data?.attributes?.url}
            alt=""
          />
        </div>
        <article
          className="my-10 md:mx-14 lg:mx-24 xl-mx-40 2xl:mx-60 text-lg md:text-2xl lg:text-3xl xl:text-4xl  bold-text"
          dangerouslySetInnerHTML={{
            __html: main?.about_section?.content ?? "",
          }}
        />
        <div className="flex justify-center">
          <Button
            label={main?.about_section?.button_title}
            link={main?.about_section?.button_link}
          />
        </div>
      </Container>
      <Splide
        options={{
          speed: 1500,
          perPage: windowWidth > 800 ? 3 : 1,
          type: "loop",
          pauseOnFocus: true,
          pauseOnHover: true,
          autoplay: true,
          interval: 5000,
          pagination: false,
          gap: 30,
          rewind: true,
          perMove: 1,
          updateOnMove: true,
          dragMinThreshold: {
            touch: 10,
            mouse: 10,
          },
          padding: 0,
        }}
        className={`gallery-splide bg-[#232221] mb-20 collections_gallery_splide`}
      >
        {collectionImages?.map((item, index) => (
          <SplideSlide key={index}>
            <Link href={`kolekcie/${item?.slug}`}>
              <a>
                <div className="h-[250px] md:h-[350px] lg:h-[400px] 2xl:h-[480px] 3xl:h-[560px] px-4 flex">
                  <img
                    src={getStrapiUrl(item?.image?.attributes?.url)}
                    alt={""}
                    className={`mx-auto max-h-[250px] md:max-h-max md:h-[350px] lg:h-[400px] 2xl:h-[480px] 3xl:h-[560px] self-center`}
                  />
                </div>
              </a>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
      <SocialNetworks />
    </Layout>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  const main = (await getMainPage(locale)) || [];
  const planned_collections = (await getPlannedCollections(locale)) || [];
  const collections = ((await getCollections(locale)) || []) as Collections[];
  const productsInfo = await getProductsInfo(locale);

  const collections_images = [];
  collections.forEach((collection) => {
    if (collection?.attributes?.is_published === IsPublished.published) {
      collection?.attributes?.gallery_images?.data?.map((image) =>
        collections_images.push({
          image: image,
          slug: collection?.attributes?.slug,
        })
      );
    }
  });

  return {
    props: {
      main,
      planned_collections,
      collections_images,
      preview,
      productsInfo,
      collections,
    },
  };
}
