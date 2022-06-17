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

  useEffect(() => {
    const es = new ESService('caak');
    es.categoryPosts(slug, { size: 24 }).then(setArticles);
  }, [slug]);

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
        <div className=" mt-[40px] flex flex-row items-center border-[#EFEEEF] border-b border-t w-full justify-center gap-[50px] pb-[1px] pt-[17px]">
          {menu.map((data, index) => {
            return (
              <p
                key={index}
                onClick={() => setSelected(index)}
                className={`text-[18px] font-bold cursor-pointer text-center leading-[21px] ${
                  selected === index ? 'border-b-[3px] border-[#FF6600] pb-[12px]' : 'border-none pb-[15px]'
                } ${selected === index ? 'text-[#111111]' : 'text-[#555555]'}`}
              >
                {data.title}
              </p>
            );
          })}
        </div>
        <div className="flex flex-row items-center justify-between w-full mt-[50px] pb-[60px]">
          {articles.slice(0, 3).map((data, index) => {
            return <TagsCard key={index} data={data} middle={index === 1 && true} />;
          })}
        </div>
        <div
          className={`relative max-w-[1310px] w-full justify-items-center border-t-[8px] xl:border-none border-[#EFEEEF] ${isMobile ? 'mobileFeedGrid' : 'newFeedGrid'} justify-center`}
        >
          {articles.slice(3, 8).map((data, index) => {
            return <FeedCard trend={selected === 1 && true} sponsored={index === 4 && true} key={index} post={data} />;
          })}
          {
            articles.length > 8 && 
            <div className="w-full flex flex-col">
              <div className={`w-full sm:w-[424px] h-[220px] bg-gray-200 ${selected === 0 ? 'sm:h-[527px]' : 'sm:h-[475px]'}`}></div>
              <div className="flex md:hidden flex-row items-center pr-[6px] justify-end w-full text-[#909090] mt-[8px] border-b border-[#EFEEEF] pb-[13px]">
                <span className="icon-fi-rs-megaphone text-[13px]" />
                <p className="text-[14px] font-condensed ml-[4px]">Сурталчилгаа</p>
              </div>
            </div>
          }
          {articles.slice(8, 11).map((data, index) => {
            return <FeedCard trend={selected === 1 && true} key={index} post={data} />;
          })}
          {articles.slice(11, 14).map((data, index) => {
            return <FeedCard trend={selected === 1 && true} key={index} post={data} />;
          })}
        </div>
        <div
          className={`relative max-w-[1310px] w-full justify-items-center ${
            isMobile ? 'mobileFeedGrid' : 'HighlightFeedGrid'
          } justify-center ${articles.length > 14 && 'sm:pt-[44px] sm:pb-[40px]'}`}
        >
          {articles.slice(14, 16).map((data, index) => {
            if (isLaptop) {
              return <HighlightCard key={index} post={data} />;
            } else {
              return <FeedCard key={index} post={data} />;
            }
          })}
        </div>
        <div
          className={`relative max-w-[1310px] w-full justify-items-center border-t-[8px] xl:border-none border-[#EFEEEF] ${isMobile ? 'mobileFeedGrid' : 'newFeedGrid'} justify-center`}
        >
          {articles.slice(16, 20).map((data, index) => {
            return <FeedCard trend={selected === 1 && true} sponsored={index === 4 && true} key={index} post={data} />;
          })}
          {
            articles.length > 20 &&
            <div className="w-full flex flex-col">
              <div className={`w-full sm:w-[424px] h-[220px] bg-gray-200 ${selected === 0 ? 'sm:h-[527px]' : 'sm:h-[475px]'}`}></div>
              <div className="flex md:hidden flex-row items-center pr-[6px] justify-end w-full text-[#909090] mt-[8px] border-b border-[#EFEEEF] pb-[13px]">
                <span className="icon-fi-rs-megaphone text-[13px]" />
                <p className="text-[14px] font-condensed ml-[4px]">Сурталчилгаа</p>
              </div>
            </div>
          }
          {articles.slice(20).map((data, index) => {
            return <FeedCard trend={selected === 1 && true} key={index} post={data} />;
          })}
        </div>
      </div>
    </div>
  );
}
