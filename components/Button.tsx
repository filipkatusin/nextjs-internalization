import React from "react";
import Link from "next/link";

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
}

export default function Button({
  label,
  link,
  arrow,
  className,
  onClick,
}: Props) {
  return (
    <Link href={link ?? ""}>
      <a className="flex justify-center">
        <button
          onClick={onClick}
          className={`button-hover-effect bg-white px-5 py-3 flex justify-center  items-center border-2 border-black text-sm md:text-base font-semibold transition-colors hover:bg-black hover:text-white ${className}`}
        >
          {label}
          {arrow && <div className="arrow h-3 w-3 ml-3" />}
        </button>
      </a>
    </Link>
  );
}
