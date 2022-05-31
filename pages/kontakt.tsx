import Layout from "@/components/Layout";
import { getContact } from "@/lib/api";
import { Contact } from "@/lib/interfaces";

interface Props {
  contact: Contact;
}

export default function ContactPage({ contact }: Props) {
  return (
    <Layout title={contact.title}>
      <div>
        <div className="font-bold text-4xl">{contact.title}</div>
        <article dangerouslySetInnerHTML={{ __html: contact.content ?? "" }} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const contact = (await getContact()) || [];

  return {
    props: { contact },
  };
}
