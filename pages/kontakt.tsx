import Layout from "@/components/Layout";
import { createFormSubmission, getContactPage } from "@/lib/api";
import { Contact } from "@/lib/interfaces";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

interface Props {
  contact: Contact;
}

export default function ContactPage({ contact }: Props) {
  const { locale } = useRouter();
  return (
    <Layout title={contact.title}>
      <Heading label={contact.title} />
      <Container className="flex flex-col md:flex-row mb-10">
        <article
          className="md:flex-1"
          dangerouslySetInnerHTML={{ __html: contact.content ?? "" }}
        />
        <div className="md:flex-1 mt-16 md:mt-0">
          <Formik
            initialValues={{
              name: "",
              mail: "",
              phone: "",
              message: "",
              data: {},
            }}
            validationSchema={Yup.object({
              name: Yup.string().required(
                locale == "en" ? "Required field" : "Povinné pole"
              ),
              mail: Yup.string()
                .email(
                  locale == "en"
                    ? "Invalid email address"
                    : "Neplatná mailová adresa"
                )
                .required(locale == "en" ? "Required field" : "Povinné pole"),
              phone: Yup.string().required(
                locale == "en" ? "Required field" : "Povinné pole"
              ),
              message: Yup.string().required(
                locale == "en" ? "Required field" : "Povinné pole"
              ),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                createFormSubmission(values).then((response) => {
                  resetForm();
                  setSubmitting(false);
                });
              }, 200);
            }}
          >
            <Form className="kontakt-form font-semibold">
              <div className="form-grid">
                <label htmlFor="name">
                  {contact?.contact_form?.name} <span>*</span>
                </label>
                <div className="flex flex-col">
                  <Field
                    name="name"
                    type="text"
                    placeholder={contact?.contact_form?.name_placeholder}
                    className="field"
                  />
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="form-grid">
                <label htmlFor="mail">
                  {contact?.contact_form?.mail} <span>*</span>
                </label>
                <div className="flex flex-col">
                  <Field
                    name="mail"
                    type="email"
                    placeholder={contact?.contact_form?.mail_placeholder}
                    className="field"
                  />
                  <ErrorMessage name="mail" />
                </div>
              </div>
              <div className="form-grid">
                <label htmlFor="phone">
                  {contact?.contact_form?.phone} <span>*</span>
                </label>
                <div className="flex flex-col">
                  <Field
                    name="phone"
                    type="text"
                    placeholder={contact?.contact_form?.phone_placeholder}
                    className="field"
                  />
                  <ErrorMessage name="phone" />
                </div>
              </div>
              <div className="form-non-grid">
                <label htmlFor="message">
                  {contact?.contact_form?.message} <span>*</span>
                </label>
                <Field
                  name="message"
                  type="textarea"
                  component="textarea"
                  rows={5}
                  className="field"
                  placeholder={contact?.contact_form?.message_placeholder}
                />
                <ErrorMessage name="message" />
              </div>
              <div className="form-non-grid">
                <button
                  className="send hover:bg-[#a8222b] rounded place-self-center"
                  type="submit"
                >
                  {contact?.contact_form?.button_text}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
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
