import FeedCard from '../../component/card/FeedCard';
import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import { ESService } from '../../lib/esService';
import React, {useEffect, useState, useContext} from "react";
import FeedMagazine from '../../component/magazine/FeedMagazine';
import FeedTopTags from '../../component/toptags/FeedTopTags';
import { AppContext } from '../../App';
import HighlightCard from '../../component/card/FeedCard/HighlightCard';
import useMediaQuery from '../../component/navigation/useMediaQuery';

const menu = [
  {
      title: 'ШИНЭ',
  },
  {
      title: 'ТРЭНД',
  },
]


export default function Home() {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(0)
	const context = useContext(AppContext);
  
  const isLaptop = useMediaQuery("(min-width: 1001px) and (max-width: 1920px)");
  const isTablet = useMediaQuery("(min-width: 401px) and (max-width: 1000px)");
  const isMobile = useMediaQuery("screen and (max-width: 767px)");

  useEffect(() => {
    context.setStore('transparent')
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    const es = new ESService('caak');
    es.home_articles().then(setArticles);
  }, []);

  return (
    < >
      <div className={`relative bg-white flex flex-col items-center pb-[100px] px-[16px] sm:px-0`}>
        <NavbarPostHeader/>
        <Story />
        <div className='flex flex-row items-center justify-center gap-[50px] pb-[1px] max-w-[1310px] w-full border-b border-[#EFEEEF]'>
          {
              menu.map((data, index) => {
              return(
                  <p key={index} onClick={() => setSelected(index)} className={`text-[20px] font-bold cursor-pointer text-center leading-[24px] ${selected === index ? 'border-b-[3px] border-[#FF6600] pb-[12px]' : 'border-none pb-[15px]'} ${selected === index ? 'text-[#111111]' : 'text-[#555555]'}`}>{data.title}</p>
              )
              })
          }
        </div>
        {
          selected === 0
          ?
          <div>
            <div
              className={
                `relative max-w-[1310px] w-full justify-items-center mt-[50px] ${isMobile && 'mobileFeedGrid' || 'newFeedGrid'} justify-center`
              }
            >
              {
                articles.slice(0, 5).map((data, index) => {
                  return(
                    <FeedCard sponsored={index === 3 && true} key={index} post={data}/>
                  )
                })
              }
              <div className='bg-gray-200 w-full sm:w-[424px] h-[220px] sm:h-[524px]'>
                <p>banner</p>
              </div>
              {
                articles.slice(5, 8).map((data, index) => {
                  return(
                    <FeedCard sponsored={index === 3 && true} key={index} post={data}/>
                  )
                })
              }
            </div>
            <div
              className={
                `relative max-w-[1310px] w-full justify-items-center ${isMobile && 'mobileFeedGrid' || 'HighlightFeedGrid'} justify-center sm:pt-[44px] sm:pb-[40px]`
              }
            >
              {
                articles.slice(8, 10).map((data, index) => {
                  if(isLaptop){
                    return(
                      <HighlightCard key={index} post={data}/>
                    )
                  }else{
                    return(
                      <FeedCard key={index} post={data}/>
                    )
                  }
                })
              }
            </div>
            <div
              className={
                `relative max-w-[1310px] w-full justify-items-center ${isMobile && 'mobileFeedGrid' || 'newFeedGrid'} justify-center`
              }
            >
              {
                articles.slice(10, 14).map((data, index) => {
                  return(
                    <FeedCard sponsored={index === 2 && true} key={index} post={data}/>
                  )
                })
              }
              <div className='bg-gray-200 w-full sm:w-[424px] h-[220px] sm:h-[524px]'>
                <p>banner</p>
              </div>
              {
                articles.slice(14, 18).map((data, index) => {
                  return(
                    <FeedCard key={index} post={data}/>
                  )
                })
              }
            </div>
            <div className='xl:py-[50px] w-full'>
              <FeedTopTags/>
            </div>
            <div
              className={
                `relative max-w-[1310px] w-full justify-items-center ${isMobile && 'mobileFeedGrid' || 'newFeedGrid'} justify-center`
              }
            >
              {
                articles.slice(18, 24).map((data, index) => {
                  return(
                    <FeedCard sponsored={index === 5 && true} key={index} post={data}/>
                  )
                })
              }
            </div>
            <div className='pt-[57px] w-full'>
              <FeedMagazine/>
            </div>
            <div
              className={
                `relative max-w-[1310px] w-full justify-items-center ${isMobile && 'mobileFeedGrid' || 'HighlightFeedGrid'} justify-center sm:pt-[50px] sm:pb-[40px]`
              }
            >
              {
                articles.slice(24, 26).map((data, index) => {
                  if(isLaptop){
                    return(
                      <HighlightCard key={index} post={data}/>
                    )
                  }else{
                    return(
                      <FeedCard key={index} post={data}/>
                    )
                  }
                })
              }
            </div>
            <div
              className={
                `relative max-w-[1310px] w-full justify-items-center ${isMobile && 'mobileFeedGrid' || 'newFeedGrid'} justify-center`
              }
            >
              {
                articles.slice(26, 32).map((data, index) => {
                  return(
                    <FeedCard key={index} post={data}/>
                  )
                })
              }
            </div>
          </div>
        :
        null
        }
      </div>
    </ >
  );
}
