import { useEffect, useState, useContext, useRef } from 'react';
import MenuItems from './MenuItem';
import useMediaQuery from '../useMediaQuery';
import { gql, useQuery } from '@apollo/client';
import Logo from '../../logo';
import { AppContext } from '../../../App';
import SignInUpController from '../../modal//SignInUpController';
import { useAuth } from '../../../context/AuthContext';
import UserInfo from './UserInfo';
import logoIcon from '../../../images/New-Logo.svg';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';

const CATEGORIES = gql`
  query GetCategories {
    categories(sort: { direction: asc, field: "position" }) {
      nodes {
        id
        name
        slug
        position
      }
    }
  }
`;

const subMenu = [
  {
    title: 'Хөгжилтэй',
  },
  {
    title: 'Кино',
  },
  {
    title: 'Загвар',
  },
  {
    title: 'Гэрэл зураг',
  },
  {
    title: 'Спорт',
  },
  {
    title: 'Тоглоом',
  },
  {
    title: 'Шинжлэх ухаан',
  },
  {
    title: 'Гэр бүл',
  },
  {
    title: 'Гоо сайхан',
  },
  {
    title: 'Аялал',
  },
  {
    title: 'Амьтад',
  },
  {
    title: 'Энтэртайнмент',
  },
  {
    title: 'Хоол',
  },
];

