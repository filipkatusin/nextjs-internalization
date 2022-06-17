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

export default function Footer() {
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
      <Container className={"py-12 md:py-24 "}>
        {footer?.logo && (
          <img
            src={getStrapiUrl(footer?.logo?.data.attributes.url)}
            alt={"logo"}
            className={"mb-8 md:mb-12"}
          />
        )}
        <div className={"border-top-bottom py-16 px-2"}>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_2fr] gap-4 gap-y-12 "
            }
          >
            <div>
              {footer?.contact && (
                <div>
                  <h4 className={"font-bold mb-4 lg:text-lg"}>
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
            </div>

            {footer?.section?.map((section, index) => (
              <div key={index}>
                <h4 className={"font-bold lg:text-lg mb-4"}>{section.title}</h4>
                <ul className={"flex flex-col gap-y-4"}>
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

            <div className={"col-span-2 lg:col-span-1"}>
              <h5 className={"text-black font-bold"}>
                {footer?.newslatter?.title}
              </h5>
              <FooterForm footerData={footer} />
            </div>
          </div>
        </div>

        <p className={"text-black lg:text-lg font-medium opacity-60 pt-8"}>
          {footer?.rights}
        </p>
      </Container>
    </footer>
  );
}
