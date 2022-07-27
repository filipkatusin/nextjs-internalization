import { Listbox, Transition } from "@headlessui/react";
import ArrowIcon from "@/components/ArrowIcon";
import React from "react";

interface Props {
  selectedValue: string;
  setValue: (value: string) => void;
  values: string[];
}

const CustomSelect: React.FC<Props> = ({ setValue, selectedValue, values }) => {
  return (
    <div className={"relative w-full"}>
      <Listbox value={selectedValue} name={"message_type"} onChange={setValue}>
        <Listbox.Button
          className={
            "field select-button flex justify-between text-left relative"
          }
        >
          {selectedValue}
          <ArrowIcon
            color={"black"}
            className={"arrow transform transition-transform rotate-90"}
          />
        </Listbox.Button>
        <Transition
          as={"div"}
          leave="transition ease-in-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={"relative"}
        >
          <Listbox.Options className={"border-2 border-black w-full absolute"}>
            {values?.map((text, index) => (
              <Listbox.Option key={index} value={text}>
                {({ active, selected }) => (
                  <li
                    className={`py-2 px-4 bg-white hover:bg-red hover:text-white cursor-pointer ${
                      selectedValue === text
                        ? "bg-black text-white"
                        : "bg-white"
                    } ${active ? "bg-red text-white" : "bg-white"}`}
                  >
                    {text}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default CustomSelect;
