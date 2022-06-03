import { useRef, useState } from "react";
import TopTagsItem from "./TopTagsItem";

const posts = [
  {
    id: 1,
    name: "Улс төр",
    image: 'https://6.viki.io/image/acdeaa0eb413471ba98758e6b7104faf/dummy.jpeg?s=900x600&e=t'
  },
  {
    id: 2,
    name: "Нийгэм",
    image: 'https://img.celebrities.id/okz/900/fBe603/master_267ut9Q7Vc_1611.jpeg'
  },
  {
    id: 3,
    name: "Спорт",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blackpink_PUBG_210321.jpg/1200px-Blackpink_PUBG_210321.jpg'
  },
  {
    id: 4,
    name: "Хөгжилтэй",
    image: 'https://pbs.twimg.com/media/FLrN2LmUcAQbIwS?format=jpg&name=large'
  },
  {
    id: 5,
    name: "Монгол",
    image: 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/1858C/production/_109642799_3f7a7888-11b4-42ad-8606-e9eae919d71d.jpg'
  },
  {
    id: 6,
    name: "Аялал",
    image: 'https://releasedate.news/wp-content/uploads/2022/03/BLACKPINK-2022-Comeback-New-Project-Announced-Jeon-So-Mi-accidentally.jpg'
  },
  {
    id: 7,
    name: "Технологи",
    image: 'https://lh3.googleusercontent.com/tFVNartbFTOK-Y7_MBbVSFRNtCuRGQyhWWHxe3TeQAPpVnpgB-NQpYtwMOiHED-wI84gAnW3cWnr6FRMA-pDOrYPAHFsTZE_6eo=w780-nu-rj-l80-e365'
  },
  {
    id: 8,
    name: "Хоол",
    image: 'https://img.kpopmap.com/680x384/2020/04/lisa-blackpink.jpg'
  },
  {
    id: 9,
    name: "ХАХАХАХ",
    image: 'https://cdn.i-scmp.com/sites/default/files/styles/og_twitter_scmp_analysis/public/d8/images/methode/2020/06/08/4b0bdfc6-a639-11ea-8ea0-d7434be00753_image_hires_121748.jpg?itok=pAUflAeJ&v=1591589877'
  },
]

const FeedTopTags = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trendPostsRef = useRef(null);
  
  const nextItem = () => {
    if (activeIndex < posts.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return posts?.length > 0 ? (
    <div className="bg-[#F5F5F5] w-full flex justify-center py-[50px]">
      <div
        className={
          "flex flex-col w-full relative max-w-[400px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[950px] xl:max-w-[1200px] 2xl:max-w-[1310px]"
        }
      >
        {(activeIndex + 1 < posts.length - 1) && (
          <div
            onClick={() => {
              trendPostsRef.current.scrollTo({
                left: (1 + activeIndex) * 350,
                behavior: "smooth",
              });
              nextItem();
            }}
            className={
              "cursor-pointer z-[3] w-[40px] h-[40px] hidden xl:flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-20px] top-1/2"
            }
          >
            <span
              className={"icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90"}
            />
          </div>
        )}

        {activeIndex > 0 && (
          <div
            onClick={() => {
              trendPostsRef.current.scrollTo({
                left: (activeIndex - 1) * 350,
                behavior: "smooth",
              });
              prevItem();
            }}
            className={
              "cursor-pointer z-[3] w-[40px] h-[40px] flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-20px] top-1/2 rotate-180"
            }
          >
            <span
              className={"icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90"}
            />
          </div>
        )}

        <div className="flex flex-row items-center">
          <span className="icon-fi-rs-tag text-[20px] text-[#FF6600]"/>
          <p
            className={
              "font-bold text-[#000000] ml-[8px] text-[24px] leading-[28px]"
            }
          >
            ШИЛДЭГ ТАГУУД
          </p>
        </div>
        <div
          ref={trendPostsRef}
          className={"trendPostsCardWrapper relative mt-[20px] overflow-x-scroll"}
        >
          <div
            className={
              " flex flex-row flex-nowrap gap-[13px] w-full h-full transition-all duration-300"
            }
          >
            {posts.map((item, index) => {
                  return <TopTagsItem data={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default FeedTopTags;
