import { useEffect, useState, useContext, useRef } from 'react';
import MenuItems from './MenuItem';
import useMediaQuery from '../useMediaQuery';
import { gql, useQuery } from '@apollo/client';
import Logo from '../../logo';
import { AppContext } from '../../../App';
import { useAuth } from '../../../context/AuthContext';
import UserInfo from './UserInfo';
import { Avatar, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { FIcon } from '../../../component/icon';
import { ME } from '../../../pages/post/view/_gql';
import SearchModal from '../../modal/SearchModal';
import { useNavigate } from 'react-router-dom';
import SessionModal from '../../modal/session';
import SideMenu from './SideMenu';
import { ESService } from '../../../lib/esService';

const CATEGORIES = gql`
  query GetCategories {
    categories(sort: { direction: asc, field: "position" }, filter: { status: { eq: "active" } }) {
      nodes {
        id
        name
        slug
        position
      }
    }
  }
`;

const mobileItems = [
  {
    title: 'Радио',
    icon: 'icon-fi-rs-wave',
    url: 'https://www.caak.mn/radio/',
  },
  {
    title: 'Подкаст',
    icon: 'icon-fi-rs-mic',
    url: 'https://soundcloud.com/caak-podcast',
  },
  {
    title: 'Саак мэдээ',
    icon: 'icon-fi-rs-caak-news',
    url: 'https://www.caak.mn/',
  },
];

export default function NavbarNew() {
  const context = useContext(AppContext);
  const { data: me, loading: me_loading } = useQuery(ME);
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [mobileSideMenu, setMobileSideMenu] = useState(false);
  const [searchShown, setSearchShown] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [navBarStyle, setNavBarStyle] = useState(true);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 400)');
  const { isAuth, logout, openModal } = useAuth();

  const Settings = [
    {
      title: 'Профайл',
      icon: 'icon-fi-rs-user',
      link: `/profile/${me?.me?.id}`,
    },
    {
      title: 'Дашбоард',
      icon: 'icon-fi-rs-statistic',
      link: `/dashboard/${me?.me?.id}`,
    },
    {
      title: 'Тохиргоо',
      icon: 'icon-fi-rs-settings',
      link: `/settings/${me?.me?.id}`,
    },
  ];

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSideMenuOpen(false);
          setMobileSideMenu(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const mobileRef = useRef(null);
  useOutsideAlerter(mobileRef);

  useEffect(() => {
    const es = new ESService('caak');
    es.boostedPosts().then(setPosts);
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (context.store === 'default') {
      setNavBarStyle(false);
    } else if (context.store === 'transparent') {
      setNavBarStyle(true);
    } else if (context.store === null) {
      setNavBarStyle(null);
    }
  }, [context.store]);

  return navBarStyle === null ? null : isLaptop ? (
    loaded && (
      <nav
        className={`${
          navBarStyle ? 'navbarLinear absolute z-[2] top-0' : 'border-b'
        } w-full px-[40px] flex items-center h-[70px]`}
      >
        <div className={'h-[42.33px] flex flex-row items-center justify-between w-full'}>
          <div className={'flex flex-row items-center'}>
            {/*Mobile Menu Icon*/}
            <div
              onClick={() => setSideMenuOpen(true)}
              className={'mr-[30px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center'}
            >
              <span className={`icon-fi-rs-hamburger-menu text-[22px] ${navBarStyle ? 'text-white' : 'text-black'}`} />
            </div>
            <Logo navBarStyle={navBarStyle} />
            {isLaptop && <MenuItems navBarStyle={navBarStyle} />}
          </div>
          <div className={'flex flex-row items-center'}>
            <div
              onClick={() => setSearchShown(true)}
              className={`${
                isTablet ? 'mr-0' : isAuth ? 'mr-[15px]' : 'mr-[22px]'
              } flex w-[22px] h-[22px] items-center justify-center cursor-pointer`}
            >
              <span
                className={`icon-fi-rs-search ${
                  context.store === 'default' ? 'text-[#555555]' : 'text-white'
                } text-[19px]`}
              />
            </div>
            {isAuth ? (
              <UserInfo />
            ) : (
              <div className={'hidden md:flex flex-row items-center'}>
                <button
                  className={`mr-[12px] h-[34px] font-roboto rounded-[4px] w-[92px] text-[15px] ${
                    navBarStyle
                      ? 'text-white bg-transparent border-[1px] font-bold  border-white'
                      : 'text-[#111111] border border-[#D4D8D8] font-medium'
                  } `}
                  onClick={() => openModal('login')}
                >
                  Нэвтрэх
                </button>
                <button
                  className={
                    'h-[34px] font-roboto w-[112px] bg-caak-primary rounded-[4px] text-[15px] font-bold text-white'
                  }
                  onClick={() => openModal('open')}
                >
                  Бүртгүүлэх
                </button>
              </div>
            )}
          </div>
        </div>
        <SessionModal />
        {sideMenuOpen && (
          <div
            ref={sideMenuRef}
            className="absolute left-0 top-0 w-[410px] bg-white px-[50px] pt-[50px] pb-[55px] font-condensed z-[1]"
          >
            <div className="flex flex-row items-center justify-between w-full">
              <span className="icon-fi-rs-search text-[20px] text-[#111111]" />
              <img src={logoIcon} className="cursor-pointer w-[130px] object-contain" alt="Caak Logo" />
              <span
                onClick={() => setSideMenuOpen(false)}
                className="icon-fi-rs-close cursor-pointer text-[18px] w-[24px] h-[24px] flex items-center justify-center text-[#111111]"
              />
            </div>
            <div
              onClick={() => setSubMenuShown(!subMenuShown)}
              className="mt-[75px] flex flex-row items-center cursor-pointer"
            >
              <span
                className={`${
                  subMenuShown ? 'icon-fi-rs-minus' : 'icon-fi-rs-plus'
                } w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#FF6600] mr-[26px]`}
              />
              <p className="text-[18px] font-medium leading-[21px] hover:text-[#555555]">МЭДЭЭНИЙ ТӨРӨЛ</p>
            </div>
            {subMenuShown && (
              <div className="ml-[50px] mt-[30px] flex flex-col gap-[20px]">
                {categories.map((data, index) => {
                  return (
                    <Link key={index} to={`/tags/${data.slug}`}>
                      <p className="text-[#111111] leading-[20px] text-[14px] font-condensed">{data.name}</p>
                    </Link>
                  );
                })}
              </div>
            )}
            <div className="mt-[40px] flex flex-row items-center cursor-pointer">
              <span className="icon-fi-rs-hashtag w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]" />
              <p className="text-[18px] font-medium leading-[21px] text-[#111111]">ТАГУУД</p>
            </div>
            <a
              target={'_blank'}
              href="https://www.youtube.com/c/caakvideo"
              className="mt-[40px] flex flex-row items-center cursor-pointer"
            >
              <span className="icon-fi-rs-tv w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]" />
              <p className="text-[18px] font-medium leading-[21px] text-[#111111]">ВИДЕО</p>
            </a>
            <a
              target={'_blank'}
              href="https://soundcloud.com/caak-podcast"
              className="mt-[40px] flex flex-row items-center cursor-pointer"
            >
              <span className="icon-fi-rs-mic w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]" />
              <p className="text-[18px] font-medium leading-[21px] text-[#111111]">ПОДКАСТ</p>
            </a>
            <a
              target={'_blank'}
              href="https://www.caak.mn/radio"
              className="mt-[40px] flex flex-row items-center cursor-pointer"
            >
              <span className="icon-fi-rs-wave w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]" />
              <p className="text-[18px] font-medium leading-[21px] text-[#111111]">РАДИО</p>
            </a>
            <div
              onClick={() => {
                navigate('/help', { state: 1 });
                setSideMenuOpen(false);
              }}
              className="mt-[40px] flex flex-row items-center cursor-pointer"
            >
              <span className="icon-fi-rs-ads w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]" />
              <p className="text-[18px] font-medium leading-[21px] text-[#111111]">СУРТАЛЧИЛГАА</p>
            </div>
            <div
              onClick={() => {
                navigate('/help', { state: 2 });
                setSideMenuOpen(false);
              }}
              className="mt-[40px] flex flex-row items-center cursor-pointer"
            >
              <span className="icon-fi-rs-phone w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]" />
              <p className="text-[18px] font-medium leading-[21px] text-[#111111]">ХОЛБОО БАРИХ</p>
            </div>
            <div className="border-t border-b w-full border-[#D4D8D8] flex flex-row items-center justify-center gap-[19px] py-[30px] mt-[137px]">
              <span className="icon-fi-rs-fb text-[22px]" />
              <span className="icon-fi-rs-ig text-[22px]" />
              <span className="icon-fi-rs-tw text-[22px]" />
              <span className="icon-fi-rs-yt text-[22px]" />
            </div>
            <p className="text-[#555555] text-[15px] mt-[30px] text-center">©2022 “Саак Холдинг” ХХК</p>
          </div>
        )}
        {sideMenuOpen && <SideMenu setSideMenuOpen={setSideMenuOpen} />}
        {searchShown && <SearchModal setSearchShown={setSearchShown} />}
      </nav>
    )
  ) : (
    <nav className="py-[10px] flex flex-col sticky top-0 z-[2] bg-white">
      <div className="w-full flex flex-row justify-between pl-[16px] pr-[17px]">
        <Logo className={''} mobile navBarStyle={false} />
        <span
          onClick={() => setMobileSideMenu(!mobileSideMenu)}
          className="icon-fi-rs-user text-[#555555] text-[27.5px]"
        />
      </div>
      {mobileSideMenu && (
        <div className="left-0 right-0 bottom-0 top-0 z-[5] overflow-auto fixed flex justify-end bg-black bg-opacity-70">
          <div ref={mobileRef} className="w-3/4 h-screen overflow-hidden overflow-y-scroll bg-white pt-[26px]">
            {isAuth ? (
              <div>
                <div className="flex flex-row items-center">
                  <Avatar className="w-[50px] h-[50px] mr-[20px] ml-[16px]" />
                  <p className="text-[20px] font-condensed font-bold">{me?.me?.firstName}</p>
                </div>
                <div className="w-full border-t mt-[20px]">
                  <div className="px-[16px] flex flex-col gap-[24px] mt-[20px]">
                    {Settings.map((data, index) => {
                      return (
                        <Link onClick={() => setMobileSideMenu(false)} key={index} to={{ pathname: data.link }}>
                          <div className="flex flex-row items-center cursor-pointer">
                            <FIcon className={`${data.icon} mr-[18px] text-[24px] w-[26px] h-[26px]`} />
                            <p className="text-[18px]">{data.title}</p>
                          </div>
                        </Link>
                      );
                    })}
                    <button
                      onClick={() => {
                        logout();
                        setMobileSideMenu(false);
                      }}
                      className="w-full h-[58px] text-[16px] font-medium text-caak-black border rounded-[4px]"
                    >
                      Гарах
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-[56px] h-[56px] rounded-full bg-[#EFEEEF] flex items-center justify-center ml-[16px]">
                  <span
                    onClick={() => setMobileSideMenu(!mobileSideMenu)}
                    className="icon-fi-rs-user-f text-[#BBBEBE] text-[35px]"
                  />
                </div>
                <div className="px-[16px]">
                  <p className="font-bold text-[28px] font-condensed w-[233px] leading-[32px] mt-[30px]">
                    Та бүртгэл үүсгэн мэдээллийг өөрийн болгоорой!
                  </p>
                  <button
                    onClick={() => {
                      openModal('open');
                      setMobileSideMenu(false);
                    }}
                    className="w-full h-[58px] text-[16px] font-medium text-white mt-[20px] bg-caak-primary rounded-[4px]"
                  >
                    Бүртгүүлэх
                  </button>
                  <button
                    onClick={() => {
                      openModal('login');
                      setMobileSideMenu(false);
                    }}
                    className="w-full h-[58px] text-[16px] font-medium text-caak-black mt-[20px] border rounded-[4px]"
                  >
                    Нэвтрэх
                  </button>
                </div>
              </div>
            )}
            <div className="w-full border-t border-b mt-[30px] py-[25px] flex flex-col gap-[24px]">
              {mobileItems.map((data, index) => {
                return (
                  <a href={data.url} target="_blank" key={index} className="flex flex-row items-center ml-[24px]">
                    <FIcon className={`${data.icon} mr-[18px] text-[24px] w-[26px] h-[26px]`} />
                    <p className="text-[18px]">{data.title}</p>
                  </a>
                );
              })}
            </div>
            <div
              onClick={() => {
                navigate('/help', { state: 1 });
                setMobileSideMenu(false);
              }}
              className="flex flex-row items-center ml-[24px] mt-[24px]"
            >
              <FIcon className={`icon-fi-rs-ads mr-[18px] text-[24px] w-[26px] h-[26px]`} />
              <p className="text-[18px]">Сурталчилгаа</p>
            </div>
            <div
              onClick={() => {
                navigate('/help', { state: 2 });
                setMobileSideMenu(false);
              }}
              className="flex flex-row items-center ml-[24px] mt-[24px]"
            >
              <FIcon className={`icon-fi-rs-phone mr-[18px] text-[24px] w-[26px] h-[26px]`} />
              <p className="text-[18px]">Холбоо барих</p>
            </div>
            <div className="w-full border-t border-b mt-[30px] py-[25px] flex flex-col gap-[24px] ml-[24px]">
              <div
                onClick={() => {
                  navigate('/help', { state: 1 });
                  setMobileSideMenu(false);
                }}
                className="flex flex-row items-center"
              >
                <FIcon className={`icon-fi-rs-ads mr-[18px] text-[24px] w-[26px] h-[26px]`} />
                <p className="text-[18px]">Нууцлалын бодлого</p>
              </div>
              <div
                onClick={() => {
                  navigate('/help', { state: 1 });
                  setMobileSideMenu(false);
                }}
                className="flex flex-row items-center"
              >
                <FIcon className={`icon-fi-rs-phone mr-[18px] text-[24px] w-[26px] h-[26px]`} />
                <p className="text-[18px]">Үйлчилгээний нөхцөл</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <SessionModal />
    </nav>
  );
}
