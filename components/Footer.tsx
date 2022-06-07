import React from "react";
import { IFooter, Titles } from "@/lib/interfaces";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Container from "@/components/Container";
import SlidesPerView from "@/components/SlidesPerView";

function cookies() {
  // @ts-ignore
  window.Osano.cm.showDrawer("osano-cm-dom-info-dialog-open");
}

interface Props {
  footer: IFooter;
  titles: Titles;
}

export default function Footer({ footer, titles }: Props) {
  return (
    <footer>
      <Container withoutTopMargin={true} withoutBottomMargin={true}>
        <div>{footer?.logo_title}</div>
      </Container>
      <Container>
        <Splide
          className="w-80 h-80"
          options={{
            speed: 2000,
            rewind: true,
            type: "loop",
            perPage: 1,
            pauseOnFocus: false,
            pauseOnHover: false,
            autoplay: true,
            interval: 5000,
          }}
        >
          {footer?.logo_link.map((s, index) => (
            <SplideSlide key={index}>
              <Link href={s?.link}>
                <a target="_blank">
                  <img
                    src={getStrapiUrl(s.image.data.attributes.url)}
                    alt={""}
                    className="object-cover w-full h-full"
                  />
                </a>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </Container>
      <section>
        <div>
          <img src={getStrapiUrl(footer?.logo.data.attributes.url)} alt={""} />
        </div>
        {/*<div>TODO: Menu</div>*/}
      </section>
      <section>
        <div>
          {titles?.title_link.map((title, index) => (
            <Link href={title.link}>
              <a key={index}>{title.title}</a>
            </Link>
          ))}
        </div>
        <div>
          {footer?.icons_link.map((icon, index) => (
            <Link href={icon.link}>
              <a target="_blank" key={index}>
                <img
                  src={getStrapiUrl(icon.image.data.attributes.url)}
                  alt=""
                />
              </a>
            </Link>
          ))}
        </div>
      </section>
      <section>{footer?.rights}</section>
      {/*<div className="flex flex-1 justify-center">*/}
      {/*  <a*/}
      {/*    className="cursor-pointer  items-center mt-10 font-bold"*/}
      {/*    onClick={() => cookies()}*/}
      {/*  >*/}
      {/*    Nastavenia súborov Cookies*/}
      {/*  </a>*/}
      {/*</div>*/}
    </footer>
  );
}
