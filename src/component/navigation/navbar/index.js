import { useEffect, useState, useContext } from "react";
import MenuItems from "./MenuItem";
import useMediaQuery from "../useMediaQuery";
import Logo from "../../logo";
import { AppContext } from "../../../App";
import SignInUpController from "../../modal//SignInUpController";
import {useAuth} from "../../../context/AuthContext";
import UserInfo from "./UserInfo";

export default function NavbarNew() {
	const context = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);;
  const [isShown, setIsShown] = useState(false);;
  const [navBarStyle, setNavBarStyle] = useState(true);;
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)
  const isLaptop = useMediaQuery("(min-width: 1001px) and (max-width: 1920px)");
  const isTablet = useMediaQuery("(min-width: 401px) and (max-width: 1000px)");
  const isMobile = useMediaQuery("screen and (max-width: 767px)");
  const { isAuth } = useAuth();

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

  return isLaptop && (
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
            {/* {isLaptop && (
              <div
                onClick={() => setIsMobileMenuOpen(true)}
                className={
                  "mr-[30px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
                }
              >
                <span
                  className={
                    `icon-fi-rs-hamburger-menu text-[22px] ${navBarStyle ? 'text-white' : 'text-black'}`
                  }
                />
              </div>
            )} */}
            <div
              onClick={() => setIsMobileMenuOpen(true)}
              className={
                "mr-[30px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
              }
            >
              <span
                className={
                  `icon-fi-rs-hamburger-menu text-[22px] ${navBarStyle ? 'text-white' : 'text-black'}`
                }
              />
            </div>
            <Logo navBarStyle={navBarStyle} />
            {isLaptop && <MenuItems navBarStyle={navBarStyle} />}
          </div>
          {isAuth ? <UserInfo />
            :
            <div className={"flex flex-row items-center"}>
              <div
                className={`${
                  isTablet ? "mr-0" : "mr-[22px]"
                } flex w-[22px] h-[22px] items-center justify-center cursor-pointer`}
              >
                <span className={"icon-fi-rs-search text-white text-[22px]"}/>
              </div>
              <div className={"hidden md:flex flex-row items-center"}>
                <button
                  className={
                    `mr-[12px] h-[34px] font-roboto rounded-[4px] w-[92px] text-[15px] ${navBarStyle ? 'text-white bg-transparent border-[1px] font-bold  border-white' : 'text-[#111111] border border-[#D4D8D8] font-medium'} `
                  }
                  onClick={() => setIsShown('signin')}
                >
                  Нэвтрэх
                </button>
                <button
                  className={
                    "h-[34px] font-roboto w-[112px] bg-caak-primary rounded-[4px] text-[15px] font-bold text-white"
                  }
                  onClick={() => setIsShown('signup')}
                >
                  Бүртгүүлэх
                </button>
              </div>
            </div>
          }
        </div>
        <SignInUpController isShown={isShown} setIsShown={setIsShown}/>
      </nav>
    )
  );
}
