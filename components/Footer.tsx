import React, { useEffect, useState } from "react";
import { IFooter, Titles } from "@/lib/interfaces";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Container from "@/components/Container";
import { footer } from "@/src/data/footer";
import { titles } from "@/src/data/titles";
import { getFooter, getTitles } from "@/lib/api";
import { FooterForm } from "@/components/FooterForm";

function cookies() {
  // @ts-ignore
  window.Osano.cm.showDrawer("osano-cm-dom-info-dialog-open");
}


export default function Footer() {}
/*export default function Footer() {
  const [titles, setTitles] = useState<Titles>();

  const getEvents = async () => {
    const footerData = await getFooter();
    const titlesData = await getTitles("footer");
    setTitles(titlesData);
  };

  useEffect(() => {
    getEvents().then();
  }, []);

  return (
    <footer className={"bg-gray-footer"}>
      <Container className={"py-12 md:py-28 "}>
        {footer?.logo && (
          <img
            src={getStrapiUrl(footer?.logo?.data?.attributes?.url)}
            alt={"logo"}
            className={"mb-8 md:mb-16"}
          />
        )}
        <div
          className={
            "border-top-bottom py-16 lg:py-20 px-2 flex flex-col xl:flex-row items-center space-y-8 xl:space-y-0 xl:items-start"
          }
        >
          <div
            className={
              "md:w-full lg:flex lg:flex-3 md:flex-row md:justify-around space-y-8 lg:space-y-0"
            }
          >
            {footer?.contact && (
              <div className={"text-center lg:text-left md:flex-1"}>
                <h4 className={"font-bold mb-2 md:mb-4 text-xl lg:text-lg"}>
                  {footer?.contact?.title}
                </h4>
                <ul>
                  {footer?.contact?.title_value?.map((item, index) => (
                    <li
                      key={index}
                      className={"text-black font-medium lg:text-lg"}
                    >
                      {item.title}:
                      <span className={"underline ml-2"}>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className={
                "md:flex md:w-full md:justify-around md:flex-2 space-y-8 md:space-y-0"
              }
            >
              {footer?.section?.map((section, index) => (
                <div key={index} className={"text-center lg:text-left"}>
                  <h4 className={"font-bold text-xl lg:text-lg mb-2 md:mb-4"}>
                    {section.title}
                  </h4>
                  <ul className={"flex flex-col gap-y-2 md:gap-y-4"}>
                    {section?.link?.map((item, index_2) => (
                      <li key={index_2}>
                        <Link href={item?.link}>
                          <a
                            className={
                              "text-black lg:text-lg font-medium opacity-60 transition-opacity hover:opacity-100"
                            }
                          >
                            {item?.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={"lg:flex-2 lg:justify-center xl:flex justify-center"}>
            <div>
              <h5 className={"text-black text-base font-bold"}>
                {footer?.newslatter?.title}
              </h5>
              <FooterForm footerData={footer} />
            </div>
          </div>
        </div>

        <p
          className={
            "text-black text-center xl:text-left lg:text-lg font-medium opacity-60 pt-8"
          }
        >
          {footer?.rights}
        </p>
      </Container>
    </footer>
  );
}*/
