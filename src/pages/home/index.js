import FeedCard from '../../component/card/FeedCard';
import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import { ESService } from '../../lib/esService';
import React, { useEffect, useState, useContext } from 'react';
import FeedMagazine from '../../component/magazine/FeedMagazine';
import FeedTopTags from '../../component/toptags/FeedTopTags';
import { AppContext } from '../../App';
import HighlightCard from '../../component/card/FeedCard/HighlightCard';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import TrendCard from '../../component/card/TrendCard';
import BigTrendCard from '../../component/card/TrendCard/BigTrendCard';
import { Tabs, Row, Col } from 'antd';
import { BlockTitle } from '../post/view/wrapper';
import PostCard from '../../component/card/Post';

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

const menu = [
  {
    title: 'ШИНЭ',
  },
  {
    title: 'ТРЭНД',
  },
];

export default function Home() {
  // prettier-ignore
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState('recent');
  const context = useContext(AppContext);

  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  useEffect(() => {
    context.setStore('transparent');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    context.setShown(true);
  }, []);

  useEffect(() => {
    const es = new ESService('caak');
    es.home_articles().then(setArticles);
    // eslint-disable-next-line
  }, []);

  // prettier-ignore
  return (
    <>
      <div className={`relative bg-white flex flex-col items-center pb-[100px]`}>
        <NavbarPostHeader />
        <div className='px-[30px] w-full'>
          <Story />
        </div>
        <div className="hidden xl:flex flex-row items-center justify-center gap-[50px] pb-[1px] max-w-[1310px] w-full ">
          <Tabs size="large" onChange={(e) => setSelected(e)} className="w-full" centered>
            <Tabs.TabPane key="recent" tab={<span className={`text-[20px] font-bold cursor-pointer text-center leading-[20px] uppercase ${selected === 'recent' ? 'text-[#111111]' : 'text-[#555555]'}`}>Шинэ</span>}></Tabs.TabPane>
            <Tabs.TabPane key="trend" tab={<span className={`text-[20px] font-bold cursor-pointer text-center leading-[20px] uppercase  ${selected === 'trend' ? 'text-[#111111]' : 'text-[#555555]'}`}>Трэнд</span>}></Tabs.TabPane>
          </Tabs>
        </div>
        <Row gutter={22} className="max-w-[1240px]">
          { articles.map((post) =>
            <Col key={post.id} span={8}>
              <PostCard post={post} />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}
