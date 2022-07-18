import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import { ESService } from '../../lib/esService';
import React, { useEffect, useState, useContext } from 'react';
import FeedMagazine from '../../component/magazine/FeedMagazine';
import FeedTopTags from '../../component/toptags/FeedTopTags';
import { AppContext } from '../../App';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import { Tabs, Row, Col, Button, Skeleton } from 'antd';
import PostCard from '../../component/card/Post';
import Logo from '../../component/logo';
import UserInfo from '../../component/navigation/navbar/UserInfo';
import { FIcon } from '../../component/icon';
import SearchModal from '../../component/modal/SearchModal';

export default function Home() {
  const es = new ESService('caak');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState('recent');
  const [stickyTabs, setStickyTabs] = useState(false);
  const [searchShown, setSearchShown] = useState(false);
  const context = useContext(AppContext);

  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  document.title = 'Саак';

  useEffect(() => {
    context.setStore('transparent');
  }, []);

  useEffect(() => {
    context.setShown(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    es.home_articles(page).then((response) => {
      setArticles([...articles, ...response]);
      setLoading(false);
    });
  }, [page]);

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
      <div className={`relative bg-white flex flex-col items-center pb-[100px]`}>
        <div className="h-[57px] border-b-[3px] md:hidden border-[#EFEEEF] bg-white z-[2] w-full sticky top-[46px] pl-[16px]">
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
          } hidden xl:flex sticky top-0 z-[2] flex-row justify-center items-center border-b bg-white px-[40px]`}
        >
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
          <div className={`min-w-[150px] flex flex-row items-center ${stickyTabs ? 'block' : ' hidden'}`}>
            <FIcon
              onClick={() => setSearchShown(true)}
              className="icon-fi-rs-search text-caak-darkGray text-[20px] w-[32px] mr-[6px]"
            />
            <UserInfo className={'text-caak-darkGray'} />
          </div>
          {searchShown && <SearchModal setSearchShown={setSearchShown} />}
        </div>
        {/* <Row gutter={[22, 40]} className="max-w-[1310px]">
          {articles.map((post) => (
            <Col key={post.id} span={24}>
              <PostCard post={post} />
            </Col>
          ))}
          {loading && <Skeleton />}
          <Col span={24}>
            <Button
              block
              size="large"
              className="font-roboto border-caak-primary text-caak-primary mt-[20px]"
              onClick={() => setPage(page + 1)}
              loading={loading}
            >
              Цааш үзэх
            </Button>
          </Col>
        </Row> */}

        {/* ingeed hiichvvl mobile deer ewdrehgv zvgeer bn */}

        <div className="max-w-[1310px] w-full flex flex-wrap justify-center gap-x-[22px] gap-y-[40px] px-[16px] sm:px-0 mt-[40px]">
          {articles.map((post) => (
            <Col className="w-full sm:w-[422px]" key={post.id}>
              <PostCard isMobile={isMobile} post={post} />
            </Col>
          ))}
          {loading && <Skeleton />}
          <Col span={24}>
            <Button
              block
              size="large"
              className="font-roboto border-caak-primary text-caak-primary mt-[20px]"
              onClick={() => setPage(page + 1)}
              loading={loading}
            >
              Цааш үзэх
            </Button>
          </Col>
        </div>
      </div>
    </>
  );
}
