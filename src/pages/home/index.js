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
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(0);
  const context = useContext(AppContext);

  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  useEffect(() => {
    context.setStore('transparent');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const es = new ESService('caak');
    es.home_articles().then(setArticles);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={`relative bg-white flex flex-col items-center pb-[100px]`}>
        <div className="sticky md:hidden top-0 z-50 w-full bg-white">
          <div className="w-full border-b-[3px] border-[#EFEEEF] h-[36px] mt-[21.7px] relative">
            <div className="pr-[25px] absolute left-0 wrapper w-full">
              <p
                onClick={() => setSelected(0)}
                className={`${
                  selected === 0 && 'border-b-[3px] border-[#FF6600]'
                } ml-[16px] text-[21px] font-bold text-[#111111] uppercase whitespace-nowrap`}
              >
                ШИНЭ
              </p>
              <p
                onClick={() => setSelected(1)}
                className={`ml-[16px] text-[21px] ${
                  selected === 1 && 'border-b-[3px] border-[#FF6600]'
                } font-bold text-[#111111] uppercase whitespace-nowrap`}
              >
                ТРЭНД
              </p>
              {subMenu.map((data, index) => {
                return (
                  <p
                    key={index}
                    className={`ml-[16px] text-[21px] font-bold text-[#111111] uppercase whitespace-nowrap`}
                  >
                    {data.title}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <NavbarPostHeader />
        <Story />
        <div className="hidden xl:flex flex-row items-center justify-center gap-[50px] pb-[1px] max-w-[1310px] w-full border-b border-[#EFEEEF]">
          {menu.map((data, index) => {
            return (
              <p
                key={index}
                onClick={() => setSelected(index)}
                className={`text-[20px] font-bold cursor-pointer text-center leading-[24px] ${
                  selected === index ? 'border-b-[3px] border-[#FF6600] pb-[12px]' : 'border-none pb-[15px]'
                } ${selected === index ? 'text-[#111111]' : 'text-[#555555]'}`}
              >
                {data.title}
              </p>
            );
          })}
        </div>
        <div className="w-full flex flex-col items-center">
          {selected === 1 && (
            <div className="w-full flex flex-col items-center">
              <div
                className={`relative max-w-[1310px] w-full pt-[18px] xl:pt-[50px] justify-items-center ${
                  isMobile ? 'mobileFeedGrid' : 'HighlightFeedGrid'
                } justify-center`}
              >
                {articles.slice(0, 2).map((data, index) => {
                  if (isLaptop) {
                    return <BigTrendCard key={index} post={data} index={index} />;
                  } else {
                    return <FeedCard key={index} post={data} />;
                  }
                })}
              </div>
              <div
                className={`relative max-w-[1310px] w-full justify-items-center pt-[18px] xl:pt-[40px] ${
                  isMobile ? 'mobileFeedGrid' : 'trendGrid'
                } justify-center`}
              >
                {articles.slice(2, 10).map((data, index) => {
                  return <TrendCard key={index} post={data} index={index} />;
                })}
              </div>
            </div>
          )}
          <div
            className={`relative max-w-[1310px] w-full justify-items-center pt-[18px] border-t-[8px] xl:border-none border-[#EFEEEF] ${
              selected === 1 ? 'xl:pt-[60px]' : 'xl:pt-[50px]'
            } ${isMobile ? 'mobileFeedGrid' : 'newFeedGrid'} justify-center`}
          >
            {articles.slice(0, 5).map((data, index) => {
              return <FeedCard sponsored={index === 3 && true} key={index} post={data} />;
            })}
            <div className="w-full flex flex-col">
              <div className=" w-full sm:w-[424px] h-[220px] bg-gray-200 sm:h-[524px]"></div>
              <div className="flex md:hidden flex-row items-center pr-[6px] justify-end w-full text-[#909090] mt-[8px] border-b border-[#EFEEEF] pb-[13px]">
                <span className="icon-fi-rs-megaphone text-[13px]" />
                <p className="text-[14px] font-condensed ml-[4px]">Сурталчилгаа</p>
              </div>
            </div>
            {articles.slice(5, 8).map((data, index) => {
              return <FeedCard sponsored={index === 3 && true} key={index} post={data} />;
            })}
          </div>
          <div
            className={`relative max-w-[1310px] w-full justify-items-center ${
              isMobile ? 'mobileFeedGrid' : 'HighlightFeedGrid'
            } justify-center sm:pt-[44px] sm:pb-[40px]`}
          >
            {articles.slice(8, 10).map((data, index) => {
              if (isLaptop) {
                return <HighlightCard key={index} post={data} />;
              } else {
                return <FeedCard key={index} post={data} />;
              }
            })}
          </div>
          <div
            className={`relative max-w-[1310px] w-full justify-items-center ${
              isMobile ? 'mobileFeedGrid' : 'newFeedGrid'
            } justify-center`}
          >
            {articles.slice(10, 14).map((data, index) => {
              return <FeedCard sponsored={index === 2 && true} key={index} post={data} />;
            })}
            <div className="w-full flex flex-col">
              <div className=" w-full sm:w-[424px] h-[220px] bg-gray-200 sm:h-[524px]"></div>
              <div className="flex md:hidden flex-row items-center pr-[6px] justify-end w-full text-[#909090] mt-[8px] border-b border-[#EFEEEF] pb-[13px]">
                <span className="icon-fi-rs-megaphone text-[13px]" />
                <p className="text-[14px] font-condensed ml-[4px]">Сурталчилгаа</p>
              </div>
            </div>
            {articles.slice(14, 18).map((data, index) => {
              return <FeedCard key={index} post={data} />;
            })}
          </div>
          <div className="xl:py-[50px] hidden md:flex w-full">
            <FeedTopTags />
          </div>
          <div
            className={`relative max-w-[1310px] w-full justify-items-center mt-[16px] md:mt-0 ${
              isMobile ? 'mobileFeedGrid' : 'newFeedGrid'
            } justify-center`}
          >
            {articles.slice(18, 24).map((data, index) => {
              return <FeedCard sponsored={index === 5 && true} key={index} post={data} />;
            })}
          </div>
          <div className="pt-[57px] w-full">
            <FeedMagazine />
          </div>
          <div
            className={`relative max-w-[1310px] w-full pt-[24px] justify-items-center ${
              isMobile ? 'mobileFeedGrid' : 'HighlightFeedGrid'
            } justify-center sm:pt-[50px] sm:pb-[40px]`}
          >
            {articles.slice(24, 26).map((data, index) => {
              if (isLaptop) {
                return <HighlightCard key={index} post={data} />;
              } else {
                return <FeedCard key={index} post={data} />;
              }
            })}
          </div>
          <div
            className={`relative max-w-[1310px] w-full justify-items-center ${
              isMobile ? 'mobileFeedGrid' : 'newFeedGrid'
            } justify-center`}
          >
            {articles.slice(26, 32).map((data, index) => {
              return <FeedCard key={index} post={data} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
