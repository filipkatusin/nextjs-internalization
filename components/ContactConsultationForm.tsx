import React, { ReactElement, useState } from "react";
import InputGroup from "@/components/InputGroup";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ConsultationTextArea from "@/components/ConsultationTextArea";
import { ReCaptchaTerms } from "@/components/ReCaptchaTerms";
import { FormSubmissionTerms } from "@/components/FormSubmissionTerms";

export interface BasicConsultationFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SignupSchema = Yup.object().shape(
  {
    name: Yup.string()
      .min(2, "Príliš krátke meno")
      .max(50, "Príliš dlhé meno")
      .required("Meno a priezvisko sú povinné")
      .matches(
        /^[^±!@£$%^&*_+§¡€#¢¶•ªº«\\/<>?:;|=.,1-9]{1,20}$/i,
        "Nesprávny formát"
      ),

    email: Yup.string()
      .email("Nesprávny e-mail")
      .required("E-mailová adresa je povinná"),

    message: Yup.string()
      .trim()
      .max(1000, "Príliš dlhá správa")
      .required("Správa je povinná"),

    subject: Yup.string().required("Predmet je povinný"),
  },
  [["email", "name"]]
);

interface Props {
  isSmall?: boolean;
}
export default function BasicConsultationForm({
  isSmall,
}: Props): ReactElement {
  const initialValues: BasicConsultationFormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={
        "flex flex-col mx-auto items-center max-w-xl my-16 rounded-xl overflow-hidden" +
        (isSmall ? "text-sm max-w-xl" : "")
      }
    >
      {!isSmall && (
        <h2 className="text-3xl flex w-full mb-10 font-bold text-white tracking-wide text-center">
          Máte záujem byť mediálnym partnerom NŠC?
        </h2>
      )}
      <div
        className={
          isSmall
            ? "flex flex-col sm:flex-row justify-center items-center gap-x-6"
            : ""
        }
      >
        <div>
          {isSmall && (
            <h2 className="text-2xl gradient-text font-bold mt-3 tracking-wide text-center">
              Máte záujem byť mediálnym partnerom NŠC?
            </h2>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // createBasicFormSubmission(values)
              //   .then(() => {
              //     toggleModal();
              //     resetForm();
              //     setSubmitError(false);
              //   })
              //   .catch(() => {
              //     setSubmitError(true);
              //   });
              setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div
                  className={
                    "flex flex-col justify-center sm:flex-row w-full " +
                    (isSmall ? "justify-center mt-3" : "gap-x-4")
                  }
                >
                  <InputGroup
                    placeholder="Meno Priezvisko*"
                    className="w-full sm:mr-1"
                    name="name"
                    type="text"
                    large={!isSmall}
                    isSmall={isSmall}
                    isFormik={true}
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div
                  className={
                    isSmall ? "flex flex-col sm:flex-row justify-center " : ""
                  }
                >
                  <InputGroup
                    placeholder="Email *"
                    className="w-full"
                    name="email"
                    type="email"
                    large={!isSmall}
                    isSmall={isSmall}
                    isFormik={true}
                    errors={errors}
                    touched={touched}
                  />
                  <InputGroup
                    placeholder="Predmet *"
                    className="w-full"
                    name="subject"
                    type="text"
                    large={!isSmall}
                    isSmall={isSmall}
                    isFormik={true}
                    errors={errors}
                    touched={touched}
                  />
                  <ConsultationTextArea
                    placeholder="Text*"
                    name="message"
                    touched={touched}
                    isFormik={true}
                    errors={errors}
                    large={!isSmall}
                    isSmall={isSmall}
                  />
                </div>
                {isSmall && Object.keys(touched).length > 0 && (
                  <div className="mb-3">
                    <FormSubmissionTerms isSmall={isSmall} />
                    <ReCaptchaTerms isSmall={isSmall} />
                  </div>
                )}
                {submitError && (
                  <span className="text-center block text-red-600 mb-4">
                    Správu sa nepodarilo odoslať. Skúste to prosím znovu.
                    <br />V prípade problémov nás neváhajte kontaktovať na{" "}
                    <a
                      className="underline"
                      href="mailto:sekretariat@sportcenter.sk"
                    >
                      sekretariat@sportcenter.sk
                    </a>
                    .
                  </span>
                )}
                {isOpen && (
                  <div className="flex justify-center items-center">
                    <div className="mb-7 text-white text-2xl font-bold">
                      Ponuka bola odoslaná.
                    </div>
                  </div>
                )}
                <button
                  style={{
                    borderColor: "#004F8F",
                    color: "#004F8F",
                    backgroundColor: "white",
                  }}
                  className="py-2 flex mx-auto uppercase rounded-lg border-2 font-bold px-7"
                  type="submit"
                >
                  Odoslať
                </button>
                {!isSmall && (
                  <>
                    <FormSubmissionTerms className="mt-5" isSmall={isSmall} />
                    <ReCaptchaTerms isSmall={isSmall} />
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <div className="w-24 h-4" />
      </div>
    </div>
  );
}
