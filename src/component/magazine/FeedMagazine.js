import { useRef, useState } from "react";
import MagazineItem from "./MagazineItem";

const trendingPostsByCategory = [
  {
    id: 1,
    title: "ФОТО: Мөнгөн мод 2021 ёслолын арга хэмжээ",
    category: {
      name: 'cateName'
    },
    group: {
      name: 'groupName'
    },
    user: {
      nickname: 'userName'
    }
  },
  {
    id: 2,
    title: "Насанд хүрэгчид 19, хүүхдүүд зургаан төрлийн үзлэг оношилгоонд хамрагдана",
    category: {
      name: 'cateName'
    },
    group: {
      name: 'groupName'
    },
    user: {
      nickname: 'userName'
    }
  },
  {
    id: 3,
    title: "Б.Барслхагва: Энэ шагнал бол минийх биш ханийн минь шагнал юм шүү",
    category: {
      name: 'cateName'
    },
    group: {
      name: 'groupName'
    },
    user: {
      nickname: 'userName'
    }
  },
  {
    id: 4,
    title: "hellooo",
    category: {
      name: 'cateName'
    },
    group: {
      name: 'groupName'
    },
    user: {
      nickname: 'userName'
    }
  },
  {
    id: 5,
    title: "hellooo",
    category: {
      name: 'cateName'
    },
    group: {
      name: 'groupName'
    },
    user: {
      nickname: 'userName'
    }
  },
  {
    id: 6,
    title: "hellooo",
    category: {
      name: 'cateName'
    },
    group: {
      name: 'groupName'
    },
    user: {
      nickname: 'userName'
    }
  },
]

const FeedMagazine = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trendPostsRef = useRef(null);
  const nextItem = () => {
    if (activeIndex < trendingPostsByCategory.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return  (
    <div className="w-full py-[50px] bg-[#F5F5F5] flex justify-center">
      <div
        className={
          "flex flex-col w-full relative max-w-[400px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[950px] xl:max-w-[1200px] 2xl:max-w-[1310px]"
        }
      >
        {activeIndex + 1 < trendingPostsByCategory.length - 1 && (
          <div
            onClick={() => {
              trendPostsRef.current.scrollTo({
                left: (1 + activeIndex) * 350,
                behavior: "smooth",
              });
              nextItem();
            }}
            className={
              "cursor-pointer z-30 w-[40px] h-[40px] flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-20px] top-1/2"
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
              "cursor-pointer z-30 w-[40px] h-[40px] flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-20px] top-1/2 rotate-180"
            }
          >
            <span
              className={"icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90"}
            />
          </div>
        )}
        <div className="flex flex-row items-center mb-[21px]">
          <span className="icon-fi-rs-jor text-[20px] text-[#FF6600]"/>
          <p
            className={
              "font-bold text-[#000000] ml-[8px] text-[24px] leading-[28px]"
            }
          >
            АЛДАРТАЙ ЖОРНУУД
          </p>
        </div>
        <div
          ref={trendPostsRef}
          className={"trendPostsCardWrapper relative overflow-x-scroll"}
        >
          <div
            className={
              " flex flex-row flex-nowrap w-full h-full gap-[21px] transition-all duration-300"
            }
          >
            {trendingPostsByCategory.map((item, index) => {
              return <MagazineItem data={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  )
};

export default FeedMagazine;
