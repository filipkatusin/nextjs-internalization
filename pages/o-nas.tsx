import Layout from "@/components/Layout";
import { getAboutUsPage } from "@/lib/api";
import { AboutUs, Titles } from "@/lib/interfaces";
import Container from "@/components/Container";
import Lightbox from "react-image-lightbox";
import { useState } from "react";
import Heading from "@/components/Heading";
import SocialNetworks from "@/components/SocialNetworks";
import { getStrapiUrl } from "@/lib/get-strapi-url";

interface Props {
  about: AboutUs;
  titles: Titles;
  preview: boolean;
}

export default function AboutUsPage({ about, preview }: Props) {
  //const [open, setOpen] = useState(false);
  //const [photoIndex, setPhotoIndex] = useState(0);

  //const twoFunctions = (n) => {
  //  setOpen(true);
  //  setPhotoIndex(n);
  //};

  return (
    <Layout title={about.title} preview={preview}>
      <Heading label={about.title} />
      <Container>
        {about?.about_general?.map((s) =>
          s.id % 2 == 0 ? (
            <div
              className={`flex flex-col-reverse gap-y-6 lg:flex-row items-center lg:gap-y-0 lg:gap-x-8 mx-auto mb-10 lg:mb-20 w-11/12`}
            >
              <div className={`basis-1/2`}>
                <img src={getStrapiUrl(s.image.data.attributes.url)} alt={""} />
              </div>
              <article
                className={`basis-1/2`}
                dangerouslySetInnerHTML={{ __html: s.text ?? "" }}
              ></article>
            </div>
          ) : (
            <div
              className={`flex flex-col lg:flex-row items-center gap-y-6 lg:gap-y-0 lg:gap-x-8 mx-auto mb-10 lg:mb-20 w-11/12`}
            >
              <article
                className={`basis-1/2`}
                dangerouslySetInnerHTML={{ __html: s.text ?? "" }}
              ></article>
              <div className={`basis-1/2`}>
                <img src={getStrapiUrl(s.image.data.attributes.url)} alt={""} />
              </div>
            </div>
          )
        )}

        <h2
          className={`text-center md:w-2/3 lg:w-1/2 md:mx-auto mb-10 lg:mb-20`}
        >
          {about.subheading}
        </h2>
        {about?.about_crucial_year?.map((s) =>
          s.id % 2 == 0 ? (
            <div
              className={`flex flex-col-reverse gap-y-6 lg:flex-row items-center lg:gap-y-0 lg:gap-x-8 mx-auto mb-10 lg:mb-20 w-11/12`}
            >
              <div className={`basis-1/2`}>
                <img src={s.image.data.attributes.url} alt={""} />
              </div>
              <article
                className={`basis-1/2`}
                dangerouslySetInnerHTML={{ __html: s.text ?? "" }}
              ></article>
            </div>
          ) : (
            <div
              className={`flex flex-col lg:flex-row items-center gap-y-6 lg:gap-y-0 lg:gap-x-8 mx-auto mb-10 lg:mb-20 w-11/12`}
            >
              <article
                className={`basis-1/2`}
                dangerouslySetInnerHTML={{ __html: s.text ?? "" }}
              ></article>
              <div className={`basis-1/2`}>
                <img src={s.image.data.attributes.url} alt={""} />
              </div>
            </div>
          )
        )}

        {/*<article*/}
        {/*  className="text-xl mb-10"*/}
        {/*  dangerouslySetInnerHTML={{ __html: about.content ?? "" }}*/}
        {/*/>*/}
        {/*<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">*/}
        {/*  {about.images?.data.map((photo, index) => (*/}
        {/*    <img*/}
        {/*      key={index}*/}
        {/*      src={photo.attributes.url}*/}
        {/*      onClick={() => twoFunctions(index)}*/}
        {/*      alt=""*/}
        {/*      className="h-72 justify-self-center object-cover cursor-pointer"*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</div>*/}
        {/*{open && (*/}
        {/*  <Lightbox*/}
        {/*    mainSrc={about.images.data[photoIndex].attributes.url}*/}
        {/*    nextSrc={*/}
        {/*      about.images.data[(photoIndex + 1) % about?.images.data.length]*/}
        {/*        .attributes.url*/}
        {/*    }*/}
        {/*    prevSrc={*/}
        {/*      about.images.data[*/}
        {/*        (photoIndex + about.images.data.length - 1) %*/}
        {/*          about.images.data.length*/}
        {/*      ].attributes.url*/}
        {/*    }*/}
        {/*    onCloseRequest={() => setOpen(false)}*/}
        {/*    onMovePrevRequest={() =>*/}
        {/*      setPhotoIndex(*/}
        {/*        (prevState) =>*/}
        {/*          (prevState + about.images.data.length - 1) %*/}
        {/*          about.images.data.length*/}
        {/*      )*/}
        {/*    }*/}
        {/*    onMoveNextRequest={() =>*/}
        {/*      setPhotoIndex(*/}
        {/*        (prevState) =>*/}
        {/*          (prevState + about.images.data.length + 1) %*/}
        {/*          about.images.data.length*/}
        {/*      )*/}
        {/*    }*/}
        {/*  />*/}
        {/*)}*/}
      </Container>
      <SocialNetworks />
    </Layout>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  const about = (await getAboutUsPage(locale)) || [];

  return {
    props: { about, preview },
  };
}
