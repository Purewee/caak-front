import { useRef, useState, useEffect } from "react";
import StoryItem from "./Story";
import { ESService } from "../../lib/esService";

const StoryFeed = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const trendPostsRef = useRef(null);

  useEffect(() => {
    const es = new ESService('caak');
    es.stories().then(res => {
      setStories(res)
    });
  }, []);

  const nextItem = () => {
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return stories?.length > 0 ? (
    <div
      className={
        "flex flex-col max-w-[1502px] px-[10px] xl:px-0 w-full justify-center relative mt-[22px] md:py-[80px]"
      }
    >
      {activeIndex + 1 < stories.length - 1 && (
        <div
          onClick={() => {
            trendPostsRef.current.scrollTo({
              left: (1 + activeIndex) * 310,
              behavior: "smooth",
            });
            nextItem();
          }}
          className={
            "cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-26px] top-1/2"
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
              left: (activeIndex - 1) * 310,
              behavior: "smooth",
            });
            prevItem();
          }}
          className={
            "cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-26px] top-1/2 rotate-180"
          }
        >
          <span
            className={"icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90"}
          />
        </div>
      )}

      <p
        className={
          "font-medium md:font-bold text-[#111111] text-[17px] md:text-[38px] md:text-center leading-[20px] md:leading-[42px]"
        }
      >
        СТОРИ МЭДЭЭ
      </p>
      <div
        ref={trendPostsRef}
        className={
          "w-full wrapper gap-[13px] transition-all pb-[26px] md:pb-0 duration-300 mt-[14px] md:mt-[39px]"
        }
      >
        {stories.map((item, index) => {
          return <StoryItem border={index === 0 && true} story={item} key={index} />;
        })}
      </div>
    </div>
  ) : null;
};

export default StoryFeed;

