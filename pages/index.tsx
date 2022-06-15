import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { getMainPage } from "@/lib/api";
import { MainPage } from "@/lib/interfaces";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";

interface Props {
  main: MainPage;
}

export default function HomePage({ main }: Props) {
  return (
    <>
      <Splide
        options={{
          speed: 2000,
          rewind: true,
          type: "loop",
          perPage: 1,
          pauseOnFocus: false,
          pauseOnHover: false,
          autoplay: true,
          interval: 5000,
          pagination: false,
          gap: 30,
          padding: { left: "33%", right: "33%" },
        }}
        className="splide-main-page"
      >
        {main?.collections.data.map((collection, index) => (
          <SplideSlide key={index}>
            <div className="relative lg:h-[400px] 2xl:h-[480px]">
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
                className="absolute top-1/2 left-10 p-5 w-1/2 h-28 flex items-center collections-corner overflow-hidden"
              >
                {collection?.attributes?.title}
              </h5>
              <div className="absolute bottom-5 left-10 z-50">
                <Link href={collection?.attributes?.slug}>
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
      <Container className=" grid grid-cols-3 gap-14 mt-32">
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
            <Link href={link?.button_link}>
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
      <Container className="my-40">
        <div className="border-[0.1px] border-gray flex opacity-20 " />
      </Container>
      <Container>
        <h2 className="font-bold mb-5">{main.product_section.title}</h2>
      </Container>
      <Splide
        options={{
          speed: 2000,
          rewind: true,
          perPage: 4,
          pauseOnFocus: false,
          pauseOnHover: false,
          autoplay: true,
          interval: 5000,
          pagination: false,
          padding: { left: "3%", right: "12%" },
          gap: 20,
        }}
        hasTrack={false}
      >
        <SplideTrack>
          {main.products.data.map((product, index) => (
            <SplideSlide key={index}>
              <section key={index}>
                <div className="h-[420px] relative">
                  <Image
                    src={product.attributes.image.data.attributes.url}
                    layout={"fill"}
                    objectFit="contain"
                  />
                </div>
                <h5 className="text-center px-10">
                  {product.attributes.title}
                </h5>
              </section>
            </SplideSlide>
          ))}
        </SplideTrack>
        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev">Prev</button>
          <button className="splide__arrow splide__arrow--next">Next</button>
        </div>
      </Splide>
      <Container className="mt-10">
        <Link href={main?.product_section?.button_link}>
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
        className="flex flex-col pt-32  mt-40 relative"
        style={{ backgroundColor: "#191919" }}
      >
        <div className=" pointer-events-none">
          <Image src="/assets/v.svg" alt="" layout="fill" />
        </div>
        <h2 className="text-center text-white z-10">
          {main.news_section.title}
        </h2>
        <Container className="grid grid-cols-3 my-20 gap-1 z-10">
          {main?.news?.data?.map((news, index) => (
            <div
              className="p-14"
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
              <h4 className="text-white mt-20">{news.attributes.title}</h4>
              <article
                className="text-white mt-5 opacity-50"
                dangerouslySetInnerHTML={{
                  __html: news?.attributes?.content ?? "",
                }}
              />
            </div>
          ))}
        </Container>
        <Link href={main?.product_section?.button_link}>
          <div>
            <a className="mb-20 flex justify-center">
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
      <Container className="flex flex-col text-center justify-center my-32">
        <div className=" flex justify-center">
          <img
            className="w-20 h-20"
            src={main?.about_section?.logo?.data?.attributes?.url}
            alt=""
          />
        </div>
        <article
          className="mt-10 mx-40 text-5xl bold-text"
          dangerouslySetInnerHTML={{
            __html: main?.about_section?.content ?? "",
          }}
        />
        <Link href={main?.about_section?.button_link}>
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
    </>
  );
}

export async function getStaticProps() {
  const main = (await getMainPage()) || [];

  return {
    props: { main },
  };
}
