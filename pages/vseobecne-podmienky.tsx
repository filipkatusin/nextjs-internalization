import Layout from "@/components/Layout";
import { GeneralCondition } from "@/lib/interfaces";
import React from "react";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import { getGeneralConditionsPage } from "@/lib/api";
interface Props {
  data: GeneralCondition;
}

const GeneralConditionsPage: React.FC<Props> = ({ data }) => {
  return (
    <Layout title={data?.title}>
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

export async function getStaticProps({ locale }) {
  const data = (await getGeneralConditionsPage(locale)) || [];

  return {
    props: { data },
  };
}
