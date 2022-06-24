import Layout from "@/components/Layout";
import { getContactPage } from "@/lib/api";
import { Contact } from "@/lib/interfaces";
import TopMenu from "@/components/TopMenu";

interface Props {
  contact: Contact;
}

export default function ContactPage({ contact }: Props) {
  return (
    <Layout title={contact.title}>
      <TopMenu />
      <div className={`min-h-screen`}>
        <div className="font-bold text-4xl">{contact.title}</div>
        <article dangerouslySetInnerHTML={{ __html: contact.content ?? "" }} />
      </div>
    </Layout>
  );
}

export async function getStaticProps(locale: string) {
  const contact = (await getContactPage(locale)) || [];

  return {
    props: { contact },
  };
}
