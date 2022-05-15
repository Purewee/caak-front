import FeedCard from '../../component/card/FeedCard';
import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import { ESService } from '../../lib/esService';
import React, {useEffect, useState, useContext} from "react";
import FeedMagazine from '../../component/magazine/FeedMagazine';
import FeedTopTags from '../../component/toptags/FeedTopTags';
import { AppContext } from '../../App';
import HighlightCard from '../../component/card/FeedCard/HighlightCard';

export default function Home() {
  const [articles, setArticles] = useState([]);
	const context = useContext(AppContext);

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
      <div className="relative bg-white flex flex-col items-center pb-[100px]">
        <NavbarPostHeader/>
        <Story />
        <div
          className={
            "relative max-w-[1310px] w-full justify-items-center newFeedGrid justify-center"
          }
        >
          {
            articles.slice(0, 9).map((data, index) => {
              return(
                <FeedCard sponsored={index === 3 && true} key={index} post={data}/>
              )
            })
          }
        </div>
        <div
          className={
            "relative max-w-[1310px] w-full justify-items-center HighlightFeedGrid justify-center pt-[44px] pb-[40px]"
          }
        >
          {
            articles.slice(9, 11).map((data, index) => {
              return(
                <HighlightCard key={index} post={data}/>
              )
            })
          }
        </div>
        <div
          className={
            "relative max-w-[1310px] w-full justify-items-center newFeedGrid justify-center"
          }
        >
          {
            articles.slice(11, 20).map((data, index) => {
              return(
                <FeedCard sponsored={index === 2 && true} key={index} post={data}/>
              )
            })
          }
        </div>
        <div className='py-[50px] w-full'>
          <FeedTopTags/>
        </div>
        <div
          className={
            "relative max-w-[1310px] w-full justify-items-center newFeedGrid justify-center"
          }
        >
          {
            articles.slice(20, 26).map((data, index) => {
              return(
                <FeedCard key={index} post={data}/>
              )
            })
          }
        </div>
        <div className='pt-[57px] w-full'>
          <FeedMagazine/>
        </div>
        <div
          className={
            "relative max-w-[1310px] w-full justify-items-center HighlightFeedGrid justify-center pt-[50px] pb-[40px]"
          }
        >
          {
            articles.slice(26, 28).map((data, index) => {
              return(
                <HighlightCard key={index} post={data}/>
              )
            })
          }
        </div>
        <div
          className={
            "relative max-w-[1310px] w-full justify-items-center newFeedGrid justify-center"
          }
        >
          {
            articles.slice(28).map((data, index) => {
              return(
                <FeedCard key={index} post={data}/>
              )
            })
          }
        </div>
      </div>
    </ >
  );
}
