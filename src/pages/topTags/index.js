import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import TagsCard from '../../component/card/TagsCard';
import { ESService } from '../../lib/esService';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Loader from '../../component/loader';
import FeedCard from '../../component/card/FeedCard';
import useMediaQuery from '../../component/navigation/useMediaQuery';
import HighlightCard from '../../component/card/FeedCard/HighlightCard';
import { Tabs, Row, Col, Button, Skeleton, Space } from 'antd';

const menu = [
  {
    title: 'ШИНЭ',
  },
  {
    title: 'ШИЛДЭГ',
  },
];

const CATEGORY = gql`
  query GetCategory($slug: String) {
    category(slug: $slug) {
      id
      name
      slug
      status
      articles {
        totalCount
      }
    }
  }
`;

export default function TopTags() {
  const context = useContext(AppContext);
  const { slug } = useParams();
  const [selected, setSelected] = useState(0);
  const [articles, setArticles] = useState([]);
  const { data, loading } = useQuery(CATEGORY, { variables: { slug } });
  const category = data?.category || {};

  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  useEffect(() => {
    context.setStore('default');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    context.setShown(true);
  }, []);

  // useEffect(() => {
  //   const es = new ESService('caak');
  //   es.categoryPosts(slug, { size: 24 }).then(setArticles);
  // }, [slug]);

  if (loading)
    return (
      <div className={'w-full flex justify-center'}>
        <Loader className={`bg-caak-primary self-center`} />
      </div>
    );
  //prettier-ignore
  return (
    <div className="flex justify-center pt-[70px] pb-[100px]">
      <div className="max-w-[1310px] w-full flex flex-col items-center">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="w-[142px]"></div>
          <p className="text-black text-[38px] font-roboto leading-[44px] font-bold">#{category?.name}</p>
          <div className="flex flex-row items-center">
            <button className="bg-caak-primary text-white text-[15px] font-bold font-roboto w-[90px] h-[34px] rounded-[4px] border border-caak-primary">
              Дагах
            </button>
            <div className=' border border-[#D4D8D8] rounded-[4px] w-[42px] h-[34px] flex justify-center items-center ml-[10px] cursor-pointer'>
              <span className="icon-fi-rs-more-ver text-[#111111] text-[18px] rotate-90" />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center mt-[10px]">
          <p className="text-[#555555] text-[15px] leading-[18px]">
            <span className="text-[#111111] font-medium">{category?.articles?.totalCount}</span> Пост
          </p>
          <p className="text-[#555555] text-[15px] leading-[18px] ml-[20px]">
            <span className="text-[#111111] font-medium">30 </span>Дагагчид
          </p>
        </div>
        <div className="hidden xl:flex flex-row items-center justify-center gap-[50px] pb-[1px] max-w-[1310px] w-full ">
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
        <div className="max-w-[1310px] w-full flex flex-wrap justify-center gap-x-[22px] gap-y-[40px]">
          {articles?.map((post) => (
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
    </div>
  );
}
