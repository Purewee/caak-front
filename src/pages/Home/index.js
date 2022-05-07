import FeedCard from '../../component/card/FeedCard';
import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import { ESService } from '../../lib/esService';
import React, {useEffect, useState, useContext} from "react";
import FeedMagazine from '../../component/magazine/FeedMagazine';
import FeedTopTags from '../../component/toptags/FeedTopTags';
import { AppContext } from '../../App';

export default function Home() {
  const [articles, setArticles] = useState([]);
	const context = useContext(AppContext);

  useEffect(() => {
    context.setStore('transparent')
  },[])

  useEffect(() => {
    const es = new ESService('caak');
    es.home_articles().then(setArticles);
  }, []);

  return (
    < >
      <div className="relative bg-white flex flex-col items-center pb-[100px]">
        <NavbarPostHeader/>
        {/* <Story /> */}
        <div
          className={
            "relative max-w-[1310px] w-full justify-items-center newFeedGrid justify-center py-[50px]"
          }
        >
          {
            articles.slice(0, 9).map((data, index) => {
              return(
                <FeedCard sponsored={index === 6 && true} key={index} post={data}/>
              )
            })
          }
        </div>
        <FeedTopTags/>
        <div
          className={
            "relative max-w-[1310px] w-full justify-items-center newFeedGrid justify-center py-[50px]"
          }
        >
          {
            articles.slice(9, 15).map((data, index) => {
              return(
                <FeedCard key={index} post={data}/>
              )
            })
          }
        </div>
        <FeedMagazine/>
        <div
          className={
            "relative max-w-[1310px] w-full justify-items-center newFeedGrid justify-center py-[50px]"
          }
        >
          {
            articles.slice(15).map((data, index) => {
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
