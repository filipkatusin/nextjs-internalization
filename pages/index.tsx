import { Splide, SplideSlide } from "@splidejs/react-splide";
import { getMainPage, getPlannedCollections } from "@/lib/api";
import { IsPublished, MainPage, PlannedCollections } from "@/lib/interfaces";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import useWindowDimensions from "@/components/useWindowDimensions";
import SlidesPerView from "@/components/SlidesPerView";
import Layout from "@/components/Layout";
import TextEllipsis from "react-text-ellipsis";
import Button from "@/components/Button";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import { useRouter } from "next/router";
import ImageDiv from "@/components/ImageDiv";

interface Props {
  main: MainPage;
  planned_collections: PlannedCollections;
}

export default function HomePage({ main, planned_collections }: Props) {
  const router = useRouter();
  const colLink = router.locale == "sk" ? "kolekcie" : "collections";
  const newsLink = router.locale == "sk" ? "novinky" : "news";

  let windowWidth = 0;
  if (typeof window !== "undefined") {
    const size = useWindowDimensions();
    windowWidth = size.width;
  }

  return (
    <Layout>
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
        className="splide-main-page"
      >
        {main?.collections?.data.map((collection, index) => (
          <SplideSlide key={index}>
            <div className="relative h-[300px] md:h-[350px] lg:h-[400px] 2xl:h-[480px] 3xl:h-[560px]">
              <Image
                src={collection?.attributes?.image?.data?.attributes?.url}
                layout={"fill"}
                objectFit="cover"
                priority
              />
              <div
                style={{ backgroundColor: "rgba(0,0,0,0.40)" }}
                className="absolute top-0 left-0 w-full h-full z-90"
              />
              <h5
                style={{
                  color: collection?.attributes?.title_color,
                  backgroundColor:
                    collection?.attributes?.title_background_color,
                }}
                className="absolute bottom-5 md:top-1/2 left-2 md:left-10 p-5 w-1/2 h-20 lg:h-28 flex items-center collections-corner overflow-hidden"
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
              <div className="absolute bottom-5 right-2 md:left-10 z-50">
                <Link
                  as={`/${colLink}/${collection?.attributes?.slug}`}
                  href={`/${colLink}/[slug]`}
                >
                  <a className="mt-8">
                    <button className="border border-white text-white px-5 py-3 flex justify-center  items-center">
                      {main.collection_button}
                      <img
                        className="h-3 w-3 ml-3"
                        src={"/icons/right-arrow-white.svg"}
                        alt={""}
                      />
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
      <Container className="grid sm:grid-cols-3 gap-14 mt-20 md:mt-32">
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
      </Container>

      <Container className="my-20 md:my-40">
        <div className="border-[0.1px] border-gray flex opacity-20 " />
      </Container>

      <Container>
        <h2
          className={
            "text-center text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-10 md:mb-16"
          }
        >
          {planned_collections?.title}
        </h2>
        <ul className={"space-y-1 max-w-[1200px] mx-auto"}>
          {planned_collections?.collections?.data?.map((collection, index) => (
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
                    {collection.attributes?.title}
                  </h6>
                  {collection.attributes?.date && (
                    <p className={"text-gray"}>
                      {`${planned_collections?.planned_date_text}: `}
                      {new Intl.DateTimeFormat("sk-SK").format(
                        new Date(collection.attributes?.date)
                      )}
                    </p>
                  )}
                </div>
              </div>
              {collection.attributes.is_published === IsPublished.published ? (
                <Button
                  label={planned_collections?.published_collection_button_text}
                  arrow={true}
                  link={`kolekcie/${collection.attributes.slug}`}
                />
              ) : (
                <p className={"text-gray"}>
                  {planned_collections?.unpublished_collection_text}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Container>

      <Container className="my-20 md:my-40">
        <div className="border-[0.1px] border-gray flex opacity-20 " />
      </Container>
      <Container>
        <h2 className="font-bold mb-5">{main.product_section?.title}</h2>
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
              ? { left: "", right: "10%" }
              : windowWidth > 1000
              ? { left: "0%", right: "15%" }
              : windowWidth > 600
              ? { left: "0%", right: "20%" }
              : { left: "0%", right: "3%" },
          gap: 20,
        }}
        className="splide-products container-products"
      >
        {main.products?.data.map((product, index) => (
          <SplideSlide key={index}>
            <div className="h-[420px] relative">
              <Image
                src={product.attributes.image.data.attributes.url}
                layout={"fill"}
                objectFit="contain"
                priority
              />
            </div>
            <h5 className="text-center px-10">{product.attributes.title}</h5>
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
        className="flex flex-col   mt-40  relative"
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
          {main.news_section?.title}
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
                      src={news?.attributes?.image?.data?.attributes.url}
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
                  <div className="text-white text-2xl font mt-5 mb-10 w-2/3">
                    {news.attributes.title}
                  </div>
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
        <div className="bg-[#F7F7F7] mb-16 flex md:mx-10 flex-col lg:flex-row pb-12 lg:pb-0 justify-between">
          <div className="flex flex-col items-start basis-2/5 p-12">
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
            <Link href={main?.live_section?.button_link}>
              <a className="inline-block mt-10 justify-center">
                <button className="button-hover-effect bg-white px-5 py-3 flex justify-center  items-center border-2 border-black text-sm md:text-base font-semibold transition-colors hover:bg-black hover:text-white">
                  {main?.live_section?.button_text}
                  <div className="arrow h-3 w-3 ml-3" />
                </button>
              </a>
            </Link>
          </div>
          <div className="flex items-center lg:justify-start justify-center space-x-8 overflow-hidden max-w-[680px]">
            {main?.live_section?.images?.data.map((image) => (
              <img
                src={image.attributes.url}
                alt={""}
                className={`h-60 md:h-80`}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="w-20 h-20"
            src={main?.about_section?.logo?.data?.attributes?.url}
            alt=""
          />
        </div>
        <article
          className="mt-10 md:mx-14 lg:mx-24 xl-mx-40 2xl:mx-60 text-lg md:text-2xl lg:text-3xl xl:text-4xl  bold-text mb-10"
          dangerouslySetInnerHTML={{
            __html: main?.about_section?.content ?? "",
          }}
        />
        <Button
          label={main?.about_section?.button_title}
          link={main?.about_section?.button_link}
        />
      </Container>

      <Container className={"flex flex-col items-center mb-20 md:mb-28"}>
        <h2
          className={
            "max-w-md leading-snug text-center mb-6 md:mb-12 text-3xl md:text-4xl"
          }
        >
          {main?.social_networks?.title}
        </h2>
        <ul
          className={
            "flex space-x-6 sm:space-x-10 md:space-x-16 mb-12 md:mb-16"
          }
        >
          {main?.social_networks?.social_network_icon?.map((icon, index) => (
            <li key={index}>
              <a href={icon?.link ?? ""} target={"_blank"}>
                <img
                  src={getStrapiUrl(icon?.image?.data?.attributes?.url)}
                  alt="social icon"
                  className={
                    "h-10 transform transition-transform hover:scale-[120%]"
                  }
                />
              </a>
            </li>
          ))}
        </ul>

        <div className={"flex flex-col sm:flex-row w-full items-center"}>
          <ImageDiv
            imageUrl={
              main?.social_networks?.social_network_image[0]?.image?.data
                ?.attributes?.url
            }
            link={main?.social_networks?.social_network_image[0]?.link}
            className={"background-image flex-2 w-1/3 aspect-square m-1 md:m-2"}
          ></ImageDiv>
          <div className={"flex-5 w-full"}>
            <div className={"flex w-full items-end"}>
              <ImageDiv
                imageUrl={
                  main?.social_networks?.social_network_image[1]?.image?.data
                    ?.attributes?.url
                }
                link={main?.social_networks?.social_network_image[1]?.link}
                className={"flex-5 aspect-video  m-1 md:m-2"}
              ></ImageDiv>
              <ImageDiv
                imageUrl={
                  main?.social_networks?.social_network_image[2]?.image?.data
                    ?.attributes?.url
                }
                link={main?.social_networks?.social_network_image[2]?.link}
                className={"flex-2 aspect-square  m-1 md:m-2"}
              ></ImageDiv>
            </div>
            <div className={"flex w-full items-start"}>
              <ImageDiv
                imageUrl={
                  main?.social_networks?.social_network_image[3]?.image?.data
                    ?.attributes?.url
                }
                link={main?.social_networks?.social_network_image[3]?.link}
                className={"flex-2 aspect-square  m-1 md:m-2"}
              ></ImageDiv>
              <ImageDiv
                imageUrl={
                  main?.social_networks?.social_network_image[4]?.image?.data
                    ?.attributes?.url
                }
                link={main?.social_networks?.social_network_image[4]?.link}
                className={"flex-5 aspect-video  m-1 md:m-2"}
              ></ImageDiv>
            </div>
          </div>
          <ImageDiv
            imageUrl={
              main?.social_networks?.social_network_image[5]?.image?.data
                ?.attributes?.url
            }
            link={main?.social_networks?.social_network_image[5]?.link}
            className={"flex-2 w-1/3 aspect-square m-1 md:m-2"}
          ></ImageDiv>
        </div>
      </Container>

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
          padding: 0,
        }}
        className="gallery-splide bg-[#232221]"
      >
        {main?.gallery_section?.images?.data?.map((image, index) => (
          <SplideSlide key={index}>
            <div className="h-[250px] md:h-[350px] lg:h-[400px] 2xl:h-[480px] 3xl:h-[560px] px-4 flex">
              <img
                src={image.attributes.url}
                alt={""}
                className={`mx-auto max-h-[250px] md:max-h-max md:h-[350px] lg:h-[400px] 2xl:h-[480px] 3xl:h-[560px] self-center`}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
      <section className={"border-top-bottom"}>
        <Container
          className={
            "text-center flex flex-col lg:flex-row lg:justify-between items-center py-16 md:py-20 space-y-8 lg:space-y-0"
          }
        >
          <h3 className={"text-2xl md:text-3xl"}>
            {main?.card_production_section?.title}
          </h3>
          <div
            className={
              "grid grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-6 lg:gap-y-8 justify-items-stretch"
            }
          >
            {main?.card_production_section?.logo?.data?.map((data, index) => (
              <img
                key={index}
                src={getStrapiUrl(data.attributes.url)}
                alt="company logo"
                className={"h-12 sm:h-14 md:h-16"}
              />
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const main = (await getMainPage(locale)) || [];
  const planned_collections = (await getPlannedCollections(locale)) || [];

  return {
    props: { main, planned_collections },
  };
}
