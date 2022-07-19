import Layout from "@/components/Layout";
import { getAboutUsPage } from "@/lib/api";
import { AboutUs, Titles } from "@/lib/interfaces";
import Container from "@/components/Container";
import Lightbox from "react-image-lightbox";
import { useState } from "react";
import Heading from "@/components/Heading";
import SocialNetworks from "@/components/SocialNetworks";

interface Props {
  about: AboutUs;
  titles: Titles;
}

export default function AboutUsPage({ about }: Props) {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const twoFunctions = (n) => {
    setOpen(true);
    setPhotoIndex(n);
  };

  return (
    <Layout title={about.title}>
      <Heading label={about.title} />
      <Container>
        <article
          className="text-xl mb-10"
          dangerouslySetInnerHTML={{ __html: about.content ?? "" }}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
          {about.images?.data.map((photo, index) => (
            <img
              key={index}
              src={photo.attributes.url}
              onClick={() => twoFunctions(index)}
              alt=""
              className="h-72 justify-self-center object-cover cursor-pointer"
            />
          ))}
        </div>
        {open && (
          <Lightbox
            mainSrc={about.images.data[photoIndex].attributes.url}
            nextSrc={
              about.images.data[(photoIndex + 1) % about?.images.data.length]
                .attributes.url
            }
            prevSrc={
              about.images.data[
                (photoIndex + about.images.data.length - 1) %
                  about.images.data.length
              ].attributes.url
            }
            onCloseRequest={() => setOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (prevState) =>
                  (prevState + about.images.data.length - 1) %
                  about.images.data.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex(
                (prevState) =>
                  (prevState + about.images.data.length + 1) %
                  about.images.data.length
              )
            }
          />
        )}
      </Container>
      <SocialNetworks />
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const about = (await getAboutUsPage(locale)) || [];

  return {
    props: { about },
  };
}
