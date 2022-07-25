import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../App';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import { Tabs, Select } from 'antd';
import Logo from '../../component/logo';
import UserInfo from '../../component/navigation/navbar/UserInfo';
import { FIcon } from '../../component/icon';
import SearchModal from '../../component/modal/SearchModal';
import { useAuth } from '../../context/AuthContext';
import SignInUpController from '../../component/modal/SignInUpController';
import ArticlesList from './articles_list';
import { FieldTimeOutlined, LineChartOutlined } from '@ant-design/icons';
import SideMenu from '../../component/navigation/navbar/SideMenu';

export default function Home() {
  const context = useContext(AppContext);
  const [selected, setSelected] = useState('recent');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [stickyTabs, setStickyTabs] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [searchShown, setSearchShown] = useState(false);
  const { isAuth } = useAuth();

  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState({});

  useEffect(() => {
    if (selected === 'recent') {
      setFilter([]);
      setSort({ publish_date: 'desc' });
    } else if (selected === 'trend') {
      setFilter([{ range: { publish_date: { gte: `now-1d/d` } } }]);
      setSort({ views_count: 'desc' });
    }
  }, [selected]);

  document.title = 'Саак';

  useEffect(() => {
    context.setStore('transparent');
  }, []);

  useEffect(() => {
    context.setShown(true);
  }, []);

  useEffect(() => {
    const listener = () => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 1200) {
        setStickyTabs(true);
      } else {
        setStickyTabs(false);
      }
    };
    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, [setStickyTabs]);

  return (
    <>
      <div className={`relative bg-white flex flex-col items-center mb-[100px]`}>
        <div className="h-[47px] border-b-[3px] md:hidden border-[#EFEEEF] bg-white z-[1] w-full sticky top-[53px] pl-[16px]">
          <div className="absolute -bottom-[3px] h-[36px] flex flex-row items-center gap-[16px]">
            <p
              onClick={() => setSelected('recent')}
              className={`${
                selected === 'recent' ? 'text-[#111111] border-caak-primary' : 'text-[#555555]'
              } text-[21px] leading-[24px] pb-[9px] border-b-[3px] font-condensed font-bold`}
            >
              ШИНЭ
            </p>
            <p
              onClick={() => setSelected('trend')}
              className={`${
                selected === 'trend' ? 'text-[#111111] border-caak-primary' : 'text-[#555555]'
              } text-[21px] leading-[24px] pb-[9px] border-b-[3px] font-condensed font-bold`}
            >
              ТРЭНД
            </p>
          </div>
        </div>
        <NavbarPostHeader />
        <div className="md:px-[30px] w-full flex justify-center px-[16px] sm:px-0">
          <Story />
        </div>
        <div
          className={`${
            !stickyTabs ? 'max-w-[1310px] w-full' : 'w-full'
          } hidden xl:flex sticky top-0 z-[1] flex-row justify-center items-center border-b bg-white px-[40px]`}
        >
          <FIcon
            onClick={() => setSideMenuOpen(true)}
            className={`${stickyTabs ? 'icon-fi-rs-hamburger-menu text-[22px] mr-[20px] text-caak-black' : 'hidden'}`}
          />
          {sideMenuOpen && <SideMenu setSideMenuOpen={setSideMenuOpen} />}
          <Logo className={stickyTabs ? 'block mr-[10px]' : ' hidden'} />
          <div className="max-w-[1310px] w-full px-[16px] sm:px-0">
            <Tabs size="large" onChange={(e) => setSelected(e)} className="w-full" centered>
              <Tabs.TabPane
                key="recent"
                tab={
                  <span
                    className={`text-[20px] font-bold cursor-pointer text-center leading-[20px] uppercase font-merri ${
                      selected === 'recent' ? 'text-[#111111]' : 'text-[#555555]'
                    }`}
                  >
                    Шинэ
                  </span>
                }
              ></Tabs.TabPane>
              <Tabs.TabPane
                key="trend"
                tab={
                  <span
                    className={`text-[20px] font-bold cursor-pointer text-center leading-[20px] uppercase font-merri  ${
                      selected === 'trend' ? 'text-[#111111]' : 'text-[#555555]'
                    }`}
                  >
                    Трэнд
                  </span>
                }
              ></Tabs.TabPane>
            </Tabs>
          </div>
          <div className={`min-w-[192px] flex flex-row items-center ${stickyTabs ? 'block' : ' hidden'}`}>
            <FIcon
              onClick={() => setSearchShown(true)}
              className="icon-fi-rs-search text-caak-darkGray text-[20px] w-[32px] mr-[6px]"
            />
            {isAuth ? (
              <UserInfo className={'text-caak-darkGray'} />
            ) : (
              <div className={'hidden md:flex flex-row items-center'}>
                <button
                  className={`mr-[12px] h-[34px] font-roboto rounded-[4px] w-[92px] text-[15px] text-[#111111] border border-[#D4D8D8] font-medium`}
                  onClick={() => setIsShown('signin')}
                >
                  Нэвтрэх
                </button>
                <SignInUpController isShown={isShown} setIsShown={setIsShown} />
              </div>
            )}
          </div>
          {searchShown && <SearchModal setSearchShown={setSearchShown} />}
        </div>
        {selected === 'trend' && (
          <div className="flex mt-[12px] gap-[12px] font-merri">
            <Select
              onChange={(value) => {
                setSort({ [value]: 'desc' });
              }}
              defaultValue="views_count"
              className="w-[160px]"
              suffixIcon={<LineChartOutlined />}
            >
              <Select.Option value="views_count">Их үзсэн</Select.Option>
              <Select.Option value="comments_count">Их сэтгэгдэлтэй</Select.Option>
            </Select>
            <Select
              onChange={(value) => {
                setFilter([{ range: { publish_date: { gte: `now-${value}d/d` } } }]);
              }}
              defaultValue="1"
              className="w-[160px]"
              suffixIcon={<FieldTimeOutlined />}
            >
              <Select.Option value="1">24 цаг</Select.Option>
              <Select.Option value="7">7 хоног</Select.Option>
              <Select.Option value="30">30 хоног</Select.Option>
              <Select.Option value="360">1 жил</Select.Option>
              <Select.Option value="10000">Бүх цаг үе</Select.Option>
            </Select>
          </div>
        )}
        <ArticlesList filter={filter} sort={sort} size={24} />
      </div>
    </>
  );
}
