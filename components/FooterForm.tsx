import React from "react";
import { IFooter } from "@/lib/interfaces";

interface FooterFormType {
  footerData: IFooter;
  className?: string;
}

export const FooterForm: React.FC<FooterFormType> = ({
  footerData,
  className,
}) => {
  return (
    <form className={`${className} max-w-[400px]`}>
      <div className={"flex my-4 bg-green"}>
        <input
          type="text"
          placeholder={footerData?.newslatter?.input_placeholder}
          className={
            "py-2 md:py-4 px-4 md:px-6 grow border-2 text-sm md:text-base border-black font-semibold outline-0"
          }
        />
        <button
          className={
            "bg-white px-4 md:px-6 border-2 border-black border-l-0 text-sm md:text-base font-semibold transition-colors hover:bg-black hover:text-white"
          }
        >
          {footerData?.newslatter?.button_text}
        </button>
      </div>
      <label htmlFor="newslatterCheckbox" className={"label-container"}>
        <div className={"flex flex-row-reverse"}>
          <input id="newslatterCheckbox" type="checkbox" className={"hidden"} />
          <div
            className={
              "checkmark w-6 h-6 mr-2 inline-block order-2 border-black border-2 cursor-pointer"
            }
          ></div>
          <p className={"flex-5 text-sm"}>
            {footerData?.newslatter?.approval_text}
          </p>
        </div>
      </label>
    </form>
  );
};
