import { useRef, useState, useEffect } from 'react';
import StoryItem from './Story';
import { ESService } from '../../lib/esService';
import { Link } from 'react-router-dom';

const StoryFeed = () => {
  // prettier-ignore
  const [activeIndex, setActiveIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const trendPostsRef = useRef(null);
  // prettier-ignore

  useEffect(() => {
    const es = new ESService('caak');
    es.stories().then((res) => {
      setStories(res);
    });
  }, []);
  // prettier-ignore

  const nextItem = () => {
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  // prettier-ignore
  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return stories?.length > 0 ? (
    <div className="flex flex-col max-w-[400px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1002px] xl:max-w-[1202px] 2xl:max-w-[1502px] xl:px-0 w-full justify-center relative md:py-[80px]">
      {activeIndex + 1 < stories.length - 1 && (
        <div
          onClick={() => {
            trendPostsRef.current.scrollTo({
              left: (1 + activeIndex) * 310,
              behavior: 'smooth',
            });
            nextItem();
          }}
          className="cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-26px] top-1/2"
        >
          <span className="icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90" />
        </div>
      )}

      {activeIndex > 0 && (
        <div
          onClick={() => {
            trendPostsRef.current.scrollTo({
              left: (activeIndex - 1) * 310,
              behavior: 'smooth',
            });
            prevItem();
          }}
          className="cursor-pointer hidden md:flex z-40 w-[52px] h-[52px] items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-26px] top-1/2 rotate-180"
        >
          <span className="icon-fi-rs-down-chevron text-[#555555] text-[18px] -rotate-90" />
        </div>
      )}

      <div className="flex flex-row items-center w-full relative md:justify-center">
        <img
          className="h-[20px] md:h-[42px] md:w-[324px] mt-[30px] md:mt-0"
          src={require('../../assets/images/feed_story.svg').default}
          alt="Feeds"
        />
        <Link to="/stories">
          <div className="hidden xl:flex flex-row absolute items-center right-[121px]">
            <p className="text-[16px] text-[#111111]">Бүх сторинууд</p>
            <span className="icon-fi-rs-stories-o text-[#FF6600] text-[18px] ml-[6px]" />
          </div>
        </Link>
      </div>
      <div
        ref={trendPostsRef}
        className="w-full wrapper gap-[13px] transition-all pb-[26px] md:pb-0 duration-300 mt-[14px] md:mt-[39px]"
      >
        {stories.map((item, index) => {
          return <StoryItem border={index === 0} story={item} key={index} index={index} />;
        })}
        <div className="min-w-[106px] sm:min-w-[290px] relative flex items-center justify-center max-w-[290px] rounded-[8px] min-h-[160px] sm:min-h-[435px] max-h-[435px]">
          <img className="w-full h-full" src={require('../../assets/images/all-stories.png')} alt="All Stories" />
          <div className="bg-black rounded-[8px] bg-opacity-70 px-[10px] md:px-[47px] h-full w-full absolute flex justify-center items-center">
            <Link to="/stories" className="w-full">
              <div className="md:h-[34px] rounded-[4px] cursor-pointer bg-white w-full flex flex-row items-center justify-center">
                <span className="icon-fi-rs-stories-o hidden md:block text-[#FF6600] text-[14.6px] mr-[10px]" />
                <p className="text-[#111111] text-center">Бүх сторинууд үзэх</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default StoryFeed;
