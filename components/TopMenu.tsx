import Link from "next/link";
import { menu } from "@/src/data/menu";
import { header } from "@/src/data/header";
import { useEffect, useRef, useState } from "react";

export default function TopMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[0] !== menuRef.current) {
        setMenuOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return (
    menu && (
      <nav>
        <div
          className={`bg-[#191919] relative z-10 px-4 md:px-10 h-10 text-[#bfbfbf] flex justify-end items-center gap-4`}
        >
          {header.socials?.map((s, index) => (
            <Link key={index} href={s.link}>
              <a
                className={`underline underline-offset-4 hover:font-bold decoration-[#bfbfbf]`}
              >
                {s.name}
              </a>
            </Link>
          ))}
          <div className={`w-[1px] h-7 bg-white/[16%]`}></div>
          <img alt={""} src={`/assets/SK.svg`} className={`h-5 w-5`} />
        </div>
        <div
          className={`flex px-4 md:px-10 relative z-10 items-center bg-[#F8F8F8] gap-4 h-16 border-b-[1px] border-[#EDEDED]`}
        >
          <div
            className={`absolute -top-10 left-4 md:left-10 top-0 w-10 h-[92px] bg-[#EE2D3A] z-40`}
          ></div>
          <img src={`/assets/logo.svg`} alt={""} className={`w-10 h-10 z-50`} />
          <div className={`grow`}>
            <img src={`/assets/sportzoo.svg`} alt={""} className={`h-6`} />
          </div>
          <div className={`flex md:hidden`}>
            <img
              src={`/assets/menu.svg`}
              alt={""}
              ref={menuRef}
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          </div>
          <div className={`hidden md:flex gap-4`}>
            <img
              src={`/assets/magnifyingGlass.svg`}
              alt={""}
              className={`w-6 h-6 justify-self-end`}
            />
            <div className={`w-6 h-6 relative justify-self-end`}>
              <img
                src={`/assets/shoppingBag.svg`}
                alt={""}
                className={`w-6 h-6 absolute`}
              />
              <div className={`relative w-4 h-4 ml-3 mt-3`}>
                <img
                  src={`/assets/Ellipse.svg`}
                  alt={""}
                  className={`w-4 h-4 absolute z-40`}
                />
                <div
                  className={`text-white text-sm w-4 h-4 flex items-center justify-center relative z-50`}
                >
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`md:hidden relative z-0 p-4 bg-[#F8F8F8] font-semibold ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          } ease-in-out duration-300`}
        >
          <div className={`flex justify-between`}>
            <div className={`flex flex-col gap-3`}>
              {menu?.map((m, index) => (
                <Link key={index} href={m.path}>
                  <a>{m.title}</a>
                </Link>
              ))}
            </div>
            <div className={`gap-4 flex`}>
              <img
                src={`/assets/magnifyingGlass.svg`}
                alt={""}
                className={`w-6 h-6 justify-self-end`}
              />
              <div className={`w-6 h-6 relative justify-self-end`}>
                <img
                  src={`/assets/shoppingBag.svg`}
                  alt={""}
                  className={`w-6 h-6 absolute`}
                />
                <div className={`relative w-4 h-4 ml-3 mt-3`}>
                  <img
                    src={`/assets/Ellipse.svg`}
                    alt={""}
                    className={`w-4 h-4 absolute z-40`}
                  />
                  <div
                    className={`text-white font-medium text-sm w-4 h-4 flex items-center justify-center relative z-50`}
                  >
                    0
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`flex mt-4 justify-end gap-4`}>
            <Link href={header.buttonShop?.link}>
              <a className={`bg-white py-2 px-4 border-2 border-black`}>
                {header.buttonShop?.name}
              </a>
            </Link>
            <Link href={header.buttonMyCard?.link}>
              <a className={`bg-[#EE2D3A] py-2 px-4 text-white`}>
                <span className={``}>{header.buttonMyCard?.name}</span>
                <img
                  src={`/assets/chevron-down.svg`}
                  alt={""}
                  className={`inline-block ml-4`}
                />
              </a>
            </Link>
          </div>
        </div>
        <div
          className={`hidden md:flex px-10 font-bold items-center justify-between bg-[#F8F8F8] h-16 border-b-[1px] border-[#EDEDED]`}
        >
          <div className={`flex gap-4`}>
            {menu?.map((m, index) => (
              <Link key={index} href={m.path}>
                <a className={"hover:text-[#EE2D3A]"}>{m.title}</a>
              </Link>
            ))}
          </div>
          <div className={`flex gap-4`}>
            <Link href={header.buttonShop?.link}>
              <a
                className={`bg-white hover:bg-black/20 py-2 px-4 border-2 border-black ease-out duration-200`}
              >
                {header.buttonShop?.name}
              </a>
            </Link>
            <Link href={header.buttonMyCard?.link}>
              <a
                className={`bg-[#EE2D3A] hover:bg-[#a8222b] py-2 px-4 text-white ease-out duration-200`}
              >
                <span className={`inline-block align-middle`}>
                  {header.buttonMyCard?.name}
                </span>
                <img
                  src={`/assets/chevron-down.svg`}
                  alt={""}
                  className={`inline-block ml-4`}
                />
              </a>
            </Link>
          </div>
        </div>
      </nav>
    )
  );
}
