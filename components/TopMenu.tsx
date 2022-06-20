import Link from "next/link";
import { menu } from "@/src/data/menu";
import { header } from "@/src/data/header";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container";

export default function TopMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  const menuRef = useRef();
  const langRef = useRef();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[0] !== menuRef.current) {
        setMenuOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[1] !== langRef.current) {
        setLangDropdown(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return (
    menu &&
    header && (
      <nav>
        <div className={`bg-[#191919] relative z-30`}>
          <Container className={`menu-black-div`}>
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

            <button
              ref={langRef}
              onClick={() => setLangDropdown((prev) => !prev)}
            >
              {header && (
                <img
                  alt={""}
                  src={header.sk_icon.data.attributes.url}
                  className={`h-5 w-5`}
                />
              )}
            </button>
          </Container>
        </div>
        <Container className={`${langDropdown ? "flex" : "hidden"} relative`}>
          <div
            className={`bg-[#191919] p-3 w-11 absolute flex flex-col gap-3 -top-0 z-50 -right-1 lg:right-7`}
          >
            <button className={``}>
              {header && (
                <img
                  alt={""}
                  src={header.sk_icon.data.attributes?.url}
                  className={`menu-lang-icon hover:opacity-100`}
                />
              )}
            </button>
            <button className={``}>
              {header && (
                <img
                  alt={""}
                  src={header.en_icon.data.attributes?.url}
                  className={`menu-lang-icon hover:opacity-100`}
                />
              )}
            </button>
          </div>
        </Container>
        <div
          className={`bg-[#F8F8F8] border-b-[1px] border-[#EDEDED] relative z-30`}
        >
          <Container className={`menu-gray-div flex relative z-30 gap-4`}>
            <div
              className={`absolute -top-10 left-2 lg:left-10 w-10 h-[92px] bg-[#EE2D3A] z-40`}
            ></div>
            <img
              src={`/assets/logo.svg`}
              alt={""}
              className={`w-10 h-10 z-50`}
            />
            <div className={`grow`}>
              <img src={`/assets/sportzoo.svg`} alt={""} className={`h-6`} />
            </div>
            <div className={`flex lg:hidden`}>
              <img
                src={`/assets/menu.svg`}
                alt={""}
                ref={menuRef}
                onClick={() => setMenuOpen((prev) => !prev)}
              />
            </div>
            <div className={`hidden lg:flex gap-4`}>
              <img
                src={`/assets/magnifyingGlass.svg`}
                alt={""}
                className={`menu-icon justify-self-end`}
              />
              <div className={`menu-icon relative justify-self-end`}>
                <img
                  src={`/assets/shoppingBag.svg`}
                  alt={""}
                  className={`menu-icon absolute`}
                />
                <div className={`menu-cart-number`}>
                  <img src={`/assets/Ellipse.svg`} alt={""} className={``} />
                  <div className={``}>0</div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div
          className={`lg:hidden absolute w-screen px-2 py-4 bg-[#F8F8F8] font-semibold ${
            menuOpen ? "translate-y-0 z-30" : "-translate-y-full z-0"
          } ease-in-out duration-300`}
        >
          <Container>
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
                  className={`menu-icon justify-self-end`}
                />
                <div className={`menu-icon relative justify-self-end`}>
                  <img
                    src={`/assets/shoppingBag.svg`}
                    alt={""}
                    className={`menu-icon absolute`}
                  />
                  <div className={`menu-cart-number`}>
                    <img src={`/assets/Ellipse.svg`} alt={""} className={``} />
                    <div>0</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex mt-4 justify-end gap-4`}>
              {header && (
                <Link href={header.button_shop.link}>
                  <a className={`menu-button-shop hover:bg-black/20`}>
                    {header.button_shop.name}
                  </a>
                </Link>
              )}
              {header && (
                <Link href={header.button_my_card.link}>
                  <a className={`menu-button-card hover:bg-[#a8222b]`}>
                    <span className={`inline-block align-middle`}>
                      {header.button_my_card.name}
                    </span>
                    <img
                      src={`/assets/chevron-down.svg`}
                      alt={""}
                      className={`inline-block ml-4`}
                    />
                  </a>
                </Link>
              )}
            </div>
          </Container>
        </div>

        <div className={`bg-[#F8F8F8] border-b-[1px] border-[#EDEDED]`}>
          <Container
            className={`menu-gray-div hidden lg:flex font-bold justify-between`}
          >
            <div className={`flex gap-4`}>
              {menu?.map((m, index) => (
                <Link key={index} href={m.path}>
                  <a className={"hover:text-[#EE2D3A]"}>{m.title}</a>
                </Link>
              ))}
            </div>
            <div className={`flex gap-4`}>
              {header && (
                <Link href={header.button_shop.link}>
                  <a
                    className={`menu-button-shop hover:bg-black hover:text-white`}
                  >
                    {header.button_shop.name}
                  </a>
                </Link>
              )}
              {header && (
                <Link href={header.button_my_card.link}>
                  <a
                    className={`menu-button-card hover:bg-[#a8222b] hover:text-white`}
                  >
                    <span className={`inline-block align-middle`}>
                      {header.button_my_card.name}
                    </span>
                    <img
                      src={`/assets/chevron-down.svg`}
                      alt={""}
                      className={`inline-block ml-4`}
                    />
                  </a>
                </Link>
              )}
            </div>
          </Container>
        </div>
      </nav>
    )
  );
}
