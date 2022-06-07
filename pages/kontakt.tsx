import Layout from "@/components/Layout";
import { getContactPage, getFooter, getTitles } from "@/lib/api";
import { Contact, IFooter, Titles } from "@/lib/interfaces";

interface Props {
  contact: Contact;
  titles: Titles;
  footer: IFooter;
}

export default function ContactPage({ contact, titles, footer }: Props) {
  return (
    <Layout titles={titles} footer={footer} title={contact.title}>
      <div>
        <div className="font-bold text-4xl">{contact.title}</div>
        <article dangerouslySetInnerHTML={{ __html: contact.content ?? "" }} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const contact = (await getContactPage()) || [];
  const titles = (await getTitles("footer")) || [];
  const footer = (await getFooter()) || [];

  return {
    props: { contact, titles, footer },
  };
}
