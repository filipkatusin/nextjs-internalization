import ImageDiv from "@/components/ImageDiv";
import React, { useEffect, useState } from "react";
import { socialNetworks } from "@/src/data/socialNetworks";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Container from "@/components/Container";
import { ISocialNetworks } from "@/lib/interfaces";

export default function SocialNetworks() {
  const [socialNetworksData, setSocialNetworksData] = useState<ISocialNetworks>(
    {
      title: "",
      social_network_icons: [],
      social_network_images: [],
    }
  );

  let id = "0";

  useEffect(() => {
    const localizations: { [key: string]: any } = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const att = socialNetworks?.localizations?.data[0]?.attributes;
    att?.localizations?.data?.forEach((e) => {
      localizations[e.attributes.locale] = e.attributes;
    });
    if (typeof window !== "undefined") {
      id = window.location.href;
    }
    const localization = id.split("/")[3];

    setSocialNetworksData(
      {
        [att?.locale]: att,
        ...localizations,
      }[localization == "en" ? "en" : "sk"]
    );
  });

  return (
    <Container className={"flex flex-col items-center mb-20 md:mb-28"}>
      <h2
        className={
          "max-w-md leading-snug text-center mb-6 md:mb-12 text-3xl md:text-4xl"
        }
      >
        {socialNetworksData?.title}
      </h2>
      <ul
        className={"flex space-x-6 sm:space-x-10 md:space-x-16 mb-12 md:mb-16"}
      >
        {socialNetworksData?.social_network_icons?.map((icon, index) => (
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
          imageUrl={socialNetworksData?.social_network_images?.[0]?.imageurl}
          link={socialNetworksData?.social_network_images?.[0]?.link}
          className={"background-image flex-2 w-1/3 aspect-square m-1 md:m-2"}
        ></ImageDiv>
        <div className={"flex-5 w-full"}>
          <div className={"flex w-full items-end"}>
            <ImageDiv
              imageUrl={
                socialNetworksData?.social_network_images?.[1]?.imageurl
              }
              link={socialNetworksData?.social_network_images?.[1]?.link}
              className={"flex-5 aspect-video  m-1 md:m-2"}
            ></ImageDiv>
            <ImageDiv
              imageUrl={
                socialNetworksData?.social_network_images?.[2]?.imageurl
              }
              link={socialNetworksData?.social_network_images?.[2]?.link}
              className={"flex-2 aspect-square  m-1 md:m-2"}
            ></ImageDiv>
          </div>
          <div className={"flex w-full items-start"}>
            <ImageDiv
              imageUrl={
                socialNetworksData?.social_network_images?.[3]?.imageurl
              }
              link={socialNetworksData?.social_network_images?.[3]?.link}
              className={"flex-2 aspect-square  m-1 md:m-2"}
            ></ImageDiv>
            <ImageDiv
              imageUrl={
                socialNetworksData?.social_network_images?.[4]?.imageurl
              }
              link={socialNetworksData?.social_network_images?.[4]?.link}
              className={"flex-5 aspect-video  m-1 md:m-2"}
            ></ImageDiv>
          </div>
        </div>
        <ImageDiv
          imageUrl={socialNetworksData?.social_network_images?.[5]?.imageurl}
          link={socialNetworksData?.social_network_images?.[5]?.link}
          className={"flex-2 w-1/3 aspect-square m-1 md:m-2"}
        ></ImageDiv>
      </div>
    </Container>
  );
}
