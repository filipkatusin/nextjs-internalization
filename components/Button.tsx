import React from "react";
import Link from "next/link";

interface Props {
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  label: string;
  link: string;
  padding?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event) => void;
  border?: string;
}

export default function Button({ label, link }: Props) {
  return (
    <Link href={link ?? ""}>
      <a className="mt-8 flex justify-center">
        <button
          className={
            "bg-white px-5 py-3 flex justify-center  items-center border-2 border-black text-sm md:text-base font-semibold transition-colors hover:bg-black hover:text-white"
          }
        >
          {label}
        </button>
      </a>
    </Link>
  );
}
