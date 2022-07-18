import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Link from "next/link";
import { getCollectionBySlug, getCollections } from "@/lib/api";
import { Collections } from "@/lib/interfaces";

interface Props {
  collection: Collections;
}

export default function CollectionPageSlug({ collection }: Props) {
  console.log(collection);
  return (
    <Layout>
      <Container>
        <div
          className={`flex flex-col items-center gap-y-6 mx-auto my-10 lg:gap-y-8 md:w-2/3 lg:w-1/2 md:my-16`}
        >
          <img
            src={
              collection?.attributes?.manufacturer_logo?.data?.attributes?.url
            }
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
            {collection?.attributes?.checklist && (
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
                <img src={kolekcia.image.data.attributes.url} alt={""} />
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
        <div className={`h-[1px] bg-neutral-200 w-5/6 mx-auto`} />
        <h2 className={`mt-20 text-center`}>
          {collection?.attributes?.info_title}
        </h2>
        <div
          className={`mt-10 bg-[#F8F8F8] md:w-2/3 lg:w-1/2 mx-auto grid grid-cols-2 p-4 md:p-8`}
        >
          <div className={`pb-3 font-semibold border-b-[1px] border-stone-200`}>
            {collection?.attributes?.info_section?.start}
          </div>
          <div className={`pb-3 border-b-[1px] border-stone-200`}>
            {collection?.attributes?.info_section?.start_input}
          </div>
          <div className={`py-3 font-semibold border-b-[1px] border-stone-200`}>
            {collection?.attributes?.info_section?.sale}
          </div>
          <Link href={collection?.attributes?.shop_link ?? ""}>
            <a>
              <div className={`py-3 border-b-[1px] border-stone-200`}>
                {collection?.attributes?.info_section?.sale_input}
              </div>
            </a>
          </Link>
          <div className={`py-3 font-semibold border-b-[1px] border-stone-200`}>
            {collection?.attributes?.info_section?.album}
          </div>
          <div className={`py-3 border-b-[1px] border-stone-200`}>
            {collection?.attributes?.info_section?.album_input}
          </div>
          <div className={`py-3 font-semibold border-b-[1px] border-stone-200`}>
            {collection?.attributes?.info_section?.pack}
          </div>
          <div
            className={`py-3 border-b-[1px] border-stone-200`}
            dangerouslySetInnerHTML={{
              __html: collection?.attributes?.info_section?.pack_input ?? "",
            }}
          ></div>
          <div className={`pt-3 font-semibold`}>
            {collection?.attributes?.info_section?.content}
          </div>
          <div
            className={`pt-3`}
            dangerouslySetInnerHTML={{
              __html: collection?.attributes?.info_section?.content_input ?? "",
            }}
          >
            {}
          </div>
        </div>

        {/*<section className="mt-20 border-top-bottom text-center flex flex-col lg:flex-row lg:justify-between items-center py-16 md:py-20 space-y-8 lg:space-y-0">
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
        </section>*/}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ locale, params }) {
  const data = (await getCollections(locale, params?.slug)) || [];

  return {
    props: {
      collection: {
        ...data[0],
      },
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
