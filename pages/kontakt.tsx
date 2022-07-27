import Layout from "@/components/Layout";
import { createFormSubmission, getContactPage } from "@/lib/api";
import { Contact } from "@/lib/interfaces";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Listbox } from "@headlessui/react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import SocialNetworks from "@/components/SocialNetworks";
import { Transition } from "@headlessui/react";
import ArrowIcon from "@/components/ArrowIcon";

interface Props {
  contact: Contact;
}

export default function ContactPage({ contact }: Props) {
  const { locale } = useRouter();
  return (
    <Layout title={contact.title}>
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
              message_type: contact?.contact_form?.message_type
                ? contact?.contact_form?.message_type?.[0]?.text
                : "",
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

                  <div className="flex flex-col relative">
                    <Listbox
                      value={values.message_type}
                      name={"message_type"}
                      onChange={(value: string) => {
                        setValues((values) => ({
                          ...values,
                          message_type: value,
                        }));
                      }}
                    >
                      <Listbox.Button
                        className={
                          "field select-button flex justify-between text-left relative"
                        }
                      >
                        {values.message_type}
                        <ArrowIcon
                          color={"black"}
                          className={
                            "arrow transform transition-transform rotate-90"
                          }
                        />
                      </Listbox.Button>
                      <Transition
                        as={"div"}
                        leave="transition ease-in-out duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className={"relative"}
                      >
                        <Listbox.Options
                          className={"border-2 border-black w-full absolute"}
                        >
                          {contact?.contact_form?.message_type?.map(
                            (type, index) => (
                              <Listbox.Option key={index} value={type?.text}>
                                {({ active, selected }) => (
                                  <li
                                    className={`py-2 px-4 bg-white hover:bg-black hover:text-white cursor-pointer ${
                                      values.message_type === type.text
                                        ? "bg-red text-white"
                                        : "bg-white"
                                    } ${
                                      active
                                        ? "bg-black text-white"
                                        : "bg-white"
                                    }`}
                                  >
                                    {type?.text}
                                  </li>
                                )}
                              </Listbox.Option>
                            )
                          )}
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  </div>
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
      <SocialNetworks />
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const contact = (await getContactPage(locale)) || [];

  return {
    props: { contact },
  };
}
