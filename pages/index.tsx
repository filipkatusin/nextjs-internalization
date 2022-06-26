import { Splide, SplideSlide } from "@splidejs/react-splide";
import { getMainPage } from "@/lib/api";
import { MainPage } from "@/lib/interfaces";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import useWindowDimensions from "@/components/useWindowDimensions";
import SlidesPerView from "@/components/SlidesPerView";
import Layout from "@/components/Layout";
import TextEllipsis from "react-text-ellipsis";
import Button from "@/components/Button";
import { useState } from "react";
import { getStrapiUrl } from "@/lib/get-strapi-url";

interface Props {
  main: MainPage;
}

export default function HomePage({ main }: Props) {
  const [over, setOver] = useState(9999);

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
            <div className="relative h-[300px] md:h-[350px] lg:h-[400px] 2xl:h-[480px]">
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
                <Link href={collection?.attributes?.slug ?? ""}>
                  <a className="mt-8">
                    <button className="border border-white text-white px-5 py-3 flex justify-center  items-center">
                      {collection?.attributes.button_text}
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
          <section className="" key={index}>
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
              <div>
                <a className="flex justify-center mt-8">
                  <button
                    onMouseOver={() => setOver(index + 100)}
                    onMouseOut={() => setOver(9999)}
                    className="border-2 px-5 py-3 flex justify-center font-semibold items-center transition-all hover:bg-black hover:text-white"
                  >
                    {link?.button_title}
                    <img
                      className="h-3 w-3 ml-3"
                      src={
                        over == index + 100
                          ? "/icons/right-arrow-white.svg"
                          : "/icons/right-arrow.svg"
                      }
                      alt={""}
                    />
                  </button>
                </a>
              </div>
            </Link>
          </section>
        ))}
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
              as={`/novinky/${news?.attributes?.slug}`}
              href="/novinky/[slug]"
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
        <div>
          <Link href={main?.news_section?.button_link ?? ""}>
            <div>
              <a className="mb-10 md:mb-20 flex justify-center">
                <button
                  onMouseOver={() => setOver(1000)}
                  onMouseOut={() => setOver(9999)}
                  className="border text-white border-2 border-white px-5 py-3 flex justify-center items-center transition-all hover:bg-white hover:border-black hover:text-black"
                >
                  {main?.product_section?.button_title}
                  <img
                    className="h-3 w-3 ml-3"
                    src={
                      over == 1000
                        ? "/icons/right-arrow.svg"
                        : "/icons/right-arrow-white.svg"
                    }
                    alt={""}
                  />
                </button>
              </a>
            </div>
          </Link>
        </div>
      </section>
      <Container className="flex flex-col text-center justify-center my-20 md:my-32">
        <div className=" flex justify-center">
          <img
            className="w-20 h-20"
            src={main?.about_section?.logo?.data?.attributes?.url}
            alt=""
          />
        </div>
        <article
          className="mt-10 md:mx-14 lg:mx-24 xl-mx-40 2xl:mx-60 text-lg md:text-2xl lg:text-3xl xl:text-4xl  bold-text"
          dangerouslySetInnerHTML={{
            __html: main?.about_section?.content ?? "",
          }}
        />
        <Button
          label={main?.about_section?.button_title}
          link={main?.about_section?.button_link}
        />
      </Container>
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

  return {
    props: { main },
  };
}
