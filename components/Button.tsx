import React from "react";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";

interface Props {
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  label: string;
  link?: string;
  padding?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event) => void;
  border?: string;
  arrow?: boolean;
  arrowColor?: string;
}

export default function Button({
  label,
  link,
  arrow,
  arrowColor,
  className,
  onClick,
}: Props) {
  return link ? (
    <Link href={link ?? ""}>
      <a className="flex ">
        <button
          onClick={onClick}
          className={`button-hover-effect bg-white px-5 py-3 flex justify-center  items-center border-2 border-black text-sm md:text-base font-semibold transition-colors hover:bg-black hover:text-white ${className} ${
            arrow ? "pr-3" : ""
          }`}
        >
          {label}
          {/*{arrow && <div className="arrow h-3 w-3 ml-3" />}*/}
          {arrow && (
            <ArrowIcon color={arrowColor ?? "black"} className={"ml-2"} />
          )}
        </button>
      </a>
    </Link>
  ) : (
    <a className="flex ">
      <button
        onClick={onClick}
        className={`button-hover-effect bg-white px-5 py-3 flex justify-center  items-center border-2 border-black text-sm md:text-base font-semibold transition-colors hover:bg-black hover:text-white ${className} ${
          arrow ? "pr-3" : ""
        }`}
      >
        {label}
        {/*{arrow && <div className="arrow h-3 w-3 ml-3" />}*/}
        {arrow && (
          <ArrowIcon color={arrowColor ?? "black"} className={"ml-2"} />
        )}
      </button>
    </a>
  );
}
