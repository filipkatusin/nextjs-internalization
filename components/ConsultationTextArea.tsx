import React, { ChangeEventHandler, ReactElement } from "react";
import { Field, FormikErrors, FormikTouched } from "formik";

interface Props {
  name: string;
  id?: string;
  withoutId?: boolean;
  label?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  className?: string;
  checked?: boolean;
  large?: boolean;
  isSmall?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isFormik?: boolean;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
}

export default function ConsultationTextarea({
  name,
  label,
  placeholder,
  isSmall,
  touched,
  errors,
}: Props): ReactElement {
  return (
    <div
      className={
        isSmall
          ? "flex flex-col sm:flex-row justify-center w-full sm:text-left"
          : "w-full"
      }
    >
      {!isSmall ? (
        <label
          className="block text-sm font-medium text-gray-700 mt-2"
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <Field
        as={"textarea"}
        className={`
              ${
                isSmall
                  ? Object.keys(touched).length > 0
                    ? "w-5/6 sm:h-32 resize-none border-blue-800 mb-2 rounded"
                    : "w-full sm:h-20 resize-none border-blue-800 mb-2 rounded"
                  : "w-full resize-none sm:h-28 rounded border-blue-800 mb-2 rounded"
              }
                  ${
                    errors?.[name] && touched?.[name]
                      ? "border-red-500"
                      : "border-blue-800"
                  }
            `}
        name={name}
        placeholder={placeholder ?? label}
      />
      {errors?.[name] && touched?.[name] ? (
        <div
          className={`text-red-300 ${isSmall ? "text-sm" : ""}`}
          data-test-id={name}
        >
          <>{errors[name]}</>
        </div>
      ) : (
        <div
          className={
            isSmall ? (Object.keys(touched).length ? "h-5" : "h-3") : "h-6"
          }
        />
      )}
    </div>
  );
}
