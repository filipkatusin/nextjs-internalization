import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Link from "next/link";
import {
  getCollectionBySlug,
  getCollectionPage,
  getCollections,
} from "@/lib/api";
import { CollectionInterface, Collections } from "@/lib/interfaces";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Button from "@/components/Button";
import React, { useRef, useState } from "react";
import StackGrid from "react-stack-grid";
import Lightbox from "react-image-lightbox";
import ScrollLock from "react-scrolllock";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SlidesPerView from "@/components/SlidesPerView";
import useWindowDimensions from "@/components/useWindowDimensions";

interface Props {
  collection: Collections;
  collectionPage: CollectionInterface;
}

export default function CollectionPageSlug({
  collection,
  collectionPage,
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
    <Layout>
      <Container>
        <div
          className={`flex flex-col items-center gap-y-6 mx-auto my-10 lg:gap-y-8 md:w-2/3 lg:w-1/2 md:my-16`}
        >
          <img
            src={getStrapiUrl(
              collection?.attributes?.manufacturer_logo?.data?.attributes?.url
            )}
            alt={""}
            className={`h-14 w-14 -mb-4 md:w-20 md:h-20`}
          />
          <h1 className={`text-center lea leading-tight mt-2 md:mt-6`}>
            {collection ? collection?.attributes?.title : "Loading"}
          </h1>
          <article
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: collection?.attributes?.description ?? "",
            }}
          />
          <div
            className={`flex flex-col md:flex-row space-y-4 md:mt-4 md:space-y-0 md:space-x-4`}
          >
            {collection?.attributes?.shop_link && (
              <Link href={collection?.attributes?.shop_link ?? ""}>
                <a
                  className={`menu-button-card hover:bg-[#a8222b] hover:text-white`}
                >
                  <span className={`inline-block align-middle`}>
                    {collection?.attributes?.shop_button_text}
                  </span>
                  <img
                    src={`/assets/chevron-down.svg`}
                    alt={""}
                    className={`inline-block ml-4`}
                  />
                </a>
              </Link>
            )}
            {collection?.attributes?.checklist?.data?.attributes?.url && (
              <Link
                href={
                  collection?.attributes?.checklist?.data?.attributes?.url ?? ""
                }
              >
                <a
                  className={`menu-button-shop hover:bg-black hover:text-white`}
                >
                  <span className={`inline-block align-middle`}>
                    {collection?.attributes?.checklist_button_text}
                  </span>
                  <img
                    src={`/icons/right-arrow.svg`}
                    alt={""}
                    className={`inline-block ml-4`}
                  />
                </a>
              </Link>
            )}
          </div>
        </div>
        <div className={`h-[1px] bg-neutral-200 w-5/6 mx-auto`} />
        {collection?.attributes?.kolekcia_section?.map((kolekcia) =>
          kolekcia.id % 2 == 0 ? (
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
                  src={getStrapiUrl(kolekcia.image.data.attributes.url)}
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
            <div className={"flex flex-col py-12 md:py-20"}>
              <h2 className={"text-center mb-6 md:mb-12 text-4xl sm:text-5xl"}>
                {collectionPage?.slug_gallery_title}
              </h2>

              <div
                className={`overflow-hidden z-50 ${
                  !galleryIsOpen && galleryHeight >= 800
                    ? "max-h-[800px] background-white-gradient"
                    : "max-h-fit"
                }`}
                ref={galleryRef}
              >
                <StackGrid
                  columnWidth={300}
                  gutterWidth={10}
                  gutterHeight={10}
                  onLayout={() => {
                    setTimeout(() => {
                      setGalleryHeight(galleryRef?.current?.clientHeight);
                    }, 200);
                  }}
                >
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
                </StackGrid>
              </div>

              {galleryHeight >= 800 && (
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
        <div className={"py-12 md:py-20"}>
          <Container>
            <h2 className="font-bold mb-5">
              {collectionPage?.slug_products_title}
            </h2>
          </Container>
          <Splide
            options={{
              speed: 1500,
              rewind: true,
              type: "loop",
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
            {collection?.attributes?.products?.data?.map((product, index) => (
              <SplideSlide key={index}>
                <a
                  className={"group"}
                  href={product?.attributes?.eshop_url}
                  target={"_blank"}
                  key={index}
                >
                  <img src={product?.attributes?.image} alt="" />
                  <h5 className=" px-10 group-hover:underline">
                    {product?.attributes?.title}
                  </h5>
                  <div
                    className="px-4 py-1 price-corner inline-block mx-10 mt-4"
                    style={{
                      color: "white",
                      backgroundColor: "black",
                    }}
                  >
                    {product?.attributes?.price} €
                  </div>
                </a>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}

      <Container>
        {collection?.attributes?.info_section.info_section_item &&
          collection?.attributes?.info_section.info_section_item.length > 0 && (
            <div className={`h-[1px] bg-neutral-200 w-5/6 mx-auto`} />
          )}

        {collection?.attributes?.info_section.info_section_item.length > 0 && (
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

export async function getStaticProps({ locale, params }) {
  const data = (await getCollections(locale, params?.slug)) || [];
  const collectionPage = (await getCollectionPage(locale)) || [];

  return {
    props: {
      collection: {
        ...data[0],
      },
      collectionPage,
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
