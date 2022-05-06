import FeedCard from '../../component/card/FeedCard';
import NavbarPostHeader from '../../component/navigation/navbarPostHeader';
import Story from '../../component/story';
import { ESService } from '../../lib/esService';
import React from "react";
import MagazineFeed from '../../component/magazine';
import TopTags from '../../component/toptags/TopTags';

export default function Home() {
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
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
                <FeedCard key={index} post={data}/>
              )
            })
          }
        </div>
        <TopTags/>
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
        <MagazineFeed feed/>
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
