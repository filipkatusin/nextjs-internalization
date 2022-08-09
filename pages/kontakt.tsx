import Layout from "@/components/Layout";
import { createFormSubmission, getContactPage } from "@/lib/api";
import { Contact } from "@/lib/interfaces";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import SocialNetworks from "@/components/SocialNetworks";
import CustomSelect from "@/components/CustomSelect";
import React from "react";

interface Props {
  contact: Contact;
  preview: boolean;
}

export default function ContactPage({ contact, preview }: Props) {
  const { locale } = useRouter();

  return (
    <Layout title={contact.title} preview={preview}>
      <Heading label={contact.title} />
      <Container className="flex flex-col md:flex-row mb-10 md:space-x-4">
        <div className={"contact-info md:flex-1 space-y-2"}>
          <article
            className={"contact-info-filed"}
            dangerouslySetInnerHTML={{ __html: contact?.contact_data }}
          />

          <article
            className={"contact-info-filed"}
            dangerouslySetInnerHTML={{ __html: contact?.billing_data }}
          />
        </div>
        <div className="md:flex-1 mt-16 md:mt-0">
          <Formik
            initialValues={{
              name: "",
              mail: "",
              phone: "",
              message: "",
              message_type: contact?.contact_form?.text_email?.[0]?.text,
              send_email: contact?.contact_form?.text_email?.[0]?.email,
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
              createFormSubmission(values).then((_) => {
                resetForm();
                setSubmitting(false);
              });
            }}
          >
            {({ values, setValues }) => (
              <Form className="font-semibold">
                <h2 className={"text-3xl md:text-4xl mb-4 md:mb-6"}>
                  {contact?.contact_form?.title}
                </h2>

                {contact?.subtitle && (
                  <article
                    dangerouslySetInnerHTML={{ __html: contact?.subtitle }}
                    className={"mb-4 md:mb-6 font-semibold text-justify"}
                  ></article>
                )}

                <div className="form-grid">
                  <label className={"text-sm"} htmlFor="name">
                    {contact?.contact_form?.name} <span>*</span>
                  </label>
                  <div className="flex flex-col">
                    <Field
                      name="name"
                      type="text"
                      placeholder={contact?.contact_form?.name_placeholder}
                      className="field"
                    />
                    <div className={"text-red text-sm"}>
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                </div>

                <div className={"lg:flex lg:space-x-4"}>
                  <div className="form-grid lg:flex-1">
                    <label className={"text-sm"} htmlFor="mail">
                      {contact?.contact_form?.mail} <span>*</span>
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="mail"
                        type="email"
                        placeholder={contact?.contact_form?.mail_placeholder}
                        className="field"
                      />
                      <div className={"text-red text-sm"}>
                        <ErrorMessage name="mail" />
                      </div>
                    </div>
                  </div>

                  <div className="form-grid lg:flex-1">
                    <label className={"text-sm"} htmlFor="phone">
                      {contact?.contact_form?.phone} <span>*</span>
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="phone"
                        type="text"
                        placeholder={contact?.contact_form?.phone_placeholder}
                        className="field"
                      />
                      <div className={"text-red text-sm"}>
                        <ErrorMessage name="phone" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-grid lg:flex-1">
                  <label className={"text-sm"} htmlFor="phone">
                    {contact?.contact_form?.message_type_placeholder}{" "}
                    <span>*</span>
                  </label>
                  <CustomSelect
                    selectedValue={values?.message_type}
                    setValue={(value) => {
                      const email_index =
                        contact?.contact_form?.text_email?.findIndex(
                          (item) => item.text === value
                        );
                      const email =
                        contact?.contact_form?.text_email?.[email_index]?.email;
                      setValues((values) => ({
                        ...values,
                        message_type: value,
                        send_email: email,
                      }));
                    }}
                    values={contact?.contact_form?.text_email?.map(
                      (type) => type?.text
                    )}
                  />
                </div>

                <div className="form-grid">
                  <label className={"text-sm"} htmlFor="message">
                    {contact?.contact_form?.message} <span>*</span>
                  </label>
                  <div className="flex flex-col">
                    <Field
                      name="message"
                      type="textarea"
                      component="textarea"
                      rows={4}
                      className="field resize-none"
                      placeholder={contact?.contact_form?.message_placeholder}
                    />
                    <div className={"text-red text-sm"}>
                      <ErrorMessage name="message" />
                    </div>
                  </div>
                </div>
                <div className="form-non-grid">
                  <Button
                    label={contact?.contact_form?.button_text}
                    className="bg-red px-5 py-4 mt-2 text-white border-none font-bold"
                    arrow={true}
                    arrowColor={"white"}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
      <Container className="my-16 md:my-20">
        <div className="border-[0.1px] border-gray flex opacity-20 " />
      </Container>
      <SocialNetworks />
    </Layout>
  );
}

export async function getStaticProps({ locale, preview = false }) {
  const contact = (await getContactPage(locale)) || [];

  return {
    props: { contact, preview },
  };
}
