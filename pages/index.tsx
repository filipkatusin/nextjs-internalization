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

interface Props {
  main: MainPage;
}

export default function HomePage({ main }: Props) {
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
          rewind: true,
          type: "loop",
          perPage: 1,
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
                        src="/icons/right-arrow-white.svg"
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
                  <button className="border px-5 py-3 flex justify-center  items-center">
                    {link?.button_title}
                    <img
                      className="h-3 w-3 ml-3"
                      src="/icons/right-arrow.svg"
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
              />
            </div>
            <h5 className="text-center px-10">{product.attributes.title}</h5>
          </SplideSlide>
        ))}
      </Splide>
      <Container className="mt-10 flex justify-center sm:justify-start">
        <Link href={main?.product_section?.button_link ?? ""}>
          <div>
            <a className="mt-8">
              <button className="border px-5 py-3 flex justify-center  items-center">
                {main?.product_section?.button_title}
                <img
                  className="h-3 w-3 ml-3"
                  src="/icons/right-arrow.svg"
                  alt={""}
                />
              </button>
            </a>
          </div>
        </Link>
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
            <div
              className="p-5 sm:p-14 sm:mx-20 md:mx-40 lg:mx-60 xl:mx-0"
              style={{ backgroundColor: "#292929" }}
              key={index}
            >
              <div className="flex">
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
              <h4 className="text-white mt-10 sm:mt-20">
                {news.attributes.title}
              </h4>
              <article
                className="text-white mt-5 opacity-50"
                dangerouslySetInnerHTML={{
                  __html: news?.attributes?.content ?? "",
                }}
              />
            </div>
          ))}
        </Container>
        <Link href={main?.product_section?.button_link ?? ""}>
          <div>
            <a className="mb-10 md:mb-20 flex justify-center">
              <button className="border text-white border-white px-5 py-3 flex justify-center  items-center">
                {main?.product_section?.button_title}
                <img
                  className="h-3 w-3 ml-3"
                  src="/icons/right-arrow-white.svg"
                  alt={""}
                />
              </button>
            </a>
          </div>
        </Link>
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
        <Link href={main?.about_section?.button_link ?? ""}>
          <div>
            <a className="mt-8 flex justify-center">
              <button className="border px-5 py-3 flex justify-center  items-center">
                {main?.about_section?.button_title}
                <img
                  className="h-3 w-3 ml-3"
                  src="/icons/right-arrow.svg"
                  alt={""}
                />
              </button>
            </a>
          </div>
        </Link>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const main = (await getMainPage()) || [];

  return {
    props: { main },
  };
}
