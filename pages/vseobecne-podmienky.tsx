import Layout from "@/components/Layout";
import { GeneralCondition } from "@/lib/interfaces";
import React from "react";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import { getGeneralConditionsPage } from "@/lib/api";
interface Props {
  data: GeneralCondition;
  preview: boolean;
}

const GeneralConditionsPage: React.FC<Props> = ({ data, preview }) => {
  return (
    <Layout title={data?.title} preview={preview}>
      <Heading label={data?.title} />
      <Container className={"mb-12 md:pb-20"}>
        <article
          dangerouslySetInnerHTML={{ __html: data?.conditions }}
          className={"rich-text max-w-[700px] mx-auto"}
        />
      </Container>
    </Layout>
  );
};

export default GeneralConditionsPage;

export async function getStaticProps({ locale, preview = false }) {
  const data = (await getGeneralConditionsPage(locale)) || [];

  return {
    props: { data, preview },
  };
}
