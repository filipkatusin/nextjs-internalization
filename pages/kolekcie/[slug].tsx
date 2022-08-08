import Container from "@/components/Container";
import Layout from "@/components/Layout";
import {
  getCollectionBySlug,
  getCollectionPage,
  getCollections,
  getProductsInfo,
} from "@/lib/api";
import {
  CollectionInterface,
  Collections,
  ProductsInfo,
} from "@/lib/interfaces";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Button from "@/components/Button";
import React, { useRef, useState } from "react";
import Lightbox from "react-image-lightbox";
import ScrollLock from "react-scrolllock";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SlidesPerView from "@/components/SlidesPerView";
import useWindowDimensions from "@/components/useWindowDimensions";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface Props {
  collection: Collections;
  collectionPage: CollectionInterface;
  preview: boolean;
  productsInfo: ProductsInfo;
}

export default function CollectionPageSlug({
  collection,
  collectionPage,
  preview,
  productsInfo,
}: Props) {
  const [infoIsOpen, setInfoIsOpen] = useState<boolean>(false);
  const [galleryIsOpen, setGalleryIsOpen] = useState<boolean>(false);
  const galleryRef = useRef(null);
  const [galleryHeight, setGalleryHeight] = useState<number>(0);
  const infoRef = useRef(null);
  const [lightBoxIsOpen, setLightBoxIsOpen] = useState<boolean>(false);
  const [lightBoxIndex, setLightBoxIndex] = useState<number>(0);
  const images = collection?.attributes?.gallery_images?.data;

  let windowWidth = 0;
  if (typeof window !== "undefined") {
    const size = useWindowDimensions();
    windowWidth = size.width;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <div
          className={`flex flex-col items-center gap-y-6 mx-auto my-10 lg:gap-y-8 md:my-16`}
        >
          <img
            src={getStrapiUrl(
              collection?.attributes?.manufacturer_logo?.data?.attributes?.url
            )}
            alt={""}
            className={`h-14 w-14 -mb-4 md:w-20 md:h-20`}
          />
          <h1
            className={`text-center lea leading-tight mt-2 md:mt-6 md:w-2/3 lg:w-1/2`}
          >
            {collection ? collection?.attributes?.title : "Loading"}
          </h1>
          <article
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: collection?.attributes?.description ?? "",
            }}
          />
          <div className={`flex flex-wrap sm:w-2/3 md:w-3/5 justify-center`}>
            {collection?.attributes?.header_links?.map((headerLink, index) => (
              <Button
                key={index}
                label={headerLink?.title}
                link={headerLink?.link ?? ""}
                arrow={true}
                arrowColor={"white"}
                arrowColorHover={"black"}
                className={
                  "bg-red border-red text-white hover:bg-white hover:border-black hover:text-black m-2"
                }
              />
            ))}

            {collection?.attributes?.header_files?.map((headerFile, index) => (
              <Button
                key={index}
                label={headerFile?.title}
                link={
                  getStrapiUrl(headerFile?.file?.data?.attributes?.url) ?? ""
                }
                arrow={true}
                className={"m-2"}
                target={"_blank"}
              />
            ))}
          </div>
        </div>
        <div className={`h-[1px] bg-neutral-200 w-5/6 mx-auto`} />
        {collection?.attributes?.kolekcia_section?.map((kolekcia, index) =>
          index % 2 == 0 ? (
            <div
              key={kolekcia.id}
              className={
                "flex flex-col lg:flex-row items-center gap-y-6 lg:gap-y-0 lg:gap-x-8 w-5/6 mx-auto my-20"
              }
            >
              <div className={`basis-1/2  `}>
                <h2>{kolekcia.title}</h2>
                <article
                  className="mt-6 opacity-70"
                  dangerouslySetInnerHTML={{ __html: kolekcia.text ?? "" }}
                />
              </div>
              <div className={`basis-1/2`}>
                <img
                  src={
                    getStrapiUrl(kolekcia?.image?.data?.attributes?.url) ?? ""
                  }
                  alt={""}
                />
              </div>
            </div>
          ) : (
            <div
              key={kolekcia.id}
              className={
                "flex flex-col-reverse gap-y-6 lg:flex-row items-center lg:gap-y-0 lg:gap-x-8 w-5/6 mx-auto my-20"
              }
            >
              <div className={`basis-1/2`}>
                <img src={kolekcia.image.data.attributes.url} alt={""} />
              </div>
              <div className={`basis-1/2  `}>
                <h2>{kolekcia.title}</h2>
                <article
                  className="mt-6 opacity-70"
                  dangerouslySetInnerHTML={{ __html: kolekcia.text ?? "" }}
                />
              </div>
            </div>
          )
        )}

        {collectionPage?.slug_gallery_title &&
          collection?.attributes?.gallery_images?.data?.length > 0 && (
            <div className={`h-[1px] bg-neutral-200 w-5/6 mx-auto`} />
          )}

        {collection?.attributes?.gallery_images?.data?.length > 0 && (
          <>
            <Container>
              <div className={"flex flex-col py-12 md:py-20"}>
                <h2
                  className={"text-center mb-6 md:mb-12 text-4xl sm:text-5xl"}
                >
                  {collectionPage?.slug_gallery_title}
                </h2>

                <div
                  className={`overflow-hidden z-50 ${
                    !galleryIsOpen && galleryRef?.current?.clientHeight >= 800
                      ? "max-h-[800px] background-white-gradient"
                      : "max-h-fit"
                  }`}
                  ref={galleryRef}
                >
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{
                      350: 1,
                      600: 2,
                      900: 3,
                      1300: 4,
                    }}
                  >
                    <Masonry gutter={"15px"}>
                      {collection?.attributes?.gallery_images?.data?.map(
                        (image, index) => (
                          <img
                            className={
                              "cursor-pointer hover:scale-105 transform transition-transform"
                            }
                            key={index}
                            src={getStrapiUrl(image?.attributes?.url)}
                            alt="gallery item"
                            loading={"lazy"}
                            onClick={() => {
                              setLightBoxIsOpen(true);
                              setLightBoxIndex(index);
                            }}
                          />
                        )
                      )}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>

                {galleryRef?.current?.clientHeight >= 800 && (
                  <Button
                    label={
                      galleryIsOpen
                        ? collectionPage?.slug_button_text_hide
                        : collectionPage?.slug_button_text_show
                    }
                    className={"mt-8 md:mt-10 mx-auto"}
                    onClick={() => setGalleryIsOpen((prev) => !prev)}
                  />
                )}
              </div>
            </Container>

            {lightBoxIsOpen && (
              <>
                <Lightbox
                  mainSrc={getStrapiUrl(
                    collection?.attributes?.gallery_images?.data?.[
                      lightBoxIndex
                    ]?.attributes?.url
                  )}
                  nextSrc={getStrapiUrl(
                    images?.[(lightBoxIndex + 1) % images?.length]
                  )}
                  prevSrc={getStrapiUrl(
                    images[(lightBoxIndex + images.length - 1) % images.length]
                  )}
                  onMovePrevRequest={() =>
                    setLightBoxIndex(
                      (lightBoxIndex + images.length - 1) % images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setLightBoxIndex((lightBoxIndex + 1) % images.length)
                  }
                  onCloseRequest={() => setLightBoxIsOpen(false)}
                  enableZoom={false}
                  clickOutsideToClose={true}
                />
                <ScrollLock />
              </>
            )}
          </>
        )}
      </Container>

      {collection?.attributes?.products?.data?.length > 0 && (
        <>
          <div className={`h-[1px] bg-neutral-200 w-5/6 mx-auto`} />
          <div className={"py-12 md:py-20"}>
            <Container>
              <h2 className="text-center mb-24 sm:mb-14 text-4xl sm:text-5xl">
                {collectionPage?.slug_products_title}
              </h2>
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
              className="splide-products container-productsd"
            >
              {collection?.attributes?.products?.data?.map((product, index) => (
                <SplideSlide key={index}>
                  <a
                    className={"group"}
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
          </div>
        </>
      )}

      <Container>
        {collection?.attributes?.info_section?.info_section_item &&
          collection?.attributes?.info_section.info_section_item.length > 0 && (
            <div className={`h-[1px] bg-neutral-200 w-5/6 mx-auto`} />
          )}

        {collection?.attributes?.info_section?.info_section_item.length > 0 && (
          <div className={"flex flex-col items-center py-12 md:py-20"}>
            <h2 className={"text-center mb-6 md:mb-12 text-4xl sm:text-5xl"}>
              {collectionPage?.slug_info_title}
            </h2>
            <ul
              ref={infoRef}
              className={`bg-gray-footer w-full max-w-[940px] px-8 py-6 overflow-hidden transition-all ${
                !infoIsOpen && infoRef?.current?.clientHeight >= 450
                  ? "max-h-[450px] background-gray-gradient"
                  : "max-h-fit"
              }`}
            >
              {collection?.attributes?.info_section?.info_section_item?.map(
                (item, index) => (
                  <li
                    key={index}
                    className={
                      "flex flex-col md:flex-row py-2 md:py-4 border-b border-neutral-200 last-of-type:border-none"
                    }
                  >
                    <h4 className={"text-lg md:flex-1"}>{item.title}:</h4>
                    <article
                      dangerouslySetInnerHTML={{ __html: item.content }}
                      className={"text-lg md:flex-1"}
                    />
                  </li>
                )
              )}
            </ul>

            {infoRef?.current?.clientHeight >= 450 && (
              <Button
                label={
                  infoIsOpen
                    ? collectionPage?.slug_button_text_hide
                    : collectionPage?.slug_button_text_show
                }
                className={"mt-8 md:mt-10"}
                onClick={() => setInfoIsOpen((prev) => !prev)}
              />
            )}
          </div>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ locale, params, preview = false }) {
  const data = (await getCollections(locale, params?.slug)) || [];
  const collectionPage = (await getCollectionPage(locale)) || [];
  const productsInfo = await getProductsInfo(locale);

  return {
    props: {
      collection: {
        ...data[0],
      },
      collectionPage,
      preview,
      productsInfo,
    },
  };
}

export async function getStaticPaths() {
  const allCollections = (await getCollectionBySlug()) || [];

  return {
    paths:
      allCollections?.map(
        (collection) => `/kolekcie/${collection?.attributes?.slug}`
      ) || [],
    fallback: true,
  };
}