export default function NavbarNew() {
  //prettier-ignore
  const context = useContext(AppContext);
  const { data, loading } = useQuery(CATEGORIES);
  const categories = data?.categories?.nodes || [];
  const [loaded, setLoaded] = useState(false);
  const [subMenuShown, setSubMenuShown] = useState(false);
  const [searchShown, setSearchShown] = useState(false);
  const [navBarSticky, setNavBarSticky] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [navBarStyle, setNavBarStyle] = useState(true);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 767px)');
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  function handleChange(event) {
    setSearchValue(event.target.value);
  }
  //prettier-ignore
  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      navigate("/search", { replace: true, state: {value: searchValue} });
      setSearchShown(false)
    }
  };

  //prettier-ignore
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSearchShown(false)
          setSideMenuOpen(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const searchRef = useRef(null);
  const sideMenuRef = useRef(null);
  useOutsideAlerter(searchRef);
  useOutsideAlerter(sideMenuRef);

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

  useEffect(() => {
    const listener = () => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 40) {
        setNavBarSticky(false);
      } else {
        setNavBarSticky(true);
      }
    };
    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, [setNavBarSticky]);

  if (loading) {
    return <Skeleton />;
  }

  //prettier-ignore
  return navBarStyle === null ? null : isLaptop ? (
    loaded && (
      <nav
        className={`${
          navBarStyle ? 'bg-transparent absolute z-[2] top-0' : 'border-b'
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
                  isTablet ? 'mr-0' : isAuth ? 'mr-[20px]' : 'mr-[22px]'
                } flex w-[22px] h-[22px] items-center justify-center cursor-pointer`}
              >
                <span className={'icon-fi-rs-search text-white text-[19px]'} />
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
                  onClick={() => setIsShown('signin')}
                >
                  Нэвтрэх
                </button>
                <button
                  className={
                    'h-[34px] font-roboto w-[112px] bg-caak-primary rounded-[4px] text-[15px] font-bold text-white'
                  }
                  onClick={() => setIsShown('signup')}
                >
                  Бүртгүүлэх
                </button>
              </div>
              )}
          </div>
        </div>
        <SignInUpController isShown={isShown} setIsShown={setIsShown} />
        {
          sideMenuOpen && 
          <div className='absolute left-0 top-0 w-[410px] bg-white z-[3] px-[50px] pt-[50px] pb-[55px]'>
            <div ref={sideMenuRef} className='flex flex-row items-center justify-between w-full'>
                <span className='icon-fi-rs-search text-[20px] text-[#111111]' />
                <img
                    src={logoIcon}
                    className="cursor-pointer w-[130px] object-contain"
                    alt="Caak Logo"
                />
                <span onClick={() => setSideMenuOpen(false)} className='icon-fi-rs-close cursor-pointer text-[18px] w-[24px] h-[24px] flex items-center justify-center text-[#111111]' />
            </div>
            <div onClick={() => setSubMenuShown(!subMenuShown)} className='mt-[75px] flex flex-row items-center cursor-pointer'>
                <span className={`${subMenuShown ? 'icon-fi-rs-minus' : 'icon-fi-rs-plus'} w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#FF6600] mr-[26px]`} />
                <p className='text-[18px] font-medium leading-[21px] hover:text-[#555555]'>МЭДЭЭНИЙ ТӨРӨЛ</p>
            </div>
            {
              subMenuShown && 
              <div className='ml-[50px] mt-[30px] flex flex-col gap-[20px]'>
                {categories.map((data, index) => {
                  return(
                    <Link key={index} to={`/tags/${data.slug}`}>
                      <p className='text-[#111111] leading-[20px] text-[17px]'>{data.name}</p>
                    </Link>
                  )
                })}
              </div>
            }
            <div className='mt-[40px] flex flex-row items-center cursor-pointer'>
                <span className='icon-fi-rs-hashtag w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]' />
                <p className='text-[18px] font-medium leading-[21px] text-[#111111]'>ТАГУУД</p>
            </div>
            <div className='mt-[40px] flex flex-row items-center cursor-pointer'>
                <span className='icon-fi-rs-tv w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]' />
                <p className='text-[18px] font-medium leading-[21px] text-[#111111]'>ВИДЕО</p>
            </div>
            <div className='mt-[40px] flex flex-row items-center cursor-pointer'>
                <span className='icon-fi-rs-mic w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]' />
                <p className='text-[18px] font-medium leading-[21px] text-[#111111]'>ПОДКАСТ</p>
            </div>
            <div className='mt-[40px] flex flex-row items-center cursor-pointer'>
                <span className='icon-fi-rs-wave w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]' />
                <p className='text-[18px] font-medium leading-[21px] text-[#111111]'>РАДИО</p>
            </div>
            <div className='mt-[40px] flex flex-row items-center cursor-pointer'>
                <span className='icon-fi-rs-ads w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]' />
                <p className='text-[18px] font-medium leading-[21px] text-[#111111]'>СУРТАЛЧИЛГАА</p>
            </div>
            <div className='mt-[40px] flex flex-row items-center cursor-pointer'>
                <span className='icon-fi-rs-phone w-[24px] h-[24px] flex items-center justify-center text-[20px] text-[#111111] mr-[26px]' />
                <p className='text-[18px] font-medium leading-[21px] text-[#111111]'>ХОЛБОО БАРИХ</p>
            </div>
            <div className='border-t border-b w-full border-[#D4D8D8] flex flex-row items-center justify-center gap-[19px] py-[30px] mt-[137px]'>
              <span className='icon-fi-rs-fb text-[22px]' />
              <span className='icon-fi-rs-ig text-[22px]' />
              <span className='icon-fi-rs-tw text-[22px]' />
              <span className='icon-fi-rs-yt text-[22px]' />
            </div>
            <p className='text-[#555555] text-[15px] mt-[30px] text-center'>©2022 “Саак Холдинг” ХХК</p>
        </div>
        }
        {
          searchShown && 
          <div className='search_modal w-full'>
            <div className='w-full flex justify-center items-center bg-white h-[70px] z-50'>
              <div className='relative max-w-[600px] w-full'>
                <input onKeyDown={onPressEnter} value={searchValue} onChange={handleChange} placeholder='Хайлт хийх...' className={`h-[54px] text-[17px] text-[#555555] w-full border px-[50px] border-[#BBBEBE] rounded-[4px]`} />
                <span className='icon-fi-rs-search absolute left-[16px] top-[16px] text-[18px] w-[22px] h-[22px] flex justify-center items-center text-[#555555]' />
                {
                  searchValue && <span onClick={() => setSearchValue('')} className='icon-fi-rs-close cursor-pointer absolute right-[16px] top-[16px] text-[16.5px] w-[22px] h-[22px] flex justify-center items-center text-[#555555]' />
                }
              </div>
            </div>
          </div>
        }
      </nav>
    )
  ) : (
    <nav className="pt-[13px] flex flex-col">
      <div className="w-full flex flex-row justify-between pl-[16px] pr-[17px]">
        <Logo className={''} mobile navBarStyle={false} />
        <span className="icon-fi-rs-user text-[#555555] text-[27.5px]" />
      </div>
    </nav>
  );
}
