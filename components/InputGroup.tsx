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

export default function InputGroup({
  name,
  id,
  withoutId,
  label,
  type = "text",
  value,
  placeholder,
  large,
  isSmall,
  onChange,
  className = "",
  checked,
  isFormik,
  errors,
  touched,
}: Props): ReactElement {
  return (
    <div
      className={`inline-block ${className} ${
        type == "radio" ? "inline-flex flex-row-reverse items-center my-2" : ""
      } ${
        type === "checkbox"
          ? "flex flex-row-reverse justify-center items-center gap-x-2"
          : ""
      } ${isSmall ? "text-center sm:text-left" : "text-left"}`}
    >
      {(!isSmall || Object.keys(touched).length > 0) && (
        <label
          htmlFor={type == "radio" ? value.toString() : name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      {isFormik ? (
        <>
          <Field
            className={`${
              errors?.[name] && touched?.[name]
                ? "border-red-500"
                : "border-blue-800"
            } rounded  ${type === "radio" ? "ml-5 mr-2" : ""} ${
              large ? "p-2 text-lg w-full" : ""
            } 
            ${isSmall ? "h-9" : ""}
            `}
            id={
              withoutId
                ? undefined
                : id ?? (type == "radio" ? value.toString() : name)
            }
            name={name}
            type={type}
            placeholder={placeholder ?? label}
            checked={checked}
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
        </>
      ) : (
        <input
          className={`rounded border-blue-800 ${
            type == "radio" && "ml-5 mr-2"
          } ${large && "p-2 text-lg w-full"}`}
          id={
            withoutId
              ? undefined
              : id ?? (type == "radio" ? value.toString() : name)
          }
          name={name}
          type={type}
          value={value}
          placeholder={placeholder ?? label}
          onChange={onChange}
          checked={checked}
        />
      )}
    </div>
  );
}
