import React from "react";

interface Props {
  label: string;
  onClick: () => void;
}

export default function FilterButton({ label, onClick }: Props) {
  return (
    <div
      className={`button-hover-effect bg-white pl-4 flex justify-center  items-center border-2 border-black text-sm font-semibold transition-colors cursor-pointer hover:bg-black hover:text-white group`}
      onClick={onClick}
    >
      {label}
      <button className={"group-hover:hidden p-3"}>
        <img
          src="/assets/close.svg"
          alt="remove filter icon"
          className={" h-4"}
        />
      </button>
      <button className={"hidden group-hover:block p-3"}>
        <img src="/assets/close-white.svg" alt="" className={"h-4"} />
      </button>
    </div>
  );
}
