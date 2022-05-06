import { useRef, useState, useEffect } from "react";
import Story from ".";
import { ESService } from "../../lib/esService";

const StoryFeed = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const trendPostsRef = useRef(null);

  useEffect(() => {
    const es = new ESService('caak');
    es.stories().then(setStories);
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
        "flex overflow-hidden flex-col max-w-[300px] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] xl:max-w-[1100px] 2xl:max-w-[1502px] w-full justify-center relative py-[80px]"
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
            "cursor-pointer z-40 w-[52px] h-[52px] flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-26px] top-1/2"
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
            "cursor-pointer z-40 w-[52px] h-[52px] flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-26px] top-1/2 rotate-180"
          }
        >
          <span
            className={"icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90"}
          />
        </div>
      )}

      <p
        className={
          "font-bold text-[#111111] text-[38px] text-center leading-[42px]"
        }
      >
        СТОРИ МЭДЭЭ
      </p>
      <div
        ref={trendPostsRef}
        className={"trendPostsCardWrapper z-0 relative mt-[39px] overflow-x-scroll"}
      >
        <div
          className={
            " flex flex-row flex-nowrap w-full gap-[13px] h-full transition-all duration-300"
          }
        >
          {stories.map((item, index) => {
            return <Story story={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default StoryFeed;
