import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import Container from "@/components/Container";
import { footer } from "@/src/data/footer";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

function cookies() {
  // @ts-ignore
  window.Osano.cm.showDrawer("osano-cm-dom-info-dialog-open");
}

export default function Footer() {
  const [footerData, setFooterData] = useState<any>({});

  let id = "0";

  useEffect(() => {
    const localizations: { [key: string]: any } = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const att = footer?.localizations?.data[0]?.attributes;
    att?.localizations?.data?.forEach((e) => {
      localizations[e.attributes.locale] = e.attributes;
    });
    if (typeof window !== "undefined") {
      id = window.location.href;
    }
    const localization = id.split("/")[3];

    setFooterData(
      {
        [att?.locale]: att,
        ...localizations,
      }[localization == "cs" ? "cs" : "sk"]
    );
  });

  const errorMessages = {
    sk: {
      email: {
        required: "Email je povinný.",
        valid: "Email musí mať validný formát.",
      },
      checkbox: {
        required: "Súhlas je povinný",
      },
    },
    cs: {
      email: {
        required: "Email je povinen.",
        valid: "Email musí mít validní formát.",
      },
      checkbox: {
        required: "Souhlas je povinen.",
      },
    },
    en: {
      email: {
        required: "Email is required.",
        valid: "Email must be valid.",
      },
      checkbox: {
        required: "Agreement is required.",
      },
    },
  };

  const NewsletterSchema = Yup.object().shape({
    email: Yup.string()
      .email(errorMessages[footerData?.locale]?.email.valid)
      .required(errorMessages[footerData?.locale]?.email.required),
    checkbox: Yup.boolean()
      .isTrue(errorMessages[footerData?.locale]?.checkbox.required)
      .required(errorMessages[footerData?.locale]?.checkbox.required),
  });

  console.log(footerData);

  return (
    <div>
      <section className={"border-top-bottom"}>
        <Container
          className={
            "text-center flex flex-col lg:flex-row lg:justify-between items-center py-16 md:py-20 space-y-8 lg:space-y-0"
          }
        >
          <h3 className={"text-2xl md:text-3xl"}>
            {footerData?.card_production_title}
          </h3>
          <div
            className={`grid gap-x-10 lg:gap-x-16 gap-y-6 lg:gap-y-8 justify-items-stretch`}
            style={{
              gridTemplateColumns: `repeat(${Math.ceil(
                footerData?.card_production_images?.length / 2
              )}, minmax(0, 1fr))`,
            }}
          >
            {footerData?.card_production_images?.map((data, index) => {
              if (data?.image?.data?.attributes?.url) {
                return (
                  <a
                    key={index}
                    href={data?.link}
                    target={"_blank"}
                    className={"cursor-pointer hover:scale-[110%] transition"}
                  >
                    <img
                      key={index}
                      src={getStrapiUrl(data?.image?.data?.attributes?.url)}
                      alt="company logo"
                      className={"h-12 sm:h-14 md:h-16"}
                    />
                  </a>
                );
              } else {
                return (
                  <img
                    key={index}
                    src={getStrapiUrl(data?.image?.data?.attributes?.url)}
                    alt="company logo"
                    className={"h-12 sm:h-14 md:h-16"}
                  />
                );
              }
            })}
          </div>
        </Container>
      </section>
      <footer className={"bg-gray-footer"}>
        <Container className={"py-12 md:py-28 "}>
          {footerData?.logo && (
            <img
              src={getStrapiUrl(footerData?.logo?.data?.attributes?.url)}
              alt={"logo"}
              className={"mb-8 md:mb-16"}
            />
          )}
          <div
            className={
              "border-top-bottom py-16 lg:py-20 px-2 flex flex-col xl:flex-row items-center space-y-8 xl:space-y-0 xl:items-start"
            }
          >
            <div
              className={
                "md:w-full lg:flex lg:flex-3 md:flex-row md:justify-around space-y-8 lg:space-y-0"
              }
            >
              {footerData?.contact && (
                <div className={"text-center lg:text-left md:flex-1"}>
                  <h4 className={"font-bold mb-2 md:mb-4 text-xl lg:text-lg"}>
                    {footerData?.contact?.title}
                  </h4>
                  <ul>
                    {footerData?.contact?.title_value?.map((item, index) => (
                      <li
                        key={index}
                        className={"text-black font-medium lg:text-lg flex"}
                      >
                        {item.title}:
                        <article
                          className={"underline ml-2"}
                          dangerouslySetInnerHTML={{ __html: item?.content }}
                        ></article>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div
                className={
                  "md:flex md:w-full md:justify-around md:flex-2 space-y-8 md:space-y-0"
                }
              >
                {footerData?.section?.map((section, index) => (
                  <div key={index} className={"text-center lg:text-left"}>
                    <h4 className={"font-bold text-xl lg:text-lg mb-2 md:mb-4"}>
                      {section.title}
                    </h4>
                    <ul className={"flex flex-col gap-y-2 md:gap-y-4"}>
                      {section?.link?.map((item, index_2) => (
                        <li key={index_2}>
                          <Link href={item?.link ?? ""}>
                            <a
                              className={
                                "text-black lg:text-lg font-medium opacity-60 transition-opacity hover:opacity-100"
                              }
                            >
                              {item?.title}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={"lg:flex-2 lg:justify-center xl:flex justify-center"}
            >
              <div>
                <h5 className={"text-black text-base font-bold"}>
                  {footerData?.newsletter?.title}
                </h5>
                <Formik
                  initialValues={{ email: "", checkbox: false }}
                  validationSchema={NewsletterSchema}
                  validateOnMount={true}
                  onSubmit={() => {}}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                    resetForm,
                  }) => (
                    <form onSubmit={handleSubmit} className={` max-w-[400px]`}>
                      <div className={"flex mt-3"}>
                        <input
                          type="text"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder={
                            footerData?.newsletter?.input_placeholder
                          }
                          className={
                            "py-2 md:py-4 px-4 md:px-6 grow border-2 text-sm md:text-base border-black rounded-none font-semibold outline-0"
                          }
                        />
                        {!isValid || values.email.length === 0 ? (
                          <button
                            type={"submit"}
                            className={
                              "bg-white px-4 md:px-6 border-2 border-black border-l-0 text-sm md:text-base font-semibold transition-colors hover:bg-black hover:text-white"
                            }
                          >
                            {footerData?.newsletter?.button_text}
                          </button>
                        ) : (
                          <div className={"block"}>
                            <a
                              href={`https://sportzoo.us12.list-manage.com/subscribe?u=52766cf63df5cb0aca44149c5&id=634e7c5b75&MERGE0=${values.email}`}
                              target={"_blank"}
                              className={
                                "h-full flex items-center block px-4 md:px-6 border-2 border-black border-l-0 text-sm md:text-base font-semibold transition-colors hover:bg-black hover:text-white"
                              }
                              onClick={() =>
                                setTimeout(() => {
                                  resetForm();
                                }, 200)
                              }
                            >
                              <button type={"button"} className={"font-bold"}>
                                {footerData?.newsletter?.button_text}
                              </button>
                            </a>
                          </div>
                        )}
                      </div>
                      <div className={"text-red mt-1 text-sm md:text-base"}>
                        <ErrorMessage name="email" />
                      </div>

                      <label
                        htmlFor="newsletterCheckbox"
                        className={"label-container"}
                      >
                        <div className={"flex flex-row-reverse mt-4"}>
                          <input
                            id="newsletterCheckbox"
                            type="checkbox"
                            name="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.checkbox}
                            className={"hidden"}
                          />
                          <div
                            className={
                              "checkmark w-6 h-6 mr-2 inline-block order-2 border-black border-2 cursor-pointer"
                            }
                          ></div>
                          <p className={"flex-5 text-sm font-medium"}>
                            {footerData?.newsletter?.approval_text}
                          </p>
                        </div>
                        <div className={"text-red mt-1 text-sm md:text-base"}>
                          <ErrorMessage name="checkbox" />
                        </div>
                      </label>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          <p
            className={
              "text-black text-center xl:text-left lg:text-lg font-medium opacity-60 pt-8"
            }
          >
            {footerData?.rights}
          </p>
        </Container>
      </footer>
    </div>
  );
}
