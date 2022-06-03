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

const Magazine = () => {
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
    <div className="w-full pt-[21px] flex justify-center">
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
              "cursor-pointer z-30 w-[40px] h-[40px] hidden xl:flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-20px] top-1/2"
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
              "cursor-pointer z-30 w-[40px] h-[40px] hiddden xl:flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-20px] top-1/2 rotate-180"
            }
          >
            <span
              className={"icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90"}
            />
          </div>
        )}
        {/* <div className="flex flex-row items-center mb-[21px]">
          <span className="icon-fi-rs-jor text-[20px] text-[#FF6600]"/>
          <p
            className={
              "font-bold text-[#000000] ml-[8px] text-[24px] leading-[28px]"
            }
          >
            АЛДАРТАЙ ЖОРНУУД
          </p>
        </div> */}
        <div
          ref={trendPostsRef}
          className={"trendPostsCardWrapper relative overflow-x-scroll"}
        >
          <div
            className={
              " flex flex-row flex-nowrap w-full h-full gap-[21px] transition-all duration-300"
            }
          >
            <div className='min-w-[348px] max-w-[348px] h-[227px] relative'>
              <div className='absolute bg-[#FFF9F5] z-20 top-0 left-0 w-[338px] flex flex-col items-center justify-center h-[219px] rounded-[4px] border-[1px] border-[#D4D8D8]'>
                  <div className="flex items-center justify-center w-[44px] h-[44px] border-[2px] border-dashed border-caak-primary rounded-[6px]">
                    <span className="icon-fi-rs-plus text-caak-primary"/>
                  </div>
                  <p className="text-[20px] text-caak-primary font-medium mt-[19px] leading-[24px]">Шинэ жор үүсгэх</p>
              </div>
              <div className='absolute bg-white z-10 top-[5px] left-[5px] w-[338px] h-[218px] rounded-[4px] border-[1px] border-[#D4D8D8]'>

              </div>
              <div className='absolute z-0 bg-white top-[10px] left-[10px] w-[338px] h-[217px] rounded-[4px] border-[1px] border-[#D4D8D8]'>

              </div>
            </div>
            {trendingPostsByCategory.map((item, index) => {
              return <MagazineItem data={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Magazine;
