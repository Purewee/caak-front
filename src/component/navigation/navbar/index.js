import { useEffect, useState, useContext } from "react";
import Button from "../../button";
import MenuItems from "./MenuItem";
import useMediaQuery from "../useMediaQuery";
import Logo from "../../logo";
import { AppContext } from "../../../App";

export default function NavbarNew() {
	const context = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);;
  const [navBarStyle, setNavBarStyle] = useState(true);;
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)
  const isLaptop = useMediaQuery("screen and (max-device-width: 1100px)");
  const isTablet = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if(context.store === 'default'){
      setNavBarStyle(false)
    }else if(context.store === 'transparent'){
      setNavBarStyle(true)
    }
  }, [context.store])

  return (
    loaded && (
      <nav
        className={`${navBarStyle ? 'bg-transparent absolute z-[2] top-0' : 'border-b'} w-full px-[40px] flex items-center h-[70px]`}
      >
        <div
          className={"h-[42.33px] flex flex-row items-center justify-between w-full"}
        >
          <div className={"flex flex-row items-center"}>
            {/*Mobile Menu Icon*/}
            {isLaptop && (
              <div
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                // ref={mobileMenuRef}
                className={`block md:hidden w-full z-50 bg-transparent justify-start fixed left-0 top-0 transition ease-linear duration-300 ${
                  isMobileMenuOpen
                    ? "transform translate-x-0"
                    : "transform -translate-x-full"
                }`}
                id="mobile-menu"
              >
                {/* <MobileSideMenu setOpen={setIsMobileMenuOpen} /> */}
              </div>
            )}
            {isLaptop && (
              <div
                onClick={() => setIsMobileMenuOpen(true)}
                className={
                  "mr-[30px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
                }
              >
                <span
                  className={
                    "icon-fi-rs-hamburger-menu text-[22px] text-white"
                  }
                />
              </div>
            )}

            <Logo />
            {!isLaptop && <MenuItems navBarStyle={navBarStyle} />}
          </div>
          <div className={"flex flex-row items-center"}>
            <div
              className={`${
                isTablet ? "mr-0" : "mr-[22px]"
              } flex w-[22px] h-[22px] items-center justify-center cursor-pointer`}
            >
              <span className={"icon-fi-rs-search text-white text-[22px]"} />
            </div>

            
              <div className={"hidden md:flex flex-row items-center"}>
                <Button
                  round
                  skin={"secondary"}
                  className={
                    "mr-[12px] h-[34px] font-roboto rounded-[4px] text-[15px] font-bold text-white bg-transparent border-[1px] border-white"
                  }
                  // onClick={() => {
                  //   router.replace(
                  //     {
                  //       query: {
                  //         ...router.query,
                  //         prevPath: router.asPath,
                  //         signInUp: "signIn",
                  //         isModal: true,
                  //       },
                  //     },
                  //     `/signInUp/signIn`,
                  //     { shallow: true }
                  //   );
                  // }}
                >
                  Нэвтрэх
                </Button>
                <Button
                  round
                  skin={"primary"}
                  className={
                    "h-[34px] font-roboto  rounded-[4px] text-[15px] font-bold text-white"
                  }
                  // onClick={() =>
                  //   router.replace(
                  //     {
                  //       pathname: router.pathname,
                  //       query: {
                  //         ...router.query,
                  //         prevPath: router.asPath,
                  //         signInUp: "signUp",
                  //         isModal: true,
                  //       },
                  //     },
                  //     `/signInUp/signUp`,
                  //     { shallow: true, scroll: false }
                  //   )
                  // }
                >
                  Бүртгүүлэх
                </Button>
              </div>
          </div>
        </div>
      </nav>
    )
  );
}
