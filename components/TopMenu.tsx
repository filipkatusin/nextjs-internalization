import Link from "next/link";
import { menu } from "@/src/data/menu";
import { header } from "@/src/data/header";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container";
import { Header } from "@/lib/interfaces";
import { useRouter } from "next/router";
import { getStrapiUrl } from "@/lib/get-strapi-url";
import SearchEngine from "@/components/SearchEngine";

export default function TopMenu() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [headerData, setHeaderData] = useState<any>({});
  const [menuData, setMenuData] = useState<any>([]);
  const [langIcon, setLangIcon] = useState(router.locale + "_icon");
  const [localization, setLocalization] = useState(router.locale);

  const menuRef = useRef<HTMLDivElement>();
  const langRef = useRef();
  const menuHamburgerRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const localizations: { [key: string]: Header } = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const att = header?.localizations?.data[0]?.attributes;
    att?.localizations?.data?.forEach((e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      localizations[e.attributes.locale] = e.attributes;
    });
    setHeaderData(
      {
        [att?.locale]: att,
        ...localizations,
      }[localization]
    );
    setMenuData(localization === "sk" ? menu[0] : menu[1]);
  }, [localization]);

  useEffect(() => {
    const closeDropdown = (e) => {
      console.log(e.path[0]);
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuHamburgerRef.current &&
        !menuHamburgerRef?.current.contains(e.target)
      ) {
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
    <>
      <div className={`sticky top-0 lg:relative z-[15000]`}>
        <div className={`bg-[#191919] relative z-30`}>
          <Container className={`menu-black-div space-x-4 md:space-x-[20px]`}>
            <ul className={"flex space-x-4 md:space-x-[20px]"}>
              {headerData?.socials?.map((socialIcon, index) => (
                <Link key={index} href={socialIcon?.link ?? ""}>
                  <a className={`w-6 h-6`} target={"_blank"}>
                    <img
                      className={
                        "hover:scale-[110%] transform transition-transform cursor-pointer"
                      }
                      src={getStrapiUrl(
                        socialIcon?.image?.data?.attributes?.url
                      )}
                      alt=""
                    />
                  </a>
                </Link>
              ))}
            </ul>

            <div className={`w-[1px] h-7 bg-white/[16%]`}></div>

            <button
              ref={langRef}
              onClick={() => setLangDropdown((prev) => !prev)}
            >
              {headerData && (
                <img
                  alt={""}
                  src={header[langIcon]?.data?.attributes?.url}
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
              {headerData && (
                <Link href={router?.asPath ?? ""} locale={"sk"}>
                  <a onClick={() => (router.locale = "sk")}>
                    <img
                      alt={""}
                      src={headerData.sk_icon?.data?.attributes?.url}
                      className={`menu-lang-icon hover:opacity-100`}
                      onClick={() => {
                        setLangIcon("sk_icon");
                        setLocalization("sk");
                      }}
                    />
                  </a>
                </Link>
              )}
            </button>
            <button className={``}>
              {headerData && (
                <Link href={router?.asPath ?? ""} locale={"en"}>
                  <a onClick={() => (router.locale = "en")}>
                    <img
                      alt={""}
                      src={headerData.en_icon?.data?.attributes?.url}
                      className={`menu-lang-icon hover:opacity-100`}
                      onClick={() => {
                        setLangIcon("en_icon");
                        setLocalization("en");
                      }}
                    />
                  </a>
                </Link>
              )}
            </button>
          </div>
        </Container>
        <div
          className={`bg-[#F8F8F8] border-b-[1px] border-[#EDEDED] relative z-30`}
        >
          <Container
            className={`menu-gray-div justify-between flex relative z-30 gap-4`}
          >
            <Link href={"/"}>
              <a className={`w-14 h-14 z-50 absolute -top-2 left-0`}>
                <img src={`/assets/logo.svg`} alt={""} />
              </a>
            </Link>
            <Link href={"/"}>
              <a>
                <img
                  src={`/assets/sportzoo.svg`}
                  alt={""}
                  className={`h-6 ml-16`}
                />
              </a>
            </Link>
            <div className={`flex lg:hidden`}>
              <img
                className={"cursor-pointer"}
                ref={menuHamburgerRef}
                src={`/assets/menu.svg`}
                alt={""}
                onClick={() => setMenuOpen((prev) => !prev)}
              />
            </div>

            <div className={"flex-row absolute right-0 top-4 hidden md:flex"}>
              <div
                className={`overflow-hidden transition-all ${
                  openSearchBar ? "max-w-[300px]" : "max-w-0"
                }`}
              >
                <SearchEngine />
              </div>
              <div
                onClick={() =>
                  setOpenSearchBar((openSearchBar) => !openSearchBar)
                }
                className={`hidden lg:flex space-x-4 cursor-pointer z-90 lg:ml-2 lg:pt-[3px]`}
              >
                <img
                  src={`/assets/magnifyingGlass.svg`}
                  alt={""}
                  className={`menu-icon justify-self-end`}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`lg:hidden fixed w-screen px-2 py-4 bg-[#F8F8F8] font-semibold z-[100] ${
          menuOpen ? "translate-y-0 z-30" : "-translate-y-full z-0"
        } ease-in-out duration-300`}
      >
        <Container>
          <div className={`flex justify-between relative`}>
            <div className={`flex flex-col gap-3`}>
              {menuData?.map((m, index) => (
                <Link key={index} href={m.path ?? ""}>
                  <a>{m.title}</a>
                </Link>
              ))}
            </div>

            <div className={"flex absolute right-4 top-0"}>
              <div
                className={`overflow-hidden transition-all ${
                  openSearchBar ? "max-w-[300px]" : "max-w-0"
                }`}
              >
                <SearchEngine />
              </div>
              <div
                onClick={() =>
                  setOpenSearchBar((openSearchBar) => !openSearchBar)
                }
                className={`lg:flex space-x-4 cursor-pointer z-90 ml-2 pt-[3px]`}
              >
                <img
                  src={`/assets/magnifyingGlass.svg`}
                  alt={""}
                  className={`menu-icon justify-self-end`}
                />
              </div>
            </div>

            {/*<div className={`space-x-4 flex`}>*/}
            {/*  <img*/}
            {/*    src={`/assets/magnifyingGlass.svg`}*/}
            {/*    alt={""}*/}
            {/*    className={`menu-icon justify-self-end`}*/}
            {/*  />*/}
            {/*  /!*<div className={`menu-icon relative justify-self-end`}>*!/*/}
            {/*  /!*  <img*!/*/}
            {/*  /!*    src={`/assets/shoppingBag.svg`}*!/*/}
            {/*  /!*    alt={""}*!/*/}
            {/*  /!*    className={`menu-icon absolute`}*!/*/}
            {/*  /!*  />*!/*/}
            {/*  /!*  <div className={`menu-cart-number`}>*!/*/}
            {/*  /!*    <img src={`/assets/Ellipse.svg`} alt={""} className={``} />*!/*/}
            {/*  /!*    <div>0</div>*!/*/}
            {/*  /!*  </div>*!/*/}
            {/*  /!*</div>*!/*/}
            {/*</div>*/}
          </div>
          <div className={`flex mt-4 justify-end space-x-4`}>
            {headerData && (
              <Link href={headerData.button_shop?.link ?? ""}>
                <a className={`menu-button-shop hover:bg-black/20`}>
                  {headerData.button_shop?.name}
                </a>
              </Link>
            )}
            {/*{headerData && (*/}
            {/*  <Link href={headerData.button_my_card?.link ?? ""}>*/}
            {/*    <a className={`menu-button-card hover:bg-[#a8222b]`}>*/}
            {/*      <span className={`inline-block align-middle`}>*/}
            {/*        {headerData.button_my_card?.name}*/}
            {/*      </span>*/}
            {/*      <img*/}
            {/*        src={`/assets/chevron-down.svg`}*/}
            {/*        alt={""}*/}
            {/*        className={`inline-block ml-4`}*/}
            {/*      />*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*)}*/}
          </div>
        </Container>
      </div>

      <div
        className={`bg-[#F8F8F8] border-b-[1px] border-[#EDEDED] lg:sticky lg:top-0 lg:z-[100]`}
      >
        <Container
          className={`menu-gray-div hidden lg:flex font-bold justify-between`}
        >
          <div className={`flex space-x-8`}>
            {menuData?.map((m, index) => (
              <Link key={index} href={m.path ?? ""}>
                <a className={"hover:text-[#EE2D3A] text-lg"}>{m.title}</a>
              </Link>
            ))}
          </div>
          <div className={`flex space-x-4`}>
            {headerData && (
              <Link href={headerData.button_shop?.link ?? ""}>
                <a
                  className={`menu-button-shop hover:bg-black hover:text-white`}
                >
                  {headerData.button_shop?.name}
                </a>
              </Link>
            )}
            {/*{headerData && (*/}
            {/*  <Link href={headerData.button_my_card?.link ?? ""}>*/}
            {/*    <a*/}
            {/*      className={`menu-button-card hover:bg-[#a8222b] hover:text-white`}*/}
            {/*    >*/}
            {/*      <span className={`inline-block align-middle`}>*/}
            {/*        {headerData.button_my_card?.name}*/}
            {/*      </span>*/}
            {/*      <img*/}
            {/*        src={`/assets/chevron-down.svg`}*/}
            {/*        alt={""}*/}
            {/*        className={`inline-block ml-4`}*/}
            {/*      />*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*)}*/}
          </div>
        </Container>
      </div>
    </>
  );
}
