import Layout from "@/components/Layout";
import { FaqPage } from "@/lib/interfaces";
import React from "react";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import { getFaqPage } from "@/lib/api";
import { Disclosure } from "@headlessui/react";
import ArrowIcon from "@/components/ArrowIcon";
import Button from "@/components/Button";

interface Props {
  data: FaqPage;
  preview: boolean;
}

const FaqPage: React.FC<Props> = ({ data, preview }) => {
  return (
    <Layout title={data?.title} preview={preview}>
      <Heading label={data?.title} />
      <Container className={"pt-8 md:pt-12 pb-16 md:pb-24"}>
        <ul className={"space-y-4 max-w-[940px] mx-auto"}>
          {data?.questions?.map((question, index) => (
            <Disclosure as={"li"} key={index}>
              {({ open, close }) => (
                <div
                  className={"border-2 border-black cursor-pointer"}
                  onClick={() => open && close()}
                >
                  <Disclosure.Button
                    className={"flex justify-between w-full p-4 text-left"}
                  >
                    <span className={"font-bold"}>{question?.title}</span>
                    <ArrowIcon
                      color={open ? "#EE2D3A" : "#191919"}
                      className={`transform rotate-90 transition-transform ${
                        open ? "-rotate-90" : ""
                      }`}
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel className={"p-4 pt-0"}>
                    <article
                      dangerouslySetInnerHTML={{ __html: question?.content }}
                    />
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </ul>
        <div className={"text-center flex flex-col items-center mt-20"}>
          <h2
            className={
              "text-3xl sm:text-4xl md:text-5xl leading-tight mb-2 md:mb-4"
            }
          >
            {data?.help_text?.title}
          </h2>
          <article
            className={"max-w-[450px] mb-8"}
            dangerouslySetInnerHTML={{ __html: data?.help_text?.content }}
          />
          <Button
            label={data?.contact_text_button}
            className={"bg-red border-none text-white capitalize"}
            arrow={true}
            arrowColor={"white"}
            link={"/kontakt"}
          />
        </div>
      </Container>
    </Layout>
  );
};

export default FaqPage;

export async function getStaticProps({ locale, preview = false }) {
  const data = (await getFaqPage(locale)) || [];

  return {
    props: { data, preview },
  };
}
