import Layout from "@/components/Layout";
import { getContactPage } from "@/lib/api";
import { Contact } from "@/lib/interfaces";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

interface Props {
  contact: Contact;
}

export default function ContactPage({ contact }: Props) {
  return (
    <Layout title={contact.title}>
      <Heading label={contact.title} />
      <Container className="flex mb-10">
        <article
          className="flex-1"
          dangerouslySetInnerHTML={{ __html: contact.content ?? "" }}
        />
        <div className="flex-1"></div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const contact = (await getContactPage(locale)) || [];

  return {
    props: { contact },
  };
}
